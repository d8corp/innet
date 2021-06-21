'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../index.js');

function renderElement(element, plugins) {
    var result = document.createDocumentFragment();
    index.innet(element, result, plugins);
    return result;
}

exports.default = renderElement;
exports.renderElement = renderElement;
