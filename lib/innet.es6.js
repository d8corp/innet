const PLUGINS = Symbol('Plugins');
function createHandler(plugins, extendHandler = null) {
    const handler = Object.create(extendHandler);
    const createdPlugins = handler[PLUGINS] = extendHandler ? handler[PLUGINS].slice() : [];
    for (let i = 0; i < plugins.length; i++) {
        createdPlugins.push(plugins[i](handler));
    }
    return handler;
}
function net(app, handler, id, plugins) {
    if (plugins.length > id) {
        return (a = app, h = handler, next = net(a, h, id + 1, plugins)) => plugins[id](a, next, h);
    }
    else {
        return (a = app) => a;
    }
}
function innet(app, handler, plugins = handler[PLUGINS]) {
    return net(app, handler, 0, plugins)();
}

export default innet;
export { PLUGINS, createHandler, net };
