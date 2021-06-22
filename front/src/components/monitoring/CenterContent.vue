<template>
  <div
    id="centerContent"
    class="center-content"
  >
    <keep-alive>
      <monitoring :charts="charts" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { ChartData } from '@/types/store'
import MonitoringComponent from '@/components/center/Monitoring.vue'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'

export default Vue.extend({
  components: {
    monitoring: MonitoringComponent
  },
  computed: {
    charts: function (): ChartData[] {
      return chartInfoState.charts
    }
  }
})
</script>

<style>
.center-content {
  width: 84%;
  height: 100%;
  border-right: solid 1px var(--color-gray2);
  background-color: var(--color-gray0);
}
</style>
