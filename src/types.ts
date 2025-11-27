import { type HOOK, type NEXT, type PLUGINS } from './constants'

export interface Handler {
  [PLUGINS]: HandlerPlugin[]
  [HOOK]: Hook
  [key: string]: any
  [key: symbol]: any
  [key: number]: any
}

export type HandlerPlugin = () => typeof NEXT | void
export type Plugin = (handler: Handler) => HandlerPlugin | void
export type Hook = () => void
