import { PLUGINS, NEXT } from '../constants.es6.js';

var currentHandler;
var currentApp;
function useHandler() {
    return currentHandler;
}
function useApp() {
    return currentApp;
}
function runPlugins(app, handler, plugins) {
    if (plugins === void 0) { plugins = handler[PLUGINS]; }
    currentApp = app;
    currentHandler = handler;
    for (var i = 0; i < plugins.length; i++) {
        if (plugins[i]() !== NEXT)
            return;
    }
}

export { runPlugins, useApp, useHandler };
