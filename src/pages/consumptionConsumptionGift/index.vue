<template>
	<div class="context" v-loading.body="loading1">

		<!-- 选择优惠券 对话框 -->
		<tzx-coupon-select 
			:dialogSelectYouhuiQuan='mydialogSelectYouhuiQuan'
			@quedingButton="myquedingButton"
			:pnodes="detailCoupons"
			@setYhqCheckedData="getYhqCheckedData"
			@setYhqAllData="getYhqAllData"
			@setDialogStatus="getDialogStatus"
			:syn_status="my_syn_status"
			>
		</tzx-coupon-select>
		<!--选择优惠券 结束 -->

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
		<!--选择门店 结束 -->

		<!--会员群体 开始-->
		<tzx-group-select 
			@makeQuntiSureButton ='quntiMakeSureChecked' 
			@makeQuntiCancleButton='quntiCancleButton' 
			:dialogQuntiVisible="dialogQunti" 
			:quntiData="hyqtData" 
			:quntiData_select="hyqt_select_data" 
			:tableDataFilter="tableDataFilter_parent">
		</tzx-group-select>
		<!--会员群体结束 -->

		<!--消费后评价赠礼  开始-->
		<div class="divTwo_xfzl">
			<h1><em>消费后评价赠礼</em><cite>收集用户反馈，促进消费闭环</cite></h1>

			<h2 v-model="tishi">
		    	<img src="../../assets/huodong/tishi.png" />
		    	<cite>提示：您已经创建过如下活动，新活动尽量不要与之冲突！
		    	</cite>
		    	<img v-if="!tishi" src="../../assets/huodong/chakangengduo.png" @click="changTiShi" style="width:70px;height:16px;margin-top:8px;"/>
		    	<img v-if="tishi" src="../../assets/huodong/shouqi.png" @click="changTiShi" style="width:42px;height:16px;margin-top:8px;"/>
		    	<ul v-if="tishi">
		    		<li v-for="(item,index) in acitivities"><em>{{index+1}}</em>.{{item.subject}}，{{dateFilter(item.start_time)}}至{{dateFilter(item.end_time)}}；范围：<span v-for="item2 in item.stores">{{item2}};</span></li>
		    	</ul>
		    </h2>
			<!--表单开始-->
			<el-form label-width="92px" class="demo-ruleForm" :rules="rules" ref="form" :model="form">
				<el-form-item label="活动名称:" prop="subject">
					<el-input placeholder="请输入活动名称" v-model="form.subject" style="width:580px;"></el-input>
				</el-form-item>
				<el-form-item label="活动周期:" required>
					<div class="hdzq_date1">
						<el-form-item prop="start_time">
							<el-date-picker type="date" :picker-options="pickerOptions0" v-model="form.start_time" placeholder="请选择开始日期" style="width:230px;" format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</div>
					<div class="hdzq_date_em">
						<em>至</em>
					</div>
					<div class="hdzq_date2">
						<el-form-item prop="end_time">
							<el-date-picker type="date" :picker-options="pickerOptions0" v-model="form.end_time" placeholder="请选择结束日期" style="width:230px;" format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</div>
				</el-form-item>

				<el-form-item label="活动赠礼:" style="margin:0;padding:0;margin-bottom: 0px;" prop="hdzl" class="yhq_hdzl">
					<el-checkbox-group v-model="form.hdzl" class="pjzl_hdzl">
						<el-form-item label="">
							<el-checkbox label="赠送优惠券" style="margin-top:6px;"></el-checkbox>
							<!--活动赠礼 的 赠券设置 开始 -->
							<div class="hdzl" v-if="form.hdzl.toString().indexOf('赠送优惠券') != -1 ">
								<!--<div class="zengquanshezhi">赠券设置:</div>-->
								<div class="zqsh_right">
									<ul  :class="isclass ? 'class-yes' : 'class-no' ">
							        		<li v-for="item in yhqCheckedData_show" >
							        			<div v-if="item.face_value > 0">
								        			<em>每人赠送</em>
								        			<img class="yhq" src="../../assets/huodong/youhuiquan.svg" />
								        			<em>{{item.text}}</em>	
								        			<el-input placeholder="" min="1"  v-model="item.reward_coupon" style="width:80px;display: inline-table;" class="input_height_28 mynumber" ><template slot="append">张</template></el-input>
								        			<img @click="viewYouhuiQuan(item.id)" class="view" src="../../assets/huodong/view.svg"  />
								        			<img  @click="deleteItem(yhqCheckedData_show,item,'yhq')" class="delete" src="../../assets/huodong/delete.svg"  />
							        			</div>
							        		</li>
						        	</ul>
									<div class="addyouhuiquan" @click="getYouHuiQuan">
										<img src="../../assets/huodong/addYouhuiquan.svg" />
										<div class="tianjia">选择优惠券</div>
									</div>
								</div>
							</div>
							<!--活动赠礼 的 赠券设置 结束-->
						</el-form-item>

						<el-form-item label="" style="margin:0;padding:0;margin-bottom: 0px;line-height:32px;">
							<el-checkbox label="赠积分" style="margin-left:92px;margin-top:6px;margin-bottom:6px;"></el-checkbox>
							<!--活动赠礼 的 每人赠送的积分 开始 -->
							<div class="hdzl2" v-if="form.hdzl.toString().indexOf('赠积分') != -1 ">
								<div class="meirenzengsong">
									<cite>每人赠送</cite>
									<el-input placeholder="100,000" min="0.1" step="0.1" type="number" prop="reward_credit" v-model="form.reward_credit" style="width:120px;height:28px" class="mynumber"></el-input>
									<em>积分</em>
								</div>
							</div>
						</el-form-item>
					</el-checkbox-group>
				</el-form-item>
				<!--活动赠礼 的 每人赠送的积分 结束 -->

				<el-form-item label="活动提醒:" required class="hdtx_bu_weixin" prop="hdtx">
					<el-checkbox-group v-model="form.hdtx" style="margin-left:62px;">
						<!--<el-checkbox label="不提醒"></el-checkbox>-->
						<el-checkbox label="微信提醒"></el-checkbox><cite>(按照微信公众号标准模板配置)</cite>
						<el-checkbox label="短信提醒"></el-checkbox>
					</el-checkbox-group>

					<el-form-item v-if="form.hdtx.toString().indexOf('短信提醒') != -1 " label="" style="margin-bottom:10px;background: #F5F9FB;overflow: hidden;margin-right: 40px;margin-left:20px;">
						<div class="hdtx_dxtx">
							<div class="dxmb_text">
								<cite v-model="message.info_content">{{message.info_content}}</cite>
							</div>
						</div>

					</el-form-item>

					<el-form-item v-if="form.hdtx.toString().indexOf('微信提醒') != -1 || form.hdtx.toString().indexOf('短信提醒') != -1" label="" style="margin-bottom:10px;">
						<em style="display:block;clear:both;margin-left:92px;margin-top:6px;margin-bottom:6px;line-height:20px;">提醒时间<span style="color: #9AABB8;">(同时赠礼)</span></em>
						<div class="hdtx_txsj">
							<el-radio class="radio" v-model="tixingshijian" label="1" disabled>即刻提醒</el-radio>
							<cite>(评价后马上提醒)</cite>
						</div>

					</el-form-item>
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

				<el-form-item label="参与群体:" prop="qunti" required>
					<!--<el-form-item label="参与群体:" prop="membership_groups">-->
					<el-radio-group v-model="form.qunti">
						<el-radio class="radio" @click.native="qubuhuiyuanFunction" label="0">全部会员</el-radio>
						<el-radio class="radio" label="1">指定会员群体</el-radio>
					</el-radio-group>
					<em class="botton_text" v-if="form.qunti == 1 " @click="openDialogQunti">选择群体</em>
					<ul class="xuanze" v-if="hyqt_select_data.length > 0">
						<li v-for="item in hyqt_select_data"><em>{{item.group_name}}({{item.members_count}}人)</em>
							<img src="../../assets/huodong/close.svg" @click="deleteItem(hyqt_select_data,item,'qunti')" />
						</li>
					</ul>
				</el-form-item>
				<el-form-item label="" v-if="hyqt_select_data.length > 0">
					<div class="cyqt_person_num">
						<h1>预计参与人数</h1>
						<tt v-model="count">{{count | thousand}}</tt>
						<cite>人</cite>
					</div>
				</el-form-item>
				
				<el-form-item label="投放渠道:" prop="chanels" class="pjzl_tfqd">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkAll">全部</el-checkbox>
					<el-checkbox-group v-model="form.chanels" @change="handleCheckedChanelsChange">
						<el-checkbox v-for="(item,index) in tfqdData" :key='index' :label="item.id" :name="item.id">{{item.text}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>

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
	import { formatDate } from '@/utils/index';
	import { TzxCouponSelect} from '@/components/tzxcouponselect';
	import { TzxCouponView } from '@/components/tzxcouponview'
	import { TzxTreeSelect } from '@/components/tzxtreeselect';
	import { TzxGroupSelect } from '@/components/tzxgroupselect';
    import { TzxTag } from '@/components/tag'
	import { getMendian, getHuiyuanQudao, getHuiyuanQunti, getYouHuiQuanOne, getYouHuiQuan, saveZengli } from '@/api/home'
	import { findEvalGift, findSmsTemplate, findEvalgiftActivityDetail } from '@/api/activity'
	import axios from "axios";

	export default {
		components:{TzxCouponSelect,TzxCouponView,TzxTreeSelect,TzxTag,TzxGroupSelect},
		data() {
			return {
				///111111111
      //	treedata:{"success":true,"msg":"成功","data":[{"children":[{"count":0,"id":0,"label":"品牌总部","labelc":"品牌总部"},{"count":3,"id":90,"label":"北京测试","type":1,"children":[{"count":0,"id":129,"label":"北京测试2","type":3,"plabels":"北京测试","labelc":"北京测试2"},{"count":0,"id":124,"label":"北方项目","type":3,"plabels":"北京测试","labelc":"北方项目"},{"count":0,"id":91,"label":"五道口","type":3,"plabels":"北京测试","labelc":"五道口"}],"labelc":"北京测试(3)"},{"count":5,"id":108,"label":"产品中心测试专用","type":1,"children":[{"count":0,"id":111,"label":"李露测试门店01","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店01"},{"count":0,"id":114,"label":"黄娟的店测试专用","type":3,"plabels":"产品中心测试专用","labelc":"黄娟的店测试专用"},{"count":0,"id":113,"label":"李露测试门店03","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店03"},{"count":0,"id":112,"label":"李露测试门店02","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店02"},{"count":0,"id":181,"label":"朱磊测试门店","type":3,"plabels":"产品中心测试专用","labelc":"朱磊测试门店"}],"labelc":"产品中心测试专用(5)"},{"count":3,"id":144,"label":"供应链测试","type":1,"children":[{"count":0,"id":148,"label":"门店3","type":3,"plabels":"供应链测试","labelc":"门店3"},{"count":0,"id":146,"label":"门店1","type":3,"plabels":"供应链测试","labelc":"门店1"},{"count":0,"id":147,"label":"门店2","type":3,"plabels":"供应链测试","labelc":"门店2"}],"labelc":"供应链测试(3)"},{"count":2,"id":105,"label":"zcs","type":1,"children":[{"count":0,"id":107,"label":"蓝天白云","type":3,"plabels":"zcs","labelc":"蓝天白云"},{"count":0,"id":106,"label":"白云店","type":3,"plabels":"zcs","labelc":"白云店"}],"labelc":"zcs(2)"},{"count":1,"id":74,"label":"面香八方","type":1,"children":[{"count":0,"id":75,"label":"面香八方现代城店","type":3,"plabels":"面香八方","labelc":"面香八方现代城店"}],"labelc":"面香八方(1)"},{"count":2,"id":76,"label":"自定义","type":1,"children":[{"count":0,"id":77,"label":"第一家餐厅","type":3,"plabels":"自定义","labelc":"第一家餐厅"},{"count":0,"id":78,"label":"第二家餐厅","type":3,"plabels":"自定义","labelc":"第二家餐厅"}],"labelc":"自定义(2)"},{"count":1,"id":70,"label":"脸谱","type":1,"children":[{"count":0,"id":71,"label":"朝阳门店","type":3,"plabels":"脸谱","labelc":"朝阳门店"}],"labelc":"脸谱(1)"},{"count":20,"id":2,"label":"实施专用分公司","type":1,"children":[{"count":0,"id":87,"label":"测试店","type":3,"plabels":"实施专用分公司","labelc":"测试店"},{"count":0,"id":34,"label":"实施专用101","type":3,"plabels":"实施专用分公司","labelc":"实施专用101"},{"children":[{"count":0,"id":13,"label":"yitaoshi","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"yitaoshi"},{"count":0,"id":117,"label":"复华测试店","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"复华测试店"},{"count":0,"id":121,"label":"实施测试0421","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"实施测试0421"},{"count":0,"id":12,"label":"sundanen-ceshi","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"sundanen-ceshi"},{"count":0,"id":54,"label":"上海实施测试1","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"上海实施测试1"},{"count":0,"id":18,"label":"测试门店4","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"测试门店4"}],"plabels":"实施专用分公司","count":6,"id":5,"label":"实施门店1","type":1,"labelc":"实施门店1(6)"},{"count":0,"id":99,"label":"zlx测试","type":3,"plabels":"实施专用分公司","labelc":"zlx测试"},{"count":0,"id":103,"label":"Majc","type":3,"plabels":"实施专用分公司","labelc":"Majc"},{"count":0,"id":7,"label":"测试门店2","type":3,"plabels":"实施专用分公司","labelc":"测试门店2"},{"count":0,"id":123,"label":"实施测试HDB866","type":3,"plabels":"实施专用分公司","labelc":"实施测试HDB866"},{"count":0,"id":4,"label":"测试门店1","type":3,"plabels":"实施专用分公司","labelc":"测试门店1"},{"count":0,"id":33,"label":"实施门店12","type":3,"plabels":"实施专用分公司","labelc":"实施门店12"},{"count":0,"id":42,"label":"亮健容天测试","type":3,"plabels":"实施专用分公司","labelc":"亮健容天测试"},{"count":0,"id":11,"label":"实施门店2","type":3,"plabels":"实施专用分公司","labelc":"实施门店2"},{"count":0,"id":30,"label":"实施门店6","type":3,"plabels":"实施专用分公司","labelc":"实施门店6"},{"count":0,"id":14,"label":"实施门店3","type":3,"plabels":"实施专用分公司","labelc":"实施门店3"},{"count":0,"id":36,"label":"实施测试7","type":3,"plabels":"实施专用分公司","labelc":"实施测试7"},{"count":0,"id":45,"label":"云南xx酒楼","type":3,"plabels":"实施专用分公司","labelc":"云南xx酒楼"},{"count":0,"id":27,"label":"实施门店5","type":3,"plabels":"实施专用分公司","labelc":"实施门店5"},{"count":0,"id":58,"label":"ns","type":3,"plabels":"实施专用分公司","labelc":"ns"},{"count":0,"id":53,"label":"昆明测试门店90","type":3,"plabels":"实施专用分公司","labelc":"昆明测试门店90"},{"count":0,"id":93,"label":"relayh测试门店","type":3,"plabels":"实施专用分公司","labelc":"relayh测试门店"},{"count":0,"id":94,"label":"范文涛","type":3,"plabels":"实施专用分公司","labelc":"范文涛"}],"labelc":"实施专用分公司(20)"},{"count":11,"id":3,"label":"开发专用分公司","type":1,"children":[{"count":0,"id":140,"label":"OM认证测试","type":3,"plabels":"开发专用分公司","labelc":"OM认证测试"},{"count":0,"id":128,"label":"开店流程测试","type":3,"plabels":"开发专用分公司","labelc":"开店流程测试"},{"count":0,"id":40,"label":"0305开发郭沈厅","type":3,"plabels":"开发专用分公司","labelc":"0305开发郭沈厅"},{"count":0,"id":24,"label":"开发门店2","type":3,"plabels":"开发专用分公司","labelc":"开发门店2"},{"count":0,"id":46,"label":"张晓丽测试专用","type":3,"plabels":"开发专用分公司","labelc":"张晓丽测试专用"},{"count":0,"id":38,"label":"开发高健","type":3,"plabels":"开发专用分公司","labelc":"开发高健"},{"count":0,"id":80,"label":"分公司测试123","type":3,"plabels":"开发专用分公司","labelc":"分公司测试123"},{"count":0,"id":37,"label":"白青冉专用测试","type":3,"plabels":"开发专用分公司","labelc":"白青冉专用测试"},{"count":0,"id":72,"label":"演示专用","type":3,"plabels":"开发专用分公司","labelc":"演示专用"},{"children":[{"count":0,"id":68,"label":"物流测试01店","type":3,"plabels":"物流测试专用-开发专用分公司","labelc":"物流测试01店"}],"plabels":"开发专用分公司","count":1,"id":66,"label":"物流测试专用","type":1,"labelc":"物流测试专用(1)"},{"count":0,"id":6,"label":"开发门店1","type":3,"plabels":"开发专用分公司","labelc":"开发门店1"}],"labelc":"开发专用分公司(11)"},{"count":32,"id":1,"label":"测试专用分公司","type":1,"children":[{"count":0,"id":199,"label":"测试门店21ww","type":3,"plabels":"测试专用分公司","labelc":"测试门店21ww"},{"count":0,"id":200,"label":"测试门店20yk","type":3,"plabels":"测试专用分公司","labelc":"测试门店20yk"},{"count":0,"id":201,"label":"测试新增","type":3,"plabels":"测试专用分公司","labelc":"测试新增"},{"count":0,"id":120,"label":"实施李浩测试","type":3,"plabels":"测试专用分公司","labelc":"实施李浩测试"},{"count":0,"id":101,"label":"ceshi","type":3,"plabels":"测试专用分公司","labelc":"ceshi"},{"count":0,"id":97,"label":"测试望京店勿动","type":3,"plabels":"测试专用分公司","labelc":"测试望京店勿动"},{"count":0,"id":196,"label":"s测试14","type":3,"plabels":"测试专用分公司","labelc":"s测试14"},{"count":0,"id":16,"label":"报表专用测试（勿动）","type":3,"plabels":"测试专用分公司","labelc":"报表专用测试（勿动）"},{"count":0,"id":28,"label":"快餐自动化（ZC勿动）","type":3,"plabels":"测试专用分公司","labelc":"快餐自动化（ZC勿动）"},{"count":0,"id":29,"label":"天子星望京店","type":3,"plabels":"测试专用分公司","labelc":"天子星望京店"},{"count":0,"id":73,"label":"localw快餐测试","type":3,"plabels":"测试专用分公司","labelc":"localw快餐测试"},{"count":0,"id":31,"label":"测试门店18勿动","type":3,"plabels":"测试专用分公司","labelc":"测试门店18勿动"},{"count":0,"id":15,"label":"测试门店6","type":3,"plabels":"测试专用分公司","labelc":"测试门店6"},{"count":0,"id":98,"label":"刘美丽微信测试专用","type":3,"plabels":"测试专用分公司","labelc":"刘美丽微信测试专用"},{"count":0,"id":122,"label":"北区项目实施测试用","type":3,"plabels":"测试专用分公司","labelc":"北区项目实施测试用"},{"count":0,"id":88,"label":"postest勿动","type":3,"plabels":"测试专用分公司","labelc":"postest勿动"},{"count":0,"id":25,"label":"正餐自动化（KC勿动）","type":3,"plabels":"测试专用分公司","labelc":"正餐自动化（KC勿动）"},{"count":0,"id":151,"label":"822测试","type":3,"plabels":"测试专用分公司","labelc":"822测试"},{"count":0,"id":156,"label":"门店A","type":3,"plabels":"测试专用分公司","labelc":"门店A"},{"count":0,"id":184,"label":"ljl测试","type":3,"plabels":"测试专用分公司","labelc":"ljl测试"},{"count":0,"id":168,"label":"青岛海鲜专卖店","type":3,"plabels":"测试专用分公司","labelc":"青岛海鲜专卖店"},{"count":0,"id":163,"label":"黄焖鸡","type":3,"plabels":"测试专用分公司","labelc":"黄焖鸡"},{"children":[{"count":0,"id":167,"label":"测试123","type":3,"plabels":"华南区测试-测试专用分公司","labelc":"测试123"}],"plabels":"测试专用分公司","count":1,"id":166,"label":"华南区测试","type":1,"labelc":"华南区测试(1)"},{"count":0,"id":174,"label":"济南测试","type":3,"plabels":"测试专用分公司","labelc":"济南测试"},{"count":0,"id":165,"label":"测试店面","type":3,"plabels":"测试专用分公司","labelc":"测试店面"},{"count":0,"id":197,"label":"zyx没有初始化的机构","type":3,"plabels":"测试专用分公司","labelc":"zyx没有初始化的机构"},{"count":0,"id":9,"label":"正餐-秒付-Netty11","type":3,"plabels":"测试专用分公司","labelc":"正餐-秒付-Netty11"},{"count":0,"id":19,"label":"杨旭测试店","type":3,"plabels":"测试专用分公司","labelc":"杨旭测试店"},{"count":0,"id":85,"label":"localw正餐测试","type":3,"plabels":"测试专用分公司","labelc":"localw正餐测试"},{"count":0,"id":17,"label":"测试门店8","type":3,"plabels":"测试专用分公司","labelc":"测试门店8"},{"count":0,"id":83,"label":"一鸣的没店","type":3,"plabels":"测试专用分公司","labelc":"一鸣的没店"},{"count":0,"id":10,"label":"测试门店5","type":3,"plabels":"测试专用分公司","labelc":"测试门店5"}],"labelc":"测试专用分公司(32)"},{"count":1,"id":176,"label":"分公司1","type":1,"children":[{"count":0,"id":178,"label":"测试门店","type":3,"plabels":"分公司1","labelc":"测试门店"}],"labelc":"分公司1(1)"},{"count":2,"id":185,"label":"沙县小吃001","type":1,"children":[{"count":0,"id":186,"label":"测试门店001","type":3,"plabels":"沙县小吃001","labelc":"测试门店001"},{"count":0,"id":187,"label":"测试门店002","type":3,"plabels":"沙县小吃001","labelc":"测试门店002"}],"labelc":"沙县小吃001(2)"}],"count":13,"id":9999,"label":"全部机构","labelc":"全部机构"}]},
      	//222222222222
				loading1: false,
				//处理活动赠礼的样式
				isclass: false, //不显示块
				acitivities: [], //已经创建得活动列表
				message: {
					"template_id": 0,
					"info_content": ""
				}, //选中的信息模板的id
				checkAll: false, //全选
				isIndeterminate: false,
				tishi: false,
				tixingshijian: "1", //提醒时间
				hdzl: [], //活动赠礼

				/*yhqData:[],//优惠券*/
				hyqtData: [], //会员群体
				hyqt_select_data: [], //选择的会员群体
				tableDataFilter_parent: [], //会员群体回显
				//hyqt_select_data_temp: [], //选择的会员群体 过程变量
				//members_count: 0, //会员群体列表中选择的人数
				count: 0, //会员群体列表中选择的人数
				dialogQunti: false,
				tfqdData: [], //投放渠道

                //优惠券开始
				my_syn_status:'',//关注状态
		      	mydialogSelectYouhuiQuan:false,
		      	yhqCheckedData_my:[],//已经选择的优惠券
		      	yhqAllData_my:[],//优惠券列表
		      	detailCoupons:[],//回西安的优惠券数组
		      	yhqCheckedData_show:[],//展示数据，仅仅展示
		      	yhqOneData:{},
		      	yhqZengQuan:false,//赠送优惠券复选框默认 false 不显示赠券设置
		      	yhqZengJiFen:false,//赠送积分复选框默认 false 不显示赠券设置
		      	dialogViewYouhuiQuan: false,
				//优惠券结束
				
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				dialogVisible: false,
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
				chanels: [] //渠道 表单验证使用
					,
				form: {
					subject: "", //主题
					start_time: "",
					end_time: "",
					store_ids: "", //门店 0全部
					membership_groups: 0, //群体 0全部  "201,203"
					chanels: [],
					reward_credit: 0, //积分
					tl: [],
					activity_type: "evalgift", //默认赠礼
					introduction: "",
					remark: "", //无
					reason: "", //无	
					mendian: '0', //默认全部门店
					qunti: '0', //默认群体
					hdzl: [], //活动赠礼
					stores:'0',
					alert_mode: 0, //0 :不提醒，1：微信，2：短信，3 微信+短信
					sms_template_id: 0, //短信模板id

					hdtx: [], //活动提醒
					start_end_date: [] //开始结束时间
				},
				rules: {
					subject: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在 1 到 20 个字符',
							trigger: 'blur'
						}
					],
					/*start_end_date: [
					  { type: 'array',required: true, message: '请选择日期范围', trigger: 'change' }
					],*/
					start_time: [{
						type: 'date',
						required: true,
						message: '请选择开始日期',
						trigger: 'change'
					}],
					end_time: [{
						type: 'date',
						required: true,
						message: '请选择结束日期',
						trigger: 'change'
					}],
					hdzl: [{
						type: 'array',
						required: true,
						message: '请选择活动赠礼',
						trigger: 'change'
					}],
					hdtx: [{
						type: 'array',
						required: true,
						message: '请选择活动提醒',
						trigger: 'change'
					}],

					chanels: [{
						type: 'array',
						required: true,
						message: '请选择渠道',
						trigger: 'change'
					}]
				},
				activityId: '' //form表单回显时用到

			};
		},
		methods: {
			dateFilter(value) {
				if(value!=null&&value!=""){
					return value.substring(0, 10);
				}else{
					return "";
				}
			},
			handleCheckAllChange(event) {
				let arrays = [];
				this.tfqdData.forEach(item => {
					arrays.push(item.id);
				})
				this.form.chanels = event.target.checked ? arrays : [];
				this.isIndeterminate = false;
			},
			handleCheckedChanelsChange(value) {
				/*判断当前是否全部勾选*/
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.tfqdData.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.tfqdData.length;
			},
			dateChange(val) {},
			changTiShi() {
				this.tishi = !this.tishi;
			},
			getDialogStatus(flag){
	    		this.mydialogSelectYouhuiQuan = flag;
	    	},
	    	getYhqAllData(yhqAllData){
	    		this.yhqAllData_my = yhqAllData;
	    	},
	    	getYhqCheckedData(yhqCheckedDataIds,editYhqData){
	    		this.yhqCheckedData_my = yhqCheckedDataIds;//返回选择的优惠券
			  	this.yhqCheckedData_show = editYhqData ;
	    	},
	    	myquedingButton(yhqCheckedDataIds){
	    		this.yhqCheckedData_my = yhqCheckedDataIds;//返回选择的优惠券
	    		let checkArrays = [];
			  	yhqCheckedDataIds.forEach(item=>{// 260,279,280
			  		let ojb = this.yhqAllData_my.filter(item2=>item2.id == item)[0];//再all中是否存在
			  		let ojb2 = this.yhqCheckedData_show.filter(item2=>item2.id == item)[0];//再 show中是否存在
			  		if(ojb2 != null){// 存在
			  			checkArrays.push(ojb2);
			  		}else{//不存在
			  			checkArrays.push(ojb);
			  		}
			  	})
			  	this.yhqCheckedData_show = checkArrays ;
	    		this.mydialogSelectYouhuiQuan = false;
	    		this.isclass = true;
	    	},
			onSubmit(form) {

				this.$refs[form].validate((valid) => {
					if(valid) {

						var start = new Date(this.form.start_time);
						let start_time = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();

						var end = new Date(this.form.end_time);
						let end_time = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();

						if(start.getTime() > end.getTime()) {
							this.$message({
								type: 'error',
								message: '结束日期不能晚于开始日期'
							});
							return false;
						}
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
					  	
					  	
						//拼装群体
						//如果是全部会员则存储0
						let qunti_str = "";
						if(this.form.qunti == 0) { //全部群体
							qunti_str = 0;
						} else {
							//判断群体下是否有数据 至少要要有一个数据
							if(this.hyqt_select_data.length == 0) {
								this.$message({
									type: 'error',
									message: '至少选择一个群体'
								});
								return false;
							} else {
								if(this.count == 0) {
									this.$message({
										type: 'error',
										message: '会员群体人数不能是0人'
									});
									return false;
								}
							}

							let qunti = [];
							this.hyqt_select_data.forEach(item => {
								if(item.id==undefined||item.id==null){
									qunti.push(item.membership_group_id)
								}
								else{
									qunti.push(item.id);
								}
								
							});
							qunti_str = qunti.join(",");
						}

						//拼装优惠券
					  	//选中的优惠券yhqCheckedData_my ids数组  ，从优惠券列表中过滤
					  	let yhq = [];
					  	this.yhqCheckedData_show.forEach(item=>{
					  		let number2 = item.reward_coupon;
					  		//let obj = this.yhqAllData_my.filter(item2=>item2.id == item.id)[0].tl;
					  		let obj = item.tl
					  		obj.reward_coupon= number2;
					  		yhq.push(obj);
					  	})
					  	this.yhqCheckedData_my = yhq ;
					  	let yhq_json = JSON.stringify(yhq);
						
						if(this.form.hdzl.toString().indexOf('赠送优惠券') != -1) {

							if(this.yhqCheckedData_my.length == 0) {
								this.$message({
									type: 'error',
									message: '请选择优惠券'
								});
								return false;
							}

							let flag = true;
							this.yhqCheckedData_my.forEach(item => { //每个优惠券至少添加1张
								let reg_zhengshu = /^[0-9]*[1-9][0-9]*$/;
								if(reg_zhengshu.test(item.reward_coupon)) { //正整数
								} else { //正整数
									flag = false;
								}
							});
							if(!flag) {
								this.$message({
									type: 'error',
									message: '请输入正整数'
								});
								return false;
							}

						}
						if(this.form.hdzl.toString().indexOf('赠积分') != -1) {
							/*if(isNaN(this.form.reward_credit)){//数字*/
							if(this.form.reward_credit <= 0) {
								this.$message({
									type: 'error',
									message: '请输入大于0的积分'
								});
								return false;
							} else {
								let reg_zhengshu = /^[1-9]\d*$/;
								if(reg_zhengshu.test(this.form.reward_credit)) { //判断是否是整数
									if(this.form.reward_credit.length > 8){
										this.$message({
											type: 'error',
											message: '请输入小于等于八位的积分'
										});
										return false;
									}
								} else { //非整数
									//判断积分是否 大于0 且为以一位小数
									let reg_xiaoshuo = /^([1-9]\d*|0)(\.\d{0,1})?$/;
									if(!reg_xiaoshuo.test(this.form.reward_credit)) {
										this.$message({
											type: 'error',
											message: '请输入一位小数的积分'
										});
										return false;
									}else{
										let zs = parseInt(this.form.reward_credit);
										if(zs.toString().length > 8){
											this.$message({
												type: 'error',
												message: '请输入小于等于八位的积分'
											});
											return false;
										}
									}
								}
							}
						}else{
							this.form.reward_credit = '';
						}

						/*if(this.form.hdzl.toString().indexOf('赠送优惠券') != -1) {
							let yhq = []
							this.yhqCheckedData.forEach(item => {
								let obj = item.tl;
								obj.reward_coupon = item.reward_coupon;
								yhq.push(obj);
							});
							var yhq_json = JSON.stringify(yhq);
						}*/

						//拼装渠道
						let qudao_str = this.form.chanels.join(",");

						//活动提醒
						let alert_mode = 0; //0 :不提醒，1：微信，2：短信，3 微信+短信
						if(this.form.hdtx != null) {
							if(this.form.hdtx.toString().indexOf("微信提醒") != -1 && this.form.hdtx.toString().indexOf("短信提醒") != -1) {
								alert_mode = 3
							} else if(this.form.hdtx.toString().indexOf("微信提醒") != -1) {
								alert_mode = 1
							} else if(this.form.hdtx.toString().indexOf("短信提醒") != -1) {
								alert_mode = 2
							}
						}

						let data = "id=" + this.activityId +
							"&subject=" + this.form.subject +
							"&start_time=" + start_time +
							"&end_time=" + end_time +
							"&store_ids=" + mendian_str +
							"&membership_groups=" + qunti_str +
							"&chanels=" + qudao_str +
							"&reward_credit=" + this.form.reward_credit +
							"&tl=" + yhq_json +
							"&activity_type=evalgift" +
							"&introduction=" +
							"&remark=" +
							"&reason=" +
							"&sms_template_id=" + this.message.template_id +
							"&alert_mode=" + alert_mode ;
						

						this.loading1 = true;

						saveZengli(data).then((response) => {
							this.loading1 = false;
							if(response.code == 0) {
								this.$message({
									type: 'success',
									message: '保存成功'
								});
								this.$router.push({
									path: "/marketing/activitymanagement",
									hash: 'new'
								});
							} else {
								this.$message({
									type: 'error',
									message: response.msg
								});
							}
						})

					} else {
						return false;
					}
				});

			},
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			loadQudao() {
				getHuiyuanQudao().then((response) => {
					this.tfqdData = response;
				})
			},
			loadQunti() {
				getHuiyuanQunti().then((response) => {
					this.hyqtData = response;
					//过滤会员群体添加的清除的对象  之前老系统 是下拉框有清楚
					this.hyqtData = this.hyqtData.filter((obj, index) => {
						return obj.id != 'clear'
					});
				})
			},
			loadTree() {
				getMendian().then((response) => {
					this.storeData =  response.data;
				})
			},
			loadMessage() {
				/*this.dialogMessageVisible = true;
				axios.get('http://localhost:9280/static/message.json').then((response) => {
					this.messageList = response.data.data;
				})*/
			},
			loadFindSmsTemplate() {
				findSmsTemplate().then((response) => {
					this.message = response.data;
				})
			},
			loadFindEvalGift() {
				findEvalGift().then((response) => {
					this.acitivities = response.data;
					this.acitivities.forEach(item => {
						let stores = item.stores;
						let stores_temp = [];
						stores.forEach(item2 => {
							stores_temp.push(item2.org_full_name);
						})
						item.stores = stores_temp;
					})
				})
			},

			qubuhuiyuanFunction: function() { //全部会员
				this.hyqt_select_data = [];
				this.hyqt_select_data_temp = [];
				this.members_count = [];
				this.count = [];

			},
			getYouHuiQuan:function(){//选择优惠券弹出框  
				this.mydialogSelectYouhuiQuan = true;
			},
			viewYouhuiQuan: function(id) { //查看单个优惠券
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
					storesname.forEach(item => {
						storeidsname.push(item.org_full_name);
					})
					let storeids_strname = storeidsname.join(",")
					obj.store_names = storeids_strname;
					//2,周期
					let use_cycle_names = this.yhqOneData.use_cycle.split(",");
					let use_cycle_names_new = [];
					use_cycle_names.forEach(item => {
						if(item == "2") {
							use_cycle_names_new.push("周一");
						} else if(item == "3") {
							use_cycle_names_new.push("周二");
						} else if(item == "4") {
							use_cycle_names_new.push("周三");
						} else if(item == "5") {
							use_cycle_names_new.push("周四");
						} else if(item == "6") {
							use_cycle_names_new.push("周五");
						} else if(item == "7") {
							use_cycle_names_new.push("周六");
						} else if(item == "1") {
							use_cycle_names_new.push("周日");
						}
					})
					let cycle_names = use_cycle_names_new.join(",")
					obj.cycle_names = cycle_names;

					//3,改造使用渠道
					let chanels = this.yhqOneData.use_chanel;
					let chanelids = [];
					chanels.forEach(item => {
						chanelids.push(item.chanel_name);
					})
					let chanelids_str = chanelids.join(",")
					obj.use_chanel = chanelids_str;
					this.yhqOneData = obj;
				});
			},
			open() {
				this.$router.push("/marketing/activitymanagement");
			},
			handleViewYouhuiQuanClose(done) {
				done();
			},
			handleMendianClose(done) {
				done();
			},
			handleQuntiClose(done) {
				done();
			},
			openDialogQunti: function(e) { //打开会员群体，发送会员群体请求
				this.dialogQunti = true;
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
					this.yhqCheckedData_show = arrays;
					//this.yhqCheckedData_my.shift(item);
					this.yhqCheckedData_my.forEach(item =>{
						if(item.id = it.id){
							this.yhqCheckedData_my.shift(item);
						}
					})
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
			//会员群体确定
			quntiMakeSureChecked(quntiData_select,quntiData,member_total_count){
				this.hyqt_select_data = quntiData_select;
				this.count = member_total_count;
				this.hyqtData = quntiData;
				this.dialogQunti = false;
			},
			quntiCancleButton(){
				this.dialogQunti = false;
			},
			updateFormData(id, activity_type) {

				this.activityId = id;
				let query = 'id=' + id + '&activity_type=' + activity_type;
				this.loading1 = true;
				findEvalgiftActivityDetail(query).then(response => {
					    this.loading1 = false;
						let detail = response;
						//axios.get('http://localhost:9280/static/awaken_detail.json').then((response) => {
						//let detail = response.data;

						/* form 表单回显*/

						this.form.subject = detail.subject; //主题  
						this.form.start_time = Assist.formatStrToDate(detail.start_time);
						this.form.end_time = Assist.formatStrToDate(detail.end_time);

						//活动赠礼
						if(detail.coupons.length > 0) {

							this.form.hdzl.push('赠送优惠券')
							//优惠券展示
							this.detailCoupons =  detail.coupons;
							this.isclass = true; //回显已经选择得优惠券
							//绑定优惠券详细信息

						}
						if(detail.reward_credit > 0) {
							//赠送积分
							this.form.hdzl.push('赠积分');
							this.form.reward_credit = detail.reward_credit
						}
						//提醒方式
						if(detail.alert_mode == 0) {
							this.form.hdtx = [];
						} else if(detail.alert_mode == 1) {
							this.form.hdtx.push('微信提醒');
						} else if(detail.alert_mode == 2) {
							this.form.hdtx.push('短信提醒');
							//短信提醒 不用修改
						} else {
							this.form.hdtx.push('微信提醒');
							this.form.hdtx.push('短信提醒');
						}
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
			    		
						/* 群体回显*/

						if(detail.groups.length == 1 && detail.groups[0].membership_group_id == 0) {
							this.form.qunti = "0";
						} else {
							this.form.qunti = "1";
							//处理会员群体回显数据，必须和会员群体弹出框数据字段名称一致
							let hyqt_select_data_new = [];
					    	detail.groups.map((item,index)=>{
								hyqt_select_data_new.push(this.hyqtData.filter(item20=>item20.id == item.membership_group_id)[0]);
					    	});
					    	this.hyqt_select_data = hyqt_select_data_new;
					    	//this.hyqt_select_data_temp = hyqt_select_data_new;
					    	
							detail.groups.map((item, index) => {
								this.count += item.members_count
							});

							detail.groups.map((item, i) => {
								this.tableDataFilter_parent.push(this.hyqtData.filter((obj, index) => {
									return item.membership_group_id == obj.id
								})[0]);
							})
						}
						/*渠道回显*/
						detail.chanels.map((item, index) => {
							this.form.chanels.push(item.chanel)
						});
						//判断是否是全部渠道
						this.handleCheckedChanelsChange(detail.chanels);
						
						//this.$nextTick(function() {
							//页面全部渲染完成之后执行的异步回调方法	
							//this.loading1 = false;
						//})

					})

				}
		},
			
	created() {
		_czc.push(["_trackEvent", "营销活动-评价赠礼", "新增编辑"]);//埋点统计
		this.loadTree();
		this.loadQudao(); //会员群体渠道
		this.loadQunti(); //加载会员群体
		this.loadFindSmsTemplate();
		//查询已经存在得活动
		this.loadFindEvalGift();
		if(this.$route.query.id != undefined && this.$route.query.activity_type != undefined) {
			this.updateFormData(this.$route.query.id, this.$route.query.activity_type);
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	/**修改表单的样式**/
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
		margin: 0;
	}
	.divOne {
		height: 250px;
		background: #FFFFFF;
		border: 1px solid #EAF1F6;
		margin-left: 15px;
	}
	/**************优惠券详情 开始*******************/
	
	.viewyhq_dialog {
		width: 440px;
		.el-dialog__header {
			border: none;
			height: 0px;
		}
	}
	/**************优惠券详情 结束*******************/
	/**************新增优惠券 开始*******************/
	
	.addyhq_dialog {
		width: 460px;
		height: 320px;
	}
	
	.addyhq {
		margin: 0 auto;
		margin-top: 20px;
		img {
			margin-left: 180px;
			width: 100px;
			height: 100px;
		}
		cite {
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
	}
	
	.addyhq_add {
		margin-top: 31px;
		margin-left: 181px;
	}
	/**************新增优惠券 结束*******************/
	/*****选择优惠券 开始*******/
	
	.xzyhq_dialog {
		width: 660px;
		height: 500px;
		.el-dialog_body {
			width: 656px;
			height: 500px;
			padding: 20px 12px;
		}
		.xzyhq {
			height: 397px;
			padding: 0px;
		}
	}
	
	.xzyhq_close .bottom_64_32 .queding {
		margin-left: 10px;
		margin-right: 0px;
	}
	
	.xzyhq_dialog .xzyhq_close {
		width: 660px;
		height: 60px;
		background: #F4F9FC;
		box-shadow: 0 0 4px 0 rgba(44, 70, 128, 0.16);
		.bottom_64_32 {
			margin-top: 14px;
			margin-left: 259px;
		}
	}
	.xzyhq {
		.xzyhq_search {
			height: 34px;
			padding-top: 20px;
			padding-left: 20px;
			cursor: pointer;
			.el-input {
				float: left;
				width: 180px;
			}
			.el-input__inner {
				height: 28px;
				width: 180px;
			}
			 h1 {
				font-size: 12px;
				line-height: 12px;
				font-size: 12px;
				color: #0C9AFF;
				letter-spacing: 0;
				float: left;
				margin-left: 12px;
				font-weight: normal;
				margin-top: 7px;
			}
		}
	}
	
	.xzyhq{
		.xzyhq_show {
			clear: both;
			display: block;
			height: 352px;
			padding-left: 12px;
			padding-top: 9px;
			ul {
				margin: 0;
				padding: 0;
				list-style: none;
				li {
					float: left;
					width: 315px;
					height: 110px;
					background-image: url(../../assets/huodong/yhjbg.png);
					background-size: 100%;
					.xzyhq_show_left {
						float: left;
						margin-left: 26px;
						margin-top: 32px;
						width: 88px;
						.xzyhq_show_left_up{
							cite {
								display: block;
								float: left;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #FF6161;
								line-height: 14px;
								font-style: normal;
								margin-top: 12px;
							}
							tt {
								display: block;
								font-family: PingFangSC-Regular;
								font-size: 30px;
								color: #FF6161;
								line-height: 30px;
								margin-left: 4px;
							}
							
						} 
					}
					.xzyhq_show_left_down {
						margin-top: 4px;
						em {
							clear: both;
							font-style: normal;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #576D7A;
							line-height: 12px;
						}
					}
					.xzyhq_show_right {
						padding-left: 100px;
						.xzyhq_show_right_left {
							float: left;
							float: left;
							margin-top: 30px;
							margin-left: 10px;
							cite {
								font-family: PingFangSC-Regular;
								font-size: 18px;
								color: #34495E;
								line-height: 18px;
								width: 150px;
								display: block;
								font-style: normal;
								text-overflow: ellipsis;
							    white-space: nowrap;
							    overflow: hidden;
							}
							em {
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #9AABB8;
								line-height: 12px;
								display: block;
								font-style: normal;
								margin-top: 16px;
							}
						}
						.xzyhq_show_right_right {
							float: left;
							margin-top: 40px;
							margin-left: 0px;
							width: 20px;
							height: 20px;
							.el-checkbox__inner {
								width: 20px;
								height: 20px;
								border-radius: 10px;
								
							}
							.el-checkbox__input.is-checked .el-checkbox__inner {
								background: #0c9aff;
								border: 1px solid #20a0ff;
								width: 20px;
								height: 20px;
								border-radius: 10px;
							}
							.el-checkbox__inner::after {
								height: 11px;
								left: 5px;
								top: 0px;
								width: 5px;
							}
						}
					}
				}
				li:hover {
					float: left;
					width: 315px;
					height: 110px;
					background-image: url(../../assets/huodong/yhjbg.png) 0 50%;
					background-size: 100%;
				}
			}
		}
	}
	
	.xzyhq .xzyhq_show .el-checkbox-group .el-checkbox__label {
		display: none;
	}
	/*****选择优惠券 结束*******/
	/**消费后评价赠礼页面**/
	
	.divTwo_xfzl {
		height: auto;
		background: #FFFFFF;
		/*border: 1px solid #EAF1F6;
		margin-left: 15px;*/
		margin-top: 10px;
		display: table;
		width: 100%;
		h1 {
			height: 50px;
			line-height: 50px;
			display: block;
			border-bottom: 1px solid #eaf1f6;
			margin-left: 20px;
			margin-right: 20px;
			font-size: 16px;
			font-style: normal;
			color: #34495E;
			font-weight: normal;
			em {
				margin-left: 10px;
				font-style: normal;
				font-size: 16px;
				letter-spacing: 0
			}
			cite {
				margin-left: 16px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #9AABB8;
				letter-spacing: 0;
				line-height: 16px;
				font-style: normal;
			}
		}
		
	}
	
	.divTwo_xfzl .demo-ruleForm .hdzq_date1 {
		float: left;
	}
	
	.divTwo_xfzl .demo-ruleForm .hdzq_date_em {
		float: left;
		margin-left: 5px;
		margin-right: 5px;
		font-style: normal;
		em {
			font-style: normal;
		}	
	}
	
	.divTwo_xfzl .demo-ruleForm .hdzq_date2 {
		float: left;
	}
	/******表单样式 开始******/
	
	.divTwo_xfzl .el-form {
		margin-top: 20px;
	}
	.divTwo_xfzl .el-form .el-form-item:nth-last-child{
		margin-top: 30px;
	}
	
	.divTwo_xfzl .el-date-editor .el-date-editor--date {
		width: 230px;
	}
	/***活动赠礼***/
	
	.pjzl_hdzl{
		.hdzl {
			margin-left: 0px;
			margin-right: 40px;
			padding-left: 92px;
			background: #F5F9FB;
			border-radius: 3px;
			margin-top: 12px;
			overflow: hidden;
			.zengquanshezhi {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #576D7A;
				line-height: 14px;
				height: 40px;
				width: 70px;
				padding-top: 26px;
				float: left;
			}
			ul {
				float: left;
				margin: 0;
				padding: 0;
				list-style: none;
				padding-top: 5px;
				li {
					line-height: 14px;
					margin-top: 13px;
					height: 20px;
					em {
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
					em:nth-child(3) {
						margin-left: 10px;
    					margin-right: 10px;
					}
					img {
						display: block;
						float: left;
						margin-top: 8px;
					}
					.el-input {
						width: 120px;
						float: left;
					}
				}
			}
		}
		.zqsh_right {
			float: left;
			margin-bottom: 10px;
			.addyouhuiquan {
				clear: both;
				padding: 20px 0px;
				width: 100px;
				img {
					float: left;
					height: 14px;
					margin-right: 4px;
					margin-left: 0;
				}
				div {
					line-height: 14px;
					float: left;
					height: 14px;
					color: #0C9AFF;
				}
				.tianjia {
					width: 70px;
				}
			}
		}
	}
	
	.pjzl_hdzl{
		.hdzl{
			.yhq {
				margin-left: 50px;
			}
			.view {
				margin-left: 10px;
			}
			.delete {
				margin-left: 10px;
			}
		}
		
	} 
	
	.input_height_28 .el-input__inner {
		height: 28px;
		line-height: 28px;
	}
	/**每人赠送**/
	
	.hdzl2 {
		margin-left: 0px;
		margin-right: 40px;
		padding-left: 92px;
		background: #F5F9FB;
		border-radius: 3px;
		height: 50px;
		.meirenzengsong {
			padding-top: 11px;
			margin-bottom: 11px;
			cite {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #34495E;
				font-style: normal;
				margin-right: 24px;
			}
			.el-input__inner {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #34495E;
			}
			 em {
				margin-left: 10px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #34495E;
				font-style: normal;
			}
			.el-input__inner {
				height: 28px;
			}
	
		}
	}
	
	/**选择门店 and 选择群体**/
	
	.divTwo_xfzl{
		.botton_text {
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #0C9AFF;
			line-height: 14px;
			margin-left: 16px;
			font-style: normal;
		}
		.quxiao_and_tijiao {
			height: 92px;
			margin-left: 40px;
			margin-right: 40px;
			border-top: 1px dashed #EAF1F6;
			.bottom_64_32 {
				margin-left: 91px;
				margin-top: 30px;
				margin-bottom: 30px;
			}
		}
		.xuanze {
			list-style: none;
			margin: 0;
			padding: 0;
			margin-top: 7px;
			padding-left: 40px;
			li {
				border: 1px solid #D8E5EC;
				border-radius: 3px;
				width: auto;
				margin-right: 18px;
				float: left;
				line-height: 32px;
				margin-bottom: 7px;
				em {
					margin-left: 8px;
				}
				img {
					margin-left: 5px;
					margin-right: 8px;
				}
			}
		}
	}
	
	.divTwo_xfzl{
		.divTwo_xfzl .cyqt_person_num h1,
		.cyqt_person_num tt,
		.cyqt_person_num cite {
			letter-spacing: 0;
			float: left;
			line-height: 32px;
			height: 32px;
		}
		.cyqt_person_num {
			background: #FFFAEB;
			border: 1px solid #FFE9A7;
			border-radius: 3px;
			height: 32px;
			width: 309px;
			padding-left: 8px;
			margin-left: 40px;
			tt {
				color: #FF7171;
				height: 32px;
				line-height: 32px;
			}
			h1 {
				border: none;
				font-size: 14px;
				margin-left: 0px;
				margin-right: 0px;
				height: 32px;
				line-height: 32px;
				float: left;
			}
		}
		.querenbox {
			height: 360px;
			width: 200px;
			background: red;
			box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
			border-radius: 3px;
			position: absolute;
			z-index: 10000px;
		}
	}
	
	.input_height_28 {
		height: 10px;
		background-image: url(../../assets/huodong/zhang.jpg) no-repeat;
	}
	/***确认提交框**/
	.xzyhq_dialog .xzyhq_show ul {
		height: 332px;
		overflow-y: auto;
	}
	.divTwo_xfzl .el-form .el-form-item__error {
		margin-left: 40px;
	}
	.divTwo_xfzl .el-form .el-form-item .el-form-item .el-form-item__error {
		margin-left: 0px;
	}
	.divTwo_xfzl .yhq_hdzl .el-form-item__content {
		margin-left: 20px !important;
	}
	.divTwo_xfzl .yhq_hdzl .el-form-item__error {
		margin-left: 80px !important;
	}
	.mynumber .el-input__inner {
		text-align: right;
	}
	/*******************调整之后***************************/
	/*******关注赠礼得活动赠礼 提醒时间*********/
	
	.divTwo_xfzl .pjzl_hdzl .txsj {
		background: #F5F9FB;
		border-radius: 3px;
		height: 50px;
		padding-top: 15px;
		margin-right: 40px;
	}
	
	.divTwo_xfzl .pjzl_hdzl .txsj .el-radio__label {
		color: #243546;
	}
	
	.divTwo_xfzl .pjzl_hdzl .txsj cite {
		color: #9AABB8;
	}
	
	.divTwo_xfzl .pjzl_hdzl .txsj .el-radio {
		margin-left: 92px;
	}
	
	.divTwo_xfzl .pjzl_hdzl .el-form-item:nth-child(n+1) .el-form-item__content {
		line-height: 20px;
	}
	
	.divTwo_xfzl .yhq_hdzl .el-form-item__error {
		position: relative;
		padding-left: 30px;
		padding-top: 0px;
	}
	
	.divTwo_xfzl .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(3) {
		margin-left: 50px;
	}
	
	.divTwo_xfzl .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(1) {
		float: left;
	}
	
	.divTwo_xfzl .hdtx_bu_weixin .el-checkbox-group .el-checkbox:nth-child(2) {
		clear: both;
	}
	
	.divTwo_xfzl .hdtx_bu_weixin .el-checkbox-group cite {
		display: block;
		color: #9AABB8;
		width: 400px;
		line-height: 32px
	}
	
	.divTwo_xfzl .hdtx_bu_weixin .el-form-item__content {
		margin-left: 20px!important;
	}
	
	.divTwo_xfzl{
		.hdtx_txsj {
			background: #F5F9FB;
			border-radius: 3px;
			height: 50px;
			padding-left: 92px;
			padding-top: 9px;
			margin-right: 40px;
			.el-radio{
				.el-radio__label {
					color: #243546;
				}
			}
			cite {
				color: #9AABB8;
			}
		}
		.hdtx_bu_weixin .el-form-item__content .el-form-item__error {
			margin-left: 112px;
		}
		.pjzl_tfqd{
			margin-bottom:21px;	
			.el-checkbox-group {
				display: block;
				margin-right: 40px;
				margin-left: 25px;
				margin-bottom:10px;
			}
			.checkAll {
				float: left;
				margin-right: 5px;
			}
		}
	}
	
	.divTwo_xfzl h2 {
		margin: 16px 20px 0;
		background: #FFFCF2;
		border-radius: 3px;
		overflow: hidden;
		img {
			width: 16px;
			height: 16px;
			margin: 8px 10px 0 16px;
			float: left;
		}
		cite {
			font-size: 13px;
			color: #576D7A;
			line-height: 33px;
			float: left;
		}
		cite:nth-child(1) {
			float: left;
			width: 40%;
			display: block;
		}
		a{
			font-size: 13px;
			color: #34495E;
			letter-spacing: 0;
			line-height: 13px;
			padding-left: 10px;
			float: left;
			display: block;
			height: 32px;
			line-height: 32px;
			width: 160px;
		}
		.shouqi {
			background-image: url(../../assets/huodong/shouqi.png);
			background-repeat: no-repeat;
			background-size: 70px 16px;
		}
		.chakangengduo {
			background-image: url(../../assets/huodong/chakangengduo.png);
			background-repeat: no-repeat;
			background-size: 70px 16px;
		}
		ul {
			margin-left: 31px;
			margin-bottom: 10px;
			/*padding-top: 6px;*/
			clear: both;
			overflow: hidden;
			li {
				font-size: 12px;
				color: #576D7A;
				line-height: 20px;
			}
		}
	}
	
	.divTwo_xfzl .hdtx_bu_weixin .el-form-item__content .el-checkbox-group .el-checkbox:nth-child(4) {
		clear: both;
	}
	
	.divTwo_xfzl .hdtx_dxtx {
		/* background: #F5F9FB; */
		border-radius: 3px;
		margin-right: 40px;
		/* overflow: hidden; */
		margin-left: 62px;
	}
	
	.divTwo_xfzl .hdtx_dxtx strong {
		display: block;
		float: left;
		/*padding-left:92px;*/
		color: #576D7A;
		padding-top: 20px;
	}
	
	.divTwo_xfzl .hdtx_dxtx .dxmb_text {
		width: 599px;
		float: left;
	}
	
	.divTwo_xfzl .hdtx_dxtx .dxmb_text cite {
		display: block;
		line-height: 22px;
	}
	
	.divTwo_xfzl .hdtx_dxtx .dxmb_text em {
		clear: both;
		color: #0C9AFF;
	}
	/***********会员群体**************/
	
	.class-no {
		display: none;
	}
	
	.class-yes {
		display: block;
	}
	
	.divTwo_xfzl{
		.el-table .cell{
			float: left;
		}
	}
	
	/*门店*/
	.divTwo_xfzl{
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
	
	/*************************mendian 结束 ***********************/
</style>