import os
import fnmatch
import glob
import zipfile

from watchdog.events import FileSystemEventHandler
from google.protobuf import text_format, json_format
from nnabla.utils import nnabla_pb2
from multiprocessing import Lock

from nnabla.logger import logger


def nnabla_proto_to_json(file_path):
    proto = nnabla_pb2.NNablaProtoBuf()

    if fnmatch.fnmatch(file_path, "*.nntxt"):
        with open(file_path, "r") as f:
            text_format.Merge(f.read(), proto)
    else:
        with zipfile.ZipFile(file_path, "r") as zf:
            nntxt_file_list = fnmatch.filter(zf.namelist(), "*.nntxt")
            if len(nntxt_file_list) > 0:
                with zf.open(nntxt_file_list[0]) as f:
                    text_format.Merge(f.read(), proto)
            else:
                return ""

    return json_format.MessageToJson(proto)


def check_file_extension(filepath):
    patterns = ["*.nntxt", "*.nnp", "*.series.txt"]

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
                current.append(os.path.abspath(file))

    return current


def get_file_content(path):
    if fnmatch.fnmatch(path, "*.nntxt") or fnmatch.fnmatch(path, "*.nnp"):
        return nnabla_proto_to_json(path)
    elif fnmatch.fnmatch(path, "*.series.txt"):
        with open(path, "r") as f:
            data = f.read()

        return data

    return ""


def initialize_send_queue(path_list, base_path):
    ret = []

    for path in path_list:
        send_info = {
            "path": os.path.relpath(path, base_path),
            "action": "add",
            "data": get_file_content(path)
        }
        ret.append(send_info)

    return ret


class Monitor(FileSystemEventHandler):
    def __init__(self, logdir, send_manager, directory_manager):
        super(Monitor, self).__init__()
        self.logdir = logdir

        # {flag: boolean, targets: list of accessed browser indexes}
        self.send_manager = send_manager

        self.directory_manager = directory_manager

    def set_send_queue(self, abs_path, action):

        data = get_file_content(abs_path) if action == "add" else None

        if data == "":
            return

        send_info = {
            "path": os.path.relpath(abs_path, self.logdir),
            "action": action,
            "data": data
        }

        with Lock():
            num_access = len(self.send_manager)
            for i in range(num_access):
                self.send_manager[i] = self.send_manager[i] + [
                    send_info,
                ]

    def on_created(self, event):
        abs_path = os.path.abspath(event.src_path)
        self.directory_manager += [
            abs_path,
        ]

        self.set_send_queue(abs_path, "add")

    def on_modified(self, event):
        abs_path = os.path.abspath(event.src_path)
        self.set_send_queue(abs_path, "add")

    def on_deleted(self, event):
        abs_path = os.path.relpath(event.src_path)

        if abs_path in self.directory_manager:
            index = self.directory_manager.index(abs_path)
            self.directory_manager = self.directory_manager[:
                                                            index] + self.directory_manager[
                                                                index + 1:]

        self.set_send_queue(abs_path, "delete")
