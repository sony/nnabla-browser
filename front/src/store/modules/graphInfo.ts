import * as d3 from 'd3'
import { Graph, Link, Node } from '@/types/graph'
import { GraphInfoState } from '@/types/store'
import { GraphBuilder } from '@/utils/graphBuilder'
import { httpClient } from '@/utils/httpClient'
import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class GraphInfoStateModule extends VuexModule implements GraphInfoState {
  prevGraph: Graph = { nodes: [], links: [] }
  graphs: Graph[] = []
  nntxtPath = ''
  activeIndex: { graph: number; layer: number } = { graph: -1, layer: -1 }
  isDragging = false
  assistAreaSize: { x: number; y: number } = { x: 0, y: 0 }

  @Mutation
  setGraphs (graphs: Graph[]) {
    this.graphs = graphs
  }

  @Mutation
  setPrevGraph (graph: Graph) {
    this.prevGraph = graph
  }

  @Mutation
  setNNtxtPath (path: string) {
    this.nntxtPath = path
  }

  @Mutation
  setActiveLayerIndex (index: number) {
    this.activeIndex.layer = index
  }

  @Mutation
  setActiveGraphIndex (index: number) {
    this.activeIndex.graph = index
  }

  @Mutation
  setNodePosition ({ index, x, y }: {index: number; x: number; y: number}) {
    const activeGraph = this.activeGraph
    activeGraph.nodes[index].position.x = x
    activeGraph.nodes[index].position.y = y
  }

  @Mutation
  addNewLink (link: Link) {
    this.activeGraph.links.push(link)
  }

  @Mutation
  setIsDragging (isDragging: boolean) {
    this.isDragging = isDragging
  }

  @Mutation
  setAssistAreaSize ({ x, y }: {x: number; y: number}) {
    this.assistAreaSize.x = x
    this.assistAreaSize.y = y
  }

  @Mutation
  updateGraphs (graphs: Graph[]) {
    this.context.commit('setPrevGraph', this.graphs[this.activeIndex.graph] || {})
    this.context.commit('setGraphs', graphs)
    this.context.commit('setActiveGraphIndex', 0)
    this.context.commit('setActiveLayerIndex', -1)
  }

  @Mutation
  updateActiveGraph (index: number) {
    this.context.commit('setPrevGraph', this.graphs[this.activeIndex.graph] || {})
    this.context.commit('setActiveGraphIndex', index)
    this.context.commit('setActiveLayerIndex', -1)
  }

  @Mutation
  resetGraphs () {
    this.context.commit('setGraphs', [])
    this.context.commit('setPrevGraph', { nodes: [], links: [] })
  }

  @Mutation
  resetNNtxtPath () {
    this.context.commit('setNNtxtPath', '')
  }

  get activeGraph () {
    return this.graphs[this.activeIndex.graph] || {}
  }

  get activeLayer (): Node {
    if (this.activeGraph.nodes) {
      return this.activeGraph.nodes[this.activeIndex.layer] || {}
    } else {
      return {} as Node
    }
  }

  @Action({ rawError: true })
  fetchGraph (path: string) {
    httpClient.getFileContent(path).then(res => {
      // Sent data by http is already json. Don't have convert it explicitly.
      const builder = new GraphBuilder(res.data)
      const data = builder.build()
      this.context.commit('directoryInfo/updateFileContent', { path, data }, { root: true })

      d3.select('#svg-links').style('opacity', 0)
      d3.select('#network-editor')
        .transition()
        .duration(200)
        .attr('opacity', 0.3)
        .transition()
        .duration(1000)
        .attr('opacity', 1)

      this.context.commit('setGraphs', data)
      this.context.commit('setNNtxtPath', path)
      this.context.commit('directoryInfo/updateActiveFile', path, { root: true })
    })
  }
}
