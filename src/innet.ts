import { type Handler } from './types'
import { runPlugins } from './utils'

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
