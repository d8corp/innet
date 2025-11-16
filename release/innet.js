'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('./constants.js');
require('./utils/index.js');
var addTask = require('./utils/addTask/addTask.js');

let running = false;
function innet(task, priority = 0, force) {
    addTask.addTask(task, priority, force);
    if (running)
        return;
    running = true;
    while (constants.dequeList.length) {
        while (constants.dequeList[0] && !constants.dequeList[0].isEmpty) {
            constants.dequeList[0].pop()();
        }
        constants.dequeList.shift();
    }
    running = false;
}

exports["default"] = innet;
