# Vuetify and JS utils pack

This package have Vuetify/Nuxt an JS utils funcions and mixins, more especifily (but not only) for braziliam (pt-BR) projects.
Esse projeto contem codigos utils incluindo mixers para Vuetify/Nuxt, mas especificamente (mas não exclusivamente) para projetos brasileros.

## Intall

```bash
yarn add vuetify-js-utils
# or
npm install --save vuetify-js-utils
```
### Eg. Validate CPF or CNPJ (validar CPF ou CNPJ)

```vue
<template>
  <v-textfield label="CPF/CNPJ" :rules="[rules.required, rules.cpfOrCnpj]" />
</template>

<script>
  import { OnRules } from 'vuetify-js-utils'

  export default {
    mixins: [OnRules]
  }
</scipt>
````
### All validates rules
- required: 'Campo obrigatório',
- array: 'Campo obrigatório',
- object: 'Campo obrigatório',
- date: 'Campo obrigatório' (YYYY-MM-DD) *need inproves, currently just check length*,
- email: 'E-mail deve ser válido',
- min6: 'Ao menos 6 caracteres.',
- minLenght(min: number, message: String),
- maxLenght(max: number, message: String),
- id: 'Apenas letras minúsculas, numeros e hifens são permitidos'
- cpf: v => checkCpf(v) || 'CPF inválido.',
- npj: v => checkCnpj(v) || 'CNPJ inválido.',
- cpfOrCnpj: v => checkCpf(v) || checkCnpj(v) || 'CPF ou CNPJ inválido.'

## TODO
- Create a exmple/doc page for developments test proposes.
- Better date check rule.
- Doc JS utils funcions.
