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
          :active-tab-name="activeTabName"
          :directory-node="directoryNode"
        />
        <property-area
          :active-layer="activeLayer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DirectoryNode } from '@/types/store'
import DirectoryTree from '@/components/left/DirectoryTree.vue'
import { Node } from '@/types/graph'
import PropertyArea from '@/components/left/PropertyArea.vue'
import Vue from 'vue'
import directoryInfoState from '@/store/modules/directoryInfo'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  components: {
    'property-area': PropertyArea,
    'directory-tree': DirectoryTree
  },
  computed: {
    activeTabName: function (): string {
      return 'graph'
    },
    isPropertyAreaShow: function (): boolean {
      return this.activeTabName === 'graph'
    },
    activeLayer: function (): Node {
      return graphInfoState.activeLayer
    },
    directoryNode: function (): DirectoryNode {
      return directoryInfoState.data
    },
    activeFile: function (): string {
      return directoryInfoState.activeFile
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
