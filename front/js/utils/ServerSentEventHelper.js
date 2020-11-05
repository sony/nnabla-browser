import Definition from './../misc/Definitions'
import { range } from './arrayOperator'

import CSV from 'comma-separated-values'

const Path = require('path')

const SSEhelper = function () {
  const GRID = Definition.EDIT.GRID.SIZE

  const createDummyInputLayer = variable => {
    return {
      inputParam: null,
      input: [],
      name: variable.dataName,
      output: [variable.variableName],
      type: 'InputVariable'
    }
  }

  const createDummyOutputLayer = variable => {
    return {
      outputParam: null,
      input: [variable.variableName],
      name: variable.dataName,
      output: [],
      type: 'OutputVariable'
    }
  }

  const layerRegisterCtor = function () {
    this.initialize = (parameters) => {
      this.counter = 0
      this.layers = {}
      this.links = []
      this.allParameters = parameters
    }

    this.addLayer = (layer, depth) => {
      if (!this.layers.hasOwnProperty(layer.name)) { // first visit
        let visitCount = 1
        const parameters = []
        const buffers = []

        // collect all function parameters
        for (const _input of layer.input) {
          const varIndex = this.allParameters.findIndex(x => x.name === _input)
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
      } else { // visit again
        this.layers[layer.name].depth.push(depth)
        this.layers[layer.name].visitCount++
      }

      const retLayer = this.layers[layer.name]

      return [retLayer, retLayer.input.length <= retLayer.visitCount]
    }

    this.addLink = link => this.links.push(link)

    this.getDepthToLayers = () => {
      const depth2layers = {}

      Object.values(this.layers).forEach(layer => {
        const depthList = layer.depth
        const maxDepth = Math.max(...depthList)

        if (layer.depth.length > 1) {
          const minDepth = Math.min(...depthList)

          for (const i of range(minDepth, maxDepth, true)) {
            const slice = depthList.filter(x => x - 1 < i).length
            if (depth2layers.hasOwnProperty(i)) depth2layers[i].needSlice += slice
            else depth2layers[i] = { needSlice: slice, layers: [] }
          }
        }

        if (depth2layers.hasOwnProperty(maxDepth)) {
          depth2layers[maxDepth].layers.push({
            ...layer,
            depth: maxDepth
          })
        } else depth2layers[maxDepth] = { needSlice: 0, layers: [{ ...layer, depth: maxDepth }] }
      })

      return depth2layers
    }

    this.getLinks = () => this.links // for further update to do something like sort.

    this.initialize()
  }

  this.layerRegister = new layerRegisterCtor()

  const getLayerPosition = (depth, needSlice) => {
    return { x: GRID * needSlice * 15, y: GRID * depth * 4 } // this calculation for x is bad
  }

  const setupGetNodeAndLinkRecursive = (functions, outputVariables) => {
    const recursive = (sourceLayer, sourceDepthFromRoot) => {
      for (const sourceOutput of sourceLayer.output) {
        // find user define output
        const outputVariableIndex = outputVariables.findIndex(v => v.variableName === sourceOutput)
        if (outputVariableIndex > -1) {
          const tmpLayer = createDummyOutputLayer(outputVariables[outputVariableIndex])

          const [layer, _] = this.layerRegister.addLayer(tmpLayer, sourceDepthFromRoot + 1)

          const link = {
            source: sourceLayer.index,
            destination: layer.index
          }

          this.layerRegister.addLink(link)
        }

        const destLayers = functions.filter(f => (f.input || []).find(name => name === sourceOutput))

        const depthIncrement = destLayers.length > 1 ? 2 : 1

        for (const destLayer of destLayers) {
          const tmpLayer = {
            ...destLayer
          }

          const [layer, isVisitEnough] = this.layerRegister.addLayer(tmpLayer, sourceDepthFromRoot + depthIncrement)

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

  this.getGraphInfoFromNNtxt = event => {
    const json = JSON.parse(event.data)

    const graphInfoArray = []
    const networks = json.network || []
    const executors = json.executor || []

    for (const executor of executors) {
      const network = networks.find(x => x.name === executor.networkName)

      if (typeof network === 'undefined') continue
      const variableMap = new Map()
      network.variable.forEach(x => variableMap.set(x.name, x))

      const inputVariables = executor.dataVariable // list
      const outputVariables = executor.outputVariable // list

      const functions = []; const noInputFunctions = []
      network.function.forEach(f => {
        if (f.hasOwnProperty('input')) functions.push(f)
        else noInputFunctions.push({ ...f, input: [] })
      })

      const allParameters = network.variable.filter(x => x.type === 'Parameter')

      this.layerRegister.initialize(allParameters)

      const recursive = setupGetNodeAndLinkRecursive(functions, outputVariables)

      // create input nodes
      const inputLayers = [
        ...inputVariables.map(createDummyInputLayer), ...noInputFunctions
      ]

      for (const inputLayer of inputLayers) {
        const [layer, _] = this.layerRegister.addLayer(inputLayer, 0)
        recursive(layer, 0)
      }

      const depthToLayers = this.layerRegister.getDepthToLayers()

      const nodes = []
      for (let { needSlice, layers } of Object.values(depthToLayers)) {
        for (const layer of layers.sort((a, b) => a > b ? 1 : -1)) {
          nodes.push({ ...layer, ...getLayerPosition(layer.depth, needSlice++) })
        }
      }

      nodes.sort((a, b) => a.index > b.index ? 1 : -1)
      nodes.forEach(a => {
        a.outputShape = {}
        const b = a.type === 'OutputVariable' ? a.input : a.output
        for (const x of b) {
          const name = a.type === 'OutputVariable' ? a.name : x
          a.outputShape[`${name}_output_shape`] = variableMap.get(x).shape.dim
        }
      })

      const links = this.layerRegister.getLinks()

      graphInfoArray.push({ name: executor.name, nodes, links })
    }

    return graphInfoArray
  }

  this.getMonitorInfo = event => {
    const split = event.data.split('\n')

    const times = []; const values = []

    for (const elm of split) {
      const [t, v] = elm.split(' ')
      times.push(Number(t))
      values.push(Number(v))
    }

    return { t: times, v: values }
  }

  this.getCsvResult = event => {
    const filepath = event.lastEventId
    const csvType = filepath.split('/').pop().split('.')[0]
    // validation.result.csv , profile.result.csv
    switch (csvType) {
      case 'validation':
        return this.validationCsvData(event)
      case 'profile':
        return this.profileCsvData(event)
      default:
        console.error('file category not support yet!')
    }
  }

  this.validationCsvData = event => {
    const csv = new CSV(event.data, {
      cast: false
    })
    const split = csv.parse()
    const keys = [...split.shift(), 'correctness']

    const values = []

    for (const elm of split) {
      const [path, pred, label] = elm
      values.push([path, parseInt(pred), parseInt(label), pred === label])
    }

    return { keys, values, type: 'validation' }
  }

  this.profileCsvData = event => {
    const profile = {}
    const csv = new CSV(event.data, {
      cast: false
    })
    const csvArr = csv.parse()
    //  in profile.result.csv, profile data starts at 6th row, and 12 rows contain profile attributes
    const dataArr = csvArr.splice(6, csvArr.length - 12)
    //  get data from profile.result.csv and store in an object
    csvArr.filter(x => x != '').forEach(y => profile[y[0]] = y[1])
    profile.data = dataArr
    profile.type = 'profile'
    return profile
  }

  this.deleteChartInfo = (rootDir, id, store) => {
    const o = {
      chartTitle: Path.basename(id).split('.')[0],
      data: {
        name: Path.join(rootDir, Path.dirname(id))
      }
    }

    store.commit('deleteChartData', o)
  }
}

export default new SSEhelper()
