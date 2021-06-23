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

function getChartTitleAndName (path: string): [string, string] {
  const splits = path.split('/')
  const chartTitle = splits[splits.length - 1].split('.')[0]
  const name = splits.slice(0, splits.length - 1).join('/')
  return [chartTitle, name]
}

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
  deleteChartData (path: string): void {
    const [chartTitle, name] = getChartTitleAndName(path)
    const targetChartIndex = this.charts.findIndex(x => x.name === chartTitle)

    if (targetChartIndex > -1) {
      const targetDataIndex = this.charts[targetChartIndex].data.findIndex(
        x => x.name === name
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
  fetchChart (path: string): void {
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

      const [chartTitle, name] = getChartTitleAndName(path)
      const chartData = {
        chartTitle: chartTitle,
        data: {
          name: name,
          values: data
        }
      }

      this.context.dispatch(
        'directoryInfo/activateSubscribe',
        path,
        { root: true }
      )
      this.ADD_ACTIVE_CHART_PATH(path)
      this.insertChartData(chartData)
    })
  }

  @Action({})
  fetchCharts (paths: string[]): void {
    httpClient.getFileContents(paths).then(res => {
      for (let i = 0; i < res.contents.length; ++i) {
        const path = res.contents[i].path

        // Get data from server and update.
        const builder = new MonitorBuilder(res.contents[i].content)
        const data = builder.build()
        this.context.dispatch(
          'directoryInfo/updateFileContent',
          { path, data },
          { root: true }
        )

        // Activate subscribe to update in real-time.
        httpClient.activateSSESubscribe(path, serverEventHandler.SSEConnectionId)

        const [chartTitle, name] = getChartTitleAndName(path)
        const chartData = {
          chartTitle: chartTitle,
          data: {
            name: name,
            values: data
          }
        }

        this.context.dispatch(
          'directoryInfo/activateSubscribe',
          path,
          { root: true }
        )
        this.ADD_ACTIVE_CHART_PATH(path)
        this.insertChartData(chartData)
      }
    })
  }

  @Action({})
  dropChart (path: string): void {
    // Deactivate subscribe
    httpClient.deactivateSSESubscribe(path, serverEventHandler.SSEConnectionId)

    this.context.dispatch(
      'directoryInfo/deactivateSubscribe',
      path,
      { root: true }
    )
    this.DELETE_ACTIVE_CHART_PATH(path)
    this.deleteChartData(path)
  }
}

export default getModule(ChartInfoStateModule)
