import EditorUtils from './EditorUtils';
import store from "./store";

const EditorWindowSize = {
    /**
     * 初期表示
     * @memberOf nnc.EditorWindowSize
     */
    init: function() {
        this.changeSize();
    },
    /**
     * バインディング
     * @memberOf nnc.EditorWindowSize
     */
    bind: function() {
        const self = this;
        /**
         * Windowの高さ変更時イベント
         */
        $(window).resize(function(e) {
            self.changeSize();
        });
    },
    /**
     * Windowサイズ変更時実行イベント
     * @memberOf nnc.EditorWindowSize
     */
    changeSize: (() => {
        // jQuery セレクターが undefined を返した場合 _NullQueriedDom オブジェクトでガードして width, height ともに 0 とする。
        const _NullQueriedDom = {getBoundingClientRect: () => {
            return {width: 0, height: 0};
        }};
        const boundingWidthOf = (selector) => ($(selector)[0] || _NullQueriedDom).getBoundingClientRect().width;
        const boundingHeightOf = (selector) => ($(selector)[0] || _NullQueriedDom).getBoundingClientRect().height;

        return function() {
            const windowWidth = $(window).outerWidth(true);
            const leftContentWidth = boundingWidthOf('.left-content');
            const rightContentWidth = boundingWidthOf('.right-content');
            if (windowWidth - rightContentWidth < leftContentWidth) {
                $('.left-content').outerWidth(windowWidth - rightContentWidth - 10);
            }
            const contentWidth = windowWidth - leftContentWidth - rightContentWidth;
            $('.center-content').outerWidth(contentWidth);

            const windowHeight = $(window).outerHeight(true);
            const navbarHeight = boundingHeightOf('.editor-navbar');
            const contentHeight = windowHeight - navbarHeight;
            $('.main-content').outerHeight(contentHeight);

            if (store.state.editor.activeTabName === "graph") {
                const graphsTabHeight = boundingHeightOf('.network-tabs');
                const networkActionHeight = boundingHeightOf('.network-action');
                const graphHeight = contentHeight - graphsTabHeight - networkActionHeight;
                $('.network-editor-scroller').height(graphHeight);
            }
        };
    })(),
};

export default EditorWindowSize;
