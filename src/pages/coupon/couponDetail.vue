<template>
	<div class="coupon_detail" v-model="coupon">
	        <h1><em>撤销优惠券查看</em><cite>待审核中的优惠券，不可以使用</cite></h1>
	        <div class="main">
	        	<el-form>
	        		<el-form-item label="撤销单号:" >
					    <span>{{coupon.bill_code}}</span>
					</el-form-item>
					<el-form-item label="会员名:">
					    <span>{{coupon.name}}</span> 
					</el-form-item>
					<el-form-item label="手机号:">
					    <span>{{coupon.mobil}}</span>
					</el-form-item>
					<el-form-item label="撤销原因:">
					     <span>{{ dataFilter(coupon.reason) }}</span>
					</el-form-item>
					
					<el-form-item label="状态:" >
					    <span>{{coupon.status | valueFilter}}</span>
					</el-form-item>
					<el-form-item label="撤销申请人:">
					    <span>{{coupon.operator}}</span>
					</el-form-item>
					<el-form-item label="申请时间:">
					    <span>{{coupon.operater_time}}</span>
					</el-form-item>
					<el-form-item label="备注:" class="tonglan">
					    <span>{{coupon.remark1}}</span>
					</el-form-item>
					<el-form-item label="审批人:">
					    <span>{{coupon.check_operator}}</span>
					</el-form-item>
					<el-form-item label="审批时间:">
					    <span>{{coupon.check_time}}</span>
					</el-form-item>
	        	</el-form>
			</div>
			
			<h1><em>优惠券信息</em></h1>
	        <div class="main">
                <el-form>
	        		<el-form-item label="优惠券号:" >
					    <span>{{coupon.coupons_code}}</span>
					</el-form-item>
					<el-form-item label="券类型:">
					    <span>{{coupon.class_name}}</span>
					</el-form-item>
					<el-form-item label="价值:">
					    <span>{{coupon.face_value}}</span>
					</el-form-item>
					<el-form-item label="领取时间:">
					    <span>{{coupon.send_time}}</span>
					</el-form-item>
					<el-form-item label="过期时间:" >
					    <span>{{coupon.end_coupon}}</span>
					</el-form-item>
					<el-form-item label="单次使用张数:">
					    <span>{{coupon.bill_limit_num}}</span>
					</el-form-item>
					<el-form-item label="启用金额:">
					    <span>{{coupon.bill_limit_money}}</span>
					</el-form-item>
					<el-form-item label="启用时间:">
					    <span>{{coupon.start_coupon}}</span>
					</el-form-item>
					
					<el-form-item label="使用时间段:" class="use_week">
						<el-form-item label="" :key='index' v-for="(item,index) in coupon.d_time">
					    	<span>{{item.week}}</span><span>{{item.days}}</span>
						</el-form-item>
					</el-form-item>
					<el-form-item label="与其他券混用:">
					    <span>{{coupon.used_other | usedOtherFilter}}</span>
					</el-form-item>
					<el-form-item label="使用门店:" class="tonglan">
					    <span v-for="item in coupon.storeNames">{{item}},</span> 
					</el-form-item>
					<el-form-item label="说明:" class="tonglan">
					    <span>{{coupon.remark2}}</span>
					</el-form-item>
					
	        	</el-form>
			</div>
            <div class="quxiao_and_tijiao">
				<div class="bottom_64_32">
		       		<div class="queding" v-if="coupon.status == 0" @click='passCoupon'><em>通过</em></div>
		       		<div class="quxiao" v-if="coupon.status == 0" @click='rejectCoupon'><em>驳回</em></div>
		       		<em class="botton_text" @click="back">返回</em>
		       	</div>
			</div>
			
			<el-dialog title="驳回" :visible.sync="dialogRejectCoupon" custom-class="dialog_reject_zr"  :before-close="handleClose">
				<div class='content'>
					<el-form :model="ruleForm" label-position='right' :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="驳回原因:" prop="reason">
							<el-input size='small' type="textarea" :rows="3" style='width:150px' v-model="ruleForm.reason" auto-complete="off" placeholder="请输入0-50个字符"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="fzhd_close">				
					<el-button size='large' style="margin-left:145px;margin-top:14px;" @click="closeDialogReject">取消</el-button>		
					<el-button size='large' :loading='loading1' @click="rejectSubmit" type='primary'>确定</el-button>
				</div>
			</el-dialog>
	</div>
