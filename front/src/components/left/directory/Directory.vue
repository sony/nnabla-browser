<template>
  <div
    v-if="checkDisplay"
    class="branch"
  >
    <div
      v-if="directoryNode.name.length > 0"
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
        {{ directoryNode.name }}
      </div>
    </div>

    <div
      class="components"
      :style="{ display: expand ? 'block' : 'none' }"
    >
      <ul>
        <li
          v-for="(childInfo, key) in directoryNode.children"
          :key="dirName + ':' + key"
        >
          <directory-component
            :active-file="activeFile"
            :active-chart-paths="activeChartPaths"
            :active-tab-name="activeTabName"
            :directory-node="childInfo"
            :dir-name="(level > 0 ? dirName + '/' : '') + childInfo.name"
            :level="level + 1"
            :root-node="rootNode"
          />
        </li>
      </ul>

      <ul v-if="activeTabName === 'graph'">
        <li
          v-for="(nntxt, key) in directoryNode.nntxtFiles"
          :key="dirName + ':nntxt:' + key"
        >
          <nntxts-component
            :active-file="activeFile"
            :style="{ 'padding-left': 12 * (level + 1) + 'px' }"
            :nntxt="nntxt"
            :dir-name="dirName"
            :level="level"
          />
        </li>
      </ul>

      <ul v-if="activeTabName === 'monitoring'">
        <li
          v-for="(monitor, key) in directoryNode.monitorFiles"
          :key="dirName + ':monitor:' + key"
        >
          <csv-entry
            :style="{ 'padding-left': 12 * (level + 1) + 'px' }"
            :monitor="monitor"
            :active-chart-paths="activeChartPaths"
            :dir-name="dirName"
            :dir-id="directoryNode.id"
            :level="level"
            :root-node="rootNode"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import CSVEntry from './CSVEntry.vue'
import { DirectoryNode } from '@/types/store'
import NNtxtEntry from './NNtxtEntry.vue'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faAngleRight, faAngleDown)

export default Vue.extend({
  name: 'DirectoryComponent',
  components: {
    'nntxts-component': NNtxtEntry,
    'csv-entry': CSVEntry
  },
  props: {
    activeFile: {
      type: String,
      required: true
    },
    activeChartPaths: {
      type: Array as PropType<string[]>,
      required: true
    },
    activeTabName: {
      type: String,
      required: true
    },
    directoryNode: {
      type: Object as PropType<DirectoryNode>,
      required: true
    },
    dirName: {
      type: String,
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
  data: function () {
    return { expand: true }
  },
  computed: {
    expandArrow: function (): string {
      return `./editor/image/Arrow${this.expand ? 'Down' : ''}.svg`
    },
    checkDisplay: function (): boolean {
      return (
        this.directoryNode.children.length +
          this.directoryNode.nntxtFiles.length +
          this.directoryNode.monitorFiles.length >
        0
      )
    }
  }
})
</script>

<style scoped>
.branch {
  font-size: 14px;
  font-weight: 500;
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
  background: var(--color-gray0);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}
</style>
