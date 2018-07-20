import {learningCurveGraph, tradeOffGraph} from './../TrainingGraphs';

export default {
    'Editor': {
        percentages: [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500],
        callback: () => window.svgArea.requestAdjustSize(),
    },
    'Learning Curve': {
        percentages: [100, 141, 200, 282, 400, 565, 800, 1131, 1600],
        callback: (percentage) => learningCurveGraph.zoom(percentage / 100),
    },
    'Trade-off Graph': {
        percentages: [100, 141, 200, 282, 400, 565, 800, 1131, 1600],
        callback: (percentage) => tradeOffGraph.zoom(percentage / 100),
    },
};
