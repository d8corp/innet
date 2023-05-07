import { PLUGINS } from './constants.es6.js';

function createHandler(plugins, extendHandler) {
    var handler = Object.create(extendHandler || null);
    var createdPlugins = handler[PLUGINS] = extendHandler ? handler[PLUGINS].slice() : [];
    for (var i = 0; i < plugins.length; i++) {
        var plugin = plugins[i](handler);
        if (plugin) {
            createdPlugins.push(plugin);
        }
    }
    return handler;
}

export { createHandler };
