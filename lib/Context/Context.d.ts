import { Content, NodeContext } from '..';
/** You can pass a value from a parent element through any children to the place you need. */
declare class Context<T = any> {
    defaultValue: T;
    key: symbol;
    constructor(defaultValue: T);
    provide(value: T, children: Content): NodeContext;
    get value(): any;
}
export default Context;
export { Context };
