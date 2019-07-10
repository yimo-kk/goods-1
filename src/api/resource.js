import axios from '@/libs/api.request'
import {
  getToken
} from '@/libs/util'

/**
 * 发布资源信息
 * @param 
 */
export const addResourceInfo = (body) => {
    const token = getToken()
    return axios.request({
      url: '/resources/addResources',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'post',
      data: body
    })
  }

  /**
 * 发布资源信息
 * @param 
 */
export const updateResourceInfo = (body) => {
    const token = getToken()
    return axios.request({
      url: '/resources/updateResources',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'post',
      data: body
    })
  }
  
/**
 * 获取资源信息
 * @param 
 */
export const fetchResourceInfo = () => {
  const token = getToken()
  return axios.request({
    url: '/resources/getResources',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}