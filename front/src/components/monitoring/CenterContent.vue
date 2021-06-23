<template>
  <center-content-base>
    <monitoring :charts="charts" :directory-node="directoryNode" />
  </center-content-base>
</template>

<script lang="ts">
import CenterContentBase from '@/components/CenterContentBase.vue'
import { ChartData, DirectoryNode } from '@/types/store'
import MonitoringComponent from '@/components/center/Monitoring.vue'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'
import directoryInfoState from '@/store/modules/directoryInfo'

export default Vue.extend({
  components: {
    'center-content-base': CenterContentBase,
    monitoring: MonitoringComponent
  },
  computed: {
    charts: function (): ChartData[] {
      return chartInfoState.charts
    },
    directoryNode: function (): DirectoryNode {
      return directoryInfoState.data
    }
  }
})
</script>
