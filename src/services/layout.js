import request from '../utils/request'

export function getPermission(params) {
  return request('/funwork-admin/get/permission', {
    method: 'POST',
    body: params
  })
}