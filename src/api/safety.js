import fetch from '@/utils/fetch'
import store from '@/store'
/**
 *  查询短信配置信息
 * */
export function findSmsMessage() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/findSmsWarn',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}
/**
 * 查询配置项规则
 * */
export function findWarnRule(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/findWarnRule',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
/**
 * 诊断规则 开始诊断
 * */
export function startSafe() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/insertWarnInfo',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}
/**
 * 360°安全诊断
 * */
export function getSafeWarn() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/getSafeWarn',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}

/**
 *  基本配置诊断报告
 * */
export function getBasicWarnReport(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/getBasicWarnReport',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
/**
 * 操作信息诊断报告
 * getOperateWarnReport
 * */
export function getOperateWarnReport(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/getOperateWarnReport',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
/**
 * 操作信息诊断报告详情
 * */
export function getOperateReportDetail(query) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/getOperateReportDetail',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: query
    })
}
