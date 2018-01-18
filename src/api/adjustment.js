import fetch from '@/utils/fetch'
import store from '@/store'
//积分调账



//积分调账查询列表(yu)
export function loadAmountAdjustList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/loadAmountAdjustList',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 2 获取调账原因列表  (yu)
export function findReason() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findReason',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}
// 3 导出调账历史  (yu)
export function exportUrl(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/exportUrl',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 4 积分调账的通过/驳回  (yu)
export function updateAmountAdjust(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/integralAdjustmentContraller/updateIntegralAdjust',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 5 查找会员  (yu)
export function findCc(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findCc',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 6 查询会员订单  (yu)
export function findOrder(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findOrder',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 7 查询机构  (yu)
export function findOrgan() {
    return fetch({
        baseURL: store.state.user.baseUrl,
       /* url: 'crm/home/shopsV2',*/
        url: 'crm/home/shops',
        method: 'get',
        params: { "_s": store.state.user.session },
    })
}
// 8 新增积分调账的保存 (yu)
export function insertAmountAdjust(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/integralAdjustmentContraller/insertIntegralAdjust',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 9 请求积分调账详情页的 方式 (yu)
export function findAmountAdjustDetail(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findAmountAdjustDetail',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 10 查询审核状态 方式 ( yu )
export function findCheckStatus() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/amountAdjustmentContraller/findCheckStatus',
        method: 'post',
        params: { "_s": store.state.user.session },

    })

}
// 大逃单游戏设置保存接口
export function save(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/game/save',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })

}
// 大逃单游戏设置活动列表接口
export function list() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/game/list',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}