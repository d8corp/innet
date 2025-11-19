import { type Handler, type HandlerPlugin, type Plugin } from '../../types'

export function activatePlugins (plugins: Plugin[], handlerPlugins: HandlerPlugin[], handler: Handler) {
  for (let i = plugins.length - 1; i > -1; i--) {
    const plugin = plugins[i](handler)

    if (plugin) {
      handlerPlugins.push(plugin)
    }
  }
}
