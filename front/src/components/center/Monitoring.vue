<template>
  <div>
    <series-chart :chart-data="dataCollection" :options="options"></series-chart>
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

      const ret = {
        datasets: [],
        labels: []
      } as {datasets: any[]; labels: any[]}

      const x = new Set()
      for (const i in charts) {
        const v = charts[i].data[0].values
        for (const t of v.t) x.add(t)
        ret.datasets.push({
          label: 'Data' + i.toString(),
          // backgroundColor: '#f87979',
          borderColor: '#FF6665',
          fill: false,
          data: v.v
        })
      }

      ret.labels = Array.from(x)

      return ret
    },
    options: function () {
      const ret = {} as {[key: string]: any}

      ret.responsive = true
      ret.maintainAspectRatio = false

      ret.plugins = {
        title: { display: true, text: 'Monitor log' }
      }

      ret.scales = {
        xAxes: [
          {
            // gridLines: {},
            ticks: {
              autoSkip: true,
              // fontColor: FONT_COLOR,
              fontSize: 14
            },
            scaleLabel: {
              display: true,
              // fontColor: FONT_COLOR,
              labelString: 'epoch'
            }
          }
        ],
        yAxes: [
          {
            // gridLines: {},
            ticks: {
              autoSkip: true,
              // fontColor: FONT_COLOR,
              fontSize: 14
            },
            scaleLabel: {
              display: true,
              // fontColor: FONT_COLOR,
              labelString: 'loss'
            }
          }
        ]
      }

      console.log(ret)

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
