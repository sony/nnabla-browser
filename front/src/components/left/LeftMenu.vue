<template>
  <div class="left-content" id="leftContent">
    <div class="left-component">
      <div class="app-row" style="top: 0; bottom: 0;">
        <directory-tree />
        <property-area v-show="isPropertyAreaShow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DirectoryTree from './DirectoryTree.vue'
import PropertyArea from './PropertyArea.vue'

export default Vue.extend({
  components: {
    'property-area': PropertyArea,
    'directory-tree': DirectoryTree
  },
  computed: {
    activeTabName: function (): string {
      return this.$store.state.editor.activeTabName.toLowerCase()
    },
    isPropertyAreaShow: function (): boolean {
      return this.activeTabName === 'graph'
    }
  }
})
</script>

<style>
.left-component .icon-small {
  width: 16px;
  height: 16px;
}
</style>
