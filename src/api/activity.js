import fetch from '@/utils/fetch'
import store from '@/store'
export function saveWarn(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/insertWarn',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

export function getWarnReport(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/getWarnReport',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
/* 活动列表*/
export function getAllActivity(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActivity/list',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

/* 终止 发布活动*/
export function endOrIssue(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActivity/updateStatus',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}
/* 复制活动*/
export function copyActivityById(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActivity/copy',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

/* 手工调帐活动详情*/
export function findManualmoneyActivityDetail(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActiveController/findMarketingActiveInfo',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
/* 评价赠礼活动详情*/
export function findEvalgiftActivityDetail(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActivity/detail',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

export function findWarn() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/findWarn',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}

export function findOrganVoByReceive() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/findOrganVoByReceive',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}


/* 短信模板   消费后评价赠礼**/
export function findSmsTemplate() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/evalGift/findSmsTemplate',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}

/*查询活动类型*/

export function getAllActivityType(query) {

    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActivity/findActivityType',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: query
    })
}
/* 查询活动名称*/

export function serachByActivityName(query) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActivity/search',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: query
    })
}

/*yu  卡卷规则列表渲染*/
export function getCardRuleList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/paymentway/page',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}
/*yu  修改是否可积分*/
export function updateIfJifen(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/paymentway/updateIfJifen',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
/*yu  修改剩余订单是否可积分*/
export function updateIfLeftMoneyCredit(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/paymentway/updateIfLeftMoneyCredit',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}

export function getReportById(query) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/warn/getReportDetail',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: query
    })
}

//评价后活动赠礼 已创建得活动列表
export function findEvalGift() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/evalGift/list',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}

//关注赠礼 已创建得活动列表
export function findAttentionGift() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/attentionGift/list',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}


//选择优惠券后加载所有的优惠券信息
export function findCouponList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/couponClassRest/getCombobox',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}

//保存消费后评价赠礼
export function saveAttentionGift(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/attentionGift/save',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//会员唤醒 已创建得活动列表
export function findMenberWakeAcitivities() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/wakeMember/list',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}

/** 短信模板   会员唤醒**/
export function findSmsTemplateWake() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/wakeMember/findSmsTemplate',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}

//保存消费后评价赠礼
export function saveWakeMember(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/wakeMember/save',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
} //saveBirthdaymarketing

//保存生日营销
export function saveBirthdaymarketing(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/birthdayGift/saveOrUpdate',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//查询生日营销活动列表
export function findBirthdayGift(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/birthdayGift/list',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

// 短信模板   生日营销
export function findBirthdayTemplate() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/birthdayGift/findSmsTemplate',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}

//获取会员等级
export function getMemberLevel(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberShipLevelRest/getMemberLevelOrder',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//保存消费赠券
export function saveConsumptionCoupons(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/consumptionGiveCoupons/save',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//获取消费赠券活动列表
export function getConsumptionCouponsList(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/consumptionGiveCoupons/list',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

// 短信模板   消费赠礼
export function findConsumptionTemplate() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/consumptionGiveCoupons/findSmsTemplate',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}

// 消费赠券活动详情
export function findConsumptionDetail(info) { //consumptioncouponsNew
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/consumptionGiveCoupons/detail',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

// 查询付款方式
export function findPaymentMode(info) { //consumptioncouponsNew
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/paymentway/page',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}


/* 手动赠送金额编辑查询*/
export function findMarketActivityDetail(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/marketActiveController/detail',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 大逃单游戏设置保存接口
export function save(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/game/save',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: info
    })
}
// 大逃单游戏设置活动列表接口
export function getdtdlist() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/game/list',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}

//入会赠礼已创建得活动列表
export function findMeetingGift() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/membershipGiftRest/list',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}

/* 短信模板   入会赠礼**/
export function findMeetingSmsTemplate() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/membershipGiftRest/getSmsTemplate',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}

/* 入会赠礼活动详情*/
export function findMeetinggiftActivityDetail(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/membershipGiftRest/memberShipGiftDetail',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//保存入会赠礼
export function saveMeetingGift(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/membershipGiftRest/save',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}

//升级赠礼 已创建得活动列表
export function findUpgradeGiftList() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/upGradeGift/list',
        method: 'post',
        params: { "_s": store.state.user.session },
    })
}

/* 短信模板   升级赠礼**/
export function findUpgradeGiftSmsTemplate() {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/upGradeGift/findSmsTemplate',
        method: 'post',
        params: { "_s": store.state.user.session },

    })
}

//保存升级赠礼
export function saveUpgradeGift(info) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/upGradeGift/saveOrUpdate',
        method: 'post',
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        params: { "_s": store.state.user.session },
        data: info
    })
}