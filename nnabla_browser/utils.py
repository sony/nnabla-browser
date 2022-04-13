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

import json
import os

from flask import jsonify
from nnabla.logger import logger


def encode_msg(data=None, event=None, idx=None):
    maps = [("event", event), ("id", idx), ("data", data)]

    ret = []
    for k, v in maps:
        if v is None:
            continue

        for line in v.split("\n"):
            ret.append(f"{k}: {line}")

    msg = "\n".join(ret)

    return f"{msg}\n\n"


def allow_cors(app, response):
    if app.env == "development":
        # allow CORS access to enalbe SSE between npm and flask
        response.headers[
            "Access-Control-Allow-Origin"
        ] = "http://localhost:8000"
        response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


def dict_to_response(obj):
    return jsonify(json.dumps(obj))


def check_and_create_logdir(logdir):
    if not os.path.exists(logdir):
        ans = str(
            input(
                f"{logdir} dose not exist. Would you like to create new directory? [y/N]:"
            )
        )
        if ans.strip().lower() in ["y", "yes"]:
            os.makedirs(logdir)
        else:
            logger.error("Directory dose not exist %s.", logdir)
            return False
    return True
