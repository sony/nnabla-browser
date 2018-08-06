<template>
    <div class="app-row" style="top: 0; bottom:0;">
        <monitoring-list class="app-row"/>
    </div>
</template>

<script>
    export default {
        components: {
            'monitoring-list': {
                template: `
                <div style="height: 100%">
                    <div class="title">Monitoring List</div>
                    <div class="app-row app-scroll-x app-scroll-y" style="top: 40px; bottom: 0; padding: 0 16px;">
                        <component-model
                        :graph="graph"
                        v-for="graph in graphs"
                        v-if="graph.monitors.length > 0" />
                    </div>
                </div>
                `,
                components: {
                    'component-model': {
                        props: ["graph"],
                        template: `
                        <div class="model">
                            <div class="nnc-invoker title" @click="onClickExpand">
                                <img class="icon-small" :src="expandArrow" />{{ graph.parentDirName }}
                            </div>

                            <div class="components" :style="{display: expand ? 'block' : 'none'}">
                                <component-monitor
                                :monitor="monitor"
                                :id="graph.parentDirName + '-' + monitor.name"
                                :parent="graph.parentDirName"
                                v-for="monitor in graph.monitors" />
                            </div>
                         </div>
                        `,
                        computed: {
                            expandArrow: function () {
                                return `./editor/image/Arrow${this.expand ? 'Down' : ''}.svg`;
                            }
                        },
                        data: function () {
                            return {expand: this.graph.isFocus || false};
                        },
                        methods: {
                            onClickExpand: function () {
                                this.expand = !this.expand;
                                this.graph.isFocus = this.expand;
                            }
                        },
                        components: {
                            "component-monitor": {
                                props: ["monitor", "id", "parent"],
                                data: function () {
                                    return {checked: this.monitor.isView || false};
                                },
                                template: `
                                <div style="margin-left: 20px;">
                                    <input type="checkbox" :id="id" v-model="checked" @change="changeEvent">
                                    <label :for="id">{{ monitor.name }}</label>
                                </div>
                                `,
                                methods: {
                                    getDataIndex: function (infoIndex) {
                                        if (infoIndex > -1) {
                                            return window.monitorInfo[infoIndex].data.findIndex(x => {
                                                return x.legend === this.parent;
                                            });
                                        } else {
                                            return -1;
                                        }
                                    },
                                    changeEvent: function () {
                                        this.monitor.isView = this.checked;

                                        const graphTitle = this.monitor.name.split(".")[0];
                                        const targetInfoIndex = window.monitorInfo.findIndex(x => {
                                            return x.name === graphTitle;
                                        });

                                        const targetDataIndex = this.getDataIndex(targetInfoIndex);

                                        const insertData = {
                                            legend: this.parent,
                                            values: this.monitor.data
                                        };

                                        if (this.checked) {
                                            // insert data for rendering chart
                                            if (targetInfoIndex > -1) {

                                                if (targetDataIndex > -1) {
                                                    window.monitorInfo[targetInfoIndex].data.splice(targetDataIndex, 1, insertData);
                                                } else {
                                                    window.monitorInfo[targetInfoIndex].data.push(insertData)
                                                }

                                            } else {
                                                let insertIndex = window.monitorInfo.findIndex(x => {
                                                    return x.name.toLowerCase() > graphTitle.toLowerCase();
                                                });

                                                insertIndex = insertIndex > -1 ? insertIndex : window.monitorInfo.length;

                                                window.monitorInfo.splice(insertIndex, 0, {
                                                    name: graphTitle,
                                                    data: [insertData]
                                                })
                                            }
                                        } else {
                                            // checkが外れた瞬間にはmonitorInfoの中に対応するデータが存在するはず
                                            window.monitorInfo[targetInfoIndex].data.splice(targetDataIndex, 1);

                                            //　対応するタイトルに描画するべきデータがひとつも存在しない時は消去
                                            if (window.monitorInfo[targetInfoIndex].data.length < 1) {
                                                window.monitorInfo.splice(targetInfoIndex, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                data: () => {
                    return {graphs: window.Graphs.data()};
                }
            }
        }
    }
</script>

<style>
    .model .title {
        padding-top: 3px;
        height: 24px;
        margin-top: 0;
        margin-left: 0;
    }

    .model .component {
        padding-top: 3px;
        height: 24px;
        margin-left: 0;
        padding-left: 40px;
    }
</style>