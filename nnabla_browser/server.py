import time
import argparse
import subprocess
import json
import os

import gevent
from gevent.pywsgi import WSGIServer
from werkzeug.contrib.fixers import ProxyFix
from flask import Flask, render_template, Response, send_file, jsonify

from multiprocessing import Pool, Manager, Lock
from watchdog.observers import Observer

from nnabla.logger import logger

from nnabla_browser.directory_monitoring import Monitor, get_directory_tree_recursive, initialize_send_queue
from nnabla_browser.parse_nnabla_function import create_nnabla_core_js
from nnabla_browser.utils import sse_msg_encoding, str_to_bool

# flask application
# TODO: fix directory paths
template_path = os.path.join(os.path.dirname(__file__), '..', 'front')
app = Flask(__name__, template_folder=template_path, static_folder=template_path)

# shared manager
manager = Manager()
send_manager = manager.list()
directory_manager = manager.list()


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", "-p", default=8888, type=int)
    parser.add_argument("--logdir", "-d", default="./logdir", type=str)
    parser.add_argument("--communication_interval", "-c", default=0.1, type=float)
    parser.add_argument("--build", "-b", default=False, type=str_to_bool)

    args = parser.parse_args()

    return args


# TODO: remove this command since the distributed version shoule be already built
def build():
    # create nnablaCore.js
    output_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), '..', "front/lib/js/nnablaCore.js")
    create_nnabla_core_js(output_path)

    # build
    subprocess.call("npm run --prefix ../ build ".split(" "))


def check_and_create_logdir(logdir):
    if not os.path.exists(logdir):
        ans = str(input("{} dose not exist. Would you like to create new directory? [y/N]:".format(logdir)))
        if ans.strip().lower() in ["y", "yes"]:
            os.makedirs(logdir)
        else:
            logger.error("Directory dose not exist ({}).".format(logdir))
            return False

    return True


def create_supervise_process(logdir):
    def supervise(_send_manager, _directory_manager):
        monitor = Monitor(logdir=logdir, send_manager=_send_manager, directory_manager=_directory_manager)

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


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/subscribe/image/<path:path>.png")
def get_image(path):
    file_path = "/" + path + ".png"

    return send_file(file_path, mimetype='image/png')


def create_subscribe_response(communication_interval, base_path):
    @app.route('/subscribe')
    def subscribe():
        def send():
            # init
            global send_manager
            with Lock():
                idx = len(send_manager)
                send_manager.insert(idx, initialize_send_queue(directory_manager, base_path))

            try:
                while True:
                    if len(send_manager[idx]) > 0:
                        with Lock():
                            info = send_manager[idx][0]
                            send_manager[idx] = send_manager[idx][1:]
                            yield sse_msg_encoding(str(info["data"]), _id=str(info["path"]), _event=str(info["action"]))

                    gevent.sleep(communication_interval)

            except GeneratorExit:
                pass

        return Response(send(), mimetype="text/event-stream")


def main():
    args = get_args()

    if args.build:
        build()

    # check if logdir exists
    logdir = os.path.abspath(args.logdir)
    if not check_and_create_logdir(logdir):
        return

    # init directory_manager
    global directory_manager
    directory_manager += get_directory_tree_recursive(logdir)

    global send_manager

    with Pool(1) as p:

        p.Process(target=create_supervise_process(logdir), args=[send_manager, directory_manager]).start()

        create_subscribe_response(args.communication_interval, logdir)

        print("open server : {}".format(args.port))
        app.wsgi_app = ProxyFix(app.wsgi_app)
        server = WSGIServer(("0.0.0.0", args.port), app)
        server.serve_forever()


if __name__ == '__main__':
    main()
