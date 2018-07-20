<template>
    <div>
        <network-tabs
            @history="command => $emit('history', command)"
        />
        <network-action
            :selection="selection"
            :history-info="historyInfo"
            :zoom-percantages="networkGraph.percentages"
            :zoom-current-percentage="networkGraph.percentage"
            @history="command => $emit('history', command)"
            @zoom="operation => $emit('zoom', operation)"
        />
        <div class="tab-content network-editor-scroller">
            <svg id="network-editor" tabindex="0"
            @keydown.ctrl.a.prevent="grabAllLayers"
            @keyup.backspace="deleteLayerKeepingLinks"
            @keyup.just-delete="deleteLayer"
            @keyup.insert="insertLayer"
            @keyup.esc="freeGrabbedLayers"
            @keydown.alt="zooming"
            @mousewheel.alt="zoomingByWheel"
            @dblclick="addLayer"
            @mousedown="popUpMenu"
            >
                <clipPath :id="layerTextClipId">
                    <rect :x="0" :y="0" :width="layerTextClipWidth" :height="layerTextClipHeight" />
                </clipPath>
                <defs>
                    <filter id="frameshadow" filterUnits="userSpaceOnUse">
                        <feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur>
                        <feOffset result="offOut" in="blurOut"></feOffset>
                        <feBlend in="offOut" mode="normal"></feBlend>
                    </filter>
                </defs>
            </svg>
        </div>
    </div>
</template>

<script>
import contextMenu from './../../editor/editorContextMenu';
import clipboard from './../../editor/clipboard';
import EditorUtils from './../../EditorUtils';
import Graph from './../../currentGraph';
import Layer from './../../editor/SDNLayer';
import Link from './../../editor/SDNLink';
import Definitions from './../../misc/Definitions';
import Vue from 'vue/dist/vue.esm.js';

// Vue object
window.Network;

// Global data to manage Vue comonent.
const data = {graphs: [{name: 'Main', nodes: [], links: []}], target: 'Main'};

// get all graph names
const names = () => data.graphs.map((g) => g.name);
// get graph index by name
const indexOf = (name) => names().indexOf(name);
// insert new graph
const _append = (name) => {
    const graphs = data.graphs;
    graphs.splice(graphs.length, 0, {name: name, nodes: [], links: []});
};
// delete graph; returns next tab name and deleted graph data.
const _delete = (name) => {
    const graphs = data.graphs;
    const index = indexOf(name);
    const graph = graphs[index];
    graphs.splice(index, 1); // delete tab
    if (graphs.length === 0) { // fall back, if there is no tabs.
        _append('Main');
    }
    return {
        'index': index,
        'deleted': graph,
        'next-target': name === data.target ? graphs[0].name : data.target,
    };
};
// change current selection
const _select = (name) => {
    _serializeCurrentGraph();
    Graph.clear();
    data.target = name; // refresh active.
    _deserialize(name);
};
// calculate new graph name
const _newName = () => 'Network_' + names()
    .filter((name) => name.indexOf('Network_') === 0)
    .map((name) => Number(name.replace('Network_', '')))
    .filter((n) => !isNaN(n) && n > 1)
    .sort((a, b) => a - b)
    .reduce((prev, curr) => prev + (prev === curr), 2);

// reload all graphs from serialized data.
const _resetGraphs = (networks) => {
    if (!Array.isArray(networks) || networks.length === 0) { // fall back
        networks = [{name: 'Main', nodes: [], links: []}];
    }

    data.graphs = networks;
    Graph.clear();
    _deserialize(networks[0].name);
};

// serialize current network data into data.graphs.
const _serializeCurrentGraph = () => {
    const graph = data.graphs[indexOf(data.target)];
    if (graph) {
        Vue.set(graph, 'nodes', Graph.layers((layer) => layer.serialize()));
        Vue.set(graph, 'links', Graph.links((link) => link.serialize()));
    }
    return graph;
};

