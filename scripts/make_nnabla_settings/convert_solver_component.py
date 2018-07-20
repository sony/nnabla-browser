# coding: utf-8
"""
helper script to create solvers sections in nnabla-corelib-defs.js
"""
import os
import fnmatch

from utils import open_ini_parser


def parse_solver_component(dir_path):
    """create python dictionary object which has all information about all nnabla solvers

    @param dir_path path of directory which includes solver_component.txt
    @return the python list object of all solvers
    """
    config_path = os.path.join(dir_path, "solver_component.txt")
    parser = open_ini_parser(config_path)

    ret = list()

    for name in parser.sections():
        arg_name = parser.get(name, "argument_name")
        default = parser.has_option(name, "default")
        parameters = get_params(parser, name)

        ret.append({"default": default,
                    "_id": arg_name,
                    "name": name,
                    "parameters": parameters})

    return ret


def get_params(parser, section):
    params_list = fnmatch.filter(parser.options(section), "param_*")
    ret = list()
    for param_id in params_list:
        param = parser.get(section, param_id)
        _id, _name, default_value = param.split(";")
        ret.append({"_id": _id, "name": _name, "initial_value": default_value})
    return ret
