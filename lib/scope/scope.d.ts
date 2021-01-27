import { TPluginsObject } from '..';
declare const scope: {
    currentPlugins: TPluginsObject;
    references: Record<symbol, Node>;
};
export default scope;
export { scope };
