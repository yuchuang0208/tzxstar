<template>
	<li>
		<div class="messleft">
			<img class="remarkImg" :src="message.head_url || defaultAvatar" @mouseenter="handleRichBuddyShow" @mouseleave="handleRichBuddyHide" />
			<div class="remarkinfo">
				<div style="float: left;width: 92%;">
					<p class="remark_name">{{message.nickname}}</p>
					<p class="remark_txt">{{message.content}}</p>
				</div>
				<div class="message_status">{{message.replystatus}}</div>
				<div class="message_status"  v-if="message.type=='2' && typeof status !== 'undefined'">已回复</div>
			</div>	
		</div>
		<div class="messright">
			<div class="riqi">{{message.create_time}}</div>
			<div class="avabox" >
				<em v-if="status == undefined || status == null" :class="{'el-icon-star-on collect-color': isCollection, 'el-icon-star-off': !isCollection}"
					@click="handleCollect"></em>
				<span class="avatar" @click="handleReplyToggle">回复</span>
			</div>
		</div>
		<div class="quick_reply_box" v-if="isShowReply">
			<div class="emoion_editor_wrp">
				<div class="emotion_editor">
					<div id="Smohan_FaceBox" class="Smohan_FaceBox">
						<textarea v-model="replyContent" name="text" :disabled="!canReply || replyContentLength > 600"
							id="Smohan_text" class="smohan_text" maxlength="600"></textarea>
						<p>
							<span v-if="replyContentLength > 600">您输入的内容超出了字数限制</span>
							<span v-else>还可以输入{{600 - replyContentLength}}个字符</span>
						</p>
					</div>
				</div>
			</div>
			<p class="quick_reply_box_tool_bar">
				<el-button type="success" id="send" :disabled="!canReply" @click="handleCheckReply">发送</el-button>
				<el-button type="info" plain id="putaway" @click="handleReplyToggle">收起</el-button>
			</p>
		</div>
		<!------划过头像显示详细内容------>
		<div class="rich_buddy popover" id="rich_buddy" v-if="isShowRichBuddy">
			<div class="popover_inner">
				<div class="popover_content">
					<div class="rich_buddy_bd buddyRichContent" style="display:block;">
						<img class="rich_user_avatar" :src="fansInfo.head_url || message.head_url || defaultAvatar">
						<div class="rich_user_info">
							<div class="rich_user_info_inner">
								<div class="global_mod float_layout gap_top">
									<strong class="global_info gap_top_item">
                                        <span class="nick_name">{{fansInfo.nickname || message.nickname}}</span>
                                        <span class="icon_rich_user_sex icon18_common "></span>
                                    </strong>
								</div>
								<div class="frm_control_group remark">
									<label class="frm_label">备注</label>
									<div class="frm_controls">
										<span class="remark_info">{{fansInfo.remark}}</span>
									</div>
								</div>
								<div class="frm_control_group location">
									<label class="frm_label">地区</label>
									<div class="frm_city">{{fansInfo.province}}</div>
								</div>
								<div class="frm_control_group grouping tag_group">
									<label class="frm_label">标签</label>
									<div class="frm_controls">
										<div class="user_tag_area">{{fansInfo.tag || '无标签'}}</div>
									</div>
								</div>
								<div class="rich_data_bar">
									<div class="rich_data_meta extra">{{fansInfo.subscribe_time && fansInfo.subscribe_time.split(' ')[0]}}关注</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!----划过头像显示完毕--->
	</li>
</template>

