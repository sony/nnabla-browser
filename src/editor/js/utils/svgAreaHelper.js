import Definitions from './../misc/Definitions';
import store from "../store";

export const allFunctions = [];

const getAllFuncionsRecursive = (obj) => {
    if (typeof obj.snake_name !== "undefined") {
        return obj;
    } else {
        if (typeof obj === "object") {
            for (let key in obj) {
                const ret = getAllFuncionsRecursive(obj[key]);
                if (ret) {
                    allFunctions.push(ret);
                }
            }
        } else {
            return false;
        }
    }
};

getAllFuncionsRecursive(nnablaCore);

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
    };

    this.createLinkLineStyle = () => {
        return {
            stroke: "var(--color-gray5)",
            "stroke-width": "1.5",
            fill: "none"
        }
    }
};

export const StyleHelper = new StyleHelperCtor();

const svgAreaOperatorCtor = function () {
    const self = this;

    this.drawingLinkMemory = {source: {}, destination: {}, tmpLine: {}, delta: {x: 0, y: 0}};

    this.connectedLinks = [];

    const layerDef = Definitions.EDIT.LAYER;
    const grid = layerDef.GRID;

    const adjustSvgSize = () => {
        const svg = d3.select("svg#network-editor");
        const svgLayers = svg.select("#svg-layers");

        let layersDOM = svgLayers.node().getClientRects()[0];

        svg.attr("width", Math.max(document.getElementById("centerContent").clientWidth,
            layersDOM.width + grid * 4));
        svg.attr("height", layersDOM.height + grid * 4);
    };

    const getTranslateCoordinate = (node) => {
        // str == "translate(x, y)"

        const str = d3.select(node).attr("transform");

        const tmp = str.split("(")[1].split(",");

        const x = tmp[0].trim();
        const y = tmp[1].trim().split(")")[0];

        return [parseInt(x), parseInt(y)];
    };

    const getLayerIndex = (layerNode) => {
        return layerNode.id.split("-")[1];
    };

    const getLayerPosition = index => {
        const targetLayer = store.getters.activeGraph.nodes[index];
        return {x: targetLayer.x, y: targetLayer.y};
    };

    const getLinkerPosition = (layerIndex, isSourceNode) => {
        let {x, y} = getLayerPosition(layerIndex);

        x += grid * 5;
        y += isSourceNode ? grid * 2: 0;

        return {x, y};
    };

    const getCorrectPosition = (x, y) => {
        const X = Math.max(Math.round(x / grid), 0) * grid;
        const Y = Math.max(Math.round(y / grid), 0) * grid;

        return [X, Y];
    };

    const layerDefocusing = () => {
        this.focusLayerRect.transition().ease(d3.easeCircleOut).duration(300)
            .style("fill-opacity", 0.2)
            .style("stroke-opacity", 0)
            .attr("transform", "translate(-10, -10) scale(1.1, 1.5)")
            .remove();
    };

    const layerFocusing = node => {
        if (typeof this.focusLayerRect !== "undefined") {
            // if the same layer is clicked again, do nothing
            if (d3.select(node).selectAll("rect").nodes().length > 1) return;

            layerDefocusing();
        }

        this.focusLayerRect = d3.select(node).append("rect");

        this.focusLayerRect.attr("width", layerDef.RECT_WIDTH)
            .attr("height", layerDef.RECT_HEIGHT)
            .attr("transform", "translate(-10, -10) scale(1.1, 1.5)")
            .style("fill", "black")
            .style("fill-opacity", 0.2)
            .style("stroke", "black")
            .style("stroke-opacity", 0)
            .transition().ease(d3.easeCircleOut).duration(500)
            .style("fill-opacity", 0.5)
            .style("stroke-opacity", 0.5)
            .attr("transform", "translate(0, 0) scale(1, 1)");
    };

    const createLinkLineContext = ({x: x1, y: y1}, {x: x2, y: y2}) => {
        const offset = Definitions.EDIT.LAYER.GRID / 2;
        let points = [];

        const context = d3.path();

        context.moveTo(x1, y1);

        if ( (y2 - y1) > offset * 2 && Math.abs(x1 - x2) > offset * 2) {
            const halfY = (y1 + y2) / 2;
            const sign = x1 < x2 ? 1 : -1;

            points = [
                [x1,  halfY - offset],
                [x1, halfY, x1 + sign * offset, halfY], // cx, cy, x, y
                [x2 - sign * offset, halfY],
                [x2, halfY, x2, halfY + offset] // cx, cy, x, y
            ];

        } else if (y1 > y2) {
            const halfX = offset * 18;
            const sign = x1 + halfX < x2 ? 1 : -1;

            points = [
                [x1, y1 + offset, x1 + offset, y1 + offset], // cx, cy, x, y
                [x1 + halfX - offset, y1 + offset],
                [x1 + halfX, y1 + offset, x1 + halfX, y1], // cx, cy, x, y
                [x1 + halfX, y2],
                [x1 + halfX, y2 - offset, x1 + halfX + sign * offset , y2 - offset], // cx, cy, x, y
                [x2 - sign * offset, y2 - offset],
                [x2, y2 - offset, x2, y2] // cx, cy, x, y
            ];
        }

        for (let point of points) {
            point.length === 2 ? context.lineTo(...point) : context.quadraticCurveTo(...point);
        }

        context.lineTo(x2, y2);

        return context.toString();
    };

    // for layer event

    const layerDragStart = function (v, i) {
        layerFocusing(this);

        // get all links connecting this layer
        const links = store.getters.activeLinks(i);
        const offsetX = Definitions.EDIT.LAYER.RECT_WIDTH / 2;

        self.connectedLinks = [];

        for (let link of links) {
            let insert;
            if (link.source === i) {
                insert = {
                    index: link.index,
                    destination: getLinkerPosition(link.destination, false),
                    update: function ({x, y}) {this.source = {x: x + grid * 5 , y: y + grid * 2}}
                }
            } else if (link.destination === i) {
                insert = {
                    index: link.index,
                    source: getLinkerPosition(link.source, true),
                    update: function ({x, y}) {this.destination = {x: x + grid * 5 , y: y}}
                }
            }

            self.connectedLinks.push(insert);
        }
    };

    const layerDragging = function (v, i) {
        //remove auxiliary layer
        d3.select("#svg-layers").select("rect#auxiliary-layer").remove();

        const [currentX, currentY] = getTranslateCoordinate(this);

        const x = currentX + d3.event.dx, y = currentY + d3.event.dy;
        d3.select(this)
            .attr("transform", `translate(${x}, ${y})`);

        // redraw all links
        for (let link of self.connectedLinks) {
            link.update({x, y});
            d3.select("path#link-"+link.index).attr("d", createLinkLineContext(link.source, link.destination));
        }

        // show end position
        const [endX, endY] = getCorrectPosition(x, y);
        const {width, height} = StyleHelper.createNodeAttr();

        d3.select("#svg-layers").append("rect")
            .attr("id", "auxiliary-layer")
            .attr("x", endX).attr("y", endY)
            .attr("width", width).attr("height", height)
            .style("fill", "none")
            .style("stroke", "var(--color-brand)")
            .style("stroke-dasharray", 3)
            .style("stroke-opacity", 0.4)
            .lower();
    };

    const layerDragEnd = function (v, index) {
        const [currentX, currentY] = getTranslateCoordinate(this);

        // auto positioning
        const [x, y] = getCorrectPosition(currentX, currentY);

        // redraw all links
        for (let link of self.connectedLinks) {
            link.update({x, y});
            d3.select("path#link-"+link.index)
                .transition().duration(300).attr("d", createLinkLineContext(link.source, link.destination));
        }

        self.connectedLinks = [];

        d3.select(this)
            .transition().duration(300)
            .attr("transform", `translate(${x}, ${y})`)
            .on("end", () => {
                store.commit("setNodePosition", {index, x, y});
                adjustSvgSize();
            });

        // remove auxiliary layer
        d3.select("#svg-layers").selectAll("rect#auxiliary-layer")
            .transition().duration(300).attr("opacity", 0).remove();
    };

    const layerClicked = function () {
        layerFocusing(this.parentNode);
    };

    const layerMouseOver = function (v, i, nodes) {
        d3.select(this).select("rect").attr("fill-opacity", "0.5");
        self.drawingLinkMemory.destination = getLayerIndex(nodes[i]);
    };

    const layerMouseOut = function () {
        d3.select(this).select("rect").attr("fill-opacity", "1");
        self.drawingLinkMemory.destination = null;
    };


    // for link event

    const linkDragStart = function (v, i, nodes) {
        layerFocusing(nodes[i].parentNode.parentNode);

        d3.select(nodes[i].parentNode).select(".linker").style("fill", "var(--color-system3)");

        self.drawingLinkMemory.source = getLayerIndex(nodes[i].parentNode.parentNode);

        const lineIndex = d3.select("#svg-links").selectAll("path").nodes().length;

        self.drawingLinkMemory.tmpLine = d3.select("#svg-links").append("path").attr("id", "link-" + lineIndex);
    };

    const linkDragging = function () {

        let [x, y] = d3.mouse(document.getElementById("network-editor"));

        if (d3.event.dx) {self.drawingLinkMemory.delta.x = Math.sign(d3.event.dx) * 2}
        if (d3.event.dy) {self.drawingLinkMemory.delta.y = Math.sign(d3.event.dy) * 2}

        // 描画するlineが既存のlinkerに重なった際、上に描画されるため、mouseEnter/Leave/Over/Outがおかしくなる。すこしずらす。
        x -= self.drawingLinkMemory.delta.x;
        y -= self.drawingLinkMemory.delta.y;

        const context = createLinkLineContext(getLinkerPosition(self.drawingLinkMemory.source, true), {x, y});

        self.drawingLinkMemory.tmpLine
            .attr("d", context)
            .style("fill", "none")
            .style("stroke", "var(--color-system3)")
            .style("stroke-width", "1.5")
    };

    const linkDragEnd = function (v, i, nodes) {
        const m = self.drawingLinkMemory;

        if (m.destination !== null) {
            const context = createLinkLineContext(getLinkerPosition(m.source, true), getLinkerPosition(m.destination, false));

            m.tmpLine
                .attr("d", context)
                .style("stroke", "var(--color-gray5)")
                .style("stroke-width", "1.5")
                .style("stroke-opacity", null);

            store.commit("addNewLink", m);
        }

        m.tmpLine.remove();

        self.drawingLinkMemory = {source: {}, destination: {}, tmpLine: {}, delta: {x: 0, y: 0}};

        d3.select(nodes[i].parentNode).select(".linker").style("fill", null);

    };

    // member method
    this.adjustSvgSize = adjustSvgSize;

    this.getLinkerPosition = getLinkerPosition;

    this.createLinkLineContext = createLinkLineContext;

    this.graphExchangeTransition = (transitionList) => {
        for (let elm of transitionList) {
            d3.select("#layer-" + elm.index)
                .transition().duration(1000).ease(d3.easeCubicOut)
                .attr("transform", elm.transform)
                .on("end", () => adjustSvgSize());
        }
    };

    this.registerMouseEvent = () => {
        const allLayers = d3.selectAll("#svg-layers .layer");

        if (allLayers.nodes().length > 0) {
            // drag event
            allLayers.call(d3.drag()
                .on("start", layerDragStart)
                .on("drag", layerDragging)
                .on("end", layerDragEnd));

            // click event
            allLayers.select("rect.layer-rect").on("click", layerClicked);

            // mouse over event
            allLayers
                .on("mouseover", layerMouseOver)
                .on("mouseout", layerMouseOut);

            // linker event

            allLayers.selectAll("circle.hide-linker.bottom")
                .call(d3.drag()
                    .on("start", linkDragStart)
                    .on("drag", linkDragging)
                    .on("end", linkDragEnd));
        }
    }
};

export const svgAreaOperator = new svgAreaOperatorCtor();
