<template>
  <div
    v-if="checkDisplay"
    class="branch"
  >
    <div
      v-if="info.name.length > 0"
      class="branch-name"
      @click="expand = !expand"
    >
      <div :style="{ 'padding-left': 12 * level + 'px' }">
        <font-awesome-icon
          v-if="expand"
          icon="angle-down"
          style="width: 10px"
        />
        <font-awesome-icon
          v-if="!expand"
          icon="angle-right"
          style="width: 10px"
        />
        {{ info.name }}
      </div>
    </div>

    <div
      class="components"
      :style="{ display: expand ? 'block' : 'none' }"
    >
      <ul>
        <li
          v-for="(childInfo, key) in info.children"
          :key="dirName + ':' + key"
        >
          <directory-component
            :info="childInfo"
            :dir-name="(level > 0 ? dirName + '/' : '') + childInfo.name"
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
            :dir-name="dirName"
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
            :dir-name="dirName"
            :dir-id="info.id"
            :level="level"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import CSVEntry from './CSVEntry.vue'
import NNtxtEntry from './NNtxtEntry.vue'
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faAngleRight, faAngleDown)

export default Vue.extend({
  name: 'DirectoryComponent',
  components: {
    'nntxts-component': NNtxtEntry,
    'csv-entry': CSVEntry
  },
  props: ['info', 'dirName', 'level'],
  data: function () {
    return { expand: true }
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
