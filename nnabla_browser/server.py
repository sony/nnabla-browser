import argparse
import os
import subprocess
import time
from multiprocessing import Lock, Manager, Process

import gevent
import werkzeug.serving
from flask import Flask, Response, render_template, request, send_file
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
from watchdog.observers import Observer
from werkzeug.datastructures import Headers
from werkzeug.middleware.proxy_fix import ProxyFix

# need to make it beutiful
from .directory_monitoring import (Monitor, get_directory_tree_recursive,
                                   get_file_content, initialize_send_queue)
from .parse_nnabla_function import parse_all
from .utils import *

# flask application
root_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
template_path = os.path.join(root_path, 'front/dist')
static_path = os.path.join(root_path, 'front/dist/static')
app = Flask(__name__, template_folder=template_path, static_folder=static_path)

if app.env == "development":
    CORS(app)

# shared manager
manager = Manager()
send_manager = manager.list()
directory_manager = manager.list()
sse_updates = manager.list()
free_idx = manager.Queue()

logdir = "./"


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", "-p", default=8888, type=int)
    parser.add_argument("--logdir", "-d", default="./logdir", type=str)
    parser.add_argument("--communication_interval",
                        "-c",
                        default=0.1,
                        type=float)

    args = parser.parse_args()

    return args


def create_supervise_process(logdir):
    def supervise(_send_manager, _directory_manager, _sse_updates):
        monitor = Monitor(logdir=logdir,
                          send_manager=_send_manager,
                          directory_manager=_directory_manager,
                          sse_updates=_sse_updates)

        observer = Observer()
        observer.schedule(monitor, monitor.logdir, recursive=True)
        observer.start()

        try:
            while True:
                time.sleep(10)
        except KeyboardInterrupt:
            observer.stop()
        observer.join()

    return supervise


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")


@app.route("/subscribe/image/<path:path>.png")
def get_image(path):
    file_path = "/" + path + ".png"
    return send_file(file_path, mimetype='image/png')


# return nnabla APIs as json
@app.route("/subscribe/nnabla-api")
def get_nnabla_api():
    response = dict_to_response(parse_all())
    return allow_cors(app, response)


# return content of the file as json
@app.route("/subscribe/file-content", methods=["POST"])
def file_content():
    global logdir
    path = os.path.join(logdir, request.json["path"])

    return get_file_content(path)


# set filepath to update in real-time
@app.route("/subscribe/activate-subscribe", methods=["POST"])
def activate_subscribe():
    global logdir
    global sse_updates
    path = os.path.join(logdir, request.json["path"])
    connection_id = request.json["connectionId"]

    sse_updates[connection_id] = {**sse_updates[connection_id], path: True}

    return jsonify(success=True)


# unset filepath to update in real-time
@app.route("/subscribe/deactivate-subscribe", methods=["POST"])
def deactivate_subscribe():
    global logdir
    global sse_updates
    path = os.path.join(logdir, request.json["path"])
    connection_id = request.json["connectionId"]

    tmp = sse_updates[connection_id]

    if path in tmp:
        del tmp[path]
        sse_updates[connection_id] = tmp

    return jsonify(success=True)


# create SSE connection
def create_subscribe_response(communication_interval, base_path):
    @app.route('/sse')
    def sse():
        def send():
            # init
            global send_manager
            with Lock():
                # Prioritize free idx.
                if free_idx.empty():
                    idx = len(send_manager)
                else:
                    idx = free_idx.get()

                send_manager.insert(
                    idx, initialize_send_queue(directory_manager, base_path))
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
                            yield encode_msg(data=str(info["data"]),
                                             id=str(info["path"]),
                                             event=str(info["event"]))

                        # After sending a data, wait a short time to prevent too much transfers.
                        gevent.sleep(communication_interval)

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
                send_manager[idx].insert(idx, [])
                sse_updates.insert(idx, {})
                free_idx.put(idx)

                if app.env == "development":
                    print(f"Close connection to {idx}.")

        res = Response(send(), mimetype="text/event-stream")

        return allow_cors(app, res)


def run_server(port):
    print("open server : {}".format(port))
    app.wsgi_app = ProxyFix(app.wsgi_app)
    server = WSGIServer(("0.0.0.0", port), app)
    server.serve_forever()


def main():
    args = get_args()

    # check if logdir exists
    global logdir
    logdir = os.path.abspath(args.logdir)
    if not check_and_create_logdir(logdir):
        return

    # init directory_manager
    global directory_manager
    directory_manager += get_directory_tree_recursive(logdir)

    global send_manager

    # Start ovserving directory
    p = Process(target=create_supervise_process(logdir),
                args=[send_manager, directory_manager, sse_updates],
                daemon=True)
    p.start()

    # Setup sse server
    create_subscribe_response(args.communication_interval, logdir)

    # Launch
    run_server(args.port)


if __name__ == '__main__':
    main()
