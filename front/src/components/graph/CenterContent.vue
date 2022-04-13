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

<template>
  <center-content-base>
    <graph
      v-show="nnablaFunctions.length > 0"
      :active-graph="activeGraph"
      :prev-graph="prevGraph"
      :is-dragging="isDragging"
      :assist-area-size="assistAreaSize"
      :active-graph-index="activeGraphIndex"
      :graphs="graphs"
      :nntxt-path="nntxtPath"
      :nnabla-functions="nnablaFunctions"
    />
  </center-content-base>
</template>

<script lang="ts">
import CenterContentBase from '@/components/CenterContentBase.vue'
import { Graph } from '@/types/graph'
import GraphViewer from '@/components/center/GraphViewer.vue'
import { RawFunction } from '@/types/nnablaApi'
import { Vector2D } from '@/types/geometry'
import Vue from 'vue'
import globalState from '@/store/modules/globalInfo'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  components: {
    'center-content-base': CenterContentBase,
    graph: GraphViewer
  },
  computed: {
    graphs: function (): Graph[] {
      return graphInfoState.graphs
    },
    activeGraphIndex: function (): number {
      return graphInfoState.activeIndex.graph
    },
    nntxtPath: function (): string {
      return graphInfoState.nntxtPath
    },
    activeGraph: function (): Graph {
      return graphInfoState.activeGraph
    },
    prevGraph: function (): Graph {
      return graphInfoState.prevGraph
    },
    isDragging: function (): boolean {
      return graphInfoState.isDragging
    },
    assistAreaSize: function (): Vector2D {
      return graphInfoState.assistAreaSize
    },
    nnablaFunctions: function (): RawFunction[] {
      return globalState.nnablaFunctions
    }
  }
})
</script>
