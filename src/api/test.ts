import request from '../app/request'

const prefix = '/test/'

export const getData = (data: any) => request<any>({url:prefix + 'getData',  data })
