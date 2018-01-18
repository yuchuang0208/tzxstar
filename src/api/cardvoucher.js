import fetch from '@/utils/fetch'
import store from '@/store'

// 获取电子卡列表数据
export function getAneCard(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/cardSortRest/loadElectronicCard',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 同步电子卡包
export function synchronousAneCard(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/crmCardClassSetRest/synchroUrl',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 编辑电子卡包-获取卡包回显数据
export function editorAneCard(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/crmCardClassSetRest/findWxCardDetails',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 保存电子卡包
export function saveAneCard(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/crmCardClassSetRest/saveWxCardInfoUrl',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 电子卡保存并同步微信（与保存操作相同）
export function saveAndweixinAneCard(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/crmCardClassSetRest/submitWxCardInfoUrl',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 获取实体卡列表数据
export function getAneCardoffline(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/cardSortRest/loadEntityCard',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 创建实体卡分类
export function createAneCardoffline(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/crmCardClassSetRest/saveCard',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 获取实体卡详情
export function getAneCardofflineDetail(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/cardSortRest/entityCardDetail',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 实体卡启用操作
export function AneCardofflineStar(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/crmCardClassSetRest/start',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 实体卡停用操作
export function AneCardofflineStop(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/crmCardClassSetRest/stop',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 实体卡删除操作
export function CardofflineDele(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/cardSortRest/deleteEntityCard',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 实体卡获取持卡人人数接口
export function CardofflinefindCardUser(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/cardSortRest/findCardUser',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 编辑实体卡类别（回显数据）
export function AneCardofflineDataShow(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/cardSortRest/editEntityCard',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 编辑实体卡类别（保存）
export function AneCardofflineSave(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/cardSortRest/updateCard',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}


//修改类名

export function getClassname(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/cardSortRest/editElectronicCardName',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}
