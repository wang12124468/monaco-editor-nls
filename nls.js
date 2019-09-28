// Modified to support localization.
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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

export function localize(path, data, defaultMessage) {
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

export function setLocaleData(data) {
    CURRENT_LOCALE_DATA = data;
}