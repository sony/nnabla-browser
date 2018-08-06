import EditorUtils from './../EditorUtils';
import Connector from './SDNConnector';
import Editor from './editor';
import Graph from './../currentGraph';
import Definitions from './../misc/Definitions';
import Link from './SDNLink';
import SvgArea from './SDNSvgArea';

/**
 * Layer Constructor
 * @param opt 設定用オブジェクト。 {type: [required], name: [optional], properties: [optional],
  *                             x: [optional], y: [optional]}
 * @param backgroud SvgArea オブジェクト。レイヤーを構成する SVG 部品の追加先を管理する。
 */
const Layer = function (opt, background) {
    const type = opt.type;
    const component = EditorUtils.getComponent(type);

    const theOthers = Graph.layers();
    const layerName = Layer.calcDefaultUniqueName(opt.name || null, type, theOthers);
    const x = opt.x || 0;
    const y = opt.y || 0;

    const doAutoLink = opt.isNew || false;

    const _properties = component.property;
    const allProperties = () => {
        let properties = {};
        _properties.forEach((property) => properties[property.name] = property.value);
        return properties;
    };
    const editableProperties = () => {
        let properties = {};
        _properties.forEach((property) => {
            if (property.editable) {
                properties[property.name] = property.value;
            }
        });
        return properties;
    };

    this._allProperties = allProperties;

    this._grabbedPoint = null;
    this._startTouchPoint = null;
    this._startPosition = null;

    this._component = component;
    this._background = background;

    this._properties = allProperties();
    this._userInputProperties = opt.properties || editableProperties();
    delete this._userInputProperties.Name; // ommit Name from user input property; for it managed in _label.

    const self = this;

    const color = component.color.substring(2, 8);

    const selection = Graph.selection;

    let _linkFromFocusedIf = (predicate) => undefined;
    const _nullConnector = {canConnect: () => false};

    let _layerGroupNode = background.layerGroup().node();
    let _dragEventHandlerAppender = d3.drag()
        .on('start', function () {
            let mouse = d3.mouse(_layerGroupNode);
            let dragContext = _createDragContext({x: mouse[0], y: mouse[1]});
            console.log(dragContext);
            background.setDragContext(dragContext);
        }); // drag と dragend の処理は svgArea に移譲

    const _createDragContext = (posDragStart) => {
        // mousedown に先行して dragstart が呼ばれることを利用して、
        // 選択レイヤーが変わる前に現時点での主・副選択状態を記憶する
        const focused = selection.layer.focused();
        const _selecteds = selection.layer.apply((l) => l.serialize()); // undo/redo 用のため予めシリアライズする

        if (focused !== self) {
            const out = (focused || {getOutConnector: () => null}).getOutConnector() || _nullConnector;
            const in_ = self.getInConnector() || _nullConnector;
            if (out.canConnect() && in_.canConnect() && !out.connectedWith(in_)) {
                _linkFromFocusedIf = (predicate) => {
                    if (predicate()) {
                        // make link and serialize it for undo/redo
                        const _link = out.linkTo(in_).serialize();

                        // serialize to live undo/redo
                        const _focused = focused.serialize();
                        const _self = self.serialize();

                        // push command for undo/redo
                        window.nnc.components.Editor.history.execute({
                            type: 'push',
                            argument: {
                                name: () => 'Edit link',
                                undo: () => { // undo
                                    Link.findObjectBySerialized(_link).remove();
                                    Graph.selection.layer.remove(Layer.findObjectBySerialized(_self));
                                    _selecteds.map(Layer.findObjectBySerialized).filter((x) => x).forEach((l) => Graph.selection.layer.insert(l));
                                    Graph.selection.layer.focus(Layer.findObjectBySerialized(_focused));
                                },
                                exec: () => { // redo
                                    Graph.selection.layer.focus(Layer.findObjectBySerialized(_self));
                                    Link.deserialize(_link);
                                },
                            },
                        });
                    }
                };
            }
        }

        // 以下、レイヤー選択状態の切り替え。
        // 本来 mousedown ですべきだが、ドラッグ操作で選択中レイヤーをすべてキャプチャーする必要があること、
        // d3 dragstart は mousedown に先行して呼ばれてしまうことからここで実行する。
        const alreadySelected = selection.layer.members().some((focused) => focused === self); // 選択済みのレイヤー
        const pressedCtrl = d3.event.sourceEvent.ctrlKey; // ctrlキーイベント
        if (alreadySelected && pressedCtrl) {
            Graph.selection.layer.remove(self);
        } else {
            if (!alreadySelected && (!pressedCtrl || selection.link.focused())) {
                Graph.selection.clear();
            }
            Graph.selection.layer.insert(self); // まずメンバーに入れる
            Graph.selection.layer.focus(self);
        }

        const items = selection.layer.apply((layer) => {
            const position = layer.getPosition();
            return {
                target: layer,
                position: position, // memory all selected layer positions for moveLayers
                frame: background.createLayerDestinationFrame(position),
            };
        });
        const layers = items.map((item) => item.target);
        return {
            move: (cursor) => {
                background.showGrid();

                items.forEach((item) => {
                    const layer = item.target;

                    // translate layer positions
                    layer.setPosition({
                        x: item.position.x + cursor.x - posDragStart.x,
                        y: item.position.y + cursor.y - posDragStart.y,
                    });

                    item.frame.move(background.calcLayerDropPosition(layer, layers));
                });
                background.trackCursorMovement(cursor);
            },
            destroy: () => {
                // shift キー押下による dragstart 時の主選択レイヤーとの接続処理呼び出し。
                // 理想的には mousedown/mouseup で処理すべきだがドラッグイベントで処理している。
                // つまり、マウスをすばやく動かされることでレイヤー外で mouseup が発生し、これを
                // 受信できず mousedown 時に生成したオブジェクトを片付けそこねることへの対策。
                _linkFromFocusedIf(() => d3.event.sourceEvent.shiftKey);
                _linkFromFocusedIf = (predicate) => undefined; // restore to default handler

                let recipes = items.map((item) => ({
                    name: item.target.name(),
                    from: item.position,
                    to: item.frame.getPosition(),
                }));
                let dirty = recipes.some((recipe) => recipe.to.x !== recipe.from.x || recipe.to.y !== recipe.from.y);
                if (dirty) {
                    window.nnc.components.Editor.history.execute({
                        type: 'push-and-execute',
                        argument: {
                            exec: function () {
                                let allLayers = Graph.layers();
                                let validItems = recipes.map((recipe) => ({
                                    target: allLayers.find((layer) => layer.name() == recipe.name),
                                    recipe: recipe,
                                })).filter((item) => !!item.target);
                                validItems.forEach((item) => {
                                    item.target.setPosition(item.recipe.to);
                                    item.recipe.links = item.target.autoLink();
                                });
                                background.requestAdjustSize(validItems.map((item) => item.target));
                            },
                            undo: function () {
                                let allLayers = Graph.layers();
                                let validItems = recipes.concat().reverse().map((recipe) => ({
                                    target: allLayers.find((layer) => layer.name() == recipe.name),
                                    recipe: recipe,
                                })).filter((item) => !!item.target);
                                validItems.forEach((item) => {
                                    item.recipe.links.undo();
                                    delete item.recipe.links;
                                    item.target.setPosition(item.recipe.from);
                                });
                                background.requestAdjustSize(validItems.map((item) => item.target));
                            },
                            name: () => 'Drag Layer',
                        },
                    });
                } else {
                    // すべての位置が変わらない場合コマンドでは実行せず、位置だけもとに戻す
                    items.forEach((item) => item.target.setPosition(item.position));
                    background.requestAdjustSize(layers);
                }

                items.forEach((item) => {
                    item.frame.destroy();
                });
                background.hideGrid();
            },
        };
    };



    let dlayer = Definitions.EDIT.LAYER;
    this._selectFrame = background.focusGroup().append('rect')
        .attr('x', x) // mainImageとの相対座標
        .attr('y', y) // mainImageとの相対座標
        .attr('width', dlayer.FRAME.WIDTH)
        .attr('height', dlayer.FRAME.HEIGHT)
        .attr('pointer-events', 'none')
        .style('fill', dlayer.FRAME.FILL_COLOR)
        .style('stroke', dlayer.FRAME.DEFAULT.STROKE_COLOR)
        .style('stroke-width', dlayer.FRAME.STROKE_WIDTH)
        .style('filter', dlayer.FRAME.DEFAULT.FILTER_URL);

    this._group = background.layerGroup().append('g').attr('class', 'layer-component');

    this._mainImage = this._group.append('rect')
        .attr('width', dlayer.RECT_WIDTH)
        .attr('height', dlayer.RECT_HEIGHT)
        .style('fill', '#' + color)
        .style('stroke', '#' + color)
        .on('mouseenter', function () {
            Editor.stockLayer(self);
        })
        .on('mouseleave', function () {
            Editor.stockLayer(null);
        })
        .call(_dragEventHandlerAppender);

    this._warnImage = this._group.append('image')
        .attr('xlink:href', dlayer.WARN.IMAGE_SOURCE)
        .attr('x', dlayer.WARN.OFFSET_X)
        .attr('y', dlayer.WARN.OFFSET_Y)
        .attr('width', dlayer.WARN.WIDTH)
        .attr('height', dlayer.WARN.HEIGHT)
        .style('display', 'none');

    let CONNECTOR_ACCEPTS = Definitions.EDIT.CONNECTOR.ACCEPTS;

    // サイドコネクター（コンポーネント名に被らないように最初にappendする）
    let sideConnectorPosition = Layer._sideConnectorPosition(component.inputSideConnector.length);
    this._sideConnector = component.inputSideConnector.map((connector) => new Connector(self,
        this._group,
        _linksLayer,
        _dragDelegate,
        Definitions.EDIT.CONNECTOR.IN,
        CONNECTOR_ACCEPTS.SINGLE,
        connector.name,
        connector.shortName || connector.name.substring(0, 1),
        dlayer.CONNECTOR.SIDE.FILL_COLOR,
        sideConnectorPosition.next()
    ));

    let _textGroup = this._group.append('g')
        .attr('clip-path', 'url(#' + dlayer.CLIP_PATH.ID + ')')
        .attr('transform', 'translate(' + dlayer.CLIP_PATH.OFFSET_X + ',' + Definitions.EDIT.LAYER.CLIP_PATH.OFFSET_Y + ')');

    // コンポーネント名
    this._label = _textGroup.append('text')
        .attr('x', dlayer.NAME_LABEL.OFFSET_X)
        .attr('y', dlayer.NAME_LABEL.OFFSET_Y)
        .attr('pointer-events', 'none')
        .attr('fill', dlayer.NAME_LABEL.FONTCOLOR)
        .attr('font-size', dlayer.NAME_LABEL.FONTSIZE)
        .text(layerName);

    // コンポーネント名の頭文字
    this._labelFirst = this._group.append('text')
        .attr('x', dlayer.DROPCAP_CHAR.OFFSET_X)
        .attr('y', dlayer.DROPCAP_CHAR.OFFSET_Y)
        .attr('fill', dlayer.DROPCAP_CHAR.FONTCOLOR)
        .attr('font-size', dlayer.DROPCAP_CHAR.FONTSIZE)
        .attr('pointer-events', 'none')
        .style('text-anchor', dlayer.DROPCAP_CHAR.TEXT_ANCHOR)
        .text(type.substring(0, 1));

    let _accepts = (num) => {
        switch (num) {
            case 0:
                return CONNECTOR_ACCEPTS.NONE;
            case 1:
                return CONNECTOR_ACCEPTS.SINGLE;
            default:
            case -1:
                return CONNECTOR_ACCEPTS.MULTIPLE;
        }
    };
    var _dragDelegate = {
        set: (context) => background.setDragContext(context),
    };
    var _linksLayer = background.linkGroup();
    if (component.input) {
        this._inConnector = new Connector(this,
            this._group,
            _linksLayer,
            _dragDelegate,
            Definitions.EDIT.CONNECTOR.IN,
            _accepts(component.input),
            '', // name
            '', // short name
            dlayer.CONNECTOR.STROKE_COLOR,
            {x: dlayer.CONNECTOR.OFFSET_X, y: 0} // mainImageとの相対座標
        );
    }
    if (component.output) {
        this._outConnector = new Connector(this,
            this._group,
            _linksLayer,
            _dragDelegate,
            Definitions.EDIT.CONNECTOR.OUT,
            _accepts(component.output),
            '', // name
            '', // short name
            dlayer.CONNECTOR.STROKE_COLOR,
            {x: dlayer.CONNECTOR.OFFSET_X, y: dlayer.CONNECTOR.OUTPIN_OFFSET_Y} // mainImageとの相対座標
        );
    }

    this._importantPropertyLabel = null;
    this._statisticsLabel = null;
    this._statisticsBar = null;

    let _label;
    switch (this.type()) {
        default:
            _label = _textGroup.append('text')
                .attr('x', dlayer.PROPERTY_LABEL.OFFSET_X)
                .attr('y', dlayer.PROPERTY_LABEL.OFFSET_Y)
                .attr('opacity', dlayer.PROPERTY_LABEL.OPACITY)
                .attr('pointer-events', 'none')
                .style('fill', dlayer.PROPERTY_LABEL.FONTCOLOR)
                .style('font-size', dlayer.PROPERTY_LABEL.FONTSIZE)
                .style('font-weight', dlayer.PROPERTY_LABEL.FONTWEIGHT);
            this.displayComment = () => undefined;
            this.displayImportantProperty = () => {
                _label.text(component.property.filter((prop) => prop.important).map((property) => {
                    let name = property.name;
                    return (property.shortName || name) + ' : ' + this._properties[name];
                }).join(', '));
            };
            this._importantPropertyLabel = _label;
            this.displayImportantProperty();
            break;
        case 'Comment':
            _label = this._group.append('foreignObject')
                .attr('width', dlayer.RECT_WIDTH)
                .attr('height', dlayer.RECT_HEIGHT)
                .append('xhtml:div')
                .style('font-size', dlayer.COMMENT.FONT_SIZE)
                .style('width', '100%')
                .style('height', '100%')
                .style('word-wrap', 'break-word')
                .style('overflow', 'hidden')
                .style('cursor', 'default')
                .call(_dragEventHandlerAppender);
            this.displayComment = () => _label.text(this._userInputProperties.Comment || '');
            this.displayImportantProperty = () => undefined;
            this._mainImage.transition().style('fill', dlayer.COMMENT.FILL_COLOR);
            this._label.transition().style('display', 'none');
            this._labelFirst.transition().style('display', 'none');
            this._importantPropertyLabel = _label;
            this.displayComment();
            break;
    }

    this._statisticsBar = this._group.append('rect')
        .attr('x', dlayer.STATISTICS.BAR.OFFSET_X)
        .attr('y', dlayer.STATISTICS.BAR.OFFSET_Y)
        .attr('width', dlayer.STATISTICS.BAR.WIDTH)
        .attr('height', dlayer.STATISTICS.BAR.HEIGHT)
        .attr('pointer-events', 'none')
        .style('fill', dlayer.STATISTICS.BAR.FILL_COLOR);
    this._statisticsLabel = this._group.append('text')
        .attr('x', dlayer.STATISTICS.LABEL.OFFSET_X)
        .attr('y', dlayer.STATISTICS.LABEL.OFFSET_Y)
        .attr('fill', dlayer.STATISTICS.LABEL.FONTCOLOR)
        .attr('font-size', dlayer.STATISTICS.LABEL.FONTSIZE)
        .attr('pointer-events', 'none')
        .text('');

    this._group.style('display', null);
    this.setPosition({x: x, y: y});

    Graph.insertLayer(this);

    if (doAutoLink){
        this.autoLink();
    }
};

