<template>
    <div>
        <div class="monitoring-content-scroller">
            <chart-block
                    :chart="chart"
                    :key="chart.name"
                    v-for="chart in chartInfo"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue/dist/vue.esm';
    import VueC3 from 'vue-c3/dist/vue-c3.esm';

    export default {
        props: {
            chartInfo: Array
        },
        components: {
            'chart-block': {
                // chart : {name: chart title, data: [{legend: ..., values: ...}, {}...]}
                props: {chart: Object},
                template: `
                <div class="chart-block" :id="chart.name" :key="chart.name">
                    <vue-c3 :handler="handler" :key="chart.name"></vue-c3>
                </div>
                `,
                data: function () {
                    return {
                        handler: new Vue(),
                        chartData: this.chart.data
                    };
                },
                watch: {
                    chartData: function (newData, oldData) {
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
                    }
                },
                components: {
                    VueC3
                },
                methods: {
                    createChartOptions: function () {
                        let columns = [];
                        let xs = {};
                        for (let index in this.chart.data) {
                            xs[this.chart.data[index].legend] = `x${index}`;

                            let tmp_times = this.chart.data[index].values.t.slice(0, this.chart.data[index].values.t.length);
                            tmp_times.unshift(`x${index}`);
                            columns.push(tmp_times);

                            let tmp_values = this.chart.data[index].values.v.slice(0, this.chart.data[index].values.t.length);
                            tmp_values.unshift(this.chart.data[index].legend);
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
                                width: (window.innerWidth - document.getElementById("leftContent").clientWidth) * 0.9 // dirty hack...
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
                            }
                        };

                    }
                },
                mounted: function () {
                    let options = this.createChartOptions();
                    this.handler.$emit("init", options);
                },
            },
        },
    }

</script>

<style>
    .monitoring-content-scroller {
        width: 100%;
        overflow: scroll;
    }

    .c3-circles {
        display: none;
    }

</style>