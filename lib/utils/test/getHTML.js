'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getHTML(element) {
    if (element instanceof DocumentFragment) {
        var result_1 = '';
        element.childNodes.forEach(function (node) {
            result_1 += getHTML(node);
        });
        return result_1;
    }
    if (element instanceof Text) {
        return element.nodeValue;
    }
    if (element instanceof HTMLElement) {
        return element.outerHTML;
    }
    if (element instanceof Comment) {
        return "<!--" + element.textContent + "-->";
    }
    return element;
}

exports.default = getHTML;
exports.getHTML = getHTML;
