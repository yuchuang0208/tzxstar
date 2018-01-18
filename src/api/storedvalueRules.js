import fetch from '@/utils/fetch'
import store from '@/store'

//获取储值限额列表
export function getStorevalue(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newOrganFranchiseesRest/getOrganf',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}

//创建门店储值限额
export function estabStoremone(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newOrganFranchiseesRest/saveOrganf',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}

//删除门店储值限额
export function delectStore(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newOrganFranchiseesRest/deleteOrganf',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}