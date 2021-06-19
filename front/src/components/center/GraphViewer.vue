<template>
  <div>
    <graph-tab-list
      :activeGraphIndex="activeGraphIndex"
      :graphs="graphs"
    />
    <div class="tab-content network-editor-scroller">
      <svg-area
        :activeGraph="activeGraph"
        :prevGraph="prevGraph"
        :isDragging="isDragging"
        :assistAreaSize="assistAreaSize"
        :nntxtPath="nntxtPath"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Graph } from '@/types/graph'
import { Vector2D } from '@/types/geometry'
import GraphTabList from '@/components/center/graph/GraphTabList.vue'
import SvgArea from '@/components/center/graph/SvgArea.vue'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  components: {
    'graph-tab-list': GraphTabList,
    'svg-area': SvgArea
  },
  props: {
    activeGraph: { type: Object as PropType<Graph> },
    prevGraph: { type: Object as PropType<Graph> },
    isDragging: { type: Boolean },
    assistAreaSize: { type: Object as PropType<Vector2D> },
    activeGraphIndex: { type: Number },
    graphs: { type: Object as PropType<Graph[]> },
    nntxtPath: { type: String }
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
