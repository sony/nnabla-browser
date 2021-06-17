import * as d3 from 'd3'
import store from '@/store'
import { Graph, Link, Node } from '@/types/graph'
import { GraphInfoState } from '@/types/store'
import { GraphBuilder } from '@/utils/graphBuilder'
import { httpClient } from '@/utils/httpClient'
import { Mutation, Action, VuexModule, Module, getModule } from 'vuex-module-decorators'

function getActiveGraph (state: GraphInfoState): Graph {
  return state.graphs[state.activeIndex.graph] || {}
}

@Module({ dynamic: true, store, namespaced: true, name: 'graphInfo' })
class GraphInfoStateModule extends VuexModule implements GraphInfoState {
  prevGraph: Graph = { nodes: [], links: [] }
  graphs: Graph[] = []
  nntxtPath = ''
  activeIndex: { graph: number; layer: number } = { graph: -1, layer: -1 }
  isDragging = false
  assistAreaSize: { x: number; y: number } = { x: 0, y: 0 }

  @Mutation
  SET_GRAPHS (graphs: Graph[]) {
    this.graphs = graphs
  }

  @Mutation
  SET_PREV_GRAPH (graph: Graph) {
    this.prevGraph = graph
  }

  @Mutation
  SET_NNTXT_PATH (path: string) {
    this.nntxtPath = path
  }

  @Mutation
  SET_ACTIVE_LAYER_INDEX (index: number) {
    this.activeIndex.layer = index
  }

  @Mutation
  SET_ACTIVE_GRAPH_INDEX (index: number) {
    this.activeIndex.graph = index
  }

  @Mutation
  SET_NODE_POSITION ({ index, x, y }: {index: number; x: number; y: number}) {
    const activeGraph = getActiveGraph(this)
    activeGraph.nodes[index].position.x = x
    activeGraph.nodes[index].position.y = y
  }

  @Mutation
  ADD_NEW_LINK (link: Link) {
    this.activeGraph.links.push(link)
  }

  @Mutation
  SET_IS_DRAGGING (isDragging: boolean) {
    this.isDragging = isDragging
  }

  @Mutation
  SET_ASSIST_AREA_SIZE ({ x, y }: {x: number; y: number}) {
    this.assistAreaSize.x = x
    this.assistAreaSize.y = y
  }

  get activeGraph (): Graph {
    return getActiveGraph(this)
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

      this.SET_GRAPHS(data)
      this.SET_NNTXT_PATH(path)
      this.SET_ACTIVE_LAYER_INDEX(-1)
      this.SET_ACTIVE_GRAPH_INDEX(0)
      this.context.commit('directoryInfo/updateActiveFile', path, { root: true })
    })
  }

  @Action({ rawError: true })
  updateActiveGraph (index: number) {
    this.SET_PREV_GRAPH(this.graphs[this.activeIndex.graph] || {})
    this.SET_ACTIVE_GRAPH_INDEX(index)
    this.SET_ACTIVE_LAYER_INDEX(-1)
  }

  @Action({ rawError: true })
  resetGraphs () {
    this.SET_GRAPHS([])
    this.SET_PREV_GRAPH({ nodes: [], links: [] })
  }

  @Action({})
  resetNNtxtPath () {
    this.SET_NNTXT_PATH('')
  }
}

export default getModule(GraphInfoStateModule)
