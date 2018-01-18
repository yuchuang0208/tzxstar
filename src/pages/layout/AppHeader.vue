<template>
	<el-row >
	  <el-col :span="21">
	  	<div class='header-title'>
	  		<div class='header-title-left'>
	  			<span class='logo'><router-link to='/home'>e<b>惠客</b></router-link></span>
				<span class='split'>|</span>
		    	<span class='title-text'>{{usermessage.tenentid}}</span>
	    		<el-popover ref="popovera" placement="bottom-start" popper-class = "proclassli" >
			        <div class='proclasslibody'>
				  	    <li v-for='(brand,index) in usermessage.brands' @click='selectBrand(brand)' :key='index' >{{brand.orgFullName}}</li>
				  	</div>
				</el-popover>
		    	<span  v-popover:popovera style='margin-left: 10px;'>
		    		<li<span class='brandspan'>{{defaultBrand.orgFullName}}</span><icon-svg style='font-size:8px;margin-left:2px;color:#FFFFFF;opacity: 0.6;' :icon-class="dropdownicon" />	</li>
				</span>
	  		</div>
	  		<div class='header-title-right'>
	  			<span class='title-text shouye'>
	  				<router-link to='/home'>首页</router-link>
	  			</span>
        		<span class='title-text uplog'>
        			<router-link to='/form2/updatelogs'>更新日志</router-link>
        		</span>
        		<span class='split'>|</span>

        		<el-popover
					ref="popover"
					placement="bottom-end"
					popper-class = "proclass"
					>
				  	<div class='probody'>
				  		<div style='float:left;margin-top: 14px;'>
				  			<icon-svg icon-class = 'head' style='height: 60px;width: 60px;'></icon-svg>
				  		</div>
					  	<div style='float:left;margin-left: 20px;'>
				  		    <li><span class='span1'>{{usermessage.name}}</span></li>
					  	    <li><span class='span2'>{{usermessage.roleName}}</span></li>
					  	    <li><span class='span3'>交易短信剩余<b>{{usermessage.jyNum?usermessage.jyNum:0}}</b>条</span></li>
					  	    <li><span class='span4'>营销短信剩余<b>{{usermessage.yxNum}}</b>条</span></li>
					  	</div>
					  	<div style='float:right;margin-right: 16px;margin-top: 66px;'>
				  		    <li><span class='span5'></span></li>
					  	</div>
				  	</div>
				    <div class='profoot'>
					    <el-button size="mini" icon='back' @click='handleCommand("backtohome")' >返回引导页</el-button>
					    <el-button icon='xiugaimima' size="mini" @click='handleCommand("updatepwd")'>修改密码</el-button>
					    <el-button  icon = 'tuichuxitong-weixuan' size="mini" @click='handleCommand("layout")'>退出系统</el-button>
				    </div>
				</el-popover>

				<span  v-popover:popover>
					<icon-svg icon-class="user" style='font-size:16px;margin-right:7px' />
						{{usermessage.name}}
					<icon-svg style='font-size:8px;margin-left:2px;color:#FFFFFF;opacity: 0.6;' :icon-class="dropdownicon"  />
				</span>
				<!--<el-button v-popover:popover5>删除</el-button>-->

        		<!--<el-dropdown trigger="click"  @command="handleCommand" @visible-change='visibleChange'>
						  <div class="el-dropdown-link">
						  		<i class="iconfont icon-my-wode"></i>
						  		<icon-svg icon-class="user" style='font-size:16px;margin-right:7px'/>{{name}}<icon-svg style='font-size:8px;margin-left:2px;color:#FFFFFF;opacity: 0.6;' :icon-class="dropdownicon" />
						  </div>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item command='backtohome' class='dropdown_menu'><span >返回引导页</span></el-dropdown-item>
						    <el-dropdown-item command='updatepwd' class='dropdown_menu'><span>修改密码</span></el-dropdown-item>
						    <el-dropdown-item command='layout' class='dropdown_menu'><span>退出登录</span></el-dropdown-item>

						  </el-dropdown-menu>
				</el-dropdown>-->
				<img v-if="isextend" src="../../assets/quanping.svg" @click="quanping">
        		<img  v-else src="../../assets/noquanping.svg" @click="noquanping" />
	  		</div>
	 	</div>
	  </el-col>

    </el-row>
</template>

