// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
