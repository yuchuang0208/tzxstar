import fetch from '@/utils/fetch'
import store from '@/store'
export function login(username, password) {
  return fetch({
  	baseURL: process.env.BASE_API,
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

/*export function getInfo(token,username) {
  return fetch({
  	baseURL: '../../../',
    url: '/crm/home/loadcrm',
    method: 'get',
    params: {'_s':token,'username':'admin'}
  })
}*/
export function getInfo(token) {
  return fetch({
  	baseURL: process.env.BASE_API,
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
export function logout() {
  return fetch({
  	baseURL: process.env.BASE_API,
    url: '/user/logout',
    method: 'post'
  })
}

export function updatePass(userInfo){
	return fetch({
  	baseURL: store.state.user.baseUrl,
    url: 'framework/employeeContraller/updatePassWord',
    method: 'post',
   	headers:{'content-Type':'application/x-www-form-urlencoded'},
    params: {"_s":store.state.user.session},
    data: userInfo  
  })
}
