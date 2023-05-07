import { PLUGINS } from './constants'
import { type Handler, type Plugin } from './types'

export function createHandler <HI extends Handler, HO extends HI = HI> (plugins: Plugin[], extendHandler?: HI): HO {
  const handler = Object.create(extendHandler || null)
  const createdPlugins = handler[PLUGINS] = extendHandler ? handler[PLUGINS].slice() : []

  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i](handler)

    if (plugin) {
      createdPlugins.push(plugin)
    }
  }

  return handler
}
