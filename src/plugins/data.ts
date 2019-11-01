import { isPlainObject } from './typeCheck'
import { cat } from 'shelljs'

export function transRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      //
    }
  }
  return data
}
