import { AnyObject } from '@/types/basic'
import { RawFunction } from '@/types/nnablaApi'

import { httpClient } from './httpClient'

class NnablaCore {
  nnablaApi: AnyObject = {}
  allFunctions: RawFunction[] = []

  constructor () {
    httpClient.getNnablaApi().then(res => {
      this.nnablaApi = JSON.parse(res.data)
      this.allFunctions = this.getAllFuncionsRecursive(this.nnablaApi)
    })
  }

  getAllFuncionsRecursive (obj: AnyObject | RawFunction): RawFunction[] {
    let ret: RawFunction[] = []
    if (typeof obj.snake_name !== 'undefined') {
      ret.push(obj as RawFunction)
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

  getAllFunctions (): RawFunction[] {
    return this.allFunctions
  }

  findFunction (layerType: string): RawFunction {
    // workaround for some incorrect cases
    const target = layerType.toLowerCase()
    return this.getAllFunctions().find(
      (functionInfo: RawFunction) => functionInfo.layer_name.toLowerCase() === target
    ) as RawFunction
  }
}

const nnablaCore = new NnablaCore()
export { nnablaCore }
