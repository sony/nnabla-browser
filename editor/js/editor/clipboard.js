import Graph from './../currentGraph';
import Definitions from './../misc/Definitions';
import Layer from './SDNLayer';
import Link from './SDNLink';

/**
 * コピー,貼付け,切取り処理
 * @type {Child|*}
 */
const clipboard = (() => {
    const _sDeepNetworkFragment = 'sDeepNetworkFragment:v1';
    let _copiedData;

    /** Make test function whether link's source and destination are contained in layers. */
    const linkedWithin = (layers) => (link) => {
        const source = link.source().layer();
        const destination = link.destination().layer();
        return layers.includes(source) && layers.includes(destination);
    };

    const _serialize = function() {
        const layers = Graph.selection.layer.members();
        const links = Graph.links().filter(linkedWithin(layers));
        return _sDeepNetworkFragment + '\n' + JSON.stringify({
            nodes: layers.map((layer) => layer.serialize()),
            links: links.map((link) => link.serialize()),
        }, null, '  ');
    };

    const _deserialize = function(clipped) {
        const splittedData = clipped ? clipped.split('\n') : [undefined];
        if (splittedData[0] === _sDeepNetworkFragment) {
            splittedData.splice(0, 1); // discard first line
            const clipboardData = JSON.parse(splittedData.join('\n'));
            const layers = Graph.layers(); // エディター上の既存の全レイヤー

            // 復元用に現時点での選択状態を記憶する
            const focused = Graph.selection.layer.focused();
            const previouslySelecteds = Graph.selection.layer.apply((l) => l.serialize());
            const previouslyFocused = focused ? focused.serialize() : null;

            // 選択されているレイヤーまたはリンクがある場合は解除する
            Graph.selection.clear();
            // エディター上で最右端のレイヤーの右端座標を算出する
            const xs = layers.map((layer) => layer.getPosition().x);
            const offsetX = Math.max.apply(null, xs.concat(0)) + Definitions.EDIT.LAYER.BOUNDING_BOX.WIDTH;
            // クリップボード上データの最左端レイヤーの左端座標を得る
            const minX = Math.min.apply(null, clipboardData.nodes.map((node) => node.x));
            // エディター上の最右端レイヤーの隣にレイヤーを追加
            const layersInfo = clipboardData.nodes.map((data) => {
                // XXX omit serialization knowledge from here.
                // NOTE new Layer affects nnc.components.Editor's propMap data.
                // Be careful to change code here!
                const _data = Object.assign({}, data, {x: data.x + offsetX - minX});
                const newLayer = new Layer(_data, window.svgArea);
                return {layer: newLayer, name: data.name};
            });

            // リンクを作成する
            const _findNode = (name) => layersInfo.find((info) => info.name === name).layer;
            const copiedLinks = clipboardData.links.map((link) => _findNode(link.from_node).getOutConnector(link.from_name)
                .linkTo(_findNode(link.to_node).getInConnector(link.to_name)).serialize());
                const copiedNodes = layersInfo.map((info) => info.layer.serialize());

            // フォーカス状態の変更
            // 最後に作成したレイヤーを主選択状態にする
            const _setFocusToCopied = (layers) => {
                Graph.selection.change(layers);
                if (layers.length) {
                    const layer = layers[layers.length - 1];
                    Graph.selection.layer.focus(layer);
                }
            };
            Graph.selection.layer.clear();
            _setFocusToCopied(layersInfo.map((info) => info.layer));
            window.nnc.components.Editor.history.execute({
                type: 'push',
                argument: {
                    name: () => 'Paste',
                    exec: () => {
                        Graph.selection.layer.clear();

                        const copiedLayers = copiedNodes.map(Layer.deserialize);
                        copiedLinks.forEach(Link.deserialize);

                        _setFocusToCopied(copiedLayers);
                    },
                    undo: () => {
                        Graph.selection.layer.clear();
                        copiedNodes.map(Layer.findObjectBySerialized).forEach((layer) => layer.remove());
                        // 選択状態の復元
                        previouslySelecteds.map(Layer.findObjectBySerialized).forEach((layer) => {
                            Graph.selection.layer.insert(layer);
                        });
                        if (previouslyFocused) {
                            const layer = Layer.findObjectBySerialized(previouslyFocused);
                            Graph.selection.layer.focus(layer);
                        }
                    },
                },
            });
            return true;
        } else {
            return false;
        }
    };

    return {
        /**
         * コピー処理（マウス操作）
         */
        copy: () => document.execCommand('copy'),
        _copy: function(e) {
            e.preventDefault();
            const serializedData = _serialize();
            e.clipboardData.setData('text', serializedData);
            _copiedData = serializedData;
        },
        /**
         * ペースト処理（マウス操作）
         */
        paste: function(osData) {
            if (![osData, _copiedData].find((data) => _deserialize(data), this)) {
                console.warn('Nothing is copied. Please copy layers and try again.');
            }
        },
        /**
         * カット処理（マウス操作）
         */
        cut: () => document.execCommand('cut'),
    };
})();

window.clipboard = clipboard;

export default clipboard;
