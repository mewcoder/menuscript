const add = (function (total) {
    let allArgs = [];
    function _add(...args) {
        allArgs = [...allArgs, ...args];
        if (allArgs.length >= total) {
            let ret = allArgs.reduce((pre, cur) => pre + cur, 0);
            allArgs.length = 0;
            return ret;
        } else {
            return _add
        }
    }
    return _add
})(5);