// restore named data to the editor.
const _deserialize = (name) => {
    const graph = data.graphs[indexOf(name)];
    if (graph) {
        Vue.set(data, 'target', graph.name);

        const layers = graph.nodes.map(Layer.deserialize);
        window.nnc.components.Editor.initPropMap(layers); // initialize properties mapping.
        graph.links.forEach(Link.deserialize);

        // update property panel and statistics.
    }
};

const _feedProperties = (name, network) => {
    if (name === data.target) {
        // pass computed property values to root Vue object.
        window.nnc.components.Editor.onComputedProperties(network.nodes);

        // make node name to node properties map.
        const map = {};
        network.nodes.forEach((node) => map[node.name] = node.properties);

        // update each layer's properties.
        Graph.layers((layer) => layer.setProperties(map[layer.name()]));
    }
};

const _feedStatistics = (name, statistics) => {
    const valueOf = (i, key) => statistics['Statistics_' + i + '_' + key];
    window.nnc.components.Editor.updateStatistics(Array.from({length: statistics.NumStatistics})
    .map((_, index) => {
        return {
            name: valueOf(index, 'Name'),
            max: valueOf(index, 'Max'),
            sum: valueOf(index, 'Sum'),
        };
    }));
};

const _reError = /^([^|]+)\|([^|]+)\|([^|]+)\|.*:\s(.*)$/;
const _feedErrors = (errors) => {
    const graphTab = data.target;
    const es = errors.split('\n')
        .map((line) => _reError.exec(line))
        .filter((x) => x)
        .map((es) => {
            return {graph: es[1], layer: es[2], property: es[3], message: es[4]};
        }).filter((e) => e.graph === graphTab);

    // pass computed errors to root Vue object.
    window.nnc.components.Editor.onComputedErrors(es);

    Graph.layers((layer) => {
        const layerName = layer.name();
        layer.setErrorProperties(es.filter((error) => error.layer === layerName));
    });
};

const _arrangeLayers = (name, network) => {
    if (name === data.target) {
        const recipe = {};
        Graph.layers((layer) => {
            const layerName = layer.name();
            const node = network.nodes.find((node) => node.name === layerName);
            if (node) {
                recipe[layerName] = {fore: {x: node.x, y: node.y}, back: layer.getPosition()};
            }
        });
        const _move = (direction) => ((layer) => {
            const position = (recipe[layer.name()] || {})[direction];
            if (position) {
                layer.setPosition(position);
            }
        });

        // update each layer's positions by command.
        window.nnc.components.Editor.history.execute({
            type: 'push-and-execute',
            argument: {
                name: () => 'Arrange Layers',
                exec: () => Graph.layers(_move('fore')),
                undo: () => Graph.layers(_move('back')),
            },
        });
    }
};

// Set global varaiable.
window.Graphs = {
    // refer neural network graphs
    data: () => data.graphs,
    // reset to giving graphs
    reset: (networks) => _resetGraphs(networks),
    // flush current editing graph into data
    flush: () => _serializeCurrentGraph(),
    // force feed calculated properties
    feed: _feedProperties,
    // feed statistics into current graph
    stat: _feedStatistics,
    // reflect errors to each layers
    error: _feedErrors,
    // auto arrange layers
    arrange: _arrangeLayers,
};

window.uop = EditorUtils.allowedUserOperation;
const dl = () => window.svgArea.draggingLayer(); // window.svgArea have not been exist yet... (SDUApp.js loaded last)

