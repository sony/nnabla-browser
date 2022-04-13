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
    <header-bar active-tab-name="graph" />
    <div class="main-content">
      <left-menu />
      <center-content />
    </div>
  </div>
</template>

<script lang="ts">
import CenterContent from '@/components/graph/CenterContent.vue'
import Header from '@/components/Header.vue'
import LeftMenu from '@/components/graph/LeftMenu.vue'
import Vue from 'vue'
import directoryInfoState from '@/store/modules/directoryInfo'
import graphInfoState from '@/store/modules/graphInfo'

export default Vue.extend({
  components: {
    'left-menu': LeftMenu,
    'center-content': CenterContent,
    'header-bar': Header
  },
  watch: {
    $route: function (): void {
      this.initializeByUrl()
    }
  },
  mounted: function (): void {
    this.initializeByUrl()
  },
  methods: {
    initializeByUrl: function (): void {
      if (this.$route.query.path) {
        graphInfoState.fetchGraph(this.$route.query.path as string)
      } else {
        graphInfoState.resetGraphs()
        directoryInfoState.SET_ACTIVE_FILE('')
      }
    }
  }
})
</script>

<style>
div.main-content {
  display: flex;
}
</style>
