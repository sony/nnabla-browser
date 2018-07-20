<template>
    <span>
        <span class="config-label">
            <label class="config-label">{{ label }}:</label>
        </span>
        <span>
            <input type="number" class="config-short-input no-spin-buttons" :value="value" @input="$emit('input', $event.target.value)" >
            <span class="config-unit">{{ unit ? unit : "" }}</span>
        </span>
    </span>
</template>

<script>
export default {
    props: ['label', 'value', 'unit'],
};
</script>

<style>
.config-short-input {
    width: 100px;
    height: 24px;
}
</style>
