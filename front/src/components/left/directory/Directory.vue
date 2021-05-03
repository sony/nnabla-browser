<template>
  <div class="branch" v-if="checkDisplay">
    <div
      class="branch-name"
      @click="expand = !expand"
      v-if="info.name.length > 0"
    >
      <div :style="{ 'padding-left': 12 * level + 'px' }">
        <font-awesome-icon
          icon="angle-down"
          style="width: 10px"
          v-if="expand"
        />
        <font-awesome-icon
          icon="angle-right"
          style="width: 10px"
          v-if="!expand"
        />
        {{ info.name }}
      </div>
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
            :style="{ 'padding-left': 12 * (level + 1) + 'px' }"
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
            :style="{ 'padding-left': 12 * (level + 1) + 'px' }"
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight, faAngleDown)

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

<style scoped>
.branch {
  font-size: 14px;
}

.branch-name {
  height: 30px;
  line-height: 30px;
  margin-top: 0;
  margin-left: 0;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border-bottom: solid 1px var(--color-gray2);
}

.branch-name:hover {
  background: var(--color-gray2);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}
</style>
