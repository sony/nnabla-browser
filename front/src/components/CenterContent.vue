<template>
  <div
    id="centerContent"
    class="center-content"
  >
    <keep-alive>
      <graph
        v-if="selectedEditTab"
        :history-info="historyInfo"
        @history="command => $emit('history', command)"
      />
      <monitoring v-else-if="selectedMonitoringTab" :charts="charts"/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { ChartData } from '@/types/store'
import MonitoringComponent from '@/components/center/Monitoring.vue'
import NetworkComponent from '@/components/center/GraphViewer.vue'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'

export default Vue.extend({
  components: {
    graph: NetworkComponent,
    monitoring: MonitoringComponent
  },
  props: {
    historyInfo: {
      type: Object,
      default: Object
    },
    zoomInfo: {
      type: Object,
      default: Object
    }
  },
  computed: {
    // todo: change to ":is" binding from this rule base switching after re-implementing history and zoom
    selectedEditTab: function (): boolean {
      return String(this.$store.state.editor.activeTabName) === 'graph'
    },
    selectedMonitoringTab: function (): boolean {
      return String(this.$store.state.editor.activeTabName) === 'monitoring'
    },
    charts: function (): ChartData[] {
      return chartInfoState.charts
    }
  }
})
</script>

<style>
.center-content {
  width: 84%;
  height: 100%;
  border-right: solid 1px var(--color-gray2);
  background-color: var(--color-gray0);
}
</style>
