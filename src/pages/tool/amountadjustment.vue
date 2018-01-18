<template>
	<div class='appclass'>
		<!--{{start_end_date}}-->
		<!-- 金额调账 -->
		<div class="app-container calendar-list-container" v-loading="loading2">
			<div class="filter-container">			
				<span>调账日期:</span>
				<el-date-picker
				    type='daterange'
				    v-model="start_end_date"
				    range-separator="至"
				    @change='dateChange'
				    :picker-options="pickerOptions1" 
				    placeholder="选择日期范围">
				</el-date-picker>
				
				<el-input :placeholder="tips" v-model="search_text" style="width:280px;font-size:12px;margin-left:10px;" icon="search" @change="searchName">
				    <el-select v-model="search_type" slot="prepend" placeholder="会员"  style="width:80px;font-size:12px;" prop="huiyuan">
					      <el-option label="会员" value="会员" @click.native="changePlaceholder1()"></el-option>
					      <el-option label="会员卡" value="会员卡" @click.native="changePlaceholder2()"></el-option>
				    </el-select>
				    <el-button slot="append" icon="search" @click="searchName"></el-button>
				</el-input>
				
			    <el-button size='large'  type='primary' style="float:right;margin-right:10px;" @click="addCouponRevert">金额调账</el-button>
			</div>
			<div class="operate">
				<em>已选<span v-model="multipleSelection">{{multipleSelection.length}}</span>项</em>
				<el-button size='small' type='text' @click='passCoupon'>通过</el-button>
				<el-button size='small' type='text' @click='rejectCoupon'>驳回</el-button>
				<el-button size='small' type='text' icon='document' @click="handleDownload">导出金额调账账单</el-button>
			</div>
			
			<el-table v-loading="loading" empty-text='暂无任何数据' element-loading-text="给我一点时间" :data="tableData"   @filter-change="filterChange" @sort-change="sortChange" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="bill_code" label="调账单号" min-width="120">
				</el-table-column>
				<el-table-column header-align='center' :formatter="isNotNullFormat" column-key="status" :filters="filterStatus" prop="status" label="审批状态" align='center' min-width='100'>
					<template scope="scope">
						<tzx-tag :color="scope.row.status | statusFilter">{{scope.row.status | valueFilter}}</tzx-tag>
					</template>
				</el-table-column>
				<!--<el-table-column header-align='center' :formatter="isNotNullFormat" column-key="status" :filters="filterStatus"  
					prop="status_name" label="审批状态" align='center' min-width='100'>
					<template scope="scope">
						<tzx-tag :color="scope.row.status | statusFilter">{{scope.row.status | valueFilter}}</tzx-tag>
					</template>
				</el-table-column>-->
				<!-- <el-table-column header-align='center' 
					:formatter="dataFormat" column-key="reason" 
					:filters="filterReason"  prop="reason" label="撤销原因" align='center' min-width='100'>
				</el-table-column> -->
				<el-table-column header-align='center' 
								column-key="reason" 
								:filters="filterReason" 
								prop="reason_name" 
								label="调账原因" 
								align='center' 
								min-width='100'>
				</el-table-column>
				
				<el-table-column  header-align='center' prop="name" label="会员名称" align='center' min-width='100'>
				</el-table-column>
				<el-table-column  header-align='center' prop="card_code" label="卡号" align='center' min-width='100'>
				</el-table-column>
				<el-table-column  header-align='center' prop="trading_main" label="调账主账户" align='center' min-width='100'>
				</el-table-column>
				<el-table-column  header-align='center' prop="trading_reward" label="调账赠送账户" align='center' min-width='100'>
				</el-table-column>
				<el-table-column  header-align='center' sortable prop="report_date" align='center' label="申请日期" min-width='100'>
				</el-table-column>
				<el-table-column  header-align='center' prop="operator" label="申请人" align='center' min-width='100'>
				</el-table-column>
				<el-table-column header-align='center' align='center' fixed='right' v-if='tableData.length>0' label="操作" width="80">
					<template scope="scope">
						<tzx-tag color="#0C9AFF" @clickThis='findCouponDetail(scope.row)'>查看</tzx-tag>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination-container" v-if='tableData.length>0'>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.rows" layout="prev, pager, next,total, jumper,sizes" :total="total">
				</el-pagination>
			</div>
			
			
			<el-dialog title="驳回" :visible.sync="dialogRejectCoupon" custom-class="dialog_reject_zr"  :before-close="handleClose">
				<div class='content'>
					<el-form :model="ruleForm" label-position='right' :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="驳回原因:" prop="reason">
							<el-input size='small' type="textarea" 
								:rows="3" style='width:150px' v-model="ruleForm.reason" auto-complete="off" placeholder="请输入0-50个字符"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="fzhd_close">				
					<el-button size='large' style="margin-left:145px;margin-top:14px;" @click="dialogRejectCoupon = false">取消</el-button>		
					<el-button size='large' :loading='loading1' @click="rejectSubmit" type='primary'>确定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import { loadAmountAdjustList, findReason, exportUrl, updateAmountAdjust, findCheckStatus } from '@/api/amount'
	import Assist from '@/utils/assist'
	import { TzxTag, TzxOption } from '@/components/tag'
	import axios from "axios";
	
	export default {
		components: {
			TzxTag,
			TzxOption
		},
		data() {
			return {
				pickerOptions1: {  // 默认今天以前的日期才可选择
			          disabledDate(time) {
			            return time.getTime() > Date.now();
			          }
							},
				tips:"请输入会员", // placeholder 提示内容
				ids:[],//处理已经选择的对象的ids
				multipleSelection: [],//已经选中数据
				tableData: [],//列表数据
				
				dialogRejectCoupon: false,//驳回对话框
				
				search_text: '',//下拉搜索框
      			search_type: '会员', //下拉搜索框
				
      			start_end_date: [Assist.formatDate( new Date().setMonth(new Date().getMonth() - 3) ),Assist.formatDate( new Date() )],//搜索日期范围
				filterStatus: [],  // 审核状态过滤器
				
				filterReason: [],//原因状态过滤
				
				listQuery: {
					member: '',//会员手机号或者名称
					coupons_code:'',//会员卡
					time1:'',//开始日期
					time2:'',//结束日期
					status:'', //审核状态  
					reason:'',//撤销原因
					order: 1, // 0 是升序 1是降序
					page: 1, //当前页
					rows: 20,//页大小
				},
				loading: false,
				loading1: false,
				loading2: false,
				total: 0,
				showpop: false,
				maxHeight: undefined,
				hoverId: '',
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
		filters: {  // 审核状态自定义过滤器  
			statusFilter(status) {
				const statusMap = {  // 改变字体颜色过滤器
					'0': '#FFBF00',
					'1': '#4ECF88',
					'2': '#FF9001',
					'3': '#34495E'
				}
				return statusMap[status]
			},
			valueFilter(value) {
				const statusMap = {  // 改审核编码过滤器
					'0': '待审核',
					'1': '审核通过',
					'2': '已驳回',
					'': '--',
					null: '--'
				}
				return statusMap[value]
			},
			typeFilter(type) {
				return calendarTypeKeyValue[type]
			}
		},
		methods: {
			  // 修改 Placeholder的值 开始
		      changePlaceholder1(){
		      	this.tips="请输入会员"
		      },
		      changePlaceholder2(){
		      	this.tips="请输入会员卡"
		      },
			// 修改 Placeholder的值 结束
			dataFormat(row, column) {  // 用来格式化内容, 传入一个 Function(row, column, cellValue)
				if(row[column.property]==''||row[column.property]==null||row[column.property]==""){
					return '--'
				}else{
					return this.filterReason.filter(item=>row[column.property]== item.value)[0].text	
				}
			},
			dateChange(val){//日期时间处理  
				_czc.push(["_trackEvent", "金额调账列表页-日期时间处理事件", "点击"]);//统计流量
				if(val!=null||val!=""){
					let start_end_date = val.split("至");
					let start_date=start_end_date[0];
					let end_date=start_end_date[1];
					this.listQuery.time1 = start_date;
					this.listQuery.time2 = end_date;
					this.listQuery.page = 1;
					this.getList();
				}else{
					this.listQuery.time1 = "";
					this.listQuery.time2 = "";
					this.listQuery.page = 1;
					this.getList();
				}
			},
			searchName() {//会员名称搜索
		    	_czc.push(["_trackEvent", "金额调账列表页-会员名称搜索", "点击"]);//统计流量
		    	if( this.search_type === "会员" ){//判断是会员
		    		
		    		this.listQuery.member = this.search_text;
					this.listQuery.coupons_code = "";
                    this.listQuery.page = 1;
					this.getList();
		    	}else if( this.search_type === "会员卡" ){//判断是会员卡
		    		this.listQuery.member = "";
					this.listQuery.coupons_code = this.search_text;
                    this.listQuery.page = 1;
					this.getList();
					
		    	}
		    },
            loadStatus(){  // 审核状态过滤器
            _czc.push(["_trackEvent", "金额调账列表页-审核状态过滤器", "点击"]);//统计流量
                findCheckStatus().then( (res) => {
                    
                    let arrays = res.data;
                    this.filterStatus = this.dealStatus( arrays );
                } )

            },
            dealStatus( arrays ){  // 处理审核状态
            _czc.push(["_trackEvent", "金额调账列表页-处理审核状态", "点击"]);//统计流量
                let filterStatus = [];
                arrays.forEach( item => {
                    let obj = {};
                    obj.text = item.name;
                    obj.value = item.code;
                    filterStatus.push( obj );
                })
                return filterStatus;
            },
			loadReason(){//撤销原因
				_czc.push(["_trackEvent", "金额调账列表页-获取后台撤销原因列表", "点击"]);//统计流量
				findReason().then((response) => {
					let arrays = response;
					this.filterReason = this.dealReason(arrays);
				})

			},
			dealReason(arrays){//处理撤销原因  id ==》 value
				_czc.push(["_trackEvent", "金额调账列表页-撤销原因", "点击"]);//统计流量
				let filterReason=[];
				arrays.forEach(item =>{
					let obj = {};
					obj.text = item.reason;
					obj.value = item.id;
					filterReason.push(obj);
				})
			  return filterReason;
			},
			handleSelectionChange(val) {
		      this.multipleSelection = val;
		    },
			handleDownload() {//导出已经选择得数据
				_czc.push(["_trackEvent", "金额调账列表页-导出excel表格", "点击"]);//统计流量
			    if (this.multipleSelection.length) {
			        this.downloadLoading = true
			        require.ensure([], () => {
			          const { export_json_to_excel } = require('../../vendor/Export2Excel')
			         /* const tHeader = ['序号', '撤销单号', '审批状态', '撤销原因', '撤销券号','会员名称','手机号','券类','面值','申请日期','申请人']
			          const filterVal = ['id', 'last_operator', 'last_operator', 'last_operator', 'last_operator', 'last_operator', 'last_operator', 'last_operator', 'last_operator', 'last_operator','last_operator']*/
			          const tHeader = ['调账单号', '审批状态', '调账原因', '会员名称','卡号','调整主账户','调整赠送账户','申请日期','申请人']
			          const filterVal = ['bill_code', 'status_name', 'reason_name', 'name', 'card_code', 'trading_main', 'trading_reward', 'report_date', 'operator'];
			          const list = this.multipleSelection;
			          const data = this.formatJson(filterVal, list);
			          let ExcelTitle = this.tableData[0].tenancy_id +'-金额调账报表-' + Assist.formatDate( new Date() );
			          export_json_to_excel(tHeader, data, ExcelTitle )
			          this.$refs.multipleTable.clearSelection()
			          this.downloadLoading = false
			        })
			    } else {
			        this.$message({
			          message: '请至少选择一条记录',
			          type: 'warning'
			        })
			    }
    		},
    		formatJson(filterVal, jsonData) {
    			
		      return jsonData.map(v => filterVal.map(j => v[j]))
		    },
			passCoupon(){//通过
				_czc.push(["_trackEvent", "金额调账列表页-通过", "点击"]);//统计流量
				this.ids = [];
				if(this.multipleSelection.length==0){
					this.$message({//确定
						type: 'info',
						message: '请至少选择一条记录'
					});
					return false;
				}
				this.multipleSelection.forEach(item =>{
					if(item.status ==0){//只能勾选待审核的记录
						this.ids.push(item.id);
					}else{
						this.$message({//确定
							type: 'error',
							message: '只能勾选待审核的记录'
						});
					}
			    });
			    if(this.multipleSelection.length != this.ids.length){ //只能选择待审核记录
			    	return false;
			    }
			    
				//请求后台接口
				let message="确认通过当前申请？";
				this.$confirm(message, {
					showClose: false,
					showCancelButton:true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {//确认当前 提交  调用接口
					
					let data="ids="+ this.ids.join(",") +
							"&status=1"+
							"&not_pass_reason=";
					updateAmountAdjust(data).then((response) => {
						if(response.success) {
							this.$message({
								type: 'success',
								message: '保存成功'
							});
							this.getList();
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
				_czc.push(["_trackEvent", "金额调账列表页-驳回", "点击"]);//统计流量
			    this.ids =[];
				if(this.multipleSelection.length==0){
					this.$message({//确定
						type: 'info',
						message: '请至少选择一条记录'
					});
					return false;
				}
				this.multipleSelection.forEach(item =>{
					if(item.status ==0){//只能勾选待审核的记录
						this.ids.push(item.id);
					}else{
						this.$message({//确定
							type: 'error',
							message: '只能勾选待审核的记录'
						});
					}
			    });
			    if(this.multipleSelection.length != this.ids.length){ //只能选择待审核记录
			    	return false;
			    }else{
			    	this.dialogRejectCoupon = true;
			    }
			},
			rejectSubmit(){//驳回对话框提交
				_czc.push(["_trackEvent", "金额调账列表页-驳回弹出框", "点击"]);//统计流量
				
				//提交
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						this.dialogRejectCoupon = false;
						let data="ids="+ this.ids.join(",") +
							"&status=2"+
							"&not_pass_reason="+this.ruleForm.reason;
						updateAmountAdjust(data).then((response) => {
								if(response.success) {
									this.$message({
										type: 'success',
										message: '保存成功'
									});
									this.getList();
								} else {
									this.$message({
										type: 'error',
										message: '保存失败'
									});
								}
						})
                        this.ruleForm.reason = "";  // 发送完驳回请求之后, 清空原因选项
					} else {
						this.dialogRejectCoupon = true;
						return false;
					}
				});
			},
			addCouponRevert(){//新增金额调账撤销
				_czc.push(["_trackEvent", "金额调账列表页-跳转到新增金额调账页面", "点击"]);//统计流量
				this.$router.push({
					path: '/tool/newamountadjustment',
					hash: 'new'	
					
					});
			},
			findCouponDetail(row){//查看金额优惠券得详情
				_czc.push(["_trackEvent", "金额调账列表页-查看金额调账详情", "点击"]);//统计流量
				let path="/tool/amountadjustmentdetail";
				
				this.$router.push({
					path: path,
				    query:{id:row.id}
				});
			},
			isNotNullFormat(row, column) {
				let value = row[column.property];
				if(value == "" || value == null || value == undefined) {
					return '--'
				}
				return value;
			},
						
			handleSizeChange(val) {//改每页显示数量大小
				this.listQuery.rows = val
				this.getList();
			},
			handleCurrentChange(val) {//改变当前页码
				this.listQuery.page = val
				this.getList();
			},
			getFirstList() {
				_czc.push(["_trackEvent", "金额调账列表页-获取金额调账首页", "点击"]);//统计流量
				if(window.screen.height <= 768) {
					this.listQuery.rows = 10;
					this.maxHeight = '450';
				} else {
					this.maxHeight = '650';
				}
				this.listQuery.time1 = this.start_end_date[0];
				this.listQuery.time2 = this.start_end_date[1]
				this.getList();
			},
			getList() {
				_czc.push(["_trackEvent", "金额调账列表页-获取金额调账列表页", "点击"]);//统计流量
					let data = 	'type=jetz'+				    			
					           	'&t1=' + this.listQuery.time1 +  // 开始时间
							   	'&t2=' + this.listQuery.time2+  // 结束时间
							   	'&t3=' +this.listQuery.member+  // 会员 或者手机号
								'&t4='+ this.listQuery.coupons_code+  // 卡号
								'&status='+this.listQuery.status + 	 // 审批状态				
							   	'&reason=' + this.listQuery.reason +  // 调账原因
							   	// '&order=' + this.listQuery.order +  
					           	'&page=' + this.listQuery.page + // 页码
							   	'&rows=' + this.listQuery.rows  // 每页显示的行数
				   
					loadAmountAdjustList(data).then(response => {
						this.tableData = response.rows;
						this.total = response.total;
					});
				
					
			},
			filterTag(value, row) {
	
			},
			/* 筛选条件发生变化触发*/
			filterChange(filters) {
				_czc.push(["_trackEvent", "金额调账列表页-筛选条件", "点击"]);//统计流量
				let key = Object.keys(filters)[0];
				let value = filters[key];
				let types = value.join(",");
				if(key == 'status'){//判断是 审核状态
					this.listQuery.status = types;
				}else if(key == 'reason'){//判断是 撤销原因
					this.listQuery.reason = types;
				}
				this.getList();
			},
			/* 排序条件发生变化触发*/
			sortChange({column,prop,order}) {
				_czc.push(["_trackEvent", "金额调账列表页-排序条件", "点击"]);//统计流量
				//this.listQuery.sort = prop;
				this.listQuery.page = 1;
				if(order=='ascending'){
					this.listQuery.order =0
				}
				if(order=='descending'){
					this.listQuery.order =1
				}
				this.getList();

			},
			showPopover(hoverId) {
				this.showpop = true;
				this.hoverId = hoverId;
			},
			hidePopover(hoverId) {
				this.hoverId = 0;
				this.showpop = false;
			},
			handleClose(done) {
				done();
			}
			
		},
		mounted(){
			
			this.changePlaceholder2();
			this.changePlaceholder1();            
            this.loadStatus();    // 审核状态			
			this.loadReason();     //撤销原因
			this.getFirstList();
		},
		created() {
			this.changePlaceholder2()
			this.changePlaceholder1()
			
		},
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped="scoped">
	@import "src/styles/mixin.scss";
	.tzx-ul {
		padding: 4px 0px;
	}
	
    .el-icon-dropdown:before {
   		font-size: 14px;  
	}
    .el-icon-dropup:before {
    	font-size: 14px;
  	}
	.tzx-select {
		position: relative;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #34495E;
		height: 28px;
		font-size: 12px;
		line-height: 28px;
		box-sizing: border-box;
		cursor: pointer;
	}
	
	.tzx-select:hover {
		background: #F2F6FB;
		color: #0C9AFF;
		text-decoration: underline;
	}
	
	.tzx-text {
		height: 28px;
		line-height: 28px;
	}
	/*****复制活动弹出框 开始*******/
	
	.fzhd {
		margin-top: 13px;
	}
	
	.fzhd .fzhd_item {
		clear: both;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		line-height: 28px;
		margin-left: 30px;
		margin-right: 30px;
	}
	
	.fzhd .fzhd_item tt {
		color: #ff7171;
	}
	
	.fzhd .fzhd_item b {
		display: block;
		float: left;
		width: 100px;
		color: #758896;
		margin-bottom: 14px;
	}
	
	.fzhd .fzhd_item em {
		display: block;
		float: left;
	}
	
	.fzhd .fzhd_item_object {
		display: block;
		float: left;
		color: #576D7A;
		width: 470px;
	}
	
	.fzhd .fzhd_item_object cite {
		display: block;
		float: left;
		width: 70px;
		font-style: normal;
		/*margin-bottom: 12px;*/
	}
	
	.fzhd .fzhd_item_object2 {
		display: block;
		margin-left: 70px;
		float: left;
		color: #576D7A;
	}
	
	.fzhd .fzhd_item_object2 p {
		margin: 0;
		float: left;
		font-style: normal;
		color: #34495E;
		width: 400px;
		line-height: 22px;
		margin-top: 3px;
	}
	
	.fzhd_item .el-input .el-input__inner {
		width: 400px;
	}
	
	.fzhd_close {
		margin-top: 54px;
		height: 60px;
		background: #F4F9FC;
	}
	
	.fzhd_close .bottom_64_32 {
		margin-top: 14px;
		text-align: center;
		margin-left: 231px;
	}
	
	.fzhd_close .bottom_64_32 .queding {
		margin-left: 0px;
		margin-right: 10px;
	}
	/*****复制活动弹出框 结束*******/
	
	.el-dialog__body {
		.dialogbody {
			height: auto;
			padding-top: 20px;
			padding-bottom: 30px;
			.itemclass {
				height: auto;
				min-height: 28px;
				overflow: hidden;
				.itemleft {
					position: relative;
					width: 100px;
					height: auto;
					min-height: 28px;
					line-height: 28px;
					text-align: right;
					float: left;
					span {
						font-size: 14px;
						color: #758896;
						line-height: 14px;
						padding-right: 5px;
					}
				}
				.itemright {
					position: relative;
					float: right;
					width: 500px;
					line-height: 28px;
					height: auto;
					text-align: left;
					padding-left: 5px;
					.store {
						padding: 0 3px;
						position: relative;
						float: left;
						color: #34495E;
					}
					.itemcontent {
						min-height: 28px;
						overflow: hidden;
						.itemrightleft {
							position: relative;
							float: left;
							width: 70px;
							min-height: 28px;
							height: auto;
						}
						.itemrightright {
							position: relative;
							height: auto;
							float: right;
							width: 425px;
							.cardcoupon {
								padding: 0 3px;
								position: relative;
								float: left;
								color: #34495E;
								em {
									color: red
								}
							}
						}
						.itemrightright1 {
							position: relative;
							float: left;
							.cardcoupon {
								padding: 0 3px;
								position: relative;
								float: left;
								color: #34495E;
							}
						}
					}
					span {
						font-size: 14px;
						color: #34495E;
						line-height: 14px;
					}
				}
			}
		}
		.dialogfooter {
			line-height: 60px;
			height: 60px;
			text-align: center;
			background: #F4F9FC;
		}
	}
	/*批量操作*/
	.operate{
		margin:0;
		padding:0;
		height:49px;
		width:100%;
		border:1px solid #EFF7FC;
		margin-bottom:10px;
		line-height: 50px;
	}
	.operate em{
		margin-left:10px;
		font-size:12px;
	}
	.operate em span{
		color:#FF7171;
	}
	
	.dialog_reject_zr .fzhd_close{
		margin-top: 0px;
	}
	
</style>