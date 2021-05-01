<template>
  <div class="graphs-tab nnc-invoker" @click="clicked">
    <span class="graph-name">{{ graph.name }}</span>
  </div>
</template>

<script lang="ts">
import { Graph } from '@/store/types'
import Vue from 'vue'

interface GraphTabProps {
  graph: Graph;
  index: number;
}

export default Vue.extend<{}, {}, {}, GraphTabProps>({
  props: {
    graph: Object,
    index: Number
  },
  methods: {
    clicked: function () {
      this.$store.commit('setActiveGraphIndex', this.index)
    },
    keydown: (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 27:
        case 13:
          ;(e.target as HTMLElement).blur()
          break
        default:
          break
      }
    }
  }
})
</script>

<style>
.graphs-tab {
  float: left;
  height: 39px;
  line-height: 39px;
  padding-right: 8px;
}

.graphs-tab.active {
  box-sizing: border-box;
  border-bottom: solid 2px var(--color-brand);
}

.graphs-tab.active > span > .graph-name {
  color: var(--color-brand);
}

.graphs-tab:hover {
  background-color: var(--color-gray1);
}

.graph-name {
  margin-left: 24px;
  margin-right: 12px;
  font-size: 13px;
  color: var(--color-gray5);
  line-height: 40px;
}
</style>
