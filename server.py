import time
import argparse
import subprocess
import json
import os

import gevent
from gevent.wsgi import WSGIServer
from werkzeug.contrib.fixers import ProxyFix
from flask import Flask, render_template, Response, send_file

from multiprocessing import Pool, Manager, Lock
from watchdog.observers import Observer

from include.directory_monitoring import Monitor
from include.server_sent_event import ServerSentEvent
from include.parse_nnabla_function import create_nnabla_core_js


parser = argparse.ArgumentParser()
parser.add_argument("--port", "-p", default=8888, type=int)
parser.add_argument("--logdir", "-d", default="./logdir", type=str)
parser.add_argument("--communication_interval", "-c", default=0.1, type=float)
parser.add_argument("--build", "-b", default=False, type=float)

args = parser.parse_args()

if args.build:
    # create nnablaCore.js
    output_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "editor/js/nnablaCore.js")
    create_nnabla_core_js(output_path)

    # build
    subprocess.call("npm run build".split(" "))
    # subprocess.call("npm run build-nnploader".split(" "))

app = Flask(__name__, template_folder="./editor", static_folder="./editor")


# check if logdir exists
logdir = os.path.abspath(args.logdir)
if not os.path.exists(logdir):
    os.makedirs(logdir)

manager = Manager()
send_flags = manager.list()
D = manager.dict()
path_maps = manager.dict()


def supervise(shared_dict, send_flags, path_maps):
    monitor = Monitor(logdir=logdir, shared_dict=shared_dict, send_flags=send_flags)
    path_maps.update(monitor.path_maps)

    observer = Observer()
    observer.schedule(monitor, monitor.logdir, recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()


p = Pool(1)
p.Process(target=supervise, args=[D, send_flags, path_maps]).start()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/subscribe")
def subscribe():
    def send():
        # send dir tree information
        ev = ServerSentEvent(json.dumps(dict(path_maps)), _id="pathMap")
        yield ev.msg_encode()

        initial_send_info = {"flag": len(D.keys()) > 0, "targets": list(D.keys())}
        with Lock():
            info_index = len(send_flags)
            send_flags.insert(info_index, initial_send_info)

        try:
            while True:
                if send_flags[info_index]["flag"]:
                    with Lock():
                        targets = send_flags[info_index]["targets"]
                        if len(targets) > 0:
                            idx = targets[0]
                            target = D[idx]
                            ev = ServerSentEvent(str(target["data"]), _id=str(idx))

                            updated = targets[1:]

                            send_flags[info_index] = {"flag": len(updated) > 0,
                                                      "targets": updated}

                            yield ev.msg_encode()

                        else:
                            send_flags[info_index] = {"flag": False, "targets": []}

                gevent.sleep(args.communication_interval)

        except GeneratorExit:
            pass

    return Response(send(), mimetype="text/event-stream")


@app.route("/subscribe/image/<path:path>.png")
def get_image(path):

    file_path = "/" + path + ".png"

    # file = open(file_path, "rb").read()

    return send_file(file_path, mimetype='image/png')


print("open server : {}".format(args.port))
app.wsgi_app = ProxyFix(app.wsgi_app)
server = WSGIServer(("0.0.0.0", args.port), app)
server.serve_forever()

p.close()
