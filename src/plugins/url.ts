import { isDate, isPlainObject } from './typeCheck'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any): string {
  if (!params) return url

  const pair: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || val === undefined) {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      pair.push(`${encode(key)}=${encode(val)}`)
    })

    let urlStr = pair.join('$')
    if (urlStr) {
      let index = url.indexOf('#')
      url = url.slice(0, index)
      if (url.indexOf('?') !== -1) {
        url += urlStr
      } else {
        url = url + '?' + urlStr
      }
    }
  })

  return url
}
