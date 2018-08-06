import Connector from './SDNConnector';
import Editor from './editor';
import Graph from './../currentGraph';
import Definitions from './../misc/Definitions';
import SvgArea from './SDNSvgArea';

let Link;

(() => {
    /** 半開リンク線生成 */
    const WIDTH_DRAG_LINK = Definitions.EDIT.LINK.FOCUSED_DRAG.STROKE_WIDTH;
    const COLOR_DRAG_LINK = Definitions.EDIT.LINK.FOCUSED_DRAG.STROKE_COLOR;
    const _mkHalfOpenLinkPath = (group, link) => group.append('path')
            .attr('d', Link.getPathData(link._destination.getPosition(), link._source, link._destination))
            .attr('stroke-width', WIDTH_DRAG_LINK)
            .attr('stroke', COLOR_DRAG_LINK)
            .attr('fill', 'none');

    /** リンク線をクリックした位置を計算 */
    const abs = Math.abs;
    const _selectNearest = function(pos, src, dest) {
        const x = pos.x;
        const y = pos.y;
        let p1;
        let p2;
        p1 = src.getPosition().y;
        p2 = dest.getPosition().y;
        if (abs(p1 - y) < abs(y - p2)) {
            return src;
        } else {
            p1 = src.getPosition().x;
            p2 = dest.getPosition().x;
            if (abs(p1 - x) < abs(x - p2)) {
                return src;
            } else {
                return dest;
            }
        }
    };

    /** リンクの接続変更先コネクターを探して決める */
    const OUT_CONECTOR = Definitions.EDIT.CONNECTOR.OUT;
    const _sameParent = (conn1, conn2) => conn1.layer() === conn2.layer();
    const _findConnectingTargetConnector = function(rootConnector) {
        const connector = Editor.touchingConnector();
        if (connector && !_sameParent(connector, rootConnector)) {
            const type = rootConnector.getType();
            if (type === OUT_CONECTOR || connector.isDefault()) {
                return connector;
            }
        }
        const layer = Editor.stockedLayer();
        if (layer) { // リンク先がレイヤーの内側に入っていたらコネクタへ接続する
            const type = rootConnector.getType();
            const candidate = type === OUT_CONECTOR ? layer._inConnector : layer._outConnector;
            if (candidate && !_sameParent(candidate, rootConnector)) {
                return candidate;
            }
        }
        return undefined;
    };

    /** リンクの接続先変更 半開リンク更新 */
    const _updateHalfOpenLink = function(root, target, link, dragging, posDragging) {
        link.attr('d', Link.getPathData(posDragging, root, target));
        dragging.attr('cx', posDragging.x).attr('cy', posDragging.y);
    };

    /**
     * Link Constructor
     *
     * represents link between source and destination connector.
     *
     * @param linksLayer specifies SVG group where this link to be lived in.
     * @param dragDelegate proxies drag behaviour.
     * @param sourceConnector Connector object which belongs to source layer's output pin
     * @param destinationConnector Connector object which belongs to destination layer's input pin (or input side connector)
     */
    Link = function(linksLayer, dragDelegate, sourceConnector, destinationConnector) {
        this._source = sourceConnector;
        this._destination = destinationConnector;

        const _createDragContext = (cursor) => {
            /** リンク線の表示設定*/
            const _opacity = (value) => this._linkLine.attr('opacity', value);

            const src = this._source;
            const dest = this._destination;
            const dragging = _selectNearest(cursor, src, dest);
            const root = dragging === src ? dest : src;
            _opacity(0);
            const draggingEnd = Connector.mkLinkEdge(linksLayer, dragging.getPosition());
            const rootEnd = Connector.mkLinkEdge(linksLayer, root.getPosition());
            let halfOpenLink = _mkHalfOpenLinkPath(linksLayer, this); // 更新用のリンク線画像
            let target; // リンク先変更用 変更先のコネクタ
            Graph.selection.clear();
            Graph.selection.layer.focus(root.layer(), dragging.layer());

            return {
                move: (cursor) => {
                    target = _findConnectingTargetConnector(root);
                    let posDragging;
                    if (target && (target.canConnect() && !target.connectedWith(root)) || (target === dragging && target.connectedWith(root))) {
                        posDragging = target.getPosition();
                    } else {
                        posDragging = cursor;
                    }
                    _updateHalfOpenLink(root, target, halfOpenLink, draggingEnd, posDragging); // リンク線の接続先変更
                    Graph.selection.layer.clear();
                    Graph.selection.layer.focus(root.layer());
                    if (target) {
                        Graph.selection.layer.insert(target.layer());
                    }
                },
                destroy: () => {
                    let link;
                    _opacity(null);
                    if (target && target.canConnect()) {
                        let source;
                        let destination;
                        if (target.getType() === OUT_CONECTOR) {
                            source = target; destination = root;
                        } else {
                            source = root; destination = target;
                        }
                        link = source.linkTo(destination);
                        const newLink = link.serialize();
                        const oldLink = this.serialize();
                        this.remove();
                        window.nnc.components.Editor.history.execute({
                            type: 'push',
                            argument: {
                                exec: () => {
                                    Link.deserialize(newLink);
                                    Link.findObjectBySerialized(oldLink).remove();
                                },
                                undo: () => {
                                    Link.findObjectBySerialized(newLink).remove();
                                    Link.deserialize(oldLink);
                                },
                                name: () => 'Edit link',
                            },
                        });
                    } else {
                        link = this;
                    }
                    Graph.selection.clear();
                    Graph.selection.link.focus(link);
                    if (halfOpenLink) { // 更新用のリンク線画像を（描画対象から）削除する
                        halfOpenLink.remove();
                        halfOpenLink = undefined;
                    }
                    // ドラッグ用コネクターを（描画対象から）削除する
                    Connector.safeRemoveLinkingConnector(rootEnd);
                    // リンク開始用のコネクター画像を（描画対象から）削除する
                    Connector.safeRemoveLinkingConnector(draggingEnd);
                },
            };
        };

        const _eventHandlerAppender = d3.drag()
            .on('start', function() {
                // 左クリックの場合のみ
                if (d3.event.sourceEvent.buttons === 1) {
                    const pos = d3.mouse(this); // mousedownされた位置座標の取得
                    dragDelegate.set(_createDragContext({x: pos[0], y: pos[1]}));
                }
            }); // drag と dragend の処理は delegate に移譲

        this._linkLine = linksLayer.append('path')
            .attr('d', Link.getPathData(destinationConnector.getPosition(), sourceConnector, destinationConnector))
            .style('stroke-width', Definitions.EDIT.LINK.DEFAULT.STROKE_WIDTH)
            .style('stroke', Definitions.EDIT.LINK.STROKE_COLOR)
            .style('fill', 'none')
            .call(_eventHandlerAppender);

        Graph.insertLink(this);
    };
})();

