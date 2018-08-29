<template>
    <div>
        <monitoring-list style="top: 0; bottom: 310px; border-bottom: 1px solid var(--color-gray2);"
                class="app-row"
                :directory-info="directoryInfo"
                :chart-info="chartInfo"
                :graph-info="graphInfo"
                :active-tab-name="activeTabName"
        />
    </div>
</template>

<script>

    import Vue from 'vue/dist/vue.esm.js';

    const nntxtsComponent = {
        props: ["nntxt", "dirName", "graphInfo", "activeTabName"],
        template: `
            <div class="nntxt"
            :class="classObject"
            @click="clickEvent"> {{nntxt.name}} </div>`,
        computed: {
            classObject: function () {
                return {active: this.activeTabName === "edit"}
            }
        },
        methods: {
            clickEvent: function () {
                const nntxtPath = this.dirName + "/" + this.nntxt.name;

                if (nntxtPath !== this.graphInfo.nntxtPath) {
                    Vue.set(this.graphInfo, "graphs", this.nntxt.data);
                    Vue.set(this.graphInfo, "activeGraphIndex", 0);
                    Vue.set(this.graphInfo, "nntxtPath", nntxtPath);
                }
            }
        }
    };

    const monitorsComponent = {
        props: ["monitor", "dirName", "chartInfo"],
        data: function () {
            return {
                checked: this.monitor.isView || false
            };
        },
        methods: {
            getDataIndex: function (infoIndex) {
                if (infoIndex > -1) {
                    return this.chartInfo[infoIndex].data.findIndex(x => {
                        return x.legend === this.dirName;
                    });
                } else {
                    return -1;
                }
            },
            changeEvent: function () {
                this.monitor.isView = this.checked;

                const graphTitle = this.monitor.name.split(".")[0];
                const targetInfoIndex = this.chartInfo.findIndex(x => {
                    return x.name === graphTitle;
                });

                const targetDataIndex = this.getDataIndex(targetInfoIndex);

                const insertData = {
                    legend: this.dirName,
                    values: this.monitor.data
                };

                if (this.checked) {
                    // 描画すべきチャートに既に他のデータが埋め込まれている場合
                    if (targetInfoIndex > -1) {
                        if (targetDataIndex > -1) { // データの更新
                            this.chartInfo[targetInfoIndex].data.splice(targetDataIndex, 1, insertData);
                        } else { // データの挿入
                            this.chartInfo[targetInfoIndex].data.push(insertData)
                        }

                    } else { //新しいチャート用のdata objectを作成して挿入
                        // チャート名順にsort
                        let insertIndex = this.chartInfo.findIndex(x => {
                            return x.name.toLowerCase() > graphTitle.toLowerCase();
                        });

                        insertIndex = insertIndex > -1 ? insertIndex : this.chartInfo.length;

                        this.chartInfo.splice(insertIndex, 0, {
                            name: graphTitle,
                            data: [insertData]
                        })
                    }
                } else {
                    // checkが外れた瞬間にはmonitorInfoの中に対応するデータが存在するはず
                    this.chartInfo[targetInfoIndex].data.splice(targetDataIndex, 1);

                    //　対応するタイトルに描画するべきデータがひとつも存在しない時はチャート自体を消去
                    if (this.chartInfo[targetInfoIndex].data.length < 1) {
                        this.chartInfo.splice(targetInfoIndex, 1);
                    }
                }
            }
        },
        watch: {
            "monitor.data": function(_n, _o) {
                if (this.checked){
                    const graphTitle = this.monitor.name.split(".")[0];
                    const targetInfoIndex = this.chartInfo.findIndex(x => {
                        return x.name === graphTitle;
                    });

                    const targetDataIndex = this.getDataIndex(targetInfoIndex);

                    const insertData = {
                        legend: this.dirName,
                        values: this.monitor.data
                    };

                    this.chartInfo[targetInfoIndex].data.splice(targetDataIndex, 1,
                        Object.assign(
                            {},
                            this.chartInfo[targetInfoIndex].data[targetDataIndex],
                            insertData));
                }
            }
        },
        template: `
            <div>
                <input type="checkbox" :id="dirName + '/' + monitor.name" v-model="checked" @change="changeEvent">
                <label :for="dirName + '/' + monitor.name">{{ monitor.name }}</label>
            </div>`
    };

    const directoryComponent = {
        name: "directory-component",
        props: [
            "info",
            "dirName",
            "chartInfo",
            "graphInfo",
            "activeTabName"
        ],
        template: `
        <div class="branch" v-if="checkDisplay">
            <div class="branch-name" @click="expand = !expand;">
                <img class="icon-small" :src="expandArrow" >
                {{ info.name }}
            </div>

            <div class="components" :style="{display: expand ? 'block' : 'none'}">
                <directory-component
                     :info="childInfo"
                     :dirName="dirName + '/' + childInfo.name"
                     :chart-info="chartInfo"
                     :graph-info="graphInfo"
                     :active-tab-name="activeTabName"
                     v-for="childInfo in info.children"
                    />

                <nntxts-component
                    style="margin-left: 10px"
                    v-for="nntxt in info.nntxtFiles"
                    :nntxt="nntxt"
                    :dirName="dirName"
                    :graph-info="graphInfo"
                    :active-tab-name="activeTabName"
                     />

                <monitors-component
                    style="margin-left: 10px"
                    :monitor="monitor"
                    :dirName="dirName"
                    :chart-info="chartInfo"
                    v-for="monitor in info.monitorFiles"
                    />
            </div>
        </div>
        `,
        components: {
            "nntxts-component": nntxtsComponent,
            "monitors-component": monitorsComponent
        },
        computed: {
            expandArrow: function () {
                return `./editor/image/Arrow${this.expand ? 'Down' : ''}.svg`;
            },
            checkDisplay: function () {
                return this.info.children.length + this.info.nntxtFiles.length + this.info.monitorFiles.length > 0;
            }
        },
        data: function () {
            return {expand: false};
        },
    };

    export default {
        props: {
            directoryInfo: Object,
            chartInfo: Array,
            graphInfo: Object,
            activeTabName: String
        },
        components: {
            "monitoring-list": {
                props: {
                    directoryInfo: Object,
                    chartInfo: Array,
                    graphInfo: Object,
                    activeTabName: String
                },
                template: `
                <div>
                    <div class="title">Directory Tree</div>
                    <div class="app-row app-scroll-x app-scroll-y" style="top: 40px; bottom: 0; padding: 0 16px;">
                        <directory-component
                            v-if="typeof directoryInfo.name !== 'undefined'"
                            :info="directoryInfo"
                            :dir-name="directoryInfo.name"
                            :chart-info="chartInfo"
                            :graph-info="graphInfo"
                            :active-tab-name="activeTabName"
                             />
                    </div>
                </div>
                `,
                components: {
                    "directory-component": directoryComponent
                },
            }
        }
    }

</script>

<style>
    .nntxt.active {
        color: var(--color-brand);
        cursor: pointer;
    }
</style>