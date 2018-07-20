from google.protobuf import text_format, json_format
from nnabla.utils import nnabla_pb2
import argparse
from json import dump
import sys


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("file_path", type=str)

    return parser.parse_args()


if __name__ == '__main__':
    args = get_args()

    proto = nnabla_pb2.NNablaProtoBuf()
    with open(args.file_path, "r") as f:
        text_format.Merge(f.read(), proto)

    J = json_format.MessageToJson(proto)

    dump(J, sys.stdout)
    print()
