import { ChartInfoState, RootState } from '@/store/types'
import { Module, MutationTree } from 'vuex'

const state: ChartInfoState = {
  charts: []
}

const mutations: MutationTree<ChartInfoState> = {
  insertChartData: function (state, { chartTitle, data }) {
    const targetChart = state.charts.find(x => x.name === chartTitle)
    if (typeof targetChart !== 'undefined') {
      // update chart data
      const insertIndex = targetChart.data.findIndex(x => x.name === data.name)
      const index = insertIndex > -1 ? insertIndex : targetChart.data.length
      targetChart.data.splice(index, 1, data)
    } else {
      // insert new chart
      const insertIndex = state.charts.findIndex(
        x => x.name.toLowerCase() > chartTitle.toLowerCase()
      )
      const index = insertIndex > -1 ? insertIndex : state.charts.length
      state.charts.splice(index, 0, { name: chartTitle, data: [data] })
    }
  },

  deleteChartData: function (state, { chartTitle, data }) {
    const targetChartIndex = state.charts.findIndex(x => x.name === chartTitle)

    if (targetChartIndex > -1) {
      const targetDataIndex = state.charts[targetChartIndex].data.findIndex(
        x => x.name === data.name
      )

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
