<template>
  <div class="branch" v-if="checkDisplay">
    <div
      class="branch-name"
      @click="expand = !expand"
      v-if="info.name.length > 0"
    >
      <img class="icon-small" :src="expandArrow" />
      {{ info.name }}
    </div>

    <div class="components" :style="{ display: expand ? 'block' : 'none' }">
      <ul>
        <li
          v-for="(childInfo, key) in info.children"
          :key="dirName + ':' + key"
        >
          <directory-component
            :info="childInfo"
            :dirName="(level > 0 ? dirName + '/' : '') + childInfo.name"
            :level="level + 1"
          />
        </li>
      </ul>

      <ul v-if="activeTabName === 'graph'">
        <li
          v-for="(nntxt, key) in info.nntxtFiles"
          :key="dirName + ':nntxt:' + key"
        >
          <nntxts-component
            style="margin-left: 10px"
            :nntxt="nntxt"
            :dirName="dirName"
            :level="level"
          />
        </li>
      </ul>

      <ul v-if="activeTabName === 'monitoring'">
        <li
          v-for="(monitor, key) in info.monitorFiles"
          :key="dirName + ':monitor:' + key"
        >
          <csv-entry
            style="margin-left: 10px"
            :monitor="monitor"
            :dirName="dirName"
            :dirId="info.id"
            :level="level"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CSVEntry from './CSVEntry.vue'
import NNtxtEntry from './NNtxtEntry.vue'

export default Vue.extend({
  name: 'directory-component',
  props: ['info', 'dirName', 'level'],
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
    },
    activeTabName: function (): string {
      return this.$store.state.editor.activeTabName.toLowerCase()
    }
  },
  data: function () {
    return { expand: true }
  }
})
</script>

<style>
.branch {
  font-size: 14px;
}

.branch-name {
  padding-top: 3px;
  height: 24px;
  margin-top: 0;
  margin-left: 0;
  white-space: nowrap;
  font-weight: 600;
  cursor: pointer;
}

ul {
  list-style: none;
  padding-left: 20px;
  margin: 0;
  text-align: left;
}
</style>
