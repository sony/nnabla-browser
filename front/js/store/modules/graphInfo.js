import Vue from 'vue/dist/vue.esm.js'

const getActiveGraph = state => {
  return state.graphs[state.activeIndex.Graph] || {}
}

const updatePrevGraph = state => {
  Vue.set(state, 'prevGraph', state.graphs[state.activeIndex.Graph] || {})
}

const state = {
  prevGraph: {},
  graphs: [],
  nntxtPath: '',
  activeIndex: { Graph: -1, Layer: -1 },
  isDragging: false,
  assistAreaSize: { x: 0, y: 0 }
}

const mutations = {
  setGraphs: function (state, graphs) {
    updatePrevGraph(state)

    Vue.set(state, 'graphs', graphs)

    state.activeIndex.Graph = 0
    state.activeIndex.Layer = -1
  },

  resetGraphs: function (state) {
    Vue.set(state, 'graphs', [])
    updatePrevGraph(state)
  },

  setActiveGraphIndex: function (state, index) {
    updatePrevGraph(state)

    state.activeIndex.Graph = index
    state.activeIndex.Layer = -1
  },

  setNNtxtPath: function (state, path) {
    state.nntxtPath = path
  },

  resetNNtxtPath: function (state) {
    state.nntxtPath = ''
  },

  setActiveLayerIndex: function (state, index) {
    state.activeIndex.Layer = index
  },

  setNodePosition: function (state, { index, x, y }) {
    const activeGraph = getActiveGraph(state)

    activeGraph.nodes[index].x = x
    activeGraph.nodes[index].y = y
  },

  addNewLink: function (state, { source, destination }) {
    const activeGraph = getActiveGraph(state)

    activeGraph.links.push({ source, destination })
  },

  startDragging: function (state) {
    state.isDragging = true
  },

  endDragging: function (state) {
    state.isDragging = false
  },

  setAssistAreaSize: function (state, { x, y }) {
    state.assistAreaSize.x = x
    state.assistAreaSize.y = y
  }
}

const getters = {
  activeGraph: getActiveGraph,

  activeLayer: (state, getters) => {
    if (getters.activeGraph.hasOwnProperty('nodes')) {
      return getters.activeGraph.nodes[state.activeIndex.Layer] || {}
    } else {
      return {}
    }
  },

  activeLinks: (state, getters) => (id) => {
    const ret = []
    for (const index in getters.activeGraph.links) {
      const link = getters.activeGraph.links[index]
      if (link.source === id || link.destination === id) {
        ret.push({ index, ...link })
      }
    }

    return ret
  }
}

const graphInfoModule = {
  state,
  mutations,
  getters
}

export default graphInfoModule
