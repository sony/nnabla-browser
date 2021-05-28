import * as PathOperator from '@/utils/pathOperator'
import { GraphBuilder } from '@/utils/graphBuilder'
import { MonitorBuilder } from '@/utils/monitorBuilder'
import { NNtxt } from '@/types/nnablaApi'
import { ServerEvent } from '@/types/serverEvent'
import store from '@/store'

class ServerEventHandler {
  SSEConnectionId = -1

  /** SSE event listeners **/
  createSSEConnectionIdListener (event: Event): void {
    this.SSEConnectionId = parseInt((event as ServerEvent).data)
  }

  initDirectoryStructureEventListener (event: Event): void {
    const paths = (event as ServerEvent).data.split('\n')

    store.commit('directoryInfo/initDirectoryStructure', paths)
  }

  directoryStructureEventListener (event: Event): void {
    const filePath = (event as ServerEvent).lastEventId

    store.commit('directoryInfo/updateDirectoryStructure', filePath)
  }

  fileContentEventListener (event: Event): void {
    const filePath = (event as ServerEvent).lastEventId

    const fileType = PathOperator.getFileType(filePath)

    if (fileType === null) return

    if (!store.state.directoryInfo.subscribedList.includes(filePath)) return

    // Have to convert sent data by sse to json explicitly.
    let data
    if (fileType === 'nntxtFiles') {
      const nntxt = JSON.parse((event as ServerEvent).data)
      const builder = new GraphBuilder((nntxt as NNtxt))
      data = builder.build()
    } else if (fileType === 'monitorFiles') {
      const rawData = (event as ServerEvent).data
      const builder = new MonitorBuilder((rawData as string))
      data = builder.build()
    }

    store.commit('directoryInfo/updateFileContent', { path: filePath, data })
  }

  deleteEventListener (event: Event): void {
    const path = (event as ServerEvent).lastEventId

    store.commit('directoryInfo/deleteFileOrDirectory', path)
  }
}

const serverEventHandler = new ServerEventHandler()
export { serverEventHandler }
