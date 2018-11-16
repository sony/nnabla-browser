import Vue from "vue/dist/vue.esm";
import Vuex from 'vuex/dist/vuex.esm';

import editor from "./modules/editor"
import directoryInfo from "./modules/DirectoryInfo";
import graphInfo from "./modules/graphInfo";
import chartInfo from "./modules/chartInfo";
import csvInfo from "./modules/csvInfo";

// Vue.config.devtools = true;

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        editor,
        directoryInfo,
        graphInfo,
        chartInfo,
        csvInfo
    }
});
