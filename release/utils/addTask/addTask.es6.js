import { dequeList } from '../../constants.es6.js';
import '../Deque/index.es6.js';
import { Deque } from '../Deque/Deque.es6.js';

function addTask(task, priority, force) {
    if (!dequeList[priority]) {
        dequeList[priority] = new Deque();
    }
    if (force) {
        dequeList[priority].push(task);
        return;
    }
    dequeList[priority].unshift(task);
}

export { addTask };
