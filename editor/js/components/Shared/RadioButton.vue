<template>
    <label class="radio-label">
        <input type="radio" :checked="value === choice" @change="$emit('input', choice)" >
        <span>{{ label || choice }}</span>
    </label>
</template>

<script>
export default {
    // value => the value on which parent component holds, choice => the value this radio input controls.
    props: {value: String, choice: String, label: String},
};
</script>

<style>
.radio-label {
    font-family: "SSTUI-Medium";
    font-size: 13px;
    color: var(--color-gray5);
    line-height: 24px;
    margin-bottom: 4px;
    margin-top: 4px;
}

.radio-label > input {
    display: none;
}

.radio-label > span {
    position:relative;
    padding-left: 20px;
    margin-right: 20px;
    font-weight: lighter;
    z-index: 2;
}

.radio-label > span::before {
    content: "";
    display: block;
    top: 3px;
    left: 3px;
    width: 12px;
    height: 12px;
    border: 1px solid var(--color-brand);
    border-radius: 6px;
    position: absolute;
}

.radio-label > input:checked + span::before {
    color: var(--color-brand);
}

.radio-label > input:checked + span::after {
    content: "";
    position: absolute;
    display: block;
    top: 6px;
    left: 6px;
    width: 6px;
    height: 6px;
    background: var(--color-brand);
    border-radius: 6px;
}

.radio-label > input:checked + span::before {
    color: var(--color-brand);
}

</style>
