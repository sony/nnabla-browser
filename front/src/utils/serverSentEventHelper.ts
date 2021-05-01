
import store from '@/store'
import { Definitions } from '@/utils/definitions'
import { range } from '@/utils/arrayOperator'
import * as PathOperator from '@/utils/pathOperator'
import * as Path from 'path'

import { graphInfo } from '@/store/modules/graphInfo'

const GRID = Definitions.EDIT.GRID.SIZE

/***************************************
 interface
 ***************************************/
// todo: move interface definitions to other file.
interface LayerInfo {
  input: string[];
  index: number;
  depth: number[];
  visitCount: number;
  parameters: any; // todo
}

export interface NodeInfo extends LayerInfo {
  x: number;
  y: number;
  name: string;
  type: string;
}

interface SSEEvent extends Event {
  lastEventId: string;
  data: string;
  event: string;
}

/***************************************/
class LayerRegister {
  counter = 0
  layers: { [key: string]: LayerInfo } = {}
  links: any[] = [] // todo
  allParameters: any // todo

  initialize (params?: any) {
    this.counter = 0
    this.layers = {}
    this.links = []
    this.allParameters = params
  }

  addLayer (layer: any, depth: number): [LayerInfo, boolean] {
    if (!Object.prototype.hasOwnProperty.call(this.layers, layer.name)) {
      // first visit
      let visitCount = 1
      const parameters = []
      const buffers = []

      // collect all function parameters
      for (const _input of layer.input) {
        const varIndex = this.allParameters.findIndex(
          (x: { name: string }) => x.name === _input
        )
        if (varIndex > -1) {
          parameters.push(this.allParameters[varIndex])
        } else {
          // check deprecated input
          if (buffers.findIndex(x => x === _input) > -1) visitCount++

          buffers.push(_input)
        }
      }

      this.layers[layer.name] = {
        ...layer,
        input: buffers,
        index: this.counter++,
        depth: [depth],
        visitCount,
        parameters
      }
    } else {
      // visit again
      this.layers[layer.name].depth.push(depth)
      this.layers[layer.name].visitCount++
    }

    const retLayer = this.layers[layer.name]

    return [retLayer, retLayer.input.length <= retLayer.visitCount]
  }

  addLink (link: any) {
    this.links.push(link)
  }

  getDepthToLayers () {
    const depth2layers: { [key: number]: any } = {}
    Object.values(this.layers).forEach(layer => {
      const depthList = layer.depth
      const maxDepth = Math.max(...depthList)

      if (layer.depth.length > 1) {
        const minDepth = Math.min(...depthList)

        for (const i of range(minDepth, maxDepth, true)) {
          const slice = depthList.filter(x => x - 1 < i).length
          if (Object.prototype.hasOwnProperty.call(depth2layers, i)) {
            depth2layers[i].needSlice += slice
          } else {
            depth2layers[i] = { needSlice: slice, layers: [] }
          }
        }
      }

      if (Object.prototype.hasOwnProperty.call(depth2layers, maxDepth)) {
        depth2layers[maxDepth].layers.push({
          ...layer,
          depth: maxDepth
        })
      } else {
        depth2layers[maxDepth] = {
          needSlice: 0,
          layers: [{ ...layer, depth: maxDepth }]
        }
      }
    })

    return depth2layers
  }
}

class SSEHelper {
  layerRegister: LayerRegister

  constructor () {
    this.layerRegister = new LayerRegister()
  }

  createDummyInputLayer (variable: any) {
    return {
      inputParam: null,
      input: [],
      name: variable.dataName,
      output: [variable.variableName],
      type: 'InputVariable'
    }
  }

  createDummyOutputLayer (variable: any) {
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

  setupGetNodeAndLinkRecursive = (functions: any, outputVariables: any) => {
    const recursive = (sourceLayer: any, sourceDepthFromRoot: any) => {
      for (const sourceOutput of sourceLayer.output) {
        // find user define output
        const outputVariableIndex = outputVariables.findIndex(
          (v: any) => v.variableName === sourceOutput
        )
        if (outputVariableIndex > -1) {
          const tmpLayer = this.createDummyOutputLayer(
            outputVariables[outputVariableIndex]
          )

          const [layer, _] = this.layerRegister.addLayer(
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

  getGraphInfoFromNNtxt (event: any) {
    const json = JSON.parse(event.data)

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
        (x: any) => x.type === 'Parameter'
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
        const [layer, _] = this.layerRegister.addLayer(inputLayer, 0)
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

  getMonitorInfo (event: any) {
    const split = event.data.split('\n')

    const times = []
    const values = []

    for (const elm of split) {
      const [t, v] = elm.split(' ')
      times.push(Number(t))
      values.push(Number(v))
    }

    return { t: times, v: values }
  }

  getCsvResult (event: any) {
    const filepath = event.lastEventId
    const csvType = filepath
      .split('/')
      .pop()
      .split('.')[0]
    switch (csvType) {
      case 'profile':
        // profile.result.csv
        return this.profileCsvData(event)
      default:
        console.error('file category not support yet!')
    }
  }

  // todo support outputs from nnabla.utils.GraphProfiler
  profileCsvData (event: Event) {
    const profile: any = {}

    // todo: fix parser

    // const parser = parse({ delimiter: ',' })
    // parser.on('readable', () => {

    // const csv = new CSV(event.data, {
    //   cast: false
    // })
    // const csvArr = csv.parse()
    // //  in profile.result.csv, profile data starts at 6th row, and 12 rows contain profile attributes
    // const dataArr = csvArr.splice(6, csvArr.length - 12)
    // //  get data from profile.result.csv and store in an object
    // csvArr.filter((x: string) => x !== '').forEach((y: any) => { profile[y[0]] = y[1] })
    // profile.data = dataArr
    // profile.type = 'profile'
    return profile
  }

  // unused method?
  deleteChartInfo = (rootDir: string, id: string, store: any) => {
    const o = {
      chartTitle: Path.basename(id).split('.')[0],
      data: {
        name: Path.join(rootDir, Path.dirname(id))
      }
    }

    store.commit('deleteChartData', o)
  }

  /** SSE event listeners **/
  directoryStructureEventListener (event: Event) {
    const filePath = (event as SSEEvent).lastEventId
    console.log(event)

    store.commit('updateDirectoryStructure', { path: filePath })
  }

  fileContentEventListener (event: Event) {
    const filePath = (event as SSEEvent).lastEventId
    console.log(event)

    const fileType = PathOperator.getFileType(filePath)

    if (fileType === null) return

    let data
    if (fileType === 'nntxtFiles') {
      data = this.getGraphInfoFromNNtxt(event)
    } else if (fileType === 'monitorFiles') {
      data = this.getMonitorInfo(event)
    } else if (fileType === 'csvResultFiles') {
      data = this.getCsvResult(event)
    }

    store.commit('updateFileContent', { path: filePath, data })
  }
}

const SSE = new SSEHelper()

export { SSE }
