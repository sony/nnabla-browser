<template>
    <div id="configs-area">
        <configs-area></configs-area>
    </div>
</template>

<script>
import EditorUtils from '../../EditorUtils';
import ConfigsAreaVue from './ConfigsArea.vue';

window.configs = {
    data: [Object.assign({active: true, type: 'Global', name: 'Global Config',
        description: window.nnc.emptyConfiguration.description,
        epoch: window.nnc.emptyConfiguration.epoch,
        save_best: window.nnc.emptyConfiguration.save_best,
        batch: window.nnc.emptyConfiguration.batch,
        structure_search: window.nnc.emptyConfiguration.structure_search,
    })],
    active: {
        index: 0,
    },
    set_data: function(configuration) {
        this.data.length = 1;
        const globalConfig = this.data[0];
        Object.assign(globalConfig, {
            description: configuration.description,
            epoch: configuration.epoch,
            save_best: configuration.save_best,
            batch: configuration.batch,
            active: true,
        });
        Object.assign(globalConfig.structure_search, configuration.structure_search);
        configuration.optimizers.forEach((optimizer) => {
            optimizer.type = 'Optimizer';
            optimizer.active = false;
            this.data.push(optimizer);
        });
        configuration.monitors.forEach((monitor) => {
            monitor.type = 'Monitor';
            monitor.active = false;
            this.data.push(monitor);
        });
        configuration.executors.forEach((executor) => {
            executor.type = 'Executor';
            executor.active = false;
            this.data.push(executor);
        });
        this.active.index = 0;
    },
    serialize_data: function() {
        const deleteUnnecessaryParam = function(config) {
            const _config = Object.assign({}, config);
            delete _config.active;
            delete _config.type;
            return _config;
        };
        const globalConfig = window.configs.data.find((config) => config.type == 'Global');
        return {
            description: globalConfig.description,
            epoch: globalConfig.epoch,
            batch: globalConfig.batch,
            save_best: globalConfig.save_best,
            structure_search: globalConfig.structure_search,
            optimizers: window.configs.data.filter((config) => config.type == 'Optimizer').map(deleteUnnecessaryParam),
            monitors: window.configs.data.filter((config) => config.type == 'Monitor').map(deleteUnnecessaryParam),
            executors: window.configs.data.filter((config) => config.type == 'Executor').map(deleteUnnecessaryParam),
        };
    },
    set_default_updater: function(updater, defaultUpdater) {
        updater.name = defaultUpdater.name;
        updater.parameters = defaultUpdater.parameters.map((parameter) => Object.assign({}, parameter, {value: parameter.initial_value}));
    },
};

export default {
    components: {
        'configs-area': ConfigsAreaVue,
    },
};
</script>

<style>

</style>
