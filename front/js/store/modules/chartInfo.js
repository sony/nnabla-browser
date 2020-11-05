const state = {
  charts: []
}

const mutations = {
  insertChartData: function (state, { chartTitle, data }) {
    const targetChart = state.charts.find(x => x.name === chartTitle)

    const updateFunction = function (target, data, index, isUpdate) {
      index = index > -1 ? index : target.length

      target.splice(index, isUpdate, data)
    }

    if (typeof targetChart !== 'undefined') { // update chart data
      const insertIndex = targetChart.data.findIndex(x => x.name === data.name)
      updateFunction(targetChart.data, data, insertIndex, 1)
    } else { // insert new chart
      const insertIndex = state.charts.findIndex(x => x.name.toLowerCase() > chartTitle.toLowerCase())
      updateFunction(state.charts, { name: chartTitle, data: [data] }, insertIndex, 0)
    }
  },

  deleteChartData: function (state, { chartTitle, data }) {
    const targetChartIndex = state.charts.findIndex(x => x.name === chartTitle)

    if (targetChartIndex > -1) {
      const targetDataIndex = state.charts[targetChartIndex].data.findIndex(x => x.name === data.name)

      if (targetDataIndex > -1) {
        state.charts[targetChartIndex].data.splice(targetDataIndex, 1)

        if (state.charts[targetChartIndex].data.length < 1) {
          state.charts.splice(targetChartIndex, 1)
        }
      }
    }
  }

}

const chartModule = {
  state,
  mutations
}

export default chartModule
