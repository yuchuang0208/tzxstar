import fetch from '@/utils/fetch'
import store from '@/store'
export function getMembers(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAllCustomer',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function getMemberDetails(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findCustomerByIdT',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function getMemberCount(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberFileManagementContraller/count',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function findAllOrganAndLevelAndChanel(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAllOrganAndLevelAndChanel',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function findCustomerById(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findCustomerByIdT',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
export function updateCustomer(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/updateCustomer',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}


export function findHistoryMemberMessage(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/customerAdditionalInfo',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

export function getAllCoupons(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAvailableCoupons',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

export function initPassword(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/updateCustomerPass',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
//查询会员手机号(yu)
export function findAllCustomerMobil(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAllCustomerMobil',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//修改会员手机号(yu)
export function updateMobil(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberFileManagementContraller/updateMobil',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//查询会员等级
export function findAllLevel(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAllLevel',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
//手动修改会员等级(yu)
export function saveCrmLevel(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/memberUpgradeContraller/saveCrmLevelV2',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
//获取会员等级列表
export function getMemberLevelList(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAllLevelTabulation',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}
//查询会员等级修改历史(yu)
export function findAllCustomerLevelHistory(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAllCustomerLevelHistory',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//查询会员生日修改记录(yu)
export function findAllCustomerBirthday(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'crm/customer/findAllCustomerBirthday',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//会员等级拖拽修改
export function dragUpdateMemberLevel(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: '/crm/memberShipLevelRest/saveMemberLevelOrder',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//删除会员等级
export function deleteMemberLevel(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: '/crm/customer/deleteLevel',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//获取所有会员等级
export function getMemberLevelAll(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: '/crm/customer/findAllLevel',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//创建会员等级
export function saveMemberLevel(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: '/crm/customer/saveCustomerLevel',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//会员等级编辑回显
export function updateMemberLevel(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: '/crm/customer/findAllCustomerLevelById',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}

//默认入会等级
export function defaultLevel(userInfo) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: '/crm/customer/saveCustomerLevelT',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: userInfo
    })
}