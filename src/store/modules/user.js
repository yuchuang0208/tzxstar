import { login, updatePass,logout, getInfo } from '@/api/login'
import { getToken,getSession, setToken,setSession,setTenancyId,getTenancyId, removeToken } from '@/utils/auth'
import Assist from '@/utils/assist'
import { Message } from 'element-ui';
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    session:getSession(),
    tenancyid:'',
    employeeid:'',
    screenPageSize:10,
    baseUrl:process.env.NODE_ENV == 'development' ? '../../../api' : '/',
    uploadurl:'',
  },

  mutations: {
  	SET_SESSION: (state,session) => {
  		state.session = session
  	},
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TENANTID:(state,tenancyid) => {
    	state.tenancyid = tenancyid
    },
    SET_EMPLOYEEID:(state,employeeid) =>{
    	state.employeeid = employeeid
    },
    SET_SCREENPAGESIZE:(state,screenPageSize) =>{
    	state.screenPageSize = screenPageSize
    },
    SET_UPLOADURL:(state,uploadurl)=>{
    	state.uploadurl = uploadurl
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {

      const session = Assist.GetPageArguments()
          setToken('admin')
          setSession(session);
          commit('SET_TOKEN', 'admin')
          commit('SET_SESSION', session)
    },
    UpdatePass({commit},userInfo){
    	 return new Promise((resolve, reject) => {
        updatePass(userInfo).then(response => {
   				if(response.success==true){
   					 commit('SET_EMPLOYEEID','')
		         commit('SET_TENANTID','')
		         commit('SET_NAME','')
		         commit('SET_SESSION','')
							setTenancyId('');
		         Message({
		          showClose: true,
		          message: '密码修改成功!请牢记',
		          type: 'success'
		        });
   				}
   				else{
   					 Message.error(response.msg);
   				}
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetBasic({ commit },basic){
    	    setSession(basic.session);
    	    commit('SET_EMPLOYEEID',basic.employeeid);
    	    commit('SET_NAME',basic.name);
    	    commit('SET_TENANTID',basic.tenancyid);
          commit('SET_SESSION', basic.session)
          commit('SET_UPLOADURL',basic.uploadurl)
          setTenancyId(basic.tenancyid);
    },
     SetScreenPageSize({ commit },basic){
          commit('SET_SCREENPAGESIZE', basic.screenPageSize)
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
    	commit('SET_ROLES', ['admin'])
    	/*
      return new Promise((resolve, reject) => {

        	getInfo(state.token).then(response => {

         console.log(JSON.stringify(response.data));
          commit('SET_ROLES', response.data)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    */},

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
