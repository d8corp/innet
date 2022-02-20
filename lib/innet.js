'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PLUGINS = Symbol('Plugins');
function createHandler(plugins, extendHandler) {
    if (extendHandler === void 0) { extendHandler = null; }
    var handler = Object.create(extendHandler);
    var createdPlugins = handler[PLUGINS] = extendHandler ? handler[PLUGINS].slice() : [];
    for (var i = 0; i < plugins.length; i++) {
        createdPlugins.push(plugins[i](handler));
    }
    return handler;
}
function net(app, handler, id, plugins) {
    if (plugins.length > id) {
        return function (a, h, next) {
            if (a === void 0) { a = app; }
            if (h === void 0) { h = handler; }
            if (next === void 0) { next = net(a, h, id + 1, plugins); }
            return plugins[id](a, next, h);
        };
    }
    else {
        return function (a) {
            if (a === void 0) { a = app; }
            return a;
        };
    }
}
function innet(app, handler, plugins) {
    if (plugins === void 0) { plugins = handler[PLUGINS]; }
    return net(app, handler, 0, plugins)();
}

exports.PLUGINS = PLUGINS;
exports.createHandler = createHandler;
exports.default = innet;
exports.net = net;
