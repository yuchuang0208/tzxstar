<template>
	<div class="page-changelog content">
		<span><em>更新日志</em></span>
		<ul class="timeline"   v-loading.body="loading">
		  	<li v-for='log in logslist'>
		  		<h3>{{log.notice_title}}</h3>
		  	    <p><em>{{log.last_updatetime}}</em></p>
		  		<ol>
		  			<li v-for='loginfo in log.notice_info'><em>{{loginfo}}</em></li>
		  			
		  		</ol>
			</li>
			
		</ul>
	</div>
</template>

<script>
	import {getLogsInfo} from '@/api/home'
    import Assist from '@/utils/assist';
    import axios from "axios";
	export default{
		data(){
			return {
				logslist:[],
				loading:true
					
			   }
		},
		methods:{
			getLogsInfo(){
				_czc.push(["_trackEvent", "查看日志", "打开"]);//统计流量
	    		getLogsInfo().then((response) => {
	    			this.logslist =  response.data
					this.logslist.map((log)=>{
				  	  log.last_updatetime = log.last_updatetime.substring(0,10);
				  	  log.notice_info = log.notice_info.split("\r\n");
			  		});
			  		this.loading = false;
				}).catch((log)=>{
					this.$message({
			          showClose: true,
			          message: '网络异常',
			          type: 'error'
			        });
			        this.loading = false;
				})
				
				/*axios.get('http://localhost:9280/static/rizhi.json').then((response) => {
					this.logslist =  response.data.data;
					this.logslist.map((log)=>{
				  	  log.last_updatetime = log.last_updatetime.substring(0,10);
				  	  log.notice_info = log.notice_info.split("\r\n");
			  		});
				})*/
			}			
		},
		created(){
			_czc.push(["_trackEvent", "更新日志", "点击"]);//埋点统计
			this.getLogsInfo();
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	
 .page-changelog{
 	height:auto;
 	margin-top:10px;
 	margin-left:15px;
 	background: #FEFEFE;
	border: 1px solid #EAF1F6;
 }
 .page-changelog span{
 	height: 51px;
    line-height: 51px;
    display: block;
    border-bottom: 1px solid #eaf1f6;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 16px;
    font-style: normal;
    color: #34495E;
 }
 
 .page-changelog span em{
 	margin-left: 10px;
 	font-style:normal;
 }
.page-component .content {
	margin-left: -1px;
}
.page-changelog {
	padding-bottom: 100px; 
}

.page-changelog .timeline:before {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 10px;
    background-color: #eaeefa;
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

.page-changelog .timeline {
    margin: 30px 0 0 60px;
    padding-left: 15px;
    position: relative;
    color: #5e6d82;
}

.page-changelog .timeline h3 {
    margin: 0 0 10px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #34495E;
    letter-spacing: 0;
    line-height: 16px;
    font-weight: normal;
}
.page-changelog .timeline>li{
	list-style: none;
}
.page-changelog .timeline h3:before {
    content: "";
    display: block;
    position: absolute;
    left: -5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid #20a0ff;
    box-sizing: border-box;
}
.timeline ol li{
	list-style-type: none;
    font-size: 2px;
    font-family: PingFangSC-Regular;
    color: #34495E;
    letter-spacing: 0;
    line-height: 22px;
    padding-left: 4px;
    /* margin-left: 20px; */
    background: #ffffff url(../../assets/Oval.png) no-repeat 0 center;
}
.timeline ol li em{
	font-size: 14px;
	font-style: normal;
}
.timeline ol{
	margin-left: -20px;
	margin-bottom:30px;
}
.timeline p{
	width: 90px;
    background: #f7f9fb;
    border: 1px solid #e4ecf1;
    border-radius: 3px;
    /* height: 21px; */
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9AABB8;
    letter-spacing: 0;
    /* line-height: 12px; */
}
.timeline p em{
	    font-style: normal;
    font-size: 14px;
    margin-left: 8px;
    font-size: 12px;
    /* vertical-align: middle; */
    height: 23px;
    line-height: 23px;
    /* background: red; */
}
	
</style>