/**
 * InputSideConnector の位置を取得するオブジェクトを生成する。
 * @param length 生成する位置の数。
 */
Layer._sideConnectorPosition = (() => {
    let MARGIN_X = Definitions.EDIT.LAYER.CONNECTOR.SIDE.MARGIN_X;
    let MARGIN_Y = Definitions.EDIT.LAYER.CONNECTOR.SIDE.MARGIN_Y;
    let START_OFFSET_X = Definitions.EDIT.LAYER.CONNECTOR.SIDE.START_OFFSET_X;
    let START_OFFSET_Y = Definitions.EDIT.LAYER.CONNECTOR.SIDE.START_OFFSET_Y;

    let maxConnectors = Math.max.apply(null, nNablaCore.layers.components.map((comp) => comp.inputSideConnector.length));
    let x = (() => {
        let x = START_OFFSET_X;
        let _ = x - MARGIN_X;
        return () => ([x, _] = [_, x])[1];
    })();
    let y = (() => {
        let y = START_OFFSET_Y;
        let _ = y - MARGIN_Y;
        return () => ([y, _] = [_, y])[1];
    })();
    let positions = Array(maxConnectors).fill(null).map((_) => {
        return {x: x(), y: y()};
    });

    return (length) => {
        let ps = positions.slice(0, length).reverse();
        return {
            next: (() => {
                let i = 0;
                return () => ps[i++];
            })()
        };
    };
})();
// 入力コネクタを返す
Layer.prototype.getInConnector = function (name) {
    if (name) {
        return this._sideConnector.find((connector) => connector.name() === name);
    } else {
        return this._inConnector;
    }
};
// 出力コネクタを返す
Layer.prototype.getOutConnector = function (name) {
    if (name) {
        return null; // Day 1 時点で OutputSideConnector は存在しない
    } else {
        return this._outConnector;
    }
};
(() => {
    let _valid = (x) => x;

    // サイドコネクタを含む全ての入力コネクタを返す
    Layer.prototype.getInConnectors = function () {
        return this._sideConnector.concat(this._inConnector).filter(_valid);
    };

    // all link objects from connectors those lives in this layer.
    Layer.prototype.allLinks = function () {
        let allConnectors = this._sideConnector.concat(this._inConnector, this._outConnector).filter(_valid);
        return allConnectors.map((c) => c.links()).reduce((a, b) => a.concat(b), []);
    };
})();
// 名前の設定と返却を行う
Layer.prototype.name = function (name) {
    let prev = this._label.text();
    if (name) this._label.text(name);
    return prev;
};
// 座標を返す
Layer.prototype.getPosition = function () {
    let translate = this._group.attr('transform') || 'translate(0, 0)';
    let match = translate.match(/translate\((.+),(.+)\)/);
    return match ? {x: parseInt(match[1]), y: parseInt(match[2])} : {x: 0, y: 0};
};
// 座標を設定する
Layer.prototype.setPosition = function (position) {
    let x = position.x;
    let y = position.y;
    this._group.attr('transform', 'translate(' + x + ',' + y + ')');
    this._selectFrame.attr('x', x).attr('y', y);
    Graph.setDirtyLinksOf(this);
};
Layer.prototype.frameSize = (() => {
    let size = {
        width: Definitions.EDIT.LAYER.FRAME.WIDTH,
        height: Definitions.EDIT.LAYER.FRAME.HEIGHT,
    };
    return function () {
        return size;
    };
})();
// Typeを返す
Layer.prototype.type = function () {
    return this._component.name;
};
// Component を返す
Layer.prototype.component = function () {
    return this._component;
};
// Propertiesを設定する
Layer.prototype.setProperties = function (properties) {
    Object.assign(this._properties, properties);
};
// return property value identified by parameter 'name'.
Layer.prototype.getProperty = function (name) {
    return this._properties[name];
};
// UserInputPropertiesを返す
Layer.prototype.getUserInputProperty = function (name) {
    if (name === 'Name') {
        return this.name();
    } else {
        return this._userInputProperties[name];
    }
};
// UserInputPropertiesを設定する
Layer.prototype.setUserInputProperty = function (name, value) {
    switch (name) {
        case 'Name':
            this.calcAndSetUniqueName(value);
            break;
        default:
            this._userInputProperties[name] = value;
            this.displayComment();
            window.nnc.components.Editor.onChangedProperty(this.name(), name, value);
            break;
    }
};

