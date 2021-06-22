<template>
  <div>
    <div class="editor-navbar">
      <div style="margin-left: 30px;">
        <nav-button
          tab-name="graph"
          :is-active="true"
        />
        <nav-button
          tab-name="monitoring"
          :is-active="false"
        />
      </div>
      <div class="editor-navbar-center" />
    </div>
    <div class="main-content">
      <left-menu />
      <center-content />
    </div>
  </div>
</template>

<script lang="ts">
import CenterContent from '@/components/graph/CenterContent.vue'
import LeftMenu from '@/components/graph/LeftMenu.vue'
import NavButton from '@/components/header/NavButton.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    'left-menu': LeftMenu,
    'center-content': CenterContent,
    'nav-button': NavButton
  }
})
</script>

<style>
div.main-content {
  display: flex;
}
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
