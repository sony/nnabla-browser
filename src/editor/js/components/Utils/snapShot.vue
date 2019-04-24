<template>
    
</template>

<script>
    import html2canvas from 'html2canvas';
    import { saveAs } from 'file-saver';

    export default {
        data: function() {
            return {
                element: null,
                mixCanvas: null,
                canvasStep: 800,
                scale: 2,
            }
        },
        props: {
            capElement: Boolean,
            containerId: String,
            imageName: String,
        },
        watch: {
            capElement: {
                handler: function(val, oldval) {
                            if (val != oldval) {
                                this.$emit('snapshot-finish', false);
                                const ele = document.querySelector(`#${this.containerId}`);
                                const rect = ele.getBoundingClientRect();
                                this.canvasStep = this.calculateStep(rect);
                                this.scale = Math.log10(rect.width * rect.height) > 7 ? 1 : 2;
                                setTimeout(()=>{ 
                                    this.convert2Canvas(ele);
                                }, 0);
                            }
                }
            }
        },
        methods: {
            calculateStep(rect) {
                let step = Math.floor(Math.min(rect.width, rect.height, 2500) / 500) || 1;
                let delta = 500 * step;
                let a = rect.width > delta ? this.gamma1(rect.width, delta) : this.gamma2(delta, rect.width);
                let b = rect.height > delta ? this.gamma1(rect.height, delta) : this.gamma2(delta, rect.height);
                while (a < 0 || b < 0) {
                    delta += step * 50;
                    a = rect.width > delta ? this.gamma1(rect.width, delta) : this.gamma2(delta, rect.width);
                    b = rect.height > delta ? this.gamma1(rect.height, delta) : this.gamma2(delta, rect.height);
                }

                return delta;    
            },
            gamma1(a, b) {
                return a % b - b / 2;
            },
            gamma2(a, b) {
                return a % b - b / 10;
            },
            convert2Canvas(ele) {
                const name = this.imageName;
                this.mixCanvas = document.createElement('canvas');
                const rect = ele.getBoundingClientRect();
                const col = Math.ceil(rect.width / this.canvasStep);
                const row = Math.ceil(rect.height / this.canvasStep);
                this.mixCanvas.width = col * this.canvasStep * this.scale;
                this.mixCanvas.height = row * this.canvasStep * this.scale;
                let count = 0;
                for(let i = 0;i < row;i++) {
                    for(let j = 0;j < col;j++) {
                        html2canvas(ele, {
                            scale: this.scale,
                            width: this.canvasStep,
                            height: this.canvasStep,
                            x: j * this.canvasStep - ele.parentNode.scrollLeft,
                            y: i * this.canvasStep - ele.parentNode.scrollTop,
                            logging: false,
                        }).then((canvas) => {
                            this.mixCanvas.getContext("2d").drawImage(canvas, j * this.canvasStep * this.scale, i * this.canvasStep * this.scale);
                            canvas = null;
                        }).finally(()=> {
                            count += 1;
                            if(count == col * row) {
                                this.mixCanvas.toBlob(function(blob) {
                                    let nameString = `${name}_${(new Date()).toISOString().replace(/[TZ:,\. ]/g,'-')}`;
                                    nameString = `${nameString.substring(1, nameString.length-1)}.jpeg`;
                                    saveAs(blob, nameString);
                                }, 'image/jpeg');
                                this.mixCanvas = null;
                            }
                            this.$emit('snapshot-finish', true);
                        })
                    }
                }
            }  
        }
    };
</script>

<style>

</style>

