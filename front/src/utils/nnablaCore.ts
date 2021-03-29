/* eslint @typescript-eslint/camelcase: 0 */
export const nnablaCore = {
  parametric_functions: {
    Affine: {
      layer_name: 'Affine',
      snake_name: 'affine',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_outmaps: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BatchNormalization: {
      layer_name: 'BatchNormalization',
      snake_name: 'batch_normalization',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        }
      },
      arguments: {
        axes: {
          default: [1],
          type: 'list',
          optional: true
        },
        decay_rate: {
          default: 0.9,
          type: 'float',
          optional: true
        },
        eps: {
          default: 1e-5,
          type: 'float',
          optional: true
        },
        batch_stat: {
          default: true,
          type: 'bool',
          optional: true
        },
        output_stat: {
          default: false,
          type: 'bool',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        param_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BinaryConnectAffine: {
      layer_name: 'BinaryConnectAffine',
      snake_name: 'binary_connect_affine',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_outmaps: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        wb_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BinaryConnectConvolution: {
      layer_name: 'BinaryConnectConvolution',
      snake_name: 'binary_connect_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        group: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        wb_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BinaryWeightAffine: {
      layer_name: 'BinaryWeightAffine',
      snake_name: 'binary_weight_affine',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_outmaps: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        wb_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BinaryWeightConvolution: {
      layer_name: 'BinaryWeightConvolution',
      snake_name: 'binary_weight_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        group: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        wb_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Convolution: {
      layer_name: 'Convolution',
      snake_name: 'convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        group: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Cpd3Convolution: {
      layer_name: 'Cpd3Convolution',
      snake_name: 'cpd3_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        },
        r: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        oik_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        max_iter: {
          default: 500,
          type: 'int',
          optional: true
        },
        stopping_criterion: {
          default: 1e-5,
          type: 'float',
          optional: true
        },
        lambda_reg: {
          default: 0.0,
          type: 'float',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Deconvolution: {
      layer_name: 'Deconvolution',
      snake_name: 'deconvolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        group: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    DepthwiseConvolution: {
      layer_name: 'DepthwiseConvolution',
      snake_name: 'depthwise_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        multiplier: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    DepthwiseDeconvolution: {
      layer_name: 'DepthwiseDeconvolution',
      snake_name: 'depthwise_deconvolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        divisor: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Embed: {
      layer_name: 'Embed',
      snake_name: 'embed',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_inputs: {
          optional: false
        },
        n_features: {
          optional: false
        }
      },
      arguments: {
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    FixedPointQuantizedAffine: {
      layer_name: 'FixedPointQuantizedAffine',
      snake_name: 'fixed_point_quantized_affine',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_outmaps: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        quantize_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        sign_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        n_w: {
          default: 8,
          type: 'int',
          optional: true
        },
        delta_w: {
          default: 0.0625,
          type: 'float',
          optional: true
        },
        ste_fine_grained_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        quantize_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        sign_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        n_b: {
          default: 8,
          type: 'int',
          optional: true
        },
        delta_b: {
          default: 0.0625,
          type: 'float',
          optional: true
        },
        ste_fine_grained_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    FixedPointQuantizedConvolution: {
      layer_name: 'FixedPointQuantizedConvolution',
      snake_name: 'fixed_point_quantized_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        group: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        quantize_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        sign_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        n_w: {
          default: 8,
          type: 'int',
          optional: true
        },
        delta_w: {
          default: 0.0625,
          type: 'float',
          optional: true
        },
        ste_fine_grained_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        quantize_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        sign_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        n_b: {
          default: 8,
          type: 'int',
          optional: true
        },
        delta_b: {
          default: 0.0625,
          type: 'float',
          optional: true
        },
        ste_fine_grained_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    InqAffine: {
      layer_name: 'InqAffine',
      snake_name: 'inq_affine',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_outmaps: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        num_bits: {
          default: 4,
          type: 'int',
          optional: true
        },
        inq_iterations: {
          default: [],
          type: 'tuple',
          optional: true
        },
        selection_algorithm: {
          default: 'random',
          type: 'str',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        i_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    InqConvolution: {
      layer_name: 'InqConvolution',
      snake_name: 'inq_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        group: {
          default: 1,
          type: 'int',
          optional: true
        },
        num_bits: {
          default: 4,
          type: 'int',
          optional: true
        },
        inq_iterations: {
          default: [],
          type: 'tuple',
          optional: true
        },
        selection_algorithm: {
          default: 'random',
          type: 'str',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        i_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Lstm: {
      layer_name: 'Lstm',
      snake_name: 'lstm',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        x: {
          optional: false
        },
        h: {
          optional: false
        },
        c: {
          optional: false
        },
        state_size: {
          optional: false
        }
      },
      arguments: {
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    MeanSubtraction: {
      layer_name: 'MeanSubtraction',
      snake_name: 'mean_subtraction',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        update_running_mean: {
          default: true,
          type: 'bool',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Pow2QuantizedAffine: {
      layer_name: 'Pow2QuantizedAffine',
      snake_name: 'pow2_quantized_affine',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_outmaps: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        quantize_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        sign_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        with_zero_w: {
          default: false,
          type: 'bool',
          optional: true
        },
        n_w: {
          default: 8,
          type: 'int',
          optional: true
        },
        m_w: {
          default: 2,
          type: 'int',
          optional: true
        },
        ste_fine_grained_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        quantize_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        sign_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        with_zero_b: {
          default: false,
          type: 'bool',
          optional: true
        },
        n_b: {
          default: 8,
          type: 'int',
          optional: true
        },
        m_b: {
          default: 2,
          type: 'int',
          optional: true
        },
        ste_fine_grained_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Pow2QuantizedConvolution: {
      layer_name: 'Pow2QuantizedConvolution',
      snake_name: 'pow2_quantized_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        group: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        quantize_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        with_zero_w: {
          default: false,
          type: 'bool',
          optional: true
        },
        sign_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        n_w: {
          default: 8,
          type: 'int',
          optional: true
        },
        m_w: {
          default: 2,
          type: 'int',
          optional: true
        },
        ste_fine_grained_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        quantize_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        with_zero_b: {
          default: false,
          type: 'bool',
          optional: true
        },
        sign_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        n_b: {
          default: 8,
          type: 'int',
          optional: true
        },
        m_b: {
          default: 2,
          type: 'int',
          optional: true
        },
        ste_fine_grained_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    PReLU: {
      layer_name: 'PReLU',
      snake_name: 'pReLU',
      color: '#d77b6a',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        shared: {
          default: true,
          type: 'bool',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    PrunedAffine: {
      layer_name: 'PrunedAffine',
      snake_name: 'pruned_affine',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_outmaps: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        prune_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        rate_w: {
          default: 0.9,
          type: 'float',
          optional: true
        },
        prune_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        rate_b: {
          default: 0.9,
          type: 'float',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    PrunedConvolution: {
      layer_name: 'PrunedConvolution',
      snake_name: 'pruned_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        group: {
          default: 1,
          type: 'int',
          optional: true
        },
        w_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        prune_w: {
          default: true,
          type: 'bool',
          optional: true
        },
        rate_w: {
          default: 0.9,
          type: 'float',
          optional: true
        },
        prune_b: {
          default: true,
          type: 'bool',
          optional: true
        },
        rate_b: {
          default: 0.9,
          type: 'float',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    SvdAffine: {
      layer_name: 'SvdAffine',
      snake_name: 'svd_affine',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        n_outmaps: {
          optional: false
        },
        r: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        uv_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    SvdConvolution: {
      layer_name: 'SvdConvolution',
      snake_name: 'svd_convolution',
      color: '#6aa1bd',
      api_type: 'parametric_functions_api',
      inputs: {
        inp: {
          optional: false
        },
        outmaps: {
          optional: false
        },
        kernel: {
          optional: false
        },
        r: {
          optional: false
        }
      },
      arguments: {
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        dilation: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        uv_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        b_init: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        fix_parameters: {
          default: false,
          type: 'bool',
          optional: true
        },
        rng: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        with_bias: {
          default: true,
          type: 'bool',
          optional: true
        },
        name: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    }
  },
  functions: {
    Abs: {
      layer_name: 'Abs',
      snake_name: 'abs',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    AbsoluteError: {
      layer_name: 'AbsoluteError',
      snake_name: 'absolute_error',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Acos: {
      layer_name: 'Acos',
      snake_name: 'acos',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Acosh: {
      layer_name: 'Acosh',
      snake_name: 'acosh',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Add2: {
      layer_name: 'Add2',
      snake_name: 'add2',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        inplace: {
          default: false,
          type: 'bool',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    AddScalar: {
      layer_name: 'AddScalar',
      snake_name: 'add_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Arange: {
      layer_name: 'Arange',
      snake_name: 'arange',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        start: {
          optional: false
        },
        stop: {
          optional: false
        }
      },
      arguments: {
        step: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Asin: {
      layer_name: 'Asin',
      snake_name: 'asin',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Asinh: {
      layer_name: 'Asinh',
      snake_name: 'asinh',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Atan: {
      layer_name: 'Atan',
      snake_name: 'atan',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Atanh: {
      layer_name: 'Atanh',
      snake_name: 'atanh',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    AveragePooling: {
      layer_name: 'AveragePooling',
      snake_name: 'average_pooling',
      color: '#a58e7f',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        ignore_border: {
          default: true,
          type: 'bool',
          optional: true
        },
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        including_pad: {
          default: true,
          type: 'bool',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BatchMatmul: {
      layer_name: 'BatchMatmul',
      snake_name: 'batch_matmul',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        a: {
          optional: false
        },
        b: {
          optional: false
        }
      },
      arguments: {
        transpose_a: {
          default: false,
          type: 'bool',
          optional: true
        },
        transpose_b: {
          default: false,
          type: 'bool',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BcAdd2: {
      layer_name: 'BcAdd2',
      snake_name: 'bc_add2',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BinaryCrossEntropy: {
      layer_name: 'BinaryCrossEntropy',
      snake_name: 'binary_cross_entropy',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        target: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BinaryError: {
      layer_name: 'BinaryError',
      snake_name: 'binary_error',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        target: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BinarySigmoid: {
      layer_name: 'BinarySigmoid',
      snake_name: 'binary_sigmoid',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BinaryTanh: {
      layer_name: 'BinaryTanh',
      snake_name: 'binary_tanh',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Broadcast: {
      layer_name: 'Broadcast',
      snake_name: 'broadcast',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        shape: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    BroadcastTo: {
      layer_name: 'BroadcastTo',
      snake_name: 'broadcast_to',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        y: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    CategoricalCrossEntropy: {
      layer_name: 'CategoricalCrossEntropy',
      snake_name: 'categorical_cross_entropy',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        target: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Ceil: {
      layer_name: 'Ceil',
      snake_name: 'ceil',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    CELU: {
      layer_name: 'CELU',
      snake_name: 'cELU',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        alpha: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ClipGradByNorm: {
      layer_name: 'ClipGradByNorm',
      snake_name: 'clip_grad_by_norm',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        clip_norm: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        axes: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ClipGradByValue: {
      layer_name: 'ClipGradByValue',
      snake_name: 'clip_grad_by_value',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        min: {
          optional: false
        },
        max: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Concatenate: {
      layer_name: 'Concatenate',
      snake_name: 'concatenate',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        kw: {
          optional: false
        }
      },
      arguments: {}
    },
    ConfusionMatrix: {
      layer_name: 'ConfusionMatrix',
      snake_name: 'confusion_matrix',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        target: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Constant: {
      layer_name: 'Constant',
      snake_name: 'constant',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {},
      arguments: {
        val: {
          default: 0,
          type: 'int',
          optional: true
        },
        shape: {
          default: [],
          type: 'list',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Cos: {
      layer_name: 'Cos',
      snake_name: 'cos',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Cosh: {
      layer_name: 'Cosh',
      snake_name: 'cosh',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    CReLU: {
      layer_name: 'CReLU',
      snake_name: 'cReLU',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Div2: {
      layer_name: 'Div2',
      snake_name: 'div2',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Dropout: {
      layer_name: 'Dropout',
      snake_name: 'dropout',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        p: {
          default: 0.5,
          type: 'float',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ELU: {
      layer_name: 'ELU',
      snake_name: 'ELU',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        alpha: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    EpsilonInsensitiveLoss: {
      layer_name: 'EpsilonInsensitiveLoss',
      snake_name: 'epsilon_insensitive_loss',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        },
        epsilon: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Equal: {
      layer_name: 'Equal',
      snake_name: 'equal',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    EqualScalar: {
      layer_name: 'EqualScalar',
      snake_name: 'equal_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Exp: {
      layer_name: 'Exp',
      snake_name: 'exp',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Fft: {
      layer_name: 'Fft',
      snake_name: 'fft',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        signal_ndim: {
          optional: false
        }
      },
      arguments: {
        normalized: {
          default: false,
          type: 'bool',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    FixedPointQuantize: {
      layer_name: 'FixedPointQuantize',
      snake_name: 'fixed_point_quantize',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        sign: {
          default: true,
          type: 'bool',
          optional: true
        },
        n: {
          default: 8,
          type: 'int',
          optional: true
        },
        delta: {
          default: 0.0625,
          type: 'float',
          optional: true
        },
        quantize: {
          default: true,
          type: 'bool',
          optional: true
        },
        ste_fine_grained: {
          default: true,
          type: 'bool',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Flip: {
      layer_name: 'Flip',
      snake_name: 'flip',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axes: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Floor: {
      layer_name: 'Floor',
      snake_name: 'floor',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    FunctionApi: {
      layer_name: 'FunctionApi',
      snake_name: 'function_api',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        func: {
          optional: false
        }
      },
      arguments: {}
    },
    GlobalAveragePooling: {
      layer_name: 'GlobalAveragePooling',
      snake_name: 'global_average_pooling',
      color: '#a58e7f',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Greater: {
      layer_name: 'Greater',
      snake_name: 'greater',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    GreaterEqual: {
      layer_name: 'GreaterEqual',
      snake_name: 'greater_equal',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    GreaterEqualScalar: {
      layer_name: 'GreaterEqualScalar',
      snake_name: 'greater_equal_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    GreaterScalar: {
      layer_name: 'GreaterScalar',
      snake_name: 'greater_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    HuberLoss: {
      layer_name: 'HuberLoss',
      snake_name: 'huber_loss',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        delta: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Identity: {
      layer_name: 'Identity',
      snake_name: 'identity',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Ifft: {
      layer_name: 'Ifft',
      snake_name: 'ifft',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        signal_ndim: {
          optional: false
        }
      },
      arguments: {
        normalized: {
          default: false,
          type: 'bool',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ImageAugmentation: {
      layer_name: 'ImageAugmentation',
      snake_name: 'image_augmentation',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        shape: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        pad: {
          default: [0, 0],
          type: 'tuple',
          optional: true
        },
        min_scale: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        max_scale: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        angle: {
          default: 0.0,
          type: 'float',
          optional: true
        },
        aspect_ratio: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        distortion: {
          default: 0.0,
          type: 'float',
          optional: true
        },
        flip_lr: {
          default: false,
          type: 'bool',
          optional: true
        },
        flip_ud: {
          default: false,
          type: 'bool',
          optional: true
        },
        brightness: {
          default: 0.0,
          type: 'float',
          optional: true
        },
        brightness_each: {
          default: false,
          type: 'bool',
          optional: true
        },
        contrast: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        contrast_center: {
          default: 0.0,
          type: 'float',
          optional: true
        },
        contrast_each: {
          default: false,
          type: 'bool',
          optional: true
        },
        noise: {
          default: 0.0,
          type: 'float',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Interpolate: {
      layer_name: 'Interpolate',
      snake_name: 'interpolate',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        scale: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        output_size: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        mode: {
          default: 'linear',
          type: 'str',
          optional: true
        },
        align_corners: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    KlMultinomial: {
      layer_name: 'KlMultinomial',
      snake_name: 'kl_multinomial',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        p: {
          optional: false
        },
        q: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LeakyReLU: {
      layer_name: 'LeakyReLU',
      snake_name: 'leaky_ReLU',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        alpha: {
          default: 0.1,
          type: 'float',
          optional: true
        },
        inplace: {
          default: false,
          type: 'bool',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Less: {
      layer_name: 'Less',
      snake_name: 'less',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LessEqual: {
      layer_name: 'LessEqual',
      snake_name: 'less_equal',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LessEqualScalar: {
      layer_name: 'LessEqualScalar',
      snake_name: 'less_equal_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LessScalar: {
      layer_name: 'LessScalar',
      snake_name: 'less_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Log: {
      layer_name: 'Log',
      snake_name: 'log',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LogicalAnd: {
      layer_name: 'LogicalAnd',
      snake_name: 'logical_and',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LogicalAndScalar: {
      layer_name: 'LogicalAndScalar',
      snake_name: 'logical_and_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        val: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LogicalNot: {
      layer_name: 'LogicalNot',
      snake_name: 'logical_not',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LogicalOr: {
      layer_name: 'LogicalOr',
      snake_name: 'logical_or',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LogicalOrScalar: {
      layer_name: 'LogicalOrScalar',
      snake_name: 'logical_or_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        val: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LogicalXor: {
      layer_name: 'LogicalXor',
      snake_name: 'logical_xor',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    LogicalXorScalar: {
      layer_name: 'LogicalXorScalar',
      snake_name: 'logical_xor_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        val: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    MatrixDiag: {
      layer_name: 'MatrixDiag',
      snake_name: 'matrix_diag',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    MatrixDiagPart: {
      layer_name: 'MatrixDiagPart',
      snake_name: 'matrix_diag_part',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Max: {
      layer_name: 'Max',
      snake_name: 'max',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        keepdims: {
          default: false,
          type: 'bool',
          optional: true
        },
        with_index: {
          default: false,
          type: 'bool',
          optional: true
        },
        only_index: {
          default: false,
          type: 'bool',
          optional: true
        }
      }
    },
    MaxPooling: {
      layer_name: 'MaxPooling',
      snake_name: 'max_pooling',
      color: '#a58e7f',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        ignore_border: {
          default: true,
          type: 'bool',
          optional: true
        },
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Maximum2: {
      layer_name: 'Maximum2',
      snake_name: 'maximum2',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    MaximumScalar: {
      layer_name: 'MaximumScalar',
      snake_name: 'maximum_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Mean: {
      layer_name: 'Mean',
      snake_name: 'mean',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        keepdims: {
          default: false,
          type: 'bool',
          optional: true
        }
      }
    },
    Min: {
      layer_name: 'Min',
      snake_name: 'min',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        keepdims: {
          default: false,
          type: 'bool',
          optional: true
        },
        with_index: {
          default: false,
          type: 'bool',
          optional: true
        },
        only_index: {
          default: false,
          type: 'bool',
          optional: true
        }
      }
    },
    Minimum2: {
      layer_name: 'Minimum2',
      snake_name: 'minimum2',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    MinimumScalar: {
      layer_name: 'MinimumScalar',
      snake_name: 'minimum_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Mul2: {
      layer_name: 'Mul2',
      snake_name: 'mul2',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    MulScalar: {
      layer_name: 'MulScalar',
      snake_name: 'mul_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    NmsDetection2d: {
      layer_name: 'NmsDetection2d',
      snake_name: 'nms_detection2d',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        thresh: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        nms: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        nms_per_class: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    NotEqual: {
      layer_name: 'NotEqual',
      snake_name: 'not_equal',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    NotEqualScalar: {
      layer_name: 'NotEqualScalar',
      snake_name: 'not_equal_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    OneHot: {
      layer_name: 'OneHot',
      snake_name: 'one_hot',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        shape: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Pad: {
      layer_name: 'Pad',
      snake_name: 'pad',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        pad_width: {
          optional: false
        }
      },
      arguments: {
        mode: {
          default: 'constant',
          type: 'str',
          optional: true
        },
        constant_value: {
          default: 0,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Pow2: {
      layer_name: 'Pow2',
      snake_name: 'pow2',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Pow2Quantize: {
      layer_name: 'Pow2Quantize',
      snake_name: 'pow2_quantize',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        sign: {
          default: true,
          type: 'bool',
          optional: true
        },
        with_zero: {
          default: true,
          type: 'bool',
          optional: true
        },
        n: {
          default: 8,
          type: 'int',
          optional: true
        },
        m: {
          default: 1,
          type: 'int',
          optional: true
        },
        quantize: {
          default: true,
          type: 'bool',
          optional: true
        },
        ste_fine_grained: {
          default: true,
          type: 'bool',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    PowScalar: {
      layer_name: 'PowScalar',
      snake_name: 'pow_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Prod: {
      layer_name: 'Prod',
      snake_name: 'prod',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        keepdims: {
          default: false,
          type: 'bool',
          optional: true
        }
      }
    },
    Prune: {
      layer_name: 'Prune',
      snake_name: 'prune',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        rate: {
          default: 0.9,
          type: 'float',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    RDivScalar: {
      layer_name: 'RDivScalar',
      snake_name: 'r_div_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    RPowScalar: {
      layer_name: 'RPowScalar',
      snake_name: 'r_pow_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    RSubScalar: {
      layer_name: 'RSubScalar',
      snake_name: 'r_sub_scalar',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        val: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Rand: {
      layer_name: 'Rand',
      snake_name: 'rand',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {},
      arguments: {
        low: {
          default: 0,
          type: 'int',
          optional: true
        },
        high: {
          default: 1,
          type: 'int',
          optional: true
        },
        shape: {
          default: [],
          type: 'list',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Randint: {
      layer_name: 'Randint',
      snake_name: 'randint',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {},
      arguments: {
        low: {
          default: 0,
          type: 'int',
          optional: true
        },
        high: {
          default: 1,
          type: 'int',
          optional: true
        },
        shape: {
          default: [],
          type: 'list',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Randn: {
      layer_name: 'Randn',
      snake_name: 'randn',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {},
      arguments: {
        mu: {
          default: 0,
          type: 'int',
          optional: true
        },
        sigma: {
          default: 1,
          type: 'int',
          optional: true
        },
        shape: {
          default: [],
          type: 'list',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    RandomCrop: {
      layer_name: 'RandomCrop',
      snake_name: 'random_crop',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        shape: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    RandomFlip: {
      layer_name: 'RandomFlip',
      snake_name: 'random_flip',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axes: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    RandomShift: {
      layer_name: 'RandomShift',
      snake_name: 'random_shift',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        shifts: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        border_mode: {
          default: 'nearest',
          type: 'str',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        seed: {
          default: -1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ReduceMean: {
      layer_name: 'ReduceMean',
      snake_name: 'reduce_mean',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ReduceSum: {
      layer_name: 'ReduceSum',
      snake_name: 'reduce_sum',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ReLU: {
      layer_name: 'ReLU',
      snake_name: 'ReLU',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        inplace: {
          default: false,
          type: 'bool',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Reshape: {
      layer_name: 'Reshape',
      snake_name: 'reshape',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        shape: {
          optional: false
        }
      },
      arguments: {
        inplace: {
          default: true,
          type: 'bool',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Round: {
      layer_name: 'Round',
      snake_name: 'round',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    SELU: {
      layer_name: 'SELU',
      snake_name: 'sELU',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        scale: {
          default: 1.05070098735548,
          type: 'float',
          optional: true
        },
        alpha: {
          default: 1.673263242354377,
          type: 'float',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Shift: {
      layer_name: 'Shift',
      snake_name: 'shift',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        shifts: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        border_mode: {
          default: 'nearest',
          type: 'str',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Sigmoid: {
      layer_name: 'Sigmoid',
      snake_name: 'sigmoid',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    SigmoidCrossEntropy: {
      layer_name: 'SigmoidCrossEntropy',
      snake_name: 'sigmoid_cross_entropy',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        target: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Sign: {
      layer_name: 'Sign',
      snake_name: 'sign',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        alpha: {
          default: 0.0,
          type: 'float',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Sin: {
      layer_name: 'Sin',
      snake_name: 'sin',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Sinh: {
      layer_name: 'Sinh',
      snake_name: 'sinh',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Sink: {
      layer_name: 'Sink',
      snake_name: 'sink',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        kw: {
          optional: false
        }
      },
      arguments: {}
    },
    Slice: {
      layer_name: 'Slice',
      snake_name: 'slice',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        start: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        stop: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        step: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Softmax: {
      layer_name: 'Softmax',
      snake_name: 'softmax',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    SoftmaxCrossEntropy: {
      layer_name: 'SoftmaxCrossEntropy',
      snake_name: 'softmax_cross_entropy',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        target: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Sort: {
      layer_name: 'Sort',
      snake_name: 'sort',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: -1,
          type: 'int',
          optional: true
        },
        reverse: {
          default: false,
          type: 'bool',
          optional: true
        },
        with_index: {
          default: false,
          type: 'bool',
          optional: true
        },
        only_index: {
          default: false,
          type: 'bool',
          optional: true
        }
      }
    },
    Split: {
      layer_name: 'Split',
      snake_name: 'split',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 0,
          type: 'int',
          optional: true
        }
      }
    },
    SquaredError: {
      layer_name: 'SquaredError',
      snake_name: 'squared_error',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Stack: {
      layer_name: 'Stack',
      snake_name: 'stack',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        kw: {
          optional: false
        }
      },
      arguments: {}
    },
    Sub2: {
      layer_name: 'Sub2',
      snake_name: 'sub2',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x0: {
          optional: false
        },
        x1: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Sum: {
      layer_name: 'Sum',
      snake_name: 'sum',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        keepdims: {
          default: false,
          type: 'bool',
          optional: true
        }
      }
    },
    SumPooling: {
      layer_name: 'SumPooling',
      snake_name: 'sum_pooling',
      color: '#a58e7f',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        stride: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        ignore_border: {
          default: true,
          type: 'bool',
          optional: true
        },
        pad: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Swish: {
      layer_name: 'Swish',
      snake_name: 'swish',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Tan: {
      layer_name: 'Tan',
      snake_name: 'tan',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Tanh: {
      layer_name: 'Tanh',
      snake_name: 'tanh',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    TopKData: {
      layer_name: 'TopKData',
      snake_name: 'top_k_data',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        k: {
          optional: false
        }
      },
      arguments: {
        abs: {
          default: false,
          type: 'bool',
          optional: true
        },
        reduce: {
          default: true,
          type: 'bool',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    TopKGrad: {
      layer_name: 'TopKGrad',
      snake_name: 'top_k_grad',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        k: {
          optional: false
        }
      },
      arguments: {
        abs: {
          default: false,
          type: 'bool',
          optional: true
        },
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    TopNError: {
      layer_name: 'TopNError',
      snake_name: 'top_n_error',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        target: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        },
        n: {
          default: 1,
          type: 'int',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Transpose: {
      layer_name: 'Transpose',
      snake_name: 'transpose',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        axes: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Unlink: {
      layer_name: 'Unlink',
      snake_name: 'unlink',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    Unpooling: {
      layer_name: 'Unpooling',
      snake_name: 'unpooling',
      color: '#a58e7f',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        kernel: {
          optional: false
        }
      },
      arguments: {
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    VatNoise: {
      layer_name: 'VatNoise',
      snake_name: 'vat_noise',
      color: '#848484',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        w: {
          optional: false
        }
      },
      arguments: {
        base_axis: {
          default: 1,
          type: 'int',
          optional: true
        },
        eps: {
          default: 1.0,
          type: 'float',
          optional: true
        },
        n_outputs: {
          default: -1,
          type: 'int',
          optional: true
        },
        outputs: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ClipByNorm: {
      layer_name: 'ClipByNorm',
      snake_name: 'clip_by_norm',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        clip_norm: {
          optional: false
        }
      },
      arguments: {
        axis: {
          default: 'None',
          type: 'NoneType',
          optional: true
        }
      }
    },
    ClipByValue: {
      layer_name: 'ClipByValue',
      snake_name: 'clip_by_value',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        },
        min: {
          optional: false
        },
        max: {
          optional: false
        }
      },
      arguments: {}
    },
    Reduce: {
      layer_name: 'Reduce',
      snake_name: 'reduce',
      color: '#d77b6a',
      api_type: 'functions_api',
      inputs: {
        x: {
          optional: false
        }
      },
      arguments: {
        op: {
          default: 'sum',
          type: 'str',
          optional: true
        }
      }
    }
  },
  variables: {
    input: {
      layer_name: 'InputVariable',
      snake_name: 'input',
      color: '#000000',
      arguments: {}
    },
    output: {
      layer_name: 'OutputVariable',
      snake_name: 'output',
      color: '#000000',
      arguments: {}
    }
  }
}
export default nnablaCore
