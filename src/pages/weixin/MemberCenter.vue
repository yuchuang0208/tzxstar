<template>
	<div class="membercenter"  v-loading.body="showLoading">
		<div class="mebercenter-main">
			<el-tabs  v-model="activeName" @tab-click="selectChange">
				<el-tab-pane label="会员中心首页配置" name="firstPage" class="firstPage" >
                 <div class="set-body">
                 	<div class="set-body-left">
                 		<img class="phone" src="~@/assets/wx_themes_settings/iphone.png" />
                 		<div class="phone-body">
                 			<div class="phone-header">
                 				<img class="phone-header-card" src="~@/assets/membercenter.png" />
                 				<div class="phone-header-card-info">
                 					<div class="phone-header-card-top">
                 						<img   v-if="form.shop_logo.value" class="phone-header-card-img"  src="~@/assets/dalaoban.png" />
                 					    <span :style="{color:colorSelect.CenterShopName}" v-if="form.shop_name.value" class="phone-header-card-name">DQ冰雪皇后</span>
                 					     <i   class="el-icon-erweima" :style="{color:colorSelect.CenterPayCode,height:'20px',float:'right',marginRight:'100px'}"></i>
                 					</div>
                 					<div class="phone-header-card-bottom">
                 						 <i :style="{color:colorSelect.CenterMemberLevel}" v-if="form.member_rule.value" class="el-icon-information phone-header-card-rule"></i>
                 						 <i :style="{color:colorSelect.CenterMemberLevel}"  class="el-icon-star-on phone-header-card-level"></i>
                 						 <span :style="{color:colorSelect.CenterMemberLevel}" v-if="form.member_rank.value" class="phone-header-card-level">普通会员</span>
                 						 <span :style="{color:colorSelect.CenterMemberNumber}" v-if="form.member_no.value" class="phone-header-card-number">NO.6789898878</span>
                 					</div>
                 				</div>
                 			</div>
                 			<div class="phone-list">
                 				<ul style="overflow:hidden;">
                 					<li>
                 						<img class=" icon" src="~@/assets/membercenter/balance.svg" />
                 						<span>{{form.center_balance.word_name}}</span><span v-if="form.money_sign.value">￥</span><span>999.9</span>
                 					</li>
                 				   <li v-if="form.my_points.value">
                 						<img class=" icon" src="~@/assets/membercenter/integration.svg" />
                 						<span>积分100</span>
                 					</li>
                 					  <li v-if="form.coupon.value">
                 						<img class="icon" src="~@/assets/membercenter/coupon.svg" />
                 						<span>优惠券</span>
                 					</li>
                 					 <li v-if="form.sequence.value">
                 						<img class="icon" src="~@/assets/membercenter/rownumber.svg" />
                 						<span>我的排号</span>
                 					</li>
                 					 <li v-if="form.order_number.value">
                 						<img class="icon" src="~@/assets/membercenter/orderform.svg" />
                 						<span>我的订单</span>
                 					</li>
                 					<li v-if="form.personal_information.value">
                 						<img class="icon" src="~@/assets/membercenter/mymessages.svg" />
                 						<span>我的信息</span>
                 					</li>
                 					<li v-if="form.sign_in.value">
                 						<img class="icon" src="~@/assets/membercenter/signin.svg" />
                 						<span>签到</span>
                 					</li>
                 					<li v-if="form.card_rack.value">
                 						<img class="icon" src="~@/assets/membercenter/cardcoupons.svg" />
                 						<span>卡卷货架</span>
                 					</li>
                 					<li v-if="form.phone_change.value">
                 						<img class="icon" src="~@/assets/membercenter/mobilephone.svg" />
                 						<span>更改手机号</span>
                 					</li>
                 						<li v-if="form.buy_membership.value">
                 						<img class="icon" src="~@/assets/membercenter/membership.png" />
                 						<span>购买会籍</span>
                 					</li>
                 				</ul>
                 				<span v-if="form.synchronize_bag.value" class="addCard">
                 					添加至微信卡包
                 				</span>
                 			</div>
                 		</div>
                 		<img class="top" src="~@/assets/weixin/weixin_top.png" />
             
                 	</div>
                 	<div class="set-body-right">
                 		<el-form ref="form" :model="form" >
                             <el-form-item label="自定义配置:">
                                <el-input v-model="form.center_balance.word_name" :maxlength="maxlength"></el-input>
                              </el-form-item>  
                               <el-form-item class="card-background-color"  label="商户名称颜色:">
                                  <el-select @change="selectColorChange" v-model="form.shop_name_color.word_name" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                              <el-form-item class="card-background-color"  label="会员等级颜色:">
                                  <el-select @change="selectColorChange" v-model="form.member_rank_color.word_name" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                             <el-form-item class="card-background-color"  label="会员卡号颜色:">
                                  <el-select @change="selectColorChange" v-model="form.member_no_color.word_name" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                             <el-form-item class="card-background-color"  label="付款码颜色:">
                                  <el-select @change="selectColorChange" v-model="form.pay_code_color.word_name" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                         </el-form>
                         <div class="set-info">
                          	 <div class="set-info-header"> 
                          	  <div class="set-info-left"><span>属性名称</span><span>是否显示</span></div>
                          	  <div class="set-info-right"><span>属性名称</span><span>是否显示</span></div>
                          	 </div>
                          	<div class="set-info-list">
                          		<div class="set-info-left"><span>￥</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="form.money_sign.value"></el-switch></div>
                             	<div class="set-info-right"><span>添加至微信卡包</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="form.synchronize_bag.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          	    <div class="set-info-left"><span>会员等级</span><el-switch  :width="switchwidth" active-color="#78C75E" v-model="form.member_rank.value"></el-switch></div>
                             	<div class="set-info-right"><span>会员规则</span><el-switch :width="switchwidth"   active-color="#78C75E" v-model="form.member_rule.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          	   <div class="set-info-left"><span>积分</span><el-switch  :width="switchwidth" active-color="#78C75E" v-model="form.my_points.value"></el-switch></div>
                             	<div class="set-info-right"><span>优惠券</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="form.coupon.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                             	<div class="set-info-left"><span>我的排号</span><el-switch  :width="switchwidth" active-color="#78C75E" v-model="form.sequence.value"></el-switch></div>
                             	<div class="set-info-right"><span>我的订单</span><el-switch  :width="switchwidth" active-color="#78C75E" v-model="form.order_number.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          		<div class="set-info-left"><span>我的信息</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="form.personal_information.value"></el-switch></div>
                             	<div class="set-info-right"><span>签到</span><el-switch  :width="switchwidth"  active-color="#78C75E" v-model="form.sign_in.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          	    <div class="set-info-left"><span>更改手机号</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="form.phone_change.value"></el-switch></div>
                             	<div class="set-info-right"><span>卡券货架</span><el-switch  :width="switchwidth"  active-color="#78C75E" v-model="form.card_rack.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          		<div class="set-info-left"><span>商户logo</span><el-switch  :width="switchwidth"  active-color="#78C75E" v-model="form.shop_logo.value"></el-switch></div>
                             	<div class="set-info-right"><span>商户名称</span><el-switch  :width="switchwidth"  active-color="#78C75E" v-model="form.shop_name.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          		<div class="set-info-left"><span>会员卡号</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="form.member_no.value"></el-switch></div>
                             	<div class="set-info-right"><span>购买会籍</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="form.buy_membership.value"></el-switch></div>
                          	</div>
                          </div>
                         	 <div class="set-body-bottom">
                 		       <el-button type="primary" @click="saveCenterConfig" class="saveBtn">保存</el-button>
                 	         </div>
                 	</div>
                    <div class="clear"></div>
                 </div>
				</el-tab-pane>
				<el-tab-pane label="会员卡页面配置" class="secondPage" name="secondPage" >
				    <div class="set-body">
                 	<div class="set-body-left">
                 		<img class="phone" src="~@/assets/wx_themes_settings/iphone.png" />
                 			<div class="phone-body">
                 			<div class="phone-header">
                 				<img class="phone-header-card" src="~@/assets/membercenter.png" />
                 				<div class="phone-header-card-info">
                 					<div class="phone-header-card-top">
                 						<img   v-if="secondform.shop_logo_card.value" class="phone-header-card-img"  src="~@/assets/dalaoban.png" />
                 					    <span :style="{color:colorSelect.CardShopName}" v-if="secondform.shop_name_card.value" class="phone-header-card-name">DQ冰雪皇后</span>
                 					     <i   class="el-icon-erweima" :style="{color:colorSelect.CardPayCode,height:'20px',float:'right',marginRight:'100px'}"></i>
                 					</div>
                 					<div class="phone-header-card-bottom">
                 						 <i :style="{color:colorSelect.CardMemberLevel}" v-if="form.member_rule.value" class="el-icon-information phone-header-card-rule"></i>
                 						 <i :style="{color:colorSelect.CardMemberLevel}"  class="el-icon-star-on phone-header-card-level"></i>
                 						 <span :style="{color:colorSelect.CardMemberLevel}"  class="phone-header-card-level">普通会员</span>
                 						 <span :style="{color:colorSelect.CardMemberNumber}" v-if="secondform.member_no_card.value" class="phone-header-card-number">NO.6789898878</span>
                 					</div>
                 				</div>
                 			</div>
                 			<div class="phone-list" style="background-color: #f4f4f4;">
                 				<div v-if="secondform.recharge_card.value||secondform.pay_password_card.value" class="phone-list-pay" style="display: flex;">
                 					<div v-if="secondform.recharge_card.value" style="flex: 1;" class="phone-list-li-every"><img class=" icon" src="~@/assets/membercenter/recharge.svg" /><span>充值</span></div>
                 					<div v-if="secondform.pay_password_card.value" style="flex: 1;" class="phone-list-li-every"><img class=" icon" src="~@/assets/membercenter/paymentpassword.svg" /><span>支付密码</span></div>
                 				</div>
                 				<ul style="overflow:hidden;display: flex;background-color: #FFFFFF;">
                 					<li style="flex: 1;" v-if="secondform.account_balance_card.value" >
                 					 <div class="phone-list-li-info"><span v-if="secondform.money_sign_card.value">￥</span><span>999.9</span></div>
                 						<span>{{secondform.account_balance_card.name}}</span>
                 					</li>
                 				   <li style="flex: 1;" v-if="secondform.account_master_card.value" >
                 						 <div class="phone-list-li-info"><span v-if="secondform.money_sign_card.value">￥</span><span>800.0</span></div>
                 						<span>积分100</span>
                 					</li>
                 					  <li style="flex: 1;" v-if="secondform.account_award_card.value" >
                 						 <div class="phone-list-li-info"><span v-if="secondform.money_sign_card.value">￥</span><span>100.9</span></div>
                 						<span>账户赠送</span>
                 					</li>
                 				</ul>
                 				<div class="phone-account-list" v-if="secondform.bill_details_card.value" style="background-color: #FFFFFF;">
                 					<div class="phone-account-list-title">账单明细</div>
                 					<div class="phone-account-list-every">
                 						<p style="height: 25px;">
                 						<span>充值</span>
                 						<span style="color:#56606D;float: right;">+30.00</span>
                 						</p>
                 						<span>2017-09-10 09:20</span>
                 					</div>
                 					<div class="phone-account-list-every">
                 						<p style="height: 25px;">
                 						<span>充值</span>
                 						<span style="color:#56606D;float: right;">+30.00</span>
                 						</p>
                 						<span>2017-09-10 09:20</span>
                 					</div>
                 					<div class="phone-account-list-every">
                 						<p style="height: 25px;">
                 						<span>充值</span>
                 						<span style="color:#56606D;float: right;">+30.00</span>
                 						</p>
                 						<span>2017-09-10 09:20</span>
                 					</div>
                 				</div>
                 			</div>
                 		</div>
                 		<img class="top" src="~@/assets/weixin/weixin_top.png" />
                 	</div>
                 	<div class="set-body-right">
                 		<el-form ref="form" :model="secondform">
                             <el-form-item label="会员卡配置:">
                                <el-input v-model="secondform.account_balance_card.name" :maxlength="fourlength"></el-input>
                              </el-form-item>  
                              <el-form-item style="margin-left: 128px;">
                                <el-input v-model="secondform.account_master_card.name" :maxlength="fourlength"></el-input>
                              </el-form-item>
                               <el-form-item style="margin-left: 128px;">
                                <el-input v-model="secondform.account_award_card.name" :maxlength="fourlength"></el-input>
                              </el-form-item>
                               <el-form-item style="margin-left: 128px;">
                                <el-input v-model="secondform.card_balance.word_name" :maxlength="maxlength"></el-input>
                              </el-form-item>
                               <el-form-item style="margin-left: 128px;">
                                <el-input v-model="secondform.currency.word_name" :maxlength="maxlength"></el-input>
                              </el-form-item>
                              <el-form-item class="card-background-color"  label="商户名称颜色:">
                                  <el-select @change="selectColorChange" v-model="secondform.shop_name_color_card.word_name" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                              <el-form-item class="card-background-color"  label="会员等级颜色:">
                                  <el-select @change="selectColorChange" v-model="secondform.member_rank_color_card.word_name" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                             <el-form-item class="card-background-color"  label="会员卡号颜色:">
                                  <el-select @change="selectColorChange" v-model="secondform.member_no_color_card.word_name" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                             <el-form-item class="card-background-color"  label="付款码颜色:">
                                  <el-select @change="selectColorChange" v-model="secondform.pay_code_color_card.word_name" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>
                         </el-form>
                          <div class="set-info">
                          	 <div class="set-info-header"> 
                          	  <div class="set-info-left"><span>属性名称</span><span>是否显示</span></div>
                          	  <div class="set-info-right"><span>属性名称</span><span>是否显示</span></div>
                          	 </div>
                          	<div class="set-info-list">
                          		<div class="set-info-left"><span>￥</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="secondform.money_sign_card.value"></el-switch></div>
                             	<div class="set-info-right"><span>账户余额</span><el-switch :width="switchwidth" active-color="#78C75E" v-model="secondform.account_balance_card.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          	    <div class="set-info-left"><span>主账户</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="secondform.account_master_card.value"></el-switch></div>
                             	<div class="set-info-right"><span>账户赠送</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="secondform.account_award_card.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          	   <div class="set-info-left"><span>充值</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="secondform.recharge_card.value"></el-switch></div>
                             	<div class="set-info-right"><span>支付密码</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="secondform.pay_password_card.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                             	<div class="set-info-left"><span>账单明细</span><el-switch  :width="switchwidth" active-color="#78C75E" v-model="secondform.bill_details_card.value"></el-switch></div>
                             	<div class="set-info-right"><span>商户logo</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="secondform.shop_logo_card.value"></el-switch></div>
                          	</div>
                          	<div class="set-info-list">
                          		<div class="set-info-left"><span>商户名称</span><el-switch :width="switchwidth"  active-color="#78C75E" v-model="secondform.shop_name_card.value"></el-switch></div>
                             	<div class="set-info-right"><span>会员卡号</span><el-switch  :width="switchwidth" active-color="#78C75E" v-model="secondform.member_no_card.value"></el-switch></div>
                          	</div>
                          </div>
                 	<div class="set-body-bottom">
                 		<el-button type="primary" class="saveBtn" @click="saveSecondConfig">保存</el-button>
                 	</div>
                 </div>
                 </div>
				</el-tab-pane>
				<el-tab-pane label="自定义充值配置" class="thirdPage" name="thirdPage" >
				   <div class="set-body">
                 	<div class="set-body-left">
                 		<img class="phone" src="~@/assets/wx_themes_settings/iphone.png" />
                 		<div class="phone-charge-body">
                 			<div class="phone-charge-title">NO.678989887888</div>
                 			<div class="phone-charge-input">
                 				<span class="phone-charge-input-input"></span ><span class="phone-charge-input-span">充值</span>
                 			</div>
                 			<div class="phone-charge-custom-span" v-if="thirdform.words.recharge_status">
                 				<ul style="overflow: hidden;">
                 					<li v-for="item in thirdform.list ">
                 						{{item.czje+"元"}}
                 					</li>
                 				</ul>
                 			</div>
                 			<div class="phone-charge-info-span">
                 				<div class="phone-charge-info-span-text">{{thirdform.words.word_name}}</div>
                 				<div class="phone-charge-info-span-html" v-html="thirdform.words.words"></div>
                 			</div>
                 		</div>
                 	</div>
                 	<div class="set-body-right">
                 		<el-form ref="form" :model="thirdform">
                             <el-form-item label="自定义充值配置:">
                                <el-switch :width="switchwidth" v-model="thirdform.words.recharge_status"  active-color="#78C75E" ></el-switch>
                              </el-form-item>  
                              <el-form-item label="输入充值金额:"  v-if="thirdform.words.recharge_status">
                                <el-input v-model="thirdform.je">
                                	<template slot="append">元</template>
                                </el-input>
                                <el-button type="primary" class="rechargetsaveBtn" @click="saveRechargeConfig">保存</el-button>
                              </el-form-item>
                              <el-form-item  v-if="thirdform.words.recharge_status" style="margin-left: 128px;">
                               <el-tag class="e-tag-li-panel-tab" v-for="item in thirdform.list" :key="item.id" closable  type="info" @close="showDialog(item.id)"> {{item.czje+"元"}}</el-tag>
                               </el-form-item >
                               <el-form-item label="充值金额基数:" v-if="!thirdform.words.recharge_status">
                                <el-input v-model="thirdform.recharge_base_set.word_name" ></el-input>
                              </el-form-item>
                               <el-form-item label="充值金额递增倍数:" v-if="!thirdform.words.recharge_status">
                                <el-input v-model="thirdform.recharge_increase_times.word_name" ></el-input>
                              </el-form-item>
                               <el-form-item label="文字配置:" >
                               <el-switch v-model="thirdform.words.word_status" :width="switchwidth"  active-color="#78C75E" ></el-switch>
                                <el-input v-model="thirdform.words.word_name"  placeholder="优惠说明" :maxlength="maxlength6"></el-input>
                              </el-form-item>
                              <el-form-item label="">
							   <script id="ueditorConfig" type="text/plain"></script>
						      </el-form-item>
                         </el-form>
                         <el-dialog   size="tiny" title="提示" :visible.sync="thirdform.dialogVisible" >
                         	<span style="margin: 20px 20px;display: block;">确定要删除该充值金额吗？</span>
                         <span slot="footer" class="dialog-footer">
                           <el-button @click="thirdform.dialogVisible = false">取 消</el-button>
                           <el-button type="primary" @click="deleteCharge(thirdform.selectid)">确 定</el-button>
                          </span>
                        </el-dialog>
                 	    <div class="set-body-bottom">
                 		<el-button type="primary" class="saveBtn" @click="saveThirdConfig">保存</el-button>
                 	    </div>
                 </div>
                 </div>
				</el-tab-pane>
				<el-tab-pane label="会员规则配置" name="fourPage">
					<div style="margin-left:50px;margin-top: 50px;">	<script id="ueditorConfig2" type="text/plain"></script></div>
				    <div style="margin-left:50px;margin-top: 50px;">
                 		<el-button type="primary" class="saveBtn" @click="saveFourthConfig">保存</el-button>
                 	</div>
				</el-tab-pane>
				<el-tab-pane label="个人信息标签设置" name="fivePage" class="secondPage" >
				 <div class="set-body">
                 	<div class="set-body-right">
				     <el-form ref="form" :model="finethform" class="finethform">
                              <el-form-item label="添加标签:">
                              	    <div style="width:500px">
                                    <el-input style="display: inline-block;"  v-model="finethform.value"  placeholder="多个标签使用英文','隔开" :maxlength="maxlength6">
                                    </el-input>
                                    <el-button style="display: inline-block;" type="primary" class="rechargetsaveBtn" @click="addLabel" >保存</el-button>
                                   </div>
                                   <div>
                                       <el-tag class="e-tag-li-panel-tab" v-for="item in finethform.tags" :key="item.id" closable  type="info" @close="showLabelDialog(item.id)" style="margin-top: 10px;"> {{item.word_name}}</el-tag>
                                  </div>
                              </el-form-item>  
                         </el-form>
                        <el-dialog   size="tiny" title="提示" :visible.sync="finethform.dialogVisible" >
                         	<span style="margin: 20px 20px;display: block;">确定要删除该标签吗？</span>
                         <span slot="footer" class="dialog-footer">
                           <el-button @click="finethform.dialogVisible = false">取 消</el-button>
                           <el-button type="primary" @click="deleteLabel(finethform.selectid)">确 定</el-button>
                          </span>
                        </el-dialog>
                        </div>
                        </div>
				</el-tab-pane>
				<el-tab-pane label="参数设置" name="sixPage" class="secondPage" >
				      <div class="set-body">
                 	<div class="set-body-right">
				     <el-form ref="form" :model="sixthform" class="sixthform" style="width: 500px;">
                              <el-form-item label="注册必须完善资料:">
                                 <el-radio-group v-model="sixthform.wechat_customer_msg.para_value">
                                     <el-radio label="1">是</el-radio>
                                     <el-radio label="0">否</el-radio>
                                 </el-radio-group> 
                              </el-form-item>  
                               <el-form-item label="按钮:">
                               <el-input   v-model="sixthform.member_register_name.word_name"  :maxlength="10">
                                    </el-input>
                              </el-form-item>  
                               <el-form-item label="备注信息:">
                               <el-input  type="textarea" :rows="2" v-model="sixthform.member_register_note_info.word_name"  :maxlength="20" style="width: 230px;"> </el-input>
                              </el-form-item>  
                              <el-form-item label="手机号段:">
                               <el-input style="display: inline-block;" v-model="sixthform.value"> </el-input>
                               <el-button style="display: inline-block;" type="primary" class="rechargetsaveBtn" @click="addPhone" >新增</el-button>
                                <div style="margin-left: 150px;">
                                <el-tag class="e-tag-li-panel-tab" v-for="item in sixthform.phones" :key="item" closable  type="info" @close="deletePhone(item)" style="margin-top: 10px;"> {{item}}</el-tag>
                                  </div>
                              </el-form-item>  
                                <el-form-item label="生日修改">
                               <el-input   v-model="sixthform.birthday_modify_count.word_name"></el-input>
                              </el-form-item>  
                               <el-form-item style="margin-left: 150px;">
                                <el-button  type="primary" class="rechargetsaveBtn"  @click="saveParameterSetConfig">保存</el-button>
                              </el-form-item>  
                         </el-form>
                        </div>
                        </div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	import { getModuleConfig,saveModuleConfig,selSetMoney,saveSetMoney,delSetMoney,saveWords,modifyMemberRuleSet,modifyPersonTagSet,getParameterSetConfig,saveParameterSetConfig} from '@/api/weixin';

