import { type NEXT, type PLUGINS } from './constants'

export interface Handler {
  // eslint-disable-next-line no-use-before-define
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
