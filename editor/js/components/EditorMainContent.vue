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
    import MonitoringCenterContent from './Monitoring/CenterContent';
    import NetworkCenterContent from './Network/NetworkEditor.vue';

    export default {
        props: {
            historyInfo: Object,
            zoomInfo: Object
        },
        components: {
            'left-content': {
                template: `
                    <div class="left-content" id="leftContent">
                        <component
                        @selected-layer="name => $emit('selected-layer', name)"
                        @trigger-job="value => $emit('trigger-job', value)"
                        @history="command => $emit('history', command)"
                        />
                    </div>`,
                components: {
                    'component': LeftContent,
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
                        </keep-alive>
                    </div>`,
                components: {
                    'edit-network-graph': NetworkCenterContent,
                    'monitoring-result': MonitoringCenterContent,
                },
                computed: {
                    selectedEditTab: function () {
                        return this.$store.state.editor.activeTabName === 'graph';
                    },
                    selectedMonitoringTab: function () {
                        return this.$store.state.editor.activeTabName === "monitoring";
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
