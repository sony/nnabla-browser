<template>
  <div
    class="csv-entry"
    :class="{ active: checked }"
    @click="clickArea"
  >
    <label :for="dirName + '/' + monitor.name">{{ monitor.name }}</label>
  </div>
</template>

<script lang="ts">
import { ChartDatum, ChartValue, MonitorFile } from '@/types/store'
import Vue, { PropType } from 'vue'
import chartInfoState from '@/store/modules/chartInfo'

export default Vue.extend({
  props: {
    monitor: {
      type: Object as PropType<MonitorFile>,
      required: true
    },
    activeChartPaths: {
      type: Array as PropType<string[]>,
      required: true
    },
    dirName: {
      type: String,
      required: true
    },
    dirId: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  },
  computed: {
    chartData: function (): { chartTitle: string; data: ChartDatum } {
      return {
        chartTitle: this.monitor.name.split('.')[0],
        data: {
          id: this.dirId,
          name: this.dirName,
          values: this.monitor.data as ChartValue
        }
      }
    },
    checked: function (): boolean {
      const path = `${this.dirName}/${this.monitor.name}`
      return this.activeChartPaths.includes(path)
    },
    filePath: function (): string {
      return (this.level > 0 ? this.dirName + '/' : '') + this.monitor.name
    }
  },
  methods: {
    clickArea: function (): void {
      if (!this.checked) {
        chartInfoState.fetchChart({
          path: this.filePath,
          chartData: this.chartData
        })
      } else {
        chartInfoState.dropChart({
          path: this.filePath,
          chartData: this.chartData
        })
      }
    }
  }
})
</script>

<style>
.csv-entry {
  height: 30px;
  line-height: 30px;
}

.csv-entry:hover {
  background: var(--color-gray0);
}

.csv-entry.active {
  color: var(--color-brand);
  background: var(--color-gray0);
}

.csv-entry,
label {
  cursor: pointer;
  user-select: none;
}
</style>
