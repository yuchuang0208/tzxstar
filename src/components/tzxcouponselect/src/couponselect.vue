/**
 * 选择优惠券弹出框
 * 通用，适用于 大部分营销活动
 */
<template>
	<div>
	   <!-- 选择优惠券 -->
		<el-dialog
		  title="选择优惠券"
		  :visible.sync="dialogSelectYouhuiQuan"
		  size="tiny"
		  :before-close="handleSelectYouhuiQuanClose"
		  custom-class="xzyhq_dialog">
				  <div class="xzyhq">
				  	  <div class="xzyhq_search">
				  	  	  <el-input placeholder="请输入优惠券名称" icon="search" :on-icon-click="loadYouHuiQuanList" v-model="queryParams.searchText" ></el-input>
				  	  	  <h1 @click="dialogAddYouhuiQuan = true">创建优惠券</h1>
				  	  </div>
				  	  <div class="xzyhq_show">
				  	  	 <ul>
				  	  	 	<el-checkbox-group v-model="yhqCheckedDataIds">
					  	  	 <!--	<li v-for="item in yhqFiterData">-->
					  	  	 	
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
				  			<div class="quxiao" @click="closeDialog"><em>取消</em></div>
				  			<div class="queding" @click="youhuiquanQueding"><em>确定</em></div>
						</div>
				  	</div>
		</el-dialog>
		
		<!--添加优惠券 开始 -->
		<el-dialog
		  title="添加优惠券"
		  :visible.sync="dialogAddYouhuiQuan"
		  size="tiny"
		  :before-close="handleClose"
		  custom-class="addyhq_dialog">
		     <div class="addyhq">
		     	<img src="../../../assets/huodong/noyhq_add2.png"  />
		     	<cite>还没有可用优惠券噢，快去创建一张吧！</cite>
		     </div>
		     <div class="addyhq_add">
		     	<el-button type="primary" @click='openCoupons' icon="plus" size="small" >新增优惠券</el-button>
		     </div>
		</el-dialog>
		<!--添加优惠券 结束 -->
	</div>
