module.exports['localize'] = module.exports['setLocaleData'] = module.exports['loadMessageBundle'] = module.exports['config'] = null;

function _format(message, args) {
    var result;
    if (args.length === 0) {
        result = message;
    }
    else {
        result = String(message).replace(/\{(\d+)\}/g, function (match, rest) {
            var index = rest[0];
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }
    return result;
}

let CURRENT_LOCALE_DATA = null;

function localize(path, data, defaultMessage) {
    var key = typeof data=== "object" ? data.key : data;
    var data = CURRENT_LOCALE_DATA || {};
    var message = (data[path]||{})[key];
    if (!message) {
        message = defaultMessage;
    }
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return _format(message, args);
}

module.exports['localize'] = localize;

function setLocaleData(data) {
    CURRENT_LOCALE_DATA = data;
}
module.exports['setLocaleData'] = setLocaleData;

function loadMessageBundle(file) {
    return localize;
}
module.exports['loadMessageBundle'] = loadMessageBundle

function config(opt) {
    return loadMessageBundle;
}

module.exports['config'] = config;

function getConfiguredDefaultLocale() {
    return undefined;
}

module.exports['getConfiguredDefaultLocale'] = getConfiguredDefaultLocale;