<script>
	import {getUserMessage} from '@/api/home'
	import Assist from '@/utils/assist';
	import axios from 'axios'
	import config from 'config/index'
	export default {
	  	name: 'AppHeader',
		computed: {},
		data(){
			return{
				dropdownicon:'down',
				usermessage:'',
				isextend:true,
				visible2:false,
				defaultBrand:{}

			}
		},
		methods:{
			quanping:function(){//全屏

				this.isextend = !this.isextend;
				let availWidth = window.screen.availWidth;
				let headWidth = availWidth-20*2;
				let app_wrapper = availWidth-15;
				//计算当前屏幕的宽度 -160px-15px
				let app_main = availWidth-160-15-17-15;
			    let line_width = (app_main-130)/2;
				//计算当前屏幕的宽度 -160px-15px
				/*let width = availWidth - 160-15 -17-15;*/
				//改变宽度
				document.getElementsByClassName("app-header")[0]?(document.getElementsByClassName("app-header")[0].getElementsByClassName("el-row")[0] ? document.getElementsByClassName("app-header")[0].getElementsByClassName("el-row")[0].style.width=headWidth+"px" :''):'';
				document.getElementsByClassName("app-wrapper")[0] ? document.getElementsByClassName("app-wrapper")[0].style.width=app_wrapper+"px" : '';
				document.getElementsByClassName("app-main")[0] ? document.getElementsByClassName("app-main")[0].style.width=app_main+"px" : '';
				document.getElementsByClassName("Zcen_nr")[0] ? document.getElementsByClassName("Zcen_nr")[0].style.width=app_main+"px" : '';
				document.getElementsByClassName("fot_cen")[0] ? document.getElementsByClassName("fot_cen")[0].style.width=headWidth+"px" : '';
				document.getElementsByClassName("mybox")[0] ? document.getElementsByClassName("mybox")[0].style.width=headWidth+"px" : '' ;
				document.getElementsByClassName("avatar-container")[0] ?  document.getElementsByClassName("avatar-container")[0].style.marginRight="15px" : '';
				/*document.getElementsByClassName("app-header")[0].getElementsByClassName("el-row")[0].css("width","1500px");*/
			    document.getElementsByClassName("Zcen_nr")[0]?(document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("right_nr")[0] ?  document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("right_nr")[0].style.width=app_main+"px" : ''):'';
				document.getElementsByClassName("Zcen_nr")[0]?(document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("safety_class")[0] ?  document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("safety_class")[0].style.width=app_main+"px" : ''):'';
				document.getElementsByClassName("circle-show")[0]?(document.getElementsByClassName("circle-show")[0].getElementsByClassName("circle-line")[0]?document.getElementsByClassName("circle-show")[0].getElementsByClassName("circle-line")[0].style.width = line_width +"px" :''):'';
			},
			selectBrand(brand){
				this.defaultBrand = brand;
			},
			noquanping:function(){//no全屏
				this.isextend = !this.isextend;
				//改变宽度 最小默认宽度1275px

				document.getElementsByClassName("app-main")[0] ? document.getElementsByClassName("app-main")[0].style.width="1110px" : '';
				document.getElementsByClassName("app-header")[0].getElementsByClassName("el-row")[0] ? document.getElementsByClassName("app-header")[0].getElementsByClassName("el-row")[0].style.width="1275px" :'';
				document.getElementsByClassName("app-wrapper")[0] ? document.getElementsByClassName("app-wrapper")[0].style.width="1275px" : '';
				document.getElementsByClassName("Zcen_nr")[0] ? document.getElementsByClassName("Zcen_nr")[0].style.width="1275px" : '';
				document.getElementsByClassName("Zcen_nr")[0]?(document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("right_nr")[0] ? document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("right_nr")[0].style.width="1102px" : ''):'';
				document.getElementsByClassName("Zcen_nr")[0]?(document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("safety_class")[0] ? document.getElementsByClassName("Zcen_nr")[0].getElementsByClassName("safety_class")[0].style.width="1102px" : ''):'';
				document.getElementsByClassName("fot_cen")[0] ? document.getElementsByClassName("fot_cen")[0].style.width="1275px" : '';
				document.getElementsByClassName("mybox")[0] ? document.getElementsByClassName("mybox")[0].style.width="1275px" : '';
				document.getElementsByClassName("avatar-container")[0] ? document.getElementsByClassName("avatar-container")[0].style.marginRight="0px" :'';
				//document.getElementsByClassName("Zcen_nr")[0] ? document.getElementsByClassName("Zcen_nr")[0].style.marginLeft="15px" : '';
				document.getElementsByClassName("circle-show")[0]?(document.getElementsByClassName("circle-show")[0].getElementsByClassName("circle-line")[0]?document.getElementsByClassName("circle-show")[0].getElementsByClassName("circle-line")[0].style.width = "485px" :''):'';
				//获取当前标签页路径
    			       //document.location.reload();
			},
			handleCommand(command){
				if(command == 'backtohome'){
					this.backtohome();
				}
				else if(command == 'updatepwd'){

					this.$router.push('/form2/updatepwd');
				}
				else{
					this.layout();
				}
			},
			visibleChange(show){
				if(show){
					this.dropdownicon = 'up'
				}
				else{
					this.dropdownicon = 'down'
				}
			},
			 backtohome() {
			 	let _s = Assist.GetPageArguments();
		        this.$confirm('您确定要返回引导页吗, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            localStorage.clear();
		        	window.open('../../../pages/framework/layout/main.jsp?_s='+_s,'_self')
		        })
		     },
		     layout(){
		     	this.$confirm('您确定要返回登陆页吗, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	localStorage.clear();
		        	window.open('../../../login.jsp','_self')

		        })
		     },
		     getUserMessage(){
		    	let _s = process.env.NODE_ENV == 'development' ? 'dev' : Assist.GetPageArguments();
	     		getUserMessage(_s).then((response) => {
	     				this.usermessage = response;
	     				this.defaultBrand = response.brands.filter(item=>item.id == parseInt(response.defaultBrand))[0];
						let employeeid = response.employee_id;
						let uploadurl = response.upload_img_ip;
						let basic = {'name':response.name,'tenancyid':response.tenentid,'session':_s,'employeeid':employeeid,'uploadurl':uploadurl};
					    this.$store.dispatch('SetBasic', basic).then(() => {
			            })

				}).catch(e=>{

				})
		     },
		     getPageScreen(){
		     	let screenPageSize =  window.screen.height>800 ? 20:10
		        let basic = {screenPageSize:screenPageSize}
		        this.$store.dispatch('SetScreenPageSize', basic);
		     }


		},
		created(){
			this.getUserMessage();
			this.getPageScreen();
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.header-title{
		position: relative;
		/*line-height: 53px;*/
		color: #FFFFFF;
	}
	.header-title-left{
			float:left;
	}
	.header-title-left span{
		display:block;
		float:left;
	}
	.header-title-left .split{
		opacity: 0.5;
	}

	.header-title-right{
		float:right;
	}
	.brandspan{
		height: 24px;
	    line-height: 24px;
	    border: 1px;
	    font-size: 12px;
	    margin-top: 16px;
	    padding-left: 16px;
	    padding-right: 16px;
	    border-radius: 12px;
	    background: #38ACFF;
	}
	.logo{
		font-size:22px;
		margin-right: 10px;
	}
	.logo a{
		font-size: 22px;
		color: #FFFFFF;
	}
	.logo a b{
		font-size: 22px;
		color: #FFFFFF;
	}
	.title-text{
		color:#ffffff;
		font-size: 14px;
		letter-spacing: 0;
	}
	.split{
		margin-left: 6px;
		margin-right: 15px;
		opacity: 0.5;
	}
	.el-dropdown {
	    color: #FFFFFF;
	    font-size: 14px;
	}
	.el-col-21 {
	    width: 100%;
	}
	.shouye{
		margin-right: 20px;
	}
	.uplog{
		margin-right:20px;
	}
	.el-icon--right{
		font-size: 12px;
		margin-left: 2px;
	}
	.font1{
		font-size: 12px;
	}
	.dropdown_menu{
		font-size:14px;
		text-align: center;

	}
	.dropdown_menu :hover{
		color:rgba(12,154,255,1);
		text-decoration: underline;
		text-decoration-color:rgba(12,154,255,1) ;

	}
	.header-title-right img{
		margin-top: 19px;
    	display: block;
	    width: 16px;
	    height: 16px;
	    float: right;
	    margin-left: 20px;
	    cursor:pointer;
	}
	.header-title-right .split{
		margin-left: 0px;
	    margin-right: 20px;
	    opacity: 0.5;
	}
	.header-title-right span a{
		color: #FFFFFF;
	}
	.proclass{
		height:160px;
		background: #FFFFFF;
		border: 1px solid #E8EFF4;
		box-shadow: 0 0 8px 0 rgba(37,57,80,0.06);
		border-radius: 6px;
	}
	.proclassli{

		background: #FFFFFF;
		border: 1px solid #D8E5EC;
		box-shadow: 0 4px 4px 0 rgba(0,0,0,0.05);
		border-radius: 4px;
		margin-bottom: 10px;
	}
	.proclasslibody{
		margin-bottom: 10px;
		margin-top: 10px;
		width: 170px;
		li{
			display: block;
			height: 34px;
			line-height: 34px;
			color: #34495E;
			padding-left: 14px;
			font-size:14px;
			&:hover{
				background: #F2F6FB;
				color: #0C9AFF;
				cursor: pointer;
			}
		}
	}
	.probody{
		margin-top: 20px;
		margin-left: 30px;
		height: 100px;
		li{
			height: 22px;
			line-height: 22px;
			.span1{
				font-size: 14px;
				color: #34495E;
			}
			.span2{
				font-size: 12px;
				color: #758896;
			}
			.span3{
				font-size: 12px;
				color: #34495E;
				b{
					font-size: 12px;
					color: #FF7171;
				}
			}
			.span4{
				font-size: 12px;
				color: #34495E;
				b{
					font-size: 12px;
					color: #FF7171;
				}
			}
			.span5{
				cursor: pointer;
				font-size: 12px;
				color: #0C9AFF;
			}
		}
	}
	.profoot{
		margin-left: 16px;
		margin-right: 16px;
		margin-bottom: 20px;
	}

</style>
