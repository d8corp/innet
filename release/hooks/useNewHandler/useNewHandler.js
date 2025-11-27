'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('../../innet.js');
require('../../utils/index.js');
var extendHandler = require('../../utils/extendHandler/extendHandler.js');

function useNewHandler() {
    return extendHandler.extendHandler(innet.useHandler());
}

exports.useNewHandler = useNewHandler;
