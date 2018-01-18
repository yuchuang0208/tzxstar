<template>
	<div class="dtd_game" v-loading.body="loading1">
			<!-- 选择优惠券 对话框 -->
			<el-dialog
			  title="选择优惠券"
			  :visible.sync="dialogSelectYouhuiQuan"
			  size="tiny"
			  :before-close="handleSelectYouhuiQuanClose"
			  custom-class="gamexzyhq_dialog">
			  
			  	<div class="xzyhq">
					<div class="xzyhq_search">
						<el-input placeholder="请输入优惠券名称" icon="search" :on-icon-click="searchYouHuiQuan" v-model="searchText" ></el-input>
						<h1 @click="dialogAddYouhuiQuan = true">创建优惠券</h1>
					</div>
					<div class="xzyhq_show">
						<ul>
							<el-radio-group v-model="yhqCheckedData">
								<li v-for="item in yhqFiterData">
									<div class="xzyhq_show_left">
										<div class="xzyhq_show_left_up">
										<cite>¥</cite>
										<tt>{{item.face_value}}</tt>
										</div>
										<div class="xzyhq_show_left_down">
										<em>满{{item.bill_limit_money}}元可用</em>
										</div>
									</div>
									<div class="xzyhq_show_right">
										<div class="xzyhq_show_right_left">
										<cite title="item.text">{{item.text}}</cite>
											<cite v-if="item.coupons_pro == 'coupons_dish'">菜品券</cite>
										<em v-if="item.validity_type == '1'">领券后当日可用,有效期{{item.validity_days}}天</em>
										<em v-else>{{item.start_coupon}}-{{item.end_coupon}}</em>
										</div>
										<div class="xzyhq_show_right_right">
											<el-radio-group v-model="radio">
												<el-radio :label="item"></el-radio>
											</el-radio-group>
										</div>
									</div>
								</li>				  	  	 	
							</el-radio-group>
						</ul>
					</div>
				</div>
			  <div class="xzyhq_close">
			  		<div class="bottom_64_32">
			  			<div class="quxiao" @click="dialogSelectYouhuiQuan = false"><em>取消</em></div>
			  			<div class="queding" @click="youhuiquanQueding"><em>确定</em></div>
					</div>
			  	</div>
			</el-dialog>
			<!--选择优惠券 结束 -->


			<!--添加优惠券 开始 -->
			<el-dialog
			  title="添加优惠券"
			  :visible.sync="dialogAddYouhuiQuan"
			  size="tiny"
			  :before-close="handleAddYouhuiQuanClose"
			  custom-class="addyhq_dialog">
			     <div class="addyhq">
			     	<img src="../../assets/huodong/noyhq_add2.png"  />
			     	<cite>还没有可用优惠券噢，快去创建一张吧！</cite>
			     </div>
			     <div class="addyhq_add">
			     	<el-button type="primary" @click='openCoupons' icon="plus" size="small" >新增优惠券</el-button>
			     </div>
			</el-dialog>
			<!--添加优惠券 结束 -->
			
			<!--优惠券详情 开始 -->
			<el-dialog
			  title=""
			  :visible.sync="dialogViewYouhuiQuan"
			  size="tiny"
			  :before-close="handleViewYouhuiQuanClose"
			  custom-class="viewyhq_dialog">
			     <tzx-coupon-view :yhqOneData="yhqOneData"></tzx-coupon-view>
			</el-dialog>
			<!--优惠券详情 结束 -->

			<!--选择门店 开始-->
			<el-dialog  :show-close=true size='tiny' :visible.sync="storeDialogVisible" custom-class='treeSelect' title="选择门店">			
		   		 <tzx-tree-select 
				   	:data="storeData" 
				   	unitAndName='家店' 			   
				   	@cancelButton='storeDialogVisible = false' 
				   	@makeSureButton ='storeMakeSureChecked'
				   	@boxChange = 'storeBoxChange' 
				   	:defaultCheckedId = 'storeCheckedIds'
				   	:pnodes= 'storeNodes' 
				   	:ptotalSelect = 'storeTotal'
				   	:defaultProps ='defaultProps'
				   	>  
		  		</tzx-tree-select>	
			</el-dialog>
			<!--选择门店结束-->

			
		<!--消费后评价赠礼  开始-->
		<div class="divTwo_gzzl">
		    <h1><em>大逃单游戏</em><cite>基于H5营销游戏,拉动更多粉丝和会员提示营业额</cite></h1>
		    
		    <h2 v-model="tishi">
		    	<img src="../../assets/huodong/tishi.png" />
		    	<cite>提示：您已经创建过如下活动，新活动尽量不要与之冲突！</cite>
				<img v-if="!tishi" src="../../assets/huodong/chakangengduo.png" @click="changTiShi" style="width:70px;height:16px;margin-top:8px;"/>
		    	<img v-if="tishi" src="../../assets/huodong/shouqi.png" @click="changTiShi" style="width:42px;height:16px;margin-top:8px;"/>		    	
		    	<ul v-if="tishi">
		    		<li v-for="(item,index) in acitivities"><em>{{index+1}}</em>.{{item.subject}}，{{dateFilter(item.start_time)}}至{{dateFilter(item.end_time)}}；范围：<span v-for="item2 in item.stores">{{item2.org_full_name}};</span></li>
		    	</ul>
		    </h2>			
		    <!--表单开始-->
		    <el-form  label-width="100px" class="demo-ruleForm" :rules="rules" ref="form" :model="form">
					<el-form-item label="游戏名称：">
					       <span>{{form.subject}}</span>
					</el-form-item>
					<el-form-item label="游戏描述：">
					       <p style="max-width:800px;font-size:12px;line-height:16px;margin-top:5px;">
							   {{gameRule.describe}}
							</p>
					</el-form-item>
					<el-form-item label="恭喜语：" prop="congratulationsWord">
						<el-input placeholder="如:大吉大利,今年吃鸡" v-model="form.congratulationsWord" style="width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="广告语：" prop="advertisementWord">
						<el-input placeholder="如:大吉大利,今年吃鸡" v-model="form.advertisementWord" style="width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="分享标题：" prop="shareTitle">
						<el-input placeholder="如:大吉大利,今年吃鸡" v-model="form.shareTitle" style="width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="分享描述：" prop="shareDescribe">
						<el-input placeholder="如:大吉大利,今年吃鸡" v-model="form.shareDescribe" style="width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="游戏周期：" required>
						        <div class="hdzq_date1">
						        	<el-form-item prop="start_time">
							        	<el-date-picker 
      										type="date" :picker-options="pickerOptions0" v-model="form.start_time" placeholder="请选择开始日期" style="width:230px;" format="yyyy-MM-dd">
   	 									</el-date-picker>
							      	</el-form-item>
						        </div>
						        <div class="hdzq_date_em">
						        	<em>至</em>
						        </div>
						        <div class="hdzq_date1">
						        	<el-form-item prop="end_time">
						        		<el-date-picker 
      										type="date" :picker-options="pickerOptions0" v-model="form.end_time" placeholder="请选择结束日期" style="width:230px;" format="yyyy-MM-dd">
   	 									</el-date-picker>
						      		</el-form-item>
						        </div>
					</el-form-item>
					  
					<el-form-item label="游戏人数：" required>
						<div class="hdzq_date1">
							<el-form-item prop="lastMember">
								<el-select v-model="form.leastMember" placeholder="游戏人数" style="width:100px;">
									<el-option label="2" value="2"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="hdzq_date_em">
							<em>人 至</em>
						</div>
						<div class="hdzq_date2">
							<el-form-item prop="mostMember">
								<el-select v-model="form.mostMember" placeholder="" style="width:100px;">
									<el-option label="2" value="2"></el-option>
									<el-option label="3" value="3"></el-option>
									<el-option label="4" value="4"></el-option>
									<el-option label="5" value="5"></el-option>
									<el-option label="6" value="6"></el-option>
									<el-option label="7" value="7"></el-option>
									<el-option label="8" value="8"></el-option>
									<el-option label="9" value="9"></el-option>
									<el-option label="10" value="10"></el-option>
									<el-option label="11" value="11"></el-option>
									<el-option label="12" value="12"></el-option>
									<el-option label="13" value="13"></el-option>
									<el-option label="14" value="14"></el-option>
									<el-option label="15" value="15"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div class="hdzq_date_em">
							<em>人</em>
						</div>
					</el-form-item>
				
					<el-form-item label="游戏时长：" prop="gameTime">	
						<div class="hdzq_date2">
							<!-- <el-input placeholder="请设置游戏时长" v-model="form.gameTime" type="number" style="width:120px;"></el-input> -->
							<el-input placeholder="请设置游戏时长" min="0" step="1" type="number" style='width:120px;' v-model="form.gameTime">
								<template slot="append">秒</template>
							</el-input>
						</div>
						<div class="hdzq_date_em">
							<span style="font-size:12px;color:#9AABB8">(游戏时长不少于60秒，倒计时N秒内如果游戏还未开始，游戏将自动取消，需要重新发起游戏)</span>
						</div>
					</el-form-item>
					
					<el-form-item  label="活动门店:"  prop="stores" :rules="filter_rules({required:true})">									
						 <div class='dishDiv'>
						    	<div class='showDishMessage' :key="index" v-for='(store,index) in storeNodes_template'>
									<tzx-tag cursor='default' color='#34495E' size='medium' :closable='!is_find'  @closeThis='deleteStore(store,index)'>{{store.label}}</tzx-tag>
								</div>
								<div class='checkdish' >
									<span @click='storeDialogVisible = true'>选择门店</span>
								</div>
						</div>
					</el-form-item>

					<el-form-item label="游戏时段：" prop="use_cycle" :rules="filter_rules({type:'array'})">
						<el-checkbox-group v-model="form.use_cycle">
							<div class='checkboxdiv' v-for='(week,index) in weeks'>
								<el-checkbox @change='timeCheckChange' :label="week.id" :key="index" >
								{{week.text}}
								</el-checkbox>

								<el-radio-group style='margin-left: 15px;' @change='peraidChange(week)' v-model="week.model">
									<el-radio  label="1" value='1'>全天</el-radio>
									<el-radio  label="0" value='0'>选择时段</el-radio>
								</el-radio-group>
								<div class='weektimes' v-if='week.model=="0"'>
									<div class='everyweektimes' v-for='(time,inx) in week.times'>
										<el-time-select @change ='TimeChange("0",index,inx)' :editable=false style='width:110px' placeholder="起始时间"  v-model="time.begintime" :picker-options="{ start: '00:00', step: '00:15', end: '24:00' }">
										</el-time-select>
										<el-time-select @change ='TimeChange("1",index,inx)' :editable=false style='width:110px' placeholder="结束时间" v-model="time.endtime" :picker-options="{ start: '00:00', step: '00:15',end:'24:00', minTime: time.begintime }">
										</el-time-select>
										<div class="imgbody">
											<img src="../../assets/member/add.png" v-if='inx==0' @click.prevent='addTimes(time,index)' />
											<img src="../../assets/member/minus.png" v-if='inx!=0' @click.prevent='removeTimes(time,index,inx)' />
										</div>
									</div>
								</div>
							</div>
						</el-checkbox-group>
					</el-form-item>
					
					<el-form-item label="投放渠道：" prop="chanels" class="gzzl_tfqd">
					    <el-checkbox-group v-model="form.chanels">
					    	<el-checkbox v-for="(item,index) in tfqdData" :key='index' :label="item.id" :name="item.id">{{item.text}}</el-checkbox>
					    </el-checkbox-group>
					</el-form-item>

					<el-form-item label="游戏赠礼：" label-width="130px" required class="gameMain">
						<div v-if="addrule" class="addRule" @click.prevent='addTab()'>＋新增规则</div>
					    <div class="gameGift">
							<el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
								<el-tab-pane
									v-for="(item, indexs) in grouplist"
									:key="item.name"
									:label="item.title"
									:name="item.name">
									<div class="giftcontent">										
										<div class="hdzq_date_em" style="width: 110px;">
											<em>游戏人数：</em>
										</div>
										<div class="hdzq_date1">
											<el-form-item prop="lastMember">
												<el-select v-model="item.min_number" placeholder="" style="width:100px;">
													<el-option label="2" value="2"></el-option>
													<el-option label="3" value="3"></el-option>
													<el-option label="4" value="4"></el-option>
													<el-option label="5" value="5"></el-option>
													<el-option label="6" value="6"></el-option>
													<el-option label="7" value="7"></el-option>
													<el-option label="8" value="8"></el-option>
													<el-option label="9" value="9"></el-option>
													<el-option label="10" value="10"></el-option>
													<el-option label="11" value="11"></el-option>
													<el-option label="12" value="12"></el-option>
													<el-option label="13" value="13"></el-option>
													<el-option label="14" value="14"></el-option>
													<el-option label="15" value="15"></el-option>
												</el-select>
											</el-form-item>
										</div>
										<div class="hdzq_date_em">
											<em>人 至</em>
										</div>
										<div class="hdzq_date2">
											<el-form-item prop="mostMember">
												<el-select v-model="item.max_number" placeholder="" style="width:100px;">
													<el-option label="2" value="2"></el-option>
													<el-option label="3" value="3"></el-option>
													<el-option label="4" value="4"></el-option>
													<el-option label="5" value="5"></el-option>
													<el-option label="6" value="6"></el-option>
													<el-option label="7" value="7"></el-option>
													<el-option label="8" value="8"></el-option>
													<el-option label="9" value="9"></el-option>
													<el-option label="10" value="10"></el-option>
													<el-option label="11" value="11"></el-option>
													<el-option label="12" value="12"></el-option>
													<el-option label="13" value="13"></el-option>
													<el-option label="14" value="14"></el-option>
													<el-option label="15" value="15"></el-option>
												</el-select>
											</el-form-item>
										</div>
										<div class="hdzq_date_em">
											<em>人时</em>
										</div>
									</div>
									<div class="zengquanRule">
										<p>"买单人"赠送1张<span>当餐可用</span>优惠券<em>(建议选择当天可用且不可与其它优惠券并用的大额优惠券)</em></p>
										<p>"逃单人"每人随机赠送1张<span>非当餐可用</span>优惠券<em>(建议选择当天不可用小额优惠券)</em></p>
									</div>
									<div class="giftcontent" v-for="(items,index) in item.playerlist">
										<div class="hdzq_date_em" style="width: 110px;">
											<em>{{items.player_name}}：</em>
										</div>
										<div class="yhqxz">
											<ul class="xuanzeyhq">
												<li v-if="items.coupon_name !=''">
													<em>{{items.coupon_name}}</em>
													<img src="../../assets/huodong/close.svg" @click="deleteYhq(items)" />
												</li>
											</ul>
										</div>
										<div class="addyouhuiquan" @click="getYouHuiQuan(indexs,index)">
											<div class="tianjia" >选择优惠券</div>
										</div>
									</div>
									<div style="color:red">请按照游戏人数，选择匹配的游戏赠礼人数区间</div>								
								</el-tab-pane>
								
							</el-tabs>
						</div>
						
					</el-form-item>

				

					<!-- 称号及留言设置开始 -->
					<el-form-item label-width="100px;" label="称号留言：" required>
						<!-----------称号及留言开始 ------------>
						<div class="liuyan">
							<div class="liuyanBox" v-for="(item,index) in titleAndMessage">
								<div class="liuyanBox1">
									<div class="hdzq_date_em" style="width: 140px;">
										<em>{{item.info}}称号：</em>
									</div>
									<div class="liuyanBox1_1">
										<el-form-item>
											<el-input v-model="item.player_title" placeholder="呵！小意思！"style="width:120px;float:right;"></el-input>
										</el-form-item>
									</div>
									<div class="hdzq_date_em">
										<em>留言：</em>
									</div>
									<div style="float: left;">
										<el-form-item>
											<el-input v-model="item.player_message1" placeholder="呵！小意思！"style="width:220px;"></el-input>
											<el-input v-model="item.player_message2" placeholder="呵！小意思！"style="width:220px;"></el-input>
										</el-form-item>
									</div>			
								</div>
							</div>
							<div class="lightgray" style="margin-left: 125px;font-size: 12px;color: #9AABB8">（称号5字以内，留言20字以内。游戏结束时显示，玩家留言随机出现）。</div>
						</div>
					</el-form-item>

					<!-- 称号及留言设置结束 -->

					<!-- 神秘嘉宾开始 -->

					<el-form-item label-width="100px;" label="神秘嘉宾：">
						<div class="shenmijiabin">
							<ul>
								<li>
									<div class="jiabin" v-for="(item,index) in guest">
										<div class="imgBox">
											<div class="jiabinImg">
												<img width="100%" height="100%" :src="item.pic_url" alt="">
											</div>
										</div>
										<div class="jiabinInfo">
											<div class="jiabinInfoIpt">
												<div class="hdzq_date_em">
													<em>嘉宾昵称：</em>
												</div>
												<div class="hdzq_date2">
													<el-form-item label-width="0px">
														<el-input :disabled="true" v-model="item.nick_name" placeholder="请输入昵称"style="width:150px;"></el-input>
													</el-form-item>
												</div>
											</div>
											<div class="jiabinInfoIpt">
												<div class="hdzq_date_em">
													<em>安慰语：</em>
												</div>
												<div class="hdzq_date2">
													<el-form-item label-width="14px">
														<el-input v-model="item.consolation" placeholder="请输入安慰语"style="width:300px;"></el-input>
													</el-form-item>
												</div>
											</div>
											<div class="jiabinInfoIpt">
												<div class="hdzq_date_em">
													<em>恭喜语：</em>
												</div>
												<div class="hdzq_date2">
													<el-form-item label-width="14px">
														<el-input v-model="item.congratulations" placeholder="请输入恭喜语"style="width:300px;"></el-input>
													</el-form-item>
												</div>
											</div>
											
										</div>
									</div>
									
								</li>
							</ul>
						</div>
					</el-form-item>

					<!-- 神秘嘉宾结束 -->

					<!-- 游戏描述开始 -->
					<!-- <el-form-item label="游戏规则：">
						<textarea rows="10" cols="30" style="min-width:300px;">
							游戏描述：
							{{gameRule.describe}}
							游戏人数：
							{{gameRule.number}}
							游戏时间：
							游戏时间为{{gameRule.time}}秒
							游戏奖励：
							{{gameRule.gift}}
							特殊规则：
							{{gameRule.specialRule1}}
							{{gameRule.specialRule2}}
							{{gameRule.specialRule3}}
							其他：
							{{gameRule.other}}
							{{gameRule.info}}
						</textarea>
					</el-form-item> -->
					<el-form-item label-width="96px" label="游戏规则：" prop="ruletextarea">
						<editor class="editor" v-model="form.ruletextarea"></editor>			
					</el-form-item>
					<!-- 游戏描述结束 -->

					  
					<div class="quxiao_and_tijiao">
						<div class="bottom_64_32">
				       		<div class="quxiao" @click="open"><em>取消</em></div>
				       		<div class="queding" @click="onSubmit('form')"><em>确定</em></div>
				       	</div>
					</div>
					
				</el-form>
		    <!--表单结束-->
	    </div>
		<!--消费后评价赠礼  结束-->
	</div>
