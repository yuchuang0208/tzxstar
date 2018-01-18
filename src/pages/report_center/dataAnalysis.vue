<template>
	<div class='applist'>
		<div class='listtitle'>
			<span>数据查询</span>
		</div>
		<div class='datalist'>
			<ul>
				<el-row>
					<el-col :span="4" :key='index' v-for="(dataQuery,index) in dataQueryList">
						<li class='datalist-li'>
							<div class='datalist-header'>
								<img :src="dataQuery.src">
								<div class='datalist-header-span'>
									<span>{{dataQuery.text}}</span>
								</div>

							</div>
							<div class='report-list'>
								<ul>
									<li class='report-list-li' @click='openDataAnalysis(data.path)' v-for='data in dataQuery.queryList'>{{data.text}}</li>
								</ul>
							</div>
						</li>
					</el-col>
				</el-row>
			</ul>
		</div>

	</div>
</template>
<script>
	import { symbolsj, symbolsb, symbolsr, symbolsi, symbolsm, symbolsl,symwxtj} from '@/assets/report'
	export default {
		data() {
			return {
				dataQueryList: [{
						src: symbolsj,
						text: '交易类',
						queryList: [{
							path: '/dataQuery/memberoverallbusiness',
							text: '会员交易整体分析'
						}, {
							path: '/dataQuery/cardtransactionflowquery',
							text: '卡交易流水查询'
						}, {
							path: '/dataQuery/memberrechargeconsumption',
							text: '会员充值消费报表'
						}, {
							path: '/dataQuery/memberdaybusinessstatistics',
							text: '会员卡日统计报表'
						}]
					},
					{
						src: symbolsb,
						text: '储值类',
						queryList: [{
							path: '/dataQuery/amountofmonthlyprecipitation',
							text: '金额沉淀区间分析'
						}, {
							path: '/dataQuery/amountprecipitationoverallanalysis',
							text: '金额沉淀整体分析'
						}, {
							path: '/dataQuery/cardrechargewaterreport',
							text: '卡充值流水汇总表'
						}]
					},
					{
						src: symbolsr,
						text: '员工提成',
						queryList: [{
							path: '/dataQuery/commissionreport',
							text: '门店售卡提成列表'
						}, {
							path: '/dataQuery/agencysalecarddetailsummaryreport',
							text: '门店售卡明细报表'
						}, {
							path: '/dataQuery/salesstaffcardreport',
							text: '员工售卡提成报表'
						}]
					},
					{
						src: symbolsi,
						text: '积分类',
						queryList: [{
							path: '/dataQuery/integralmonthlyprecipitation',
							text: '积分沉淀分析'
						}, {
							path: '/dataQuery/integraltransactionqueryreport',
							text: '积分消费流水查询'
						}]
					},
					{
						src: symbolsm,
						text: '卡券类',
						queryList: [{
							path: '/dataQuery/couponusingsummaryquery',
							text: '优惠券发售使用汇总表'
						}, {
							path: '/dataQuery/couponssalesummaryquery',
							text: '优惠券发售使用流水表'
						}]
					},
					{
						src: symbolsl,
						text: '结算类',
						queryList: [{
							path: '/dataQuery/amountofmonthlysettlementmechanism',
							text: '机构金额结算'
						}]
					},
					{
						src: symwxtj,
						text: '微信数据',
						queryList: [{
							path: '/dataQuery/wxfans',
							text: '粉丝数据分析'
						},
						{
							path: '/dataQuery/wxmember',
							text: '会员数据分析'
						},
						{
							path: '/dataQuery/wxmenu',
							text: '菜单数据分析'
						},
						{
							path: '/dataQuery/wxuser',
							text: '用户数据分析'
						}
						]
					},
				]
			}
		},
	methods:{
		openDataAnalysis(path){
			this.$router.push(path);
		}
	}
	}
</script>

<style>
	.applist {
		height: auto;
	}
	
	.applist .listtitle {
		position: relative;
		z-index: 1;
		box-shadow: 0 0 10px 0 rgba(98, 107, 181, 0.06);
		height: 46px;
		line-height: 46px;
		margin-left: 0;
		margin-right: 0;
	}
	
	.listtitle span {
		font-size: 14px;
		color: #394D62;
		margin-left: 20px;
	}
	
	.datalist-li {
		height: 270px;
		list-style: none;
		text-align: center;
	}
	
	.el-row .el-col-4 {
		border-right: 1px solid #EAF1F6;
		border-bottom: 1px solid #EAF1F6;
	}
	.el-row .el-col-4:nth-child(6n+0){
		border-right: none;
	}
	.datalist-header {
		padding-top: 26px;
		padding-bottom: 26px;
		background: #FBFCFF;
		text-align: center;
	}
	
	.datalist-header img {
		width: 48px;
		height: 48px;
	}
	
	
	.datalist-header img:hover {
		cursor:default;
	}
	
	.datalist-header-span span {
		font-size: 16px;
		color: #394D62;
		font-weight: bold;
		line-height: 24px;
	}
	
	.report-list-li {
		list-style: none;
		font-size: 14px;
		color: #6C7D8E;
		line-height: 14px;
		padding: 8px 0px;
	}
	
	.report-list {
		margin-top: 12px;
	}
	
	.report-list-li:hover {
		color: #0C9AFF;
		cursor: pointer;
		text-decoration: underline;
	}
</style>