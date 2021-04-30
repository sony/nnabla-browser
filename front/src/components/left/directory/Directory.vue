<template>
  <div class="branch" v-if="checkDisplay">
    <div class="branch-name" @click="expand = !expand;" v-if="info.name.length > 0">
      <img class="icon-small" :src="expandArrow" >
      {{ info.name }}
    </div>

    <div class="components" :style="{display: expand ? 'block' : 'none'}">
      <directory-component
        :info="childInfo"
        :dirName="dirName + '/' + childInfo.name"
        v-for="(childInfo, key) in info.children"
        :key="dirName + ':' + key"
      />

      <nntxts-component
        style="margin-left: 10px"
        v-for="(nntxt, key) in info.nntxtFiles"
        :nntxt="nntxt"
        :dirName="dirName"
        :key="dirName + ':nntxt:' + key"
      />

      <csv-entry
        style="margin-left: 10px"
        v-for="(monitor, key) in info.monitorFiles"
        :monitor="monitor"
        :dirName="dirName"
        :dirId="info.id"
        :key="dirName + ':monitor:' + key"
      />

    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import CSVEntry from './CSVEntry.vue'
import NNtxtEntry from './NNtxtEntry.vue'

export default Vue.extend({
  name: 'directory-component',
  props: ['info', 'dirName'],
  components: {
    'nntxts-component': NNtxtEntry,
    'csv-entry': CSVEntry
  },
  computed: {
    expandArrow: function (): string {
      return `./editor/image/Arrow${this.expand ? 'Down' : ''}.svg`
    },
    checkDisplay: function (): boolean {
      return (
        this.info.children.length +
          this.info.nntxtFiles.length +
          this.info.monitorFiles.length >
        0
      )
    }
  },
  data: function () {
    return { expand: true }
  }
})

</script>

<style>

</style>
