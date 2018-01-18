import fetch from '@/utils/fetch'
import store from '@/store'
//是否授权
export function ishouquan() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/weixinMain/getManager',
        method: 'post',
        params: { "_s":store.state.user.session },
    })
}
//修改的时候如果不改，将是默认原来的信息（placerholder里默认原来的信息）
export function getMain() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/weixinMain/getMain',
        method: 'post',
        params: { "_s":store.state.user.session },
    })
}
//保存修改的公众号信息
export function saveConfig(params) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/weixinMain/saveConfig',
        method: 'post',
        params: { "_s":store.state.user.session },
        data:params
    })
}
//点击“微信公众号授权”去授权
export function toAuthorization() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/weixinMain/getWechatThird',
        method: 'post',
        params: { "_s":store.state.user.session,"tenentid" :store.state.user.tenancyid},
    })
}
//授权二维码
export function openPlatAuthorize(params) {
    return fetch({
        baseURL: params,
        url: '/wechat/openPlat/authorize',
        method: 'post',
        params: { "tenentid" :store.state.user.tenancyid,"_s":store.state.user.session},
    })
}
//初始化
export function configDateAndModel(params) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/template/configDateAndModel',
        method: 'post',
        params: { "_s":store.state.user.session},
        data:params
    })
}
//清除授权
export function clearOpenPlatAuthorInfo() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/weixinMain/clearOpenPlatAuthorInfo',
        method: 'post',
        params: { "_s":store.state.user.session},
    })
}
//同步消息模板
export function templateInit() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/template/init',
        method: 'post',
        params: { "_s":store.state.user.session},
    })
}

