import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 获取招聘分页列表
 * @param body
 */
export const getPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/retailRecuit/searchRelease',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}
/**
 * 获取招聘详情
 * @param id
 */
export const getDetails = releaseId => {
  const token = getToken()
  return axios.request({
    url: `/retailRecuit/getReleaseDetails/${releaseId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  }) 
}
/**
 * 新增
 * @param body
 * @returns {*|{responseURL}}
 */
export const create = (body) => {
  const token = getToken()
  return axios.request({
    url: '/retailRecuit/setRelease',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}

/**
 * 招聘开启
 * @param id
 * @param state
 */
export const releaseUp = (releaseId) => {
  const token = getToken()
  return axios.request({
    url: `/retailRecuit/releaseUp/${releaseId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 招聘关闭
 * @param releaseId
 */
export const releaseDown = (releaseId) => {
  const token = getToken()
  return axios.request({
    url: `/retailRecuit/releaseDown/${releaseId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}
/**
 * 搜索简历分页
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getResumePage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/retailRecuit/searchResume',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}
/**
 * 获取简历详情
 * @param resumeId
 * @returns {*|{responseURL}}
 */
export const getResume = resumeId => {
  const token = getToken()
  return axios.request({
    url: `/retailRecuit/getResume/${resumeId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 获取所有招聘分类
 * @returns {*|{responseURL}}
 */
export const recruitCategoryList = () => {
  const token = getToken()
  return axios.request({
    url: `/recruitCategory/list`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}
