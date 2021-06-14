'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var scope = require('../scope/scope.js');

var Ref = /** @class */ (function () {
    function Ref() {
        this.key = Symbol('ref');
    }
    Object.defineProperty(Ref.prototype, "value", {
        get: function () {
            return scope['default'].references[this.key];
        },
        enumerable: false,
        configurable: true
    });
    return Ref;
}());

exports.Ref = Ref;
exports.default = Ref;
