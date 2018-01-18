import fetch from '@/utils/fetch'
import store from '@/store'

export function findPicList(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/materialmanage/findPicList',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
export function getMaterialMsgPicList(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/materialmanage/getMaterialMsgPicList',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
export function sendGroupMessage(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/messagesend/sendGroupMessage',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
export function sendedList(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/messagesend/sendedList',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
export function findUserGruop(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/messagesend/findUserGruop',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}


