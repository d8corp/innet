import { HOOK, PLUGINS } from '../../constants'
import { useHandler } from '../../innet'
import { type Handler, type Plugin } from '../../types'
import { activatePlugins } from '../activatePlugins'
import { extendHandler } from '../extendHandler'
import { runPlugins } from '../runPlugins'

export function createHandler <HI extends Handler, HO extends HI = HI> (plugins: Plugin[], extendedHandler?: HI): HO {
  const handler = extendHandler(extendedHandler || null)
  const createdPlugins = handler[PLUGINS] = extendedHandler ? handler[PLUGINS].slice() : []

  if (!extendedHandler) {
    handler[HOOK] = () => { runPlugins(useHandler()[PLUGINS]) }
  }

  activatePlugins(plugins, createdPlugins, handler)

  return handler as HO
}
