'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('./constants.js');

var currentHandler;
var currentApp;
function useHandler() {
    return currentHandler;
}
function useApp() {
    return currentApp;
}
function runPlugins(app, handler, plugins) {
    if (plugins === void 0) { plugins = handler[constants.PLUGINS]; }
    currentApp = app;
    currentHandler = handler;
    for (var i = 0; i < plugins.length; i++) {
        if (plugins[i]() !== constants.NEXT)
            return;
    }
}

exports.runPlugins = runPlugins;
exports.useApp = useApp;
exports.useHandler = useHandler;
