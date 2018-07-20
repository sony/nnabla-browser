<template>
    <div class="training-main-area">
        <div v-if="active > -1">
            <result-content-main-header :train-status="(data[active] || {}).train_status" />
            <action-bar :current-graph="zoomInfo" @zoom-value="value => $emit('zoom-value', value)" />
            <result-content-main class="job-main-area" :current-graph="zoomInfo" @zoom-value="value => $emit('zoom-value', value)" />
            <result-content-log :log="data[active] ? data[active].logfile : ''" />
        </div>
        <span v-else class="position-center error-message">NO TRAINING RESULT SELECTED.</span>
    </div>
</template>

<script>
import ResultContentHeaderVue from '../Jobs/ResultContentHeader.vue';
import ResultContentLogVue from '../Jobs/ResultContentLog.vue';
import EditorWindowSize from '../../EditorWindowSize';
import {learningCurveGraph, tradeOffGraph} from '../../TrainingGraphs';
import EditorUtils from './../../EditorUtils';
import Definitions from './../../misc/Definitions';
import Vue from 'vue/dist/vue.esm.js';

window.ResultContentHeader = ResultContentHeaderVue;
window.ResultContentLog = ResultContentLogVue;

window.results = {
    data: [],
    active: -1,
    graph: {
        type: 'Learning Curve',
        trade_off_type: 'All',
        comparison_id: '',
        show_training_error: true,
        show_validation_error: true,
        scale: 'linear',
    },
    metadata: {total: 0},
    deletedJobs: [],
    evaluatable: function() { // 学習か評価のジョブが選択されていて、中断されているか完了している
        const job = this.data[this.active] || {};
        return ['TRAINING', 'EVALUATION'].includes(nnc.editor.activeTabName) &&
        ['train', 'evaluate'].includes(job.type) && ['suspended', 'finished'].includes(job.status);
    },
    merge: function(jobs) {
        const activeJobId = this.active !== -1 ? this.data[this.active].job_id : null;
        jobs.forEach((job) => {
            const jobId = job.job_id;
            if (!this.deletedJobs.includes(jobId)) {
                const jobArray = this.data;
                const target = jobArray.find((elem) => elem.job_id === jobId);
                if (target) { // update
                    Object.assign(target, job);
                } else {
                    this.data.push(Object.assign(
                        {
                            logfile: '',
                            evaluation_logfile: '',
                            evaluate_status: '',
                            confusionMatrix: {
                                selectedModal: '',
                                matrices: '',
                            },
                            current_epoch: undefined,
                        }, job));
                }
            }
        });
        this.data.sort((a, b) => a.create_datetime < b.create_datetime ? 1 : -1);
        this.active = activeJobId ? this.data.findIndex((job) => job.job_id === activeJobId) : -1;
    },
};
window.ResultsUtils = (() => {
    let pollingTrainResultId = '';
    let pollingEvaluateResultId = '';
    const _isActive = (job) => EditorUtils.is_active;
    const _parseMonitoringReport = function(result) {
        if ((result.train_status || result).monitoring_report) {
            const report = (result.train_status || result).monitoring_report || {};
            const indices = Object.keys(report).sort((a, b) => a - b);
            const valueOf = (key) => (index) => (report[index] || [])[key];
            Object.assign(result, {
                current_epoch: indices.length,
                costs: indices.map(valueOf('cost')),
                training_errors: indices.map(valueOf('train_error')),
                validation_errors: indices.map(valueOf('valid_error')),
            });
            delete (result.train_status || result).monitoring_report;
        }
        return result;
    };
    const _makeHandleS3ErrorFunction = (job, atLast) => (error, status, httpErrorThrown) => {
        // エラーが起きたら次のリクエストからはAPI呼び出しに切り替える
        // タイミングが悪ければ空ファイルが返される時があり、その場合はjsonパースエラーになるのでその場合は除く
        if (status !== 'parsererror') {
            delete job.status_url;
            delete job.log_url;
        }
        atLast();
    };
    return {
        changeActive: (() => {
            let currentJobId = -1;
            return function(jobId) {
                if (results.active === -1 || jobId !== currentJobId) {
                    clearTimeout(pollingTrainResultId);
                    clearTimeout(pollingEvaluateResultId);

                    $('.result-learning-curve svg').remove();
                    if (jobId === undefined) {
                        currentJobId = undefined;
                        results.active = -1;
                    } else {
                        const jobs = results.data;
                        const index = jobs.findIndex((result) => result.job_id === jobId);
                        if (index !== -1) {
                            const job = jobs[index];
                            ResultsUtils.showResultContent(jobId);
                            ResultsUtils.checkPareto();

                            window.EvaluationTab.showEvaluationContent(job);
                            if (_isActive(job)) {
                                ResultsUtils.setPollingForTrainResult(job);
                            }
                            currentJobId = jobId;
                        } else {
                            currentJobId = undefined;
                        }
                        results.active = index;
                    }
                }
            };
        })(),
        reloadGraphs: function() {
            learningCurveGraph.learningCurve(ResultsUtils.getActiveResult().job_id);
            tradeOffGraph.tradeOff();
        },
        /**
         * activeになっているTrainingResultを取得する
         */
        getActiveResult: function() {
            return results.data[results.active];
        },
        getTrainResult: function(jobId, callback) {
            EditorUtils.callApi({
                url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs/' + jobId + '/train_result',
                type: 'get',
                dataType: 'json',
            }, callback, EditorUtils.handleXhrFailure);
        },
        showResultContent: function(resultId, callback) {
            this.getTrainResult(resultId, (result) => {
                result = _parseMonitoringReport(result);
                Object.assign(results.data.find((job) => job.job_id == resultId), result);
                if (result.status != 'queued' && result.status != 'preprocessing') {
                    EditorWindowSize.init();
                }
                if (callback) callback();
            });
        },
        JobCostAndErrors: function(job) {
            const defaultIfUndefined = (value, defValue) => value !== undefined ? value : defValue;
            const stat = job.train_status || {};
            const validError = (stat.last || {}).valid_error;

            this.cost = (defValue) => defaultIfUndefined(stat.cost_multiply_add || defValue);
            this.training = (defValue) => defaultIfUndefined((stat.last || {}).train_error, defValue);
            this.validation = (defValue) => defaultIfUndefined(validError, defValue);
            this.validationBest = (defValue) => defaultIfUndefined((stat.best || {}).valid_error,
                defaultIfUndefined(validError, defValue)); // XXX for Day1
        },
        checkPareto: function() {
            // パレート最適なジョブをマークし、コストと誤差を短い名前でアクセスできるよう
            // {pareto: Function, cost: Number, error: Number} というオブジェクト配列を生成する。
            // 配列は、コストの低いものを先頭に、同一コストなら誤差の小さいものをより先頭にソートしておく。
            // 適切にソートするためコストや誤差が参照できないオブジェクトは正の無限大値を設定しておく。
            const mappedJobs = results.data.map((job) => {
                const costAndErrors = new ResultsUtils.JobCostAndErrors(job);
                return {
                    pareto: (bool) => job.pareto_optimal = bool,
                    cost: Number(costAndErrors.cost(Infinity)),
                    error: Number(costAndErrors.validationBest(Infinity)),
                };
            }).sort((a, b) => (a.cost - b.cost) || (a.error - b.error)); // コストが同じなら（差が 0）、誤差の差で昇順ソート

            let cost = -Infinity; // 再左端からはじめる
            let error = Infinity; // 最初の誤差は極大としておく
            mappedJobs.forEach((item) => {
                if (cost !== item.cost) {
                    cost = item.cost; // 同一コストのグループを探索するためにコストを更新する
                    error = Math.min(error, item.error); // 最小誤差を更新する
                    item.pareto(item.error <= error); // 現時点での最小誤差ならパレート最適とマークする
                } else {
                    // 同一コストグループ内で、最小誤差を共有するものをパレート最適とマークする
                    item.pareto(item.error === error);
                }
            });
        },
        setPollingForTrainResult: function(job) {
            clearTimeout(pollingTrainResultId);
            const fetchResult = function(job) {
                const INTERVAL = 5000;
                if (job.status_url && job.log_url) {
                    EditorUtils.callApi({
                        url: job.log_url,
                        type: 'get',
                        /*
                         * S3のファイルへのアクセス時にCORSルールによるpreflightリクエストを防ぐため
                         * headers, credentialsを送信しないように設定
                         * setPollingForEvaluateResultも同様
                         */
                        headers: null,
                        xhrFields: {withCredentials: false},
                    }, (result) => {
                        job.logfile = result;
                    });
                    EditorUtils.callApi({
                        url: job.status_url,
                        type: 'get',
                        headers: null,
                        xhrFields: {withCredentials: false},
                    }, (result) => {
                        if (result != '') {
                            if (result.status != 'BEFORE_TRAINING') {
                                result = _parseMonitoringReport(result);
                                job.status = result.status.toLowerCase();
                                job.current_epoch = result.current_epoch;
                                job.costs = result.costs;
                                job.training_errors = result.training_errors;
                                job.validation_errors = result.validation_errors;
                                job.costs = result.costs;
                                Vue.set(job, 'train_status', job.train_status || {});
                                Object.assign(job.train_status, result);
                                EditorWindowSize.init();
                            }
                        }
                        pollingTrainResultId = setTimeout(fetchResult, INTERVAL, job);
                        if (!EditorUtils.is_active(job)) {
                            clearTimeout(pollingTrainResultId);
                        }
                    }, _makeHandleS3ErrorFunction( // XXX プリサインド URL 処理のため EditorUtils.handleXhrFailure でなく特殊処理にまわす
                        job,
                        () => pollingTrainResultId = setTimeout(fetchResult, INTERVAL, job)
                    ));
                } else {
                    ResultsUtils.showResultContent(job.job_id, () => {
                        pollingTrainResultId = setTimeout(fetchResult, INTERVAL, job);
                        if (!EditorUtils.is_active(job)) {
                            clearTimeout(pollingTrainResultId);
                        }
                    });
                }
            };
            fetchResult(job);
        },
        setPollingForEvaluateResult: function(job) {
            clearTimeout(pollingEvaluateResultId);
            const fetchResult = function(job) {
                const INTERVAL = 5000;
                if (job.status_url && job.log_url) {
                    EditorUtils.callApi({
                        url: job.log_url,
                        type: 'get',
                        headers: null,
                        xhrFields: {withCredentials: false},
                    }, (log) => {
                        job.evaluation_logfile = log;
                        EditorWindowSize.init();
                    }, EditorUtils.handleXhrFailure);
                    EditorUtils.callApi({
                        url: job.status_url,
                        type: 'get',
                        headers: null,
                        xhrFields: {withCredentials: false},
                    }, (result) => {
                        if (result) {
                            job.status = result.status;
                            job.evaluate_status = result;
                        }
                        switch (result.status) {
                        case 'finished':
                            // showEvaluationContent 経由で呼び出す getEvaluationResult でガードしているため
                            // ここで job.status を見なくても大丈夫だが……
                            window.EvaluationTab.showEvaluationContent(job);
                            /* $FALL-THROUGH$ */
                        case 'failed':
                        case 'suspended':
                            clearTimeout(pollingEvaluateResultId);
                            break;
                        default:
                            pollingEvaluateResultId = setTimeout(fetchResult, INTERVAL, job);
                            break;
                        }
                    }, _makeHandleS3ErrorFunction( // XXX プリサインド URL 処理のため EditorUtils.handleXhrFailure でなく特殊処理にまわす
                        job,
                        () => pollingEvaluateResultId = setTimeout(fetchResult, INTERVAL, job)
                    ));
                } else {
                    window.EvaluationTab.showEvaluationContent(job, (result) => {
                        switch (result.status) {
                        case 'finished':
                        case 'failed':
                        case 'suspended':
                            break;
                        default:
                            pollingEvaluateResultId = setTimeout(fetchResult, INTERVAL, job);
                            break;
                        }
                    });
                }
            };
            fetchResult(job);
        },
        getJobsInProgress: () => results.data.filter(_isActive),
    };
})();

