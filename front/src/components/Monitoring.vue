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

export default Vue.extend({
  components: {
    'left-menu': LeftMenu,
    'center-content': CenterContent,
    'header-bar': Header
  },
  watch: {
    $route: function (): void {
      this.initializeByUrl()
    }
  },
  mounted: function (): void {
    this.initializeByUrl()
  },
  methods: {
    initializeByUrl: function (): void {
      const addedChartPaths = []
      const droppedChartPaths = []
      const rawUrlChartPaths = this.$route.query.activeChartPaths
      let urlChartPaths: string[]
      if (typeof rawUrlChartPaths === 'string') {
        urlChartPaths = [rawUrlChartPaths]
      } else if (rawUrlChartPaths === undefined) {
        urlChartPaths = []
      } else {
        urlChartPaths = rawUrlChartPaths as string[]
      }
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
      chartInfoState.fetchCharts(addedChartPaths)
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
