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
  <left-menu-base>
    <div>
      <directory-tree
        :active-file="activeFile"
        :active-tab-name="activeTabName"
        :directory-node="directoryNode"
      />
      <property-area
        v-show="nnablaFunctions.length > 0"
        :active-layer="activeLayer"
        :nnabla-functions="nnablaFunctions"
      />
    </div>
  </left-menu-base>
</template>

<script lang="ts">
import { DirectoryNode } from '@/types/store'
import DirectoryTree from '@/components/left/DirectoryTree.vue'
import LeftMenuBase from '@/components/LeftMenuBase.vue'
import { Node } from '@/types/graph'
import PropertyArea from '@/components/left/PropertyArea.vue'
import { RawFunction } from '@/types/nnablaApi'
import Vue from 'vue'
import directoryInfoState from '@/store/modules/directoryInfo'
import globalState from '@/store/modules/globalInfo'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  components: {
    'left-menu-base': LeftMenuBase,
    'property-area': PropertyArea,
    'directory-tree': DirectoryTree
  },
  computed: {
    activeTabName: function (): string {
      return 'graph'
    },
    isPropertyAreaShow: function (): boolean {
      return this.activeTabName === 'graph'
    },
    activeLayer: function (): Node {
      return graphInfoState.activeLayer
    },
    directoryNode: function (): DirectoryNode {
      return directoryInfoState.data
    },
    activeFile: function (): string {
      return directoryInfoState.activeFile
    },
    nnablaFunctions: function (): RawFunction[] {
      return globalState.nnablaFunctions
    }
  }
})
</script>