</template>
<script>
	import { getCouponDetail,getRevertReasonList ,updateCouponRevertStatus} from '@/api/coupon'
	import axios from "axios";
	export default {
		data() {
			return {
				coupon:{},//优惠券详情信息
				id:"",//列表页传过来得id
				filterReason:[],//原因状态过滤
				dialogRejectCoupon: false,//驳回对话框
				ruleForm: {
					reason: ''
				},
				rules: {
					reason: [{
						required: true,
						message: '  ',
						trigger: 'blur'
					},
					{
						 min: 0, max: 50, message: '长度在0 到 50个字符', trigger: 'blur'
					}]
				}
			}
		},
		filters: {
			valueFilter(value) {
				const statusMap = {
					'0': '未审核',
					'1': '审核通过',
					'2': '驳回',
					'': '--',
					null: '--'
				}
				return statusMap[value]
			},
			usedOtherFilter(value) {
				const statusMap = {
					'0': '否',
					'1': '是',
					'': '--',
					null: '--'
				}
				return statusMap[value]
			}
		},
		methods: {
			passCoupon(){//通过
				//请求后台接口
				_czc.push(["_trackEvent", "优惠券撤销-通过", "点击"]);//统计流量
				let message="确认通过当前申请？";
				this.$confirm(message, {
					showClose: false,
					showCancelButton:true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {//确认当前 提交  调用接口
					let data="ids="+ this.id +
							"&status=1"+
							"&not_pass_reason=";
					updateCouponRevertStatus(data).then((response) => {
						if(response.success) {
							this.$message({
								type: 'success',
								message: '保存成功'
							});
							this.$router.push({
								path: "/card/couponList",
								hash: 'new'
							});
						} else {
							this.$message({
								type: 'error',
								message: '保存失败'
							});
						}
					})
				}).catch(() => {//取消
					
		        });
			},
			rejectCoupon(){//驳回
			    this.dialogRejectCoupon = true;
			},
			rejectSubmit(){//驳回对话框提交
				_czc.push(["_trackEvent", "优惠券撤销-驳回", "点击"]);//统计流量
				//提交
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						this.dialogRejectCoupon = false;
						let data="ids="+ this.id +
							"&status=2"+
							"&not_pass_reason="+this.ruleForm.reason;
						updateCouponRevertStatus(data).then((response) => {
							    this.ruleForm.reason = "";
								if(response.success) {
									this.$message({
										type: 'success',
										message: '保存成功'
									});
									this.$router.push({
										path: "/card/couponList",
										hash: 'new'
									});
								} else {
									this.$message({
										type: 'error',
										message: '保存失败'
									});
								}
						})
					} else {
						this.dialogRejectCoupon = true;
						return false;
					}
				});
			},
			dataFilter(value) {
				if(value==''||value==null||value=="0"){
					return '--'
				}else{
					let arrays = this.filterReason.filter(item=>value== item.value);
					if(arrays!=null){
						return arrays[0].text;
					}else{
						return value;
					}	
				}
			},
			back(){//返回
				this.$router.push({
					path: "/card/couponList",
					hash: 'new'
				});
			},
			/*根据活动类型 和 id 查询列表并回显*/
			updateFormData(id){
				_czc.push(["_trackEvent", "优惠券撤销-查看", "点击"]);//统计流量
				let data ='ids='+id;
				getCouponDetail(data).then(response => {
					this.coupon = response;
				})
				/*axios.get('http://localhost:9280/static/coupon_detail.json').then((response) => {
					this.coupon = response.data;
				});*/
			},
			loadReason(){//撤销原因
				getRevertReasonList().then((response) => {
					let arrays = response;
					this.filterReason = this.dealReason(arrays);
				})
				/*axios.get('http://localhost:9280/static/coupon_reason.json').then((response) => {
					let arrays = response.data;
					this.filterReason = this.dealReason(arrays);
				});*/
			},
			dealReason(arrays){//处理撤销原因  id ==》 value
				let filterReason2=[];
				arrays.forEach(item =>{
					let obj = {};
					obj.text = item.text;
					obj.value = item.id;
					filterReason2.push(obj);
				})
			  	return filterReason2;
			},
			closeDialogReject(){//关闭对话框
				this.dialogRejectCoupon =false;
			},
			handleClose(done) {
				done();
			}
		},
		mounted(){
			
		},
		created() {
			this.loadReason();
			
			if(this.$route.query.id!=undefined){
				this.id = this.$route.query.id;
				this.updateFormData(this.$route.query.id);	
			}
 			/*this.updateFormData(1);*/

		},
	}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";

