export default (function () {
    let _timeoutIds = {};
    const _getId = (function () {
        let _id = 0;
        const _idManager = new WeakMap();
        return function (obj) {
            if (!_idManager.has(obj)) {
                _idManager.set(obj, _id++);
            }
            return _idManager.get(obj);
        };
    })();

    return {
        /**
         * JavaScript Object に対し、このアプリケーション内でユニークになる Id を取得する。
         */
        getId: _getId,
        /**
         * 秒を基に日時を取得する
         * @param _sec
         * @returns {string}
         * @memberOf sdu.Utils
         */
        calcSecToDayHourMinSec: function (_sec) {
            if (_sec == 0) return '--:--:--:--';

            const MINUTE = 60;
            const HOUR = 60 * MINUTE;
            const DAY = 24 * HOUR;

            const days = Math.floor(_sec / DAY);
            if (days >= 1) {
                _sec -= days * DAY;
            }

            const hours = Math.floor(_sec / HOUR);
            if (hours >= 1) {
                _sec -= hours * HOUR;
            }

            const minutes = Math.floor(_sec / MINUTE);
            if (minutes >= 1) {
                _sec -= minutes * MINUTE;
            }

            return this.zerofill(days) + ':' + this.zerofill(hours) + ':' + this.zerofill(minutes) + ':' + this.zerofill(Math.floor(_sec));
        },
        /**
         * 0埋めする
         * @param value
         * @param length
         * @returns {string}
         * @memberOf sdu.Utils
         */
        zerofill: function (value, length) {
            length = length || 2;
            for (let i = String(value).length; i < length; i++) {
                value = '0' + value;
            }
            return String(value).slice(-length);
        },
        /**
         * "yyyy/MM/dd-hh:mm:ss"形式の時間を"yyyyMMdd_hhmmss"に変換する
         * @param strDateTime
         * @returns {string}
         * @memberOf sdu.Utils
         */
        convertModifiedDataTimeToResultTitle: function (strDateTime) {
            const aryDateTime = strDateTime.split('-');
            const ymd = aryDateTime[0].split('/');
            const hms = aryDateTime[1].split(':');
            return ymd[0] + ymd[1] + ymd[2] + '_' + hms[0] + hms[1] + hms[2];
        },
        /**
         * 0以外の値を取得する. ない場合、0を返す
         * @param strArray
         * @returns {number}
         * @memberOf sdu.Utils
         */
        getNotZeroValue: function (strArray) {
            if (strArray.length === 0) return -1;
            const reversed = strArray.map(Number).filter(function (x) {
                return x !== 0;
            }).reverse();
            return reversed.length > 0 ? reversed[0] : 0;
        },
        /**
         * 指定した桁数にする
         * @param num round対象の数値
         * @param [few=2] {number} 少数第何位まで表示するか
         * @memberOf sdu.Utils
         */
        round: function (num, few) {
            few = few != null ? few : 2;
            const factor = Math.pow(10, few);
            return Math.round(num * factor) / factor;
        },
        /*
        * key に関連付けた callback を timeout 後に設定する。
        * すでに key に callback が関連付けられていたら先にこれをキャンセルする。
        * callback を指定しなければキャンセルのみを実行する。
        * @param key callback を管理するためのキー
        * @param callback timeout 後に呼び出すコールバック関数
        * @param timeout callback 呼び出しの遅延時間。指定しなければ 2500ms
        */
        setTimeout: function (key, callback, timeout) {
            const timeoutId = _timeoutIds[key];
            if (timeoutId) {
                clearTimeout(timeoutId);
                delete _timeoutIds[key];
            }
            if (callback) {
                _timeoutIds[key] = setTimeout(function () {
                    delete _timeoutIds[key];
                    callback();
                }, timeout || 2500);
            }
        },
        /**
         * 要素を重複なく格納できる集合（Set）実装。
         */
        Set: function () {
            let _set = {};

            this.insert = function (obj) {
                _set[_getId(obj)] = obj;
            };
            this.remove = function (obj) {
                delete _set[_getId(obj)];
            };
            this.clear = function (obj) {
                _set = {};
            };
            this.members = function () {
                return this.apply((x) => x);
            };
            this.contains = function (obj) {
                return _getId(obj) in _set;
            };
            // apply function 'f' for each elements in selection.
            // returns application result of f as array.
            this.apply = function (f) {
                const results = [];
                for (let key in _set) {
                    if (Object.prototype.hasOwnProperty.call(_set, key)) {
                        const value = f(_set[key]);
                        results.push(value);
                    }
                }

                return results;
            };
        },
    };
})();
