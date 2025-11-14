'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function activatePlugins(plugins, handlerPlugins, handler) {
    for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i](handler);
        if (plugin) {
            handlerPlugins.push(plugin);
        }
    }
}

exports.activatePlugins = activatePlugins;
