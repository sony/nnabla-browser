<template>
    <transition name="nnc-modal">
        <div>
            <div class="nnc-modal-mask" />
            <div class="nnc-modal-background">
                <div class="nnc-modal-wrapper">
                    <div class="nnc-modal-container">
                        <div class="nnc-modal-header">{{ data.title }}</div>
                        <div class="nnc-modal-body">
                        <div v-if="data.message" style="white-space: pre-wrap;">
                            <span v-for="(line, index) in lines" :key="index">{{ line }}<br /></span>
                        </div>
                        <input v-else
                        ref="userInput"
                        type="text"
                        @keyup.enter="defaultButton.action(userInput)"
                        :value="data.initialValue"
                        style="width: 100%;"
                        />
                        </div>
                        <div class="nnc-modal-footer">
                        <button class="nnc-modal-button" v-for="(btn, index) in buttons" :key="index" @click="btn.action()">{{ btn.name }}</button>
                        <button class="nnc-modal-button default" @click="defaultButton.action(userInput)">{{ defaultButton.name }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {data: Object},
    computed: {
        lines: function() {
            return this.data.message.split('\n');
        },
        userInput: function() {
            return (this.$refs.userInput || {}).value;
        },
        buttons: function() {
            const actions = this.data.actions;
            return actions.slice(0, actions.length - 1);
        },
        defaultButton: function() {
            const actions = this.data.actions;
            return actions[actions.length - 1];
        },
    },
};
</script>

<style>

</style>