(() => {
    const STROKE_DEFAULT = Definitions.EDIT.LAYER.FRAME.DEFAULT.STROKE_COLOR;
    const STROKE_FOCUSED = Definitions.EDIT.LAYER.FRAME.FOCUSED.STROKE_COLOR;
    const FILTER_DEFAULT = Definitions.EDIT.LAYER.FRAME.DEFAULT.FILTER_URL;
    const FILTER_FOCUSED = Definitions.EDIT.LAYER.FRAME.FOCUSED.FILTER_URL;

    /**
     * 選択状態を更新する
     *
     * @param {Boolean} setOrNot true: 選択状態にする, false: 選択状態を解除する
     */
    Layer.prototype.select = function (setOrNot) {
        this._selectFrame.style('stroke', setOrNot ? STROKE_FOCUSED : STROKE_DEFAULT);
        window.nnc.components.Editor.onChangedSelection(Graph.selection.layer);
    };

    /**
     * 主選択状態を更新する
     *
     * @param {Boolean} setOrNot true: 主選択状態にする, false: 主選択状態を解除する
     */
    Layer.prototype.flagAsMain = function (setOrNot) {
        this._selectFrame.style('filter', setOrNot ? FILTER_FOCUSED : FILTER_DEFAULT);
        window.nnc.components.Editor.onChangedSelection(Graph.selection.layer);
    };

    /**
     * 選択状態にあるかテストする
     *
     * @return {Boolean} 選択状態なら true、そうでなければ false
     */
    Layer.prototype.selected = function () {
        return this._selectFrame.style('stroke') === STROKE_FOCUSED;
    };
})();

