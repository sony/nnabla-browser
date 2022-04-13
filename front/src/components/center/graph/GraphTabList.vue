<template>
  <div class="graph-tab-list">
    <graph-tab
      v-for="(graph, index) in graphs"
      :key="index"
      :graph="graph"
      :index="index"
      :selected="index === activeGraphIndex"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Graph } from '@/types/graph'
import GraphTab from '@/components/center/graph/GraphTab.vue'

export default Vue.extend({
  components: {
    'graph-tab': GraphTab
  },
  props: {
    activeGraphIndex: {
      type: Number,
      required: true
    },
    graphs: {
      type: Array as PropType<Graph[]>,
      required: true
    }
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
