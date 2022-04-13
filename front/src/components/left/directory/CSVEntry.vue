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
    class="csv-entry"
    :class="{ active: checked }"
    @click="clickArea"
  >
    <label :for="dirName + '/' + monitor.name">{{ monitor.name }}</label>
  </div>
</template>

<script lang="ts">
import { DirectoryNode, MonitorFile } from '@/types/store'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    monitor: {
      type: Object as PropType<MonitorFile>,
      required: true
    },
    activeChartPaths: {
      type: Array as PropType<string[]>,
      required: true
    },
    dirName: {
      type: String,
      required: true
    },
    dirId: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    rootNode: {
      type: Object as PropType<DirectoryNode>,
      required: true
    }
  },
  computed: {
    checked: function (): boolean {
      const path = `${this.dirName}/${this.monitor.name}`
      return this.activeChartPaths.includes(path)
    },
    filePath: function (): string {
      return (this.level > 0 ? this.dirName + '/' : '') + this.monitor.name
    }
  },
  methods: {
    clickArea: function (): void {
      let newActiveChartPaths = []
      if (!this.checked) {
        newActiveChartPaths = this.activeChartPaths.concat([this.filePath])
      } else {
        newActiveChartPaths = this.activeChartPaths
          .filter((path) => path !== this.filePath)
      }
      const query = { activeChartPaths: newActiveChartPaths }
      this.$router.push({ path: 'monitoring', query: query })
    }
  }
})
</script>

<style>
.csv-entry {
  height: 30px;
  line-height: 30px;
}

.csv-entry:hover {
  background: var(--color-gray0);
}

.csv-entry.active {
  color: var(--color-brand);
  background: var(--color-gray0);
}

.csv-entry,
label {
  cursor: pointer;
  user-select: none;
}
</style>
