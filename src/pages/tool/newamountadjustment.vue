<template>
	<div class='appclass' style="display:inline-table;width:100%" @click="closeInfo"  v-loading="loading" element-loading-text="提交中">
		<!--这个是  金额调账 组件 -->
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm" >
			<!-- 搜索框 开始 -->
			<div style="margin:20px;position:relative;">
				
				<el-form-item label="" prop="searchMember">
					<div>
						<el-input style="width: 560px;margin-left:-120px;" v-model="ruleForm.searchMember" @change="searchMemberClick"
							:placeholder="tips"
							icon="search"
							:on-icon-click="searchMemberClick">
							<el-select style="width:80px" v-model="select" slot="prepend" placeholder="tips">
								<el-option label="会员" @click.native="changePlaceholder1()" value="customer"></el-option>
								<el-option label="会员卡" @click.native="changePlaceholder2()" value="card"></el-option>
							</el-select>
						</el-input>
						<el-button style="position:relative;top:-2px;" @click="closeTable" v-if="flag" type="primary">收起表格</el-button>
					</div>				
				</el-form-item>
			<div style="border-top:none;position:absolute; top:46px; left: 108px;z-index: 999; background-color: #fff;padding: 12px;padding-top:0;" v-if="toogleSearchTable">
				<el-table style="width: 477px" :data="searchTableData" @row-click="tableRowClick" >
				<el-table-column  header-align='center' align='center' prop="card_code" label="卡号" min-width="40">
					
				</el-table-column>
				<el-table-column  header-align='center' align='center' prop="name" label="会员姓名" min-width="40">
					
				</el-table-column>
				<el-table-column  header-align='center' align='center' prop="mobil" label="手机号" min-width="40">
						
				</el-table-column>
				</el-table>
				<div>
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-size="listQuery.rows" 
						layout="prev, pager, next,total, jumper" :total="total">
					</el-pagination>
				</div>
			</div>		
		</div>
		<!-- 搜索框 结束 -->

		<!-- 卡账户信息 开始  -->
		<div style="width: 600px; display:table;" >
		
				<!-- 卡账户信息填充 开始 -->
				<el-form-item label="卡账户信息" class="accountInfo">				    
				    <div v-if="cardsNmaeShowOrHide" class="accountInfos">
				    	<table>
				    		<tr>
				    			<td colspan="3">卡号: <span>{{memberInfo.card_code}}</span></td>
				    			<td ><span style="margin-left: 120px">会员:</span><span>{{memberInfo.name}}</span></td>
				    		</tr>
				    		<tr>
				    			<td colspan="4">手机号: <span>{{memberInfo.mobil}}</span></td>

				    		</tr>
				    		<tr>
				    			<td colspan="2">原主账户余额: <strong>{{memberInfo.main_balance}}</strong></td>
				    			<td colspan="2">原赠送账户余额: <strong>{{memberInfo.reward_balance}}</strong></td>
				    			
				    		</tr>
				    		<tr>
				    			<td colspan="2">调整后主账户余额: <strong>{{computed_amountMoney1}}</strong></td>
				    			<td colspan="2">调整后赠送账户余额: <strong>{{computed_amountMoney2}}</strong></td>
				    		</tr>		    		
				    	</table>
				    </div>
				 </el-form-item>
				<!--卡账户信息填充  结束  -->


				
				<!-- 调账原因  开始  -->
				<el-form-item label="调账原因：" required prop="reason">
					<el-select v-model="ruleForm.reason"  placeholder="请选择调账原因" style="width:320px">
						<el-option v-for="item in filterReason" :key="item.id" :label="item.reason" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<!-- 账单原因  结束 -->



				<!-- 关联订单 开始 -->
				<el-form-item label="关联订单：" prop="YesOrNo" required>
				   	<el-radio-group v-model="ruleForm.YesOrNo">
						<el-radio :label="1">是</el-radio>
						<el-radio :label="0">否</el-radio>
					</el-radio-group>				
				 </el-form-item>
				 
				 <el-form-item label="" prop="orderID" v-if='ruleForm.YesOrNo==1'>
				    <el-input type="age" v-model="ruleForm.orderID" @change="searchOrderClick"
						icon="search" 
				    	:on-icon-click="searchOrderClick"
					 	placeholder="请输入订单号：" auto-complete="off" style="width: 320px;margin-left: 40px;">
					</el-input>
					<el-button style="position:relative;top:-2px;" @click="closeTable" v-if="flags" type="primary">收起表格</el-button>			
				 	</el-form-item>
				 <!-- 点击图标显示 搜索弹出框 开始  -->
				 <div style="position: absolute; top:440px; left:362px;z-index: 999; background-color: #fff;padding: 0 12px 12px 12px"
				 	v-if="searchoIdDataShowOrNo && this.ruleForm.YesOrNo === 1">
				 	<el-table :data="searchoIdData" @row-click="tableIdRowClick" >
					<el-table-column  header-align='center' align='center' prop="id" label="交易单号" min-width="40">
						
					</el-table-column>
					<el-table-column  header-align='center' align='center' prop="operate_time" label="交易时间" min-width="40">
						
					</el-table-column>
					<el-table-column  header-align='center' align='center' prop="org_full_name" label="交易门店" min-width="40">
						 
					</el-table-column>
					</el-table>
					<div>
						<el-pagination @current-change="handleCurrentChange2" :current-page.sync="listQuery2.page2" :page-size="listQuery2.rows2" 
							layout="prev, pager, next,total, jumper" :total="total2">
						</el-pagination>
					</div>
				 </div>
				 <!-- 点击图标显示 搜索弹出框 结束  -->
				 <!-- 关联订单  结束 -->
				 
				
				
				<!-- 调整积分 开始 -->
				<el-form-item label="调整主账户金额：" prop="money1" required>				   
				   	<el-input type="age" v-model.number="ruleForm.money1" placeholder="0.00" auto-complete="off" style="width: 320px;"></el-input>				  				    
				 </el-form-item>
				 <!-- 调整积分 结束 -->
				<!-- 调整积分 开始 -->
				<el-form-item label="调整赠送账户金额：" prop="money2" required>				   
				   	<el-input type="age" v-model.number="ruleForm.money2" placeholder="0.00" auto-complete="off" style="width: 320px;"></el-input>				  				    
				 </el-form-item>
				 <!-- 调整积分 结束 -->


				 <!-- 调整机构 开始  -->
				 <el-form-item label="调整机构:" prop="store_id" class="jigoutrees">
					<!-- <el-input class="select-input-zr" readonly placeholder="请选择调整机构" icon="caret-bottom"  v-model="ruleForm.store_name" :on-icon-click="handleIconClick" style="width:320px;"></el-input>
					<div style="margin-left: 40px;" class="select-tree-zr" v-if="isselecttree">
						<el-input
							placeholder="输入机构名称"
							v-model="filterText" icon="search">
						</el-input>
						<el-tree ref="classTree" 
								class="filter-tree-zr"
								:data="selectTreeData" 
								:props="defaultProps" 
								:default-expanded-keys="[]" 
								node-key="id" 
								:filter-node-method="filterNode"
								show-checkbox
								@check-change="boxChange">
						</el-tree>
					</div> -->
					<tzx-tree-input-node @getButton='getStoresIds' :pnodes="storeId" :isLeaf="isMyLeaf"></tzx-tree-input-node>
				</el-form-item>
				<!-- 调整机构结束 -->



				<!-- 报表日期 开始  -->				
				<el-form-item  label='报表日期' prop="report_date" >
					<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.report_date" style="width: 320px;"></el-date-picker>
				</el-form-item>
					
							 
				
				<!-- 备注 开始 -->
				<div style="margin-left: 10px;">					
					<el-form-item label="备注" prop="remark" style="width: 100px">
						<el-input type="textarea" v-model="ruleForm.remark" style="width: 320px;margin-left:-10px"></el-input>
					</el-form-item>
					<div style="margin: 40px 0 0 30px;">
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')" style="width: 100px">提交</el-button>
							<el-button @click="resetForm" style="width: 100px; background-color:#999; color:#fff;">返回</el-button>
						</el-form-item>
					</div>
				</div>
			
		</div>
		</el-form>
		<!-- 卡账户信息 结束  -->

	</div>
