<template>
    <div class="jobs-area app-row app-col" @contextmenu="open_menu('', $event)">
        <div id="training-results" class="training-results app-row app-col app-scroll-x app-scroll-y">
            <div v-for="result in results.data" :key="result.job_id" href="#" class="result nnc-invoker" @click="changeActive(result)" @contextmenu.stop="open_menu(result, $event)">
                <div :class="['job', results.active !== -1 && result.job_id === results.data[results.active].job_id ? 'active': '']">
                    <div class="job-content">
                        <div class="job-top">
                            <div class="job-top-image-btn">
                                <img src="../../../image/Etc.svg" class="job-top-image nnc-enabled nnc-invoker" @click="open_menu(result, $event, 'dropdown')" />
                            </div>
                            <div class="job-headline">
                                <canvas :data-id="'job-progress-' + [ result.job_id ]"></canvas>
                                <div class="job-title" :data-id="[ result.id ]">{{ result.job_name }}</div>
                                <div class="job-status">{{ showUiState(result.type, result.status) }}</div>
                            </div>
                        </div>
                        <div class="job-property">
                            <div class="job-property-name">
                                <p>Training</p>
                                <p>Validation</p>
                                <p>Best Validation</p>
                                <p>Multiply Add</p>
                            </div>
                            <div class="job-property-value" v-if="result.train_status && result.type !== 'profile'">
                                <p>{{ showError((result.train_status.last || {}).train_error) }}</p>
                                <p>{{ showError((result.train_status.last || {}).valid_error) }}</p>
                                <p>{{ showError((result.train_status.best || {}).valid_error) }}@{{ (result.train_status.best || {}).epoch }}</p>
                                <p>{{ result.train_status.cost_multiply_add ? result.train_status.cost_multiply_add : '' }}</p>
                            </div>
                        </div>
                        <div class="job-compare" v-if="result.status != 'queued' && result.status != 'preprocessing' && result.type !== 'profile'">
                            <nnc-checkbox label="Comparison" :value="result.job_id === results.graph.comparison_id" @input="checkedBox(result.job_id)" />
                            <span v-if="result.pareto_optimal" class="pareto-optimal">Pareto Optimal</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="load-more nnc-invoker" @click="loadMore" v-if="results.data.length && results.data.length < results.metadata.total">
                <img src="../../../image/Load.svg" class="nnc-enabled" :class="[isLoading ? 'loading' : '']" />Load More
            </div>
        </div>
        <context-menu ref="context_menu" :menuItems="menu_items">
        </context-menu>
    </div>
</template>

<script>
import EditorUtils from './../../EditorUtils';
import Definitions from './../../misc/Definitions';
import Vue from 'vue/dist/vue.esm.js';

