import Definition from "./../misc/Definitions"

const Path = require("path");

const SSEhelper = function () {

    const GRID = Definition.EDIT.GRID.SIZE;

    const layerRegisterCtor = function () {
        this.initialize = (parameters) => {
            this.counter = 0;
            this.layers = {};
            this.depthWiseIndex = {};
            this.parameters = parameters;
        };

        this.addLayer = (layer, depth) => {
            if (!this.layers.hasOwnProperty(layer.name)) { // first visit

                let visitCount = 1;
                let parameters = [];
                let buffers = [];

                // collect all function parameters
                for (let _input of layer.input) {
                    let varIndex = this.parameters.findIndex(x => x.name === _input);
                    if (varIndex > -1) {
                        parameters.push(this.parameters[varIndex]);
                        visitCount++;
                    } else {
                        buffers.push(_input);
                    }
                }

                this.layers[layer.name] = {
                    ...layer,
                    index: this.counter++, depth: [depth], visitCount, parameters};
            } else { // visit again
                this.layers[layer.name].depth.push(depth);
                this.layers[layer.name].visitCount++;
            }

            const retLayer = this.layers[layer.name];

            return [retLayer, retLayer.input.length <= retLayer.visitCount];
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

        return {x: GRID * (2 + depthWiseIndex * 15), y: GRID * (2 + depth * 2)};
    };

    const setupGetNodeAndLinkRecursive = (network, outputVariables) => {

        const recursive = (sourceLayer, depthFromRoot) => {
            let links = [];

            for (let sourceOutput of sourceLayer.output) {

                // find user define output
                if (outputVariables.findIndex(v => v.variableName === sourceOutput) > -1) {
                    let tmpLayer = {
                        outputParam: null, input: [sourceOutput], name: sourceOutput,
                        output: [], type: "OutputVariable",
                    };

                    let [layer, _] = this.layerRegister.addLayer(tmpLayer, depthFromRoot);

                    let link = {
                        source: sourceLayer.index,
                        destination: layer.index
                    };

                    links = [...links, link];

                    continue;
                }

                let destLayers = network.function.filter(f => (f.input || []).find(name => name === sourceOutput));

                for (let destLayer of destLayers) {
                    let tmpLayer = {
                        ...destLayer,
                    };

                    let [layer, isVisitEnough] = this.layerRegister.addLayer(tmpLayer, depthFromRoot);

                    let link = {
                        source: sourceLayer.index,
                        destination: layer.index
                    };

                    links = [...links, link];

                    console.log(isVisitEnough);

                    if (isVisitEnough) { // if not already visited this node

                        let _links = recursive(layer,  Math.max(...layer.depth) + 1);

                        links = [...links, ..._links];
                    }
                }
            }

            return links;
        };

        return recursive;
    };


    this.getGraphInfoFromNNtxt = event => {
        const json = JSON.parse(event.data);

        const graphInfoArray = [];
        const networks = json.network || [];
        const executors = json.executor || [];

        for (let executor of executors) {
            const network = networks.find(x => x.name === executor.networkName);

            if (typeof network === "undefined") continue;

            const outputVariables = executor.outputVariable; //list

            const allParameters = network.variable.filter(x => x.type === "Parameter");

            this.layerRegister.initialize(allParameters);

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

            nodes.sort((a,b) =>  a.index > b.index ? 1 : -1);

            graphInfoArray.push({name: executor.name, nodes, links});

            console.log(this.layerRegister.depthWiseIndex);
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

    this.getCsvResult = event => {
        const split = event.data.split("\n");
        const keys = [...split.splice(0, 1)[0].split(", "), "correctness"];

        let values = [];

        for (let elm of split) {
            let [path, pred, label] = elm.split(", ");
            values.push([path, parseInt(pred), parseInt(label), pred === label]);
        }

        return {keys, values};
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