</template>

<script>
	import Assist from '@/utils/assist';
	import axios from "axios"
	import { findReason,findOrgan,findCc,findOrder,insertAmountAdjust } from '@/api/amount'     //获取调账原因,调账机构,查询会员,查询会员订单,保存
	import { TzxTag, TzxOption } from '@/components/tag'
	import { TzxTreeInputNode } from '@/components/TzxTreeInputNode'
	import debounce  from 'lodash/debounce';
	export default {
		components: {
			TzxTag,
			TzxOption,
			TzxTreeInputNode
		},
		name: 'amountadjustment',
		watch: {
	      filterText(val) {
	        this.$refs.classTree.filter(val);
	      }
	    },
	    computed:{
			
			computed_amountMoney1(){
				return this.ruleForm.amountMoney1 = this.memberInfo.main_balance + this.ruleForm.money1  
			},  
			computed_amountMoney2(){
				return this.ruleForm.amountMoney2 = this.memberInfo.reward_balance + this.ruleForm.money2 
			}  
		},
		data() {
			return {
				node:{},//门店id数组
				storeId:{},//门店id
				isMyLeaf: true,
				flag: false,
				flags: false,
				loading:false,
				searchTableData:[],  // 搜索列表
				toogleSearchTable: false,  // 显示影藏下拉列表
				memberInfo: [],  // 会员信息
				cardsNmaeShowOrHide:false,  // 控制卡账户信息显示或隐藏
				total:0,
				listQuery: {  // 查询会员 列表分页信息
					
					page: 1, //当前页
					rows: 10,//页大小
				},
				searchoIdData:[],  // 订单列表
				searchoIdDataShowOrNo:false,  // 显示搜索订单号列表
				total2:0,
				listQuery2: {  // 查询订单 列表分页信息
					page2: 1, //当前页
					rows2: 5,//页大小
				},
				tips: '可输入手机号、会员姓名、会员卡号查询',
				select: '会员', // 搜索框选择下拉默认值 是1 选定的是会员
				restaurants: [], // element 默认的
				// searchMember: '', // 我自己改的 搜索会员searchMember: '', // 我自己改的 搜索会员
				timeout: null, // 延时
				

				reasonChecked:'',//选中得调账原因
				filterReason: [],//原因状态过滤
				remark:"",//备注




				isselecttree:false,//是否显示树				//调整机构
				// orgnames:"",//被选择的机构字符串
				selectTreeDataChecked:[],//下拉树选择的数据
				selectTreeData: [],
				defaultProps: {
		          children: 'children',
		          label: 'name',
		          id:'id'
				},
				filterText: '',



				/** 表单验证规则  开始  */
				ruleForm: {	
					searchMember:'',// 选择会员的验证信息缓存							//提交表单的参数		
					orderID: '',//会员订单号
					original_credit: '',//原可用积分
					money1: '',//调账积分
					money2: '',//调账积分
					aountMoney1:'',  // 计算调整后主账户赠送金额
					aountMoney2:'',  // 计算调整后的赠送账户金额				
					reason:'',//调账原因传入对应的编码
					YesOrNo: '',//是否关联订单
					order_source: '',//订单来源
					order_no: '',//关联订单编号
					store_id: '',//调账机构id
					store_name: '',//调账机构名称
					report_date: '',//报表日期
					remark: '',//备注
				},
				rules: {
					searchMember:[{
						required: true,
						message: '请选择会员账户',
						trigger: 'change'
					}],
					reason: [{
						required: true,
						message: '请选择调账原因',
						// trigger: 'change'
					}],
					YesOrNo: [{
						required:true,
						message: '请选择是否关联订单',
						// trigger: 'change'
					}],
					orderID:[
						{
							required: true, message: '不能为空'
						},
						{
							type: 'string', message: '订单号无效'
						}
					],
					money1:[{
						required: true, message: '不能为空'
					},{
						type: 'number', message: '金额必须为数字值'
					}],
					money2:[{
						required: true, message: '不能为空'
					},{
						type: 'number', message: '金额必须为数字值'
					}],
					store_id:[{
						required: true,
						message: '请选择调账机构',
						trigger: 'change'
					}],				
					report_date: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					remark: [{						
						max: 50,
						message: '最多输入50 个字符',
						trigger: 'blur'
					}]
				}
				/** 表单验证规则  结束  */

			}
		},
		methods: {
			closeTable() {//点击关闭会员表格
				_czc.push(["_trackEvent", "新建金额调账-关闭会员表格", "点击"]);//统计流量
				this.ruleForm.orderID = '';//清空订单输入框表单
				this.flag = false;
				this.flags = false; 
				this.toogleSearchTable = false;
				this.searchoIdDataShowOrNo = false;
			},
			closeInfo() {
			},
			searchMemberClick: debounce(						// 搜索框点击图标事件
				
				function() {
						if(this.ruleForm.searchMember == '') {
						this.toogleSearchTable= false;
						this.flag = false;
					}else {
						this.toogleSearchTable= true;
						this.flag = true;
                        this.listQuery.page = 1;
						this.getList();
					}	
				},500
			),
			tableRowClick(row){								//会员搜索结果结果点击当前行
				_czc.push(["_trackEvent", "新建金额调账-会员搜索结果结果点击当前行", "点击"]);//统计流量
				this.memberInfo = row;
				this.ruleForm.original_credit = row.useful_credit;//原积分
				this.ruleForm.searchMember = row.card_code;

				this.toogleSearchTable= false; 
				this.cardsNmaeShowOrHide = true;
				this.flag = false;
			},						
			handleCurrentChange(val) {						//改变当前页码(订单)
				_czc.push(["_trackEvent", "新建金额调账-改变当前页码", "点击"]);//统计流量
				this.listQuery.page = val
				this.getList();
			},
			handleCurrentChange2(val) {						//改变当前页码(订单)
				_czc.push(["_trackEvent", "新建金额调账-改变当前页码", "点击"]);//统计流量
				this.listQuery2.page2 = val
				this.getIdList();
			},
			getList(){										//查询会员列表
				_czc.push(["_trackEvent", "新建金额调账-查询会员列表", "点击"]);//统计流量
				let data = "type="+this.select+
							"&con="+this.ruleForm.searchMember+
							"&page="+this.listQuery.page+
							"&rows="+this.listQuery.rows
				findCc(data).then( (res)=>{
					this.searchTableData = res.rows;
					this.searchTableData.forEach(item=> {
						for(var k in item) {
							if(item[k] === '' || item[k] === null) {
								item[k] = '--'
							}
						}
					})
					this.total = res.total;
				})

			},
			searchOrderClick: debounce(								//点击查询按钮调用查询订单请求
			
				function() {
					_czc.push(["_trackEvent", "新建金额调账-查询按钮调用查询订单请求", "点击"]);//统计流量
                    if(  this.ruleForm.searchMember === '' ){
                        this.searchoIdDataShowOrNo = false;
						this.flags = false;
                    }else if(this.ruleForm.orderID === '') {
						this.searchoIdDataShowOrNo = false;
						this.flags = false;
					}else {
						this.searchoIdDataShowOrNo = true;
						this.flags = true;
                        this.listQuery2.page2 = 1;
						this.getIdList();
					}	
				},500
			),
			tableIdRowClick(row){									//点击每一行
				_czc.push(["_trackEvent", "新建金额调账-点击每一行获取每一行的数据", "点击"]);//统计流量
				//获取当前行的编号
				this.ruleForm.orderID = row.id;						//订单编号
				this.ruleForm.order_source = row.order_source;		//订单来源
				this.searchoIdDataShowOrNo = false;
				this.flags = false;
			},
			getIdList(){											//查询订单
				_czc.push(["_trackEvent", "新建金额调账-查询订单", "点击"]);//统计流量
				let data = "con="+this.ruleForm.orderID+
							"&customer_id="+this.memberInfo.customer_id+
							"&page="+this.listQuery2.page2+
							"&rows="+this.listQuery2.rows2																					
				findOrder(data).then( (res) => {					//查询订单 发送请求
					this.searchoIdData = res.rows;
					this.total2 = res.total;
				})

			},
			handleIconClick(){  									// 点击 图标显示 tree
				_czc.push(["_trackEvent", "新建金额调账-点击图标显示tree", "点击"]);//统计流量
				this.isselecttree = !this.isselecttree;
			},
			boxChange:function(e){
	    		this.selectTreeDataChecked = this.$refs.classTree.getCheckedNodes(true);
				this.ruleForm.store_id = 0;
				let id = [];
	    		this.ruleForm.store_name = '';
	    		let names = [];
	    		this.selectTreeDataChecked.forEach(item=>{
					names.push(item.name);
					id.push(item.id);
	    		})
				this.ruleForm.store_name = names.join(",");
				this.ruleForm.store_id = id.join(',');
				this.isselecttree = !this.isselecttree;
			},
			filterNode(value, data) {
            	if (!value) return true;
            	return data.name.indexOf(value) !== -1;
            },
			loadReason(){											//查询调账原因列表
				_czc.push(["_trackEvent", "新建金额调账-查询调账原因列表", "点击"]);//统计流量
				findReason().then((response) => {
					this.filterReason = response;
					this.filterReason.shift()
				})
			},			
			loadOrgans(){											//查询调整机构列表		
				_czc.push(["_trackEvent", "新建金额调账-查询调整机构列表", "点击"]);//统计流量
				findOrgan().then((response) => {
					this.selectTreeData = response;
				})
			},
			handleSelect(item) {
			},
			submitForm(formName) {									//提交表单
				_czc.push(["_trackEvent", "新建金额调账-提交新建表单详情页数据给后台", "点击"]);//统计流量
				this.loading = true;
				  
			            let data = "type=money"+    // 调账类型       type=money
							"&card_id="+this.memberInfo.card_id+  // 会员卡ID   &card_id=969
							"&customer_id="+this.memberInfo.customer_id+   // 会员ID   &customer_id=203849
							"&original_main=" + this.memberInfo.main_balance+  // 原主账户余额     &original_main=undefined
							"&original_reward="+this.memberInfo.reward_balance+  // 原赠送账户余额   &original_reward=undefined
							"&trading_main="+this.ruleForm.money1+   // 调整主账户金额   &trading_main=1
							"&trading_reward="+this.ruleForm.money2+  // 调整赠送账户金额    &trading_reward=1
							"&main_balance="+this.ruleForm.amountMoney1+  // 调整后主账户金额,    &main_balance=1
							"&reward_balance="+this.ruleForm.amountMoney2+  // 调整后赠送账户金额,   &reward_balance=1
							"&reason="+this.ruleForm.reason+   // 调账原因    &reason=
							"&is_link_order="+this.ruleForm.YesOrNo+  // 是否关联订单   &is_link_order=
							"&order_source="+ this.ruleForm.order_source +  // 订单来源    &order_source=
							"&order_no="+ this.ruleForm.orderID +  // 关联订单编号   &order_no=
							"&store_id="+ this.node.id +  // 调账机构    &store_id=
							"&report_date="+ Assist.formatDate(this.ruleForm.report_date) +  // 报表日期   &report_date=2017-11-06
							"&remark="+this.ruleForm.remark;  //  备注    &remark=undefined

				this.$refs[formName].validate((valid) => {
					if(valid) {		
						
						insertAmountAdjust(data).then(response=>{
							if(response.success==true){
								this.loading = false;								
								this.$message({
									type: 'success',
									message: '提交成功！'
									
								});
								this.$router.push({
									path: '/tool/amountadjustment',
									hash: 'new'							
								});
								this.$refs[formName].resetFields();//清空表单
							}
							else{
								//请求失败
								this.loading = false;
								this.$message({
									type: 'error',
									message: response.msg
								});
							}
							
						}).catch(e=>{
							this.loading = false;
							this.$message({
								type: 'error',
								message: e
							});
						});
						
					} else {
						this.loading = false;
						return false;
					}
				});
			},
			resetForm() {//点击返回按钮
				_czc.push(["_trackEvent", "新建金额调账-点击返回按钮返回列表页", "点击"]);//统计流量
				this.$router.push({
									path: '/tool/amountadjustment',
									hash: 'new'							
				});
				
			},
			/** 搜索框 开始  */
			 // 搜索框实时搜索方法
		      // 修改 Placeholder的值 开始
		      changePlaceholder1(){
		      	this.tips="请输入会员"
		      },
		      changePlaceholder2(){
		      	this.tips="请输入会员卡"
			  },
			getStoresIds(value){
				//获取门店的store_id 的数组
				this.node = value;
				this.ruleForm.store_id = value.id + '';
			}
		},
		
		created(){
			this.changePlaceholder2()
			this.changePlaceholder1()
		},		
		mounted(){
			this.changePlaceholder2()
			this.changePlaceholder1()
			//调账原因
			this.loadReason();
			//发售机构
			this.loadOrgans();
		}
	};
