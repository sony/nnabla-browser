import { MonitorSeriesData } from '@/types/monitor'

export class MonitorBuilder {
  rawData: string

  constructor (rawData: string) {
    this.rawData = rawData
  }

  build (): MonitorSeriesData {
    const split = this.rawData.split('\n')

    const times = []
    const values = []

    for (const elm of split) {
      const [t, v] = elm.split(' ')
      times.push(Number(t))
      values.push(Number(v))
    }

    return { t: times, v: values }
  }
}
