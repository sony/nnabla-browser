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
import CenterContent from '@/components/CenterContent.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    'left-menu': LeftMenu,
    'center-content': CenterContent
  },
  props: {
    historyInfo: {
      type: Object,
      default: Object
    },
    zoomInfo: {
      type: Object,
      default: Object
    }
  }
})
</script>

<style>
div.main-content {
  display: flex;
}
</style>
