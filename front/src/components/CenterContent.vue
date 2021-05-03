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
      <monitoring v-else-if="selectedMonitoringTab" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import MonitoringComponent from '@/components/center/Monitoring.vue'
import NetworkComponent from '@/components/center/GraphViewer.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    graph: NetworkComponent,
    monitoring: MonitoringComponent
  },
  props: {
    historyInfo: {},
    zoomInfo: {}
  },
  computed: {
    // todo: change to ":is" binding from this rule base switching after re-implementing history and zoom
    selectedEditTab: function () {
      return String(this.$store.state.editor.activeTabName) === 'graph'
    },
    selectedMonitoringTab: function () {
      return String(this.$store.state.editor.activeTabName) === 'monitoring'
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
