<template>
    <div class="editor-navbar">
        <div> <!-- this DIV element for symmetry of 'pull-right' -->
            <button-home/>
            <appbar-tab tab-name="EDIT"/>
            <appbar-tab tab-name="MONITORING"/>
        </div>
        <div class="editor-navbar-center"></div>
        <div class="pull-right">
            <appbar-tab tab-name="CONFIG"/>
            <button-save v-bind:loaded="loaded" @click="$emit('save')"/>
            <button-save-as v-bind:loaded="loaded" @click="$emit('save-as')"/>
            <button-expand/>
        </div>
    </div>
</template>

<script>
    import EditorWindowSize from './../EditorWindowSize';
    import contextMenu from './../editor/editorContextMenu';
    import Vue from 'vue/dist/vue.esm.js';

    export default {
        props: ['loaded', 'projectName'],
        components: {
            'appbar-tab': {
                props: ['tabName'],
                template: `
                <div class="nnc-invoker" :class="['navbar-el', editor.activeTabName === tabName ? 'active' : '']" @click="changeActiveTab(tabName)">
                    <span class="navbar-tab">
                        <img v-if='tabName === "CONFIG"' src="./editor/image/SettingsWhite.svg" class="navbar-img nnc-enabled">
                        {{ tabName }}
                    </span>
                </div>
            `,
                data: function () {
                    return {
                        editor: window.nnc.editor,
                    };
                },
                methods: {
                    changeActiveTab: function (tabName) {
                        contextMenu.close();
                        window.nnc.editor.activeTabName = tabName;
                        Vue.nextTick(function () {
                            EditorWindowSize.init();
                        });
                    },
                },
            },
            'button-home': {
                template: `
            <div class="nnc-invoker navbar-el">
                <router-link to="/" title="Home">
                    <img src="./editor/image/HomeWhite.svg" class="navbar-img nnc-enabled"/>
                </router-link>
            </div>`,
            },
            'button-save': {
                props: ['loaded'],
                template: `
            <div class="nnc-invoker navbar-el">
            <img v-if="loaded" src="./editor/image/SaveWhite.svg" class="navbar-img nnc-enabled" title="Save (Ctrl+S)" @click="$emit('click')" />
            <img v-else        src="./editor/image/SaveWhite.svg" class="navbar-img nnc-disabled" />
            </div>`,
            },
            'button-save-as': {
                props: ['loaded'],
                template: `
            <div class="nnc-invoker navbar-el">
            <img v-if="loaded" src="./editor/image/SaveAsWhite.svg" class="navbar-img nnc-enabled" title="Save as" @click="$emit('click')" />
            <img v-else        src="./editor/image/SaveAsWhite.svg" class="navbar-img nnc-disabled" />
            </div>`,
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

    .project-name {
        font-family: "SSTUI-Medium";
        font-size: 13px;
        color: var(--color-gray0);
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
