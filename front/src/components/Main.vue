<template>
  <div class="main-content">
    <left-menu />
    <center-content />
  </div>
</template>

<script lang="ts">
import CenterContent from '@/components/CenterContent.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    'left-menu': LeftMenu,
    'center-content': CenterContent
  }
})
</script>

<style>
div.main-content {
  display: flex;
}
</style>
