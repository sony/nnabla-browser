import * as PathOperator from '@/utils/pathOperator'
import { LayerInfo, LayerRegister, Parameter } from '@/utils/layerRegister'
import { Definitions } from '@/utils/definitions'
import store from '@/store'

const GRID = Definitions.EDIT.GRID.SIZE

export interface NodeInfo extends LayerInfo {
  x: number;
  y: number;
  name: string;
  type: string;
}

export interface ServerEvent extends Event {
  lastEventId: string;
  data: string;
  event: string;
}

export interface Variable {
  dataName: string;
  variableName: string;
}

const layerRegister = new LayerRegister()

class ServerEventHandler {
  layerRegister: LayerRegister
  SSEConnectionId = -1

  constructor () {
    this.layerRegister = layerRegister
  }

  createDummyInputLayer (variable: Variable) {
    return {
      inputParam: null,
      input: [],
      name: variable.dataName,
      output: [variable.variableName],
      type: 'InputVariable'
    }
  }

  createDummyOutputLayer (variable: Variable) {
    return {
      outputParam: null,
      input: [variable.variableName],
      name: variable.dataName,
      output: [],
      type: 'OutputVariable'
    }
  }

  getLayerPosition (depth: number, needSlice: number) {
    return { x: GRID * needSlice * 15, y: GRID * depth * 4 }
  }

  setupGetNodeAndLinkRecursive (functions: any, outputVariables: Variable[]) {
    const recursive = (sourceLayer: LayerInfo, sourceDepthFromRoot: number) => {
      for (const sourceOutput of sourceLayer.output) {
        // find user define output
        const outputVariableIndex = outputVariables.findIndex(
          (v: Variable) => v.variableName === sourceOutput
        )
        if (outputVariableIndex > -1) {
          const tmpLayer = this.createDummyOutputLayer(
            outputVariables[outputVariableIndex]
          )

          const [layer] = this.layerRegister.addLayer(
            tmpLayer,
            sourceDepthFromRoot + 1
          )

          const link = {
            source: sourceLayer.index,
            destination: layer.index
          }

          this.layerRegister.addLink(link)
        }

        const destLayers = functions.filter((f: any) =>
          (f.input || []).find((name: string) => name === sourceOutput)
        )

        const depthIncrement = destLayers.length > 1 ? 2 : 1

        for (const destLayer of destLayers) {
          const tmpLayer = {
            ...destLayer
          }

          const [layer, isVisitEnough] = this.layerRegister.addLayer(
            tmpLayer,
            sourceDepthFromRoot + depthIncrement
          )

          const link = {
            source: sourceLayer.index,
            destination: layer.index
          }

          this.layerRegister.addLink(link)

          if (isVisitEnough) recursive(layer, Math.max(...layer.depth))
        }
      }
    }

    return recursive
  }

  getGraphInfoFromNNtxt (json: any) {
    const graphInfoArray = []
    const networks = json.network || []
    const executors = json.executor || []

    for (const executor of executors) {
      const network = networks.find((x: any) => x.name === executor.networkName)

      if (typeof network === 'undefined') continue
      const variableMap = new Map()
      network.variable.forEach((x: any) => variableMap.set(x.name, x))

      const inputVariables = executor.dataVariable // list
      const outputVariables = executor.outputVariable // list

      const functions: any[] = []
      const noInputFunctions: any[] = []
      network.function.forEach((f: any) => {
        if (Object.prototype.hasOwnProperty.call(f, 'input')) functions.push(f)
        else noInputFunctions.push({ ...f, input: [] })
      })

      const allParameters = network.variable.filter(
        (x: Parameter) => x.type === 'Parameter'
      )

      this.layerRegister.initialize(allParameters)

      const recursive = this.setupGetNodeAndLinkRecursive(
        functions,
        outputVariables
      )

      // create input nodes
      const inputLayers = [
        ...inputVariables.map(this.createDummyInputLayer),
        ...noInputFunctions
      ]

      for (const inputLayer of inputLayers) {
        const [layer] = this.layerRegister.addLayer(inputLayer, 0)
        recursive(layer, 0)
      }

      const depthToLayers = this.layerRegister.getDepthToLayers()

      const nodes = []
      for (let { needSlice, layers } of Object.values(depthToLayers)) {
        for (const layer of layers.sort((a: number, b: number) =>
          a > b ? 1 : -1
        )) {
          nodes.push({
            ...layer,
            ...this.getLayerPosition(layer.depth, needSlice++)
          })
        }
      }

      nodes.sort((a, b) => (a.index > b.index ? 1 : -1))
      nodes.forEach(a => {
        a.outputShape = {}
        const b = a.type === 'OutputVariable' ? a.input : a.output
        for (const x of b) {
          const name = a.type === 'OutputVariable' ? a.name : x
          a.outputShape[`${name}_output_shape`] = variableMap.get(x).shape.dim
        }
      })

      const links = this.layerRegister.links

      graphInfoArray.push({ name: executor.name, nodes, links })
    }

    return graphInfoArray
  }

  getMonitorInfo (data: string) {
    const split = data.split('\n')

    const times = []
    const values = []

    for (const elm of split) {
      const [t, v] = elm.split(' ')
      times.push(Number(t))
      values.push(Number(v))
    }

    return { t: times, v: values }
  }

  /** SSE event listeners **/
  createSSEConnectionIdListener (event: Event) {
    this.SSEConnectionId = parseInt((event as ServerEvent).data)
  }

  initDirectoryStructureEventListener (event: Event) {
    const paths = (event as ServerEvent).data.split('\n')

    store.commit('initDirectoryStructure', { paths })
  }

  directoryStructureEventListener (event: Event) {
    const filePath = (event as ServerEvent).lastEventId

    store.commit('updateDirectoryStructure', { path: filePath })
  }

  createFileContentEventListener (event: Event) {
    const filePath = (event as ServerEvent).lastEventId

    const fileType = PathOperator.getFileType(filePath)

    if (fileType === null) return

    if (!store.getters.isSubscribe(filePath)) return

    // Have to convert sent data by sse to json explicitly.
    let data
    if (fileType === 'nntxtFiles') {
      const json = JSON.parse((event as ServerEvent).data)
      data = this.getGraphInfoFromNNtxt(json)
    } else if (fileType === 'monitorFiles') {
      data = this.getMonitorInfo((event as ServerEvent).data)
    }

    store.commit('updateFileContent', { path: filePath, data })
  }
}

const serverEventHandler = new ServerEventHandler()
export { serverEventHandler }
