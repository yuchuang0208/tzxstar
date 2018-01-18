<template>
	<div class='applistquery'>
		<div class='listquery' :key='index' v-for='(listQuery,index) in dataQueryList'>
			<div class='listtitle'>
				<span>{{listQuery.title}}</span>
			</div>
			<div class='datalist'>
				<ul>
					<li :id="query.id+'-li-'+i" @click='openDataQuery(query.path)' @mouseover="removeBorder(query.id,i)" @mouseout="addBorder(query.id,i)" class='datalist-li' :key='i' v-for='(query,i) in listQuery.querylist'>
						<div class='querylist-header'>
							<img :src="query.src">
							<div  class='datalist-header-span'>
								<span>{{query.name}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!-- <div class='applistbottom' v-show='index!=2'>-->
			</div>
		</div>
	</div>
</template>
<script>
	import { symbolsh, symbolsg, symbolst, symbolsu, symbolsf, symbolsp, symbolsa, symbolss, symbolsc, symbolsk, symbolsx, symbolsq, symbolso, symbolsd, symbolsw, symbolsn, symbolsv, symbolse ,symtaodan } from '@/assets/report'
	export default {
		data() {
			return {
				dataQueryList: [{
						title: '会员综合分析',
						name: 'dataQuerya',
						querylist: [{
								id: 'datalista',
								src: symbolsh,
								path: '/dataAnalysis/membergrowthtrendanalysis',
								name: '会员增长趋势分析'
							},
							{
								id: 'datalista',
								src: symbolsg,
								path: '/dataAnalysis/memberexclusivespecialanalysis',
								name: '会员属性分析'
							},
							{
								id: 'datalista',
								src: symbolst,
								path: '/dataAnalysis/consumptiontrendanalysis',
								name: '会员消费趋势分析'
							},
							{
								id: 'datalista',
								src: symbolsu,
								path: '/dataAnalysis/consumptionhabitanalysis',
								name: '会员消费习惯分析'
							},
							{
								id: 'datalista',
								src: symbolsf,
								path: '/dataAnalysis/membermodelanalysis',
								name: '会员模型分析'
							},
						]
					},
					{
						title: '会员交易分析',
						name: 'dataQueryb',
						querylist: [{
								id: 'datalistb',
								src: symbolsp,
								path: '/dataAnalysis/membershipcardtrendanalysis',
								name: '会员售卡趋势分析'
							},
							{
								id: 'datalistb',
								src: symbolsa,
								path: '/dataAnalysis/memberoperationanalysisreport',
								name: '会员操作分析报告'
							},
							{
								id: 'datalistb',
								src: symbolss,
								path: '/dataAnalysis/memberconsumptionnumbermonth',
								name: '会员消费次数分析'
							},
							{
								id: 'datalistb',
								src: symbolsc,
								path: '/dataAnalysis/memberoperatingroomcontrast',
								name: '会员操作店间对比'
							},
							{
								id: 'datalistb',
								src: symbolsk,
								path: '/dataAnalysis/memberconsumption',
								name: '会员交易分析报告'
							},
						]
					},
					{
						title: '会员综合分析',
						name: 'dataQueryc',
						querylist: [{
								id: 'datalistc',
								src: symbolsx,
								path: '/dataAnalysis/marketactivitiesreport',
								name: '营销活动综合报告'
							},
							{
								id: 'datalistc',
								src: symbolsq,
								path: '/dataAnalysis/membershipgiftactivityreport',
								name: '入会送礼活动报告'
							},
							{
								id: 'datalistc',
								src: symbolso,
								path: '/dataAnalysis/birthdaymarketingcampaignreport',
								name: '生日营销活动报告'
							},
							{
								id: 'datalistc',
								src: symbolsd,
								path: '/dataAnalysis/wakeupthememberactivityreport',
								name: '唤醒会员报告'
							},
							{
								id: 'datalistc',
								src: symbolsw,
								path: '/dataAnalysis/prepaidmarketingactivityreport',
								name: '充值营销活动报告'
							},
							{
								id: 'datalistc',
								src: symbolse,
								path: '/dataAnalysis/buymembershipreport',
								name: '购买会籍活动报告'
							},
							{
								id: 'datalistc',
								src: symbolsv,
								path: '/dataAnalysis/theconsumptioncouponactivityreport',
								name: '消费赠券活动报告'
							},
							{
								id: 'datalistc',
								src: symbolsn,
								path: '/dataAnalysis/mallvolumemarketingactivitiesreport',
								name: '商城券营销报告'
							},
							{
								id: 'datalistc',
								src: symtaodan,
								path: '/dataAnalysis/dataodanreport',
								name: '大逃单游戏报告'
							},
						]
					}
				]
			}
		},
		methods: {
			openDataQuery(path) {
				this.$router.push(path);
			},
			removeBorder(id, index) {
				if(index != 0) {
					let i = index - 1
					document.getElementById(id + "-li-" + i).getElementsByTagName('div').item(0).style.borderRightWidth = 0;
				}
				if(index != 4) {
					document.getElementById(id + "-li-" + index).getElementsByTagName('div').item(0).style.borderRightWidth = 0;
				}

			},
			addBorder(id, index) {
				if(index != 0) {
					let i = index - 1
					document.getElementById(id + "-li-" + i).getElementsByTagName('div').item(0).style.borderRightWidth = '1px';
				}
				if(index != 4) {
					document.getElementById(id + "-li-" + index).getElementsByTagName('div').item(0).style.borderRightWidth = '1px';
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	
	
	.datalist>ul>.datalist-li:nth-child(5)>.querylist-header:nth-child(1) {
		border-right: 0px solid red !important;
	}
	.app-main{
    	min-height: 100%;
    	margin-bottom: 60px;
    	margin-top: 10px;
    	margin-left: 15px;
	}
	.applistquery {
		display: table;
		width: 100%;
		height: auto;
		.listquery {
			height: auto;
			width: 100%;
			background: #FEFEFE;
			margin-bottom: 20px;
			border: 1px solid #EAF1F6;
			.listtitle {
				background: #FFFFFF;
				box-shadow: 0 0 10px 0 rgba(98, 107, 181, 0.06);
				position: relative;
				z-index: 1;
				height: 46px;
				line-height: 46px;
				span {
					font-size: 14px;
					color: #394D62;
					margin-left: 20px;
				}
			}
			.datalist {
				min-height: 132px;
				overflow:hidden;
				.datalist-li {
					height: 132px;
					width: 20%;
					float: left;
					list-style: none;
					text-align: center;
					background: #FEFEFE;
					border: 1px solid #FEFEFE;
					&:hover {
						color:#0C9AFF;
						position: relative;
						z-index: 1;
						background: #FEFEFE;
						border: 1px solid rgba(12, 154, 255, 0.20);
						box-shadow: 0 2px 8px 0 rgba(137, 147, 227, 0.20);
						cursor: pointer;
						text-decoration: underline;
						.datalist-header-span {
							span{
								color:#0C9AFF;
							}
						}
					}
					.querylist-header {
						margin-top: 26px;
						border-right: 1px solid #EAF1F6;
						background: #FEFEFE;
						text-align: center;
						img {
							width: 48px;
							height: 48px;
						}
						.datalist-header-span {
							height: 24px;
							line-height: 24px;
							span {
								font-size: 14px;
								
								font-weight: normal;
							}
						}
					}
				}
			}
			.applistbottom {
				height: 16px;
				background: #f4f9fc;
			}
		}
		.listquery:nth-child(3){
			.datalist-li:nth-child(1),.datalist-li:nth-child(2),.datalist-li:nth-child(3),.datalist-li:nth-child(4),.datalist-li:nth-child(5){
				border-bottom: 1px solid #EAF1F6;
			}
		}
	}
</style>