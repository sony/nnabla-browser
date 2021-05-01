import axios, { AxiosResponse } from 'axios'
import * as Path from 'path'

class HttpClient {
  BaseURL: string

  constructor () {
    if (process.env.NODE_ENV === 'development') {
      this.BaseURL = 'http://localhost:8888/subscribe/'
    } else {
      this.BaseURL = 'subscribe/'
    }
  }

  getNnablaApi (): Promise<AxiosResponse> {
    return axios.get(this.BaseURL + 'nnabla-api')
  }

  getFileContent (path: string): Promise<AxiosResponse> {
    return axios.post(this.BaseURL + 'file-content', { path: path })
  }
}

const httpClient = new HttpClient()
export { httpClient }
