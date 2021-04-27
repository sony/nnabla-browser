<template>
  <div>
    <monitoring-list
      style="top: 0; bottom: 50%; border-bottom: 1px solid var(--color-gray2);"
      class="app-row"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'

import { RootState, GraphInfoState } from '@/store/types'

/***************************************
 interface
 ***************************************/

interface NNtxtCouputedType {
  classObject: { active: boolean };
  isActive: boolean;
  nntxtPath: string;
  activeStyle: object;
  graphInfo: GraphInfoState;
}

interface NNtxtPropsType {
  nntxt: { data: object; name: string };
  dirName: string;
}
/************************************/

const nntxtsComponent = Vue.extend<{}, {}, NNtxtCouputedType, NNtxtPropsType>({
  props: {
    nntxt: Object,
    dirName: String
  },
  template: `
            <div class="nntxt"
            :class="classObject"
            :style="activeStyle"
            @click="clickEvent"> {{nntxt.name}} </div>`,
  computed: {
    classObject: function () {
      return {
        active: this.$store.state.editor.activeTabName === 'graph'
      }
    },
    isActive: function () {
      return (this.$store.state as RootState).editor.activeTabName === 'graph'
    },
    nntxtPath: function () {
      return this.dirName + '/' + this.nntxt.name
    },
    activeStyle: function () {
      const isSelected =
        this.$store.state.directoryInfo.activeFile === this.nntxtPath &&
        this.isActive
      return { color: isSelected ? 'var(--color-brand)' : '' }
    },
    graphInfo: function () {
      return (this.$store.state as RootState).graphInfo
    }
  },
  methods: {
    clickEvent: function () {
      if (this.isActive) {
        if (this.nntxtPath !== this.graphInfo.nntxtPath) {
          d3.select('#svg-links').style('opacity', 0)

          d3.select('#network-editor')
            .transition()
            .duration(200)
            .attr('opacity', 0.3)
            .transition()
            .duration(1000)
            .attr('opacity', 1)

          this.$store.commit('setGraphs', this.nntxt.data)
          this.$store.commit('setNNtxtPath', this.nntxtPath)
          this.$store.commit('updateActiveFile', this.nntxtPath)
        }
      }
    }
  }
})

const monitorsComponent = Vue.extend({
  props: ['monitor', 'dirName', 'dirId'],
  data: function () {
    return {
      checked: this.monitor.isView || false
    }
  },
  methods: {
    changeEvent: function () {
      if (this.monitor.data) {
        this.monitor.isView = this.checked

        const chartData = {
          chartTitle: this.monitor.name.split('.')[0],
          data: {
            id: this.dirId,
            name: this.dirName,
            values: this.monitor.data
          }
        }

        const mutation = this.checked ? 'insertChartData' : 'deleteChartData'

        this.$store.commit(mutation, chartData)
      }
    }
  },
  watch: {
    monitor: {
      handler: function () {
        if (this.checked) {
          this.changeEvent()
        }
      },
      deep: true
    }
  },
  template: `
            <div>
                <input type="checkbox" :id="dirName + '/' + monitor.name" v-model="checked" @change="changeEvent">
                <label :for="dirName + '/' + monitor.name">{{ monitor.name }}</label>
            </div>`
})

const directoryComponent = Vue.extend({
  name: 'directory-component',
  props: ['info', 'dirName'],
  template: `
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

                <monitors-component
                    style="margin-left: 10px"
                    v-for="(monitor, key) in info.monitorFiles"
                    :monitor="monitor"
                    :dirName="dirName"
                    :dirId="info.id"
                    :key="dirName + ':monitor:' + key"
                    />

                <csv-results-component
                    v-for="(csvResult, key) in info.csvResultFiles"
                    :csvResult="csvResult"
                    :dirName="dirName"
                    :key="dirName + ':csv:' + key"
                    />
            </div>
        </div>
        `,
  components: {
    'nntxts-component': nntxtsComponent,
    'monitors-component': monitorsComponent
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

export default Vue.extend({
  components: {
    'monitoring-list': {
      template: `
                <div>
                    <div class="title">Directory Tree</div>
                    <div class="app-row app-scroll-x app-scroll-y" style="top: 40px; bottom: 0; padding: 0 16px;">
                        <directory-component
                            v-if="typeof directoryInfo.name !== 'undefined'"
                            :info="directoryInfo"
                            :dir-name="directoryInfo.name" />
                    </div>
                </div>
                `,
      components: {
        'directory-component': directoryComponent
      },
      computed: {
        directoryInfo: function () {
          return this.$store.state.directoryInfo.data
        }
      }
    }
  }
})
</script>

<style>
.nntxt,
.csvResult {
  opacity: 0.6;
}

.nntxt.active,
.csvResult.active {
  opacity: 1;
  font-weight: bold;
  cursor: pointer;
}

.nntxt.active:hover,
.csvResult.active:hover {
  color: var(--color-brand);
}
</style>
