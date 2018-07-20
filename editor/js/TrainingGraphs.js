import Definitions from './misc/Definitions';

const baseGraph = {
    margin: Definitions.GRAPH.MARGIN,
    width: Definitions.GRAPH.WINDOW_SIZE.WIDTH - Definitions.GRAPH.MARGIN.RIGHT - Definitions.GRAPH.MARGIN.LEFT,
    height: Definitions.GRAPH.WINDOW_SIZE.HEIGHT - Definitions.GRAPH.MARGIN.TOP - Definitions.GRAPH.MARGIN.BOTTOM,
    // グラフを表示するウィンドウ全体のサイズ
    svgWidth: Definitions.GRAPH.WINDOW_SIZE.WIDTH,
    svgHeight: Definitions.GRAPH.WINDOW_SIZE.HEIGHT,
    // グラフを表示するエリアのサイズ
    chartSVGWidth: Definitions.GRAPH.SIZE.WIDTH,
    chartSVGHeight: Definitions.GRAPH.SIZE.HEIGHT,
    zoomY: undefined,
    // svg element
    svg: undefined,
    /**
     * translateの計算
     * @param zoomY
     * @return translate
     */
    calcTranslate: function(zoomY) {
        const trans = zoomY.translate();
        const min = this.svgHeight * (1 - zoomY.scale());
        if (0 < trans[1]) return [0, 0];
        if (trans[1] < min) return [0, min];
        return trans;
    },
    /**
     * svgタグの追加
     * @param svgWidth
     * @param svgHeight
     * @param zoomY
     * @return svg
     */
    addSVG: function(zoomY) {
        return d3.select('.result-' + this.type).append('svg').attr({
            'width': this.svgWidth,
            'height': this.svgHeight,
        }).style({
            'background-color': 'white',
        }).call(zoomY);
    },
    /**
     * 目盛りの追加
     * @param svg
     * @param axis
     * @param className
     * @param transform
     * @param stroke
     * @return axisScale
     */
    addAxisScale: function(svg, axis, className, transform, stroke) {
        return svg.append('g').attr({
            'class': className + ' ' + this.type,
            'transform': transform,
            'stroke': stroke,
            'fill': 'none',
        }).call(axis);
    },
    /**
     * 目盛り線の追加
     * @param svg
     * @param grid
     * @param className
     * @param translate
     */
    addGrid: function(svg, grid, className, translate, stroke) {
        svg.append('g').attr({
            'class': className + ' ' + this.type,
            'transform': translate,
            'stroke': stroke,
        }).call(grid);
    },
    /**
     * 折れ線グラフの追加
     * @param chartSVG
     * @param d
     * @param stroke
     * @param strokeWidth
     * @param datum
     * @param specificData
     * @return path
     */
    addPath: function(chartSVG, d, stroke, strokeWidth, datum, specificData) {
        const path = chartSVG.append('path');
        if (datum) path.datum(datum);
        // 共通データをセットする
        path.attr({
            'd': d,
            'stroke': stroke,
            'fill': 'none',
            'stroke-width': strokeWidth,
        });
        // 個別データがある場合はセットする
        if (specificData) path.attr(specificData);
        return path;
    },
    /**
     * グラフ線の座標を生成する
     * @param x
     * @param y
     * @param funcX
     * @param funcY
     * @return line
     */
    createLinePath: function(x, y, funcX, funcY) {
        const self = this;
        const line = d3.svg.line()
            .x(function(d) {
                return x(funcX(d)) - self.margin.LEFT; // x軸方向のズレを修正
            })
            .y(function(d) {
                return y(funcY(d)) - self.margin.TOP; // y軸方向のズレを修正
            });
        if (this.type == 'trade-off') line.interpolate('step-after');
        return line;
    },
    /**
     * ラベルの追加
     * @param className
     * @param labelText
     * @param x
     * @param y
     */
    addLabel: function(className, labelText, x, y) {
        d3.select(className + '.' + this.type)
            .append('text')
            .text(labelText)
            .attr('x', x)
            .attr('y', y);
    },
    /**
     * グラフ描画エリアの追加
     * @param svg
     * @return chartSVG
     */
    addChartSVG: function(svg) {
        return svg.append('svg').attr({
            'width': this.chartSVGWidth,
            'height': this.chartSVGHeight,
            'x': this.margin.LEFT,
            'y': this.margin.TOP,
        });
    },
    /**
     * 拡縮率を変更する
     * @param scale
     */
    zoom: function(scale) {
        this.zoomY.scale(scale);
        this.zoomY.event(this.svg);
    },
    changeZoomArrayIndex: function(graphInfo) {
        const delta = d3.event.sourceEvent.wheelDelta;
        const index = graphInfo.percentages.indexOf(graphInfo.percentage);
        if (delta >= 120 && index !== graphInfo.percentages.length - 1) {
            graphInfo.percentage = graphInfo.percentages[index + 1];
        } else if (delta <= -120 && index !== 0) {
            graphInfo.percentage = graphInfo.percentages[index - 1];
        }
    },
};

