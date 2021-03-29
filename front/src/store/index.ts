import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'

import { editor } from './modules/editor'
import { directoryInfo } from './modules/directoryInfo'
import { graphInfo } from './modules/graphInfo'
import { chartInfo } from './modules/chartInfo'
import { csvInfo } from './modules/csvInfo'
import { dialogueInfo } from './modules/dialogueInfo'

// for debug
Vue.config.devtools = true

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    editor,
    directoryInfo,
    graphInfo,
    chartInfo,
    csvInfo,
    dialogueInfo
  }
}

export default new Vuex.Store<RootState>(store)