// 削除する
Layer.prototype.remove = function () {
    window.nnc.components.Editor.onDeletedLayer(this.name());

    // viewの削除
    SvgArea.hideAndRemove(this._mainImage);
    SvgArea.hideAndRemove(this._warnImage);
    SvgArea.hideAndRemove(this._selectFrame);
    SvgArea.hideAndRemove(this._label);
    SvgArea.hideAndRemove(this._labelFirst);
    [].concat(this._inConnector, this._outConnector, this._sideConnector)
        .filter((x) => x).forEach((connector) => connector.remove());
    SvgArea.hideAndRemove(this._importantPropertyLabel);
    SvgArea.hideAndRemove(this._statisticsLabel);
    SvgArea.hideAndRemove(this._statisticsBar);
    SvgArea.hideAndRemove(this._group);

    // 管理対象から削除
    Graph.removeLayer(this);

    // 不要になった参照を削除する
    delete this._grabbedPoint;
    delete this._startTouchPoint;
    delete this._startPosition;
    delete this._selected;
    delete this._group;
    delete this._mainImage;
    delete this._warnImage;
    delete this._selectFrame;
    delete this._label;
    delete this._labelFirst;
    delete this._inConnector;
    delete this._sideConnector;
    delete this._outConnector;
    delete this._importantPropertyLabel;
    delete this._statisticsLabel;
    delete this._statisticsBar;
    delete this._gridPosition;
};
// 隣接する上のレイヤーとの自動接続
Layer.prototype.autoLink = (() => {
    let LAYER_HEIGHT = Definitions.EDIT.LAYER.RECT_HEIGHT;
    let NullLayer = {getInConnector: () => null, getOutConnector: () => null};
    let _deleteLinkBeforeExceedsLimit = (linkTarget) => {
        let links = linkTarget.links();
        if (links.length === 1 && linkTarget.linkingLimit() === 1) {
            const target = links[0];
            const serialized = target.serialize();
            target.remove();
            return {
                destroy: () => Link.findObjectBySerialized(serialized).remove(),
                repair: () => Link.deserialize(serialized),
            };
        } else {
            return {destroy: () => undefined, repair: () => undefined}; // nothing to do on Undo
        }
    };
    return function () {
        let srcLink;
        let dstLink;
        let linkTarget;
        let linkOrigin;
        let target = this.getPosition();
        const deletedLinks = new Array(4);
        let layers = Graph.layers();
        if ((linkOrigin = this.getInConnector())) {
            let onSourcePosition = (layer) => {
                let position = layer.getPosition();
                return position.x === target.x && position.y + LAYER_HEIGHT === target.y;
            };
            linkTarget = (layers.find(onSourcePosition) || NullLayer).getOutConnector();
            if (!linkTarget || linkTarget.links().find((l) => l.destination() === linkOrigin)) {
                srcLink = null;
            } else {
                deletedLinks[0] = _deleteLinkBeforeExceedsLimit(linkOrigin);
                deletedLinks[1] = _deleteLinkBeforeExceedsLimit(linkTarget);
                srcLink = linkTarget.linkTo(linkOrigin).serialize();
            }
        }
        if ((linkOrigin = this.getOutConnector())) {
            let onDestinationPosition = (layer) => {
                let position = layer.getPosition();
                return position.x === target.x && position.y - LAYER_HEIGHT === target.y;
            };
            linkTarget = (layers.find(onDestinationPosition) || NullLayer).getInConnector();
            if (!linkTarget || linkTarget.links().find((l) => l.source() === linkOrigin)) {
                dstLink = null;
            } else {
                deletedLinks[2] = _deleteLinkBeforeExceedsLimit(linkOrigin);
                deletedLinks[3] = _deleteLinkBeforeExceedsLimit(linkTarget);
                dstLink = linkOrigin.linkTo(linkTarget).serialize();
            }
        }
        return {
            redo: () => {
                deletedLinks.forEach((l) => l.destroy());
                if (srcLink) Link.deserialize(srcLink);
                if (dstLink) Link.deserialize(dstLink);
            },
            undo: () => {
                if (srcLink) Link.findObjectBySerialized(srcLink).remove();
                if (dstLink) Link.findObjectBySerialized(dstLink).remove();
                deletedLinks.forEach((l) => l.repair());
            },
        };
    };
})();
// 警告マークを表示するか設定する
Layer.prototype.setErrorProperties = function (errorList) {
    let displayStyle;
    if (errorList && errorList.length) {
        displayStyle = null; // show icon.
        this._errorProperties = errorList;
    } else {
        displayStyle = 'none'; // hide icon.
        delete this._errorProperties;
    }
    this._warnImage.style('display', displayStyle);
};
// Propertyの値を変更する
Layer.prototype.changePropertyValue = function (name, value) {
    if (name === 'Name') {
        this.calcAndSetUniqueName(Layer.stripForbiddenCharactersForName(value));
    } else {
        if (name && name in this._properties) {
            this._userInputProperties[name] = value;
        }
    }
};
// Layerの情報をJson形式で返す
Layer.prototype.serialize = function () {
    let position = this.getPosition();
    let properties = Object.assign({}, this._userInputProperties);
    delete properties.Name;
    return {
        name: this.name(),
        x: position.x,
        y: position.y,
        type: this.type(),
        properties: properties,
    };
};
// restore layer by serialized data.
Layer.deserialize = function (serialized) {
    return new Layer(serialized, window.svgArea);
};
/**
 * find layer by serialized data.
 */
