<script lang="ts">
import { Line, mixins } from '../chart'
import Vue, { PropType, VueConstructor } from 'vue'
import Chart from 'chart.js'

const { reactiveProp } = mixins

// workaround
type _Vue = VueConstructor<
  Vue & {
    renderChart: (
      chartData: Chart.ChartData,
      options?: Chart.ChartOptions
    ) => void;
  }
>

interface PropTypeLocal {
  chartData: Chart.ChartData;
  options: Chart.ChartOptions;
}

export default (Vue as _Vue).extend<{}, {}, {}, PropTypeLocal>({
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object as PropType<Chart.ChartData>,
      default: null
    },
    options: {
      type: Object as PropType<Chart.ChartOptions>,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
</script>

<style></style>
