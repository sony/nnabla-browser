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
  <div
    class="graphs-tab nnc-invoker"
    :class="{ active: selected }"
    @click="click"
  >
    <span class="graph-name">{{ graph.name }}</span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Graph } from '@/types/graph'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  props: {
    graph: {
      type: Object as PropType<Graph>,
      default: null
    },
    index: {
      type: Number,
      default: -1
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click: function (): void {
      graphInfoState.updateActiveGraph(this.index)
    },
    keydown: (e: KeyboardEvent): void => {
      switch (e.keyCode) {
        case 27:
        case 13:
          ;(e.target as HTMLElement).blur()
          break
        default:
          break
      }
    }
  }
})
</script>

<style>
.graphs-tab {
  float: left;
  height: 39px;
  line-height: 39px;
  padding-right: 8px;
}

.graphs-tab.active {
  box-sizing: border-box;
  border-bottom: solid 2px var(--color-brand);
}

.graphs-tab.active > span > .graph-name {
  color: var(--color-brand);
}

.graphs-tab:hover {
  background-color: var(--color-gray1);
}

.graph-name {
  margin-left: 24px;
  margin-right: 12px;
  font-size: 13px;
  color: var(--color-gray5);
  line-height: 40px;
}
</style>
