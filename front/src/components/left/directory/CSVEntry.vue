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
import Vue, { PropType } from 'vue'
import { ChartDatum, ChartValue, MonitorFile } from '@/types/store'

export default Vue.extend({
  props: {
    monitor: {
      type: Object as PropType<MonitorFile>,
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
    filePath: function (): string {
      return (this.level > 0 ? this.dirName + '/' : '') + this.monitor.name
    }
  },
  data: function () {
    return {
      checked: this.monitor.isView || false
    }
  },
  methods: {
    clickArea: function (): void {
      this.checked = !this.checked
      this.changeEvent()
    },
    changeEvent: function (): void {
      if (this.checked) {
        this.$store.dispatch('chartInfo/fetchChart', { path: this.filePath, chartData: this.chartData })
      } else {
        this.$store.dispatch('chartInfo/dropChart', { path: this.filePath, chartData: this.chartData })
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
