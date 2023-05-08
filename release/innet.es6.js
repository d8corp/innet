import './utils/index.es6.js';
import { runPlugins } from './utils/runPlugins.es6.js';

var appStack = [];
var handlerStack = [];
function pushApp(app, handler) {
    appStack.push(app);
    handlerStack.push(handler);
}
function innet(app, handler) {
    if (appStack.length) {
        pushApp(app, handler);
        return;
    }
    pushApp(app, handler);
    while (appStack.length) {
        runPlugins(appStack.pop(), handlerStack.pop());
    }
}

export { innet as default };
