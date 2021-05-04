import Chart from 'chart.js'
import Vue from 'vue'

export interface ReactiveDataMixin extends Vue {
  chartData: Chart.ChartData;
}
