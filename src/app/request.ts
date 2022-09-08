import { message } from 'antd'
import axios, { AxiosRequestHeaders } from 'axios'

const request = axios.create({
  // baseURL: import.meta.env.VITE_API,
  baseURL: '/api',
  method: 'POST',
  timeout: 20000,
  withCredentials: true,
})

request.interceptors.request.use(function (config) {
  const token = localStorage.token || ''
  let headers: AxiosRequestHeaders = {}
  if (token && config.url !== '/login') {
    headers = { token }
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      ...headers,
    },
  }
})

request.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      const { data } = response
      if (data.errorCode === 0) {
        return data.record !== undefined ? data.record : true
      }
      if (data.errorCode) {
        message.error(data.errorMessage || '请求失败').then()
      }
    }
    return Promise.reject(response.data)
  },
  function (error) {
    console.error('response error', error)
    message.error('网络错误').then()
    return Promise.reject(error)
  },
)

export default request
