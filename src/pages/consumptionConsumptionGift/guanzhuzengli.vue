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
			  :before-close="handleClose"
			  custom-class="viewyhq_dialog">
			     <tzx-coupon-view :yhqOneData="yhqOneData"></tzx-coupon-view>
			</el-dialog>
			<!--优惠券详情 结束 -->
			
		<!--消费后评价赠礼  开始-->
		<div class="divTwo_gzzl">
		    <h1><em>关注赠礼</em><cite>吸引顾客关注公众号成为粉丝会员</cite></h1>
		    
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
		    <el-form  label-width="92px" class="demo-ruleForm" :rules="rules" ref="form" :model="form">
					<el-form-item label="活动名称:" prop="subject">
					       <el-input placeholder="请输入活动名称"  v-model="form.subject" style="width:580px;"></el-input>
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
				
					<el-form-item label="活动赠礼:" style="margin:0;padding:0;margin-bottom: 0px;"  prop="hdzl" class="yhq_hdzl">
					 <el-checkbox-group v-model="form.hdzl" class="gzzl_hdzl">
							<el-form-item label="" >
							    <el-checkbox  label="赠送优惠券" style="margin-top:6px;" ></el-checkbox>
							    <!--活动赠礼 的 赠券设置 开始 -->
								<div class="hdzl" v-if="form.hdzl.toString().indexOf('赠送优惠券') != -1 ">
								        	<!--<div class="zengquanshezhi">赠券设置:</div>-->
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
								<!--活动赠礼 的 赠券设置 结束-->
							</el-form-item>
					</el-checkbox-group>
				</el-form-item>
					<!--活动赠礼 的 每人赠送的积分 结束 -->
					
					<el-form-item label="活动提醒:" required class="hdtx_bu_weixin"  prop="hdtx">
					    <el-checkbox-group v-model="form.hdtx" style="margin-left:72px;">
					    	<!--<el-checkbox label="不提醒"></el-checkbox>-->
					    	<el-checkbox label="微信提醒"></el-checkbox><cite>(按照微信公众号标准模板配置)</cite>
					    </el-checkbox-group>
					    
					    <el-form-item v-if="form.hdtx.toString().indexOf('微信提醒') != -1" label="">
		    					<em style="display:block;clear:both;margin-left:92px;margin-top:6px;margin-bottom:6px;line-height:20px;">赠送时间</em>
		    					<div class="hdtx_txsj">
		    						<el-radio class="radio" v-model="tixingshijian" label="1" disabled>即刻赠送</el-radio>
		    						<cite>(关注后马上赠送)</cite>
		    					</div>
								<!--活动赠礼 的 每人赠送的积分 开始 -->
						</el-form-item>
					</el-form-item>
					<el-form-item label="投放渠道:" prop="chanels" class="gzzl_tfqd" required>
					    <el-checkbox-group v-model="form.chanels">
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
    import { TzxCouponSelect} from '@/components/tzxcouponselect';
    import { TzxCouponView} from '@/components/tzxcouponview';
    import {getYouHuiQuanOne,getHuiyuanQudao} from '@/api/home';
    import {findAttentionGift,findCouponList,saveAttentionGift,findEvalgiftActivityDetail} from '@/api/activity'
    import axios from "axios";
	export default {
		components:{TzxCouponView,TzxCouponSelect},
		watch: {
	      filterText(val) {
	        this.$refs.tree2.filter(val);
	      }
	    },

      data() {
      return {
      	loading1:false,
      	//处理活动赠礼的样式
      	isclass:false,//不显示块
      	acitivities:[],//已经创建得活动列表
      	
      	checkAll: true,//全选
      	isIndeterminate: false,
      	tishi:false,
      	tixingshijian:"1",//提醒时间
      	hdzl:[],//活动赠礼
      	tfqdData:[],//投放渠道
      	
      	//优惠券
      	my_syn_status:'1',//关注状态
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
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }]
        },
		
		filterText: '',
		totalcount:0,
		total:0,
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
			
			mendian:[], //默认全部门店
			qunti:[], //默认群体
			hdzl:[],//活动赠礼
			
			hdtx:[],//活动提醒
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
          chanels: [
            { type: 'array', required: true, message: '请选择渠道', trigger: 'change' }
          ]
        },
 		activityId:''    //form表单回显时用到
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
    	handleCheckAllChange(event) {
    		let arrays = [];
    		this.tfqdData.forEach(item=>{
    			arrays.push(item.id);
    		})
	        this.form.chanels = event.target.checked ? arrays : [];
	        this.isIndeterminate = false;
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
					//拼装门店字符串
					//如果是全部门店则存储0
					let mendian_str="";
					if(this.form.mendian==0){//全部门店
						mendian_str = 0;
					}else{//指定门店
						//判断门店下是否有数据 至少要要有一个数据
						if(this.nodes.length==0){
							this.$message({
								type: 'error',
								message: '至少选择一个门店'
							});
							return false;
						}
						
						let mendian = [];
						this.nodes.forEach(item =>{
							mendian.push(item.id);
					  	});
					  	mendian_str = mendian.join(",");
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
					  	
					  	
					  	let flag2 = true;
					  	
					  	let couponTotalCount = 0;
					  	this.yhqCheckedData_my.forEach(item =>{//每个优惠券至少添加1张
					  		if(item.reward_coupon <= 0){
					  			flag2 = false;
					  		}else{
					  			couponTotalCount = Number(couponTotalCount) +Number(item.reward_coupon);
					  		}
					  	});
					  	if(!flag2){
			  				this.$message({
								type: 'error',
								message: '请输入正整数'
							});
							return false;
					  	}
					  	
					  	if(couponTotalCount>5){
					  		this.$message({
								type: 'error',
								message: '最多添加5张优惠券'
							});
							return false;
					  	}
				  	}
				  	if(this.form.hdzl.toString().indexOf('赠积分')!=-1){
				  		/*if(isNaN(this.form.reward_credit)){//数字*/
					  		if(this.form.reward_credit<=0){
					  			this.$message({
									type: 'error',
									message: '请输入大于0的积分'
								});
								return false;
					  		}else{
					  			
					  			 let reg_zhengshu = /^[1-9]\d*$/;
					  			 if(reg_zhengshu.test(this.form.reward_credit)){//判断是否是整数
					  			 }else{//非整数
					  			 	//判断积分是否 大于0 且为以一位小数
						  			 let reg_xiaoshuo =  /^([1-9]\d*|0)(\.\d{0,1})?$/;
	 								 if(!reg_xiaoshuo.test(this.form.reward_credit)){
	 								  	this.$message({
											type: 'error',
											message: '请输入一位小数的积分'
										});
										return false;
	 								 }
					  			 }
					  		}
				  	}
				  	
				  	//拼装渠道
				  	let qudao_str = this.form.chanels.join(",");
				  	
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
					
					let data = "id="+this.activityId+
								"&subject="+this.form.subject+
							   "&start_time="+start_time+
								"&end_time="+end_time+
								"&chanels="+qudao_str+
								"&reward_credit="+this.form.reward_credit+
								"&tl="+yhq_json+
								"&alert_mode="+alert_mode+
								"&activity_type=attengift"+
								"&introduction="+
								"&remark="+
								"&reason="+
								"&sms_template_id="
								this.loading1 = true;
							    saveAttentionGift(data).then((response) => {
							    	this.loading1 = false;
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
				//只取微店  2017-11-21
			    this.tfqdData = this.tfqdData.filter(item=>item.text == '微店');
			})
		},
		loadFindAttentionGift(){
			findAttentionGift().then((response) => {
				this.acitivities =  response.data;
			})
		},
		getYouHuiQuan:function(){//选择优惠券弹出框  
			this.mydialogSelectYouhuiQuan = true;
		},
		
      open() {
        this.$router.push("/marketing/activitymanagement");
      },
      handleClose(done) {
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
  	 
	updateFormData(id,activity_type){
		this.activityId = id;
		let query = 'id='+id+'&activity_type='+activity_type;
		  findEvalgiftActivityDetail(query).then(response=>{//回显
		  	let detail = response;
			/* form 表单回显*/
			this.form.subject = detail.subject;//主题  
     		this.form.start_time = Assist.formatStrToDate(detail.start_time);
     		this.form.end_time = Assist.formatStrToDate(detail.end_time);
     		
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
		   
		    /*渠道回显*/
			detail.chanels.map((item,index)=>{
				this.form.chanels.push(item.chanel)
			});
			
			
		});
	 }
  	 
    }
    
    ,created() {//下面的是boss 请求地址
    	_czc.push(["_trackEvent", "营销活动-关注赠礼", "新增编辑"]);//埋点统计
        this.loadFindAttentionGift();//已创建的关注赠礼活动列表
		this.loadQudao();//会员群体渠道
		if(this.$route.query.id!=undefined&&this.$route.query.activity_type!=undefined){
			this.updateFormData(this.$route.query.id,this.$route.query.activity_type);	
		}
	}
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
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
 
 /**消费后评价赠礼页面**/
 .divTwo_gzzl{
 	height:auto;
 	display:table;
	width:100%;
	background: #fff;
 }
 .divTwo_gzzl h1{
 	height: 50px;
    line-height: 50px;
    display: block;
    border-bottom: 1px solid #eaf1f6;
    margin: 0 20px;
    font-size: 16px;
    font-style: normal;
    color: #34495E;
    font-weight: normal;
 }
 .divTwo_gzzl h1 em{
 	margin-left: 10px;
 	font-style:normal;
 	font-size:16px;
 	letter-spacing: 0;
 }
 .divTwo_gzzl h1 cite{
 	margin-left: 16px;
 	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #9AABB8;
	letter-spacing: 0;
	line-height: 16px;
	font-style:normal;
 }
 .divTwo_gzzl h2 img {
	width: 16px;
	height: 16px;
	margin: 8px 0 0 16px;
	float: left;
}
.divTwo_gzzl h2 cite {
    font-size: 13px;
    color: #576d7a;
    line-height: 33px;
    float: left;
	margin-left: 12px;
}
.divTwo_gzzl .demo-ruleForm .hdzq_date1{
	float:left;
}
.divTwo_gzzl .demo-ruleForm .hdzq_date_em{
	float:left;
	margin-left:5px;
	margin-right:5px;
	font-style:normal;
}
.divTwo_gzzl .demo-ruleForm .hdzq_date_em em{
	font-style:normal;
}
.divTwo_gzzl .demo-ruleForm .hdzq_date2{
	float:left;
}

 
 /******表单样式 开始******/
