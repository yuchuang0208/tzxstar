import fetch from '@/utils/fetch'
import store from '@/store'

/**
 * 说明：data(时间筛选字段),data1(关键词显示与隐藏),data2(是否收藏),data3(查询内容)
 */
export function getAllMessageList(userInfo) {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/newsmessagereply/getAllMessageList',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}

/*****用户基本信息展现与隐藏****/
export function getFansInfo(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/newsmessagereply/getFansInfo',
    method: 'post',
    dataType: 'json',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}

/****给对应用户回复消息****/
export function replyMsgToFans(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/newsmessagereply/replyMsgToFans',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
//收藏与取消收藏
export function addMsgForCollection(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/newsmessagereply/addMsgForCollection',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}

//快捷回复
export function replyTimeExpired(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/newr/newsmessagereply/replyTimeExpired',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}

export function getFeedbackList(userInfo) {
  return fetch({
  	 baseURL: store.state.user.baseUrl,
    url: 'weixin/leaveMessage/getFeedbackList',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
//反馈采纳接口
export function updateLeaveMessage(userInfo) {
  return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'weixin/leaveMessage/updateLeaveMessage',
    method: 'post',
    params: {"_s":store.state.user.session},
    data:userInfo
  })
}
