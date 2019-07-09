<template>
    
</template>

<script>
    import html2canvas from 'html2canvas';
    import { saveAs } from 'file-saver';
    import Definition from "./../../misc/Definitions";

    export default {
        data: function() {
            return {
                element: null,
                mixCanvas: null,
                canvasStep: 800,
                scale: 2,
                GRID: Definition.EDIT.GRID.SIZE,
            }
        },
        computed: {
            originTransform: function() {
                return `translate(${this.GRID * 2}, ${this.GRID * 2}) scale(1)`;
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
                        this.$store.commit('changeMaskStatus', true);
                        let nameString = `${this.imageName}_${(new Date()).toISOString().replace(/[TZ:,\. ]/g,'-')}`;
                        nameString = nameString.substring(0, nameString.length-1);
                        this.$store.commit('setDefaultStr', nameString);
                        const ele = document.querySelector(`#${this.containerId}`);
                        const rect = ele.getBoundingClientRect();
                        this.canvasStep = this.calculateStep(rect);
                        this.scale = Math.log10(rect.width * rect.height) > 7 ? 1 : 2;
                        setTimeout(()=>{ 
                            if (this.containerId === "network-container") {
                                this.svg2canvas(ele);
                            } else {
                                this.convert2Canvas(ele);
                            }
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
            svg2canvas(ele) {
                let serializer = new XMLSerializer();
                // related value calculation
                const svg = ele.querySelector('#network-editor');
                const graphDom = svg.querySelector('#graph-container');
                let transform = graphDom.getAttribute('transform') || this.originTransform;
                let scale = parseFloat(transform.split('scale(')[1]) || 1;
                const imageWidth = graphDom.getBoundingClientRect().width / scale;
                const imageHeight = graphDom.getBoundingClientRect().height / scale;
                let canvasWidth = imageWidth + this.GRID * 4; //space around
                let canvasHeight = imageHeight + this.GRID * 4;

                let clone = svg.cloneNode(true);
                clone.removeAttribute('width');
                clone.removeAttribute('height');
                let graph = clone.querySelector('#graph-container');
                graph.removeAttribute('transform');
                const source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(clone);
                let image = new Image;
                image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
                let canvas = document.createElement('canvas');
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                let context = canvas.getContext('2d');
                context.fillStyle = '#fff';//image background  
                context.fillRect(0, 0, canvas.width, canvas.height);
                // 2 * GRID space
                image.onload = () => context.drawImage(image, this.GRID * 2, this.GRID * 2);
                this.$store.getters.inputStrDef.then(name => {
                    if (name) {
                        canvas.toBlob(function(blob) {
                            saveAs(blob, `${name}.jpeg`);
                        }, 'image/jpeg');
                    }
                    this.$store.commit('resetInputDef');
                    this.$store.commit('changeMaskStatus', false);
                });
                this.$emit('snapshot-finish', true); 
            },
            convert2Canvas(ele) {
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
                            x: j * this.canvasStep - ele.parentNode.scrollLeft + ele.offsetLeft,
                            y: i * this.canvasStep - ele.parentNode.scrollTop + ele.offsetTop,
                            logging: false,
                        }).then((canvas) => {
                            this.mixCanvas.getContext("2d").drawImage(canvas, j * this.canvasStep * this.scale, i * this.canvasStep * this.scale);
                            canvas = null;
                        }).finally(()=> {
                            count += 1;
                            if(count == col * row) {
                                this.$store.getters.inputStrDef.then(name => {
                                    if (name) {
                                        this.mixCanvas.toBlob(function(blob) {
                                            saveAs(blob, `${name}.jpeg`);
                                        }, 'image/jpeg');
                                    }
                                    this.mixCanvas = null;
                                    this.$store.commit('resetInputDef');
                                    this.$store.commit('changeMaskStatus', false);
                                });
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