Layer.findObjectBySerialized = (() => {
    let _same = (a, b) => Object.keys(a).every((k) => a[k] === b[k]) && Object.keys(a).length == Object.keys(b).length;

    return (serialized) => {
        let layer = Graph.layers().find((layer) => layer.name() === serialized.name);
        if (layer && _same(layer._userInputProperties, serialized.properties)) {
            return layer;
        } else {
            return null;
        }
    };
})();
Layer.prototype.errors = function () {
    return this._errorProperties || [];
};

// Statisticsを更新する
Layer.prototype.updateStatistics = (() => {
    const STATBAR_WIDTH = Definitions.EDIT.LAYER.STATISTICS.BAR.MAXWIDTH;
    const product = (value) => (value || '0').split(',').map((x) => Number(x) || 0).reduce((a, b) => a * b, 1);
    return function (activeStatistics) {
        const value = this._properties[activeStatistics.name] || '';
        const productValue = product(value);

        if (productValue === 0) {
            this._statisticsBar.transition().style('opacity', 0);
            this._statisticsLabel.transition().style('opacity', 0);
        } else {
            const maxValue = activeStatistics.max || 1;

            this._statisticsLabel.transition().style('opacity', 1);
            this._statisticsLabel.text(value);
            this._statisticsBar.style('opacity', 1);
            this._statisticsBar.transition().duration(500).attr('width', (productValue / maxValue) * STATBAR_WIDTH);
        }
        this.displayImportantProperty();
    };
})();

