<template>
	<div class='appclass'>
		<div class="app-container calendar-list-container" >
			<div class="titline" style="height:42px;">
				<h1 class="topbox">消息管理</h1>
				<div class="fr searchR">
					<el-input placeholder="请输入消息内容" icon="search" v-model="getAllListParams.searchName" :on-icon-click="handleIconClick" style="width: 240px;"></el-input>
				</div>
			</div>
			<!------正文----->
            <div style="">
            	<el-tabs v-model="activeName" @tab-click="handleTabClick">
					<el-tab-pane label="全部消息" name="first" >
						<div class="remind">
							<i class="el-icon-warning"></i> <span>文字信息保存5天，其他类型消息只保存3天 </span>
						</div>
						<div class="titline uinnb">
							<span>消息时间范围：</span>
							<el-select v-model="getAllListParams.time" @change="handleTimeChange" placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
							<el-checkbox v-model="checked" style="margin-left: 6%;" @change='handleFlagChange'>隐藏关键词消息</el-checkbox>
						</div>
						<div class="messbox">
							<message-list :wrapClassName="'message_list_all messul'" :messages="messageList"
								:initInfo="initInfo"
								:getFansInfo="getFansInfo"
								:addMsgForCollection="addMsgForCollection"
								:replyTimeExpired="replyTimeExpired"
								:replyMsgToFans="replyMsgToFans"
							/>
						</div>
					</el-tab-pane>	
					<el-tab-pane label="已收藏消息" name="second">
						<!--222-->
						 <ul class="selectedContent" style="display:block;">
	                    	<div class="savedMessage">
	                            <div class="sub_title_bar white">
	                                <div class="info" style="padding-left: 20px;border-bottom: 1px solid #EAF1F6;height:23px;">
	                                    <h3 style="margin-top: 10px;">已收藏的消息(<span ref="num" class="col_total">{{collectionMessageList.length}}</span>条)</h3>
	                                </div>
	                            </div>
	                            <!----已收藏的消息-------->
	                            <div class="collectNews">
	                            	<message-list ref="shoucang" :wrapClassName="'collectNews_col messul'" :messages="collectionMessageList"
										:initInfo="initInfo"
										:getFansInfo="getFansInfo"
										:addMsgForCollection="addMsgForCollection"
										:replyTimeExpired="replyTimeExpired"
										:replyMsgToFans="replyMsgToFans"
									/>                             
	                            </div>
	                        </div>
                        </ul>
					</el-tab-pane>	
					<el-tab-pane label="问题反馈" name="third" >
						<div class="sub_title_bar white">
							<el-select v-model="getFeedbackParams.time" @change="handleFeebackTimeChange" placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
							<!--<el-select v-model="getFeedbackParams.status" @change="handleFeebackStatusChange" placeholder="请选择">
							    <el-option
							      v-for="item in statusOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>-->
						</div>
						<div class="messbox">
							<message-list :wrapClassName="'message_list_all messul'" name="feedback" :messages="feedbackList"
								:status="getFeedbackParams.status"
								:initFeedbackInfo="initFeedbackInfo"
								:replyTimeExpired="replyTimeExpired"
								:replyMsgToFans="replyMsgToFans"
								:updateLeaveMessage="updateLeaveMessage"
							/>
						</div>
					</el-tab-pane>	
				</el-tabs>
            </div>
            <!----正文 end----->
        </div>
    </div>    
