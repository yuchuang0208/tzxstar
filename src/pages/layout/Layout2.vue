<template>
	<div>  
		<div class='app-header'> 
			<app-header></app-header>
		</div>
		<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		    <div class="sidebar-wrapper" :style="{top:top+'px'}">
		      <sidebar class="sidebar-container"></sidebar>
		    </div>
		    <div class="main-container">
		      <app-main></app-main>
		    </div>
	  	</div>
	  	
	  	<div >
			<web-footer></web-footer>
		</div>
		<!--返回顶部导航 start-->      
    	<transition name="el-fade-in-linear">
	      	<div class="backtop transition-box" v-show="backtop">
				<a href="javascript:window.scrollTo( 0, 0 );" >
					<img src="../../assets/backtop.png" />
				</a>
			</div>
        </transition>
        <!--返回顶部导航 end-->    
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain,AppHeader,WebFooter } from '@/pages/layout'

export default {
  name: 'layout2',
  data(){
  	return {
  		top:57,
  		backtop:false
  	}
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    AppHeader,
    WebFooter
  },
  methods: {
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width
      const offsetTop = this.$el.getBoundingClientRect().top;
  	  if(offsetTop<-57){
  	  	this.top = 0
  	  }
  	  else{
  	  	this.top = 57-parseInt(offsetTop) ;
  	  }
  	  //判断当前窗口是否超过第一屏，超过第一屏则显示返回顶部图标
  	  this.backtop = window.scrollY > 0;
    }
  },
   mounted() {
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    @import "src/styles/mixin.scss";
    .app-header{
			height: 57px;
			line-height:57px;
			color:#FFFFFF;
			text-align: center;
			font-size:16px;
			box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.14);
			background: -webkit-linear-gradient(left, #0C9AFF, #00DAD9);
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(right, #0C9AFF, #00DAD9);
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(right, #0C9AFF, #00DAD9);
			/* Firefox 3.6 - 15 */
			background: linear-gradient(to right, #0C9AFF, #00DAD9);
    }
    
    .app-wrapper {
        @include clearfix;
        position: relative;
       /* width: 95%; */
        margin:0 auto;
        background: #F4F9FC;  
         overflow: hidden;    
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-container {
                margin-left: 40px;
            }
        }
         .sidebar-header{
        	height:130px;
        }
        .sidebar-wrapper {
            width: 160px;
           /* position: fixed;*/
            top: 57px;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow: hidden;
            transition: all .28s ease-out;
        }
        .sidebar-container {
            transition: all .28s ease-out;
		    position: absolute;
		    top: 0;
		    bottom: 0;
		    left: 0;
		    right: -17px;
		    overflow-y: hidden;
		    width: 160px;
        }
        .main-container {
           	min-height: 100%;
		   /* width: 95%;*/
		    transition: all .28s ease-out;
		    margin-left: 160px;
        }
    }
    .backtop{
	    position: fixed;
	    bottom: 60px;
	    right: 20px;
	    z-index:999999;
    }
    .el-menu-item, .el-submenu__title{
		line-height:30px;
	}
    .el-tabs__header {
	    border-bottom: none !important; 
	    padding: 0;
	    position: relative;
	    margin: 7px 0 5px 0px;
	}
	.el-tabs__nav-next, .el-tabs__nav-prev {
	    position: absolute;
	    cursor: pointer;
	    line-height: 28px;
	    font-size: 12px;
	    color: #ffffff;
	    background: #0C9AFF;
	    padding: 0 5;
	    padding: 0px 5px;
	    height: 28px;
	    margin-top: 0px !important; 
	    border-radius: 3px;
	    border: 1px solid transparent;
	}
	.navbar .tab-vieww{
	    /* width: 1000px; */
	    width: 80%;
	}
 
</style>
