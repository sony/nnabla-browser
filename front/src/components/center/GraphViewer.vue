<template>
  <div class="graph-container">
    <graph-tab-list
      :active-graph-index="activeGraphIndex"
      :graphs="graphs"
    />
    <div class="tab-content network-editor-scroller">
      <svg-area
        :active-graph="activeGraph"
        :prev-graph="prevGraph"
        :is-dragging="isDragging"
        :assist-area-size="assistAreaSize"
        :nntxt-path="nntxtPath"
        :nnabla-functions="nnablaFunctions"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Graph } from '@/types/graph'
import GraphTabList from '@/components/center/graph/GraphTabList.vue'
import { RawFunction } from '@/types/nnablaApi'
import SvgArea from '@/components/center/graph/SvgArea.vue'
import { Vector2D } from '@/types/geometry'

export default Vue.extend({
  components: {
    'graph-tab-list': GraphTabList,
    'svg-area': SvgArea
  },
  props: {
    activeGraph: {
      type: Object as PropType<Graph>,
      required: true
    },
    prevGraph: {
      type: Object as PropType<Graph>,
      required: true
    },
    isDragging: {
      type: Boolean,
      required: true
    },
    assistAreaSize: {
      type: Object as PropType<Vector2D>,
      required: true
    },
    activeGraphIndex: {
      type: Number,
      required: true
    },
    graphs: {
      type: Object as PropType<Graph[]>,
      required: true
    },
    nntxtPath: {
      type: String,
      required: true
    },
    nnablaFunctions: {
      type: Array as PropType<RawFunction[]>,
      default: []
    }
  }
})
</script>

<style>
.graph-container {
  height: 100%;
}

#network-editor {
  display: block;
}

.network-editor-scroller {
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.layer-properties-scroller {
  overflow: auto;
  width: 100%;
}

.network-statistics-scroller {
  overflow: auto;
  width: 100%;
}
</style>
