<template>
  <div
    class="nntxt-entry"
    :class="{ active: isSelected }"
    @click="clickEvent"
  >
    {{ nntxt.name }}
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { GraphInfoState, RootState } from '@/store/types'
import Vue from 'vue'
import { httpClient } from '@/utils/httpClient'
import { serverEventHandler } from '@/utils/serverEventHandler'

interface NNtxtCouputedType {
  isSelected: boolean;
  nntxtPath: string;
  graphInfo: GraphInfoState;
}

interface NNtxtPropsType {
  nntxt: { data: object; name: string };
  dirName: string;
  level: number;
}

export default Vue.extend<{}, {}, NNtxtCouputedType, NNtxtPropsType>({
  props: {
    nntxt: Object,
    dirName: String,
    level: Number
  },
  computed: {
    nntxtPath: function () {
      return (this.level > 0 ? this.dirName + '/' : '') + this.nntxt.name
    },
    isSelected: function () {
      return this.$store.state.directoryInfo.activeFile === this.nntxtPath
    },
    graphInfo: function () {
      return (this.$store.state as RootState).graphInfo
    }
  },
  methods: {
    clickEvent: function () {
      if (this.nntxtPath !== this.graphInfo.nntxtPath) {
        // get nntxt contents from server
        httpClient.getFileContent(this.nntxtPath).then(res => {
          // Sent data by http is already json. Don't have convert it explicitly.
          const data = serverEventHandler.getGraphInfoFromNNtxt(res.data)
          this.$store.commit('updateFileContent', {
            path: this.nntxtPath,
            data
          })

          d3.select('#svg-links').style('opacity', 0)

          d3.select('#network-editor')
            .transition()
            .duration(200)
            .attr('opacity', 0.3)
            .transition()
            .duration(1000)
            .attr('opacity', 1)

          // this.$store.commit('setGraphs', this.nntxt.data)
          this.$store.commit('setGraphs', data)
          this.$store.commit('setNNtxtPath', this.nntxtPath)
          this.$store.commit('updateActiveFile', this.nntxtPath)
        })
      }
    }
  }
})
</script>

<style>
.nntxt-entry {
  cursor: pointer;
  user-select: none;
  height: 30px;
  line-height: 30px;
}

.nntxt-entry.active {
  cursor: pointer;
  color: var(--color-brand);
  background: var(--color-gray0);
}

.nntxt-entry:hover {
  background: var(--color-gray0);
}
</style>
