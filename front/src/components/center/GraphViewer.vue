<template>
    <div>
        <network-tabs
                @history="command => $emit('history', command)"
        />
        <div v-if="activeFileTag" class="tool-icon-container" @click="capSwitch">
            <font-awesome-icon v-show="!snapshotLoding" icon="camera" class="func-icon" />
            <font-awesome-icon v-show="snapshotLoding" icon="spinner" class="fa-spin func-icon" />
            <snap-shot :capElement="snapshotSwitch" containerId="network-container" :imageName="activeFileTag" @snapshot-finish="snapshotLoding=!$event"/>
        </div>
        <div class="tab-content network-editor-scroller">
            <svg-area/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import svgArea from './svgArea.vue'
import snapShot from '@/components/tools/snapShot.vue'
import { Definitions } from '@/components/utils/Definitions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faCamera } from '@fortawesome/free-solid-svg-icons'
import { Graph } from '@/store/types'

library.add(faSpinner, faCamera)

/***************************************
 interface
 ***************************************/

interface DataType {
  layerTextClipId: string;
  layerTextClipWidth: number;
  layerTextClipHeight: number;
  snapshotSwitch: boolean | undefined;
  snapshotLoding: boolean | undefined;
}

interface GraphTabProps {
  graph: Graph;
  index: number;
}

/***************************************/

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
      const tag = this.$store.state.directoryInfo.activeFile.replace(/[\\/.]/g, '-')
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
    'network-tabs': {
      template: `
                <div class="network-tabs">
                    <graph-tab v-for="(graph, index) in $store.state.graphInfo.graphs"
                        :graph="graph"
                        :key="$store.state.graphInfo.nntxtPath + '-' + index"
                        :index="index"
                        :class="{'active': index===$store.state.graphInfo.activeGraphIndex}"
                        @history="command => $emit('history', command)"
                    />
                    <graph-tab-append
                        @history="command => $emit('history', command)"
                    />
                </div>
            `,
      components: {
        'graph-tab': Vue.extend<{}, {}, {}, GraphTabProps>({
          props: {
            graph: Object,
            index: Number
          },
          template: `
                        <div class="graphs-tab nnc-invoker" @click="clicked">
                            <span class="graph-name">{{ graph.name }}</span>
                            <span>
                                <span class="delete-mark" @click.stop.prevent="clickedDelete;">
                                    <img class="graph-remove-img" src="./editor/image/Remove.svg"/>
                                </span>
                            </span>
                        </div>
                    `,
          methods: {
            clicked: function () {
              this.$store.commit('setActiveGraphIndex', this.index)
            },
            clickedDelete: function () {
              // set True to the argument of graphInfo named something like "isShow"
              // and insert this operation into history to undo or redo
            },
            keydown: (e: KeyboardEvent) => {
              switch (e.keyCode) {
                case 27:
                case 13:
                  (e.target as HTMLElement).blur()
                  break
                default:
                  break
              }
            }
          }
        }),
        'graph-tab-append': {
          template: '<div class="graphs-tab graph-add"><img class="graph-addnew-img" src="./editor/image/AddNew.svg"/></div>'
        }
      }
    },
    'svg-area': svgArea,
    'snap-shot': snapShot
  }
})
</script>

<style>
    .network-tabs {
        width: 100%;
        height: 41px;
        border-bottom: solid 1px var(--color-gray2);
        overflow: auto;
    }

    .graphs-tab {
        float: left;
        height: 39px;
        line-height: 39px;
        padding-right: 8px;
    }

    .graphs-tab.active {
        box-sizing: border-box;
        border-bottom: solid 2px var(--color-brand);
    }

    .graphs-tab.active > span > .graph-name {
        color: var(--color-brand);
    }

    .graphs-tab:hover {
        background-color: var(--color-gray1);
    }

    .graph-name {
        margin-left: 24px;
        margin-right: 12px;
        font-size: 13px;
        color: var(--color-gray5);
        line-height: 40px;
    }

    .graph-remove-img, .graph-addnew-img {
        width: 16px;
        height: 16px;
        margin: 8px 0 8px 0;
        vertical-align: middle;
    }

    .graph-add {
        padding-left: 8px;
    }

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

    .tool-icon-container .func-icon{
        font-size: 3rem;
        color: white;
    }
</style>
