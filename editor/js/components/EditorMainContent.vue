<template>
    <div class="main-content">
        <left-content
                :active-tab-name="activeTabName"
                :selected-layer="selectedLayer"
                :directory-info="directoryInfo"
                :chart-info="chartInfo"
                :graph-info="graphInfo"
                @renamed="changes => $emit('renamed', changes)"
                @selected-layer="name => $emit('selected-layer', name)"
                @trigger-job="value => $emit('trigger-job', value)"
                @fetch-results="(callback, offset) => $emit('fetch-results', callback, offset)"
                @history="command => $emit('history', command)"
        />
        <center-content
                :active-tab-name="activeTabName"
                :selected-layer="selectedLayer"
                :history-info="historyInfo"
                :zoom-info="zoomInfo"
                :directory-info="directoryInfo"
                :chart-info="chartInfo"
                :graph-info="graphInfo"
                @history="command => $emit('history', command)"
                @zoom="operation => $emit('zoom', operation)"
        />
    </div>
</template>

<script>
    import LeftContent from './LeftComponent/LeftContent';
    import MonitoringCenterContent from './Monitoring/CenterContent';
    import NetworkCenterContent from './Network/NetworkEditor.vue';

    export default {
        props: {
            activeTabName: String,
            selectedLayer: Object,
            historyInfo: Object,
            zoomInfo: Object,
            directoryInfo: Object,
            chartInfo: Array,
            graphInfo: Object
        },
        components: {
            'left-content': {
                props: [
                    'activeTabName', 'selectedLayer',
                    "directoryInfo", "chartInfo", "graphInfo"
                ],
                template: `
            <div class="left-content" id="leftContent">
                <component
                :selected-layer="selectedLayer"
                :activeTabName="activeTabName"
                :directory-info="directoryInfo"
                :chart-info="chartInfo"
                :graph-info="graphInfo"
                @selected-layer="name => $emit('selected-layer', name)"
                @renamed="changes => $emit('renamed', changes)"
                @trigger-job="value => $emit('trigger-job', value)"
                @fetch-results="(callback, offset) => $emit('fetch-results', callback, offset)"
                @history="command => $emit('history', command)"
                />
            </div>
        `,
                components: {
                    'component': LeftContent,
                },
            },
            'center-content': {
                props: {
                    activeTabName: String,
                    selectedLayer: Object,
                    historyInfo: Object,
                    zoomInfo: Object,
                    directoryInfo: Object,
                    chartInfo: Array,
                    graphInfo: Object
                },
                template: `
            <div class="center-content" id="centerContent">
                <keep-alive>
                    <edit-network-graph v-if="selectedEditTab"
                        :selected-layer="selectedLayer"
                        :history-info="historyInfo"
                        :network-graph="zoomInfo.networkGraph"
                        :directory-info="directoryInfo"
                        :graph-info="graphInfo"
                        @history="command => $emit('history', command)"
                        @zoom="operation => $emit('zoom', operation)"
                    />
                    <monitoring-result v-else-if="selectedMonitoringTab" :chart-info="chartInfo" />
                </keep-alive>
            </div>
        `,
                components: {
                    'edit-network-graph': NetworkCenterContent,
                    'monitoring-result': MonitoringCenterContent,
                },
                computed: {
                    selectedEditTab: function () {
                        return this.activeTabName === 'edit';
                    },
                    selectedMonitoringTab: function () {
                        return this.activeTabName === "monitoring";
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
    };
</script>

<style>
    .left-content {
        position: relative;
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

</style>
