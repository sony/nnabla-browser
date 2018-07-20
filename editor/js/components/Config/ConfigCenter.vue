<template>
    <div id="config-area">
        <config-header></config-header>
        <config-area></config-area>
    </div>
</template>

<script>
import ConfigGlobal from './Global';
import ConfigOptimizer from './Optimizer';
import MonitorVue from './Monitor.vue';
import ExecutorVue from './Executor.vue';
import Vue from 'vue/dist/vue.esm.js';

export default {
    components: {
        'config-area': {
            template: `
                <div class="config-content">
                    <component :is="data[active.index].type" :config="data[active.index]" v-on:update:value="onUpdate"></component>
                </div>
            `,
            components: {
                'Global': ConfigGlobal,
                'Optimizer': ConfigOptimizer,
                'Monitor': MonitorVue,
                'Executor': ExecutorVue,
            },
            data: function() {
                return window.configs;
            },
            methods: {
                onUpdate: function(value) {
                    Vue.set(this.data[this.active.index], value);
                },
            },
        },
        'config-header': {
            template: `
                <div class="center-content-bar"></div>
            `,
        },
    },
};
</script>

<style>
.config-top {
    height: 40px;
    padding: 12px 16px;
    border-bottom: solid 1px var(--color-gray2);
}

.config-headline {
    color: var(--color-gray5);
    font-size: 13px;
    line-height: 16px;
    display: inline-block;
    width: 218px;
}

.config-headline-image {
    float: right;
}

.config-headline-image,
.data-selector-link-image,
.data-selector-reload-image,
.data-selector-open-image {
    width: 24px;
    height: 24px;
    vertical-align: middle;
}

.configs {
    top: 40px;
    clear: both;
    word-wrap:break-word;
}

.config.active {
    background-color: var(--color-gray0);
}

.config:hover {
    background-color: var(--color-gray0);
}

.config-content-list {
    margin: 0px 16px;
    padding: 16px 0px;
    border-bottom: solid 1px var(--color-gray3);
}

.config-title {
    padding-right: 5px;
    padding-bottom: 10px;
    overflow: hidden;
}

.config-name {
    color: var(--color-gray5);
    font-size: 13px;
    line-height: 16px;
}

.config-state {
    color: var(--color-brand);
    font-size: 13px;
    line-height: 16px;
    opacity: 0.5;
    margin-left: 16px;
    float: right;
}

.config-property {
    color: var(--color-gray4);
    font-size: 13px;
    letter-spacing: 0;
    line-height: 20px;
    clear: both;
}

.config-label,
.config-unit {
    font-family: "SSTUI-Medium";
    font-size: 13px;
    color: var(--color-gray5);
    line-height: 24px;
    margin-bottom: 4px;
    margin-top: 4px;
}

.config-content input[type="text"] {
    border: 1px solid var(--color-gray2);
    border-radius: 2px;
}

.config-content {
    padding: 33px 0px 0px 16px;
}

.save-best-checkbox {
    padding-left: 8px;
}

.epoch-batchsize-table {
    margin-bottom: 32px;
}

.method-label,
.search-range-label {
    width: 120px;
    height: 24px;
}

.search-range-unit {
    font-family: "Segoe UI";
    font-size: 13px;
    color: var(--color-gray4);
    line-height: 24px;
    width: 116px;
    height: 24px;
}

.validation-label label,
.multiply-add-label label {
    margin-left: 16px;
}

.time-limit-table {
    margin-left: 190px;
}

.config-label > label {
    width: 188px;
}

.config-input {
    width: 870px;
    height: 24px;
}

.config-updater-parameters,
.config-weight-decay,
.config-learning-rate-multiplier {
    margin: 0px 120px 0px 195px;
}

.config-weight-decay,
.config-parameter.indent-child {
    display: block;
}

.config-lr-update-interval span > label {
    width: 120px;
}

.config-parameter span > label,
.config-update-interval span > label {
    width: 100px;
}

.updater-component {
    margin-bottom: 32px;
}

.config-parameter span > input {
    margin-right: 53px;
}

.config-tab-executor .radio-label {
    margin-left: 20px;
}
</style>
