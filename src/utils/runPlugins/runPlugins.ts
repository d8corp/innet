import { NEXT } from '../../constants'
import { type HandlerPlugin } from '../../types'

export function runPlugins (plugins: HandlerPlugin[]) {
  for (let i = plugins.length - 1; i > -1; i--) {
    if (plugins[i]() !== NEXT) return
  }
}
