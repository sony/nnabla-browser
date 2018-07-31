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
                                props: ["monitor", "id"],
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
                                    changeEvent: function () {
                                        this.monitor.isView = this.checked;
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