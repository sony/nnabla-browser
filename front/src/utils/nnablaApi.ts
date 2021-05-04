import { AnyObject } from '@/types/basic'
import { Function } from '@/types/nnablaApi'

import { httpClient } from './httpClient'

class NnablaCore {
  nnablaApi: AnyObject = {}
  allFunctions: Function[] = []

  constructor () {
    httpClient.getNnablaApi().then(res => {
      this.nnablaApi = JSON.parse(res.data)
      this.allFunctions = this.getAllFuncionsRecursive(this.nnablaApi)
      console.log(this.allFunctions)
    })
  }

  getAllFuncionsRecursive (obj: AnyObject | Function): Function[] {
    let ret: Function[] = []
    if (typeof obj.snake_name !== 'undefined') {
      ret.push(obj as Function)
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        ret = ret.concat(this.getAllFuncionsRecursive((obj as AnyObject)[key] as AnyObject))
      }
    }
    return ret
  }

  getNnablaApi (): AnyObject {
    return this.nnablaApi
  }

  getAllFunctions (): Function[] {
    return this.allFunctions
  }

  findFunction (layerType: string): Function {
    // workaround for some incorrect cases
    const target = layerType.toLowerCase()
    return this.getAllFunctions().find(
      (functionInfo: Function) => functionInfo.layer_name.toLowerCase() === target
    ) as Function
  }
}

const nnablaCore = new NnablaCore()
export { nnablaCore }
