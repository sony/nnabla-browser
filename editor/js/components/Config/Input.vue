<template>
    <div>
        <span class="config-label">
            <label class="config-label">{{ label }}:</label>
        </span>
        <span>
            <input type="text" class="config-input" :value="value" @input="$emit('input', $event.target.value)" >
        </span>
    </div>
</template>

<script>
export default {
    props: ['label', 'value'],
};
</script>

<style>

</style>
