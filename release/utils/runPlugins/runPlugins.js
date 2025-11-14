'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

let currentHandler;
let currentApp;
function useHandler() {
    return currentHandler;
}
function useApp() {
    return currentApp;
}
function runPlugins(app, handler, plugins = handler[constants.PLUGINS]) {
    currentApp = app;
    currentHandler = handler;
    for (let i = 0; i < plugins.length; i++) {
        if (plugins[i]() !== constants.NEXT)
            return;
    }
}

exports.runPlugins = runPlugins;
exports.useApp = useApp;
exports.useHandler = useHandler;
