"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var minLenght = function minLenght(min, msg) {
  return function (v) {
    return v && v.toString().length >= min || msg;
  };
};

var maxLenght = function maxLenght(max, msg) {
  return function (v) {
    return v && v.toString().length <= max || msg;
  };
};

var _default = {
  computed: {
    rules: function rules() {
      return {
        required: function required(v) {
          return !!v || 'Campo obrigatório';
        },
        array: function array(v) {
          return v && v.length > 0 || 'Campo obrigatório';
        },
        object: function object(v) {
          return Object.keys(v).length > 0 || 'Campo obrigatório';
        },
        date: function date(v) {
          return v && v.length === 10 || 'Campo obrigatório';
        },
        email: function email(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail deve ser válido';
        },
        min6: minLenght(6, 'Ao menos 6 caracteres.'),
        minLenght: minLenght,
        maxLenght: maxLenght,
        id: function id(v) {
          return /^[0-9a-z-]+$/.test(v) || 'Apenas letras minúsculas, numeros e hifens são permitidos';
        },
        cpf: function cpf(v) {
          return (0, _utils.checkCpf)(v) || 'CPF inválido.';
        },
        cnpj: function cnpj(v) {
          return (0, _utils.checkCnpj)(v) || 'CNPJ inválido.';
        },
        cpfOrCnpj: function cpfOrCnpj(v) {
          return (0, _utils.checkCpf)(v) || (0, _utils.checkCnpj)(v) || 'CPF ou CNPJ inválido.';
        }
      };
    }
  }
};
exports["default"] = _default;