</template>

<script>
    import Assist from '@/utils/assist';
    import {formatDate} from '@/utils/index';
    import {getYouHuiQuanOne,getHuiyuanQudao,getMendian,getYouHuiQuan} from '@/api/home'
    import {findAttentionGift,findCouponList,saveAttentionGift,findEvalgiftActivityDetail,save,getdtdlist } from '@/api/activity'
     import { TzxTreeSelect } from '@/components/tzxtreeselect';
    import { TzxTag } from '@/components/tag'
	import axios from "axios";
	import editor from '@/pages/Tinymce/index'
	export default {
		components: { editor,TzxTreeSelect,TzxTag },
		watch: {
	      filterText(val) {
	        this.$refs.tree2.filter(val);
	      }
	    },
      data() {
      	return {
			loading1:false,
			activeName: 'first',
			acitivities:[],//已经创建得活动列表
			tishi:false,
			tfqdData:[],//投放渠道  
			flags: false,

			//处理活动赠礼的样式
			isclass:false,//不显示块      	    	     	
			hdzl:[],//活动赠礼     	   	
			yhqAllData:[],//优惠券all
			yhqFiterData:[],//过滤名称搜索的优惠券
			yhqCheckedDataEditAdd:[],//编辑或者选择确定优惠券是 过程变量
			yhqCheckedData:[],//已经选择的优惠券
			yhqOneData:{},//查看单个优惠券
			searchText:"",//优惠券搜索名称的文本
			yhqZengQuan:false,//赠送优惠券复选框默认 false 不显示赠券设置
			yhqZengJiFen:false,//赠送积分复选框默认 false 不显示赠券设置
			pickerOptions0: {
			disabledDate(time) {
				return time.getTime() < Date.now() - 8.64e7;
			}
			},
			pickerOptions1: {
			shortcuts: [{
				text: '今天',
				onClick(picker) {
				picker.$emit('pick', new Date());
				}
			}]
			},
			addrule: true,
			dialogMendian: false,
			dialogSelectYouhuiQuan:false,
			dialogAddYouhuiQuan:false,
			dialogViewYouhuiQuan:false,
			filterText: '',
			totalcount:0,

			//门店开始
			defaultProps: {
				children: 'children',
				label: 'labelc',
				name: 'label',
				id: 'id',
				count: 'count'
			},
      	
			storeData:[],
			storeDialogVisible:false,
			storeCheckedIds:[],
			storeNodes:[],
			storeNodes_template:[],
			storeTotal:0,
			data:[],
			checkedIds:[],
			nodes:[],
			nodes_dish:[],//点击确定按钮 才让选择的菜品展示 不能做数据双向绑定
			total:0,
			is_find:false,
			//门店结束
			weeks:[{
					id:'2',
					text:'周一',
					model:'mon',
					times:[{
						begintime:'',
						endtime:'',
						
					}]

				},{
					id:'3',
					text:'周二',
					model:'tues',
					times:[{
						begintime:'',
						endtime:'',
					
					}]
				},{
					id:'4',
					text:'周三',
					model:'wed',
					times:[{
						begintime:'',
						endtime:'',
					
					}]
				},{
					id:'5',
					text:'周四',
					model:'thur',
					times:[{
						begintime:'',
						endtime:'',
					
					}]
				},{
					id:'6',
					text:'周五',
					model:'fri',
					times:[{
						begintime:'',
						endtime:'',
					
					}]
				},{
					id:'7',
					text:'周六',
					model:'sat',
					times:[{
						begintime:'',
						endtime:'',
					
					}]
				},{
					id:'1',
					text:'周日',
					model:'sun',
					times:[{
						begintime:'',
						endtime:'',
					
					}]
			}],


		
			chanels:[],//渠道 表单验证使用
		//----------------------------------------------------游戏赠礼
			editableTabsValue2: '1',
			grouplist: [
				{
					title: '规则1',
					name: '1',
					group_id: 1,
					min_number: '2',
					max_number: '',
					playerlist: [
						{						
							coupon_id: '',//优惠券id
							coupon_name: '',//优惠券名
							face_value: '',//面值
							num: 0,
							player_id: 0,
							player_name: '买单玩家',//玩家称号
							type: 0				
						},
						{
							coupon_id: '',//优惠券id
							coupon_name: '',//优惠券名
							face_value: '',//面值
							num: 1,
							player_id: 1,
							player_name: '逃单第1名',//玩家称号
							type: 1				
						},
						{
							coupon_id: '',//优惠券id
							coupon_name: '',//优惠券名
							face_value: '',//面值
							num: 2,
							player_id: 2,
							player_name: '逃单第2名',//玩家称号
							type: 1				
						},
						{
							coupon_id: '',//优惠券id
							coupon_name: '',//优惠券名
							face_value: '',//面值
							num: 3,
							player_id: 3,
							player_name: '逃单第3名',//玩家称号
							type: 1				
						},
						{
							coupon_id: '',//优惠券id
							coupon_name: '',//优惠券名
							face_value: '',//面值
							num: 4,
							player_id: 4,
							player_name: '逃单第4名以后',//玩家称号
							type: 1				
						},
					]
				}],
			tabIndex: 2,
			//称号留言
			titleAndMessage: [
				{	
					info: '买单玩家',
					type: "0",
					num: "0",
					player_title: '买单英雄',
					player_message1: '买单英雄最棒',
					player_message2: '',
				},
				{
					info: '逃单第1名',
					type: "1",
					num: "1",
					player_title: '逃单手速王',
					player_message1: '逃单武功，唯快不破，承让喽~',
					player_message2: ''
				},
				{
					info: '逃单第2名',
					type: "1",
					num: "2",
					player_title: '逃单特工',
					player_message1: '逃单？very easy！',
					player_message2: ''
				},
				{
					info: '逃单第3名',
					type: "1",
					num: "3",
					player_title: '逃单小旋风',
					player_message1: '手指一抖，逃单我有！',
					player_message2: '',
				},
				{
					info: '逃单第4名以后',
					type: "1",
					num: "4",
					player_title: '逃单快手',
					player_message1: '嘿嘿，大吉大利呦！',
					player_message2: ''
			}],
			index: 0,
			indexs: 0,
			radio: [],

			guest:[//神秘嘉宾
				{ 
					pic_url: require('@/assets/danshengou.png'),
					nick_name: "单身狗",
					congratulations: "恭喜你，可以吃大餐了喔！",
					consolation: "摸摸头！礼物送给你，记得买买买喔！" 
				},
				{ 	
					
					pic_url: require('@/assets/dalaoban.png'),
					nick_name: "大老板",
					congratulations: "恭喜你，可以吃大餐了喔！",
					consolation: "摸摸头！礼物送给你，记得买买买喔！"
				},
				{ 	
					
					pic_url:  require('@/assets/laobanniang.png'),
					nick_name: "老板娘",
					congratulations: "恭喜你，可以吃大餐了喔！",
					consolation: "摸摸头！礼物送给你，记得买买买喔！"
				}
			],


			// 游戏规则
			gameRule: {
				describe: '大逃单v1.0.0是基于微信端H5的营销游戏。通过扫描桌台码进行多人游戏，游戏产生一名买单玩家和N名逃单玩家。游戏加入神秘嘉宾送礼环节，增加游戏的趣味性。最终拉动商户粉丝和会员数量，提升营业额，并通过分享方式进行商户宣传和品牌塑造推广。',
				number: '2人及以上',
				time: '20',
				gift: '根据游戏产生的排名结果，发放不同的优惠礼。更有机会获得神秘嘉宾赠送的大礼包。',
				specialRule1: '全部人员逃单值一样将重置游戏。',
				specialRule2: '并列逃单情况将按照随机方式产生排名结果。',
				specialRule3: '并列买单情况将按照入场顺序加逃单值产生结果。',
				other: '游戏最终解释权将由商户及门店所有。',
				info: '感谢您的参与，祝您游戏愉快！'
			},


        form: {
			congratulationsWord: '',//恭喜语
			advertisementWord: '',//广告语
			shareTitle: '',//分享标题
			shareDescribe: '',//分享描述
			subject:"大逃单",//主题
			start_time:"",//活动周期开始时间
			end_time:"",//活动周期结束时间
			leastMember: '2',//最少游戏人数
			mostMember: '',//最多游戏人数
			gameTime: '',//游戏时长
			store_ids:"",//门店 0全部
			use_cycle:[],//游戏时段
			ruletextarea: '',//游戏规则
			
			membership_groups:0,//群体 0全部  "201,203"
			chanels:[],
			reward_credit:0,//积分
			tl: [],
			activity_type:"evalgift",//默认赠礼
			introduction:"",
			remark:"",//无
			reason:"",//无			
			qunti:[], //默认群体
			hdzl:[],//活动赠礼	
			stores:'0',
       },
        rules: {
			congratulationsWord: [
				{ required: true, message: '请输入恭喜语', trigger: 'blur' },
            	{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
			],
			advertisementWord: [
				{ required: true, message: '请输入广告语', trigger: 'blur' },
            	{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
			],
			shareTitle: [
				{ required: true, message: '请输入分享标题', trigger: 'blur' },
            	{ min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
			],
			shareDescribe: [
				{ required: true, message: '请输入分享描述', trigger: 'blur' },
            	{ min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
			],
			start_time: [
				{ type: 'date',  required: true, message: '请选择开始日期', trigger: 'change' }
			],
			end_time: [
				{  type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
			],
			leastMember: [
				{ type: 'string',  required: true, message: '请选择游戏人数', trigger: 'change' }
			],
			mostMember: [
				{ type: 'string',  required: true, message: '请选择游戏人数', trigger: 'change' }
			],
			maxMember: [
				{ type: 'number',  required: true, message: '请选择游戏人数', trigger: 'change' }
			],
			gameTime: [
				{ required: true, message: '请设置游戏时长', trigger: 'blur' }				
			],
			hdzl: [
				{ type: 'array', required: true, message: '请选择活动赠礼', trigger: 'change' }
			],
			player_title: [
				{ required: true, message: '请设置买单玩家称号', trigger: 'blur' },
				{ min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
			],
			message: [
				{ required: true, message: '请设置买单玩家留言', trigger: 'blur' },
				{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
			],
			chanels: [
				{ type: 'array', required: true, message: '请选择渠道', trigger: 'change' }
			],
			nickname: [
				{ required: true, message: '请设置嘉宾昵称', trigger: 'blur' },
				{ min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
			],
			awword: [
				{ required: true, message: '请设置安慰语', trigger: 'blur' },
				{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
			],
			gxword: [
				{ required: true, message: '请设置安慰语', trigger: 'blur' },
				{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
			],
			ruletextarea: [
				{required: true, message: '请编辑游戏规则', trigger: 'change' }
			]
			},
			activityId:''    //form表单回显时用到
      	}
    },
    methods:{
		//-----------------------------------------------添加游戏规则
		addTab(targetName) {
			let newTabName = (this.grouplist.length+1)+'';
			this.grouplist.push({
			title: '规则'+ (this.grouplist.length + 1),
			name: newTabName,
			group_id: this.grouplist.length+1,
			min_number: '2',
			max_number: '',
			playerlist: [
					{					
						coupon_id: '',//优惠券id
						coupon_name: '',//优惠券名
						face_value: '',//面值
						num: 0,
						player_id: 0,
						player_name: '买单玩家',//玩家称号
						type: 0				
					},
					{
						coupon_id: '',//优惠券id
						coupon_name: '',//优惠券名
						face_value: '',//面值
						num: 1,
						player_id: 1,
						player_name: '逃单第1名',//玩家称号
						type: 1				
					},
					{
						coupon_id: '',//优惠券id
						coupon_name: '',//优惠券名
						face_value: '',//面值
						num: 2,
						player_id: 2,
						player_name: '逃单第2名',//玩家称号
						type: 1				
					},
					{
						coupon_id: '',//优惠券id
						coupon_name: '',//优惠券名
						face_value: '',//面值
						num: 3,
						player_id: 3,
						player_name: '逃单第3名',//玩家称号
						type: 1				
					},
					{
						coupon_id: '',//优惠券id
						coupon_name: '',//优惠券名
						face_value: '',//面值
						num: 4,
						player_id: 4,
						player_name: '逃单第4名以后',//玩家称号
						type: 1				
					},
				]
			});
			this.editableTabsValue2 = newTabName;
			if(this.grouplist.length >= 6) {
				this.addrule = false;
			}
		},
		removeTab(targetName) {
			let tabs = this.grouplist;
			let activeName = this.editableTabsValue2;
			if (activeName === targetName) {
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
					let nextTab = tabs[index + 1] || tabs[index - 1];
					if (nextTab) {
						activeName = nextTab.name;
					}
					}
				});
			}
			
			this.editableTabsValue2 = activeName;
			this.grouplist = tabs.filter(tab => tab.name !== targetName);
			if(this.grouplist.length < 6) {
				this.addrule = true;
			}
		},
    	dateFilter(value) {
			if(value!=null&&value!=""){
				return value.substring(0, 10);
			}else{
				return "";
			}
		},
    	handleCheckAllChange(event) {
    		let arrays = [];
    		this.tfqdData.forEach(item=>{
    			arrays.push(item.id);
    		})
	        this.form.chanels = event.target.checked ? arrays : [];
	    },
    	changTiShi(){
    		this.tishi= !this.tishi;
    	},
    	openCoupons(){
    		this.dialogAddYouhuiQuan = false;
    		this.dialogSelectYouhuiQuan =false;           
    		this.$router.push('/card/electroniccoupon')
    	},
    	onSubmit(form) {	
	        this.$refs[form].validate((valid) => {
	          if (valid) {//提交代码	          	    
					//拼装门店字符串获取门店id
					//如果是全部门店则存储0
					let mendian_str="";
					//判断门店下是否有数据 至少要要有一个数据
					if(this.storeNodes_template.length==0){
						this.$message({
							type: 'error',
							message: '至少选择一个门店'
						});
						return false;
					}
					let mendian = [];
					this.storeNodes_template.forEach(item =>{
						mendian.push(item.id);
				  	});
				  	mendian_str = mendian.join(",");

					
					//游戏时间处理
					let weeksCheck = false;
					let week_text = ''
					this.weeks.map((week,index)=>{
						if(week.model=='0'){
							week.times.map(time=>{
								if(time.begintime=="" || time.endtime == ''){
									weeksCheck = true;
									week_text = week.text
								}
							})
						}
					});
					if(weeksCheck){
						this.$message({
							type:'error',
							message:'请选择'+week_text+'游戏时间段的起始时间!'
						})
						return
					}
				  	
				  	//拼装优惠券
				  	if(this.form.hdzl.toString().indexOf('赠送优惠券')!=-1){
				  		
					  	if(this.yhqCheckedData.length==0){
					  		this.$message({
								type: 'error',
								message: '请选择优惠券'
							});
							return false;
					  	}
					  	
					  	let flag = true;
					  	this.yhqCheckedData.forEach(item =>{//每个优惠券至少添加1张
					  		let reg_zhengshu = /^[0-9]*[1-9][0-9]*$/;
					  		if(reg_zhengshu.test(item.reward_coupon)){//正整数
					  		}else{//正整数
					  				flag = false;
					  		}
					  	});
					  	if(!flag){
			  				this.$message({
								type: 'error',
								message: '请输入正整数'
							});
							return false;
					  	}
					  	
					  	
					  	let flag2 = true;
					  	
					  	let couponTotalCount = 0;
					  	this.yhqCheckedData.forEach(item =>{//每个优惠券至少添加1张
					  		if(item.reward_coupon <= 0){
					  			flag2 = false;
					  		}else{
					  			couponTotalCount = Number(couponTotalCount) +Number(item.reward_coupon);
					  		}
					  	});
					  	if(!flag2){
			  				this.$message({
								type: 'error',
								message: '请输入正整数'
							});
							return false;
					  	}
					  	
					  	if(couponTotalCount>5){
					  		this.$message({
								type: 'error',
								message: '最多添加5张优惠券'
							});
							return false;
					  	}
				  	}
				  	if(this.form.hdzl.toString().indexOf('赠积分')!=-1){
				  		/*if(isNaN(this.form.reward_credit)){//数字*/
					  		if(this.form.reward_credit<=0){
					  			this.$message({
									type: 'error',
									message: '请输入大于0的积分'
								});
								return false;
					  		}else{
					  			
					  			 let reg_zhengshu = /^[1-9]\d*$/;
					  			 if(reg_zhengshu.test(this.form.reward_credit)){//判断是否是整数
					  			 }else{//非整数
					  			 	//判断积分是否 大于0 且为以一位小数
						  			 let reg_xiaoshuo =  /^([1-9]\d*|0)(\.\d{0,1})?$/;
	 								 if(!reg_xiaoshuo.test(this.form.reward_credit)){
	 								  	this.$message({
											type: 'error',
											message: '请输入一位小数的积分'
										});
										return false;
	 								 }
					  			 }
					  		}
				  	}
				  	
				  	let yhq = []
				  	
				  	this.yhqCheckedData.forEach(item =>{
				  		let obj = item.tl;
				  		obj.reward_coupon= item.reward_coupon;
						yhq.push(obj);
				  	});
				  	
				  	var yhq_json = JSON.stringify(yhq);
				  	
				  	//拼装渠道
				  	let qudao_str = this.form.chanels.join(",");
				  	
				  	
				    var start = new Date(this.form.start_time);  
		            let start_time=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
				  	
				  	var end = new Date(this.form.end_time);  
		            let end_time=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
					
					if(start.getTime()>end.getTime()){
						this.$message({
							type: 'error',
							message: '结束日期不能晚于开始日期'
						});
						return false;
					}

					 /* 处理券的使用时段*/
					    let usePeriod = [];
					    this.weeks.map((week,index)=>{
					    	this.form.use_cycle.map(use=>{
					    		if(week.id ==use){
					    			if(week.model=='1'){
					    				usePeriod.push({
											week: use,
					    					ifallday:week.model,
					    					timelist:[]
					    				})
					    			}
					    			else{
					    				usePeriod.push({
											week: use,
					    					ifallday:week.model,
					    					timelist:week.times
					    				})
					    			}
					    		}
					    	})
						})

						let data = "id=" + this.activityId +
								"&subject="+this.form.subject+//主题
								"&tenentid=tzxstar"+
								"&introduction=" + this.gameRule.describe +//游戏介绍
								"&congratulations=" + this.form.congratulationsWord +//恭喜语
								"&advertising_language=" + this.form.advertisementWord +//广告语
								"&share_title=" + this.form.shareTitle +//分享标题
								"&share_content=" + this.form.shareDescribe +//分享描述
							    "&start_time="+start_time+//开始时间
								"&end_time="+end_time+//结束时间
								"&max_number=" + this.form.mostMember +
								"&min_number=2" +
								"&game_length=" + this.form.gameTime +
								"&storeIds="+ mendian_str +//门店id
								'&intervallist='+JSON.stringify(usePeriod)+
								"&chanels="+ qudao_str +//渠道
								"&giftlist="+ JSON.stringify(this.grouplist) +//游戏赠礼
								"&messagelist=" + JSON.stringify(this.titleAndMessage) +//称号及留言
								"&guestlist=" + JSON.stringify(this.guest) +//神秘嘉宾
								"&game_rules=" + this.form.ruletextarea
						let flas = true;
						this.titleAndMessage.forEach(item=> {
							if(item.player_title.length > 5) {
								this.$message({
									type: 'warning',
									message: '称号字数不能超过5位'
								});
								flas = false;
								return;
							}
							if(item.player_message2 == '' || item.player_message1 == '') {
								this.$message({
									type: 'warning',
									message: '留言不能为空'
								});
								flas = false;
								return;
							}		
						});
						this.guest.forEach(item=> {
							if(item.congratulations.length > 20) {
								this.$message({
									type: 'warning',
									message: '恭喜语字数不能超过20位'
								});
								flas = false;
								return;
							}else if(item.consolation.length > 20) {
								this.$message({
									type: 'warning',
									message: '安慰语字数不能超过20位'
								});
								flas = false;
								return;
							}
						});
						//验证游戏赠券
						this.grouplist.forEach(item=> {
							//玩家赠优惠券必选
							if(item.max_number >= 5) { //5位玩家以上,必须全选优惠券
								item.playerlist.forEach(items=> {
									if(items.coupon_id == '' || items.coupon_id == null) {
										this.$message({
											type: 'warning',
											message: '必须为全部玩家选择优惠券'
										});
										flas = false;
										return;
									}
								});
							}else if(item.max_number == 4) { //4位玩家,前三名必须选择券
								for(var i = 0;i<item.playerlist.length-1;i++) {
									if(item.playerlist[i].coupon_name == '' || item.playerlist[i].coupon_name == null) {
										this.$message({
											type: 'warning',
											message: '必须为指定数量玩家选择优惠券'
										});
										flas = false;
										return;
									}
								}
							}else if(item.max_number == 3) {//3位玩家,前二名必选券
								for(var i = 0;i<item.playerlist.length-2;i++) {
									if(item.playerlist[i].coupon_name == '' || item.playerlist[i].coupon_name == null) {
										this.$message({
											type: 'warning',
											message: '必须为指定数量玩家选择优惠券'
										});
										flas = false;
										return;
									}
								}
							}
							//设置游戏人数必须大于规则中设置的游戏人数				
							if(parseInt(item.max_number) > parseInt(this.form.mostMember)){
								this.$message({
									type: 'warning',
									message: '规则中游戏人数不能大于游戏人数'
								});
								flas = false;
								return;
							}
							//规则中人数前后不能相等
							else if(parseInt(item.max_number) <= parseInt(item.min_number)) {
								this.$message({
									type: 'warning',
									message: '规则中最少人数不能超过最多人数'
								});
								// h = true;
								flas = false;
								return false;
							}
						})						
						//验证游戏时长
						if(this.form.gameTime < 60) {
							this.$message({
								type: 'warning',
								message: '游戏时长不能少于60秒'
							});
							flas = false;
							return false;
						} 
						//验证规则之间人数不能重复
						for(var i = 0;i<this.grouplist.length;i++){
							for(var j = i+1; j < this.grouplist.length; j++) {
								if(parseInt(this.grouplist[i].max_number) >= parseInt(this.grouplist[j].min_number)) {
									this.$message({
										type: 'warning',
										message: '规则中人数不能有交集'	
									});
									flas = false;
									return false;
								}
							}
						}
						//验证游戏规则不能为空,富文本插件自带标签
						if(this.form.ruletextarea.replace(/<[^>]+>/g,"") == '') {
							this.$message({
								type: 'warning',
								message: '游戏规则不能为空'	
							});
							flas = false;
							return false;
						}
						if(flas) {
							this.loading1 = true;
							save(data).then((response) => {
								this.loading1 = false;
								if(response.code==0){
									this.$message({
										type: 'success',
										message: '保存成功'
									});
									this.$router.push({
										path:"/marketing/activitymanagement",
										hash:'new'
									});
									
								}else{
									this.$message({
										type: 'error',
										message: response.msg
									});
								}
							})
						}    
	          } else {
				window.scrollBy(0,-2000); 
	            return false;
	          }
	        });	        
	    },
		// ------------------------------------------------------门店部分
    	
		loadTree() {
			getMendian().then((response) => {
				this.storeData =  response.data;
			})
		},

		TimeChange(type,index,i){
			let checked = false;
			let len = this.weeks[index].times.length;
			if(len==2){
				let a = this.weeks[index].times[0].begintime;
				let b = this.weeks[index].times[0].endtime;
				let c = this.weeks[index].times[1].begintime;
				let d = this.weeks[index].times[1].endtime;
				checked = this.checkedTime(a,b,c,d);
			}
			else if(len==3){
				let aa = this.weeks[index].times[0].begintime;
				let bb = this.weeks[index].times[0].endtime;
				let cc = this.weeks[index].times[1].begintime;
				let dd = this.weeks[index].times[1].endtime;
				let ee = this.weeks[index].times[2].begintime;
				let ff = this.weeks[index].times[2].endtime;
				checked = (this.checkedTime(aa,bb,cc,dd) || this.checkedTime(aa,bb,ee,ff) || this.checkedTime(cc,dd,ee,ff))
			}
			if(checked){
				this.$message({
					type:'error',
					message:'您选择的时间段有交叉'
				})
				type=='0'?this.weeks[index].times[i].begintime ='':this.weeks[index].times[i].endtime =''
				return
			}
		},
		checkedTime(st1, end1, st2, end2){
	    		if(st1 >= st2 && st1 < end2){
	    			return true;
	    		}else if(end1 > st2 && end1 <= end2){
	    			return true;
	    		}else if(st2 >= st1 && st2 < end1){
	    			return true;
	    		}else if(end2 > st1 && end2 <= end1){
	    			return true;
	    		}
	    		return false;
	    	},
		
		peraidChange(item){
			if(item.model != '' && this.form.use_cycle.indexOf(item.id)==-1){
				this.form.use_cycle.push(item.id);
		    }
		},
		addTimes(time,index){
           	if(this.weeks[index].times.length==3){
           		this.$message({
           			type:'error',
           			message:'最多添加三个时段!'
           		})
           		return;
           	}
             let len = this.weeks[index].times.length;
             let checked = false
             this.weeks[index].times.map((time,i)=>{
             	if(time.endtime== '' || time.begintime==''){
             		checked =true
             	}
             })
             if(checked){
             	this.$message({
           			type:'error',
           			message:'请选择时间!'
           		})
           		return;
             }
           	this.weeks[index].times.push({
				begintime: '',
				endtime: '',
			});
        },
		removeTimes(time,index,i){
			this.weeks[index].times.splice(i, 1)
        },
		//使用时段复选框发生变化时 触发
		timeCheckChange(event){
		let index = this.weeks.indexOf(this.weeks.filter(item=>item.id==event.target.value)[0])

		event.target.checked?this.weeks[index].model = '1':this.weeks[index].model = ''
		},
	    loadQudao(){
			getHuiyuanQudao().then((response) => {
				this.tfqdData = response;
				//只取微店  2017-11-21
			    this.tfqdData = this.tfqdData.filter(item=>item.text == '微店');
			    this.form.chanels.push(this.tfqdData[0].id);
			})
		},
		loadFindAttentionGift(){//获取已有活动列表
			getdtdlist().then((response) => {
				this.acitivities =  response.data;
			})
		},
		getYouHuiQuan:function(indexs,index){//选择优惠券弹出框  
			this.index = index;
			this.indexs = indexs;
			this.dialogSelectYouhuiQuan = true;			
			if(this.yhqAllData.length==0){
				let data = "syn_status=1"
				getYouHuiQuan(data).then((response) => {
					this.yhqAllData = response;//所有优惠券
					this.yhqFiterData = this.yhqAllData;
				});
			}			
		},
		deleteYhq(items) {
			items.coupon_id = 0;
			items.coupon_name = '';
		},
		viewYouhuiQuan:function(id){//查看单个优惠券
			this.dialogViewYouhuiQuan = true;
		    getYouHuiQuanOne(id).then((response) => {
					this.yhqOneData = response;
				let obj = {};
				
				obj.face_value = this.yhqOneData.face_value;
				obj.bill_limit_num = this.yhqOneData.bill_limit_num;
				obj.activity_subject = this.yhqOneData.activity_subject;
				obj.used_other = this.yhqOneData.used_other;
				obj.start_coupon = this.yhqOneData.start_coupon;
				obj.validity_type = this.yhqOneData.validity_type;
				obj.with_discount = this.yhqOneData.with_discount;
				
				obj.end_coupon = this.yhqOneData.end_coupon;
				obj.class_id = this.yhqOneData.class_id;
				obj.times_period = this.yhqOneData.times;
				
				obj.use_cycle = this.yhqOneData.use_cycle;
				obj.bill_limit_money = this.yhqOneData.bill_limit_money;
				obj.class_type_name = "";
				obj.reward_coupon = this.yhqOneData.reward_coupon;
				obj.validity_days = this.yhqOneData.validity_days;
				
				obj.coupons_pro = this.yhqOneData.coupons_pro;
				
				//改造两个前端页面需要的信息 周期和门店
				//1,门店名称
				let storesname = this.yhqOneData.store_ids;
				let storeidsname = [];
				storesname.forEach(item=>{
					storeidsname.push(item.org_full_name);
				})
				let storeids_strname = storeidsname.join(",")
				obj.store_names = storeids_strname;
				//2,周期
				let use_cycle_names = this.yhqOneData.use_cycle.split(",");
				let use_cycle_names_new =[];
				use_cycle_names.forEach(item=>{
					if(item=="2"){
						use_cycle_names_new.push("周一");
					}else if(item=="3"){
						use_cycle_names_new.push("周二");
					}else if(item=="4"){
						use_cycle_names_new.push("周三");
					}else if(item=="5"){
						use_cycle_names_new.push("周四");
					}else if(item=="6"){
						use_cycle_names_new.push("周五");
					}else if(item=="7"){
						use_cycle_names_new.push("周六");
					}else if(item=="1"){
						use_cycle_names_new.push("周日");
					}
				})
				let cycle_names = use_cycle_names_new.join(",")
				obj.cycle_names = cycle_names;
				
				//3,改造使用渠道
				let chanels = this.yhqOneData.use_chanel;
				let chanelids = [];
				chanels.forEach(item=>{
					chanelids.push(item.chanel_name);
				})
				let chanelids_str = chanelids.join(",")
				obj.use_chanel = chanelids_str;
				
				this.yhqOneData =obj;
			});
		},



		youhuiquanQueding:function(){//选择优惠券，单给优惠券的详细信息绑定到相应的对象上	
			this.dialogSelectYouhuiQuan = false;		
			this.yhqCheckedDataEditAdd = [];
			this.dealfindAllCoupons(this.yhqCheckedData,"add");
			this.grouplist[this.indexs].playerlist[this.index].coupon_name = this.radio.text;
			this.grouplist[this.indexs].playerlist[this.index].coupon_id = this.radio.id;
			this.grouplist[this.indexs].playerlist[this.index].face_value = this.radio.face_value;
			this.isclass = true;
		},
		dealfindAllCoupons(arrays_temp,type){
			let object = {};
			arrays_temp.forEach(item =>{
				let id = 0;
				if(type=="add"){
					id = item.id;
				}else{
					id = item.class_id;
				}
				if(id!=null){
					getYouHuiQuanOne(id).then((response) => {
					 	this.yhqOneData = response;
					/*	this.yhqOneData = response.data;
						item.tl =this.yhqOneData;
						arrays.push(item);
					})*/
					/*let url = "";
					if(id==9){
						url = 'http://localhost:9280/static/youhuiquan_two.json'
					}
					if(id==3){
						url = 'http://localhost:9280/static/youhuiquan_one.json'
					}
					
					axios.get(url).then((response) => {
				       this.yhqOneData = response.data;*/
						let obj = {};
						obj.face_value = this.yhqOneData.face_value;
						obj.bill_limit_num = this.yhqOneData.bill_limit_num;
						
						obj.activity_subject = this.yhqOneData.activity_subject;
						obj.used_other = this.yhqOneData.used_other;
						obj.start_coupon = this.yhqOneData.start_coupon;
						obj.validity_type = this.yhqOneData.validity_type;
						obj.with_discount = this.yhqOneData.with_discount;
						
						obj.end_coupon = this.yhqOneData.end_coupon;
						obj.class_id = this.yhqOneData.class_id;
						
						//改造时间
						//obj.times_period = this.yhqOneData.times;
						
						let times_period =[];
						if(this.yhqOneData.times != undefined){
							this.yhqOneData.times.forEach(item2=>{
								let temp ={};
								temp.begintime = item2.begintime;
								temp.endtime = item2.endtime;
								times_period.push(item2);
							})
							obj.times_period = times_period;
						}
						
						//改造使用门店
						let stores = this.yhqOneData.store_ids;
						let storeids = [];
						stores.forEach(item3=>{
							storeids.push(item3.store_id);
						})
						let storeids_str = storeids.join(",")
						obj.store_ids = storeids_str;
						
						//改造使用渠道
						let chanels = this.yhqOneData.use_chanel;
						let chanelids = [];
						chanels.forEach(item4=>{
							chanelids.push(item4.chanel);
						})
						let chanelids_str = chanelids.join(",")
						obj.use_chanel = chanelids_str;
						
						obj.use_cycle = this.yhqOneData.use_cycle;
						obj.bill_limit_money = this.yhqOneData.bill_limit_money;
						obj.class_type_name = "";
						obj.reward_coupon = 0;
						obj.validity_days = this.yhqOneData.validity_days;
						
						item.tl =obj;
						item.id = this.yhqOneData .class_id;
			  			item.face_value = this.yhqOneData.face_value;
			  			item.coupons_pro = this.yhqOneData.coupons_pro;
			  			item.reward_coupon = item.reward_coupon;
						this.yhqCheckedDataEditAdd.push(item);
					});
				}
		    });
		    this.yhqCheckedData = this.yhqCheckedDataEditAdd;
		},

      open() {
        this.$router.push("/marketing/activitymanagement");
      },
      handleClose(done) {
        done();
      },
      handleCopyClose(done) {
        done();
      },
      handleSelectYouhuiQuanClose(done) {
        done();
      }
      ,
      handleAddYouhuiQuanClose(done) {
        done();
      }
      ,
      handleViewYouhuiQuanClose(done) {
        done();
      },
      handleMendianClose(done) {
        done();
      },
	 handleQuntiClose(done) {
        done();
     },
     scrollfun1(){
	   		this.scroll1 = false;
	 },



  	//删除所选项
  	deleteItem:function(items,it,str,e){
        let arrays = [];
        items.forEach(item =>{//把当前的对象在 对象数组中删除
        	if(item.id != it.id){
        		arrays.push(item);
        	}
		});
		if(str=="mendian"){//判断是门店，把相应的门店树复选框置为false
			this.nodes_temp = arrays;
			//门店树绑定
			this.nodes.forEach(item =>{
				if(item.id == it.id){
					this.nodes.shift(item);
					this.totalcount = this.totalcount-1;
					this.$refs.tree2.setChecked(item.id,false,false);
				}
		  	});
		}else if(str=="qunti"){//判断是群体，
			this.hyqt_select_data = arrays;
           
		    this.hyqt_select_data_temp.forEach(row => {
		      	if(row.id == it.id){//当前删除数据所在的表格所在行的复选框  取消打勾
		      	   	this.$refs.mytable.toggleRowSelection(row,false);
		      	}
		    });
		    this.count = 0;
		    this.hyqt_select_data.forEach(row => {//统计人数
		      	 this.count = this.count + row.members_count;
		    });
		}
		else if(str=="yhq"){//判断是优惠券，
			this.yhqCheckedData = arrays;
		}
  	 },
	
	searchYouHuiQuan:function(){//优惠券筛选  通过优惠券的名称筛选
		
 		if(this.searchText != null && this.searchText !=""){
 			this.yhqFiterData=[];
 			this.yhqAllData.forEach(item =>{
 				let name = item.text;
	        	if(name.indexOf(this.searchText)>=0){
			        this.yhqFiterData.push(item);
			    }
	        });
 		}else{
	        this.yhqFiterData = this.yhqAllData;
 		}
	},
	 //活动门店 开始
	storeMakeSureChecked(){
    	this.storeNodes_template = this.storeNodes;
    	this.storeDialogVisible = false;
	},
	storeBoxChange(nodes,total){
      	this.storeNodes = nodes;
      	this.storeTotal = total;
	},
	deleteStore(store,index){
		this.storeNodes_template.splice(index, 1);
	},
	updateFormData(id,activity_type){//回显
		this.loading1 = true;
		this.activityId = id;
		let query = 'id='+this.activityId+'&activity_type='+activity_type;		
		  findEvalgiftActivityDetail(query).then(response=>{//回显数据
			let detail = response;
			this.loading1 = false;
			/* form 表单回显数据*/			
			this.form.subject = detail.subject;//主题  
     		this.form.start_time = Assist.formatStrToDate(detail.start_time);//开始时间
			this.form.end_time = Assist.formatStrToDate(detail.end_time);//结束时间 
			this.form.congratulationsWord = detail.congratulations;//恭喜语
			this.form.shareTitle = detail.share_title;//分享标题
			this.form.shareDescribe = detail.share_content;//分享描述
			this.form.advertisementWord = detail.advertising_language;//广告语
			this.form.mostMember = String(detail.max_number);//最多人数	
			this.form.leastMember = String(detail.min_number);//最少人数
			this.form.gameTime = String(detail.game_length);//游戏时长
			this.grouplist = detail.giftlist;//游戏赠礼
			this.grouplist[0].playerlist.forEach(item=> {
				if(item.coupon_name == null) {
					item.coupon_name = '';
				}
			});
			this.editableTabsValue2 = detail.giftlist[0].name;
			this.titleAndMessage = detail.messagelist;//称号及留言
			this.guest = detail.guestlist;//神秘嘉宾
			this.form.ruletextarea = detail.game_rules;//游戏规则
			

			if(detail.reward_credit>0){
			  //赠送积分
			  this.form.hdzl.push('赠积分');
			  this.form.reward_credit = detail.reward_credit;
			}	
			//门店回显
			this.storeNodes = [];
			this.storeNodes_template = [];
			this.storeTotal = detail.stroes.length;
			detail.stroes.forEach(item => {
				let obj_temp = {};
				obj_temp.id = item.store_id;
				obj_temp.label = item.org_full_name;
				obj_temp.plabels = item.parent_name;
				this.storeNodes.push(obj_temp);
				this.storeNodes_template.push(obj_temp);
				this.storeCheckedIds.push(item.store_id); //门店回显ids
			});
			
		    /*渠道回显*/
			detail.chanels.map((item,index)=>{
				this.form.chanels.push(item.chanel);
			});	
			/* 处理券的使用时段*/
			this.form.use_cycle = new Array();
			detail.intervallist.map((item,index)=>{
				this.form.use_cycle.push(item.week+'');
				this.weeks.map(week=>{
					if(week.id == item.week+''){
						week.model = item.ifallday; 
						week.times = item.timelist;
						if(item.ifallday == '1') {
							week.times.push(
								{
									begintime: '',
									endtime: ''
								}
							)
						}						
					}
				})
			});		
			// this.form.use_cycle = new Array();
			// response.usePeriod.map((item,index)=>{
			// 	if(item.times){
			// 		item.times.map(tt=>{
			// 			(tt.endtime == '23:59') &&(tt.endtime='24:00')
			// 		})
			// 	}
			// 	this.form.use_cycle.push(item.week+'');
			// 	this.weeks.map(week=>{
			// 		if(week.id == item.week+''){
			// 			if(item.ifallday=='0'){
			// 				week.times = item.timelist;
			// 			}
			// 			week.model = item.ifallday;
			// 		}
			// 	})
			// });	
		})
		.catch((res) => {
			this.loading1 = false;
			this.$message({
				type: 'error',
				message: res.msg
			});
		});
	 }
  	 
    },
	created() {//下面的是boss 请求地址
            this.loadTree();
            this.loadFindAttentionGift();//已创建的大逃单活动列表
			this.loadQudao();//会员群体渠道
			if(this.$route.query.id!=undefined&&this.$route.query.activity_type!=undefined){
				this.updateFormData(this.$route.query.id,this.$route.query.activity_type);	
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
/**修改表单的样式**/
 .dtd_game .divOne{
 	height:250px;
 	background: #FFFFFF;
	border: 1px solid #EAF1F6;
 	margin-left:15px;
 }
/**************优惠券详情 开始*******************/
 .dtd_game .viewyhq_dialog{
	width:440px;
	/*height:230px;*/
}
 .dtd_game .viewyhq_dialog .el-dialog__header{
	border:none;
	height:0px;
}

/**************优惠券详情 结束*******************/
 

//  游戏时段设置
.dtd_game {
.el-checkbox-group{
	margin-left: 25px;
	.checkboxdiv{
		margin-left: 15px;
		.weektimes{
			height:auto;
			padding-top: 6px;
			padding-bottom: 6px;
			background: #F5F9FB;
			border-radius: 3px;
			.everyweektimes{
				height: 44px;
				line-height: 44px;
				position:relative;
				.imgbody {
					position: absolute;
					left:230px;
					top:6px;
					img {
						width: 22px;
						height: 22px;
					}
				}
			}
		}
	}
}
}

//------------------------------------------------------------游戏赠礼样式
 .dtd_game .addRule {
	position: absolute;
    right: 20px;
    cursor: pointer;
    color: #20a0ff;
    z-index: 99;
}
 .dtd_game {
	.gameGift {
		min-width: 100%;
		min-height: 400px;
		// background-color: #F2F2F2;
		// display: inline-block;
		.zengquanRule {
			margin: 10px 0;
			p {
				padding: 5px 0;
				font-size: 14px;
				span {
					font-size: 14px;
					color: #f5536f;
				}
				em {
					font-size: 14px;
					color: rgb(154, 171, 184);
				}
			}
	}
	.giftcontent {
		overflow: hidden;
		margin-bottom: 16px;	
		.tianjiaRule {
			position: absolute;
			top: 0px;
			left: 500px;
		}
		.yhqxz {
			// width: 200px;
			float: left;
			.xuanzeyhq {
				list-style: none;
				margin: 0;
				padding: 0;
				li {
					background-color: #fff;
					border: 1px solid #D8E5EC;
					border-radius: 3px;
					width:auto;
					margin-right:18px;
					float:left;
					line-height: 32px;
					em {
						margin-left:8px;
					}
					img {
						margin-left:5px;
						margin-right:8px;
					}
				}
			}
		}	
		.addyouhuiquan {
			margin-left: 20px;
			float: left;
			.tianjia {
				float: left;
				color: #0C9AFF;
				&:hover {
					cursor: pointer;
				}
			}
			
		}
	}
}
}

// -----------------------------------------------------------留言样式
 .dtd_game {
.liuyanBox {
	width: 85%;
    // border: 1px solid red;
    // height: 250px;
    margin-left: 125px;
	.liuyanBox1 {
		width: 100%;
		height: 32px;
		margin-bottom: 16px;
		.liuyanBox1_1 {
			height: 32px;
			float: left;
			margin-right: 10px;
		}		
	}
}
}

//------------------------------------------------------神秘嘉宾样式
 .dtd_game {
.shenmijiabin {
	// width: 500px;
	// height: 400px;
	margin-left: 125px;
	.jiabin {
		width: 96%;
		padding-right: 20px;
		height: 170px;
		// margin-bottom: 2px; 
		background-color: #F5F9FB;
		border-bottom: 1px dashed #E7EDF1;
		.imgBox {
			width:120px;
			height: 170px;
			position: relative;
			float: left;
			overflow: hidden;
			.jiabinImg {
				position: absolute;
				left: 50%;
				top: 50%;
				margin-top: -35px;
				margin-left: -35px;
				width: 70px;
				height: 70px;
				border-radius: 50%;
				// background-color: red;
			}
		}
		.jiabinInfo {
			padding: 20px 0;
			float: left;
			width: 400px;
			height: 170px;
			// overflow: hidden;
			// background-color: #eee;
			.jiabinInfoIpt {
				margin-bottom: 16px;
				// margin-left:-30px;
				height: 32px;
				.hdzq_date_em {
					em {
						line-height: 32px;
					}
				}
			}
		}
	}
}
}
.dtd_game .shenmijiabin .jiabin:last-child {
	border-bottom: none;
}
.dtd_game .shenmijiabin .jiabin .jiabinInfo .hdzq_date2 .el-input .el-input__inner {
	text-align: left!important;
}

// --------------------------------------------------游戏规则样式
 .dtd_game .editor {
	min-width: 600px;
    margin-left: 30px;
    margin-right: 40px;
 }

/**************新增优惠券 开始*******************/
 .dtd_game .addyhq_dialog{
	width:460px;
	height:320px;
}
 .dtd_game .addyhq{
	margin: 0 auto;
    margin-top: 20px
}
 .dtd_game .addyhq img{
	margin-left: 180px;
	width:100px;
	height:100px;
}

 .dtd_game .addyhq cite{
	display: block;
    font-style: normal;
    margin-left: 122px;
    margin-top: 10px;
    font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #9FACB9;
	letter-spacing: 0;
	line-height: 14px;
}
 .dtd_game .addyhq_add{
	margin-top: 31px;
    margin-left: 181px;
}

/**************新增优惠券 结束*******************/ 

 /*****选择优惠券 开始*******/
 .dtd_game .gamexzyhq_dialog{
	width:660px;
	height:500px;
}
 .dtd_game .gamexzyhq_dialog .el-dialog_body{
	width:660px;
	height:500px;
	padding:20px 12px;
}
 .dtd_game .xzyhq_close .bottom_64_32 .queding {
    margin-left: 10px;
    margin-right: 0px;
}
 .dtd_game .gamexzyhq_dialog .xzyhq{
	height:397px;
}
.dtd_game .gamexzyhq_dialog .xzyhq_close{
	width:660px;
	height:60px;
	background: #F4F9FC;
	box-shadow: 0 0 4px 0 rgba(44,70,128,0.16);
}
.dtd_game .gamexzyhq_dialog .xzyhq_close .bottom_64_32{
	margin-top:14px;
	margin-left:259px;
} 
.dtd_game .xzyhq {
	padding:0px;
}
.dtd_game .xzyhq .xzyhq_search{
	height:34px;
	padding-top: 20px;
    padding-left: 20px;
    cursor:pointer;
}
.dtd_game .xzyhq .xzyhq_search .el-input{
	float:left;
	width:180px;
}
.dtd_game .xzyhq .xzyhq_search .el-input__inner{
	height:28px;
	width:180px;
}
.dtd_game .xzyhq .xzyhq_search h1{
	font-size:12px;
	line-height: 12px;
	font-size: 12px;
	color: #0C9AFF;
	letter-spacing: 0;
	float:left;
	margin-left:12px;
	font-weight: normal;
	margin-top: 7px;
}
.dtd_game .xzyhq .xzyhq_show{
	clear:both;
	display:block;
    height:352px;
    padding-left: 12px;
    padding-top: 9px;
}
.dtd_game .xzyhq .xzyhq_show ul{
	margin:0;
	padding:0;
	list-style: none;
}
.dtd_game .xzyhq .xzyhq_show ul li{
	float:left;
	width:315px;
	height:110px;
	background-image: url(../../assets/huodong/yhjbg.png);
	background-size: 100%;
}
.dtd_game .xzyhq .xzyhq_show ul li:hover{
	float:left;
	width:315px;
	height:110px;
	background-image: url(../../assets/huodong/yhjbg.png) 0 50%;
	background-size: 100%;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_left{
	float:left;
	margin-left:26px;
	margin-top:32px;
	width:88px;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_up cite{
	display:block;
	float:left;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #FF6161;
	line-height: 14px;
	font-style: normal;
	margin-top:12px;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_up tt{
	display:block;
	font-family: PingFangSC-Regular;
	font-size: 30px;
	color: #FF6161;
	line-height: 30px;
	margin-left:4px;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_down{
	margin-top:4px;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_left .xzyhq_show_left_down em{
	clear: both;
	font-style: normal;
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #576D7A;
	line-height: 12px;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right{
	padding-left:100px;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left{
	float:left;
	float: left;
    margin-top: 30px;
    margin-left: 10px;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left cite{
	font-family: PingFangSC-Regular;
	font-size: 18px;
	color: #34495E;
	line-height: 18px;
	width:150px;
	display:block;
	font-style: normal;
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
	
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_left em{
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #9AABB8;
	line-height: 12px;
	display:block;
	font-style: normal;
	margin-top:16px;
}

.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right{
    float: left;
    margin-top: 40px;
    margin-left: 0px;
    width: 20px;
    height: 20px;
}

.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right .el-radio__inner{
	width: 20px;
    height: 20px;
    border-radius: 10px;
}
.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right .el-radio__input {
	width: 20px;
	height: 20px;
}

.dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right .el-radio__input .is-checked .el-radio__inner {
    background: #0c9aff;
    border: 1px solid #20a0ff;
    width: 20px;
    height: 20px;
    border-radius: 10px;
}
 .dtd_game .xzyhq .xzyhq_show ul li .xzyhq_show_right .xzyhq_show_right_right .el-radio__inner::after {
    height: 10px;
    left: 9px;
    top: 9px;
    width: 10px;
}
.dtd_game .xzyhq .xzyhq_show .el-radio-group .el-radio__label {
	display: none;
}
/*****选择优惠券 结束*******/
 

 /**消费后评价赠礼页面**/
  .dtd_game .divTwo_gzzl{
 	height:auto;;
 	background: #FFFFFF;
	border: 1px solid #EAF1F6;
 	margin-left:15px;
 	margin-top:10px;
 	display:table;
 	width:100%;
 }
.dtd_game .divTwo_gzzl h1{
 	height: 50px;
    line-height: 50px;
    display: block;
    border-bottom: 1px solid #eaf1f6;
    margin-left: 20px;
    margin-right: 32px;
    font-size: 16px;
    font-style: normal;
    color: #34495E;
    font-weight: normal;
 }
 .dtd_game .divTwo_gzzl h1 cite{
 	margin-left: 16px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9aabb8;
    letter-spacing: 0;
    line-height: 16px;
    font-style: normal;
 }
  .dtd_game .divTwo_gzzl h1 em{
 	margin-left: 10px;
 	font-style:normal;
 	font-size:16px;
 	letter-spacing: 0;
 }
 .dtd_game .divTwo_gzzl h2 cite{
 	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #9AABB8;
	letter-spacing: 0;
	line-height: 32px;
	font-style:normal;
 }
.dtd_game .divTwo_gzzl h2 img{
	width: 16px;
	height: 16px;
	margin: 8px 0 -2px 16px;
}
 .dtd_game .divTwo_gzzl .demo-ruleForm .hdzq_date1{
	float:left;
}
.dtd_game .divTwo_gzzl .demo-ruleForm .hdzq_date1 .el-select .el-input__inner{
	text-align: left;
	padding-right:25px!important;
}
.dtd_game .divTwo_gzzl .demo-ruleForm .hdzq_date2 .el-input .el-input__inner{
	text-align: left;
	// padding-right:25px!important;
}
 .dtd_game .divTwo_gzzl .demo-ruleForm .hdzq_date_em{
	float:left;
	margin-left:5px;
	margin-right:5px;
	font-style:normal;	
}
 .dtd_game .divTwo_gzzl .demo-ruleForm .hdzq_date_em em{
	font-style:normal;
}
 .dtd_game .divTwo_gzzl .demo-ruleForm .hdzq_date2{
	float:left;
}
.dtd_game .divTwo_gzzl .demo-ruleForm .hdzq_date2 .el-select .el-input__inner{
	text-align: left;
	padding-right:25px!important;
}

 
 /******表单样式 开始******/
 .dtd_game .divTwo_gzzl .el-form{
	margin-top:30px;
}


 .dtd_game .divTwo_gzzl .el-date-editor .el-date-editor--date{
	width:230px;
}
/***活动赠礼***/
 .dtd_game .gzzl_hdzl .hdzl{
	margin-left:0px;
	margin-right:40px;
	padding-left:82px;
	background: #F5F9FB;
	border-radius: 3px;
	margin-top: 2px;
}
 .dtd_game .gzzl_hdzl .hdzl .zengquanshezhi{
	font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #576D7A;
    line-height: 14px;
    height: 40px;
    width: 70px;
    padding-top: 26px;
    float:left;
}
 .dtd_game .gzzl_hdzl .hdzl ul{
	float:left;
	margin:0;
	padding:0;
	list-style: none;
	padding-top: 5px;
	/*margin-left:14px;*/
}
 .dtd_game .gzzl_hdzl .hdzl ul li{
	line-height: 14px;
	margin-top:13px;
	height: 20px;
}
 .dtd_game .gzzl_hdzl .hdzl ul li em{
	 display: block;
    float: left;
    margin-top: 8px;
	font-style: normal;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
	line-height: 14px;
	font-style: normal;
}
 .dtd_game .gzzl_hdzl .hdzl ul li em:nth-child(3){
	margin-left: 2px;
    width: 89px;
}
 .dtd_game .gzzl_hdzl .hdzl ul li img{
	display: block;
    float: left;
    margin-top: 8px;
}
 .dtd_game .gzzl_hdzl .hdzl .el-input{
	width: 120px;
    display: block;
    float: left;
}
    
 .dtd_game .gzzl_hdzl .hdzl .addyouhuiquan{
	clear: both;
	overflow: hidden;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #0C9AFF;
    line-height: 14px;
    padding-top: 15px;
    background: #F5F9FB;
    border-radius: 3px;
    width:120px;
}
 .dtd_game .gzzl_hdzl .hdzl .addyouhuiquan img{
	float:left;
	display: block;
	margin-bottom:21px;
	margin-top: 1px;
}
 .dtd_game .gzzl_hdzl .hdzl .addyouhuiquan .tianjia{
	width:100px;
	float:left;
	margin-bottom:20px;
	margin-left: 3px;
	cursor:pointer;
}
 .dtd_game .gzzl_hdzl .hdzl .yhq{
	margin-left: 50px;
}
 .dtd_game .gzzl_hdzl .hdzl .view{
	margin-left: 10px;
}
 .dtd_game .gzzl_hdzl .hdzl .delete{
	margin-left: 10px;
}
 .dtd_game .input_height_28 .el-input__inner{
	height:28px;
	line-height: 28px;
}
/**每人赠送**/
 .dtd_game .hdzl2{
	margin-left:0px;
	margin-right:40px;
	padding-left:90px;
	background: #F5F9FB;
	border-radius: 3px;
	height:50px;
}
 .dtd_game .hdzl2 .meirenzengsong{
	padding-top:11px;
	margin-bottom:11px;
}
 .dtd_game .hdzl2 .meirenzengsong cite{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
	font-style: normal;
	margin-right:27px;
}
 .dtd_game .hdzl2 .meirenzengsong .el-input__inner{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
}
 .dtd_game .hdzl2 .meirenzengsong em{
	margin-left:10px;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #34495E;
	font-style: normal;
}
/**选择门店 and 选择群体**/
 .dtd_game .divTwo_gzzl .botton_text{
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #0C9AFF;
	line-height: 16px;
	margin-left:14px;
	font-style: normal;
}

 .dtd_game .divTwo_gzzl .quxiao_and_tijiao{
	height:82px;
	margin-left:40px;
	margin-right:40px;
	border-top: 1px dashed #EAF1F6;
}

 .dtd_game .quxiao_and_tijiao .bottom_64_32{
	margin-left:91px;
	margin-top:30px;
	margin-bottom: 20px;
}
 .dtd_game .divTwo_gzzl .xuanze{
 	list-style: none;
 	margin: 0;
    padding: 0;
    margin-top: 7px;
    padding-left: 40px;
}
 .dtd_game .divTwo_gzzl .xuanze li{
	border: 1px solid #D8E5EC;
	border-radius: 3px;
	width:auto;
	margin-right:18px;
	float:left;
	line-height: 32px;
	margin-bottom: 7px;
}
 .dtd_game .divTwo_gzzl .xuanze li em{
	margin-left:8px;
}
 .dtd_game .divTwo_gzzl .xuanze li img{
	margin-left:5px;
	margin-right:8px;
}
 .dtd_game .meirenzengsong .el-input__inner{
	height:28px;
}
 .dtd_game .divTwo_gzzl .cyqt_person_num{
	background: #FFFAEB;
	border: 1px solid #FFE9A7;
	border-radius: 3px;
	height:32px;
	width:309px;
	padding-left:8px;
	margin-left: 40px;
}
 .dtd_game .divTwo_gzzl .cyqt_person_num h1,.cyqt_person_num tt, .cyqt_person_num cite{
	letter-spacing: 0;
	float:left;
	line-height:32px;
}
 .dtd_game .divTwo_gzzl .cyqt_person_num tt{
	color: #FF7171;
}
 .dtd_game .divTwo_gzzl .cyqt_person_num h1{
	border: none;
	font-size: 14px;
	margin-left: 0px;
	margin-right:0px;
}
 .dtd_game .input_height_28{
	height:10px;
	background-image:url(../../assets/huodong/zhang.jpg) no-repeat;
}

/***确认提交框**/
 .dtd_game .divTwo_gzzl .querenbox{
	height:360px;
	width:200px;
	background:red;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
	border-radius: 3px;
    position: absolute;
    z-index: 10000px;	
}

.dtd_game .gamexzyhq_dialog .xzyhq_show ul{
	height:332px;
	overflow-y:auto;
}
.dtd_game .divTwo_gzzl .el-form .el-form-item__error{
	margin-left: 40px;
}
.dtd_game .divTwo_gzzl .el-form .el-form-item .el-form-item .el-form-item__error{
	margin-left: 0px;
}
.dtd_game .divTwo_gzzl .yhq_hdzl .el-form-item__content{
	margin-left:20px !important;
}
.dtd_game .divTwo_gzzl .yhq_hdzl .el-form-item__error{
	margin-left:82px !important;
}
.dtd_game .divTwo_gzzl .yhq_hdzl .el-form-item__label:nth-child(n+2){
	width:22px !important;
}
.dtd_game .mynumber .el-input__inner{
	text-align: right;
}
.dtd_game .divTwo_gzzl h2{
	margin-top:16px;
	margin-left:20px;
	margin-right: 32px;
	background: #FFFCF2;
	border: 1px solid #FFE0A6;
	border-radius: 3px;
	
}
.dtd_game .divTwo_gzzl h2 strong{
	display:block;
	font-size: 13px;
	color: #576D7A;
	line-height: 13px;
	margin-left:12px;
	margin-bottom:6px;
	padding-top:10px;
}
.dtd_game .divTwo_gzzl h2 strong em{
	font-size: 13px;
	color: #34495E;
	letter-spacing: 0;
	line-height: 13px;
	padding-left:10px;
}

.dtd_game .divTwo_gzzl h2 ul{
	margin-left:12px;
	margin-bottom:10px;
	padding-top: 6px;
}
.dtd_game .divTwo_gzzl h2 ul li{
	margin-top:8px;
	font-size: 12px;
	color: #576D7A;
	line-height: 12px;
}

/*******关注赠礼得活动赠礼 提醒时间*********/
.dtd_game .divTwo_gzzl .gzzl_hdzl .txsj{
	background: #F5F9FB;
    border-radius: 3px;
    height: 50px;
    padding-top:15px;
    margin-right: 40px;
}
.dtd_game .divTwo_gzzl .gzzl_hdzl .txsj .el-radio__label{
	color: #243546;
}
.dtd_game .divTwo_gzzl .gzzl_hdzl .txsj cite{
	color: #9AABB8;
}
.dtd_game .divTwo_gzzl .gzzl_hdzl .txsj .el-radio{
	margin-left:92px;
}
.dtd_game .divTwo_gzzl .gzzl_hdzl .el-form-item:nth-child(n+1) .el-form-item__content{
	line-height:20px;
}
.dtd_game .divTwo_gzzl .yhq_hdzl .el-form-item__error{
	position: relative;
	padding-left:20px;
	padding-top:0px;
}

.dtd_game .divTwo_gzzl .gzzl_tfqd .el-checkbox-group{
	display:block;
	margin-right: 40px;
    margin-left: 25px;
}
.dtd_game .divTwo_gzzl .gzzl_tfqd .checkAll{
	float: left;
    margin-right: 5px;
}
/***********会员群体**************/

.dtd_game .class-no{
	display:none;
}
.dtd_game .class-yes{
	display:block;
}
/*************************mendian 结束 ***********************/


/**************************规则*******************************/
.gameMain .el-form-item__content{
	background: #F5F9FB;
	margin-right: 40px;
	position: relative;
}
.gameMain .el-tabs__nav-scroll{
	margin-left: 0;
	margin-right: 0;
}
.gameMain .giftcontent .el-form-item__content{
	margin-right: 0;
}
.gameMain .el-tabs__header{
	background: #fff !important;
	margin: 0;
}
.gameGift .el-tabs--card>.el-tabs__header .el-tabs__item .el-tabs__nav{
	height: 32px;
	line-height: 32px;
}
.gameGift .el-tabs__nav .el-tabs__item{
	width: 76px;
	height: 34px;
	line-height: 34px;
	text-align: center;
	border: 1px solid #E4ECF1 !important;
	border-bottom: none !important;
	border-radius: 4px;
	color: #34495E;
	background: #F5F9FB !important;
	margin-bottom: 0;
}
.gameGift .el-tabs__nav .el-tabs__item:nth-of-type(1){
	margin-left: 0;
}
.gameGift .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{
	color: #34495E !important;
	background: #fff !important;
}
.gameGift .dtd_game .divTwo_gzzl .demo-ruleForm .hdzq_date_em {
	text-align: right;
}
.gameGift .el-tabs__content{
	padding: 20px;
}

/*门店*/
.dtd_game{
	.dishDiv{
	    position: relative;
	    margin-left: 30px;
		.showDishMessage{
			display: relative;
			float:left;
			border:1px solid #D8E5EC;
			height: 28px;
			line-height: 28px;
		    border-radius: 3px;
		    margin-right: 16px;
		    margin-bottom: 7px;
		}
		.checkdish{
			display: relative;
			height: 28px;
			line-height: 28px;
			color: #0C9AFF;
			font-size: 14px;
			cursor: pointer;
			float:left;
		}
	}
}
</style>