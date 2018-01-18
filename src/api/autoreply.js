import fetch from '@/utils/fetch'
import store from '@/store'
export function getReply(param) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
//	baseURL:'http://localhost:8180/tzxsaas',
   url: 'weixin/newr/autoReply/getReply',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:param
  })
}
export function saveReply(param) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
//	baseURL:'http://localhost:8180/tzxsaas',
   url: 'weixin/newr/autoReply/saveReply',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:param
  })
}
export function deleteReply(param) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
//	baseURL:'http://localhost:8180/tzxsaas',
   url: 'weixin/newr/autoReply/deleteReply',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:param
  })
}
export function getAutoReplyConfig(param) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
//	baseURL:'http://localhost:8180/tzxsaas',
   url: 'weixin/newr/autoReply/getAutoReplyConfig',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:param
  })
}
export function updateAutoReplyConfig(param) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
//	baseURL:'http://localhost:8180/tzxsaas',
   url: 'weixin/newr/autoReply/updateAutoReplyConfig',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:param
  })
}
export function saveReplyWithKeyword(param) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
//	baseURL:'http://localhost:8180/tzxsaas',
   url: 'weixin/newr/autoReply/saveReplyWithKeyword',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:param
  })
}
export function deleteReplyWithKeyword(param) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
//	baseURL:'http://localhost:8180/tzxsaas',
   url: 'weixin/newr/autoReply/deleteReplyWithKeyword',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:param
  })
}