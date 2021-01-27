import { onClear, Watch } from 'watch-state';
import scope from './scope/scope.es6.js';
import { append, clear } from './utils/dom/dom.es6.js';
export { after, append, before, clear, prepend, remove } from './utils/dom/dom.es6.js';
export { default as Ref } from './Ref/Ref.es6.js';
export { default as Context } from './Context/Context.es6.js';

function create(target, props, ...children) {
    const result = {};
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
let currentMounted;
function onMounted(callback) {
    currentMounted.push(callback);
}
const onDestructor = onClear;
function dom(content, parent, plugins) {
    const { props, type, children } = content;
    const element = document.createElement(type);
    if (props) {
        for (let key in props) {
            if (key === 'ref') {
                scope.references[props.ref.key] = element;
            }
            else {
                const value = props[key];
                if (key.startsWith('on')) {
                    element[key] = value;
                }
                else {
                    const bothSet = key[0] === '$';
                    const fieldSet = bothSet || key[0] === '_';
                    const attributeSet = bothSet || !fieldSet;
                    if (fieldSet) {
                        key = key.slice(1);
                    }
                    if (typeof value === 'function') {
                        new Watch(update => {
                            const result = value(update);
                            if (fieldSet) {
                                element[key] = result;
                            }
                            if (attributeSet) {
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
                        if (fieldSet) {
                            element[key] = value;
                        }
                        if (attributeSet && value !== undefined) {
                            element.setAttribute(key, value);
                        }
                    }
                }
            }
        }
    }
    innet(element, parent);
    if (children) {
        for (let i = 0; i < children.length; i++) {
            innet(children[i], element, plugins, dom);
        }
    }
}
function innet(content, parent = document.body, plugins = scope.currentPlugins, defaultPlugin = dom) {
    if (content instanceof Node) {
        append(parent, content);
    }
    else if (Array.isArray(content)) {
        for (let i = 0; i < content.length; i++) {
            innet(content[i], parent, plugins, defaultPlugin);
        }
    }
    else if (typeof content === 'object' && content !== null) {
        if (isContextNode(content)) {
            innet(content.children, parent, content.context, defaultPlugin);
        }
        else {
            const { type, props, children } = content;
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
                const prevPlugins = scope.currentPlugins;
                if (isComponent(type)) {
                    scope.currentPlugins = plugins;
                    const component = new type(props, children);
                    if ('destructor' in component) {
                        onDestructor(() => component.destructor());
                    }
                    innet(component.render(props, children), parent, plugins, defaultPlugin);
                    if ('mounted' in component) {
                        component.mounted();
                    }
                }
                else {
                    scope.currentPlugins = plugins;
                    const prevMounted = currentMounted;
                    currentMounted = [];
                    innet(type(props, children), parent, plugins, defaultPlugin);
                    currentMounted.forEach(mounted => mounted());
                    currentMounted = prevMounted;
                }
                scope.currentPlugins = prevPlugins;
            }
        }
    }
    else if (typeof content === 'function') {
        const comment = document.createComment(content.name);
        append(parent, comment);
        new Watch(update => {
            if (update) {
                clear(comment);
            }
            const prevPlugins = scope.currentPlugins;
            scope.currentPlugins = plugins;
            innet(content(update), comment, plugins, defaultPlugin);
            scope.currentPlugins = prevPlugins;
        });
    }
    else if (typeof content === 'string' || typeof content === 'number') {
        append(parent, document.createTextNode(content + ''));
    }
    return parent;
}
innet.create = create;

export default innet;
export { create, dom, innet, isComponent, isContextNode, onDestructor, onMounted };
