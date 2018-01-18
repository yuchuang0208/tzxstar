import fetch from '@/utils/fetch'
import store from '@/store'
// 卡管理列表
export function findAllCustomerCard(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customerCard/findAllCustomerCard',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}
//初始化卡密码
export function updateCustomerCardPass(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customerCard/updateCustomerCardPass',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}
//筛选信息(不需要参数)
export function findAllScreen() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customerCard/findAllScreen',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}
//查询机构
export function findOrgan() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findOrgan',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}
//保存机构
export function updateCardActivationStore(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customerCard/updateCardActivationStore',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}