import SDUUtils from './SDUUtils';
import EditorUtils from './../EditorUtils';
import Graph from './../currentGraph';
import Layer from './SDNLayer';
import Definitions from './../misc/Definitions';

/**
 * グラフ編集領域
 */
const SvgArea = function () {
    window.svgArea = this; // XXX Dirty hack; remove this!

    let GRID = Definitions.EDIT.GRID.SIZE;
    let RADIUS = Definitions.EDIT.GRID.RADIUS;

    let _svgTopLevel = d3.select(Definitions.EDIT.SVG_ID);
    let _svgBackground = _svgTopLevel.append('g').attr('name', 'background');
    let _svgLayers = _svgTopLevel.append('g').attr('name', 'layers').attr('id', 'network-editor-nodes');
    let _svgLinks = _svgTopLevel.append('g').attr('name', 'links').attr('id', 'network-editor-links');
    let _svgFocuses = _svgTopLevel.append('g').attr('name', 'focuses').attr('id', 'network-editor-focuses');
    let _svgDots = _svgBackground.append('g').attr('name', 'grid-dots').style('display', 'none');

    this.layerGroup = () => _svgLayers; // レイヤーを管理する SVG グループへの参照を返す
    this.linkGroup = () => _svgLinks; // リンク線を管理する SVG グループへの参照を返す
    this.focusGroup = () => _svgFocuses; // フォーカスを管理する SVG グループへの参照を返す
    this.showGrid = () => _svgDots.style('display', null);
    this.hideGrid = () => _svgDots.style('display', 'none');

    let _points = (width, height) => {
        let points = [];
        let cx = parseInt((width + GRID - 1) / GRID) + 1;
        let cy = parseInt((height + GRID - 1) / GRID) + 1;
        for (let y = 0; y <= cy; y++) {
            for (let x = 0; x <= cx; x++) {
                points.push({x: GRID * x, y: GRID * y});
            }
        }
        return points;
    };

    let _prepareGrid = (width, height) => {
        // remove all dots previousely appended.
        _svgDots.selectAll('circle').remove();
        // append new dots fitting to (width, height) area.
        _points(width, height).forEach((pt) => _svgDots.append('circle')
            .attr('cx', pt.x).attr('cy', pt.y).attr('r', RADIUS).attr('pointer-events', 'none')
            .style('fill', 'lightgray'));
    };

    // widthを返す
    this.width = () => parseInt(_svgTopLevel.style('width'));
    // heightを返す
    this.height = () => parseInt(_svgTopLevel.style('height'));

    // widthとheightを設定する
    let _setSize = (width, height) => {
        _svgTopLevel.style('width', width);
        _svgTopLevel.style('height', height);
    };

    let _svgScroller = $('.network-editor-scroller');
    let _windowWidth = () => _svgScroller.width();
    let _windowHeight = () => _svgScroller.height();

    /**
     * Layerの位置を計算して、他のLayerに重ならないようにする
     * @param type
     * @return {{x: number, y: number}}
     */
    this.calcNewLayerPosition = (type) => {
        let component = EditorUtils.getComponent(type);
        let x = GRID;
        let y = GRID;
        if (component.layout == 'top') {
            x = searchPositionX(x, y);
        } else {
            let focusedLayer = Graph.selection.layer.focused();
            if (focusedLayer) {
                x = focusedLayer.getPosition().x;
                if (focusedLayer.component().output === 0) {
                    y = focusedLayer.getPosition().y + Definitions.EDIT.LAYER.BOUNDING_BOX.HEIGHT + GRID;
                } else {
                    y = focusedLayer.getPosition().y + Definitions.EDIT.LAYER.BOUNDING_BOX.HEIGHT;
                }
                x = searchPositionX(x, y);
            } else {
                y = searchPositionY(x, y);
            }
        }
        return {x: x, y: y};
    };
    /**
     * LayerのX軸について、他のLayerと重なっていないかチェックする
     * @param x
     * @param y
     * @param exceptingLayers チェック対象から除外するレイヤーの配列
     * @return {*}
     */
    const searchPositionX = (x, y, exceptingLayers) => {
        let compList = Graph.layers().filter((layer) => {
            return ((!exceptingLayers || exceptingLayers.indexOf(layer) == -1)
                && (y - GRID - 1) < layer.getPosition().y
                && layer.getPosition().y < (y + Definitions.EDIT.LAYER.BOUNDING_BOX.HEIGHT));
        });
        compList.sort((a, b) => a.getPosition().x - b.getPosition().x);
        let i;

        let checkPosX = x;
        if (compList.length === 0) {
            return checkPosX;
        }
        if (compList[0].getPosition().x - Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH >= checkPosX) {
            return checkPosX;
        }
        for (i = 1; i < compList.length; i++) {
            let layer1 = compList[i - 1];
            let layer2 = compList[i];
//            if(layer1.getPositionX)
            let compX = layer1.getPosition().x + Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH > checkPosX ? layer1.getPosition().x + Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH : checkPosX;
            if (layer2.getPosition().x - compX >= Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH) {
                return compX;
            }
        }
        if (compList[compList.length - 1].getPosition().x + Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH <= checkPosX) {
            return checkPosX;
        } else {
            return compList[compList.length - 1].getPosition().x + Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH;
        }
    };
    /**
     * LayerのY軸について、他のLayerと重なっていないかチェックする
     * @param x
     * @param y
     * @return {*}
     */
    const searchPositionY = (x, y) => {
        let compList = Graph.layers().filter((layer) => {
            let layerX = layer.getPosition().x;
            let layerRightX = layerX + Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH;
            let xRight = x + Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH - GRID;
            if ((x >= layerX && x <= layerRightX) || (xRight >= layerX && xRight <= layerRightX)) {
                return true;
            }
            return false;
        });
        if (compList.length === 0) {
            return y;
        }
        compList.sort((a, b) => a.getPosition().x - b.getPosition().x);
        let checkPosY = y;
        for (let i = 0; i < compList.length; i++) {
            let layer = compList[i];
            let checkBottomPosY = checkPosY + Definitions.EDIT.LAYER.BOUNDING_BOX.HEIGHT;
            let layerPosY = layer.getPosition().y;
            let layerBottomPosY = layerPosY + Definitions.EDIT.LAYER.BOUNDING_BOX.HEIGHT;
            if (checkPosY >= layerPosY || checkBottomPosY > layerPosY || checkPosY <= layerBottomPosY) {
                checkPosY = layerPosY;
            }
        }
        return checkPosY + Definitions.EDIT.LAYER.BOUNDING_BOX.HEIGHT + GRID;
    };

    /**
     * ネットワーク構成の描画に必要なサイズ取得
     */
    let _calcBoundingBox = (positions, margin) => {
        let min = (array) => Math.min.apply(null, array);
        let max = (array) => Math.max.apply(null, array);
        let positionsX = positions.map((p) => p.x);
        let positionsY = positions.map((p) => p.y);
        return {
            left: min(positionsX) - margin, // 左端マージンを引いた座標
            top: min(positionsY) - margin, // 上端マージンを引いた座標
            right: max(positionsX) + Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH + margin, // LayerのBoundingBoxサイズと右端マージンを加えた座標
            bottom: max(positionsY) + Definitions.EDIT.LAYER.BOUNDING_BOX.HEIGHT + margin, // 下端マージンを加えた座標
        };
    };

    /**
     * calculate grid-aligned position.
     * @param position {x: ..., y: ...} object
     * @return Grid aligned position
     */
    let align = (position) => {
        let align = (p) => Math.max(0, parseInt((p + GRID / 2) / GRID) * GRID);
        return {x: align(position.x), y: align(position.y)};
    };

    /**
     * レイヤーの移動位置を計算する
     * @param layer 移動するレイヤー
     * @param exceptingLayers 干渉判定から除外するレイヤーの配列
     * @return 移動位置
     */
    this.calcLayerDropPosition = (layer, exceptingLayers) => {
        let alignedPosition = align(layer.getPosition());
        let x = searchPositionX(alignedPosition.x, alignedPosition.y, exceptingLayers || [layer]);
        return {x: x, y: alignedPosition.y};
    };

    let _svgDom = document.getElementById('network-editor');

    /**
     * レイヤーの外接領域変更から SvgArea のサイズを調整
     * @param boundingBox 全レイヤーの外接矩形
     */
    let max = Math.max;
    let _adjustSizeToBoundingBox = (boundingBox) => {
        const ratio = window.nnc.components.Editor.zoomInfo.networkGraph.percentage / 100;
        let width = max(_windowWidth(), boundingBox.right * ratio);
        let height = max(_windowHeight(), boundingBox.bottom * ratio);
        let viewBoxWidth = width / ratio;
        let viewBoxHeight = height / ratio;
        _svgDom.setAttribute('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
        _setSize(width, height);
        _prepareGrid(viewBoxWidth, viewBoxHeight);
    };

    /** SvgArea のサイズを調整 */
    let _requestAdjustSize = (trackingLayers) => {
        let totalBoundingBox = _calcBoundingBox(Graph.layers((layer) => layer.getPosition()), GRID);
        _adjustSizeToBoundingBox(totalBoundingBox);

        if (trackingLayers) {
            let trackingBoundingBox = _calcBoundingBox(trackingLayers.map((layer) => layer.getPosition()), 0);
            let windowWidth = _windowWidth();
            let windowHeight = _windowHeight();

            let scrollLeft = _svgScroller.scrollLeft();
            let scrollRight = scrollLeft + windowWidth;
            if (trackingBoundingBox.left < scrollLeft) {
                _svgScroller.scrollLeft(trackingBoundingBox.left);
            } else if (scrollRight < trackingBoundingBox.right) {
                _svgScroller.scrollLeft(trackingBoundingBox.right - windowWidth);
            }

            let scrollTop = _svgScroller.scrollTop();
            let scrollBottom = scrollTop + windowHeight;
            if (trackingBoundingBox.top < scrollTop) {
                _svgScroller.scrollTop(trackingBoundingBox.top);
            } else if (scrollBottom < trackingBoundingBox.bottom) {
                _svgScroller.scrollTop(trackingBoundingBox.bottom - windowHeight);
            }
        }
    };
    this.requestAdjustSize = _requestAdjustSize;

    this.trackCursorMovement = (cursor) => {
        let windowWidth = _windowWidth();
        let windowHeight = _windowHeight();
        let ratio = window.nnc.components.Editor.zoomInfo.networkGraph.percentage / 100;
        let x = cursor.x * ratio;
        let y = cursor.y * ratio;

        let scrollLeft = _svgScroller.scrollLeft();
        let scrollRight = scrollLeft + windowWidth;
        let scrollTop = _svgScroller.scrollTop();
        let scrollBottom = scrollTop + windowHeight;
        if (scrollRight < x || scrollBottom < y) {
            _requestAdjustSize();
        }

        if (x < scrollLeft) {
            _svgScroller.scrollLeft(x);
        } else if (scrollRight < x) {
            _svgScroller.scrollLeft(x - windowWidth);
        }

        if (y < scrollTop) {
            _svgScroller.scrollTop(y);
        } else if (scrollBottom < y) {
            _svgScroller.scrollTop(y - windowHeight);
        }
    };

    /**
     * レイヤーを追加する位置を計算してaddLayerコマンドを実行する
     * @param type component type
     */
    this.addLayer = (type) => {
        let serialized;
        let autoLinked;
        return window.nnc.components.Editor.history.execute({
            type: 'push-and-execute',
            argument: {
                exec: () => {
                    let layer;
                    if (serialized) {
                        layer = Layer.deserialize(serialized);
                    } else {
                        const pos = this.calcNewLayerPosition(type);
                        layer = new Layer({type: type, x: pos.x, y: pos.y}, this);
                        serialized = layer.serialize();
                    }
                    Graph.selection.clear();
                    Graph.selection.layer.focus(layer);
                    autoLinked = layer.autoLink();
                    _requestAdjustSize([layer]);
                },
                undo: () => {
                    autoLinked.undo();
                    autoLinked = undefined;
                    Layer.findObjectBySerialized(serialized).remove();
                    _requestAdjustSize();
                },
                name: () => 'Add layer : ' + type,
            },
        });
    };

    /**
     * レイヤー設置予測位置の枠を追加する
     * @param position 表示位置
     */
    this.createLayerDestinationFrame = (position) => {
        let rectDom = _svgBackground.append('rect')
            .attr('x', position.x)
            .attr('y', position.y)
            .attr('width', Definitions.EDIT.LAYER.DESTINATION_FRAME.WIDTH)
            .attr('height', Definitions.EDIT.LAYER.DESTINATION_FRAME.HEIGHT)
            .style('fill', Definitions.EDIT.LAYER.DESTINATION_FRAME.FILL_COLOR)
            .style('stroke', Definitions.EDIT.LAYER.DESTINATION_FRAME.STROKE_COLOR)
            .style('stroke-width', Definitions.EDIT.LAYER.DESTINATION_FRAME.STROKE_WIDTH);
        return {
            move: (position) => {
                rectDom.attr('x', position.x).attr('y', position.y);
            },
            getPosition: () => {
                return {x: parseInt(rectDom.attr('x')), y: parseInt(rectDom.attr('y'))};
            },
            destroy: () => {
                SvgArea.hideAndRemove(rectDom);
                rectDom = undefined;
            },
        };
    };

    let _createLasso = () => {
        let dom = _svgFocuses.append('rect')
            .style('fill', Definitions.EDIT.LASSO.FILL_COLOR)
            .style('stroke', Definitions.EDIT.LASSO.STROKE_COLOR)
            .style('stroke-width', Definitions.EDIT.LASSO.STROKE_WIDTH);
        return {
            move: function (from, to) {
                let left = Math.min(from.x, to.x);
                let top = Math.min(from.y, to.y);
                let right = Math.max(from.x, to.x);
                let bottom = Math.max(from.y, to.y);
                let include = (rect) => left <= rect.left && rect.right <= right && top <= rect.top && rect.bottom <= bottom;
                dom.attr('x', left).attr('y', top).attr('width', right - left).attr('height', bottom - top);
                return include;
            },
            destroy: function () {
                SvgArea.hideAndRemove(dom);
                dom = undefined;
            },
        };
    };

    let _createLassoSelectionContext = (from) => {
        // 左クリックの場合のみ
        if (d3.event.sourceEvent.buttons === 1) {
            Graph.selection.clear();
        }
        let items = Graph.layers((layer) => {
            let position = layer.getPosition();
            let size = layer.frameSize();
            return {
                target: layer,
                rect: {
                    left: position.x,
                    top: position.y,
                    right: position.x + size.width,
                    bottom: position.y + size.height,
                },
            };
        });

        let lasso = _createLasso();
        return {
            move: function (to) {
                let lassoCovers = lasso.move(from, to);
                let covered = items.filter((item) => lassoCovers(item.rect)).map((item) => item.target);
                Graph.selection.change(covered);
            },
            destroy: function () {
                lasso.destroy();
                lasso = undefined;
            },
        };
    };

    let _dragContext;
    this.setDragContext = (dragContext) => {
        console.log(dragContext, _dragContext);
        if (_dragContext) {
            // XXX Unexpected situation!!
            throw 'Error: previous context not cleared correctly.';
        }

        _dragContext = dragContext;
    };
    this.draggingLayer = () => !!_dragContext;

    let _mouseToWorldCoordinate = (d3obj) => {
        let mouse = d3.mouse(d3obj);
        return {x: mouse[0], y: mouse[1]};
    };
    // make this object mouseenter event publisher.
    let _eventCallbacksMouseEnter = new SDUUtils.Set();
    /** SvgArea への MouseEnter イベントを受信したときに呼び返されるコールバックを設定する */
    this.subscribeMouseEnter = (callback) => _eventCallbacksMouseEnter.insert(callback);
    /** SvgArea への MouseEnter イベントを受信したときに呼び返されるコールバックを削除する */
    this.unsubscribeMouseEnter = (callback) => _eventCallbacksMouseEnter.remove(callback);

    _svgTopLevel.on('mouseenter', function () {
        let mouse = d3.mouse(this);
        _eventCallbacksMouseEnter.apply((callback) => callback({x: mouse[0], y: mouse[1]}));
    }).on('click', () => {
        _svgDom.focus();
    }).call(d3.drag()
        .on('start', function () {
            _dragContext = _dragContext || _createLassoSelectionContext(_mouseToWorldCoordinate(this));
        })
        .on('drag', function () {
            _dragContext.move(_mouseToWorldCoordinate(this));
        })
        .on('end', function () {
            _dragContext.destroy();
            _dragContext = undefined;
        })
    );
};

/**
 * オブジェクトを非表示にする
 * @param obj
 * @memberOf SvgArea
 */
SvgArea.hideAndRemove = (obj) => {
    if (obj) obj.transition().style('opacity', 0).on('end', () => {
        obj.remove();
    });
};

export default SvgArea;
