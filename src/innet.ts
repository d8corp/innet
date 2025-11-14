import { type Handler, type InnetPriority } from './types'
import { runPlugins } from './utils'

let appStack: unknown[] = []
let handlerStack: Handler[] = []
let appStackNext: unknown[] = []
let handlerStackNext: Handler[] = []
let running = false

const priorityMap: Array<(app: unknown, handler: Handler) => void> = [
  (app, handler) => {
    appStack.push(app)
    handlerStack.push(handler)
  },
  (app, handler) => {
    appStack.unshift(app)
    handlerStack.unshift(handler)
  },
  (app, handler) => {
    appStackNext.push(app)
    handlerStackNext.push(handler)
  },
  (app, handler) => {
    appStackNext.unshift(app)
    handlerStackNext.unshift(handler)
  },
]

export default function innet (app: unknown, handler: Handler, priority: InnetPriority = 0) {
  priorityMap[priority](app, handler)

  if (running) return
  running = true

  while (appStack.length || appStackNext.length) {
    if (!appStack.length) {
      appStack = appStackNext
      handlerStack = handlerStackNext
      appStackNext = []
      handlerStackNext = []
    }

    runPlugins(appStack.pop(), handlerStack.pop() as Handler)
  }

  running = false
}
