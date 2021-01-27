import innet, {Content, TPluginsObject} from '../..'

export function renderElement (element: Content, plugins?: TPluginsObject): DocumentFragment {
  const result = document.createDocumentFragment()
  innet(element, result, plugins)
  return result
}

export default renderElement
