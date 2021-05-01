<template>
  <div class="main-content">
    <left-menu />
    <center-content
      :history-info="historyInfo"
      @history="command => $emit('history', command)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LeftMenu from '@/components/LeftMenu.vue'
import CenterContent from '@/components/CenterContent.vue'

export default Vue.extend({
  props: {
    historyInfo: Object,
    zoomInfo: Object
  },
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
