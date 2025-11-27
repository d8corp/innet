'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function runPlugins(plugins) {
    for (let i = plugins.length - 1; i > -1; i--) {
        if (plugins[i]() !== constants.NEXT)
            return;
    }
}

exports.runPlugins = runPlugins;