const learningCurveGraph = Object.assign({
    type: 'learning-curve',
    /**
        * GraphAreaのLearningCurveGraphを表示する
        * @param resultId
        * @memberOf learningCurveGraph
        */
    learningCurve: function(resultId) {
        const self = this;

        // 初期データ作成
        const resultData = results.data.find(function(trainingResult) {
            return trainingResult.job_id == resultId;
        });
        const comparisonData = results.graph.comparison_id ? results.data.find((result) => result.job_id == results.graph.comparison_id) : null;

        const isShowableLearningCurve = (job) => {
            return ( (job.train_status && job.costs && job.training_errors && job.validation_errors && job.train_status.epoch)
                        && job.type !== 'profile');
        };

        if (!isShowableLearningCurve(resultData)) {
            return;
        }

        let costsValues = resultData.costs;
        let trainingErrorsValues = resultData.training_errors;
        let validationErrorsValues = resultData.validation_errors;
        let currentEpoch = (resultData.train_status.epoch || {}).current;

        if (!currentEpoch) {
            currentEpoch = 1;
            costsValues = [0];
            trainingErrorsValues = [0];
            validationErrorsValues = [0];
        }
        let costsSet = [];
        let trainingErrorSet = [];
        let validationErrorSet = [];

        for (let i = 0; i < currentEpoch; i++) {
            costsSet.push({
                id: (i + 1),
                value: Number(costsValues[i]),
                epoch: (i + 1),
            });
            if (trainingErrorsValues[i] !== undefined) {
                trainingErrorSet.push({
                    id: (i + 1),
                    value: Number(trainingErrorsValues[i]),
                    epoch: (i + 1),
                });
            }
            if (validationErrorsValues[i] !== undefined) {
                validationErrorSet.push({
                    id: (i + 1),
                    value: Number(validationErrorsValues[i]),
                    epoch: (i + 1),
                });
            }
        }
        const costs = costsSet.slice();
        const trainingError = trainingErrorSet.slice();
        const validationError = validationErrorSet.slice();

        // comparisonが設定されている場合
        let comparisonCosts;
        let comparisonTrainingError;
        let comparisonValidationError;
        if (comparisonData && isShowableLearningCurve(comparisonData) && resultId !== comparisonData.job_id) {
            comparisonCosts = [];
            comparisonTrainingError = [];
            comparisonValidationError = [];
            let comparisonDataCosts = comparisonData.costs;
            let comparisonDataTrainingErrors = comparisonData.training_errors;
            let comparisonDataValidationErrors = comparisonData.validation_errors;
            const comparisonDataCurrentEpoch = (comparisonData.train_status.epoch || {}).current;
            for (let i = 0; i < comparisonDataCurrentEpoch; i++) {
                let _comparisonCost = comparisonDataCosts[i];
                if (_comparisonCost) {
                    comparisonCosts.push({
                        id: (i + 1),
                        value: _comparisonCost,
                        epoch: (i + 1),
                    });
                }
                let _comparisonTrainingError = comparisonDataTrainingErrors[i];
                if (_comparisonTrainingError && _comparisonTrainingError !== 0) {
                    comparisonTrainingError.push({
                        id: (i + 1),
                        value: _comparisonTrainingError,
                        epoch: (i + 1),
                    });
                }
                let _comparisonValidationError = comparisonDataValidationErrors[i];
                if (_comparisonValidationError && _comparisonValidationError !== 0) {
                    comparisonValidationError.push({
                        id: (i + 1),
                        value: _comparisonValidationError,
                        epoch: (i + 1),
                    });
                }
            }
        }

        let valueFn = function(d) {
            return d.value;
        };
        let epochFn = function(d) {
            return d.epoch;
        };

        // x,y軸のスケール設定
        let allData;
        let errorAllData;
        let domainX;
        if (!comparisonData || !isShowableLearningCurve(comparisonData)|| resultId === comparisonData.job_id) {
            // comparisonが設定されていない
            allData = costs.concat(trainingError).concat(validationError);
            errorAllData = trainingError.concat(validationError);
            domainX = currentEpoch;
        } else {
            allData = costs
                .concat(trainingError)
                .concat(validationError)
                .concat(comparisonCosts)
                .concat(comparisonTrainingError)
                .concat(comparisonValidationError);
            errorAllData = trainingError.concat(validationError).concat(comparisonTrainingError).concat(comparisonValidationError);
            const comparisonDataCurrentEpoch = (comparisonData.train_status.epoch || {}).current;
            domainX = comparisonDataCurrentEpoch > currentEpoch ? comparisonDataCurrentEpoch : currentEpoch;
        }
        if (self.width <= self.margin.LEFT || self.height <= self.margin.BOTTOM) {
            $('.result-learning-curve svg').remove();
            return;
        }

        const _valuesGreaterZero = (data) => data.map((d) => d.value).filter((x) => x !== undefined && x > 0);
        const getMinValue = (data) => Math.min.apply(undefined, _valuesGreaterZero(data));
        const getMaxValue = (data) => Math.max.apply(undefined, _valuesGreaterZero(data));

        let x = d3.scale.linear().range([self.margin.LEFT, self.width]).domain([1, domainX]);
        // Cost
        let y = results.graph.scale === 'log' ? d3.scale.log().range([self.height, self.margin.BOTTOM]).domain([getMinValue(allData), getMaxValue(allData)])
            : d3.scale.linear().range([self.height, self.margin.BOTTOM]).domain([getMinValue(allData), getMaxValue(allData)]);
        // Error
        let y2 = results.graph.scale === 'log' ? d3.scale.log().range([self.height, self.margin.BOTTOM]).domain([getMinValue(errorAllData), getMaxValue(errorAllData)])
            : d3.scale.linear().range([self.height, self.margin.BOTTOM]).domain([getMinValue(errorAllData), getMaxValue(errorAllData)]);

        // x, y軸の設定
        let xAxis = d3.svg.axis().scale(x).orient('bottom');
        let yAxis = d3.svg.axis().scale(y).orient('left');
        let yAxis2 = d3.svg.axis().scale(y2).orient('right');
        // グラフの線の設定
        let line1 = self.createLinePath(x, y, epochFn, valueFn);
        let line2 = self.createLinePath(x, y2, epochFn, valueFn);

        const graphInfo = window.nnc.components.Editor.zoomInfo.learningCurve;
        const percentages = graphInfo.percentages;
        const minScale = percentages[0] / 100;
        const maxScale = percentages[percentages.length - 1] / 100;
        self.zoomY = d3.behavior.zoom()
            .scaleExtent([minScale, maxScale])
            .y(y)
            .on('zoom', function() {
                // マウスホイール操作による拡縮の場合、indexを更新する
                if (d3.event.sourceEvent) learningCurveGraph.changeZoomArrayIndex(graphInfo);
                // scaleを更新する
                learningCurveGraph.zoomY.scale(graphInfo.percentage / 100);

                // y(Cost)のtranslateをもとにyとy2のtranslateを変更
                let trans = self.calcTranslate(self.zoomY);
                self.zoomY.translate(trans);
                zoomY2.translate(trans);
                // yのscaleをy2(Error)にコピーする
                zoomY2.scale(self.zoomY.scale());
                // 目盛り位置の変更
                d3.select('.y.axis.axis-left.learning-curve').call(yAxis);
                d3.select('.y.axis.axis-right.learning-curve').call(yAxis2);
                // 罫線位置の変更
                d3.select('.y.grid.axis-left.learning-curve').call(yGrid);
                d3.select('.y.grid.axis-right.learning-curve').call(y2Grid);
                // CostCurve,TrainingErrorCurve,ValidationErrorCurveの位置の変更
                path1.attr('d', line1);
                if (path2) path2.attr('d', line2);
                if (path3) path3.attr('d', line2);
                // comparisonが設定されている場合はcomparisonのグラフの位置も変更する
                if (comparisonData && isShowableLearningCurve(comparisonData) && resultId !== comparisonData.resultId) {
                    comparisonPath1.attr('d', line1);
                    if (comparisonPath2) comparisonPath2.attr('d', line2);
                    if (comparisonPath3) comparisonPath3.attr('d', line2);
                }
                // Tooltip表示箇所の変更
                chartSVG.selectAll('circle').remove();
            })
            .scale(graphInfo.percentage / 100);
        const zoomY2 = d3.behavior.zoom().y(y2)
            .scale(graphInfo.percentage / 100);

        // svgタグを生成
        $('.result-learning-curve svg').remove();
        self.svg = self.addSVG(self.zoomY);

        // x, y軸の目盛設定
        let xAxisScale = self.addAxisScale(self.svg, xAxis, 'x axis', 'translate(0, ' + self.height + ')', 'black');
        let yAxisScale = self.addAxisScale(self.svg, yAxis, 'y axis axis-left', 'translate(' + self.margin.LEFT + ', 0)', '#006699');
        let yAxisScale2 = self.addAxisScale(self.svg, yAxis2, 'y axis axis-right', 'translate(' + self.width + ', 0)', '#FF6666');

        // xの目盛り線を引く
        let xGrid = d3.svg.axis().scale(x).orient('bottom').tickSize(-(self.height - self.margin.BOTTOM), 0, 0).tickFormat('');
        self.addGrid(self.svg, xGrid, 'x grid', 'translate(0, ' + self.height + ')', '#D8D8D8');
        // 青のyの目盛り線を引く
        const yGrid = d3.svg.axis().scale(y).orient('left').tickSize(-(self.width - self.margin.LEFT), 0, 0).tickFormat('');
        self.addGrid(self.svg, yGrid, 'y grid axis-left', 'translate(' + self.margin.LEFT + ', 0)', 'rgba(0,102,153,0.20)');
        // 赤のyの目盛り線を引く
        const y2Grid = d3.svg.axis().scale(y2).orient('right').tickSize(-(self.width - self.margin.LEFT), 0, 0).tickFormat('');
        self.addGrid(self.svg, y2Grid, 'y grid axis-right', 'translate(' + self.width + ', 0)', 'rgba(255,102,102,0.20)');

        // ラベル追加
        self.addLabel('.x.axis', 'Epoch', self.width / 2, 40);
        self.addLabel('.y.axis-left', 'Cost', -40, self.height + 35);
        self.addLabel('.y.axis-right', 'Error', 10, self.height + 35);

        // グラフ描画エリアを追加する
        const chartSVG = self.addChartSVG(self.svg);

        // x, y軸の各情報を更新
        xAxis.scale(x);
        yAxis.scale(y);
        yAxis2.scale(y2);
        xAxisScale.call(xAxis);
        yAxisScale.call(yAxis);
        yAxisScale2.call(yAxis2);

        let addLine = function(line, color, data, isError, params) {
            let path = self.addPath(chartSVG, line, color, 1, data, params);
            path.transition().attr('d', line);
            return path;
        };

        // グラフの線の設定
        let path1 = addLine(line1, '#006699', costs, false);
        let path2;
        let path3;
        if (results.graph.show_training_error) {
            path2 = addLine(line2, '#FF6666', trainingError, true);
        }
        if (results.graph.show_validation_error) {
            path3 = addLine(line2, '#FF6666', validationError, true, {'stroke-dasharray': '5, 5'});
        }

        // comparisonが設定されている場合
        let comparisonPath1;
        let comparisonPath2;
        let comparisonPath3;
        if (comparisonData && isShowableLearningCurve(comparisonData) && resultId !== comparisonData.resultId) {
            comparisonPath1 = addLine(line1, '#006699', comparisonCosts, false, {'opacity': '0.4'});
            if (results.graph.show_training_error) {
                comparisonPath2 = addLine(line2, '#FF6666', comparisonTrainingError, true, {'opacity': '0.4'});
            }
            if (results.graph.show_validation_error) {
                comparisonPath3 = addLine(line2, '#FF6666', comparisonValidationError, true, {'stroke-dasharray': '10,5', 'opacity': '0.4'});
            }
        }
    },
}, baseGraph);

