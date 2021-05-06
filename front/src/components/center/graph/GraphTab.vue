<template>
  <div
    class="graphs-tab nnc-invoker"
    :class="{ active: selected }"
    @click="click"
  >
    <span class="graph-name">{{ graph.name }}</span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Graph } from '@/types/graph'

interface GraphTabProps {
  graph: Graph;
  index: number;
  selected: boolean;
}

export default Vue.extend<{}, {}, {}, GraphTabProps>({
  props: {
    graph: {
      type: Object as PropType<Graph>,
      default: null
    },
    index: {
      type: Number,
      default: -1
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click: function (): void {
      this.$store.commit('setActiveGraphIndex', this.index)
    },
    keydown: (e: KeyboardEvent): void => {
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
