import qs from 'qs'
import axios, { AxiosResponse, Method } from 'axios'
import Common from '@/lib/common'
import router from '@/router'
import { ElLoading, ElNotification } from 'element-plus'

window.$axiosRequestsList = []

axios.defaults.withCredentials = false

interface RequestConfig {
  url: string
  headers?: object
  json?: boolean
  loading?: boolean
  data?: object
  sendSuccessMessage?: true
  successMessage?: string
  success: (arg0: object) => void
  error?: () => void
  complete?: () => void
}

export default class Requests {
  common: Common

  constructor() {
    this.common = new Common()
  }

  httpRequests(method: Method, options: RequestConfig) {
    const respData = options.data || {}
    const complete = options.complete
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    }
    const post = ['PUT', 'POST', 'PATCH'].indexOf(method.toUpperCase()) >= 0
    const params = post ? 'data' : 'params'
    let payload: string | object
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      payload = qs.stringify(respData)
    } else if (post && options.json) {
      payload = JSON.stringify(respData)
    } else {
      payload = respData
    }

    const controller = new AbortController()

    const token = this.common.getData('token')
    if (token) {
      headers['Authorization'] = 'Bearer ' + token
    }

    const config = {
      url: options.url,
      method: method,
      headers: headers,
      signal: controller.signal,
      [params]: payload,
    }
    window.$axiosRequestsList.push(controller)

    for (const name in headers) {
      config.headers[name] = headers[name]
    }

    let loading: { close: () => void } | null = null
    if (options.loading === true) {
      loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }

    axios(config)
      .then((response) => {
        this.handleResponse(
          response,
          options.success,
          options.error,
          options.sendSuccessMessage,
          options.successMessage
        )
      })
      .catch((err) => {
        if (err.message && err.message === 'canceled') return
        if (err.response) {
          this.handleResponse(
            err.response,
            options.success,
            options.error,
            options.sendSuccessMessage,
            options.successMessage
          )
          return
        }
        ElNotification.error({ title: '??????????????????', message: err.toString() })
      })
      .finally(() => {
        if (loading !== null) {
          loading.close()
        }
        complete && complete()
      })
  }

  get(options: RequestConfig) {
    this.httpRequests('get', options)
  }

  post(options: RequestConfig) {
    this.httpRequests('post', options)
  }

  upload(
    url: string,
    file: string | Blob,
    // filename: string,
    callback: (arg0: object) => void
  ) {
    const form = new FormData()
    const options = {
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      json: false,
      success: callback,
    }

    form.append('file', file)
    // form.append('filename', filename)
    options['data'] = form

    this.httpRequests('post', options)
  }

  handleResponse(
    response: AxiosResponse,
    success: (arg0: object) => void,
    error?: () => void,
    sendSuccessMessage?: true,
    successMessage?: string
  ) {
    const data = response.data
    const status = response.status

    switch (status) {
      case 200:
        if ('access_token' in data) {
          this.common.saveData('token', data['access_token'])
          data.code = 200
          data.message = '???????????????????????????...'
        }

        switch (data.code) {
          case 200:
            if (sendSuccessMessage) {
              ElNotification.success({ title: '??????', message: successMessage ? successMessage : data.message })
            }
            success && success(data.data)
            break
          default:
            ElNotification.warning({ title: '??????', message: data.message })
            error && error()
            break
        }
        break
      case 401:
        if (location.pathname === '/login') {
          ElNotification.warning({ title: '????????????', message: response.data.detail })
        } else {
          router.push('/login')
          ElNotification.error({
            title: '????????????',
            message: response.data.detail,
          })
        }
        error && error()
        break
      case 403:
        ElNotification.warning({ title: '????????????', message: response.data.detail })
        error && error()
        break
      default:
        ElNotification.error({ title: '????????????', message: response.status + '\n' + response.statusText })
        error && error()
    }
  }
}
