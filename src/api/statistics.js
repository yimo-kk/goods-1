import axios from '@/libs/api.request'
import {
  getToken
} from '@/libs/util'

/**
 * 获取统计关注量
 */
export const fetchConcernCount = () => {
  const token = getToken()
  return axios.request({
    url: '/statistic/getConcernCount',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 获取统计已投递简历
 */
export const fetchResumeCount = () => {
  const token = getToken()
  return axios.request({
    url: '/statistic/getResumeCount',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 获取招聘数据统计
 */
export const fetchRecruitMent = (body) => {
    const token = getToken()
    return axios.request({
      url: '/statistic/recruit',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'post',
      data: body
    })
  }

/**
 * 获取转店数据统计
 */
export const fetchSubletCount = (body) => {
  const token = getToken()
  return axios.request({
    url: '/statistic/sublet',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}
