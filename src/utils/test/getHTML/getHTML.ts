export function getHTML (element) {
  if (element instanceof DocumentFragment) {
    let result = ''
    element.childNodes.forEach(node => {
      result += getHTML(node)
    })
    return result
  }
  if (element instanceof Text) {
    return element.nodeValue
  }
  if (element instanceof HTMLElement) {
    return element.outerHTML
  }
  if (element instanceof Comment) {
    return `<!--${element.textContent}-->`
  }
  return element
}

export default getHTML
