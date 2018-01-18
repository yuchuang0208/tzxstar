import fetch from '@/utils/fetch'
import store from '@/store'
export function getsysParamer(userInfo) {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'hq/SysDictionaryController/find',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}

export function getCities(userInfo) {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'framework/organContraller/getRegionalismTree',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
export function getProsAndCity(userInfo) {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'framework/provincesAndCitiesController/getProvincesAndCitiesTree',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
export function getMemberLevel(userInfo) {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'crm/memberUpgradeContraller/getMemberShipLevel',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
