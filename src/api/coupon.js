import axios from '@/libs/api.request'
import {
  getToken
} from '@/libs/util'

/**
 * 获取购物券列表
 * @param query
 */
export const fetchList = (query) => {
  const token = getToken()
  return axios.request({
    url: '/StoreCouponSetting/getCouponList',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get',
    params: query
  })
}

/**
 * 获取购物券列表
 * @param body
 */
export const addCoupon = (body) => {
  const token = getToken()
  return axios.request({
    url: '/StoreCouponSetting/addStoreCoupon',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 获取购物券列表
 * @param body
 */
export const editCouponStatus = (id, status) => {
  const token = getToken()
  return axios.request({
    url: '/StoreCouponSetting/updateCoupon/' + id + '/' + status,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 搜索购物券
 * @param body
 */
export const searchCoupon = (body) => {
  const token = getToken()
  return axios.request({
    url: '/StoreCouponSetting/searchStoreCoupon',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}
