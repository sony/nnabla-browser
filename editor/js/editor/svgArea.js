import Definitions from "./../misc/Definitions";

const svgArea = function (selectedLayer) {
    this.svg = d3.select("svg#network-editor");

    this.svgLayers = this.svg.append("g").attr("name", "layers").attr("id", "svg-layers");
    this.svgLinks = this.svg.append("g").attr("name", "links").attr("id", "svg-links");

    // this variable stores network information currently displayed
    this.graphInfo = {};
    this.selectedLayer = selectedLayer;

    const layerDef = Definitions.EDIT.LAYER;

    this.allFunctions = Array();

    const recursive = (obj) => {
        if (typeof obj.snake_name !== "undefined") {
            return obj;
        } else {
            if (typeof obj === "object") {
                for (let key in obj) {
                    const ret = recursive(obj[key]);
                    if (ret) {
                        this.allFunctions.push(ret);
                    }
                }
            } else {
                return false;
            }
        }
    };
    recursive(nnablaCore);

    const getDefaultComponent = (type) => {
        return this.allFunctions.find(functionInfo => functionInfo.layer_name === type);
    };

    this.adjustSvgSize = () => {
        let layersDOM = this.svgLayers.node().getClientRects()[0];

        this.svg.attr("width", Math.max(document.getElementById("centerContent").clientWidth,
            layersDOM.width + layerDef.GRID * 4));
        this.svg.attr("height", layersDOM.height + layerDef.GRID * 4);
    };


    this.renderGraph = (graphInfo) => {
        this.graphInfo = graphInfo;

        let allLayers = this.svgLayers.selectAll("layer")
            .data(this.graphInfo.nodes)
            .enter().append("g")
            .attr("class", "layer")
            .style("display", null)
            .attr("transform", node => `translate(${node.x}, ${node.y})`)
            .on("click", (node) => Object.assign({}, this.selectedLayer, node));

        allLayers.append("rect")
            .attr("width", layerDef.RECT_WIDTH)
            .attr("height", layerDef.RECT_HEIGHT)
            .attr("fill", node => "#" + getDefaultComponent(node.type).color.substring(2, 8))
            .attr("stroke", node => "#" + getDefaultComponent(node.type).color.substring(2, 8));

        // capital
        allLayers.append('text')
            .attr('x', layerDef.DROPCAP_CHAR.OFFSET_X)
            .attr('y', layerDef.DROPCAP_CHAR.OFFSET_Y)
            .attr('fill', layerDef.DROPCAP_CHAR.FONTCOLOR)
            .attr('font-size', layerDef.DROPCAP_CHAR.FONTSIZE)
            .attr('pointer-events', 'none')
            .style('text-anchor', layerDef.DROPCAP_CHAR.TEXT_ANCHOR)
            .text(node => node.type.substring(0, 1));

        let textComponents = allLayers.append("g").attr("class", "text-component")
            .attr('clip-path', 'url(#' + layerDef.CLIP_PATH.ID + ')')
            .attr('transform', 'translate(' + layerDef.CLIP_PATH.OFFSET_X + ',' + Definitions.EDIT.LAYER.CLIP_PATH.OFFSET_Y + ')');

        // layer name defined by user (if not defined, layer.type is shown)
        textComponents.append("text")
            .attr('x', layerDef.NAME_LABEL.OFFSET_X)
            .attr('y', layerDef.NAME_LABEL.OFFSET_Y)
            .attr('pointer-events', 'none')
            .attr('fill', layerDef.NAME_LABEL.FONTCOLOR)
            .attr('font-size', layerDef.NAME_LABEL.FONTSIZE)
            .text(node => node.type);


        // update svg size
        this.adjustSvgSize();

        //todo
        // -define dragging event
        // -show learnable parameter information
        // -connect layers properly
    };

};

export default svgArea;