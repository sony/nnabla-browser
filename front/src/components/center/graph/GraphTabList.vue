// Copyright 2021,2022 Sony Group Corporation.
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
  <div class="graph-tab-list">
    <graph-tab
      v-for="(graph, index) in graphs"
      :key="index"
      :graph="graph"
      :index="index"
      :selected="index === activeGraphIndex"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Graph } from '@/types/graph'
import GraphTab from '@/components/center/graph/GraphTab.vue'

export default Vue.extend({
  components: {
    'graph-tab': GraphTab
  },
  props: {
    activeGraphIndex: {
      type: Number,
      required: true
    },
    graphs: {
      type: Array as PropType<Graph[]>,
      required: true
    }
  }
})
</script>

<style>
.graph-tab-list {
  width: 100%;
  height: 41px;
  border-bottom: solid 1px var(--color-gray2);
  overflow: auto;
}
</style>