</script>

<style>
.accountInfo .accountInfos {
	width:540px; 
	background-color: #ccc;
	padding: 10px;
	position: relative;
	top: 0;
	left: -20px;
	}

.el-form-item__error {
    
    padding: 4px 0 0 30px;
    width: 300px;
	
    
}
.jigoutrees .select-tree-zr {
	margin-left: 80px;
	z-index: 101!important;
}
.jigoutrees .select-input .select-input-zr{
	width: 320px;
}
.jigoutrees .select-input .select-input-zr .el-input__inner{
	width: 320px;
}
/***机构树***/
	.search_zr .main .el-form{
		margin-top: 0px; 
		
	}
	.search_zr .main .select-input-zr{
		width:230px;
	}
	.search_zr .main .select-input-zr .el-input__inner{
		width:230px;
	}
	.select-tree-zr{
		margin-top:10px;
		margin-left:10px;
		width:230px;
		background-color: #F5FBFE;
		height:auto;
		position: absolute;
		top: 30px;
		z-index: 1002;
	}
	.select-tree-zr .el-input{
		margin-top:10px;
		margin-left:10px;
		margin-right:10px;
		width:210px;
	}
	.select-tree-zr .el-tree{
		overflow-y: auto;
		height:200px;
		margin-bottom: 40px;
	}
	.select-tree-zr .el-tree .el-tree-node__content{
		width:230px;
	}
	.select-tree-zr .el-tree .el-tree-node__content .el-checkbox{
		float:right;
	}
</style>