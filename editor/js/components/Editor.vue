<template>
    <div>
        <editor-application-bar />
        <main-content
                  :history-info="historyInfo"
                  :zoom-info="zoomInfo"
                  @history="command => history.execute(command)"
                  @zoom="operateZooming" />
    </div>
</template>

<script>
    import EditorApplicationBar from './EditorApplicationBar';
    import MainContent from './EditorMainContent';
    import EditorWindowSize from './../EditorWindowSize';
    import ZOOM_INFO from './../misc/ZoomInfo';
    import Vue from 'vue/dist/vue.esm.js';
    import sduApp from './../editor/SDUApp';
    import tooltip from './../editor/tooltip';
    import jqueryUiCustom from './../misc/jquery-ui-custom';
    import SSEhelper from "../utils/ServerSentEventHelper";

    export default {
        components: {
            'editor-application-bar': EditorApplicationBar,
            'main-content': MainContent,
        },
        data: function () {
            return {
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
                })()
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
                        this.$store.commit("initDirectoryInfo", JSON.parse(event.data));
                    } else {
                        const operation = (event.data === "delete" ? "delete" : "add") + "DirectoryInfo";

                        let fileType, data;
                        if (fileType = SSEhelper.getFileType(id)) {
                            if (fileType === "nntxtFiles") {
                                data = SSEhelper.getGraphInfoFromNNtxt(event);
                            } else if (fileType === "monitorFiles") {
                                data = SSEhelper.getMonitorInfo(event);
                            }

                            this.$store.commit(operation, {path: id, fileType, data});
                        }
                    }
                };

                eventSrc.onerror = () => eventSrc.close();
            }
        },
        mounted: function () {

            window.activeTab = this.$store.state.editor.activeTabName;

            EditorWindowSize.init();
            EditorWindowSize.bind();
            $.ajaxSetup({
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                xhrFields: {withCredentials: true},
            });

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
