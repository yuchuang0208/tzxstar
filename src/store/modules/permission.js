import { asyncRouterMap, constantRouterMap } from '@/router'
import { getUserRoles } from  '@/api/home'



/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}


/*function hasPermission1(roles, route) {
  if (route.children && route.children.length) {
    return true
  } else {
    return roles.some(role => role.module_link_url.indexOf(route.path) >= 0)
  }
}*/
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}


function isContain(obj,arrs){
	return arrs.filter(item=>item.path==obj.path).length>0
}

function isModule(item,arrs){
	return arrs.filter(mode=>mode.modulLevel=="2"&& mode.modulName == item.name).length==0 
}
function isModuleChild(obj,arrs){
	return obj && arrs.filter(mode=>mode.modulLevel=="3" && obj.path.indexOf(mode.modulIdLinkUrl)!= -1 ).length>0
}

function filterUserRoles(array1,array2){
	 array2.map(item=>{
		if (item.children && item.children.length) {			
            if(isModule(item,array1)){
            	item.hidden = true;
            }
        	item.children.map(obj=>{       	
        		if(isModuleChild(obj,array1)){	
        			obj.hidden = true;
        		}
        	})
        }	
	})

	return array2
}

/*function filterAsyncRouter1(asyncRouterMap, roles) {
	
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission1(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter1(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}*/

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject)  => {
//     	commit('SET_ROUTERS', asyncRouterMap)    
//        getUserRoles().then(response=>{
//        	if(response.success){
//      	    commit('SET_ROUTERS', filterUserRoles(response.data,asyncRouterMap))       	
//        	}
//    		resolve()
//        }).catch(e=>{
//        	reject(e)
//        })
		 commit('SET_ROUTERS', asyncRouterMap)  
		resolve()
      })
    }
  }
}

export default permission
