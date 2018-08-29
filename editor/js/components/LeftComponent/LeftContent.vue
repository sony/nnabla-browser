<template>
    <div>
        <div class="left-component-tab">

            <div class="tab" style="left: 0; border-right: solid 1px var(--color-gray2);"
                 :class="{'active': activeLeftTab === 'tree'}"
                 @click="changeActiveTab('tree')"> tree
            </div>

            <div class="tab" style="left: 50%;"
                 :class="{'active': activeLeftTab === 'edit'}"
                 @click="changeActiveTab('edit')"
                 v-if="activeTabName === 'edit'"> edit
            </div>

        </div>

        <div class="left-component">

            <div class="app-row" style="top: 40px; bottom: 0;">
                <keep-alive>
                    <function-tree
                            v-if="activeLeftTab === 'edit'"
                            :selected-layer="selectedLayer"
                            @history="command => $emit('history', command)"/>

                    <directory-tree
                            v-if="activeLeftTab === 'tree'"
                            :directory-info="directoryInfo"
                            :chart-info="chartInfo"
                            :graph-info="graphInfo"
                            :active-tab-name="activeTabName" />
                </keep-alive>

                <property-area :selected-layer="selectedLayer" v-show="isPropertyAreaShow"/>
            </div>

        </div>

    </div>
</template>

<script>
    import FunctionTree from "./FunctionTree";
    import DirectoryTree from "./DirectoryTree";
    import PropertyArea from "./PropertyArea";

    export default {
        props: [
            'selectedLayer',
            'activeTabName',
            "directoryInfo",
            "chartInfo",
            "graphInfo"],

        components: {
            "property-area": PropertyArea,
            "function-tree": FunctionTree,
            "directory-tree": DirectoryTree
        },

        methods: {
            changeActiveTab: function (name) {
                this.activeLeftTab = name;
            }
        },
        data: () => {
            return {activeLeftTab: "tree"}
        },
        computed: {
            isPropertyAreaShow: function () {
                return String(this.activeTabName) === "edit";
            }
        },
        watch: {
            activeTabName: function(_new, _old) {
                if (_new === "monitoring") {
                    this.activeLeftTab = "tree";
                }
            }
        }
    }
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