type TargetElements = Element | Comment
type ContentElements = TargetElements | Text

function removeParentChild (target: ContentElements) {
  if (target._parent) {
    const children = target._parent._children
    children.splice(children.indexOf(target), 1)
    target._parent = undefined
  }
}
function removeElements (target: TargetElements) {
  target.remove()
  if (target instanceof Comment) {
    clear(target)
  }
}
function updateChildren (target: ContentElements) {
  if (target instanceof Comment) {
    if (target._children) {
      target.before.apply(target, target._children)
      target._children.forEach(updateChildren)
    } else {
      target._children = []
    }
  }
}
function insertChild (target: TargetElements, node: ContentElements, offset = 0) {
  if (target._parent) {
    const parent = node._parent = target._parent
    parent._children.splice(parent._children.indexOf(target) - offset, 0, node)
  }
}

function clear (target: Comment) {
  target._children.forEach(removeElements)
  target._children = []
}
function remove (target: TargetElements) {
  removeParentChild(target)
  removeElements(target)
}
function before (target: TargetElements, node: ContentElements) {
  removeParentChild(node)
  insertChild(target, node, 1)
  if (target instanceof Comment) {
    (target._children[0] || target).before(node)
  } else {
    target.before(node)
  }
  updateChildren(node)
}
function prepend (target: TargetElements | DocumentFragment, node: ContentElements) {
  removeParentChild(node)
  if (target instanceof Comment) {
    node._parent = target
    if (!target._children) {
      target._children = []
    }
    target._children.unshift(node);
    (target._children[1] || target).before(node)
  } else {
    target.prepend(node)
  }
  updateChildren(node)
}
function append (target: TargetElements | DocumentFragment, node: ContentElements) {
  removeParentChild(node)
  if (target instanceof Comment) {
    node._parent = target
    if (!target._children) {
      target._children = []
    }
    target._children.push(node)
    target.before(node)
  } else {
    target.appendChild(node)
  }
  updateChildren(node)
}
function after (target: TargetElements, node: ContentElements) {
  removeParentChild(node)
  insertChild(target, node)
  target.after(node)
  updateChildren(node)
}

export {
  remove,
  before,
  prepend,
  append,
  after,
  clear,

  ContentElements,
  TargetElements,
}

declare global {
  interface Comment {
    _children: ContentElements[]
    _parent?: Comment
  }
  interface Element {
    _parent?: Comment
  }
  interface Text {
    _parent?: Comment
  }
}
