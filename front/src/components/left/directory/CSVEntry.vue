<template>
  <div class="csv-entry" :class="{ active: checked }" v-on:click="clickArea">
    <label :for="dirName + '/' + monitor.name">{{ monitor.name }}</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { serverEventHandler } from '@/utils/serverEventHandler'
import { httpClient } from '@/utils/httpClient'

export default Vue.extend({
  props: ['monitor', 'dirName', 'dirId', 'level'],
  data: function () {
    return {
      checked: this.monitor.isView || false,
      loaded: false,
      filePath: (this.level > 0 ? this.dirName + '/' : '') + this.monitor.name
    }
  },
  methods: {
    updateChart: function () {
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
    clickArea: function () {
      this.checked = !this.checked
      this.changeEvent()
    },
    changeEvent: function () {
      if (this.checked) {
        if (this.loaded) return

        this.loaded = true
        httpClient.getFileContent(this.filePath).then(res => {
          // Get data from server and update.
          const data = serverEventHandler.getMonitorInfo(res.data)
          this.$store.commit('updateFileContent', { path: this.filePath, data })
          this.updateChart()

          // Activate subscribe to update in real-time.
          httpClient.activateSSESubscribe(
            this.filePath,
            serverEventHandler.SSEConnectionId
          )
          this.$store.commit('activateSubscribe', { path: this.filePath })
        })
      } else {
        this.loaded = false
        this.updateChart()
        this.$store.commit('deleteFileContent', { path: this.filePath })

        // Deactivate subscribe
        httpClient.deactivateSSESubscribe(
          this.filePath,
          serverEventHandler.SSEConnectionId
        )
        this.$store.commit('deactivateSubscribe', { path: this.filePath })
      }
    }
  },
  watch: {
    monitor: {
      handler: function () {
        if (this.checked) {
          this.updateChart()
        }
      },
      deep: true
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
  background: var(--color-gray2);
}

.csv-entry.active {
  font-weight: bold;
  color: var(--color-brand);
}

.csv-entry,
label {
  cursor: pointer;
  user-select: none;
}
</style>
