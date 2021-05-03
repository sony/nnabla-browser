import fnmatch
import glob
import os
import time
import zipfile
from multiprocessing import Lock

from google.protobuf import json_format, text_format
from nnabla.utils import nnabla_pb2
from watchdog.events import FileSystemEventHandler


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
    send_info = {
        "path": None,
        "event": "initDirectoryStructure",
        "data": "\n".join([os.path.relpath(x, base_path) for x in path_list]),
    }

    # return as list
    return [
        send_info,
    ]


class Monitor(FileSystemEventHandler):
    def __init__(
        self,
        logdir,
        send_manager,
        directory_manager,
        sse_updates,
        update_interval=10,
    ):
        super().__init__()
        self.logdir = logdir

        self.send_manager = send_manager
        self.directory_manager = directory_manager
        self.sse_updates = sse_updates

        # store modified timestamp to skip consecutive events in a short time
        self.update_interval = update_interval  # second
        self.file_modified_timestamp = {}

    def set_send_queue(self, abs_path, action):

        data = get_file_content(abs_path) if action == "fileContent" else None

        if data == "":
            return

        send_info = {
            "path": os.path.relpath(abs_path, self.logdir),
            "event": action,
            "data": data,
        }

        with Lock():
            num_access = len(self.send_manager)
            if len(self.sse_updates) != num_access:
                # Some of managed lists might be staled. Skip to send data to client.
                return

            for i in range(num_access):
                # check if the updated file is registerd as sse target.
                if action == "fileContent" and not self.sse_updates[i].get(
                    abs_path, False
                ):
                    continue

                self.send_manager[i] = self.send_manager[i] + [
                    send_info,
                ]

    def on_created(self, event):
        abs_path = os.path.abspath(event.src_path)
        self.directory_manager += [
            abs_path,
        ]

        self.file_modified_timestamp[abs_path] = 0  # init time by 0

        # Send name only
        self.set_send_queue(abs_path, "directoryStructure")

    def on_modified(self, event):
        modified_time = time.time()
        abs_path = os.path.abspath(event.src_path)

        # Send name only
        last_modified = self.file_modified_timestamp.get(abs_path, 0)
        if modified_time - last_modified > self.update_interval:
            self.file_modified_timestamp[abs_path] = modified_time
            self.set_send_queue(abs_path, "fileContent")

    def on_deleted(self, event):
        abs_path = os.path.relpath(event.src_path)

        if abs_path in self.directory_manager:
            index = self.directory_manager.index(abs_path)
            self.directory_manager = (
                self.directory_manager[:index]
                + self.directory_manager[index + 1 :]
            )

        self.set_send_queue(abs_path, "delete")
