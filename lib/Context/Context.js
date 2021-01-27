'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope_scope = require('../scope/scope.js');

/** You can pass a value from a parent element through any children to the place you need. */
var Context = /** @class */ (function () {
    function Context(defaultValue) {
        this.defaultValue = defaultValue;
        this.key = Symbol('context');
    }
    Context.prototype.provide = function (value, children) {
        var _a;
        return {
            children: children,
            context: (_a = { __proto__: scope_scope['default'].currentPlugins }, _a[this.key] = value, _a),
        };
    };
    Object.defineProperty(Context.prototype, "value", {
        get: function () {
            var currentPlugins = scope_scope['default'].currentPlugins;
            var key = this.key;
            return key in currentPlugins ? currentPlugins[key] : this.defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    return Context;
}());

exports.Context = Context;
exports.default = Context;
