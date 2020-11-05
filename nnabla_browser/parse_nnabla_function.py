from __future__ import print_function

import os
import fnmatch
import re
import yaml
from json import dumps
import inspect
import importlib

# it`s too dirty...
YAML_PATH = {
    "functions": os.path.join(os.path.abspath(os.path.dirname(__file__)), "nnabla_core", "functions.yaml")
}


def get_activation_list():
    with open(YAML_PATH["functions"], "r") as f:
        yaml_obj = yaml.load(f)

    activations = [x["snake_name"] for x in yaml_obj["Neural Network Activation Functions"].values()]

    return activations


_activations = get_activation_list()


def _snake_to_camel(string):
    return re.sub("_(.)", lambda x: x.group(1).upper(), string)


def _camel_to_snake(string):
    return re.sub("([A-Z])", lambda x: "_" + x.group(1).lower(), string)


def treat_name_exception(snake_name):
    if fnmatch.fnmatch(snake_name, "*relu*"):
        # exception
        return snake_name.replace("relu", "ReLU")

    if fnmatch.fnmatch(snake_name, "*elu*"):
        return snake_name.replace("elu", "ELU")

    return snake_name


def get_color(layer_name, default_color):
    layer_name = layer_name.lower()
    if fnmatch.fnmatch(layer_name, "*pooling*"):
        return "#a58e7f"

    if layer_name in _activations:
        return "#d77b6a"

    return default_color


def get_all_function_api_definitions(module_name, default_color, api_type, ignores=None):
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

        snake_name = treat_name_exception(snake_name.lower())
        camel_name = _snake_to_camel(snake_name)
        layer_name = camel_name[0].upper() + camel_name[1:]

        sig = inspect.signature(func)

        # parse parameters
        inputs = {}
        arguments = {}
        for param_name, param in sig.parameters.items():
            if param.default == inspect.Parameter.empty:
                # inputs
                inputs[param_name] = {"optional": False}
            else:
                arguments[param_name] = {"default": "None" if param.default is None else param.default,
                                         "type": type(param.default).__name__,
                                         "optional": True}

        function_info = {
            "layer_name": layer_name,
            "snake_name": snake_name,
            "color": get_color(layer_name, default_color),
            "api_type": "{}_api".format(api_type),
            "inputs": inputs,
            "arguments": arguments
        }

        ret[layer_name] = function_info

    return ret


def parse_function_APIs():
    # nnabla.parametric_functions
    p_functions = get_all_function_api_definitions("nnabla.parametric_functions", "#6aa1bd",
                                                   "parametric_functions",
                                                   ignores=["parametric_function_api"])

    # nnabla.functions
    functions = get_all_function_api_definitions("nnabla.function_bases", "#848484", "functions")

    # remove deprecated (priority order is parametric_functions > functions > function_bases)
    functions.update(get_all_function_api_definitions("nnabla.functions", "#d77b6a", "functions"))
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
            "arguments": {}
        },
        "output": {
            "layer_name": "OutputVariable",
            "snake_name": "output",
            "color": "#000000",
            "arguments": {}
        }
    }


def parse_all():
    p_functions, functions = parse_function_APIs()
    variables = create_variable_info()

    return {"parametric_functions": p_functions, "functions": functions, "variables": variables}


def create_nnabla_core_js(out_path):
    with open(out_path, "w") as f:
        print("const nnablaCore = " + dumps(parse_all(), indent=2)
              + ";\n export default nnablaCore;", file=f)