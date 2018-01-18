import fetch from '@/utils/fetch'


export function fetchList(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/list',
        method: 'get',
        params: query
    })
}

export function getAllCoupons(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/coupons',
        method: 'get',
        params: query
    })
}
export function getCity(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/getCity',
        method: 'get',
        params: query
    })
}


export function fetchArticle() {
  return fetch({
  	baseURL: 'https://api-dev',
    url: '/article/detail',
    method: 'get'
  })
}

export function getDist(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/getDist',
        method: 'get',
        params: query
    })
}

export function getReports(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/reports',
        method: 'get',
        params: query
    })
}
export function getMembers(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/members',
        method: 'get',
        params: query
    })
}
export function getActivityById(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/getActivityById',
        method: 'get',
        params: query
    })
}
export function getReportById(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/getReportById',
        method: 'get',
        params: query
    })
}
export function fetchTimes(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/times',
        method: 'get',
        params: query
    })
}
export function serachByActivityName(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/names',
        method: 'get',
        params: query
    })
}

export function getUserRoles(query) {
    return fetch({
        baseURL: 'https://api-dev',
        url: '/article/getUserRoles',
        method: 'get',
        params: query
    })
}



export function fetchPv(pv) {
    return fetch({
        url: '/article/pv',
        method: 'get',
        params: { pv }
    })
}


