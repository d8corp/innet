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
function net(hook, app, handler = currentHandler) {
    const prevApp = currentApp;
    const prevHandler = currentHandler;
    currentApp = app;
    currentHandler = handler;
    const result = hook();
    currentApp = prevApp;
    currentHandler = prevHandler;
    return result;
}
function innet(app, handler = currentHandler, priority = 0, force) {
    const hook = handler[constants.HOOK]();
    queueNanoTask.queueNanotask(net.bind(handler, hook, app, handler), priority, force);
}

exports.innet = innet;
exports.net = net;
exports.useApp = useApp;
exports.useHandler = useHandler;
