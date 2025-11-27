'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');
var innet = require('../../innet.js');
require('../activatePlugins/index.js');
require('../extendHandler/index.js');
require('../runPlugins/index.js');
var extendHandler = require('../extendHandler/extendHandler.js');
var runPlugins = require('../runPlugins/runPlugins.js');
var activatePlugins = require('../activatePlugins/activatePlugins.js');

function createHandler(plugins, extendedHandler) {
    const handler = extendHandler.extendHandler(extendedHandler || null);
    const createdPlugins = handler[constants.PLUGINS] = extendedHandler ? handler[constants.PLUGINS].slice() : [];
    if (!extendedHandler) {
        handler[constants.HOOK] = () => { runPlugins.runPlugins(innet.useHandler()[constants.PLUGINS]); };
    }
    activatePlugins.activatePlugins(plugins, createdPlugins, handler);
    return handler;
}

exports.createHandler = createHandler;
