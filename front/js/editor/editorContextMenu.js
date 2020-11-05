import EditorUtils from './../EditorUtils';

/**
 * グラフ上で右クリックした際に表示されるコンテキストメニューの処理
 */
// const contextMenu = (() => {
//     const _createContextMenu = function() {
//         // 右クリックの場合のみ
//         const undoName = window.nnc.components.Editor.historyInfo.undo.name;
//         const redoName = window.nnc.components.Editor.historyInfo.redo.name;
//         const layersContained = 0 < Graph.selection.layer.members().length;
//         const networkGraph = window.nnc.components.Editor.zoomInfo.networkGraph;
//         const values = EditorUtils.indexOperator(networkGraph.percentages, networkGraph.percentage);
//
//         let html = '<div class="network-context-menu context-menu">';
//         if (!undoName) {
//             html += '<a href="#"><div class="menu-item disabled">Undo</div></a>';
//         } else {
//             html += '<a href="#" onClick="nnc.components.Editor.history.execute({type: \'undo\'});contextMenu.close();"><div class="menu-item enabled">Undo - ' + undoName + '</div></a>';
//         }
//
//         if (!redoName) {
//             html += '<a href="#"><div class="menu-item disabled">Redo</div></a>';
//         } else {
//             html += '<a href="#" onClick="nnc.components.Editor.history.execute({type: \'redo\'});contextMenu.close();"><div class="menu-item enabled">Redo - ' + redoName + '</div></a>';
//         }
//
//         html += '<span class="item-separator"></span>';
//         if (Graph.selection.isEmpty()) {
//             html += '<a href="#"><div class="menu-item disabled">Cut</div></a>';
//             html += '<a href="#"><div class="menu-item disabled">Copy</div></a>';
//             html += '<a href="#" onClick="clipboard.paste();contextMenu.close();"><div class="menu-item enabled">Paste</div></a>';
//             html += '<a href="#"><div class="menu-item disabled">Delete</div></a>';
//         } else {
//             if (layersContained) {
//                 html += '<a href="#" onClick="clipboard.cut();contextMenu.close();"><div class="menu-item enabled">Cut</div></a>';
//                 html += '<a href="#" onClick="clipboard.copy();contextMenu.close();"><div class="menu-item enabled">Copy</div></a>';
//             } else {
//                 html += '<a href="#"><div class="menu-item disabled">Cut</div></a>';
//                 html += '<a href="#"><div class="menu-item disabled">Copy</div></a>';
//             }
//             html += '<a href="#" onClick="clipboard.paste();contextMenu.close();"><div class="menu-item enabled">Paste</div></a>';
//             html += '<a href="#" onClick="window.Graph.deleteSelection(\'Delete\');contextMenu.close();"><div class="menu-item enabled">Delete</div></a>';
//         }
//         html += '<span class="item-separator"></span>';
//         html += '<a href="#" onClick="window.Graph.selectAll();contextMenu.close();"><div class="menu-item enabled">Select All</div></a>';
//         html += '<a href="#" onClick="window.Graph.invertSelection();contextMenu.close();"><div class="menu-item enabled">Inverse Layer Selection</div></a>';
//         if (layersContained) {
//             html += '<a href="#" onClick="window.Graph.selection.clear();contextMenu.close();"><div class="menu-item enabled">Clear Selection</div></a>';
//         } else {
//             html += '<a href="#"><div class="menu-item disabled">Clear Selection</div></a>';
//         }
//         html += '<span class="item-separator"></span>';
//         html += '<a href="#" onClick="EditorUtils.arrange_layers();contextMenu.close();"><div class="menu-item enabled">Arrange Layers</div></a>';
//         html += '<span class="item-separator"></span>';
//         html += '<a href="#" onClick="nnc.components.Editor.zoomInfo.networkGraph.zoom(100);contextMenu.close();"><div class="menu-item enabled">Zoom Default</div></a>';
//         if (values.canMoveNext) {
//             html += '<a href="#" onClick="nnc.components.Editor.zoomInfo.networkGraph.zoom(' + values.next + ');contextMenu.close();"><div class="menu-item enabled">Zoom In</div></a>';
//         } else {
//             html += '<a href="#"><div class="menu-item disabled">Zoom In</div></a>';
//         }
//         if (values.canMovePrev) {
//             html += '<a href="#" onClick="nnc.components.Editor.zoomInfo.networkGraph.zoom(' + values.prev + ');contextMenu.close();"><div class="menu-item enabled">Zoom Out</div></a>';
//         } else {
//             html += '<a href="#"><div class="menu-item disabled">Zoom Out</div></a>';
//         }
//
//         html += '<span class="item-separator"></span>';
//         html += '<a href="#" onclick="window.nntxt.uploadNNtxt()"><input id="upload_nntxt" name="nntxt" type="file" style="display:none"/><div class="ui-menu-item enable">load nntxt</div></a>';
//
//         html += '</div>';
//
//         return html;
//     };
//     /**
//      * コンテキストメニュー表示
//      * @param e
//      * @returns {boolean}
//      */
//     const _showContextMenu = function(e) {
//         // コンテキストメニュー削除
//         $('.network-context-menu.context-menu').remove();
//
//         if (e.buttons === 2) {
//             const html = _createContextMenu();
//             $('body').append(html);
//             // コンテキストメニュー表示位置調整
//             const x = e.pageX - 5;
//             let y = e.pageY - 5;
//             const contextMenu = $('.context-menu');
//             const menuBottom = e.pageY + contextMenu.outerHeight(true);
//             if (menuBottom > window.innerHeight) {
//                 y = e.pageY - (menuBottom - window.innerHeight);
//             }
//             contextMenu.css({
//                 'top': y,
//                 'left': x,
//             });
//         }
//
//         return false;
//     };
//     /**
//      * メニューを閉じる
//      */
//     const _close = () => {
//         $('.pull-right.open').removeClass('open');
//         $('.network-context-menu.context-menu').remove();
//     };
//     return {
//         showContextMenu: _showContextMenu,
//         createContextMenu: _createContextMenu,
//         close: _close,
//     };
// })();

const contextMenu = {};

export default contextMenu;
