import os
import fnmatch
import glob

from watchdog.events import FileSystemEventHandler
from google.protobuf import text_format, json_format
from nnabla.utils import nnabla_pb2
from multiprocessing import Lock

from nnabla.logger import logger


def check_directory_supervised(rel_path, keys):
    for key in keys:
        if fnmatch.fnmatch(key, "{}*".format(rel_path)):
            return True

    return False


def nnabla_proto_to_json(file_path):
    proto = nnabla_pb2.NNablaProtoBuf()

    with open(file_path, "r") as f:
        text_format.Merge(f.read(), proto)

    return json_format.MessageToJson(proto)


def check_file_extension(filepath):
    patterns = ["*.nntxt", "*.series.txt", "*.result.csv"]

    for pattern in patterns:
        if fnmatch.fnmatch(filepath, pattern):
            return True

    return False


def get_directory_tree_recursive(path):
    current = []

    files = glob.glob(os.path.join(path, "*"))

    for file in files:
        if os.path.isdir(file):
            current += get_directory_tree_recursive(file)
        else:
            if check_file_extension(file):
                current.append(os.path.relpath(file))

    return current


def get_file_content(path):
    if fnmatch.fnmatch(path, "*.nntxt"):
        return nnabla_proto_to_json(path)
    elif fnmatch.fnmatch(path, "*.series.txt") or fnmatch.fnmatch(path, "*.result.csv"):
        with open(path, "r") as f:
            data = f.read()

        return data

    return ""


def initialize_send_queue(path_list, base_path):
    ret = []

    for path in path_list:
        send_info = {"path": os.path.relpath(path, base_path),
                     "data": get_file_content(path)}
        ret.append(send_info)

    return ret


class Monitor(FileSystemEventHandler):
    def __init__(self, logdir, send_manager, directory_manager):
        super(Monitor, self).__init__()
        self.logdir = logdir

        # {flag: boolean, targets: list of accessed browser indexes}
        self.send_manager = send_manager

        self.directory_manager = directory_manager

    def set_send_queue(self, path):
        send_info = {"path": os.path.relpath(path, self.logdir),
                     "data": get_file_content(path)}

        with Lock():
            num_access = len(self.send_manager)
            for i in range(num_access):
                self.send_manager[i].append(send_info)

    def on_created(self, event):
        self.set_send_queue(event.src_path)

    def on_modified(self, event):
        self.set_send_queue(event.src_path)

    def on_deleted(self, event):
        pass
        # if event.is_directory:
        #     # directory deleted event
        #     pass
        # else:
        #     if check_directory_supervised(rel_path, self.dataInfo.keys()):
        #         self.set_send_info(deleted, "delete")


