<template>
	<zh-tabs :active-name='activeName'  @tab-click='clickTab' type="card"  @tab-remove="closeViewTabs">
		<!--<zh-tab-pane label='首页' name='/home' key='home11'></zh-tab-pane>-->
		<zh-tab-pane :key="tag.name" closable v-for="tag in Array.from(visitedViews)" :label="tag.name" :name="tag.path">
		</zh-tab-pane>		
	</zh-tabs>
</template>

<script>
 	import {ZhTabs,ZhTabPane} from '@/components/tabs/index'
    export default {
  	    components: { ZhTabs ,ZhTabPane},		
		computed: {
			visitedViews() {	
				return this.$store.state.app.views.slice(-100)
			},
			activeName(){
				return this.$store.state.app.activeName;
			}
		},
		methods: {
			clickTab(tab) {	
				localStorage.setItem("activeName",tab.name)
				this.$router.push(tab.name)
				this.$store.state.app.activeName = tab.name;
			},
			closeViewTabs(view, $event) {
				this.$store.dispatch('delViews', view).then((views) => {
					if(this.$store.state.app.activeName === view) {
						const latestView = views.slice(-1)[0]
						if(latestView) {
							localStorage.setItem("activeName",latestView.path)
							this.$store.state.app.activeName = latestView.path;
							this.$router.push(latestView.path)
						} else {
							localStorage.setItem("activeName",'/home')
							this.$store.state.app.activeName = '/home';
							this.$router.push('/')
						}
					}
				})
				//this.$event.preventDefault()
			},
			generateRoute() {
				// $route.matched  路由匹配 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。 
		
				if(this.$route.matched[this.$route.matched.length - 1].name) {
					return this.$route.matched[this.$route.matched.length - 1]
				}
			},
			addViewTabs() {				
				if(this.generateRoute()==undefined||this.generateRoute()=='undefined'){
					this.$store.state.app.activeName = '/home';
					localStorage.setItem("activeName",'/home')
				}
				else{
					this.$store.state.app.activeName = this.generateRoute().path;
					localStorage.setItem("activeName",this.generateRoute().path)
					if(this.generateRoute().path!='/form2/updatepwd'&&this.generateRoute().path!='/form2/updatelogs'){									
						this.$store.dispatch('addViews', this.generateRoute())
					}					
				}				
			},
			isActive(path) {
				return path === this.$route.path
			},
		},
		watch: {
			$route(from,to) {
					this.addViewTabs()
			}
		}
	}
</script>

<style>
	.el-tabs__item {
		padding: 0px 10px;
		height: 28px;
		box-sizing: border-box;
		line-height: 26px;
		display: inline-block;
		margin-bottom: 5px;
		margin-left: 6px;
		font-size: 12px;
		position: relative;		
	}
	
	.el-tabs--card>.el-tabs__header .el-tabs__item {
		background: #FFFFFF;
		color: #34495E;
		border: 1px solid #D8E5EC;
		border-radius: 3px;
		box-shadow: 0 0 6px 0 rgba(33,41,50,0.05);		
	}
	
	.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		background: #0C9AFF;
		color: #FFFFFF;
		border:1px solid #f4f9fc;
		border-radius: 3px
	}
	.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable {
        padding-right: 10px; 
        padding-left: 10px; 
    }
    
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover {
	    padding-right: 10px;
	    padding-left: 10px;
	    background: #0C9AFF;
		color: #FFFFFF;
    }
    .el-tabs__item.is-closable:hover  .el-icon-circle-close{
        color: #FFFFFF;
    }  
	.el-tabs__nav-scroll {
	    margin-left: 17px;
	    overflow: hidden;
	    margin-right: 17px;
	}
	.el-tabs__item:nth-of-type(1){
		margin-left: 17px;	
	}
	.el-tabs__new-tab {
	    border: 1px solid transparent;
	    background: #0C9AFF;
	    float: right;  
	    height: 28px;
	    line-height: 28px;
	    margin-top: 14px;
	    margin-left: 10px;
	    padding: 0px 5px;
	    border-radius: 3px;
	    text-align: center;
	    font-size: 12px;
	    color: #ffffff;
	    cursor: pointer;
	    transition: all .15s;
	}
	.el-icon-circle-close:before {
	    margin-left: 3px;
	    content: "\E60A";
    }  
    .tzx-close{
	    content: "\E60A";
	    color:#D0D9E0;
	}	
</style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        