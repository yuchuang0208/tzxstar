import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken,getSession } from '@/utils/auth' // 验权
import Assist from '@/utils/assist';
import {getUserMessage} from '@/api/home'
import { MessageBox} from 'element-ui';
const whiteList = ['/login']
	function setBasic(_s){
		 return new Promise((resolve, reject) => {
		    getUserMessage(_s).then((response) => {
						let name = response.name;
						let tenentid = response.tenentid;
						let employeeid = response.employeeId;
						let basic = {'name':this.name,'tenancyid':this.tenentid,'session':_s,'employeeid':employeeid};

					       store.dispatch('SetBasic', basic).then(() => {
			           	/*console.log('set成功');*/
			           })
					}).catch(()=>{

					})
			resolve();
		  });
}



router.beforeEach((to, from, next) => {
  let _s = Assist.GetPageArguments();
   NProgress.start();

 if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {

        })
          store.dispatch('GenerateRoutes', ['admin']).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to })
          })

      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
