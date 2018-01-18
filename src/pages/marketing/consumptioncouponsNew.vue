<template>
	<div class="context" v-loading.body="loading1">
			<!-- 选择优惠券 对话框 -->
			<el-dialog
			  title="选择优惠券"
			  :visible.sync="dialogSelectYouhuiQuan"
			  size="tiny"
			  :before-close="handleSelectYouhuiQuanClose"
			  custom-class="xzyhq_dialog">
			  
			  <div class="xzyhq">
			  	  <div class="xzyhq_search">
			  	  	  <el-input placeholder="请输入优惠券名称" icon="search" :on-icon-click="searchYouHuiQuan" v-model="queryParams.searchText" ></el-input>
			  	  	  <h1 @click="dialogAddYouhuiQuan = true">创建优惠券</h1>
			  	  </div>
			  	  <div class="xzyhq_show">
			  	  	 <ul>
			  	  	 	<el-checkbox-group v-model="hdgz.yhqCheckedData">
				  	  	 	<li v-for="item in yhqAllData">
				  	  	 		<div class="xzyhq_show_left">
				  	  	 			<div class="xzyhq_show_left_up">
				  	  	 			  <cite>¥</cite>
				  	  	 			  <tt>{{item.face_value}}</tt>
				  	  	 			</div>
				  	  	 			<div class="xzyhq_show_left_down">
				  	  	 			  <em>满{{item.bill_limit_money}}元可用</em>
				  	  	 			</div>
				  	  	 		</div>
				  	  	 		<div class="xzyhq_show_right">
				  	  	 			<div class="xzyhq_show_right_left">
				  	  	 			 <cite title="item.text">{{item.text}}</cite>
				  	  	 			  <em v-if="item.validity_type == '1'">领券后当日可用,有效期{{item.validity_days}}天</em>
				  	  	 			  <em v-else>{{item.start_coupon}}-{{item.end_coupon}}</em>
				  	  	 			</div>
				  	  	 			<div class="xzyhq_show_right_right">
				  	  	 			  	<el-checkbox :key="item.id" :label="item.id"></el-checkbox>
				  	  	 			</div>
				  	  	 		</div>
				  	  	 	</li>
				  	  	 	
				  	  	 </el-checkbox-group>
			  	  	 </ul>
			  	  </div>
			  </div>
			  <div class="xzyhq_close">
			  		<div class="bottom_64_32">
			  			<div class="quxiao" @click="handleSelectYouhuiQuanClose"><em>取消</em></div>
			  			<div class="queding" @click="youhuiquanQueding"><em>确定</em></div>
					</div>
			  	</div>
			</el-dialog>
			<!--选择优惠券 结束 -->
			<!--添加优惠券 开始 -->
			<el-dialog
			  title="添加优惠券"
			  :visible.sync="dialogAddYouhuiQuan"
			  size="tiny"
			  :before-close="handleAddYouhuiQuanClose"
			  custom-class="addyhq_dialog">
			     <div class="addyhq">
			     	<img src="../../assets/huodong/noyhq_add2.png"  />
			     	<cite>还没有可用优惠券噢，快去创建一张吧！</cite>
			     </div>
			     <div class="addyhq_add">
			     	<el-button type="primary" @click='openCoupons' icon="plus" size="small" >新增优惠券</el-button>
			     </div>
			</el-dialog>
			<!--添加优惠券 结束 -->
			
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
			
			<!--选择门店 开始-->
			<el-dialog  :show-close=true size='tiny' :visible.sync="storeDialogVisible" custom-class='treeSelect' title="选择门店">		
		   		 <tzx-tree-select 
				   	:data="storeData" 
				   	unitAndName='家店' 			   
				   	@cancelButton='storeDialogVisible = false' 
				   	@makeSureButton ='storeMakeSureChecked'
				   	@boxChange = 'storeBoxChange' 
				   	:defaultCheckedId = 'storeCheckedIds'
				   	:pnodes= 'storeNodes' 
				   	:ptotalSelect = 'storeTotal'
				   	:defaultProps ='defaultProps'
				   	>  
		  		</tzx-tree-select>	
			</el-dialog>
			<!--选择门店结束-->
			
		<!--消费后评价赠礼  开始-->
		<div class="consumptionCoupons">
		    <h1><em>消费赠券</em><cite>消费到指定金额赠礼</cite></h1>
		    <h2 v-model="tishi">
                <img class="explainIcon" src="../../assets/huodong/tishi.png" />
		    	<cite>提示：您已经创建过如下活动，新活动尽量不要与之冲突！</cite>
				<em v-if="tishi" @click="changTiShi"><img src="../../assets/huodong/shouqi.png" style="width:42px;height:16px;margin-top:11px;" /></em>
		    		<em v-if="!tishi" @click="changTiShi"><img src="../../assets/huodong/chakangengduo.png" style="width:70px;height:16px;margin-top:11px;" /></em>
		    	<ul v-if="tishi">
		    		<li :key="index" v-for="(item,index) in acitivities"><em>{{index+1}}</em>.{{item.subject}}，{{dateFilter(item.start_time)}}至{{dateFilter(item.end_time)}}；范围：<span v-for="item2 in item.stores">{{item2.org_full_name}}；</span></li>
		    	</ul>
		    </h2>
		    <!--表单开始-->
		    <el-form  label-width="124px" class="demo-ruleForm" :rules="rules" ref="form" :model="form">
					<el-form-item label="活动名称:" prop="subject">
					       <el-input placeholder="请输入活动名称"  v-model="form.subject" style="width:580px;" ></el-input>
					</el-form-item>
					  
					<el-form-item label="活动周期:" required>
						        <div class="hdzq_date1">
						        	<el-form-item prop="start_time">
							        	<el-date-picker 
      										type="date" :picker-options="pickerOptions0" v-model="form.start_time" placeholder="请选择开始日期" style="width:230px;" format="yyyy-MM-dd">
   	 									</el-date-picker>
							      	</el-form-item>
						        </div>
						        <div class="hdzq_date_em">
						        	<em>至</em>
						        </div>
						        <div class="hdzq_date2">
						        	<el-form-item prop="end_time">
						        		<el-date-picker 
      										type="date" :picker-options="pickerOptions0" v-model="form.end_time" placeholder="请选择结束日期" style="width:230px;" format="yyyy-MM-dd">
   	 									</el-date-picker>
						      		</el-form-item>
						        </div>
					</el-form-item>
                    
                    <el-form-item label="可赠金额来源：" class="specialItem" required>
						<el-radio-group v-model="form.reward_money_source">
							<el-form-item>
								<el-radio  label="0">账单原始金额</el-radio>
								<el-tooltip class="item" effect="dark" content="如：账单金额100元，无论使用了任何优惠和支付方式，均按照100元可赠。" placement="top-start">
									<icon-svg icon-class='question'></icon-svg>
								</el-tooltip>
							</el-form-item>
							<el-form-item>
								<el-radio label="1">会员折后金额</el-radio>
								<el-tooltip class="item" effect="dark" content="如：账单金额100元，打8折，折后金额80元。使用储值金额支付50元，优惠券抵现10元，积分抵现10元，微信支付10元。选择如下方式累加金额可赠。" placement="top-start">
									<icon-svg icon-class='question'></icon-svg>
								</el-tooltip>
							</el-form-item>
						</el-radio-group>
						
						<el-form-item class="payments" v-if="form.reward_money_source == 1 ">
							<el-checkbox :indeterminate="isModeIndeterminate" v-model="modecheckAll" @change="handleModeCheckAllChange" class="checkAll">全部</el-checkbox>
							<el-checkbox-group v-model="form.reward_money_payments" @change="handleModeCheckedChanelsChange">
								<el-checkbox v-for="(item,index) in payments" :key='index' :label="item.id" :name="item.id" >{{item.payment_name1}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form-item>

					<el-form-item label="会员等级：" prop="memberLevelOne">
						<el-select v-model="form.memberLevelOne" placeholder="请选择">
							<el-option
							v-for="item in memberLevel"
							:key="item.id"
							:label="item.name"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="活动规则：" required>
						<el-form-item class="activityRuleList" :key="index" v-for="(item, index) in activityRuleList" >
							<el-form-item>
								<span>单笔消费满</span>
								<el-input placeholder="100" v-model="item.customer_limits" type="number"  step="0.01">
    								<template slot="append">元</template>
  								</el-input>
							</el-form-item>
							<el-radio-group v-model="item.if_cycle_reward">
								<el-form-item>
									<el-radio label="0">送一次</el-radio>
									<el-tooltip class="item" effect="dark" content="消费满以上金额只赠送一次优惠。如消费满100元可赠，此时消费金额400元，可赠送1次优惠" placement="top-start">
										<icon-svg icon-class='question'></icon-svg>
									</el-tooltip>
								</el-form-item>
								<el-form-item>
									<el-radio label="1">循环送</el-radio>
									<el-tooltip class="item" effect="dark" content="消费满以上金额循环赠送优惠。如消费满100元可赠，此时消费金额400元，最多可赠送4次优惠" placement="top-start">
										<icon-svg icon-class='question'></icon-svg>
									</el-tooltip>
									<span style="margin:0 10px 0 40px">循环最多赠送</span>
									<el-input placeholder="100" v-model.number="item.cycle_reward_num" type="number">
										<template slot="append">次</template>
									</el-input>
								</el-form-item>
							</el-radio-group>
						
								<el-form-item prop='checked'>
									<el-checkbox v-model="item.checked" disabled>赠送优惠券</el-checkbox>
									<div class="hdzl" v-if="item.checked">
										<div class="zqsh_right">
											<ul  :class="isclass ? 'class-yes' : 'class-no' ">
													<li v-for="item2 in item.yhqCheckedData_show" >
														<div v-if="item2.face_value > 0">
															<em>每人赠送</em>
															<img class="yhq" src="../../assets/huodong/youhuiquan.svg" />
															<!--<em v-if="item2.coupons_pro == 'coupons_deduct'">{{item2.face_value}}元代金券
															</em>
															<em v-if="item2.coupons_pro == 'coupons_dish'">{{item2.face_value}}元菜品券
															</em>-->
															<em>{{item2.text}}</em>	
															<el-input placeholder="" min="1" type="number" v-model="item2.reward_coupon" style="width:80px;display: inline-table;" class="input_height_28 mynumber" ><template slot="append">张</template></el-input>
															<img @click="viewYouhuiQuan(item2.id)" class="view" src="../../assets/huodong/view.svg"  />
															<img  @click="deleteItem(item,item2,'yhq')" class="delete" src="../../assets/huodong/delete.svg"  />
														</div>
													</li>
											</ul>
											<div class="addyouhuiquan" @click="getYouHuiQuan(item)">
												<img src="../../assets/huodong/addYouhuiquan.svg" />
												<div class="tianjia" >选择优惠券</div>
											</div>
										</div>
									</div>
								</el-form-item>
							
							<el-button type="text" v-if='index != 0' @click.prevent='removeFixedItem(item)'>删除</el-button>
						</el-form-item>
						<span class="addRuleBtn"  @click.prevent='addFixedItem'>添加规则</span>
						<el-tooltip class="item" effect="dark" content="如设置了单笔消费满100元和单笔消费满200元两个规则，当用户消费150元时用100元赠礼规则，当用户消费400元时只使用200元赠礼规则，以此类推。" placement="top-start">
					    	<icon-svg icon-class='question'></icon-svg>
					    </el-tooltip>
					</el-form-item>

					<el-form-item label="活动提醒:" required class="activityRemind" prop="hdtx" required>
						<el-checkbox-group v-model="form.hdtx" style="margin-left:72px;">
							<el-form-item>
								<el-checkbox label="微信提醒"></el-checkbox><cite>(按照微信公众号标准模板配置)</cite>
							</el-form-item>
							<el-form-item>
								<el-checkbox label="短信提醒"></el-checkbox>
							</el-form-item>
						</el-checkbox-group>
						<!---->
						<el-form-item  label="" v-if="form.hdtx.toString().indexOf('短信提醒') != -1 " style="margin-bottom:10px;background: #F5F9FB;overflow: hidden;margin-right: 40px;margin-left:10px; padding-left:48px;">
							<div class="hdtx_dxtx">
								<div class="dxmb_text">
									<cite v-model="message.info_content">{{message.info_content}}</cite>
								</div>
							</div>
						</el-form-item>
						<el-form-item v-if="form.hdtx.toString().indexOf('微信提醒') != -1 || form.hdtx.toString().indexOf('短信提醒') != -1" label="" style="margin-bottom:10px; padding-left:20px;">
							<em style="display:block;clear:both;margin-left:82px;margin-top:6px;margin-bottom:6px;line-height:20px;">提醒时间<span style="color: #9AABB8;">(同时赠礼)</span></em>
							<div class="hdtx_txsj">
								<el-radio class="radio" v-model="tixingshijian" label="1" disabled>即刻提醒</el-radio>
								<cite>(消费满足条件后马上提醒)</cite>
							</div>
						</el-form-item>
					</el-form-item>

					<el-form-item  label="活动门店:"  prop="stores" :rules="filter_rules({required:true})">									
						 <div class='dishDiv'>
						    	<div class='showDishMessage' :key="index" v-for='(store,index) in storeNodes_template'>
									<tzx-tag cursor='default' color='#34495E' size='medium' :closable='!is_find'  @closeThis='deleteStore(store,index)'>{{store.label}}</tzx-tag>
								</div>
								<div class='checkdish' >
									<span @click='storeDialogVisible = true'>选择门店</span>
								</div>
						</div>
					</el-form-item>

					<el-form-item label="投放渠道:" prop="chanels" class="gzzl_tfqd" required>
						<el-checkbox :indeterminate="isIndeterminate" prop="checkAll" @change="handleCheckAllChange" class="checkAll">全部</el-checkbox>
					    <el-checkbox-group v-model="form.chanels" @change="handleCheckedChanelsChange">
					    	<el-checkbox v-for="(item,index) in tfqdData" :key='index' :label="item.id" :name="item.id">{{item.text}}</el-checkbox>
					    </el-checkbox-group>
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
    import {formatDate} from '@/utils/index';
    import {getYouHuiQuanOne,getHuiyuanQudao,getMendian} from '@/api/home'
    import { TzxTreeSelect } from '@/components/tzxtreeselect';
    import { TzxCouponView } from '@/components/tzxcouponview';
    import { TzxTag } from '@/components/tag'
    import {findAttentionGift,findCouponList,saveAttentionGift,getMemberLevel,saveConsumptionCoupons,getConsumptionCouponsList, findConsumptionTemplate,findConsumptionDetail,findPaymentMode} from '@/api/activity'
    import axios from "axios";
	export default {
		components:{TzxCouponView,TzxTreeSelect,TzxTag},	 
      	data() {
      		return {
      	
			loading1:false,		
			//门店开始
			defaultProps: {
				children: 'children',
				label: 'labelc',
				name: 'label',
				id: 'id',
				count: 'count'
			},
			storeData:[],
			storeDialogVisible:false,
			storeCheckedIds:[],
			storeNodes:[],
			storeNodes_template:[],
			storeTotal:0,
			data:[],
			checkedIds:[],
			nodes:[],
			nodes_dish:[],//点击确定按钮 才让选择的菜品展示 不能做数据双向绑定
			total:0,
			is_find:false,
			//门店结束
		
		
			memberLevel: [],//会员等级
			memberLevelOne: '',//会员等级参数
			rule_id:0,//
			activityRuleList:[{//添加规则
			    rule_id:0,
				customer_limits: 0,
				if_cycle_reward: '0',
				cycle_reward_num: 0,
				tl: [],
				yhqCheckedData:[],
				yhqCheckedData_show:[],
				checked:true,
			}],
			hdgz:{//选择优惠券当前活动规则数组的当前对象
				customer_limits: 0,
				if_cycle_reward: '0',
				cycle_reward_num: 0,
				tl: [],
				yhqCheckedData:[],
				yhqCheckedData_show:[],
				checked:true,
			},

			moneySource: '',
			activityRules: [],
			activityType: 'xfzq',
	      	isclass:false,//不显示块
			reward_money_payments: [], 
			payments: [],
	      	acitivities:[],//已经创建得活动列表
      	
			checkAll: false,//全选
			modecheckAll: false,//全选  
			isIndeterminate: false,
			isModeIndeterminate: false,  
      	
	      	tishi:false,
	      	tixingshijian:"1",//提醒时间
	      	hdzl:[],//活动赠礼
	      	/*yhqData:[],//优惠券*/
	      	
	      	tfqdData:[],//投放渠道
      	
	      	yhqAllData:[],//优惠券all
	      	yhqFiterData:[],//过滤名称搜索的优惠券
	      	yhqCheckedDataEditAdd:[],//编辑或者选择确定优惠券是 过程变量
	      	yhqCheckedData:[],//已经选择的优惠券
	      	yhqCheckedData_temp:[],//已经选择的优惠券
	      	yhqOneData:{},//查看单个优惠券
	      	searchText:"",//优惠券搜索名称的文本
	      	yhqZengQuan:false,//赠送优惠券复选框默认 false 不显示赠券设置
	      	yhqZengJiFen:false,//赠送积分复选框默认 false 不显示赠券设置
      	
      		queryParams: {
					syn_status: '',//优惠券同步状态
					searchText:'',//优惠券搜索名称，按照名称搜索
			},
	      	pickerOptions0: {
	          disabledDate(time) {
	            return time.getTime() < Date.now() - 8.64e7;
	          }
	        },
	        pickerOptions1: {
	          shortcuts: [{
	            text: '今天',
	            onClick(picker) {
	              picker.$emit('pick', new Date());
	            }
	          }]
	        },
	        value1: '',
	        value2: '',
	        dialogVisible: false,
	        dialogCopy:false,
	        dialogSelectYouhuiQuan:false,
			dialogAddYouhuiQuan:false,
			dialogViewYouhuiQuan:false,
			dialogMendian:true,
			filterText: '',
			totalcount:0,
			total:0,
	        chanels:[],//渠道 表单验证使用
	        form: {
				subject:"",//主题
				start_time:"",
				end_time:"",
				reward_money_source: "0",//金额来源
				reward_money_payments: [],//付款方式
				store_ids:"",//门店 0全部
				chanels:[],
				reward_credit:0,//积分
				tl: [],
				activity_type:"evalgift",//默认赠礼
				introduction:"",
				remark:"",//无
				reason:"",//无
				stores:'0',
				qunti:[], //默认群体
				hdzl:[],//活动赠礼
				hdtx:[],//活动提醒
				memberLevelOne:'',//会员等级
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
				reward_money_source: [{
					required: true,
					message: '请选择金额来源',
					trigger: 'change'
				}],
				memberLevelOne: [{
						type: 'integer',
						required: true, message: '请选择会员等级', trigger: 'change' 
				}],
				/*hdzl: [{
					type: 'array',
					required: true,
					message: '请选择活动赠礼',
					trigger: 'change'
				}],*/
				hdtx: [{
					type: 'array',
					required: true,
					message: '请选择活动提醒',
					trigger: 'change'
				}],
				chanels: [{
					type: 'array',
					required: true,
					message: '请选择渠道',
					trigger: 'change'
				}]
	        },
	 		activityId:''    //form表单回显时用到
	      };
    },
    methods:{
		addFixedItem(){
			this.rule_id = this.rule_id+1;
			this.activityRuleList.push(	{//选择优惠券当前活动规则数组的当前对象
			    rule_id:this.rule_id,
				customer_limits: 0,
		   		if_cycle_reward: '0',
				cycle_reward_num: 0,
				tl: [],
				yhqCheckedData:[],
				yhqCheckedData_show:[],
				checked:true
			});
		
    	},
    	removeFixedItem(item){
			let index = this.activityRuleList.indexOf(item)
			if(index !== -1) {
				this.activityRuleList.splice(index, 1)
			}
		},
    	dateFilter(value) {
			if(value!=null&&value!=""){
				return value.substring(0, 10);
			}else{
				return "";
			}
		},
    	handleCheckAllChange(event) {
    		let arrays = [];
    		this.tfqdData.forEach(item=>{
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
		handleModeCheckAllChange(event) {
			let arrays = [];
			this.payments.forEach(item => {
				arrays.push(item.id);
			})
			this.form.reward_money_payments = event.target.checked ? arrays : [];
			this.isModeIndeterminate = false;
		},
		handleModeCheckedChanelsChange(value) {
			/*判断当前是否全部勾选*/
			let checkedCount = value.length;
			this.modecheckAll = checkedCount === this.payments.length;
			this.isModeIndeterminate = checkedCount > 0 && checkedCount < this.payments.length;
		},
    	changTiShi(){
    		this.tishi= !this.tishi;
    	},
    	openCoupons(){
    		this.dialogAddYouhuiQuan = false;
    		this.dialogSelectYouhuiQuan =false;           
    		this.$router.push('/card/electroniccoupon')
    	},
    	onSubmit(form) {
	        this.$refs[form].validate((valid) => {
	          if (valid) {//提交代码
	          	//处理活动周期
          		var start = new Date(this.form.start_time);  
	            let start_time=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
			  	var end = new Date(this.form.end_time);  
	            let end_time=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
				if(start.getTime()>end.getTime()){
					this.$message({
						type: 'error',
						message: '结束日期不能晚于开始日期'
					});
					return false;
				}
					
	          	//处理可赠金额来源的支付方式
				let reward_money_payments = this.form.reward_money_payments.join(",");
				let isAddOneYhq = false;//判断有没有添加优惠券
				let isNumberYhq = false;//判断优惠券是不是整数
				
				this.activityRuleList.forEach(item=>{
					if(item.yhqCheckedData.length==0){
						isAddOneYhq = true;
						return;
					}else{
						this.yhqCheckedData.forEach(item =>{//每个优惠券至少添加1张
							let reg_zhengshu = /^[0-9]*[1-9][0-9]*$/;
							if(reg_zhengshu.test(item.reward_coupon)){//正整数
							}else{//正整数
									isNumberYhq = true;
									return;
							}
						});
					}
				});
				if(isAddOneYhq){
					this.$message({
						type: 'error',
						message: '请选择优惠券'
					});
					return false;
				}
				if(isNumberYhq){
						this.$message({
							type: 'error',
							message: '请输入正整数'
						});
						return false;
				}
				
				//过滤删除 yhqCheckedData:[],checked:true 这两个属性
				let limits  = [];
				this.activityRuleList.forEach(item=>{
					let yhq = [];
					item.yhqCheckedData_show.forEach(item2=>{
							let obj = item2.tl;
							obj.reward_coupon = item2.reward_coupon;
							yhq.push(obj);
					});
					limits.push({
						customer_limits: item.customer_limits,
						if_cycle_reward: item.if_cycle_reward,
						cycle_reward_num: item.cycle_reward_num,
						tl: yhq
					});		
				});
				
				let activity_rules = [];
				activity_rules.push({
						level_id:this.form.memberLevelOne ,//会员等级
						limits:limits //活动规则
				})

				//消费金额重复和空
				let sumList = [];
				activity_rules[0].limits.forEach(item=>{
					sumList.push(item.customer_limits);

				});
				
				/*var s = sumList.join(",")+",";
				sumList.forEach((item)=>{
					if(item == ''){
						this.$message({
							type: 'error',
							message: '消费金额不能为空'
						});
					}else if(s.replace(item+",","").indexOf(item+",")>-1) {
						this.$message({
							type: 'error',
							message: '消费金额重复'
						});
					}
				});	*/
				//校验是活动规则数组中的每个活动规则 单笔消费金额 不能空，不能为0，不能重复
				let isRepeatNull = Assist.isRepeatArrays(sumList);
				if(isRepeatNull.isNull){
					this.$message({
						type: 'error',
						message: '消费金额不能为空'
					});
					return false;
				}
				if(isRepeatNull.isZero){
					this.$message({
						type: 'error',
						message: '消费金额不能为0'
					});
					return false;
				}
				if(isRepeatNull.isRepeatData){
					this.$message({
						type: 'error',
						message: '消费金额重复'
					});
					return false;
				}
				
				//判断次数是否大于0
				let cishu = false;
				activity_rules[0].limits.forEach(item=>{
					if(item.if_cycle_reward=="1" && item.cycle_reward_num<=0){
						cishu = true;
					}
				});
				if(cishu){
					this.$message({
						type: 'error',
						message: '循环送请输入大于0的次数'
					});
					return false;
				}
				  	
	          	//活动提醒
			  	let alert_mode=0;						//0 :不提醒，1：微信，2：短信，3 微信+短信
		        if(this.form.hdtx !=null ){
		        	if(this.form.hdtx.toString().indexOf("微信提醒") !=-1 && this.form.hdtx.toString().indexOf("短信提醒") !=-1 ){
		        		alert_mode = 3
		        	}else if(this.form.hdtx.toString().indexOf("微信提醒")!=-1){
		        		alert_mode = 1
		        	}else if(this.form.hdtx.toString().indexOf("短信提醒")!=-1){
		        		alert_mode = 2
		        	}
		        }
	          	    //活动门店
	          	    //拼装门店字符串
					//如果是全部门店则存储0
					
					let mendian_str="";
					//判断门店下是否有数据 至少要要有一个数据
					if(this.storeNodes_template.length==0){
						this.$message({
							type: 'error',
							message: '至少选择一个门店'
						});
						return false;
					}
					let mendian = [];
					this.storeNodes_template.forEach(item =>{
						mendian.push(item.id);
				  	});
				  	mendian_str = mendian.join(",");
	          	    
	          	   //投放渠道
				  	let qudao_str = this.form.chanels.join(",");
	          	    
					let data = "id="+this.activityId+
								"&subject="+this.form.subject+
							    "&start_time="+start_time+
								"&end_time="+end_time+
								"&reward_money_source="+this.form.reward_money_source+
								"&reward_money_payments="+reward_money_payments+
								"&store_ids=" + mendian_str +
								"&activity_rules="+JSON.stringify(activity_rules)+
								/*"&activity_rules="+activity_rules+*/
								"&chanels="+qudao_str+
								"&alert_mode="+alert_mode+
								"&activity_type=xfzq"+
								"&introduction="+
								"&remark="+
								"&reason="+
								"&sms_template_id="
								this.loading1 = true;
							    saveConsumptionCoupons(data).then((response) => {
							    	this.loading1 = false;
									if(response.success){
										this.$message({
											type: 'success',
											message: '保存成功'
										});
										this.$router.push({
											path:"/marketing/activitymanagement",
											hash:'new'
										});
										
									}else{
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
	    loadQudao(){
			//加载渠道
			getHuiyuanQudao().then((response) => {
				this.tfqdData = response;
			});
			//加载门店信息
			getMendian().then((response) => {
				this.storeData =  response.data;
			});
		},
		loadFindAttentionGift(){
			getConsumptionCouponsList().then((response) => {
				this.acitivities =  response.data;
			})
		},
		loadGetMemberLevel(){
			getMemberLevel().then((response) => {
				this.memberLevel = response;
			})
		},
		loadFindConsumptionTemplate() {
			findConsumptionTemplate().then((response) => {
				this.message = response;
			})
		},
		loadFindPaymentMode() {
			let data = "page=1"+
					   "&rows=200" +
					   "&status=1";
			findPaymentMode(data).then((response) => {
				//this.message = response;
				this.payments = response.rows;
			})
		},
		getYouHuiQuan:function(item){//选择优惠券弹出框  
			this.dialogSelectYouhuiQuan = true;
			this.hdgz = item;
			let data = '';
			if(this.yhqAllData.length==0){//防止重复请求 优惠券接口
				findCouponList(data).then((response) => {
					this.yhqAllData = response;
					this.dealfindAllCoupons(this.yhqAllData,"add");
				});
			}
		},
		viewYouhuiQuan:function(id){//查看单个优惠券
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
				storesname.forEach(item=>{
					storeidsname.push(item.org_full_name);
				})
				let storeids_strname = storeidsname.join(",")
				obj.store_names = storeids_strname;
				//2,周期
				let use_cycle_names = this.yhqOneData.use_cycle.split(",");
				let use_cycle_names_new =[];
				use_cycle_names.forEach(item=>{
					if(item=="2"){
						use_cycle_names_new.push("周一");
					}else if(item=="3"){
						use_cycle_names_new.push("周二");
					}else if(item=="4"){
						use_cycle_names_new.push("周三");
					}else if(item=="5"){
						use_cycle_names_new.push("周四");
					}else if(item=="6"){
						use_cycle_names_new.push("周五");
					}else if(item=="7"){
						use_cycle_names_new.push("周六");
					}else if(item=="1"){
						use_cycle_names_new.push("周日");
					}
				})
				let cycle_names = use_cycle_names_new.join(",")
				obj.cycle_names = cycle_names;
				
				//3,改造使用渠道
				let chanels = this.yhqOneData.use_chanel;
				let chanelids = [];
				chanels.forEach(item=>{
					chanelids.push(item.chanel_name);
				})
				let chanelids_str = chanelids.join(",")
				obj.use_chanel = chanelids_str;
				
				this.yhqOneData =obj;
			});
		},
		youhuiquanQueding:function(){//选择优惠券，单给优惠券的详细信息绑定到相应的对象上
			this.dialogSelectYouhuiQuan = false;
			//优惠券数组 
		   // this.dealfindAllCoupons(this.hdgz.yhqCheckedData,"add");
		    this.isclass = true;
		    // 当前选中优惠券的id数组  this.hdgz.yhqCheckedData 
			//放回添加规则数组中
			let activityRuleListNew = [];
			this.activityRuleList.forEach(item =>{
				if(item.rule_id == this.hdgz.rule_id){
					let checkArrays = [];
					item.yhqCheckedData.forEach(item_my => {
						let ojb = this.yhqAllData.filter(item2=>item2.id == item_my)[0];
						let ojb2 = item.yhqCheckedData_show.filter(item2=>item2.id == item_my)[0];
				  		if(ojb2 != null){// 存在
				  			checkArrays.push(ojb2);
				  		}else{//不存在
				  			checkArrays.push(ojb);
				  		}
					});
					//item.yhqCheckedData = checkArrays;
					item.yhqCheckedData_show = checkArrays;
					
					activityRuleListNew.push(this.hdgz);
				}else{
					activityRuleListNew.push(item);
				}
			});
			this.activityRuleList = activityRuleListNew;
		},
		dealfindAllCoupons(arrays_temp,type){ //arrays_temp 所有的优惠券信息  type 新增
			//this.dealfindAllCoupons(this.yhqAllData,"add");
			this.yhqCheckedDataEditAdd = [];
			let object = {};
			arrays_temp.forEach(item =>{
				let id = 0;
				if(type=="add"){
					id = item.id;
				}else{
					id = item.class_id;
				}
				if(id!=null){
					this.yhqOneData= [];
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
						
						//改造时间
						//obj.times_period = this.yhqOneData.times;
						
						let times_period =[];
						if(this.yhqOneData.times != undefined){
							this.yhqOneData.times.forEach(item2=>{
								let temp ={};
								temp.begintime = item2.begintime;
								temp.endtime = item2.endtime;
								times_period.push(item2);
							})
							obj.times_period = times_period;
						}
						
						//改造使用门店
						let stores = this.yhqOneData.store_ids;
						let storeids = [];
						if(stores!=null){
							stores.forEach(item3=>{
								storeids.push(item3.store_id);
							})
						}
						
						let storeids_str = storeids.join(",")
						obj.store_ids = storeids_str;
						
						//改造使用渠道
						let chanels = this.yhqOneData.use_chanel;
						let chanelids = [];
						if(chanels != null){
							chanels.forEach(item4=>{
								chanelids.push(item4.chanel);
							})
						}
						let chanelids_str = chanelids.join(",")
						obj.use_chanel = chanelids_str;
						
						obj.use_cycle = this.yhqOneData.use_cycle;
						obj.bill_limit_money = this.yhqOneData.bill_limit_money;
						obj.class_type_name = "";
						
						if(type=="add"){
							obj.reward_coupon = 1;
						}else{
							obj.reward_coupon = 0;
						}
						obj.validity_days = this.yhqOneData.validity_days;
						
						item.tl =obj;
						item.id = this.yhqOneData .class_id;
			  			item.face_value = this.yhqOneData.face_value;
			  			item.coupons_pro = this.yhqOneData.coupons_pro;
			  			/*item.text = item.cn;*/
			  			
			  			if(type=="add"){
							item.reward_coupon = 1;
						}else{
							item.reward_coupon = item.reward_coupon;
						}
						//this.yhqCheckedDataEditAdd.push(item);
						
			  			//判断当前数组中是否有改 id 的优惠券
			  			/*let filterObj = this.yhqCheckedDataEditAdd.filter(item20=>item20.id == item.id)[0];
			  			if(filterObj != null){//存在 删除之前的，添加新的
			  				this.yhqCheckedDataEditAdd.shift(filterObj);
			  			}*/
			  			this.yhqCheckedDataEditAdd.push(item);
			  			this.yhqAllData = this.yhqCheckedDataEditAdd;
			  			
			  			
			  			/*if(type=="add"){
							this.yhqAllData = this.yhqCheckedDataEditAdd;
						}else{
							this.hdgz.yhqCheckedData = [];
							this.yhqCheckedDataEditAdd.forEach(item=>{
								this.hdgz.yhqCheckedData.push(item.class_id);
							})
							this.hdgz.yhqCheckedData_show = this.yhqCheckedDataEditAdd;
							
							//放回添加规则数组中
							let activityRuleListNew = [];
							this.activityRuleList.forEach(item5 =>{
								if(item5.rule_id == this.hdgz.rule_id){
									activityRuleListNew.push(this.hdgz);
								}else{
									activityRuleListNew.push(item5);
								}
							});
							this.activityRuleList = activityRuleListNew;
						}*/
			  			
					});
				}
		    });
		},

      open() {
        this.$router.push("/marketing/activitymanagement");
      },
      handleClose(done) {
        done();
      },
      handleCopyClose(done) {
        done();
      },
      handleSelectYouhuiQuanClose(done) {
      	this.youhuiquanQueding();
        done();
      }
      ,
      handleAddYouhuiQuanClose(done) {
        done();
      }
      ,
      handleViewYouhuiQuanClose(done) {
        done();
      },
      handleMendianClose(done) {
        done();
      },
	 handleQuntiClose(done) {
        done();
     },
     scrollfun1(){
	   		this.scroll1 = false;
	 },
  	//删除所选项
  	deleteItem:function(items,it,str,e){
       
		if(str=="mendian"){//判断是门店，把相应的门店树复选框置为false
			let arrays = [];
	        items.forEach(item =>{//把当前的对象在 对象数组中删除
	        	if(item.id != it.id){
	        		arrays.push(item);
	        	}
			});
			this.nodes_temp = arrays;
			//门店树绑定
			this.nodes.forEach(item =>{
				if(item.id == it.id){
					this.nodes.shift(item);
					this.totalcount = this.totalcount-1;
					this.$refs.tree2.setChecked(item.id,false,false);
				}
		  	});
		}
		else if(str=="yhq"){//判断是优惠券，
			//this.yhqCheckedData = arrays;
			//items 当前活动规则对象
			this.hdgz = items;
			let arrays = [];
	        items.yhqCheckedData.forEach(item =>{//把当前的对象在 对象数组中删除  items.yhqCheckedData 放的是 id数组
	        	if(item != it.class_id){
	        		arrays.push(item);
	        	}
			});
			this.hdgz.yhqCheckedData = arrays;
			
			let arrays2 = [];
	        items.yhqCheckedData_show.forEach(item =>{//把当前的对象在 对象数组中删除  items.yhqCheckedData_show 放的是 对象数组
	        	if(item.id != it.class_id){
	        		arrays2.push(item);
	        	}
			});
			this.hdgz.yhqCheckedData_show = arrays2;
			//this.hdgz.yhqCheckedData_show = arrays;
			
			//放回添加规则数组中
			let activityRuleListNew = [];
			this.activityRuleList.forEach(item =>{
				if(item.rule_id == this.hdgz.rule_id){
					activityRuleListNew.push(this.hdgz);
				}else{
					activityRuleListNew.push(item);
				}
			});
			this.activityRuleList = activityRuleListNew;
		}
  	 },
	
	searchYouHuiQuan:function(){//优惠券筛选  通过优惠券的名称筛选
		
 		/*if(this.searchText != null && this.searchText !=""){
 			this.yhqFiterData=[];
 			this.yhqAllData.forEach(item =>{
 				let name = item.text;
	        	if(name.indexOf(this.searchText)>=0){
			        this.yhqFiterData.push(item);
			    }
	        });
 		}else{
	        this.yhqFiterData = this.yhqAllData;
 		}*/
 			let data = 'syn_status=' + this.queryParams.syn_status +
						'&class_name=' + this.queryParams.searchText;
			findCouponList(data).then((response) => {
				this.yhqAllData = response;
				this.dealfindAllCoupons(this.yhqAllData,"add");
			});
	},
	
	//活动门店 开始
	storeMakeSureChecked(){
    	this.storeNodes_template = this.storeNodes;
    	this.storeDialogVisible = false;
	},
	storeBoxChange(nodes,total){
      	this.storeNodes = nodes;
      	this.storeTotal = total;
	},
	deleteStore(store,index){
		this.storeNodes_template.splice(index, 1);
	},
	dealfindAllCoupons_update(activityRuleList){
			let object = {};
			this.activityRuleList = [];
			activityRuleList.forEach(item =>{
				let yhqCheckedData_show_temp = [];
				item.yhqCheckedData_show.forEach(item2 =>{
					let id = item2.class_id;
					if(id!=null){
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
							
							//改造时间
							//obj.times_period = this.yhqOneData.times;
							
							let times_period =[];
							if(this.yhqOneData.times != undefined){
								this.yhqOneData.times.forEach(item22=>{
									let temp ={};
									temp.begintime = item22.begintime;
									temp.endtime = item22.endtime;
									times_period.push(item22);
								})
								obj.times_period = times_period;
							}
							
							//改造使用门店
							let stores = this.yhqOneData.store_ids;
							let storeids = [];
							if(stores!=null){
								stores.forEach(item3=>{
									storeids.push(item3.store_id);
								})
							}
							
							let storeids_str = storeids.join(",")
							obj.store_ids = storeids_str;
							
							//改造使用渠道
							let chanels = this.yhqOneData.use_chanel;
							let chanelids = [];
							if(chanels != null){
								chanels.forEach(item4=>{
									chanelids.push(item4.chanel);
								})
							}
							let chanelids_str = chanelids.join(",")
							obj.use_chanel = chanelids_str;
							
							obj.use_cycle = this.yhqOneData.use_cycle;
							obj.bill_limit_money = this.yhqOneData.bill_limit_money;
							obj.class_type_name = "";
							
							/*if(type=="add"){
								obj.reward_coupon = 1;
							}else{
								obj.reward_coupon = 0;
							}*/
							obj.reward_coupon = 0;
							
							obj.validity_days = this.yhqOneData.validity_days;
							
							item2.tl =obj;
							item2.id = this.yhqOneData .class_id;
				  			item2.face_value = this.yhqOneData.face_value;
				  			item2.coupons_pro = this.yhqOneData.coupons_pro;
				  			/*item.text = item.cn;*/
				  			
				  			/*if(type=="add"){
								item.reward_coupon = 1;
							}else{
								item.reward_coupon = item.reward_coupon;
							}*/
							item2.reward_coupon = item2.reward_coupon;
							item2.text= item2.cn;
							yhqCheckedData_show_temp.push(item2);
				  			
						});
					}
					
				});
				
				this.activityRuleList.push(	{//选择优惠券当前活动规则数组的当前对象
				    rule_id:item.rule_id,
					customer_limits: item.customer_limits,
			   		if_cycle_reward: item.if_cycle_reward,
					cycle_reward_num: item.cycle_reward_num,
					tl: item.tl,
					yhqCheckedData:item.yhqCheckedData,
					yhqCheckedData_show:yhqCheckedData_show_temp,
					checked:true
				});
		    });
		},

	updateFormData(id,activity_type){
		this.activityId = id;
		let query = 'id='+id+'&activity_type='+activity_type;
		
			findConsumptionDetail(query).then(response=>{
				let detail = response;
				/* form 表单回显*/
				this.form.subject = detail.subject;//主题  
				this.form.start_time = Assist.formatStrToDate(detail.start_time);
				this.form.end_time = Assist.formatStrToDate(detail.end_time);
				
				//来源
				if(detail.reward_money_source == 0) {
					this.form.reward_money_source = "0";
				}else{
					this.form.reward_money_source = "1";
					let payments = detail.payments;
					payments.forEach((item, index) => {
						this.form.reward_money_payments.push(item.id);
					});
				}

				this.form.memberLevelOne = detail.activity_rules[0].level_id;

				//规则 
				
				 //优惠券展示
			  /*let coupons_temp = detail.coupons;
			  this.dealfindAllCoupons(coupons_temp,"update");
			  this.isclass = true;//回显已经选择得优惠券*/
			  
			  
				let list = detail.activity_rules[0].limits;
				let activityRuleList_temp = [];
				list.forEach((item,index) =>{
					this.rule_id = this.rule_id+1;
					let yhqCheckedData_temp = [];
					let yhqCheckedData = [];//ids数组
                   	item.tl.forEach(item2=>{
                   		let temp = Assist.CloneObj(item2);
						temp.tl = item2;
						yhqCheckedData_temp.push(temp);
						yhqCheckedData.push(item2.class_id);
					})
					activityRuleList_temp.push({
						rule_id: this.rule_id,
						customer_limits: item.customer_limits,
						if_cycle_reward: item.if_cycle_reward+"",
						cycle_reward_num: item.cycle_reward_num,
						tl: item.tl,
						yhqCheckedData_show:yhqCheckedData_temp,
						yhqCheckedData:yhqCheckedData,
						checked:true,
					})
				})
				this.isclass = true;	
				this.activityRuleList = activityRuleList_temp;
				//处理 显示信息 	yhqCheckedData_show显示信息不全
				this.dealfindAllCoupons_update(this.activityRuleList);
				//门店勾选
				this.storeNodes = [];
				this.storeNodes_template = [];
				this.storeTotal = detail.stroes.length;
				detail.stroes.forEach(item => {
					let obj_temp = {};
					obj_temp.id = item.store_id;
					obj_temp.label = item.org_full_name;
					obj_temp.plabels = item.parent_name;
					this.storeNodes.push(obj_temp);
					this.storeNodes_template.push(obj_temp);
					this.storeCheckedIds.push(item.store_id); //门店回显ids
				});
	    		
				//提醒方式
				if(detail.alert_mode==0){
					this.form.hdtx = [];
				}
				else if(detail.alert_mode==1){
					this.form.hdtx.push('微信提醒');
				}
				else if(detail.alert_mode==2){
					this.form.hdtx.push('短信提醒');
					//短信提醒 不用修改
				}
				else{
					this.form.hdtx.push('微信提醒');
					this.form.hdtx.push('短信提醒');
				}
		   
				/*渠道回显*/
				detail.chanels.map((item,index)=>{
					this.form.chanels.push(item.chanel);
				});
				
				if(this.tfqdData.length == detail.chanels.length){
					this.isIndeterminate = true;
					this.checkAll = true;
				}
			});
	 	} 
	},
	created() {//下面的是boss 请求地址
			_czc.push(["_trackEvent", "营销活动-消费赠券", "新增编辑"]);//埋点统计
			this.loadFindAttentionGift();//已创建的关注赠礼活动列表
			this.loadGetMemberLevel();//会员等级
			this.loadFindConsumptionTemplate();//短信模板
			this.loadQudao();//会员群体渠道
			this.loadFindPaymentMode();//付款方式
			if(this.$route.query.id!=undefined&&this.$route.query.activity_type!=undefined){
				this.updateFormData(this.$route.query.id,this.$route.query.activity_type);	
			}
	}
  }
</script>

<style rel="stylesheet/scss" lang="scss" >

/*** 消费赠券 ***/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
.consumptionCoupons .explainIcon{
	width: 16px;
	height: 16px;
}
.consumptionCoupons .specialItem .el-radio-group .el-form-item{
	padding-left: 0;
}
.consumptionCoupons .specialItem .el-form-item{
	padding-left: 30px;
}
.consumptionCoupons .svg-icon{
/*	vertical-align: middle;*/
	margin: 0 0 0 10px;
}
.consumptionCoupons .activityRuleList{
	width: 90%;
	height: auto;
    padding: 20px;
    border: 1px solid #D8E5EC;
    border-radius: 3px;
    margin-left: 30px;
	position: relative;
	margin-bottom: 16px;
	overflow: hidden;
	// clear: both;
}
.consumptionCoupons .activityRuleList .el-form-item{
	min-height: 37px;
	line-height: 37px;
	vertical-align: middle;
}
.consumptionCoupons .activityRuleList .el-input{
	width: 118px;
}
.consumptionCoupons .activityRuleList .el-input:nth-child(2){
	margin-left: 33px;
}
.consumptionCoupons .el-button--text{
	position: absolute;
	right: -10px;
	top: -10px;
}
.consumptionCoupons .addRuleBtn{
	padding-left: 40px;
    color: #0C9AFF;
    cursor: pointer;
}
.consumptionCoupons .activityRuleList .el-input-group--append .el-input__inner{
	text-align: right;
}
/*门店*/
.consumptionCoupons{
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


/* 添加优惠券的样式 */
.activityRuleList .hdzl {
	min-height: 40px;
	padding: 0 40px 0 93px;
	background: #F5F9FB;
	border-radius: 3px;
	overflow: hidden;
}
	
.activityRuleList .pjzl_hdzl .hdzl .zengquanshezhi {
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #576D7A;
	line-height: 14px;
	height: 40px;
	width: 70px;
	padding-top: 26px;
	float: left;
}

.activityRuleList .hdzl .zqsh_right {
	float: left;
}
.activityRuleList .hdzl .zqsh_right .addyouhuiquan img {
	float: left;
	height: 14px;
	margin: 13px 4px 13px 0;
}
.activityRuleList .hdzl .zqsh_right .addyouhuiquan div {
	width: 200px;
	line-height: 40px;
	height: 40px;
	color: #0C9AFF;
}
.activityRuleList .hdzl ul {
	float: left;
	margin: 0;
	padding: 0;
	list-style: none;
	padding-top: 5px;
}
.activityRuleList .hdzl ul li {
	line-height: 14px;
	margin-top: 13px;
	height: 20px;
}
.activityRuleList .hdzl ul li em {
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
.activityRuleList .hdzl ul li em:nth-child(3) {
	margin-left: 10px;
   	margin-right: 10px;
}
.activityRuleList .hdzl ul li img {
	display: block;
	float: left;
	margin-top: 8px;
}
.activityRuleList .hdzl .el-input {
	width: 120px;
	float: left;
}
.activityRuleList .hdzl .yhq {
	margin-left: 50px;
}

.activityRuleList .hdzl .view {
	margin-left: 10px;
}

.activityRuleList .hdzl .delete {
	margin-left: 10px;
}
.activityRuleList .hdzl .el-input__inner{
	text-align: right;
}
.input_height_28 .el-input__inner {
	height: 28px;
	line-height: 28px;
}


/**修改表单的样式**/
 .divOne{
 	height:250px;
 	background: #FFFFFF;
	border: 1px solid #EAF1F6;
 	margin-left:15px;
 }
/**************优惠券详情 开始*******************/
.viewyhq_dialog{
	width:440px;
	/*height:230px;*/
}
.viewyhq_dialog .el-dialog__header{
	border:none;
	height:0px;
}
/**************优惠券详情 结束*******************/
 
/**************新增优惠券 开始*******************/
.addyhq_dialog{
	width:460px;
	height:320px;
}
.addyhq{
	margin: 0 auto;
    margin-top: 20px
}
.addyhq img{
	margin-left: 180px;
	width:100px;
	height:100px;
}

.addyhq cite{
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
.addyhq_add{
	margin-top: 31px;
    margin-left: 181px;
}

/**************新增优惠券 结束*******************/ 

 /*****选择优惠券 开始*******/
.xzyhq_dialog{
	width:656px;
	height:500px;
}
.xzyhq_dialog .el-dialog_body{
	width:656px;
	height:500px;
	padding:20px 12px;
}
.xzyhq_close .bottom_64_32 .queding {
    margin-left: 10px;
    margin-right: 0px;
}
.xzyhq_dialog .xzyhq{
	height:397px;
}
.xzyhq_dialog .xzyhq_close{
	width:656px;
	height:60px;
	background: #F4F9FC;
	box-shadow: 0 0 4px 0 rgba(44,70,128,0.16);
}
.xzyhq_dialog .xzyhq_close .bottom_64_32{
	margin-top:14px;
	margin-left:259px;
} 
.xzyhq {
	padding:0px;
}
.xzyhq .xzyhq_search{
	height:34px;
	padding-top: 20px;
    padding-left: 20px;
    cursor:pointer;
}
.xzyhq .xzyhq_search .el-input{
	float:left;
	width:180px;
}
.xzyhq .xzyhq_search .el-input__inner{
	height:28px;
	width:180px;
}
.xzyhq .xzyhq_search h1{
	font-size:12px;
	line-height: 12px;
	font-size: 12px;
	color: #0C9AFF;
	letter-spacing: 0;
	float:left;
	margin-left:12px;
	font-weight: normal;
	margin-top: 7px;
}
.xzyhq .xzyhq_show{
	clear:both;
	display:block;
    height:352px;
    padding-left: 12px;
    padding-top: 9px;
}
.xzyhq .xzyhq_show ul{
	margin:0;
	padding:0;
	list-style: none;
}
.xzyhq .xzyhq_show ul li{
	float:left;
	width:315px;
	height:110px;
	background-image: url(../../assets/huodong/yhjbg.png);
	background-size: 100%;
}
.xzyhq .xzyhq_show ul li:hover{
	float:left;
	width:315px;
	height:110px;
	background-image: url(../../assets/huodong/yhjbg.png) 0 50%;
	background-size: 100%;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_left{
	float:left;
	margin-left:26px;
	margin-top:32px;
	width:88px;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_up cite{
	display:block;
	float:left;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #FF6161;
	line-height: 14px;
	font-style: normal;
	margin-top:12px;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_up tt{
	display:block;
	font-family: PingFangSC-Regular;
	font-size: 30px;
	color: #FF6161;
	line-height: 30px;
	margin-left:4px;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_down{
	margin-top:4px;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_down em{
	clear: both;
	font-style: normal;
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #576D7A;
	line-height: 12px;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_right{
	padding-left:100px;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left{
	float:left;
	float: left;
    margin-top: 30px;
    margin-left: 10px;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left cite{
	font-family: PingFangSC-Regular;
	font-size: 18px;
	color: #34495E;
	line-height: 18px;
	width:150px;
	display:block;
	font-style: normal;
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
	
}
.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left em{
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #9AABB8;
	line-height: 12px;
	display:block;
	font-style: normal;
	margin-top:16px;
}

.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right{
    float: left;
    margin-top: 40px;
    margin-left: 0px;
    width: 20px;
    height: 20px;
}
.xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right .el-checkbox__inner{
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
.xzyhq  .xzyhq_show .el-checkbox-group .el-checkbox__label{
	display:none;
}

/*****选择优惠券 结束*******/
 

 /**消费后评价赠礼页面**/
 .consumptionCoupons{
 	height:auto;;
 	background: #FFFFFF;
 	display:table;
 }
 .consumptionCoupons h1{
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
 .consumptionCoupons h1 em{
 	margin-left: 10px;
 	font-style:normal;
 	font-size:16px;
 	letter-spacing: 0;
 }
 .consumptionCoupons h1 cite{
 	margin-left: 16px;
 	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #9AABB8;
	letter-spacing: 0;
	line-height: 16px;
	font-style:normal;
 }
.consumptionCoupons .demo-ruleForm .hdzq_date1{
	float:left;
}
.consumptionCoupons .demo-ruleForm .hdzq_date_em{
	float:left;
	margin-left:5px;
	margin-right:5px;
	font-style:normal;
}
.consumptionCoupons .demo-ruleForm .hdzq_date_em em{
	font-style:normal;
}
.consumptionCoupons .demo-ruleForm .hdzq_date2{
	float:left;
}

 
 /******表单样式 开始******/
.consumptionCoupons .el-form{
	margin-top:20px;
}


.consumptionCoupons .el-date-editor .el-date-editor--date{
	width:230px;
}
/***活动赠礼***/
 .gzzl_hdzl .hdzl{
	margin-left:0px;
	margin-right:40px;
	padding-left:93px;
	background: #F5F9FB;
	border-radius: 3px;
	margin-top: 2px;
}
.gzzl_hdzl .hdzl .zengquanshezhi{
	font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #576D7A;
    line-height: 14px;
    height: 40px;
    width: 70px;
    padding-top: 26px;
    float:left;
}
.gzzl_hdzl .hdzl ul{
	float:left;
	margin:0;
	padding:0;
	list-style: none;
	padding-top: 5px;
	/*margin-left:14px;*/
}
.gzzl_hdzl .hdzl ul li{
	line-height: 14px;
	margin-top:13px;
	height: 20px;
}
.gzzl_hdzl .hdzl ul li em{
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
.gzzl_hdzl .hdzl ul li em:nth-child(3){
	margin-left: 2px;
    width: 89px;
}
.gzzl_hdzl .hdzl ul li img{
	display: block;
    float: left;
    margin-top: 8px;
}
.gzzl_hdzl .hdzl .el-input{
	width: 120px;
    display: block;
    float: left;
}
    
.gzzl_hdzl .hdzl .addyouhuiquan{
	clear: both;
	overflow: hidden;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #0C9AFF;
    line-height: 14px;
    padding-top: 15px;
    background: #F5F9FB;
    border-radius: 3px;
    width:120px;
}
.gzzl_hdzl .hdzl .addyouhuiquan img{
	float:left;
	display: block;
	margin-bottom:21px;
	margin-top: 1px;
}
.gzzl_hdzl .hdzl .addyouhuiquan .tianjia{
	width:100px;
	float:left;
	margin-bottom:20px;
	margin-left: 3px;
	cursor:pointer;
}
.gzzl_hdzl .hdzl .yhq{
	margin-left: 50px;
}
.gzzl_hdzl .hdzl .view{
	margin-left: 10px;
}
.gzzl_hdzl .hdzl .delete{
	margin-left: 10px;
}
.input_height_28 .el-input__inner{
	height:28px;
	line-height: 28px;
}
/**每人赠送**/
.hdzl2{
	margin-left:0px;
	margin-right:40px;
	padding-left:90px;
	background: #F5F9FB;
	border-radius: 3px;
	height:50px;
}
.hdzl2 .meirenzengsong{
	padding-top:11px;
	margin-bottom:11px;
}
.hdzl2 .meirenzengsong cite{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
	font-style: normal;
	margin-right:27px;
}
.hdzl2 .meirenzengsong .el-input__inner{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
}
.hdzl2 .meirenzengsong em{
	margin-left:10px;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
	font-style: normal;
}
/**选择门店 and 选择群体**/
.consumptionCoupons .botton_text{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #0C9AFF;
	line-height: 14px;
	margin-left:16px;
	font-style: normal;
}

.consumptionCoupons .quxiao_and_tijiao{
	height:82px;
	margin-left:40px;
	margin-right:40px;
	border-top: 1px dashed #EAF1F6;
}

 .quxiao_and_tijiao .bottom_64_32{
	margin-left:122px;
	margin-top:30px;
	margin-bottom: 20px;
}
.consumptionCoupons .xuanze{
 	list-style: none;
 	margin: 0;
    padding: 0;
    margin-top: 7px;
    padding-left: 40px;
}
 .consumptionCoupons .xuanze li{
	border: 1px solid #D8E5EC;
	border-radius: 3px;
	width:auto;
	margin-right:18px;
	float:left;
	line-height: 32px;
	margin-bottom: 7px;
}
 .consumptionCoupons .xuanze li em{
	margin-left:8px;
}
.consumptionCoupons .xuanze li img{
	margin-left:5px;
	margin-right:8px;
}
.meirenzengsong .el-input__inner{
	height:28px;
}
.consumptionCoupons .cyqt_person_num{
	background: #FFFAEB;
	border: 1px solid #FFE9A7;
	border-radius: 3px;
	height:32px;
	width:309px;
	padding-left:8px;
	margin-left: 40px;
}
 .consumptionCoupons .cyqt_person_num h1,.cyqt_person_num tt, .cyqt_person_num cite{
	letter-spacing: 0;
	float:left;
	line-height:32px;
}
 .consumptionCoupons .cyqt_person_num tt{
	color: #FF7171;
}
 .consumptionCoupons .cyqt_person_num h1{
	border: none;
	font-size: 14px;
	margin-left: 0px;
	margin-right:0px;
}
.input_height_28{
	height:10px;
	background-image:url(../../assets/huodong/zhang.jpg) no-repeat;
}

/***确认提交框**/
 .consumptionCoupons .querenbox{
	height:360px;
	width:200px;
	background:red;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
	border-radius: 3px;
    position: absolute;
    z-index: 10000px;	
}

/***********会员群体**************/

.xzyhq_dialog .xzyhq_show ul{
	height:332px;
	overflow-y:auto;
}
.consumptionCoupons .el-form .el-form-item__error{
	margin-left: 40px;
}
.consumptionCoupons .el-form .el-form-item .el-form-item .el-form-item__error{
	margin-left: 0px;
}
.consumptionCoupons .yhq_hdzl .el-form-item__content{
	margin-left:32px !important;
}
.consumptionCoupons .yhq_hdzl .el-form-item__error{
	margin-left:90px !important;
}
.consumptionCoupons .yhq_hdzl .el-form-item__label:nth-child(n+2){
	width:22px !important;
}
.mynumber .el-input__inner{
	text-align: right;
}
.consumptionCoupons h2{
	margin:16px 20px 0;
	background: #FFFCF2;
	border-radius: 3px;
	clear: both;
    overflow: hidden;
}
.consumptionCoupons h2 .explainIcon{
	margin: 11px 10px 0 16px;
	float: left;
}
.consumptionCoupons h2 cite{
	font-size: 13px;
    height: 40px;
	line-height: 40px;
	display: inline-block;
	float: left;
}
.consumptionCoupons h2 ul em{
	padding-left:10px;
}
.consumptionCoupons h2 ul{
	padding: 0 34px 10px;
	clear: both;
}
.consumptionCoupons h2 ul li{
	font-size: 12px;
	color: #576D7A;
	line-height: 20px;
}

/*******关注赠礼得活动赠礼 提醒时间*********/
.consumptionCoupons .gzzl_hdzl .txsj{
	background: #F5F9FB;
    border-radius: 3px;
    height: 50px;
    padding-top:15px;
    margin-right: 40px;
}
.consumptionCoupons .gzzl_hdzl .txsj .el-radio__label{
	color: #243546;
}
.consumptionCoupons .gzzl_hdzl .txsj cite{
	color: #9AABB8;
}
.consumptionCoupons .gzzl_hdzl .txsj .el-radio{
	margin-left:92px;
}
.consumptionCoupons .gzzl_hdzl .el-form-item:nth-child(n+1) .el-form-item__content{
	line-height:20px;
}
.consumptionCoupons .yhq_hdzl .el-form-item__error{
	position: relative;
	padding-left:20px;
	padding-top:0px;
}
.consumptionCoupons .activityRemind .el-form-item:nth-child(2){
	padding-left: 28px;
}
.consumptionCoupons .activityRemind .el-checkbox-group .el-checkbox{
	display: block;
	/*margin-left: 40px;*/
}
.consumptionCoupons .activityRemind .el-checkbox-group .el-checkbox:nth-child(1) {
    float: left;
}
.consumptionCoupons .activityRemind .el-checkbox-group cite{
    display: block;
	float: left;
	margin-top:9px;
	margin-left:10px;
	color: #9AABB8;
}
.consumptionCoupons .activityRemind .el-form-item__content{
	margin-left: 32px!important;
}
.consumptionCoupons .hdtx_txsj{
	background: #F5F9FB;
    border-radius: 3px;
    height: 50px;
    padding-left:120px;
    padding-top:9px;
    margin-right: 40px;
	margin-left: -40px;
}
.consumptionCoupons .hdtx_txsj .el-radio .el-radio__label{
	color: #243546;
}
.consumptionCoupons .hdtx_txsj cite{
	color: #9AABB8;
}
.consumptionCoupons .activityRemind .el-form-item__content .el-form-item__error{
	margin-left: 132px;
}
.consumptionCoupons .gzzl_tfqd .el-checkbox-group{
	display:block;
	margin-right: 40px;
	margin-left: 40px;
}
.consumptionCoupons .gzzl_tfqd .el-checkbox-group .el-checkbox{
	margin-right: 15px;
    margin-left: 0;
}
.consumptionCoupons .gzzl_tfqd .checkAll{
	float: left;
    margin-right: 15px;
}


.consumptionCoupons .hdtx_dxtx {
	margin-right: 40px;
	margin-left: 44px;
}
.consumptionCoupons .hdtx_dxtx cite {
	line-height:50px;
}

/***********会员群体**************/

.class-no{
	display:none;
}
.class-yes{
	display:block;
}

//新增
.payments .el-checkbox-group{
	float: left;
	/*margin-left: 10px;*/
}
.payments .checkAll{
	float: left;
}
.payments .el-checkbox,.payments .el-checkbox+.el-checkbox{
	margin-left: 0;
	margin-right: 15px;
}
/*************************mendian 结束 ***********************/






</style>