</template>
<script>
    import {getYouHuiQuanOne} from '@/api/home';
    import {findCouponList} from '@/api/activity'
    import axios from "axios";
	export default {
      	data() {
		    return {
		      	yhqAllData:[],//优惠券all
		      	yhqCheckedDataIds:[],//已经选择的优惠券
		      	searchText:"",//优惠券搜索名称的文本
				dialogAddYouhuiQuan:false,
				queryParams: {
					syn_status: '',//优惠券同步状态
					searchText:'',//优惠券搜索名称，按照名称搜索
				},
		    };
    	},
    	props:{
			pnodes:Array,//树组件第一次加载时要打勾的节点 为ID数组
			dialogSelectYouhuiQuan:Boolean,
			params:String,//查询优惠券条件
			syn_status:String,//同步状态，
		},
    	methods:{
    		closeDialog(){
    			this.dialogSelectYouhuiQuan=false;
    			this.$emit('setDialogStatus',false);
    		},
	    	openCoupons(){
	    		this.dialogAddYouhuiQuan = false;
				this.dialogSelectYouhuiQuan = false;
				this.$emit('setDialogStatus',false);
				this.$router.push('/card/electroniccoupon');
	    	},
	    	loadYouHuiQuanList(){
	    		//if(this.yhqAllData.length==0){
					let data = 'syn_status=' + this.queryParams.syn_status +
						'&class_name=' + this.queryParams.searchText;
					findCouponList(data).then((response) => {
						this.yhqAllData = response;
						this.dealfindAllCoupons(this.yhqAllData,"add");
					});
				//}
	    	},
			youhuiquanQueding:function(){//选择优惠券，单给优惠券的详细信息绑定到相应的对象上
			    this.$emit('quedingButton',this.yhqCheckedDataIds);
			},
			dealfindAllCoupons(arrays_temp,type){
				let yhqCheckedDataEditAdd = [];
				let object = {};
				arrays_temp.forEach(item =>{
					
					let id = 0;
					if(type=="add"){
						id = item.id;
					}else{
						id = item.class_id;
					}
					if(id != 0){
						getYouHuiQuanOne(id).then((response) => {
						 	let yhqOneDetail = response;
							let obj = {};
							obj.face_value = yhqOneDetail.face_value;
							obj.bill_limit_num = yhqOneDetail.bill_limit_num;
							
							obj.activity_subject = yhqOneDetail.activity_subject;
							obj.used_other = yhqOneDetail.used_other;
							obj.start_coupon = yhqOneDetail.start_coupon;
							obj.validity_type = yhqOneDetail.validity_type;
							obj.with_discount = yhqOneDetail.with_discount;
							
							obj.end_coupon = yhqOneDetail.end_coupon;
							obj.class_id = yhqOneDetail.class_id;
							
							//改造时间
							//obj.times_period = yhqOneDetail.times;
							
							let times_period =[];
							if(yhqOneDetail.times != undefined){
								yhqOneDetail.times.forEach(item2=>{
									let temp ={};
									temp.begintime = item2.begintime;
									temp.endtime = item2.endtime;
									times_period.push(item2);
								})
								obj.times_period = times_period;
							}
							
							//改造使用门店
							let stores = yhqOneDetail.store_ids;
							if(stores != undefined){
								let storeids = [];
								stores.forEach(item3=>{
									storeids.push(item3.store_id);
								})
								let storeids_str = storeids.join(",")
								obj.store_ids = storeids_str;
							}
							//改造使用渠道
							let chanels = yhqOneDetail.use_chanel;
							let chanelids = [];
							if(chanels != undefined){
								chanels.forEach(item4=>{
									chanelids.push(item4.chanel);
								})
							}
							let chanelids_str = chanelids.join(",")
							obj.use_chanel = chanelids_str;
							
							obj.use_cycle = yhqOneDetail.use_cycle;
							obj.bill_limit_money = yhqOneDetail.bill_limit_money;
							obj.class_type_name = "";
							if(type=="add"){
								obj.reward_coupon = 1;
							}else{
								obj.reward_coupon = 0;
							}
							obj.validity_days = yhqOneDetail.validity_days;
							
							item.tl =obj;
							item.id = yhqOneDetail .class_id;
				  			item.face_value = yhqOneDetail.face_value;
				  			item.coupons_pro = yhqOneDetail.coupons_pro;
				  			
				  			if(type=="add"){
							}else{
								item.text = item.cn;
							}
				  			if(type=="add"){
								item.reward_coupon = 1;
							}else{
								item.reward_coupon = item.reward_coupon;
							}
				  			//判断当前数组中是否有改 id 的优惠券
				  			let filterObj = yhqCheckedDataEditAdd.filter(item20=>item20.id == item.id)[0];
				  			if(filterObj != null){//存在 删除之前的，添加新的
				  				yhqCheckedDataEditAdd.shift(filterObj);
				  			}
				  			yhqCheckedDataEditAdd.push(item);
				  			
				  			if(type=="add"){
								this.yhqAllData = yhqCheckedDataEditAdd;
								this.$emit('setYhqAllData',this.yhqAllData);
							}else{
								this.yhqCheckedDataIds = [];
								//this.yhqCheckedData_show = yhqCheckedDataEditAdd;//把选中的值传回父组件
								yhqCheckedDataEditAdd.forEach(item=>{
									this.yhqCheckedDataIds.push(item.class_id);
								})
								this.$emit('setYhqCheckedData',this.yhqCheckedDataIds,yhqCheckedDataEditAdd);//yhqCheckedDataEditAdd 为了展示
							}
						});
					}
			    });
		},
	    handleClose(done) {
	        done();
	    },
	    handleSelectYouhuiQuanClose(done) {
	    	this.$emit('setDialogStatus',false);
	        done();
	    },
	    scrollfun1(){
		   	this.scroll1 = false;
		},
   },
    mounted(){ 
	},	
    created() {
		this.queryParams.syn_status =this.syn_status;
    	this.loadYouHuiQuanList();
	},
	
	 watch:{
			dialogSelectYouhuiQuan(newVal,oldVal){
				if(newVal){
					setTimeout(()=>{
	        		}
	        		,500)
				}else{
					setTimeout(()=>{
	        		}
	        		,500)
				}
				
			}
		},
    watch:{
			pnodes(newVal,oldVal){
				if(newVal){
					setTimeout(()=>{
			       		this.dealfindAllCoupons(this.pnodes,"update");
	        		}
	        		,500)
				}else{
					setTimeout(()=>{
			       		this.dealfindAllCoupons(this.pnodes,"update");
	        		}
	        		,500)
				}
				
			}
		}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
 /*****选择优惠券 开始*******/
.xzyhq_dialog{
	width:660px;
	height:500px;
	.el-dialog_body{
		width:660px;
		height:500px;
		padding:20px 12px;
	}
	.xzyhq_close{
		width:660px;
		height:60px;
		background: #F4F9FC;
		box-shadow: 0 0 4px 0 rgba(44,70,128,0.16);
		.bottom_64_32{
			margin-top:14px;
			margin-left:259px;
			.queding {
			    margin-left: 10px;
			    margin-right: 0px;
			}
		} 
	}
	.xzyhq {
		height:397px;
		padding:0px;
		.xzyhq_show{
			clear:both;
			display:block;
		    height:352px;
		    padding-left: 12px;
		    padding-top: 9px;
		     .el-checkbox-group .el-checkbox__label{
				display:none;
			}
			ul{
				margin:0;
				padding:0;
				list-style: none;
				li{
					float:left;
					width:315px;
					height:110px;
					background-image: url(../../../assets/huodong/yhjbg.png);
					background-size: 100%;
					.xzyhq_show_left{
						float:left;
						margin-left:26px;
						margin-top:32px;
						width:88px;
						
						.xzyhq_show_left_up {
							cite{
								display:block;
								float:left;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #FF6161;
								line-height: 14px;
								font-style: normal;
								margin-top:12px;
							}
							tt{
								display:block;
								font-family: PingFangSC-Regular;
								font-size: 30px;
								color: #FF6161;
								line-height: 30px;
								margin-left:4px;
							}
						}
						.xzyhq_show_left_down{
							margin-top:4px;
							em{
								clear: both;
								font-style: normal;
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #576D7A;
								line-height: 12px;
							}
						}
					}
					.xzyhq_show_right{
						padding-left:100px;
						.xzyhq_show_right_left{
							float:left;
							float: left;
						    margin-top: 30px;
						    margin-left: 10px;
						    cite{
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
							em{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #9AABB8;
								line-height: 12px;
								display:block;
								font-style: normal;
								margin-top:16px;
							}
						}
						.xzyhq_show_right_right{
						    float: left;
						    margin-top: 40px;
						    margin-left: 0px;
						    width: 20px;
						    height: 20px;
						    .el-checkbox__inner{
								width: 20px;
							    height: 20px;
							    border-radius: 10px;
							}
							.el-checkbox__input.is-checked .el-checkbox__inner {
							    background: #0c9aff;
							    border: 1px solid #20a0ff;
							    width: 20px;
							    height: 20px;
							    border-radius: 10px;
							}
							.el-checkbox__inner::after {
							    height: 11px;
							    left: 5px;
							    top: 0px;
							    width: 5px;
							}
						}
					}
				}
				li:hover{
					float:left;
					width:315px;
					height:110px;
					background-image: url(../../../assets/huodong/yhjbg.png) 0 50%;
					background-size: 100%;
				}
			}
		}
		.xzyhq_search{
			height:34px;
			padding-top: 20px;
		    padding-left: 20px;
		    cursor:pointer;
		    .el-input{
				float:left;
				width:180px;
				.el-input__inner{
					height:28px;
					width:180px;
				}
			}
			h1{
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
		}
	}
}

/**************新增优惠券 开始*******************/
.addyhq_dialog{
	width:460px;
	height:320px;
	.addyhq{
		margin: 0 auto;
	    margin-top: 20px;
	    img{
			margin-left: 180px;
			width:100px;
			height:100px;
		}
		cite{
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
	}
	.addyhq_add{
		margin-top: 31px;
	    margin-left: 181px;
	}
}
/*****选择优惠券 结束*******/
</style>