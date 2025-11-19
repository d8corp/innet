'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var queueNanoTask = require('queue-nano-task');
require('./utils/index.js');
var runPlugins = require('./utils/runPlugins/runPlugins.js');

function innet(app, handler = runPlugins.useHandler(), priority = 0, force) {
    queueNanoTask.queueNanotask(() => {
        runPlugins.runPlugins(app, handler);
    }, priority, force);
}

exports["default"] = innet;
