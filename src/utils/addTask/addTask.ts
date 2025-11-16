import { dequeList } from '../../constants'
import { type Task } from '../../types'
import { Deque } from '../Deque'

export function addTask (task: Task, priority: number, force?: boolean) {
  if (!dequeList[priority]) {
    dequeList[priority] = new Deque()
  }

  if (force) {
    dequeList[priority].push(task)
    return
  }

  dequeList[priority].unshift(task)
}
