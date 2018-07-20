import Editor from './editor';
import Graph from './../currentGraph';
import Definitions from './../misc/Definitions';
import Link from './SDNLink';
import SvgArea from './SDNSvgArea';

/**
 * Connector Constructor
 *
 * @param layer which this connector belongs to.
 * @param group represents SVG group where this connector to be lived in.
 * @param linksLayer specifies SVG group where links should be lived in.
 * @param dragDelegate proxies drag behaviour.
 * @param type 'in' or 'out'
 * @param accepts number of links; NONE, SINGLE, or MULTIPLE
 * @param name identifier of this connector; '' if this is default input/output pin.
 * @param shorName display name of this pin.
 * @param color color of this connector.
 * @param offset relative position of this connector from parent layer; pair of x and y.
 */
const Connector = (() => {
    const OUT = Definitions.EDIT.CONNECTOR.OUT;

    const _linksFrom = (connector) => Graph.links().filter((link) => link._source === connector);
    const _linksTo = (connector) => Graph.links().filter((link) => link._destination === connector);

    const _linkToFunctionFrom = (thisConnector, linksLayer, dragDelegate) => (connector) => {
        if (connector._type === OUT) {
            throw 'ERROR: attempted making link to Output connector.';
        } else if (thisConnector.connectedWith(connector)) {
            throw 'ERROR: attempted making link with already linked Input connector.';
        } else {
            return new Link(linksLayer, dragDelegate, thisConnector, connector);
        }
    };
    const _linkToFromInput = () => {
        throw 'ERROR: attempted making link from Input connector.';
    };

    // constructor definition; see function parameter
    return function(layer, group, linksLayer, dragDelegate, type, accepts, name, shortName, color, offset) {
        this._layer = layer; // parent layer
        this._type = type;
        this._name = name;

        if (type === OUT) {
            // function, returns links from this connector.
            this.links = () => _linksFrom(this);
            // function, checks this is connected with given connector.
            this.connectedWith = (connector) => _linksFrom(this).some((link) => link._destination === connector);
        } else {
            // function, returns links from this connector.
            this.links = () => _linksTo(this);
            // function, checks this is connected with given connector.
            this.connectedWith = (connector) => _linksTo(this).some((link) => link._source === connector);
        }

        /**
         * makes link from this (out/source layer side) connector to input (destination layer side) connector.
         *
         * @param inConnector input pin or input side connector.
         * @return Link object.
         * @throws Error descripting string if trying to make link from Input, or to Output.
         */
        this.linkTo = type === OUT ? _linkToFunctionFrom(this, linksLayer, dragDelegate) : _linkToFromInput;

        color = color.replace(/0x/, '#');
        this._mainImage = Connector._mkConnectorCircle(group, offset.x, offset.y, color);
        if (!shortName) { // Input/Output Pin
            this._mainImage
                .call(this._makeEventAttacher(dragDelegate, linksLayer));
        } else { // Side Connector
            this._mainImage
                .attr('r', Definitions.EDIT.LAYER.CONNECTOR.SIDE.RADIUS)
                .style('stroke-width', Definitions.EDIT.LAYER.CONNECTOR.STROKE_WIDTH)
                .style('opacity', Definitions.EDIT.LAYER.CONNECTOR.SIDE.OPACITY)
                .call(this.bindEvent, this);
            this._label = group.append('text')
                .attr('x', offset.x) // mainImageとの相対座標
                .attr('y', offset.y + Definitions.EDIT.LAYER.CONNECTOR.SIDE.LABEL.OFFSET_Y) // mainImageとの相対座標
                .attr('pointer-events', 'none')
                .text(shortName)
                .style('fill', Definitions.EDIT.LAYER.CONNECTOR.SIDE.LABEL.FONTCOLOR)
                .style('font-size', Definitions.EDIT.LAYER.CONNECTOR.SIDE.LABEL.FONTSIZE)
                .style('font-weight', Definitions.EDIT.LAYER.CONNECTOR.SIDE.LABEL.FONTWEIGHT)
                .style('text-anchor', 'middle')
                .style('opacity', Definitions.EDIT.LAYER.CONNECTOR.SIDE.LABEL.OPACITY);
        }

        this.linkingLimit = () => {
            if (this.isDefault()) {
                return type === Definitions.EDIT.CONNECTOR.IN ? layer.component().input : layer.component().output;
            } else {
                return 1;
            }
        };
    };
})();
Connector._mkConnectorCircle = function(group, cx, cy, color) {
    return group.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', Definitions.EDIT.LAYER.CONNECTOR.RADIUS)
        .attr('fill', color);
};
Connector.safeRemoveLinkingConnector = function(circle) {
    if (circle) {
        circle.remove();
        circle = undefined;
    }
};
/** create dragging link line */
Connector._mkLinkPath = function(group, x, y) {
    const dlink = Definitions.EDIT.LINK;
    return group.append('path')
        .attr('d', 'M' + [x, y] + 'L' + [x, y])
        .attr('stroke-width', dlink.FOCUSED_DRAG.STROKE_WIDTH)
        .attr('stroke', dlink.FOCUSED_DRAG.STROKE_COLOR)
        .attr('fill', 'none')
        .attr('filter', dlink.FOCUSED_DRAG.FILTER_URL);
};
/** create dragging link edge */
Connector.mkLinkEdge = function(group, position) {
    return group.append('circle')
        .attr('cx', position.x)
        .attr('cy', position.y)
        .attr('r', Definitions.EDIT.LAYER.CONNECTOR.RADIUS)
        .attr('fill', Definitions.EDIT.LINK.FOCUSED.STROKE_COLOR)
        .attr('pointer-events', 'none') // マウスイベントをキャプチャーしないよう設定
        .attr('filter', Definitions.EDIT.LINK.FOCUSED_DRAG.FILTER_URL);
};
Connector.prototype._makeEventAttacher = function(dragDelegate, linksLayer) {
    const _createDragContext = () => {
        const layer = this._layer;
        const type = this._type;
        const self = this;

        const position = self.getPosition();
        // コネクター用 DOM 要素を生成し（描画させるため）親要素に追加
        const connectorEnd = Connector.mkLinkEdge(linksLayer, position); // リンク開始用のコネクター画像
        const draggingEnd = Connector.mkLinkEdge(linksLayer, position); // トラッキング用のコネクター画像
        // リンク線用 DOM 要素を生成し（描画させるため）親要素に追加
        let pathImage = Connector._mkLinkPath(linksLayer, position.x, position.y); // リンク線用直線画像
        Graph.selection.clear(); // 全てのレイヤー、リンク線のselect状態を外す
        Graph.selection.layer.focus(layer);
        return {
            move: function(cursor) {
                let connector;
                let posDragging;
                const targetLayer = Editor.stockedLayer();
                if (!targetLayer || targetLayer === layer) { // 他レイヤー内に入っていなければ、マウスカーソル位置に向けてリンク線を移動する
                    posDragging = cursor;
                    Graph.selection.layer.clear();
                    Graph.selection.layer.focus(layer);
                } else {
                    if (type === Definitions.EDIT.CONNECTOR.OUT) {
                        // リンク先がレイヤーの内側に入っていたらコネクタへ接続する
                        connector = Editor.touchingConnector() || targetLayer._inConnector;
                    } else {
                        connector = targetLayer._outConnector;
                    }
                    if (connector && connector.canConnect()) {
                        posDragging = connector.getPosition();
                        Graph.selection.layer.focus(layer, targetLayer);
                    } else {
                        posDragging = cursor;
                    }
                }
                // リンク線とドラッグ用コネクターの描画位置を更新
                pathImage.attr('d', Link.getPathData(posDragging, self, connector));
                draggingEnd.attr('cx', posDragging.x).attr('cy', posDragging.y);
            },
            destroy: function() {
                // NOTE 「この」コネクターの「上」でドラッグが終了しないことに注意
                const link = self.connect();
                Graph.selection.clear();
                if (link) {
                    Graph.selection.link.focus(link);
                }
                // リンク線用直線画像を（描画対象から）削除する
                if (pathImage) {
                    pathImage.remove();
                    pathImage = undefined;
                }
                // ドラッグ用コネクターを（描画対象から）削除する
                Connector.safeRemoveLinkingConnector(draggingEnd);
                // リンク開始用のコネクター画像を（描画対象から）削除する
                Connector.safeRemoveLinkingConnector(connectorEnd);
            },
        };
    };
    return d3.behavior.drag().on('dragstart', () => dragDelegate.set(_createDragContext())); // drag と dragend の処理は delegate に移譲
};
/**
 * イベント追加
 */