const tradeOffGraph = Object.assign({
    type: 'trade-off',
    /**
        * GraphAreaのTradeOffGraphを表示する
        * @memberOf sdt.TradeOffGraph
        */
    tradeOff: function() {
        let self = this;

        let copyArray = function(data) {
            return JSON.parse(JSON.stringify(data));
        };

        let getMaxMultiplyAdd = function(data) {
            return d3.max(data, function(d) {
                return d.multiplyAdd;
            });
        };

        let getMinMultiplyAdd = function(data) {
            return d3.min(data, function(d) {
                return d.multiplyAdd;
            });
        };

        let getMaxValue = function(data) {
            let validationMax = d3.max(data, function(d) {
                return d.validationError;
            });
            let trainingMax = d3.max(data, function(d) {
                return d.trainingError;
            });

            return validationMax > trainingMax ? validationMax : trainingMax;
        };

        const getMinValue = (data) => Math.min.apply(undefined,
            data.map((d) => d.validationError)
            .concat(data.map((d) => d.trainingError))
            .filter((x) => x !== undefined && x > 0));

        let clearLargeData = function(minData) {
            for (let i = minData.length - 1; i >= 0; i--) {
                let currentData = minData[i];
                for (let j = i - 1; j >= 0; j--) {
                    let beforeData = minData[j];
                    if (currentData.validationError > beforeData.validationError) {
                        minData.splice(i, 1);
                        break;
                    }
                }
            }

            return minData;
        };

        let generateLineValue = function(allData) {
            let minValues = [];
            for (let i = 0; i < allData.length; i++) {
                let data = allData[i];
                for (let j = 0; j < data.length; j++) {
                    let obj = data[j];
                    let exist = false;
                    for (let k = 0; k < minValues.length; k++) {
                        let minObj = minValues[k];
                        if (obj.multiplyAdd !== minObj.multiplyAdd) {
                            continue;
                        }

                        exist = true;
                        if (obj.validationError < minObj.validationError) {
                            minObj.validationError = obj.validationError;
                            break;
                        }
                    }

                    if (!exist) {
                        minValues.push(obj);
                    }
                }
            }

            minValues = clearLargeData(minValues);
            return minValues;
        };

        let multiplyAddFn = function(d) {
            return d.multiplyAdd;
        };
        let validationFn = function(d) {
            return d.validationError;
        };
        let trainingFn = function(d) {
            return d.trainingError;
        };

        let size = Definitions.GRAPH.TRADE_OFF_PROT_SIZE;

        let colors = ['limegreen', 'pink', 'yellow', 'skyblue', 'darkred'];

        let byTradeOffType = (() => {
            switch (results.graph.trade_off_type) {
                case 'All':
                    return (job) => true;
                case 'Previous': {
                    let activeIndexIn = (array) => {
                        let activeId = ResultsUtils.getActiveResult().job_id;
                        let index = array.findIndex((job) => job.job_id === activeId);
                        activeIndexIn = (array) => index; // 二回目以降、計算を終えた定数 activeIndex を返すよう関数を書き換え
                        return index;
                    };
                    return (job, index, filtered) => activeIndexIn(filtered) <= index;
                }
                case 'Pareto Only':
                    return (job) => job.pareto_optimal;
            }
        })();

        let isShowableTradeOff = (job) => {
            const stat = job.train_status;
            return job.type !== 'profile' && job.status !== 'failed' && (stat &&
                (stat.last && stat.last.train_error !== undefined) && // train_errorの値チェック
                ((stat.best && stat.best.valid_error !== undefined) || (stat.last && stat.last.valid_error !== undefined)) && // valid_errorの値チェック
                (stat.cost_multiply_add)); // cost_multiply_addの値チェック
        };

        // データを集める
        let dataset = results.data
        .filter(isShowableTradeOff)
        .filter(byTradeOffType)
        .map((job) => {
            const costAndErrors = new ResultsUtils.JobCostAndErrors(job);
            return {
                id: job.job_id,
                name: job.job_name,
                trainingError: costAndErrors.training(),
                validationError: costAndErrors.validationBest(),
                multiplyAdd: costAndErrors.cost(),
            };
        });

        // add index for color to keep color after sort.
        for (let i = 0; i < dataset.length; ++i) {
            dataset[i].colorIdx = i;
        }

        dataset.sort((a, b) => a.multiplyAdd - b.multiplyAdd);

        // TradeOffGraphに表示する演算量(X軸),誤差(Y軸)の領域を計算する
        let domainMultiplyAdd = tradeOffGraph.
            _calcTradeOffGraphDomain(getMinMultiplyAdd(dataset), getMaxMultiplyAdd(dataset));
        let minMultiplyAdd = domainMultiplyAdd.min;
        let maxMultiplyAdd = domainMultiplyAdd.max;
        let domainError = tradeOffGraph.
            _calcTradeOffGraphDomain(getMinValue(dataset), getMaxValue(dataset));
        let minError = domainError.min;
        let maxError = domainError.max;

        if (self.width <= self.margin.LEFT || self.height <= self.margin.BOTTOM) {
            $('.result-trade-off svg').remove();
            return;
        }
        const x1 = d3.scale.log().range([self.margin.LEFT, self.width]).domain([minMultiplyAdd, maxMultiplyAdd]);
        let y1 = results.graph.scale === 'log' ? d3.scale.log().range([self.height, self.margin.BOTTOM]).domain([minError, maxError])
            : d3.scale.linear().range([self.height, self.margin.BOTTOM]).domain([minError, maxError]);

        let xAxis = d3.svg.axis().scale(x1).orient('bottom').ticks(10, 0);
        let y1Axis = d3.svg.axis().scale(y1).orient('left').ticks(5);
        let line = self.createLinePath(x1, y1, multiplyAddFn, validationFn);

        const graphInfo = window.nnc.components.Editor.zoomInfo.tradeOffGraph;
        const percentages = graphInfo.percentages;
        const minScale = percentages[0] / 100;
        const maxScale = percentages[percentages.length - 1] / 100;
        self.zoomY = d3.behavior.zoom()
            .scaleExtent([minScale, maxScale])
            .y(y1)
            .on('zoom', function() {
                // マウスホイール操作による拡縮の場合、indexを更新する
                if (d3.event.sourceEvent) learningCurveGraph.changeZoomArrayIndex(graphInfo);
                // scaleを更新する
                tradeOffGraph.zoomY.scale(graphInfo.percentage / 100);

                // yのtranslateを変更
                self.zoomY.translate(self.calcTranslate(self.zoomY));
                // 目盛り位置の変更
                d3.select('.y.axis.trade-off').call(y1Axis);
                // 罫線位置の変更
                d3.select('.y.grid.trade-off').call(yGrid);
                // パレート最適間を結ぶ線の位置の変更
                path.attr('d', line(generateLineValue([copyArray(dataset)])));
                // プロット位置の変更
                dataset.forEach(updateData);
            })
            .scale(graphInfo.percentage / 100);

        // svgタグを生成
        $('.result-trade-off svg').remove();
        self.svg = self.addSVG(self.zoomY);

        // x, y軸の目盛設定
        let xAxisScale = self.addAxisScale(self.svg, xAxis, 'x axis', 'translate(0, ' + self.height + ')', 'black');
        xAxisScale.selectAll('text')
            .attr({
                transform: 'rotate(20)',
            })
            .style('text-anchor', 'start');
        let y1AxisScale = self.addAxisScale(self.svg, y1Axis, 'y axis', 'translate(' + self.margin.LEFT + ', 0)', '#FF6666');

        // グラフ描画エリアを追加する
        let chartSVG = self.addChartSVG(self.svg);

        // パレート最適を結ぶ線の設定
        const path = self.addPath(chartSVG, line(generateLineValue([copyArray(dataset)])), 'rgba(255, 127, 80, .5)', 5, '', {'class': 'line bottom'});

        // ラベル
        self.addLabel('.x.axis', 'MultiplyAdd', 300, 45);
        self.addLabel('.y.axis', 'Error', -40, self.height + 35);

        x1.domain([minMultiplyAdd, maxMultiplyAdd]);
        y1.domain([minError, maxError]);

        xAxis.scale(x1);
        y1Axis.scale(y1);

        xAxisScale.call(xAxis);
        y1AxisScale.call(y1Axis);

        // xの目盛り線を引く
        let xGrid = d3.svg.axis().scale(x1).orient('bottom').ticks(10, 0).tickSize(-(self.height - self.margin.BOTTOM), 0, 0).tickFormat('');
        self.addGrid(self.svg, xGrid, 'x grid', 'translate(0, ' + self.height + ')');
        // yの目盛り線を引く
        const yGrid = d3.svg.axis().scale(y1).orient('left').ticks(5).tickSize(-(self.width - self.margin.LEFT), 0, 0).tickFormat('');
        self.addGrid(self.svg, yGrid, 'y grid', 'translate(' + self.margin.LEFT + ', 0)');

        const updateData = function(data) {
            let validatorClass = 'validation' + (data.colorIdx + 1);
            let validationRectangles = 0 < data.validationError ? chartSVG.selectAll('rect.' + validatorClass).data([data]) : null;
            let trainingClass = 'training' + (data.colorIdx + 1);
            let trainingRectangles = 0 < data.trainingError ? chartSVG.selectAll('rect.' + trainingClass).data([data]) : null;

            let activeSize = size * 2;
            let _size = (name) => name == ResultsUtils.getActiveResult().name ? activeSize : size;

            let _show = function(rectangles, type, params) {
                rectangles.enter()
                    .append('rect')
                    .attr('width', _size(data.name))
                    .attr('height', _size(data.name))
                    .attr(params)
                    .on('mouseover', function(d) {
                        let error = type == 'Validation' ? d.validationError : d.trainingError;
                        let text = d.name + '<br>' + type + ' Error = ' + error + '<br>' + 'Multiply Add = ' + d.multiplyAdd;
                        let top = d3.event.pageY - 20;
                        let left = d3.event.pageX + 10;
                        let tooltipWidth = $('#tooltip').outerWidth(true);
                        let tooltipRight = left + tooltipWidth;
                        if (tooltipRight > window.innerWidth) {
                            left -= tooltipWidth + 20;
                        }
                        return d3.select('#tooltip').style({
                            visibility: 'visible',
                            top: top + 'px',
                            left: left + 'px',
                        }).html(text);
                    })
                    .on('mouseout', function() {
                        return d3.select('#tooltip').style('visibility', 'hidden');
                    })
                    .on('click', function() {
                        ResultsUtils.changeActive(results.data.find((result) => result.job_id == data.id).job_id);
                    });

                // Errorの移動処理
                rectangles.transition()
                    .attr('x', function(d) {
                        let x = x1(multiplyAddFn(d));
                        return x - _size(data.name) / 2 // プロットサイズ分のズレを修正
                            - self.margin.LEFT; // x軸方向のズレを修正
                    })
                    .attr('y', function(d) {
                        let y = y1(type == 'Validation' ? validationFn(d) : trainingFn(d));
                        return y - _size(data.name) / 2 // プロットサイズ分のズレを修正
                            - self.margin.TOP; // y軸方向のズレを修正
                    });
            };

            // ValidationErrorの表示及びツールチップのイベント追加、移動処理
            if (results.graph.show_validation_error && validationRectangles) {
                _show(validationRectangles, 'Validation', {
                    'fill': colors[data.colorIdx % colors.length],
                    'class': validatorClass,
                });
            }

            // TrainingErrorの表示及びツールチップのイベント追加、移動処理
            if (results.graph.show_training_error && trainingRectangles) {
                _show(trainingRectangles, 'Training', {
                    'fill': 'rgba(0, 0, 0, 0)',
                    'stroke': colors[data.colorIdx % colors.length],
                    'class': trainingClass,
                });
            }
        };

        dataset.forEach(updateData);
    },
    /**
        * TradeOffGraphに表示する領域を求める
        * @param min
        * @param max
        * @returns {min, max}
        * @memberOf sdt.TradeOffGraph
        */
    _calcTradeOffGraphDomain: function(min, max) {
        if (min !== 0) {
            let logMpx = Math.log(max / min);
            if (min < max && Math.log(10.0) <= logMpx) {
                min /= Math.exp(logMpx / 20);
                max *= Math.exp(logMpx / 20);
            } else {
                let center = Math.log(min * max) * 0.5;
                min = Math.exp(center - Math.log(10.0) * 0.5);
                max = Math.exp(center + Math.log(10.0) * 0.5);
            }
        }
        if (max === 0) max = 1;
        return {min: min, max: max};
    },
}, baseGraph);

export {learningCurveGraph, tradeOffGraph};
