// Copyright 2021 Sony Corporation.
// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as d3 from 'd3'
import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators'
import { Graph, Node } from '@/types/graph'
import { GraphBuilder } from '@/utils/graphBuilder'
import { GraphInfoState } from '@/types/store'
import { httpClient } from '@/utils/httpClient'
import store from '@/store'

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
  SET_GRAPHS (graphs: Graph[]): void {
    this.graphs = graphs
  }

  @Mutation
  SET_PREV_GRAPH (graph: Graph): void {
    this.prevGraph = graph
  }

  @Mutation
  SET_NNTXT_PATH (path: string): void {
    this.nntxtPath = path
  }

  @Mutation
  SET_ACTIVE_LAYER_INDEX (index: number): void {
    this.activeIndex.layer = index
  }

  @Mutation
  SET_ACTIVE_GRAPH_INDEX (index: number): void {
    this.activeIndex.graph = index
  }

  @Mutation
  SET_NODE_POSITION ({
    index,
    x,
    y
  }: {index: number; x: number; y: number}): void {
    const activeGraph = getActiveGraph(this)
    activeGraph.nodes[index].position.x = x
    activeGraph.nodes[index].position.y = y
  }

  @Mutation
  SET_IS_DRAGGING (isDragging: boolean): void {
    this.isDragging = isDragging
  }

  @Mutation
  SET_ASSIST_AREA_SIZE ({ x, y }: {x: number; y: number}): void {
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
  fetchGraph (path: string): void {
    this.SET_PREV_GRAPH(this.graphs[this.activeIndex.graph] || {})
    httpClient.getFileContent(path).then(res => {
      // Sent data by http is already json. Don't have convert it explicitly.
      const builder = new GraphBuilder(res.data)
      const data = builder.build()
      this.context.dispatch(
        'directoryInfo/updateFileContent',
        { path, data },
        { root: true }
      )

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
      this.context.commit(
        'directoryInfo/SET_ACTIVE_FILE',
        path,
        { root: true }
      )
    })
  }

  @Action({ rawError: true })
  updateActiveGraph (index: number): void {
    this.SET_PREV_GRAPH(this.graphs[this.activeIndex.graph] || {})
    this.SET_ACTIVE_GRAPH_INDEX(index)
    this.SET_ACTIVE_LAYER_INDEX(-1)
  }

  @Action({ rawError: true })
  resetGraphs (): void {
    this.SET_GRAPHS([])
    this.SET_PREV_GRAPH({ nodes: [], links: [] })
  }

  @Action({})
  resetNNtxtPath (): void {
    this.SET_NNTXT_PATH('')
  }
}

export default getModule(GraphInfoStateModule)
