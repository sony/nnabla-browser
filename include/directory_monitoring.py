import os
import fnmatch

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
        self.sendManager = send_flags # {flag: boolean, targets: list of connections, each element stands for each connection}

        self.initialize_dict()

    def _create_rel_and_full_path(self, root, filename):
        full_path = os.path.join(root, filename)
        rel_path = os.path.relpath(full_path, self.logdir)

        return rel_path, full_path

    def initialize_dict(self):
        for root, dirs, files in os.walk(self.logdir):
            for file in fnmatch.filter(files, "*.nntxt"):
                rel_path, full_path = self._create_rel_and_full_path(root, file)
                msg = nnabla_proto_to_json(full_path)

                self.dataInfo[rel_path] = {"file_name": file, "path": full_path, "data": msg}

            for file in fnmatch.filter(files, "*.series.txt"):
                rel_path, full_path = self._create_rel_and_full_path(root, file)

                with open(full_path, "r") as f:
                    msg = f.read()

                self.dataInfo[rel_path] = {"file_name": file, "path": full_path, "data": msg}

    def set_send_info(self, target):
        with Lock():
            length = len(self.sendManager)
            for i in range(length):
                self.sendManager[i] = {"flag": True, "targets": self.sendManager[i]["targets"] + [target]}

    def on_created(self, event):
        if event.is_directory:
            pass

    def on_modified(self, event):
        modified = event.src_path

        if fnmatch.fnmatch(modified, "*.nntxt"):
            index = os.path.relpath(modified, self.logdir)
            msg = nnabla_proto_to_json(modified)

            self.dataInfo[index] = {"name": os.path.basename(modified), "path": modified, "data": msg}

            self.set_send_info(index)
        elif fnmatch.fnmatch(modified, "*.series.text"):
            pass

        if event.is_directory:
            pass

    def on_deleted(self, event):
        if event.is_directory:
            pass
