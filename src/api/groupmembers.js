import fetch from '@/utils/fetch'
import store from '@/store'

// 获取会员群体列表
export function getGroupmembersList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipsGroupRest/loadMemberShipsGroupDg',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 会员群体详情
export function getGroupmembersDetail(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipsGroupRest/groupDetail',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 更新群体人数
export function refreshMembers(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipsGroupRest/refreshMembers',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 删除群体
export function delGroup (info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipsGroupRest/delGroup',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 保存会员群体
export function saveGroup (info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipsGroupRest/save',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 获取基本消息标签页
export function basicLabel(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipsGroupRest/basicLabel',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}

// 复制会员群体
export function saveCopyGroup(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipsGroupRest/copyGroup',
        method: 'post',
        data: info,
        params: { "_s": store.state.user.session },
    })
}
