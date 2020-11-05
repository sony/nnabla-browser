<template>
    <div class="monitoring-content-scroller" >
        <div v-if="$store.state.chartInfo.charts.length" class="tool-icon-container" @click="capSwitch">
            <font-awesome-icon v-show="!snapshotLoding" icon="camera" class="func-icon" />
            <font-awesome-icon v-show="snapshotLoding" icon="spinner" class="fa-spin func-icon" />
            <snap-shot :capElement="snapshotSwitch" containerId="monitor-content-container" imageName="monitor-charts" @snapshot-finish="snapshotLoding=!$event"/>
        </div>

        <div id="monitor-content-container">
            <chart-block
                :chart="chart"
                :key="chart.name"
                v-for="chart in $store.state.chartInfo.charts"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue/dist/vue.esm';
    import VueC3 from 'vue-c3/dist/vue-c3.esm';
    import snapShot from '../Utils/snapShot.vue';

    export default {
        data: function() {
            return {
                snapshotSwitch: undefined,
                snapshotLoding: undefined,
            }
        },
        methods: {
            capSwitch() {
                if (this.snapshotLoding) {
                    return;
                }
                this.snapshotLoding = true;
                this.snapshotSwitch = !this.snapshotSwitch;
            }
        },
        components: {
            'chart-block': {
                // chart : {name: "", data: [{name: "", values: {t: [], v: []}}, ...]}
                props: {chart: Object},
                template: `
                <div class="chart-block" :id="chart.name" :key="chart.name"
                style="margin: 15px 10px; border: 1px solid; color: var(--color-gray2)">
                    <vue-c3 :handler="handler" :key="chart.name"></vue-c3>
                </div>
                `,
                data: function () {
                    return {
                        handler: new Vue()
                    };
                },
                computed: {
                    svgWidth: function() {
                        return this.$el.clientWidth * 0.9;
                    }
                },
                watch: {
                    "chart.data": {
                        handler: function () {
                            let options = this.createChartOptions();
                            let nextLoaded = Object.keys(options.data.xs);

                            this.handler.$emit("dispatch", (chart) => {
                                let nextUnload = [];
                                for (let x of chart.data()) {
                                    if (!nextLoaded.includes(x.id)) {
                                        nextUnload.push(x.id);
                                    }
                                }

                                options.data.unload = nextUnload;

                                chart.load(options.data);
                            });
                        },
                        deep: true
                    },
                },
                components: {
                    VueC3
                },
                methods: {
                    createChartOptions: function () {
                        let columns = [];
                        let xs = {};
                        for (let index in this.chart.data) {
                            xs[this.chart.data[index].name] = `x${index}`;

                            let tmp_times = this.chart.data[index].values.t.slice(0, this.chart.data[index].values.t.length);
                            tmp_times.unshift(`x${index}`);
                            columns.push(tmp_times);

                            let tmp_values = this.chart.data[index].values.v.slice(0, this.chart.data[index].values.t.length);
                            tmp_values.unshift(this.chart.data[index].name);
                            columns.push(tmp_values);
                        }

                        return {
                            title: {
                                text: this.chart.name
                            },
                            data: {
                                xs: xs,
                                columns: columns
                            },
                            size: {
                                width: this.svgWidth
                            },
                            axis: {
                                x: {
                                    type: "indexed",
                                    tick: {
                                        culling: {
                                            max: 10
                                        },
                                        count: 20,
                                        format: (x) => {
                                            return parseInt(x);
                                        }
                                    },
                                    label: "number of iteration"
                                }
                            },
                            onrendered: () => {
                                const plist = this.$el.querySelectorAll('path');
                                plist.forEach(ele => {
                                    ele.setAttribute('fill', window.getComputedStyle(ele).fill || 'none');
                                    ele.setAttribute('stroke', window.getComputedStyle(ele).stroke || '#000');
                                });
                                const llist = this.$el.querySelectorAll('g.tick line');
                                llist.forEach(ele => {
                                    ele.setAttribute('stroke', window.getComputedStyle(ele).stroke || '#000');
                                });
                            }
                        };

                    }
                },
                mounted: function () {
                    let options = this.createChartOptions();
                    this.handler.$emit("init", options);
                },
            },
            'snap-shot': snapShot
        },
    }

</script>

<style scoped>
    .monitoring-content-scroller {
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    .c3-circles {
        display: none;
    }

    .tool-icon-container {
        z-index: 99;
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

    .chart-block path {
        fill: none;
        stroke: #000;
    }

    g.tick line{
        stroke: #000;
    }
</style>
