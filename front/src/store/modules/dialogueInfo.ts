
import { Module, MutationTree, GetterTree, ActionTree } from 'vuex'
import { RootState, DialogueInfoState } from '@/store/types'

import $ from 'jquery'

const state: DialogueInfoState = {
  data: {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  },
  isMaskActive: false,
  dialogueType: 'input',
  defaultStr: '',
  inputStr: '',
  inputDef: $.Deferred()
}

const mutations: MutationTree<DialogueInfoState> = {
  restoreBodyRect: function (state, rect) {
    state.data.windowWidth = rect.w
    state.data.windowHeight = rect.h
  },
  changeMaskStatus: function (state, s) {
    state.data.windowWidth = window.innerWidth
    state.data.windowHeight = window.innerHeight
    state.isMaskActive = s
  },
  changeDialogueType: function (state, t) {
    state.dialogueType = t
  },
  setDefaultStr: function (state, s) {
    state.defaultStr = s
  },
  resolveDialogueStr: function (state, s) {
    state.inputDef.resolve(s)
  },
  resetInputDef: function (state) {
    state.inputDef = $.Deferred()
  }
}

const getters: GetterTree<DialogueInfoState, RootState> = {
  inputStrDef: function (state) {
    return state.inputDef.promise()
  }
}

const actions: ActionTree<DialogueInfoState, RootState> = {
  emitStr: function (context, s) {
    context.commit('resolveDialogueStr', s)
  },
  emitCancel: function (context) {
    context.commit('resolveDialogueStr', null)
  }
}

export const dialogueInfo: Module<DialogueInfoState, RootState> = {
  state,
  mutations,
  getters,
  actions
}