export default {
    props: {selectedComponent: String, selection: Object, historyInfo: Object, networkGraph: Object},
    data: function() {
        return {
            layerTextClipId: Definitions.EDIT.LAYER.CLIP_PATH.ID,
            layerTextClipWidth: Definitions.EDIT.LAYER.CLIP_PATH.WIDTH,
            layerTextClipHeight: Definitions.EDIT.LAYER.CLIP_PATH.HEIGHT,
        };
    },
    components: {
        'network-tabs': {
            template: `
                <div class="network-tabs">
                    <graph-tab v-for="graph in graphs"
                        v-bind:graph="graph"
                        :key="graph.name"
                        :class="{'active': graph.name===target}"
                        @history="command => $emit('history', command)"
                    />
                    <graph-tab-append
                        @history="command => $emit('history', command)"
                    />
                </div>
            `,
            data: () => {
                return data;
            },
            components: {
                'graph-tab': {
                    props: ['graph'],
                    template: `
                        <div class="graphs-tab nnc-invoker" @click="clicked(graph.name);">
                            <div v-if="graph.renaming">
                                <input
                                    type="text"
                                    size="20"
                                    v-focus
                                    v-bind:value="graph.name"
                                    @keydown="keydown"
                                    @blur="lostEditFocus($event, graph.name);" />
                            </div>
                            <span v-else>
                                <span class="graph-name">{{ graph.name }}</span>
                                <span>
                                    <span class="delete-mark" @click.stop.prevent="clickedDelete(graph.name);">
                                        <img class="graph-remove-img" src="./editor/image/Remove.svg"/>
                                    </span>
                                </span>
                            </span>
                        </div>
                    `,
                    methods: {
                        startEdit: (name) => {
                            Vue.set(data.graphs[indexOf(name)], 'renaming', true);
                        },
                        selectTarget: function(name) {
                            let toggle = () => {
                                let prevTarget = data.target;
                                _select(name);
                                name = prevTarget;
                            };
                            this.$emit('history', {
                                type: 'push-and-execute',
                                argument: {
                                    exec: toggle,
                                    undo: toggle,
                                    name: () => 'Change active network',
                                },
                            });
                        },
                        clicked: function(name) {
                            if (data.target === name) {
                                this.startEdit(name);
                            } else {
                                this.selectTarget(name);
                            }
                        },
                        clickedDelete: function(name) {
                            let info;
                            this.$emit('history', {
                                type: 'push-and-execute',
                                argument: {
                                    exec: () => {
                                        info = _delete(name);
                                        _select(info['next-target']);
                                    },
                                    undo: () => {
                                        let graphs = data.graphs;
                                        graphs.splice(info.index, 0, info.deleted);
                                        _select(graphs[info.index].name);
                                    },
                                    name: () => 'Delete network',
                                },
                            });
                        },
                        lostEditFocus: function(e, name) {
                            let graph = data.graphs[indexOf(name)];
                            Vue.delete(graph, 'renaming');
                            this.renameTarget(graph, e.target.value);
                        },
                        renameTarget: function(graph, name) {
                            if (name && names().every((v) => v !== name)) {
                                let original = data.target;
                                this.$emit('history', {
                                    type: 'push-and-execute',
                                    argument: {
                                        exec: () => {
                                            Vue.set(graph, 'name', name);
                                            Vue.set(data, 'target', name);
                                        },
                                        undo: () => {
                                            Vue.set(graph, 'name', original);
                                            Vue.set(data, 'target', original);
                                        },
                                        name: () => 'Change network name',
                                    },
                                });
                            }
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
                    },
                    directives: {
                        focus: { // custom directive for form/input; refered as v-focus.
                            inserted: (el) => {
                                el.focus();
                                el.select();
                            },
                        },
                    },
                },
                'graph-tab-append': {
                    template: `<div class="graphs-tab graph-add" @click="clickedAddNetworkGraph"><img class="graph-addnew-img" src="./editor/image/AddNew.svg"/></div>`,
                    methods: {
                        clickedAddNetworkGraph: function() {
                            let name = _newName();
                            let current = data.target;
                            this.$emit('history', {
                                type: 'push-and-execute',
                                argument: {
                                    exec: () => {
                                        _append(name);
                                        _select(name);
                                    },
                                    undo: () => {
                                        _delete(name);
                                        _select(current);
                                    },
                                    name: () => 'Add network',
                                },
                            });
                        },
                    },
                },
            },
        },
        'network-action': {
            props: {selection: Object, historyInfo: Object, zoomPercantages: Array, zoomCurrentPercentage: Number},
            template: `
                <div class="network-action">
                    <tool-button image-name="Undo"  :disabled="!historyInfo.undo.enabled" @pressed="$emit('history', {type: 'undo'})" />
                    <tool-button image-name="Redo"  :disabled="!historyInfo.redo.enabled" @pressed="$emit('history', {type: 'redo'})" />
                    <tool-button image-name="Cut"   :disabled="!selection.all.length"     @pressed="cut" />
                    <tool-button image-name="Copy"  :disabled="!selection.all.length"     @pressed="copy" />
                    <tool-button image-name="Paste" :disabled="false"                     @pressed="paste" />
                    <div class="pull-right">
                        <nnc-zoom-box :percentages="zoomPercantages" :percentage="zoomCurrentPercentage" @zoom-value="value => $emit('zoom', {name: 'Editor', percentage: value})" />
                        <button @click="dropDownMenu" class="btn network-action-button" data-toggle="dropdown">
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
            data: () => {
                return data;
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
    },
    computed: {
        values: function() {
            return EditorUtils.indexOperator(this.networkGraph.percentages, this.networkGraph.percentage);
        },
    },
    methods: {
        deleteLayerKeepingLinks: function() {
            if (window.uop() && !dl() && 0 < Graph.selection.layer.members().length) {
                let _links = (connector) => connector ? connector.links() : [];
                let _serialize = (object) => object.serialize();

                // 主選択レイヤーと全てのリンクを取得する
                let layer = Graph.selection.layer.focused();

                // generate undo info (to recover current graph)
                let _undoInfo = {
                    layer: layer.serialize(),
                    links: layer.allLinks().map(_serialize),
                };

                // extract source and destination connector.
                let _defaultPin = (connector) => connector.isDefault();
                let pinsOfSrcOut = _links(layer.getInConnector()).map((link) => link.source()).filter(_defaultPin);
                let pinsOfDestIn = _links(layer.getOutConnector()).map((link) => link.destination()).filter(_defaultPin);

                // execute remove and reconnect
                layer.remove(); // remove its connected links also.
                let reconnecteds; // gather up newly created links.
                if (pinsOfSrcOut.length) {
                    let out = pinsOfSrcOut[0];
                    const safeLinkTo = (connector) => {
                        try {
                            return out.linkTo(connector);
                        } catch (e) {
                            return null;
                        }
                    };
                    reconnecteds = pinsOfDestIn.map(safeLinkTo).filter(Boolean);
                } else {
                    reconnecteds = [];
                }
                // generate redo info.
                let _redoInfo = {
                    links: reconnecteds.map(_serialize),
                };

                let _restoreLayer = (serialized) => Layer.deserialize(serialized);
                let _restoreLinks = (array) => array.forEach(Link.deserialize);
                let _removeLinks = (array) => array.map(Link.findObjectBySerialized).filter((x) => x).forEach((l) => l.remove());
                let _removeLayer = (serialized) => (Layer.findObjectBySerialized(serialized) || {remove: () => undefined}).remove();

                // push command (prepare next undo/redo)
                this.$emit('history', {
                    type: 'push',
                    argument: {
                        name: () => 'Delete',
                        exec: () => {
                            _removeLinks(_undoInfo.links);
                            _removeLayer(_undoInfo.layer);
                            _restoreLinks(_redoInfo.links);
                        },
                        undo: () => {
                            _removeLinks(_redoInfo.links);
                            _restoreLayer(_undoInfo.layer);
                            _restoreLinks(_undoInfo.links);
                        },
                    },
                });
            }
        },
        deleteLayer: () => {
            if (window.uop() && !dl()) {
                Graph.deleteSelection('Delete');
            }
        },
        addLayer: function() {
            let component = this.selectedComponent;
            if (component) {
                window.svgArea.addLayer(component);
            }
        },
        insertLayer: function() {
            let component = this.selectedComponent;
            if (window.uop() && component && Graph.selection.layer.focused()) {
                // レイヤー名からレイヤーオブジェクトを取得する
                let _findLayerByName = (name) => {
                    return Graph.layers().find((layer) => layer.name() == name);
                };

                let LAYER_HEIGHT = Definitions.EDIT.LAYER.RECT_HEIGHT;
                let focused = Graph.selection.layer.focused();
                let focusedPosition = focused.getPosition();
                let _offsetHeight = (position) => {
                    return {x: position.x, y: position.y + LAYER_HEIGHT};
                };
                let movedLayers = Graph.layers((layer) => {
                    let position = layer.getPosition();
                    if (focusedPosition.y <= position.y) {
                        layer.setPosition(_offsetHeight(position));
                        return {name: layer.name(), position: position};
                    } else {
                        return null;
                    }
                }).filter((x) => x);
                let links = (focused.getInConnector() || {links: () => []}).links();
                let outConnectors = links.map((l) => l.source());
                let oldLinks = links.map((l) => l.serialize());
                links.forEach((link) => link.remove());

                // Componentで選択しているレイヤーをフォーカスレイヤーがいた位置に挿入する
                let layer = new Layer({
                    type: component,
                    x: focusedPosition.x,
                    y: focusedPosition.y,
                }, window.svgArea);

                // リンクの接続先変更または削除を行う
                let in_ = layer.getInConnector();
                let out_ = layer.getOutConnector();
                let newLinks;
                if (in_) {
                    const _makeLinkToIn = (out) => out.linkTo(in_);
                    const _serialize = (link) => link.serialize();
                    const takeLastIfInputLimited = (connectors) => in_.linkingLimit() === 1 ? connectors.splice(connectors.length - 1, 1) : connectors;
                    newLinks = takeLastIfInputLimited(outConnectors).map(_makeLinkToIn).map(_serialize);
                } else {
                    newLinks = [];
                }
                if (out_ && (links.length > 0 || focused.getInConnector())) {
                    let link = out_.linkTo(focused.getInConnector());
                    newLinks.push(link.serialize());
                }

                let inserted = layer.serialize();

                this.$emit('history', {
                    type: 'push',
                    argument: {
                        exec: () => {
                            movedLayers.forEach((layer) => _findLayerByName(layer.name).setPosition(_offsetHeight(layer.position)));
                            oldLinks.map(Link.findObjectBySerialized).forEach((l) => l.remove());
                            Layer.deserialize(inserted);
                            newLinks.forEach(Link.deserialize);
                        },
                        undo: () => {
                            newLinks.map(Link.findObjectBySerialized).forEach((link) => link.remove());
                            Layer.findObjectBySerialized(inserted).remove();
                            oldLinks.forEach(Link.deserialize);
                            movedLayers.forEach((layer) => _findLayerByName(layer.name).setPosition(layer.position));
                        },
                        name: () => {
                            return 'Insert layer : ' + component;
                        },
                    },
                });
            }
        },
        freeGrabbedLayers: () => {
            if (window.uop()) {
                Graph.selection.clear();
            }
        },
        grabAllLayers: () => {
            if (window.uop()) {
                Graph.selectAll();
            }
        },
        popUpMenu: contextMenu.showContextMenu,
        zooming: function(event) {
            let percentage;
            switch (event.key) {
                case '0': percentage = 100; break;
                case '+': if (this.values.canMoveNext) percentage = this.values.next; break;
                case '-': if (this.values.canMovePrev) percentage = this.values.prev; break;
            }
            if (window.uop() && percentage) this.$emit('zoom', {name: 'Editor', percentage: percentage});
        },
        zoomingByWheel: function(event) {
            event.preventDefault();
            event.stopPropagation();
            const percentage = event.wheelDelta <= -120 && this.values.canMovePrev ? this.values.prev : event.wheelDelta >= 120 && this.values.canMoveNext ? this.values.next : undefined;
            if (percentage) this.$emit('zoom', {name: 'Editor', percentage: percentage});
        },
    },
};
</script>

<style>
.network-tabs {
    width: 100%;
    height: 40px;
    border-bottom: solid 1px var(--color-gray2);
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
