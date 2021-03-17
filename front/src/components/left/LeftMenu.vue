<template>
    <div class="left-content" id="leftContent">
        <div class="left-component-tab">

            <div class="tab" style="left: 0; border-right: solid 1px var(--color-gray2);"
                 :class="{'active': activeLeftTab === 'tree'}"
                 @click="changeActiveLeftTab('tree')"> tree
            </div>

            <div class="tab" style="left: 50%;"
                 :class="{'active': activeLeftTab === 'edit'}"
                 @click="changeActiveLeftTab('edit')"
                 v-if="activeTabName === 'graph'"> edit
            </div>

        </div>

        <div class="left-component">

            <div class="app-row" style="top: 40px; bottom: 0;">
                <keep-alive>
                    <function-tree
                            v-if="activeLeftTab === 'edit'"/>

                    <directory-tree
                            v-if="activeLeftTab === 'tree'" />
                </keep-alive>

                <property-area v-show="isPropertyAreaShow"/>
            </div>

        </div>

    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import FunctionTree from './FunctionTree.vue'
import DirectoryTree from './DirectoryTree.vue'
import PropertyArea from './PropertyArea.vue'

type DataType = {
    activeLeftTab: string;
}

export default Vue.extend({
  components: {
    'property-area': PropertyArea,
    'function-tree': FunctionTree,
    'directory-tree': DirectoryTree
  },

  methods: {
    changeActiveLeftTab: function (name: string) {
      this.activeLeftTab = name
    }
  },
  data: (): DataType => {
    return { activeLeftTab: 'tree' }
  },
  computed: {
    activeTabName: function (): string {
      return this.$store.state.editor.activeTabName.toLowerCase()
    },

    isPropertyAreaShow: function (): boolean {
      return this.activeTabName === 'graph'
    }
  },
  watch: {
    activeTabName: function () {
      this.activeLeftTab = 'tree'
    }
  }
})
</script>

<style>
    .left-component-tab {
        width: 100%;
        height: 41px;
        position: relative;
        border-bottom: solid 1px var(--color-gray2);
    }

    .left-component-tab .tab {
        width: 50%;
        text-align: center;
        position: absolute;
        padding-top: 8px;
        font-size: initial;
        height: 100%;
        cursor: pointer;
    }

    .left-component-tab .tab.active {
        box-sizing: border-box;
        border-bottom: solid 2px var(--color-brand);
    }

    .left-component .icon-small {
        width: 16px;
        height: 16px;
    }

    .left-component .branch {
        font-size: 14px;
    }

    .left-component .branch-name {
        padding-top: 3px;
        height: 24px;
        margin-top: 0;
        margin-left: 0;
        white-space: nowrap;
    }

    .left-component .components {
        margin-left: 20px;
    }

</style>
