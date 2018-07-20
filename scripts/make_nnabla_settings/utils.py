from configparser import ConfigParser


def open_ini_parser(filename):
    'Open windwos INI file parser'
    parser = ConfigParser(allow_no_value=True)
    parser.optionxform = str
    parser.read(filename)
    return parser


def get_option_value(parser, section, option, default=None):
    return parser.get(section, option) \
        if parser.has_option(section, option) else default


def soft_boolize(value):
    if isinstance(value, str):
        uppered = value.upper()
        if uppered == 'TRUE':
            return True
        elif uppered == 'FALSE':
            return False

    return value


def head_lower(string):
    return string[0].lower() + string[1:]
