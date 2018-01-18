import fetch from '@/utils/fetch'

export function getMessage() {

  return fetch({
  	baseURL: process.env.BASE_APIO,
    url: '/getMessage',
    method: 'get',
    
  })
}

export function getTree() {
  return fetch({
  	baseURL: process.env.BASE_APIO,
    url: '/getTree',
    method: 'get',
  })
}


