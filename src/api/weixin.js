import fetch from '@/utils/fetch'
import store from '@/store'

export function getMaterialMsgPicList(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/materialmanage/getMaterialMsgPicList',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function delPicInfo(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/materialmanage/delPicInfo',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}

export function getMaterialPicInfo(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/materialmanage/getMaterialPicInfo',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function updateMaterialPicName(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/materialmanage/updateMaterialPicName',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function getMaterialMsgPic(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/materialmanage/getMaterialMsgPic',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function saveMaterialMsgPic(param,callBack) {
	$.ajax({
		url:store.state.user.baseUrl+'weixin/newr/materialmanage/saveMaterialMsgPic?_s='+store.state.user.session,
		data:param,
		dataType:"json",
		type:"post",
		success:(data)=>{
			callBack&&callBack(data);
		}
	})
}
export function findPicList(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/materialmanage/findPicList',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function getallvote(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/vote/getallvote',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function saveMaterialPic(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/materialmanage/saveMaterialPic',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function selMetialDetialInfo(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/messagesend/selMetialDetialInfo',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function getDefaultMenu(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/definedmenu/getDefautMenu',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function getMenu(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/definedmenu/getMenu',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function saveMenu(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/definedmenu/saveMenu',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}

export function delMenu(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/definedmenu/deleteMenu',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}

export function synMenu(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/definedmenu/synMenu',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}

export function menuOrder(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/definedmenu/menuOrder',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function getModuleConfig(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/moduleConfig/getModuleConfig',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function saveModuleConfig(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/moduleConfig/saveModuleConfig',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function getSign(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/autoSign/getjson',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}

export function saveSign(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/autoSign/save',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}

export function getScanConfig(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'newwx2/baseInfo/getConfig'+param,
        method: 'get',
        params: { "_s": store.state.user.session }
        //data: param
    })
}

export function saveScanConfig(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'newwx2/baseInfo/saveConfig',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}

export function getStoreInfoById(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'newwx2/baseInfo/getStoreInfoById',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function selSetMoney(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/memberRechargeSet/selSetMoney',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}

export function saveSetMoney(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/memberRechargeSet/saveSetMoney',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function delSetMoney(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/memberRechargeSet/delSetMoney',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function saveWords(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/memberRechargeSet/saveWords',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function modifyMemberRuleSet(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/moduleConfig/modifyMemberRuleSet',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function modifyPersonTagSet(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/moduleConfig/modifyPersonTagSet',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function getParameterSetConfig(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/moduleConfig/getParameterSetConfig',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
export function saveParameterSetConfig(param) {
    return fetch({
        baseURL: store.state.user.baseUrl,
        url: 'weixin/newr/moduleConfig/saveParameterSetConfig',
        method: 'post',
        params: { "_s": store.state.user.session },
        data: param
    })
}
//获取支付方式配置
export function getPaymentInfo(param) {
	return fetch({
		baseURL: store.state.user.baseUrl,
		url: 'newwx2/baseInfo/getPaymentInfo',
		method: 'post',
		params: {
			"_s": store.state.user.session
		},
		data: param
	})
}

//保存支付方式配置
export function savePaymentInfo(param) {
	return fetch({
		baseURL: store.state.user.baseUrl,
		url: 'newwx2/baseInfo/savePaymentInfo',
		method: 'post',
		params: {
			"_s": store.state.user.session
		},
		data: param
	})
}
//获取门店列表配置
export function getOrganInfo(param) {
	return fetch({
		baseURL: store.state.user.baseUrl,
		url: 'newwx2/baseInfo/getOrganInfo',
		method: 'post',
		params: {
			"_s": store.state.user.session
		},
		data: param
	})
}

//保存门店列表配置
export function saveOrganInfo(param) {
	return fetch({
		baseURL: store.state.user.baseUrl,
		url: 'newwx2/baseInfo/saveOrganInfo',
		method: 'post',
		params: {
			"_s": store.state.user.session
		},
		data: param
	})
}
