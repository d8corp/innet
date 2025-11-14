'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var extendHandler = require('../../utils/extendHandler/extendHandler.js');
var runPlugins = require('../../utils/runPlugins/runPlugins.js');

function useNewHandler() {
    return extendHandler.extendHandler(runPlugins.useHandler());
}

exports.useNewHandler = useNewHandler;
