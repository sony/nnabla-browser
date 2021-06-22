<template>
  <center-content-base>
    <graph
      v-show="nnablaFunctions.length > 0"
      :active-graph="activeGraph"
      :prev-graph="prevGraph"
      :is-dragging="isDragging"
      :assist-area-size="assistAreaSize"
      :active-graph-index="activeGraphIndex"
      :graphs="graphs"
      :nntxt-path="nntxtPath"
      :nnabla-functions="nnablaFunctions"
    />
  </center-content-base>
</template>

<script lang="ts">
import { Graph } from '@/types/graph'
import GraphViewer from '@/components/center/GraphViewer.vue'
import { Vector2D } from '@/types/geometry'
import Vue from 'vue'
import graphInfoState from '@/store/modules/graphInfo'
import CenterContentBase from '@/components/CenterContentBase.vue'
import { RawFunction } from '@/types/nnablaApi'
import globalState from '@/store/modules/globalInfo'

export default Vue.extend({
  components: {
    'center-content-base': CenterContentBase,
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
    },
    nnablaFunctions: function (): RawFunction[] {
      return globalState.nnablaFunctions
    }
  }
})
</script>
