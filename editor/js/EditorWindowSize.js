import {learningCurveGraph, tradeOffGraph} from './TrainingGraphs';
import EditorUtils from './EditorUtils';

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

            if (EditorUtils.editTabIsActive()) {
                const graphsTabHeight = boundingHeightOf('.network-tabs');
                const networkActionHeight = boundingHeightOf('.network-action');
                const graphHeight = contentHeight - graphsTabHeight - networkActionHeight;
                $('.network-editor-scroller').height(graphHeight);
                if (window.svgArea) window.svgArea.requestAdjustSize();
            }

            if (window.nnc.editor.activeTabName === 'TRAINING' || window.nnc.editor.activeTabName === 'EVALUATION') {
                const logAreaHeight = boundingHeightOf('.log-area');
                const jobMainAreaHeight = contentHeight - 40 - 40 - logAreaHeight;
                $('.job-main-area').outerHeight(jobMainAreaHeight);

                if (window.nnc.editor.activeTabName === 'TRAINING') {
                    const svgWidth = contentWidth - 32;
                    const svgHeight = jobMainAreaHeight - 34 - $('.legend').outerHeight(true);
                    if (results.data.length && results.active > -1) {
                        learningCurveGraph.width = tradeOffGraph.width = svgWidth - learningCurveGraph.margin.LEFT - learningCurveGraph.margin.RIGHT;
                        learningCurveGraph.svgWidth = tradeOffGraph.svgWidth = svgWidth;
                        learningCurveGraph.chartSVGWidth = tradeOffGraph.chartSVGWidth = svgWidth;
                        learningCurveGraph.height = tradeOffGraph.height = svgHeight - learningCurveGraph.margin.TOP - learningCurveGraph.margin.BOTTOM;
                        learningCurveGraph.svgHeight = tradeOffGraph.svgHeight = svgHeight;
                        learningCurveGraph.chartSVGHeight = tradeOffGraph.chartSVGHeight = svgHeight - 80;
                        learningCurveGraph.learningCurve(ResultsUtils.getActiveResult().job_id);
                        tradeOffGraph.tradeOff();
                    }
                }

                if (window.nnc.editor.activeTabName === 'EVALUATION') {
                    $('.pager-content').outerHeight(jobMainAreaHeight); // output_result
                    $('.confusion-matrix-content').outerHeight(jobMainAreaHeight); // confusion_matrix
                }
            }
        };
    })(),
};

export default EditorWindowSize;
