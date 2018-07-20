<template>
    <transition name="nnc-modal">
        <div>
            <div class="nnc-modal-mask" />
            <div class="nnc-modal-background">
                <nnc-loading />
            </div>
        </div>
    </transition>
</template>

<style>
.nnc-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-gray5);
    opacity: 0.5;
    transition: opacity .3s ease;
}

.nnc-modal-background {
    display: table;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.nnc-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.nnc-modal-container {
    width: 432px;
    margin: 0px auto;
    padding: 16px;
    color: var(--color-ragular);
    background-color: var(--color-gray0);
    border-radius: 2px;
    transition: all .3s ease;
}

.nnc-modal-header {
    display: table-cell;
    vertical-align: middle;
    font-family: "SSTUI-Medium";
    width: 100%;
    margin-bottom: 16px;
    height: 40px;
}

.nnc-modal-body {
    width: 100%;
    margin-bottom: 32px;
}

.nnc-modal-footer {
    width: 100%;
    text-align: right;
}


.nnc-modal-button {
    width: 100px;
    height: 24px;
    background-color: var(--color-gray2);
    border: none;
    border-radius: 4px;
    margin-right: 16px;
}

.nnc-modal-button.default {
    background-color: var(--color-brand);
    color: var(--color-gray0);
    margin-right: 0;
}

.nnc-modal-button:active {
    box-shadow: inset 0 0 1em var(--color-gray0);
}

/*
* The following styles are auto-applied to elements with
* transition="nnc-modal" when their visibility is toggled
* by Vue.js.
*/

.nnc-modal-enter {
    opacity: 0;
}

.nnc-modal-leave-active {
    opacity: 0;
}

.nnc-modal-enter .nnc-modal-container,
.nnc-modal-leave-active .nnc-modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
