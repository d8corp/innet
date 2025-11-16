import { PLUGINS } from '../../constants'
import { type Handler, type Plugin } from '../../types'
import { activatePlugins } from '../activatePlugins'
import { extendHandler } from '../extendHandler'

export function createHandler <HI extends Handler, HO extends HI = HI> (plugins: Plugin[], extendedHandler?: HI): HO {
  const handler = extendHandler(extendedHandler || null)
  const createdPlugins = handler[PLUGINS] = extendedHandler ? handler[PLUGINS].slice() : []

  activatePlugins(plugins, createdPlugins, handler)

  return handler as HO
}
