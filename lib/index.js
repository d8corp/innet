'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
var scope_scope = require('./scope/scope.js');
var utils_dom_dom = require('./utils/dom/dom.js');
var Ref_Ref = require('./Ref/Ref.js');
var Context_Context = require('./Context/Context.js');

function create(target, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var result = {};
    if (target) {
        result.type = target;
    }
    if (props) {
        result.props = props;
    }
    if (children.length) {
        result.children = children.flat(Infinity);
    }
    return result;
}
function isComponent(value) {
    return 'render' in (value === null || value === void 0 ? void 0 : value.prototype);
}
function isContextNode(value) {
    return 'context' in value;
}
var currentMounted;
function onMounted(callback) {
    currentMounted.push(callback);
}
var onDestructor = watchState.onClear;
function dom(content, parent, plugins) {
    var props = content.props, type = content.type, children = content.children;
    var element = document.createElement(type);
    if (props) {
        var _loop_1 = function (key) {
            if (key === 'ref') {
                scope_scope['default'].references[props.ref.key] = element;
            }
            else {
                var value_1 = props[key];
                if (key.startsWith('on')) {
                    element[key] = value_1;
                }
                else {
                    var bothSet = key[0] === '$';
                    var fieldSet_1 = bothSet || key[0] === '_';
                    var attributeSet_1 = bothSet || !fieldSet_1;
                    if (fieldSet_1) {
                        key = key.slice(1);
                    }
                    if (typeof value_1 === 'function') {
                        new watchState.Watch(function (update) {
                            var result = value_1(update);
                            if (fieldSet_1) {
                                element[key] = result;
                            }
                            if (attributeSet_1) {
                                if (result === undefined) {
                                    element.removeAttribute(key);
                                }
                                else {
                                    element.setAttribute(key, result);
                                }
                            }
                        });
                    }
                    else {
                        if (fieldSet_1) {
                            element[key] = value_1;
                        }
                        if (attributeSet_1 && value_1 !== undefined) {
                            element.setAttribute(key, value_1);
                        }
                    }
                }
            }
        };
        for (var key in props) {
            _loop_1(key);
        }
    }
    innet(element, parent);
    if (children) {
        for (var i = 0; i < children.length; i++) {
            innet(children[i], element, plugins, dom);
        }
    }
}
function innet(content, parent, plugins, defaultPlugin) {
    if (parent === void 0) { parent = document.body; }
    if (plugins === void 0) { plugins = scope_scope['default'].currentPlugins; }
    if (defaultPlugin === void 0) { defaultPlugin = dom; }
    if (content instanceof Node) {
        utils_dom_dom.append(parent, content);
    }
    else if (Array.isArray(content)) {
        for (var i = 0; i < content.length; i++) {
            innet(content[i], parent, plugins, defaultPlugin);
        }
    }
    else if (typeof content === 'object' && content !== null) {
        if (isContextNode(content)) {
            innet(content.children, parent, content.context, defaultPlugin);
        }
        else {
            var _a = content, type = _a.type, props = _a.props, children = _a.children;
            if (!type) {
                innet(children, parent, plugins, defaultPlugin);
            }
            else if (typeof type === 'string') {
                if (type in plugins) {
                    plugins[type](content, parent, plugins, defaultPlugin);
                }
                else {
                    defaultPlugin(content, parent, plugins);
                }
            }
            else if (typeof type === 'function') {
                var prevPlugins = scope_scope['default'].currentPlugins;
                if (isComponent(type)) {
                    scope_scope['default'].currentPlugins = plugins;
                    var component_1 = new type(props, children);
                    if ('destructor' in component_1) {
                        onDestructor(function () { return component_1.destructor(); });
                    }
                    innet(component_1.render(props, children), parent, plugins, defaultPlugin);
                    if ('mounted' in component_1) {
                        component_1.mounted();
                    }
                }
                else {
                    scope_scope['default'].currentPlugins = plugins;
                    var prevMounted = currentMounted;
                    currentMounted = [];
                    innet(type(props, children), parent, plugins, defaultPlugin);
                    currentMounted.forEach(function (mounted) { return mounted(); });
                    currentMounted = prevMounted;
                }
                scope_scope['default'].currentPlugins = prevPlugins;
            }
        }
    }
    else if (typeof content === 'function') {
        var comment_1 = document.createComment(content.name);
        utils_dom_dom.append(parent, comment_1);
        new watchState.Watch(function (update) {
            if (update) {
                utils_dom_dom.clear(comment_1);
            }
            var prevPlugins = scope_scope['default'].currentPlugins;
            scope_scope['default'].currentPlugins = plugins;
            innet(content(update), comment_1, plugins, defaultPlugin);
            scope_scope['default'].currentPlugins = prevPlugins;
        });
    }
    else if (typeof content === 'string' || typeof content === 'number') {
        utils_dom_dom.append(parent, document.createTextNode(content + ''));
    }
    return parent;
}
innet.create = create;

exports.after = utils_dom_dom.after;
exports.append = utils_dom_dom.append;
exports.before = utils_dom_dom.before;
exports.clear = utils_dom_dom.clear;
exports.prepend = utils_dom_dom.prepend;
exports.remove = utils_dom_dom.remove;
exports.Ref = Ref_Ref['default'];
exports.Context = Context_Context['default'];
exports.create = create;
exports.default = innet;
exports.dom = dom;
exports.innet = innet;
exports.isComponent = isComponent;
exports.isContextNode = isContextNode;
exports.onDestructor = onDestructor;
exports.onMounted = onMounted;
