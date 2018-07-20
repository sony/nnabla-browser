import argparse
from flask import Flask, Blueprint, render_template
import os

blueprint = Blueprint

app = Flask(__name__, template_folder="./editor", static_folder="./editor")


def get_args():
    args = argparse.ArgumentParser()
    args.add_argument("--port", "-p", default=8888, type=int)

    return args.parse_args()


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    args = get_args()

    app.run(debug=True, port=args.port)
