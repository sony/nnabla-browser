<template>
    <div>
        <network-action
                :history-info="historyInfo"
                :zoom-percantages="networkGraph.percentages"
                :zoom-current-percentage="networkGraph.percentage"
                @history="command => $emit('history', command)"
                @zoom="operation => $emit('zoom', operation)"
        />
        <network-tabs
                :graph-info="graphInfo"
                @history="command => $emit('history', command)"
        />
        <div class="tab-content network-editor-scroller">
            <svg-area
                    :graph-info="graphInfo"
                    :selected-layer="selectedLayer"/>
        </div>
    </div>
</template>

<script>
    import contextMenu from './../../editor/editorContextMenu';
    import clipboard from './../../editor/clipboard';
    import EditorUtils from './../../EditorUtils';
    import svgArea from "./svgArea";
    import Definitions from './../../misc/Definitions';

    export default {
        props: {
            selectedLayer: Object,
            historyInfo: Object,
            networkGraph: Object,
            graphInfo: Object
        },
        data: function () {
            return {
                layerTextClipId: Definitions.EDIT.LAYER.CLIP_PATH.ID,
                layerTextClipWidth: Definitions.EDIT.LAYER.CLIP_PATH.WIDTH,
                layerTextClipHeight: Definitions.EDIT.LAYER.CLIP_PATH.HEIGHT,
            };
        },
        components: {
            'network-tabs': {
                props: ["graphInfo"],
                template: `
                <div class="network-tabs">
                    <graph-tab v-for="(graph, index) in graphInfo.graphs"
                        :graph="graph"
                        :key="graphInfo.nntxtPath + '-' + index"
                        :index="index"
                        :class="{'active': index===graphInfo.activeGraphIndex}"
                        @tab-clicked="updateActiveGraph"
                        @history="command => $emit('history', command)"
                    />
                    <graph-tab-append
                        @history="command => $emit('history', command)"
                    />
                </div>
            `,
                methods: {
                    updateActiveGraph: function (index) {
                        this.$set(this.graphInfo, "activeGraphIndex", index);
                    }
                },
                components: {
                    'graph-tab': {
                        props: ['graph', "index"],
                        template: `
                        <div class="graphs-tab nnc-invoker" @click="clicked">
                            <span class="graph-name">{{ graph.name }}</span>
                            <span>
                                <span class="delete-mark" @click.stop.prevent="clickedDelete;">
                                    <img class="graph-remove-img" src="./editor/image/Remove.svg"/>
                                </span>
                            </span>
                        </div>
                    `,
                        methods: {
                            clicked: function () {
                                this.$emit("tab-clicked", this.index);
                            },
                            clickedDelete: function () {
                                // set True to the argument of graphInfo named something like "isShow"
                                // and insert this operation into history to undo or redo
                            },
                            keydown: (e) => {
                                switch (e.keyCode) {
                                    case 27:
                                    case 13:
                                        e.target.blur();
                                        break;
                                    default:
                                        break;
                                }
                            },
                        }
                    },
                    'graph-tab-append': {
                        template: `<div class="graphs-tab graph-add" @click="clickedAddNetworkGraph"><img class="graph-addnew-img" src="./editor/image/AddNew.svg"/></div>`,
                        methods: {
                            clickedAddNetworkGraph: function () {},
                        },
                    },
                },
            },
            'network-action': {
                props: {historyInfo: Object, zoomPercantages: Array, zoomCurrentPercentage: Number},
                template: `
                <div class="network-action">
                    <tool-button image-name="Undo"  :disabled="!historyInfo.undo.enabled" @pressed="$emit('history', {type: 'undo'})" />
                    <tool-button image-name="Redo"  :disabled="!historyInfo.redo.enabled" @pressed="$emit('history', {type: 'redo'})" />
                    <tool-button image-name="Cut"   :disabled="false"     @pressed="cut" />
                    <tool-button image-name="Copy"  :disabled="false"     @pressed="copy" />
                    <tool-button image-name="Paste" :disabled="false"                     @pressed="paste" />
                    <div class="pull-right" style="width: 200px;">
                        <nnc-zoom-box :percentages="zoomPercantages" :percentage="zoomCurrentPercentage" @zoom-value="value => $emit('zoom', {name: 'Editor', percentage: value})" />
                        <button @click="dropDownMenu" class="btn network-action-button" data-toggle="dropdown" style="float: right">
                            Action&nbsp;
                            <span class="caret" />
                        </button>
                        <div class="action-menu-item dropdown-menu" />
                    </div>
                </div>
            `,
                components: {
                    'tool-button': {
                        props: {imageName: String, disabled: Boolean},
                        template: `
                        <img v-if="disabled" :src="'./editor/image/' + imageName + '.svg'" class="network-action-image nnc-disabled" />
                        <img v-else          :src="'./editor/image/' + imageName + '.svg'" class="network-action-image nnc-enabled nnc-invoker" @click.stop.prevent="$emit('pressed')" />
                    `,
                    },
                },
                methods: {
                    cut: () => clipboard.cut(),
                    copy: () => clipboard.copy(),
                    paste: () => clipboard.paste(),
                    dropDownMenu: () => {
                        // 右クリックメニューを閉じる
                        $('.network-context-menu.context-menu').remove();
                        // Actionメニューのメニューをリセット
                        $('.action-menu-item').children().remove();
                        $('.action-menu-item').append(contextMenu.createContextMenu);
                    },
                },
            },
            'svg-area': svgArea
        },
        computed: {
            values: function () {
                return EditorUtils.indexOperator(this.networkGraph.percentages, this.networkGraph.percentage);
            },
        },
        methods: {
            popUpMenu: contextMenu.showContextMenu,
            zooming: function (event) {
                let percentage;
                switch (event.key) {
                    case '0':
                        percentage = 100;
                        break;
                    case '+':
                        if (this.values.canMoveNext) percentage = this.values.next;
                        break;
                    case '-':
                        if (this.values.canMovePrev) percentage = this.values.prev;
                        break;
                }
                if (window.uop() && percentage) this.$emit('zoom', {name: 'Editor', percentage: percentage});
            },
            zoomingByWheel: function (event) {
                event.preventDefault();
                event.stopPropagation();
                const percentage = event.wheelDelta <= -120 && this.values.canMovePrev ? this.values.prev : event.wheelDelta >= 120 && this.values.canMoveNext ? this.values.next : undefined;
                if (percentage) this.$emit('zoom', {name: 'Editor', percentage: percentage});
            },
        },
        mounted: function(){
            // window.svgArea = new svgArea(this.selected);
        }
    };
