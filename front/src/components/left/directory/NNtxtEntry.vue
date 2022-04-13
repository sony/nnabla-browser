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
    class="nntxt-entry"
    :class="{ active: isSelected }"
    @click="clickEvent"
  >
    {{ nntxt.name }}
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NNtxtFile } from '@/types/store'

export default Vue.extend({
  props: {
    activeFile: {
      type: String,
      required: true
    },
    nntxt: {
      type: Object as PropType<NNtxtFile>,
      required: true
    },
    dirName: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  },
  computed: {
    nntxtPath: function (): string {
      return (this.level > 0 ? this.dirName + '/' : '') + this.nntxt.name
    },
    isSelected: function (): boolean {
      return this.activeFile === this.nntxtPath
    }
  },
  methods: {
    clickEvent: function (): void {
      if (!this.isSelected) {
        this.$router.push({ path: '/graph', query: { path: this.nntxtPath } })
      }
    }
  }
})
</script>

<style>
.nntxt-entry {
  cursor: pointer;
  user-select: none;
  height: 30px;
  line-height: 30px;
}

.nntxt-entry.active {
  cursor: pointer;
  color: var(--color-brand);
  background: var(--color-gray0);
}

.nntxt-entry:hover {
  background: var(--color-gray0);
}
</style>
