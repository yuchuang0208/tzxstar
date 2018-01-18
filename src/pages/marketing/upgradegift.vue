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

		<!--消费后评价赠礼  开始-->
		<div class="divTwo_upgrade">
			<h1><em>升级赠礼</em><cite>会员升级到指定等级后，获得相应奖励</cite></h1>
			<h2 v-model="tishi">
		    	<img src="../../assets/huodong/tishi.png" />
		    	<cite>提示：您已经创建过如下活动，新活动尽量不要与之冲突！
		    	</cite>
		    	<img v-if="!tishi" src="../../assets/huodong/chakangengduo.png" @click="changTiShi" style="width:70px;height:16px;margin-top:8px;"/>
		    	<img v-if="tishi" src="../../assets/huodong/shouqi.png" @click="changTiShi" style="width:42px;height:16px;margin-top:8px;"/>
		    	<ul v-if="tishi">
		    		<li v-for="(item,index) in acitivities"><em>{{index+1}}</em>.{{item.subject}}，{{dateFilter(item.start_time)}}至{{dateFilter(item.end_time)}}；</li>
		    	</ul>
		    </h2>
			<!--表单开始-->
			<el-form label-width="112px" class="demo-ruleForm" :rules="rules" ref="form" :model="form">
				<el-form-item label="活动名称:" prop="subject">
					<el-input placeholder="请输入活动名称" v-model="form.subject" style="width:580px;"></el-input>
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
				<el-form-item label="会员升级到:"  prop="level_id">
						<el-select v-model="form.level_id" placeholder="请选择">
							<el-option
							v-for="item in memberLevel"
							:key="item.id"
							:label="item.name"
							:value="item.id">
							</el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="活动赠礼:" style="margin:0;padding:0;margin-bottom: 0px;" prop="hdzl" class="yhq_hdzl">
					<el-checkbox-group v-model="form.hdzl" class="pjzl_hdzl">
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

						<el-form-item label="" style="margin:0;padding:0;margin-bottom: 0px;line-height:32px;"  prop="reward_credit">
							<el-checkbox label="赠积分" style="margin-left:15px;margin-top:6px;margin-bottom:6px;"></el-checkbox>
							<!--活动赠礼 的 每人赠送的积分 开始 -->
							<div class="hdzl2" v-if="form.hdzl.toString().indexOf('赠积分') != -1 ">
								<div class="meirenzengsong">
									<cite>每人赠送</cite>
									<el-input placeholder="100,000" min="0.1" step="0.1" type="number" v-model="form.reward_credit" style="width:120px;height:28px" class="mynumber">
										<template slot="append">积分</template>
									</el-input>
									<!--<em>积分</em>-->
								</div>
							</div>
						</el-form-item>
					</el-checkbox-group>
				</el-form-item>
				<!--活动赠礼 的 每人赠送的积分 结束 -->
				
				<!--赠礼规则  开始 -->
				<el-form-item label="赠礼规则:" required class="zlgz" prop="gift_way">
					<em>支持的赠礼方式</em>
					<el-checkbox-group v-model="form.gift_way">
						<el-checkbox label="1"><span>自动升级赠礼</span></el-checkbox>
						<el-checkbox label="2"><span>手动升级赠礼</span></el-checkbox>
					</el-checkbox-group>
					<p>赠礼限制</p>
					<el-radio-group v-model="form.gift_restrict">
					      <el-radio label="0"><span>不限制，只要升级就赠礼</span></el-radio>
					      <el-radio label="1">
					      	<span>限制，升级赠礼后的</span>
					      	<el-input placeholder="" min="1"  type="number" step="1" v-model="form.restrict_hour"  style="margin-left: 10px;width: 100px;display: inline-table;" class="input_height_28 mynumber">
								<template slot="append">小时</template>
							</el-input>
							<cite>后 如果再次达到指定会员等级才可再次赠礼</cite>
							<strong>（可防止会员升降级刷单）</strong>
					      </el-radio>
					</el-radio-group>
				</el-form-item>	
				<!--赠礼规则  结束 -->
				
				<!--活动提醒 开始 -->
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
						<em style="display:block;clear:both;margin-left:112px;margin-top:6px;margin-bottom:6px;line-height:20px;">提醒时间<span style="color: #9AABB8;">(同时赠礼)</span></em>
						<div class="hdtx_txsj">
							<el-radio class="radio" v-model="tixingshijian" label="1" disabled>即刻提醒</el-radio>
							<cite>(升级后马上提醒)</cite>
						</div>
					</el-form-item>
				</el-form-item>
				<!--活动提醒 结束-->
				

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
	import { TzxCouponView } from '@/components/tzxcouponview'
    import { TzxTag } from '@/components/tag'
	import { getYouHuiQuanOne, getYouHuiQuan} from '@/api/home'
	import { findUpgradeGiftList, findUpgradeGiftSmsTemplate, findEvalgiftActivityDetail, getMemberLevel, saveUpgradeGift } from '@/api/activity'
	import axios from "axios";

	export default {
		components:{TzxCouponSelect,TzxCouponView,TzxTag},
		data() {
			return {
				loading1: false,
				memberLevel: [],//会员等级
			    memberLevelOne: '',//会员等级参数
			    
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

				form: {
					subject: "", //主题
					start_time: "",
					end_time: "",
					reward_credit: 0, //积分
					tl: [],
					activity_type: "evalgift", //默认赠礼
					introduction: "",
					remark: "", //无
					reason: "", //无	
					mendian: '0', //默认全部门店
					hdzl: [], //活动赠礼
					stores:'0',
					alert_mode: 0, //0 :不提醒，1：微信，2：短信，3 微信+短信
					sms_template_id: 0, //短信模板id

					hdtx: [], //活动提醒
					start_end_date: [], //开始结束时间
					gift_way:['1'],//支持的赠礼方式 1：自动，2：手动，3：都支持
					gift_restrict:'0',//限制赠礼0：不限制，1：限制
					restrict_hour:1,//限制时长
					level_id:'',// 
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
					restrict_hour:[{
							required: false,
							trigger: 'blur'
						},
						{
							min: 1,
							message: '',
							trigger: 'blur'
						}
					],
					
					/*start_end_date: [
					  { type: 'array',required: true, message: '请选择日期范围', trigger: 'change' }
					],*/
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
					level_id: [{
						type: 'integer',
						required: true, message: '请选择会员等级', trigger: 'change' 
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
	    	viewYouhuiQuan: function(id) { //查看单个优惠券
				this.dialogViewYouhuiQuan = true;
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
						
						let mendian_str="";

						//拼装群体
						//如果是全部会员则存储0
						let qunti_str = "";

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
							if(this.yhqCheckedData_my.length == 0) {
								this.$message({
									type: 'error',
									message: '请选择优惠券'
								});
								return false;
							}
							let flag = true;
							this.yhqCheckedData_my.forEach(item => { //每个优惠券至少添加1张
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
						if(this.form.hdzl.toString().indexOf('赠积分') != -1) {
							/*if(isNaN(this.form.reward_credit)){//数字*/
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
								} else { //非整数
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
						
						//活动规则
						//赠礼方式
						let gift_way = 1;//默认是自动
						if(this.form.gift_way != null) {
							if(this.form.gift_way.toString().indexOf("1") != -1 && this.form.gift_way.toString().indexOf("2") != -1) {
								gift_way = 3
							} else if(this.form.gift_way.toString().indexOf("1") != -1) {
								gift_way = 1
							} else if(this.form.gift_way.toString().indexOf("2") != -1) {
								gift_way = 2
							}
						}
						//赠礼限制
						
						if(this.form.gift_restrict ==1){
							let flag = true;
							let reg_zhengshu = /^[0-9]*[1-9][0-9]*$/;
							if(reg_zhengshu.test(this.form.restrict_hour)){
							}else{
								flag = false;
							}
							if(!flag) {
								this.$message({
									type: 'error',
									message: '请输入正整数'
								});
								return false;
							}

						}
						
						
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
						}

						let data = "id=" + this.activityId +
							"&subject=" + this.form.subject +
							"&start_time=" + start_time +
							"&end_time=" + end_time +
							"&reward_credit=" + this.form.reward_credit +
							"&tl=" + yhq_json +
							"&activity_type=upgradegift" +
							"&introduction=" +
							"&remark=" +
							"&reason=" +
							"&sms_template_id=" + this.message.template_id +
							"&gift_way=" + gift_way+
							"&gift_restrict=" + this.form.gift_restrict+
							"&restrict_hour=" + this.form.restrict_hour+
							"&level_id=" + this.form.level_id+
							"&alert_mode=" + alert_mode ;
							
						/*	gift_way:['1'],//支持的赠礼方式 1：自动，2：手动，3：都支持
					gift_restrict:'0',//限制赠礼0：不限制，1：限制
					restrict_hour:1,//限制时长
					level_id:'',//*/
						
						this.loading1 = true;
						
						saveUpgradeGift(data).then((response) => {
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
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			loadGetMemberLevel(){
				getMemberLevel().then((response) => {
					this.memberLevel = response;
				})
			},
			loadFindSmsTemplate() {
				findUpgradeGiftSmsTemplate().then((response) => {
					this.message = response.data;
				})
			},
			loadFindEvalGift() {
				findUpgradeGiftList().then((response) => {
					this.acitivities = response.data;
					this.acitivities.forEach(item => {
						let stores = item.stores;
						let stores_temp = [];
						stores.forEach(item2 => {
							stores_temp.push(item2.org_full_name);
						})
						item.stores = stores_temp;
					})
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
				let query = 'id=' + id + '&activity_type=' + activity_type;
				this.loading1 = true;
				findEvalgiftActivityDetail(query).then(response => {
						let detail = response;
						//axios.get('http://localhost:9280/static/awaken_detail.json').then((response) => {
						//let detail = response.data;

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
						
						//赠礼规则
						
						if(detail.gift_way == null) {
							this.form.gift_way = [];
						} else if(detail.gift_way == 1) {
							this.form.gift_way.push('1');
							
						} else if(detail.gift_way == 2) {
							this.form.gift_way.push('2');
							this.form.gift_way.splice(0,1)
							//短信提醒 不用修改
						} else {
							this.form.gift_way.push('1');
							this.form.gift_way.push('2');
						}
						
						if(detail.gift_restrict == 1){
							this.form.gift_restrict = '1';
						}else{
							this.form.gift_restrict = '0';
						}
						//this.form.gift_restrict = detail.gift_restrict;
						
						if(detail.gift_restrict == 1){
							this.form.restrict_hour = detail.restrict_hour;
						}else{
							this.form.restrict_hour = 0;
						}
						this.form.level_id = detail.level_id;
						
						this.$nextTick(function() {
							//页面全部渲染完成之后执行的异步回调方法	
							this.loading1 = false;
						})

					})

				}
		},
			
	created() {
		_czc.push(["_trackEvent", "营销活动-升降级赠礼", "新增编辑"]);//埋点统计
		this.loadFindSmsTemplate();
		this.loadGetMemberLevel();//会员等级
		//查询已经存在得活动
		this.loadFindEvalGift();
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
		.el-dialog__header {
			border: none;
			height: 0px;
		}
	}
	/**************优惠券详情 结束*******************/
	
	/**消费后评价赠礼页面**/
	
	.divTwo_upgrade {
		height: auto;
		background: #FFFFFF;
		/*border: 1px solid #EAF1F6;
		margin-left: 15px;*/
		margin-top: 10px;
		display: table;
		width: 100%;
		h1 {
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
			em {
				margin-left: 10px;
				font-style: normal;
				font-size: 16px;
				letter-spacing: 0
			}
			cite {
				margin-left: 16px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #9AABB8;
				letter-spacing: 0;
				line-height: 16px;
				font-style: normal;
			}
		}
	}
	
	.divTwo_upgrade .demo-ruleForm .hdzq_date1 {
		float: left;
	}
	
	.divTwo_upgrade .demo-ruleForm .hdzq_date_em {
		float: left;
		margin-left: 5px;
		margin-right: 5px;
		font-style: normal;
		em {
			font-style: normal;
		}	
	}
	
	.divTwo_upgrade .demo-ruleForm .hdzq_date2 {
		float: left;
	}
	/******表单样式 开始******/
	
	.divTwo_upgrade .el-form {
		margin-top: 20px;
	}
	.divTwo_upgrade .el-form .el-form-item:nth-last-child{
		margin-top: 30px;
	}
	
	.divTwo_upgrade .el-date-editor .el-date-editor--date {
		width: 230px;
	}
	/***活动赠礼***/
	.divTwo_upgrade{
		.pjzl_hdzl{
			.hdzl {
				margin-left: -97px;
				margin-right: 40px;
				padding-left: 112px;
				background: #F5F9FB;
				border-radius: 3px;
				margin-top: 12px;
				overflow: hidden;
				.zengquanshezhi {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #576D7A;
					line-height: 14px;
					height: 40px;
					width: 70px;
					padding-top: 26px;
					float: left;
				}
				ul {
					float: left;
					margin: 0;
					padding: 0;
					list-style: none;
					padding-top: 5px;
					li {
						line-height: 14px;
						margin-top: 13px;
						height: 20px;
						em {
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
						em:nth-child(3) {
							margin-left: 10px;
	    					margin-right: 10px;
						}
						img {
							display: block;
							float: left;
							margin-top: 8px;
						}
						.el-input {
							width: 120px;
							float: left;
						}
					}
				}
			}
			.zqsh_right {
				float: left;
				margin-bottom: 10px;
				.addyouhuiquan {
					clear: both;
					padding: 20px 0px;
					width: 100px;
					img {
						float: left;
						height: 14px;
						margin-right: 4px;
						margin-left: 0;
					}
					div {
						line-height: 14px;
						float: left;
						height: 14px;
						color: #0C9AFF;
					}
					.tianjia {
						width: 70px;
					}
				}
			}
		}
	}
	.divTwo_upgrade{
		.pjzl_hdzl{
			.hdzl{
				.yhq {
					margin-left: 50px;
				}
				.view {
					margin-left: 10px;
				}
				.delete {
					margin-left: 10px;
				}
			}
		} 
		.input_height_28 .el-input__inner {
			line-height: 28px;
		}
	}
	
	/**每人赠送**/
	.divTwo_upgrade{
		.hdzl2 {
			margin-left: -97px;
			margin-right: 40px;
			padding-left: 112px;
			background: #F5F9FB;
			border-radius: 3px;
			height: 50px;
			.meirenzengsong {
				padding-top: 11px;
				margin-bottom: 11px;
				cite {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #34495E;
					font-style: normal;
					margin-right: 24px;
				}
				.el-input__inner {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #34495E;
				}
				 em {
					margin-left: 10px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #34495E;
					font-style: normal;
				}
				.el-input__inner {
					height: 28px;
				}
		
			}
		}
	}
	/**选择门店 and 选择群体**/
	
	.divTwo_upgrade{
		.botton_text {
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #0C9AFF;
			line-height: 14px;
			margin-left: 16px;
			font-style: normal;
		}
		.quxiao_and_tijiao {
			height: 82px;
			margin-left: 50px;
			margin-right: 40px;
			border-top: 1px dashed #EAF1F6;
			.bottom_64_32 {
				margin-left: 92px;
				margin-top: 30px;
				margin-bottom: 30px;
			}
		}
		.xuanze {
			list-style: none;
			margin: 0;
			padding: 0;
			margin-top: 7px;
			padding-left: 40px;
			li {
				border: 1px solid #D8E5EC;
				border-radius: 3px;
				width: auto;
				margin-right: 18px;
				float: left;
				line-height: 32px;
				margin-bottom: 7px;
				em {
					margin-left: 8px;
				}
				img {
					margin-left: 5px;
					margin-right: 8px;
				}
			}
		}
	}
	
	.divTwo_upgrade{
		.cyqt_person_num h1,
		.cyqt_person_num tt,
		.cyqt_person_num cite {
			letter-spacing: 0;
			float: left;
			line-height: 32px;
			height: 32px;
		}
		.cyqt_person_num {
			background: #FFFAEB;
			border: 1px solid #FFE9A7;
			border-radius: 3px;
			height: 32px;
			width: 309px;
			padding-left: 8px;
			margin-left: 40px;
			tt {
				color: #FF7171;
				height: 32px;
				line-height: 32px;
			}
			h1 {
				border: none;
				font-size: 14px;
				margin-left: 0px;
				margin-right: 0px;
				height: 32px;
				line-height: 32px;
				float: left;
			}
		}
		.querenbox {
			height: 360px;
			width: 200px;
			background: red;
			box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
			border-radius: 3px;
			position: absolute;
			z-index: 10000px;
		}
	}
	
	.input_height_28 {
		height: 10px;
		background-image: url(../../assets/huodong/zhang.jpg) no-repeat;
	}
	/***确认提交框**/
	
	.xzyhq_dialog .xzyhq_show ul {
		height: 332px;
		overflow-y: auto;
	}
	.divTwo_upgrade .el-form .el-form-item__error {
		margin-left: 40px;
	}
	.divTwo_upgrade .el-form .el-form-item .el-form-item .el-form-item__error {
		margin-left: -2px;
	}
	.divTwo_upgrade .yhq_hdzl .el-form-item__content {
		margin-left: 25px;
	}
	.divTwo_upgrade .yhq_hdzl .el-form-item__error {
		margin-left: 20px;
	}
	.divTwo_upgrade{
		.mynumber .el-input__inner {
			text-align: right;
		}
	}
	/*******************调整之后***************************/
	/*******关注赠礼得活动赠礼 提醒时间*********/
	
	.divTwo_upgrade .pjzl_hdzl .txsj {
		background: #F5F9FB;
		border-radius: 3px;
		height: 50px;
		padding-top: 15px;
		margin-right: 40px;
	}
	
	.divTwo_upgrade .pjzl_hdzl .txsj .el-radio__label {
		color: #243546;
	}
	
	.divTwo_upgrade .pjzl_hdzl .txsj cite {
		color: #9AABB8;
	}
	
	.divTwo_upgrade .pjzl_hdzl .txsj .el-radio {
		margin-left: 92px;
	}
	
	.divTwo_upgrade .pjzl_hdzl .el-form-item:nth-child(n+1) .el-form-item__content {
		line-height: 20px;
	}
	
	.divTwo_upgrade .yhq_hdzl .el-form-item__error {
		position: relative;
		padding-left: 20px;
		padding-top: 0px;
	}
	
	.divTwo_upgrade .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(3) {
		margin-left: 60px;
	}
	
	.divTwo_upgrade .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(1) {
		float: left;
	}
	
	.divTwo_upgrade .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(2) {
		clear: both;
	}
	
	.divTwo_upgrade .hdtx_bu_weixin .el-checkbox-group cite {
		display: block;
		color: #9AABB8;
		width: 400px;
		line-height: 32px
	}
	
	.divTwo_upgrade .hdtx_bu_weixin .el-form-item__content {
		margin-left: 20px!important;
	}
	
	.divTwo_upgrade{
		.hdtx_txsj {
			background: #F5F9FB;
			border-radius: 3px;
			height: 50px;
			padding-left: 112px;
			padding-top: 9px;
			margin-right: 40px;
			.el-radio{
				.el-radio__label {
					color: #243546;
				}
			}
			cite {
				color: #9AABB8;
			}
		}
		.hdtx_bu_weixin .el-form-item__content .el-form-item__error {
			margin-left: 132px;
		}
		.pjzl_tfqd{
			margin-bottom:21px;	
			.el-checkbox-group {
				display: block;
				margin-right: 40px;
				margin-left: 15px;
				margin-bottom:10px;
			}
			.checkAll {
				float: left;
				margin-right: 5px;
			}
		}
	}
	
	.divTwo_upgrade h2 {
		margin: 16px 20px 0;
		background: #FFFCF2;
		border-radius: 3px;
		overflow: hidden;
		img {
			width: 16px;
			height: 16px;
			margin: 8px 10px 0 16px;
			float: left;
		}
		cite {
			font-size: 13px;
			color: #576D7A;
			line-height: 33px;
			float: left;
		}
		cite:nth-child(1) {
			float: left;
			width: 40%;
			display: block;
		}
		a{
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
		.shouqi {
			background-image: url(../../assets/huodong/shouqi.png);
			background-repeat: no-repeat;
			background-size: 70px 16px;
		}
		.chakangengduo {
			background-image: url(../../assets/huodong/chakangengduo.png);
			background-repeat: no-repeat;
			background-size: 70px 16px;
		}
		ul {
			margin-left: 31px;
			margin-bottom: 10px;
			/*padding-top: 6px;*/
			clear: both;
			overflow: hidden;
			li {
				font-size: 12px;
				color: #576D7A;
				line-height: 20px;
			}
		}
	}
	
	.divTwo_upgrade .hdtx_bu_weixin .el-form-item__content .el-checkbox-group .el-checkbox:nth-child(4) {
		clear: both;
	}
	
	.divTwo_upgrade .hdtx_dxtx {
		/* background: #F5F9FB; */
		border-radius: 3px;
		margin-right: 40px;
		/* overflow: hidden; */
		margin-left: 62px;
	}
	
	.divTwo_upgrade .hdtx_dxtx strong {
		display: block;
		float: left;
		/*padding-left:92px;*/
		color: #576D7A;
		padding-top: 20px;
	}
	
	.divTwo_upgrade .hdtx_dxtx .dxmb_text {
		/*width: 599px;*/
		float: left;
	}
	
	.divTwo_upgrade .hdtx_dxtx .dxmb_text cite {
		display: block;
		line-height: 50px;
		margin-left:30px;
	}
	
	.divTwo_upgrade .hdtx_dxtx .dxmb_text em {
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
	
	/*门店*/
	.divTwo_upgrade{
		.dishDiv{
		    position: relative;
		    margin-left: 30px;
			.showDishMessage{
				display: relative;
				float:left;
				border:1px solid #D8E5EC;
				height: 28px;
				line-height: 28px;
			    border-radius: 3px;
			    margin-right: 16px;
			    margin-bottom: 7px;
			}
			.checkdish{
				display: relative;
				height: 28px;
				line-height: 28px;
				color: #0C9AFF;
				font-size: 14px;
				cursor: pointer;
				float:left;
			}
		}
	}
	
	
		/*赠礼规则*/
	.divTwo_upgrade{
		.zlgz{
			em{
				display: block;
	    		line-height: 30px;
			}
			p{
				display: block;
	    		line-height: 30px;
	    		margin-left:40px;
			}
			.el-checkbox-group{
				line-height:40px;
				background:#F5F9FB;
				margin-left: -72px;
    			padding-left: 112px;
    			margin-right:40px;
			}
			
			.el-radio-group{
				line-height:40px;
				background:#F5F9FB;
				margin-left: -72px;
    			padding-left: 72px;
    			margin-right:40px;
    			display: grid;
    			.el-radio {
				    margin-left: 40px;
				    strong{
    					color: #9AABB8;
				    }
				}
			}
		}
	}
	
	/*************************mendian 结束 ***********************/
</style>