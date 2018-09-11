<template>
    <div style="height: 100%">
        <information-tab
                :viewerMode="viewerMode"
                :showDataLength="showDataLength"
                :showFrom="showFrom"/>

        <viewer-selection-tab
                :viewerMode="viewerMode"
                @changeViewerMode="changeViewerMode"/>

        <viewer v-if="csvResult.length > 0"
                :viewerMode="viewerMode"
                :showDataLength="showDataLength"
                :showFrom="showFrom"/>
    </div>
</template>

<script>
    import {previewImage, deletePreviewImage} from "../../utils/imageLoader";
    import {mapState, mapGetters} from "vuex/dist/vuex.esm";
    import {
        range,
        precisionRecallFScore,
        calcPercentage,
        accuracyFromConfusionMatrix2D,
        average1D
    } from "../../utils/arrayOperator";

    const informationTab = {
        props: ["showDataLength", "showFrom", "viewerMode"],
        computed: {
            ...mapState({csvResult: "csvInfo"}),

            DataLengthString: function () {
                let ret;
                if (this.viewerMode === "confusionMatrix") {
                    ret = this.csvResult.length;
                } else if (this.viewerMode === "simpleViewer") {
                    if (this.csvResult.length === 0) {
                        ret = "0 / " + this.csvResult.length;
                    } else {
                        ret = this.showFrom + " - " + this.showDataLength + " / " + this.csvResult.length;
                    }
                }

                return ret;
            }
        },
        template: `
            <div class="csv-result-tab">
                <div class="result-information-tab" style="width: 70%">
                    <div class="category-name"> Target Path:  </div>
                    <div class="category-value"> {{ csvResult.path }}</div>
                </div>

                <div class="result-information-tab" style="width: 30%">
                    <div class="category-name"> Data Length:  </div>
                    <div class="category-value"> {{ DataLengthString }}</div>
                </div>

             </div>
        `
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
        props: ["showDataLength", "showFrom"],
        computed: {
            ...mapState({csvResult: "csvInfo"}),
            columns: function () {
                return this.csvResult.data.keys;
            },
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

    const confusionMatrix = {
        template: `
        <div class="csv-result-confusion-matrix" style="padding: 10px;"></div>
        `,
        computed: {
            ...mapGetters(["confusionMatrix", "labelLength"]),
        },
        watch: {
            confusionMatrix: {
                handler: function () {
                    d3.select(".csv-result-confusion-matrix").select("table").remove();
                    this.createTable();
                },
                deep: true
            }
        },
        methods: {
            createTable: function () {
                // get statics
                const [precisionList, recallList, FScoreList] = precisionRecallFScore(this.confusionMatrix, 4);
                const accuracy = accuracyFromConfusionMatrix2D(this.confusionMatrix);

                const table = d3.select(".csv-result-confusion-matrix")
                    .append("table")
                    .attr("class", "table table-bordered")
                    .style("text-align", "center");

                const thead = table.append("thead");

                // header 1
                const thead1 = thead.append("tr");

                thead1.append("th")
                    .style("text-align", "center")
                    .attr("scope", "col"); // blank

                thead1.append("th")
                    .style("text-align", "center")
                    .style("font-size", "18px")
                    .attr("scope", "col")
                    .attr("colspan", this.labelLength)
                    .text("Predicted Label"); // prediction

                thead1.append("th")
                    .style("text-align", "center")
                    .attr("scope", "col"); // blank

                // header 2
                const thead2 = thead.append("tr");

                thead2.selectAll("th")
                    .data(() => ["", ...range(0, this.labelLength), "Recall"]).enter()
                    .append("th")
                    .style("text-align", "center")
                    .attr("scope", "col")
                    .text(d => d); // label index


                // body
                const body = table.append("tbody");

                body.selectAll("tr")
                    .data(this.confusionMatrix).enter()
                    .append("tr")
                    .selectAll("td")
                    .data((row, i) => {
                        const f = (color, value) => {
                            return {color, value}
                        };
                        const getColor = (ratio) => `rgba(110, 178, 206, ${0.8 * Math.sqrt(ratio)})`;

                        return [f("", i),
                            ...row.map((x, j) => f(getColor(calcPercentage(row, j, 4)), x)),
                            f("", recallList[i])]
                    }).enter()
                    .append("td")
                    .style("font-weight", (d, i) => i === 0 ? "bold" : "")
                    .style("background-color", (d, i) => d.color)
                    .text(d => d.value);

                // body bottom
                // precision
                this.insertTableRow(body, "Precision", precisionList);

                // F-measure
                this.insertTableRow(body, "F-measure", FScoreList);

                // blank
                this.insertTableRow(body, "", []);

                // accuracy
                this.insertTableRow(body, "Accuracy", [accuracy]);

                // mean F-measure
                this.insertTableRow(body, "Avg. F-measure", [average1D(FScoreList, 4)]);

            },
            insertTableRow: function (selection, rowTitle, valueList) {
                const blankList = Array(this.labelLength - valueList.length + 1).fill("");

                selection.append("tr").selectAll("td")
                    .data(() => [rowTitle, ...valueList, ...blankList]).enter()
                    .append("td")
                    .style("font-weight", (d, i) => i === 0 ? "bold" : "")
                    .text(d => d);
            }
        },
        mounted: function () {
            this.createTable();
        },
    };

    export default {
        name: "csvResult",
        data: function () {
            return {
                viewerMode: "simpleViewer",
                showDataLength: 100,
                showFrom: 0
            }
        },
        computed: {
            ...mapState({csvResult: "csvInfo"})
        },
        components: {
            informationTab,
            viewerSelectionTab,
            viewer: {
                props: ["viewerMode", "showDataLength", "showFrom"],
                template: `
                <div class="viewer-scroller">
                    <component :is="viewerMode"
                    :showDataLength="showDataLength"
                    :showFrom="showFrom" />
                </div>
                `,
                components: {
                    simpleViewer,
                    confusionMatrix
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
        white-space: nowrap;
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