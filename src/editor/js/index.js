import Vue from 'vue/dist/vue.esm.js';
import VueRouter from 'vue-router';
import Editor from './components/Editor.vue';
import CheckBoxVue from './components/Shared/CheckBox.vue';
import RadioButtonVue from './components/Shared/RadioButton.vue';
import DialogVue from './components/Shared/Dialog.vue';
import LoadingVue from './components/Shared/Loading.vue';
import ModalLoadingVue from './components/Shared/ModalLoading.vue';
import ZoomBoxVue from './components/Shared/ZoomBox.vue';
import ContextMenuVue from './components/Shared/ContextMenu.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);

import store from "./store/index.js";

Vue.use(VueRouter);

// Register global components.
Vue.component('nnc-checkbox', CheckBoxVue);
Vue.component('nnc-radio', RadioButtonVue);
Vue.component('nnc-dialog', DialogVue);
Vue.component('nnc-loading', LoadingVue);
Vue.component('nnc-modal-loading', ModalLoadingVue);
Vue.component('nnc-zoom-box', ZoomBoxVue);
Vue.component('context-menu', ContextMenuVue);

// for debug
Vue.config.devtools = true;

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Editor
        }
    ]
});

new Vue({
    router,
    store,
    el: '#app',
});
