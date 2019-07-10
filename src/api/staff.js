import axios from '@/libs/api.request'
import {
  getToken
} from '@/libs/util'

/**
 * 获取员工列表
 */
export const fetchStaffList = (query) => {
  const token = getToken()
  return axios.request({
    url: '/clerk/getClerkList',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get',
    params: query
  })
}

/**
 * 添加员工
 */

export const fetchAddStaff = (query) => {
  const token = getToken()
  return axios.request({
    url: '/clerk/addClerk',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    params: query
  })
}

/**
 * 删除员工
 */

export const fetchDelStaff = (id) => {
  const token = getToken()
  return axios.request({
    url: '/clerk/deleteClerk/' + id,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'delete'
  })
}

/**
 * 搜索员工
 */

export const fetchSearchStaff = (phone) => {
  const token = getToken()
  return axios.request({
    url: '/clerk/searchClerk/' + phone,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 查看月排班列表
 */

export const fetchScheduleList = (yearMonth) => {
  const token = getToken()
  return axios.request({
    url: '/clerkArrange/getMonthArrange/' + yearMonth,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 查看日排班详情
 */

export const fetchDateScheduleList = (arrangeDate, arrangeId) => {
  const token = getToken()
  return axios.request({
    url: '/clerkArrange/getDayArrange/' + arrangeDate + '/' + arrangeId,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 查看员工列表
 */

export const fetchScheduleStaffList = (query) => {
  const token = getToken()
  return axios.request({
    url: '/clerkArrange/getClerkList',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get',
    parmas: query
  })
}

/**
 * 添加员工排班
 */

export const fetchAddScheuleStaff = (query) => {
  const token = getToken()
  return axios.request({
    url: '/clerkArrange/addArrange',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: query
  })
}

/**
 * 添加员工排班
 */

export const fetchDelScheuleStaff = (query) => {
  const token = getToken()
  return axios.request({
    url: '/clerkArrange/deleteArrange',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'delete',
    data: query
  })
}

/**
 * 获取排班列表
 */

export const fetchArrageList = (query) => {
  const token = getToken()
  return axios.request({
    url: '/storeArrange/getArrangeList',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get',
    data: query
  })
}

/**
 * 添加排班
 */
export const fetchAddArrage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/storeArrange/addArrange',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 删除排班
 */
export const fetchDelArrage = (id) => {
  const token = getToken()
  return axios.request({
    url: '/storeArrange/deleteArrange/' + id,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'delete'
  })
}

/**
 * 查看打卡设置
 */
export const fetchSetClockInfo = () => {
  const token = getToken()
  return axios.request({
    url: '/storeArrange/getClockIn',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 设置打卡
 */
export const fetchSetClockIn = (query) => {
  const token = getToken()
  return axios.request({
    url: '/storeArrange/setClockIn',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: query
  })
}
