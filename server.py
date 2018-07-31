import time
import argparse
import subprocess

import gevent
from gevent.wsgi import WSGIServer
from flask import Flask, render_template, Response

from multiprocessing import Pool, Manager, Lock
from watchdog.observers import Observer

from include.directory_monitoring import Monitor
from include.server_sent_event import ServerSentEvent

# build
subprocess.call("npm run build".split(" "))
subprocess.call("npm run build-nnploader".split(" "))

app = Flask(__name__, template_folder="./editor", static_folder="./editor")

parser = argparse.ArgumentParser()
parser.add_argument("--port", "-p", default=8888, type=int)
parser.add_argument("--logdir", "-d", default="./logdir", type=str)

args = parser.parse_args()

manager = Manager()
send_flags = manager.list()
D = manager.dict()


def supervise(shared_dict, send_flags):
    monitor = Monitor(logdir=args.logdir, shared_dict=shared_dict, send_flags=send_flags)

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
p.Process(target=supervise, args=[D, send_flags]).start()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/subscribe")
def subscribe():
    def send():
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

                else:
                    gevent.sleep(5)

        except GeneratorExit:
            pass

    return Response(send(), mimetype="text/event-stream")


print("open server : {}".format(args.port))
server = WSGIServer(("", args.port), app)
server.serve_forever()

p.close()
