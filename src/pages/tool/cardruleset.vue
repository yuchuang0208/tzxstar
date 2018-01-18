<template>
	<div class="context">
		<div class="divTwo_aqsz">
			<el-tabs v-model="activeName">
				<el-tab-pane label="支付方式积分设置" name="first" class="zffs">
					<div class="explain">
						<p>可在当前页设置消费使用支付方式时，是否可获得积分；</p>
					</div>
					<el-table v-loading="loading" element-loading-text="给我一点时间" :data="tableData" max-height='500px' style="width:100%" @filter-change="filterChange">
							<el-table-column prop="id" label="编号" min-width="100"></el-table-column>
							<el-table-column prop="payment_name1" label="支付方式名称" min-width="100"></el-table-column>
							<el-table-column prop="if_jifen" label="是否积分" min-width="100"></el-table-column>
							<el-table-column prop="status" :formatter="isNotNullFormat" column-key="status" :filters="filterStatus" label="状态" min-width="100">
								<template scope="scope">
									<tzx-tag :color="scope.row.status | statusFilter">{{scope.row.status | valueFilter}}</tzx-tag>
								</template>
							</el-table-column>
							<el-table-column prop="last_operator" label="最后修改人" min-width="80"></el-table-column>
							<el-table-column prop="last_updatetime" label="最后修改时间" min-width="100"></el-table-column>
							<el-table-column label="编辑" min-width="100">
								<template scope="scope">
									<el-button @click="btn_jfzffssz(scope.$index, tableData)" type="primary" size="small">积分设置</el-button>
								</template>
    						</el-table-column>
					</el-table>
					<el-dialog title="支付方式积分设置" :visible.sync="dialogVisible_zffsjfsz" width="50%" :before-close="handleClose" center="true" class="dialog">
						<p>会员使用【<span>{{payName}}</span>】消费时，是否获得积分：</p>
						<el-radio v-model="radio_jfsz" label="1">是</el-radio>
  						<el-radio v-model="radio_jfsz" label="0">否</el-radio>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible_zffsjfsz = false">取 消</el-button>
							<el-button type="primary" @click="btn_integralSetting(id)">保 存</el-button>
						</span>
					</el-dialog>
					<div class="pagination-container">
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="currentPage"
								:page-sizes="[10, 20, 30, 40]"
								:page-size="pageSize"
								layout="total, sizes, prev, pager, next, jumper"
								:total="totalCount">
    						</el-pagination>
						</div>
				</el-tab-pane>
				<el-tab-pane label="积分账单规则" name="second" class="jfgz">
					<div class="explain">
						<p>当会员订单已经使用优惠支付（如：储蓄支付、积分抵现、优惠券付款）时，可设置订单剩余金额是否可获得积分</p>
						<span>如设置订单优惠券付款剩余金额不可积分：若会员订单金额100元，优惠券付款20元，剩余80元不论用何种支付方式，此订单都不会增加积分给当前会员。</span>
					</div>
					<el-table v-loading="loading" element-loading-text="给我一点时间" :data="tableData" max-height='500px' style="width:100%" @filter-change="filterChange">
							<el-table-column prop="id" label="编号" min-width="100"></el-table-column>
							<el-table-column prop="payment_name1" label="支付方式名称" min-width="100"></el-table-column>
							<el-table-column prop="if_left_money_credit" label="订单剩余金额是否积分" min-width="100"></el-table-column>
							<el-table-column prop="status" :formatter="isNotNullFormat" column-key="status" :filters="filterStatus" label="状态" min-width="100">
								<template scope="scope">
									<tzx-tag :color="scope.row.status | statusFilter">{{scope.row.status | valueFilter}}</tzx-tag>
								</template>
							</el-table-column>
							<el-table-column prop="last_operator" label="最后修改人" min-width="80"></el-table-column>
							<el-table-column prop="last_updatetime" label="最后修改时间" min-width="100"></el-table-column>
							<el-table-column label="编辑" min-width="100">
								<template scope="scope">
									<el-button @click="btn_jfzdsz(scope.$index, tableData)" type="primary" size="small">积分账单设置</el-button>
							 </template> 
    						</el-table-column>
					</el-table>
					<el-dialog title="积分账单设置" :visible.sync="dialogVisible_jfzdsz" width="50%" :before-close="handleClose" center="true" class="dialog">
						<p>会员使用【<span>{{payName}}</span>】消费时，订单剩余金额是否获得积分：</p>
						<el-radio v-model="radio_jfzdsz" label="1">是</el-radio>
  						<el-radio v-model="radio_jfzdsz" label="0">否</el-radio>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible_jfzdsz = false">取 消</el-button>
							<el-button type="primary" @click="btn_integralBillSetting(id)">保 存</el-button>
						</span>
					</el-dialog>
					<div class="pagination-container">
						<el-pagination
      						@size-change="handleSizeChange1"
     						@current-change="handleCurrentChange1"
      						:current-page="currentPage1"
      						:page-sizes="[10, 20, 30, 40]"
      						:page-size="pageSize"
      						layout="total, sizes, prev, pager, next, jumper"
      						:total="totalCount">
    					</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import { TzxTag,TzxOption} from '@/components/tag'
	import { getCardRuleList,updateIfJifen,updateIfLeftMoneyCredit } from '@/api/activity'
	import axios from "axios";
	export default {
		components: {
			TzxTag
		},
		data() {
			return {
				id:'',
				activeName: 'first',
				dialogVisible_zffsjfsz: false,
				dialogVisible_jfzdsz: false,
				radio_jfsz: '',
				radio_jfzdsz: '',
				currentPage: 1,	//当前页码
				pageSize: 20,     //每页默认数据量
				totalCount: 100,  		//默认总数据量
				currentPage1: 1,	//当前页码
				status: '',
				payName: '',
				filterStatus: [
					{//审核状态过滤
						text: '无效',
						value: '0'
					}, {
						text: '有效',
						value: '1'
					},
					{
						text: '全部',
						value: ''
					}
				],
				tableData: [
					{
						id:1,
						payment_name1: '微信支付',
						if_jifen: '是',						//是否可积分1是0否
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: 1,
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:2,
						payment_name1: '支付宝支付',
						if_jifen: '否',						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: 0,
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:3,
						payment_name1: '京东支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 0,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:4,
						payment_name1: '微信支付',
						if_jifen: 0,						//是否可积分
						if_left_money_credit: 0,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:5,
						payment_name1: '微信支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:6,
						payment_name1: '微信支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:1,
						payment_name1: '微信支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:1,
						payment_name1: '微信支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:1,
						payment_name1: '微信支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:1,
						payment_name1: '微信支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:1,
						payment_name1: '微信支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
					{
						id:1,
						payment_name1: '微信支付',
						if_jifen: 1,						//是否可积分
						if_left_money_credit: 1,        //订单剩余金额是否积分
						status: '有效',
						last_operator: '张一',
						last_updatetime: '2000-12-12 12:12:12',
					},
				],
				loading: false,
			}

		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					'0': '#FFBF00',
					'1': '#4ECF88',
					// '2': '#FF9001'
				}
				return statusMap[status]
			},
			valueFilter(value) {
				const statusMap = {
					'无效': '无效',
					'有效': '有效',
					'': '全部'
				}
				return statusMap[value]
			},
			typeFilter(type) {
				return calendarTypeKeyValue[type]
			}
		},
		methods: {
			loadData(currentPage,pageSize) {					//页面加载
				this.loading = true;
				let data = 'page='+ currentPage + '&rows=' + pageSize + '&status='+ this.status;
				getCardRuleList(data).then(response => {
						for(var i = 0;i<response.rows.length;i++) {
							if(response.rows[i].if_jifen == 1) {
								response.rows[i].if_jifen = '是';
							}else {
								response.rows[i].if_jifen = '否';
							}
							if(response.rows[i].if_left_money_credit == 1) {
								response.rows[i].if_left_money_credit = '是';
							}else {
								response.rows[i].if_left_money_credit = '否';
							}
							if(response.rows[i].status == 1) {
								response.rows[i].status = '有效';
							}else {
								response.rows[i].status = '无效';
							}
						}
						this.tableData = response.rows;
						this.totalCount = response.total;						
						this.loading = false;
					})
			},
			isNotNullFormat(row, column) {
				let value = row[column.property];
				if(value == "" || value == null || value == undefined) {
					return '--'
				}
				return value;
			},
			filterChange(filters) {  							/* 筛选条件发生变化触发*/				
				let key = Object.keys(filters)[0];
				let value = filters[key];			
				let types = value.join(",");
				if(key == 'status'){      //判断是状态选择
					this.status = types;
				}
				this.loadData(this.currentPage,this.pageSize);
			},


			handleSizeChange(val) {						//1每页显示数据变更
        		this.pageSize = val;
                this.loadData(this.currentPage, this.pageSize);
      		},
      		handleCurrentChange(val) {					//1页码变更
        		this.currentPage = val;
                this.loadData(this.currentPage, this.pageSize);
			},
			btn_jfzffssz(index){                                //1弹框
				this.dialogVisible_zffsjfsz = true;
				//获取当前对应的id
				this.id = this.tableData[index].id;
				//获取当前对应的支付方式名称
				this.payName = this.tableData[index].payment_name1;
				//获取当前id对应的value值
				this.radio_jfsz = this.tableData[index].if_jifen;

			},
			btn_integralSetting(id) {							//1积分设置保存按钮点击事件
				let data = 'id='+id+'&if_jifen='+parseInt(this.radio_jfsz);
				//发送请求
				updateIfJifen(data)
				.then(response=>{
					this.loadData(this.currentPage,this.pageSize);
				})
				.catch(function (err) { 
				})
				//关闭弹窗
				this.dialogVisible_zffsjfsz = false;
			},


			handleSizeChange1(val) {						//2每页显示数据变更
        		this.pageSize = val;
                this.loadData(this.currentPage1, this.pageSize);
      		},
      		handleCurrentChange1(val) {					//2页码变更
        		this.currentPage1 = val;
				this.loadData(this.currentPage1, this.pageSize);
			},
			btn_jfzdsz(index){									//2弹框
				this.dialogVisible_jfzdsz = true;
				//获取当前对应的id
				this.id = this.tableData[index].id;
				//获取当前对应的支付方式名称
				this.payName = this.tableData[index].payment_name1;
				//获取当前id对应的value值
				this.radio_jfzdsz = this.tableData[index].if_left_money_credit;
			},
			btn_integralBillSetting(id) {						//2积分账单设置保存按钮点击事件
				let data = 'id='+id+'&if_left_money_credit='+parseInt(this.radio_jfzdsz);
				//此处应有发送ajax请求，更新数据-----待完成
				updateIfLeftMoneyCredit(data)
				.then(response=>{
					this.loadData(this.currentPage1,this.pageSize);
				})
				.catch(function (err) { 
				})
				this.dialogVisible_jfzdsz = false;				//关闭弹窗
				
			},


			handleClose(done) {								//二级关闭弹窗
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
			 }
			 
		},
		created() {
			this.loadData(this.currentPage,this.pageSize); 
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.divTwo_aqsz {
		height: auto;
		min-height: 800px;
		background: #FFFFFF;
		width: 100%;
		.el-tabs__item {
			font-size: 16px !important;
			margin-bottom: 8px!important;
			padding: 0px 20px!important;
			margin-left: 0!important;
			color: #34495E!important;
		}
		.el-tabs__item.is-active {
			color: #0C9AFF!important;
		}
		.el-tabs__active-bar {
			background-color: #0C9AFF !important;
		}
		.el-tabs__header {
			background: #FEFEFE;
		}
		.zffs {
			margin:0 17px;
			.explain {
				width: 100%;
				height: 40px;
				p {
					margin-top: 8px;
					color: #A3A3A3;
				}
			}
		}
		.jfgz {
			margin:0 17px;
			.explain {
				width: 100%;
				height: 40px;
				p {
					margin-top: 8px;
					color: #A3A3A3;
				}
				span {
					font-weight: 700;
				}
			}
		}
		
		.dialog {
			text-align: center;
			width: 1000px;
			margin: 0 auto;
			p {
				text-align: center;
				margin-bottom: 10px;
				margin-top: 5px;
			}
		}
	}
</style>