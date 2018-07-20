<template>
    <div class="zoom-box">
        <action-zoom image-name="Out" :disabled="!values.canMovePrev" @pressed="$emit('zoom-value', values.prev)" />
        <span class="zoom-percentage">{{ percentage }}%</span>
        <action-zoom image-name="In" :disabled="!values.canMoveNext" @pressed="$emit('zoom-value', values.next)" />
    </div>
</template>

<script>
import EditorUtils from './../../EditorUtils';
export default {
    props: {percentages: Array, percentage: Number},
    components: {
        'action-zoom': {
            props: {imageName: String, disabled: Boolean},
            template: `
                 <img v-if="disabled" :src="imagePath" class="icon nnc-disabled" />
                 <img v-else          :src="imagePath" class="icon nnc-enabled nnc-invoker" @click.stop.prevent="$emit('pressed')" />
            `,
            computed: {
                imagePath: function() {
                    return './editor/image/Zoom' + this.imageName + '.svg';
                },
            },
        },
    },
    computed: {
        values() {
            return EditorUtils.indexOperator(this.percentages, this.percentage);
        },
    },
};
</script>

<style>
.zoom-box {
    position: absolute;
    top: 40px;
    right: 94px;
    height: 40px;
    margin: 0;
    padding: 0;
}

.zoom-box img.icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
}

.zoom-box span.zoom-percentage {
    width: 40px;
    height: 24px;
    text-align: center;
    display: inline-block;
    padding-top: 10px;
}
</style>
