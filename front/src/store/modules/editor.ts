import { EditorState, RootState } from '@/types/store'
import { Module, MutationTree } from 'vuex'

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
