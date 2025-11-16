'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');
require('../Deque/index.js');
var Deque = require('../Deque/Deque.js');

function addTask(task, priority, force) {
    if (!constants.dequeList[priority]) {
        constants.dequeList[priority] = new Deque.Deque();
    }
    if (force) {
        constants.dequeList[priority].push(task);
        return;
    }
    constants.dequeList[priority].unshift(task);
}

exports.addTask = addTask;
