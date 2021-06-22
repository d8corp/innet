import {TPluginsObject} from '..'

const scope = {
  currentPlugins: {} as TPluginsObject,
  references: {} as Record<symbol, Node> // TODO: change to WeakMap
}

export default scope

export {
  scope
}
