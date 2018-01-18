<template>
	<div class="context" v-loading.body="loading1">

		<!-- 选择优惠券 对话框 -->
		<tzx-coupon-select 
			:dialogSelectYouhuiQuan='mydialogSelectYouhuiQuan'
			@quedingButton="myquedingButton"
			:pnodes="detailCoupons"
			@setYhqCheckedData="getYhqCheckedData"
			@setYhqAllData="getYhqAllData"
			@setDialogStatus="getDialogStatus"
			:syn_status="my_syn_status"
			>
		</tzx-coupon-select>
		<!--选择优惠券 结束 -->

		<!--优惠券详情 开始 -->
		<el-dialog
		  title=""
		  :visible.sync="dialogViewYouhuiQuan"
		  size="tiny"
		  :before-close="handleViewYouhuiQuanClose"
		  custom-class="viewyhq_dialog">
		     <tzx-coupon-view :yhqOneData="yhqOneData"></tzx-coupon-view>
		</el-dialog>
		<!--优惠券详情 结束 -->

			<!--会员群体 开始-->
		<tzx-group-select 
			@makeQuntiSureButton ='quntiMakeSureChecked' 
			@makeQuntiCancleButton='quntiCancleButton' 
			:dialogQuntiVisible="dialogQunti" 
			:quntiData="hyqtData" 
			:quntiData_select="hyqt_select_data" 
			:tableDataFilter="tableDataFilter_parent">
		</</tzx-group-select>
		<!--会员群体结束 -->

		<!--生日营销  开始-->
		<div class="divTwo_srzl">
			<h1><em>生日营销</em><cite>会员生日送礼，增加忠诚度，促进二次消费</cite></h1>

			<h2 v-model="tishi">
		    	<img src="../../assets/huodong/tishi.png" />
		    	<cite>提示：您已经创建过如下活动，新活动尽量不要与之冲突！</cite>
		    	<img v-if="!tishi" src="../../assets/huodong/chakangengduo.png" @click="changTiShi" style="width:70px;height:16px;margin-top:8px;"/>
		    	<img v-if="tishi" src="../../assets/huodong/shouqi.png" @click="changTiShi" style="width:42px;height:16px;margin-top:8px;"/>
		    	<ul v-if="tishi">
		    		<li :key="index" v-for="(item,index) in acitivities"><em>{{index+1}}</em>.{{item.subject}}，{{dateFilter(item.start_time)}}至{{dateFilter(item.end_time)}}；</li>
		    	</ul>
		    </h2>
			<!--表单开始-->
			<el-form label-width="92px" class="demo-ruleForm" :rules="rules" ref="form" :model="form">
				<el-form-item label="活动名称:" prop="subject">
					<el-input placeholder="请输入活动名称" v-model="form.subject" style="width:580px;" ></el-input>
				</el-form-item>
				<el-form-item label="活动周期:" required>
					<div class="hdzq_date1">
						<el-form-item prop="start_time">
							<el-date-picker type="date" :picker-options="pickerOptions0" v-model="form.start_time" placeholder="请选择开始日期" style="width:230px;" format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</div>
					<div class="hdzq_date_em">
						<em>至</em>
					</div>
					<div class="hdzq_date2">
						<el-form-item prop="end_time">
							<el-date-picker type="date" :picker-options="pickerOptions0" v-model="form.end_time" placeholder="请选择结束日期" style="width:230px;" format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</div>
				</el-form-item>

				<el-form-item label="活动赠礼:" style="margin:0;padding:0;margin-bottom: 0px;" prop="hdzl" class="yhq_hdzl">
					<el-checkbox-group v-model="form.hdzl" class="srzl_hdzl">
						<el-form-item label="">
							<el-checkbox label="赠送优惠券" style="margin-top:6px;"></el-checkbox>
							<!--活动赠礼 的 赠券设置 开始 -->
							<div class="hdzl" v-if="form.hdzl.toString().indexOf('赠送优惠券') != -1 ">
								<!--<div class="zengquanshezhi">赠券设置:</div>-->
								<div class="zqsh_right">
									<ul  :class="isclass ? 'class-yes' : 'class-no' ">
							        		<li v-for="item in yhqCheckedData_show" >
							        			<div v-if="item.face_value > 0">
								        			<em>每人赠送</em>
								        			<img class="yhq" src="../../assets/huodong/youhuiquan.svg" />
								        			<em>{{item.text}}</em>	
								        			<el-input placeholder="" min="1"  v-model="item.reward_coupon" style="width:80px;display: inline-table;" class="input_height_28 mynumber" ><template slot="append">张</template></el-input>
								        			<img @click="viewYouhuiQuan(item.id)" class="view" src="../../assets/huodong/view.svg"  />
								        			<img  @click="deleteItem(yhqCheckedData_show,item,'yhq')" class="delete" src="../../assets/huodong/delete.svg"  />
							        			</div>
							        		</li>
						        	</ul>
									<div class="addyouhuiquan" @click="getYouHuiQuan">
										<img src="../../assets/huodong/addYouhuiquan.svg" />
										<div class="tianjia">选择优惠券</div>
									</div>
								</div>
							</div>
							<!--活动赠礼 的 赠券设置 结束-->
						</el-form-item>

						<el-form-item label="" style="margin:0;padding:0;margin-bottom: 0px;line-height:32px;">
							<el-checkbox label="赠积分" style="margin-left:68px;margin-top:6px;margin-bottom:6px;"></el-checkbox>
							<!--活动赠礼 的 每人赠送的积分 开始 -->
							<div class="hdzl2" v-if="form.hdzl.toString().indexOf('赠积分') != -1 ">
								<div class="meirenzengsong">
									<cite>每人赠送</cite>
									<el-input placeholder="100,000" min="0.1" step="0.1" type="number" prop="reward_credit" v-model="form.reward_credit" style="width:120px;height:28px" class="mynumber">
										<template slot="append">积分</template>
									</el-input>
								</div>
							</div>
						</el-form-item>
					</el-checkbox-group>
				</el-form-item>
				<!--活动赠礼 的 每人赠送的积分 结束 -->

				<el-form-item label="活动提醒:" required class="hdtx_bu_weixin" prop="hdtx">
					<el-checkbox-group v-model="form.hdtx" style="margin-left:72px;">
						<!--<el-checkbox label="不提醒"></el-checkbox>-->
						<el-checkbox label="微信提醒"></el-checkbox><cite>(按照微信公众号标准模板配置)</cite>
						<el-checkbox label="短信提醒"></el-checkbox>
					</el-checkbox-group>

					<el-form-item v-if="form.hdtx.toString().indexOf('短信提醒') != -1 " label="" style="margin-bottom:10px;background: #F5F9FB;overflow: hidden;margin-right: 40px;margin-left:20px;">
						<div class="hdtx_dxtx">
							<div class="dxmb_text">
								<cite v-model="message.info_content">{{message.info_content}}</cite>
							</div>
						</div>

					</el-form-item>

					<el-form-item v-if="form.hdtx.toString().indexOf('微信提醒') != -1 || form.hdtx.toString().indexOf('短信提醒') != -1" label="" style="margin-bottom:10px;">
						<em style="display:block;clear:both;margin-left:92px;margin-top:6px;margin-bottom:6px;line-height:20px;">提醒时间<span style="color: #9AABB8;">(同时赠礼)</span></em>
						<div class="hdtx_txsj">
							<span>距离会员生日前</span>
							<el-form-item prop="ahead_days">
								<el-input placeholder="" v-model="form.ahead_days" style="width:80px;">
									<template slot="append">天</template>
								</el-input>
							</el-form-item>

							<el-form-item prop="ahead_time">
								<el-time-picker
									v-model="form.ahead_time"
									:picker-options="{
									format:'HH:mm'
									}"
									placeholder="请选择时分" style="width:110px;margin-left:6px;" value-format="HH:mm" format="HH:mm" >
								</el-time-picker>
							</el-form-item>
						</div>

					</el-form-item>
				</el-form-item>

				<el-form-item label="参与群体:" prop="qunti" required>
					<!--<el-form-item label="参与群体:" prop="membership_groups">-->
					<el-radio-group v-model="form.qunti">
						<el-radio class="radio" @click.native="qubuhuiyuanFunction" label="0">全部会员</el-radio>
						<el-radio class="radio" label="1">指定会员群体</el-radio>
					</el-radio-group>
					<em class="botton_text" v-if="form.qunti == 1 " @click="openDialogQunti">选择群体</em>
					<ul class="xuanze" v-if="hyqt_select_data.length > 0">
						<li v-for="item in hyqt_select_data"><em>{{item.group_name}}({{item.members_count}}人)</em>
							<img src="../../assets/huodong/close.svg" @click="deleteItem(hyqt_select_data,item,'qunti')" />
						</li>
					</ul>
				</el-form-item>
				<el-form-item label="" v-if="hyqt_select_data.length > 0">
					<div class="cyqt_person_num">
						<h1>预计参与人数</h1>
						<tt v-model="count">{{count | thousand}}</tt>
						<cite>人</cite>
					</div>
				</el-form-item>

				<div class="quxiao_and_tijiao">
					<div class="bottom_64_32">
						<div class="quxiao" @click="open"><em>取消</em></div>
						<div class="queding" @click="onSubmit('form')"><em>确定</em></div>
					</div>
				</div>

			</el-form>
			<!--表单结束-->
		</div>
		<!--消费后评价赠礼  结束-->
	</div>
