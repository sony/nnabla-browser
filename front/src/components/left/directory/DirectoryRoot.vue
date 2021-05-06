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
        v-if="typeof directoryInfo.name !== 'undefined'"
        :info="directoryInfo"
        :dir-name="directoryInfo.name"
        :level="0"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Directory from './Directory.vue'
import { DirectoryNode } from '@/types/store'
import Vue from 'vue'

export default Vue.extend({
  components: {
    'directory-component': Directory
  },
  computed: {
    directoryInfo: function (): DirectoryNode {
      return this.$store.state.directoryInfo.data
    }
  }
})
</script>

<style></style>
