from __future__ import print_function

import nnabla as nn
import os
import fnmatch
import re
import yaml
from json import dumps


def _snake_to_camel(string):
    return re.sub("_(.)", lambda x: x.group(1).upper(), string)


def _camel_to_snake(string):
    return re.sub("([A-Z])", lambda x: "_" + x.group(1).lower(), string)


def create_nntxt_name(function_name):
    pass


def _get_color_by_category(category):
    color_list = {
        "Neural Network Layer": "0xa58e7f",
        "Neural Network Activation Functions": "0xd77b6a",
        "Arithmetic": "0x848484"
    }

    if category in color_list.keys():
        return color_list[category]
    else:
        return "0xc0c0c0"


def get_all_function_api_definitions(path, default_color, type):
    with open(path, "r") as f:
        lines = f.readlines()

    ret = []
    flag = False
    definition = ""

    for line in lines:
        if fnmatch.fnmatch(line, "def *(*"):
            flag = True

        if flag:
            line = line.strip()
            definition += line
            if not fnmatch.fnmatch(line, "*:"):
                continue

            func_def = definition[4:-2]
            function_name, args_def = func_def.split("(", maxsplit=1)
            layer_color = default_color
            if type == "functions" and fnmatch.fnmatch(function_name.lower(), "*pooling*"):
                layer_color = "0xa58e7f"

            if function_name != "parametric_function_api":
                inputs = {}
                arguments = {}
                for arg in args_def.split(","):
                    split = arg.strip().split("=")

                    # arguments
                    if len(split) > 1:
                        arguments[split[0]] = {"default": split[1], "optional": True}
                    else:
                        inputs[split[0]] = {"optional": False}

                camel = _snake_to_camel(function_name)
                layer_name = camel[0].upper() + camel[1:]

                function_info = {
                    "layer_name": layer_name,
                    "snake_name": _camel_to_snake(function_name),
                    "color": layer_color,
                    "api_type": type + "_api",
                    "inputs": inputs,
                    "arguments": arguments
                }

                ret.append(function_info)

            definition = ""
            flag = False
        else:
            continue

    return ret


def parse_function_APIs():
    user_nnabla_path = nn.__path__[0]

    functions_path = os.path.join(user_nnabla_path, "functions.py")
    functions = get_all_function_api_definitions(functions_path, default_color="0xd77b6a", type="functions")

    p_functions_path = os.path.join(user_nnabla_path, "parametric_functions.py")
    p_functions = get_all_function_api_definitions(p_functions_path, default_color="0x6aa1bd",
                                                   type="parametric_functions")

    # remove deprecated (parametric functions have high priority)
    ret = p_functions
    name_list = [x["snake_name"] for x in p_functions]

    for function in functions:
        if function["snake_name"] not in name_list:
            ret.append(function)

    return ret


def parse_yaml(yaml_path):
    function_apis = parse_function_APIs()

    api_name_list = [x["snake_name"] for x in function_apis]

    with open(yaml_path, "r") as f:
        yaml_obj = yaml.load(f)

    ret = {"base_functions": {}, "functions_api": {}, "parametric_functions_api": {}, "variables": {}}

    def recursive(obj, result, depth, category):
        for key, value in obj.items():
            if depth == 1:
                if value["snake_name"] in api_name_list:
                    continue

                result[key] = {"layer_name": key, "color": _get_color_by_category(category)}
            else:
                if key == "doc":
                    continue

                result[key] = {}

            if isinstance(value, dict):
                if not recursive(value, result[key], depth=depth + 1, category=key if depth == 0 else None):
                    result[key] = {"parameter": False}
            else:
                result[key] = value

        return False if len(result.values()) < 1 else True

    recursive(yaml_obj, ret["base_functions"], depth=0, category=None)

    for function_api in function_apis:
        ret[function_api["api_type"]][function_api["layer_name"]] = function_api

    # input and output
    ret["variables"]["input"] = {
                    "layer_name": "InputVariable",
                    "snake_name": "input",
                    "color": "#000000",
                    "arguments": []
                }

    ret["variables"]["output"] = {
        "layer_name": "OutputVariable",
        "snake_name": "output",
        "color": "#000000",
        "arguments": []
    }

    return ret


def parse_all_yaml():
    yaml_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "nnabla_core")

    return parse_yaml(os.path.join(yaml_path, "functions.yaml"))


def create_nnabla_core_js(out_path):
    layer_components = parse_all_yaml()

    with open(out_path, "w") as f:
        print("const nnablaCore = " + dumps(layer_components, indent=2), file=f)
