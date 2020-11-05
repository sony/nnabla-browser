
const state = {
    data: {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
    },
    isMaskActive: undefined,
    dialogueType: 'input',
    defaultStr: '',
    inputStr: '',
    inputDef: $.Deferred(),
};

const mutations = {
    restoreBodyRect: function (state, rect) {
        state.data.windowWidth = rect.w;
        state.data.windowHeight = rect.h;
    },
    changeMaskStatus: function (state, s) {
        state.data.windowWidth = window.innerWidth;
        state.data.windowHeight = window.innerHeight;
        state.isMaskActive = s;
    },
    changeDialogueType: function (state, t) {
        state.dialogueType = t;
    },
    setDefaultStr: function(state, s) {
        state.defaultStr = s;
    },
    resolveDialogueStr: function(state ,s) {
        state.inputDef.resolve(s);
    },
    resetInputDef: function(state) {
        state.inputDef = $.Deferred();
    }
};

const getters = {
    inputStrDef: function(state) {
        return state.inputDef.promise();
    }
}

const actions = {
    emitStr: function(context, s) {
        context.commit('resolveDialogueStr', s);
    },
    emitCancel: function(context) {
        context.commit('resolveDialogueStr', null);
    }
}

const dialogueInfoModule = {
    state,
    mutations,
    getters,
    actions
};

export default dialogueInfoModule;
