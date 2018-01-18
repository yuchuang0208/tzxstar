<template>
	<div class='jetz'>
		
		<!--这个是  金额调账详情页面 组件 -->
		<!-- 金额调账详情头部 开始  -->
		<h1><em>储值调账查看</em><cite v-if="showOrNo">提示：撤销审核中的调整金额不可以使用</cite></h1>
			<!-- <span style="font-size: 18px;font-weight: bold;">金额调账查看</span> <span style="color: red" v-if="showOrNo">提示：撤销审核中的调整金额不可以使用</span> -->
		<!-- 金额调账详情头部 结束 -->
		
		<!-- 金额调账查看 开始 -->
		<div class="main">
			<table>
				<tr>
					<td ><span>调账单号：</span><span>{{list.bill_code}}</span></td>
					<td ><span>会员名：</span><span>{{list.customer_name}}</span></td>
				</tr>
				<tr>
					<td ><span>手机号：</span><span>{{list.mobil}}</span></td>
					<td ><span>关联订单：</span><span>{{list.order_no}}</span></td>
				</tr>
				<tr>
					<td ><span>调账原因：</span><span>{{list.reason}}</span></td>
					<td ><span>调整机构：</span><span>{{list.org_full_name}}</span></td>
				</tr>
				<tr>
					<td ><span>报表时间：</span><span>{{list.report_date}}</span></td>	
					<td ><span>状态：</span><span>{{list.status_name}}</span></td>
				</tr>
				<tr>
					<td ><span>调账申请人：</span><span>{{list.operator}}</span></td>
					<td ><span>申请时间：</span><span>{{list.operater_time}}</span></td>
				</tr>
				<tr>
					<td v-if="list.status_name == '已驳回'"><span>驳回原因：</span><span>{{list.not_pass_reason}}</span></td>
					<td><span>备注：</span><span>{{list.remark}}</span></td>
				</tr>
				<tr>
					<td  ><span>审批人：</span><span>{{list.check_operator}}</span></td>
					<td ><span>审批时间：</span><span>{{list.check_time}}</span></td>
				</tr>
			</table>			
			<!-- 金额调账查看 结束 -->
		</div>
		<h1><em>账户余额信息</em></h1>
		<div class="main">			
			<table>
				<tr>
					<td><span>会员卡号：</span><span>{{list.card_code}}</span></td>	
				</tr>
				<tr>
					<td><span>原主账户余额：</span><span>{{list.original_main}}</span></td>
					<td><span>原赠送账户余额：</span><span>{{list.original_reward}}</span></td>
				</tr>
				<tr>
					<td><span>调整主账户：</span><span>{{list.trading_main}}</span></td>
					<td><span>调整后主账户余额：</span><span>{{list.main_balance}}</span></td>
				</tr>
				<tr>
					<td><span>调整赠送账户：</span><span>{{list.trading_reward}}</span></td>
					<td><span>调整后赠送账户余额：</span><span>{{list.reward_balance}}</span></td>
				</tr>
			</table>
			<!-- 账户余额信息  结束 -->
		</div>
		<div class="quxiao_and_tijiao">
			<div class="bottom_64_32">
				<div class="queding" v-if="showOrNo" @click='pass'><em>通过</em></div>
		       	<div class="quxiao" v-if="showOrNo" @click='dialogReject = true'><em>驳回</em></div>
		       	<em class="botton_text" @click="goBack">返回</em>
			</div>			
		</div>
		
		
		<!-- 驳回弹出框 开始 -->
		<el-dialog title="驳回" :visible.sync="dialogReject" custom-class="dialog_reject_zr"  :before-close="handleClose">
			<div class='content'>
				<el-form :model="ruleForm" label-position='right' :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="驳回原因:" prop="reason">
						<el-input size='small' type="textarea" :rows="3" style='width:150px' v-model="ruleForm.reason" auto-complete="off" placeholder="请输入0-50个字符"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="fzhd_close">				
				<el-button size='large' style="margin-left:145px;margin-top:14px;" @click="dialogReject = false">取消</el-button>		
				<el-button size='large' @click="rejectSubmit" type='primary'>确定</el-button>
			</div>
		</el-dialog>
		<!-- 驳回弹出框 结束 -->
		
	</div>
</template>

