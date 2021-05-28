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
import { MonitorFile } from '@/types/store'

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
  data: function () {
    return {
      checked: this.monitor.isView || false,
      loaded: false,
      filePath: (this.level > 0 ? this.dirName + '/' : '') + this.monitor.name
    }
  },
  watch: {
    monitor: {
      handler: function (): void {
        if (this.checked) {
          this.updateChart()
        }
      },
      deep: true
    }
  },
  methods: {
    updateChart: function (): void {
      if (this.monitor.data) {
        this.monitor.isView = this.checked

        const chartData = {
          chartTitle: this.monitor.name.split('.')[0],
          data: {
            id: this.dirId,
            name: this.dirName,
            values: this.monitor.data
          }
        }

        const mutation = this.checked ? 'insertChartData' : 'deleteChartData'

        this.$store.commit(mutation, chartData)
      }
    },
    clickArea: function (): void {
      this.checked = !this.checked
      this.changeEvent()
    },
    changeEvent: function (): void {
      if (this.checked) {
        if (this.loaded) return
        this.loaded = true
        this.$store.dispatch('chartInfo/fetchChart', this.filePath)
      } else {
        this.loaded = false
        this.$store.dispatch('chartInfo/dropChart', this.filePath)
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
