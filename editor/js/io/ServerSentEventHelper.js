import Definition from "./../misc/Definitions"

const Path = require("path");

const SSEhelper = function() {

    const calcLayerPosition = array => {
        const GRID = Definition.EDIT.GRID.SIZE;
        const BOXHEIGHT = Definition.EDIT.LAYER.BOUNDING_BOX.HEIGHT;

        const pos = {"x": GRID, "y": GRID};

        if (array.length > 0) {
            pos.y = array[array.length - 1].y + BOXHEIGHT;
        }

        return pos
    };

    this.getFileType = path => {
        const split = path.split(".");
        const ext = split[split.length - 1];
        const secondaryExt = split[split.length - 2];

        if (ext === "nntxt") {
            return "nntxtFiles";
        } else if (ext === "txt" && secondaryExt === "series") {
            return "monitorFiles";
        } else {
            return false;
        }
    };

    this.getGraphInfoFromNNtxt = event => {
        const json = JSON.parse(event.data);

        const graphInfoArray = [];
        for (let network of json.network || {}) {
            let graphInfo = {
                name: network.name,
                nodes: [],
                links: []
            };

            // currently layer property is ignored.
            for (let layer of network.function || []) {
                const pos = calcLayerPosition(graphInfo.nodes);

                let layerInfo = Object.assign({}, layer, {x: pos.x, y: pos.y});

                graphInfo.nodes.push(layerInfo);
            }

            graphInfoArray.push(graphInfo);

        }

        return graphInfoArray;
    };

    this.getMonitorInfo = event => {
        const split = event.data.split("\n");

        let times = [], values = [];

        for (let elm of split) {
            let [t, v] = elm.split(" ");
            times.push(Number(t));
            values.push(Number(v));
        }

        return {t: times, v: values}
    };

    this.deleteChartInfo = (rootDir, id, store) => {
        let o = {
            chartTitle: Path.basename(id).split(".")[0],
            data: {
                name: Path.join(rootDir, Path.dirname(id))
            }
        };

        store.commit("deleteChartData", o)
    }

};

export default new SSEhelper();
