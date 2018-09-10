<template>
    <div style="height: 100%">
        <information-tab :csvResult="csvResult"
                         :showDataLength="showDataLength"
                         :showFrom="showFrom"/>

        <viewer-selection-tab
                :viewerMode="viewerMode"
                @changeViewerMode="changeViewerMode"/>

        <viewer  v-if="csvResult.length > 0"
                 :viewerMode="viewerMode"
                 :csvResult="csvResult"
                 :showDataLength="showDataLength"
                 :showFrom="showFrom"/>
    </div>
</template>

<script>
    import { previewImage, deletePreviewImage } from "../../utils/imageLoader";

    const informationTab = {
        props: ["csvResult", "showDataLength", "showFrom"],
        template: `
            <div class="csv-result-tab">
                <div class="result-information-tab" style="width: 70%">
                    <div class="category-name"> Target Path:  </div>
                    <div class="category-value"> {{ csvResult.path }}</div>
                </div>

                <div class="result-information-tab" style="width: 30%">
                    <div class="category-name"> Data Length:  </div>
                    <div class="category-value"> {{ DataLengthString + " / " + csvResult.length }}</div>
                </div>

             </div>
        `,
        computed: {
            DataLengthString: function () {
                if (this.csvResult.length === 0){
                    return 0;
                } else {
                    return this.showFrom + " - " + this.showDataLength;
                }

            }
        }
    };

    const viewerSelectionTab = {
        props: ["viewerMode"],
        data: function () {
            return {
                outputFormat: [
                    {value: "simpleViewer", label: "Simple Viewer"},
                    {value: "confusionMatrix", label: "Confusion Matrix"}
                ]
            }
        },
        computed: {
            mode: {
                get: function () {
                    return this.viewerMode;
                },
                set: function (v) {
                    this.$emit("changeViewerMode", v);
                }
            }
        },
        template: `
            <div class="csv-result-tab">
                <!--<div class="format-selection-tab"> Select View Mode: </div>-->
                <div class="format-selection-tab" v-for="format in outputFormat">
                    <label>
                        <input type="radio" :id="format.value" :value="format.value" v-model="mode">
                        {{ format.label }}
                    </label>
                </div>
            </div>
            `,
    };

    const simpleViewer = {
        props: ["csvResult", "showDataLength", "showFrom"],
        data: function () {
            const columns = this.csvResult.data.keys;

            const sortOrders = {};
            columns.forEach(key => sortOrders[key] = 1);

            return {
                columns,
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        computed: {
          values: function () {
              return this.$store.getters.getPartialData(this.showFrom, this.showDataLength);
          }
        },
        template: `
            <div class="csv-result-table" style="padding: 10px;"></div>`,
        methods: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        },
        mounted: function () {
            const table = d3.select(".csv-result-table")
                .append("table")
                .attr("class", "table table-bordered table-hover");

            table.append("thead")
                .append("tr")
                .selectAll("th")
                .data(this.columns).enter()
                .append("th")
                .attr("scope", "col")
                .style("text-align", "center")
                .text(d => this.capitalize(d));

            table.append("tbody")
                .selectAll("tr")
                .data(this.values).enter()
                .append("tr")
                .attr("id", (d, i) => "result-" + String(i))
                .selectAll("td")
                .data(row => d3.entries(row)).enter()
                .append("td")
                .attr("class", d => "col-" + d.key)
                .style("text-align", "center")
                .text((d, i) => {
                    if (i > 0) {
                        return d.value
                    } else {
                        return ".../" + d.value.split("/").slice(-3).join("/")
                    }
                })
                .attr("value", d => d.value);

            d3.select("tbody").selectAll("td.col-0")
                .on("mouseenter", previewImage)
                .on("mouseleave", deletePreviewImage)

        }

    };

    export default {
        name: "csvResult",
        data: function () {
            return {
                viewerMode: "simpleViewer",
                csvResult: this.$store.state.csvInfo,
                showDataLength: 100,
                showFrom: 0
            }
        },
        components: {
            informationTab,
            viewerSelectionTab,
            viewer: {
                props: ["viewerMode", "csvResult", "showDataLength", "showFrom"],
                template: `
                <div class="viewer-scroller">
                    <component :is="viewerMode"
                    :csvResult="csvResult"
                    :showDataLength="showDataLength"
                    :showFrom="showFrom"/>
                </div>
                `,
                components: {
                    simpleViewer,
                    ConfusionMatrix: {}
                }
            },
        },
        methods: {
            changeViewerMode: function (mode) {
                this.viewerMode = mode;
            }
        }

    }
</script>

<style>
    .csv-result-tab {
        width: 100%;
        height: 41px;
        border-bottom: solid 1px var(--color-gray2);
        overflow: hidden;
    }

    .format-selection-tab {
        height: 40px;
        min-width: 200px;
        float: left;
        padding: 8px 0 10px 20px;
        font-size: large;
    }

    .result-information-tab {
        height: 40px;
        float: left;
    }

    .result-information-tab .category-name {
        font-size: 15px;
        padding: 10px 10px 0 14px;
        opacity: 0.7;
        float: left;
    }

    .result-information-tab .category-value {
        height: 40px;
        font-size: 20px;
        padding-top: 6px;
        overflow: auto;
    }

    .viewer-scroller {
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    #image-preview {
        position: absolute;
        border: 3px solid #333;
        background: #444;
        padding: 5px;
        color: #FFF;
        text-align: center;
    }

</style>