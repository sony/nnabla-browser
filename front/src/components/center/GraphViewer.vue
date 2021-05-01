<template>
  <div>
    <graph-tab-list @history="command => $emit('history', command)" />
    <div v-if="activeFileTag" class="tool-icon-container" @click="capSwitch">
      <font-awesome-icon
        v-show="!snapshotLoding"
        icon="camera"
        class="func-icon"
      />
      <font-awesome-icon
        v-show="snapshotLoding"
        icon="spinner"
        class="fa-spin func-icon"
      />
      <snap-shot
        :capElement="snapshotSwitch"
        containerId="network-container"
        :imageName="activeFileTag"
        @snapshot-finish="snapshotLoding = !$event"
      />
    </div>
    <div class="tab-content network-editor-scroller">
      <svg-area />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import svgArea from '@/components/center/graph/SvgArea.vue'
import snapShot from '@/components/tools/SnapShot.vue'
import { Definitions } from '@/utils/definitions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faCamera } from '@fortawesome/free-solid-svg-icons'
import GraphTabList from '@/components/center/graph/GraphTabList.vue'

library.add(faSpinner, faCamera)

interface DataType {
  layerTextClipId: string;
  layerTextClipWidth: number;
  layerTextClipHeight: number;
  snapshotSwitch: boolean | undefined;
  snapshotLoding: boolean | undefined;
}

export default Vue.extend<DataType, {}, {}, {}>({
  props: {
    historyInfo: Object
  },
  data: function () {
    return {
      layerTextClipId: Definitions.EDIT.LAYER.CLIP_PATH.ID,
      layerTextClipWidth: Definitions.EDIT.LAYER.CLIP_PATH.WIDTH,
      layerTextClipHeight: Definitions.EDIT.LAYER.CLIP_PATH.HEIGHT,
      snapshotSwitch: undefined,
      snapshotLoding: undefined
    }
  },
  computed: {
    activeFileTag: function () {
      const tag = this.$store.state.directoryInfo.activeFile.replace(
        /[\\/.]/g,
        '-'
      )
      return tag.replace(/^-*/, '')
    }
  },
  methods: {
    capSwitch () {
      if (this.snapshotLoding) {
        return
      }
      this.snapshotLoding = true
      this.snapshotSwitch = !this.snapshotSwitch
    }
  },
  components: {
    'graph-tab-list': GraphTabList,
    'svg-area': svgArea,
    'snap-shot': snapShot
  }
})
</script>

<style>
#network-editor {
  display: block;
}

.network-editor-scroller {
  overflow: hidden;
  width: 100%;
}

.layer-properties-scroller {
  overflow: auto;
  width: 100%;
}

.network-statistics-scroller {
  overflow: auto;
  width: 100%;
}

.stat-line {
  height: 25px;
  line-height: 24px;
  vertical-align: baseline;
}

.stat-line.active {
  background-color: var(--color-gray2);
}

.stat-line > .content {
  margin-left: 16px;
  margin-right: 16px;
  border-bottom-color: var(--color-gray4);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.stat-line > .content > .name {
  color: var(--color-gray4);
  float: left;
  width: 120px;
}

.tool-icon-container {
  width: 4rem;
  height: 4rem;
  background-color: #1aaa55;
  border-radius: 50%;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 10px #f00;
}

.tool-icon-container .func-icon {
  font-size: 3rem;
  color: white;
}
</style>
