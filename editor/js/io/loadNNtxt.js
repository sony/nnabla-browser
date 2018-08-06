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
    const splited = event.data.split("\n");

    let times = [], values = [];

    for (let elm of splited) {
        let [t, v] = elm.split(" ");
        times.push(Number(t));
        values.push(Number(v));
    }

    return {t: times, v: values}
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

    let monitorName = Path.basename(id);
    const monitorIndex = graphInfo.monitors.indexOf(graphInfo.monitors.find(x => {
        return x.name === monitorName;
    }));


    if (event.data === "delete") {
        if (ext === "nntxt" && graphIndex > -1) {
            window.Graphs.data()[graphIndex].nodes = [];
            window.Graphs.data()[graphIndex].links = [];
            window.tabNames.some(function (v, i) {
                if (v === parentDir) window.tabNames.splice(i, 1);
            });

            // graph.hide is only for delete
            window.Graphs.data()[graphIndex].hide = true;
        } else if (ext === "txt" && secondaryExt === "series" && monitorIndex > -1) {
            window.Graphs.data()[graphIndex].monitors.splice(monitorIndex, 1);
        }
    } else {
        if (ext === "nntxt") {
            let [nodes, links] = getGraphInfoFromNNtxt(event);
            graphInfo.nodes = nodes;
            graphInfo.links = links;
        } else if (ext === "txt" && secondaryExt === "series") {
            let monitorData = getMonitorInfo(event);

            // check if the same name already exits
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
    }

};

// for rendering monitor results
window.monitorInfo = [];
