<template>
  <div
    class="csv-entry"
    :class="{ active: checked }"
    @click="clickArea"
  >
    <label :for="dirName + '/' + monitor.name">{{ monitor.name }}</label>
  </div>
</template>

<script lang="ts">
import { DirectoryNode, MonitorFile } from '@/types/store'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    monitor: {
      type: Object as PropType<MonitorFile>,
      required: true
    },
    activeChartPaths: {
      type: Array as PropType<string[]>,
      required: true
    },
    dirName: {
      type: String,
      required: true
    },
    dirId: {
      type: Number,
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
  computed: {
    checked: function (): boolean {
      const path = `${this.dirName}/${this.monitor.name}`
      return this.activeChartPaths.includes(path)
    },
    filePath: function (): string {
      return (this.level > 0 ? this.dirName + '/' : '') + this.monitor.name
    }
  },
  methods: {
    clickArea: function (): void {
      let newActiveChartPaths = []
      if (!this.checked) {
        newActiveChartPaths = this.activeChartPaths.concat([this.filePath])
      } else {
        newActiveChartPaths = this.activeChartPaths.filter((path) => path !== this.filePath)
      }
      this.$router.push({ path: 'monitoring', query: { activeChartPaths: newActiveChartPaths } })
    }
  }
})
</script>

<style>
.csv-entry {
  height: 30px;
  line-height: 30px;
}

.csv-entry:hover {
  background: var(--color-gray0);
}

.csv-entry.active {
  color: var(--color-brand);
  background: var(--color-gray0);
}

.csv-entry,
label {
  cursor: pointer;
  user-select: none;
}
</style>
