function activatePlugins(plugins, handlerPlugins, handler) {
    for (var i = 0; i < plugins.length; i++) {
        var plugin = plugins[i](handler);
        if (plugin) {
            handlerPlugins.push(plugin);
        }
    }
}

export { activatePlugins };