</script>

<style>
    .network-tabs {
        width: 100%;
        height: 40px;
        border-bottom: solid 1px var(--color-gray2);
        overflow: auto;
    }

    .graphs-tab {
        float: left;
        height: 39px;
        line-height: 39px;
        padding-right: 8px;
    }

    .graphs-tab.active {
        box-sizing: border-box;
        border-bottom: solid 2px var(--color-brand);
    }

    .graphs-tab.active > span > .graph-name {
        color: var(--color-brand);
    }

    .graphs-tab:hover {
        background-color: var(--color-gray1);
    }

    .graph-name {
        margin-left: 24px;
        margin-right: 12px;
        font-size: 13px;
        color: var(--color-gray5);
        line-height: 40px;
    }

    .graph-remove-img, .graph-addnew-img {
        width: 16px;
        height: 16px;
        margin: 8px 0 8px 0;
        vertical-align: middle;
    }

    .graph-add {
        padding-left: 8px;
    }

    #network-editor {
        display: block;
    }

    .network-editor-scroller {
        overflow: auto;
        width: 100%;
    }

    .layer-properties-scroller {
        overflow: auto;
        width: 100%;
    }

    .network-statistics-scroller {
        overflow: auto;
        width: 100%;
    }

    .stat-line {
        height: 25px;
        line-height: 24px;
        vertical-align: baseline;
    }

    .stat-line.active {
        background-color: var(--color-gray2);
    }

    .stat-line > .content {
        margin-left: 16px;
        margin-right: 16px;
        border-bottom-color: var(--color-gray4);
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }

    .stat-line > .content > .name {
        color: var(--color-gray4);
        float: left;
        width: 120px;
    }
</style>
