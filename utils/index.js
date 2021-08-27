import FirestoreCrudService from './FirestoreCrudService'
import AbstractService from './AbstractService'
import copyToClipboard from './copyToClipboard'
import checkCnpj from './checkCnpj'
import checkCpf from './checkCpf'
import slugify from './slugify'
import arraySearch from './arraySearch'

export function planeObject (data) {
  return JSON.parse(JSON.stringify(data))
}

export function contributeWarnLog() {
  console.warn('>> Did you have any ideas or needs? Contribute https://github.com/AlexVFornazieri/vuetify-js-utils')
}

export {
  FirestoreCrudService,
  AbstractService,
  arraySearch,
  copyToClipboard,
  checkCnpj,
  checkCpf,
  slugify,
}
