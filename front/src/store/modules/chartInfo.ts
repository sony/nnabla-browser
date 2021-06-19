import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators'
import { ChartData, ChartDatum, ChartInfoState } from '@/types/store'
import { MonitorBuilder } from '@/utils/monitorBuilder'
import { httpClient } from '@/utils/httpClient'
import { serverEventHandler } from '@/utils/serverEventHandler'
import store from '@/store'

@Module({ dynamic: true, store, namespaced: true, name: 'chartInfo' })
class ChartInfoStateModule extends VuexModule implements ChartInfoState {
  charts: ChartData[] = []
  activeChartPaths: string[] = []

  @Mutation
  ADD_ACTIVE_CHART_PATH (path: string): void {
    this.activeChartPaths.push(path)
  }

  @Mutation
  DELETE_ACTIVE_CHART_PATH (path: string): void {
    const index = this.activeChartPaths.findIndex(p => p === path)
    if (index > -1) {
      this.activeChartPaths.splice(index, 1)
    }
  }

  @Action({})
  insertChartData ({
    chartTitle,
    data
  }: { chartTitle: string; data: ChartDatum }): void {
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
  deleteChartData ({
    chartTitle,
    data
  }: { chartTitle: string; data: ChartDatum }): void {
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
  fetchChart ({
    path,
    chartData
  }: {
    path: string;
    chartData: { chartTitle: string; data: ChartDatum };
  }): void {
    httpClient.getFileContent(path).then(res => {
      // Get data from server and update.
      const builder = new MonitorBuilder(res.data)
      const data = builder.build()
      this.context.dispatch(
        'directoryInfo/updateFileContent',
        { path: path, data },
        { root: true }
      )

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

      this.context.dispatch(
        'directoryInfo/activateSubscribe',
        path,
        { root: true }
      )
      this.ADD_ACTIVE_CHART_PATH(path)
      this.insertChartData(newChartData)
    })
  }

  @Action({})
  dropChart ({
    path,
    chartData
  }: {
    path: string;
    chartData: { chartTitle: string; data: ChartDatum };
  }): void {
    this.context.dispatch(
      'directoryInfo/deleteFileContent',
      path,
      { root: true }
    )

    // Deactivate subscribe
    httpClient.deactivateSSESubscribe(path, serverEventHandler.SSEConnectionId)

    this.context.dispatch(
      'directoryInfo/deactivateSubscribe',
      path,
      { root: true }
    )
    this.DELETE_ACTIVE_CHART_PATH(path)
    this.deleteChartData(chartData)
  }
}

export default getModule(ChartInfoStateModule)
