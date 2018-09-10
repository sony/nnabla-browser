import os
import fnmatch
import glob

from watchdog.events import FileSystemEventHandler
from google.protobuf import text_format, json_format
from nnabla.utils import nnabla_pb2
from multiprocessing import Lock


def nnabla_proto_to_json(file_path):
    proto = nnabla_pb2.NNablaProtoBuf()

    with open(file_path, "r") as f:
        text_format.Merge(f.read(), proto)

    return json_format.MessageToJson(proto)


class Monitor(FileSystemEventHandler):
    def __init__(self, logdir, shared_dict, send_flags):
        super().__init__()
        self.logdir = logdir
        self.dataInfo = shared_dict

        # {flag: boolean, targets: list of connections, each element stands for each connection}
        self.sendManager = send_flags

        self.path_maps = self.get_path_recursive(self.logdir)

        self.initialize_dict()

    def _create_rel_and_full_path(self, root, filename):
        full_path = os.path.join(root, filename)
        rel_path = os.path.relpath(full_path, self.logdir)

        return rel_path, full_path

    def add_new_nntxt_info(self, path):
        rel_path = os.path.relpath(path, self.logdir)
        msg = nnabla_proto_to_json(path)

        self.dataInfo[rel_path] = {"file_name": os.path.basename(path),
                                   "path": path,
                                   "data": msg}

        self.set_send_info(rel_path)

    def add_new_monitor_info(self, path):
        rel_path = os.path.relpath(path, self.logdir)

        with open(path, "r") as f:
            msg = f.read()

        self.dataInfo[rel_path] = {"file_name": os.path.basename(path),
                                   "path": path,
                                   "data": msg}

        self.set_send_info(rel_path)

    def add_new_info(self, path):
        if fnmatch.fnmatch(path, "*.nntxt"):
            self.add_new_nntxt_info(path)
        elif fnmatch.fnmatch(path, "*.series.txt") or fnmatch.fnmatch(path, "*.result.csv"):
            self.add_new_monitor_info(path)

    def set_send_info(self, target):
        with Lock():
            length = len(self.sendManager)
            for i in range(length):
                self.sendManager[i] = {"flag": True, "targets": self.sendManager[i]["targets"] + [target]}

    def get_path_recursive(self, path):
        res = dict()

        res["name"] = os.path.basename(path)
        res["children"] = []
        res["monitorFiles"] = []
        res["nntxtFiles"] = []
        res["csvResultFiles"] = []

        files = glob.glob(os.path.join(path, "*"))

        for file in files:
            if os.path.isdir(file):
                res["children"].append(self.get_path_recursive(file))
            else:
                filename = os.path.basename(file)
                if fnmatch.fnmatch(file, "*.nntxt"):
                    res["nntxtFiles"].append({"name": filename, "data": None})
                elif fnmatch.fnmatch(file, "*.series.txt"):
                    res["monitorFiles"].append({"name": filename, "data": None})
                elif fnmatch.fnmatch(file, "*.result.csv"):
                    res["csvResultFiles"].append({"name": filename, "data": None})

        return res

    def initialize_dict(self):
        for root, dirs, files in os.walk(self.logdir):
            for file in files:
                full_path = os.path.join(root, file)
                self.add_new_info(full_path)

    def on_created(self, event):
        created = event.src_path

        self.add_new_info(created)

    def on_modified(self, event):
        modified = event.src_path
        index = os.path.relpath(modified, self.logdir)

        if fnmatch.fnmatch(modified, "*.nntxt"):
            msg = nnabla_proto_to_json(modified)

        elif fnmatch.fnmatch(modified, "*.series.txt") or fnmatch.fnmatch(modified, "*.result.csv"):
            with open(modified, "r") as f:
                msg = f.read()
        else:
            return

        self.dataInfo[index] = {"name": os.path.basename(modified), "path": modified, "data": msg}

        self.set_send_info(index)

    def on_deleted(self, event):
        deleted = event.src_path
        index = os.path.relpath(deleted, self.logdir)

        if index in self.dataInfo.keys():
            self.dataInfo[index] = {"name": os.path.basename(deleted), "path": deleted, "data": "delete"}
            self.set_send_info(index)
