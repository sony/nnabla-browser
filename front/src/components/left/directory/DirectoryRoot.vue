<template>
  <div>
    <div class="title">
      Directory Tree
    </div>
    <div
      class="app-row app-scroll-x app-scroll-y"
      style="top: 40px; bottom: 0;"
    >
      <directory-component
        v-if="typeof directoryNode.name !== 'undefined'"
        :active-file="activeFile"
        :active-chart-paths="activeChartPaths"
        :active-tab-name="activeTabName"
        :directory-node="directoryNode"
        :dir-name="directoryNode.name"
        :level="0"
        :root-node="directoryNode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Directory from './Directory.vue'
import { DirectoryNode } from '@/types/store'

export default Vue.extend({
  components: {
    'directory-component': Directory
  },
  props: {
    activeFile: {
      type: String,
      required: true
    },
    activeChartPaths: {
      type: Array as PropType<string[]>,
      required: true
    },
    activeTabName: {
      type: String,
      required: true
    },
    directoryNode: {
      type: Object as PropType<DirectoryNode>,
      required: true
    }
  }
})
</script>

<style></style>
