<template>
  <center-content-base>
    <monitoring :charts="charts" />
  </center-content-base>
</template>

<script lang="ts">
import CenterContentBase from '@/components/CenterContentBase.vue'
import { ChartData } from '@/types/store'
import MonitoringComponent from '@/components/center/Monitoring.vue'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'

export default Vue.extend({
  components: {
    'center-content-base': CenterContentBase,
    monitoring: MonitoringComponent
  },
  computed: {
    charts: function (): ChartData[] {
      return chartInfoState.charts
    }
  }
})
</script>
