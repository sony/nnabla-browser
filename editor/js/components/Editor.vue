<template>
    <div>
        <editor-application-bar v-bind:loaded="isLoadEnd"
                                @show-right-content="showRightContent"
        />
        <main-content :active-tab-name="editor.activeTabName.toLowerCase()"
                      :visible-right-content="editor.activeTabName === 'EDIT'"
                      :selected-component="selectedComponent"
                      :selection="selection"
                      :posting-job="postingJob"
                      :statistics="statistics"
                      :history-info="historyInfo"
                      :zoom-info="zoomInfo"
                      :directory-info="directoryInfo"
                      :chart-info="chartInfo"
                      @renamed="onRenamed"
                      @selected-component="name => selectedComponent = name"
                      @trigger-job="onTriggeredJob"
                      @fetch-results="fetchResults"
                      @statistics="changeActiveStatistics"
                      @history="command => history.execute(command)"
                      @zoom="operateZooming"
        />
        <nnc-modal-loading v-if="!isLoadEnd"/>
        <nnc-dialog v-if="modal.show" :data="modal"/>
    </div>
</template>

<script>
    import EditorApplicationBar from './EditorApplicationBar';
    import MainContent from './EditorMainContent';
    import EditorWindowSize from './../EditorWindowSize';
    import Definitions from './../misc/Definitions';
    import Graph from './../currentGraph';
    import EditorUtils from './../EditorUtils';
    import ZOOM_INFO from './../misc/ZoomInfo';
    import Vue from 'vue/dist/vue.esm.js';
    import sduApp from './../editor/SDUApp';
    import tooltip from './../editor/tooltip';
    import jqueryUiCustom from './../misc/jquery-ui-custom';
    import SSEhelper from "../io/ServerSentEventHelper";

    window.nnc = Object.assign(window.nnc, {
        editor: {
            activeTabName: 'EDIT',
        },
    });

    export default {
        components: {
            'editor-application-bar': EditorApplicationBar,
            'main-content': MainContent,
        },
        data: function () {
            return {
                project: {name: ''},
                isLoadEnd: false,
                editor: window.nnc.editor,
                selection: {main: '', all: [], props: null},
                propMap: {}, // all layer's properties mapping.
                statistics: {
                    active: null, // active statistics object in this.values
                    values: [], // statistics calculated by nnablambda
                },
                postingJob: false,
                selectedComponent: '', // selected component on the palette
                modal: {}, // modal dialog
                history: {
                    commands: [],
                    index: 0,
                    execute: function (command) {
                        switch (command.type) {
                            case 'push':
                                this.commands.length = this.index; // index 以降のコマンドを削除する
                                this.commands.push(command.argument); // コマンドキューにコマンドを追加する
                                this.index += 1; // index を新たに積んだオブジェクトにあわせる
                                break;
                            case 'push-and-execute':
                                this.commands.length = this.index; // index 以降のコマンドを削除する
                                this.commands.push(command.argument);
                                this.execute({type: 'redo'}); // index を一つ前にして redo() で新たに積んだコマンドを実行する

                                break;
                            case 'undo':
                                if (this.index > 0) {
                                    this.commands[--this.index].undo();
                                }
                                break;
                            case 'redo': {
                                let result;
                                if (this.index < this.commands.length) {
                                    result = this.commands[this.index++].exec();
                                }
                                return result;
                            }
                        }
                    },
                },
                zoomInfo: (() => {
                    const Zoomer = function (name) {
                        const info = ZOOM_INFO[name];
                        this.percentages = info.percentages;
                        this.percentage = 100;
                        this.callback = info.callback;
                        this.zoom = (percentage) => {
                            this.percentage = percentage;
                            this.callback(percentage / 100);
                        };
                    };
                    return {
                        networkGraph: new Zoomer('Editor')
                    };
                })(),
                directoryInfo: {},
                chartInfo: []
            };
        },
        computed: {
            historyInfo: function () {
                const historyIndex = this.history.index;
                const commands = this.history.commands;
                const nameOf = (command) => (command || {name: () => null}).name();
                return {
                    undo: {
                        enabled: 0 < historyIndex,
                        name: nameOf(commands[historyIndex - 1]),
                    },
                    redo: {
                        enabled: historyIndex < commands.length,
                        name: nameOf(commands[historyIndex]),
                    },
                };
            },
        },
        methods: {
            showRightContent: function (visible){
                this.$refs.mainContent.showRightContent(visible);
            },
            makeConfiguration: function (type) {
                switch (type) {
                    case 'train':
                    case 'scheduleTrain':
                    case 'evaluate':
                        return EditorUtils.serialize_configuration();
                    case 'retrainNotInPlace':
                        return EditorUtils.serialize_configuration(JSON.parse(ResultsUtils.getActiveResult().configuration).networks);
                    default:
                        throw type;
                }
            },
            onTriggeredJob: function (type) {
                this.postingJob = true;
                this.isLoadEnd = false; // show loading spinner.
                const unsetPostingJob = () => {
                    this.postingJob = false;
                    this.isLoadEnd = true; // hide loading spinner.
                };
                const _pushNewJob = (result, type, name) => {
                    nnc.editor.activeTabName = 'TRAINING';
                    results.data.unshift(Object.assign(
                        {
                            type: type,
                            status: 'queued',
                            active: false,
                            logfile: '',
                            job_name: name,
                            evaluation_logfile: '',
                            evaluate_status: '',
                            confusionMatrix: {
                                selectedModal: '',
                                matrices: '',
                            },
                            current_epoch: undefined,
                        }, result));
                    ResultsUtils.changeActive(result.job_id);
                    ResultsUtils.showResultContent(result.job_id);
                };
                switch (type) {
                    case 'train':
                    case 'scheduleTrain':
                    case 'retrainNotInPlace': {
                        const configuration = this.makeConfiguration(type);
                        EditorUtils.checkErrors(configuration, (errors) => {
                            if (errors) {
                                this.popup('Errors in graph', errors, [{name: 'OK'}]);
                                unsetPostingJob();
                            } else {
                                const jobName = EditorUtils.getNewJobName();
                                const jobType = 'train';
                                // post new job
                                EditorUtils.callApi({
                                    url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs',
                                    type: 'post',
                                    data: JSON.stringify({
                                        configuration: JSON.stringify(configuration),
                                        this_will_be_deprecated_in_day2: exportProject(configuration, true),
                                        type: jobType,
                                        job_name: jobName,
                                    }),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                }, (result) => {
                                    _pushNewJob(result, jobType, jobName);
                                }, EditorUtils.showPopupIfJobExceedsTimeLimitOrHandleAsDefaultFailureFor(jobType), unsetPostingJob);
                            }
                        });
                        break;
                    }
                    case 'stopTrain':
                        $.when(...ResultsUtils.getJobsInProgress().map((job) => {
                            const finished = $.Deferred();
                            EditorUtils.callApi({
                                url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs/' + job.job_id + '/suspend',
                                type: 'POST',
                                dataType: 'json',
                            }, undefined, EditorUtils.handleXhrFailure, () => finished.resolve());
                            return finished;
                        })).always(unsetPostingJob);
                        break;
                    case 'evaluate': {
                        const jobType = 'evaluate';
                        const jobId = ResultsUtils.getActiveResult().job_id;
                        const executor = configs.data.filter((config) => config.type === 'Executor')[0];
                        const firstExecutorsDatasetName = (executor || {}).dataset;
                        const referencedDataset = datasets.data.find((dataset) => dataset.name === firstExecutorsDatasetName);
                        const datasetId = (referencedDataset || {}).id;
                        if (!datasetId) {
                            let message;
                            if (!executor) {
                                message = 'No "Executor" defined.';
                            } else if (!referencedDataset) {
                                message = 'Dataset "' + firstExecutorsDatasetName + '" is not found, specified in "' + executor.name + '".';
                            } else {
                                message = 'Dataset "' + firstExecutorsDatasetName + '" has not been linked.';
                            }
                            this.popup('Error in CONFIG', message, [{name: 'OK'}]);
                            unsetPostingJob();
                        } else {
                            EditorUtils.callApi({
                                url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs/' + jobId + '/resume',
                                type: 'POST',
                                data: JSON.stringify({type: jobType, evaluation_dataset_id: datasetId}),
                                contentType: 'application/json',
                                dataType: 'json',
                            }, (result) => {
                                this.fetchResults(() => {
                                    let job = results.data.find((job) => job.job_id === jobId);
                                    Object.assign(job, result);
                                    ResultsUtils.setPollingForEvaluateResult(job);
                                    ResultsUtils.changeActive(job.job_id);
                                    nnc.editor.activeTabName = 'EVALUATION';
                                });
                            }, EditorUtils.showPopupIfJobExceedsTimeLimitOrHandleAsDefaultFailureFor(jobType), unsetPostingJob);
                        }
                        break;
                    }
                    case 'profile': {
                        const jobName = EditorUtils.getNewJobName();
                        let jobType = 'profile';
                        EditorUtils.callApi({
                            url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs',
                            type: 'post',
                            data: JSON.stringify({
                                configuration: JSON.stringify(EditorUtils.serialize_configuration()),
                                this_will_be_deprecated_in_day2: exportProject(EditorUtils.serialize_configuration(), true),
                                type: jobType,
                                job_name: jobName,
                            }),
                            contentType: 'application/json',
                            dataType: 'json',
                        }, (result) => {
                            _pushNewJob(result, jobType, jobName);
                        }, EditorUtils.showPopupIfJobExceedsTimeLimitOrHandleAsDefaultFailureFor(jobType), unsetPostingJob);
                        break;
                    }
                }
            },
            /**
             * @param layers specify all layers on the editing graph.
             */
            initPropMap: function (layers) {
                // ideally object which will be no longer referenced in the map should be cleared here...
                layers.forEach(function (layer) {
                    this.onAddedLayer(layer);
                }, this);
                this._updateSelectedLayer();
            },
            onAddedLayer: (function () {
                let mapType = (prop) => {
                    if (!prop.editable) {
                        return 'immutable';
                    } else {
                        if (prop.name === 'Name') {
                            return 'name';
                        } else {
                            switch (prop.type) {
                                default:
                                    return 'text';
                                case 'Boolean':
                                    return 'bool';
                                case 'Option':
                                    return 'select';
                            }
                        }
                    }
                };
                let makePropFor = (layer) => (prop) => {
                    return {
                        name: prop.name,
                        type: mapType(prop),
                        choice: prop.option,
                        computed: prop.name === 'Name' ? layer.name() : layer.getUserInputProperty(prop.name),
                        value: layer.getUserInputProperty(prop.name),
                        error: (layer.errors().find((error) => error.property === prop.name) || {}).message,
                    };
                };
                return function (layer) { // onAddedLayer function body.
                    this.propMap[layer.name()] = {
                        type: layer.type(),
                        color: '#' + layer.component().color.substring(2),
                        props: layer.typedProperties().map(makePropFor(layer)),
                    };
                };
            })(),
            onDeletedLayer: function (name) {
                delete this.propMap[name];
            },
            onRenamed: function (changes) {
                let propMap = this.propMap;
                // assign new mapping
                let backup = changes.map((change) => {
                    return {name: change.to, prop: propMap[change.from]};
                });
                backup.forEach((item) => {
                    propMap[item.name] = item.prop;

                    // update 'Name' value in the mapping
                    let nameProp = item.prop.props.find((prop) => prop.name === 'Name');
                    nameProp.value = item.name;
                    nameProp.computed = item.name;
                });
                // drop old mapping
                let oldNames = changes.map((change) => change.from);
                let newNames = changes.map((change) => change.to);
                oldNames.filter((name) => !newNames.includes(name)).forEach((name) => delete propMap[name]);

                let changed = changes.find((change) => change.from === this.selection.main);
                if (changed) {
                    this.selection.main = changed.to;
                }
                this._updateSelectedLayer();
            },
            /**
             * @param nodes represent the array which holds all completed properties from nnablambda.
             */
            onComputedProperties: function (nodes) {
                let map = this.propMap;
                nodes.forEach((node) => {
                    let props = (map[node.name] || {}).props || []; // this Vue object's mapping (or discard)
                    let _propObj = (name) => props.find((prop) => prop.name === name) || {}; // find matching property
                    let computedMap = node.properties;
                    for (let key in computedMap) { // update each property by computed value
                        if (Object.prototype.hasOwnProperty.call(computedMap, key)) {
                            _propObj(key).computed = computedMap[key];
                        }
                    }
                });

                this._updateSelectedLayer();
            },
            /**
             * update user input value in this propMap.
             */
            onChangedProperty: function (layer, propName, propValue) {
                this.propMap[layer].props.find((prop) => prop.name === propName).value = propValue;
                //todo: compute statistics
                this.propMap[layer].props.find((prop) => prop.name === propName).computed = propValue;

                this.selection.props = this.propMap[this.selection.main];
            },
            /**
             * @param errors are array in which member has the type {layer: 'name', property: 'name', message: 'error'}.
             */
            onComputedErrors: function (errors) {
                let map = this.propMap;
                // delete all errors forged in the mapped item
                for (let key in map) {
                    if (Object.prototype.hasOwnProperty.call(map, key)) {
                        map[key].props.forEach((prop) => delete prop.error);
                    }
                }

                // set errors
                errors.forEach((error) => {
                    let props = (map[error.layer] || {}).props || []; // this Vue object's mapping (or discard)
                    let _propObj = (name) => props.find((prop) => prop.name === name) || {}; // find matching property
                    _propObj(error.property).error = error.message; // set error message
                });

                this._updateSelectedLayer();
            },
            /**
             * @param {Set} layers represent layer selection.
             */
            onChangedSelection: function (layers) {
                this.selection = {
                    main: (layers.focused() || {name: () => ''}).name(),
                    all: layers.apply((layer) => layer.name()),
                };

                this._updateSelectedLayer();
            },
            _updateSelectedLayer: function () {
                let layer = this.propMap[this.selection.main];
                Vue.set(this.selection, 'props', layer ? Object.assign({}, layer) : null);
            },
            updateStatistics: function (statistics) {
                const object = this.statistics;
                object.values = statistics;
                this.changeActiveStatistics(statistics[0] || object.active);
            },
            changeActiveStatistics: function (stat) {
                if (stat) {
                    this.statistics.active = stat;
                    Graph.layers().forEach((layer) => layer.updateStatistics(stat));
                }
            },
            /**
             * Show popup dialog.
             * @param title dialog title
             * @param message dialog message
             * @param actions array of pair {name: String, action: function} representing button. last action is set to 'Defalut'.
             */
            popup: function (title, message, actions) {
                Vue.set(this, 'modal', {
                    title: title,
                    message: message,
                    actions: actions.map((elem) => Object.assign({
                        name: elem.name,
                        action: () => {
                            Vue.delete(this.modal, 'show');
                            (elem.action || (() => undefined))();
                        },
                    })),
                    show: true, // show dialog
                });
            },
            /**
             * Show prompt dialog.
             * @param title dialog title (prompt message)
             * @param initialValue initial value in input text area
             * @param actions array of pair {name: Strinng, action: function} representing button.
             * last action is set to 'Default'.
             * Default action called back with text input value on its first parameter.
             */
            prompt: function (title, initialValue, actions) {
                Vue.set(this, 'modal', {
                    title: title,
                    initialValue: initialValue,
                    actions: actions.map((elem) => Object.assign({
                        name: elem.name,
                        action: (value) => {
                            Vue.delete(this.modal, 'show');
                            (elem.action || ((value) => undefined))(value);
                        },
                    })),
                    show: true, // show dialog
                });
            },
            fetchResults: function (callback, offset) {
                EditorUtils.callApi({
                    url: Definitions.CORE_API.usersUrl() + '/projects/' + EditorUtils.getProjectId() + '/jobs' + '?offset=' + (offset || 0) + '&limit=10',
                    type: 'get',
                    dataType: 'json',
                }, (result) => {
                    results.merge(result.jobs);
                    results.metadata.total = result.metadata.total;
                    (callback || (() => undefined))();
                }, EditorUtils.handleXhrFailure);
            },
            setPollingForFetchResults: function () {
                const _fetchResults = () => this.fetchResults(() => setTimeout(_fetchResults, 10000));
                _fetchResults();
            },
            operateZooming: function (operation) {
                this.zoomInfo[
                    {
                        'Editor': 'networkGraph',
                        'Learning Curve': 'learningCurve',
                        'Trade-off Graph': 'tradeOffGraph'
                    }[operation.name]
                    ].zoom(operation.percentage);
            },
            setupSSE: function(){

                const eventSrc = new EventSource("/subscribe");

                eventSrc.onmessage = event => {
                    const id = event.lastEventId;

                    if (id === "pathMap") {
                        this.directoryInfo = Object.assign({}, this.directoryInfo, JSON.parse(event.data));

                    } else {
                        const splited = id.split(".");
                        const ext = splited[splited.length - 1];
                        const secondaryExt = splited[splited.length - 2];

                        let graphInfo = {
                            name: id,
                            nodes: [],
                            links: []
                        };


                        if (event.data === "delete") {
                            if (ext === "nntxt") {
                                SSEhelper.deleteDirectoryInfo(id, "nntxtFiles", this.directoryInfo);
                            } else if (ext === "txt" && secondaryExt === "series") {
                                SSEhelper.deleteDirectoryInfo(id, "monitorFiles", this.directoryInfo);
                                SSEhelper.deleteChartInfo(this.directoryInfo.name, id, this.chartInfo);
                            }
                        } else {
                            if (ext === "nntxt") {
                                let [nodes, links] = SSEhelper.getGraphInfoFromNNtxt(event);
                                graphInfo.nodes = nodes;
                                graphInfo.links = links;

                                // update directoryInfo
                                SSEhelper.addDirectoryInfo(id, "nntxtFiles", graphInfo, this.directoryInfo);

                            } else if (ext === "txt" && secondaryExt === "series") {
                                let monitorData = SSEhelper.getMonitorInfo(event);

                                // update directoryInfo
                                SSEhelper.addDirectoryInfo(id, "monitorFiles", monitorData, this.directoryInfo);
                            }
                        }
                    }
                };
            }
        },
        mounted: function () {
            window.nnc.components = {Editor: this};
            let _changeActiveTabAccordingToQueryParam = (params) => {
                switch ((params || {}).tab) {
                    default:
                        window.nnc.editor.activeTabName = 'EDIT';
                        break;
                    case 'training':
                        window.nnc.editor.activeTabName = 'TRAINING';
                        break;
                    case 'evaluation':
                        window.nnc.editor.activeTabName = 'EVALUATION';
                        break;
                }
            };
            EditorWindowSize.init();
            EditorWindowSize.bind();
            $.ajaxSetup({
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                xhrFields: {withCredentials: true},
            });

            nnc.editor.projectId = EditorUtils.getProjectId();

            nnc.params = EditorUtils.getParams();

            this.isLoadEnd = true;

            jqueryUiCustom();
            sduApp();
            tooltip();

            this.setupSSE();
        },

    };
