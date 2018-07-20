var nNablaCore = {
  "layers": {
    "components": [
      {
        "name": "Input",
        "color": "0x000000",
        "parameterScope": null,
        "input": 0,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": "Top",
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Input",
            "required": true,
            "editable": true
          },
          {
            "type": "PIntArray",
            "value": "1,28,28",
            "name": "Size",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "x",
            "important": true,
            "name": "Dataset",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Size",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "SquaredError",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "SquaredError",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "HuberLoss",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "HuberLoss",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "huber_loss_param.delta",
            "name": "Delta",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "AbsoluteError",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "AbsoluteError",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "EpsilonInsensitiveLoss",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "EpsilonInsensitiveLoss",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Float",
            "argumentName": "epsilon_insensitive_loss_param.epsilon",
            "value": "0.0",
            "name": "Epsilon",
            "shortName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "BinaryCrossEntropy",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BinaryCrossEntropy",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "SigmoidCrossEntropy",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "SigmoidCrossEntropy",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "CategoricalCrossEntropy",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*SoftmaxLabelShape"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "CategoricalCrossEntropy",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "categorical_cross_entropy_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UIntArray",
            "value": "*CCEOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "SoftmaxCrossEntropy",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*SoftmaxLabelShape"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "SoftmaxCrossEntropy",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "softmax_cross_entropy_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UIntArray",
            "value": "*CCEOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "KLMultinomial",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "KLMultinomial",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "kl_multinomial_param.base_axis -a",
            "name": "BaseAxis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "q.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "q.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "q.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "1",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Parameter",
        "color": "0x7a997a",
        "parameterScope": null,
        "input": 0,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Parameter",
            "required": true,
            "editable": true
          },
          {
            "type": "PIntArray",
            "value": "*GraphOutput",
            "name": "Size",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Normal",
            "name": "Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHe",
              "NormalAffineGlorot",
              "NormalConvolutionHe",
              "NormalConvolutionGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "UniformConvolutionGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.01",
            "name": "InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Size",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "WorkingMemory",
        "color": "0x7a997a",
        "parameterScope": null,
        "input": 0,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "WorkingMemory",
            "required": true,
            "editable": true
          },
          {
            "type": "PIntArray",
            "value": "1,28,28",
            "name": "Size",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Normal",
            "name": "Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Size",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Affine",
        "color": "0x6aa1bd",
        "parameterScope": "affine",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*AffineWeightShape"
          },
          {
            "color": "0xa8a800",
            "enable": "*WithBias",
            "kind": "Parameter",
            "shape": "*OutShape"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Affine",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "100",
            "searchParameter": true,
            "argumentName": "n_outmaps -f",
            "name": "OutShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "WithBias",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "affine_param.base_axis -a",
            "editable": false,
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "NormalAffineGlorot",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*OutShape",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*SumParameterSize",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*WithBias:**OutShape",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*Input:**OutShape",
            "required": false,
            "name": "CostMultiplyAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Convolution",
        "color": "0x6aa1bd",
        "parameterScope": "conv",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*ConvolutionWeightShape"
          },
          {
            "color": "0xa8a800",
            "enable": "*WithBias",
            "kind": "Parameter",
            "shape": "*OutMaps"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Convolution",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "shortName": "Maps",
            "type": "PInt",
            "value": "16",
            "searchParameter": true,
            "argumentName": "outmaps",
            "name": "OutMaps",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "5,5",
            "important": true,
            "searchParameter": true,
            "argumentName": "kernel",
            "name": "KernelShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "WithBias",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Option",
            "value": "valid",
            "name": "BorderMode",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "valid",
              "full",
              "same"
            ]
          },
          {
            "type": "UIntArray",
            "value": "*ConvolutionPaddingSize",
            "argumentName": "convolution_param.pad",
            "name": "Padding",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "convolution_param.stride",
            "name": "Strides",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "convolution_param.dilation",
            "name": "Dilation",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PInt",
            "value": "1",
            "argumentName": "convolution_param.group",
            "name": "Group",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "convolution_param.base_axis -a",
            "editable": false,
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "NormalConvolutionGlorot",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalConvolutionHeForward",
              "NormalConvolutionHeBackward",
              "NormalConvolutionGlorot",
              "Uniform",
              "UniformConvolutionGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ConvolutionOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*SumParameterSize",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*WithBias:**Output",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*ConvolutionMultiplyAddSize",
            "required": false,
            "name": "CostMultiplyAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "DepthwiseConvolution",
        "color": "0x6aa1bd",
        "parameterScope": "depthwise_conv",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "Input[0]*Multiplier,KernelShape[0],KernelShape[1]"
          },
          {
            "color": "0xa8a800",
            "enable": "*WithBias",
            "kind": "Parameter",
            "shape": "*OutMaps"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "DepthwiseConvolution",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "Input[0]*Multiplier",
            "name": "OutMaps",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "5,5",
            "important": true,
            "searchParameter": true,
            "argumentName": "kernel",
            "name": "KernelShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "WithBias",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Option",
            "value": "valid",
            "name": "BorderMode",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "valid",
              "full",
              "same"
            ]
          },
          {
            "type": "UIntArray",
            "value": "*ConvolutionPaddingSize",
            "argumentName": "depthwise_convolution_param.pad",
            "name": "Padding",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "depthwise_convolution_param.stride",
            "name": "Strides",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "depthwise_convolution_param.dilation",
            "name": "Dilation",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "Input[0]",
            "visible": false,
            "name": "Group",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PInt",
            "value": "1",
            "argumentName": "depthwise_convolution_param.multiplier",
            "name": "Multiplier",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "depthwise_convolution_param.base_axis -a",
            "editable": false,
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "NormalConvolutionGlorot",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalConvolutionHeForward",
              "NormalConvolutionHeBackward",
              "NormalConvolutionGlorot",
              "Uniform",
              "UniformConvolutionGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ConvolutionOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*SumParameterSize",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*WithBias:**Output",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*ConvolutionMultiplyAddSize",
            "required": false,
            "name": "CostMultiplyAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Deconvolution",
        "color": "0x6aa1bd",
        "parameterScope": "deconv",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*ConvolutionWeightShapeDeconvolution"
          },
          {
            "color": "0xa8a800",
            "enable": "*WithBias",
            "kind": "Parameter",
            "shape": "*OutMaps"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Deconvolution",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "shortName": "Maps",
            "type": "PInt",
            "value": "16",
            "searchParameter": true,
            "argumentName": "outmaps -f",
            "name": "OutMaps",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "5,5",
            "important": true,
            "searchParameter": true,
            "argumentName": "kernel -f",
            "name": "KernelShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "WithBias",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0,0",
            "argumentName": "deconvolution_param.pad",
            "name": "Padding",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "deconvolution_param.stride",
            "name": "Strides",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "deconvolution_param.dilation",
            "name": "Dilation",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PInt",
            "value": "1",
            "argumentName": "deconvolution_param.group",
            "name": "Group",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "deconvolution_param.base_axis -a",
            "editable": false,
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "NormalConvolutionHeForward",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalConvolutionHeForward",
              "NormalConvolutionHeBackward",
              "NormalConvolutionGlorot",
              "Uniform",
              "UniformConvolutionGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*DeconvolutionOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*SumParameterSize",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*WithBias:**Output",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*ConvolutionMultiplyAddSize",
            "required": false,
            "name": "CostMultiplyAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Embed",
        "color": "0x6aa1bd",
        "parameterScope": "embed",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*EmbeddingWeightSize"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Embed",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PInt",
            "value": "100",
            "important": true,
            "name": "NumClass",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "32",
            "searchParameter": true,
            "important": true,
            "name": "Shape",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Uniform",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*EmbeddingOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*SumParameterSize",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "MaxPooling",
        "color": "0xa58e7f",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "MaxPooling",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "shortName": "Shape",
            "type": "PIntArray",
            "value": "2,2",
            "important": true,
            "argumentName": "max_pooling_param.kernel",
            "searchParameter": true,
            "name": "KernelShape",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "*KernelShape",
            "argumentName": "max_pooling_param.stride",
            "name": "Strides",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "max_pooling_param.ignore_border",
            "name": "IgnoreBorder",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0,0",
            "argumentName": "max_pooling_param.pad",
            "name": "Padding",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*PoolingOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "AveragePooling",
        "color": "0xa58e7f",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "AveragePooling",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "shortName": "Shape",
            "type": "PIntArray",
            "value": "2,2",
            "important": true,
            "argumentName": "average_pooling_param.kernel",
            "searchParameter": true,
            "name": "KernelShape",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "*KernelShape",
            "argumentName": "average_pooling_param.stride",
            "name": "Strides",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "average_pooling_param.ignore_border",
            "name": "IgnoreBorder",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0,0",
            "argumentName": "average_pooling_param.pad",
            "name": "Padding",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "average_pooling_param.including_pad",
            "name": "IncludingPad",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*PoolingOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "SumPooling",
        "color": "0xa58e7f",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "SumPooling",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "shortName": "Shape",
            "type": "PIntArray",
            "value": "2,2",
            "important": true,
            "argumentName": "sum_pooling_param.kernel",
            "searchParameter": true,
            "name": "KernelShape",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "*KernelShape",
            "argumentName": "sum_pooling_param.stride",
            "name": "Strides",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "sum_pooling_param.ignore_border",
            "name": "IgnoreBorder",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0,0",
            "argumentName": "sum_pooling_param.pad",
            "name": "Padding",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*PoolingOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Unpooling",
        "color": "0xa58e7f",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Unpooling",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "shortName": "Shape",
            "type": "PIntArray",
            "value": "2,2",
            "important": true,
            "argumentName": "unpooling_param.kernel",
            "searchParameter": true,
            "name": "KernelShape",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*UnpoolingOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Tanh",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Tanh",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input:+*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Sigmoid",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Sigmoid",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Abs",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Abs",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "ReLU",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "ReLU",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "BooleanOrMacro",
            "value": "*AutoInPlaceOnce",
            "argumentName": "relu_param.inplace",
            "name": "InPlace",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "CReLU",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "CReLU",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "crelu_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ConcatenateActivationOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LeakyReLU",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LeakyReLU",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.1",
            "important": true,
            "argumentName": "leaky_relu_param.alpha",
            "name": "Alpha",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "PReLU",
        "color": "0xd77b6a",
        "parameterScope": "prelu",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*PReluParameterSize"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "PReLU",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Int",
            "value": "0",
            "argumentName": "prelu_param.base_axis -a -f",
            "name": "BaseAxis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "shared -f",
            "editable": false,
            "name": "Shared",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "slope.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "slope.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.25",
            "name": "slope.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "slope.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*SumParameterSize",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiplyAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "ELU",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "ELU",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "important": true,
            "argumentName": "elu_param.alpha",
            "name": "Alpha",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "CELU",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "CELU",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "important": true,
            "argumentName": "celu_param.alpha",
            "name": "Alpha",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "celu_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ConcatenateActivationOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "SELU",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "SELU",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "1.05070098735548",
            "argumentName": "selu_param.scale",
            "name": "Scale",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.673263242354377",
            "important": true,
            "argumentName": "selu_param.alpha",
            "name": "Alpha",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input:+*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Swish",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Swish",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Softmax",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Softmax",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "softmax_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "RepeatStart",
        "color": "0xa18fb2",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RepeatStart",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PInt",
            "value": "3",
            "searchParameter": true,
            "name": "Times",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "argumentName": "repeat_param.repeat_id",
            "editable": false,
            "name": "ID",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "RepeatEnd",
        "color": "0xa18fb2",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RepeatEnd",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Text",
            "value": "RepeatStart",
            "argumentName": "repeat_param.repeat_id",
            "name": "ID",
            "shortName": "",
            "required": true
          },
          {
            "type": "PInt",
            "value": "*RepeatTimes",
            "argumentName": "repeat_param.times",
            "editable": false,
            "name": "Times",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "RecurrentInput",
        "color": "0xa18fb2",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RecurrentInput",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "recurrent_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "argumentName": "recurrent_param.repeat_id",
            "editable": false,
            "name": "ID",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ShapeExceptAxis",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "RecurrentOutput",
        "color": "0xa18fb2",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RecurrentOutput",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "recurrent_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "value": "RecurrentInput",
            "argumentName": "recurrent_param.repeat_id",
            "editable": false,
            "name": "ID",
            "shortName": "",
            "required": true
          },
          {
            "type": "PInt",
            "value": "*RecurrentLength",
            "argumentName": "recurrent_param.length",
            "editable": false,
            "name": "Length",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*RecurrentOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Delay",
        "color": "0xa18fb2",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Size"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Delay",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "*Input",
            "important": true,
            "argumentName": "size",
            "name": "Size",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "c",
            "name": "Initial.Dataset",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "Initial.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "0.0",
            "name": "Initial.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "",
            "argumentName": "recurrent_param.repeat_id",
            "editable": false,
            "name": "ID",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Size",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "FixedPointQuantize",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "FixedPointQuantize",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "fixed_point_quantize_param.sign",
            "name": "Sign",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PInt",
            "value": "8",
            "argumentName": "fixed_point_quantize_param.n",
            "name": "N",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0625",
            "argumentName": "fixed_point_quantize_param.delta",
            "name": "Delta",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "fixed_point_quantize_param.ste_fine_grained",
            "name": "STEFineGrained",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Pow2Quantize",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Pow2Quantize",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "pow2_quantize_param.sign",
            "name": "Sign",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "pow2_quantize_param.with_zero",
            "name": "WithZero",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PInt",
            "value": "8",
            "argumentName": "pow2_quantize_param.n",
            "name": "N",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "1",
            "argumentName": "pow2_quantize_param.m",
            "name": "M",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "pow2_quantize_param.ste_fine_grained",
            "name": "STEFineGrained",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "BinaryConnectAffine",
        "color": "0x6aa1bd",
        "parameterScope": "bicon_affine",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*AffineWeightShape"
          },
          {
            "shortName": "Wb",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*AffineWeightShape"
          },
          {
            "color": "0xa8a800",
            "enable": "*WithBias",
            "kind": "Parameter",
            "shape": "*OutShape"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BinaryConnectAffine",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "100",
            "argumentName": "outshape",
            "searchParameter": true,
            "name": "OutShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "with_bias",
            "name": "WithBias",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "binary_connect_affine_param.base_axis -a",
            "editable": false,
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "UniformAffineGlorot",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "Wb.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "Wb.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Wb.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Wb.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*OutShape",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*Input:**OutShape",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*AffineParameterSizeDiv32",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "BinaryConnectConvolution",
        "color": "0x6aa1bd",
        "parameterScope": "bicon_conv",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*ConvolutionWeightShape"
          },
          {
            "shortName": "Wb",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*ConvolutionWeightShape"
          },
          {
            "color": "0xa8a800",
            "enable": "*WithBias",
            "kind": "Parameter",
            "shape": "*OutMaps"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BinaryConnectConvolution",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "shortName": "Maps",
            "type": "PInt",
            "value": "16",
            "searchParameter": true,
            "argumentName": "outmaps",
            "name": "OutMaps",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "5,5",
            "important": true,
            "searchParameter": true,
            "argumentName": "kernel",
            "name": "KernelShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "WithBias",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Option",
            "value": "valid",
            "name": "BorderMode",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "valid",
              "full",
              "same"
            ]
          },
          {
            "type": "UIntArray",
            "value": "*ConvolutionPaddingSize",
            "argumentName": "binary_connect_convolution_param.pad",
            "name": "Padding",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "binary_connect_convolution_param.stride",
            "name": "Strides",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "binary_connect_convolution_param.dilation",
            "name": "Dilation",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PInt",
            "value": "1",
            "argumentName": "binary_connect_convolution_param.group",
            "editable": false,
            "name": "Group",
            "shortName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "binary_connect_convolution_param.base_axis -a",
            "editable": false,
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "UniformConvolutionGlorot",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalConvolutionHeForward",
              "NormalConvolutionHeBackward",
              "NormalConvolutionGlorot",
              "Uniform",
              "UniformConvolutionGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "Wb.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "Wb.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalConvolutionHeForward",
              "NormalConvolutionHeBackward",
              "NormalConvolutionGlorot",
              "Uniform",
              "UniformConvolutionGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Wb.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Wb.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ConvolutionOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*ConvolutionParameterSizeDiv32",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*ConvolutionMultiplyAddSize",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "BinaryWeightAffine",
        "color": "0x6aa1bd",
        "parameterScope": "bwn_affine",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*AffineWeightShape"
          },
          {
            "shortName": "Wb",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*AffineWeightShape"
          },
          {
            "color": "0xa8a800",
            "enable": "*WithBias",
            "kind": "Parameter",
            "shape": "*OutShape"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BinaryWeightAffine",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "100",
            "argumentName": "outshape",
            "searchParameter": true,
            "name": "OutShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "with_bias",
            "name": "WithBias",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "binary_weight_affine_param.base_axis -a",
            "editable": false,
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "UniformAffineGlorot",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "Wb.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "Wb.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Wb.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Wb.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*OutShape",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*Calc +*Input:**OutShape",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*AffineParameterSizeDiv32",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "BinaryWeightConvolution",
        "color": "0x6aa1bd",
        "parameterScope": "bwn_conv",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*ConvolutionWeightShape"
          },
          {
            "shortName": "Wb",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*ConvolutionWeightShape"
          },
          {
            "color": "0xa8a800",
            "enable": "*WithBias",
            "kind": "Parameter",
            "shape": "*OutMaps"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BinaryWeightConvolution",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "shortName": "Maps",
            "type": "PInt",
            "value": "16",
            "searchParameter": true,
            "argumentName": "outmaps",
            "name": "OutMaps",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "5,5",
            "important": true,
            "searchParameter": true,
            "argumentName": "kernel",
            "name": "KernelShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "WithBias",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Option",
            "value": "valid",
            "name": "BorderMode",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "valid",
              "full",
              "same"
            ]
          },
          {
            "type": "UIntArray",
            "value": "*ConvolutionPaddingSize",
            "argumentName": "binary_weight_convolution_param.pad",
            "name": "Padding",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "binary_weight_convolution_param.stride",
            "name": "Strides",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "1,1",
            "argumentName": "binary_weight_convolution_param.dilation",
            "name": "Dilation",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "PInt",
            "value": "1",
            "argumentName": "binary_weight_convolution_param.group",
            "editable": false,
            "name": "Group",
            "shortName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "binary_weight_convolution_param.base_axis -a",
            "editable": false,
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "UniformConvolutionGlorot",
            "name": "W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalConvolutionHeForward",
              "NormalConvolutionHeBackward",
              "NormalConvolutionGlorot",
              "Uniform",
              "UniformConvolutionGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "Wb.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "Wb.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalConvolutionHeForward",
              "NormalConvolutionHeBackward",
              "NormalConvolutionGlorot",
              "Uniform",
              "UniformConvolutionGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Wb.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Wb.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ConvolutionOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*ConvolutionParameterSizeDiv32",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*ConvolutionMultiplyAddSize",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "BinaryTanh",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BinaryTanh",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input:*2",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input:*2",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "BinarySigmoid",
        "color": "0xd77b6a",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BinarySigmoid",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Unit",
        "color": "0x6aa1bd",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Unit",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Text",
            "important": true,
            "shortName": "Net",
            "name": "Network",
            "argumentName": "",
            "value": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "required": false,
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*UnitOutput",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "required": false,
            "name": "CostMultiplyAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Argument",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 0,
        "output": 0,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Argument",
            "required": true,
            "editable": true
          },
          {
            "type": "Text",
            "value": "1",
            "important": true,
            "name": "Value",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Option",
            "value": "Text",
            "name": "Type",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Boolean",
              "BooleanOrMacro",
              "Int",
              "IntArray",
              "PInt",
              "PIntArray",
              "PIntArrays",
              "UInt",
              "UIntArray",
              "Float",
              "FloatArray",
              "FloatArrays",
              "Text",
              "File"
            ]
          },
          {
            "type": "Boolean",
            "value": false,
            "name": "Search",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          }
        ]
      },
      {
        "name": "LSTM",
        "color": "0x6aa1bd",
        "parameterScope": "lstm",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Size"
          },
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Size"
          },
          {
            "shortName": "AW",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*LSTMWeightShape",
            "parameterScope": "Affine/affine/W"
          },
          {
            "shortName": "Ab",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*Size",
            "parameterScope": "Affine/affine/b"
          },
          {
            "shortName": "IW",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*LSTMWeightShape",
            "parameterScope": "IGate/affine/W"
          },
          {
            "shortName": "Ib",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*Size",
            "parameterScope": "IGate/affine/b"
          },
          {
            "shortName": "FW",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*LSTMWeightShape",
            "parameterScope": "FGate/affine/W"
          },
          {
            "shortName": "Fb",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*Size",
            "parameterScope": "FGate/affine/b"
          },
          {
            "shortName": "OW",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*LSTMWeightShape",
            "parameterScope": "OGate/affine/W"
          },
          {
            "shortName": "Ob",
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*Size",
            "parameterScope": "OGate/affine/b"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LSTM",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "100",
            "important": true,
            "name": "Size",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "name": "Axis",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "argumentName": "recurrent_param.repeat_id",
            "important": true,
            "shortName": "RGID",
            "name": "RecurrentGroupID",
            "editable": true,
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "*ShapeExceptAxis",
            "editable": false,
            "name": "InnerShape",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PInt",
            "value": "*AxisSize",
            "editable": false,
            "name": "Length",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "h",
            "required": false,
            "name": "H.Initial.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "H.Initial.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "0.0",
            "name": "H.Initial.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "c",
            "required": false,
            "name": "C.Initial.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "C.Initial.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "0.0",
            "name": "C.Initial.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "Affine.W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "NormalAffineGlorot",
            "name": "Affine.W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "Affine.W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "Affine.W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "Affine.b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "Affine.b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "Affine.b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "Affine.b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "IGate.W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "NormalAffineGlorot",
            "name": "IGate.W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "IGate.W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "IGate.W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "IGate.b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "IGate.b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "IGate.b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "IGate.b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "FGate.W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "NormalAffineGlorot",
            "name": "FGate.W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "FGate.W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "FGate.W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "FGate.b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "FGate.b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "FGate.b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "FGate.b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "OGate.W.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "NormalAffineGlorot",
            "name": "OGate.W.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "NormalAffineHeForward",
              "NormalAffineHeBackward",
              "NormalAffineGlorot",
              "Uniform",
              "UniformAffineGlorot",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "OGate.W.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "OGate.W.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "OGate.b.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "OGate.b.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "OGate.b.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "OGate.b.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*RecurrentOutputSize2",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*SumParameterSize",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Size:**Length:*4",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*InnerShape:+*Size:**Size:**Length:*4",
            "required": false,
            "name": "CostMultiplyAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Sum",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Sum",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0",
            "argumentName": "sum_param.axes -a",
            "name": "Axes",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "sum_param.keep_dims",
            "name": "KeepDims",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*SumOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Mean",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Mean",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0",
            "argumentName": "mean_param.axes -a",
            "name": "Axes",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "mean_param.keep_dims",
            "name": "KeepDims",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*SumOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Prod",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Prod",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0",
            "argumentName": "prod_param.axes -a",
            "name": "Axes",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "prod_param.keep_dims",
            "name": "KeepDims",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*SumOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Max",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Max",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0",
            "argumentName": "max_param.axes -a",
            "name": "Axes",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "max_param.keep_dims",
            "name": "KeepDims",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*SumOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Min",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Min",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0",
            "argumentName": "min_param.axes -a",
            "name": "Axes",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "min_param.keep_dims",
            "name": "KeepDims",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*SumOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Log",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Log",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Exp",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Exp",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Sign",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Sign",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "sign_param.alpha",
            "name": "Alpha",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "BatchMatmul",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BatchMatmul",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*MatmulOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*MatmulMultiplyAddSize",
            "required": false,
            "name": "CostMultiplyAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "AddScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "AddScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "add_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "MulScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "MulScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "mul_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "RSubScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RSubScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "r_sub_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "RDivScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RDivScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "r_div_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "PowScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "PowScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "2.0",
            "argumentName": "pow_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input:+*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "RPowScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RPowScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "r_pow_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input:+*Input",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "MaximumScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "MaximumScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "maximum_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "MinimumScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "MinimumScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "minimum_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Add2",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Add2",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "BooleanOrMacro",
            "value": "*AutoInPlace",
            "argumentName": "add2_param.inplace",
            "name": "InPlace",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSizewBC",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Sub2",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Sub2",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "required": false,
            "important": true,
            "name": "R.Dataset",
            "shortName": "",
            "argumentName": "",
            "value": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "R.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "R.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Mul2",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Mul2",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSizewBC",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Div2",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Div2",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "required": false,
            "important": true,
            "name": "R.Dataset",
            "shortName": "",
            "argumentName": "",
            "value": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "R.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "R.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostDivision",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Pow2",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Pow2",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "required": false,
            "important": true,
            "name": "R.Dataset",
            "shortName": "",
            "argumentName": "",
            "value": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "R.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "R.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output:+*Output",
            "required": false,
            "name": "CostExp",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Maximum2",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Maximum2",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSizewBC",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Minimum2",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Minimum2",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSizewBC",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LogicalAnd",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LogicalAnd",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LogicalOr",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LogicalOr",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LogicalXor",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LogicalXor",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Equal",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Equal",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "NotEqual",
        "color": "0x848484",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "NotEqual",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*BasicMathOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "GreaterEqual",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "GreaterEqual",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "required": false,
            "important": true,
            "name": "R.Dataset",
            "shortName": "",
            "argumentName": "",
            "value": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "R.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "R.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Greater",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Greater",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "required": false,
            "important": true,
            "name": "R.Dataset",
            "shortName": "",
            "argumentName": "",
            "value": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "R.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "R.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LessEqual",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LessEqual",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "required": false,
            "important": true,
            "name": "R.Dataset",
            "shortName": "",
            "argumentName": "",
            "value": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "R.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "R.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Less",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Less",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "required": false,
            "important": true,
            "name": "R.Dataset",
            "shortName": "",
            "argumentName": "",
            "value": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "Constant",
            "name": "R.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "R.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Output",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LogicalAndScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LogicalAndScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "logical_and_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LogicalOrScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LogicalOrScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "logical_or_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LogicalXorScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LogicalXorScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "logical_xor_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "EqualScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "EqualScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "equal_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "NotEqualScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "NotEqualScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "not_equal_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "GreaterEqualScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "GreaterEqualScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "greater_equal_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "GreaterScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "GreaterScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "greater_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LessEqualScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LessEqualScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "less_equal_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LessScalar",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LessScalar",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphIO",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "less_scalar_param.val",
            "important": true,
            "name": "Value",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "LogicalNot",
        "color": "0x848484",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "LogicalNot",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostIf",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "BinaryError",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BinaryError",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "TopNError",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*SoftmaxLabelShape"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "TopNError",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "top_n_error_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UInt",
            "value": "1",
            "argumentName": "top_n_error_param.n",
            "important": true,
            "name": "N",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "y",
            "required": false,
            "important": true,
            "name": "T.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "T.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "T.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*CCEOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "Boolean",
            "value": true,
            "name": "IsLossFunction",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "BatchNormalization",
        "color": "0xc0c0c0",
        "parameterScope": "bn",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*BatchNormalizationShape"
          },
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*BatchNormalizationShape"
          },
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*BatchNormalizationShape"
          },
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*BatchNormalizationShape"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "BatchNormalization",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0",
            "argumentName": "batch_normalization_param.axes -a",
            "name": "Axes",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.9",
            "argumentName": "batch_normalization_param.decay_rate",
            "name": "DecayRate",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0001",
            "argumentName": "batch_normalization_param.eps",
            "name": "Epsilon",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "BooleanOrMacro",
            "value": true,
            "argumentName": "batch_normalization_param.batch_stat -test=False",
            "name": "BatchStat",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "beta.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "beta.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "beta.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "beta.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "gamma.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "gamma.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "gamma.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "name": "gamma.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "mean.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "mean.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "mean.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "mean.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "var.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "var.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "var.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "var.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "*SumParameterSize",
            "required": false,
            "name": "CostParameter",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Dropout",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Dropout",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "Float",
            "value": "0.5",
            "important": true,
            "searchParameter": true,
            "argumentName": "dropout_param.p",
            "name": "P",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Int",
            "value": "-1",
            "argumentName": "dropout_param.seed",
            "name": "Seed",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "SkipAtInspection",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostMultiply",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "Concatenate",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Concatenate",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "concatenate_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ConcatenateOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Reshape",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Reshape",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "100",
            "argumentName": "reshape_param.shape -b",
            "name": "OutShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*ReshapeOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Broadcast",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Broadcast",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "*Input",
            "argumentName": "broadcast_param.shape -b",
            "name": "OutShape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*OutShape",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Flip",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Flip",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "UIntArray",
            "value": "0",
            "argumentName": "flip_param.axes -a",
            "important": true,
            "name": "Axes",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Shift",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Shift",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "IntArray",
            "value": "0,0",
            "argumentName": "shift_param.shifts -r",
            "important": true,
            "name": "Shift",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Option",
            "value": "nearest",
            "argumentName": "shift_param.border_mode",
            "important": true,
            "name": "BorderMode",
            "shortName": "",
            "editable": true,
            "required": true,
            "option": [
              "nearest",
              "reflect"
            ]
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Transpose",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Transpose",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "UIntArray",
            "value": "0,1,2",
            "argumentName": "transpose_param.axes -a -0",
            "important": true,
            "name": "Axes",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*TransposeOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Slice",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Slice",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "UIntArray",
            "value": "0,0,0",
            "argumentName": "slice_param.start -r -f",
            "important": true,
            "name": "Start",
            "shortName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "UIntArray",
            "value": "*Input",
            "argumentName": "slice_param.stop -r -f",
            "important": true,
            "name": "Stop",
            "shortName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "UIntArray",
            "value": "1,1,1",
            "argumentName": "slice_param.step -r -f",
            "name": "Step",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*SliceOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Stack",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": -1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Stack",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArrays",
            "value": "*GraphInputs",
            "name": "Inputs",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "stack_param.axis -a",
            "name": "Axis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*StackOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "MatrixDiag",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "MatrixDiag",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "argumentName": "inshape",
            "name": "Input",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*MatrixDiagOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "MatrixDiagPart",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "MatrixDiagPart",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*MatrixDiagPartOutputSize",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "VATNoise",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0x00a0b0",
            "enable": true,
            "kind": "Data",
            "shape": "*Input"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "VATNoise",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "vat_noise_param.base_axis -a",
            "name": "BaseAxis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0001",
            "argumentName": "vat_noise_param.eps",
            "name": "Epsilon",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": true,
            "type": "Dataset",
            "value": "buf",
            "required": false,
            "important": true,
            "name": "Buf.Dataset",
            "shortName": "",
            "argumentName": ""
          },
          {
            "editable": true,
            "type": "Option",
            "value": "None",
            "name": "Buf.Generator",
            "shortName": "",
            "argumentName": "",
            "required": true,
            "option": [
              "None",
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "editable": true,
            "type": "Float",
            "value": "1.0",
            "name": "Buf.GeneratorMultiplier",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          }
        ]
      },
      {
        "name": "Unlink",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Unlink",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Identity",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Identity",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "Comment",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 0,
        "output": 0,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "Comment",
            "required": true,
            "editable": true
          },
          {
            "type": "Text",
            "value": "",
            "required": false,
            "name": "Comment",
            "shortName": "",
            "argumentName": "",
            "editable": true
          }
        ]
      },
      {
        "name": "OneHot",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "OneHot",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "PIntArray",
            "value": "100",
            "argumentName": "one_hot_param.shape",
            "important": true,
            "name": "Shape",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Shape",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "RandomCrop",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RandomCrop",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "PIntArray",
            "value": "*Input",
            "argumentName": "random_crop_param.shape",
            "important": true,
            "name": "Shape",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "argumentName": "random_crop_param.base_axis -a",
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Int",
            "value": "-1",
            "argumentName": "random_crop_param.seed",
            "name": "Seed",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Shape",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "RandomFlip",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RandomFlip",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": true,
            "type": "UIntArray",
            "value": "0",
            "argumentName": "random_flip_param.axes -a",
            "important": true,
            "name": "Axes",
            "shortName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "argumentName": "random_flip_param.base_axis -a",
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Int",
            "value": "-1",
            "argumentName": "random_flip_param.seed",
            "name": "Seed",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "SkipAtInspection",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "RandomShift",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "RandomShift",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "IntArray",
            "value": "0,0",
            "argumentName": "random_shift_param.shifts -r",
            "important": true,
            "name": "Shift",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Option",
            "value": "nearest",
            "argumentName": "random_shift_param.border_mode",
            "important": true,
            "name": "BorderMode",
            "shortName": "",
            "editable": true,
            "required": true,
            "option": [
              "nearest",
              "reflect"
            ]
          },
          {
            "editable": false,
            "type": "UInt",
            "value": "0",
            "argumentName": "random_shift_param.base_axis -a",
            "name": "BaseAxis",
            "shortName": "",
            "required": true
          },
          {
            "type": "Int",
            "value": "-1",
            "argumentName": "random_shift_param.seed",
            "name": "Seed",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "name": "SkipAtInspection",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "MeanSubtraction",
        "color": "0xc0c0c0",
        "parameterScope": "mean_subtraction",
        "input": 1,
        "output": -1,
        "inputSideConnector": [
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "*RunningMeanShape"
          },
          {
            "color": "0xa8a800",
            "enable": true,
            "kind": "Parameter",
            "shape": "1"
          }
        ],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "MeanSubtraction",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "UInt",
            "value": "0",
            "argumentName": "mean_subtraction_param.base_axis -a",
            "name": "BaseAxis",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": true,
            "argumentName": "mean_subtraction_param.update_running_mean -test=False",
            "name": "UpdateRunningMean",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "value": "*Name",
            "name": "ParameterScope",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "mean.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "mean.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "mean.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "mean.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Text",
            "required": false,
            "name": "t.File",
            "shortName": "",
            "argumentName": "",
            "value": "",
            "editable": false
          },
          {
            "type": "Option",
            "value": "Constant",
            "name": "t.Initializer",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true,
            "option": [
              "Normal",
              "Uniform",
              "Constant"
            ]
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "t.InitializerMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "name": "t.LRateMultiplier",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Input",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "editable": false,
            "type": "PInt",
            "value": "*Calc +*Input",
            "required": false,
            "name": "CostAdd",
            "shortName": "",
            "argumentName": ""
          }
        ]
      },
      {
        "name": "ImageAugmentation",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 1,
        "output": -1,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "ImageAugmentation",
            "required": true,
            "editable": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*GraphInput",
            "name": "Input",
            "shortName": "",
            "argumentName": "",
            "required": true
          },
          {
            "type": "PIntArray",
            "value": "*Input",
            "argumentName": "image_augmentation_param.shape",
            "important": true,
            "name": "Shape",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "UIntArray",
            "value": "0,0",
            "argumentName": "image_augmentation_param.pad",
            "name": "Pad",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "image_augmentation_param.min_scale",
            "name": "MinScale",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "image_augmentation_param.max_scale",
            "name": "MaxScale",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "image_augmentation_param.angle",
            "name": "Angle",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "image_augmentation_param.aspect_ratio",
            "name": "AspectRatio",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "image_augmentation_param.distortion",
            "name": "Distortion",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "image_augmentation_param.flip_lr",
            "name": "FlipLR",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "image_augmentation_param.flip_ud",
            "name": "FlipUD",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "image_augmentation_param.brightness",
            "name": "Brightness",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "image_augmentation_param.brightness_each",
            "name": "BrightnessEach",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "1.0",
            "argumentName": "image_augmentation_param.contrast",
            "name": "Contrast",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.5",
            "argumentName": "image_augmentation_param.contrast_center",
            "name": "ContrastCenter",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "argumentName": "image_augmentation_param.contrast_each",
            "name": "ContrastEach",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Float",
            "value": "0.0",
            "argumentName": "image_augmentation_param.noise",
            "name": "Noise",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Int",
            "value": "-1",
            "argumentName": "image_augmentation_param.seed",
            "name": "Seed",
            "shortName": "",
            "editable": true,
            "required": true
          },
          {
            "type": "Boolean",
            "value": false,
            "name": "SkipAtInspection",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          },
          {
            "editable": false,
            "type": "PIntArray",
            "value": "*Shape",
            "name": "Output",
            "shortName": "",
            "argumentName": "",
            "required": true
          }
        ]
      },
      {
        "name": "StructureSearch",
        "color": "0xc0c0c0",
        "parameterScope": null,
        "input": 0,
        "output": 0,
        "inputSideConnector": [],
        "outputSideConnector": [],
        "layout": null,
        "property": [
          {
            "name": "Name",
            "argumentName": "name",
            "type": "Text",
            "value": "StructureSearch",
            "required": true,
            "editable": true
          },
          {
            "type": "Boolean",
            "value": true,
            "important": true,
            "name": "Search",
            "shortName": "",
            "argumentName": "",
            "editable": true,
            "required": true
          }
        ]
      }
    ],
    "categories": [
      {
        "name": "IO",
        "components": [
          "Input"
        ]
      },
      {
        "name": "Loss",
        "components": [
          "SquaredError",
          "HuberLoss",
          "AbsoluteError",
          "EpsilonInsensitiveLoss",
          "BinaryCrossEntropy",
          "SigmoidCrossEntropy",
          "CategoricalCrossEntropy",
          "SoftmaxCrossEntropy",
          "KLMultinomial"
        ]
      },
      {
        "name": "Parameter",
        "components": [
          "Parameter",
          "WorkingMemory"
        ]
      },
      {
        "name": "Basic",
        "components": [
          "Affine",
          "Convolution",
          "DepthwiseConvolution",
          "Deconvolution",
          "Embed"
        ]
      },
      {
        "name": "Pooling",
        "components": [
          "MaxPooling",
          "AveragePooling",
          "SumPooling",
          "Unpooling"
        ]
      },
      {
        "name": "Activation",
        "components": [
          "Tanh",
          "Sigmoid",
          "Abs",
          "ReLU",
          "CReLU",
          "LeakyReLU",
          "PReLU",
          "ELU",
          "CELU",
          "SELU",
          "Swish",
          "Softmax"
        ]
      },
      {
        "name": "LoopControl",
        "components": [
          "RepeatStart",
          "RepeatEnd",
          "RecurrentInput",
          "RecurrentOutput",
          "Delay"
        ]
      },
      {
        "name": "Quantize",
        "components": [
          "FixedPointQuantize",
          "Pow2Quantize",
          "BinaryConnectAffine",
          "BinaryConnectConvolution",
          "BinaryWeightAffine",
          "BinaryWeightConvolution",
          "BinaryTanh",
          "BinarySigmoid"
        ]
      },
      {
        "name": "Unit",
        "components": [
          "Unit",
          "Argument",
          "LSTM"
        ]
      },
      {
        "name": "Math",
        "components": [
          "Sum",
          "Mean",
          "Prod",
          "Max",
          "Min",
          "Log",
          "Exp",
          "Sign",
          "BatchMatmul"
        ]
      },
      {
        "name": "Arithmetic (Scalar)",
        "components": [
          "AddScalar",
          "MulScalar",
          "RSubScalar",
          "RDivScalar",
          "PowScalar",
          "RPowScalar",
          "MaximumScalar",
          "MinimumScalar"
        ]
      },
      {
        "name": "Arithmetic (2 Inputs)",
        "components": [
          "Add2",
          "Sub2",
          "Mul2",
          "Div2",
          "Pow2",
          "Maximum2",
          "Minimum2"
        ]
      },
      {
        "name": "Logical",
        "components": [
          "LogicalAnd",
          "LogicalOr",
          "LogicalXor",
          "Equal",
          "NotEqual",
          "GreaterEqual",
          "Greater",
          "LessEqual",
          "Less",
          "LogicalAndScalar",
          "LogicalOrScalar",
          "LogicalXorScalar",
          "EqualScalar",
          "NotEqualScalar",
          "GreaterEqualScalar",
          "GreaterScalar",
          "LessEqualScalar",
          "LessScalar",
          "LogicalNot"
        ]
      },
      {
        "name": "Validation",
        "components": [
          "BinaryError",
          "TopNError"
        ]
      },
      {
        "name": "Others",
        "components": [
          "BatchNormalization",
          "Dropout",
          "Concatenate",
          "Reshape",
          "Broadcast",
          "Flip",
          "Shift",
          "Transpose",
          "Slice",
          "Stack",
          "MatrixDiag",
          "MatrixDiagPart",
          "VATNoise",
          "Unlink",
          "Identity",
          "Comment",
          "Output",
          "Unsupported"
        ]
      },
      {
        "name": "Others(Pre Process)",
        "components": [
          "OneHot",
          "RandomCrop",
          "RandomFlip",
          "RandomShift",
          "MeanSubtraction",
          "ImageAugmentation"
        ]
      },
      {
        "name": "Setting",
        "components": [
          "StructureSearch"
        ]
      }
    ]
  },
  "solvers": [
    {
      "default": false,
      "_id": "adadelta_param",
      "name": "Adadelta",
      "parameters": [
        {
          "_id": "LearningRate",
          "name": "lr",
          "initial_value": "1.0"
        },
        {
          "_id": "Decay",
          "name": "decay",
          "initial_value": "0.95"
        },
        {
          "_id": "Epsilon",
          "name": "eps",
          "initial_value": "1.0e-6s"
        }
      ]
    },
    {
      "default": false,
      "_id": "adagrad_param",
      "name": "Adagrad",
      "parameters": [
        {
          "_id": "LearningRate",
          "name": "lr",
          "initial_value": "0.01"
        },
        {
          "_id": "Epsilon",
          "name": "eps",
          "initial_value": "1.0e-8"
        }
      ]
    },
    {
      "default": true,
      "_id": "adam_param",
      "name": "Adam",
      "parameters": [
        {
          "_id": "Alpha",
          "name": "alpha",
          "initial_value": "0.001"
        },
        {
          "_id": "Beta1",
          "name": "beta1",
          "initial_value": "0.9"
        },
        {
          "_id": "Beta2",
          "name": "beta2",
          "initial_value": "0.999"
        },
        {
          "_id": "Epsilon",
          "name": "eps",
          "initial_value": "1.0e-8"
        }
      ]
    },
    {
      "default": false,
      "_id": "adamax_param",
      "name": "Adamax",
      "parameters": [
        {
          "_id": "Alpha",
          "name": "alpha",
          "initial_value": "0.002"
        },
        {
          "_id": "Beta1",
          "name": "beta1",
          "initial_value": "0.9"
        },
        {
          "_id": "Beta2",
          "name": "beta2",
          "initial_value": "0.999"
        },
        {
          "_id": "Epsilon",
          "name": "eps",
          "initial_value": "1.0e-8"
        }
      ]
    },
    {
      "default": false,
      "_id": "momentum_param",
      "name": "Momentum",
      "parameters": [
        {
          "_id": "LearningRate",
          "name": "lr",
          "initial_value": "0.01"
        },
        {
          "_id": "Momentum",
          "name": "momentum",
          "initial_value": "0.9"
        }
      ]
    },
    {
      "default": false,
      "_id": "nesterov_param",
      "name": "Nesterov",
      "parameters": [
        {
          "_id": "LearningRate",
          "name": "lr",
          "initial_value": "0.01"
        },
        {
          "_id": "Momentum",
          "name": "momentum",
          "initial_value": "0.9"
        }
      ]
    },
    {
      "default": false,
      "_id": "rmsprop_param",
      "name": "RMSprop",
      "parameters": [
        {
          "_id": "LearningRate",
          "name": "lr",
          "initial_value": "0.001"
        },
        {
          "_id": "Decay",
          "name": "decay",
          "initial_value": "0.9"
        },
        {
          "_id": "Epsilon",
          "name": "eps",
          "initial_value": "1.0e-8"
        }
      ]
    },
    {
      "default": false,
      "_id": "sgd_param",
      "name": "Sgd",
      "parameters": [
        {
          "_id": "LearningRate",
          "name": "lr",
          "initial_value": "0.01"
        }
      ]
    }
  ]
}