<script>
	export default {
		props: {
			message: {
				type: Object,
				default: function() {
					return {}
				}
			},
			getFansInfo: {
				type: Function
			},
			addMsgForCollection: {type: Function},
			status:{type:[String,Number]},
			replyTimeExpired: {type: Function},
			replyMsgToFans: {type: Function},
			updateLeaveMessage:{type: Function},
			initInfo:{type: Function},
			initFeedbackInfo:{type :Function}
		},
		data() {
			return {
				// 默认头像
				defaultAvatar:require('@/assets/user_pig.png'),
				hasGetFansInfo: false, // 是否获取到了粉丝信息
				fansInfo: {}, // 粉丝信息
				hasCheckIsTimeExpired: false, // 是否调用过replyTimeExpired校验方法
				canReply: false, // 是否能回复,即回复时间是否过期
				isShowReply: false, // 是否展示回复框
				isShowRichBuddy: false, // 是否展示头像更多信息
				isCollection: this.message.is_collection==='1' || false, // 是否收藏该消息
				replyContent: '' // 回复内容
			}
		},
		computed:{
			replyContentLength(){
				return this.replyContent.length;
			}
		},
		methods: {
			//判断模块
			handleCheckReply(){
				if (typeof this.status !== 'undefined') {
					//反馈模块
				    this.handleReply2()
				} else {
				    this.handleReply();
				}
			},
			// 切换显示或隐藏回复框
			handleReplyToggle() {
				this.isShowReply = !this.isShowReply;
				if (!this.isShowReply) {
					// 收起回复框时，不需要校验回复时间是否过期
					return;
				}
				if (this.hasCheckIsTimeExpired && !this.canReply) {
					// 已校验过，且回复时间已过期则不需要再次验证了，必然已过期
					this.$message({
						type: 'warning',
						message: '由于该用户48小时未与你互动，你不能再主动发消息给他。直到用户下次主动发消息给你才可以对其进行回复。'
					});
					return;
				}
				this.replyTimeExpired && this.replyTimeExpired(`openid=${this.message.openid}`)
					.then(res => {
						if(res && (res.success==true || res.success == 'true')){
							this.$message({
								type: 'warning',
								message: res.msg
							});
							this.canReply = false;
						}
						if (res && (res.flag == true || res.flag == 'true')) {
							this.canReply = false;
							this.hasCheckIsTimeExpired = true;
							this.$message({
								type: 'warning',
								message: '由于该用户48小时未与你互动，你不能再主动发消息给他。直到用户下次主动发消息给你才可以对其进行回复。'
							});
						} else if (res && (res.flag == false || res.flag == 'false')) {
							this.canReply = true;
							this.hasCheckIsTimeExpired = true;
						}
					});
			},
			handleRichBuddyShow() {
				this.isShowRichBuddy = true;
				if (!this.hasGetFansInfo) {
					this.getFansInfo && this.getFansInfo(`openid=${this.message.openid}`)
						.then(res => {
							if (res && res.openid) {
								this.fansInfo = res;
								this.hasGetFansInfo = true;
							}
						})
				}
			},
			handleRichBuddyHide() {
				this.isShowRichBuddy = false;
			},
			// 收藏或取消收藏
			handleCollect() {
				// colFlag参数为1表示需要取消收藏，为0表示收藏
				this.addMsgForCollection && this.addMsgForCollection(`id=${this.message.id}&colFlag=${this.isCollection ? 1 : 0}`).then(res => {
					if (res && res.success === true) {
						this.isCollection = !this.isCollection;
						//alert(this.isCollection+'222');
						if(this.isCollection==1){//1
							this.$message({
								type: 'success',
								message: '收藏成功'
							});
							this.initInfo();
						}else{
							this.$message({
								type: 'success',
								message: '取消成功'
							});
							this.initInfo();
						}
						this.initInfo();
					}
				})
			},
			// 发送回复1
			handleReply() {
				const replyContent = this.replyContent.replace(/^\s*(.*)\s*$/, '$1')
				if (replyContent) {
					this.replyMsgToFans && this.replyMsgToFans(`type=text&openid=${this.message.openid}&content=${this.replyContent}&id=${this.message.id}`).then(res => {
							if (res) {
								this.$message({
									type: 'success',
									message: '回复成功'
								});
								this.replyContent='';
							}else{
								alert('回复失败');
							}
						})
				}
			},
			//反馈下的发送
			handleReply2() {
				const replyContent = this.replyContent.replace(/^\s*(.*)\s*$/, '$1')
				if (replyContent) {
					this.replyMsgToFans && this.replyMsgToFans(`type=text&openid=${this.message.openid}&content=${this.replyContent}`).then(res => {
							if (res) {
								this.$message({
									type: 'success',
									message: '回复成功'
								});
								this.replyContent='';
								this.updatecaina();
							}else{
								alert('回复失败');
							}
						})
				}
			},
			updatecaina(){
				this.updateLeaveMessage && this.updateLeaveMessage(`id=${this.message.id}`).then(res=>{
					this.initFeedbackInfo();
				})
			}
			
		}
	}
</script>

<style>
	.collect-color {
		color: #FFC300;
	}
	
</style> 