/**
 * Format conversion utility; 'NNabla Project File' v.s. 'NNabla Web Console Configration.'
 */

/**
 * Convert 'NNabla project file' into 'configuration' JavaScript object.
 * @param project 'NNabla Project File' as string.
 * @param parseDatasetUri optional boolean. if this param set true, URI option in Dataset section
 * parsed as 'tenant_id/dataset_id'.
 * @return 'configuraion' object. (NOT JSON String)
 */
var importProject;
/**
 * Convert 'configuration' JavaScript object into 'NNabla project file.'
 * @param configuration 'Web Console' configuration JavaScript object.
 * @param forNewJob optional boolean. this controls URI value in DATASET section.
 * @return 'NNabla Project File' string. (line separeter is '\r\n')
 *
 * For NNabla project download pourpose, you can ommit 'forNewJob' parameter;
 * DATASET URI value of generated project file data to be "" if 'forNewJob' parameter
 * is false-evaluated object(undefined, null, 0, false, etc.), otherwise
 * DATASET URI value set to dataset id. (and also NumData value for 'Main' dataset
 * points dataset row number)
 */
var exportProject;

var nnc; // to share ini parser with editor.

(() => {
    const _iniToObject = (() => {
        const reSection = /^\[(.+)\]$/;
        const reKeyValue = /^([^;=][^=]*)(?:=(.*))?$/;

        return iniText => {
            var project = {};
            var obj = {};

            iniText.replace(/\r\n/g, '\n').split('\n').forEach(line => {
                const matchesSection = reSection.exec(line);
                if (matchesSection) {
                    const section = matchesSection[1];
                    obj = project[section] || {};
                    project[section] = obj;
                } else {
                    const matchesKeyValuePair = reKeyValue.exec(line);
                    if (matchesKeyValuePair) {
                        const key = matchesKeyValuePair[1];
                        const val = matchesKeyValuePair[2];
                        obj[key] = val === undefined ? null : val;
                    }
                }
            });
            return project;
        };
    })();
    nnc = Object.assign(nnc || {}, {parseIni: _iniToObject,});

    var _SVC_GRID = 20; // XXX avoid reference of Definitions.EDIT.GRID.SIZE for script's independency.
    var _APP_GRID = 24;
    var __adjustPosForService = v => parseInt(Number(v) * _SVC_GRID / _APP_GRID);
    var __adjustPosForApplication = v => parseInt(v * _APP_GRID / _SVC_GRID);

    importProject = (project_content, parseDatasetUri) => { // set global
        var project = {
            objects: function (section, number) {
                var array = [];
                number = Number(number);
                for (var i = 0; i < number; ++i) {
                    array.push(this[section + '_' + i]);
                }
                return array;
            },

            networks: function () {
                var array = [];
                for (var i = 0; i < this.Global.NumNetwork; ++i) {
                    var name = this.Global["Network_" + i];
                    var prefix = name ? name + '_' : '';
                    array.push({
                        name: name || 'Main',
                        layers: this.objects(prefix + "Layer", this[prefix + "Network_Global"].NumLayer),
                        links: this.objects(prefix + "Link", this[prefix + "Network_Global"].NumLink),
                    });
                }
                return array;
            },

            updaterParameter: function (optimizer) {
                var array = [];
                for (var i = 0; i < optimizer.SolverParameterNum; ++i) {
                    array.push({
                        name: optimizer["SolverParameterName_" + i],
                        value: optimizer["SolverParameter_" + i],
                    });
                }
                return array;
            }
        };

        Object.assign(project, _iniToObject(project_content));
        if (!('Global' in project)) {
            project.Global = {NumNetwork: 1, Network_0: ''};
        }

        var propertiesOf = function (layer) {
            var _properties = {};
            for (var i = 0; i < layer.NumProperty; ++i) {
                var key = layer["Property_" + i + "_Name"];
                _properties[key] = layer["Property_" + i + "_Value"];
            }
            var name = _properties.Name;
            delete _properties.Name;
            return {name: name, properties: _properties};
        };
        // if parseDatasetUri is true, generate {id: yyy, tenante_id: xxx} from 'xxx/yyy' formatted string.
        var _parseDatasetUri = parseDatasetUri ? uri => {
            var match = /(.*)\/(.*)/.exec(uri);
            return match ? {tenant_id: match[1], id: match[2],} : {};
        } : dataset => {
        };
        var structure_search = project.StructureSearch;
        // return configuration converted from ProjectFile.
        return {
            networks: project.networks().map(network => {
                var nodeMap = {};
                // build node map
                network.layers.forEach(layer => nodeMap[layer.ID] = Object.assign(propertiesOf(layer), {
                    type: layer.Type,
                    x: __adjustPosForService(layer.Position_0),
                    y: __adjustPosForService(layer.Position_1),
                }));
                return {
                    name: network.name,
                    nodes: Object.values(nodeMap), // extract all nodes
                    links: network.links.map(link => {
                        var from_node = nodeMap[link.SourceLayerID];
                        var to_node = nodeMap[link.DestLayerID];
                        return {
                            from_node: from_node.name,
                            from_name: _connectorIndexToName(from_node.type, link.SourcePinIndex),
                            to_node: to_node.name,
                            to_name: _connectorIndexToName(to_node.type, link.DestPinIndex),
                        };
                    })
                };
            }),
            main_dataset_name: project['Dataset_' + project.Dataset.MainIndex].Name,
            datasets: project.objects("Dataset", project.Dataset.Num).map(dataset => {
                return Object.assign({
                    id: '',
                    name: dataset.Name,
                    original_name: '',
                    tobe_shuffled: dataset.Shuffle !== '0',
                    tobe_cached: dataset.EnableCache !== '0',
                    tobe_normalized_image: dataset.ImageNormalization !== '0',
                    samples: 0,
                    columns: 0,
                }, _parseDatasetUri(dataset.URI));
            }),
            description: project.Description.Text.replace(/\\n/g, '\n'),
            epoch: Number(project.Config.MaxEpoch),
            batch: Number(project.Config.BatchSize),
            save_best: project.Config.SaveBest !== '0',
            structure_search: {
                enable: structure_search.Enabled !== '0',
                method: structure_search.Method,
                optimize_for: structure_search.Objective,
                validation_min: Number(structure_search.Validation_Min),
                validation_max: Number(structure_search.Validation_Max),
                multiply_add_min: Number(structure_search.CostMultiplyAdd_Min),
                multiply_add_max: Number(structure_search.CostMultiplyAdd_Max),
                early_stopping: structure_search.EarlyStopping !== '0',
                time_limit: structure_search.TimeLimit,
            },
            optimizers: project.objects("Optimizer", project.Config.NumOptimizer).map(optimizer => {
                return {
                    name: optimizer.Optimizer_Name,
                    network: optimizer.Optimizer_NetworkName,
                    dataset: optimizer.Optimizer_DatasetName,
                    weight_decay: Number(optimizer.WeightDecay),
                    learning_rate_multiplier: Number(optimizer.LearningRateMultiplier),
                    update_interval: Number(optimizer.LearningRateUpdateInterval),
                    updater: {
                        interval: Number(optimizer.UpdateInterval),
                        name: optimizer.SolverName,
                        parameters: project.updaterParameter(optimizer)
                            .map(updater => Object.assign({_id: updater.name.toLowerCase()}, updater)),
                    }
                };
            }),
            monitors: project.objects("Monitor", project.Config.NumMonitor).map(monitor => {
                return {
                    name: monitor.Monitor_Name,
                    network: monitor.Monitor_NetworkName,
                    dataset: monitor.Monitor_DatasetName
                };
            }),
            executors: project.objects("Executor", project.Config.NumExecutor).map(executor => {
                return {
                    name: executor.Executor_Name,
                    network: executor.Executor_NetworkName,
                    dataset: executor.Executor_DatasetName,
                    number_of_evaluation: Number(executor.NumEvaluations),
                    adopt_result: executor.RepeatEvaluationType === '0' ? 'mean' : 'last',
                    back_propagation: executor.NeedBackPropagation === '1',
                };
            }),
        };
    };

    exportProject = (configuration, is_create_job) => { // set global
        var makeNetworkName = (network, index) => "Network_" + index + "=" + network.name;
        var makeNetworkSection = (network, index) => [
            "[" + network.name + "_Network_Global]",
            "NumLayer=" + network.nodes.length,
            "NumLink=" + network.links.length,
            network.nodes.map(makeNodeSectionFor(network)).join('\r\n'),
            network.links.map(makeLinkSectionFor(network)).join('\r\n'),
        ].join('\r\n');
        var makeNodeSectionFor = network => (node, index) => [
            "[" + network.name + "_Layer_" + index + "]",
            "ID=" + (node.id = index),
            "Type=" + node.type,
            "Position_0=" + __adjustPosForApplication(node.x),
            "Position_1=" + __adjustPosForApplication(node.y),
            "Position_2=" + 240,
            "Position_3=" + 48,
            "Property_0_Name=Name",
            "Property_0_Value=" + node.name,
            Object.keys(node.properties).map(makePropertyBodyFor(node)).join('\r\n'),
            "NumProperty=" + (Object.keys(node.properties).length + 1),
        ].filter(node_param => Boolean(node_param)).join('\r\n'); // for node.properties is empty.
        var makeBooleanString = function (value) {
            return (typeof value === "boolean") ? (value ? "True" : "False") : value;
        };
        var makePropertyBodyFor = node => ((property, index) =>
            "Property_" + (index + 1) + "_Name=" + property + "\r\n" +
            "Property_" + (index + 1) + "_Value=" + makeBooleanString(node.properties[property]));
        var makeLinkSectionFor = network => (link, index) => {
            var source_node = network.nodes.find(node => node.name == link.from_node);
            var destination_node = network.nodes.find(node => node.name == link.to_node);
            return [
                "[" + network.name + "_Link_" + index + "]",
                "ID=" + index,
                "SourceLayerID=" + source_node.id,
                "SourcePinIndex=" + _connectorNameToIndex(source_node.type, link.from_name),
                "DestLayerID=" + destination_node.id,
                "DestPinIndex=" + _connectorNameToIndex(destination_node.type, link.to_name),
            ].join('\r\n');
        };
        var _mkDatasetUri = is_create_job ? (tenant, id) => (tenant && id ? tenant + '/' + id : '') : (tenant, id) => '';
        var makeDatasetSection = (dataset, index) => [
            "[Dataset_" + index + "]",
            "Name=" + dataset.name,
            "URI=" + _mkDatasetUri(dataset.tenant_id, dataset.id),
            "Shuffle=" + (dataset.tobe_shuffled ? 1 : 0),
            "EnableCache=" + (dataset.tobe_cached ? 1 : 0),
            "ImageNormalization=" + (dataset.tobe_normalized_image ? 1 : 0),
            "NumData=" + (is_create_job ? dataset.samples : 0)
        ].join('\r\n');
        var makeOptimizerSection = (optimizer, index) => [
            "[Optimizer_" + index + "]",
            "Optimizer_Name=" + optimizer.name,
            "Optimizer_NetworkName=" + optimizer.network,
            "Optimizer_DatasetName=" + optimizer.dataset,
            "UpdateInterval=" + optimizer.updater.interval,
            "SolverName=" + optimizer.updater.name,
            "SolverParameterNum=" + optimizer.updater.parameters.length,
            optimizer.updater.parameters.map((parameter, index) => {
                return [
                    "SolverParameterName_" + index + "=" + parameter.name,
                    "SolverParameter_" + index + "=" + parameter.value,
                ].join('\r\n');
            }).join('\r\n'),
            "WeightDecay=" + optimizer.weight_decay,
            "LearningRateMultiplier=" + optimizer.learning_rate_multiplier,
            "LearningRateUpdateInterval=" + optimizer.update_interval,
        ].join('\r\n');
        var makeMonitorSection = (monitor, index) => [
            "[Monitor_" + index + "]",
            "Monitor_Name=" + monitor.name,
            "Monitor_NetworkName=" + monitor.network,
            "Monitor_DatasetName=" + monitor.dataset,
        ].join('\r\n');
        var makeExecutorSection = (executor, index) => [
            "[Executor_" + index + "]",
            "Executor_Name=" + executor.name,
            "Executor_NetworkName=" + executor.network,
            "Executor_DatasetName=" + executor.dataset,
            "NumEvaluations=" + executor.number_of_evaluation,
            "RepeatEvaluationType=" + (executor.adopt_result == 'mean' ? 0 : 1),
            "NeedBackPropagation=" + (executor.back_propagation ? 1 : 0),
        ].join('\r\n');

        return [
            "[Engine]",
            "SDeepEngineType=NNabla",
            "RNNTrainingMode=0",
            "[Global]",
            "NumNetwork=" + configuration.networks.length,
            configuration.networks.map(makeNetworkName).join('\r\n'),
            configuration.networks.map(makeNetworkSection).join('\r\n'),
            // "[Dataset]",
            // "Num=" + configuration.datasets.length,
            // "MainIndex=" + configuration.datasets.findIndex(dataset => dataset.name == configuration.main_dataset_name),
            // configuration.datasets.map(makeDatasetSection).join('\r\n'),
            "[Description]",
            "Text=" + configuration.description.replace(/\n/g, '\\n'),
            "[Config]",
            "MaxEpoch=" + configuration.epoch,
            "SaveBest=" + (configuration.save_best ? 1 : 0),
            "BatchSize=" + configuration.batch,
            "NumOptimizer=" + configuration.optimizers.length,
            "NumMonitor=" + configuration.monitors.length,
            "NumExecutor=" + configuration.executors.length,
            configuration.optimizers.map(makeOptimizerSection).join('\r\n'),
            configuration.monitors.map(makeMonitorSection).join('\r\n'),
            configuration.executors.map(makeExecutorSection).join('\r\n'),
            "[StructureSearch]",
            "Enabled=" + (configuration.structure_search.enable ? 1 : 0),
            "Method=" + configuration.structure_search.method,
            "Objective=" + configuration.structure_search.optimize_for,
            "Validation_Min=" + configuration.structure_search.validation_min,
            "Validation_Max=" + configuration.structure_search.validation_max,
            "CostMultiplyAdd_Min=" + configuration.structure_search.multiply_add_min,
            "CostMultiplyAdd_Max=" + configuration.structure_search.multiply_add_max,
            "EarlyStopping=0", // XXX for Day1
            "TimeLimit=", // XXX for Day1
            "SetLearningRateOfConvolutionAsZero=0",
        ].join('\r\n');
    };

    // Helper object to convert between name and index of InputSideConnector of Layer Component.
    var _inputSideConnector = (() => {
        var map = {};
        nNablaCore.layers.components.forEach(component => {
            var isc = component.inputSideConnector;
            var len = isc.length;
            map[component.name] = {
                indexBy: name => {
                    var index = isc.findIndex(obj => obj.name === name);
                    return index === -1 ? 0 : index + 1;
                },
                nameBy: index => {
                    return index > 0 && index - 1 < len ? isc[index - 1].name : null;
                },
            };
        });
        return {of: type => map[type] || {indexBy: name => 0, nameBy: index => null,}};
    })();

    // get input side connector name from pin index.
    var _connectorIndexToName = (type, pinIndex) => {
        return _inputSideConnector.of(type).nameBy(pinIndex);
    };

    // get input side connector index from name.
    var _connectorNameToIndex = (type, name) => {
        return _inputSideConnector.of(type).indexBy(name);
    };

})();
