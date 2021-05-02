import { Module, MutationTree, GetterTree } from 'vuex'
import { RootState, GraphInfoState } from '@/store/types'

const getActiveGraph = (state: GraphInfoState) => {
  return state.graphs[state.activeIndex.graph] || {}
}

const state: GraphInfoState = {
  prevGraph: { nodes: [], links: [] },
  graphs: [],
  nntxtPath: '',
  activeIndex: { graph: -1, layer: -1 },
  isDragging: false,
  assistAreaSize: { x: 0, y: 0 }
}

const mutations: MutationTree<GraphInfoState> = {
  setGraphs: function (state, graphs) {
    state.prevGraph = state.graphs[state.activeIndex.graph] || {}
    state.graphs = graphs
    state.activeIndex.graph = 0
    state.activeIndex.layer = -1
  },

  resetGraphs: function (state) {
    state.graphs = []
    state.prevGraph = { nodes: [], links: [] }
  },

  setActiveGraphIndex: function (state, index) {
    state.prevGraph = state.graphs[state.activeIndex.graph] || {}
    state.activeIndex.graph = index
    state.activeIndex.layer = -1
  },

  setNNtxtPath: function (state, path) {
    state.nntxtPath = path
  },

  resetNNtxtPath: function (state) {
    state.nntxtPath = ''
  },

  setActiveLayerIndex: function (state, index) {
    state.activeIndex.layer = index
  },

  setNodePosition: function (state, { index, x, y }) {
    const activeGraph = getActiveGraph(state)

    activeGraph.nodes[index].x = x
    activeGraph.nodes[index].y = y
  },

  addNewLink: function (
    state,
    { source, destination }: { source: number; destination: number }
  ) {
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

const getters: GetterTree<GraphInfoState, RootState> = {
  activeGraph: getActiveGraph,

  activeLayer: (state, getters) => {
    if (Object.prototype.hasOwnProperty.call(getters.activeGraph, 'nodes')) {
      return getters.activeGraph.nodes[state.activeIndex.layer] || {}
    } else {
      return {}
    }
  },

  activeLinks: (state, getters) => (id: number) => {
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

export const graphInfo: Module<GraphInfoState, RootState> = {
  state,
  mutations,
  getters
}
