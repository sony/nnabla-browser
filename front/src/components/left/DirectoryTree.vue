<template>
  <div>
    <directory-root
      class="app-row"
      :class="{ graph: isGraph, monitoring: isMonitoring }"
      :activeFile='activeFile'
      :activeTabName='activeTabName'
      :directoryNode='directoryNode'
    />
  </div>
</template>

<script lang="ts">
import { DirectoryNode } from '@/types/store'
import DirectoryRoot from './directory/DirectoryRoot.vue'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    activeFile: { type: String },
    activeTabName: { type: String },
    directoryNode: { type: Object as PropType<DirectoryNode> }
  },
  components: {
    'directory-root': DirectoryRoot
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
