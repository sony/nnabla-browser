<template>
    <div v-if="isActive" class="dialogue-mask" :style="whRect"> 
        <div class="input-window" v-if="dialogueType==='input'">
            <div class="header">
                <h4>Save image</h4>
                <button @click="cancelInput" ><font-awesome-icon icon="times" class="cancel-icon" /></button>
            </div>
            <div class="content">
                <label for="instr">name:</label>
                <input name="instr" v-model="dialogueInput" />
            </div>
            <div class="footer">
                <button @click="emitInput">save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);

export default {
    data: function() {
        return {
            dialogueInput: null,
        }
    },
    props: {
        inputString: String,
    },
    computed:{
        isActive: function(){
            return this.$store.state.dialogueInfo.isMaskActive;
        },
        dialogueType: function() {
            return this.$store.state.dialogueInfo.dialogueType;
        },
        whRect: function() {
            const rect = this.$store.state.dialogueInfo.data;
            return {
                minWidth: `${rect.windowWidth}px`,
                minHeight: `${rect.windowHeight}px`,
            }
        },
        defaultStr: function() {
            return this.$store.state.dialogueInfo.defaultStr;
        }
    },
    watch:{
        defaultStr: {
            handler: function(val, oldVal) {
                if(val != oldVal){
                    this.dialogueInput = val;
                }
            }
        }
    },
    mounted: function() {
        document.body.onresize = () => {
            if(this.isActive) {
                this.$store.commit('restoreBodyRect', {
                    w: window.innerWidth,
                    h: window.innerHeight,
                });
            }
        };
    },
    methods: {
        emitInput: function() {
            const str = this.dialogueInput != '' ? this.dialogueInput: this.defaultStr;
            this.$store.dispatch('emitStr', str);
        },
        cancelInput: function() {
            this.$store.dispatch('emitCancel');
        }
    }
}
</script>

<style scoped>
div.dialogue-mask {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.input-window {
    background-color: var(--color-gray0);
    min-height: 120px;
    min-width: 200px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-shadow: 0 0px 10px var(--color-gray0);
    border: 2px solid;
    border-color: rgba(0,0,0,0.5);
}

div.input-window .header{
    background-color: var(--color-gray5);
    color: var(--color-gray0);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

div.input-window .header h4{
    margin: 10px 0 10px 10px;
}

div.input-window .header button{
    background: none;
    outline: none;
    border: none;
}

div.input-window .header .cancel-icon{
    font-size: 1.5rem;
    margin-right: 0.5rem;
}

div.input-window .content{
    text-align: center;
    margin-left: 1rem;
    margin-right: 0.5rem;
}

div.input-window .content input{
    min-width: 380px;
}

div.input-window .footer{
    text-align: center;
}
</style>
