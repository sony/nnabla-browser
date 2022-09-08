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

from __future__ import print_function

import fnmatch
import importlib
import inspect
import os
import re

import nnabla as nn
import yaml
from nnabla.logger import logger
from nnabla.utils.download import get_data_home

version_digits = nn.__version__.split(".")[:3]
NNABLA_VERSION = f"v{version_digits[0]}.{version_digits[1]}.{version_digits[2]}"

YAML_PATH = {
    "functions": os.path.join(
        get_data_home(), f"browser/{NNABLA_VERSION}/functions.yaml"
    )
}


def init_functions_yaml():
    try:
        functions_yaml_path = YAML_PATH["functions"]
        if not os.path.exists(functions_yaml_path):
            logger.info(
                "functions.yaml for nnabla=%s is not found.", NNABLA_VERSION
            )

            nnabla_core_root = os.path.dirname(functions_yaml_path)
            os.makedirs(nnabla_core_root, exist_ok=True)

            import requests

            url = f"https://raw.github.com/sony/nnabla/{NNABLA_VERSION}/build-tools/code_generator/functions.yaml"

            logger.info("Downloading nnabla API list from %s.", url)
            r = requests.get(url)

            with open(functions_yaml_path, "wb") as f:
                f.write(r.content)

    except Exception as e:
        raise FileNotFoundError(
            "functions.yaml is not found and also cannot be downloaded from https://github.com/sony/nnabla."
            "Please make sure your internet connection is valid."
        ) from e


def _snake_to_camel(string):
    return re.sub("_(.)", lambda x: x.group(1).upper(), string)


def _camel_to_snake(string):
    return re.sub("([A-Z])", lambda x: "_" + x.group(1).lower(), string)


def get_normalized_snake_name(snake_name):
    if fnmatch.fnmatch(snake_name, "*relu*"):
        # exception
        return snake_name.replace("relu", "ReLU")

    if fnmatch.fnmatch(snake_name, "*elu*"):
        return snake_name.replace("elu", "ELU")

    return snake_name


def get_color(layer_name, default_color, activations):
    layer_name = layer_name.lower()
    if fnmatch.fnmatch(layer_name, "*pooling*"):
        return "#a58e7f"

    if layer_name in activations:
        return "#d77b6a"

    return default_color


def get_all_function_api_definitions(
    module_name, default_color, api_type, activations, ignores=None
):
    module = importlib.import_module(module_name)

    def predicate(value):
        if inspect.isfunction(value):
            if value.__module__ == module_name:
                return True

        return False

    all_functions = inspect.getmembers(module, predicate)
    ret = {}

    for snake_name, func in all_functions:
        if ignores is not None and snake_name in ignores:
            continue

        snake_name = get_normalized_snake_name(snake_name.lower())
        camel_name = _snake_to_camel(snake_name)
        layer_name = camel_name[0].upper() + camel_name[1:]

        sig = inspect.signature(func)

        # parse parameters
        inputs = {}
        arguments = {}
        for param_name, param in sig.parameters.items():
            if param.default == inspect.Parameter.empty:
                # inputs
                inputs[param_name] = {"optional": "False"}
            else:
                arguments[param_name] = {
                    "default": "None"
                    if param.default is None
                    else str(param.default),
                    "type": type(param.default).__name__,
                    "optional": "True",
                }

        function_info = {
            "layer_name": layer_name,
            "snake_name": snake_name,
            "color": get_color(layer_name, default_color, activations),
            "api_type": f"{api_type}_api",
            "inputs": inputs,
            "arguments": arguments,
        }

        ret[layer_name] = function_info

    return ret


def parse_function_APIs():
    # get activation list
    with open(YAML_PATH["functions"], "r") as f:
        yaml_obj = yaml.load(f, Loader=yaml.FullLoader)
    activations = [
        x["snake_name"]
        for x in yaml_obj["Neural Network Activation Functions"].values()
    ]

    # nnabla.parametric_functions
    p_functions = get_all_function_api_definitions(
        "nnabla.parametric_functions",
        "#6aa1bd",
        "parametric_functions",
        activations,
        ignores=["parametric_function_api"],
    )

    # nnabla.functions
    functions = get_all_function_api_definitions(
        "nnabla.function_bases", "#848484", "functions", activations
    )

    # remove deprecated (priority order is parametric_functions > functions > function_bases)
    functions.update(
        get_all_function_api_definitions(
            "nnabla.functions", "#d77b6a", "functions", activations
        )
    )
    keys = list(functions.keys())
    for key in keys:
        if key in p_functions:
            functions.pop(key)

    return p_functions, functions


def create_variable_info():
    # input and output
    return {
        "input": {
            "layer_name": "InputVariable",
            "snake_name": "input",
            "color": "#000000",
            "arguments": {},
        },
        "output": {
            "layer_name": "OutputVariable",
            "snake_name": "output",
            "color": "#000000",
            "arguments": {},
        },
        "parameter": {
            "layer_name": "Parameter",
            "snake_name": "parameter",
            "color": "#000000",
            "arguments": {},
        },
    }


def parse_all():
    p_functions, functions = parse_function_APIs()
    variables = create_variable_info()

    return {
        "parametric_functions": p_functions,
        "functions": functions,
        "variables": variables,
    }
