import fetch from '@/utils/fetch'
import store from '@/store'
//1游戏统计列表
export function gameList(param){
	return fetch({
		baseURL: store.state.user.baseUrl,
		url:'crm/game/findDaTaoDanGame',
		method:'post',
		headers: {
        	'Content-Type': 'application/json'
    	}, 
		params: {"_s":store.state.user.session},
		data:param
	})
}
//2全部游戏门店接口
export function menstore(param){
	return fetch({
		baseURL: store.state.user.baseUrl,
		url:'crm/game/gameStoreids',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    	}, 
		params: {"_s":store.state.user.session},
		data:param
	})
}
//3游戏转化统计
export function conversion(param){
	return fetch({
		baseURL: store.state.user.baseUrl,
		url:'crm/game/findGameDataConversion',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    	}, 
		params: {"_s":store.state.user.session},
		data:param
	})
}

//4分享统计接口
export function share(param){
	return fetch({
		baseURL: store.state.user.baseUrl,
		url:'crm/game/findGameShare',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    	}, 
		params: {"_s":store.state.user.session},
		data:param
	})
}
//5游戏优惠券统计接口
export function youhuiq(param){
	return fetch({
		baseURL: store.state.user.baseUrl,
		url:'crm/game/getGameCoupons',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    	}, 
		params: {"_s":store.state.user.session},
		data:param
	})
}

//6玩家人数统计
export function playnumber(param){	
	return fetch({
		baseURL: store.state.user.baseUrl,
		url:'crm/game/findcountGameplayerNum',
		method:'post',
		headers: {
        'Content-Type': 'application/json'
    	}, 
		params: {"_s":store.state.user.session},
		data:param
	})
}

