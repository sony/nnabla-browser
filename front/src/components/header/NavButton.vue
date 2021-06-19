<template>
  <div
    class="nnc-invoker"
    :class="['navbar-el', isActive ? 'active' : '']"
    @click="changeActiveTab(tabName)"
  >
    <span class="navbar-tab">
      {{ tabName.toUpperCase() }}
    </span>
  </div>
</template>

<script lang="ts">
import EditorWindowSize from '@/utils/editorWindowSize'
import Vue from 'vue'
import globalState from '@/store/modules/globalInfo'

export default Vue.extend({
  props: {
    tabName: {
      type: String,
      default: 'graph'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeActiveTab: function (tabName: string): void {
      globalState.SET_ACTIVE_TAB_NAME(tabName)
      Vue.nextTick(function () {
        EditorWindowSize.init()
      })
    }
  }
})
</script>

<style>
.navbar-tab {
  user-select: none;
}
</style>
