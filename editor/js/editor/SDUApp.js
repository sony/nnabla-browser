import clipboard from './clipboard';
import EditorUtils from './../EditorUtils';
import Graph from './../currentGraph';
import SvgArea from './SDNSvgArea';
import Definitions from './../misc/Definitions';
import Vue from 'vue/dist/vue.esm.js';

export default () => {
    const uop = EditorUtils.allowedUserOperation;
    const eta = EditorUtils.editTabIsActive;
    const dl = () => window.svgArea.draggingLayer(); // window.svgArea have not been exist yet. (just constructed here after...)
    // Clipboard
    // クリップボードへコピー（マウス操作、キーボード操作）
    document.addEventListener('copy', function(e) {
        if (uop() && eta() && !dl() && 0 < Graph.selection.layer.members().length) {
            clipboard._copy(e);
        }
    });

    // NetworkEditorにペーストする（キーボード操作）
    document.addEventListener('paste', (e) => {
        if (uop() && eta() && !dl()) {
            clipboard.paste(e.clipboardData.getData('text'));
        }
    });

    // クリップボードへコピーして削除する（マウス操作、キーボード操作）
    document.addEventListener('cut', function(e) {
        if (uop() && eta() && !dl() && 0 < Graph.selection.layer.members().length) {
            clipboard._copy(e);
            Graph.deleteSelection('Cut');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (uop() && !dl() && e.ctrlKey) {
            switch (e.keyCode) {
            case Definitions.KEY_CODE.S:
                e.preventDefault();
                EditorUtils.save_configuration();
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

    new SvgArea();
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
