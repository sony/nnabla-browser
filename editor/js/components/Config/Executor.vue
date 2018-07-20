<template>
    <div class="config-tab-executor">
        <config-input label="Network" v-model="config.network" />
        <config-input label="Dataset" v-model="config.dataset" />
        <short-input-number label="Number of Evaluations" v-model="config.number_of_evaluation" />
        <nnc-radio v-model="config.adopt_result" choice="mean" label="Mean" />
        <nnc-radio v-model="config.adopt_result" choice="last" label="Last" />
        <br />
        <nnc-checkbox label="Need Back Propagetion" v-model="config.back_propagation" />
    </div>
</template>

<script>
import ConfigInputVue from './Input.vue';
import ConfigShortInputVue from './ShortInput.vue';

export default {
    props: ['config'],
    components: {
        'config-input': ConfigInputVue,
        'short-input-number': ConfigShortInputVue,
    },
};
</script>

<style>

</style>
