import fetch from '@/utils/fetch'

export function getList(params) {
  return fetch({
  	baseURL: process.env.BASE_API,
    url: 'api/table/list',
    method: 'get',
    params
  })
}
