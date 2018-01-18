import fetch from '@/utils/fetch'
import store from '@/store'
export function getListAll(param) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
//	baseURL:'http://localhost:8180/tzxsaas',
   url: 'wechat/back/WechatBack/getBillAppraiseList',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:param
  })
}
//查询
export function zhifulist(param){
	return fetch({
		 baseURL: store.state.user.baseUrl,
		headers: {
        'Content-Type': 'application/json'
    }, 
		url: 'wechat/payment2MemberRest/query',
		method:'post',
		params: {"_s":store.state.user.session},
		data:param
	})
}
//保存
export function saveall(info){
	return fetch({
		 baseURL: store.state.user.baseUrl,
		url: 'wechat/payment2MemberRest/saveRule',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    }, 
		params: {"_s":store.state.user.session},
		data:info
	})
}

//删除
export function deletover(info){
	return fetch({
		 baseURL: store.state.user.baseUrl,
		url: 'wechat/payment2MemberRest/deleteRule',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    }, 
		params: {"_s":store.state.user.session},
		data:info
	})
}

//支付即会员通过id查询接口
export function seachid(info){
	return fetch({
		 baseURL: store.state.user.baseUrl,
		url: 'wechat/payment2MemberRest/queryById',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    }, 
		params: {"_s":store.state.user.session},
		data:info
	})
}

//验证卡信息接口
export function yzcard(info){
	return fetch({
		 baseURL: store.state.user.baseUrl,
		url:'wechat/payment2MemberRest/validCardId',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    }, 
		params: {"_s":store.state.user.session},
		data:info
	})
}

//支付即会员新增或修改校验日期的接口
export function checkdt(info){
	return fetch({
	 baseURL: store.state.user.baseUrl,
		url:'wechat/payment2MemberRest/validDate2Rule',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    }, 
		params: {"_s":store.state.user.session},
		data:info
	})
}