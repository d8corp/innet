import './utils/index.es6.js';
import { runPlugins } from './utils/runPlugins/runPlugins.es6.js';

let appStack = [];
let handlerStack = [];
let appStackNext = [];
let handlerStackNext = [];
let running = false;
function pushApp(app, handler, priority) {
    if (priority === 3) {
        appStackNext.push(app);
        handlerStackNext.push(handler);
    }
    else if (priority === 2) {
        appStackNext.unshift(app);
        handlerStackNext.unshift(handler);
    }
    else if (priority === 1) {
        appStack.push(app);
        handlerStack.push(handler);
    }
    else {
        appStack.unshift(app);
        handlerStack.unshift(handler);
    }
}
function innet(app, handler, priority = 1) {
    pushApp(app, handler, priority);
    if (running)
        return;
    running = true;
    while (appStack.length || appStackNext.length) {
        if (!appStack.length) {
            appStack = appStackNext;
            handlerStack = handlerStackNext;
            appStackNext = [];
            handlerStackNext = [];
        }
        runPlugins(appStack.shift(), handlerStack.shift());
    }
    running = false;
}

export { innet as default };
