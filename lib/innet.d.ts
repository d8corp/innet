export declare const PLUGINS: unique symbol;
export interface Handler {
    [PLUGINS]: PluginHandler[];
    [key: string]: any;
}
export declare type Next = (app?: any, handler?: Handler, next?: Next) => any;
export declare type PluginHandler = (app: any, next: Next, handler: Handler) => any;
export declare type Plugin = (handler: Handler) => PluginHandler;
export declare function createHandler<HI extends Handler, HO extends HI = HI>(plugins: Plugin[], extendHandler?: HI): HO;
export declare function net(app: any, handler: Handler, id: number, plugins: PluginHandler[]): Next;
export default function innet(app: any, handler: Handler, plugins?: PluginHandler[]): any;
