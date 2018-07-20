<template>
    <div class="log-area">
        <textarea class="job-log text-fixed-width" readonly v-model="log"></textarea>
    </div>
</template>

<script>
export default {
    props: ['log'],
    mounted: function() {
        $('.job-main-area').resizable({
            handles: 's',
            alsoResizeReverse: '.log-area',
        });
    },
    updated: function() {
        $('.job-log').scrollTop($('.job-log')[0].scrollHeight);
    },
};
</script>

<style>
.log-area {
    width: 100%;
    height: 180px;
    padding: 16px 16px 16px 16px;
    background-color: var(--color-gray0);
    border-top: solid 1px var(--color-gray2);
}

.job-log {
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
}
</style>
