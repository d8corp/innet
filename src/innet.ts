import { dequeList } from './constants'
import type { Task } from './types'
import { addTask } from './utils'

let running = false

export default function innet (task: Task, priority = 0, force?: boolean) {
  addTask(task, priority, force)

  if (running) return

  running = true

  while (dequeList.length) {
    while (dequeList[0] && !dequeList[0].isEmpty) {
      (dequeList[0].pop() as Task)()
    }

    dequeList.shift()
  }

  running = false
}
