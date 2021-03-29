import { Module, MutationTree } from 'vuex'
import { RootState, EditorState } from '@/store/types'

const state: EditorState = {
  activeTabName: 'graph'
}

const mutations: MutationTree<EditorState> = {
  changeActiveTab: function (state, tabName) {
    state.activeTabName = tabName.toLowerCase()
  }
}

export const editor: Module<EditorState, RootState> = {
  state,
  mutations
}
