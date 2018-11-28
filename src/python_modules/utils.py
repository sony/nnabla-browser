

def sse_msg_encoding(_data, _event=None, _id=None):
    if not _data:
        return ""

    maps = [
        ("event", _event),
        ("id", _id),
        ("data", _data)
    ]

    ret = []
    for k, v in maps:
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

