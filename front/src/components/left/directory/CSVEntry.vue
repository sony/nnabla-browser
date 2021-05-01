<template>
  <div class="csv-entry">
    <input
      type="checkbox"
      :id="dirName + '/' + monitor.name"
      v-model="checked"
      @change="changeEvent"
    />
    <label :for="dirName + '/' + monitor.name">{{ monitor.name }}</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['monitor', 'dirName', 'dirId'],
  data: function () {
    return {
      checked: this.monitor.isView || false
    }
  },
  methods: {
    changeEvent: function () {
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
    }
  },
  watch: {
    monitor: {
      handler: function () {
        if (this.checked) {
          this.changeEvent()
        }
      },
      deep: true
    }
  }
})
</script>

<style>
.csv-entry,
label {
  cursor: pointer;
}
</style>
