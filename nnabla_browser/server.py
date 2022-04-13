# Copyright 2020,2021 Sony Corporation.
# Copyright 2021,2022 Sony Group Corporation.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse
import os
import time
from multiprocessing import Lock, Manager, Process

import gevent
from flask import Flask, Response, jsonify, render_template, request, send_file
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
from watchdog.observers import Observer
from werkzeug.middleware.proxy_fix import ProxyFix

from .directory_monitoring import (
    Monitor,
    get_directory_tree_recursive,
    get_file_content,
    initialize_send_queue,
)
from .parse_nnabla_function import init_functions_yaml, parse_all
from .utils import (
    allow_cors,
    check_and_create_logdir,
    dict_to_response,
    encode_msg,
)

# flask application
template_path = os.path.join(os.path.dirname(__file__), "dist")
static_path = os.path.join(os.path.dirname(__file__), "dist/static")
app = Flask(__name__, template_folder=template_path, static_folder=static_path)
app.config["USER"] = {}

if app.env == "development":
    CORS(app)

# shared manager
manager = Manager()
send_manager = manager.list()
directory_manager = manager.list()
sse_updates = manager.list()
free_idx = manager.Queue()


def create_supervise_process(logdir):
    def supervise(_send_manager, _directory_manager, _sse_updates):
        monitor = Monitor(
            logdir=logdir,
            send_manager=_send_manager,
            directory_manager=_directory_manager,
            sse_updates=_sse_updates,
            update_interval=app.config["USER"]["UPDATE_INTERVAL"],
        )

        observer = Observer(timeout=5)
        observer.schedule(monitor, monitor.logdir, recursive=True)
        observer.start()

        try:
            while True:
                time.sleep(10)
        except KeyboardInterrupt:
            observer.stop()
        observer.join()

    return supervise


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")


@app.route("/subscribe/image/<path:path>.png")
def get_image(path):
    file_path = "/" + path + ".png"
    return send_file(file_path, mimetype="image/png")


# return nnabla APIs as json
@app.route("/subscribe/nnabla-api")
def get_nnabla_api():
    response = dict_to_response(parse_all())
    return allow_cors(app, response)


# return content of the file as json
@app.route("/subscribe/file-content", methods=["POST"])
def file_content():
    path = os.path.join(app.config["USER"]["LOGDIR"], request.json["path"])
    return get_file_content(path)


# return content of the all files as json
@app.route("/subscribe/file-contents", methods=["POST"])
def file_contents():
    ret = {"contents": []}
    for path in request.json["paths"]:
        full_path = os.path.join(app.config["USER"]["LOGDIR"], path)
        ret["contents"].append(
            {"path": path, "content": get_file_content(full_path)}
        )
    return jsonify(ret)


# set filepath to update in real-time
@app.route("/subscribe/activate-subscribe", methods=["POST"])
def activate_subscribe():
    path = os.path.join(app.config["USER"]["LOGDIR"], request.json["path"])
    connection_id = request.json["connectionId"]
    sse_updates[connection_id] = {**sse_updates[connection_id], path: True}
    return jsonify(success=True)


# unset filepath to update in real-time
@app.route("/subscribe/deactivate-subscribe", methods=["POST"])
def deactivate_subscribe():
    path = os.path.join(app.config["USER"]["LOGDIR"], request.json["path"])
    connection_id = request.json["connectionId"]
    tmp = sse_updates[connection_id]

    if path in tmp:
        del tmp[path]
        sse_updates[connection_id] = tmp

    return jsonify(success=True)


# create SSE connection
@app.route("/sse")
def sse():
    def send():
        # init
        with Lock():
            # Prioritize free idx.
            if free_idx.empty():
                idx = len(send_manager)
            else:
                idx = free_idx.get()

            logdir = app.config["USER"]["LOGDIR"]
            queue = initialize_send_queue(directory_manager, logdir)
            send_manager.insert(idx, queue)
            sse_updates.insert(idx, {})

        # notify connection idx to browser
        yield encode_msg(data=str(idx), event="uniqueId")

        try:
            no_action_count = 0
            while True:
                if len(send_manager[idx]) > 0:
                    with Lock():
                        info = send_manager[idx][0]
                        send_manager[idx] = send_manager[idx][1:]
                        yield encode_msg(
                            data=str(info["data"]),
                            idx=str(info["path"]),
                            event=str(info["event"]),
                        )

                    # After sending a data, wait a short time to prevent too much transfers.
                    gevent.sleep(app.config["USER"]["INTERVAL"])

                else:
                    # If there is no data to send, wait a while.
                    gevent.sleep(5)

                    # If there is no send event for a while, check connection is still alive.
                    no_action_count = (no_action_count + 1) % 12
                    if no_action_count == 0:
                        yield encode_msg(event="checkAlive", data="")
        finally:
            # Free queue for this connection
            # Initialize with empty list to keep order.
            send_manager.insert(idx, [])
            sse_updates.insert(idx, {})
            free_idx.put(idx)

            if app.env == "development":
                print(f"Close connection to {idx}.")

    res = Response(send(), mimetype="text/event-stream")

    return allow_cors(app, res)


def run_server(port):
    print(f"open server : {port}")
    app.wsgi_app = ProxyFix(app.wsgi_app)
    server = WSGIServer(("0.0.0.0", port), app)
    server.serve_forever()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--port",
        "-p",
        default=8888,
        type=int,
        help="Port number to access NNabla Browser.",
    )
    parser.add_argument(
        "--logdir",
        "-d",
        default="./logdir",
        type=str,
        help="Directory path to monitor. All subdirectory will be monitored.",
    )
    parser.add_argument(
        "--communication_interval",
        "-c",
        default=0.1,
        type=float,
        help="Timeout between each server-client data transfer. (second)",
    )
    parser.add_argument(
        "--file_update_interval",
        "-u",
        default=10,
        type=int,
        help="Timeout between each file update action. 10 second in default. (second)",
    )
    args = parser.parse_args()

    # check if logdir exists
    logdir = os.path.abspath(args.logdir)
    if not check_and_create_logdir(logdir):
        return

    # app configuration
    app.config["USER"]["LOGDIR"] = logdir
    app.config["USER"]["INTERVAL"] = args.communication_interval
    app.config["USER"]["UPDATE_INTERVAL"] = args.file_update_interval

    # init directory_manager
    directory_manager.extend(get_directory_tree_recursive(logdir))

    # Start observing directory
    p = Process(
        target=create_supervise_process(logdir),
        args=[send_manager, directory_manager, sse_updates],
        daemon=True,
    )
    p.start()

    # init functions.yaml
    # Note that this function should be called after starting observing directory.
    init_functions_yaml()

    # Launch
    run_server(args.port)


if __name__ == "__main__":
    main()
