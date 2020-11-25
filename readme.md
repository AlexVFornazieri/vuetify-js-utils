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
  <v-textfield label="CPF/CNPJ" :rules="[rules.required, rules.cpfOrCnpj] />
</template>

<script>
  import { OnRules } from 'vuetify-js-utils'

  export default {
    mixins: [OnRules]
  }
</scipt>
````
