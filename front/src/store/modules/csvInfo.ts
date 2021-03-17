import { Module, MutationTree, GetterTree } from 'vuex'
import { RootState, CsvInfoState } from '@/store/types'

const state: CsvInfoState = {
  path: '',
  data: {} // {values: [[path, predLabel, label]]}
}

const mutations: MutationTree<CsvInfoState> = {
  setCsvResult: function (state, { path, data }) {
    state.path = path
    state.data = { ...state.data, ...data }
  }
}

const getters: GetterTree<CsvInfoState, RootState> = {
  getPartialData: (state, getters) => (index: number, length: number) => {
    return state.data.values.slice(index, index + length - 1)
  },

  confusionMatrix: (state, getters) => {
    const labelLength = getters.labelLength

    const matrix = new Array(labelLength)
    for (let i = 0; i < labelLength; i++) {
      matrix[i] = new Array(labelLength).fill(0)
    }

    if (Object.prototype.hasOwnProperty.call(state.data, 'values')) {
      for (const x of state.data.values) {
        matrix[x[2]][x[1]]++
      }
    }

    return matrix
  },

  labelLength: (state, getters) => {
    if (Object.prototype.hasOwnProperty.call(state.data, 'values')) {
      let max = 0
      for (const x of state.data.values) {
        max = x[2] > max ? x[2] : max
      }

      return max + 1
    } else {
      return 0
    }
  }
}

export const csvInfo: Module<CsvInfoState, RootState> = {
  state,
  mutations,
  getters
}
