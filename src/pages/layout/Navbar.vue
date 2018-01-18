<template>
	<el-menu class="navbar" mode="horizontal" :style="{display:display}"> 
  	<tabs-view class='tab-vieww'></tabs-view>
		<!-- 旧版关闭和刷新
		<div class="avatar-container" style="display:none">
				<button   :class="views?'button':'button-disabled'"    ref='closeAll' :disabled="views?false:true" @click="closeAll"> 关闭所有</button>
			<button class="button" @mouseleave="leaveLoading"  @click='refresh'>
				<icon-svg :icon-class="loadingicon"  />
				刷新
			</button>
		</div>
		-->
		<div class="more">
				<i class="el-icon-more"></i>
		</div>

		<!-- 操作项 -->
		<el-popover
			ref="popover"
			placement="bottom"
			trigger="click"
			v-model="close">
				<div class="avatar-container-more" >
					<div class="operation views?'button':'button-disabled'" ref='closeAll' :disabled="views?false:true" @click="closeAll">
						<icon-svg icon-class="close"  />
						<span>关闭所有</span>
					</div>
					<div class="operation button"  @click='refresh'>
						<icon-svg :icon-class="loadingicon"  />
						<span>刷新</span>
					</div>
				</div>
				<div  slot="reference" class="more" >
					<i class="el-icon-more"></i>
				</div>
	</el-popover>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import Hamburger from '@/components/Hamburger'
import TabsView from './TabViews'
import Assist from '@/utils/assist';

export default {
  components: {
    Levelbar,
    Hamburger,
    TabsView
  },
  data(){
  	return{
  		display:'none',
  		count:0,
  		loadingicon:'update',
		close:false
  	}
  },
  computed: { 
  		views() {	 		 		
        this.count++
  	 		if((this.$route.name==undefined&& this.$route.path=='/home')||(this.$store.state.app.views.length==0&&this.count==101)||this.$store.state.app.activeName==='/form2/updatepwd'||this.$store.state.app.activeName==='/form2/updatelogs'||this.$store.state.app.activeName=='/home'){
  	 		  	this.display = 'none' 	 		  	
  	 		  }	
		    else{
		  	    this.display = 'block' 			  	
		    }
		    if(this.$store.state.app.views.length>0){
		    	return true
		    }
		    else{
		    	return false
		    }
  		} 		
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()  // 为了重新实例化vue-router对象 避免bug
      })
    },
    closeAll(){
		this.close=false;
    	this.$router.push('/home');
    	this.$store.state.app.activeName = '/home';
    	this.$store.dispatch('delAllViews');
    	
    },
    refresh(){
    	let _s = Assist.GetPageArguments();
					this.$store.dispatch('setSession', _s).then(() => {
							
					}).catch(() => {
		            
		             });
    	this.$router.go(0);   
    },
    FirstshowOrHide(){
    	this.count = 100
	     if(this.$store.state.app.views.length>0){ 	
	 		   	this.display = 'block'
 		   }
 		   else{		  
 		   		this.display = 'none'
 		   }
    },
  
  }, 
 	created() {
 		   this.FirstshowOrHide();		
 	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {   	  
       		 height: 30px;
		    line-height: 30px;
		    background: #f6fafd;
		    border-radius: 0px !important;	    
        .hamburger-container {
            line-height: 30px;
            height: 30px;
            float: left;
            padding: 0 10px;
        }
  
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
       .avatar-container {
       	  margin-left: 85%;
       	  transition: margin-right .6s;
       	  /*margin-right: 15px;*/
					height: 30px;
					display: inline-block;
					position: absolute;
					right: 1px;
    			top: 3.5px;
    		  .cloasell{
    		  	background:#f6fafd;
    		  }	
			}
			.tab-vieww{
				width:87%;
			}
			.fl{
				float: left;
			}
			.Imgsize{
				width: 40px;height: 40px;
			}
			.button{
				padding: 0px 10px;
				height: 28px;
				box-sizing: border-box;
				line-height: 24px;
				display: inline-block;
				margin-left: 1px;
				font-size: 12px;
				position: relative;
				background: #FFFFFF;
				color: #34495E;
				border: 1px solid #D8E5EC;
				border-radius: 3px;
				box-shadow: 0 0 6px 0 rgba(33,41,50,0.05);			
			}
			.button:hover{
				cursor:pointer;
				background: #0C9AFF;
        color: #FFFFFF;
			}
			.button-disabled{
				padding: 0px 10px;
				height: 28px;
				box-sizing: border-box;
				line-height: 24px;
				display: inline-block;
				margin-left: 1px;
				font-size: 12px;
				position: relative;	
				background: #F3F6F8;	
				color: #CACDCF;
				border-radius: 3px;				
			  border: 1px solid #E9EFF3;		 
			}
			
      
		}

/*-----面包屑NEW-----*/
.navbar{
    height: 36px;
    margin-bottom: 14px;
}
.navbar .tab-vieww{
	width: auto;
	padding-right: 36px;
	height: 36px;
	background: #ffffff;
}
.el-tabs__header{
	margin: 0;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
	background: none;
	border: none;
	height: 36px;
	line-height: 36px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
	box-shadow: none;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover{
	color: #34495e;
}

</style>

