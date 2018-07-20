<template>
    <div class="config-tab-global">
        <table class="description-table">
            <tr>
                <td class="project-description-label">
                    <label class="config-label">Project Description:</label>
                </td>
                <td class="project-description-textarea">
                    <textarea name="description" class="config-input-textarea" rows="5" cols="90" v-model="config.description" ></textarea>
                </td>
            </tr>
        </table>
        <table class="epoch-batchsize-table">
            <tr>
                <td class="max-epoch-label">
                    <label class="config-label">Max Epoch:</label>
                </td>
                <td class="max-epoch-input">
                    <input type="number" class="config-short-input no-spin-buttons" v-model="config.epoch" />
                </td>
                <td class="save-best-checkbox">
                    <nnc-checkbox label="Save Best" v-model="config.save_best" />
                </td>
            </tr>
            <tr>
                <td class="batch-size-label">
                    <label class="config-label">Batch Size:</label>
                </td>
                <td>
                    <input type="number" class="config-short-input no-spin-buttons" v-model="config.batch"/>
                </td>
            </tr>
        </table>
        <structure-search v-bind:value="config.structure_search" v-on:update:value="onUpdateStructureSearch"></structure-search>
    </div>
</template>

<script>
const StructureSearch = {
    props: ['value'],
    template: `
        <div>
            <table class="structure-search-table">
                <tr>
                    <td class="structure-search-label">
                        <label class="config-label">Structure Search:</label>
                    </td>
                    <td class="method-label">
                        <label class="config-label">Method:</label>
                    </td>
                    <td class="config-global-select">
                        <select v-bind:value="value.method" v-on:change="onUpdateMethod($event.target.value)">
                            <option>Random</option>
                            <option>Network Feature + Gaussian Process</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <nnc-checkbox label="Enable" v-model="value.enable" />
                    </td>
                    <td>
                        <label class="config-label">Optimize for:</label>
                    </td>
                    <td class="config-global-select">
                        <select
                        :disabled="value.method === 'Random'"
                        v-bind:value="value.optimize_for"
                        v-on:change="onUpdateOptimizeFor($event.target.value, $event)">
                            <option v-if="value.method !== 'Random'">Error</option>
                            <option>Error and Calculation</option>
                        </select>
                    </td>
                </tr>
            </table>
            <table class="search-range-table">
                <tr>
                    <td class="search-range"></td>
                    <td class="search-range-label">
                        <label class="config-label">Search Range:</label>
                    </td >
                    <td class="search-range-unit"><div>Min</div></td>
                    <td class="search-range-unit"><div>Max</div></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="validation-label">
                        <label class="config-label">Validation</label>
                    </td>
                    <td>
                        <input type="number" class="config-short-input no-spin-buttons" v-model="validation_min" />
                    </td>
                    <td>
                        <input type="number" class="config-short-input no-spin-buttons" v-model="validation_max "/>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="multiply-add-label">
                        <label class="config-label">Multiply Add</label>
                    </td>
                    <td>
                        <input type="number" class="config-short-input no-spin-buttons" v-model="multiply_add_min" />
                    </td>
                    <td>
                        <input type="number" class="config-short-input no-spin-buttons" v-model="multiply_add_max" />
                    </td>
                </tr>
            </table>
        </div>
    `,
    methods: {
        onUpdateMethod: function(value) {
            const _value = {method: value};
            if (value === 'Random') {
                _value.optimize_for = 'Error and Calculation';
            }
            this.$emit('update:value', Object.assign(this.value, _value));
        },
        onUpdateOptimizeFor: function(value) {
            this.$emit('update:value', Object.assign(this.value, {optimize_for: value}));
        },
        onInputTimeLimit: function(event) {
            if (event.target.validity.valid) {
                this.value.time_limit = event.target.value;
            }
        },
        getMinMaxValue: function(name) {
            const num = this.value[name];
            return (!num || Number(num) < 0) ? '' : num;
        },
        setMinMaxValue: function(name, newValue) {
            this.value[name] = (!newValue || Number(newValue) < 0) ? -1 : newValue;
        },
    },
    computed: {
        validation_min: {
            get: function() {
                return this.getMinMaxValue('validation_min');
            },
            set: function(newValue) {
                this.setMinMaxValue('validation_min', newValue);
            },
        },
        validation_max: {
            get: function() {
                return this.getMinMaxValue('validation_max');
            },
            set: function(newValue) {
                this.setMinMaxValue('validation_max', newValue);
            },
        },
        multiply_add_min: {
            get: function() {
                return this.getMinMaxValue('multiply_add_min');
            },
            set: function(newValue) {
                this.setMinMaxValue('multiply_add_min', newValue);
            },
        },
        multiply_add_max: {
            get: function() {
                return this.getMinMaxValue('multiply_add_max');
            },
            set: function(newValue) {
                this.setMinMaxValue('multiply_add_max', newValue);
            },
        },
    },
};

export default {
    props: ['config'],
    components: {
        'structure-search': StructureSearch,
    },
    methods: {
        onUpdateStructureSearch: function(v) {
            this.$emit('update:value', Object.assign(this.config, {structure_search: v}));
        },
    },
};
</script>

<style>
.project-description-label {
    padding-bottom: 100px;
    width: 188px;
}

.project-description-textarea textarea {
    width: 360px;
    height: 86px;
    margin-bottom: 32px;
    border: 1px solid var(--color-gray2);
    border-radius: 2px;
}

.config-global-select select {
    border: 1px solid var(--color-gray2);
    border-radius: 2px;
    background-color: inherit;
    width: 240px;
    height: 24px;
}

.max-epoch-label,
.batch-size-label,
.structure-search-label,
.search-range {
    width: 188px;
    height: 24px;
}
</style>
