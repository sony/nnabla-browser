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
  <div class="editor-navbar">
    <div style="margin-left: 30px;">
      <nav-button
        tab-name="graph"
        :is-active="activeTabName === 'graph'"
      />
      <nav-button
        tab-name="monitoring"
        :is-active="activeTabName === 'monitoring'"
      />
    </div>
    <div class="editor-navbar-center" />
  </div>
</template>

<script lang="ts">
import NavButton from '@/components/header/NavButton.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    'nav-button': NavButton
  },
  props: {
    activeTabName: {
      type: String,
      default: 'graph'
    }
  }
})
</script>

<style>
.editor-navbar {
  width: 100%;
  height: 40px;
  background-color: var(--color-gray5);
}

.editor-navbar-center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  width: 25%;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
</style>
