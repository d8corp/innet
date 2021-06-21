import {Watch} from 'watch-state'

import scope from './scope'
import {ContentElements, append, clear} from './utils/dom'
import Ref from './Ref'

type HTMLKey = keyof HTMLElementTagNameMap

export type JSXType<P extends Props = Props, C extends Content = Content> = HTMLKey | string | Template<P, C> | TComponent<P, C>
export type Content <P extends Props = Props> = JSXElement<P> | ContentElements | string | number | Watcher | NodeContext | Children
export type Children = Content[]
export type Parent = Comment | Element | DocumentFragment

/** An object which going through the app */
type TContext = Record<symbol, any>

/** An object with key equals HTML tag name and value equals a plugin */
type TPlugins = Record<string, Plugin>


export type TPluginsObject = (TContext | TPlugins) & {__proto__?: TPluginsObject}

export interface JSXTemplateElement<P extends Props = Props, C extends Content = Content> {
  type?: Template<P, C>
  props?: P
  children?: Content[]
}
interface JSXComponentElement<P extends Props = Props, C extends Content = Content> {
  type?: TComponent<P, C>
  props?: P
  children?: Content[]
}
interface JSXStringElement {
  type?: string
  props?: Props
  children?: Content[]
}
interface JSXHTMLElement {
  type?: HTMLKey
  props?: HTMLProps
  children?: Content[]
}

export type JSXElement <P extends Props = Props> = JSXTemplateElement<P> | JSXComponentElement<P> | JSXStringElement | JSXHTMLElement

export interface NodeContext {
  children: Content
  context: TPluginsObject
}
export interface Watcher <C extends Content = Content> {
  (update: boolean): C
}
export interface Props {
  [key: string]: any
}
interface HTMLProps extends Props {
  ref?: Ref
}
export interface Plugin {
  (content: JSXElement, parent: Parent, plugins: TPluginsObject, plugin: DefaultPlugin): void
}

export interface Template <P extends Props = Props, C extends Content = Content> {
  (props?: P, children?: C): Content
}
interface TComponent <P extends Props = Props, C extends Content = Content> {
  new (p?: P, c?: C): Component<P, C>
}

export interface Component <P extends Props = Props, C extends Content = Content> {
  destructor? (props?: P, ...other: any[]): void
  mounted? (props?: P, ...other: any[]): void
  render (props?: P, children?: C, ...other: any[]): Content
}

export function create <T extends JSXType, P extends Props, C extends Children> (target: T, props: P, ...children: C): JSXElement<P> {
  const result: JSXElement<P> = {}
  if (target) {
    result.type = target
  }
  if (props) {
    result.props = props
  }
  if (children.length) {
    result.children = children.flat(Infinity)
  }
  return result
}
export function isComponent (value: Record<any, any>): value is Component {
  return typeof value?.prototype?.render === 'function'
}
export function isContextNode (value: Object): value is NodeContext {
  return 'context' in value
}

let currentMounted: Function[]
export function onMounted (callback: () => any) {
  currentMounted.push(callback)
}

export function dom (content, parent, plugins) {
  const {props, type, children} = content
  const element = document.createElement(type)
  if (props) {
    for (let key in props) {
      if (key === 'ref') {
        scope.references[props.ref.key] = element
      } else {
        const value = props[key]

        if (key.startsWith('on')) {
          element[key] = value
        } else {
          const bothSet = key[0] === '$'
          const fieldSet = bothSet || key[0] === '_'
          const attributeSet = bothSet || !fieldSet

          if (fieldSet) {
            key = key.slice(1)
          }

          if (typeof value === 'function') {
            new Watch(update => {
              const result = value(update)
              if (fieldSet) {
                element[key] = result
              }
              if (attributeSet) {
                if (result === undefined) {
                  element.removeAttribute(key)
                } else {
                  element.setAttribute(key, result)
                }
              }
            })
          }
          else {
            if (fieldSet) {
              element[key] = value
            }
            if (attributeSet && value !== undefined) {
              element.setAttribute(key, value)
            }
          }
        }
      }
    }
  }
  innet(element, parent)
  if (children) {
    for (let i = 0; i < children.length; i++) {
      innet(children[i], element, plugins, dom)
    }
  }
}

export interface DefaultPlugin <C extends Content = Content, P extends Parent = Parent> {
  (content: C, parent: P, plugins: TPluginsObject): void
}

export function innet<C extends Content, P extends Parent = Parent> (content: C, parent: P = document.body as unknown as P, plugins: TPluginsObject = scope.currentPlugins, defaultPlugin: DefaultPlugin<C, P> = dom): P {
  if (content instanceof Node) {
    append(parent, content as ContentElements)
  }
  else if (Array.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      innet(content[i], parent, plugins, defaultPlugin)
    }
  }
  else if (typeof content === 'object' && content !== null) {
    if (isContextNode(content)) {
      innet(content.children, parent, content.context, defaultPlugin)
    } else {
      const {type, props, children} = content as JSXElement
      if (!type) {
        innet<C, P>(children as C, parent, plugins, defaultPlugin)
      } else if (typeof type === 'string') {
        if (type in plugins) {
          plugins[type](content, parent, plugins, defaultPlugin)
        } else {
          defaultPlugin(content, parent, plugins)
        }
      } else if (typeof type === 'function') {
        const prevPlugins = scope.currentPlugins
        if (isComponent(type)) {
          scope.currentPlugins = plugins
          const component = new (type as any)(props, children)
          if ('destructor' in component) {
            Watch.activeWatcher?.onDestroy(() => component.destructor())
          }
          innet(component.render(props, children), parent, plugins, defaultPlugin)
          if ('mounted' in component) {
            component.mounted()
          }
        } else {
          scope.currentPlugins = plugins
          const prevMounted = currentMounted
          currentMounted = []
          innet((type as Template)(props, children), parent, plugins, defaultPlugin)
          currentMounted.forEach(mounted => mounted())
          currentMounted = prevMounted
        }
        scope.currentPlugins = prevPlugins
      }
    }
  }
  else if (typeof content === 'function') {
    const comment = document.createComment((content as Watcher).name)
    append(parent, comment)
    new Watch(update => {
      if (update) {
        clear(comment)
      }
      const prevPlugins = scope.currentPlugins
      scope.currentPlugins = plugins
      innet<C, P>((content as Watcher)(update) as C, comment as P, plugins, defaultPlugin)
      scope.currentPlugins = prevPlugins
    })
  }
  else if (typeof content === 'string' || typeof content === 'number') {
    append(parent, document.createTextNode(content+''))
  }
  return parent
}

innet.create = create
export default innet
export {
  Ref
}

export {Context} from './Context'
export * from './utils/dom'

declare global {
  namespace JSX {
    type Element = Content
    type ElementClass = Component
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
