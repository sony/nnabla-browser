<template>
  <div>
    <div v-for="metrics in dataCollection" v-bind:key="metrics.options.plugins.title.text">
      <series-chart :chart-data="metrics.data" :options="metrics.options"><series-chart>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SeriesChart from '@/components/center/SeriesChart.vue'

export default Vue.extend({
  components: { SeriesChart },
  computed: {
    dataCollection: function () {
      const charts = this.$store.state.chartInfo.charts

      const ret = []
      for (const i in charts) {
        const title = charts[i].name
        const datasets = charts[i].data.map((d: any) => {
          const data = []
          for (let j = 0; j < d.values.t.length; ++j) {
            data.push({ x: d.values.t[j], y: d.values.v[j] })
          }
          return {
            label: d.name,
            fill: false,
            data: data
          }
        })
        const data = { datasets: datasets }
        const options = {
          plugins: { title: { display: true, text: title } },
          scales: {
            xAxes: [
              {
                axis: 'x',
                ticks: {
                  autoSkip: true,
                  fontSize: 14
                },
                scaleLabel: {
                  display: true,
                  labelString: 'epoch'
                }
              }
            ],
            yAxes: [
              {
                axis: 'y',
                ticks: {
                  autoSkip: true,
                  fontSize: 14
                },
                scaleLabel: {
                  display: true,
                  labelString: 'value'
                }
              }
            ]
          },
          responsive: true,
          maintainAspectRatio: false
        }
        ret.push({ data: data, options: options })
      }
      return ret
    }
  }
})

</script>

<style scoped>
.monitoring-content-scroller {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.c3-circles {
  display: none;
}

.tool-icon-container {
  z-index: 99;
  width: 4rem;
  height: 4rem;
  background-color: #1aaa55;
  border-radius: 50%;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 10px #f00;
}

.tool-icon-container .func-icon {
  font-size: 3rem;
  color: white;
}

.chart-block path {
  fill: none;
  stroke: #000;
}

g.tick line {
  stroke: #000;
}
</style>
