<template>
    <div class="config-tab-optimizer">
        <config-input label="Network" v-model="config.network" />
        <config-input label="Dataset" v-model="config.dataset" />
        <updater></updater>
        <short-input-number label="Weight Decay" class="config-weight-decay" v-model="config.weight_decay" />
        <short-input-number label="Learning Rate Multiplier" class="config-learning-rate-multiplier" v-model="config.wlearning_rate_multiplier" />
        <short-input-number label="LR Update Interval" unit="iteration" class="config-lr-update-interval" v-model="config.update_interval" />
    </div>
</template>

<script>
import ConfigInput from './Input';
import ConfigShortInput from './ShortInput';

const optimizerUpdater = {
    template: `
        <div v-if="configs.length" class="updater-component">
            <span class="config-label">
                <label class="config-label">Updater:</label>
            </span>
            <span class="config-optimizer-select">
                <select name="updater-type" v-model="configs[active.index].updater.name" @change="changeUpdater($event)">
                    <option v-for="updater in default_updaters" :value="updater.name">
                        {{ updater.name }}
                    </option>
                </select>
            </span>
            <short-input-number label="Update Interval" unit="iteration" class="config-update-interval" v-model="configs[active.index].updater.interval" />
            <div class="config-updater-parameters">
                <short-input-number
                    v-for="(val, key) in configs[active.index].updater.parameters" v-if="val.name != 'Interval'"
                    :key="key" :label="val.name" class="config-parameter" :class="indentChild(key)" v-model="val.value" />
            </div>
        </div>
    `,
    data: function() {
        return {
            active: configs.active,
            configs: configs.data,
            default_updaters: nNablaCore.solvers,
        };
    },
    methods: {
        changeUpdater: function(event) {
            configs.set_default_updater(
                this.configs[this.active.index].updater,
                nNablaCore.solvers.find((updater) => updater.name == event.target.value));
        },
        indentChild: function(key) {
            if (key === 3) {
                return 'indent-child';
            }
        },
    },
    components: {
        'short-input-number': ConfigShortInput,
    },
};

export default {
    props: ['config'],
    components: {
        'updater': optimizerUpdater,
        'config-input': ConfigInput,
        'short-input-number': ConfigShortInput,
    },
};
</script>

<style>
.config-optimizer-select select {
    border: 1px solid var(--color-gray2);
    border-radius: 2px;
    background-color: inherit;
    width: 150px;
    height: 24px;
    margin-right: 110px;
}
</style>
