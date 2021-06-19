<template>
  <div
    id="centerContent"
    class="center-content"
  >
    <keep-alive>
      <graph
        v-if="selectedEditTab"
        :active-graph="activeGraph"
        :prev-graph="prevGraph"
        :is-dragging="isDragging"
        :assist-area-size="assistAreaSize"
        :active-graphindex="activeGraphIndex"
        :graphs="graphs"
        :nntxt-path="nntxtPath"
      />
      <monitoring
        v-else-if="selectedMonitoringTab"
        :charts="charts"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { ChartData } from '@/types/store'
import { Graph } from '@/types/graph'
import GraphViewer from '@/components/center/GraphViewer.vue'
import MonitoringComponent from '@/components/center/Monitoring.vue'
import { Vector2D } from '@/types/geometry'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'
import globalState from '@/store/modules/globalInfo'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  components: {
    graph: GraphViewer,
    monitoring: MonitoringComponent
  },
  computed: {
    selectedEditTab: function (): boolean {
      return globalState.activeTabName === 'graph'
    },
    selectedMonitoringTab: function (): boolean {
      return globalState.activeTabName === 'monitoring'
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
