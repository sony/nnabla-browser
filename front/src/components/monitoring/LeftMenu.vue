<template>
  <left-menu-base>
    <directory-tree
      :active-file="activeFile"
      :active-chart-paths="activeChartPaths"
      :active-tab-name="activeTabName"
      :directory-node="directoryNode"
    />
  </left-menu-base>
</template>

<script lang="ts">
import { DirectoryNode } from '@/types/store'
import DirectoryTree from '@/components/left/DirectoryTree.vue'
import LeftMenuBase from '@/components/LeftMenuBase.vue'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'
import directoryInfoState from '@/store/modules/directoryInfo'

export default Vue.extend({
  components: {
    'left-menu-base': LeftMenuBase,
    'directory-tree': DirectoryTree
  },
  computed: {
    activeTabName: function (): string {
      return 'monitoring'
    },
    directoryNode: function (): DirectoryNode {
      return directoryInfoState.data
    },
    activeFile: function (): string {
      return directoryInfoState.activeFile
    },
    activeChartPaths: function (): string[] {
      return chartInfoState.activeChartPaths
    }
  }
})
</script>
