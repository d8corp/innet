import { queueNanotask } from 'queue-nano-task'

import { type Handler } from './types'
import { runPlugins, useHandler } from './utils'

export default function innet (app: unknown, handler: Handler = useHandler(), priority = 0, force?: boolean) {
  queueNanotask(() => {
    runPlugins(app, handler)
  }, priority, force)
}
