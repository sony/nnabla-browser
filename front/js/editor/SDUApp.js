import EditorUtils from './../EditorUtils';
import Definitions from './../misc/Definitions';
import Vue from 'vue/dist/vue.esm.js';

export default () => {
    const eta = EditorUtils.editTabIsActive;
    // Clipboard
    // クリップボードへコピー（マウス操作、キーボード操作）
    document.addEventListener('copy', function(e) {});

    // NetworkEditorにペーストする（キーボード操作）
    document.addEventListener('paste', (e) => {});

    // クリップボードへコピーして削除する（マウス操作、キーボード操作）
    document.addEventListener('cut', function(e) {});

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey) {
            switch (e.keyCode) {
            case Definitions.KEY_CODE.S:
                e.preventDefault();
                break;
            case Definitions.KEY_CODE.Y:
                if (eta()) window.nnc.components.Editor.history.execute({type: 'redo'});
                break;
            case Definitions.KEY_CODE.Z:
                if (eta()) window.nnc.components.Editor.history.execute({type: 'undo'});
                break;
            }
        }
    });

    Vue.config.keyCodes = Object.assign(Vue.config.keyCodes || {}, {
        'backspace': Definitions.KEY_CODE.BACKSPACE,
        'just-delete': Definitions.KEY_CODE.DEL,
        'insert': Definitions.KEY_CODE.INSERT,
        'a': Definitions.KEY_CODE.A,
    });

    $(document).on({
        contextmenu: () => false,
    });
    $('.action-menu-item').on({
        click: (e) => {
            // Actionメニューのdisabled項目をクリックされてもメニューを閉じないようにする
            e.preventDefault();
            e.stopPropagation();
        },
    });
};
