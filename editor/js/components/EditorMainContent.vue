<template>
    <div class="main-content">
        <left-content
                @selected-layer="name => $emit('selected-layer', name)"
                @trigger-job="value => $emit('trigger-job', value)"
                @history="command => $emit('history', command)"
        />
        <center-content
                :history-info="historyInfo"
                :zoom-info="zoomInfo"
                @history="command => $emit('history', command)"
                @zoom="operation => $emit('zoom', operation)"
        />
    </div>
</template>

<script>
    import LeftContent from './LeftComponent/LeftContent';
    import MonitoringComponent from './CenterComponent/Monitoring';
    import NetworkComponent from './CenterComponent/NetworkEditor';
    import CsvResultComponent from './CenterComponent/CsvResult';

    export default {
        props: {
            historyInfo: Object,
            zoomInfo: Object
        },
        components: {
            'left-content': {
                template: `
                    <div class="left-content" id="leftContent">
                        <left-content
                        @trigger-job="value => $emit('trigger-job', value)"
                        @history="command => $emit('history', command)"
                        />
                    </div>`,
                components: {
                    'left-content': LeftContent,
                },
            },
            'center-content': {
                props: {
                    historyInfo: Object,
                    zoomInfo: Object
                },
                template: `
                    <div class="center-content" id="centerContent">
                        <keep-alive>
                            <edit-network-graph v-if="selectedEditTab"
                                :history-info="historyInfo"
                                :network-graph="zoomInfo.networkGraph"
                                @history="command => $emit('history', command)"
                                @zoom="operation => $emit('zoom', operation)"
                            />
                            <monitoring-result v-else-if="selectedMonitoringTab" />

                            <csv-result v-else-if="selectedCsvResultTab" />
                        </keep-alive>
                    </div>`,
                components: {
                    'edit-network-graph': NetworkComponent,
                    'monitoring-result': MonitoringComponent,
                    'csv-result': CsvResultComponent
                },
                computed: {
                    // todo: change to ":is" binding from this rule base switching after re-implementing history and zoom
                    selectedEditTab: function () {
                        return String(this.$store.state.editor.activeTabName) === 'graph';
                    },
                    selectedMonitoringTab: function () {
                        return String(this.$store.state.editor.activeTabName) === "monitoring";
                    },
                    selectedCsvResultTab: function () {
                        return String(this.$store.state.editor.activeTabName) === "result";
                    },
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
