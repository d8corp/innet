'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('./constants.js');

function createHandler(plugins, extendHandler) {
    var handler = Object.create(extendHandler || null);
    var createdPlugins = handler[constants.PLUGINS] = extendHandler ? handler[constants.PLUGINS].slice() : [];
    for (var i = 0; i < plugins.length; i++) {
        var plugin = plugins[i](handler);
        if (plugin) {
            createdPlugins.push(plugin);
        }
    }
    return handler;
}

exports.createHandler = createHandler;
