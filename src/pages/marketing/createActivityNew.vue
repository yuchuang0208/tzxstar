<template>
	<div class='appactivitylist'>
		<div class='activityquery' v-for='(item,index) in datallist' :key='index'>
			<div class='activitytitle'>
				<icon-svg icon-class='title'></icon-svg>

				<span class='title'>{{item.title}}</span>
				<span class='titledescribe'>{{item.text}}</span>
			</div>
			<div class='activitylist'>
					<ul>
						<li class='activitylist-li' v-for="(activity, i) in item.listdata" :key="i" @click="createActivity(activity)">
							<el-card :body-style="{ padding: '0px' }">
								<img class='newright' src='../../assets/activity/new.png' v-if='activity.isnew'>
								<img :src="activity.img"  class="image">
								<div class='activityname'>
									<span>{{activity.title}}</span>
									<div class="bottomdescript">
										{{activity.descript}}
									</div>
									<div class="bottombutton">
										<icon-svg icon-class='addb'></icon-svg> 立即创建
									</div>
								</div>
							</el-card>
						</li>
					</ul>
				
			</div>
		</div>

	</div>
</template>
<script>
	import { dataodan,activity1, activity2, activity3, activity4, activity5, activity6, activity7, activity8, activity9, activity10, activity11, activity12,activity13,activity14,activity15,activity16,activity17,activity18,activity19,activity20, birthdaymarketing, consumptioncoupons,upgradegift} from '@/assets/activity'
	export default {            
		data() { 
			return {
				datallist: [{
						title: '拉新活动',
						text: '吸引更多顾客成为会员',
						listdata: [
						{
							path: '/marketing/game',
							title: '游戏设置',
							img: dataodan,
							isnew:true,
							descript: '大逃单-后台参数配置'
						},{
						
							/*path: '/marketing/membershipmarketing',*/
							path: '/marketing/meetinggift',
							title: '入会赠礼',
							img: activity6,
							isnew:true,
							descript: '吸引顾客关注微信公众号成为粉丝,便于发送更多营销信息'
						}, {
							path: '/marketing/buymembership',
							title: '购买会籍',
							img: activity3,
							isnew:false,
							descript: '限时会籍购买,促进淡季时会员拉新'

						}, {
							path: '/marketing/markactivity',
							title: '支付即会员',
							img: activity20,
							isnew:true,
							descript: '给新入会的顾客赠送优惠券，促进二次消费提升忠诚度打造中关注赠礼'
						}, {
							path: '/marketing/guanzhuzengli',
							title: '关注赠礼',
							img: activity14,
							isnew:true,
							descript: '吸引顾客关注公众号成为粉丝会员'
						}]
					}, {
						title: '激励营销',
						text: '刺激会员消费,提升营业额',
						listdata: [{
							path: '/marketing/consumptioncouponsNew',
							title: '消费赠券',
							img: consumptioncoupons,
							isnew:true,
							descript: '消费到指定到金额赠券'
						}, {
							path: '/marketing/fillingandmarketing',
							title: '充值赠礼',
							img: activity1,
							isnew:false,
							descript: '充值指定金额赠送金额、优惠券获积分等,提升消费频次'
						}]
					}, {
						title: '会员关怀',
						text: '刺激会员消费,提升营业额',
						listdata: [{
							path: '/marketing/birthdaymarketingNew',
							title: '生日营销',
							img: birthdaymarketing,
							isnew:true,
							descript: '会员生日送礼,增加忠诚度,促进二次消费'
						}, {
							path: '/marketing/muchmultiplecreditmanagement',
							title: '多倍积分',
							img: activity2,
							isnew:false,
							descript: '会员通过积分兑换优惠券、实物礼品,拉动二次消费'
						}, {
							path: '/marketing/wakemarketing',
							title: '唤醒赠券',
							img: activity4,
							isnew:true,
							descript: '将活跃度低的会员通过短信或微信等消息推送方式进行唤醒'
						}, {
							path: '/marketing/zengsongjine',
							title: '手动赠送金额',
							img: activity9,
							isnew:true,
							descript: '轻度支持霸王餐活动,并可对客户投诉进行快速补偿处理'
						},{
							path: '/marketing/upgradegift',
							title: '升级赠礼',
							img: upgradegift,
							isnew:true,
							descript: '会员升级到指定等级后，获得相应奖励'
						} ]
					},
					{
						title: '微信营销',
						text: '场景化营销,充分利用顾客碎片时间展开营销活动',
						listdata: [{
							path: '/marketing/completedata',
							title: '资料补全赠礼',
							img: activity12,
							isnew:false,
							descript: '场景化营销,充分利用顾客碎片时间展开营销活动'
						}, {
							path: '/marketing/mallcouponsmarketing',
							title: '商城券营销',
							img: activity7,
							isnew:false,
							descript: '微信卡包活动'
						}, {
							path: '/marketing/signinmarketing',
							title: '签到营销',
							img: activity5,
							isnew:false,
							descript: '每日签到赠送积分优惠券'
						}, {
							path: '/marketing/consumptionConsumptionGift',
							title: '消费后评价赠礼',
							img: activity10,
							isnew:true,
							descript: '收集用户反馈,促进消费闭环'
						}]
					},
					{
						title: '大众营销',
						text: '顾客也是我们潜在会员',
						listdata: [{
							path: '/marketing/fullamountdecreasecash',
							title: '消费满减',
							img: activity16,
							isnew:false,
							descript: '顾客消费任意商品/指定商品/指定类别商品且满一定金额,自动享受减现金优惠'
						}, {
							path: '/marketing/fullamountdiscount',
							title: '消费满打折',
							img: activity15,
							isnew:false,
							descript: '顾客消费任意商品/指定商品/指定类别商品且满一定金额,自动享受打折优惠'
						}, {
							path: '/marketing/fullamountgivefood',
							title: '消费满赠菜',
							img: activity18,
							isnew:false,
							descript: '顾客消费任意商品/指定商品/指定类别商品且满一定金额,自动享受赠菜优惠'
						}, {
							path: '/marketing/fullamountadditional',
							title: '消费满加价购',
							img: activity17,
							isnew:false,
							descript: '顾客消费任意商品/指定商品/指定类别商品且满一定金额,加价赠菜优惠'
						},						 {
							path: '/marketing/secondhalfprice',
							title: '第二份半价',
							img: activity13,
							isnew:false,
							descript: '顾客消费任意商品/指定商品/指定类别商品且相同品相,第二份半价'
						}, {
							path: '/marketing/discountedunivalent',
							title: '折后统一价',
							img: activity19,
							isnew:false,
							descript: '顾客消费任意商品/指定商品/指定类别商品且满一定金额,享受统一价格'
						}]
					},
				]
			}
		},
		methods: {
			createActivity(activity) {
				window.scrollTo(0, 0);
				this.$router.push({
					path: activity.path,
				    hash:'new'    
				});
				//router 中存hash的目的在于   处理区别新创建还是编辑  去掉缓存ID
			}
		},
		created(){
			_czc.push(["_trackEvent", "营销活动-创建活动", "新增编辑"]);//埋点统计
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.customclass {
		width: 560px;
	}
	.newright{
		position: absolute;
		width:60px;
		height: 60px;
		top:11px;
		right:13px;
	}
	.dialog-footer {
		height: 60px;
		line-height: 60px;
		background: #F4F9FC;
		text-align: center;
		margin-left: -16px;
	}
	
	.appactivitylist {
		display: table;
		width: 100%;
		height: auto;
		background: #fff;
		.activityquery:nth-child(1) >.activitytitle:nth-child(1){
				border-top: 0px solid #EAF1F6;
		}
		.activityquery {
			padding: 0 15px 0 20px;	
			
			.activitytitle {
				height: 52px;
				line-height: 52px;
				border-top: 1px solid #EAF1F6;
				margin-right: 20px;
				
				.title {
					font-size: 16px;
					color: #34495E;
					letter-spacing: 0;
					line-height: 16px;
				}
				.titledescribe {
					font-size: 12px;
					color: #9AABB8;
					letter-spacing: 0;
					line-height: 12px;
				}
			}
			.activitylist {
				min-height:220px;
				height: auto !important;
				overflow: hidden;
					.activitylist-li {
						width: 25%;
						float: left;
						list-style: none;
						cursor:pointer;
						.el-card {
							position: relative;
							margin-right: 20px;
							margin-bottom: 10px;
							background: #FFFFFF;
							border: 1px solid #E3F0F6;
							box-shadow: 0 5px 10px 0 rgba(218, 234, 246, 0.20);
							border-radius: 3px;							
							&:hover {
								background: #FEFEFE;
								border: 1px solid rgba(12, 154, 255, 0.20);
								box-shadow: 0 2px 8px 0 rgba(137, 147, 227, 0.20);
								border-radius: 3px;
							}
							.image {
								padding: 14px 16px 10px 16px;
								height: 86px;
								width: 100%;
							}
							.activityname {
								span {
									margin-left: 16px;
									font-size: 16px;
									color: #34495E;
									letter-spacing: 0;
									line-height: 16px;
								}
								.bottomdescript {
									height: 36px;
									margin-top: 6px;
									padding: 0px 16px;
									font-size: 12px;
									color: #9AABB8;
									line-height: 18px;
								}
								.bottombutton {
									margin-top: 10px;
									text-align: center;
									border-top: 1px dashed #E3F0F6;
									height: 36px;
									line-height: 36px;
									font-size: 14px;
									color: #0C9AFF;
									&:hover {
										cursor: pointer;
										color: #108EE9;
									}
								}
							}
						}
					}
				
			}
		}
	}
</style>