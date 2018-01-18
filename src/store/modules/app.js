import Cookies from 'js-cookie'
import { getTabViews,getActiveName } from '@/utils/auth'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: [],
    views:(getTabViews()==null||getTabViews().length==0||getTabViews()==[]||getTabViews()=='[]')?[]:JSON.parse(getTabViews()),
  
    activeName:getActiveName()==null?'/home':getActiveName(),
    session:''
  },
  mutations: {
  	
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VIEWS:(state, view) => { 
    	/*console.log(state.views)*/
      if(state.views.length==0||state.views==[]||state.views=='[]'){
      	
      }
      else if (state.views.some(v => v.path === view.path)) {return}     
			let view_add = getTabViews()==null?(new Array()):JSON.parse(getTabViews());  
      view_add.push({ name: view.name, path: view.path });
      state.views = view_add;
      localStorage.setItem("tab-views",JSON.stringify(view_add));
    },
    DELETE_VIEWS:(state, view) => {
      let index
      for (const [i, v] of state.views.entries()) {
        if (v.path === view) {
          index = i
          break
        }
      }               
      let view_delete = JSON.parse(getTabViews());
      view_delete.splice(index, 1);
      state.views = view_delete;
      localStorage.setItem("tab-views",JSON.stringify(view_delete));  
    },
    DEL_ALL_VIEWS:(state) =>{
    	const length = state.views.length;
    	state.views.splice(0, length);
			localStorage.clear();
    },
    SET_SESSION:(state,session)=>{
    	/*console.log("session"+session);*/
    	state.session = session;
    }
    ,
    SET_BASEURL:(state,baseUrl)=>{
    	/*console.log("session"+session);*/
    	state.baseUrl = baseUrl;
    }
  },
  actions: {
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    addViews({ commit }, view) {
    	
      commit('ADD_VIEWS', view)
    },
    delViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DELETE_VIEWS', view)
        resolve([...state.views])
      })
    },
    delAllViews({ commit }){
    	 commit('DEL_ALL_VIEWS');
    },
    setSession({commit},session){
    	 commit('SET_SESSION', session)
    },
    setBaseUrl({commit},baseUrl){
    	 commit('SET_BASEURL', baseUrl)
    }
  }
}
export default app
