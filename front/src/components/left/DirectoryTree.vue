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

<template>
  <div>
    <directory-root
      class="app-row"
      :class="{ graph: isGraph, monitoring: isMonitoring }"
      :active-file="activeFile"
      :active-chart-paths="activeChartPaths"
      :active-tab-name="activeTabName"
      :directory-node="directoryNode"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { DirectoryNode } from '@/types/store'
import DirectoryRoot from './directory/DirectoryRoot.vue'

export default Vue.extend({
  components: {
    'directory-root': DirectoryRoot
  },
  props: {
    activeFile: {
      type: String,
      required: true
    },
    activeChartPaths: {
      type: Array as PropType<string[]>,
      required: true
    },
    activeTabName: {
      type: String,
      required: true
    },
    directoryNode: {
      type: Object as PropType<DirectoryNode>,
      required: true
    }
  },
  computed: {
    isGraph: function (): boolean {
      return this.activeTabName === 'graph'
    },
    isMonitoring: function (): boolean {
      return this.activeTabName === 'monitoring'
    }
  }
})
</script>

<style>
.graph {
  top: 0;
  bottom: 50%;
  border-bottom: 1px solid var(--color-gray2);
}

.monitoring {
  top: 0;
  bottom: 0;
}
</style>
