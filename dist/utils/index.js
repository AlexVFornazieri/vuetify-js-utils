"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "arraySearch", {
  enumerable: true,
  get: function get() {
    return _arraySearch["default"];
  }
});
Object.defineProperty(exports, "checkCnpj", {
  enumerable: true,
  get: function get() {
    return _checkCnpj["default"];
  }
});
Object.defineProperty(exports, "checkCpf", {
  enumerable: true,
  get: function get() {
    return _checkCpf["default"];
  }
});
Object.defineProperty(exports, "copyToClipboard", {
  enumerable: true,
  get: function get() {
    return _copyToClipboard["default"];
  }
});
exports.dateString = dateString;
exports.getCurrentURI = getCurrentURI;
exports.getPeriodLast = getPeriodLast;
exports.getUrlParam = getUrlParam;
exports.getYoutubeId = getYoutubeId;
exports.planeObject = planeObject;
Object.defineProperty(exports, "slugify", {
  enumerable: true,
  get: function get() {
    return _slugify["default"];
  }
});

var _copyToClipboard = _interopRequireDefault(require("./copyToClipboard"));

var _checkCnpj = _interopRequireDefault(require("./checkCnpj"));

var _checkCpf = _interopRequireDefault(require("./checkCpf"));

var _slugify = _interopRequireDefault(require("./slugify"));

var _arraySearch = _interopRequireDefault(require("./arraySearch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function planeObject(data) {
  return JSON.parse(JSON.stringify(data));
}

function dateString(date) {
  return date.toISOString().split('T')[0];
}

function getPeriodLast() {
  var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  var now = new Date();
  var end = dateString(now);
  var before = new Date(now.setDate(now.getDate() - days));
  var start = dateString(before);
  return {
    start: start,
    end: end
  };
}
/**
* Get YouTube ID from various YouTube URL
* @author: takien
* @url: http://takien.com
*/


function getYoutubeId(url) {
  var ID = '';
  url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }

  return ID;
}

function getCurrentURI() {
  var actualHost = window.location.protocol + '//' + window.location.hostname + (window.location.hostname === 'localhost' ? ':' + window.location.port : '');
  return actualHost;
}

function getUrlParam(name) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}