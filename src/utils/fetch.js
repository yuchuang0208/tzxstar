import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store' // vuex 状态管理
import { getToken, getSession } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
        //baseURL: process.env.BASE_API, // api的base_url
        timeout: 15000 // 请求超时时间
    })
    //service.defaults.headers['content-Type'] = 'application/x-www-form-urlencoded'

// request拦截器
service.interceptors.request.use(config => {


    /*
     if (store.getters.session) {
        config.headers['X-Token'] = getSession()+"sssssssss" // 让每个请求携带自定义token 请根据实际情况自行修改
      }*/
    return config
}, error => {
    // Do something with request error
    /* console.log(error)*/ // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        return response.data;
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        /* const res = response.data
         if (res.code !== 20000) {
           Message({
             message: res.data,
             type: 'error',
             duration: 5 * 1000
           })

           // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
           if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
             MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
               confirmButtonText: '重新登录',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               store.dispatch('FedLogOut').then(() => {
                 location.reload()// 为了重新实例化vue-router对象 避免bug
               })
             })
           }
           return Promise.reject('error')
         } else {
           return response.data
         }*/
    },
    error => {
// if(error.message=='Network Error'){
//   	var url = "http://test.e7e6.net/crm/home/main2";
//       window.location.href = 'http://sso.meishijia.com/login?service=' + url;
//    }
//   else{
//    	return Promise.reject(error)
//      }
 return Promise.reject(error)
    }
)

export default service