</template>
<script>
	
	import {getAllMessageList,getFansInfo,replyMsgToFans,addMsgForCollection,replyTimeExpired,getFeedbackList,updateLeaveMessage} from "@/api/messagemanagement.js"
	import MessageList from './wxmessage_list'
	export default {
  		name: 'messagemanagement',//客服管理
  		data(){
			return{
//				src:'../../../pages/weixin/admin/newversion/messagemanagement.jsp'+'?_s='+this.$store.state.user.session
				activeName: 'first',
				checked: true,
				formInline: {
		          user: '111',
		          region: '222'
		        },
				options: [{
		          value: 'fivedayago',
		          label: '最近5天'
		        }, {
		          value: 'today',
		          label: '今天'
		        }, {
		          value: 'yesterday',
		          label: '昨天'
		        }, {
		          value: 'beforeyesterday',
		          label: '前天'
		        }],
		        value1: '',//
		        value2:null,
		        feedbackList: [], // 反馈
		        messageList: [], // 全部消息
		        collectionMessageList: [], // 已收藏消息
		        getAllListParams: {//消息时间范围
		        	time: 'fivedayago',
		        	showFlag: 'hide',
		        	isCollection: '',//是否收藏
		        	searchName: ''
		        },
		        statusOptions: [{
		        	value: 0,
		        	label: '全部'
		        }, {
		        	value: 1,
		        	label: '已处理'
		        }, {
		        	value: 2,
		        	label: '未处理'
		        }],
		        getFeedbackParams: {
		        	content: '',
		        	time: 'fivedayago',
		        	status: 0
		        }
			};
  		},
  		methods: {
		    handleTabClick(tab, event) {
		        if (tab.name === 'first') {
		        	this.getAllListParams.isCollection = '';
		        	if (!this.getAllListParams.time || !this.getAllListParams.showFlag) {
		        		this.getAllListParams.time = 'fivedayago';
		        		this.getAllListParams.showFlag = 'hide'
		        		this.checked = true;
		        	}
		        	if (this.messageList.length <= 0) {
		        		this.initInfo();
		        	}
		        } else if (tab.name === 'second') {
		        	this.getAllListParams.isCollection = '1';
		        	this.getAllListParams.time = '';
		        	this.getAllListParams.showFlag = '';
		        	this.getAllListParams.searchName = '';
		        	if (this.collectionMessageList.length <= 0) {
		        		this.initInfo();
		        	}
		        } else if (tab.name === 'third') {
		        	if (!this.feedbackList || this.feedbackList.length <= 0) {
		        		this.initFeedbackInfo();
		        	}
		        }
		    },
		    handleIconClick(){
		    	let searchName=this.getAllListParams.searchName;
		    	if (this.activeName == 'first' || this.activeName == 'second') {
					this.initInfo()
				} else if (this.activeName == 'third') {
				    this.initFeedbackInfo(searchName);
				}
		    },
		    getFirstList() {
				if(window.screen.height <= 768) {
					this.maxHeight = '450';
				} else {
					this.maxHeight = '650';
				}
				this.initInfo();
			},
		    
		    /**
			 * 说明：data(时间筛选字段),data1(关键词显示与隐藏),data2(是否收藏),data3(查询内容)
			 */
		    initInfo(data,data1,data2,data3){
		    	let info = 'time='+data+'&showFlag='+data1+'&isCollection='+data2+'&searchName='+data3 ;
		      	const { isCollection, time, showFlag, searchName } = this.getAllListParams;
		      	getAllMessageList(`isCollection=${isCollection}&time=${time}&showFlag=${showFlag}&searchName=${searchName}`).then((response)=>{
		      		
		      		if(response && response.total > 0) {
		      			this.$refs.num.col_total=response.total;
		      			if (this.getAllListParams.isCollection == '1') {
		      				//收藏的数据
		      				this.collectionMessageList = response.rows || [];
		      				//console.log(JSON.stringify(response.rows)+'收藏的数据');
		      			} else {
		      				//全部数据
		      				this.messageList = response.rows || [];
		      				//console.log(response.rows+'全部数据');
		      			}
					} else if(response.total == 0 ) {
						//没有数据
						this.messageList = response.rows || [];
					}else{
						this.$message({
							type: 'error',
							message: '请求失败'
						});
					}
		      		   		
		      	})
		    },
		    initFeedbackInfo(content) {
		    	const { time, status } = this.getFeedbackParams;
		    	getFeedbackList(`content=${content || ''}&time=${time}&status=${status}`).then(res => {
		    		if (res && res.rows) {
		    			//status 0 是全部，1是已处理，2是未处理
		    			this.feedbackList = res.rows;
		    		}else{
		    			alert(res.msg);
		    		}
		    	});
		    },
		    // 切换是否隐藏关键词消息
		    handleFlagChange(){
				const flag = this.checked ? 'hide' : 'show';
				if (this.getAllListParams.showFlag !== flag) {
					this.getAllListParams.showFlag = flag;
					this.initInfo();
				}
			},
			handleTimeChange(time) {
				this.initInfo();
			},
			handleFeebackTimeChange(time) {
				this.initFeedbackInfo();
			},
			handleFeebackStatusChange(status) {
				this.initFeedbackInfo();
			},
			// 获取粉丝信息
			getFansInfo (param) {
				return getFansInfo(param);
			},
			// 收藏或取消收藏
			addMsgForCollection(params) {
				return addMsgForCollection(params);
			},
			// 校验回复时间是否过期
			replyTimeExpired(params) {
				return replyTimeExpired(params);
			},
			// 发送回复粉丝内容
			replyMsgToFans(params) {
				return replyMsgToFans(params);
			},
			//采纳
			updateLeaveMessage(params){
				return updateLeaveMessage(params);
			}
	    },
	    components: {
	    	messageList: MessageList
	    },
	    created(){
  			this.getFirstList();
  		}
  	
  	}

