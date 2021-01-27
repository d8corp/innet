'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../index.js');
require('watch-state');
require('../../scope/scope.js');
require('../dom/dom.js');
require('../../Ref/Ref.js');
require('../../Context/Context.js');

function renderElement(element, plugins) {
    var result = document.createDocumentFragment();
    index['default'](element, result, plugins);
    return result;
}

exports.default = renderElement;
exports.renderElement = renderElement;
