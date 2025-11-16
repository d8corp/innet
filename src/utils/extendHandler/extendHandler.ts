import { type Handler } from '../../types'

export function extendHandler (handler: Handler | null): Handler {
  return Object.create(handler)
}
