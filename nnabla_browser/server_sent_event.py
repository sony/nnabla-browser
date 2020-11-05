class ServerSentEvent(object):
    def __init__(self, _data, _event=None, _id=None):
        self.data = _data
        self.event = _event
        self.id = _id

        self.map = {"data": _data, "event": _event, "id": _id}

    def msg_encode(self):
        if not self.data:
            return ""

        ret = []
        for k, v in self.map.items():
            if v is None:
                continue

            for _v in v.split("\n"):
                ret.append("{}: {}".format(k, _v))

        return "{}\n\n".format("\n".join(ret))
