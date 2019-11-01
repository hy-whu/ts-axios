export function isDate(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Object]'
}
