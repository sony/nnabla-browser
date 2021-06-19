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
        :activeFile="activeFile"
        :activeTabName="activeTabName"
        :directoryNode="directoryNode"
        :dir-name="directoryNode.name"
        :level="0"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Directory from './Directory.vue'
import { DirectoryNode } from '@/types/store'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    activeFile: { type: String },
    activeTabName: { type: String },
    directoryNode: { type: Object as PropType<DirectoryNode> }
  },
  components: {
    'directory-component': Directory
  }
})
</script>

<style></style>
