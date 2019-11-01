import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './plugins/header'
import { createError } from './plugins/error'
// 封装xhr操作，实现axios
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve: any, reject: any) => {
    const { data = null, url, method = 'get', header, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toLowerCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }

      const responseHeader = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config,
        request
      }

      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
    request.onerror = function errHandle() {
      reject(createError('Net Error', config, null, request))
    }
    request.ontimeout = function timeoutHandle() {
      reject(createError(`timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(header).forEach(name => {
      if (data) {
        request.setRequestHeader(name, header[name])
      }
    })

    request.send(data)
  })
}
