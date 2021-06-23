import { Content, NodeContext } from '..';
/** You can pass a value from a parent element through any children to the place you need. */
declare class Context<T = any, V = T extends undefined ? any : T> {
    defaultValue?: T;
    key: symbol;
    constructor(defaultValue?: T);
    provide(value: V, children: Content): NodeContext;
    get value(): V;
}
export default Context;
export { Context };
