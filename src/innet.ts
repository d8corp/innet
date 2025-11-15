import { stacks } from './constants'
import type { Action, Handler } from './types'
import { addStack, runPlugins } from './utils'

let running = false

export default function innet (app: unknown, handler: Handler, priority = 0, force?: boolean) {
  addStack([app, handler], priority, force)

  if (running) return

  running = true

  while (stacks.length) {
    while (stacks[0]?.length) {
      runPlugins(stacks[0].pop() as Action)
    }

    stacks.shift()
  }

  running = false
}