<script>
	import { findAmountAdjustDetail,updateAmountAdjust } from '@/api/amount'
	import axios from "axios";
	export default {
		data(){
			return {
				
				showOrNo: false, // 显示或隐藏提示
				list:{},  // 获取金额调账详情的列表
				dialogReject : false,  // 驳回弹出框控制按钮
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
		methods:{
			// 获取金额调账详情页
			getList(){
				_czc.push(["_trackEvent", "金额调账详情页-获取金额调账详情页", "点击"]);//统计流量
				let id = this.$route.query.id;
				let data = "id="+id
				findAmountAdjustDetail(data).then((res)=>{
					this.list = res;
					for( var k in this.list ) {
						if( this.list[k] === ''|| this.list[k] === null ){
							this.list[k] = '--';
						}
					}
					if(this.list.status_name === "待审核"){
						this.showOrNo = true;
					}
					if( this.list.status_name === "审核通过" || this.list.status_name === "已驳回" ){
						this.showOrNo = false;
					}
			
				})
			},
			// 返回上一页
			goBack(){  
				_czc.push(["_trackEvent", "金额调账详情页-返回上一页", "点击"]);//统计流量
				this.$router.push({path:'/tool/amountadjustment', hash: "new"})
			},
			pass(){//通过
				_czc.push(["_trackEvent", "金额调账详情页-通过", "点击"]);//统计流量
				//请求后台接口
				let message="确认通过当前申请？";
				this.$confirm(message, {
					showClose: false,
					showCancelButton:true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {//确认当前 提交  调用接口
					
					let data="id="+ this.$route.query.id +
							"&status=1"+
							"&not_pass_reason=";
					updateAmountAdjust(data).then((response) => {
						if(response.success) {
							this.$message({
								type: 'success',
								message: '保存成功'
							});
							this.list.status_name= "审核通过"
							this.showOrNo = false;
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
			
			rejectSubmit(){//驳回对话框提交
				_czc.push(["_trackEvent", "金额调账详情页-驳回对话框提交", "点击"]);//统计流量
				//提交
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						this.dialogReject = false;
						let data="id="+ this.$route.query.id +
							"&status=2"+
							"&not_pass_reason="+this.ruleForm.reason;
						updateAmountAdjust(data).then((response) => {
								if(response.success) {
									this.$message({
										type: 'success',
										message: '保存成功'
									});
									this.list.status_name= "已驳回"
									this.showOrNo = false;
								} else {
									this.$message({
										type: 'error',
										message: '保存失败'
									});
								}
						})
					} else {
						this.dialogReject = true;
						
					}
				});
			},
			handleClose(done) {
				done();
			}
			
		},
		created(){
			
			this.getList();
			
			
		},
		

		
		
	};

	
</script>

<style lang="scss">
.jetz {
	background-color: #fff;
}
.jetz h1{
 	height: 58px;
    line-height: 58px;
    border-bottom: 1px solid #eaf1f6;
	font-size: 20px;
	margin: 0 20px;
 }
.jetz h1 em{
 	font-size: 16px;
 }
.jetz h1 cite{
 	margin-left: 16px;
    font-size: 12px;
    color: #9AABB8;
 }
.jetz {
	.main {
		padding: 20px 40px 34px;
		table {
			tr {
				td {
					width: 400px;
					height: 32px;
    				line-height: 32px;
				}
			}
		}
	}
}

.jetz .dialog_reject_zr .fzhd_close{
	margin-top: 0px;
}
.jetz .fzhd_close {
	margin-top: 54px;
	height: 60px;
	background: #F4F9FC;
}
	
.jetz .fzhd_close .bottom_64_32 {
	margin-top: 14px;
	text-align: center;
	margin-left: 231px;
}
	
.jetz .fzhd_close .bottom_64_32 .queding {
	margin-left: 0px;
	margin-right: 10px;
}


.jetz .quxiao_and_tijiao{    
	margin-left: 40px;
    margin-right: 40px;
    overflow: hidden;
    border-top: 1px dashed #eaf1f6;
}
.jetz .quxiao_and_tijiao .bottom_64_32{
 	margin-top:30px;	
 	margin-bottom:30px;
}
.jetz .quxiao_and_tijiao .bottom_64_32 .queding,.quxiao{
 	margin-right: 10px;
}
.jetz .quxiao_and_tijiao .bottom_64_32 .botton_text{
 	font-size: 14px;
    color: #0c9aff;
    line-height: 32px;
}
</style>