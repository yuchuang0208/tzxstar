import fetch from '@/utils/fetch'
import store from '@/store'
export function getPerInfoList(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/getPerInfoList',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function findGroupAndNum(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/findGroupAndNum',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function savePerGroup(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/savePerGroup',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function savePerRemark(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/savePerRemark',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function dividePerGroup(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/dividePerGroup',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function dividePerBlackList(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/dividePerBlackList',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function removePerBlackList(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/removePerBlackList',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

export function delPerGroup(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/delPerGroup',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

export function findPerBq(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/findPerBq',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

export function removePersonBq(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/removePersonBq',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

export function syncUserInfo(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/personmanage/syncUserInfo',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}




