<template>
    <div class="configs-area app-row app-col" @contextmenu="open_menu('', $event)">
        <div class="config-top">
            <span class="config-headline">Config</span>
            <span @click="open_menu('', $event, 'dropdown')">
                <etc-image/>
            </span>
        </div>
        <div class="configs app-row app-col app-scroll-x app-scroll-y">
            <div v-for="(config, index) in configs" :key="index" @click="changeActive(config)" @contextmenu.stop="open_menu(config, $event)" class="nnc-invoker">
                <div class="config" :class="config.active ? 'active': ''">
                    <div class="config-content-list">
                        <div class="config-title">
                            <div class="config-state pull-right">{{ config.type }}</div>
                            <div class="config-name">{{ config.name }}</div>
                        </div>
                        <div v-if="config.type=='Global'">
                            <div class="config-property">Max Epoch = {{ config.epoch }}</div>
                            <div class="config-property">Batch Size = {{ config.batch }}</div>
                        </div>
                        <div v-else-if="config.type=='Optimizer'">
                            <div class="config-property">Network = {{ config.network }}</div>
                            <div class="config-property">Dataset = {{ config.dataset }}</div>
                            <div class="config-property">Updator = {{ config.updater.name }}</div>
                        </div>
                        <div v-else-if="config.type=='Monitor'">
                            <div class="config-property">Network = {{ config.network }}</div>
                            <div class="config-property">Dataset = {{ config.dataset }}</div>
                        </div>
                        <div v-else-if="config.type=='Executor'">
                            <div class="config-property">Network = {{ config.network }}</div>
                            <div class="config-property">Dataset = {{ config.dataset }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <context-menu ref="context_menu" :menuItems="menu_items">
        </context-menu>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            configs: window.configs.data,
            menu_items: [
                {type: 'action', text: 'Add Optimizer', action: this.add_optimizer},
                {type: 'action', text: 'Add Executor', action: this.add_executor},
                {type: 'action', text: 'Rename', action: this.rename},
                {type: 'action', text: 'Delete', action: this.delete},
            ],
        };
    },
    components: {
        'etc-image': {
            template: `<img src="./editor/image/Etc.svg" class="config-headline-image nnc-enabled nnc-invoker" />`
        },
    },
    methods: {
        changeActive: function(_config) {
            this.configs.forEach((config, index) => {
                if (config.name === _config.name) {
                    config.active = true;
                    window.configs.active.index = index;
                } else {
                    config.active = false;
                }
            });
        },
        open_menu: function(config, event, type) {
            event.preventDefault();
            let params = {'parent': this, 'event': event};
            if (type === 'dropdown') {
                const el = document.elementFromPoint(event.clientX, event.clientY);
                params.point = {
                    x: el.x,
                    y: el.y + el.height,
                };
            }
            this.$refs.context_menu.$emit('open', params);
            if (config) this.changeActive(config);
        },
        add_optimizer: function() {
            const _newOptimizer = {
                name: EditorUtils.toUniqueName('Optimizer', window.configs.data),
                network: 'Main',
                dataset: 'Training',
                updater: {
                    interval: 1,
                },
                weight_decay: 0,
                learning_rate_multiplier: 1,
                update_interval: 1,
                type: 'Optimizer',
                active: false,
            };
            window.configs.set_default_updater(_newOptimizer.updater, nNablaCore.solvers.find((updater) => updater.default));
            const index = window.configs.data.findIndex((config) => config.type == 'Monitor');
            window.configs.data.splice(index, 0, _newOptimizer);
        },
        add_executor: function() {
            const _newExecutor = {
                name: EditorUtils.toUniqueName('Executor', window.configs.data),
                network: 'MainRuntime',
                dataset: 'Validation',
                number_of_evaluation: 1,
                adopt_result: 'mean',
                back_propagation: false,
                type: 'Executor',
                active: false,
            };
            window.configs.data.push(_newExecutor);
        },
        rename: function() {
            const config = window.configs.data[window.configs.active.index];
            if (config.type === 'Optimizer' || config.type === 'Executor') {
                window.nnc.components.Editor.prompt('Input new config name', config.name, [{
                    name: 'Cancel',
                }, {
                    name: 'OK',
                    action: (name) => name && (config.name = EditorUtils.toUniqueName(name, window.configs.data)),
                }] );
            }
        },
        delete: function() {
            const config = window.configs.data[window.configs.active.index];
            if (config.type === 'Optimizer' || config.type === 'Executor') {
                const index = window.configs.data.findIndex((_config) => _config.name === config.name);
                if (index >= 0) {
                    window.configs.data.splice(index, 1);
                    window.configs.data.forEach((config) => config.active = false);
                    window.configs.data[0].active = true;
                    window.configs.active.index = 0;
                }
            }
        },
    },
}
</script>

<style>

</style>
