export function planeObject (data) {
  return JSON.parse(JSON.stringify(data))
}

export function arraySearch (prop, value, array, returnIndex) {
  let obj
  for (let i = 0; i < array.length; i++) {
    if (array[i][prop] === value) {
      obj = array[i]
      break
    }
  }
  return returnIndex ? array.indexOf(obj) : obj
}

export function contributeWarnLog() {
  console.warn('>> Did you have any ideas or needs? Contribute https://github.com/AlexVFornazieri/vuetify-js-utils')
}
