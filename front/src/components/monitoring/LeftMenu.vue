<template>
  <div
    id="leftContent"
    class="left-content"
  >
    <div class="left-component">
      <div
        class="app-row"
        style="top: 0; bottom: 0;"
      >
        <directory-tree
          :active-file="activeFile"
          :active-chart-paths="activeChartPaths"
          :active-tab-name="activeTabName"
          :directory-node="directoryNode"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DirectoryNode } from '@/types/store'
import DirectoryTree from '@/components/left/DirectoryTree.vue'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'
import directoryInfoState from '@/store/modules/directoryInfo'

export default Vue.extend({
  components: {
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

<style>
.left-content {
  position: relative;
  width: 15%;
  height: 100%;
  min-width: 280px;
  background-color: var(--color-gray1);
  border-right: solid 1px var(--color-gray2);
}

.left-component .icon-small {
  width: 16px;
  height: 16px;
}
</style>
