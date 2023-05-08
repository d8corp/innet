import { PLUGINS } from '../constants.es6.js';
import { activatePlugins } from './activatePlugins.es6.js';

function createHandler(plugins, extendHandler) {
    var handler = Object.create(extendHandler || null);
    var createdPlugins = handler[PLUGINS] = extendHandler ? handler[PLUGINS].slice() : [];
    activatePlugins(plugins, createdPlugins, handler);
    return handler;
}

export { createHandler };
