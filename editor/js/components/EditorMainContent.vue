<template>
    <div class="main-content">
        <left-content
                :active-tab-name="activeTabName"
                :selection="selection"
                :selected-component="selectedComponent"
                @renamed="changes => $emit('renamed', changes)"
                @selected-component="name => $emit('selected-component', name)"
                @trigger-job="value => $emit('trigger-job', value)"
                @fetch-results="(callback, offset) => $emit('fetch-results', callback, offset)"
                @history="command => $emit('history', command)"
        />
        <center-content
                :active-tab-name="activeTabName"
                :selection="selection"
                :selected-component="selectedComponent"
                :history-info="historyInfo"
                :zoom-info="zoomInfo"
                @history="command => $emit('history', command)"
                @zoom="operation => $emit('zoom', operation)"
        />
        <right-content
                ref="rightContent"
                :jobs-in-queue="jobsInQueue"
                :posting-job="postingJob"
                :statistics="statistics"
                :visible-right-content="visibleRightContent"
                @trigger-job="value => $emit('trigger-job', value)"
                @statistics="value => $emit('statistics', value)"
        />
    </div>
</template>

<script>
    import ConfigLeft from './Config/ConfigLeft';
    import ConfigCenter from './Config/ConfigCenter';
    import MonitoringLeftContent from './Monitoring/LeftContent.vue';
    import TrainingResultDetailContentVue from './Results/TrainingResultDetailContent.vue';
    import EditNetworkOperationContentVue from './Network/EditNetworkOperationContent.vue';
    import EditLeftContentVue from './Network/EditLeftContent.vue';

    export default {
        props: {
            activeTabName: String,
            visibleRightContent: Boolean,
            selection: Object,
            selectedComponent: String,
            jobsInQueue: Boolean,
            postingJob: Boolean,
            statistics: Object,
            historyInfo: Object,
            zoomInfo: Object
        },
        components: {
            'left-content': {
                props: ['activeTabName', 'selection', 'selectedComponent'],
                template: `
            <div class="left-content">
                <component
                :is="listForEachTabRespectively"
                :selection="selection"
                :selected-component="selectedComponent"
                @selected-component="name => $emit('selected-component', name)"
                @renamed="changes => $emit('renamed', changes)"
                @trigger-job="value => $emit('trigger-job', value)"
                @fetch-results="(callback, offset) => $emit('fetch-results', callback, offset)"
                @history="command => $emit('history', command)"
                />
            </div>
        `,
                components: {
                    'edit-left': EditLeftContentVue,
                    'config-left': ConfigLeft,
                    'monitoring-left': MonitoringLeftContent,
                },
                computed: {
                    listForEachTabRespectively: function () {
                        return `${this.activeTabName}-left`;
                    },
                },
            },
            'center-content': {
                props: {
                    activeTabName: String,
                    selectedComponent: String,
                    selection: Object,
                    historyInfo: Object,
                    zoomInfo: Object,
                },
                template: `
            <div class="center-content">
                <keep-alive>
                    <edit-network-graph v-if="selectedEditTab"
                        :selected-component="selectedComponent"
                        :selection="selection"
                        :history-info="historyInfo"
                        :network-graph="zoomInfo.networkGraph"
                        @history="command => $emit('history', command)"
                        @zoom="operation => $emit('zoom', operation)"
                    />
                    <edit-hyper-params v-if="selectedConfigTab" />
                    <view-training-result v-if="selectedLearningCurve"
                        :zoom-info="zoomInfo.learningCurve"
                        @zoom-value="handleLearningCurveZooming"
                    />
                    <view-training-result v-if="selectedTradeOffGraph"
                        :zoom-info="zoomInfo.tradeOffGraph"
                        @zoom-value="handleTradeOffGraphZooming"
                    />
                </keep-alive>
            </div>
        `,
                data: function () {
                    return results;
                },
                components: {
                    'edit-network-graph': EditNetworkOperationContentVue,
                    'edit-hyper-params': ConfigCenter,
                    'view-training-result': TrainingResultDetailContentVue,
                },
                computed: {
                    selectedEditTab: function () {
                        return this.activeTabName === 'edit';
                    },
                    selectedConfigTab: function () {
                        return this.activeTabName === 'config';
                    },
                    selectedLearningCurve: function () {
                        return this.activeTabName === 'training' &&
                            this.graph.type === 'Learning Curve';
                    },
                    selectedTradeOffGraph: function () {
                        return this.activeTabName === 'training' &&
                            this.graph.type === 'Trade-off Graph';
                    },
                },
                methods: (() => {
                    const handleAs = (event, preprocess) => function (value) {
                        this.$emit(event, (preprocess || ((x) => x))(value));
                    };
                    const on = (name) => (x) => Object({name: name, percentage: x});
                    return {
                        handleLearningCurveZooming: handleAs('zoom', on('Learning Curve')),
                        handleTradeOffGraphZooming: handleAs('zoom', on('Trade-off Graph'))
                    };
                })(),
            },
            'right-content': {
                props: {jobsInQueue: Boolean, postingJob: Boolean, statistics: Object, visibleRightContent: Boolean},
                template: `
        <div class="right-content" v-if="visibleRightContent">
            <div class="job-action-control">
            </div>
            <div>
                <div class="title">Network Statistics</div>
                <div class="network-statistics-scroller nnc-invoker">
                    <div v-for="state in statistics.values"
                    :key="state.name"
                    :class="'stat-line' + (statistics.active === state ? ' active' : '')"
                    @click.prevent="$emit('statistics', state)"
                    ><div class="content"><div class="name">{{ state.name }}</div>{{ Number(state.sum).toLocaleString() }}</div>
                    </div>
                </div>
            </div>
        </div>
        `,
                components: {
                    'flat-button': {
                        props: {image: String, caption: String, disabled: Boolean},
                        template: `
                <div class="job-action-control-content">
                    <span v-if="disabled" class="nnc-disabled"><img :src="image" />{{ caption }}</span>
                    <span v-else class="nnc-enabled" @click.stop.prevent="$emit('pressed')"><img :src="image" />{{ caption }}</span>
                </div>
                `,
                    },
                },
                methods: {
                    evaluatable: () => results.evaluatable(),
                },
            },
        },
        mounted: function () {
            $('.left-content').resizable({
                handles: 'e',
                alsoResizeReverse: '.center-content',
                minWidth: 280,
            });
            $('.center-content').resizable({
                handles: 'e',
                alsoResizeReverse: '.right-content',
            });
        },
        methods: {
            showRightContent: function (visible) {
                this.visibleRightContent = visible;
            }
        }
    };
</script>

<style>
    .left-content {
        width: 280px;
        height: 100%;
        background-color: var(--color-gray1);
        float: left;
        border-right: solid 1px var(--color-gray2);
    }

    .center-content {
        height: 100%;
        float: left;
        border-right: solid 1px var(--color-gray2);
        background-color: var(--color-gray0);
    }

    .right-content {
        min-width: 280px;
        height: 100%;
        float: left;
        background-color: var(--color-gray0);
    }

    .job-action-control {
        width: 100%;
        height: 80px;
        border-bottom: solid 1px var(--color-gray2);
        overflow: hidden;
        padding: 0px 10px 0px 10px;
    }

    .job-action-control-content {
        float: left;
        width: 50%;
    }

    .job-action-control-text {
        font-family: "SSTUI-Medium";
        line-height: 40px;
        position: relative;
        z-index: 2;
        margin-left: -3px;
    }

    .job-action-control-content > span.nnc-enabled:hover {
        opacity: 0.5;
    }

    .job-action-control-content > span > img {
        width: 24px;
        height: 24px;
        margin: 6px 0px 10px 4px;
        vertical-align: middle;
    }
</style>
