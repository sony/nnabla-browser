import { Module, MutationTree } from 'vuex'
import { RootState, ChartInfoState } from '@/store/types'

const state: ChartInfoState = {
  charts: []
}

const mutations: MutationTree<ChartInfoState> = {
  insertChartData: function (state, { chartTitle, data }) {
    const targetChart = state.charts.find(x => x.name === chartTitle)

    const updateFunction = function (target: any[], data: any, index: number, isUpdate: number) {
      index = index > -1 ? index : target.length

      target.splice(index, isUpdate, data)
    }

    if (typeof targetChart !== 'undefined') { // update chart data
      const insertIndex = targetChart.data.findIndex((x: any) => x.name === data.name)
      updateFunction(targetChart.data, data, insertIndex, 1)
    } else { // insert new chart
      const insertIndex = state.charts.findIndex(x => x.name.toLowerCase() > chartTitle.toLowerCase())
      updateFunction(state.charts, { name: chartTitle, data: [data] }, insertIndex, 0)
    }
  },

  deleteChartData: function (state, { chartTitle, data }) {
    const targetChartIndex = state.charts.findIndex(x => x.name === chartTitle)

    if (targetChartIndex > -1) {
      const targetDataIndex = state.charts[targetChartIndex].data.findIndex((x: any) => x.name === data.name)

      if (targetDataIndex > -1) {
        state.charts[targetChartIndex].data.splice(targetDataIndex, 1)

        if (state.charts[targetChartIndex].data.length < 1) {
          state.charts.splice(targetChartIndex, 1)
        }
      }
    }
  }

}

export const chartInfo: Module<ChartInfoState, RootState> = {
  state,
  mutations
}
