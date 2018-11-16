<template>
    <div class="position-relative">
        <div class="position-absolute">
            <div class="center-content-bar">
                <div class="float-left">
                    <slot name="pager-header"/>
                </div>
                <pager-action-bar v-if="total"
                :index="parseInt((offset + itemsPerPage - 1) / itemsPerPage)"
                :pages="lastPage"
                @first="offset = 0"
                @next="offset += itemsPerPage"
                @prev="offset -= itemsPerPage"
                @last="offset = lastOffset"
                />
            </div>
            <pager-content
            :show-limit-warning-on-control="showLimitWarningOnControl"
            :total="total"
            :offset="offset"
            :get-data="makeGetData(offset)" />
        </div>
    </div>
</template>

<script>
import Definitions from './../../misc/Definitions';
export default {
    props: {index: Number, total: Number, makeGetData: Function, showLimitWarningOnControl: Boolean},
    data: function() {
        return {
            offset: 0,
            current: 0,
            fetched: {},
        };
    },
    computed: {
        itemsPerPage: () => Definitions.ITEMS_PER_PAGE,
        itemsPreviewable: () => Definitions.PREVIEWABLE_DATA_NUM,
        lastPage: function() {
            const limit = Math.min(this.itemsPreviewable, this.total);
            return parseInt((limit + this.itemsPerPage - 1) / this.itemsPerPage);
        },
        lastOffset: function() {
            return (this.lastPage - 1) * this.itemsPerPage;
        },
    },
    components: {
        'pager-action-bar': {
            props: {index: Number, pages: Number},
            template: `
            <div class="paging-menu pull-right">
                <img src="./editor/image/ArrowLeft2.svg" v-if="onTheFirst" :class="disabled" />
                <img src="./editor/image/ArrowLeft2.svg" v-else            :class="enabled" @click="$emit('first')" />
                <img src="./editor/image/ArrowLeft.svg"  v-if="onTheFirst" :class="disabled"/>
                <img src="./editor/image/ArrowLeft.svg"  v-else            :class="enabled" @click="$emit('prev')" />
                <span class="job-action-text">{{ 1 + index }} / {{ pages }}</span>
                <img src="./editor/image/Arrow.svg"      v-if="onTheLast"  :class="disabled" />
                <img src="./editor/image/Arrow.svg"      v-else            :class="enabled" @click="$emit('next')" />
                <img src="./editor/image/Arrow2.svg"     v-if="onTheLast"  :class="disabled" />
                <img src="./editor/image/Arrow2.svg"     v-else            :class="enabled" @click="$emit('last')" />
            </div>
            `,
            computed: {
                onTheFirst: function() {
                    return this.index === 0;
                },
                onTheLast: function() {
                    return this.index === this.pages - 1;
                },
                enabled: () => 'nnc-invoker pager-arrow nnc-enabled',
                disabled: () => 'pager-arrow nnc-disabled',
            },
        },
        'pager-content': {
            props: {offset: Number, getData: Function, total: Number, showLimitWarningOnControl: Boolean},
            template: `
                <div id="datasetContents" class="pager-content">
                    <div v-if="500 < total && showLimitWarningOnControl" class="paging-limit-warning">{{ previewLimitText }}</div>
                    <table class="table table-bordered" v-if="table.length > 0">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th v-for="column in header">{{ column }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, row_index) in table">
                                <td>{{ offset + row_index + 1 }}</td>
                                <td v-for="(column, column_index) in row">
                                    <div v-if="column.type==='text/plain'">{{ column.data }}</div>
                                    <div v-else>
                                        <img v-bind:src="'data:' + column.type + ';base64,' + column.data" class="data-table-image" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <nnc-loading v-else />
                </div>
            `,
            data: function() {
                return {
                    header: [],
                    table: [],
                };
            },
            computed: {
                previewLimitText: () => Definitions.strings.data_preview_limit,
            },
            beforeUpdate: function() {
                this.getTableData();
            },
            mounted: function() {
                this.getTableData();
            },
            methods: {
                getTableData: function() {
                    const self = this;
                    this.getData({
                        update: function(header, table) {
                            self.header = header;
                            self.table = table;
                        },
                        clear: function() {
                            if (self.table.length !== 0) { // skip change to avoid infinite update loop.
                                // XXX instead of assign 0 to Array's length directly, use splice to notify Vue change.
                                // Please refer https://vuejs.org/v2/guide/list.html#Caveats for more details.
                                self.table.splice(0, self.table.length);
                            }
                        },
                    });
                },
            },
        },
    },
    mounted: function() {
        this.current = this.index;
    },
    beforeUpdate: function() {
        if (this.current !== this.index) {
            this.current = this.index;
            this.offset = 0;
        }
    },
    methods: {
        changeOffset: function(_offset) {
            this.offset = _offset;
        },
    },
};
</script>

<style>
.pager-content {
    margin: 0;
    padding: 16px 0px;
}
.dataset-content .pager-content {
    height: calc(100vh - var(--bar-height) * 3);
}
.dataset-preview .pager-content {
    height: calc(100vh - var(--bar-height) * 2);
}

.paging-limit-warning {
    color: var(--color-gray4);
    margin-bottom: 12px;
    font-size: 13px;
}

.paging-menu {
    height: 40px;
}
.pager-arrow {
    width: 16px;
    height: 16px;
    margin: 8px 2px 8px 2px;
    vertical-align: middle;
}

.position-absolute {
    position: absolute;
    width: 100%;
    z-index: 1;
}

.confusion-matrix-content,
.pager-content {
    padding: 16px;
    overflow: auto;
    position: relative;
}
</style>
