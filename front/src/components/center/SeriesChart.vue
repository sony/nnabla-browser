<script lang="ts">
import { Line, mixins } from '../chart'
import Vue, { VueConstructor } from 'vue'
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

interface PropType {
  chartData: Chart.ChartData;
  options: Chart.ChartOptions;
}

export default (Vue as _Vue).extend<{}, {}, {}, PropType>({
  extends: Line,
  mixins: [reactiveProp],
  props: { chartData: {}, options: {} },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
</script>

<style></style>
