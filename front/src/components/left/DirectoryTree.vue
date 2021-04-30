<template>
  <div>
    <directory-root
      class="app-row"
      v-bind:class="{'graph': isGraph, monitoring: isMonitoring}"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DirectoryRoot from './directory/DirectoryRoot.vue'

export default Vue.extend({
  components: {
    'directory-root': DirectoryRoot
  },
  computed: {
    isGraph: function (): boolean {
      return this.$store.state.editor.activeTabName.toLowerCase() === 'graph'
    },
    isMonitoring: function (): boolean {
      return this.$store.state.editor.activeTabName.toLowerCase() !== 'graph'
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
