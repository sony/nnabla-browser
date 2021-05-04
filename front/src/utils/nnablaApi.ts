import { httpClient } from './httpClient'

interface Dict {
  [key: string]: Dict;
}
export interface Function {
  api_type: string;
  arguments: {[key: string]: Dict};
  inputs: Dict;
  color: string;
  layer_name: string;
  snake_name: string;
}

class NnablaCore {
  nnablaApi: Dict = {}
  allFunctions: Function[] = []

  constructor () {
    httpClient.getNnablaApi().then(res => {
      this.nnablaApi = JSON.parse(res.data)
      this.allFunctions = this.getAllFuncionsRecursive(this.nnablaApi)
    })
  }

  getAllFuncionsRecursive (obj: Dict | Function): Function[] {
    let ret: Function[] = []
    if (typeof obj.snake_name !== 'undefined') {
      ret.push(obj as Function)
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        ret = ret.concat(this.getAllFuncionsRecursive((obj as Dict)[key]))
      }
    }
    return ret
  }

  getNnablaApi (): Dict {
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
