import { ContentElements } from './utils/dom';
import Ref from './Ref';
declare type HTMLKey = keyof HTMLElementTagNameMap;
declare type JSXType<P extends Props = Props, C extends Content = Content> = HTMLKey | string | Template<P, C> | TComponent<P, C>;
declare type Content<P extends Props = Props> = JSXElement<P> | ContentElements | string | number | Watcher | NodeContext | Children;
declare type Children = Content[];
declare type Parent = Comment | Element | DocumentFragment;
/** An object which going through the app */
declare type TContext = Record<symbol, any>;
/** An object with key equals HTML tag name and value equals a plugin */
declare type TPlugins = Record<string, Plugin>;
declare type TPluginsObject = (TContext | TPlugins) & {
    __proto__?: TPluginsObject;
};
interface JSXTemplateElement<P extends Props = Props, C extends Content = Content> {
    type?: Template<P, C>;
    props?: P;
    children?: Content[];
}
interface JSXComponentElement<P extends Props = Props, C extends Content = Content> {
    type?: TComponent<P, C>;
    props?: P;
    children?: Content[];
}
interface JSXStringElement {
    type?: string;
    props?: Props;
    children?: Content[];
}
interface JSXHTMLElement {
    type?: HTMLKey;
    props?: HTMLProps;
    children?: Content[];
}
declare type JSXElement<P extends Props = Props> = JSXTemplateElement<P> | JSXComponentElement<P> | JSXStringElement | JSXHTMLElement;
interface NodeContext {
    children: Content;
    context: TPluginsObject;
}
interface Watcher<C extends Content = Content> {
    (update: boolean): C;
}
interface Props {
    [key: string]: any;
}
interface HTMLProps extends Props {
    ref?: Ref;
}
interface Plugin {
    (content: JSXElement, parent: Parent, plugins: TPluginsObject, plugin: DefaultPlugin): void;
}
interface Model<P extends Props = Props, C extends Children = Children> {
    [key: string]: any;
    render?: never;
}
interface Template<P extends Props = Props, C extends Content = Content> {
    (props?: P, children?: C): Content;
}
interface TComponent<P extends Props = Props, C extends Content = Content> {
    new (p?: P, c?: C): Component<P, C>;
}
interface Component<P extends Props = Props, C extends Content = Content> {
    destructor?(props?: P): void;
    mounted?(props?: P): void;
    render(props?: P, children?: C): Content;
}
declare function create<T extends JSXType, P extends Props, C extends Children>(target: T, props: P, ...children: C): JSXElement<P>;
declare function isComponent(value: Record<any, any>): value is Component;
declare function isContextNode(value: Object): value is NodeContext;
declare function onMounted(callback: () => any): void;
declare function dom(content: any, parent: any, plugins: any): void;
interface DefaultPlugin<C extends Content = Content, P extends Parent = Parent> {
    (content: C, parent: P, plugins: TPluginsObject): void;
}
declare function innet<C extends Content, P extends Parent = Parent>(content: C, parent?: P, plugins?: TPluginsObject, defaultPlugin?: DefaultPlugin<C, P>): P;
declare namespace innet {
    var create: typeof import(".").create;
}
export default innet;
export { create, isComponent, isContextNode, innet, dom, Ref, JSXType, Content, Children, Parent, TPluginsObject, Component, Template, JSXElement, NodeContext, DefaultPlugin, Watcher, Model, Props, Plugin, onMounted, JSXTemplateElement, };
export { Context } from './Context';
export * from './utils/dom';
declare global {
    namespace JSX {
        type Element = Content;
        type ElementClass = Component;
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}
