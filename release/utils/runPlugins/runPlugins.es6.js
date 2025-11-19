import { NEXT, PLUGINS } from '../../constants.es6.js';

let currentHandler;
let currentApp;
function useHandler() {
    return currentHandler;
}
function useApp() {
    return currentApp;
}
function runPlugins(app, handler, plugins = handler[PLUGINS]) {
    currentApp = app;
    currentHandler = handler;
    for (let i = plugins.length - 1; i > -1; i--) {
        if (plugins[i]() !== NEXT)
            return;
    }
}

export { runPlugins, useApp, useHandler };