Connector.prototype.bindEvent = function(selection, self) {
    selection.on({
        'mouseenter': function() {
            Editor.stockLayer(self._layer);
            Editor.touchConnector(self);
        },
        'mouseleave': function() {
            Editor.stockLayer(null);
            Editor.touchConnector(null);
        },
    });
};
/**
 * 座標を返す
 * @returns {{x: (number|*), y: (*|number)}}
 */
Connector.prototype.getPosition = function() {
    const position = this._layer.getPosition();
    const circle = this._mainImage;
    return {x: position.x + Number(circle.attr('cx')), y: position.y + Number(circle.attr('cy'))};
};
/**
 * タイプを返す
 * @returns {null|*}
 */
Connector.prototype.getType = function() {
    return this._type;
};
/**
 * 削除
 */
Connector.prototype.remove = function() {
    SvgArea.hideAndRemove(this._mainImage);
    SvgArea.hideAndRemove(this._label);

    // リンク削除
    this.links().forEach((link) => link.remove());
};

Connector.prototype.name = function() {
    return this._name;
};

Connector.prototype.layer = function() {
    return this._layer;
};

/**
 * 新しくリンクを作成可能か否かを返す
 * @return true:接続可 false:接続不可
 */
Connector.prototype.canConnect = function() {
    const limit = this.linkingLimit();
    return limit === -1 || (limit === 1 && this.links().length === 0);
};
/**
 * デフォルトピンであるか否かを返す
 * @return true:デフォルトピン false:サイドコネクタ
 */
