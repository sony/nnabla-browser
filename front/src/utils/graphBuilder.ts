// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Graph, Layer, Link, Node } from '@/types/graph'
import { NNtxt, NNtxtFunction, Parameter, Variable } from '@/types/nnablaApi'
import { Definitions } from '@/utils/definitions'
import { LayerRegister } from '@/utils/layerRegister'
import { Vector2D } from '@/types/geometry'

const GRID = Definitions.EDIT.GRID.SIZE

function createDummyInput (variable: Variable): NNtxtFunction {
  return {
    input: [],
    name: variable.dataName,
    output: [variable.variableName],
    type: 'InputVariable',
    param: {}
  }
}

function createDummyOutputLayer (variable: Variable): NNtxtFunction {
  return {
    input: [variable.variableName],
    name: variable.dataName,
    output: [],
    type: 'OutputVariable',
    param: {}
  }
}

function createDummyParameter (parameter: Parameter): NNtxtFunction {
  return {
    input: [],
    name: parameter.name,
    output: [parameter.name],
    type: 'Parameter',
    param: {}
  }
}

function setupGetNodeAndLinkRecursive (
  layerRegister: LayerRegister,
  functions: NNtxtFunction[],
  outputVariables: Variable[]
): (arg1: Layer, arg2: number) => void {
  const recursive = (
    sourceLayer: Layer,
    sourceDepthFromRoot: number
  ): void => {
    for (const sourceOutput of sourceLayer.output) {
      // find user define output
      const outputVariableIndex = outputVariables.findIndex(
        (v: Variable) => v.variableName === sourceOutput
      )
      if (outputVariableIndex > -1) {
        const tmpLayer = createDummyOutputLayer(
          outputVariables[outputVariableIndex]
        )

        const [layer] = layerRegister.addLayer(
          tmpLayer as NNtxtFunction,
          sourceDepthFromRoot + 1
        )

        const link: Link = {
          srcNodeId: sourceLayer.index,
          destNodeId: layer.index
        }

        layerRegister.addLink(link)
      }

      const destLayers = functions.filter((f: NNtxtFunction) =>
        (f.input || []).find((name: string) => name === sourceOutput)
      )

      const depthIncrement = destLayers.length > 1 ? 2 : 1

      for (const destLayer of destLayers) {
        const tmpLayer = {
          ...destLayer
        }

        const [layer, isVisitEnough] = layerRegister.addLayer(
          tmpLayer as Layer,
          sourceDepthFromRoot + depthIncrement
        )

        const link: Link = {
          srcNodeId: sourceLayer.index,
          destNodeId: layer.index
        }

        layerRegister.addLink(link)

        if (isVisitEnough) {
          recursive(layer, Math.max(...layer.depth as number[]))
        }
      }
    }
  }

  return recursive
}

function computeLayerPosition (depth: number, needSlice: number): Vector2D {
  return { x: GRID * needSlice * 15, y: GRID * depth * 4 }
}

export class GraphBuilder {
  nntxt: NNtxt;

  constructor (nntxt: NNtxt) {
    this.nntxt = nntxt
  }

  build (): Graph[] {
    const graphInfoArray: Graph[] = []
    const networks = this.nntxt.network || []
    const executors = this.nntxt.executor || []

    for (const executor of executors) {
      const layerRegister = new LayerRegister()
      const network = networks.find(x => x.name === executor.networkName)

      if (typeof network === 'undefined') continue
      const variableMap = new Map()
      network.variable.forEach(x => variableMap.set(x.name, x))

      const inputVariables = executor.dataVariable
      const outputVariables = executor.outputVariable

      const functions: NNtxtFunction[] = []
      const noInputFunctions: NNtxtFunction[] = []
      network.function.forEach((f: NNtxtFunction) => {
        if (f.input !== undefined) functions.push(f)
        else noInputFunctions.push({ ...f, input: [] })
      })

      const allParameters = network.variable.filter(
        x => x.type === 'Parameter'
      )

      layerRegister.initialize(allParameters)

      const recursive = setupGetNodeAndLinkRecursive(
        layerRegister,
        functions,
        outputVariables
      )

      // create input nodes
      const inputLayers = [
        ...inputVariables.map(createDummyInput),
        ...noInputFunctions
      ]

      // recursively register layers
      for (const inputLayer of inputLayers) {
        const [layer] = layerRegister.addLayer(inputLayer, 0)
        recursive(layer, 0)
      }

      // if there are rogue parameters, add them as parameter layers
      const visitedSize = layerRegister.visistedParameters.size
      const totalSize = layerRegister.allParameters.length
      if (visitedSize < totalSize) {
        for (const parameter of layerRegister.allParameters) {
          if (!layerRegister.visistedParameters.has(parameter)) {
            const inputLayer = createDummyParameter(parameter)
            const [layer] = layerRegister.addLayer(inputLayer, 0)
            recursive(layer, 0)
          }
        }
      }

      const depthToLayers = layerRegister.getDepthToLayers()

      const nodes: Node[] = []
      for (let { needSlice, layers } of Object.values(depthToLayers)) {
        for (const layer of layers.sort((a: number, b: number) =>
          a > b ? 1 : -1
        )) {
          nodes.push({
            ...layer,
            position: computeLayerPosition(layer.depth, needSlice++)
          })
        }
      }

      nodes.sort((a, b) => (a.index > b.index ? 1 : -1))
      nodes.forEach(a => {
        const b = a.type === 'OutputVariable' ? a.input : a.output
        for (const x of b) {
          const v = variableMap.get(x)
          if (v.shape.dim === undefined) {
            a.outputShape = []
          } else {
            a.outputShape = v.shape.dim
          }
        }
      })

      const links = layerRegister.links

      graphInfoArray.push({ name: executor.name, nodes, links })
    }

    return graphInfoArray
  }
}
