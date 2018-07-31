import Layer from './../editor/SDNLayer';
import Graph from './../currentGraph';
import Definition from "./../misc/Definitions"

const Path = require("path");

const eventSrc = new EventSource("/subscribe");

// initialize tabNames and monitoring list
let tabNames = [];

for (let x of window.Graphs.data()) {
    tabNames.push(x.name);
}

window.tabNames = tabNames;

const calcLayerPosition = array => {
    const GRID = Definition.EDIT.GRID.SIZE;
    const BOXHEIGHT = Definition.EDIT.LAYER.BOUNDING_BOX.HEIGHT;

    const pos = {"x": GRID, "y": GRID};

    if (array.length > 0) {
        pos.y = array[array.length - 1].y + BOXHEIGHT;
    }

    return pos
};

const getGraphInfoFromNNtxt = event => {
    const json = JSON.parse(event.data);

    const targets = json.network[0].function || [];

    let nodes = [], links = [];

    for (let x of targets) {
        const pos = calcLayerPosition(nodes);

        let layerInfo = {
            name: "",
            type: x.type,
            x: pos.x,
            y: pos.y,
            // properties: {},
            isNew: true
        };

        nodes.push(layerInfo)
    }

    return [nodes, links];
};

const getMonitorInfo = event => {
    return event.data.split("\n");
};

eventSrc.onmessage = event => {
    const id = event.lastEventId;
    const parentDir = Path.dirname(id);

    const splited = id.split(".");
    const ext = splited[splited.length - 1];
    const secondaryExt = splited[splited.length - 2];

    const graphIndex = window.tabNames.indexOf(parentDir);

    let graphInfo = {
        parentDirName: parentDir,
        name: id,
        nodes: [],
        links: [],
        monitors: []
    };

    // if already exist then get correspond graphInfo, else create new one

    graphInfo = window.Graphs.data()[graphIndex] || graphInfo;

    if (ext === "nntxt") {
        // for debug
        window.nntxtFromServer = JSON.parse(event.data);

        let [nodes, links] = getGraphInfoFromNNtxt(event);
        graphInfo["nodes"] = nodes;
        graphInfo["links"] = links;
    } else if (ext === "txt" && secondaryExt === "series") {
        let monitorData = getMonitorInfo(event);

        let monitorName = Path.basename(id);

        // check if the same name already exits
        const monitorIndex = graphInfo.monitors.indexOf(graphInfo.monitors.find(x => {
            return x.name === monitorName;
        }));

        if (monitorIndex > -1) {
            graphInfo.monitors[monitorIndex].data = monitorData;
        } else {
            graphInfo.monitors.push({
                name: monitorName, data: monitorData
            });
        }
    }

    if (graphIndex > -1) {
        window.Graphs.data()[graphIndex] = graphInfo;
    } else {
        window.Graphs.data().push(graphInfo);
        window.tabNames.push(parentDir);
    }
};