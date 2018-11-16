/**
 * コピー,貼付け,切取り処理
 * @type {Child|*}
 */
const clipboard = (() => {
    return {
        /**
         * コピー処理（マウス操作）
         */
        copy: () => document.execCommand('copy'),
        _copy: function(e) {},
        /**
         * ペースト処理（マウス操作）
         */
        paste: function(osData) {},
        /**
         * カット処理（マウス操作）
         */
        cut: () => document.execCommand('cut'),
    };
})();

export default clipboard;
