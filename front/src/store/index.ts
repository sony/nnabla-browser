import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '../types/store'
import Vue from 'vue'
import { config } from 'vuex-module-decorators'

// for debug
Vue.config.devtools = true

// To avoid ERR_ACITION_ACCESS_UNDEFINED
config.rawError = true

Vue.use(Vuex)

const store: StoreOptions<RootState> = { modules: {} }

export default new Vuex.Store<RootState>(store)