const ResultContentMainHeader = Vue.extend({
    props: ['trainStatus'],
    template: `
        <div class="result-content-main-header">
            <result-content-header
                :current="currentEpoch"
                :total="maxEpoch"
                progress-name="Epoch"
                :elapsed-time="elapsedTime"
                :total-time="predictionTime"
                />
        </div>
    `,
    components: {
        'result-content-header': ResultContentHeaderVue,
    },
    data: () => results,
    computed: {
        currentEpoch: function() {
            return ((this.trainStatus || {}).epoch || {}).current;
        },
        maxEpoch: function() {
            return ((this.trainStatus || {}).epoch || {}).max;
        },
        elapsedTime: function() {
            return ((this.trainStatus || {}).time || {}).elapsed;
        },
        predictionTime: function() {
            return ((this.trainStatus || {}).time || {}).prediction;
        },
    },
});

const ResultLearningCurve = Vue.extend({
    template: `
        <div>
            <div v-show="graph.type=='Learning Curve'">
                <nnc-loading v-if="(data[active].type === 'train' && !data[active].current_epoch) || ['queued', 'preprocessing'].includes(data[active].status)" />
                <div v-else-if="data[active].type === 'profile'"></div>
                <div v-else-if="!isShowableLearningCurve">
                    <span>The graph can not be displayed because it contains data of 0 or less.</span>
                </div>
                <div v-else>
                    <div class="legend">
                        <span class="legend-item">
                            <span class="legend-label-cost">
                                Cost
                            </span>
                        </span>
                        <span class="legend-item">
                            <nnc-checkbox label="" v-model="graph.show_training_error" @input="changeShowGraph" />
                            <span class="legend-label-training">
                                Training Error
                            </span>
                        </span>
                        <span class="legend-item">
                            <nnc-checkbox label="" v-model="graph.show_validation_error" @input="changeShowGraph" />
                            <span class="legend-label-validation">
                                Validation Error
                            </span>
                        </span>
                    </div>
                    <div class="result-learning-curve"></div>
                </div>
            </div>
            <div v-show="graph.type === 'Trade-off Graph'">
                <div v-if="!isShowableTradeOff">
                    <span>The graph can not be displayed because it contains data of 0 or less.</span>
                </div>
                <div v-else>
                    <div class="legend">
                        <span class="legend-item">
                            <span class="legend-trade-off">□</span>
                            Training Error
                        </span>
                        <span class="legend-item">
                            <span class="legend-trade-off">■</span>
                            Best Validation Error
                        </span>
                    </div>
                    <div class="result-trade-off"></div>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return results;
    },
    computed: {
        isShowableLearningCurve: function() {
            const job = this.data[this.active] || {};
            const peek = (name) => job[name] || 0;
            for (let i=0; i<(job.current_epoch || -1); ++i) {
                if (peek('costs')[i] > 0 || peek('training_errors')[i] > 0 || peek('validation_errors')[i] > 0) {
                    return true;
                }
            }
            return false;
        },
        isShowableTradeOff: function() {
            return this.data.some((job) => {
                const costAndErrors = new ResultsUtils.JobCostAndErrors(job);
                return costAndErrors.validationBest(0) > 0 || costAndErrors.training(0) > 0;
            });
        },
    },
    methods: {
        changeShowGraph: function() {
            ResultsUtils.reloadGraphs();
        },
    },
});

const ResultContentMainGraphs = Vue.extend({
    props: {currentGraph: Object},
    template: `
        <div class="result-content-main-graphs">
            <div @contextmenu="open_menu($event)">
                <result-learning-curve />
                <context-menu ref="context_menu" :menuItems="menu_items">
                </context-menu>
            </div>
        </div>
    `,
    components: {
        'result-learning-curve': ResultLearningCurve,
    },
    computed: {
        menu_items: function() {
            return [
                {type: 'submenu', text: 'View', submenu: [
                    {type: 'action', text: 'Training&Validation', action: this.show_training_validation},
                    {type: 'action', text: 'Training', action: this.show_training},
                    {type: 'action', text: 'Validation', action: this.show_validation},
                ]},
                {type: 'action', text: 'Log Scale Graph', action: this.change_scale},
                {type: 'submenu', text: 'Zoom', submenu: [
                    {type: 'action', text: 'Default', action: () => this.$emit('zoom-value', 100)},
                    {type: 'action', text: 'Zoom In', action: () => this.$emit('zoom-value', this.values.next), disabled: !this.values.canMoveNext},
                    {type: 'action', text: 'Zoom Out', action: () => this.$emit('zoom-value', this.values.prev), disabled: !this.values.canMovePrev},
                ]},
                {type: 'separator'},
                {type: 'action', text: 'Save CSV as...', action: this.save_as_csv},
            ];
        },
        values: function() {
            return EditorUtils.indexOperator(this.currentGraph.percentages, this.currentGraph.percentage);
        },
    },
    methods: {
        open_menu: function(event) {
            event.preventDefault();
            this.$refs.context_menu.$emit('open', {'parent': this, 'event': event});
        },
        show_training_validation: function() {
            results.graph.show_training_error = true;
            results.graph.show_validation_error = true;
            ResultsUtils.reloadGraphs();
        },
        show_training: function() {
            results.graph.show_training_error = true;
            results.graph.show_validation_error = false;
            ResultsUtils.reloadGraphs();
        },
        show_validation: function() {
            results.graph.show_training_error = false;
            results.graph.show_validation_error = true;
            ResultsUtils.reloadGraphs();
        },
        change_scale: function() {
            results.graph.scale = results.graph.scale === 'linear' ? 'log' : 'linear';
            ResultsUtils.reloadGraphs();
        },
        save_as_csv: function() {
            let content = '';
            const a = document.createElement('a');
            if (results.graph.type === 'Learning Curve') {
                const activeResult = ResultsUtils.getActiveResult();
                a.download = activeResult.job_name + '_' + results.graph.type + '.csv';
                content += 'epoch,cost,train_error,valid_error\n';
                const trainingErrors = activeResult.training_errors;
                const validationErrors = activeResult.validation_errors;
                activeResult.costs.forEach((cost, index) => {
                    content += [
                        (index + 1).toString(),
                        cost,
                        trainingErrors[index] !== undefined ? trainingErrors[index] : '',
                        validationErrors[index] !== undefined ? validationErrors[index] : '',
                    ].join(',') + '\n';
                });
            } else {
                a.download = results.graph.type + '.csv';
                content += 'idx,name,terr,verr,madd,pareto\n';
                results.data.forEach((job, index) => {
                    const costAndErrors = new ResultsUtils.JobCostAndErrors(job);
                    content += [
                        index.toString(),
                        job.job_name,
                        costAndErrors.training(''),
                        costAndErrors.validationBest(''),
                        costAndErrors.cost(''),
                        (job.pareto_optimal ? 1 : 0).toString(),
                    ].join(',') + '\n';
                });
            }
            const blob = new Blob([content], {'type': 'text/csv'});
            const blobURL = window.URL.createObjectURL(blob);
            a.href = blobURL;
            a.click();
        },
    },
});

const ResultContentMain = Vue.extend({
    props: {currentGraph: Object},
    template: `
        <div class="result-content-main">
            <result-contents-main-graphs id="main-graphs-area" :current-graph="currentGraph" @zoom-value="value => $emit('zoom-value', value)" />
        </div>
    `,
    components: {
        'result-contents-main-graphs': ResultContentMainGraphs,
    },
});

const TrainingGraphActionBar = Vue.extend({
    props: {currentGraph: Object},
    template: `
        <div class="action-bar">
            <nnc-radio v-model="graph.type" choice="Learning Curve" />
            <nnc-radio v-model="graph.type" choice="Trade-off Graph" />
            <span>
                <select v-model="graph.trade_off_type" @change="changeTradeOffType">
                    <option v-for="option in trade_off_types" v-bind:value="option">
                        {{ option }}
                    </option>
                </select>
            </span>
            <nnc-radio :value="graph.scale" @input="onGraphScaleChanged" choice="linear" label="Liner Scale" />
            <nnc-radio :value="graph.scale" @input="onGraphScaleChanged" choice="log"    label="Log Scale" />
            <div class="pull-right">
                <nnc-zoom-box :percentages="currentGraph.percentages" :percentage="currentGraph.percentage" @zoom-value="value => $emit('zoom-value', value)" />
            </div>
        </div>
    `,
    data: function() {
        return {
            graph: results.graph,
            trade_off_types: [
                'All',
                'Previous',
                'Pareto Only',
            ],
        };
    },
    methods: {
        changeTradeOffType: function() {
            tradeOffGraph.tradeOff();
        },
        onGraphScaleChanged: function(value) {
            this.graph.scale = value;
            ResultsUtils.reloadGraphs();
        },
    },
});

export default {
    props: {zoomInfo: Object},
    data: function() {
        return results;
    },
    components: {
        'result-content-main-header': ResultContentMainHeader,
        'action-bar': TrainingGraphActionBar,
        'result-content-main': ResultContentMain,
        'result-content-log': ResultContentLogVue,
    },
};
</script>

<style>
.result-content-main {
    width: 100%;
}

.legend {
    margin-left: 50px;
}
.legend-item {
    margin-right: 32px;
}
input {
    margin-right: 0px;
}
.legend-item > .checkbox-label > .checkbox-label-span {
    padding: 0;
    margin-right: 15px;
}
.legend-label-cost {
    border-top: solid 1px var(--color-brand);
}
.legend-label-training {
    border-top: solid 1px var(--color-system1);
}
.legend-label-validation {
    border-top: dashed 1px var(--color-system1);
}
.legend-trade-off {
    color: var(--color-system1);
}
.y.grid.trade-off line {
    stroke: rgba(255,102,102,0.20);
}
.x.grid.trade-off line {
    stroke: var(--color-gray1);
}
input[type="number"].no-spin-buttons::-webkit-outer-spin-button,
input[type="number"].no-spin-buttons::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"].no-spin-buttons {
    -moz-appearance: textfield;
}
</style>
