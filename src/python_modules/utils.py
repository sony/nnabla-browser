

def sse_msg_encoding(_data, _event=None, _id=None):
    if not _data:
        return ""

    maps = {
        "data": _data,
        "event": _event,
        "id": _id
    }

    ret = []
    for k, v in maps.items():
        if v is None:
            continue

        for line in v.split("\n"):
            ret.append("{}: {}".format(k, line))

    return "{}\n\n".format("\n".join(ret))


def str_to_bool(s):
    if isinstance(s, bool):
        return s

    lower = s.lower()
    if lower not in ["true", "false"]:
        raise ValueError("cannot convert {} to bool".format(s))

    return True if lower == "true" else False

