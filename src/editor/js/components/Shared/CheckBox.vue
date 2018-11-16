<template>
    <label class="checkbox-label">
        <input type="checkbox" class="checkbox-input" :checked="value" @change="$emit('input', $event.target.checked)" >
        <span class="checkbox-label-span">{{ label }}</span>
    </label>
</template>

<script>
export default {
    props: ['value', 'label'],
};
</script>

<style>
.checkbox-label {
    font-family: "SSTUI-Medium";
    font-size: 13px;
    color: var(--color-gray5);
    line-height: 24px;
    margin-bottom: 4px;
    margin-top: 4px;
}

.checkbox-input {
    display: none;
}

.checkbox-label-span {
    font-family: "SSTUI-Medium";
    position:relative;
    padding-left: 20px;
    margin-right: 20px;
    font-weight: lighter;
}

.checkbox-label-span::before {
    top: 1px;
    left: 0px;
    width: 13px;
    height: 13px;
    border: 1px solid var(--color-brand);
    border-radius: 2px;
    display: block;
    content: "";
}

.checkbox-label-span::before {
    position: absolute;
}

.checkbox-input:checked + .checkbox-label-span::before {
    background-color: var(--color-brand);
}

.checkbox-input:checked + .checkbox-label-span::after {
    position: absolute;
    top: 2px;
    left: 3px;
    width: 6px;
    height: 8px;
    transform: rotate(40deg);
    border-bottom: 1px solid var(--color-gray0);
    border-right: 1px solid var(--color-gray0);
    display: block;
    content: "";
}
</style>