(() => {
    const COLOR_FOCUSED = Definitions.EDIT.LINK.FOCUSED.STROKE_COLOR;
    const COLOR_DEFAULT = Definitions.EDIT.LINK.STROKE_COLOR;

    /**
     * 選択状態を更新する
     *
     * @param {Boolean} setOrNot true: 選択状態にする, false: 選択状態を解除する
     */
    Link.prototype.select = function(setOrNot) {
        this._linkLine.style('stroke', setOrNot ? COLOR_FOCUSED : COLOR_DEFAULT);
        this.source().select(setOrNot);
        this.destination().select(setOrNot);
    };
})();

/** リンク接続済みのコネクター作図*/
Link._mkLinkedCircle = function(group, cx, cy) {
    let circleSvg = group.append('circle')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', Definitions.EDIT.LAYER.CONNECTOR.JOIN_RADIUS)
            .attr('fill', Definitions.EDIT.LAYER.CONNECTOR.STROKE_COLOR)
            .attr('pointer-events', 'none');
    return circleSvg;
};
/** SourceConnectorを返す */
Link.prototype.source = function() {
return this._source;
};
/** DestinationConnectorを返す */
Link.prototype.destination = function() {
return this._destination;
};
/**
 * リンクの両端の情報をオブジェクトとして返す
 * @returns {{source: serialized-connector, destination: serialized-connector}}
 */
