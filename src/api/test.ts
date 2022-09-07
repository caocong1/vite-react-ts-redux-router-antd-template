import { AxiosPromise } from 'axios'
import request from '../app/request'

const prefix = '/test/'

export const getData: (data: any) => AxiosPromise = (data) => request(prefix + 'getData', { data })
