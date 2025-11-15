import { stacks } from '../../constants'
import { type Action } from '../../types'

export function addStack (action: Action, priority: number, force?: boolean) {
  if (!stacks[priority]) {
    stacks[priority] = [action]
    return
  }

  if (force) {
    stacks[priority].push(action)
    return
  }

  stacks[priority].unshift(action)
}
