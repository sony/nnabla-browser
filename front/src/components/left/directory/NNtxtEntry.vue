<template>
  <div
    class="nntxt"
    :class="classObject"
    :style="activeStyle"
    @click="clickEvent"
  >
    {{ nntxt.name }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'

import { RootState, GraphInfoState } from '@/store/types'

interface NNtxtCouputedType {
  classObject: { active: boolean };
  isActive: boolean;
  nntxtPath: string;
  activeStyle: object;
  graphInfo: GraphInfoState;
}

interface NNtxtPropsType {
  nntxt: { data: object; name: string };
  dirName: string;
}

export default Vue.extend<{}, {}, NNtxtCouputedType, NNtxtPropsType>({
  props: {
    nntxt: Object,
    dirName: String
  },
  computed: {
    classObject: function () {
      return {
        active: this.$store.state.editor.activeTabName === 'graph'
      }
    },
    isActive: function () {
      return (this.$store.state as RootState).editor.activeTabName === 'graph'
    },
    nntxtPath: function () {
      return this.dirName + '/' + this.nntxt.name
    },
    activeStyle: function () {
      const isSelected =
        this.$store.state.directoryInfo.activeFile === this.nntxtPath &&
        this.isActive
      return { color: isSelected ? 'var(--color-brand)' : '' }
    },
    graphInfo: function () {
      return (this.$store.state as RootState).graphInfo
    }
  },
  methods: {
    clickEvent: function () {
      if (this.isActive) {
        if (this.nntxtPath !== this.graphInfo.nntxtPath) {
          d3.select('#svg-links').style('opacity', 0)

          d3.select('#network-editor')
            .transition()
            .duration(200)
            .attr('opacity', 0.3)
            .transition()
            .duration(1000)
            .attr('opacity', 1)

          this.$store.commit('setGraphs', this.nntxt.data)
          this.$store.commit('setNNtxtPath', this.nntxtPath)
          this.$store.commit('updateActiveFile', this.nntxtPath)
        }
      }
    }
  }
})
</script>

<style>
.nntxt {
  opacity: 0.6;
  cursor: pointer;
}

.nntxt.active {
  opacity: 1;
  font-weight: bold;
  cursor: pointer;
}

.nntxt.active:hover {
  color: var(--color-brand);
}
</style>
