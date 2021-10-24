"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(prop, value, array, returnIndex) {
  var obj;

  for (var i = 0; i < array.length; i++) {
    if (array[i][prop] === value) {
      obj = array[i];
      break;
    }
  }

  return returnIndex ? array.indexOf(obj) : obj;
}