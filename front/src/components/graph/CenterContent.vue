<template>
  <div
    id="centerContent"
    class="center-content"
  >
    <keep-alive>
      <graph
        :active-graph="activeGraph"
        :prev-graph="prevGraph"
        :is-dragging="isDragging"
        :assist-area-size="assistAreaSize"
        :active-graphindex="activeGraphIndex"
        :graphs="graphs"
        :nntxt-path="nntxtPath"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Graph } from '@/types/graph'
import GraphViewer from '@/components/center/GraphViewer.vue'
import { Vector2D } from '@/types/geometry'
import Vue from 'vue'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  components: {
    graph: GraphViewer
  },
  computed: {
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
