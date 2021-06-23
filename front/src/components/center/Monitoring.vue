<template>
  <div class="monitoring">
    <div
      v-for="metrics in dataCollection"
      :key="metrics.options.plugins.title.text"
    >
      <series-chart
        class="series-chart"
        :chart-data="metrics.data"
        :options="metrics.options"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ChartData, ChartDatum, DirectoryNode } from '@/types/store'
import Vue, { PropType } from 'vue'
import Chart from 'chart.js'
import SeriesChart from '@/components/center/SeriesChart.vue'

const COLORS = [
  '#3498db',
  '#e74c3c',
  '#1abc9c',
  '#e67e22',
  '#f1c40f',
  '#2980b9',
  '#c0392b',
  '#16a085',
  '#d35400',
  '#f39c12'
]

interface DataCollectionType {
  data: Chart.ChartData;
  options: Chart.ChartOptions;
}

function getNodeId (node: DirectoryNode, path: string): number {
  // WFS
  const candidates: [string, DirectoryNode][] = [['', node]]
  while (true) {
    const candidate = candidates.shift()
    if (candidate === undefined) {
      break
    }
    const [parentPath, currNode] = candidate
    const dirName = parentPath === '' ? currNode.name : `${parentPath}/${currNode.name}`
    for (let i = 0; i < currNode.monitorFiles.length; ++i) {
      const fileName = currNode.monitorFiles[i].name
      if (`${dirName}/${fileName}` === path) {
        return currNode.id
      }
    }
    for (let i = 0; i < currNode.children.length; ++i) {
      candidates.push([dirName, currNode.children[i]])
    }
  }
  return 0
}

export default Vue.extend({
  components: { SeriesChart },
  props: {
    charts: {
      type: Object as PropType<ChartData[]>,
      default: []
    },
    directoryNode: {
      type: Object as PropType<DirectoryNode>,
      required: true
    }
  },
  computed: {
    dataCollection: function (): DataCollectionType[] {
      const charts = this.charts

      const ret: DataCollectionType[] = []
      for (const i in charts) {
        const title = charts[i].name
        const datasets = charts[i].data.map((d: ChartDatum) => {
          const path = `${d.name}/${title}.series.txt`
          const nodeId = getNodeId(this.directoryNode, path)
          const data = []
          for (let j = 0; j < d.values.t.length; ++j) {
            data.push({ x: d.values.t[j], y: d.values.v[j] })
          }
          return {
            label: d.name[0] === '/' ? d.name.substr(1) : d.name,
            borderColor: COLORS[nodeId % COLORS.length],
            borderWidth: 2,
            pointBorderWidth: 0,
            pointRadius: 0,
            fill: false,
            data: data
          }
        })
        const data = { datasets: datasets }
        const options = {
          plugins: {
            title: {
              display: true,
              text: title,
              font: { size: 20, weight: '600' }
            },
            tooltip: { enabled: true }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          },
          scales: {
            x: {
              type: 'linear',
              axis: 'x',
              title: { display: true, text: 'Epoch' },
              ticks: {
                autoSkip: true,
                fontSize: 14
              }
            },
            y: {
              type: 'linear',
              axis: 'y',
              ticks: {
                autoSkip: true,
                fontSize: 14
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
        ret.push({ data: data, options: options as Chart.ChartOptions })
      }
      return ret
    }
  }
})
</script>

<style scoped>
.monitoring {
  height: 100%;
  overflow: auto;
}

.series-chart {
  padding: 8px;
}
</style>