export default {
  		name: 'materialmangement',
  		data(){
  			return{
  				colorSelect:{CenterShopName:"#FFFFFF",//会员中心商户名称
  					CenterMemberLevel:"#FFFFFF",//会员中心会员等级
  					CenterMemberNumber:"#FFFFFF",//会员中心会员卡号
  					CenterPayCode:"#FFFFFF",//会员中心付款码
  					CardShopName:"#FFFFFF",//会员卡商户名称
  					CardMemberLevel:"#FFFFFF",//会员卡会员等级
  					CardMemberNumber:"#FFFFFF",//会员卡会员卡号
  					CardPayCode:"#FFFFFF",//会员卡 付款码
  				},
  				sixthform:{
  					member_register_name:{},
  					member_register_note_info:{},
  					phone_num_section:{},
  					birthday_modify_count:{},
  					wechat_customer_msg:{},
  					phones:[],
  					value:"",
  				},
  				finethform:{
  					tags:[],
  				    dialogVisible:false,
  				    selectid:"",
  				    value:"",
  				},
  				fourform:{
  					modifyMemberRuleSet:{},
  				},
  				thirdform:{
  					selectid:"",
  					dialogVisible:false,
  					je:"",
  					words: { id: "", tenancy_id: "", word_name: "",words: "",word_status: "",recharge_status: ""},
	                  list:[],
	                  recharge_increase_times:{id:"",word_name:"",status:"",},
	                  recharge_base_set:{id:"",word_name:"",status:"",},
  				},
  				maxlength6:6,
  				switchwidth:44,
  				maxlength:3,
  				fourlength:4,
  				showLoading:false,
  				activeName:"firstPage",
  			    bgColors : [
  			              {'value':'Color010','label':'#63b359'}, {'value':'Color020','label':'#2c9f67'},{'value':'Color030','label':'#509fc9'},
                          {'value':'Color040','label':'#5885cf'},{'value':'Color050','label':'#9062c0'},{'value':'Color060','label':'#d09a45'},
                          {'value':'Color070','label':'#e4b138'},{'value':'Color080','label':'#ee903c'},{'value':'Color081','label':'#f08500'},
                          {'value':'Color082','label':'#a9d92d'},{'value':'Color090','label':'#dd6549'},{'value':'Color100','label':'#cc463d'},
                          {'value':'Color101','label':'#cf3e36'},{'value':'Color102','label':'#5E6671'},],
                secondform:{
  					card_balance:{id:"",word_name:"",noswitch:true,},
  					currency:{id:"",word_name:"",noswitch:true,},
                    shop_name_color_card:{id:"",word_name:"",noswitch:true,},
  				    member_rank_color_card:{id:"",word_name:"",noswitch:true, },
  				    member_no_color_card:{id:"",word_name:"",noswitch:true,},
  				    pay_code_color_card:{id:"",word_name:"",noswitch:true,},
                    shop_logo_card:{id:"",value:""},
                    recharge_card:{id:"",value:""},//充值
                    money_sign_card:{id:"",value:""},//￥
                    account_balance_card:{id:"",value:"",name:"",},//账户余额
                    account_master_card:{id:"",value:"",name:"",},//主账户
                    account_award_card:{id:"",value:"",name:"",},//账户赠送
                    pay_password_card:{id:"",value:"" },//支付密码
                    bill_details_card:{id:"",value:""},//账单明细
                    member_no_card:{id:"",value:""},//会员卡号
                    shop_name_card:{id:"",value:""},//商户名称
                },
  				form:{
  					center_balance:{id:"",word_name:"",noswitch:true,},
  				    shop_name_color:{id:"",word_name:"",noswitch:true,},
  				    member_rank_color:{id:"",word_name:"",noswitch:true,},
  				    member_no_color:{id:"",word_name:"",noswitch:true,},
  				    pay_code_color:{id:"",word_name:"",noswitch:true,},
  					money_sign:{id:"",value:""},
  					member_rank:{id:"",value:""},//会员等级
  					member_rule:{id:"",value:""},//会员规则
                    my_points:{id:"",value:"" },//我的积分
                    recharge:{id:"",value:""},//充值
                    sign_in:{id:"",value:"" },//签到
                    card_bag:{id:"",value:""},//账户卡包
                    coupon:{id:"",value:"" },//优惠券
                    consumption_records:{id:"",value:""},//最近消费记录
                    personal_information:{id:"",value:""},//个人信息完善
                    points_records:{id:"",value:"" },//积分记录
                    sequence:{id:"",value:""},//我的排号
                    order_number:{id:"",value:"" },//我的订单
                    dish_car:{id:"",value:"" },//菜品车
                    my_collection:{id:"",value:""},//我的收藏
                    buy_membership:{id:"",value:""},//购买会籍
                    synchronize_bag:{id:"",value:"" },//同步到卡包
                    phone_change:{id:"",value:""},//更改手机号
                    card_rack:{id:"",value:""},//卡券货架
                    shop_logo:{id:"",value:""},//商户logo
                    shop_name:{id:"",value:""},//商户名称
                    member_no:{id:"",value:"" },//会员卡号
  				}
			}
  		},
		mounted(){
			let toolbars=['undo', 'redo', 'bold', 'italic', 'underline', 'fontfamily', 'fontsize', 'link', 'unlink', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify', 'source'];/*****百度菜单*****/
			UE.delEditor("ueditorConfig");
			UE.delEditor("ueditorConfig2");
			this.editor = UE.getEditor("ueditorConfig",{initialFrameHeight:200,initialFrameWidth:600,toolbars: [toolbars]});
			this.editor2 = UE.getEditor("ueditorConfig2",{initialFrameHeight:200,initialFrameWidth:600,toolbars: [toolbars]});
			this.editor.addListener("blur", () => {
				this.thirdform.words.words = this.editor.getContent();
			});
			this.editor2.addListener("blur", () => {
				this.fourform.modifyMemberRuleSet.word_name = this.editor2.getContent();
			});
			this.getConfig();/****获取第一个和第二个的数据*****/
		},
		methods:{
			/****切换颜色时调用****/
			selectColorChange(){
  					this.colorSelect.CenterShopName=this.bgColors.filter((item)=>item.value==this.form.shop_name_color.word_name)[0].label;//会员中心商户名称
  					this.colorSelect.CenterMemberLevel=this.bgColors.filter((item)=>item.value==this.form.member_rank_color.word_name)[0].label;//会员中心会员等级
  					this.colorSelect.CenterMemberNumber=this.bgColors.filter((item)=>item.value==this.form.member_no_color.word_name)[0].label;//会员中心会员卡号
  					this.colorSelect.CenterPayCode=this.bgColors.filter((item)=>item.value==this.form.pay_code_color.word_name)[0].label;//会员中心付款码
  					this.colorSelect.CardShopName=this.bgColors.filter((item)=>item.value==this.secondform.shop_name_color_card.word_name)[0].label;//会员卡商户名称
  					this.colorSelect.CardMemberLevel=this.bgColors.filter((item)=>item.value==this.secondform.member_rank_color_card.word_name)[0].label;//会员卡会员等级
  					this.colorSelect.CardMemberNumber=this.bgColors.filter((item)=>item.value==this.secondform.member_no_color_card.word_name)[0].label;//会员卡会员卡号
  					this.colorSelect.CardPayCode=this.bgColors.filter((item)=>item.value==this.secondform.pay_code_color_card.word_name)[0].label;//会员卡 付款码
  			 
			},
			selectChange({name}){
			   switch (name){
			   	case "firstPage":
			   		break;
			   		   	case "firstPage":
			   		   	this.getConfig();
			   		break;
			   		   	case "secondPage":
			   		   	this.getConfig();
			   		break;
			   		   	case "thirdPage":
			   		   		this.selSetMoney();
			   		break;
			   		   	case "fourPage":
			   		   	this.readFourConfig();
			   		break;
			   		   	case "fivePage":
			   		   	this.readFinthConfig();
			   		break;
			   		   	case "sixPage":
			   		   	this.getParameterSetConfig();
			   		break;
			   	default:
			   		break;
			   }
			},
			/**添加手机号段***/
			addPhone(){
				let reg=/^(1\d{2})(,1\d{2})*$/;
				if(!reg.test(this.sixthform.value)){
					this.$message({message:"请输入手机号码前三位号段，如：135 ，多个用英文逗号隔开!",type:"error"})
				}else{
					let  arr=this.sixthform.value.split(',').concat(this.sixthform.phones);
					let phones=Array.from(new Set(arr));
					this.sixthform.phones= phones;
					this.sixthform.value="";
				}
			},
			saveParameterSetConfig(){
				 let regex=/^[0-9]*[1-9][0-9]*$/;
				 if(!regex.test(this.sixthform.birthday_modify_count.word_name)){
				 	this.$message({message:"生日修改次数只能为正整数",type:"error"})
				 	return;
				 }
				 let regex1= /^[\u4e00-\u9fa5]+$/;
				 if(!regex1.test(this.sixthform.member_register_note_info.word_name)||!regex1.test(this.sixthform.member_register_name.word_name)){
				 	this.$message({message:"按钮和备注信息中只能输入汉字！不能包含空格和其他字符！",type:"error"})
				 	return;
				 }
				let  sysParams=[{id:this.sixthform.wechat_customer_msg.id,para_value:this.sixthform.wechat_customer_msg.para_value}];
				let  wordSet=[
				{id:this.sixthform.member_register_name.id,word_name:this.sixthform.member_register_name.word_name},
				{id:this.sixthform.member_register_note_info.id,word_name:this.sixthform.member_register_note_info.word_name},
				{id:this.sixthform.phone_num_section.id,word_name:this.sixthform.phones.join(',')},
				{id:this.sixthform.birthday_modify_count.id,word_name:this.sixthform.birthday_modify_count.word_name},
				];
				saveParameterSetConfig("sysParams="+JSON.stringify(sysParams)+"&wordSet="+JSON.stringify(wordSet)).then((data)=>{
					if(data.success){
						this.$message({message:"保存成功",type:"success"});
					}else{
					    this.$message({message:"保存失败",type:"error"});
					}
				})
			},
			deletePhone(phone){
				if(phone&&phone!=""){
					this.sixthform.phones.map((item,index)=>{
						if(item==phone){
							this.sixthform.phones.splice(index,1);
						}
					})
				}
			},
			getParameterSetConfig(){
				getParameterSetConfig("word_param=member_register_name,member_register_note_info,phone_num_section,birthday_modify_count&sys_param=wechat_customer_msg").
				then((data=>{
					if(data.success){
						data.word_param.map((item)=>{
							if(this.sixthform[item.word_type]){
								this.sixthform[item.word_type]=item;
							}
						});
						if(data.sys_param&&data.sys_param.length){
							this.sixthform.wechat_customer_msg=data.sys_param[0];
						}
						if(this.sixthform.phone_num_section.word_name){
							this.sixthform.phones=this.sixthform.phone_num_section.word_name.split(',');
						}
					}else{
						this.$message({message:"获取参数信息失败",type:"error"})
					}
				}))
			},
			/****保存标签****/
			deleteLabel(id){
              modifyPersonTagSet("reqType=x&id="+id).then((data)=>{
					if(data.success){
				       this.$message({message:data.msg,type:"success"});
				       this.readFinthConfig();/***刷新*****/
				       this.finethform.dialogVisible=false;
					}else{
						this.$message({message:"保存失败",type:"error"})
					}
				})
			},
			/****添加标签******/
			addLabel(){
				modifyPersonTagSet("reqType=s&tags="+this.finethform.value).then((data)=>{
					if(data.success){
				       this.$message({message:data.msg,type:"success"});
				       this.finethform.value="";
				       this.readFinthConfig();/***刷新*****/
					}else{
						this.$message({message:"保存失败",type:"error"})
					}
				})
			},
			showLabelDialog(id){
				this.finethform.selectid=id;
				this.finethform.dialogVisible=true;
			},
			/***获取第五个配置******/
			readFinthConfig(){
				modifyPersonTagSet("reqType=d").then((data)=>{
					if(data.success){
				        this.finethform.tags=data.tags;
					}else{
						this.$message({message:"加载个人信息标签失败！",type:"error"})
					}
				})
			},
			/******读取第四个配置*******/
			readFourConfig(){
				modifyMemberRuleSet("reqType=d").then((data)=>{
					this.fourform.modifyMemberRuleSet=data;
					this.editor2&&this.editor2.setContent(this.fourform.modifyMemberRuleSet.word_name)
				})
			},
			/*****保存第四个页签签*****/
			saveFourthConfig(){
				modifyMemberRuleSet("reqType=u&contents="+this.fourform.modifyMemberRuleSet.word_name).then((data)=>{
					if(data.success){
						this.$message({message:"保存成功",type:"success"});
					}else{
						this.$message({message:"保存失败",type:"error"});
					}
				})
			},
			/***检查充值基数****/
			checkBase(){
				if(this.thirdform.recharge_increase_times.word_name!=""&&this.thirdform.recharge_base_set.word_name==""){
					this.$message({message:"充值金额基数不能为空",type:"error"});
					return false;
				}
				else if(this.thirdform.recharge_increase_times.word_name==""&&this.thirdform.recharge_base_set.word_name!=""){
					this.$message({message:"充值金额递增倍数不能为空",type:"error"});
					return false;
				}
				else if(this.thirdform.recharge_increase_times.word_name!=""&&this.thirdform.recharge_base_set.word_name!=""){
					   let regex=/^[0-9]*[1-9][0-9]*$/;
					   let regex1=/^([1-9]\d*)$|^([1-9]\d*\.\d)$/;
					  if (!regex.test(this.thirdform.recharge_base_set.word_name)) {
                         this.$message({message:"充值金额基数必须为正整数",type:"error"});
                         return false;
                      }
					  else if(!regex1.test(this.thirdform.recharge_increase_times.word_name)){
					  	this.$message({message:"充值金额递增倍数必须为大于1且最多带一位小数",type:"error"});
                         return false;
					 }
				}
				return true;
			},
			/******保存第三个按钮*****/
			saveThirdConfig(){
				 if(this.checkBase()){
				 let wordParams=[
				 {id:this.thirdform.recharge_increase_times.id,word_name:this.thirdform.recharge_increase_times.word_name},
				 {id:this.thirdform.recharge_base_set.id,word_name:this.thirdform.recharge_base_set.word_name},
				 ];
				 let data="id="+this.thirdform.words.id+"&word_status="+(this.thirdform.words.word_status?"1":"0")+"&words="+this.thirdform.words.words+"&recharge_status="+(this.thirdform.words.recharge_status?"1":"0")+"&word_name="+this.thirdform.words.word_name+"&wordParams="+JSON.stringify(wordParams);
				saveWords(data).then((data)=>{
					if(data.msg=="1"){
						this.$message({message:"保存成功",type:"success"});
					}else{
						this.$message({message:"保存失败",type:"error"});
					}
				});
				 }
			},
			/***保存充值*****/
			saveRechargeConfig(){
				if(this.thirdform.list.length>=4){
					this.$message({message:"自定义充值金额已达上限",type:"error"});
				}else{
					let regex=/^[1-9]\d*$/;
					 if (!regex.test(this.thirdform.je)) {
                         this.$message({message:"请输入大于零的整数",type:"error"});
                     }
					 else if(this.thirdform.list.some((item)=>item.czje==this.thirdform.je)){
					 	 this.$message({message:"充值金额重复",type:"error"});
					 }else{
					 	let  switchStatus={id:this.thirdform.words.id,recharge_status:this.thirdform.words.recharge_status?"1":"0"};
					    let  je=parseInt(this.thirdform.je);
					    let data="switchStatus="+JSON.stringify(switchStatus)+"&je="+je;
					    saveSetMoney(data).then((data)=>{
					        if(data.msg=="1"){
					            this.thirdform.je="";
					        	this.$message({message:"保存自定义充值金额成功",type:"success"});
					        	this.selSetMoney();
					        }else{
					        	this.$message({message:"保存自定义充值金额失败",type:"error"});
					        }
				        });
					 }
				
				}
			},
			showDialog(id){
				this.thirdform.selectid=id;
				this.thirdform.dialogVisible=true;
			},
			deleteCharge(id){
				if(id){
				let  switchStatus={id:this.thirdform.words.id,recharge_status:this.thirdform.words.recharge_status?"1":"0"};
			    let data="switchStatus="+JSON.stringify(switchStatus)+"&id="+id;
				delSetMoney(data).then((data)=>{
					if(data.msg=="1"){
						this.thirdform.je="";
						this.thirdform.dialogVisible=false;
						this.$message({message:"保存成功",type:"success"});
					    this.selSetMoney();
					}else{
						this.$message({message:"保存失败",type:"error"});
					}
				})
				}else{
					this.$message({message:"保存失败",type:"error"});
				}
			},
			/*****自定义充值信息*****/
			selSetMoney(){
				selSetMoney().then((data)=>{
					if(data.msg=="1"){
						this.thirdform.list=data.list; 
					    data.base_recharge.map((item)=>{
						if(item.word_type&&this.thirdform[item.word_type]){
							this.thirdform[item.word_type].id=item.id;
							this.thirdform[item.word_type].status=item.status;
							this.thirdform[item.word_type].word_name=item.word_name;
						}
					})
					this.thirdform.words=data.words;
					this.thirdform.words.recharge_status=(data.words.recharge_status=="1");//开关
					this.thirdform.words.word_status=(data.words.word_status=="1");//开关
					this.editor&&this.editor.setContent(this.thirdform.words.words);
					}
					else{
						this.$message({message:"查询自定义充值失败",type:"error"});
					}
				})
			},
			/***保存第二个配置***/
			saveSecondConfig(){
				let  data=["type=card_bag"];
				let forms=this.secondform;
				let ids=[];
				let ids2=[];
				let words=[];
				let modules=[];
				  for(var item in forms){
				  	if(typeof forms[item]=="object"){
				  		if(!forms[item].noswitch){
				  			if(forms[item].value){
				  		      /****打开***/
				  		     ids.push(forms[item].id);
				  	        }else{
				  		    /****关闭****/
				  		     ids2.push(forms[item].id)
				      	    }
				  		}else{
				  			words.push(forms[item]);
				  		}
				  	}
				  }
				   modules.push({
				  	id:this.secondform.account_award_card.id,
				  	para_name:this.secondform.account_award_card.name,
				   });
				   modules.push({
				  	id:this.secondform.account_master_card.id,
				  	para_name:this.secondform.account_master_card.name,
				  });
				   modules.push({
				  	id:this.secondform.account_balance_card.id,
				  	para_name:this.secondform.account_balance_card.name,
				  });
				  ids=ids.join(',');/***打开的开关***/
				  ids2=ids2.join(',');/**关闭的开关****/
				  data.push("ids="+ids);
				  data.push("ids2="+ids2);
				  data.push("modules="+JSON.stringify(modules));
				   data.push("words="+JSON.stringify(words));
				  saveModuleConfig(data.join("&")).then((data)=>{
					if(data.success){
						this.$message({message:"保存成功",type:"success"});
					}else{
						this.$message({message:"保存失败",type:"error"});
					}
				})
			},
			/****首页保存****/
			saveCenterConfig(){
				let  data=["type=individual_center"];
				let forms=this.form;
				let ids=[];
				let ids2=[];
				let words=[];
				  for(var item in forms){
				  	if(typeof forms[item]=="object"){
				  		if(forms[item].noswitch){
				  			words.push(forms[item]);
				  		}else{
				  			if(forms[item].value){
				  		      /****打开***/
				  		     ids.push(forms[item].id);
				  	        }else{
				  		    /****关闭****/
				  		     ids2.push(forms[item].id)
				      	    }
				  		}
				  	}
				  }
				  ids=ids.join(',');/***打开的开关***/
				  ids2=ids2.join(',');/**关闭的开关****/
				  data.push("ids="+ids);
				  data.push("ids2="+ids2);
				  data.push("words="+JSON.stringify(words));
				  saveModuleConfig(data.join("&")).then((data)=>{
					if(data.success){
						this.$message({message:"保存成功",type:"success"});
					}else{
						this.$message({message:"保存失败",type:"error"});
					}
				})
				
			},
			getConfig(){
				getModuleConfig().then((data)=>{
					if(data){
						let  modules=data.modules;
						 modules&&modules.map((item)=>{
						 	if(item.para_code){
						 	  if(this.form[item.para_code]){
						 	    this.form[item.para_code].value=item.para_value=="1";//设置值
						 	    this.form[item.para_code].id=item.id;
						 	  }
						 	  else if(this.secondform[item.para_code]){
						 	  	  this.secondform[item.para_code].value=item.para_value=="1";//设置值
						 	      this.secondform[item.para_code].id=item.id;
if(item.para_code=="account_balance_card"||item.para_code=="account_master_card"||item.para_code=="account_award_card"){
						 	      	 this.secondform[item.para_code].name=item.para_name;
						 	      }
						 	  }
						 	}
						 })
						 this.form.center_balance.word_name=data.center_balance.word_name;
						 this.form.center_balance.id=data.center_balance.id;
						 let  colorList=data.colorList;
						 colorList&&colorList.map((item)=>{
						 	if(this.form[item.word_type]){
						 	    this.form[item.word_type].word_name=item.word_name;
						      	this.form[item.word_type].id=item.id;
						 	}else{
						 		this.secondform[item.word_type].word_name=item.word_name;
						      	this.secondform[item.word_type].id=item.id;
						 	}
						 });
						 this.secondform.currency.id=data.currency.id;
						  this.secondform.currency.word_name=data.currency.word_name;
						   this.secondform.card_balance.id=data.card_balance.id;
						  this.secondform.card_balance.word_name=data.card_balance.word_name;
					}else{
						this.$message({message:"获取会员中心配置失败！",type:"error"});
					}
				})
			}
		},
  	}
</script>
<style rel="stylesheet/scss" lang="scss">
.bgColor0{ background-color: #63b359;}.bgColor1{ background-color: #2c9f67; }.bgColor2{ background-color: #509fc9;}.bgColor3{background-color: #5885cf;}
 .bgColor4{background-color: #9062c0;}.bgColor5{ background-color: #d09a45;} .bgColor6{ background-color: #e4b138;}.bgColor7{background-color: #ee903c;}
 .bgColor8{ background-color: #f08500;}.bgColor9{background-color: #a9d92d; }.bgColor10{ background-color: #dd6549;}.bgColor11{background-color: #cc463d;}
.bgColor12{background-color: #cf3e36;}.bgColor13{background-color: #5E6671;}
	.membercenter{
		background-color: #FFFFFF;
		padding-bottom: 60px;
		.el-tabs__item{
			font-size: 16px;
			margin-left: 0 !important;
		}
		.e-tag-li-panel-tab{
			margin-left: 10px;
		    background-color: #F2F6FB ;
			color:#34495E;
			.el-tag__close el-icon-close{
			color: #C1CED6;
				}
			}
		.el-form-item__label{
			margin-left: 0;
		}
		.mebercenter-main{
			.secondPage{
				.labeltips{
					color:#A5B0B7;
				}
			}

			.firstPage,.secondPage,.thirdPage{
			.sixthform{ .el-form-item{.el-form-item__label{width: 150px !important;}}}
				.finethform{
					.el-form-item__content{
						margin-left: 120px;
					}
				}
				.set-body{
					margin-top: 40px;
					margin-left: 15px;
					.set-body-left{
						 float:left;
						 position: relative;
						.phone{
							width: 282px;
							height: 572px;
						}
						.top{
							position: absolute;
							top:66px;
							width: 247px;
							left:17px;
							height: 45px;
						}
						.phone-charge-body{
							width: 100%;
							position:  absolute;
							top:80px;
							left:20px;
							.phone-charge-title{
								font-size:12px;
								margin: 10px 10px;
								color:#34495E;
							
							}
						   .phone-charge-input{
						   	width: 100%;
						   	margin: 0 auto;
							.phone-charge-input-input{
								margin: 0 10px;
								display: inline-block;
								width: 60%;
								height: 40px;
								border:1px solid rgb(225, 230, 237);
								border-radius: 4px;
								margin-right:0;
							  }
								  .phone-charge-input-span{
								  	height: 40px;
								  	display: inline-block;
								  	line-height: 40px;
								  	border: 1px solid rgb(225, 230, 237);
								  	vertical-align: top;
								  	padding: 0 10px;
								  	background:#FF4444 ;
								  	color:#FFFFFF;
								  	border-radius: 0 4px 4px 0;
								  }
							}
							.phone-charge-custom-span{
								padding: 10px 10px;
								    margin-right: 40px;
								ul{
									li{
										width: 40%;
										float: left;
										border:1px solid rgb(225, 230, 237);
										height: 30px;
										line-height: 30px;
									    background:rgb(237, 241, 247) ;
									    text-align: center;
									    margin-left: 5%;
									    border-radius: 4px;
									    margin-top: 5px;
									}
								}
							}
							.phone-charge-info-span{
								border-top:1px solid  #CCCCCC;
								margin-right: 40px;
								margin-top: 40px;
								.phone-charge-info-span-text{
									text-align: center;
									height: 40px;
									margin: -10px auto;
									height: 40px;
									width: 100px;
									background: #FFFFFF;
									
								}
								.phone-charge-info-span-html{
									padding: 0 10px;
									overflow: hidden;
									margin-right:30px ;
								}
							}
						}
						.phone-body{
							position: absolute;
							width: 247px;
							top:111px;
							left: 17px;
							height: 150px;
							.phone-header{
								width:100% ;
								overflow: hidden;
								height: 100%;
								.phone-header-card{
									width:100%;
								}
								.phone-header-card-info{
									width: 100%;
									position: absolute;
									top:30px;
									left: 45px;
									
									.phone-header-card-top{
										height: 20px;
										width: 100%;
										overflow: hidden;
										.phone-header-card-img{
											width: 20px;
											height: 20px;
											border-radius:50%;
										}
										.phone-header-card-name{
											vertical-align: top;
											color:#FFFFFF;
											font-size: 12px;
											display: inline-block;
											height: 20px;
											line-height: 20px;
										}
										.phone-header-card-name-code{
											width: 20px;
											height: 20px;
											color:red;
											background: red;
										}
									}
									.phone-header-card-bottom{
									    height: 20px;
										width: 100%;
										margin-top: 48px;
										overflow: hidden;
										.phone-header-card-level{
											height: 20px;
									        color:#FFFFFF;
									        font-size: 12px;
									      
										}
										.phone-header-card-rule{
											position: absolute;
											bottom: 30px;
											font-size:12px;
											color:#FFFFFF;
										}
										.phone-header-card-number{
											color:#FFFFFF;
											font-size: 12px;
											height: 20px;
											line-height: 20px;
										}
									}
				                   }
								}
									.phone-list{
								        height:239px;
										overflow-y: auto;
										.phone-list-pay{
									        background:#565656 ;
                                            height:80px;
                                           
											.phone-list-li-every{
												color: #ccc;
												img{
													height: 30px;
													width: 30px;
													display: block;
													margin: 0 auto;
													margin-top: 10px;
												}
												span{
													display: block;
													margin: 0 auto;
													text-align: center;
												}
											}
											
										}
										ul{
											width: 100%;
											li:nth-child(3n){
												border-right:none;
											}
											li{
												width:80px;
												height:80px;
												float: left;
												text-align: center;
												border-right:1px solid  #E9EFF6;
												border-bottom: 1px solid  #E9EFF6;
												.phone-list-li-info{
													margin:20px 10px;
													margin-bottom: 10px;
												}
												.icon{
													width: 30px;
													height: 30px;
													margin: 0 auto;
													margin-top: 10px;
													display: block;
												}
												span{
													font-size: 12px;
												}
											
											}
										}
										.phone-account-list-every{
													border-bottom: 1px solid #E9EFF6;
													height: 60px;
													padding: 10px;
												}
												.phone-account-list-title{
                                            	 color:#A2AEBB;
                                            	 height: 35px;
                                            	 padding: 10px;
                                            	border-bottom: 1px solid #E9EFF6;
                                            	margin-top: 10px;
                                                }
										.addCard{
											display: block;
											width: 80%;
											text-align: center;
											height: 30px;
											border-radius: 3px;
											border:1px solid #FF4848;
											color:#FF4848;
											line-height: 30px;
											margin: 10px auto;
										}
									}
						}
					}
					.set-body-right{
						float:left;
						margin-left: 50px;
						 .el-switch__label{
						    display: none;
						 }
						 .el-switch{
						      &.is-checked .el-switch__core{
						      background-color:#78C75E;
						       border-color:#78C75E;
						     }
						  }
						  .rechargetsaveBtn{
						    /***此处是充值保存按钮的样式****/
						  }
						.el-form-item{
							.el-form-item__label{
								width: 126px;
							}
							.el-input{
							  width: 230px;
							}
						}
						.set-info{
							width: 742px;
							border-left: 1px solid #D8E5EC;
						    border-top: 1px solid #D8E5EC;
							border-radius: 3px;
							.set-info-header,.set-info-list{
								.set-info-left,.set-info-right{
									width: 368px;
									display: inline-block;
									padding: 0 30px;
									border-right: 1px solid #D8E5EC;
						            border-bottom: 1px solid #D8E5EC;
						            .el-switch{
						            	float: right;
						                margin-top: 10px;
						            }
								}
							}
							.set-info-header{
								background-color: #D8E5EC;
								height: 39px;
								font-weight: bold;
								line-height: 39px;
							}
							.set-info-list{
								height: 42px;
								line-height: 42px;
							}
						}
					}
					.set-body-bottom{
					margin-top: 50px;
					 .saveBtn{
						width: 68px;
					 }
				   }
				}
				.clear{
					clear: both;
				}
			}
		}
	}
</style>
