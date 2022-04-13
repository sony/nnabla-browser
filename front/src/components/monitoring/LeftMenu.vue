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
    <directory-tree
      :active-file="activeFile"
      :active-chart-paths="activeChartPaths"
      :active-tab-name="activeTabName"
      :directory-node="directoryNode"
    />
  </left-menu-base>
</template>

<script lang="ts">
import { DirectoryNode } from '@/types/store'
import DirectoryTree from '@/components/left/DirectoryTree.vue'
import LeftMenuBase from '@/components/LeftMenuBase.vue'
import Vue from 'vue'
import chartInfoState from '@/store/modules/chartInfo'
import directoryInfoState from '@/store/modules/directoryInfo'

export default Vue.extend({
  components: {
    'left-menu-base': LeftMenuBase,
    'directory-tree': DirectoryTree
  },
  computed: {
    activeTabName: function (): string {
      return 'monitoring'
    },
    directoryNode: function (): DirectoryNode {
      return directoryInfoState.data
    },
    activeFile: function (): string {
      return directoryInfoState.activeFile
    },
    activeChartPaths: function (): string[] {
      return chartInfoState.activeChartPaths
    }
  }
})
</script>
