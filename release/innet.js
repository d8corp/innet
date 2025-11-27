'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var queueNanoTask = require('queue-nano-task');
var constants = require('./constants.js');

let currentHandler;
let currentApp;
function useHandler() {
    return currentHandler;
}
function useApp() {
    return currentApp;
}
function innet(app, handler = currentHandler, priority = 0, force) {
    const hook = handler[constants.HOOK]();
    queueNanoTask.queueNanotask(() => {
        const prevApp = currentApp;
        const prevHandler = currentHandler;
        currentApp = app;
        currentHandler = handler;
        hook();
        currentApp = prevApp;
        currentHandler = prevHandler;
    }, priority, force);
}

exports["default"] = innet;
exports.useApp = useApp;
exports.useHandler = useHandler;
