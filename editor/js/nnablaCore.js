const nnablaCore = {
  "base_functions": {
    "Neural Network Layer": {
      "MaxPooling": {
        "layer_name": "MaxPooling",
        "color": "0xa58e7f",
        "snake_name": "max_pooling",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "kernel": {
            "type": "Shape"
          },
          "stride": {
            "type": "Shape",
            "default": "kernel"
          },
          "ignore_border": {
            "type": "bool",
            "default": "True"
          },
          "pad": {
            "type": "Shape",
            "default": "(0,) * len(kernel)"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "AveragePooling": {
        "layer_name": "AveragePooling",
        "color": "0xa58e7f",
        "snake_name": "average_pooling",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "kernel": {
            "type": "Shape"
          },
          "stride": {
            "type": "Shape",
            "default": "kernel"
          },
          "ignore_border": {
            "type": "bool",
            "default": "True"
          },
          "pad": {
            "type": "Shape",
            "default": "(0,) * len(kernel)"
          },
          "including_pad": {
            "type": "bool",
            "default": "True"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "GlobalAveragePooling": {
        "layer_name": "GlobalAveragePooling",
        "color": "0xa58e7f",
        "snake_name": "global_average_pooling",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "SumPooling": {
        "layer_name": "SumPooling",
        "color": "0xa58e7f",
        "snake_name": "sum_pooling",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "kernel": {
            "type": "Shape"
          },
          "stride": {
            "type": "Shape",
            "default": "kernel"
          },
          "ignore_border": {
            "type": "bool",
            "default": "True"
          },
          "pad": {
            "type": "Shape",
            "default": "(0,) * len(kernel)"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Unpooling": {
        "layer_name": "Unpooling",
        "color": "0xa58e7f",
        "snake_name": "unpooling",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "kernel": {
            "type": "Shape"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Neural Network Activation Functions": {
      "Sigmoid": {
        "layer_name": "Sigmoid",
        "color": "0xd77b6a",
        "snake_name": "sigmoid",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Swish": {
        "layer_name": "Swish",
        "color": "0xd77b6a",
        "snake_name": "swish",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Tanh": {
        "layer_name": "Tanh",
        "color": "0xd77b6a",
        "snake_name": "tanh",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ReLU": {
        "layer_name": "ReLU",
        "color": "0xd77b6a",
        "snake_name": "relu",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "inplace": {
            "type": "bool",
            "default": "False"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LeakyReLU": {
        "layer_name": "LeakyReLU",
        "color": "0xd77b6a",
        "snake_name": "leaky_relu",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "alpha": {
            "type": "float",
            "default": "0.1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Softmax": {
        "layer_name": "Softmax",
        "color": "0xd77b6a",
        "snake_name": "softmax",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": "len(x.shape) - 1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ELU": {
        "layer_name": "ELU",
        "color": "0xd77b6a",
        "snake_name": "elu",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "alpha": {
            "type": "double",
            "default": "1.0"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "SELU": {
        "layer_name": "SELU",
        "color": "0xd77b6a",
        "snake_name": "selu",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "scale": {
            "type": "double",
            "default": "1.05070098735548"
          },
          "alpha": {
            "type": "double",
            "default": "1.673263242354377"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "CReLU": {
        "layer_name": "CReLU",
        "color": "0xd77b6a",
        "snake_name": "crelu",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "CELU": {
        "layer_name": "CELU",
        "color": "0xd77b6a",
        "snake_name": "celu",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "alpha": {
            "type": "double",
            "default": "1.0"
          },
          "axis": {
            "type": "int64",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Normalization": {
      "ClipGradByValue": {
        "layer_name": "ClipGradByValue",
        "color": "0xc0c0c0",
        "snake_name": "clip_grad_by_value",
        "inputs": {
          "x": {
            "parameter": false
          },
          "min": {
            "parameter": false
          },
          "max": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ClipGradByNorm": {
        "layer_name": "ClipGradByNorm",
        "color": "0xc0c0c0",
        "snake_name": "clip_grad_by_norm",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "clip_norm": {
            "type": "float",
            "default": 1.0
          },
          "axes": {
            "type": "repeated int64",
            "default": "range(x.ndim)"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Reduction": {
      "ReduceSum": {
        "layer_name": "ReduceSum",
        "color": "0xc0c0c0",
        "snake_name": "reduce_sum",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ReduceMean": {
        "layer_name": "ReduceMean",
        "color": "0xc0c0c0",
        "snake_name": "reduce_mean",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Arithmetic": {
      "Add2": {
        "layer_name": "Add2",
        "color": "0x848484",
        "snake_name": "add2",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "arguments": {
          "inplace": {
            "type": "bool",
            "default": "False"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "BcAdd2": {
        "layer_name": "BcAdd2",
        "color": "0x848484",
        "snake_name": "bc_add2",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Sub2": {
        "layer_name": "Sub2",
        "color": "0x848484",
        "snake_name": "sub2",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Mul2": {
        "layer_name": "Mul2",
        "color": "0x848484",
        "snake_name": "mul2",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Div2": {
        "layer_name": "Div2",
        "color": "0x848484",
        "snake_name": "div2",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Pow2": {
        "layer_name": "Pow2",
        "color": "0x848484",
        "snake_name": "pow2",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "AddScalar": {
        "layer_name": "AddScalar",
        "color": "0x848484",
        "snake_name": "add_scalar",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "MulScalar": {
        "layer_name": "MulScalar",
        "color": "0x848484",
        "snake_name": "mul_scalar",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "PowScalar": {
        "layer_name": "PowScalar",
        "color": "0x848484",
        "snake_name": "pow_scalar",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "RSubScalar": {
        "layer_name": "RSubScalar",
        "color": "0x848484",
        "snake_name": "r_sub_scalar",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "RDivScalar": {
        "layer_name": "RDivScalar",
        "color": "0x848484",
        "snake_name": "r_div_scalar",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "RPowScalar": {
        "layer_name": "RPowScalar",
        "color": "0x848484",
        "snake_name": "r_pow_scalar",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Logical": {
      "Sign": {
        "layer_name": "Sign",
        "color": "0xc0c0c0",
        "snake_name": "sign",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "alpha": {
            "type": "float",
            "default": "0.0"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Minimum2": {
        "layer_name": "Minimum2",
        "color": "0xc0c0c0",
        "snake_name": "minimum2",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Maximum2": {
        "layer_name": "Maximum2",
        "color": "0xc0c0c0",
        "snake_name": "maximum2",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "MinimumScalar": {
        "layer_name": "MinimumScalar",
        "color": "0xc0c0c0",
        "snake_name": "minimum_scalar",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1.0"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "MaximumScalar": {
        "layer_name": "MaximumScalar",
        "color": "0xc0c0c0",
        "snake_name": "maximum_scalar",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1.0"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LogicalAnd": {
        "layer_name": "LogicalAnd",
        "color": "0xc0c0c0",
        "snake_name": "logical_and",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LogicalOr": {
        "layer_name": "LogicalOr",
        "color": "0xc0c0c0",
        "snake_name": "logical_or",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LogicalXor": {
        "layer_name": "LogicalXor",
        "color": "0xc0c0c0",
        "snake_name": "logical_xor",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Equal": {
        "layer_name": "Equal",
        "color": "0xc0c0c0",
        "snake_name": "equal",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "NotEqual": {
        "layer_name": "NotEqual",
        "color": "0xc0c0c0",
        "snake_name": "not_equal",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "GreaterEqual": {
        "layer_name": "GreaterEqual",
        "color": "0xc0c0c0",
        "snake_name": "greater_equal",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Greater": {
        "layer_name": "Greater",
        "color": "0xc0c0c0",
        "snake_name": "greater",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LessEqual": {
        "layer_name": "LessEqual",
        "color": "0xc0c0c0",
        "snake_name": "less_equal",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Less": {
        "layer_name": "Less",
        "color": "0xc0c0c0",
        "snake_name": "less",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LogicalAndScalar": {
        "layer_name": "LogicalAndScalar",
        "color": "0xc0c0c0",
        "snake_name": "logical_and_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "bool"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LogicalOrScalar": {
        "layer_name": "LogicalOrScalar",
        "color": "0xc0c0c0",
        "snake_name": "logical_or_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "bool"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LogicalXorScalar": {
        "layer_name": "LogicalXorScalar",
        "color": "0xc0c0c0",
        "snake_name": "logical_xor_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "bool"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "EqualScalar": {
        "layer_name": "EqualScalar",
        "color": "0xc0c0c0",
        "snake_name": "equal_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "NotEqualScalar": {
        "layer_name": "NotEqualScalar",
        "color": "0xc0c0c0",
        "snake_name": "not_equal_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "GreaterEqualScalar": {
        "layer_name": "GreaterEqualScalar",
        "color": "0xc0c0c0",
        "snake_name": "greater_equal_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "GreaterScalar": {
        "layer_name": "GreaterScalar",
        "color": "0xc0c0c0",
        "snake_name": "greater_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LessEqualScalar": {
        "layer_name": "LessEqualScalar",
        "color": "0xc0c0c0",
        "snake_name": "less_equal_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LessScalar": {
        "layer_name": "LessScalar",
        "color": "0xc0c0c0",
        "snake_name": "less_scalar",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "arguments": {
          "val": {
            "type": "double",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "LogicalNot": {
        "layer_name": "LogicalNot",
        "color": "0xc0c0c0",
        "snake_name": "logical_not",
        "inputs": {
          "x0": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Math": {
      "Constant": {
        "layer_name": "Constant",
        "color": "0xc0c0c0",
        "snake_name": "constant",
        "inputs": {
          "parameter": false
        },
        "arguments": {
          "val": {
            "type": "float",
            "default": "0"
          },
          "shape": {
            "type": "Shape",
            "default": "[]"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Abs": {
        "layer_name": "Abs",
        "color": "0xc0c0c0",
        "snake_name": "abs",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Exp": {
        "layer_name": "Exp",
        "color": "0xc0c0c0",
        "snake_name": "exp",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Log": {
        "layer_name": "Log",
        "color": "0xc0c0c0",
        "snake_name": "log",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Identity": {
        "layer_name": "Identity",
        "color": "0xc0c0c0",
        "snake_name": "identity",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "BatchMatmul": {
        "layer_name": "BatchMatmul",
        "color": "0xc0c0c0",
        "snake_name": "batch_matmul",
        "inputs": {
          "a": {
            "parameter": false
          },
          "b": {
            "parameter": false
          }
        },
        "arguments": {
          "transpose_a": {
            "type": "bool",
            "default": "False"
          },
          "transpose_b": {
            "type": "bool",
            "default": "False"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Round": {
        "layer_name": "Round",
        "color": "0xc0c0c0",
        "snake_name": "round",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "parameter": false
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Ceil": {
        "layer_name": "Ceil",
        "color": "0xc0c0c0",
        "snake_name": "ceil",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "parameter": false
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Floor": {
        "layer_name": "Floor",
        "color": "0xc0c0c0",
        "snake_name": "floor",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "parameter": false
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Sin": {
        "layer_name": "Sin",
        "color": "0xc0c0c0",
        "snake_name": "sin",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Cos": {
        "layer_name": "Cos",
        "color": "0xc0c0c0",
        "snake_name": "cos",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Tan": {
        "layer_name": "Tan",
        "color": "0xc0c0c0",
        "snake_name": "tan",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Sinh": {
        "layer_name": "Sinh",
        "color": "0xc0c0c0",
        "snake_name": "sinh",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Cosh": {
        "layer_name": "Cosh",
        "color": "0xc0c0c0",
        "snake_name": "cosh",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ASin": {
        "layer_name": "ASin",
        "color": "0xc0c0c0",
        "snake_name": "asin",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ACos": {
        "layer_name": "ACos",
        "color": "0xc0c0c0",
        "snake_name": "acos",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ATan": {
        "layer_name": "ATan",
        "color": "0xc0c0c0",
        "snake_name": "atan",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ASinh": {
        "layer_name": "ASinh",
        "color": "0xc0c0c0",
        "snake_name": "asinh",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ACosh": {
        "layer_name": "ACosh",
        "color": "0xc0c0c0",
        "snake_name": "acosh",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ATanh": {
        "layer_name": "ATanh",
        "color": "0xc0c0c0",
        "snake_name": "atanh",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Array Manipulation": {
      "Concatenate": {
        "layer_name": "Concatenate",
        "color": "0xc0c0c0",
        "snake_name": "concatenate",
        "inputs": {
          "x": {
            "variadic": true
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": "len(x[0].shape) - 1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Stack": {
        "layer_name": "Stack",
        "color": "0xc0c0c0",
        "snake_name": "stack",
        "inputs": {
          "x": {
            "variadic": true
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": "0"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Slice": {
        "layer_name": "Slice",
        "color": "0xc0c0c0",
        "snake_name": "slice",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "start": {
            "type": "repeated int64",
            "default": "(0,) * len(x.shape)"
          },
          "stop": {
            "type": "repeated int64",
            "default": "tuple(x.shape)"
          },
          "step": {
            "type": "repeated int64",
            "default": "(1,) * len(x.shape)"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Pad": {
        "layer_name": "Pad",
        "color": "0xc0c0c0",
        "snake_name": "pad",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "pad_width": {
            "type": "repeated int64",
            "default": "(0,) * len(x.shape)"
          },
          "mode": {
            "type": "string",
            "available_values": [
              "constant"
            ],
            "default": "'constant'"
          },
          "constant_value": {
            "type": "float",
            "default": 0
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Transpose": {
        "layer_name": "Transpose",
        "color": "0xc0c0c0",
        "snake_name": "transpose",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "axes": {
            "type": "repeated int64"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Broadcast": {
        "layer_name": "Broadcast",
        "color": "0xc0c0c0",
        "snake_name": "broadcast",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "shape": {
            "type": "Shape"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "BroadcastTo": {
        "layer_name": "BroadcastTo",
        "color": "0xc0c0c0",
        "snake_name": "broadcast_to",
        "inputs": {
          "x": {
            "parameter": false
          },
          "y": {
            "parameter": false
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": -1
          }
        },
        "outputs": {
          "z": {
            "parameter": false
          }
        }
      },
      "OneHot": {
        "layer_name": "OneHot",
        "color": "0xc0c0c0",
        "snake_name": "one_hot",
        "inputs": {
          "x": {
            "template": "TI"
          }
        },
        "arguments": {
          "shape": {
            "type": "Shape"
          }
        },
        "outputs": {
          "output": {
            "parameter": false
          }
        }
      },
      "Flip": {
        "layer_name": "Flip",
        "color": "0xc0c0c0",
        "snake_name": "flip",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "axes": {
            "type": "repeated int64",
            "default": "[len(x.shape) - 1]"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Shift": {
        "layer_name": "Shift",
        "color": "0xc0c0c0",
        "snake_name": "shift",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "shifts": {
            "type": "repeated int64",
            "default": "(0,) * len(x.shape)"
          },
          "border_mode": {
            "type": "string",
            "available_values": [
              "nearest",
              "reflect"
            ],
            "default": "'nearest'"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Reshape": {
        "layer_name": "Reshape",
        "color": "0xc0c0c0",
        "snake_name": "reshape",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "shape": {
            "type": "Shape"
          },
          "inplace": {
            "type": "bool",
            "default": "True"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "MatrixDiag": {
        "layer_name": "MatrixDiag",
        "color": "0xc0c0c0",
        "snake_name": "matrix_diag",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "MatrixDiagPart": {
        "layer_name": "MatrixDiagPart",
        "color": "0xc0c0c0",
        "snake_name": "matrix_diag_part",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Stochasticity": {
      "Dropout": {
        "layer_name": "Dropout",
        "color": "0xc0c0c0",
        "snake_name": "dropout",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "p": {
            "type": "double",
            "default": "0.5"
          },
          "seed": {
            "type": "int64",
            "default": "-1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "TopKData": {
        "layer_name": "TopKData",
        "color": "0xc0c0c0",
        "snake_name": "top_k_data",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "k": {
            "type": "int64"
          },
          "abs": {
            "type": "bool",
            "default": "False"
          },
          "reduce": {
            "type": "bool",
            "default": "True"
          },
          "base_axis": {
            "type": "int64",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "TopKGrad": {
        "layer_name": "TopKGrad",
        "color": "0xc0c0c0",
        "snake_name": "top_k_grad",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "k": {
            "type": "int64"
          },
          "abs": {
            "type": "bool",
            "default": "False"
          },
          "base_axis": {
            "type": "int64",
            "default": "1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Rand": {
        "layer_name": "Rand",
        "color": "0xc0c0c0",
        "snake_name": "rand",
        "inputs": {
          "parameter": false
        },
        "arguments": {
          "low": {
            "type": "float",
            "default": "0"
          },
          "high": {
            "type": "float",
            "default": "1"
          },
          "shape": {
            "type": "Shape",
            "default": "[]"
          },
          "seed": {
            "type": "int64",
            "default": "-1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Randint": {
        "layer_name": "Randint",
        "color": "0xc0c0c0",
        "snake_name": "randint",
        "inputs": {
          "parameter": false
        },
        "arguments": {
          "low": {
            "type": "int64",
            "default": "0"
          },
          "high": {
            "type": "int64",
            "default": "1"
          },
          "shape": {
            "type": "Shape",
            "default": "[]"
          },
          "seed": {
            "type": "int64",
            "default": "-1"
          }
        },
        "outputs": {
          "y": {
            "template": "TI"
          }
        }
      },
      "Randn": {
        "layer_name": "Randn",
        "color": "0xc0c0c0",
        "snake_name": "randn",
        "inputs": {
          "parameter": false
        },
        "arguments": {
          "mu": {
            "type": "float",
            "default": "0"
          },
          "sigma": {
            "type": "float",
            "default": "1"
          },
          "shape": {
            "type": "Shape",
            "default": "[]"
          },
          "seed": {
            "type": "int64",
            "default": "-1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "RandomCrop": {
        "layer_name": "RandomCrop",
        "color": "0xc0c0c0",
        "snake_name": "random_crop",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "shape": {
            "type": "Shape",
            "default": "x.shape"
          },
          "base_axis": {
            "type": "int64",
            "default": "1"
          },
          "seed": {
            "type": "int64",
            "default": "-1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "RandomFlip": {
        "layer_name": "RandomFlip",
        "color": "0xc0c0c0",
        "snake_name": "random_flip",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "axes": {
            "type": "repeated int64",
            "default": "[len(x.shape) - 1]"
          },
          "base_axis": {
            "type": "int64",
            "default": "1"
          },
          "seed": {
            "type": "int64",
            "default": "-1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "RandomShift": {
        "layer_name": "RandomShift",
        "color": "0xc0c0c0",
        "snake_name": "random_shift",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "shifts": {
            "type": "repeated int64",
            "default": "(0,) * len(x.shape)"
          },
          "border_mode": {
            "type": "string",
            "available_values": [
              "nearest",
              "reflect"
            ],
            "default": "'nearest'"
          },
          "base_axis": {
            "type": "int64",
            "default": "1"
          },
          "seed": {
            "type": "int64",
            "default": "-1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "ImageAugmentation": {
        "layer_name": "ImageAugmentation",
        "color": "0xc0c0c0",
        "snake_name": "image_augmentation",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "shape": {
            "type": "Shape",
            "default": "x.shape"
          },
          "pad": {
            "type": "Shape",
            "default": "(0, 0)"
          },
          "min_scale": {
            "type": "float",
            "default": "1.0"
          },
          "max_scale": {
            "type": "float",
            "default": "1.0"
          },
          "angle": {
            "type": "float",
            "default": "0.0"
          },
          "aspect_ratio": {
            "type": "float",
            "default": "1.0"
          },
          "distortion": {
            "type": "float",
            "default": "0.0"
          },
          "flip_lr": {
            "type": "bool",
            "default": "False"
          },
          "flip_ud": {
            "type": "bool",
            "default": "False"
          },
          "brightness": {
            "type": "float",
            "default": "0.0"
          },
          "brightness_each": {
            "type": "bool",
            "default": "False"
          },
          "contrast": {
            "type": "float",
            "default": "1.0"
          },
          "contrast_center": {
            "type": "float",
            "default": "0.0"
          },
          "contrast_each": {
            "type": "bool",
            "default": "False"
          },
          "noise": {
            "type": "float",
            "default": "0.0"
          },
          "seed": {
            "type": "int64",
            "default": "-1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Loss Functions": {
      "SigmoidCrossEntropy": {
        "layer_name": "SigmoidCrossEntropy",
        "color": "0xc0c0c0",
        "snake_name": "sigmoid_cross_entropy",
        "inputs": {
          "x": {
            "parameter": true
          },
          "target": {
            "template": "TI",
            "parameter": true
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "BinaryCrossEntropy": {
        "layer_name": "BinaryCrossEntropy",
        "color": "0xc0c0c0",
        "snake_name": "binary_cross_entropy",
        "inputs": {
          "x": {
            "parameter": false
          },
          "target": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "SoftmaxCrossEntropy": {
        "layer_name": "SoftmaxCrossEntropy",
        "color": "0xc0c0c0",
        "snake_name": "softmax_cross_entropy",
        "inputs": {
          "x": {
            "parameter": true
          },
          "target": {
            "template": "TI",
            "parameter": true
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": "len(x.shape) - 1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "CategoricalCrossEntropy": {
        "layer_name": "CategoricalCrossEntropy",
        "color": "0xc0c0c0",
        "snake_name": "categorical_cross_entropy",
        "inputs": {
          "x": {
            "parameter": true
          },
          "target": {
            "template": "TI",
            "parameter": true
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": "len(x.shape) - 1"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "SquaredError": {
        "layer_name": "SquaredError",
        "color": "0xc0c0c0",
        "snake_name": "squared_error",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "AbsoluteError": {
        "layer_name": "AbsoluteError",
        "color": "0xc0c0c0",
        "snake_name": "absolute_error",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "HuberLoss": {
        "layer_name": "HuberLoss",
        "color": "0xc0c0c0",
        "snake_name": "huber_loss",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "arguments": {
          "delta": {
            "type": "float",
            "default": "1.0"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "EpsilonInsensitiveLoss": {
        "layer_name": "EpsilonInsensitiveLoss",
        "color": "0xc0c0c0",
        "snake_name": "epsilon_insensitive_loss",
        "inputs": {
          "x0": {
            "parameter": false
          },
          "x1": {
            "parameter": false
          }
        },
        "arguments": {
          "epsilon": {
            "type": "float"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "KLMultinomial": {
        "layer_name": "KLMultinomial",
        "color": "0xc0c0c0",
        "snake_name": "kl_multinomial",
        "inputs": {
          "p": {
            "parameter": false
          },
          "q": {
            "parameter": false
          }
        },
        "arguments": {
          "base_axis": {
            "type": "int64",
            "default": "1"
          }
        },
        "outputs": {
          "D": {
            "parameter": false
          }
        }
      }
    },
    "Quantization Neural Network Layers": {
      "BinarySigmoid": {
        "layer_name": "BinarySigmoid",
        "color": "0xc0c0c0",
        "snake_name": "binary_sigmoid",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "BinaryTanh": {
        "layer_name": "BinaryTanh",
        "color": "0xc0c0c0",
        "snake_name": "binary_tanh",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Spectral Operation": {
      "FFT": {
        "layer_name": "FFT",
        "color": "0xc0c0c0",
        "snake_name": "fft",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "signal_ndim": {
            "type": "int64"
          },
          "normalized": {
            "type": "bool",
            "default": "False"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "IFFT": {
        "layer_name": "IFFT",
        "color": "0xc0c0c0",
        "snake_name": "ifft",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "signal_ndim": {
            "type": "int64"
          },
          "normalized": {
            "type": "bool",
            "default": "False"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    },
    "Validation": {
      "TopNError": {
        "layer_name": "TopNError",
        "color": "0xc0c0c0",
        "snake_name": "top_n_error",
        "inputs": {
          "x": {
            "parameter": false
          },
          "target": {
            "template": "TI"
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": "len(x.shape) - 1"
          },
          "n": {
            "type": "int64",
            "default": "1"
          }
        },
        "outputs": {
          "output": {
            "parameter": false
          }
        }
      },
      "BinaryError": {
        "layer_name": "BinaryError",
        "color": "0xc0c0c0",
        "snake_name": "binary_error",
        "inputs": {
          "x": {
            "parameter": false
          },
          "target": {
            "parameter": false
          }
        },
        "outputs": {
          "output": {
            "parameter": false
          }
        }
      },
      "ConfusionMatrix": {
        "layer_name": "ConfusionMatrix",
        "color": "0xc0c0c0",
        "snake_name": "confusion_matrix",
        "inputs": {
          "x": {
            "parameter": false
          },
          "target": {
            "template": "TI"
          }
        },
        "arguments": {
          "axis": {
            "type": "int64",
            "default": "len(x.shape) - 1"
          }
        },
        "outputs": {
          "output": {
            "parameter": false
          }
        }
      }
    },
    "Unsupported, Special Use": {
      "VATNoise": {
        "layer_name": "VATNoise",
        "color": "0xc0c0c0",
        "snake_name": "vat_noise",
        "inputs": {
          "x": {
            "parameter": false
          },
          "w": {
            "parameter": false
          }
        },
        "arguments": {
          "base_axis": {
            "type": "int64",
            "default": "1"
          },
          "eps": {
            "type": "float",
            "default": "1.0"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Unlink": {
        "layer_name": "Unlink",
        "color": "0xc0c0c0",
        "snake_name": "unlink",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "Sink": {
        "layer_name": "Sink",
        "color": "0xc0c0c0",
        "snake_name": "sink",
        "inputs": {
          "x": {
            "variadic": true
          }
        },
        "arguments": {
          "one_input_grad": {
            "type": "bool",
            "default": "True"
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      },
      "NmsDetection2d": {
        "layer_name": "NmsDetection2d",
        "color": "0xc0c0c0",
        "snake_name": "nms_detection2d",
        "inputs": {
          "x": {
            "parameter": false
          }
        },
        "arguments": {
          "thresh": {
            "type": "float",
            "default": 0.5
          },
          "nms": {
            "type": "float",
            "default": 0.45
          },
          "nms_per_class": {
            "type": "bool",
            "default": true
          }
        },
        "outputs": {
          "y": {
            "parameter": false
          }
        }
      }
    }
  },
  "functions_api": {
    "Sum": {
      "layer_name": "Sum",
      "snake_name": "sum",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "axis": {
          "default": "None",
          "optional": true
        },
        "keepdims": {
          "default": "False",
          "optional": true
        }
      }
    },
    "Mean": {
      "layer_name": "Mean",
      "snake_name": "mean",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "axis": {
          "default": "None",
          "optional": true
        },
        "keepdims": {
          "default": "False",
          "optional": true
        }
      }
    },
    "Max": {
      "layer_name": "Max",
      "snake_name": "max",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "axis": {
          "default": "None",
          "optional": true
        },
        "keepdims": {
          "default": "False",
          "optional": true
        }
      }
    },
    "Min": {
      "layer_name": "Min",
      "snake_name": "min",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "axis": {
          "default": "None",
          "optional": true
        },
        "keepdims": {
          "default": "False",
          "optional": true
        }
      }
    },
    "Prod": {
      "layer_name": "Prod",
      "snake_name": "prod",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "axis": {
          "default": "None",
          "optional": true
        },
        "keepdims": {
          "default": "False",
          "optional": true
        }
      }
    },
    "Reduce": {
      "layer_name": "Reduce",
      "snake_name": "reduce",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "op": {
          "default": "'sum'",
          "optional": true
        }
      }
    },
    "Split": {
      "layer_name": "Split",
      "snake_name": "split",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "axis": {
          "default": "0",
          "optional": true
        }
      }
    },
    "FixedPointQuantize": {
      "layer_name": "FixedPointQuantize",
      "snake_name": "fixed_point_quantize",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "sign": {
          "default": "True",
          "optional": true
        },
        "n": {
          "default": "8",
          "optional": true
        },
        "delta": {
          "default": "2**-4",
          "optional": true
        },
        "quantize": {
          "default": "True",
          "optional": true
        },
        "ste_fine_grained": {
          "default": "True",
          "optional": true
        },
        "outputs": {
          "default": "None",
          "optional": true
        }
      }
    },
    "Pow2Quantize": {
      "layer_name": "Pow2Quantize",
      "snake_name": "pow2_quantize",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        }
      },
      "arguments": {
        "sign": {
          "default": "True",
          "optional": true
        },
        "with_zero": {
          "default": "True",
          "optional": true
        },
        "n": {
          "default": "8",
          "optional": true
        },
        "m": {
          "default": "1",
          "optional": true
        },
        "quantize": {
          "default": "True",
          "optional": true
        },
        "ste_fine_grained": {
          "default": "True",
          "optional": true
        },
        "outputs": {
          "default": "None",
          "optional": true
        }
      }
    },
    "ClipByValue": {
      "layer_name": "ClipByValue",
      "snake_name": "clip_by_value",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        },
        "min": {
          "optional": false
        },
        "max": {
          "optional": false
        }
      },
      "arguments": {}
    },
    "ClipByNorm": {
      "layer_name": "ClipByNorm",
      "snake_name": "clip_by_norm",
      "color": "0xd77b6a",
      "api_type": "functions_api",
      "inputs": {
        "x": {
          "optional": false
        },
        "clip_norm": {
          "optional": false
        }
      },
      "arguments": {
        "axis": {
          "default": "None",
          "optional": true
        }
      }
    }
  },
  "parametric_functions_api": {
    "Affine": {
      "layer_name": "Affine",
      "snake_name": "affine",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "n_outmaps": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "SvdAffine": {
      "layer_name": "SvdAffine",
      "snake_name": "svd_affine",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "n_outmaps": {
          "optional": false
        },
        "r": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "uv_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "BinaryConnectAffine": {
      "layer_name": "BinaryConnectAffine",
      "snake_name": "binary_connect_affine",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "n_outmaps": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "wb_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "BinaryWeightAffine": {
      "layer_name": "BinaryWeightAffine",
      "snake_name": "binary_weight_affine",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "n_outmaps": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "wb_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "InqAffine": {
      "layer_name": "InqAffine",
      "snake_name": "inq_affine",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "n_outmaps": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "num_bits": {
          "default": "4",
          "optional": true
        },
        "inq_iterations": {
          "default": "()",
          "optional": true
        },
        "selection_algorithm": {
          "default": "'random'",
          "optional": true
        },
        "seed": {
          "default": "-1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "i_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "Convolution": {
      "layer_name": "Convolution",
      "snake_name": "convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "group": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "SvdConvolution": {
      "layer_name": "SvdConvolution",
      "snake_name": "svd_convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        },
        "r": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "uv_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "Cpd3Convolution": {
      "layer_name": "Cpd3Convolution",
      "snake_name": "cpd3_convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        },
        "r": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "oik_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        },
        "max_iter": {
          "default": "500",
          "optional": true
        },
        "stopping_criterion": {
          "default": "1e-5",
          "optional": true
        }
      }
    },
    "BinaryConnectConvolution": {
      "layer_name": "BinaryConnectConvolution",
      "snake_name": "binary_connect_convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "group": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "wb_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "BinaryWeightConvolution": {
      "layer_name": "BinaryWeightConvolution",
      "snake_name": "binary_weight_convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "group": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "wb_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "InqConvolution": {
      "layer_name": "InqConvolution",
      "snake_name": "inq_convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "group": {
          "default": "1",
          "optional": true
        },
        "num_bits": {
          "default": "4",
          "optional": true
        },
        "inq_iterations": {
          "default": "()",
          "optional": true
        },
        "selection_algorithm": {
          "default": "'random'",
          "optional": true
        },
        "seed": {
          "default": "-1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "i_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "DepthwiseConvolution": {
      "layer_name": "DepthwiseConvolution",
      "snake_name": "depthwise_convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "kernel": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "multiplier": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "Deconvolution": {
      "layer_name": "Deconvolution",
      "snake_name": "deconvolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "group": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "DepthwiseDeconvolution": {
      "layer_name": "DepthwiseDeconvolution",
      "snake_name": "depthwise_deconvolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "kernel": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "divisor": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        }
      }
    },
    "BatchNormalization": {
      "layer_name": "BatchNormalization",
      "snake_name": "batch_normalization",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        }
      },
      "arguments": {
        "axes": {
          "default": "[1]",
          "optional": true
        },
        "decay_rate": {
          "default": "0.9",
          "optional": true
        },
        "eps": {
          "default": "1e-5",
          "optional": true
        },
        "batch_stat": {
          "default": "True",
          "optional": true
        },
        "output_stat": {
          "default": "False",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        }
      }
    },
    "MeanSubtraction": {
      "layer_name": "MeanSubtraction",
      "snake_name": "mean_subtraction",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "update_running_mean": {
          "default": "True",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        }
      }
    },
    "Embed": {
      "layer_name": "Embed",
      "snake_name": "embed",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "n_inputs": {
          "optional": false
        },
        "n_features": {
          "optional": false
        }
      },
      "arguments": {
        "fix_parameters": {
          "default": "False",
          "optional": true
        }
      }
    },
    "Prelu": {
      "layer_name": "Prelu",
      "snake_name": "prelu",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "shared": {
          "default": "True",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        }
      }
    },
    "FixedPointQuantizedAffine": {
      "layer_name": "FixedPointQuantizedAffine",
      "snake_name": "fixed_point_quantized_affine",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "n_outmaps": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        },
        "quantize_w": {
          "default": "True",
          "optional": true
        },
        "sign_w": {
          "default": "True",
          "optional": true
        },
        "n_w": {
          "default": "8",
          "optional": true
        },
        "delta_w": {
          "default": "2**-4",
          "optional": true
        },
        "ste_fine_grained_w": {
          "default": "True",
          "optional": true
        },
        "quantize_b": {
          "default": "True",
          "optional": true
        },
        "sign_b": {
          "default": "True",
          "optional": true
        },
        "n_b": {
          "default": "8",
          "optional": true
        },
        "delta_b": {
          "default": "2**-4",
          "optional": true
        },
        "ste_fine_grained_b": {
          "default": "True",
          "optional": true
        }
      }
    },
    "FixedPointQuantizedConvolution": {
      "layer_name": "FixedPointQuantizedConvolution",
      "snake_name": "fixed_point_quantized_convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        },
        "": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "group": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        },
        "quantize_w": {
          "default": "True",
          "optional": true
        },
        "sign_w": {
          "default": "True",
          "optional": true
        },
        "n_w": {
          "default": "8",
          "optional": true
        },
        "delta_w": {
          "default": "2**-4",
          "optional": true
        },
        "ste_fine_grained_w": {
          "default": "True",
          "optional": true
        },
        "quantize_b": {
          "default": "True",
          "optional": true
        },
        "sign_b": {
          "default": "True",
          "optional": true
        },
        "n_b": {
          "default": "8",
          "optional": true
        },
        "delta_b": {
          "default": "2**-4",
          "optional": true
        },
        "ste_fine_grained_b": {
          "default": "True",
          "optional": true
        }
      }
    },
    "Pow2QuantizedAffine": {
      "layer_name": "Pow2QuantizedAffine",
      "snake_name": "pow2_quantized_affine",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "n_outmaps": {
          "optional": false
        }
      },
      "arguments": {
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        },
        "quantize_w": {
          "default": "True",
          "optional": true
        },
        "sign_w": {
          "default": "True",
          "optional": true
        },
        "with_zero_w": {
          "default": "False",
          "optional": true
        },
        "n_w": {
          "default": "8",
          "optional": true
        },
        "m_w": {
          "default": "2",
          "optional": true
        },
        "ste_fine_grained_w": {
          "default": "True",
          "optional": true
        },
        "quantize_b": {
          "default": "True",
          "optional": true
        },
        "sign_b": {
          "default": "True",
          "optional": true
        },
        "with_zero_b": {
          "default": "False",
          "optional": true
        },
        "n_b": {
          "default": "8",
          "optional": true
        },
        "m_b": {
          "default": "2",
          "optional": true
        },
        "ste_fine_grained_b": {
          "default": "True",
          "optional": true
        }
      }
    },
    "Pow2QuantizedConvolution": {
      "layer_name": "Pow2QuantizedConvolution",
      "snake_name": "pow2_quantized_convolution",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "inp": {
          "optional": false
        },
        "outmaps": {
          "optional": false
        },
        "kernel": {
          "optional": false
        },
        "": {
          "optional": false
        }
      },
      "arguments": {
        "pad": {
          "default": "None",
          "optional": true
        },
        "stride": {
          "default": "None",
          "optional": true
        },
        "dilation": {
          "default": "None",
          "optional": true
        },
        "group": {
          "default": "1",
          "optional": true
        },
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "base_axis": {
          "default": "1",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        },
        "rng": {
          "default": "None",
          "optional": true
        },
        "with_bias": {
          "default": "True",
          "optional": true
        },
        "quantize_w": {
          "default": "True",
          "optional": true
        },
        "with_zero_w": {
          "default": "False",
          "optional": true
        },
        "sign_w": {
          "default": "True",
          "optional": true
        },
        "n_w": {
          "default": "8",
          "optional": true
        },
        "m_w": {
          "default": "2",
          "optional": true
        },
        "ste_fine_grained_w": {
          "default": "True",
          "optional": true
        },
        "quantize_b": {
          "default": "True",
          "optional": true
        },
        "with_zero_b": {
          "default": "False",
          "optional": true
        },
        "sign_b": {
          "default": "True",
          "optional": true
        },
        "n_b": {
          "default": "8",
          "optional": true
        },
        "m_b": {
          "default": "2",
          "optional": true
        },
        "ste_fine_grained_b": {
          "default": "True",
          "optional": true
        }
      }
    },
    "Lstm": {
      "layer_name": "Lstm",
      "snake_name": "lstm",
      "color": "0x6aa1bd",
      "api_type": "parametric_functions_api",
      "inputs": {
        "x": {
          "optional": false
        },
        "h": {
          "optional": false
        },
        "c": {
          "optional": false
        },
        "state_size": {
          "optional": false
        }
      },
      "arguments": {
        "w_init": {
          "default": "None",
          "optional": true
        },
        "b_init": {
          "default": "None",
          "optional": true
        },
        "fix_parameters": {
          "default": "False",
          "optional": true
        }
      }
    }
  },
  "variables": {
    "input": {
      "layer_name": "InputVariable",
      "snake_name": "input",
      "color": "#000000",
      "arguments": []
    },
    "output": {
      "layer_name": "OutputVariable",
      "snake_name": "output",
      "color": "#000000",
      "arguments": []
    }
  }
}
