import { type Handler, type InnetPriority } from './types'
import { runPlugins } from './utils'

let appStack: unknown[] = []
let handlerStack: Handler[] = []
let appStackNext: unknown[] = []
let handlerStackNext: Handler[] = []
let running = false

function pushApp (app: unknown, handler: Handler, priority: InnetPriority) {
  if (priority === 3) {
    appStackNext.push(app)
    handlerStackNext.push(handler)
  } else if (priority === 2) {
    appStackNext.unshift(app)
    handlerStackNext.unshift(handler)
  } else if (priority === 1) {
    appStack.push(app)
    handlerStack.push(handler)
  } else {
    appStack.unshift(app)
    handlerStack.unshift(handler)
  }
}

export default function innet (app: unknown, handler: Handler, priority: InnetPriority = 1) {
  pushApp(app, handler, priority)

  if (running) return
  running = true

  while (appStack.length || appStackNext.length) {
    if (!appStack.length) {
      appStack = appStackNext
      handlerStack = handlerStackNext
      appStackNext = []
      handlerStackNext = []
    }

    runPlugins(appStack.shift(), handlerStack.shift() as Handler)
  }

  running = false
}
