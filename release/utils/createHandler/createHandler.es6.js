import { PLUGINS } from '../../constants.es6.js';
import '../activatePlugins/index.es6.js';
import '../extendHandler/index.es6.js';
import { extendHandler } from '../extendHandler/extendHandler.es6.js';
import { activatePlugins } from '../activatePlugins/activatePlugins.es6.js';

function createHandler(plugins, extendedHandler) {
    const handler = extendHandler(extendedHandler || null);
    const createdPlugins = handler[PLUGINS] = extendedHandler ? handler[PLUGINS].slice() : [];
    activatePlugins(plugins, createdPlugins, handler);
    return handler;
}

export { createHandler };
