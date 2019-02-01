import Definition from "./../misc/Definitions"
import {range} from "./arrayOperator"

const Path = require("path");

const SSEhelper = function () {

    const GRID = Definition.EDIT.GRID.SIZE;

    const createDummyInputLayer = variable => {
        return {
            inputParam: null, input: [], name: variable.dataName,
            output: [variable.variableName], type: "InputVariable"
        };
    };

    const createDummyOutputLayer = variable => {
        return {
            outputParam: null, input: [variable.variableName], name: variable.dataName,
            output: [], type: "OutputVariable"
        };
    };

    const layerRegisterCtor = function () {
        this.initialize = (parameters) => {
            this.counter = 0;
            this.layers = {};
            this.links = [];
            this.allParameters = parameters;
        };

        this.addLayer = (layer, depth) => {
            if (!this.layers.hasOwnProperty(layer.name)) { // first visit
                let visitCount = 1;
                let parameters = [];
                let buffers = [];

                // collect all function parameters
                for (let _input of layer.input) {
                    let varIndex = this.allParameters.findIndex(x => x.name === _input);
                    if (varIndex > -1) {
                        parameters.push(this.allParameters[varIndex]);
                    } else {
                        // check deprecated input
                        if (buffers.findIndex(x => x === _input) > -1) visitCount++;

                        buffers.push(_input);
                    }
                }

                this.layers[layer.name] = {
                    ...layer, input: buffers,
                    index: this.counter++, depth: [depth], visitCount, parameters
                };
            } else { // visit again
                this.layers[layer.name].depth.push(depth);
                this.layers[layer.name].visitCount++;
            }

            const retLayer = this.layers[layer.name];

            return [retLayer, retLayer.input.length <= retLayer.visitCount];
        };

        this.addLink = link => this.links.push(link);

        this.getDepthToLayers = () => {
            const depth2layers = {};

            Object.values(this.layers).forEach(layer => {
                const depthList = layer.depth;
                const maxDepth = Math.max(...depthList);

                if (layer.depth.length > 1) {
                    const minDepth = Math.min(...depthList);

                    for (let i of range(minDepth, maxDepth, true)) {
                        let slice = depthList.filter(x => x < i).length + 1;
                        if (depth2layers.hasOwnProperty(i)) depth2layers[i].needSlice += slice;
                        else depth2layers[i] = {needSlice: slice, layers: []};
                    }
                }

                if (depth2layers.hasOwnProperty(maxDepth)) depth2layers[maxDepth].layers.push({
                    ...layer,
                    depth: maxDepth
                });
                else depth2layers[maxDepth] = {needSlice: 0, layers: [{...layer, depth: maxDepth}]};
            });

            return depth2layers
        };

        this.getLinks = () => this.links; // for further update to do something like sort.

        this.initialize();
    };

    this.layerRegister = new layerRegisterCtor();

    const getLayerPosition = (depth, needSlice) => {
        return {x: GRID * (2 + needSlice * 15), y: GRID * (2 + depth * 4)}; // this calculation for x is bad
    };

    const setupGetNodeAndLinkRecursive = (functions, outputVariables) => {

        const recursive = (sourceLayer, sourceDepthFromRoot) => {
            for (let sourceOutput of sourceLayer.output) {

                // find user define output
                const outputVariableIndex = outputVariables.findIndex(v => v.variableName === sourceOutput);
                if (outputVariableIndex > -1) {
                    const tmpLayer = createDummyOutputLayer(outputVariables[outputVariableIndex]);

                    let [layer, _] = this.layerRegister.addLayer(tmpLayer, sourceDepthFromRoot + 1);

                    let link = {
                        source: sourceLayer.index,
                        destination: layer.index
                    };

                    this.layerRegister.addLink(link);
                }

                let destLayers = functions.filter(f => (f.input || []).find(name => name === sourceOutput));

                let depthIncrement = destLayers.length > 1 ? 2 : 1;

                for (let destLayer of destLayers) {
                    let tmpLayer = {
                        ...destLayer,
                    };

                    let [layer, isVisitEnough] = this.layerRegister.addLayer(tmpLayer, sourceDepthFromRoot + depthIncrement);

                    let link = {
                        source: sourceLayer.index,
                        destination: layer.index
                    };

                    this.layerRegister.addLink(link);

                    if (isVisitEnough) recursive(layer, Math.max(...layer.depth));
                }
            }
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

            const inputVariables = executor.dataVariable; //list
            const outputVariables = executor.outputVariable; //list

            const functions = [], noInputFunctions = [];
            network.function.forEach(f => {
                if (f.hasOwnProperty("input")) functions.push(f);
                else noInputFunctions.push({...f, input: []});
            });

            const allParameters = network.variable.filter(x => x.type === "Parameter");

            this.layerRegister.initialize(allParameters);

            let recursive = setupGetNodeAndLinkRecursive(functions, outputVariables);

            // create input nodes
            const inputLayers = [
                ...inputVariables.map(createDummyInputLayer), ...noInputFunctions,
            ];

            for (let inputLayer of inputLayers) {
                let [layer, _] = this.layerRegister.addLayer(inputLayer, 0);
                recursive(layer, 0);
            }

            const depthToLayers = this.layerRegister.getDepthToLayers();

            const nodes = [];
            for (let {needSlice, layers} of Object.values(depthToLayers)) {
                for (let layer of layers.sort((a, b) => a > b ? 1 : -1)) {
                    nodes.push({...layer, ...getLayerPosition(layer.depth, needSlice++)});
                }
            }

            nodes.sort((a, b) => a.index > b.index ? 1 : -1);

            const links = this.layerRegister.getLinks();

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