Layer.uniqueSuffixedName = function (name, layers) {
    let splitted = Layer.splitName(name);
    let numbers = layers.map((layer) => Layer.splitName(layer.name())) // レイヤー名と末尾数値の組に変換
        .filter((pair) => pair.name == splitted.name) // 名前が等しいものを抽出
        .map((pair) => pair.number); // 分離した末尾の数字に変換
    if (numbers.find((n) => n === splitted.number)) {
        numbers.sort((a, b) => a - b); // ソート
        // [0] + [1,...] という配列にする
        numbers.unshift(0);
        // 既存のレイヤーで使われている数字から、（無印を 1 として） 1 以上の使われていない数字を検索
        let newNumber = Layer.findGap(numbers);
        // 使われていない数字が 1 以外なら _N というサフィックスを追加して返却
        return splitted.name + (newNumber === 1 ? '' : '_' + newNumber);
    } else {
        return name; // 重複がないので、もとの名前をそのまま返す
    }
};

Layer.splitName = function (name) {
    let split = function (name) {
        let index = name.lastIndexOf('_');
        if (index >= 0) {
            return {name: name.substring(0, index), suffix: name.substring(index + 1)};
        } else {
            return {name: name, suffix: ''};
        }
    };

    let splitted = split(name);
    let num = Number(splitted.suffix);
    if (num > 0 && num === parseInt(num) && splitted.suffix === String(num)) {
        // 1 以上の整数と解釈できる文字列で、 1.0 など小数点を含まない文字列であれば
        // 末尾の '_' の前を名前、後ろを数値として返す。
        return {name: splitted.name, number: num};
    } else {
        return {name: name, number: 1};
    }
};

