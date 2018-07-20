# coding: utf-8

"""
helper script
"""

import os

from utils import open_ini_parser, get_option_value, soft_boolize, head_lower


def parse_layer_component(dir_path):
    """create python dictionary object which has all information about all nnabla layers

    @param dir_path path of directory which includes layer_component.txt
    @return dictionary object
    """

    parser = open_ini_parser(os.path.join(dir_path, 'layer_component.txt'))

    categories = list()
    components = list()

    for category in parser.options("Category"):
        layers = parser.options(category)

        # append element to components field
        category_dir = os.path.join(dir_path, category)
        _components, _hiddens = _get_components(category_dir, layers)

        components += _components

        # append element to category field
        layers = [layer for layer in layers if layer not in _hiddens]
        categories.append({"name": category,
                           "components": layers})

    return {'components': components, 'categories': categories}


class Dict(dict):
    def __init__(self, *args):

        if len(args) > 1 or not isinstance(args[0], dict):
            raise AssertionError()

        if len(args[0]) > 0:
            args = {head_lower(key): soft_boolize(value) for key, value in args[0].items()}

        super().__init__(args)

    def __setitem__(self, key, value):
        super().__setitem__(key, soft_boolize(value))


def _get_components(dir_path, layers):
    ret = list()
    hiddens = list()
    for layer in layers:
        parser = open_ini_parser(os.path.join(dir_path, "{}.txt".format(layer)))

        if not soft_boolize(get_option_value(parser, "Global", "Hidden", default="False")):
            info = Dict({
                "name": layer,
                "color": get_option_value(parser, "Display", "Color", default="0xc0c0c0"),
                "parameterScope": get_option_value(parser, "Global", "ParameterScope"),
                "input": _map_pin_type(get_option_value(parser, "IO", "Input", default="Single")),
                "output": _map_pin_type(get_option_value(parser, "IO", "Output", default="Multiple")),
                'inputSideConnector': _make_side_connector(parser, 'Input'),
                'outputSideConnector': _make_side_connector(parser, 'Output'),
                'layout': get_option_value(parser, 'Layout', 'Default_Position_Vertical'),
                'property': _make_properties(parser, layer)
            })

            ret.append(info)
        else:
            hiddens.append(layer)

    return ret, hiddens


def _map_pin_type(value):
    ret = -1

    if value == 'Single':
        ret = 1

    elif value == 'None':
        ret = 0

    return ret


def _make_side_connector(parser, endpoint):
    ret = list()
    target = "{}SideConnector".format(endpoint)

    if parser.has_section(target):
        for name in parser.options(target):
            tmp = Dict({head_lower(option): soft_boolize(value)
                        for option, value in parser.items("_".join([target, name]))})
            tmp["name"] = name

            ret.append(tmp)


    return ret


def _make_default_property(layer):
    ret = Dict({"name": "Name", "argumentName": "name", "type": "Text",
                "value": layer, "required": True, "editable": True})

    return ret


def _make_properties(parser, layer):
    ret = list()
    ret.append(_make_default_property(layer))

    for prop in parser.options("Property"):
        obj = Dict({key: value for key, value in parser.items("Property_{}".format(prop))})

        obj["name"] = prop
        obj['shortName'] = obj.get('shortName', '')
        obj['argumentName'] = obj.get('argumentName', '')
        obj['value'] = obj.get('value', '')
        obj['editable'] = obj.get('editable', 'True')
        obj['required'] = obj.get('required', 'True')

        if obj['type'] == 'Option':
            section = 'Property_{}_{}'.format(prop, 'Option')
            obj['option'] = parser.options(section)
        elif obj['type'] == 'File':
            # Convert File type 'READ ONLY' text.
            obj['editable'] = False
            obj['required'] = False
            obj['type'] = 'Text'

        ret.append(obj)

    return ret