Link.prototype.serialize = (() => {
    return function() {
        return {
            from_node: this._source.layer().name(),
            from_name: this._source.name(),
            to_node: this._destination.layer().name(),
            to_name: this._destination.name(),
        };
    };
})();

// Seal implementation detail of Deserialization and Find according to serialized link.
(() => {
    let OUT = Definitions.EDIT.CONNECTOR.OUT;
    let IN = Definitions.EDIT.CONNECTOR.IN;

    let _nullLayer = {getInConnector: () => undefined, getOutConnector: () => undefined};
    let _findConnector = function(type, nodeName, name) {
        let layer = Graph.layers().find((layer) => layer.name() === nodeName) || _nullLayer;
        switch (type) {
        case IN: return layer.getInConnector(name);
        case OUT: return layer.getOutConnector(name);
        default: return undefined;
        }
    };

    let _forceToNewFormat = (serialized) => {
        if ('source' in serialized) {
            return {
                from_node: serialized.source.nodeName,
                from_name: serialized.source.name,
                to_node: serialized.destination.nodeName,
                to_name: serialized.destination.name,
            };
        } else {
            return serialized;
        }
    };

    let _deserialize = (serialized) => {
        serialized = _forceToNewFormat(serialized);
        let source = _findConnector(OUT, serialized.from_node, serialized.from_name);
        let destination = _findConnector(IN, serialized.to_node, serialized.to_name);
        if (source && destination) {
            return source.linkTo(destination);
        } else {
            return null;
        }
    };

    let _find = (serialized) => {
        serialized = _forceToNewFormat(serialized);
        let source = _findConnector(OUT, serialized.from_node, serialized.from_name);
        if (source) {
            let destination = _findConnector(IN, serialized.to_node, serialized.to_name);
            return source.links().find((l) => l.destination() === destination) || null;
        } else {
            return null;
        }
    };

    // Restore link from its serialized format.
    Link.deserialize = _deserialize;

    /**
     * find real link object matching to serialized information.
     * @param serialized link information.
     * @return matching link object specified by 'serialized', or null if not found in current graph.
     */
    Link.findObjectBySerialized = _find;
})();

/**
 * 更新する
 * @memberOf Link
 */
Link.prototype.updateLinkLine = function() {
    let src = this._source;
    let dst = this._destination;
    if (src && dst) {
        this._linkLine.attr('d', Link.getPathData(dst.getPosition(), src, dst));
    }
};
/**
 * リンクの接続先を変更する
 * @memberOf Link
 */
Link.prototype.resetConnectors = function(source, destination) {
    this._source = source;
    this._destination = destination;
    this._linkLine.attr('d', Link.getPathData(destination.getPosition(), source, destination));
};
/**
 * リンクpathのデータを返す
 * @param posEnd リンク線末端の座標
 * @param root リンク元のコネクターオブジェクト
 * @param target リンクが接続済み、または接続候補があればそのリンク先コネクターオブジェクト
 */
