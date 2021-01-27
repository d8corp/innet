import scope from '../scope'

class Ref <E extends Node = HTMLElement> {
  key = Symbol('ref')
  get value () {
    return scope.references[this.key]
  }
}

export default Ref

export {
  Ref,
}