Layer.findGap = function (numbers) {
    /* ソート済みの数値配列から、数値が不連続になったインデックスを返す */
    // ソート済み配列を対象にして、インデックスと要素の値が同じなら、
    // そこまでの数字は使われているという事実を使って二分探索する
    let beg = 0;
    let end = numbers.length; // 末尾要素の隣のインデックスを検索範囲とする
    while (beg != end - 1) { // 検索範囲が 1 要素に確定するまでループを回す
        let mid = parseInt((beg + end) / 2);
        if (numbers[mid] == mid) beg = mid; else end = mid;
    }
    return end; // 末尾要素のインデックスの隣が使われていない数字
};

// ユニークになるレイヤー名を返す
Layer.calcDefaultUniqueName = function (originalValue, type, layers) {
    let name = originalValue || type;
    return Layer.uniqueSuffixedName(name, layers);
};

// レイヤー名のエスケープ
Layer.stripForbiddenCharactersForName = function (name) {
    return name.replace(/[^A-Za-z0-9'_#]/g, '').replace(/#/g, '_');
};

// ユニークなレイヤー名を計算してpropertiesにセットする
Layer.prototype.calcAndSetUniqueName = function (name) {
    let others = Graph.layers().filter((layer) => layer != this);
    let uniqueName = Layer.stripForbiddenCharactersForName(Layer.calcDefaultUniqueName(name, this.type(), others));
    this.name(uniqueName);
};

/** returns property list for PropertyPanel */
Layer.prototype.typedProperties = function () {
    return this._component.property.map((original) => {
        return Object.assign({}, original, {value: this.getProperty(original.name)});
    });
};

export default Layer;
