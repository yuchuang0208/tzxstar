<template>
	<div class='appactivitylist'>
		<div class='activityquery' v-for='(item,index) in datallist' :key='index'>
			<div class='activitytitle'>
				<icon-svg icon-class='title'></icon-svg>
				<span class='title'>{{item.title}}</span>
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
	import { activity1} from '@/assets/activity'
	export default {            
		data() { 
			return {
				datallist: [{
						title: '组件demo',
						text: '',
						listdata: [
						{
							path: '/member/treeinput',
							title: '下拉框 门店多选',
							img: activity1,
							isnew:true,
							descript: '张蕊'
						},
						{
							path: '/member/treeinputnode',
							title: '下拉框  节点单选',
							img: activity1,
							isnew:true,
							descript: '张蕊'
						},
						{
							path: '/member/storedemo',
							title: '门店',
							img: activity1,
							isnew:true,
							descript: '张蕊'
						},
						{
							path: '/member/groupstoredemo',
							title: '分组门店',
							img: activity1,
							isnew:true,
							descript: '张蕊'
						},
						{
							path: '/member/dragtabledemo',
							title: 'table拖拽',
							img: activity1,
							isnew:true,
							descript: '张蕊'
						},
						]
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