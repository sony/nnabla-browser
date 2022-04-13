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
    <div class="title">
      Directory Tree
    </div>
    <div
      class="app-row app-scroll-x app-scroll-y"
      style="top: 40px; bottom: 0;"
    >
      <directory-component
        v-if="typeof directoryNode.name !== 'undefined'"
        :active-file="activeFile"
        :active-chart-paths="activeChartPaths"
        :active-tab-name="activeTabName"
        :directory-node="directoryNode"
        :dir-name="directoryNode.name"
        :level="0"
        :root-node="directoryNode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Directory from './Directory.vue'
import { DirectoryNode } from '@/types/store'

export default Vue.extend({
  components: {
    'directory-component': Directory
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
  }
})
</script>

<style></style>
