import { type NEXT, type PLUGINS } from './constants'

export interface Handler {
  [PLUGINS]: HandlerPlugin[]
  [key: string]: any
  [key: symbol]: any
  [key: number]: any
}
export interface HandlerPlugin {
  (): typeof NEXT | void
}

export interface Plugin {
  (handler: Handler): HandlerPlugin | void
}

export type Action = [unknown, Handler]
export type Stack = Action[]
