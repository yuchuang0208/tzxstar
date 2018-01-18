import fetch from '@/utils/fetch'
import store from '@/store'
//获取用户的权限
export function getUserRoles() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/modulesV2',
        method: 'get',
        params: { "_s": store.state.user.session }
    })                                   
}
//首页
export function getIndex() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/index',
        method: 'get',
        params: { "_s": store.state.user.session }
    })                                   
}
//门店数据
export function getMendian() {
    return fetch({
        baseURL: store.state.user.baseUrl,
       /* url: 'crm/home/shopsV2',*/
        url: 'crm/home/shops',
        method: 'get',
        params: { "_s": store.state.user.session }
    })
}
//阶段数据
export function getJdsj(days, storeIds) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/section',
        method: 'get',
        params: { "_s": store.state.user.session, 'days': days, "store_ids": storeIds }
    })
}
//排行榜
export function getPangb(days) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/operation',
        method: 'get',
        params: { "_s": store.state.user.session, 'days': days }
    })
}
//消费弹出框
export function getXxqk(id, start_date, end_date) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/customer',
        method: 'get',
        params: {
            "_s": store.state.user.session,
            "id": id,
            "start_date": start_date,
            "end_date": end_date
        }
    })
}

//门店选择，加载沉淀数据
export function getCdsj(storeIds) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/subside',
        method: 'get',
        params: {
            "_s": store.state.user.session,
            "store_ids": storeIds
        }
    })
}

//门店选择，加载阶段数据
export function getMendianJdsj(storeIds, days) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/sections',
        method: 'get',
        params: {
            "_s": store.state.user.session,
            "store_ids": storeIds,
            "days": days
        }
    })
}
//获取用户信息
export function getUserMessage(_s) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/session',
        method: 'get',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": _s }
    })
}

//获取更新日志的信息
export function getLogsInfo() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/home/updateLogs',
        method: 'get',
        params: { "_s": store.state.user.session }
    })
}

//选择会员群体
export function getHuiyuanQunti() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipsGroupRest/getMemberShipGroupsUrl',
        method: 'get',
        params: { "_s": store.state.user.session }
    })
}
//加载消费后评价赠礼的投放渠道
export function getHuiyuanQudao() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'hq/SysDictionaryController/find',
        method: 'get',
        params: { "_s": store.state.user.session, "type": 0, "code": "chanel", "y": 1 }
    })
}

//选择优惠券后加载所有的优惠券信息
export function getYouHuiQuan() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/couponClassRest/getCombobox',
        method: 'get',
        params: { "_s": store.state.user.session }
    })
}
//查看单个优惠券信息
export function getYouHuiQuanOne(classId) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/foodCouponManagementRest/getCouponsType',
        method: 'get',
        params: { "_s": store.state.user.session, "classId": classId }
    })
}

//保存消费后评价赠礼
export function saveZengli(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/evalGift/save',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}
//保存赠送金额接口
export function saveZengSongJine(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActiveController/insertActiveInfo',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//查询被提醒人
export function findTingXingPerson() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/findAllOrganVoAndEmployee',
        method: 'get',
        params: { "_s": store.state.user.session }
    })
}
//查询短信内容
export function findMessage() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/findInfo',
        method: 'get',
        params: { "_s": store.state.user.session }
    })
}

//保存诊断提醒设置
export function saveInfo(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/saveInfo',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}