import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { buildURL } from './plugins/url'
import { transRequest, transResponse } from './plugins/data'
import { processHeaders } from './plugins/header'

// entry
function axios(config: AxiosRequestConfig): AxiosPromise {
  // process data
  processConfig(config)

  return xhr(config).then(res => {
    return transResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transURL(config)
  config.header = transHeader(config)
  config.data = transRequestData(config)
}

function transURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transRequest(data)
}

function transHeader(config: AxiosRequestConfig): any {
  const { header = {}, data } = config
  return processHeaders(header, data)
}

function transResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transResponse(res.data)
  return res
}

export default axios

export * from './types'
