import fetch from '@/utils/fetch'
import store from '@/store'

//查询所有会员等级回显
export function getListmember(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAllLevel',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
//查询会员升降级的列表
export function getListupgread(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberUpgradeContraller/loadCrmLevelList',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
//升级方式

export function getType(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'hq/SysDictionaryController/find',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}

//手动升级方式

export function manualType(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberUpgradeContraller/saveCrmLevelByGroup',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}