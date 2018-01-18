import fetch from '@/utils/fetch'
import store from '@/store'
//撤销优惠券

//撤销优惠券列表
export function getRevertCouponList(info) {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'crm/couponsRecyclingRest/find',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
  })
}

//优惠券撤销原因
export function getRevertReasonList(info) {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'crm/couponsRecyclingRest/getAdReason',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
  })
}

//新增撤销优惠券列表
export function getAddRevertCouponList(info) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'crm/couponsRecyclingRest/findCouponsInfo',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
  })
}
//发售人
export function getUserList() {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'crm/couponsRecyclingRest/getUsers',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
  })
}
//活动类型
export function getActivityTypesList() {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'crm/marketActivity/findActivityType',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
  })
}


//撤销优惠券审核通过或者驳回
export function updateCouponRevertStatus(info){
	return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'crm/couponsRecyclingRest/updateRecyclingStatus',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
 })
}


//撤销优惠券审核通过或者驳回
export function getCouponDetail(info){
	return fetch({
  	baseURL:store.state.user.baseUrl,
   url: 'crm/couponsRecyclingRest/findRecyclingCoupons',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
 })
}


//撤销优惠券 保存接口
export function saveRevertCoupon(info){
	return fetch({
  	baseURL:store.state.user.baseUrl,
   url: 'crm/couponsRecyclingRest/saveCouponsRecycling',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
 })
}

//发售机构
export function getFindOrgans() {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   url: 'crm/amountAdjustmentContraller/findOrgan',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
  })
}

// 获取电子券列表
export function getCouponList(info) {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   	url: 'crm/couponClassRest/getElectronicCouponsList',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
  })
}
//下发优惠券
export function issueCoupon() {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   	url: '/crm/couponClassRest/issued',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
   
  })
}
/* 删除优惠券*/
export function deleteCoupon(info) {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   	url: '/crm/couponClassRest/deleteCoupon',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
  })
}
/* 同步优惠券*/
export function issueWechart(info) {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   	url: '/crm/couponClassRest/wxSynCoupons',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
  })
}
/* 查询所有菜品*/
export function loadDishTree() {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   	url: '/crm/couponClassRest/listItemInfoTree',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},

  })
}
/* 保存所有菜品*/
export function saveOrUpdateDishCoupon(info) {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   	url: '/crm/couponClassRest/saveOrUpdateCoupon',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
  })
}
/* 查询电子券信息 用于编辑 查看*/

export function getCouponsDetails(info) {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   	url: '/crm/couponClassRest/getCouponsDetails',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data:info
  })
}

/* 获取优惠券的 短信模板*/

export function findSmsTemplate() {
  return fetch({
  	baseURL:store.state.user.baseUrl,
   	url: '/crm/couponClassRest/getSmsContent',
    method: 'post',
    headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session}
  })
}




