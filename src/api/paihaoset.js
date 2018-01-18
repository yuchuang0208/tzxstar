import fetch from '@/utils/fetch'
import store from '@/store'

// 获取轮播图和视频列表数据
export function getTvlist(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/paihao/getPaiHaoInfo',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

//保存成功图片
export function seavPic(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/paihao/insertOrUpdatePaiHao',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}