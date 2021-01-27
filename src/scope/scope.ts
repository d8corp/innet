import {TPluginsObject} from '..'

const scope = {
  currentPlugins: {} as TPluginsObject,
  references: {} as Record<symbol, Node>
}

export default scope

export {
  scope
}
