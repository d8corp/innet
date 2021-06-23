import {Content, NodeContext} from '..'
import scope from '../scope'

/** You can pass a value from a parent element through any children to the place you need. */
class Context <T = any, V = T extends undefined ? any : T> {
  key = Symbol('context')

  constructor (public defaultValue?: T) {}

  provide (value: V, children: Content): NodeContext {
    return {
      children,
      context: {__proto__: scope.currentPlugins, [this.key]: value},
    }
  }

  get value (): V {
    const {currentPlugins} = scope
    const {key} = this
    return key in currentPlugins ? currentPlugins[key] : this.defaultValue
  }
}

export default Context

export {
  Context
}
