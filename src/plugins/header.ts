import { isPlainObject } from './typeCheck'

function normalizeHeaderName(header: any, normalized: string): void {
  if (!header) {
    return
  }
  Object.keys(header).forEach(key => {
    if (key !== normalized && key.toUpperCase() === normalized.toUpperCase()) {
      header[normalized] = header[key]
      delete header[key]
    }
  })
}

export function processHeaders(header: any, data: any): any {
  normalizeHeaderName(header, 'Content-Type')
  if (isPlainObject(data)) {
    if (header && !header['Content-Type']) {
      header['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return header
}

export function parseHeaders(header: string): any {
  let res = Object.create(null)
  if (!header) return {}

  header.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    res[key] = val
  })
  return res
}
