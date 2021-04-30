<template>
  <div>
    <directory-root
      style="top: 0; bottom: 50%; border-bottom: 1px solid var(--color-gray2);"
      class="app-row"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DirectoryRoot from './directory/DirectoryRoot.vue'

export default Vue.extend({
  components: {
    'directory-root': DirectoryRoot
  }
})
</script>

<style>

</style>
