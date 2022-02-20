export interface Handler {
  [PLUGINS]: PluginHandler[]
  [key: string]: any
}

export type Plugin = (handler: Handler) => PluginHandler
export type PluginHandler = (app, next: Next, handler: Handler) => any
export type Next = (app?, handler?: Handler, next?: Next) => any

export const PLUGINS = Symbol('Plugins')

export function createHandler <HI extends Handler, HO extends HI = HI> (plugins: Plugin[], extendHandler: HI = null): HO {
  const handler = Object.create(extendHandler)
  const createdPlugins = handler[PLUGINS] = extendHandler ? handler[PLUGINS].slice() : []

  for (let i = 0; i < plugins.length; i++) {
    createdPlugins.push(plugins[i](handler))
  }

  return handler
}

export function net (app, handler: Handler, id: number, plugins: PluginHandler[]): Next {
  if (plugins.length > id) {
    return (a = app, h = handler, next = net(a, h, id + 1, plugins)) => plugins[id](a, next, h)
  } else {
    return (a = app) => a
  }
}

export default function innet (app, handler: Handler, plugins = handler[PLUGINS]) {
  return net(app, handler, 0, plugins)()
}
