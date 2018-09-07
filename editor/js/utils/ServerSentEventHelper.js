import Definition from "./../misc/Definitions"

const Path = require("path");

const SSEhelper = function () {

    const GRID = Definition.EDIT.GRID.SIZE;

    const indexRegisterCtor = function () {
        this.initialize = () => {
            this.layerIndex = 0;
            this.depthWiseIndex = {};
        };

        this.getLayerIndex = () => {
            return this.layerIndex++;
        };

        this.getDepthWiseIndex = (depth) => {
            // console.log(this.depthWiseIndex[depth]);
            if (this.depthWiseIndex.hasOwnProperty(depth)) {
                return ++this.depthWiseIndex[depth];
            } else {
                return this.depthWiseIndex[depth] = 0;
            }
        };

        this.initialize();
    };

    this.indexRegister = new indexRegisterCtor();

    const getLayerPosition = depth => {
        const depthWiseIndex = this.indexRegister.getDepthWiseIndex(depth);

        return {x: GRID * (2 + depthWiseIndex * 15), y: GRID * (2 + depth * 4)};
    };

    const setupGetNodeAndLinkRecursive = (network, outputVariables) => {
        const visit = [];

        const recursive = (sourceNode, depthFromNode) => {
            let nodes = [], links = [];

            let source = {
                layerIndex: sourceNode.layerIndex,
                linkIndex: 1,
                x: sourceNode.x + GRID * 5,
                y: sourceNode.y + 41
            };

            for (let sourceOutput of sourceNode.output) {

                // user define output
                if (outputVariables.findIndex(v => v.variableName === sourceOutput) > -1) {
                    let _node = {
                        layerIndex: this.indexRegister.getLayerIndex(),
                        inputParam: null, input: [sourceOutput], name: sourceOutput,
                        output: [], type: "OutputVariable",
                        ...getLayerPosition(depthFromNode)
                    };

                    let _link = {
                        source,
                        destination: {
                            layerIndex: _node.layerIndex,
                            linkIndex: 0,
                            x: _node.x + GRID * 5,
                            y: _node.y - 1}
                    };

                    nodes = [...nodes, _node];
                    links = [...links, _link];
                }

                let destNodes = network.function.filter(f => f.input.find(name => name === sourceOutput));

                for (let destNode of destNodes) {
                    let _node = {
                        ...destNode,
                        layerIndex: this.indexRegister.getLayerIndex(),
                        ...getLayerPosition(depthFromNode)
                    };

                    let _link = {
                        source,
                        destination: {
                            layerIndex: _node.layerIndex,
                            linkIndex: 0,
                            x: _node.x + GRID * 5,
                            y: _node.y - 1
                        }
                    };

                    if (visit.findIndex(x => x === _node.name) === -1) { // if not already visited this node
                        visit.push(_node.name);

                        let [_nodes, _links] = recursive(_node, depthFromNode + 1);

                        nodes = [...nodes, _node, ..._nodes];
                        links = [...links, _link, ..._links];
                    }
                }
            }

            return [nodes, links];
        };

        return recursive;
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

        for (let executor of json.executor || []) {
            const network = json.network.find(x => x.name === executor.networkName);

            const outputVariables = executor.outputVariable; //list

            this.indexRegister.initialize();

            // create input nodes
            let inputNodes = [];
            for (let v of executor.dataVariable) {
                let inputNode = {
                    layerIndex: this.indexRegister.getLayerIndex(),
                    inputParam: null, input: [], name: v.dataName,
                    output: [v.variableName], type: "InputVariable",
                    ...getLayerPosition(0)
                };

                inputNodes.push(inputNode);
            }

            let nodes = [...inputNodes], links = [];

            let recursive = setupGetNodeAndLinkRecursive(network, outputVariables);
            for (let inputNode of inputNodes) {
                let [_nodes, _links] = recursive(inputNode, 1);
                nodes = [...nodes, ..._nodes];
                links = [...links, ..._links];
            }

            graphInfoArray.push({name: executor.name, nodes, links});
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
