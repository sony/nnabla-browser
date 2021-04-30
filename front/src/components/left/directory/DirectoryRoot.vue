<template>

<div>
  <div class="title">Directory Tree</div>
  <div class="app-row app-scroll-x app-scroll-y" style="top: 40px; bottom: 0; padding: 0 16px;">
    <directory-component
      v-if="typeof directoryInfo.name !== 'undefined'"
      :info="directoryInfo"
      :dir-name="directoryInfo.name" />
  </div>
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import Directory from './Directory.vue'

export default Vue.extend({
  components: {
    'directory-component': Directory
  },
  computed: {
    directoryInfo: function () {
      return this.$store.state.directoryInfo.data
    }
  }
})

</script>

<style>

</style>
