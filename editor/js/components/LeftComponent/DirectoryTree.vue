<template>
    <div>
        <monitoring-list
                class="app-row"
                :directory-info="directoryInfo"
                :chart-info="chartInfo"
                :active-tab-name="activeTabName"
        />
    </div>
</template>

<script>

    const nntxtsComponent = {
        props: ["nntxt", "activeTabName"],
        template: `
        <div class="nntxt"
        style="margin-left: 20px;"
        :class="classObject"
        @click="clickEvent"> {{nntxt.name}} </div>
        `,
        computed: {
            classObject: function () {
                return {active: this.activeTabName === "edit"}
            }
        },
        methods: {
            clickEvent: function () {
                console.log("clicked");
                window.Graph.clear();

                let length = window.Graphs.data().length;
                window.Graphs.data().splice(0, length);
                window.Graphs.data().push(this.nntxt.data);

                console.log("tab-" + this.nntxt.data.name);

                this.$nextTick().then(() => {
                    document.getElementById("tab-" + this.nntxt.data.name).click();
                });

            }
        }
    };

    const monitorsComponent = {
        props: ["monitor", "id", "chartInfo"],
        data: function () {
            return {
                checked: this.monitor.isView || false
            };
        },
        methods: {
            getDataIndex: function (infoIndex) {
                if (infoIndex > -1) {
                    return this.chartInfo[infoIndex].data.findIndex(x => {
                        return x.legend === this.id;
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
                    legend: this.id,
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
                        legend: this.id,
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
            <div style="margin-left: 20px;">
                <input type="checkbox" :id="id + '/' + monitor.name" v-model="checked" @change="changeEvent">
                <label :for="id + '/' + monitor.name">{{ monitor.name }}</label>
            </div>
            `
    };

    const directoryComponent = {
        name: "directory-component",
        props: ["info", "dirName", "chartInfo", "activeTabName"],
        template: `
        <div class="directory" v-if="checkDisplay">
            <div class="nnc-invoker title" @click="onClickExpand">
                <img class="icon-small" :src="expandArrow" />{{ info.name }}
            </div>

            <div class="components" :style="{display: expand ? 'block' : 'none'}">
                <directory-component
                     :info="childInfo"
                     :style="{padding: '5px 0px 5px 20px'}"
                     :dirName="dirName + '/' + childInfo.name"
                     :chartInfo="chartInfo"
                     :active-tab-name="activeTabName"
                     v-for="childInfo in info.children"
                    />

                <nntxts-component
                    v-for="nntxt in info.nntxtFiles"
                    :nntxt="nntxt"
                    :active-tab-name="activeTabName"
                     />

                <monitors-component
                    :monitor="monitor"
                    :id="dirName"
                    :chartInfo="chartInfo"
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
            return {expand: this.info.expand || false};
        },
        methods: {
            onClickExpand: function () {
                this.expand = !this.expand;
                this.info.expand = this.expand;
            }
        },
    };

    export default {
        props: {
            directoryInfo: Object,
            chartInfo: Array,
            activeTabName: String
        },
        components: {
            "monitoring-list": {
                props: {
                    directoryInfo: Object,
                    chartInfo: Array,
                    activeTabName: String
                },
                template: `
                <div style="height: 100%">
                    <div class="title">Monitoring List</div>
                    <div class="app-row app-scroll-x app-scroll-y" style="top: 40px; bottom: 0; padding: 0 16px;">
                        <directory-component
                            v-if="typeof directoryInfo.name !== 'undefined'"
                            :info="directoryInfo"
                            :dir-name="directoryInfo.name"
                            :chart-info="chartInfo"
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

    .directory .title {
        padding: 3px 0;
        height: 24px;
        margin-top: 0;
        margin-left: 0;
    }
</style>