import { httpClient } from './httpClient'

class NnablaCore {
  nnablaApi: object = {}
  allFunctions: any[] = []

  constructor () {
    httpClient.getNnablaApi().then(res => {
      this.nnablaApi = JSON.parse(res.data)
      this.allFunctions = this.getAllFuncionsRecursive(this.nnablaApi)
    })
  }

  getAllFuncionsRecursive (obj: any) {
    let ret: any[] = []
    if (typeof obj.snake_name !== 'undefined') {
      ret.push(obj)
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        ret = ret.concat(this.getAllFuncionsRecursive(obj[key]))
      }
    }
    return ret
  }

  getNnablaApi () {
    return this.nnablaApi
  }

  getAllFunctions () {
    return this.allFunctions
  }

  findFunction (layerType: string) {
    // workaround for some incorrect cases
    const target = layerType.toLowerCase()
    return this.getAllFunctions()
      .find((functionInfo: any) => functionInfo.layer_name.toLowerCase() === target)
  }
}

const nnablaCore = new NnablaCore()
export { nnablaCore }
