'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var runPlugins = require('../../utils/runPlugins.js');

function useNewHandler() {
    return Object.create(runPlugins.useHandler());
}

exports.useNewHandler = useNewHandler;