</script>
<style>
	
	.fr{
		float: right;
	}
	.el-icon-warning{
		color: #FFBF00 ;
	}
	.uinnb{
		padding-bottom: 10px;
	}
	.remind{
		height: 30px;
		line-height: 30px;
		background: #FFFCF2;
		border-radius: 3px;
		padding-left: 12px;
		margin: 10px 0px;
	}
	.titline{
		border-bottom: 1px solid #EAF1F6;
	}
	.topbox {
		height: 30px;
		width: 70%;
		float: left;
		margin-top: 8px;
	}
	.app-container{
		padding-top: 10px;
	}
	.searchR{
		width: 30%;
		float: left;
	}
	.messbox{
		overflow: hidden;
	}
	.messul li{
		border-bottom: 1px solid #EAF1F6;
		padding: 15px;
    	overflow: hidden;
	}
	.messleft{
		width: 80%;
		float: left;
		/*background:pink;*/
	}
	.messright{
		float: right;
		width: 15%;
		/*background:lightyellow;*/
		text-align: right;
	}
	.remarkinfo{
		margin-top: 10px;
		margin-left: 10%;
		overflow: hidden;
	}
	.remarkImg{
		width: 60px;
		height: 60px;
		border-radius: 3px;
		border: 1px solid #ccc;
		float: left;
		background:lightyellow;
	}
	.remark_name{
		font-size: 14px;
		color: #34495E;
		line-height: 14px;
	}
	.remark_txt{
		font-size: 12px;
		color: #9AABB8;
		line-height: 18px;
		margin-top: 5px;
		overflow: hidden;
		height: 40px;
	}
	.riqi{
		font-size: 12px;
		color: #9AABB8;
		line-height: 12px;
	}
	.avabox{
		margin-top: 30px;
	}
	.avatar{
		font-size: 14px;
		color: #0C99FF;
		letter-spacing: 0;
		margin-left:25px;
	}
	.quick_reply_box{
		clear: both;
	}
	.Smohan_FaceBox {
	    width:100%;
	    padding: 12px 0px;
	    min-height: 167px;
	}
	textarea.smohan_text {
	    line-height: 30px;
	    display: block;
	    width: 100%;
	    height: 138px;
	    outline: none;
	    position: relative;
	    border: 1px solid #EAF1F6;
	}
	.Smohan_FaceBox p {
	    display: block;
	    width: 100%;
	    padding: 5px 0px;
	    border-top: 1px solid #ccc;
	    height: 20px;
	    text-align: right;
	}
	.Smohan_Showface {
	    float: right;
	    width: auto;
	    height: 30px;
	    line-height: 30px;
	    font-size: 14px;
	}
	.el-tabs__item{
		margin-left: 0px;
	}
	/*鼠标划过的样式*/
	.rich_buddy_bd{
		/*padding: 10px;*/
	}
	.rich_buddy_bd  img{
		width:192px;
		height: 170px;
		float: left;
	}
	.popover {
    width: 674px;
    height: 170px;
    position: absolute;
    /* margin-top: -78px; */
    /*z-index: 999;*/
    display: block;
    margin-left: 68px;
    /*top: 10px;*/
}
.popover .popover_inner {
    border: 1px solid #d9dadc;
    word-wrap: break-word;
    word-break: break-all;
    padding: 0px;
    background-color: #fff;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
}
.rich_user_info {
    overflow: hidden;
    height: 170px;
    position: relative;
}
.rich_user_info_inner {
    padding: 9px 18px 0 10px;
}
.rich_user_info .global_mod {
    padding-bottom: 14px;
    height: 23px;
}
.rich_buddy{
	z-index: 9999;
}
.rich_buddy .frm_control_group {
    padding-bottom: 1px;
    min-height: 26px;
    overflow: hidden;
}
.frm_label {
    float: left;
    width: 5em;
    margin-top: .3em;
    margin-right: 1em;
    font-size: 14px;
}
.rich_buddy .frm_label {
    color: #c3c0c0;
    width: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    margin-top: 0;
}
.frm_controls {
    display: table-cell;
    vertical-align: top;
    float: none;
    width: auto;
}
.rich_data_bar {
    position: absolute;
    right: 18px;
    left: 0;
    border-top: 1px solid #e7e7eb;
}
.rich_data_meta.extra {
    float: right;
    margin-right: 0;
    margin-left: 1em;
    color: #8d8d8d;
    margin-top: 10px;
}
.message_status{
	text-align: right;
	color: #FFC300;
	font-size: 12px;
}
.messul{
	margin-bottom: 100px;
}
</style>
