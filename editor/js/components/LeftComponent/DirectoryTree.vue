<template>
    <div>
        <monitoring-list style="top: 0; bottom: 370px; border-bottom: 1px solid var(--color-gray2);"
                         class="app-row" />
    </div>
</template>

<script>

    const nntxtsComponent = {
        props: ["nntxt", "dirName"],
        template: `
            <div class="nntxt"
            :class="classObject"
            @click="clickEvent"> {{nntxt.name}} </div>`,
        computed: {
            classObject: function () {
                return {active: this.$store.state.editor.activeTabName === "graph"}
            }
        },
        methods: {
            clickEvent: function () {
                if (this.classObject.active) {
                    const nntxtPath = this.dirName + "/" + this.nntxt.name;

                    if (nntxtPath !== this.$store.state.graphInfo.nntxtPath) {
                        this.$store.commit("setGraphs", this.nntxt.data);
                        this.$store.commit("setActiveGraphIndex", 0);
                        this.$store.commit("setNNtxtPath", nntxtPath);
                    }
                }
            }
        }
    };

    const monitorsComponent = {
        props: ["monitor", "dirName"],
        data: function () {
            return {
                checked: this.monitor.isView || false
            };
        },
        methods: {
            changeEvent: function () {
                this.monitor.isView = this.checked;

                const chartData = {
                    chartTitle: this.monitor.name.split(".")[0],
                    data: {
                        name: this.dirName,
                        values: this.monitor.data
                    }
                };

                const mutation = this.checked ? "insertChartData" : "deleteChartData";

                this.$store.commit(mutation, chartData);
            }
        },
        watch: {
            "monitor": {
                handler: function () {
                    if (this.checked) {
                        this.changeEvent();
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
    };

    const directoryComponent = {
        name: "directory-component",
        props: [
            "info",
            "dirName"
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
                     v-for="childInfo in info.children"
                    />

                <nntxts-component
                    style="margin-left: 10px"
                    v-for="nntxt in info.nntxtFiles"
                    :nntxt="nntxt"
                    :dirName="dirName"
                     />

                <monitors-component
                    style="margin-left: 10px"
                    :monitor="monitor"
                    :dirName="dirName"
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
        components: {
            "monitoring-list": {
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
                    "directory-component": directoryComponent
                },
                computed: {
                    directoryInfo: function () {
                        return this.$store.state.directoryInfo.data;
                    }
                }
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