<template>
  <div class="graph-tab-list">
    <graph-tab
      v-for="(graph, index) in graphs"
      :key="path + '-' + index"
      :graph="graph"
      :index="index"
      :selected="index === activeGraphIndex"
    />
  </div>
</template>

<script lang="ts">
import { Graph } from '@/types/graph'
import GraphTab from '@/components/center/graph/GraphTab.vue'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    activeGraphIndex: { type: Number },
    graphs: { type: Object as PropType<Graph[]> }
  },
  components: {
    'graph-tab': GraphTab
  }
})
</script>

<style>
.graph-tab-list {
  width: 100%;
  height: 41px;
  border-bottom: solid 1px var(--color-gray2);
  overflow: auto;
}
</style>
