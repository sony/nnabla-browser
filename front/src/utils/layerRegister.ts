import { Function } from '@/utils/nnablaApi'
import { range } from '@/utils/arrayOperator'

export interface LayerInfo extends Function {
  name: string;
  input: string[];
  output: string[];
  index: number;
  depth: number[] | number;
  visitCount: number;
  parameters: Parameter[];
}

export interface Link {
  destination: number;
  source: number;
}

export interface Shape {
  dim: number[];
}

export interface Parameter {
  name: string;
  shape: Shape;
  type: string;
}

interface Depth2Layers {
  [key: number]: {needSlice: number; layers: Array<LayerInfo>};
}

export class LayerRegister {
  counter = 0
  layers: { [key: string]: LayerInfo } = {}
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

  addLayer (layer: LayerInfo, depth: number): [LayerInfo, boolean] {
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
      (this.layers[layer.name].depth as number[]).push(depth)
      this.layers[layer.name].visitCount++
    }

    const retLayer = this.layers[layer.name]

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
