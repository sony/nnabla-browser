<template>
    <div class="job-action">
        <result-content-time :elapsed-time="elapsedTime" :total-time="totalTime" />
        <result-content-progress :current="current" :total="total" :progress-name="progressName" />
    </div>
</template>

<script>
import SDUUtils from './../../editor/SDUUtils';
import Vue from 'vue/dist/vue.esm.js';

const ResultContentTime = Vue.extend({
    props: ['elapsedTime', 'totalTime'],
    template: `
        <div class="float-left job-action-text">
            <img class="job-action-image" src="./editor/image/Time.svg"/>
            Elapsed <span class="text-fixed-width">{{ formatTime(elapsedTime) }}</span>
            Remaining <span class="text-fixed-width">{{ formatTime(Math.max(totalTime - elapsedTime, 0)) }}</span>
            Total <span class="text-fixed-width">{{ formatTime(totalTime) }}</span>
        </div>
    `,
    methods: {
        formatTime: function(milliSec) {
            if (!milliSec) return '--:--:--:--';
            return SDUUtils.calcSecToDayHourMinSec(milliSec);
        },
    },
});

const ResultContentProgress = Vue.extend({
    props: ['current', 'total', 'progressName'],
    template: `
        <div class="pull-right">
            <span class="job-action-text">{{ progressName }}</span>
            <span class="job-action-text">{{ formatProgress(current) }}/{{ formatProgress(total) }}</span>
        </div>
    `,
    methods: {
        formatProgress: function(progress) {
            return progress ? progress : '-';
        },
    },
});

export default {
    props: ['current', 'total', 'progressName', 'elapsedTime', 'totalTime'],
    template: `
    `,
    components: {
        'result-content-progress': ResultContentProgress,
        'result-content-time': ResultContentTime,
    },
};
</script>

<style>
.float-left {
    float: left;
}
</style>
