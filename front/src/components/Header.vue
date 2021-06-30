<template>
  <div class="editor-navbar">
    <div style="margin-left: 30px;">
      <nav-button
        tab-name="graph"
        :is-active="activeTabName === 'graph'"
      />
      <nav-button
        tab-name="monitoring"
        :is-active="activeTabName === 'monitoring'"
      />
    </div>
    <div class="editor-navbar-center" />
  </div>
</template>

<script lang="ts">
import NavButton from '@/components/header/NavButton.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    'nav-button': NavButton
  },
  props: {
    activeTabName: {
      type: String,
      default: 'graph'
    }
  }
})
</script>

<style>
.editor-navbar {
  width: 100%;
  height: 40px;
  background-color: var(--color-gray5);
}

.editor-navbar-center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  width: 25%;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
</style>
