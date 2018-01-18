<template>
	<div class='appclass'>
		<div class="app-container calendar-list-container" v-loading="loading2">
			<div class="filter-container">
				<el-autocomplete v-model="activityName" :fetch-suggestions="querySearchAsync" placeholder="请输入活动名称" @select="handleSelect" icon='search' :on-icon-click='searchByActivityName' style='width:220px'></el-autocomplete>
				<el-button type='server' icon='plus' @click='createActivity' style='float:right'>创建活动</el-button>
			</div>
			<el-table v-loading="loading" empty-text='暂无任何数据' element-loading-text="给我一点时间" :data="tableData" style="width: 100%" @filter-change="filterChange" @sort-change="sortChange">
				<el-table-column :formatter="isNotNullFormat" header-align='left' align='left' prop="subject" label="活动名称" min-width="200"></el-table-column>
				<el-table-column header-align='center' align='center' column-key='activity_type' :formatter="activityTypeFormat" prop="activity_type" label="活动类型" :filters="filterText" :filter-method="filterTag" filter-placement="bottom-end"  min-width="180"></el-table-column>

				<el-table-column header-align='left' label="活动周期" align='left' width='200'>
					<template scope="scope">
						{{scope.row.start_time!=null&&scope.row.start_time!=''?scope.row.start_time.substring(0,10)+'至':'-'}} {{scope.row.end_time!=null&&scope.row.end_time!=''?scope.row.end_time.substring(0,10):'-'}}
					</template>
				</el-table-column>
				<el-table-column header-align='center' column-key='running_state' :filters="filterRunningState" prop="running_state" label="状态" align='center' min-width='100'>
					<template scope="scope">
						<tzx-tag  cursor='default' :color="scope.row.running_state | statusFilter">{{scope.row.running_state | valueFilter}}</tzx-tag>
					</template>
				</el-table-column>
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="last_operator" label="最终编辑人" align='center' min-width='110'></el-table-column>
				<!--				<el-table-column :formatter="isNotNullFormat" header-align='right' prop="members_count" label="参与人数" align='right' min-width='120'></el-table-column>-->
				<el-table-column :formatter="isNotNullFormat" header-align='center' sortable prop="last_updatetime" align='center' label="编辑时间" min-width='200'></el-table-column>
				
				<el-table-column header-align='center' align='center' fixed='right' v-if='tableData.length>0' label="操作" width="180">

					<template scope="scope">
						<tzx-tag color="#0C9AFF" @clickThis='findDetail(scope.row)'>详情</tzx-tag>
						<tzx-tag color="#0C9AFF" @clickThis='update(scope.row)'>编辑</tzx-tag>
						<tzx-tag color="#0C9AFF" v-popover:popover>
							<el-popover style='z-index:100!important' ref="popover" placement="bottom" width="100" trigger="hover" @show='showPopover(scope.row.id,scope.row.activity_type)' @hide='hidePopover(scope.row.id)'>
								<ul class='tzx-ul'>
									<li v-if="flag" @click='copy(scope.row)' class="tzx-select" style='text-align: center;'><span class='tzx-text'>复制</span></li>
									<li @click='issueActivity(scope.row)' class="tzx-select" style='text-align: center;'><span class='tzx-text'>发布</span></li>
									<li @click='endActivity(scope.row)' class="tzx-select" style='text-align: center;'><span class='tzx-text'>终止</span></li>
									<li @click='deleteActivity(scope.row)' class="tzx-select" style='text-align: center;'><span class='tzx-text'>删除</span></li>
								</ul>

							</el-popover>更多<i :class="hoverId==scope.row.id&&showpop?'el-icon-dropup':'el-icon-dropdown'"></i>
						</tzx-tag>
				
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination-container" v-if='tableData.length>0&&total>firstPageSize'>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.pageSize" layout="prev, pager, next,total, jumper,sizes" :total="total">
				</el-pagination>
			</div>

			<el-dialog title="复制活动" :visible.sync="dialogCopy" size="copy" :before-close="handleCopyClose">
				<div class='descripe'><span class='warning el-icon-warning'></span>
					<span>说明:</span>
					<span>复制成功后请注意调整活动周期</span>
				</div>
				<div class='content'>
					<el-form :model="ruleForm" label-position='right' :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="复制的活动:">
							{{copyName}}
						</el-form-item>
						<el-form-item  label="新活动名称:" prop="subject">
							<el-input size='small' style='width:250px' v-model="ruleForm.subject" auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="fzhd_close">
					<el-button size='large' @click="cancelDialogCopy">取消</el-button>
					<el-button size='large' :loading='loading1' @click='copyActivity' type='primary'>确定</el-button>
				</div>
			</el-dialog>
		<el-dialog title="赠送金额详情" :visible.sync="dialogVisible" size="tiny">
				<div class='dialogbody'>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>活动名称:</span>
						</div>
						<div class='itemright'>
							<span>{{manualMoneyDetail.subject}}</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>活动周期:</span>
						</div>
						<div class='itemright'>
							<span>{{manualMoneyDetail.starttime}}至{{manualMoneyDetail.endtime}}</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>最高赠送金额:</span>
						</div>
						<div class='itemright'>
							<span>{{manualMoneyDetail.max_reward_money | currency}}</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>活动门店:</span>
						</div>
						<div class='itemright'>
							<div class='store' >{{manualMoneyDetail.stores}};</div>
						</div>
					</div>
				</div>
				<div class='dialogfooter'>
					<el-button @click="dialogVisible = false">关闭</el-button>
				</div>
			</el-dialog>	
			<el-dialog title="活动详情" :visible.sync="dialogVisibleEvalgift" size="tiny">
				<div class='dialogbody'>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>活动名称:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.subject}}</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>活动周期:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.start_time}}至{{evalgiftDetail.end_time}}</span>
						</div>
					</div>
					<div class='itemclass' v-if="evalgiftDetail.coupons != '' || evalgiftDetail.reward_credit > 0">
						<div class='itemleft'>
							<span>活动赠礼:</span>
						</div>
						<div class='itemright'>
							<div class='itemcontent' v-if="evalgiftDetail.coupons != '' && evalgiftDetail.coupons.length>0">
								<div class='itemrightleft'>赠优惠券:</div>
								<div class='itemrightright'>
									<div class='cardcoupon' :key='index' v-for='(coupon,index) in evalgiftDetail.coupons'>
										<span>赠送</span>
										<span>{{coupon.face_value}}</span>
										<span v-if="coupon.coupons_pro == 'coupons_deduct'">元代金券</span>
										<span v-if="coupon.coupons_pro == 'coupons_dish'">元菜品券</span>
										<em>{{coupon.reward_coupon}}</em>
										<span>张;</span>
									</div>
								</div>
							</div>
							<div class='itemcontent' v-if='evalgiftDetail.reward_credit>0'>
								<div class='itemrightleft'>赠积分:</div>
								<div class='itemrightright'>
									<div class='cardcoupon'>
										<span>每人赠送</span>
										<span>{{evalgiftDetail.reward_credit | thousand}}</span>
										<span>积分</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- 消费赠券开始 -->
					<div class='itemclass' v-if="evalgiftDetail.reward_money_source != null">
						<div class='itemleft'>
							<span>可赠金额来源:</span>
						</div>
						<div class='itemright'>
							<span v-if="evalgiftDetail.reward_money_source == 0">账单原始金额</span>
							<span v-if="evalgiftDetail.reward_money_source == 1">会员折后金额</span>
							<div>
								<span :key='index' v-for='(store,index) in evalgiftDetail.payments'>{{store.payment_name1}}，</span>
							</div>
						</div>
					</div>
					<div class='itemclass' v-if="evalgiftDetail.level != null">
						<div class='itemleft'>
							<span>会员等级:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.level}}</span>
						</div>
					</div>
					<!-- 活动规则 -->
					<div class='itemclass' v-if="evalgiftDetail.activityList != '' && evalgiftDetail.activity_type =='xfzq' ">
						<div class='itemleft'>
							<span>活动规则:</span>
						</div>
						<div class='itemright' :key='index' v-for='(store,index) in evalgiftDetail.activityList'>
							<div class='itemright' style="width:440px;">
								<span v-if="store.if_cycle_reward == '1'">单笔消费{{store.customer_limits}}元 循环送 送{{store.cycle_reward_num}}次</span>
								<span v-if="store.if_cycle_reward == '0'">单笔消费{{store.customer_limits}}元 送一次</span>
								<div class='itemclass'>
									<div class='itemleft'>赠优惠券:</div>
									<div class='itemright' style="width:320px">
										<div class='cardcoupon' :key='index' v-for='(coupon,index) in store.tl'>
											<span>赠送</span>
											<span>{{coupon.face_value}}</span>
											<span v-if="coupon.coupons_pro == 'coupons_deduct'">元代金券</span>
											<span v-if="coupon.coupons_pro == 'coupons_dish'">元菜品券</span>
											<em>{{coupon.reward_coupon}}</em>
											<span>张;</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 消费赠券结束 -->
					
					
				<!--	gift_way:[],//支持的赠送方式
    				gift_restrict:'',
    				restrict_hour:'', 
    				level_name:'',-->
					
					<div class='itemclass' v-if="evalgiftDetail.gift_way != '' && evalgiftDetail.activity_type =='upgradegift' ">
						<div class='itemleft'>
							<span>赠礼规则:</span>
						</div>
						<div class='itemright'>
							<div class='itemcontent' v-if='evalgiftDetail.gift_way != null && evalgiftDetail.coupons.length>0'>
								<div class='itemrightleft'>赠礼方式:</div>
								<div class='itemrightright'>
									<div class='cardcoupon' v-if="evalgiftDetail.gift_way=='1'" >自动升级赠礼</div>
									<div class='cardcoupon' v-if="evalgiftDetail.gift_way=='2'" >手动升级赠礼</div>
									<div class='cardcoupon' v-if="evalgiftDetail.gift_way=='3'" >自动升级赠礼;手动升级赠礼</div>	
								</div>
							</div>
							<div class='itemcontent' v-if='evalgiftDetail.gift_restrict != null'>
								<div class='itemrightleft'>赠礼限制:</div>
								<div class='itemrightright'>
									<div class='cardcoupon' v-if="evalgiftDetail.gift_restrict==0" >不限制，只要升级就赠礼</div>	
									<div class='cardcoupon' v-if="evalgiftDetail.gift_restrict==1" >限制，升级赠礼后的{{evalgiftDetail.restrict_hour}}小时后 如果再次达到指定会员等级才可再次赠礼（可防止会员升降级刷单）</div>	
								</div>
							</div>
						</div>
					</div>

					<div class='itemclass' v-if="evalgiftDetail.alert_mode != 0" >
						<div class='itemleft'>
							<span>提醒方式:</span>
						</div>
						
						<div class='itemright'>
							<div class='store' v-if="evalgiftDetail.alert_mode=='1'" >微信提醒</div>
							<div class='store' v-if="evalgiftDetail.alert_mode=='2'" >短信提醒</div>
							<div class='store' v-if="evalgiftDetail.alert_mode=='3'" >微信提醒;短信提醒</div>						
						</div>
					</div>
					<div class='itemclass' v-if="evalgiftDetail.aheadDays != 0">
						<div class='itemleft'>
							<span>提醒时间:</span>
						</div>
						<div class='itemright'>
							<div class='store'>距离会员生日前{{evalgiftDetail.aheadDays}}天的{{evalgiftDetail.aheadTime}}提醒</div>

						</div>
					</div>
					<div class='itemclass' v-if='evalgiftDetail.stroes != null && evalgiftDetail.stroes.length > 0'>
						<div class='itemleft'>
							<span>活动门店:</span>
						</div>
						<div class='itemright'>
							<div class='store' :key='index' v-for='(store,index) in evalgiftDetail.stroes'>{{store.org_full_name}};</div>
						</div>
					</div>
					<div class='itemclass' v-if='evalgiftDetail.groups != null && evalgiftDetail.groups.length > 0'>
						<div class='itemleft'>
							<span>参与群体:</span>
						</div>
						<div class='itemright'>
							<div class='store' :key='index' v-for='(group,index) in evalgiftDetail.groups'>{{group.group_name}};</div>
						</div>
						<div class='itemright'>
							<div class='store'>
								<span>预计参与人数</span>
								<span>{{evalgiftDetail.totalMembers | thousand}}</span>
								<span>人</span>
							</div>
						</div>
					</div>
					<div class='itemclass' v-if='evalgiftDetail.chanels != null && evalgiftDetail.chanels.length > 0'>
						<div class='itemleft'>
							<span>投放渠道:</span>
						</div>
						<div class='itemright'>
							<div class='store' :key='index' v-for='(chanel,index) in evalgiftDetail.chanels'>{{chanel.class_item}};</div>

						</div>
					</div>
				</div>
				<div class='dialogfooter'>
					<el-button @click='dialogVisibleEvalgift=false'>关闭</el-button>
				</div>
			</el-dialog>
			<!--游戏活动比较特殊 单独写个详情 -->
			<el-dialog title="游戏活动详情" :visible.sync="dialogVisibleGame" size="tiny">
				<div class='dialogbody'>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>游戏名称:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.subject}}</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>游戏描述:</span>
						</div>
						<div class='itemright'>
							<span>大逃单v1.0.0是基于微信端H5的营销游戏。通过扫描桌台码进行多人游戏，游戏产生一名买单玩家和N名逃单玩家。游戏加入神秘嘉宾送礼环节，增加游戏的趣味性。最终拉动商户会员数量，提升营业额，并通过分享方式进行商户宣传和品牌塑造推广。</span>
						</div>
					</div>
					
					<div class='itemclass'>
						<div class='itemleft'>
							<span>恭喜语:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.congratulations}}</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>广告语:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.advertising_language}}</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>分享标题:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.shareTitle}}</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>分享描述:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.shareContent}}</span>
						</div>
					</div>
					
					<div class='itemclass'>
						<div class='itemleft'>
							<span>游戏周期:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.start_time}}至{{evalgiftDetail.end_time}}</span>
						</div>
					</div>
					
					<div class='itemclass'>
						<div class='itemleft'>
							<span>游戏人数:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.min_number}}人至{{evalgiftDetail.max_number}}人</span>
						</div>
					</div>
					
					<div class='itemclass'>
						<div class='itemleft'>
							<span>游戏时长:</span>
						</div>
						<div class='itemright'>
							<span>{{evalgiftDetail.game_length}}秒</span>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>活动门店:</span>
						</div>
						<div class='itemright'>
							<div class='store' :key='index' v-for='(store,index) in evalgiftDetail.stroes'>{{store.org_full_name}};</div>
						</div>
					</div>
					
					<div class='itemclass'>
						<div class='itemleft'>
							<span>游戏时段:</span>
						</div>
						<div class='itemright'>
							<div class='store' >
								<div class="yxsd" :key='index' v-for='(item,index) in evalgiftDetail.intervallist'>
										<p style='color:#758896;float:left;' v-if="item.week == 2">周一:</p>
										<p style='color:#758896;float:left;' v-if="item.week == 3">周二:</p>
										<p style='color:#758896;float:left;' v-if="item.week == 4">周三:</p>
										<p style='color:#758896;float:left;' v-if="item.week == 5">周四:</p>
										<p style='color:#758896;float:left;' v-if="item.week == 6">周五:</p>
										<p style='color:#758896;float:left;' v-if="item.week == 7">周六:</p>
										<p style='color:#758896;float:left;' v-if="item.week == 1">周日:</p>
										<p style='float:left;' v-if="item.ifallday == 1">全天</p>
										<p style='float:left;' v-if="item.ifallday == 0">选时间段：</p>
										<p style="line-height:28px;;float:left;"><span v-for='(item2,index2) in item.timelist'>{{item2.begintime}}-{{item2.endtime}};</span></p>
							</div>
							</div>
						</div>
					</div>
					
					<div class='itemclass'>
						<div class='itemleft'>
							<span>投放渠道:</span>
						</div>
						<div class='itemright'>
							<div class='store' :key='index' v-for='(chanel,index) in evalgiftDetail.chanels'>{{chanel.class_item}}</div>
						</div>
					</div>
					
					<div class='itemclass'>
						<div class='itemleft'>
							<span>活动赠礼:</span>
						</div>
						<div class='itemright'>
							<div class='store' :key='index' v-for='(item,index) in evalgiftDetail.giftlist' style="clear:both;">
								<div style="margin-bottom:10px;">
									<p style="line-height:24px;">{{++index}}:<span style='color:#758896'>{{item.title}}</span></p>
									<p style="line-height:24px;"><span style='color:#758896'>游戏人数:</span>{{item.min_number}}人至{{item.max_number}}人</p>
									<p style="line-height:24px;" :key='index' v-for='(item2,index2) in item.playerlist'>
										   <span style='color:#758896'>{{item2.player_name}}:</span>{{item2.coupon_name}} <em v-if="item2.coupon_name != null">1张</em>
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- 消费赠券开始 -->
					<div class='itemclass' >
						<div class='itemleft wanjiachenghao'>
							<span>称号玩家:</span>
						</div>
						<div class='itemright'>
							<div class='store' :key='index' v-for='(item,index) in evalgiftDetail.messagelist' style="clear:both;">
								<div style="margin-bottom:10px;">
									<p style="line-height:24px;">{{++index}}:<span style='color:#758896'>{{item.info}}:</span>{{item.player_title}}</p>
									<p style="line-height:24px;"><span style='color:#758896'>留言:</span>{{item.player_message1}}</p>
									<p style="line-height:24px;">{{item.player_message2}}</p>
								</div>
							</div>
						</div>
					</div>
					<div class='itemclass'>
						<div class='itemleft'>
							<span>神秘嘉宾:</span>
						</div>
						<div class='itemright'>
							<div class='store' :key='index' v-for='(guest,index) in evalgiftDetail.guestlist'>
								<img width="80px" height="80px" :src="guest.pic_url" alt="" style="float: left;margin-bottom:10px;">
								<div style="float: left;line-height: 20px;height: 20px;">
									<p style="line-height: 26px;height: 26px;margin-left: 10px;"><span style='color:#758896'>称号昵称:</span>{{guest.nick_name}} </p>
									<p style="line-height: 26px;height: 26px;margin-left: 10px;"><span style='color:#758896'>安慰语:</span>{{guest.congratulations}}</p>
									<p style="line-height: 26px;height: 26px;margin-left: 10px;"><span style='color:#758896'>恭喜语：</span>{{guest.consolation}}</p>
								</div>
							</div>
						</div>
					</div>
					<!-- 活动规则 -->
					<!-- <div class='itemclass'>
						<div class='itemleft'>
							<span>游戏规则:</span>
						</div>
						<div class='itemright'>
							<div  class='store' v-html="evalgiftDetail.game_rules">{{evalgiftDetail.game_rules}}</div>
						</div>
					</div> -->
					<!-- 消费赠券结束 -->
				</div>
				<div class='dialogfooter'>
					<el-button @click='dialogVisibleGame=false'>关闭</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	/*import { fetchList,serachByActivityName } from '@/api/article'*/
	import { serachByActivityName, getAllActivity, getAllActivityType, endOrIssue, copyActivityById, findEvalgiftActivityDetail, findMarketActivityDetail,findManualmoneyActivityDetail,findConsumptionDetail,findMeetinggiftActivityDetail} from '@/api/activity'
	import { TzxTag, TzxOption } from '@/components/tag'
	import debounce  from 'lodash/debounce';
	export default {
		components: {
			TzxTag,
			TzxOption
		},
		data() {
			return {
				flag: true,
				firstPageSize:this.$store.state.user.screenPageSize,
				filterRunningState: [{
					text: '未发布',
					value: '0'
				}, {
					text: '进行中',
					value: '1'
				}, {
					text: '已终止',
					value: '2'
				}, {
					text: '已结束',
					value: '4'
				}],
				filterText: [],
				tableData: [],
				listQuery: {
					currentPage: 1,
					pageSize: this.$store.state.user.screenPageSize,
					subject: '',
					activity_type: '',
					running_state: '',
					valid_state:'',
					sort: 'last_updatetime',
					order: 'desc'
				},
				loading: true,
				loading1: false,
				loading2: false,
				total: 0,
				activityName: '',
				showpop: false,
			
				hoverId: '',
				dialogCopy: false,
				dialogVisible: false,
				dialogVisibleEvalgift: false,
				dialogVisibleGame:false,
				id: undefined,
				ruleForm: {
					subject: ''
				},
				rules: {
					subject: [{
						required: true,
						message: '  ',
						trigger: 'blur'
					}]
				},
				copyName: '',
				manualMoneyDetail: {
					subject: '',
					starttime: '',
					endtime: '',
					max_reward_money: 0,
					stores: ''
				},
				evalgiftDetail: {
					subject: '',
					start_time: '',
					level: '',
					end_time: '',
					reward_credit: 0, //积分
					reward_money_source: '',//金额来源
					payments: [],//金额来源方式
					activityList: [],
					stroes: [],
					chanels: [],
					groups: [],
					totalMembers: 0,
					coupons: [],
					alert_mode:0,//提醒方式
					aheadDays: 0,//距离多少天
    				aheadTime: '',//提醒距离时间
    				gift_way:[],//支持的赠送方式
    				gift_restrict:'',
    				restrict_hour:'', 
				},
				activityMessages: [{
						path: '/marketing/meetinggift',
						title: '入会赠礼',
						isnew: false,
						activity_type: 'register'
					}, {
						path: '/marketing/buymembership',
						title: '购买会籍',
						isnew: false,
						activity_type: 'gmhj'
					}, {
						path: '',
						title: '支付即会员',
						isnew: true,
						activity_type: ''
					}, {
						path: '/marketing/guanzhuzengli',
						title: '关注赠礼',
						isnew: true,
						activity_type: 'attengift'
					},
					{
						path: '/marketing/consumptioncouponsNew',
						title: '消费赠券',
						isnew: false,
						activity_type: 'xfzq'
					}, {
						path: '/marketing/fillingandmarketing',
						title: '充值赠礼',
						isnew: false,
						activity_type: 'chz'
					},
					{
						path: '/marketing/birthdaymarketingNew',
						title: '生日营销',
						isnew: false,
						activity_type: 'birthday'
					}, {
						path: '/marketing/muchmultiplecreditmanagement',
						title: '多倍积分',
						isnew: false,
						activity_type: 'dbjf'
					}, {
						path: '/marketing/wakemarketing',
						title: '会员唤醒',
						isnew: true,
						activity_type: 'awaken'
					}, {
						path: '/marketing/zengsongjine',
						title: '手动赠送金额',
						isnew: true,
						activity_type: 'manualmoney'
					},{
						path: '/marketing/completedata',
						title: '资料补全赠礼',
						isnew: false,
						activity_type: ''
					}, {
						path: '/marketing/marketingblacklist',
						title: '商城券营销',
						isnew: false,
						activity_type: 'scqyx'
					}, {
						path: '/marketing/signinmarketing',
						title: '签到营销',
						isnew: false,
						activity_type: ''
					}, {
						path: '/marketing/consumptionConsumptionGift',
						title: '消费后评价赠礼',
						isnew: true,
						activity_type: 'evalgift'
					}, {
						path: '/marketing/fullamountdecreasecash',
						title: '满额减现金',
						isnew: false,
						activity_type: 'mejxj'
					},
					{
						path: '/marketing/fullamountdecreasecash',
						title: '满减营销',
						isnew: false,
						activity_type: 'mj'
					},{
						path: '/marketing/fullamountdiscount',
						title: '消费满打折',
						isnew: false,
						activity_type: 'medz'

					}, {
						path: '/marketing/fullamountgivefood',
						title: '消费满赠菜',
						isnew: false,
						activity_type: 'mezc'
					}, {
						path: '/marketing/fullamountadditional',
						title: '消费满加价购',
						isnew: false,
						activity_type: 'mejjg'
					},
					{
						path: '/marketing/secondhalfprice',
						title: '第二份半价',
						isnew: false,
						activity_type: 'defbj'
					}, {
						path: '/marketing/discountedunivalent',
						title: '折后统一价',
						isnew: false,
						activity_type: 'zhtyj'
					},
					 {
						path: '/marketing/game',
						title: '大逃单',
						isnew: false,
						activity_type: 'wxdtd'
					},{
						path: '/marketing/upgradegift',
						title: '升级赠礼',
						isnew: true,
						activity_type: 'upgradegift'
					},
				]
			}
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					'0': '#FFBF00',
					'1': '#4ECF88',
					'4': '#34495E',
					'2': '#FF9001'
				}
				return statusMap[status]
			},
			valueFilter(value) {
				const statusMap = {
					'0': '未发布',
					'1': '进行中',
					'2': '已终止',
					'4': '已结束',
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
			reset(){
				this.evalgiftDetail.activity_type= '',
				
				this.evalgiftDetail.subject = '',
				this.evalgiftDetail.start_time = '',
				this.evalgiftDetail.end_time = '',
				this.evalgiftDetail.reward_credit = 0, //积分
				this.evalgiftDetail.stroes = [],
				this.evalgiftDetail.chanels = [],
				this.evalgiftDetail.groups = [],
				this.evalgiftDetail.totalMembers = 0,
				this.evalgiftDetail.coupons = [],
				this.evalgiftDetail.alert_mode = 0,//提醒方式
				this.evalgiftDetail.aheadDays = 0,//距离多少天
				this.evalgiftDetail.aheadTime = '',//提醒距离时间
				this.evalgiftDetail.reward_money_source = null,
				this.evalgiftDetail.payments = [],
				this.evalgiftDetail.level = null,
				this.evalgiftDetail.activityList = []
				
				this.evalgiftDetail.congratulations = '';//恭喜语
				this.evalgiftDetail.advertising_language = '';//广告语
				this.evalgiftDetail.shareTitle = '';//分享标题
				this.evalgiftDetail.shareContent = '';//分享描述

				this.evalgiftDetail.max_number = '';//最多人数
				this.evalgiftDetail.min_number = '';//最小人数
				this.evalgiftDetail.game_length = '';//游戏时长
				this.evalgiftDetail.game_rules = '';//游戏规则
				this.evalgiftDetail.guestlist = [];//神秘嘉宾
				this.evalgiftDetail.messagelist = [];//玩家称号
				this.evalgiftDetail.giftlist = [];//活动赠礼
				this.evalgiftDetail.intervallist = [];//活动赠礼
				
				this.evalgiftDetail.gift_way = [];//支持的赠送方式
				this.evalgiftDetail.gift_restrict=null,//限制赠礼0：不限制，1：限制
				this.evalgiftDetail.restrict_hour=null//限制时长
				
			},

			/* 取消dialogCopy*/
 	        cancelDialogCopy(){
 	        	this.dialogCopy = false;
 	        	this.ruleForm.subject = ''; 
 	        	
 	        },
			activityTypeFormat(row, column) {
				let activity_type = row[column.property];

				if(activity_type == '' || activity_type == null) {
					return '--'
				} else {
					let activity_type_col = this.filterText.filter(item => {

						return activity_type == item.value
					})
					if(activity_type_col.length > 0) {
						return activity_type_col[0].text;
					} else {
						return activity_type;
					}

				}
			},

			searchByActivityName() {
				this.listQuery.currentPage = 1;
				this.listQuery.subject = this.activityName;
				this.getList();
			},
			querySearchAsync: debounce(
				function(queryString, callback) {
					let message = 'subject=' + queryString;
					if(queryString != null||queryString !=''){
						serachByActivityName(message).then(response => {
							let titles = [];
							if(response.code == 0) {								
								callback(response.data)
							}
							else{
								callback([])
							}
						})
					}
					else{
						callback([])
					}
				},
				// 这是我们为判定用户停止输入等待的毫秒数
				500
			),
			handleSelect(item) {
				
				this.listQuery.currentPage = 1;
				this.listQuery.subject = item.value;
				this.getList();
			},

			handleSizeChange(val) {
				this.listQuery.pageSize = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.listQuery.currentPage = val
				this.getList()
			},
		
			getList() {
				_czc.push(["_trackEvent", "营销中心-活动管理-活动列表", "查看"]);//埋点统计
				this.loading = true;
	
				let data = 'currentPage=' + this.listQuery.currentPage +
					'&pageSize=' + this.listQuery.pageSize +
					'&subject=' + this.listQuery.subject +
					'&activity_type=' + this.listQuery.activity_type +
				
					
					'&sort=' + this.listQuery.order +
					'&column=' + this.listQuery.sort;
				if(this.listQuery.running_state=='4' ){
                     data += '&valid_state=2'  +'&running_state=2'
				}
				if(this.listQuery.running_state=='2' ){
                     data += '&valid_state=1'  +'&running_state=2'
				}
				if(this.listQuery.running_state!='2'&&this.listQuery.running_state!='4'){
					 data += '&running_state=' + this.listQuery.running_state ;
				}
				getAllActivity(data).then(response => {
                    response.data.map((item,index)=>{
                    	if(item.valid_state=='2'){
                    		item.running_state='4'
                    	}
                    });
					this.tableData = response.data
					this.total = response.count;
					this.loading = false;
				}).catch(e => {
					this.loading = false;

				})
			},
			filterTag(value, row) {

			},
			/* 筛选条件发生变化触发*/
			filterChange(filters) {

				let key = Object.keys(filters)[0];
				let value = filters[key];
				let types = value.join(",");
				this.listQuery.currentPage = 1;
				if(key == 'activity_type') {
					this.listQuery.activity_type = types;
				} else {
					this.listQuery.running_state = types;
				}
				this.getList();
			},
			/* 排序条件发生变化触发*/
			sortChange({
				column,
				prop,
				order
			}) {

				this.listQuery.sort = prop;
				this.listQuery.currentPage = 1;
				if(order == 'ascending') {
					this.listQuery.order = 'asc'
				}
				if(order == 'descending') {
					this.listQuery.order = 'desc'
				}
				this.getList();

			},
			findDetail(row) {
				_czc.push(["_trackEvent", "营销中心-活动管理-活动列表", "详情"]);//埋点统计
				//重置
				this.reset();
				if(row.activity_type == 'manualmoney') {
					this.loading2 = true;
					let data = "id=" + row.id +
						'&activity_type=' + row.activity_type;
					findMarketActivityDetail(data).then(response => {
						if(response.code == 0) {
							this.loading2 = false;
							this.manualMoneyDetail.activity_type=row.activity_type,
							this.manualMoneyDetail.subject = response.subject;
							this.manualMoneyDetail.starttime = response.start_time != null && response.start_time != '' ? response.start_time.substring(0, 10) : '';
							this.manualMoneyDetail.endtime = response.end_time != null && response.end_time != '' ? response.end_time.substring(0, 10) : '';
							this.manualMoneyDetail.max_reward_money = response.max_reward_money;
							if(response.stroes.length == 1 && response.stroes[0].store_id == 0) {
								this.manualMoneyDetail.stores = "全部门店"
							}
							else{
								let storeNames = [];
								response.stroes.map((item,index)=>{
									storeNames.push(item.org_full_name)
								})
								this.manualMoneyDetail.stores =storeNames.join(";");
							}
							this.dialogVisible = true;
						} else {
							this.loading2 = false;
							this.$message({
								type: 'error',
								message: response.msg
							});
						}
					}).catch(() => {
						this.loading2 = false;
						this.$message({
							type: 'error',
							message: '网络异常'
						});
					});
				}
				else if(this.activityMessages.filter(item=>item.activity_type==row.activity_type && item.isnew).length>0){
					this.loading2 = true;
					let data = "id=" + row.id +
						'&activity_type=' + row.activity_type;
					findEvalgiftActivityDetail(data).then(response => {

						if(response.code == 0 || response.code == '0') {
							this.loading2 = false;

							let totalMembers = 0;

							if(response.groups != null && response.groups != '' && response.groups.length != 0) {
								response.groups.map((group) => {
									totalMembers += group.members_count;
								});
							}
							this.evalgiftDetail.activity_type=row.activity_type,
							this.evalgiftDetail.subject = response.subject;
							this.evalgiftDetail.start_time = response.start_time != null && response.start_time != '' ? response.start_time.substring(0, 10) : '';
							this.evalgiftDetail.end_time = response.end_time != null && response.end_time != '' ? response.end_time.substring(0, 10) : '';
							this.evalgiftDetail.reward_credit = response.reward_credit;
							this.evalgiftDetail.stroes = response.stroes;
							this.evalgiftDetail.chanels = response.chanels;
							this.evalgiftDetail.groups = response.groups;
							this.evalgiftDetail.totalMembers = totalMembers;
							this.evalgiftDetail.coupons = response.coupons;
							
							this.evalgiftDetail.gift_way = response.gift_way;
							this.evalgiftDetail.gift_restrict = response.gift_restrict;
							this.evalgiftDetail.restrict_hour = response.restrict_hour;
							this.evalgiftDetail.alert_mode = response.alert_mode;
							
							//赠礼规则
							this.evalgiftDetail.level = response.level;
							//等级名称需要后台再加个 等级名称的字段
							this.dialogVisibleEvalgift = true;
						} else {
							this.loading2 = false;
							this.$message({
								type: 'error',
								message: response.msg
							});
						}
					}).catch(() => {
						this.loading2 = false;
						this.$message({
							type: 'error',
							message: '网络异常'
						});
					});
				}
				else if(row.activity_type == 'birthday'){
					this.loading2 = true;
					let data = "id=" + row.id +
						'&activity_type=' + row.activity_type;
					findEvalgiftActivityDetail(data).then(response => {

						if(response.code == 0 || response.code == '0') {
							this.loading2 = false;

							let totalMembers = 0;

							if(response.groups != null && response.groups != '' && response.groups.length != 0) {
								response.groups.map((group) => {
									totalMembers += group.members_count;
								});
							}
							this.evalgiftDetail.activity_type=row.activity_type,
							this.evalgiftDetail.subject = response.subject;
							this.evalgiftDetail.start_time = response.start_time != null && response.start_time != '' ? response.start_time.substring(0, 10) : '';
							this.evalgiftDetail.end_time = response.end_time != null && response.end_time != '' ? response.end_time.substring(0, 10) : '';
							this.evalgiftDetail.reward_credit = response.reward_credit;
							//this.evalgiftDetail.stroes = response.stroes;
							//this.evalgiftDetail.chanels = response.chanels;
							this.evalgiftDetail.groups = response.groups;
							this.evalgiftDetail.totalMembers = totalMembers;
							this.evalgiftDetail.coupons = response.coupons;


							this.evalgiftDetail.alert_mode =  response.alert_mode;
							this.evalgiftDetail.aheadDays =  response.aheadDays;
							this.evalgiftDetail.aheadTime =  response.aheadTime;

							this.dialogVisibleEvalgift = true;
						} else {
							this.loading2 = false;
							this.$message({
								type: 'error',
								message: response.msg
							});
						}
					}).catch(() => {
						this.loading2 = false;
						this.$message({
							type: 'error',
							message: '网络异常'
						});
					});
				}
				else if(row.activity_type == 'xfzq'){
					//this.loading2 = true;
					let data = "id=" + row.id +
						'&activity_type=' + row.activity_type;
					findConsumptionDetail(data).then(response => {
						if(response.success) {
							this.loading2 = false;
							let totalMembers = 0;
							this.evalgiftDetail.subject = response.subject;
							this.evalgiftDetail.activity_type=row.activity_type,
							this.evalgiftDetail.start_time = response.start_time != null && response.start_time != '' ? response.start_time.substring(0, 10) : '';
							this.evalgiftDetail.end_time = response.end_time != null && response.end_time != '' ? response.end_time.substring(0, 10) : '';
							//this.evalgiftDetail.reward_credit = response.reward_credit;
							this.evalgiftDetail.reward_money_source = response.reward_money_source;
							this.evalgiftDetail.payments = response.payments;
							this.evalgiftDetail.level = response.activity_rules[0].level_name;
							this.evalgiftDetail.stroes = response.stroes;
							this.evalgiftDetail.chanels = response.chanels;
							this.evalgiftDetail.activityList = response.activity_rules[0].limits;
							//this.evalgiftDetail.coupons = response.coupons;
							this.evalgiftDetail.alert_mode =  response.alert_mode;
							
							this.dialogVisibleEvalgift = true;
						} else {
							this.loading2 = false;
							this.$message({
								type: 'error',
								message: response.msg
							});
						}
					}).catch(() => {
						this.loading2 = false;
						this.$message({
							type: 'error',
							message: '网络异常'
						});
					});
				}else if(row.activity_type == 'wxdtd'){		
					this.loading2 = true;
					let data = "id=" + row.id +
						'&activity_type=' + row.activity_type;
					findEvalgiftActivityDetail(data).then(response=>{//回显数据
						if(response.code == 0 || response.code == '0') {
							this.loading2 = false;
		  					let evalgiftDetail = response;		
							this.evalgiftDetail.subject = response.subject;//游戏主题
							this.evalgiftDetail.activity_type=row.activity_type,
							this.evalgiftDetail.start_time = response.start_time != null && response.start_time != '' ? response.start_time.substring(0, 10) : '';//开始时间
							this.evalgiftDetail.end_time = response.end_time != null && response.end_time != '' ? response.end_time.substring(0, 10) : '';//结束时间
							
							this.evalgiftDetail.congratulations = response.congratulations;//恭喜语
							this.evalgiftDetail.advertising_language = response.advertising_language;//广告语
							this.evalgiftDetail.shareTitle = response.share_title;//分享标题
							this.evalgiftDetail.shareContent = response.share_content;//分享描述
							this.evalgiftDetail.max_number = response.max_number;//最多人数
							this.evalgiftDetail.min_number = response.min_number;//最小人数
							this.evalgiftDetail.game_length = response.game_length;//游戏时长
							this.evalgiftDetail.stroes = response.stroes;//游戏门店
							this.evalgiftDetail.chanels = response.chanels;//游戏渠道
							// this.evalgiftDetail.game_rules = response.game_rules;//游戏规则
							this.evalgiftDetail.guestlist = response.guestlist;//神秘嘉宾
							this.evalgiftDetail.messagelist = response.messagelist;//玩家称号
							this.evalgiftDetail.giftlist = response.giftlist;//活动赠礼
							this.evalgiftDetail.intervallist = response.intervallist;//游戏时段
							
							this.dialogVisibleGame = true;
						}else {
							this.loading2 = false;
							this.$message({
								type: 'error',
								message: response.msg
							});
						}
					}).catch(() => {
						this.loading2 = false;
						this.$message({
							type: 'error',
							message: '网络异常'
						});
					});
				}else if(row.activity_type == 'register'){
					this.loading2 = true;
					let data = "id=" + row.id +
						'&activity_type=' + row.activity_type;
					findMeetinggiftActivityDetail(data).then(response => {
						if(response.code == 0 || response.code == '0') {
							this.loading2 = false;
							this.evalgiftDetail.subject = response.subject;
							this.evalgiftDetail.activity_type=row.activity_type,
							this.evalgiftDetail.start_time = response.start_time != null && response.start_time != '' ? response.start_time.substring(0, 10) : '';
							this.evalgiftDetail.end_time = response.end_time != null && response.end_time != '' ? response.end_time.substring(0, 10) : '';
							this.evalgiftDetail.reward_credit = response.reward_credit;
							this.evalgiftDetail.stroes = response.stroes;
							this.evalgiftDetail.chanels = response.chanels;
							this.evalgiftDetail.coupons = response.coupons;
							this.evalgiftDetail.alert_mode =  response.alert_mode;
							this.dialogVisibleEvalgift = true;
						} else {
							this.loading2 = false;
							this.$message({
								type: 'error',
								message: response.msg
							});
						}
					}).catch(() => {
						this.loading2 = false;
						this.$message({
							type: 'error',
							message: '网络异常'
						});
					});
				}
				else{
					let activity_type = row.activity_type;
					let path = this.activityMessages.filter(item=>item.activity_type==activity_type)[0].path;				    
					this.$router.push({
						path: path,
						query: {
							id: row.id,
							activity_type: activity_type
						}
					});
				}

			},
			copy(row) {
				_czc.push(["_trackEvent", "营销中心-活动管理-活动列表", "复制"]);//埋点统计
				this.dialogCopy = true;
				this.id = row.id;
				this.copyName = row.subject;
			},
			copyActivity() {
				let data = 'activity_id=' + this.id +
					'&subject=' + this.ruleForm.subject;
				this.$refs.ruleForm.validate(valid => {
					if(valid) {
						this.loading1 = true
						copyActivityById(data).then(response => {
							if(response.success == true) {
								this.$message({
									type: 'info',
									message: response.msg
								});
								this.loading1 = false
								
								this.dialogCopy = false
								this.getList();
							} else {
								this.loading1 = false
								this.$message({
									type: 'error',
									message: response.msg
								});
							}
							this.ruleForm.subject = ''
						}).catch(() => {
							this.loading1 = false
							this.ruleForm.subject = ''
							this.$message({
								type: 'error',
								message: '网络异常'
							});
						});
					} else {
						return false;
					}
				});

			},
			handleCopyClose(done) {
				done();
			},
			/*删除活动*/
			deleteActivity(row) {
				_czc.push(["_trackEvent", "营销中心-活动管理-活动列表", "删除"]);//埋点统计
				let running_state = row.running_state;
				let message = '';
				let showCancelButton = false;
				let type = 'warning'
				switch(running_state) {
					case '1':
						message = '活动进行中,无法进行该操作!'
						break;
					default:
						message = '请确认是否删除活动?'
						showCancelButton = true
						type = 'info'
						break;
				}
				let data = 'id=' + row.id +
					'&optType=' + '3' +
					'&activity_type=' + row.activity_type;
				this.$confirm(message, {
					showClose: false,
					showCancelButton: showCancelButton,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: type
				}).then(() => {
					if(running_state != '1') {
						endOrIssue(data).then(response => {
							if(response.code == '0') {
								this.$message({
									type: 'success',
									message: '删除成功！'
								});
								this.getList();
							} else {
								let msg = this.getResponseCodeMessage(response.code)
								this.$message({
									type: 'error',
									message: msg
								});
							}
						}).catch((e) => {
							this.$message({
								type: 'error',
								message: '网络异常'
							});
						});
					}

				})

			},
			getResponseCodeMessage(code) {
				let msg = '';
				switch(code) {
					case 1001:
						msg = '参数不能为空!'
						break;
					case 2001:
						msg = '当前活动状态不可进行此操作！'
						break;
					case 2002:
						msg = '活动不存在!'
						break;
					case 2003:
						msg = '运行活动不存在!'
						break;
					case 3001:
						msg = '活动名称已经存在!'
						break;
					case 3002:
						msg = '时间段已存在活动!'
						break;
					case 3003:
						msg = '门店已存在活动!'
						break;
					case 3004:
						msg = '存在全部门店活动!'
						break;
					case 4001:
						msg = '重复赠礼!'
						break;
					case 4002:
						msg = '请求参数为空!'
						break;
					default:
						msg = '操作失败!'
						break;
				}
				return msg;
			},
			/* 终止活动*/
			endActivity(row) {
				_czc.push(["_trackEvent", "营销中心-活动管理-活动列表", "终止"]);//埋点统计
				let running_state = row.running_state;
				let message = '';
				let showCancelButton = false;
				let type = 'warning'
				switch(running_state) {
					case '0':
						message = '活动尚未发布!'
						break;
					case '1':
						message = '活动进行中,是否停止活动?'
						showCancelButton = true
						type = 'info'
						break;
					case '2':
						message = '活动已终止!'
						break;
					case '4':
						message = '活动已结束!'
						break;
					default:
						message = '活动异常,请联系管理员!'
						break;
				}
				let data = 'id=' + row.id +
					'&optType=' + '2' +
					'&activity_type=' + row.activity_type;
				this.$confirm(message, {
					showClose: false,
					showCancelButton: showCancelButton,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: type
				}).then(() => {
					if(running_state == '1') {
						endOrIssue(data).then(response => {
							if(response.code == '0') {
								this.$message({
									type: 'success',
									message: '终止成功!'
								});
								this.getList();
							} else {
								let msg = this.getResponseCodeMessage(response.code)
								this.$message({
									type: 'error',
									message: msg
								});
							}
						}).catch((e) => {
							this.$message({
								type: 'error',
								message: '网络异常'
							});
						});
					}

				})

			},
			/* 发布活动*/
			issueActivity(row) {
				_czc.push(["_trackEvent", "营销中心-活动管理-活动列表", "发布"]);//埋点统计
				let running_state = row.running_state;
				let message = '';
				let showCancelButton = false;
				let type = 'warning'
				switch(running_state) {
					case '0':
						message = '是否发布该活动?'
						showCancelButton = true
						type = 'info'
						break;
					case '1':
						message = '活动进行中!'
						break;
					case '2':
						message = '活动已终止,是否再次发布?'
						showCancelButton = true
						break;
					case '4':
						message = '活动已结束!'
						break;
					default:
						message = '活动异常,请联系管理员!'
						break;
				}
				let data = 'id=' + row.id +
					'&optType=' + '1' +
					'&activity_type=' + row.activity_type;
				this.$confirm(message, {
					showClose: false,
					showCancelButton: showCancelButton,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: type
				}).then(() => {
					if(running_state == '0' || running_state == '2') {
						endOrIssue(data).then(response => {
							if(response.code == '0') {
								this.$message({
									type: 'success',
									message: '发布成功!'
								});
								this.getList();
							} else {
								let msg = this.getResponseCodeMessage(response.code)
								this.$message({
									type: 'error',
									message: msg
								});
							}
						}).catch((e) => {
							this.$message({
								type: 'error',
								message: '网络异常'
							});
						});
					}

				})

			},
			/*编辑活动*/
			update(row) {
				_czc.push(["_trackEvent", "营销中心-活动管理-活动列表", "编辑"]);//埋点统计
				let running_state = row.running_state;
				let message = '';
				let showCancelButton = false;
				let type = 'warning'
				switch(running_state) {
					case '1':
						message = '活动进行中?请先终止活动在进行编辑'
						break;
					case '4':
						message = '活动已结束!'
						break;
					default:
						message = '活动异常,请联系管理员!'
						break;
				}
				if(running_state == '1' || running_state == '4') {
					this.$confirm(message, {
						showClose: false,
						showCancelButton: showCancelButton,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: type
					})
					return;
				} else {
					let activity_type = row.activity_type;
					let path = this.activityMessages.filter(item=>item.activity_type==activity_type)[0].path;				    
					this.$router.push({
						path: path,
						query: {
							id: row.id,
							activity_type: activity_type
						}
					});
				}

			},
			createActivity() {
				_czc.push(["_trackEvent", "营销中心-活动管理-活动列表", "创建活动"]);//埋点统计
				this.$router.push({
					path: '/marketing/createactivitynew',
					query: {
						name: 'zhangsan'
					}
				});
			},
			showPopover(hoverId,type) {
				if(type == 'wxdtd') {
					this.flag = false;
					this.showpop = true;
					this.hoverId = hoverId;
				}else {
					this.flag = true;
					this.showpop = true;
					this.hoverId = hoverId;
				}
				
			},
			hidePopover(hoverId) {
				this.hoverId = 0;
				this.showpop = false;
			},
			getAllActivityType() {
				getAllActivityType().then(response => {
					response.map((item, index) => {
						this.filterText.push({
							text: item.text,
							value: item.id.substring(1, item.id.length - 1)
						})
					})

				});
			}
		},
		mounted() {
			this.getList();
		},
		created() {
			this.getAllActivityType();
		},
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.el-icon-dropdown:before {
		font-size: 14px;
	}
	
	.el-icon-dropup:before {
		font-size: 14px;
	}
	/*****复制活动弹出框 开始*******/
	
	.el-dialog .descripe {
		height: 32px;
		line-height: 32px;
		background: #FFFAEB;
		font-size: 13px;
		color: #576D7A;
	}
	
	.warning.el-icon-warning {
		margin-left: 16px;
		font-size: 16px;
		color: #FFBF00;
	}
	
	.content {
		margin-top: 20px;
		margin-bottom: 30px;
		.title {
			line-height: 32px;
			height: 32px;
			margin-left: 32px;
			.titlename {
				color: #576D7A;
			}
			.titlecontent {
				margin-left: 16px;
				color: #34495E;
			}
		}
		.el-form{
			.el-form-item:nth-child(1){
				margin-bottom:11px;
				.el-form-item__label{
					text-align: right !important;
				}
			}			
		}
	}
	
	.fzhd_close {
		height: 60px;
		line-height: 60px;
		background: #F4F9FC;
		text-align: center;
	}
	/*****复制活动弹出框 结束*******/
	
	.el-dialog__body {
		.dialogbody {
			max-height: 500px;
			overflow-y:auto;
			padding-top: 20px;
			padding-bottom: 30px;
			.itemclass {
				height: auto;
				min-height: 28px;
				overflow: hidden;
				.itemleft {
					position: relative;
					width: 120px;
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
					width: 460px;
					line-height: 28px;
					height: auto;
					text-align: left;
					padding-left: 5px;
					padding-right: 20px;
					.store {
						padding: 0 3px;
						position: relative;
						float: left;
						color: #34495E;
						.yxsd {
							margin-bottom: 14px;
							min-height: 14px;
							p {
								height: 14px;
								line-height: 28px;
							}
						}
						&>.yxsd:last-child {
								margin-bottom: 24px;
							}
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
						    float: left;
							.cardcoupon {
								padding: 0 3px;
								position: relative;
								float: left;
								color: #34495E;
								width: 340px;
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
					.itemclass{
						.itemleft{
							width: 60px;
						}
						.itemright{
							width: 400px;
						}
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
</style>