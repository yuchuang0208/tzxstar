import fetch from '@/utils/fetch'
import store from '@/store'


// 1 查询金额调账列表  ( 卫春阳 )
export function loadAmountAdjustList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/loadAmountAdjustList',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 2 获取调账原因列表  ( 卫春阳 )
export function findReason() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findReason',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}

// 3 导出调账历史  ( 卫春阳 )
export function exportUrl(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/exportUrl',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}

// 4 金额调账的通过/驳回  ( 卫春阳 )
export function updateAmountAdjust(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/updateAmountAdjust',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 5 查找会员  ( 卫春阳 )
export function findCc(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findCc',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 6 查询订单  ( 卫春阳 )
export function findOrder(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findOrder',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 7 查询机构  ( 卫春阳 )
export function findOrgan() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        /*url: 'crm/home/shopsV2',*/
        url: 'crm/home/shops',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}
// 8 金额调账的保存 ( 卫春阳 )
export function insertAmountAdjust(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/insertAmountAdjust',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}

// 9 请求调账金额详情页的 方式 ( 卫春阳 )
export function findAmountAdjustDetail(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findAmountAdjustDetail',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 10 查询审核状态 方式 ( 卫春阳 )
export function findCheckStatus() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findCheckStatus',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}