Connector.prototype.isDefault = function() {
    return this._name === '';
};

(() => {
    const COLOR_FOCUSED = Definitions.EDIT.LINK.FOCUSED.STROKE_COLOR;
    const COLOR_DEFAULT = Definitions.EDIT.LAYER.CONNECTOR.STROKE_COLOR;

    /**
     * 選択状態を更新する
     *
     * @param {Boolean} setOrNot true: 選択状態にする, false: 選択状態を解除する
     */
    Connector.prototype.select = function(setOrNot) {
        if (this.isDefault()) {
            this._mainImage.attr('fill', setOrNot ? COLOR_FOCUSED : COLOR_DEFAULT);
        }
    };
})();

/**
 * コネクタをつなげる
 * @returns リンクが確立できた場合 Link オブジェクト。条件に適合せず確立できない場合 null。
 */
Connector.prototype.connect = function() {
    let originConnector = this;
    let targetConnector = Editor.touchingConnector();
    if (!targetConnector) {
        const passingLayer = Editor.stockedLayer();
        if (passingLayer) {
            // NOTE レイヤー通過中に、リンクを動かすもとになったドラッグ操作から、入力ピンか出力ピンか
            // あるいは入力サイドコネクターかを判定して connectorSnapTo を決めておくほうがよい。
            if (originConnector.getType() === Definitions.EDIT.CONNECTOR.IN) {
                targetConnector = passingLayer.getOutConnector();
            } else {
                targetConnector = passingLayer.getInConnector();
            }
        }
    }
    if (!targetConnector) {
        // リンク先が決まらなければ接続できない。
        return null;
    }
    if (targetConnector._layer === originConnector._layer) {
        // 同じレイヤー内のコネクターは接続できない。
        return null;
    }
    if (targetConnector.getType() === originConnector.getType()) {
        // 入力同士・出力同士を結ばせない
        return null;
    }
    if (targetConnector.connectedWith(originConnector)) {
        // すでにリンクが存在していたら接続させない。
        return null;
    }
    if (targetConnector.getType() === Definitions.EDIT.CONNECTOR.OUT) {
        // 接続先コネクターが入力側になるよう入れ替え。
        let swapping = originConnector;
        originConnector = targetConnector;
        targetConnector = swapping;
    }
    if (!targetConnector.isDefault() && targetConnector.links().length > 0) {
        // NOTE プロトタイプ v2.3 相当では、サイドコネクターはリンクオリジンにならないため
        // ターゲットコネクターのチェックだけで済ませる。
        // サイドコネクターはリンクをひとつしか受け入れられない。
        return null;
    }

    // 接続上限数 1 に達している場合、これを取り除いてリンク可能にする
    const removedLinks = [];
    if (!originConnector.canConnect()) { // Day 1 時点で接続不能になるのは、上限 1 でリンク確立したコネクターのみ
        let links = originConnector.links();
        removedLinks.push(links[0].serialize());
    }
    if (!targetConnector.canConnect()) {
        let links = targetConnector.links();
        removedLinks.push(links[0].serialize());
    }
    // 既存リンクを削除してからリンクを作成する
    removedLinks.forEach((link) => Link.findObjectBySerialized(link).remove());
    const link = originConnector.linkTo(targetConnector).serialize();
    window.nnc.components.Editor.history.execute({
        type: 'push',
        argument: {
            exec: () => {
                // 旧リンクを取り除いて新規リンクを確立する
                removedLinks.forEach((link) => Link.findObjectBySerialized(link).remove());
                Link.deserialize(link);
            },
            undo: () => {
                // 新規リンクを削除して旧リンクを復旧する
                Link.findObjectBySerialized(link).remove();
                removedLinks.forEach(Link.deserialize);
            },
            name: () => 'Edit link',
        },
    });
};

export default Connector;
