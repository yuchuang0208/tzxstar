import fetch from '@/utils/fetch'
import store from '@/store'
//点击“微信公众号授权”去授权
export function aliAuthorization() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: '/wechat/AlipayToken/getBillAppraiseList',
        method: 'post',
        params: { "_s":store.state.user.session,"tenancy_id" :store.state.user.tenancyid},
    })
}

export function setFourLevelId() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'framework/systemModulesContraller/setFourLevelId',
        method: 'post',
        params: { "_s":store.state.user.session,"id":9000016},
    })
}
//点击去授权
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
//轮询查看是否授权成功 www.e7e6.net/wechat/AlipayToken/getAliAuth
export function getAliAuth(data) {
    return fetch({
        baseURL:store.state.user.baseUrl,
        url: '/wechat/AlipayToken/getAliAuth',
        method: 'get',
        params: {"tenancy_id" :data,"_s":store.state.user.session},
    })
}
//获取用户信息
export function aligetUserMessage() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/session',
        method: 'get',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session }
    })
}
