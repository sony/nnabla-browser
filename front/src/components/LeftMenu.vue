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
        <directory-tree />
        <property-area v-show="isPropertyAreaShow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DirectoryTree from '@/components/left/DirectoryTree.vue'
import PropertyArea from '@/components/left/PropertyArea.vue'
import Vue from 'vue'

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
