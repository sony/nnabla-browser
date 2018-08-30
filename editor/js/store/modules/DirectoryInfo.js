const Path = require("path");

const searchTargetObj = (path, fileType, target) => {
    let filename;

    const checkExt = (path) => {
        const ext = Path.extname(path);
        if (fileType === "nntxtFiles") {
            return ext === ".nntxt";
        } else if (fileType === "monitorFiles") {
            return ext === ".txt";
        }
    };

    for (let dir of path.split("/")) {
        if (checkExt(dir)) {
            filename = dir;
            break;
        }

        let tmp_result = target.children.find(x => x.name === dir);
        if (typeof tmp_result === "undefined") {
            tmp_result = {name: dir, children: [], monitorFiles: [], nntxtFiles: []};
            target.children.push(tmp_result);
        }

        target = tmp_result
    }

    let index = target[fileType].findIndex(x => x.name === filename);

    return [target, index, filename];
};

const state = {
    data: {
        children: [],
        name: "",
        nntxtFiles: [],
        monitorFiles: []
    }
};

const mutations = {
    initDirectoryInfo: function (state, obj) {
        state.data = Object.assign({}, state.data, obj);
    },

    addDirectoryInfo: function (state, {path, fileType, data}) {
        let [target, fileIndex, filename] = searchTargetObj(path, fileType, state.data);

        if (fileIndex > -1) {
            target[fileType][fileIndex].data = Object.assign({}, target[fileType][fileIndex].data, data)
        } else {
            target[fileType].push({name: filename, data: data});
        }
    },

    deleteDirectoryInfo: function (state, {path, fileType}) {
        let [target, fileIndex, filename] = searchTargetObj(path, fileType, state.data);

        if (fileIndex > -1) {
            target[fileType].splice(fileIndex, 1);
        }
    }
};


const directoryInfoModule = {
    state,
    mutations
};

export default directoryInfoModule;