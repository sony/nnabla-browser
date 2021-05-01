<template>
<div class="center-content" id="centerContent">
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
import Vue from 'vue'
import MonitoringComponent from '@/components/center/Monitoring.vue'
import NetworkComponent from '@/components/center/GraphViewer.vue'

export default Vue.extend({
  props: {
    historyInfo: Object,
    zoomInfo: Object
  },
  components: {
    graph: NetworkComponent,
    monitoring: MonitoringComponent
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
