import SDUUtils from './editor/SDUUtils';
import Layer from './editor/SDNLayer';
import Link from './editor/SDNLink';

const Graph = (() => {
    const layers = new SDUUtils.Set();
    const links = new SDUUtils.Set();

    const selection = (() => {
        const Selection = function (layers) {
            let _focused = null;

            this.insert = (layer) => layer.select(true);
            this.focus = function (layer) {
                if (!layer.selected()) {
                    this.clear();
                }
                if (_focused && _focused !== layer) {
                    _focused.flagAsMain(false);
                }
                _focused = layer;
                Array.from(arguments).forEach((layer) => layer.select(true));
                layer.flagAsMain(true);
            };
            this.focused = () => _focused;
            this.remove = function (layer) {
                if (_focused === layer) {
                    layer.flagAsMain(false);
                    _focused = null;
                }
                layer.select(false);
            };
            this.clear = () => layers.apply((layer) => this.remove(layer));
            this.members = () => layers.members().filter((layer) => layer.selected());
            this.apply = (f) => this.members().map(f);
        };

        const _layer = new Selection(layers);
        const _link = (() => {
            let _selectedLink;
            return {
                focus: (link) => {
                    _selectedLink = link;
                    _selectedLink.select(true);
                },
                focused: () => _selectedLink,
                remove: (link) => {
                    if (link === _selectedLink && _selectedLink) {
                        _selectedLink.select(false);
                        _selectedLink = null;
                    }
                },
                clear: function () {
                    this.remove(_selectedLink);
                },
            };
        })();

        return {
            layer: _layer,
            link: _link,
            change: (layers) => {
                const focused = _layer.focused();
                _link.clear();
                _layer.clear();
                (layers || []).forEach((elem) => _layer.insert(elem));
                if ((layers || []).includes(focused)) {
                    _layer.focus(focused);
                }
            },
            append: (layers) => {
                const focused = _layer.focused();
                layers.filter((elem) => elem !== focused).forEach((elem) => _layer.insert(elem));
            },
            // 与えられた layers を全体として、この中で現在選択されていないレイヤーを選択する
            invert: function (layers) {
                const copied = layers.concat();
                _layer.members().forEach((selected) => {
                    const index = copied.findIndex((layer) => layer === selected);
                    if (index !== -1) {
                        copied.splice(index, 1);
                    }
                });
                this.change(copied);
            },
            // 選択を解除する
            clear: function () {
                _layer.clear();
                _link.clear();
            },
            isEmpty: function () {
                return _layer.members().length === 0 && !_link.focused();
            },
            /** 選択されているレイヤーとその間に張られたリンク、あるいは選択されているリンクを列挙する。
             *
             * 複数のレイヤーを選択した場合、表示上はその間に張られたリンクは選択されていないように見えることに注意。
             */
            members: function () {
                // 選択されているレイヤーを列挙
                const layers = _layer.members();
                // 選択されているレイヤー間に張られたリンクを重複なく列挙するために Set を利用する
                const links = new SDUUtils.Set();
                // 選択されているリンクを列挙
                if (_link.focused()) {
                    links.insert(_link.focused());
                }
                // 選択されているレイヤーに接続されているリンクを列挙
                layers.map((layer) => layer.allLinks()).reduce((a, b) => a.concat(b), []).forEach((link) => links.insert(link));
                return {nodes: layers, links: links.members()};
            },
        };
    })();

    return {
        /** レイヤーを取得する
         *
         * @param {Function} f すべてのレイヤーに関数 f を適用して結果を返す（オプション）
         * @return {[Layer]} グラフ上すべての Layer オブジェクト。引数 f を指定した場合 {[f(Layer)]}
         */
        layers: (f) => layers.apply(f || ((x) => x)),

        /** @param {Layer} layer 管理対象に追加するレイヤー */
        insertLayer: (layer) => {
            layers.insert(layer);
            window.nnc.components.Editor.onAddedLayer(layer);
        },

        /** @param {Layer} layer 管理対象から外すレイヤー */
        removeLayer: (layer) => {
            selection.layer.remove(layer);
            layers.remove(layer);
        },

        /** リンクを取得する
         *
         * @param {Function} f すべてのリンクに関数 f を適用して結果を返す（オプション）
         * @return {[Link]} グラフ上のすべての Link オブジェクト。引数 f を指定した場合 {[f(Link)]}
         */
        links: (f) => links.apply(f || ((x) => x)),

        /** @param {Link} link 管理対象に追加するレイヤー */
        insertLink: (link) => links.insert(link),

        /** @param {Link} link 管理対象から外すリンク */
        removeLink: (link) => {
            selection.link.remove(link);
            links.remove(link);
        },

        selection: selection,

        /** 全選択 */
        selectAll: function () {
            Graph.selection.append(this.layers());
        },

        /** 選択反転 */
        invertSelection: function () {
            Graph.selection.invert(this.layers());
        },

        /** レイヤーまたはリンクの削除 */
        deleteSelection: function (name) {
            const members = this.selection.members();
            // 削除すればレイヤー間に張られたリンクも消えるが Undo でこれらリンクを復元する必要があることに注意。
            const layers = members.nodes.map((layer) => layer.serialize());
            const links = members.links.map((link) => link.serialize());

            window.nnc.components.Editor.history.execute({
                type: 'push-and-execute',
                argument: {
                    exec: () => {
                        links.map(Link.findObjectBySerialized).forEach((link) => link.remove());
                        layers.map(Layer.findObjectBySerialized).forEach((layer) => layer.remove());
                        window.svgArea.requestAdjustSize();
                    },
                    undo: () => {
                        layers.forEach(Layer.deserialize);
                        links.forEach(Link.deserialize);
                        window.svgArea.requestAdjustSize();
                    },
                    name: () => name,
                },
            });
        },

        // remove all layers and links from current graph.
        clear: function () {
            this.layers((layer) => layer.remove());
            this.links((link) => link.remove());
        },

        setDirtyLinksOf: (() => {
            let _timeoutId;
            const _linksToUpdate = new SDUUtils.Set();

            return (layer) => {
                clearTimeout(_timeoutId);
                _timeoutId = setTimeout(() => {
                    _linksToUpdate.apply((link) => link.updateLinkLine());
                    _linksToUpdate.clear();
                }, 0);
                layer.allLinks().forEach((link) => _linksToUpdate.insert(link));
            };
        })(),
    };
})();

window.Graph = Graph;

export default Graph;
