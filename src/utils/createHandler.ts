import { PLUGINS } from '../constants'
import { type Handler, type Plugin } from '../types'
import { activatePlugins } from './activatePlugins'

export function createHandler <HI extends Handler, HO extends HI = HI> (plugins: Plugin[], extendHandler?: HI): HO {
  const handler = Object.create(extendHandler || null)
  const createdPlugins = handler[PLUGINS] = extendHandler ? handler[PLUGINS].slice() : []

  activatePlugins(plugins, createdPlugins, handler)

  return handler
}
