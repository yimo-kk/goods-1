import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 获取缴费套餐分页
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getPage = (pageNum, pageSize) => {
  const token = getToken()
  return axios.request({
    url: '/product/getProductList',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    pramas: {
      pageNum,
      pageSize
    },
    method: 'get'
  })
}
