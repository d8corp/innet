function activatePlugins(plugins, handlerPlugins, handler) {
    for (let i = plugins.length - 1; i > -1; i--) {
        const plugin = plugins[i](handler);
        if (plugin) {
            handlerPlugins.push(plugin);
        }
    }
}

export { activatePlugins };
