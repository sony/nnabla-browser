<template>
  <div
    class="nnc-invoker"
    :class="['navbar-el', activeTabName === tabName ? 'active' : '']"
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

export default Vue.extend({
  props: ['tabName'],
  computed: {
    activeTabName: function () {
      return this.$store.state.editor.activeTabName
    }
  },
  methods: {
    changeActiveTab: function (tabName: string) {
      this.$store.commit('changeActiveTab', tabName)
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
