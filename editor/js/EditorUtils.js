import Graph from './currentGraph';
import store from './store/index';

const EditorUtils = (() => {
    let _nnablamdaCalls = {};
    let _timeoutIds = {};

    const _generateNetworksCurrentEditingOnly = () => {
        const current = window.Graphs.flush(); // reflect current edit into data.
        return [current];
    };

    const _generateNetworks = () => {
        window.Graphs.flush(); // reflect current edit into data.
        return window.Graphs.data();
    };

    const _generateConfiguration = (networks) => {
        const configuration = {
            networks: networks || _generateNetworks(),
        };
        return Object.assign(configuration, configs.serialize_data());
    };
    /**
     * get component
     * @param {string} type component type name
     * @returns {component}
     */
    const _component = function (type) {
        return nNablaCore.layers.components.find((component) => component.name == type);
    };

    const _callApi = (request, doneCallback, failedCallback, alwaysCallback) => {
        return $.ajax(request)
            .done(doneCallback)
            .fail(failedCallback)
            .always(alwaysCallback);
    };

    /**
     * 配列とその中の値の組から、隣の値に移動できるか、移動した隣の値は何か、を操作するオブジェクトを生成する。
     *
     * @param {Array} array 値の配列（配列内に重複する値が存在しないよう、呼び出し側が保証すること）
     * @param {Number} value 現在の値（array 内にあることは、呼び出し側が保証すること）
     * @return {Object} { next: value, prev: value, canMoveNext: Boolean, canMovePrev: Boolean, }
     */
    const IndexOperator = function (array, value) {
        const index = array.indexOf(value);
        this.canMoveNext = index !== array.length - 1;
        this.canMovePrev = index !== 0;
        this.next = array[index + 1];
        this.prev = array[index - 1];
    };

    return {
        params: {},
        /*
         * key に関連付けた callback を timeout 後に設定する。
         * すでに key に callback が関連付けられていたら先にこれをキャンセルする。
         * callback を指定しなければキャンセルのみを実行する。
         * @param key callback を管理するためのキー
         * @param callback timeout 後に呼び出すコールバック関数
         * @param timeout callback 呼び出しの遅延時間。指定しなければ 2500ms
         */
        setTimeout: function (key, callback, timeout) {
            clearTimeout(_timeoutIds[key]);
            delete _timeoutIds[key];

            if (callback) {
                _timeoutIds[key] = setTimeout(() => {
                    delete _timeoutIds[key];
                    callback();
                }, timeout || 2500);
            }
        },
        getParams: function () {
            if (Object.keys(this.params).length === 0) {
                const _params = location.search.substring(1).split('&');
                _params.forEach((param) => {
                    const keyValue = param.split('=');
                    this.params[keyValue[0]] = keyValue[1];
                });
            }
            return this.params;
        },
        getProjectId: function () {
            return this.getParams().project_id;
        },
        /**
         * resultを基に、NetworkGraphをロードする
         * @param result
         */
        load: function (networks) {
            window.Graphs.reset(networks);
            if (window.svgArea) {
                window.svgArea.requestAdjustSize();
            }
        },
        serialize_configuration: _generateConfiguration,
        save_configuration: function (atLast) {
            store.dispatch('saveConfiguration', {
                project: window.nnc.components.Editor.project,
                configuration: _generateConfiguration(),
            });
        },

        set_auto_save: function () {
            const autoSave = function () {
                setTimeout(autoSave, 10000);
                EditorUtils.save_configuration();
            };
            autoSave();
        },
        getComponent: _component,
        toUniqueName: function (name, list) {
            let index = 1;
            const duplicated = function (name) {
                return list.some((el) => el.name == name);
            };
            if (duplicated(name)) {
                while (duplicated(name + '_' + index)) {
                    index++;
                }
            } else {
                return name;
            }
            return name + '_' + index;
        },
        getNewJobName: () => (new Date()).toISOString().replace('T', '_').replace(/[-:]/g, '').substring(0, 15),
        callApi: _callApi,
        allowedUserOperation: () => window.nnc.components.Editor.$data.isLoadEnd,
        editTabIsActive: () => window.nnc.editor.activeTabName === 'EDIT',
        is_active: (job) => ['queued', 'preprocessing', 'processing'].includes(job.status),
        indexOperator: (array, value) => new IndexOperator(array, value),
    };
})();

export default EditorUtils;
