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

        <div class="app-row" style="top: 40px; bottom: 0;">
                <edit-left-content
                        v-if="activeLeftTab === 'edit'"
                        :selection="selection"
                        :selected-component="selectedComponent"
                        @selected-component="name => $emit('selected-component', name)"
                        @renamed="changes => $emit('renamed', changes)"
                        @trigger-job="value => $emit('trigger-job', value)"
                        @fetch-results="(callback, offset) => $emit('fetch-results', callback, offset)"
                        @history="command => $emit('history', command)"/>

                <directory-tree
                        :directory-info="directoryInfo"
                        :chart-info="chartInfo"
                        :active-tab-name="activeTabName"
                        v-if="activeLeftTab === 'tree'"/>
        </div>

    </div>
</template>

<script>
    import EditNetwork from "./EditNetwork";
    import DirectoryTree from "./DirectoryTree";

    export default {
        props: ['selection', 'selectedComponent', 'activeTabName', "directoryInfo", "chartInfo"],
        components: {
            "edit-left-content": EditNetwork,
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

</style>