export default {
    data: function() {
        return {
            results: results,
            selected_result: '',
            result_menu_items: [
                {type: 'action', text: 'Download', action: this.download},
                {type: 'action', text: 'Rename', action: this.rename},
                {type: 'separator'},
                {type: 'action', text: 'Open Learning Curve for Comparison', action: this.open_comparison},
                {type: 'action', text: 'Clear Learning Curve for Comparison', action: this.clear_comparison},
                {type: 'separator'},
                {type: 'action', text: Definitions.strings.menu_retrain_not_in_place, action: this.retrain_not_in_place},
                {type: 'action', text: 'Suspend', action: this.suspendLearning},
                {type: 'action', text: 'Resume', action: this.resumeJob},
                {type: 'separator'},
                {type: 'action', text: Definitions.strings.menu_training_extract_network, action: this.open_network},
                {type: 'action', text: Definitions.strings.menu_training_extract_network_w_weight, action: this.open_network_with_weight},
                {type: 'separator'},
                {type: 'action', text: 'Delete', action: this.delete_confirm},
                {type: 'action', text: 'Delete All Incomplete  Results', action: this.delete_all_incompletes},
            ],
            nontarget_menu_items: [
                {type: 'action', text: 'Download', disabled: true},
                {type: 'action', text: 'Rename', disabled: true},
                {type: 'separator'},
                {type: 'action', text: 'Open Learning Curve for Comparison', disabled: true},
                {type: 'action', text: 'Clear Learning Curve for Comparison', action: this.clear_comparison},
                {type: 'separator'},
                {type: 'action', text: Definitions.strings.menu_retrain_not_in_place, disabled: true},
                {type: 'action', text: 'Suspend', disabled: true},
                {type: 'action', text: 'Resume', disabled: true},
                {type: 'separator'},
                {type: 'action', text: Definitions.strings.menu_training_extract_network, disabled: true},
                {type: 'action', text: Definitions.strings.menu_training_extract_network_w_weight, disabled: true},
                {type: 'separator'},
                {type: 'action', text: 'Delete', disabled: true},
                {type: 'action', text: 'Delete All Incomplete  Results', action: this.delete_all_incompletes},
            ],
            isLoading: false,
        };
    },
    mounted: function() {
        this.updateProgressIcons();
    },
    beforeUpdate: function() {
        this.updateProgressIcons();
    },
    computed: {
        menu_items: function() {
            return this.selected_result ? this.result_menu_items : this.nontarget_menu_items;
        },
    },
    methods: {
        showError: function(error) {
            return error !== undefined ? error.toFixed(6) : '-';
        },
        changeActive: function(_result) {
            ResultsUtils.changeActive(_result.job_id);
        },
        select_result: function(result) {
            this.selected_result = result;
        },
        open_menu: function(result, event, type) {
            event.preventDefault();
            if ((result && result != 'active') || (result == 'active' && ResultsUtils.getActiveResult() ) ) {
                if (result == 'active') {
                    result = ResultsUtils.getActiveResult();
                }
                const itemSuspend = this.result_menu_items.find((menuItem) => menuItem.text == 'Suspend');
                const suspendable_ = (state) => ['queued', 'preprocessing', 'processing'].includes(state);
                if (itemSuspend) itemSuspend.disabled = !suspendable_(result.status);
                this.result_menu_items.find((menuItem) => menuItem.text === 'Resume').disabled = result.status !== 'suspended';
                this.result_menu_items.find((menuItem) => menuItem.text === 'Download').disabled = result.type === 'profile' || result.status !== 'finished' || !result.train_status;
                this.result_menu_items.find((menuItem) => menuItem.text === Definitions.strings.menu_retrain_not_in_place).disabled = ['queued', 'preprocessing'].includes(result.status);
                this.result_menu_items.find((menuItem) => menuItem.text === Definitions.strings.menu_training_extract_network).disabled = ['queued', 'preprocessing'].includes(result.status);
                this.result_menu_items.find((menuItem) => menuItem.text === Definitions.strings.menu_training_extract_network_w_weight).disabled = ['queued', 'preprocessing'].includes(result.status);
            } else {
                result = '';
            }
            this.select_result(result);
            const params = {'parent': this, 'event': event};
            if (type == 'dropdown') {
                const el = document.elementFromPoint(event.clientX, event.clientY);
                params.point = {
                    x: el.x,
                    y: el.y + el.height,
                };
            }
            this.$refs.context_menu.$emit('open', params);
            this.changeActive(result);
        },
        download: function() {
            EditorUtils.callApi({
                url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs/' + ResultsUtils.getActiveResult().job_id + '/download',
                type: 'GET',
                dataType: 'json',
            }, (result) => {
                const a = document.createElement('a');
                a.href = result.download_url;
                a.click();
            }, (error, status, obj) => {
                if (error.responseJSON.error === 'SDEEP_STATUS_INCORRECT') {
                    window.nnc.components.Editor.popup('Failed to download', 'Can not download from a scheduled or runnning job.', [{name: 'OK'}]);
                } else {
                    EditorUtils.handleXhrFailure(error, status, obj);
                }
            });
        },
        rename: function() {
            window.nnc.components.Editor.prompt(
                'Input new result name',
                this.selected_result.job_name,
                [{name: 'Cancel'}, {name: 'OK', action: (newName) => {
                    if (newName) {
                        EditorUtils.callApi({
                            url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs/' + ResultsUtils.getActiveResult().job_id + '/job_name',
                            type: 'PUT',
                            data: JSON.stringify({job_name: newName}),
                            contentType: 'application/json',
                            dataType: 'json',
                        }, (result) => {
                            this.selected_result.job_name = newName;
                        }, EditorUtils.handleXhrFailure);
                    }
                }}]);
        },
        open_comparison: function() {
            results.graph.comparison_id = this.selected_result.job_id;
        },
        clear_comparison: function() {
            results.graph.comparison_id = '';
        },
        suspendLearning: function() {
            EditorUtils.callApi({
                url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs/' + ResultsUtils.getActiveResult().job_id + '/suspend',
                type: 'POST',
                dataType: 'json',
            }, undefined, EditorUtils.handleXhrFailure);
        },
        resumeJob: (() => {
            const _calcPostObject = (job) => {
                const data = {type: job.type};
                if (job.type === 'evaluate') {
                    try {
                        const datasetForEvaluation = configs.data.find((config) => config.name === 'valid_error').dataset;
                        const dataset = datasets.data.find((dataset) => dataset.name === datasetForEvaluation);
                        Object.assign(data, {evaluation_dataset_id: dataset.id});
                    } catch (e) {
                        console.error(e);
                        window.nnc.components.Editor.popup('Dataset not found', 'Specified dataset might have been deleted.', [{name: 'OK'}]);
                        throw (e);
                    }
                }
                return data;
            };
            return function() {
                const activeJob = ResultsUtils.getActiveResult();
                EditorUtils.callApi({
                    url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs/' + activeJob.job_id + '/resume',
                    type: 'POST',
                    data: JSON.stringify(_calcPostObject(activeJob)),
                    contentType: 'application/json',
                    dataType: 'json',
                }, (result) => {
                    this.$emit('fetch-results', () => {
                        Object.assign(activeJob, result);
                        ResultsUtils.setPollingForTrainResult(activeJob);
                        ResultsUtils.changeActive(activeJob.job_id);
                    });
                }, EditorUtils.showPopupIfJobExceedsTimeLimitOrHandleAsDefaultFailureFor(activeJob.type));
            };
        })(),
        retrain_not_in_place: function() {
            window.nnc.components.Editor.isLoadEnd = false;
            ResultsUtils.getTrainResult(ResultsUtils.getActiveResult().job_id, () => {
                window.nnc.components.Editor.isLoadEnd = true;
                this.$emit('trigger-job', 'retrainNotInPlace');
            });
        },
        open_network: function() {
            const _job = ResultsUtils.getActiveResult();
            window.nnc.components.Editor.isLoadEnd = false;
            ResultsUtils.getTrainResult(_job.job_id, (result) => {
                this._openNetworksInEditor(JSON.parse(result.configuration).networks);
                window.nnc.components.Editor.isLoadEnd = true;
            });
        },
        open_network_with_weight: function() {
            const _job = ResultsUtils.getActiveResult();
            window.nnc.components.Editor.isLoadEnd = false;
            ResultsUtils.getTrainResult(_job.job_id, (result) => {
                EditorUtils.completeWeightParameter(JSON.parse(result.configuration), _job.job_id, this._openNetworksInEditor);
                window.nnc.components.Editor.isLoadEnd = true;
            });
        },
        _openNetworksInEditor: function(networks) {
            EditorUtils.load(networks);
            nnc.editor.activeTabName = 'EDIT';
        },
        delete_confirm: function() {
            const deleteJob = ResultsUtils.getActiveResult();
            window.nnc.components.Editor.popup(
                'Confirm', 'Do you really want to delete ' + deleteJob.job_name + '?',
                [{name: 'Cancel'}, {name: 'OK', action: () => {
                    this._delete(deleteJob.job_id);
                }}]);
        },
        delete_all_incompletes: function() {
            window.nnc.components.Editor.popup(
                'Confirm', 'Do you really want to delete all incomplete results?',
                [{name: 'Cancel'}, {name: 'OK', action: () => {
                    results.data
                        .filter((result) => result.status === 'failed')
                        .forEach((job) => {
                        this._delete(job.job_id);
                    });
                }}]);
        },
        _delete: function(jobId) {
            EditorUtils.callApi({
                url: Definitions.CORE_API.usersUrl() + '/projects/' + nnc.editor.projectId + '/jobs/' + jobId,
                type: 'DELETE',
                dataType: 'json',
            }, (result) => {
                const index = results.data.findIndex((result) => result.job_id == jobId);
                if (index >= 0) {
                    results.deletedJobs.push(jobId);
                    results.data.splice(index, 1);
                }
                const newIndex = Math.min(index, results.data.length - 1);
                ResultsUtils.changeActive((results.data[newIndex] || {}).job_id);
            }, EditorUtils.handleXhrFailure);
        },
        showUiState: function(type, state) {
            switch (type + '_' + state) {
                case 'profile_queued':
                case 'train_queued':
                case 'evaluate_queued':
                    return 'Scheduled';

                case 'profile_preprocessing':
                    return 'BeforeProfiling';
                case 'train_preprocessing':
                    return 'BeforeTraining';
                case 'evaluate_preprocessing':
                    return 'BeforeEvaluating';

                case 'profile_processing':
                    return 'Profiling';
                case 'train_processing':
                    return 'Training';
                case 'evaluate_processing':
                    return 'Evaluating';

                case 'profile_finished':
                case 'train_finished':
                    return '';
                case 'evaluate_finished':
                    return 'Evaluated';

                case 'profile_suspended':
                case 'train_suspended':
                case 'evaluate_suspended':
                    return 'Suspended';

                case 'profile_failed':
                case 'train_failed':
                case 'evaluate_failed':
                    return 'Incomplete';

                default:
                    return 'Error'; // for development
            }
        },
        updateProgressIcons: (() => {
            const evaluatedIcon = new Image();
            evaluatedIcon.src = './editor/image/CheckWhite.svg';
            const _drawProgressIcon = (result) => {
                const elm = document.querySelector('[data-id="job-progress-' + result.job_id + '"]');
                if (elm) {
                    const context = elm.getContext('2d');
                    context.canvas.width = 24;
                    context.canvas.height = 24;
                    let progress;
                    let chartType;
                    let drawOverlayIcon;
                    const status = result.status;
                    if (status === 'finished') {
                        progress = 100;
                        chartType = 'pie';
                        if (result.type === 'evaluate') {
                            drawOverlayIcon = (context) => context.drawImage(evaluatedIcon, 0, 0, 24, 24);
                        }
                    } else {
                        const epoch = (((result.train_status || {}).epoch) || {current: 0, max: 1});
                        progress = Math.round(100 * epoch.current / (epoch.max || 1));
                        chartType = 'doughnut';
                    }

                    new Chart(context, {
                        type: chartType,
                        data: {
                            labels: ['progress', 'remaining'],
                            datasets: [{
                                backgroundColor: ['#006699', ['suspended', 'failed'].includes(status) ? '#c0c0c0' : '#b0c4de'],
                                data: [progress, 100 - progress],
                            }],
                        },
                        options: {
                            animation: {duration: 0},
                            elements: {arc: {borderWidth: 0}},
                            tooltips: false,
                            responsive: false,
                            legend: {display: false},
                            hover: {mode: null},
                        },
                    });

                    // 評価が完了している場合、Chartの上にチェックマークを表示する
                    (drawOverlayIcon || ((context) => undefined))(context);
                }
            };
            return function() {
                if (!evaluatedIcon.complete) {
                    Vue.nextTick(() => this.updateProgressIcons());
                } else {
                    this.results.data.forEach(_drawProgressIcon);
                }
            };
        })(),
        loadMore: function() {
            if (!this.isLoading) {
                this.isLoading = true;
                this.$emit('fetch-results', () => this.isLoading = false, results.data.length);
            }
        },
        checkedBox: function(jobId) {
            results.graph.comparison_id = results.graph.comparison_id !== jobId ? jobId : '';
        },
    },
};
</script>

