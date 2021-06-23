import axios, { AxiosResponse } from 'axios'

interface FileContent {
  path: string;
  content: string;
}

interface FileContents {
  contents: FileContent[];
}

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
    return axios.post(this.BaseURL + 'file-content', { path })
  }

  getFileContents (paths: string[]): Promise<FileContents> {
    return axios.post(this.BaseURL + 'file-contents', { paths }).then(res => res.data as FileContents)
  }

  activateSSESubscribe (
    path: string,
    connectionId: number
  ): Promise<AxiosResponse> {
    return axios.post(this.BaseURL + 'activate-subscribe', {
      path,
      connectionId
    })
  }

  deactivateSSESubscribe (
    path: string,
    connectionId: number
  ): Promise<AxiosResponse> {
    return axios.post(this.BaseURL + 'deactivate-subscribe', {
      path,
      connectionId
    })
  }
}

const httpClient = new HttpClient()
export { httpClient }
