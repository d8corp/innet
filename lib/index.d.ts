import { ContentElements } from './utils/dom';
import Ref from './Ref';
declare type HTMLKey = keyof HTMLElementTagNameMap;
export declare type JSXType<P extends Props = Props, C extends Content = Content> = HTMLKey | string | Template<P, C> | TComponent<P, C>;
export declare type Content<P extends Props = Props> = JSXElement<P> | ContentElements | string | number | Watcher | NodeContext | Children;
export declare type Children = Content[];
export declare type Parent = Comment | Element | DocumentFragment;
/** An object which going through the app */
declare type TContext = Record<symbol, any>;
/** An object with key equals HTML tag name and value equals a plugin */
declare type TPlugins = Record<string, Plugin>;
export declare type TPluginsObject = (TContext | TPlugins) & {
    __proto__?: TPluginsObject;
};
export interface JSXTemplateElement<P extends Props = Props, C extends Content = Content> {
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
export declare type JSXElement<P extends Props = Props> = JSXTemplateElement<P> | JSXComponentElement<P> | JSXStringElement | JSXHTMLElement;
export interface NodeContext {
    children: Content;
    context: TPluginsObject;
}
export interface Watcher<C extends Content = Content> {
    (update: boolean): C;
}
export interface Props {
    [key: string]: any;
}
interface HTMLProps extends Props {
    ref?: Ref;
}
export interface Plugin {
    (content: JSXElement, parent: Parent, plugins: TPluginsObject, plugin: DefaultPlugin): void;
}
export interface Template<P extends Props = Props, C extends Content = Content> {
    (props?: P, children?: C): Content;
}
interface TComponent<P extends Props = Props, C extends Content = Content> {
    new (p?: P, c?: C): Component<P, C>;
}
export interface Component<P extends Props = Props, C extends Content = Content> {
    destructor?(props?: P, ...other: any[]): void;
    mounted?(props?: P, ...other: any[]): void;
    render(props?: P, children?: C, ...other: any[]): Content;
}
export declare function create<T extends JSXType, P extends Props, C extends Children>(target: T, props: P, ...children: C): JSXElement<P>;
export declare function isComponent(value: Record<any, any>): value is Component;
export declare function isContextNode(value: Object): value is NodeContext;
export declare function onMounted(callback: () => any): void;
export declare function dom(content: any, parent: any, plugins: any): void;
export interface DefaultPlugin<C extends Content = Content, P extends Parent = Parent> {
    (content: C, parent: P, plugins: TPluginsObject): void;
}
export declare function innet<C extends Content, P extends Parent = Parent>(content: C, parent?: P, plugins?: TPluginsObject, defaultPlugin?: DefaultPlugin<C, P>): P;
export declare namespace innet {
    var create: typeof import(".").create;
}
export default innet;
export { Ref };
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
