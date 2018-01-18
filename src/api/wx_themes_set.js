import fetch from '@/utils/fetch'
import store from '@/store'
export function getColorFn(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/themeSet/getSetTheme',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

export function setColorFn(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/themeSet/saveSetTheme',
        method: 'post',
        params: { "_s": store.state.user.session },
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        data: userInfo
    })
}

