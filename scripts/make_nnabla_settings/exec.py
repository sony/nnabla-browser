#! /usr/bin/env python
# coding: utf-8
"""
helper script
"""

import os
import argparse
from json import dumps

from convert_layer_component import parse_layer_component
from convert_solver_component import parse_solver_component


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("input_dir_path", action="store", default=".", type=str)
    args = parser.parse_args()

    dir_path = os.path.abspath(args.input_dir_path)

    result_json = {
        "layers": parse_layer_component(os.path.join(dir_path, "layer_component")),
        "solvers": parse_solver_component(dir_path)
    }

    with open("../../editor/js/nnabla-corelib-defs.js", "w") as f:
        print('var nNablaCore = ' + dumps(result_json, indent=2), file=f)
