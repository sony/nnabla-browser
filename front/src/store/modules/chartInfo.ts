import { ChartData, ChartDatum, ChartInfoState } from '@/types/store'
import { Action, VuexModule, Module, getModule } from 'vuex-module-decorators'
import { httpClient } from '@/utils/httpClient'
import { MonitorBuilder } from '@/utils/monitorBuilder'
import { serverEventHandler } from '@/utils/serverEventHandler'
import store from '@/store'

@Module({ dynamic: true, store, namespaced: true, name: 'chartInfo' })
class ChartInfoStateModule extends VuexModule implements ChartInfoState {
  charts: ChartData[] = []

  @Action({})
  insertChartData ({ chartTitle, data }: { chartTitle: string; data: ChartDatum }) {
    const targetChart = this.charts.find(x => x.name === chartTitle)
    if (typeof targetChart !== 'undefined') {
      // update chart data
      const insertIndex = targetChart.data.findIndex(x => x.name === data.name)
      const index = insertIndex > -1 ? insertIndex : targetChart.data.length
      targetChart.data.splice(index, 1, data)
    } else {
      // insert new chart
      const insertIndex = this.charts.findIndex(
        x => x.name.toLowerCase() > chartTitle.toLowerCase()
      )
      const index = insertIndex > -1 ? insertIndex : this.charts.length
      this.charts.splice(index, 0, { name: chartTitle, data: [data] })
    }
  }

  @Action({})
  deleteChartData ({ chartTitle, data }: { chartTitle: string; data: ChartDatum }) {
    const targetChartIndex = this.charts.findIndex(x => x.name === chartTitle)

    if (targetChartIndex > -1) {
      const targetDataIndex = this.charts[targetChartIndex].data.findIndex(
        x => x.name === data.name
      )

      if (targetDataIndex > -1) {
        this.charts[targetChartIndex].data.splice(targetDataIndex, 1)

        if (this.charts[targetChartIndex].data.length < 1) {
          this.charts.splice(targetChartIndex, 1)
        }
      }
    }
  }

  @Action({})
  fetchChart ({ path, chartData }: { path: string; chartData: { chartTitle: string; data: ChartDatum } }) {
    httpClient.getFileContent(path).then(res => {
      // Get data from server and update.
      const builder = new MonitorBuilder(res.data)
      const data = builder.build()
      this.context.commit('directoryInfo/updateFileContent', { path: path, data }, { root: true })

      // Activate subscribe to update in real-time.
      httpClient.activateSSESubscribe(path, serverEventHandler.SSEConnectionId)

      const newChartData = {
        chartTitle: chartData.chartTitle,
        data: {
          id: chartData.data.id,
          name: chartData.data.name,
          values: data
        }
      }

      this.context.commit('directoryInfo/activateSubscribe', path, { root: true })
      this.insertChartData(newChartData)
    })
  }

  @Action({})
  dropChart ({ path, chartData }: { path: string; chartData: { chartTitle: string; data: ChartDatum } }) {
    this.context.commit('directoryInfo/deleteFileContent', path, { root: true })

    // Deactivate subscribe
    httpClient.deactivateSSESubscribe(path, serverEventHandler.SSEConnectionId)

    this.context.commit('directoryInfo/deactivateSubscribe', path, { root: true })
    this.deleteChartData(chartData)
  }
}

export default getModule(ChartInfoStateModule)
