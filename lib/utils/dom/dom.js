'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function removeParentChild(target) {
    if (target._parent) {
        var children = target._parent._children;
        children.splice(children.indexOf(target), 1);
        target._parent = undefined;
    }
}
function removeElements(target) {
    target.remove();
    if (target instanceof Comment) {
        clear(target);
    }
}
function updateChildren(target) {
    if (target instanceof Comment) {
        if (target._children) {
            target.before.apply(target, target._children);
            target._children.forEach(updateChildren);
        }
        else {
            target._children = [];
        }
    }
}
function insertChild(target, node, offset) {
    if (offset === void 0) { offset = 0; }
    if (target._parent) {
        var parent_1 = node._parent = target._parent;
        parent_1._children.splice(parent_1._children.indexOf(target) - offset, 0, node);
    }
}
function clear(target) {
    target._children.forEach(removeElements);
    target._children = [];
}
function remove(target) {
    removeParentChild(target);
    removeElements(target);
}
function before(target, node) {
    removeParentChild(node);
    insertChild(target, node, 1);
    if (target instanceof Comment) {
        (target._children[0] || target).before(node);
    }
    else {
        target.before(node);
    }
    updateChildren(node);
}
function prepend(target, node) {
    removeParentChild(node);
    if (target instanceof Comment) {
        node._parent = target;
        if (!target._children) {
            target._children = [];
        }
        target._children.unshift(node);
        (target._children[1] || target).before(node);
    }
    else {
        target.prepend(node);
    }
    updateChildren(node);
}
function append(target, node) {
    removeParentChild(node);
    if (target instanceof Comment) {
        node._parent = target;
        if (!target._children) {
            target._children = [];
        }
        target._children.push(node);
        target.before(node);
    }
    else {
        target.appendChild(node);
    }
    updateChildren(node);
}
function after(target, node) {
    removeParentChild(node);
    insertChild(target, node);
    target.after(node);
    updateChildren(node);
}

exports.after = after;
exports.append = append;
exports.before = before;
exports.clear = clear;
exports.prepend = prepend;
exports.remove = remove;
