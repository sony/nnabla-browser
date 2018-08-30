<template>
    <svg id="network-editor" tabindex="0">

        <g class="layers" id="svg-layers">
            <g class="layer"
               v-for="(node, index) in activeGraph.nodes"
               :key="$store.state.graphInfo.nntxtPath + '-' + index"
               :transform="createTransform(node)"
               @click="clickLayer(node)">
                <rect v-bind="getNodeAttr()" :style="getNodeStyle(node)" v-bind="getNodeAttr()"></rect>
                <text :style="getCapitalStyle()" v-bind="getCapitalAttr()">{{ node.type.substring(0, 1) }}</text>
                <g class="text-component" v-bind="getTextComponentStyle()">
                    <text :style="getTextStyle()" v-bind="getTextAttr()">{{node.type}}</text>
                </g>
            </g>
        </g>
    </svg>
</template>

<script>
    import Definitions from './../../misc/Definitions';

    const allFunctions = [];

    const recursive = (obj) => {
        if (typeof obj.snake_name !== "undefined") {
            return obj;
        } else {
            if (typeof obj === "object") {
                for (let key in obj) {
                    const ret = recursive(obj[key]);
                    if (ret) {
                        allFunctions.push(ret);
                    }
                }
            } else {
                return false;
            }
        }
    };

    recursive(nnablaCore);

    window.nnablaCoreAllFunctions = allFunctions;

    const StyleHelperCtor = function () {
        const layerDef = Definitions.EDIT.LAYER;
        this.allFunctions = allFunctions;


        const getDefaultComponent = (type) => {
            return this.allFunctions.find(functionInfo => functionInfo.layer_name === type);
        };

        const getLayerColor = layerType => {
            return "#" + getDefaultComponent(layerType).color.substring(2, 8);
        };

        // method
        this.createNodeAttr = () => {
            return {
                width: layerDef.RECT_WIDTH,
                height: layerDef.RECT_HEIGHT,
            };
        };

        this.createNodeStyle = node => {
            return {
                fill: getLayerColor(node.type),
                stroke: getLayerColor(node.type)
            };
        };

        this.createCapitalAttr = () => {
            return {
                x: layerDef.DROPCAP_CHAR.OFFSET_X,
                y: layerDef.DROPCAP_CHAR.OFFSET_Y,
            };
        };

        this.createCapitalStyle = () => {
            return {
                fill: layerDef.DROPCAP_CHAR.FONTCOLOR,
                "font-size": layerDef.DROPCAP_CHAR.FONTSIZE,
                "pointer-events": "none",
                "text-anchor": layerDef.DROPCAP_CHAR.TEXT_ANCHOR
            }
        };

        this.createTextComponentStyle = () => {
            return {
                'clip-path': `url(#${layerDef.CLIP_PATH.ID})`,
                transform: `translate(${layerDef.CLIP_PATH.OFFSET_X},${Definitions.EDIT.LAYER.CLIP_PATH.OFFSET_Y})`
            }
        };

        this.createTextAttr = () => {
            return {
                x: layerDef.NAME_LABEL.OFFSET_X,
                y: layerDef.NAME_LABEL.OFFSET_Y,
            };
        };

        this.createTextStyle = () => {
            return {
                "pointer-events": "none",
                fill: layerDef.NAME_LABEL.FONTCOLOR,
                'font-size': layerDef.NAME_LABEL.FONTSIZE
            }
        }
    };

    const StyleHelper = new StyleHelperCtor();

    const svgAreaOperatorCtor = function () {
        const layerDef = Definitions.EDIT.LAYER;

        this.adjustSvgSize = () => {
            const svg = d3.select("svg#network-editor");
            const svgLayers = svg.select("#svg-layers");

            let layersDOM = svgLayers.node().getClientRects()[0];

            svg.attr("width", Math.max(document.getElementById("centerContent").clientWidth,
                layersDOM.width + layerDef.GRID * 4));
            svg.attr("height", layersDOM.height + layerDef.GRID * 4);
        };
    };

    const svgAreaOperator = new svgAreaOperatorCtor();

    export default {
        data: function () {
            return {activeGraph: {links: [], nodes: [], name: ""}};
        },
        watch: {
            "$store.state.graphInfo": {
                handler: function () {
                    this.activeGraph = Object.assign({}, this.activeGraph,
                        this.$store.state.graphInfo.graphs[this.$store.state.graphInfo.activeIndex]);
                },
                deep: true
            },
        },
        updated: function () {
            svgAreaOperator.adjustSvgSize();
        },
        methods: {
            clickLayer: function (node) {
                this.$store.commit("setSelectedLayer", node);
            },
            createTransform: (node) => `translate(${node.x}, ${node.y})`,
            getNodeAttr: () => StyleHelper.createNodeAttr(),
            getNodeStyle: (node) => StyleHelper.createNodeStyle(node),
            getCapitalAttr: () => StyleHelper.createCapitalAttr(),
            getCapitalStyle: () => StyleHelper.createCapitalStyle(),
            getTextComponentStyle: () => StyleHelper.createTextComponentStyle(),
            getTextAttr: () => StyleHelper.createTextAttr(),
            getTextStyle: () => StyleHelper.createTextStyle()
        },
    }

</script>

<style>

</style>