<style>
.job.active {
    background-color: var(--color-gray0);
}
.job:hover {
    background-color: var(--color-gray0);
}
.job-content {
    height: 100%;
    border-bottom: solid 1px var(--color-gray3);
    margin: 0px 16px;
    padding: 16px 0px;
    word-wrap: break-word;
}

.job-title {
    font-family: "SSTUI-Medium";
    font-size: 13px;
    color: var(--color-gray5);
    line-height: 13px;
    margin-left: 30px;
}
.job-status {
    opacity: 0.5;
    font-size: 13px;
    color: var(--color-brand);
    line-height: 13px;
    margin-left: 30px;
}
.job-top {
    clear: both;
}
.job-headline {
    width: 100%;
}
.job-top-image-btn {
    letter-spacing: 5px;
    float: right;
}
.job-top-image {
    width: 24px;
    height: 24px;
}
.job-property {
    margin-top: 5px;
    min-height: 80px;
    clear: both;
}
.job-property-name {
    width: 104px;
    letter-spacing: 0;
    float: left;
}
.job-property-value {
    width: 45%;
    letter-spacing: 0;
    float: left;
}
.job-property-name > p {
    color: var(--color-gray4);
    line-height: 20px;
    margin: 0;
}
.job-property-value > p {
    color: var(--color-gray5);
    line-height: 20px;
    margin: 0;
    width: 125px;
}
.job-compare {
    margin: 0px 6px;
    height: 15%;
    clear: both;
}
.pareto-optimal {
    font-size: 13px;
    color: var(--color-brand);
    line-height: 13px;
}

.image-btn {
    border-style: none;
}

canvas[data-id^='job-progress-'] {
    position: absolute;
}

.load-more {
    padding: 18px 20px 18px 20px;
}
.load-more:hover {
    background-color: var(--color-gray0);
}
.load-more > img {
    width: 16px;
    margin-right: 12px;
}
.load-more > img.loading {
    animation: rotate-anime 1s linear infinite;
}
@keyframes rotate-anime {
    0% {transform: rotate(0);}
    100% {transform: rotate(360deg);}
}
</style>
