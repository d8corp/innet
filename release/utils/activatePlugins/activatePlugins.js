'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function activatePlugins(plugins, handlerPlugins, handler) {
    for (let i = plugins.length - 1; i > -1; i--) {
        const plugin = plugins[i](handler);
        if (plugin) {
            handlerPlugins.push(plugin);
        }
    }
}

exports.activatePlugins = activatePlugins;
