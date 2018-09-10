
const state = {
    path: "",
    data: {},
    length: 0
};

const mutations = {
    setCsvResult: function (state, {path, data}) {
        state.path = path;
        state.data = {...state.data, ...data};
        state.length = data.values.length;
    }
};

const getters = {
    getPartialData: (state, getters) => (index, length) => {
        return state.data.values.slice(index, index + length - 1);
    }
};

const csvInfoModule = {
    state,
    mutations,
    getters
};

export default csvInfoModule;