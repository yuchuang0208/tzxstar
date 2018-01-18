import fetch from '@/utils/fetch'
import store from '@/store'
//规则中心

//积分设置 保存接口
export function savePoint(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/creditRuleRest/saveCreditRule',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

/* 短信模板  积分规则**/
export function findPointSmsTemplate() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/creditRuleRest/getSmsTemplate',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}
//回显积分设置 查询接口
export function fintPoint() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/creditRuleRest/findCreditRule',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
    })
}


//-----卡号规则-----


//卡号规则列表
export function loadStoreCardRule(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newCardNumberRuleRest/loadStoreCardRule',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}
//创建编辑卡号规则
export function saveStoreCardRule(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newCardNumberRuleRest/saveStoreCardRule',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}
//删除卡号规则
export function deleteCardRule(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newCardNumberRuleRest/deleteCardRule',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//保存交易基本规则
export function saveTransactionRule(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newlyRegisteredMemberRuleRest/saveTradeRule',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//编辑交易基本规则
export function updateTransactionRule(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newlyRegisteredMemberRuleRest/findTradeRule',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//获取门店列表
export function getShopList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newOrganGroupRest/findOrganGroup',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//创建门店分组
export function saveShopList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/organGroupRest/saveOrganGroup',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//删除门店分组
export function deleteShopList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/organGroupRest/startOrStop',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//保存储值消费门店分组
export function saveOrganGroup(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/newOrganGroupRest/saveOrganGroup',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}