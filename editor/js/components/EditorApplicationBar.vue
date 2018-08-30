<template>
    <div class="editor-navbar">
        <div style="margin-left: 30px;">
            <appbar-tab tab-name="graph"/>
            <appbar-tab tab-name="monitoring"/>
        </div>
        <div class="editor-navbar-center"></div>
        <div style="height: 100%; float: right;">
            <button-expand/>
        </div>
    </div>
</template>

<script>
    import EditorWindowSize from './../EditorWindowSize';
    import Vue from 'vue/dist/vue.esm.js';

    export default {
        components: {
            'appbar-tab': {
                props: ['tabName'],
                template: `
                <div class="nnc-invoker" :class="['navbar-el', $store.state.editor.activeTabName === tabName ? 'active' : '']" @click="changeActiveTab(tabName)">
                    <span class="navbar-tab">
                        {{ tabName.toUpperCase() }}
                    </span>
                </div>`,
                methods: {
                    changeActiveTab: function (tabName) {
                        this.$store.commit("changeActiveTab", tabName);
                        Vue.nextTick(function () {
                            EditorWindowSize.init();
                        });
                    },
                },
            },
            'button-expand': {
                template: `
            <div class="nnc-invoker navbar-el" @click.prevent="onclick">
            <img src="./editor/image/ExpandWhite.svg" class="navbar-img nnc-enabled" title="Full screen (F11)" />
            </div>`,
                methods: {
                    onclick: () => {
                        if (document.webkitIsFullScreen) {
                            if (document.webkitExitFullscreen) {
                                document.webkitExitFullscreen();
                            }
                        } else {
                            const elem = document.querySelector('body');
                            if (elem.webkitRequestFullscreen) {
                                elem.webkitRequestFullscreen();
                            }
                        }
                    },
                },
            },
        },
    };
</script>

<style>
    .editor-navbar {
        width: 100%;
        height: 40px;
        background-color: var(--color-gray5);
    }

    .editor-navbar-center {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
        width: 480px;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }
</style>
