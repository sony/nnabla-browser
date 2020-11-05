
const state = {
  activeTabName: 'graph'
}

const mutations = {
  changeActiveTab: function (state, tabName) {
    state.activeTabName = tabName.toLowerCase()
  }
}

const editor = {
  state,
  mutations
}

export default editor
