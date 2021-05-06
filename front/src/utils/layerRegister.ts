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

  initialize (params?: Parameter[]): void {
    this.counter = 0
    this.layers = {}
    this.links = []
    if (params) {
      this.allParameters = params
    }
  }

  addLayer (func: NNtxtFunction, depth: number): [Layer, boolean] {
    if (!Object.prototype.hasOwnProperty.call(this.layers, func.name)) {
      // first visit
      let visitCount = 1
      const parameters = []
      const buffers = []

      // collect all function parameters
      for (const _input of func.input) {
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
