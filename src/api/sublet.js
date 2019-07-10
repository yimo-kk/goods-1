import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 获取转店分页列表
 * @param body
 */
export const getPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/sublet/searchSublet',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}
/**
 * 获取转店详情
 * @param id
 */
export const getDetails = releaseId => {
  const token = getToken()
  return axios.request({
    url: `/sublet/getSubletDetails/${releaseId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}
/**
 * 转店开启
 * @param releaseIds
 */
export const subletUp = (releaseIds) => {
  const token = getToken()
  return axios.request({
    url: `/sublet/subletUp/${releaseIds}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}
/**
* 转店关闭
* @param releaseIds
*/
export const subletDown = (releaseIds) => {
  const token = getToken()
  return axios.request({
    url: `/sublet/subletDown/${releaseIds}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}
/**
 * 发布转店信息
 * @param body
 * @returns {*|{responseURL}}
 */
export const setSublet = (body) => {
  const token = getToken()
  return axios.request({
    url: '/sublet/setSublet',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}