.coupon_detail{
	background: #FFFFFF;
}
 .coupon_detail h1{
 	height: 58px;
    line-height: 58px;
    border-bottom: 1px solid #eaf1f6;
	font-size: 20px;
	margin: 0 20px;
 }
 .coupon_detail h1 em{
 	font-size: 16px;
 }
 .coupon_detail h1 cite{
 	margin-left: 16px;
    font-size: 12px;
    color: #9AABB8;
 }
 .coupon_detail .main{
 	margin-left:40px;
 	margin-right:40px;
 	margin-top:24px;
 	margin-bottom:34px;
 	display:table;
 }
.coupon_detail .main .el-form .el-form-item{
	width:400px;
	display: inline-table;
	margin-bottom: 0px; 
}
.coupon_detail .main .el-form .el-form-item .el-form-item__label{
	margin-left:0px !important;
	padding: 6px 0px 6px 0;
}
.coupon_detail .main .el-form .tonglan{
	width:1000px;
	display: inline-block;
}
/**行高**/
.coupon_detail .el-form-item__content{
	line-height:28px !important;
	/*height:28px;*/
}
.coupon_detail .el-form-item__content span:nth-child(1){
	margin-left:10px;
}
.coupon_detail .el-form-item__content span:nth-child(1){
	margin-left:4px;
}
.coupon_detail .el-form-item .el-form-item{
	margin-left:90px;
}
.coupon_detail .main .el-form .use_week .el-form-item__label{
	width:75px;
}
.coupon_detail .main .el-form .use_week .el-form-item__content{
	width:400px;
}
.coupon_detail .main .el-form .use_week .el-form-item__content .el-form-item{
	width:300px;
}
.coupon_detail .main .el-form .use_week .el-form-item__content .el-form-item .el-form-item__label{
	width:40px;
}
.coupon_detail .main .el-form .use_week .el-form-item__content .el-form-item__content{
	width:160px;
}
.coupon_detail .main .el-form .use_week .el-form-item{
    display: block;
}

.coupon_detail .main .el-form .el-form-item:nth-child(9){
	display: block;
    float: left;
}
.coupon_detail .main .el-form .el-form-item:nth-child(10){
	display: block;
    float: left;
}
.coupon_detail .main .el-form .el-form-item:nth-child(11){
	/*display: block;*/
}
.coupon_detail .main .el-form .el-form-item:nth-child(11) .el-form-item__content{
	display:-webkit-box;
}
.coupon_detail .quxiao_and_tijiao{    
	margin-left: 40px;
    margin-right: 40px;
    overflow: hidden;
    border-top: 1px dashed #eaf1f6;
}
.coupon_detail .quxiao_and_tijiao .bottom_64_32{
 	margin-top:30px;	
 	margin-bottom:30px;
}
.coupon_detail .quxiao_and_tijiao .bottom_64_32 .botton_text{
 	font-size: 14px;
    color: #0c9aff;
    line-height: 32px;
}
.coupon_detail .bottom_64_32 .queding,.quxiao{
	margin-right:10px;
}
.coupon_detail .el-form-item__label{
	width: auto;
}

.dialog_reject_zr .fzhd_close{
	margin-top: 0px;
	height: 60px;
	background: #F4F9FC;
	.bottom_64_32 {
		margin-top: 14px;
		text-align: center;
		margin-left: 231px;
		.queding {
			margin-left: 0px;
			margin-right: 10px;
		}
	}
}

</style> 