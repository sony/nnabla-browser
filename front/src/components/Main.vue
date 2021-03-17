<template>
    <div class="main-content">
        <LeftMenu/>
        <center-content
                :history-info="historyInfo"
                @history="command => $emit('history', command)"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LeftMenu from '@/components/left/LeftMenu.vue'
import MonitoringComponent from '@/components/center/Monitoring.vue'
import NetworkComponent from '@/components/center/GraphViewer.vue'

export default Vue.extend({
  props: {
    historyInfo: Object,
    zoomInfo: Object
  },
  components: {
    LeftMenu,
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
                                @history="command => $emit('history', command)"
                            />
                            <monitoring-result v-else-if="selectedMonitoringTab" />
                        </keep-alive>
                    </div>`,
      components: {
        'edit-network-graph': NetworkComponent,
        'monitoring-result': MonitoringComponent
      },
      computed: {
        // todo: change to ":is" binding from this rule base switching after re-implementing history and zoom
        selectedEditTab: function () {
          return String(this.$store.state.editor.activeTabName) === 'graph'
        },
        selectedMonitoringTab: function () {
          return String(this.$store.state.editor.activeTabName) === 'monitoring'
        },
        selectedCsvResultTab: function () {
          return String(this.$store.state.editor.activeTabName) === 'result'
        }
      }
    }
  }
})
</script>

<style>
    .left-content {
        position: relative;
        width: 15%;
        height: 100%;
        min-width: 280px;
        background-color: var(--color-gray1);
        border-right: solid 1px var(--color-gray2);
    }

    .center-content {
        width: 84%;
        height: 100%;
        border-right: solid 1px var(--color-gray2);
        background-color: var(--color-gray0);
    }

    div.main-content {
        display: flex;
    }

</style>
