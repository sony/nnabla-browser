import { GetterTree, Module, MutationTree } from 'vuex'
import { Graph, Link, Node } from '@/types/graph'
import { GraphInfoState, RootState } from '@/types/store'

const getActiveGraph = (state: GraphInfoState): Graph => {
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

    activeGraph.nodes[index].position.x = x
    activeGraph.nodes[index].position.y = y
  },

  addNewLink: function (
    state,
    link: Link
  ) {
    const activeGraph = getActiveGraph(state)
    activeGraph.links.push(link)
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

  activeLayer: (state, getters): Node => {
    if (Object.prototype.hasOwnProperty.call(getters.activeGraph, 'nodes')) {
      return getters.activeGraph.nodes[state.activeIndex.layer] || {}
    }
    return {} as Node
  },

  activeLinks: (state, getters) => (id: number): Link[] => {
    const ret = []
    for (const index in getters.activeGraph.links) {
      const link: Link = getters.activeGraph.links[index]
      if (link.srcNodeId === id || link.destNodeId === id) {
        ret.push({ ...link, index: Number(index) })
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
