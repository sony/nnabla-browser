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

    const searchTargetFromDirectoryInfo = (id, propertyName, target) => {
        let filename;
        let parent;

        const checkExt = (path) => {
            const ext = Path.extname(path);
            if (propertyName === "nntxtFiles") {
                return ext === ".nntxt";
            } else if (propertyName === "monitorFiles") {
                return ext === ".txt";
            }
        };

        for (let dir of id.split("/")) {
            if (checkExt(dir)) {
                filename = dir;
                break;
            }

            let tmp_result = target.children.find(x => x.name === dir);
            if (typeof tmp_result === "undefined") {
                tmp_result = {name: dir, children: [], monitorFiles: [], nntxtFiles: []};
                target.children.push(tmp_result);
            }

            target = tmp_result
        }

        let index = target[propertyName].findIndex(x => x.name === filename);

        return [target, index, filename];
    };

    this.getGraphInfoFromNNtxt = event => {
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

    this.addDirectoryInfo = (id, propertyName, info, directoryInfo) => {
        let [target, index, filename] = searchTargetFromDirectoryInfo(id, propertyName, directoryInfo);

        if (index > -1) {
            target[propertyName][index].data = Object.assign({}, target[propertyName][index].data, info);
        } else {
            target[propertyName].push({
                name: filename,
                data: info
            });
        }
    };

    this.deleteDirectoryInfo = (id, propertyName, directoryInfo) => {
        let [target, index, filename] = searchTargetFromDirectoryInfo(id, propertyName, directoryInfo);

        if (index > -1) {
            target[propertyName].splice(index, 1);
            return true;
        }

        return false;
    };

    this.deleteChartInfo = (rootDir, id, chartInfo) => {
        let chartTitle = Path.basename(id).split(".")[0];
        let legend = Path.join(rootDir, Path.dirname(id));

        let chartIndex = chartInfo.findIndex(x => x.name === chartTitle);

        if (chartIndex > -1) {
            let dataIndex = chartInfo[chartIndex].data.findIndex(x => x.legend === legend);
            if (dataIndex > -1) {
                chartInfo[chartIndex].data.splice(dataIndex, 1);
                if (chartInfo[chartIndex].data.length < 1){
                    chartInfo.splice(chartIndex, 1);
                }
            }
        }
    }

};

export default new SSEhelper();