Link.getPathData = function(posEnd, root, target) {
    let max = Math.max;
    let GRID = Definitions.EDIT.GRID.SIZE;
    let RAD = GRID / 2;
    let posRoot = root.getPosition();
    let targetRight = target ? target.getPosition().x + GRID * 7.5 : -Infinity;
    // Draw straight line if linked to Input Side Connector.
    if (root.name() || target && target.name()) {
        return 'M ' + posRoot.x + ',' + posRoot.y + ' L ' + posEnd.x + ',' + posEnd.y;
    }
    if (root.getType() === Definitions.EDIT.CONNECTOR.OUT) {
        if (posRoot.y <= posEnd.y) {
            return 'M ' + posRoot.x + ',' + posRoot.y +
                  ' L ' + posEnd.x + ',' + posEnd.y;
        // } else if (posRoot.x + GRID * 8 <= posEnd.x) {
        //     return 'M ' + posRoot.x + ',' + posRoot.y +
        //           ' v ' + GRID +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + ( RAD) + ',' + ( RAD) +
        //           ' H ' + (posEnd.x - RAD) +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + ( RAD) + ',' + (-RAD) +
        //           ' V ' + posEnd.y;
        // } else if (posRoot.y - GRID * 1.5 >= posEnd.y) {
        //     return 'M ' + posRoot.x + ',' + posRoot.y +
        //           ' v ' + GRID +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + ( RAD) + ',' + ( RAD) +
        //           ' H ' + max(posRoot.x + GRID * 7.5, posEnd.x + GRID * 2.5, targetRight) +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + ( RAD) + ',' + (-RAD) +
        //           ' V ' + (posEnd.y + RAD) +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + (-RAD) + ',' + (-RAD) +
        //           ' H ' + posEnd.x;
        } else {
            return 'M ' + posRoot.x + ',' + posRoot.y +
                  ' v ' + GRID +
                  ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + ( RAD) + ',' + ( RAD) +
                  ' H ' + max(posRoot.x + GRID * 7.5, posEnd.x + GRID * 2.5, targetRight) +
                  ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + ( RAD) + ',' + (-RAD) +
                  ' V ' + (posEnd.y - GRID) +
                  ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + (-RAD) + ',' + (-RAD) +
                  ' H ' + (posEnd.x + RAD)+
                  ' a ' + (RAD) + ',' + (RAD) + ' 0 0,0 ' + (-RAD) + ',' + ( RAD) +
                  ' V ' + posEnd.y;
        }
    } else {
        if (posRoot.y >= posEnd.y) {
            return 'M ' + posRoot.x + ',' + posRoot.y +
                  ' L ' + posEnd.x + ',' + posEnd.y;
        // } else if (posRoot.x + GRID * 8 <= posEnd.x) {
        //     return 'M ' + posRoot.x + ',' + posRoot.y +
        //           ' v ' + (-GRID) +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + ( RAD) + ',' + (-RAD) +
        //           ' H ' + (posEnd.x - RAD) +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + ( RAD) + ',' + ( RAD) +
        //           ' V ' + posEnd.y;
        // } else if (posRoot.y + GRID * 1.5 <= posEnd.y) {
        //     return 'M ' + posRoot.x + ',' + posRoot.y +
        //           ' v ' + (-GRID) +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + ( RAD) + ',' + (-RAD) +
        //           ' H ' + max(posRoot.x + GRID * 7.5, posEnd.x + GRID * 2.5, targetRight) +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + ( RAD) + ',' + ( RAD) +
        //           ' V ' + (posEnd.y - RAD) +
        //           ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + (-RAD) + ',' + ( RAD) +
        //           ' H ' + posEnd.x;
        } else {
            return 'M ' + posRoot.x + ',' + posRoot.y +
                  ' v ' + (-GRID) +
                  ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + ( RAD) + ',' + (-RAD) +
                  ' H ' + max(posRoot.x + GRID * 7.5, posEnd.x + GRID * 2.5, targetRight) +
                  ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + ( RAD) + ',' + ( RAD) +
                  ' V ' + (posEnd.y + GRID) +
                  ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + (-RAD) + ',' + ( RAD) +
                  ' H ' + (posEnd.x + RAD) +
                  ' a ' + (RAD) + ',' + (RAD) + ' 0 0,1 ' + (-RAD) + ',' + (-RAD) +
                  ' V ' + posEnd.y;
        }
    }
};
/**
 * 削除
 * @memberOf Link
 */
Link.prototype.remove = function() {
    // DOM の削除
    SvgArea.hideAndRemove(this._linkLine);

    // 管理対象から削除
    Graph.removeLink(this);

    // 不要になった参照を削除
    delete this._source;
    delete this._destination;
    delete this._linkLine;
};

export default Link;
