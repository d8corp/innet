import scope from '../scope/scope.es6.js';

class Ref {
    constructor() {
        this.key = Symbol('ref');
    }
    get value() {
        return scope.references[this.key];
    }
}

export default Ref;
export { Ref };