</template>

<script>
	import Assist from '@/utils/assist';
	import { formatDate } from '@/utils/index';
	import { TzxCouponSelect} from '@/components/tzxcouponselect';
	import { TzxCouponView } from '@/components/tzxcouponview';
	import { TzxGroupSelect } from '@/components/tzxgroupselect';
	import {getHuiyuanQudao, getHuiyuanQunti, getYouHuiQuanOne, getYouHuiQuan  } from '@/api/home'
	import { findBirthdayTemplate, findEvalgiftActivityDetail, saveBirthdaymarketing ,findBirthdayGift} from '@/api/activity'
	import axios from "axios";

	export default {
		components:{TzxCouponSelect,TzxCouponView,TzxGroupSelect},
		data() {
			return {
				radio: '1',
				loading1: false,
				//处理活动赠礼的样式
				isclass: false, //不显示块
				acitivities: [], //已经创建得活动列表
				message: {
					"template_id": 0,
					"info_content": ""
				}, //选中的信息模板的id

				checkAll: false, //全选
				isIndeterminate: false,

				tishi: false,
				tixingshijian: "1", //提醒时间
				hdzl: [], //活动赠礼

				hyqtData: [], //会员群体
				hyqt_select_data: [], //选择的会员群体
				tableDataFilter_parent: [], //会员群体回显
				count: 0, //会员群体列表中选择的人数
				dialogQunti: false,
				tfqdData: [], //投放渠道

				//优惠券
		      	my_syn_status:'',//关注状态
		      	mydialogSelectYouhuiQuan:false,
		      	yhqCheckedData_my:[],//已经选择的优惠券
		      	yhqAllData_my:[],//优惠券列表
		      	detailCoupons:[],//回西安的优惠券数组
		      	yhqCheckedData_show:[],//展示数据，仅仅展示
		      	yhqOneData:{},
		      	yhqZengQuan:false,//赠送优惠券复选框默认 false 不显示赠券设置
		      	yhqZengJiFen:false,//赠送积分复选框默认 false 不显示赠券设置
		      	dialogViewYouhuiQuan:false,

				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				chanels: [], //渠道 表单验证使用
				form: {
					subject: "", //主题
					start_time: "",
					end_time: "",
					store_ids: "", //门店 0全部
					membership_groups: 0, //群体 0全部  "201,203"
					chanels: [],
					reward_credit: 0, //积分
					tl: [],
					activity_type: "evalgift", //默认赠礼
					introduction: "",
					remark: "", //无
					reason: "", //无	
					mendian: '0', //默认全部门店
					qunti: '0', //默认群体
					hdzl: [], //活动赠礼

					alert_mode: 0, //0 :不提醒，1：微信，2：短信，3 微信+短信
					sms_template_id: 0, //短信模板id

					hdtx: [], //活动提醒
					start_end_date: [], //开始结束时间
					ahead_days: '',
					ahead_time: ''
				},
				rules: {
					subject: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在 1 到 20 个字符',
							trigger: 'blur'
						}
					],
					start_time: [{
						type: 'date',
						required: true,
						message: '请选择开始日期',
						trigger: 'change'
					}],
					end_time: [{
						type: 'date',
						required: true,
						message: '请选择结束日期',
						trigger: 'change'
					}],
					hdzl: [{
						type: 'array',
						required: true,
						message: '请选择活动赠礼',
						trigger: 'change'
					}],
					hdtx: [{
						type: 'array',
						required: true,
						message: '请选择活动提醒',
						trigger: 'change'
					}],
					ahead_days: [{
						required: true,
						message: '请输入天数',
						trigger: 'blur'
					}],
					ahead_time: [{
						type: 'date',
						required: true,
						message: '请输入提醒时间',
						trigger: 'change'
					}]
				},
				activityId: '' //form表单回显时用到

			};
		},
		methods: {
			dateFilter(value) {
				if(value!=null&&value!=""){
					return value.substring(0, 10);
				}else{
					return "";
				}
			},
			handleCheckAllChange(event) {
				let arrays = [];
				this.tfqdData.forEach(item => {
					arrays.push(item.id);
				})
				this.form.chanels = event.target.checked ? arrays : [];
				this.isIndeterminate = false;
			},
			handleCheckedChanelsChange(value) {
				/*判断当前是否全部勾选*/
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.tfqdData.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.tfqdData.length;
			},
			dateChange(val) {},
			changTiShi() {
				this.tishi = !this.tishi;
			},
			getDialogStatus(flag){
	    		this.mydialogSelectYouhuiQuan = flag;
	    	},
	    	getYhqAllData(yhqAllData){
	    		this.yhqAllData_my = yhqAllData;
	    	},
	    	getYhqCheckedData(yhqCheckedDataIds,editYhqData){
	    		this.yhqCheckedData_my = yhqCheckedDataIds;//返回选择的优惠券
			  	this.yhqCheckedData_show = editYhqData ;
	    	},
	    	myquedingButton(yhqCheckedDataIds){
	    		this.yhqCheckedData_my = yhqCheckedDataIds;//返回选择的优惠券
	    		let checkArrays = [];
			  	yhqCheckedDataIds.forEach(item=>{// 260,279,280
			  		let ojb = this.yhqAllData_my.filter(item2=>item2.id == item)[0];//再all中是否存在
			  		let ojb2 = this.yhqCheckedData_show.filter(item2=>item2.id == item)[0];//再 show中是否存在
			  		if(ojb2 != null){// 存在
			  			checkArrays.push(ojb2);
			  		}else{//不存在
			  			checkArrays.push(ojb);
			  		}
			  	})
			  	this.yhqCheckedData_show = checkArrays ;
	    		this.mydialogSelectYouhuiQuan = false;
	    		this.isclass = true;
	    	},
			onSubmit(form) {
				this.$refs[form].validate((valid) => {
					if(valid) {
						var start = new Date(this.form.start_time);
						let start_time = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();

						var end = new Date(this.form.end_time);
						let end_time = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();

						if(start.getTime() > end.getTime()) {
							this.$message({
								type: 'error',
								message: '结束日期不能晚于开始日期'
							});
							return false;
						}
						
						//拼装群体
						//如果是全部会员则存储0
						let qunti_str = "";
						if(this.form.qunti == 0) { //全部群体
							qunti_str = 0;
						} else {
							//判断群体下是否有数据 至少要要有一个数据
							if(this.hyqt_select_data.length == 0) {
								this.$message({
									type: 'error',
									message: '至少选择一个群体'
								});
								return false;
							} else {
								if(this.count == 0) {
									this.$message({
										type: 'error',
										message: '会员群体人数不能是0人'
									});
									return false;
								}
							}

							let qunti = [];
							this.hyqt_select_data.forEach(item => {
								if(item.id==undefined||item.id==null){
									qunti.push(item.membership_group_id)
								}
								else{
									qunti.push(item.id);
								}
								
							});
							qunti_str = qunti.join(",");
						}

						//拼装优惠券
					  	//选中的优惠券yhqCheckedData_my ids数组  ，从优惠券列表中过滤
					  	let yhq = [];
					  	this.yhqCheckedData_show.forEach(item=>{
					  		let number2 = item.reward_coupon;
					  		//let obj = this.yhqAllData_my.filter(item2=>item2.id == item.id)[0].tl;
					  		let obj = item.tl
					  		obj.reward_coupon= number2;
					  		yhq.push(obj);
					  	})
					  	this.yhqCheckedData_my = yhq ;
					  	let yhq_json = JSON.stringify(yhq);
				  	
						if(this.form.hdzl.toString().indexOf('赠送优惠券') != -1) {
							if(this.yhqAllData_my.length == 0) {
								this.$message({
									type: 'error',
									message: '请选择优惠券'
								});
								return false;
							}

							let flag = true;
							this.yhqAllData_my.forEach(item => { //每个优惠券至少添加1张
								let reg_zhengshu = /^[0-9]*[1-9][0-9]*$/;
								if(reg_zhengshu.test(item.reward_coupon)) { //正整数
								} else { //正整数
									flag = false;
								}
							});
							if(!flag) {
								this.$message({
									type: 'error',
									message: '请输入正整数'
								});
								return false;
							}

						}
						
						if(this.form.hdzl.toString().indexOf('赠积分') != -1){
							if(this.form.reward_credit <= 0) {
								this.$message({
									type: 'error',
									message: '请输入大于0的积分'
								});
								return false;
							} else {
								let reg_zhengshu = /^[1-9]\d*$/;
								if(reg_zhengshu.test(this.form.reward_credit)) { //判断是否是整数
									if(this.form.reward_credit.length > 8){
										this.$message({
											type: 'error',
											message: '请输入小于等于八位的积分'
										});
										return false;
									}
								}else{//非整数
									//判断积分是否 大于0 且为以一位小数
									let reg_xiaoshuo = /^([1-9]\d*|0)(\.\d{0,1})?$/;
									if(!reg_xiaoshuo.test(this.form.reward_credit)) {
										this.$message({
											type: 'error',
											message: '请输入一位小数的积分'
										});
										return false;
									}else{
										let zs = parseInt(this.form.reward_credit);
										if(zs.toString().length > 8){
											this.$message({
												type: 'error',
												message: '请输入小于等于八位的积分'
											});
											return false;
										}
									}
								}
							}
						}else{
							this.form.reward_credit = '';
						}

						//天数不能为空 ，时间必选
						let ahead_time = Assist.formatDateAll(this.form.ahead_time,'HH:mm');

						//拼装渠道
						let qudao_str = this.form.chanels.join(",");

						//活动提醒
						let alert_mode = 0; //0 :不提醒，1：微信，2：短信，3 微信+短信
						if(this.form.hdtx != null) {
							if(this.form.hdtx.toString().indexOf("微信提醒") != -1 && this.form.hdtx.toString().indexOf("短信提醒") != -1) {
								alert_mode = 3
							} else if(this.form.hdtx.toString().indexOf("微信提醒") != -1) {
								alert_mode = 1
							} else if(this.form.hdtx.toString().indexOf("短信提醒") != -1) {
								alert_mode = 2
							}
							
							if(this.form.ahead_days == ''){
								this.$message({
									type: 'error',
									message: '请输入提前天数'
								});
								return false;
							}else if(ahead_time == ''){
								this.$message({
									type: 'error',
									message: '请输入提醒时间'
								});
								return false;
							}
						}

						let data = "id=" + this.activityId +
							"&subject=" + this.form.subject +
							"&start_time=" + start_time +
							"&end_time=" + end_time +
							"&store_ids="+
							"&membership_groups=" + qunti_str +
							"&chanels=" + qudao_str +
							"&reward_credit=" + this.form.reward_credit +
							"&tl=" + yhq_json +
							"&activity_type=birthday" +
							"&introduction=" +
							"&remark=" +
							"&reason=" +
							"&sms_template_id=" + this.message.template_id +
							"&alert_mode=" + alert_mode +
							"&ahead_days=" + this.form.ahead_days +
							"&ahead_time=" + ahead_time ;
						this.loading1 = true;
						saveBirthdaymarketing(data).then((response) => {
							this.loading1 = false;
							if(response.code == 0) {
								this.$message({
									type: 'success',
									message: '保存成功'
								});
								this.$router.push({
									path: "/marketing/activitymanagement",
									hash: 'new'
								});
							} else {
								this.$message({
									type: 'error',
									message: response.msg
								});
							}
						})

					} else {
						return false;
					}
				});

			},
			loadQudao() {
				getHuiyuanQudao().then((response) => {
					this.tfqdData = response;
				})
			},
			loadQunti() {
				getHuiyuanQunti().then((response) => {
					this.hyqtData = response;
					//过滤会员群体添加的清除的对象  之前老系统 是下拉框有清楚
					this.hyqtData = this.hyqtData.filter((obj, index) => {
						return obj.id != 'clear'
					});

				})
			},
			loadFindBirthdayTemplate() {
				findBirthdayTemplate().then((response) => {
					this.message = response.data;
				})
			},
			loadFindBirthdayGift() {
				findBirthdayGift().then((response) => {
					this.acitivities = response.data;
				})
			},
			qubuhuiyuanFunction: function() { //全部会员
				this.hyqt_select_data = [];
				this.hyqt_select_data_temp = [];
				this.members_count = [];
				this.count = [];

			},
			getYouHuiQuan:function(){//选择优惠券弹出框  
				this.mydialogSelectYouhuiQuan = true;
			},
		
			viewYouhuiQuan: function(id) { //查看单个优惠券
				this.dialogViewYouhuiQuan = true;
				let _s = Assist.GetPageArguments();
				getYouHuiQuanOne(id).then((response) => {
					this.yhqOneData = response;
					let obj = {};

					obj.face_value = this.yhqOneData.face_value;
					obj.bill_limit_num = this.yhqOneData.bill_limit_num;
					obj.activity_subject = this.yhqOneData.activity_subject;
					obj.used_other = this.yhqOneData.used_other;
					obj.start_coupon = this.yhqOneData.start_coupon;
					obj.validity_type = this.yhqOneData.validity_type;
					obj.with_discount = this.yhqOneData.with_discount;

					obj.end_coupon = this.yhqOneData.end_coupon;
					obj.class_id = this.yhqOneData.class_id;
					obj.times_period = this.yhqOneData.times;

					obj.use_cycle = this.yhqOneData.use_cycle;
					obj.bill_limit_money = this.yhqOneData.bill_limit_money;
					obj.class_type_name = "";
					obj.reward_coupon = this.yhqOneData.reward_coupon;
					obj.validity_days = this.yhqOneData.validity_days;

					obj.coupons_pro = this.yhqOneData.coupons_pro;

					//改造两个前端页面需要的信息 周期和门店
					//1,门店名称
					let storesname = this.yhqOneData.store_ids;
					let storeidsname = [];
					storesname.forEach(item => {
						storeidsname.push(item.org_full_name);
					})
					let storeids_strname = storeidsname.join(",")
					obj.store_names = storeids_strname;
					//2,周期
					let use_cycle_names = this.yhqOneData.use_cycle.split(",");
					let use_cycle_names_new = [];
					use_cycle_names.forEach(item => {
						if(item == "2") {
							use_cycle_names_new.push("周一");
						} else if(item == "3") {
							use_cycle_names_new.push("周二");
						} else if(item == "4") {
							use_cycle_names_new.push("周三");
						} else if(item == "5") {
							use_cycle_names_new.push("周四");
						} else if(item == "6") {
							use_cycle_names_new.push("周五");
						} else if(item == "7") {
							use_cycle_names_new.push("周六");
						} else if(item == "1") {
							use_cycle_names_new.push("周日");
						}
					})
					let cycle_names = use_cycle_names_new.join(",")
					obj.cycle_names = cycle_names;

					//3,改造使用渠道
					let chanels = this.yhqOneData.use_chanel;
					let chanelids = [];
					chanels.forEach(item => {
						chanelids.push(item.chanel_name);
					})
					let chanelids_str = chanelids.join(",")
					obj.use_chanel = chanelids_str;
					this.yhqOneData = obj;
				});
			},
			open() {
				this.$router.push("/marketing/activitymanagement");
			},
			handleViewYouhuiQuanClose(done) {
				done();
			},
			handleMendianClose(done) {
				done();
			},
			handleQuntiClose(done) {
				done();
			},
			openDialogQunti: function(e) { //打开会员群体，发送会员群体请求
				this.dialogQunti = true;
			},
			//会员群体确定
			quntiMakeSureChecked(quntiData_select,quntiData,member_total_count){
				this.hyqt_select_data = quntiData_select;
				this.count = member_total_count;
				this.hyqtData = quntiData;
				this.dialogQunti = false;
			},
			quntiCancleButton(){
				this.dialogQunti = false;
			},
			handleSelectionChange(rows) { //会员群体 复选框改变 共选多少人
				this.count = 0;
				this.total = rows.length;
				rows.map((row, index) => {
					this.count += row.members_count;
				});
				this.tableDataFilter = rows; //用于群体弹出框打开时 表格复选框回显是打勾 
				this.hyqt_select_data = rows; //选择确定时双向绑定，使用过程变量
			},
			huiyuanquntiQueding: function(e) { //会员群体确定 选择确定时双向绑定，使用过程变量  

				this.dialogQuntiVisible = false;
			},
			//删除所选项
		  	deleteItem:function(items,it,str,e){
		        let arrays = [];
		        items.forEach(item =>{//把当前的对象在 对象数组中删除
		        	if(item.id != it.id){
		        		arrays.push(item);
		        	}
				});
				if(str=="mendian"){//判断是门店，把相应的门店树复选框置为false
					this.nodes_temp = arrays;
					//门店树绑定
					this.nodes.forEach(item =>{
						if(item.id == it.id){
							this.nodes.shift(item);
							this.totalcount = this.totalcount-1;
							this.$refs.tree2.setChecked(item.id,false,false);
						}
				  	});
				}else if(str=="qunti"){//判断是群体，
					this.hyqt_select_data = arrays;
		           
				    this.hyqt_select_data_temp.forEach(row => {
				      	if(row.id == it.id){//当前删除数据所在的表格所在行的复选框  取消打勾
				      	   	this.$refs.mytable.toggleRowSelection(row,false);
				      	}
				    });
				    this.count = 0;
				    this.hyqt_select_data.forEach(row => {//统计人数
				      	 this.count = this.count + row.members_count;
				    });
				}
				else if(str=="yhq"){//判断是优惠券，
					this.yhqCheckedData_show = arrays;
					//this.yhqCheckedData_my.shift(item);
					this.yhqCheckedData_my.forEach(item =>{
						if(item.id = it.id){
							this.yhqCheckedData_my.shift(item);
						}
					})
				}
		  	 },
			updateFormData(id, activity_type) {
				this.activityId = id;
				let query = "id=" + id +
						'&activity_type=' + activity_type;
				this.loading1 = true;
				findEvalgiftActivityDetail(query).then(response => {
						let detail = response;
						/* form 表单回显*/
						this.form.subject = detail.subject; //主题  
						this.form.start_time = Assist.formatStrToDate(detail.start_time);
						this.form.end_time = Assist.formatStrToDate(detail.end_time);

						//活动赠礼
						if(detail.coupons.length > 0) {

							this.form.hdzl.push('赠送优惠券')
							//优惠券展示
							this.detailCoupons =  detail.coupons;
							this.isclass = true; //回显已经选择得优惠券
							//绑定优惠券详细信息

						}
						if(detail.reward_credit > 0) {
							//赠送积分
							this.form.hdzl.push('赠积分');
							this.form.reward_credit = detail.reward_credit
						}
						//提醒方式
						if(detail.alert_mode == 0) {
							this.form.hdtx = [];
						} else if(detail.alert_mode == 1) {
							this.form.hdtx.push('微信提醒');
						} else if(detail.alert_mode == 2) {
							this.form.hdtx.push('短信提醒');
							//短信提醒 不用修改
						} else {
							this.form.hdtx.push('微信提醒');
							this.form.hdtx.push('短信提醒');
						}

						//提醒时间
						if(detail.aheadDays != ''){
							this.form.ahead_days = detail.aheadDays+'';
						}
						let time = new Date('2000/01/01 '+detail.aheadTime+':00');
						if(detail.aheadTime != ''){
							this.form.ahead_time = time;
						}
						
						/* 群体回显*/

						if(detail.groups.length == 1 && detail.groups[0].membership_group_id == 0) {
							this.form.qunti = "0";
						} else {
							this.form.qunti = "1";
							//处理会员群体回显数据，必须和会员群体弹出框数据字段名称一致
							let hyqt_select_data_new = [];
					    	detail.groups.map((item,index)=>{
								hyqt_select_data_new.push(this.hyqtData.filter(item20=>item20.id == item.membership_group_id)[0]);
					    	});
					    	this.hyqt_select_data = hyqt_select_data_new;
					    	//this.hyqt_select_data_temp = hyqt_select_data_new;
					    	
							detail.groups.map((item, index) => {
								this.count += item.members_count
							});

							detail.groups.map((item, i) => {
								this.tableDataFilter_parent.push(this.hyqtData.filter((obj, index) => {
									return item.membership_group_id == obj.id
								})[0]);
							})
						}
						
						this.$nextTick(function() {
							//页面全部渲染完成之后执行的异步回调方法	
							this.loading1 = false;
						})

					})
				}
		},
			
	created() {
		_czc.push(["_trackEvent", "营销活动-生日营销", "新增编辑"]);//埋点统计
		this.loadQunti(); //加载会员群体
		this.loadFindBirthdayTemplate();
		//查询已经存在得活动
		this.loadFindBirthdayGift();
		if(this.$route.query.id != undefined && this.$route.query.activity_type != undefined) {
			this.updateFormData(this.$route.query.id, this.$route.query.activity_type);
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	/**修改表单的样式**/
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
		margin: 0;
	}
	.divOne {
		height: 250px;
		background: #FFFFFF;
		border: 1px solid #EAF1F6;
		margin-left: 15px;
	}
	/**************优惠券详情 开始*******************/
	.viewyhq_dialog {
		width: 440px;
		/*height:230px;*/
	}
	
	.viewyhq_dialog .el-dialog__header {
		border: none;
		height: 0px;
	}
	/**************优惠券详情 结束*******************/
	/**************新增优惠券 开始*******************/
	
	.addyhq_dialog {
		width: 460px;
		height: 320px;
	}
	
	.addyhq {
		margin: 0 auto;
		margin-top: 20px
	}
	
	.addyhq img {
		margin-left: 180px;
		width: 100px;
		height: 100px;
	}
	
	.addyhq cite {
		display: block;
		font-style: normal;
		margin-left: 122px;
		margin-top: 10px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #9FACB9;
		letter-spacing: 0;
		line-height: 14px;
	}
	
	.addyhq_add {
		margin-top: 31px;
		margin-left: 181px;
	}
	/**************新增优惠券 结束*******************/
	/*****选择优惠券 开始*******/
	.xzyhq_dialog {
		width: 660px;
		height: 500px;
	}
	
	.xzyhq_dialog .el-dialog_body {
		width: 660px;
		height: 500px;
		padding: 20px 12px;
	}
	
	.xzyhq_close .bottom_64_32 .queding {
		margin-left: 10px;
		margin-right: 0px;
	}
	
	.xzyhq_dialog .xzyhq {
		height: 397px;
	}
	
	.xzyhq_dialog .xzyhq_close {
		width: 660px;
		height: 60px;
		background: #F4F9FC;
		box-shadow: 0 0 4px 0 rgba(44, 70, 128, 0.16);
	}
	
	.xzyhq_dialog .xzyhq_close .bottom_64_32 {
		margin-top: 14px;
		margin-left: 259px;
	}
	
	.xzyhq {
		padding: 0px;
	}
	
	.xzyhq .xzyhq_search {
		height: 34px;
		padding-top: 20px;
		padding-left: 20px;
		cursor: pointer;
	}
	
	.xzyhq .xzyhq_search .el-input {
		float: left;
		width: 180px;
	}
	
	.xzyhq .xzyhq_search .el-input__inner {
		height: 28px;
		width: 180px;
	}
	
	.xzyhq .xzyhq_search h1 {
		font-size: 12px;
		line-height: 12px;
		font-size: 12px;
		color: #0C9AFF;
		letter-spacing: 0;
		float: left;
		margin-left: 12px;
		font-weight: normal;
		margin-top: 7px;
	}
	
	.xzyhq .xzyhq_show {
		clear: both;
		display: block;
		height: 352px;
		padding-left: 12px;
		padding-top: 9px;
	}
	
	.xzyhq .xzyhq_show ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	
	.xzyhq .xzyhq_show ul li {
		float: left;
		width: 315px;
		height: 110px;
		background-image: url(../../assets/huodong/yhjbg.png);
		background-size: 100%;
	}
	
	.xzyhq .xzyhq_show ul li:hover {
		float: left;
		width: 315px;
		height: 110px;
		background-image: url(../../assets/huodong/yhjbg.png) 0 50%;
		background-size: 100%;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_left {
		float: left;
		margin-left: 26px;
		margin-top: 32px;
		width: 88px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_up cite {
		display: block;
		float: left;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #FF6161;
		line-height: 14px;
		font-style: normal;
		margin-top: 12px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_up tt {
		display: block;
		font-family: PingFangSC-Regular;
		font-size: 30px;
		color: #FF6161;
		line-height: 30px;
		margin-left: 4px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_down {
		margin-top: 4px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_down em {
		clear: both;
		font-style: normal;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #576D7A;
		line-height: 12px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_right {
		padding-left: 100px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left {
		float: left;
		float: left;
		margin-top: 30px;
		margin-left: 10px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left cite {
		font-family: PingFangSC-Regular;
		font-size: 18px;
		color: #34495E;
		line-height: 18px;
		width: 150px;
		display: block;
		font-style: normal;
		text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left em {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #9AABB8;
		line-height: 12px;
		display: block;
		font-style: normal;
		margin-top: 16px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right {
		float: left;
		margin-top: 40px;
		margin-left: 0px;
		width: 20px;
		height: 20px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right .el-checkbox__inner {
		width: 20px;
		height: 20px;
		border-radius: 10px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right .el-checkbox__input.is-checked .el-checkbox__inner {
		background: #0c9aff;
		border: 1px solid #20a0ff;
		width: 20px;
		height: 20px;
		border-radius: 10px;
	}
	
	.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right .el-checkbox__inner::after {
		height: 11px;
		left: 5px;
		top: 0px;
		width: 5px;
	}
	
	.xzyhq .xzyhq_show .el-checkbox-group .el-checkbox__label {
		display: none;
	}
	/*****选择优惠券 结束*******/
	/**消费后评价赠礼页面**/
	
	.divTwo_srzl {
		height: auto;
		background: #FFFFFF;
		display: table;
		width: 100%;
	}
	
	.divTwo_srzl h1 {
		height: 50px;
		line-height: 50px;
		display: block;
		border-bottom: 1px solid #eaf1f6;
		margin-left: 20px;
		margin-right: 20px;
		font-size: 16px;
		font-style: normal;
		color: #34495E;
		font-weight: normal;
	}
	
	.divTwo_srzl h1 em {
		margin-left: 10px;
		font-style: normal;
		font-size: 16px;
		letter-spacing: 0
	}
	
	.divTwo_srzl h1 cite {
		margin-left: 16px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #9AABB8;
		letter-spacing: 0;
		line-height: 16px;
		font-style: normal;
	}
	
	.divTwo_srzl .demo-ruleForm .hdzq_date1 {
		float: left;
	}
	
	.divTwo_srzl .demo-ruleForm .hdzq_date_em {
		float: left;
		margin-left: 5px;
		margin-right: 5px;
		font-style: normal;
	}
	
	.divTwo_srzl .demo-ruleForm .hdzq_date_em em {
		font-style: normal;
	}
	
	.divTwo_srzl .demo-ruleForm .hdzq_date2 {
		float: left;
	}
	/******表单样式 开始******/
	
	.divTwo_srzl .el-form {
		margin-top: 20px;
	}
	
	.divTwo_srzl .el-date-editor .el-date-editor--date {
		width: 230px;
	}
	/***活动赠礼***/
	
	.srzl_hdzl .hdzl {
		margin-left: -25px;
		margin-right: 40px;
		padding-left: 92px;
		background: #F5F9FB;
		border-radius: 3px;
		margin-top: 12px;
		overflow: hidden;
	}
	
	.srzl_hdzl .hdzl .zengquanshezhi {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #576D7A;
		line-height: 14px;
		height: 40px;
		width: 70px;
		padding-top: 26px;
		float: left;
	}
	
	.srzl_hdzl .hdzl .zqsh_right {
		float: left;
	}
	
	.srzl_hdzl .hdzl .zqsh_right .addyouhuiquan {
		clear: both;
		width: 100px;
		height: 40px;
		line-height: 40px;
		/*margin-bottom: 20px;*/
	}
	
	.srzl_hdzl .hdzl .zqsh_right .addyouhuiquan img {
		float: left;
		height: 14px;
		margin: 13px 4px 0 0;
	}
	
	.srzl_hdzl .hdzl .zqsh_right .addyouhuiquan div {
		line-height: 40px;
		float: left;
		height: 14px;
		color: #0C9AFF;
	}
	
	.srzl_hdzl .hdzl ul {
		float: left;
		margin: 0;
		padding: 0;
		list-style: none;
		padding-top: 5px;
	}
	
	.srzl_hdzl .hdzl ul li {
		line-height: 14px;
		margin-top: 13px;
		height: 20px;
	}
	
	.srzl_hdzl .hdzl ul li em {
		display: block;
		float: left;
		margin-top: 8px;
		font-style: normal;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #34495E;
		line-height: 14px;
		font-style: normal;
	}
	
	.srzl_hdzl .hdzl ul li em:nth-child(3) {
		margin-left: 10px;
		margin-right: 10px;
	}
	
	.srzl_hdzl .hdzl ul li img {
		display: block;
		float: left;
		margin-top: 8px;
	}
	
	.srzl_hdzl .hdzl .el-input {
		width: 120px;
		/*  display: block;*/
		float: left;
	}
	
	.srzl_hdzl .hdzl .addyouhuiquan .tianjia {
		width: 70px;
	}
	.srzl_hdzl .hdzl .yhq {
		margin-left: 50px;
	}
	
	.srzl_hdzl .hdzl .view {
		margin-left: 10px;
	}
	
	.srzl_hdzl .hdzl .delete {
		margin-left: 10px;
	}
	
	.input_height_28 .el-input__inner {
		height: 28px;
		line-height: 28px;
	}
	/**每人赠送**/
	
	.hdzl2 {
		margin-left: -25px;
		margin-right: 40px;
		padding-left: 90px;
		background: #F5F9FB;
		border-radius: 3px;
		height: 50px;
	}
	
	.hdzl2 .meirenzengsong {
		padding-top: 11px;
		margin-bottom: 11px;
	}
	
	.hdzl2 .meirenzengsong cite {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #34495E;
		font-style: normal;
		margin-right: 27px;
	}
	
	.hdzl2 .meirenzengsong .el-input__inner {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #34495E;
	}
	
	.hdzl2 .meirenzengsong em {
		margin-left: 10px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #34495E;
		font-style: normal;
	}
	/**选择门店 and 选择群体**/
	
	.divTwo_srzl .botton_text {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #0C9AFF;
		line-height: 14px;
		margin-left: 16px;
		font-style: normal;
	}
	
	.divTwo_srzl .quxiao_and_tijiao {
		height: 92px;
		margin-left: 40px;
		margin-right: 40px;
		border-top: 1px dashed #EAF1F6;
	}
	
	.quxiao_and_tijiao .bottom_64_32 {
		margin-left: 91px;
		margin-top: 30px;
		margin-bottom: 20px;
	}
	
	.divTwo_srzl .xuanze {
		list-style: none;
		margin: 0;
		padding: 0;
		margin-top: 7px;
		padding-left: 40px;
	}
	
	.divTwo_srzl .xuanze li {
		border: 1px solid #D8E5EC;
		border-radius: 3px;
		width: auto;
		margin-right: 18px;
		float: left;
		line-height: 32px;
		margin-bottom: 7px;
	}
	
	.divTwo_srzl .xuanze li em {
		margin-left: 8px;
	}
	
	.divTwo_srzl .xuanze li img {
		margin-left: 5px;
		margin-right: 8px;
	}
	
	.meirenzengsong .el-input__inner {
		height: 28px;
	}
	
	.divTwo_srzl .cyqt_person_num {
		background: #FFFAEB;
		border: 1px solid #FFE9A7;
		border-radius: 3px;
		height: 32px;
		width: 309px;
		padding-left: 8px;
		margin-left: 40px;
	}
	
	.divTwo_srzl .cyqt_person_num h1,
	.cyqt_person_num tt,
	.cyqt_person_num cite {
		letter-spacing: 0;
		float: left;
		line-height: 32px;
	}
	
	.divTwo_srzl .cyqt_person_num tt {
		color: #FF7171;
	}
	
	.divTwo_srzl .cyqt_person_num h1 {
		border: none;
		font-size: 14px;
		margin-left: 0px;
		margin-right: 0px;
	}
	
	.input_height_28 {
		height: 10px;
		background-image: url(../../assets/huodong/zhang.jpg) no-repeat;
	}
	/***确认提交框**/
	
	.divTwo_srzl .querenbox {
		height: 360px;
		width: 200px;
		background: red;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
		border-radius: 3px;
		position: absolute;
		z-index: 10000px;
	}

	.xzyhq_dialog .xzyhq_show ul {
		height: 332px;
		overflow-y: auto;
	}
	
	.divTwo_srzl .el-form .el-form-item__error {
		margin-left: 40px;
	}
	
	.divTwo_srzl .el-form .el-form-item .el-form-item .el-form-item__error {
		margin-left: 0px;
	}
	
	.divTwo_srzl .yhq_hdzl .el-form-item__content {
		margin-left: 32px !important;//17.59分改赠送积分未对齐问题
	}
	
	.divTwo_srzl .yhq_hdzl .el-form-item__error {
		margin-left: 60px !important;
	}
	
	.mynumber .el-input__inner {
		text-align: right;
	}
	/*******************调整之后***************************/
	/*******关注赠礼得活动赠礼 提醒时间*********/
	
	.divTwo_srzl .srzl_hdzl .txsj {
		background: #F5F9FB;
		border-radius: 3px;
		height: 50px;
		padding-top: 15px;
		margin-right: 40px;
	}
	
	.divTwo_srzl .srzl_hdzl .txsj .el-radio__label {
		color: #243546;
	}
	
	.divTwo_srzl .srzl_hdzl .txsj cite {
		color: #9AABB8;
	}
	
	.divTwo_srzl .srzl_hdzl .txsj .el-radio {
		margin-left: 92px;
	}
	
	.divTwo_srzl .srzl_hdzl .el-form-item:nth-child(n+1) .el-form-item__content {
		line-height: 20px;
	}
	
	.divTwo_srzl .yhq_hdzl .el-form-item__error {
		position: relative;
		padding-left: 40px;
		padding-top: 0px;
	}
	
	.divTwo_srzl .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(3) {
		margin-left: 40px;
	}
	
	.divTwo_srzl .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(1) {
		float: left;
	}
	
	.divTwo_srzl .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(2) {
		clear: both;
	}
	
	.divTwo_srzl .hdtx_bu_weixin .el-checkbox-group cite {
		display: block;
		color: #9AABB8;
		width: 400px;
		line-height: 32px
	}
	
	.divTwo_srzl .hdtx_bu_weixin .el-form-item__content {
		margin-left: 20px !important;
	}
	
	.divTwo_srzl .hdtx_txsj {
		background: #F5F9FB;
		border-radius: 3px;
		height: 50px;
		padding-left: 92px;
		padding-top: 9px;
		margin-right: 40px;
	}
	.divTwo_srzl .hdtx_txsj span{
		float: left;
	}
	.divTwo_srzl .hdtx_txsj .el-form-item{
		float: left;
	}
	.divTwo_srzl .hdtx_txsj .el-radio .el-radio__label {
		color: #243546;
	}
	
	.divTwo_srzl .hdtx_txsj cite {
		color: #9AABB8;
	}
	
	.divTwo_srzl .hdtx_bu_weixin .el-form-item__content .el-form-item__error {
		margin-left: 112px;
	}
	
	.divTwo_srzl .pjzl_tfqd .el-checkbox-group {
		display: block;
		margin-right: 40px;
		margin-left: 25px;
	}
	
	.divTwo_srzl .pjzl_tfqd .checkAll {
		float: left;
		margin-right: 5px;
	}
	
	.divTwo_srzl h2 {
		margin: 16px 20px 0;
		background: #FFFCF2;
		border-radius: 3px;
		overflow: hidden;
	}
	
	.divTwo_srzl h2 img {
		width: 16px;
		height: 16px;
		margin: 8px 10px 0 16px;
		/* margin-top: 10px; */
		float: left;
	}
	
	.divTwo_srzl h2 cite {
		/* display: block; */
		font-size: 13px;
		color: #576D7A;
		line-height: 33px;
		/* padding-top: 10px; */
		float: left;
	}
	
	.divTwo_srzl h2 cite:nth-child(1) {
		float: left;
		width: 40%;
		display: block;
	}
	
	.divTwo_srzl h2 a {
		font-size: 13px;
		color: #34495E;
		letter-spacing: 0;
		line-height: 13px;
		padding-left: 10px;
		float: left;
		display: block;
		height: 32px;
		line-height: 32px;
		width: 160px;
	}
	
	.divTwo_srzl h2 .shouqi {
		background-image: url(../../assets/huodong/shouqi.png);
		background-repeat: no-repeat;
		background-size: 70px 16px;
	}
	
	.divTwo_srzl h2 .chakangengduo {
		background-image: url(../../assets/huodong/chakangengduo.png);
		background-repeat: no-repeat;
		background-size: 70px 16px;
	}
	
	.divTwo_srzl h2 ul {
		margin-left: 31px;
		margin-bottom: 10px;
		/*padding-top: 6px;*/
		clear: both;
		overflow: hidden;
	}
	
	.divTwo_srzl h2 ul li {
		font-size: 12px;
		color: #576D7A;
		line-height: 20px;
	}
	
	.divTwo_srzl .hdtx_bu_weixin .el-form-item__content .el-checkbox-group .el-checkbox:nth-child(4) {
		clear: both;
	}
	
	.divTwo_srzl .hdtx_dxtx {
		/* background: #F5F9FB; */
		border-radius: 3px;
		margin-right: 40px;
		/* overflow: hidden; */
		margin-left: 72px;
	}
	
	.divTwo_srzl .hdtx_dxtx strong {
		display: block;
		float: left;
		/*padding-left:92px;*/
		color: #576D7A;
		padding-top: 20px;
	}
	
	.divTwo_srzl .hdtx_dxtx .dxmb_text {
		/*width: 599px;*/
		float: left;
	}
	
	.divTwo_srzl .hdtx_dxtx .dxmb_text cite {
		display: block;
		line-height: 50px;
    	height: 50px;
	}
	
	.divTwo_srzl .hdtx_dxtx .dxmb_text em {
		clear: both;
		color: #0C9AFF;
	}

	/***********会员群体**************/
	.class-no {
		display: none;
	}
	
	.class-yes {
		display: block;
	}
	/*************************mendian 结束 ***********************/
</style>