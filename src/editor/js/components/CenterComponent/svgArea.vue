<template>
    <div>
        <svg id="network-editor" tabindex="0">
            <keep-alive>
            <g class="assist-dots" id="svg-assist-dots" :style="getAssistDotsStyle()" v-if="isDragging">
                <g v-for="col in assistAreaX">
                    <g v-for="row in assistAreaY">
                        <circle :cx="col" :cy="row" r="1.0" style="fill: var(--color-brand)"></circle>
                    </g>
                </g>
            </g>
            </keep-alive>

            <g class="layers" id="svg-layers" >
                <g class="layer"
                   v-for="(node, index) in activeGraph.nodes"
                   :id="'layer-' + index"
                   :key="$store.state.graphInfo.nntxtPath + '-layer-' + index"
                   :transform="createTransform(node, index)"
                   @mousedown="clickLayer(index)">
                    <g class="link-circles top" v-if="node.type !== 'InputVariable'">
                        <circle class="linker" cx="100" cy="0" r="3.5"></circle>
                        <circle class="hide-linker top" cx="100" cy="0" r="9" opacity="0"></circle>
                    </g>
                    <g class="link-circles bottom" v-if="node.type !== 'OutputVariable'">
                        <circle class="linker" cx="100" cy="40" r="3.5"></circle>
                        <circle class="hide-linker bottom"
                                cx="100" cy="40" r="9" opacity="0"
                                @mousedown.stop="clickLayer(index)"></circle>
                    </g>
                    <rect class="layer-rect" v-bind="getNodeAttr()" :style="getNodeStyle(node)"></rect>
                    <text :style="getCapitalStyle()" v-bind="getCapitalAttr()">{{ node.type.substring(0, 1) }}</text>
                    <g class="text-component" v-bind="getTextComponentStyle()">
                        <text :style="getTextStyle()" v-bind="getTextAttr()">{{node.name}}</text>
                    </g>
                </g>
            </g>

            <g class="links" id="svg-links" style="opacity: 0">
                <path v-for="(link, index) in activeGraph.links"
                      :key="$store.state.graphInfo.nntxtPath + '-link-' + index"
                      :id="'link-' + index"
                      :style="getLinkLineStyle()" :d="createLinkLineContext(link)" ></path>
            </g>
        </svg>
    </div>
</template>

<script>
    import {svgAreaOperator, StyleHelper} from "../../utils/svgAreaHelper";
    import {mapGetters, mapState} from "vuex";

    export default {
        created: function () {
            this.nextTransition = [];
        },
        computed: {
            ...mapGetters(["activeGraph"]),
            ...mapState({
                prevGraph: state => state.graphInfo.prevGraph,
                isDragging: state => state.graphInfo.isDragging,
                assistAreaSize: state => state.graphInfo.assistAreaSize,
            }),
            assistAreaX: function() {
                return d3.range(0, this.assistAreaSize.x, svgAreaOperator.grid)
            },
            assistAreaY: function() {
                return d3.range(0, this.assistAreaSize.y, svgAreaOperator.grid)
            }
        },
        updated: function () {

            svgAreaOperator.registerMouseEvent();

            if (this.nextTransition.length > 0) {
                svgAreaOperator.graphExchangeTransition(this.nextTransition);
                this.nextTransition = [];
            } else {
                svgAreaOperator.adjustSvgSize();
            }

            d3.select("#svg-links")
                .transition().delay(500).duration(500).style("opacity", 1);
        },
        methods: {
            clickLayer: function (index) {
                this.$store.commit("setActiveLayerIndex", index);
            },
            createTransform: function (node, index) {
                let ret = `translate(${node.x}, ${node.y})`;

                if (this.prevGraph.hasOwnProperty("nodes")) {
                    const prev = this.prevGraph.nodes.find(x => x.name === node.name);

                    if (prev) {
                        this.nextTransition.push({index, transform: ret});
                        ret = `translate(${prev.x}, ${prev.y})`;
                    }
                }
                return ret;
            },
            getAssistDotsStyle: () => {
                const scroller = d3.select("div.tab-content.network-editor-scroller").node();

                const moveToRight =  Math.max(Math.ceil(scroller.scrollLeft  / svgAreaOperator.grid), 0) * svgAreaOperator.grid;
                const moveToBottom =  Math.max(Math.ceil(scroller.scrollTop  / svgAreaOperator.grid), 0) * svgAreaOperator.grid;

                return {
                    transform: "translate(" + moveToRight + "px, " + moveToBottom + "px)",
                    opacity: 1.0
                }
            },
            getNodeAttr: () => StyleHelper.createNodeAttr(),
            getNodeStyle: (node) => StyleHelper.createNodeStyle(node),
            getCapitalAttr: () => StyleHelper.createCapitalAttr(),
            getCapitalStyle: () => StyleHelper.createCapitalStyle(),
            getTextComponentStyle: () => StyleHelper.createTextComponentStyle(),
            getTextAttr: () => StyleHelper.createTextAttr(),
            getTextStyle: () => StyleHelper.createTextStyle(),
            getLinkLineStyle: () => StyleHelper.createLinkLineStyle(),
            createLinkLineContext: link => {
                const source = svgAreaOperator.getLinkerPosition(link.source, true);
                const destination = svgAreaOperator.getLinkerPosition(link.destination, false);
                return svgAreaOperator.createLinkLineContext(source, destination);
            }
        },
    }

</script>

<style>

</style>