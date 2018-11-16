const state = {
    path: "",
    data: {}, // {values: [[path, predLabel, label]]}
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
    },

    confusionMatrix: (state, getters) => {
        const labelLength = getters.labelLength;

        const matrix = new Array(labelLength);
        for (let i = 0; i < labelLength; i++){
            matrix[i] = new Array(labelLength).fill(0);
        }

        if (state.data.hasOwnProperty("values")) {
            for (let x of state.data.values) {
                matrix[x[2]][x[1]]++;
            }
        }

        return matrix;
    },

    labelLength: (state, getters) => {
        if (state.data.hasOwnProperty("values")) {
            let max = 0;
            for (let x of state.data.values) {
                max = x[2] > max ? x[2] : max;
            }

            return max + 1

        } else {
            return 0
        }
    }
};

const csvInfoModule = {
    state,
    mutations,
    getters
};

export default csvInfoModule;