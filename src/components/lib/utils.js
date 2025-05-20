"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
exports.formatCurrency = formatCurrency;
exports.generateUniqueId = generateUniqueId;
exports.truncateText = truncateText;
exports.formatDate = formatDate;
exports.debounce = debounce;
exports.throttle = throttle;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
// Utility function to merge class names with Tailwind
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
// Utility function to format a number with currency
function formatCurrency(amount, currency, options) {
    if (currency === void 0) { currency = "USD"; }
    return new Intl.NumberFormat("en-US", __assign({ style: "currency", currency: currency }, options)).format(amount);
}
// Utility function to generate a unique ID
function generateUniqueId(prefix) {
    if (prefix === void 0) { prefix = "id"; }
    return "".concat(prefix, "-").concat(Math.random().toString(36).substring(2, 9));
}
// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.substring(0, maxLength) + "...";
}
// Utility function to format date
function formatDate(date, options) {
    return new Intl.DateTimeFormat("en-US", __assign({ day: "numeric", month: "short", year: "numeric" }, options)).format(date);
}
// Utility function to debounce function calls
function debounce(func, wait) {
    var timeout = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            timeout = null;
            func.apply(void 0, args);
        };
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}
// Utility function to throttle function calls
function throttle(func, limit) {
    var inThrottle = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!inThrottle) {
            func.apply(void 0, args);
            inThrottle = true;
            setTimeout(function () {
                inThrottle = false;
            }, limit);
        }
    };
}
