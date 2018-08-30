import Vue from "vue/dist/vue.esm.js"

const state = {
    graphs: [],
    nntxtPath: "",
    activeIndex: -1,
    selectedLayer: {}
};

const mutations = {
    setGraphs: function(state, graphs) {
        Vue.set(state, "graphs", graphs);
    },

    setActiveGraphIndex: function(state, index){
        state.activeIndex = index;
    },

    setNNtxtPath: function(state, path) {
        state.nntxtPath = path;
    },

    setSelectedLayer : function (state, node) {
        const keys = Object.keys(state.selectedLayer);

        for (let key of keys) {
            Vue.delete(state.selectedLayer, key);
        }

        state.selectedLayer = {...state.selectedLayer, ...node};
    }
};

const graphInfoModule = {
    state,
    mutations,
};

export default graphInfoModule;