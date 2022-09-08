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

import { Layer, Link } from '@/types/graph'
import { NNtxtFunction, Parameter } from '@/types/nnablaApi'
import { range } from '@/utils/arrayOperator'

interface Depth2Layers {
  [key: number]: {needSlice: number; layers: Array<Layer>};
}
export class LayerRegister {
  counter = 0
  layers: { [key: string]: Layer } = {}
  links: Link[] = []
  allParameters: Parameter[] = []
  visistedParameters: Set<Parameter>

  initialize (params?: Parameter[]): void {
    this.counter = 0
    this.layers = {}
    this.links = []
    this.visistedParameters = new Set<Parameter>()
    if (params) {
      this.allParameters = params
    }
  }

  addLayer (func: NNtxtFunction, depth: number): [Layer, boolean] {
    if (this.layers[func.name] === undefined) {
      // first visit
      const visitCount = 1
      const parameters = []
      const buffers = []

      // collect all function parameters
      for (const _input of func.input) {
        const varIndex = this.allParameters.findIndex(
          (x: { name: string }) => x.name === _input
        )
        if (varIndex > -1) {
          parameters.push(this.allParameters[varIndex])
          this.visistedParameters.add(this.allParameters[varIndex])
        } else {
          buffers.push(_input)
        }
      }

      this.layers[func.name] = {
        ...func,
        input: buffers,
        index: this.counter++,
        depth: [depth],
        visitCount,
        parameters
      }
    } else {
      // visit again
      (this.layers[func.name].depth as number[]).push(depth)
      this.layers[func.name].visitCount++
    }

    const retLayer = this.layers[func.name]
    return [retLayer, retLayer.input.length <= retLayer.visitCount]
  }

  addLink (link: Link): void {
    this.links.push(link)
  }

  getDepthToLayers (): Depth2Layers {
    const depth2layers: Depth2Layers = {}
    Object.values(this.layers).forEach(layer => {
      const depthList = layer.depth as number[]
      const maxDepth = Math.max(...depthList)

      if ((layer.depth as number[]).length > 1) {
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
