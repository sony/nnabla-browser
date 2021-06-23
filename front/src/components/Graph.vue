<template>
  <div>
    <header-bar active-tab-name="graph" />
    <div class="main-content">
      <left-menu />
      <center-content />
    </div>
  </div>
</template>

<script lang="ts">
import CenterContent from '@/components/graph/CenterContent.vue'
import Header from '@/components/Header.vue'
import LeftMenu from '@/components/graph/LeftMenu.vue'
import Vue from 'vue'
import directoryInfoState from '@/store/modules/directoryInfo'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  components: {
    'left-menu': LeftMenu,
    'center-content': CenterContent,
    'header-bar': Header
  },
  watch: {
    $route: function () {
      this.initializeByUrl()
    }
  },
  mounted: function () {
    this.initializeByUrl()
  },
  methods: {
    initializeByUrl: function () {
      if (this.$route.query.path) {
        graphInfoState.fetchGraph(this.$route.query.path as string)
      } else {
        graphInfoState.resetGraphs()
        directoryInfoState.SET_ACTIVE_FILE('')
      }
    }
  }
})
</script>

<style>
div.main-content {
  display: flex;
}
</style>
