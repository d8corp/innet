'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugins = require('./plugins.js');

var appStack = [];
var handlerStack = [];
function pushApp(app, handler) {
    appStack.push(app);
    handlerStack.push(handler);
}
function innet(app, handler) {
    if (appStack.length) {
        pushApp(app, handler);
        return;
    }
    pushApp(app, handler);
    while (appStack.length) {
        plugins.runPlugins(appStack.pop(), handlerStack.pop());
    }
}

exports["default"] = innet;
