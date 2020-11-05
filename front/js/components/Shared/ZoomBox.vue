<template>
    <div class="zoom-box">
        <action-zoom image-name="Out" />
        <action-zoom image-name="In" />
    </div>
</template>

<script>
export default {
    components: {
        'action-zoom': {
            props: {imageName: String},
            template: `
                 <img :src="imagePath" class="icon nnc-disabled" />
            `,
            computed: {
                imagePath: function() {
                    return './editor/image/Zoom' + this.imageName + '.svg';
                },
            },
        },
    },
};
</script>

<style>
.zoom-box {
    position: absolute;
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
