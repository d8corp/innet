import scope from '../scope/scope.es6.js';

/** You can pass a value from a parent element through any children to the place you need. */
class Context {
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
        this.key = Symbol('context');
    }
    provide(value, children) {
        return {
            children,
            context: { __proto__: scope.currentPlugins, [this.key]: value },
        };
    }
    get value() {
        const { currentPlugins } = scope;
        const { key } = this;
        return key in currentPlugins ? currentPlugins[key] : this.defaultValue;
    }
}

export default Context;
export { Context };
