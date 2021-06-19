import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '../types/store'
import Vue from 'vue'
import directoryInfo from './modules/directoryInfo'
import { editor } from './modules/editor'

// for debug
Vue.config.devtools = true

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    editor,
    directoryInfo
  }
}

export default new Vuex.Store<RootState>(store)
