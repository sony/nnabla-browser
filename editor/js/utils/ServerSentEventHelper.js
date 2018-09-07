import Definition from "./../misc/Definitions"

const Path = require("path");

const SSEhelper = function () {

    const GRID = Definition.EDIT.GRID.SIZE;

    const layerRegisterCtor = function () {
        this.initialize = () => {
            this.counter = 0;
            this.layers = {};
            this.depthWiseIndex = {};
        };

        this.addLayer = (layer, depth) => {
            let isRegister;
            if (!this.layers.hasOwnProperty(layer.name)) {
                this.layers[layer.name] = {...layer, index: this.counter, depth: [depth]};
                this.counter++;
                isRegister = true;
            } else {
                this.layers[layer.name].depth.push(depth);
                isRegister = false
            }

            return [this.layers[layer.name], isRegister];
        };

        this.getLayers = () => {
            return Object.values(this.layers).sort((a, b) => Math.max(...a.depth) > Math.max(...b.depth) ? 1 : -1)
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

    this.layerRegister = new layerRegisterCtor();

    const getLayerPosition = depth => {
        const depthWiseIndex = this.layerRegister.getDepthWiseIndex(depth);

        return {x: GRID * (2 + depthWiseIndex * 15), y: GRID * (2 + depth * 4)};
    };

    const setupGetNodeAndLinkRecursive = (network, outputVariables) => {

        const recursive = (sourceLayer, depthFromRoot) => {
            let links = [];

            for (let sourceOutput of sourceLayer.output) {

                // user define output
                if (outputVariables.findIndex(v => v.variableName === sourceOutput) > -1) {
                    let tmpLayer = {
                        inputParam: null, input: [sourceOutput], name: sourceOutput,
                        output: [], type: "OutputVariable",
                    };

                    let [layer, _] = this.layerRegister.addLayer(tmpLayer, depthFromRoot);

                    let link = {
                        source: sourceLayer.index,
                        destination: layer.index
                    };

                    links = [...links, link];
                }

                let destLayers = network.function.filter(f => f.input.find(name => name === sourceOutput));

                for (let destLayer of destLayers) {
                    let tmpLayer = {
                        ...destLayer,
                    };

                    let [layer, isRegister] = this.layerRegister.addLayer(tmpLayer, depthFromRoot);

                    let link = {
                        source: sourceLayer.index,
                        destination: layer.index
                    };

                    links = [...links, link];

                    if (isRegister) { // if not already visited this node

                        let _links = recursive(layer, depthFromRoot + 1);

                        links = [...links, ..._links];
                    }
                }
            }

            return links;
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

            this.layerRegister.initialize();

            // create input nodes
            let inputLayers = [];
            for (let v of executor.dataVariable) {
                let inputLayer= {
                    inputParam: null, input: [], name: v.dataName,
                    output: [v.variableName], type: "InputVariable",
                };

               inputLayers.push(this.layerRegister.addLayer(inputLayer, 0)[0]);
            }

            let links = [];

            let recursive = setupGetNodeAndLinkRecursive(network, outputVariables);
            for (let inputLayer of inputLayers) {
                let  _links = recursive(inputLayer, 1);
                links = [...links, ..._links];
            }

            const layers = this.layerRegister.getLayers();

            const nodes = [];
            for (let layer of layers){
                let depth = Math.max(...layer.depth);
                if (layer.depth.length > 1) {
                    let startIndex = Math.min(...layer.depth);
                    for (let i = startIndex; i < depth; i++){
                        nodes[i].x += GRID * 15;
                    }
                }
                nodes.push({...layer, depth: depth, ...getLayerPosition(depth)})
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
