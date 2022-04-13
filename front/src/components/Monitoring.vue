// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
