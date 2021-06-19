<template>
  <div
    id="centerContent"
    class="center-content"
  >
    <keep-alive>
      <graph
        v-if="selectedEditTab"
        :activeGraph="activeGraph"
        :prevGraph="prevGraph"
        :isDragging="isDragging"
        :assistAreaSize="assistAreaSize"
        :activeGraphIndex="activeGraphIndex"
        :graphs="graphs"
        :nntxtPath="nntxtPath"
      />
      <monitoring v-else-if="selectedMonitoringTab" :charts="charts"/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { ChartData } from '@/types/store'
import { Graph } from '@/types/graph'
import MonitoringComponent from '@/components/center/Monitoring.vue'
import GraphViewer from '@/components/center/GraphViewer.vue'
import Vue from 'vue'
import { Vector2D } from '@/types/geometry'
import chartInfoState from '@/store/modules/chartInfo'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  components: {
    graph: GraphViewer,
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
    },
    graphs: function (): Graph[] {
      return graphInfoState.graphs
    },
    activeGraphIndex: function (): number {
      return graphInfoState.activeIndex.graph
    },
    nntxtPath: function (): string {
      return graphInfoState.nntxtPath
    },
    activeGraph: function (): Graph {
      return graphInfoState.activeGraph
    },
    prevGraph: function (): Graph {
      return graphInfoState.prevGraph
    },
    isDragging: function (): boolean {
      return graphInfoState.isDragging
    },
    assistAreaSize: function (): Vector2D {
      return graphInfoState.assistAreaSize
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
