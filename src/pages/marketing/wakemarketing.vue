<template>
	<div class="context hyhx_zr">
	
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
		
		<!--消费后评价赠礼  开始-->
		<div class="divTwo_hyhx" v-loading.body ='loadingBody'>
		    <h1><em>唤醒赠券</em><cite>将活跃度低的会员通过短信或微信等消息推送方式进行唤醒</cite></h1>
		    
		    <h2 v-model="tishi">
		    	<img src="../../assets/huodong/tishi.png" />
		    	<cite>提示：您已经创建过如下活动，新活动尽量不要与之冲突！
		    	</cite>
		    	<img v-if="!tishi" src="../../assets/huodong/chakangengduo.png" @click="changTiShi" style="width:70px;height:16px;margin-top:8px;"/>
		    	<img v-if="tishi" src="../../assets/huodong/shouqi.png" @click="changTiShi" style="width:42px;height:16px;margin-top:8px;"/>
		    	<ul v-if="tishi">
		    		<li v-for="(item,index) in acitivities"><em>{{index+1}}</em>.{{item.subject}}，{{dateFilter(item.start_time)}}至{{dateFilter(item.end_time)}}；
		    			{{item.alert_cycle_name}}
		    		    <span v-for="(item2,index) in item.groups">{{item2.group_name}};</span>
		    		</li>
		    	</ul>
		    </h2>
		    <!--表单开始-->
		    <el-form  label-width="92px" class="demo-ruleForm" :rules="rules" ref="form" :model="form">
					<el-form-item label="活动名称:" prop="subject">
					       <el-input placeholder="请输入活动名称"  v-model="form.subject" style="width:580px;"></el-input>
					</el-form-item>
					<el-form-item label="活动周期:" required>
						        <div class="hdzq_date1">
							      	<el-form-item prop="start_time">
							        	<el-date-picker 
      										type="date" :picker-options="pickerOptions0" v-model="form.start_time" placeholder="请选择开始日期" style="width:230px;" format="yyyy-MM-dd" :disabled="mydateEdit">
   	 									</el-date-picker>
							      	</el-form-item>
						        </div>
						        <div class="hdzq_date_em">
						        	<em>至</em>
						        </div>
						        <div class="hdzq_date2">
						        	<el-form-item prop="end_time">
						        		<el-date-picker 
      										type="date" :picker-options="pickerOptions0" v-model="form.end_time" placeholder="请选择结束日期" style="width:230px;" format="yyyy-MM-dd" :disabled="mydateEdit">
   	 									</el-date-picker>
						      		</el-form-item>
						        </div>
					</el-form-item>
					<el-form-item label="活动赠礼:" style="margin:0;padding:0;margin-bottom: 0px;"  prop="hdzl" class="yhq_hdzl">
					 <el-checkbox-group v-model="form.hdzl" class="hyhx_hdzl">
							<el-form-item label="" >
							    <el-checkbox  label="赠送优惠券" style="margin-top:6px;" ></el-checkbox>
							    <!--活动赠礼 的 赠券设置 开始 -->
								<div class="hdzl" v-if="form.hdzl.toString().indexOf('赠送优惠券') != -1 ">
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
							        		<div class="tianjia" >选择优惠券</div>
							        	</div>
								    </div>
								</div>
								<!--活动赠礼 的 赠券设置 结束-->
							</el-form-item>
							
							<el-form-item label="" style="margin:0;padding:0;margin-bottom: 0px;line-height:32px;">
		    					<el-checkbox  label="赠积分" style="margin-left:92px;margin-top:6px;margin-bottom:6px;"></el-checkbox>
								<!--活动赠礼 的 每人赠送的积分 开始 -->
								<div class="hdzl2" v-if="form.hdzl.toString().indexOf('赠积分') != -1 ">
								    <div class="meirenzengsong">
							    		<cite>每人赠送</cite>
							    		<el-input placeholder="100,000" min="0.1" step="0.1" type="number" prop="reward_credit"  v-model="form.reward_credit" style="width:120px;height:28px" class="mynumber">
											<template slot="append">积分</template>
										</el-input>
								    </div>
								</div>
							</el-form-item>
					</el-checkbox-group>
				</el-form-item>
					<!--活动赠礼 的 每人赠送的积分 结束 -->
				
					
				<el-form-item label="活动提醒:"  class="hdtx_bu_weixin"  prop="hdtx">
				    <el-checkbox-group v-model="form.hdtx" style="margin-left:72px;">
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
	    					<em style="display:block;clear:both;margin-left:92px;margin-top:6px;margin-bottom:6px;line-height:20px;">唤醒时间<span style="color: #9AABB8;">(唤醒时赠礼)</span></em>
	    					<div class="hdtx_txsj">
	    						<el-radio-group v-model="alert_cycle" @change="changeTxTime">
	    							<el-radio class="radio" label="1"><span>即刻提醒</span><cite>(活动发布后马上唤醒会员)</cite></el-radio>
	    							<el-radio class="radio" label="2"><span>固定时间提醒</span>
	    								<div class="zqtxAll">
	    							        <div class="zqtxFixed" v-for="(item, index) in alert_times_temp">
											    <el-date-picker @change="dateChange" :picker-options="pickerOptions0" v-model="alert_times_temp[index]" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
											    <div class='imgbody'>
													<img src="../../assets/member/add.png" v-if='index==0' @click.prevent='addFixedItem' />
													<img src="../../assets/member/minus.png" v-if='index!=0' @click.prevent='removeFixedItem(item)' />
												</div>
											</div>
										</div>
	    							</el-radio>
	    							<el-radio class="radio" label="3">
	    								<span>周期提醒</span>
	    								<div class="zqtxAll" v-model="alert_periods_temp">
		    								<div class="zqtx" v-for="(item, index) in alert_periods_temp" >
		    									<el-select v-model="item.period_type" placeholder="请选择"  @change='selectWeekMonth(item,index)'>
												    <el-option 
												      	v-for="aa in week_month"
												      	:key="aa.value"
												      	:label="aa.label"
												      	:value="aa.value">
												    </el-option>
												</el-select>
												<el-select v-model="item.day_number" placeholder="请选择">
												    <el-option 
												      	v-for="item2 in item.week_days_arrays"
												      	:key="item2.value"
												      	:label="item2.label"
												      	:value="item2.value">
												    </el-option>
												</el-select>
												<el-time-picker
												    v-model="item.time"
												    :picker-options="{
												      format:'HH:mm'
												    }"
												    placeholder="请选择时分" value-format="HH:mm" format="HH:mm" >
												</el-time-picker>
												<div class='imgbody'>
													<img src="../../assets/member/add.png" v-if='index==0' @click.prevent='addPeriodItem' />
													<img src="../../assets/member/minus.png" v-if='index!=0' @click.prevent='removePeriodItem(item)' />
												</div>
		    								</div>
		    							</div>
	    							</el-radio>
	    						</el-radio-group>
	    					</div>
							<!--活动赠礼 的 每人赠送的积分 开始 -->
				    </el-form-item>
				    
				</el-form-item>
					
				<el-form-item label="参与群体:" prop="qunti" required>
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
    import {formatDate} from '@/utils/index';
    import { TzxCouponSelect} from '@/components/tzxcouponselect';
    import { TzxCouponView } from '@/components/tzxcouponview';
    import { TzxGroupSelect } from '@/components/tzxgroupselect';
    import {getMendian,getHuiyuanQudao,getHuiyuanQunti,getYouHuiQuanOne,getYouHuiQuan} from '@/api/home'
    import {findMenberWakeAcitivities,findSmsTemplateWake,saveWakeMember,findEvalgiftActivityDetail } from '@/api/activity'
    import axios from "axios";
	export default {
		components:{TzxCouponSelect,TzxCouponView,TzxGroupSelect},
      data() {
      return {
      	
      	loadingBody:false,
      	mydateEdit:false,//禁用 默认不禁用
      	//处理活动赠礼的样式
      	isclass:false,//不显示块
      	alert_cycle:"0",
      	alert_periods_temp:[
      		{
	      		'week_days_arrays':[],//选择周  周一至周五 选择月 1-31号
	      	   	'day_number': '',	//如果是月表示多少号，如果是周表示第几周
				'time': '',	//选择时间段
				'period_type': ''	//1：按照月提醒，2：按照周提醒 //选择周或者月
	      	}
      	],//周期提醒
      	alert_times_temp:[ //固定唤醒周期
      		""//选择的时间
      	],
      	week_month:[{
      		   value:"1",
	      	   label:"每月"
	      	},{value:"2",
	      	   label:"每周"}
      	]
      	,
      	week_options: [{
          value: '2',
          label: '周一'
        }, {
          value: '3',
          label: '周二'
        }, {
          value: '4',
          label: '周三'
        }, {
          value: '5',
          label: '周四'
        }, {
          value: '6',
          label: '周五'
        }, {
          value: '7',
          label: '周六'
        }, {
          value: '1',
          label: '周日'
        }],//周一 -周日
        
        days_options: [{
          value: '1',
          label: '1号'
        }, {
          value: '2',
          label: '2号'
        },{
          value: '3',
          label: '3号'
        },{
          value: '4',
          label: '4号'
        },{
          value: '5',
          label: '5号'
        },{
          value: '6',
          label: '6号'
        },{
          value: '7',
          label: '7号'
        },{
          value: '8',
          label: '8号'
        },{
          value: '9',
          label: '9号'
        },{
          value: '10',
          label: '10号'
        },{
          value: '11',
          label: '11号'
        },{
          value: '12',
          label: '12号'
        },{
          value: '13',
          label: '13号'
        },{
          value: '14',
          label: '14号'
        },{
          value: '15',
          label: '15号'
        },{
          value: '16',
          label: '16号'
        },{
          value: '17',
          label: '17号'
        },{
          value: '18',
          label: '18号'
        },{
          value: '19',
          label: '19号'
        },{
          value: '20',
          label: '20号'
        },{
          value: '21',
          label: '21号'
        },{
          value: '22',
          label: '22号'
        },{
          value: '23',
          label: '23号'
        },{
          value: '24',
          label: '24号'
        },{
          value: '25',
          label: '25号'
        },{
          value: '26',
          label: '26号'
        },{
          value: '27',
          label: '27号'
        },{
          value: '28',
          label: '28号'
        },{
          value: '29',
          label: '29号'
        },{
          value: '30',
          label: '30号'
        },{
          value: '30',
          label: '30号'
        },{
          value: '31',
          label: '31号'
        }],//1-31号
      	
      	
      	acitivities:[],//已经创建得活动列表
      	message:{"template_id":0,"info_content":""},//选中的信息模板的id
      	checkAll: false,//全选
      	isIndeterminate: false,
      	tishi:false,
      	tixingshijian:"1",//提醒时间
      	hdzl:[],//活动赠礼
      	
		hyqtData: [], //会员群体
		hyqt_select_data: [], //选择的会员群体
		tableDataFilter_parent: [], //会员群体回显
		count: 0, //会员群体列表中选择的人数
		dialogQunti: false,
		dialogQuntiVisible:false,
      	tfqdData:[],//投放渠道
      	
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
       
        activityId:'',
		chanels:[],//渠道 表单验证使用
        form: {
			subject:"",//主题
			start_time:"",
			end_time:"",
			store_ids:"",//门店 0全部
			membership_groups:0,//群体 0全部  "201,203"
			chanels:[],
			reward_credit:0,//积分
			tl: [],
			activity_type:"evalgift",//默认赠礼
			introduction:"",
			remark:"",//无
			reason:"",//无
			
			mendian:'0', //默认全部门店
			qunti:'0', //默认群体
			hdzl:[],//活动赠礼
			
			alert_mode :0,							//0 :不提醒，1：微信，2：短信，3 微信+短信
			sms_template_id: 0,					//短信模板id
			
			hdtx:[],//活动提醒
		    start_end_date: [],//开始结束时间
		    
       },
        rules: {
          subject: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          start_time: [
            { type: 'date',  required: true, message: '请选择开始日期', trigger: 'change' }
          ],
          end_time: [
            {  type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
          ],
          hdzl: [
            { type: 'array', required: true, message: '请选择活动赠礼', trigger: 'change' }
          ],
          hdtx: [
            { type: 'array',required: true, message: '请选择活动提醒', trigger: 'change'  }
          ],
          qunti: [
            { required: true, message: '请选择群体', trigger: 'change'  }
          ],
        }

      };
    },
    methods:{
    	dateFilter(value) {
			if(value!=null&&value!=""){
				return value.substring(0, 10);
			}else{
				return "";
			}
		},
    	dateChange(val){
    	},
    	selectWeekMonth(item, index) {		
				if(item.period_type ==1){//按月
					item.week_days_arrays = this.days_options;
				}else if(item.period_type ==2){//按周
					item.week_days_arrays = this.week_options;
				}
		},
    	addFixedItem(){
    		this.alert_times_temp.push("");
    	},
    	removeFixedItem(item){
			let index = this.alert_times_temp.indexOf(item)
			if(index !== -1) {
				this.alert_times_temp.splice(index, 1)
			}
		},
    	addPeriodItem() {
			this.alert_periods_temp.push({
	      		'week_days_arrays':[],//选择周  周一至周五 选择月 1-31号
	      	   	'day_number': '',	//如果是月表示多少号，如果是周表示第几周
				'time': "",	//选择时间段
				'period_type': ''	//1：按照月提醒，2：按照周提醒 //选择周或者月
	      	});
		},
		removePeriodItem(item){
			let index = this.alert_periods_temp.indexOf(item)
			if(index !== -1) {
				this.alert_periods_temp.splice(index, 1)
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
	     handleCheckedChanelsChange(value){
	    	  /*判断当前是否全部勾选*/
	    	  let checkedCount = value.length;
		      this.checkAll = checkedCount === this.tfqdData.length;
		      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tfqdData.length;
	    },
    	dateChange(val){
    	},
    	changTiShi(){
    		this.tishi= !this.tishi;
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
    	changeTxTime(value){
    		if(value == '1'){
    			//立即提醒 活动周期开始时间和结束时间重置为系统当前日期 并且不可编辑
    			let date_now = new Date(); 
    			this.form.start_time = date_now;  
     		    this.form.end_time=date_now;  
     		    this.mydateEdit= true;
    		}else{
    			let date_now = new Date(); 
    			this.form.start_time = "";  
     		    this.form.end_time="";  
     		    this.mydateEdit= false;
    		}
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
	          if (valid) {//提交代码
	          	    //拆分时间段
	          	    
					var start = new Date(this.form.start_time);  
					let start_time='';
					let start_y = start.getFullYear();
					let start_m = start.getMonth() + 1;
					let start_d = start.getDate();
					if(start_m<10){
						start_m = "0"+start_m;
					}
					if(start_d<10){
						start_d = "0"+start_d;
					}
					start_time = start_y + '-' + start_m + '-' + start_d;
				  	
				  	var end = new Date(this.form.end_time);  
				  	let end_time='';
					let end_y = end.getFullYear();
					let end_m = end.getMonth() + 1;
					let end_d = end.getDate();
					if(end_m<10){
						end_m = "0"+end_m;
					}
					if(end_d<10){
						end_d = "0"+end_d;
					}
					end_time = end_y + '-' + end_m + '-' + end_d;
					
					
					if(start.getTime()>end.getTime()){
						this.$message({
							type: 'error',
							message: '结束日期不能晚于开始日期'
						});
						return false;
					}
					
	          	
					//拼装门店字符串
					//如果是全部门店则存储0
					let mendian_str = 0;
				  	
					//拼装群体
					//如果是全部会员则存储0
					let qunti_str="";
					if(this.form.qunti==0){//全部群体
						qunti_str = 0;
					}else{
						//判断群体下是否有数据 至少要要有一个数据
						if(this.hyqt_select_data.length==0){
							this.$message({
								type: 'error',
								message: '至少选择一个群体'
							});
							return false;
						}else{
							if(this.count==0){
								this.$message({
									type: 'error',
									message: '会员群体人数不能是0人'
								});
								return false;
							}
						}
						
						let qunti = [];
						this.hyqt_select_data.forEach(item =>{
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
				  	
				  	if(this.form.hdzl.toString().indexOf('赠送优惠券')!=-1){
					  	if(this.yhqCheckedData_my.length==0){
					  		this.$message({
								type: 'error',
								message: '请选择优惠券'
							});
							return false;
					  	}
					  	
					  	let flag = true;
					  	this.yhqCheckedData_my.forEach(item =>{//每个优惠券至少添加1张
					  		let reg_zhengshu = /^[0-9]*[1-9][0-9]*$/;
					  		if(reg_zhengshu.test(item.reward_coupon)){//正整数
					  		}else{//正整数
					  				flag = false;
					  		}
					  	});
					  	if(!flag){
			  				this.$message({
								type: 'error',
								message: '请输入正整数'
							});
							return false;
					  	}
					}

				  	if(this.form.hdzl.toString().indexOf('赠积分')!=-1){
					  		if(this.form.reward_credit<=0){
					  			this.$message({
									type: 'error',
									message: '请输入大于0的积分'
								});
								return false;
					  		}else{
					  			let reg_zhengshu = /^[1-9]\d*$/;
					  			if(reg_zhengshu.test(this.form.reward_credit)){//判断是否是整数
									if(this.form.reward_credit.length > 8){
										this.$message({
											type: 'error',
											message: '请输入小于等于八位的积分'
										});
										return false;
									}
					  			}else{//非整数
					  			 	//判断积分是否 大于0 且为以一位小数
						  			 let reg_xiaoshuo =  /^([1-9]\d*|0)(\.\d{0,1})?$/;
	 								 if(!reg_xiaoshuo.test(this.form.reward_credit)){
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
				  	
				  	//拼装渠道
				  	/*let qudao_str = this.form.chanels.join(",");*/
				  	
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
			        
			        
			       
			        let alert_times_temp = [];
			        
			        //处理成 yyyy-MM-dd HH:mm 格式
			        this.alert_times_temp.forEach(item =>{
			        	alert_times_temp.push(Assist.formatDateAll(item,'yyyy-MM-dd HH:mm'));
			        })
					let alert_times = JSON.stringify(alert_times_temp);
				
					//处理固定周期 得时间格式
					//	'day_number': '',	//如果是月表示多少号，如果是周表示第几周
					//'time': '',	//选择时间段
					//'period_type': ''	//1：按照月提醒，2：按照周提醒 //选择周或者月
					let alert_periods_temp = [];
					this.alert_periods_temp.forEach(item =>{
						let item_temp ={};
						item_temp.day_number = item.day_number;
						item_temp.period_type = item.period_type;
						item_temp.time = Assist.formatDateAll(item.time,'HH:mm')
						alert_periods_temp.push(item_temp);
					})
					let alert_periods = JSON.stringify(alert_periods_temp);
					
					let alert_cycle_flag1 = false;
					let alert_cycle_flag2 = false;
					let alert_cycle_flag3 = false;
					let alert_cycle_flag4 = false;
					
					let alert_cycle = this.alert_cycle;//0 :不提醒，1：立刻，2：固定时间，3 周期提醒
					if(alert_cycle==0){
						this.$message({
							type: 'error',
							message: '请选择唤醒时间'
						});
						return false;
					}
					if(alert_cycle == "2"){//固定时间 不能为空
						this.alert_times_temp.forEach(item =>{
				        	if(item == null || item == "" ){
				        		alert_cycle_flag1 = true;
				        	}
				        })
					}else if(alert_cycle == "3"){//周期提醒 不能为空
						this.alert_periods_temp.forEach(item =>{
							if(item.period_type == null || item.period_type == "" ){
								alert_cycle_flag2 = true;
							}else if(item.day_number == null || item.day_number == "" ){
								alert_cycle_flag3 = true;
							}else if(item.time == null || item.time == "" ){
								alert_cycle_flag4 = true;
							}
						})
					}
					if(alert_cycle_flag1){
						this.$message({
							type: 'error',
							message: '请选择固定时间提醒时间'
						});
						return false;
					}
					if(alert_cycle_flag2){
						this.$message({
							type: 'error',
							message: '请选择周期提醒的周或月'
						});
						return false;
					}
					if(alert_cycle_flag3){
						this.$message({
							type: 'error',
							message: '请选择周期提醒的周或月的数据'
						});
						return false;
					}
					if(alert_cycle_flag4){
						this.$message({
							type: 'error',
							message: '请选择周期提醒的时间'
						});
						return false;
					}
					
					let data = "id="+this.activityId+
								"&subject="+this.form.subject+
							   "&start_time="+start_time+
								"&end_time="+end_time+
								"&membership_groups="+qunti_str+
								"&reward_credit="+this.form.reward_credit+
								"&tl="+yhq_json+
								"&alert_times="+alert_times+
								"&alert_periods="+alert_periods+
								"&alert_cycle="+alert_cycle+
								"&activity_type=awaken"+
								"&introduction="+
								"&remark="+
								"&reason="+
								"&sms_template_id="+this.message.template_id+
								"&alert_mode="+alert_mode;	
								this.loadingBody = true;
							    saveWakeMember(data).then((response) => {
							    	this.loadingBody = false;
									if(response.code==0){
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
			getHuiyuanQudao().then((response) => {
				this.tfqdData = response;
			})
		},
		loadQunti(){
			getHuiyuanQunti().then((response) => {
				this.hyqtData = response;
				//过滤会员群体添加的清除的对象  之前老系统 是下拉框有清楚
				this.hyqtData = this.hyqtData.filter((obj, index) => {
					return obj.id != 'clear'
				});

			})
		},
		loadFindSmsTemplateWake(){
			findSmsTemplateWake().then((response) => {
				this.message =  response.data;
			})
		},
		loadFindMenberWakeAcitivities(){
			findMenberWakeAcitivities().then((response) => {
				this.acitivities =  response.data;
				this.acitivities.forEach(item=>{
					let stores = item.stores;
					let stores_temp=[];
					stores.forEach(item2=>{
						stores_temp.push(item2.org_full_name);
					})
					item.stores = stores_temp;
				})
			})
		},
		
		qubuhuiyuanFunction:function(){//全部会员
	      	this.hyqt_select_data=[];
	      	this.hyqt_select_data_temp=[];
	      	this.members_count=[];
	      	this.count=[];
	      	
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
	 handleQuntiClose(done) {
        done();
     },
      openDialogQunti:function(e){//打开会员群体，发送会员群体请求
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
  	handleSelectionChange(rows){//会员群体 复选框改变 共选多少人
  	 	this.count = 0;
  		this.total = rows.length;
  		rows.map((row,index)=>{
  			this.count += row.members_count;
  		});
  		this.tableDataFilter = rows;
  		this.hyqt_select_data = rows;//选择确定时双向绑定，使用过程变量
  	},
  	huiyuanquntiQueding:function(e){//会员群体确定 选择确定时双向绑定，使用过程变量  
  		this.dialogQuntiVisible = false ;
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
  	 
	 toggleSelection(rows) {
        this.$refs.mytable.clearSelection();
        if (rows) {
          rows.forEach(row => {
            this.$refs.mytable.toggleRowSelection(row);
          });
        } 
      },
      group(row,index){
      	return true;
      },
	updateFormData(id,activity_type){
		
		this.activityId = id;
		let query = 'id='+id+'&activity_type='+activity_type;
		this.loadingBody = true;
		  findEvalgiftActivityDetail(query).then(response=>{
		  	let detail = response;
			/* form 表单回显*/
			
			this.form.subject = detail.subject;//主题  
     		this.form.start_time = new Date(detail.start_time.replace(/-/g,"/"));  
     		this.form.end_time=new Date(detail.end_time.replace(/-/g,"/"));  
     		
			//活动赠礼
			if(detail.coupons.length > 0){
			
			  this.form.hdzl.push('赠送优惠券')
			  //优惠券展示
			  this.detailCoupons =  detail.coupons;
			  this.isclass = true;//回显已经选择得优惠券
			  //绑定优惠券详细信息
			  
			}
			if(detail.reward_credit>0){
			  //赠送积分
			  this.form.hdzl.push('赠积分');
			  this.form.reward_credit = detail.reward_credit
			}			
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
		    //门店回显
		    if(detail.stroes.length ==1 && detail.stroes[0].store_id == 0){
		    	//全部门店
		    	this.form.mendian = "0"; 	//全部门店
		    }
		    else{
		    	this.form.mendian = "1";//指定门店
		    	//门店展示
				let stores = detail.stroes;
		    	stores.forEach(item =>{
		    		let obj_temp = {};
		    		obj_temp.id = item.store_id;
		    		obj_temp.label = item.org_full_name;
		    		obj_temp.plabels = item.parent_name;
		    		this.nodes.push(obj_temp);
		    		this.nodes_temp.push(obj_temp);
		    		this.treecheckedids.push(item.store_id);//门店回显ids
		    	});
		    	this.totalcount = stores.length;
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
			
		    /*渠道回显*/
			detail.chanels.map((item,index)=>{
				this.form.chanels.push(item.chanel)
			});
			
			/**唤醒时间回显**/
			this.alert_cycle = detail.alert_cycle;
			if(detail.alert_cycle == 1){//即可提醒
				this.alert_cycle ="1";
			}else if(detail.alert_cycle == 2){//固定提醒
				this.alert_cycle ="2";
				this.alert_times_temp = detail.alert_times;
			}else if(detail.alert_cycle == 3){//周期提醒
				this.alert_cycle ="3";
				this.alert_periods_temp=[];
				detail.alert_periods.forEach(item=>{
					let period_type=item.period_type.toString();
					let day_number=item.day_number;
					let time = new Date('2000/01/01 '+item.time+':00');
					let week_days_arrays = [];
					
					this.week_month = [
									{
						      		   value:"1",
							      	   label:"每月"
							      	},
							      	{value:"2",
								      label:"每周"}
							      	];
					if(item.period_type==1){//月
						/*period_type = "每月";*/
						//在月份中过滤
						
						day_number = day_number.toString();
						week_days_arrays = this.days_options;
						/*day_number = this.days_options.filter(item20=>item20.value == day_number)[0].label*/
					}else{//周
						/*period_type = "每周";*/
						
						//在周中过滤
						week_days_arrays = this.week_options;
						/*day_number = this.week_options.filter(item21=>item21.value == day_number)[0].label*/
					}
					
					this.alert_periods_temp.push({
						'week_days_arrays':week_days_arrays,//选择周  周一至周五 选择月 1-31号
	      	   			'day_number': day_number,	//如果是月表示多少号，如果是周表示第几周
						'time': time,	//选择时间段
						'period_type': period_type	//1：按照月提醒，2：按照周提醒 //选择周或者月
					})
				})
			}
		    this.$nextTick(function(){ 
		      //页面全部渲染完成之后执行的异步回调方法	
	    	  this.loadingBody = false;
    	 	})

		    
		});
	 }
   },
    mounted() {
         
        }
    ,created() {//下面的是boss 请求地址
    		_czc.push(["_trackEvent", "营销活动-会员唤醒", "新增编辑"]);//埋点统计
			this.loadQudao();//会员群体渠道
			this.loadQunti();//加载会员群体
			//添加短信模板
			this.loadFindSmsTemplateWake();
			//查询已经存在得活动
			this.loadFindMenberWakeAcitivities();
			
			if(this.$route.query.id!=undefined&&this.$route.query.activity_type!=undefined){
				this.updateFormData(this.$route.query.id,this.$route.query.activity_type);	
			}
			
	}
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
/**修改表单的样式**/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none !important;
	margin: 0;
}
.hyhx_zr{
	.divOne{
	 	height:250px;
	 	background: #FFFFFF;
		border: 1px solid #EAF1F6;
	 	margin-left:15px;
	}
	.viewyhq_dialog{
		width:440px;
		.el-dialog__header{
			border:none;
			height:0px;
		}
	}
}

 /**消费后评价赠礼页面**/
.hyhx_zr  .divTwo_hyhx{
 	height:auto;;
 	background: #FFFFFF;
 	display:table;
 	width:100%;
 }
.hyhx_zr .divTwo_hyhx h1{
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
.hyhx_zr .divTwo_hyhx h1 em{
 	margin-left: 10px;
 	font-style:normal;
 	font-size: 16px;
	letter-spacing: 0;
	line-height: 30px;
 }
.hyhx_zr .divTwo_hyhx h1 cite{
 	margin-left: 16px;
 	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #9AABB8;
	letter-spacing: 0;
	line-height: 16px;
	font-style:normal;
	height: 50px;
	line-height: 50px;
 }
.hyhx_zr .divTwo_hyhx .demo-ruleForm .hdzq_date1{
	float:left;
}
.hyhx_zr .divTwo_hyhx .demo-ruleForm .hdzq_date_em{
	float:left;
	margin-left:5px;
	margin-right:5px;
	font-style:normal;
}
.hyhx_zr .divTwo_hyhx .demo-ruleForm .hdzq_date_em em{
	font-style:normal;
}
.hyhx_zr .divTwo_hyhx .demo-ruleForm .hdzq_date2{
	float:left;
}

 
 /******表单样式 开始******/
.hyhx_zr .divTwo_hyhx .el-form{
	margin-top:20px;
}


.hyhx_zr .divTwo_hyhx .el-date-editor .el-date-editor--date{
	width:230px;
}
/***活动赠礼***/
.hyhx_zr .hyhx_hdzl .hdzl{
	margin-left:0px;
	margin-right:40px;
	padding-left:92px;
	background: #F5F9FB;
	border-radius: 3px;
	margin-top: 12px;
	overflow: hidden;
}
.hyhx_zr .hyhx_hdzl .hdzl .zengquanshezhi{
	font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #576D7A;
    line-height: 14px;
    height: 40px;
    width: 70px;
    padding-top: 26px;
    float:left;
}
.hyhx_zr .hyhx_hdzl .hdzl .zqsh_right{
	float:left;
	margin-bottom:10px;
}

.hyhx_zr .hyhx_hdzl .hdzl .zqsh_right .addyouhuiquan{
	clear: both;
    padding: 20px 0px;
    width: 100px;
   /* margin-bottom: 20px;*/
}
.hyhx_zr .hyhx_hdzl .hdzl .zqsh_right .addyouhuiquan img{
	float: left;
    height: 14px;
   /* margin-top: 4px;*/
    margin-right: 4px;
   	margin-left: 0;
}
.hyhx_zr .hyhx_hdzl .hdzl .zqsh_right .addyouhuiquan div{
	float:left;
	height:14px;
	line-height: 14px;
	color: #0C9AFF;
}
.hyhx_zr .hyhx_hdzl .hdzl ul{
	float:left;
	margin:0;
	padding:0;
	list-style: none;
	padding-top: 5px;
}
.hyhx_zr .hyhx_hdzl .hdzl ul li{
	line-height: 14px;
	margin-top:13px;
	height: 20px;
}
.hyhx_zr .hyhx_hdzl .hdzl ul li em{
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
.hyhx_zr .hyhx_hdzl .hdzl ul li em:nth-child(3){
	margin-left: 10px;
   	margin-right: 10px;
}
.hyhx_zr .hyhx_hdzl .hdzl ul li img{
	display: block;
    float: left;
    margin-top: 8px;
}
.hyhx_zr .hyhx_hdzl .hdzl .el-input{
	width: 120px;
    /*  display: block;*/
    float: left;
}
.hyhx_zr .hyhx_hdzl .hdzl .addyouhuiquan .tianjia{
	width: 70px;
}
.hyhx_zr .hyhx_hdzl .hdzl .yhq{
	margin-left: 50px;
}
.hyhx_zr .hyhx_hdzl .hdzl .view{
	margin-left: 10px;
}
.hyhx_zr .hyhx_hdzl .hdzl .delete{
	margin-left: 10px;
}
.hyhx_zr .input_height_28 .el-input__inner{
	height:28px;
	line-height: 28px;
}
/**每人赠送**/
.hyhx_zr .hdzl2{
	margin-left:0px;
	margin-right:40px;
	padding-left:92px;
	background: #F5F9FB;
	border-radius: 3px;
	height:50px;
}
.hyhx_zr .hdzl2 .meirenzengsong{
	padding-top:11px;
	margin-bottom:11px;
}
.hyhx_zr .hdzl2 .meirenzengsong cite{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
	font-style: normal;
	margin-right:27px;
}
.hyhx_zr .hdzl2 .meirenzengsong .el-input__inner{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;

}
.hyhx_zr .hdzl2 .meirenzengsong em{
	margin-left:10px;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
	font-style: normal;
}
/**选择门店 and 选择群体**/
.hyhx_zr .divTwo_hyhx .botton_text{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #0C9AFF;
	line-height: 14px;
	margin-left:16px;
	font-style: normal;
}

.hyhx_zr .divTwo_hyhx .quxiao_and_tijiao{
	height:82px;
	margin-left:40px;
	margin-right:40px;
	border-top: 1px dashed #EAF1F6;
}

.hyhx_zr .quxiao_and_tijiao .bottom_64_32{
	margin-left:92px;
	margin-top:30px;
	margin-bottom: 30px;
}
.hyhx_zr .divTwo_hyhx .xuanze{
 	list-style: none;
 	margin: 0;
    padding: 0;
    margin-top: 7px;
    padding-left: 40px;
}
 .hyhx_zr .divTwo_hyhx .xuanze li{
	border: 1px solid #D8E5EC;
	border-radius: 3px;
	width:auto;
	margin-right:18px;
	float:left;
	line-height: 32px;
	margin-bottom: 7px;
}
 .hyhx_zr .divTwo_hyhx .xuanze li em{
	margin-left:8px;
}
.hyhx_zr .divTwo_hyhx .xuanze li img{
	margin-left:5px;
	margin-right:8px;
}
.hyhx_zr .meirenzengsong .el-input__inner{
	height:28px;
}
.hyhx_zr .divTwo_hyhx .cyqt_person_num{
	background: #FFFAEB;
	border: 1px solid #FFE9A7;
	border-radius: 3px;
	height:32px;
	width:309px;
	padding-left:8px;
	margin-left: 40px;
}
 .hyhx_zr .divTwo_hyhx .cyqt_person_num h1,.cyqt_person_num tt, .cyqt_person_num cite{
	letter-spacing: 0;
	float:left;
	line-height:32px;
}
 .hyhx_zr .divTwo_hyhx .cyqt_person_num tt{
	color: #FF7171;
}
 .hyhx_zr .divTwo_hyhx .cyqt_person_num h1{
	border: none;
	font-size: 14px;
	margin-left: 0px;
	margin-right:0px;
}
.hyhx_zr .input_height_28{
	height:10px;
	background-image:url(../../assets/huodong/zhang.jpg) no-repeat;
}

/***确认提交框**/
 .hyhx_zr .divTwo_hyhx .querenbox{
	height:360px;
	width:200px;
	background:red;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
	border-radius: 3px;
    position: absolute;
    z-index: 10000px;	
}

.hyhx_zr .xzyhq_dialog .xzyhq_show ul{
	height:332px;
	overflow-y:auto;
}
.hyhx_zr .divTwo_hyhx .el-form .el-form-item__error{
	margin-left: 40px;
}
.hyhx_zr .divTwo_hyhx .el-form .el-form-item .el-form-item .el-form-item__error{
	margin-left: 0px;
}
.hyhx_zr .divTwo_hyhx .yhq_hdzl .el-form-item__content{
	margin-left:20px !important;
}

.hyhx_zr .mynumber .el-input__inner{
	text-align: right;
}
/*******************调整之后***************************/
/*******关注赠礼得活动赠礼 提醒时间*********/
.hyhx_zr .divTwo_hyhx .hyhx_hdzl .txsj{
	background: #F5F9FB;
    border-radius: 3px;
    height: 50px;
    padding-top:15px;
    margin-right: 40px;
}
.hyhx_zr .divTwo_hyhx .hyhx_hdzl .txsj .el-radio__label{
	color: #243546;
}
.hyhx_zr .divTwo_hyhx .hyhx_hdzl .txsj cite{
	color: #9AABB8;
}
.hyhx_zr .divTwo_hyhx .hyhx_hdzl .txsj .el-radio{
	margin-left:92px;
}
.hyhx_zr .divTwo_hyhx .hyhx_hdzl .el-form-item:nth-child(n+1) .el-form-item__content{
	line-height:20px;
}
.hyhx_zr .divTwo_hyhx .yhq_hdzl .el-form-item__error{
	position: relative;
	padding-left:10px;
	padding-top:0px;
	margin-left:100px !important;
}

.hyhx_zr .divTwo_hyhx .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(3){
	margin-left: 40px;
}
.hyhx_zr .divTwo_hyhx .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(1) {
    float: left;
}
.hyhx_zr .divTwo_hyhx .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(2) {
    clear:both;
}
.hyhx_zr .divTwo_hyhx .hdtx_bu_weixin .el-checkbox-group cite{
    display: block;
    /* float: left; */
    /* margin-top: 9px; */
    /* margin-left: 10px; */
    color: #9AABB8;
    width: 400px;
    line-height: 32px
}
.hyhx_zr .divTwo_hyhx .hdtx_bu_weixin .el-form-item__content{
	margin-left: 20px!important;
}
.hyhx_zr .divTwo_hyhx .hdtx_txsj{
	background: #F5F9FB;
    border-radius: 3px;
    padding-left: 92px;
    padding-top: 20px;
    margin-right: 40px;
    padding-bottom: 20px;
    .el-radio{
    	line-height: 32px;
    }
    .el-radio__input{
    	vertical-align: top;
    	margin-top: 9px;
    }
}
.hyhx_zr .divTwo_hyhx .hdtx_txsj .el-radio .el-radio__label{
	color: #243546;
	span{
		vertical-align: top;
		line-height: 32px;
	}
}

.hyhx_zr .divTwo_hyhx .hdtx_txsj .el-radio:nth-child(2){
	display: block;
    margin-left: 0px;
    margin-top: 10px;
    .el-date-editor .el-input__inner{
    	width:230px;
    }
    .zqtxAll{
    	display: inline-block;
    }
    .zqtxFixed{
    	 .imgbody{
	    	display: inline-block;
	    	margin: 3px 0 3px 7px;
	    	img{
	    		width: 22px;
	    		height: 22px;
	    	}
	    }
	    margin-bottom: 6px;
	    .el-date-editor{
	    	float:left;
	    }
    }
    
}
.hyhx_zr .divTwo_hyhx .hdtx_txsj .el-radio:nth-child(3){
	display: block;
    margin-left: 0px;
    margin-top: 10px;
    .zqtxAll{
    	display: inline-block;
    }
    .el-select{
    	width:80px;
    	float: left;
    	margin-right: 3px;
    	.el-input .el-input__inner{
    		height: 28px;
    	}
    }
    .el-date-editor{
    	width:120px;
    	float: left;
    	margin-right: 3px;
    	.el-input__inner{
	    	width:120px;
	    	height:28px;
	    }
    }
    .zqtx{
    	 .imgbody{
	    	display: inline-block;
	    	margin: 3px 0 3px 7px;
	    	img{
	    		width: 22px;
	    		height: 22px;
	    	}
	    }
	    margin-bottom: 6px;
    }
}

.hyhx_zr .divTwo_hyhx .hdtx_txsj cite{
	color: #9AABB8;
}
.hyhx_zr .divTwo_hyhx .hdtx_bu_weixin .el-form-item__content .el-form-item__error{
	margin-left: 112px;
}
.hyhx_zr .divTwo_hyhx .hyhx_tfqd .el-checkbox-group{
	display:block;
	margin-right: 40px;
    margin-left: 25px;
}
.hyhx_zr .divTwo_hyhx .hyhx_tfqd .checkAll{
	float: left;
    margin-right: 5px;
}

.hyhx_zr .divTwo_hyhx h2{
	margin: 16px 20px 0;
	background: #FFFCF2;
	border-radius: 3px;
	overflow: hidden;
}
.hyhx_zr .divTwo_hyhx h2 img{
	width: 16px;
    height: 16px;
    margin: 8px 10px 0 16px;
    float: left;
}
.hyhx_zr .divTwo_hyhx h2 cite{
    font-size: 13px;
    color: #576D7A;
    line-height: 33px;
    float: left;
}
.hyhx_zr .divTwo_hyhx h2 cite:nth-child(1){
	float:left;
	width:40%;
	display:block;
}
.hyhx_zr .divTwo_hyhx h2  a{
	font-size: 13px;
    color: #34495E;
    letter-spacing: 0;
    line-height: 13px;
    padding-left: 10px; 
    float: left;
    display: block;
    height: 32px;
    line-height: 32px;
    width:160px;
   
}
.hyhx_zr .divTwo_hyhx h2 .shouqi{
	background-image:url(../../assets/huodong/shouqi.png);
	background-repeat: no-repeat;
	background-size:70px 16px;
}
.hyhx_zr .divTwo_hyhx h2 .chakangengduo{
	background-image:url(../../assets/huodong/chakangengduo.png);
	background-repeat: no-repeat;
	background-size:70px 16px;
}

.hyhx_zr .divTwo_hyhx h2 ul{
	margin-left:31px;
	margin-bottom:10px;
	/*padding-top: 6px;*/
	clear: both;
    overflow: hidden;
}
.hyhx_zr .divTwo_hyhx h2 ul li{
	font-size: 12px;
	color: #576D7A;
	line-height: 20px;
}
.hyhx_zr .divTwo_hyhx .hdtx_bu_weixin .el-form-item__content .el-checkbox-group .el-checkbox:nth-child(4){
	clear:both;
}

.hyhx_zr .divTwo_hyhx .hdtx_dxtx{
	/* background: #F5F9FB; */
    border-radius: 3px;
    margin-right: 40px;
    /* overflow: hidden; */
    margin-left: 72px;
}
.hyhx_zr .divTwo_hyhx .hdtx_dxtx strong{
	display:block;
	float:left;
	/*padding-left:92px;*/
	color: #576D7A;
	padding-top: 20px;
}
.hyhx_zr .divTwo_hyhx .hdtx_dxtx .dxmb_text{
	float:left;
}
.hyhx_zr .divTwo_hyhx .hdtx_dxtx .dxmb_text cite{
	display: block;	
    line-height: 50px;
   
}
.hyhx_zr .divTwo_hyhx .hdtx_dxtx .dxmb_text em{
	clear: both;	
	color: #0C9AFF;
}

.hyhx_zr .class-no{
	display:none;
}
.hyhx_zr .class-yes{
	display:block;
}
.hyhx_zr .hdzq_date1 .el-form-item__error{
	padding: 4px 0 0 0px;
}
.hyhx_zr .hdzq_date2 .el-form-item__error{
	padding: 4px 0 0 0px;
}

.hyhx_zr{
		.el-table .cell{
			float: left;
		}
	}

/*************************mendian 结束 ***********************/
</style>