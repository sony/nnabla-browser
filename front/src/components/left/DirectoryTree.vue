<template>
  <div>
    <directory-root
      class="app-row"
      :class="{ graph: isGraph, monitoring: isMonitoring }"
      :active-file="activeFile"
      :active-chart-paths="activeChartPaths"
      :active-tab-name="activeTabName"
      :directory-node="directoryNode"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { DirectoryNode } from '@/types/store'
import DirectoryRoot from './directory/DirectoryRoot.vue'

export default Vue.extend({
  components: {
    'directory-root': DirectoryRoot
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
  },
  computed: {
    isGraph: function (): boolean {
      return this.activeTabName === 'graph'
    },
    isMonitoring: function (): boolean {
      return this.activeTabName === 'monitoring'
    }
  }
})
</script>

<style>
.graph {
  top: 0;
  bottom: 50%;
  border-bottom: 1px solid var(--color-gray2);
}

.monitoring {
  top: 0;
  bottom: 0;
}
</style>
