import time
import argparse
import subprocess
import json
import os

import gevent
from gevent.pywsgi import WSGIServer
import werkzeug.serving
from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.datastructures import Headers
from flask import Flask, render_template, Response, send_file, jsonify

from multiprocessing import Pool, Manager, Lock
from watchdog.observers import Observer

from nnabla.logger import logger

# need to make it beutiful
from directory_monitoring import Monitor, get_directory_tree_recursive, initialize_send_queue
from parse_nnabla_function import parse_all
from utils import sse_msg_encoding, str_to_bool
# from nnabla_browser.directory_monitoring import Monitor, get_directory_tree_recursive, initialize_send_queue
# from nnabla_browser.parse_nnabla_function import create_nnabla_core_js
# from nnabla_browser.utils import sse_msg_encoding, str_to_bool

# flask application
# TODO: fix directory paths
root_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
template_path = os.path.join(root_path, 'front/dist')
static_path = os.path.join(root_path, 'front/dist/static')
app = Flask(__name__,
            template_folder=template_path,
            static_folder=static_path)

# shared manager
manager = Manager()
send_manager = manager.list()
directory_manager = manager.list()

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


def check_and_create_logdir(logdir):
    if not os.path.exists(logdir):
        ans = str(
            input(
                "{} dose not exist. Would you like to create new directory? [y/N]:"
                .format(logdir)))
        if ans.strip().lower() in ["y", "yes"]:
            os.makedirs(logdir)
        else:
            logger.error("Directory dose not exist ({}).".format(logdir))
            return False

    return True

def create_supervise_process(logdir):
    def supervise(_send_manager, _directory_manager):
        monitor = Monitor(logdir=logdir,
                          send_manager=_send_manager,
                          directory_manager=_directory_manager)

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

def allow_cors(response):
    if app.env == "development":
            # allow CORS access to enalbe SSE between npm and flask
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8000'
            response.headers['Access-Control-Allow-Credentials'] = 'true'

    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")


@app.route("/subscribe/image/<path:path>.png")
def get_image(path):
    file_path = "/" + path + ".png"

    return send_file(file_path, mimetype='image/png')

@app.route("/subscribe/nnabla-api")
def get_nnabla_api():
    response = jsonify(json.dumps(parse_all()))

    return allow_cors(response)

def create_subscribe_response(communication_interval, base_path):
    @app.route('/sse')
    def sse():
        def send():
            # init
            global send_manager
            with Lock():
                idx = len(send_manager)
                send_manager.insert(
                    idx, initialize_send_queue(directory_manager, base_path))

            try:
                while True:
                    if len(send_manager[idx]) > 0:
                        with Lock():
                            info = send_manager[idx][0]
                            send_manager[idx] = send_manager[idx][1:]
                            yield sse_msg_encoding(str(info["data"]),
                                                   _id=str(info["path"]),
                                                   _event=str(info["action"]))

                    gevent.sleep(communication_interval)

            except GeneratorExit:
                pass

        res = Response(send(), mimetype="text/event-stream")

        return allow_cors(res)


def run_server(port):
    # An implementation for hot reloading
    # For only server it looks good, but server client connection especially SSE action is unstable.
    # - Only one SSE connection is available. Once hot reloaded, sse connection is down and never recorvered.
    # 
    #  
    # from werkzeug import run_simple

    # use_reloader = False
    # use_debugger = False
    # if app.env == 'development':
    #     app.debug = True
    #     use_reloader = True
    #     use_debugger = True

    # app.wsgi_app = ProxyFix(app.wsgi_app)

    # print("open server : {}".format(port))

    # run_simple(
    #     hostname="localhost",
    #     port=int(port),
    #     application=app,
    #     use_reloader=use_reloader,
    #     use_debugger=use_debugger,
    # )

    print("open server : {}".format(port))
    app.wsgi_app = ProxyFix(app.wsgi_app)
    server = WSGIServer(("0.0.0.0", port), app)
    server.serve_forever()

def main():
    args = get_args()

    # check if logdir exists
    logdir = os.path.abspath(args.logdir)
    if not check_and_create_logdir(logdir):
        return

    # init directory_manager
    global directory_manager
    directory_manager += get_directory_tree_recursive(logdir)

    global send_manager

    # Start ovserving directory 
    with Pool(1) as p:
        p.Process(target=create_supervise_process(logdir),
                  args=[send_manager, directory_manager]).start()

    # Setup sse server
    create_subscribe_response(args.communication_interval, logdir)

    # Launch
    run_server(args.port)



if __name__ == '__main__':
    main()