.divTwo_gzzl .el-form{
	margin-top:20px;
}


.divTwo_gzzl .el-date-editor .el-date-editor--date{
	width:230px;
}
/***活动赠礼***/
 .gzzl_hdzl .hdzl{
	margin-left:0px;
	margin-right:40px;
	padding-left:92px;
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
	margin-left: 10px;
   	margin-right: 10px;
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
.divTwo_gzzl .botton_text{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #0C9AFF;
	line-height: 14px;
	margin-left:16px;
	font-style: normal;
}

.divTwo_gzzl .quxiao_and_tijiao{
	height:92px;
	margin-left:40px;
	margin-right:40px;
	border-top: 1px dashed #EAF1F6;
}

 .quxiao_and_tijiao .bottom_64_32{
	margin-left:91px;
	margin-top:30px;
	margin-bottom: 20px;
}
.divTwo_gzzl .xuanze{
 	list-style: none;
 	margin: 0;
    padding: 0;
    margin-top: 7px;
    padding-left: 40px;
}
 .divTwo_gzzl .xuanze li{
	border: 1px solid #D8E5EC;
	border-radius: 3px;
	width:auto;
	margin-right:18px;
	float:left;
	line-height: 32px;
	margin-bottom: 7px;
}
 .divTwo_gzzl .xuanze li em{
	margin-left:8px;
}
.divTwo_gzzl .xuanze li img{
	margin-left:5px;
	margin-right:8px;
}
.meirenzengsong .el-input__inner{
	height:28px;
}
.divTwo_gzzl .cyqt_person_num{
	background: #FFFAEB;
	border: 1px solid #FFE9A7;
	border-radius: 3px;
	height:32px;
	width:309px;
	padding-left:8px;
	margin-left: 40px;
}
 .divTwo_gzzl .cyqt_person_num h1,.cyqt_person_num tt, .cyqt_person_num cite{
	letter-spacing: 0;
	float:left;
	line-height:32px;
}
 .divTwo_gzzl .cyqt_person_num tt{
	color: #FF7171;
}
 .divTwo_gzzl .cyqt_person_num h1{
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
 .divTwo_gzzl .querenbox{
	height:360px;
	width:200px;
	background:red;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
	border-radius: 3px;
    position: absolute;
    z-index: 10000px;	
}

.xzyhq_dialog .xzyhq_show ul{
	height:332px;
	overflow-y:auto;
}
.divTwo_gzzl .el-form .el-form-item__error{
	margin-left: 10px;
	padding: 4px 0 0 30px;
}
.divTwo_gzzl .el-form .el-form-item .el-form-item .el-form-item__error{
	margin-left: -30px;
}
.divTwo_gzzl .yhq_hdzl .el-form-item__content{
	margin-left:20px !important;
}
.divTwo_gzzl .yhq_hdzl .el-form-item__error{
	margin-left:92px !important;
}
.divTwo_gzzl .yhq_hdzl .el-form-item__label:nth-child(n+2){
	width:22px !important;
}
.mynumber .el-input__inner{
	text-align: right;
}
.divTwo_gzzl h2{
	margin:16px 20px 0;
	background: #FFFCF2;
	border-radius: 3px;
	clear: both;
    overflow: hidden;
}
.divTwo_gzzl h2 strong{
	display:block;
	font-size: 13px;
	color: #576D7A;
	line-height: 13px;
	margin-left:12px;
	margin-bottom:6px;
	padding:10px 0;
}
.divTwo_gzzl h2 strong em{
	font-size: 13px;
	color: #34495E;
	letter-spacing: 0;
	line-height: 13px;
	padding-left:10px;
}

.divTwo_gzzl h2 ul{
	padding: 0 34px 10px;
	clear: both;
}
.divTwo_gzzl h2 ul li{
	font-size: 12px;
	color: #576D7A;
	line-height: 20px;
}

/*******关注赠礼得活动赠礼 提醒时间*********/
.divTwo_gzzl .gzzl_hdzl .txsj{
	background: #F5F9FB;
    border-radius: 3px;
    height: 50px;
    padding-top:15px;
    margin-right: 40px;
}
.divTwo_gzzl .gzzl_hdzl .txsj .el-radio__label{
	color: #243546;
}
.divTwo_gzzl .gzzl_hdzl .txsj cite{
	color: #9AABB8;
}
.divTwo_gzzl .gzzl_hdzl .txsj .el-radio{
	margin-left:92px;
}
.divTwo_gzzl .gzzl_hdzl .el-form-item:nth-child(n+1) .el-form-item__content{
	line-height:20px;
}
.divTwo_gzzl .yhq_hdzl .el-form-item__error{
	position: relative;
	padding-left:20px;
	padding-top:0px;
}
.divTwo_gzzl .hdtx_bu_weixin .el-checkbox-group .el-checkbox{
	display: block;
	/*margin-left: 40px;*/
}
.divTwo_gzzl .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(1) {
    float: left;
}
.divTwo_gzzl .hdtx_bu_weixin .el-checkbox-group cite{
    display: block;
	float: left;
	margin-top:9px;
	margin-left:10px;
	color: #9AABB8;
}
.divTwo_gzzl .hdtx_bu_weixin .el-form-item__content{
	margin-left: 20px!important;
}
.divTwo_gzzl .hdtx_txsj{
	background: #F5F9FB;
    border-radius: 3px;
    height: 50px;
    padding-left:92px;
    padding-top:9px;
    margin-right: 40px;
}
.divTwo_gzzl .hdtx_txsj .el-radio .el-radio__label{
	color: #243546;
}
.divTwo_gzzl .hdtx_txsj cite{
	color: #9AABB8;
}
.divTwo_gzzl .hdtx_bu_weixin .el-form-item__content .el-form-item__error{
	margin-left: 82px;
}
.divTwo_gzzl .gzzl_tfqd .el-checkbox-group{
	display:block;
	margin-right: 40px;
    margin-left: 25px;
}
.divTwo_gzzl .gzzl_tfqd .checkAll{
	float: left;
    margin-right: 5px;
}
/***********会员群体**************/

.class-no{
	display:none;
}
.class-yes{
	display:block;
}
/*************************mendian 结束 ***********************/
</style>