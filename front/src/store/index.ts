import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '../types/store'
import Vue from 'vue'

// for debug
Vue.config.devtools = true

Vue.use(Vuex)

const store: StoreOptions<RootState> = { modules: {} }

export default new Vuex.Store<RootState>(store)
