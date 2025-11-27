import { queueNanotask } from 'queue-nano-task'

import { HOOK } from './constants'
import { type Handler } from './types'

let currentHandler: Handler
let currentApp: unknown

export function useHandler<H extends Handler> (): H {
  return currentHandler as H
}

export function useApp<A> (): A {
  return currentApp as A
}

export default function innet (app: unknown, handler: Handler = currentHandler, priority = 0, force?: boolean) {
  queueNanotask(() => {
    const prevApp = currentApp
    const prevHandler = currentHandler
    currentApp = app
    currentHandler = handler
    handler[HOOK]()
    currentApp = prevApp
    currentHandler = prevHandler
  }, priority, force)
}
