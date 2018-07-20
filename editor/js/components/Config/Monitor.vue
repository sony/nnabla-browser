<template>
    <div class="config-tab-monitor">
        <config-input label="Network" v-model="config.network" />
        <config-input label="Dataset" v-model="config.dataset" />
    </div>
</template>

<script>
import ConfigInputVue from './Input.vue';

export default {
    props: ['config'],
    template: `
    `,
    components: {
        'config-input': ConfigInputVue,
    },
};
</script>

<style>

</style>
