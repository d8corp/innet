import { NEXT, PLUGINS } from '../../constants'
import { type Action, type Handler } from '../../types'

let currentAction: Action

export function useHandler<H extends Handler> (): H {
  return currentAction[1] as H
}

export function useApp<A> (): A {
  return currentAction[0] as A
}

export function runPlugins (action: Action, plugins = action[1][PLUGINS]) {
  currentAction = action

  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i]() !== NEXT) return
  }
}
