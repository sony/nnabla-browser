

def str_to_bool(s):
    if isinstance(s, bool):
        return s

    lower = s.lower()
    if lower not in ["true", "false"]:
        raise ValueError("cannot convert {} to bool".format(s))

    return True if lower == "true" else False

