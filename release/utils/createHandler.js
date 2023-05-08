'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../constants.js');
var activatePlugins = require('./activatePlugins.js');

function createHandler(plugins, extendHandler) {
    var handler = Object.create(extendHandler || null);
    var createdPlugins = handler[constants.PLUGINS] = extendHandler ? handler[constants.PLUGINS].slice() : [];
    activatePlugins.activatePlugins(plugins, createdPlugins, handler);
    return handler;
}

exports.createHandler = createHandler;
