import { dequeList } from './constants.es6.js';
import './utils/index.es6.js';
import { addTask } from './utils/addTask/addTask.es6.js';

let running = false;
function innet(task, priority = 0, force) {
    addTask(task, priority, force);
    if (running)
        return;
    running = true;
    while (dequeList.length) {
        while (dequeList[0] && !dequeList[0].isEmpty) {
            dequeList[0].pop()();
        }
        dequeList.shift();
    }
    running = false;
}

export { innet as default };
