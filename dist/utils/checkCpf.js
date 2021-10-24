"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(cpf) {
  var soma = 0;
  var resto;
  var strCPF = cpf.replace(/[^0-9]+/g, '');

  if (strCPF === '00000000000') {
    return false;
  }

  for (var i = 1; i <= 9; i++) {
    soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }

  resto = soma * 10 % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(strCPF.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (var _i = 1; _i <= 10; _i++) {
    soma = soma + parseInt(strCPF.substring(_i - 1, _i)) * (12 - _i);
  }

  resto = soma * 10 % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(strCPF.substring(10, 11))) {
    return false;
  }

  return true;
}