</script>

<style>
    :root {
        --color-brand: #006699;
        --color-system1: #ff6666;
        --color-system2: #ffff00;
        --color-system3: #00ffff;
        --color-gray0: #ffffff;
        --color-gray1: #f2f2f2;
        --color-gray2: #D8D8D8;
        --color-gray3: #B2B2B2;
        --color-gray4: #8C8C8C;
        --color-gray5: #262626;

        --color-ragular: var(--color-gray5);
        --color-sub-text: var(--color-gray4);
        --color-disabled-text: var(--color-gray3);
        --color-link-text: var(--color-brand);
        --color-warning-text: var(--color-system1);

        --color-layer1: #77B3D1;
        --color-layer2: #DF7F6D;
        --color-layer3: #7A997A;
        --color-layer4: #CCAF93;
        --color-layer5: #AC99BF;
        --color-layer6: var(--color-gray5);
        --color-layer7: var(--color-gray4);
        --color-layer8: var(--color-gray3);

        --bar-height: 40px;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 13px;
        font-family: "SSTUI-Roman";
        overflow: hidden;
    }

    .text-fixed-width {
        font-family: "SSTUI-Roman";
    }

    .app-row, .app-col {
        overflow: hidden;
        position: absolute;
    }

    .app-row {
        left: 0;
        right: 0;
    }

    .app-col {
        top: 0;
        bottom: 0;
    }

    .app-scroll-x {
        overflow-x: auto;
    }

    .app-scroll-y {
        overflow-y: auto;
    }

    ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-gray2);
        border: 5px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        border-radius: 16px;
    }

    .pull-right {
        float: right;
        height: 100%;
    }

    .nnc-invoker {
        cursor: pointer;
    }

    .nnc-invoker.navbar-el:hover {
        background-color: var(--color-brand);
    }

    img.nnc-invoker:hover {
        opacity: 0.5;
    }

    img.nnc-enabled
    .nnc-enabled > img {
        opacity: 1;
    }

    span.nnc-enabled {
        color: var(--color-gray5);
        cursor: pointer;
    }

    img.nnc-enabled.navbar-img {
        filter: brightness(2);
    }

    img.nnc-disabled,
    .nnc-disabled > img {
        opacity: 0.5;
    }

    span.nnc-disabled {
        color: var(--color-gray4);
        cursor: default;
    }

    img.nnc-disabled.navbar-img {
        filter: brightness(0.5);
    }

    .title {
        font-family: "SSTUI-Medium";
        height: 40px;
        margin-top: 12px;
        margin-left: 16px;
    }

    .navbar-el {
        float: left;
        height: 40px;
        line-height: 40px;
    }

    .navbar-el.active {
        background-color: var(--color-brand);
    }

    .navbar-img {
        padding: 8px 8px 8px 8px;
        width: 40px;
        height: 40px;
    }

    .navbar-tab {
        margin: 0 16px 0 16px;
        font-size: 13px;
        color: var(--color-gray0);
    }

    .network-action,
    .job-action {
        width: 100%;
        height: 40px;
        border-bottom: solid 1px var(--color-gray2);
        /* forbid wrap round */
        white-space: no-wrap;
        overflow: hidden;
    }

    .network-action-image,
    .job-action-image {
        width: 24px;
        height: 24px;
        margin: 8px 4px 8px 4px;
        vertical-align: middle;
    }

    .network-action-text,
    .job-action-text {
        font-family: "SSTUI-Medium";
        font-size: 13px;
        color: var(--color-gray5);
        margin: 8px 4px 8px 4px;
        line-height: 40px;
        position: relative;
        z-index: 2;
    }

    .network-action-text.action-toggle {
        margin-left: 24px;
        margin-right: 8px;
    }

    .network-action-button {
        font-size: 16px;
        background-color: var(--color-gray0);
        border-color: var(--color-gray0);
        margin-bottom: 4px;
    }

    .component.active {
        color: var(--color-brand);
        background-color: var(--color-gray0);
    }

    .component:hover {
        color: var(--color-brand);
    }

    .component:focus {
        outline: none;
    }

    .jobs-area,
    .datasets-area,
    .configs-area {
        overflow: visible;
    }

    .layer-component {
        cursor: pointer;
    }

    .center-content-bar {
        height: 40px;
        border-bottom: solid 1px var(--color-gray2);
        line-height: 40px;
        vertical-align: middle;
        padding: 0 8px;
        overflow: hidden;
    }
</style>
