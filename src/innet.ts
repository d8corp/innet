export const PLUGINS: unique symbol = Symbol('Plugins')
export const NEXT: unique symbol = Symbol('Next')

export interface Handler {
  // eslint-disable-next-line no-use-before-define
  [PLUGINS]: HandlerPlugin[]
  [key: string]: any
  [key: symbol]: any
  [key: number]: any
}

export interface HandlerPlugin {
  (): typeof NEXT | void
}
export interface Plugin {
  (handler: Handler): HandlerPlugin | void
}

const appStack: unknown[] = []
const handlerStack: Handler[] = []

function pushApp (app: unknown, handler: Handler) {
  appStack.push(app)
  handlerStack.push(handler)
}

export default function innet (app: unknown, handler: Handler) {
  if (appStack.length) {
    pushApp(app, handler)
    return
  }

  pushApp(app, handler)

  while (appStack.length) {
    runPlugins(appStack.pop(), handlerStack.pop() as Handler)
  }
}

let currentHandler: Handler
let currentApp: unknown

export function useHandler () {
  return currentHandler
}

export function useApp () {
  return currentApp
}

export function runPlugins (app: unknown, handler: Handler, plugins = handler[PLUGINS]) {
  currentApp = app
  currentHandler = handler

  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i]() !== NEXT) return
  }
}

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
