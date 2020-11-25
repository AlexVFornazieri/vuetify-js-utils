export function planeObject (data) {
  return JSON.parse(JSON.stringify(data))
}

export function arraySearch (prop, value, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][prop] === value) {
      return array[i]
    }
  }
  return false
}
