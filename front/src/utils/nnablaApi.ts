import axios from 'axios'

class NnablaCore {
  nnablaApi: object = {}
  allFunctions: any[] = []

  constructor () {
    let url: string
    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:8888/subscribe/nnabla-api'
    } else {
      url = 'subscribe/nnabla-api'
    }

    axios.get(url).then(res => {
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
}

const nnablaCore = new NnablaCore()

export { nnablaCore }
