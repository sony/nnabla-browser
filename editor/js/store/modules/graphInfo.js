import Vue from "vue/dist/vue.esm.js"

const getActiveGraph = state => state.graphs[state.activeIndex.Graph] || {};

const state = {
    graphs: [],
    nntxtPath: "",
    activeIndex: {Graph: -1, Layer: -1}
};

const mutations = {
    setGraphs: function (state, graphs) {
        Vue.set(state, "graphs", graphs);
    },

    setActiveGraphIndex: function (state, index) {
        state.activeIndex.Graph = index;
        state.activeIndex.Layer = -1;
    },

    setNNtxtPath: function (state, path) {
        state.nntxtPath = path;
    },

    setActiveLayerIndex: function (state, index) {
        state.activeIndex.Layer = index;
    },

    setNodePosition: function (state, {index, x, y}) {
        const activeGraph = getActiveGraph(state);

        activeGraph.nodes[index].x = x;
        activeGraph.nodes[index].y = y;
    },

    addNewLink: function (state, {source, destination}) {
        const activeGraph = getActiveGraph(state);

        activeGraph.links.push({source, destination});
    }
};

const getters = {
    activeGraph: getActiveGraph,

    activeLayer: (state, getters) => {
        if (getters.activeGraph.hasOwnProperty("nodes")) {
            return getters.activeGraph.nodes[state.activeIndex.Layer] || {};
        } else {
            return {};
        }
    },

    activeLinks: (state, getters) => (id) => {
        const ret = [];
        for (let index in getters.activeGraph.links) {
            let link = getters.activeGraph.links[index];
            if (link.source === id || link.destination === id) {
                ret.push({index, ...link});
            }
        }

        return ret;
    }
};

const graphInfoModule = {
    state,
    mutations,
    getters
};

export default graphInfoModule;