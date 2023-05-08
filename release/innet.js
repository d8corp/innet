'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./utils/index.js');
var runPlugins = require('./utils/runPlugins.js');

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
        runPlugins.runPlugins(appStack.pop(), handlerStack.pop());
    }
}

exports["default"] = innet;
