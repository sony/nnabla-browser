<template>
    <svg id="network-editor" tabindex="0" >

        <g class="layers" id="svg-layers">
            <g class="layer"
               v-for="(node, index) in activeGraph.nodes"
               :id="'layer-' + index"
               :key="$store.state.graphInfo.nntxtPath + '-layer-' + index"
               :transform="createTransform(node)"
               @mousedown="clickLayer(index)">
                <g class="link-circles top" v-if="node.type !== 'InputVariable'">
                    <circle class="linker" cx="100" cy="-1" r="3.5"></circle>
                    <circle class="hide-linker top" cx="100" cy="-1" r="9" opacity="0"></circle>
                </g>
                <g class="link-circles bottom" v-if="node.type !== 'OutputVariable'">
                    <circle class="linker" cx="100" cy="41" r="3.5"></circle>
                    <circle class="hide-linker bottom"
                            cx="100" cy="41" r="9" opacity="0"
                            @mousedown.stop="clickLayer(index)"></circle>
                </g>
                <rect class="layer-rect" v-bind="getNodeAttr()" :style="getNodeStyle(node)"></rect>
                <text :style="getCapitalStyle()" v-bind="getCapitalAttr()">{{ node.type.substring(0, 1) }}</text>
                <g class="text-component" v-bind="getTextComponentStyle()">
                    <text :style="getTextStyle()" v-bind="getTextAttr()">{{node.name}}</text>
                </g>
            </g>
        </g>

        <g class="links" id="svg-links">
            <path v-for="(link, index) in activeGraph.links"
                  :key="$store.state.graphInfo.nntxtPath + '-link-' + index"
                  :id="'link-' + index"
                  :style="getLinkLineStyle()" :d="createLinkLineContext(link)" ></path>
        </g>
    </svg>
</template>

<script>
    import {svgAreaOperator, StyleHelper} from "./../../utils/svgAreaHelper";
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters(["activeGraph"]),
        },
        updated: function () {
            svgAreaOperator.adjustSvgSize();
            svgAreaOperator.registerMouseEvent();
        },
        methods: {
            clickLayer: function (index) {
                this.$store.commit("setActiveLayerIndex", index);
            },
            createTransform: node => `translate(${node.x}, ${node.y})`,
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