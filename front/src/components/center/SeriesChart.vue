<script lang='ts'>
import Vue, { VueConstructor } from 'vue'
import { Line, mixins } from 'vue-chartjs'
import 'chart.js'

const { reactiveProp } = mixins

// workaround
type _Vue = VueConstructor<
  Vue & {
    renderChart: (chartData: Chart.ChartData, options?: Chart.ChartOptions) => void;
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
    console.log(this.options)
    this.renderChart(this.chartData, this.options)
  }
})

</script>

<style>
</style>
