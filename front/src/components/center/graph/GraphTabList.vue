<template>
  <div class="graph-tab-list">
    <graph-tab
      v-for="(graph, index) in graphs"
      :graph="graph"
      :key="path + '-' + index"
      :index="index"
      :selected="index === activeGraphIndex"
      @history="command => $emit('history', command)"
    />
  </div>
</template>

<script lang="ts">
import GraphTab from '@/components/center/graph/GraphTab.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    'graph-tab': GraphTab
  },
  computed: {
    graphs: function () {
      return this.$store.state.graphInfo.graphs
    },
    path: function () {
      return this.$store.state.graphInfo.nntxtPath
    },
    activeGraphIndex: function () {
      return this.$store.state.graphInfo.activeIndex.graph
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
