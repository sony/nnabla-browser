<template>
  <div>
    <header-bar active-tab-name="monitoring" />
    <div class="main-content">
      <left-menu />
      <center-content />
    </div>
  </div>
</template>

<script lang="ts">
import CenterContent from '@/components/monitoring/CenterContent.vue'
import Header from '@/components/Header.vue'
import LeftMenu from '@/components/monitoring/LeftMenu.vue'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'
import directoryInfoState from '@/store/modules/directoryInfo'

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
      const addedChartPaths = []
      const droppedChartPaths = []
      const urlChartPaths = this.$route.query.activeChartPaths as string[]
      // TODO: faster matching
      for (let i = 0; i < urlChartPaths.length; ++i) {
        if (!chartInfoState.activeChartPaths.includes(urlChartPaths[i])) {
          addedChartPaths.push(urlChartPaths[i])
        }
      }
      for (let i = 0; i < chartInfoState.activeChartPaths.length; ++i) {
        if (!urlChartPaths.includes(chartInfoState.activeChartPaths[i])) {
          droppedChartPaths.push(chartInfoState.activeChartPaths[i])
        }
      }
      chartInfoState.fetchCharts({ paths: addedChartPaths, node: directoryInfoState.data })
      for (let i = 0; i < droppedChartPaths.length; ++i) {
        chartInfoState.dropChart(droppedChartPaths[i])
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
