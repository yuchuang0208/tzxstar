<template>
	<div class='addmembershipsgroupmanagement'>
		<p class="editTitle"><strong>{{title}}</strong>  根据不同筛选条件创建会员群体，常用于精准营销</p>
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="会员基本信息" name="first">
				<el-form label-width="140px" :model="formData" ref="formData" class="demo-ruleForm">

					<el-form-item label="会员入会时间:" prop="time">
						<el-date-picker size='medium' @change='dataChange' v-model="formData.start_end_date" type="daterange" placeholder="选择日期范围"></el-date-picker>
						<div class="addCar">
							<el-button type="" @click="addToListTime"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="会员年龄段:" prop="start_age" class="pb0">
						<div class="flex ages">
							<div class="time-left">
								<el-input type="Number" style="width:110px;" placeholder="请输入年龄" min="0" v-model="formData.start_age" auto-complete="off"></el-input>
								<span>至</span>
								<el-input type="Number" style="width:110px;" placeholder="请输入年龄" min="0" v-model="formData.end_age" auto-complete="off"></el-input>
							</div>
							<div class="">
								<el-checkbox-group v-model="ages_v">
								    <el-checkbox-button v-for="item in ages" :label="item.text" :key="item.text">{{item.text}}</el-checkbox-button>
								</el-checkbox-group>
							</div>
						</div>
						<div class="addCar">
							<el-button type="" @click="addToListAge(ages_v,'ages','ages_v')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="会员等级:" prop="level" class="pb0">
						<div class="level">
							<el-checkbox-group v-model="dengji_v">
							    <el-checkbox-button v-for="item in showDom.level" :label="item.text" :key="item.text">{{item.text}}</el-checkbox-button>
							</el-checkbox-group>
						</div>
						<div class="addCar">
							<el-button type="" @click="addToLists(dengji_v,'dengji','dengji_v')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="会员性别:" prop="gender" class="pb0">
						<div class="level">
							<el-checkbox-group v-model="xingbie_v">
							    <el-checkbox-button v-for="item in xingbie" :label="item.text" :key="item.text">{{item.text}}</el-checkbox-button>
							</el-checkbox-group>
						</div>
						<div class="addCar">
							<el-button type="" @click="addToLists(xingbie_v,'xingbie','xingbie_v')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="会员生日:" prop="gender" class="pb0">
						<div class="checkedDatas">
							<el-radio v-model="selectD" label="1">全部年限</el-radio>
  							<el-radio v-model="selectD" label="2">指定年月</el-radio>
						</div>
						<div class="level ml30" v-show="showBirthday">
							<el-checkbox-group v-model="shengri_v" class="birthdayBorder">
							    <el-checkbox-button v-for="item in shengri" :label="item.it" :key="item.text">{{item.it}}</el-checkbox-button>
							</el-checkbox-group>
						</div>

						<el-date-picker class="ml30 pb10" v-show="!showBirthday" size='medium' @change='birthdayChange' v-model="formData.birthday_end_date" type="daterange" placeholder="选择日期范围"></el-date-picker>

						<div class="addCar">
							<el-button type="" @click="addToListBirthday(shengri_v,'shengri',selectD,'_v')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="会员星座:" prop="constellation" class="pb0">
						<div class="level">
							<el-checkbox-group v-model="xingzuo_v">
							    <el-checkbox-button v-for="item in showDom.constellation" :label="item.text" :key="item.text">{{item.text}}</el-checkbox-button>
							</el-checkbox-group>
						</div>
						<div class="addCar">
							<el-button type="" @click="addToLists(xingzuo_v,'xingzuo','xingzuo_v')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="会员所属门店:" prop="constellation">
						<!--选择会员所属门店 开始-->
							<tzx-tree-select
							   :data="storeData"
							   unitAndName='家店'
							   @cancelButton='storeDialogVisible = true'
							   @boxChange = 'storeBoxChange'
							   :defaultCheckedId = 'storeCheckedIds'
							   :pnodes= 'storeNodes'
							   :ptotalSelect = 'storeTotal'
							   :defaultProps ='defaultProps'
							   >
						   </tzx-tree-select>
						<!--选择会员所属门店 结束-->

						<div class="addCar">
							<el-button type="" @click ='storeMakeSureChecked'><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="会员入会来源:" prop="constellation">
						<div class="source">
							<el-checkbox-group v-model="laiyuan_v">
							    <el-checkbox-button v-for="item in showDom.chanel" :label="item.text" :key="item.text">{{item.text}}</el-checkbox-button>
							</el-checkbox-group>
						</div>
						<div class="addCar">
							<el-button type="" @click="addToLists(laiyuan_v,'laiyuan','laiyuan_v')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		    <el-tab-pane label="会员消费信息" name="second">
				<el-form label-width="140px" :model="formData" ref="formData" class="demo-ruleForm">

					<el-form-item label="消费周期：" prop="zhouqi_start" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.zhouqi_start">
							<template slot="append">天</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入天数" style="width:140px;" type="number" min="0" v-model.number="formData.zhouqi_end">
							<template slot="append">天</template>
						</el-input>
						<span>内消费</span>
						<div class="addCar">
							<el-button type="" @click="addToListPub('xiaofeizhouqi',formData.zhouqi_start,formData.zhouqi_end,'天内消费')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="消费次数：" prop="xiaofeicishu_day" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.xiaofeicishu_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 累计消费</span>
						<el-input placeholder="请输入次数"  class="wm140" type="number" min="0" v-model.number="formData.xiaofeicishu_start">
							<template slot="append">次</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入次数" style="width:140px;" type="number" min="0" v-model.number="formData.xiaofeicishu_end">
							<template slot="append">次</template>
						</el-input>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('xiaofeicishu','xiaofeicishu_day','xiaofeicishu_start','xiaofeicishu_end','次')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="累计消费：" prop="leijixiaofei_day" :rules="filter_rules({required:false,type:'num'})" class="pb0">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.leijixiaofei_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 累计消费</span>
						<el-input placeholder="请输入金额"  class="wm140" type="number" min="0" v-model.number="formData.leijixiaofei_start">
							<template slot="append">元</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入金额" style="width:140px;" type="number" min="0" v-model.number="formData.leijixiaofei_end">
							<template slot="append">元</template>
						</el-input>

						<el-tooltip placement="top">
						  <div slot="content">统计用户全部消费金额累加的总数<br/>现金消费：指非储值金额消费和积分、优惠券以外的支付方式</div>
						  <icon-svg icon-class='question'></icon-svg>
						</el-tooltip>

						<div>
							<el-radio v-model="leijiChecked" label="3">储值+现金消费</el-radio>
							<el-radio v-model="leijiChecked" label="2">仅储值消费</el-radio>
							<!-- <el-radio v-model="leijiChecked" label="1">仅现金消费</el-radio> -->
						</div>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('leijixiaofei','leijixiaofei_day','leijixiaofei_start','leijixiaofei_end','元',leijiChecked)"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="单笔消费：" prop="danbixiaofei_day" :rules="filter_rules({required:false,type:'num'})" class="pb0">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.danbixiaofei_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 单笔消费</span>
						<el-input placeholder="请输入金额"  class="wm140" type="number" min="0" v-model.number="formData.danbixiaofei_start">
							<template slot="append">元</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入金额" style="width:140px;" type="number" min="0" v-model.number="formData.danbixiaofei_end">
							<template slot="append">元</template>
						</el-input>

						<el-tooltip placement="top">
						  <div slot="content">统计用户单笔消费金额<br/>现金消费：指非储值金额消费和积分、优惠券以外的支付方式</div>
						  <icon-svg icon-class='question'></icon-svg>
						</el-tooltip>

						<div>
							<el-radio v-model="danbiChecked" label="3">储值+现金消费</el-radio>
							<el-radio v-model="danbiChecked" label="2">仅储值消费</el-radio>
						</div>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('danbixiaofei','danbixiaofei_day','danbixiaofei_start','danbixiaofei_end','元',danbiChecked)"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="平均消费：" prop="pingjunxiaofei_day" :rules="filter_rules({required:false,type:'num'})" class="pb0">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.pingjunxiaofei_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 平均消费</span>
						<el-input placeholder="请输入金额"  class="wm140" type="number" min="0" v-model.number="formData.pingjunxiaofei_start">
							<template slot="append">元</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入金额" style="width:140px;" type="number" min="0" v-model.number="formData.pingjunxiaofei_end">
							<template slot="append">元</template>
						</el-input>

						<el-tooltip placement="top">
						  <div slot="content">平均消费金额=全部消费金额累加的总数/消费总次数<br/>现金消费：指非储值金额消费和积分、优惠券以外的支付方式</div>
						  <icon-svg icon-class='question'></icon-svg>
						</el-tooltip>
						<div>
							<el-radio v-model="pingjunChecked" label="3">储值+现金消费</el-radio>
							<el-radio v-model="pingjunChecked" label="2">仅储值消费</el-radio>
						</div>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('pingjunxiaofei','pingjunxiaofei_day','pingjunxiaofei_start','pingjunxiaofei_end','元',pingjunChecked)"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="储值次数：" prop="chuzhicishu_day" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.chuzhicishu_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 累计充值</span>
						<el-input placeholder="请输入次数"  class="wm140" type="number" min="0" v-model.number="formData.chuzhicishu_start">
							<template slot="append">次</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入次数" style="width:140px;" type="number" min="0" v-model.number="formData.chuzhicishu_end">
							<template slot="append">次</template>
						</el-input>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('chuzhicishu','chuzhicishu_day','chuzhicishu_start','chuzhicishu_end','次')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="累计储值：" prop="leijichuzhi_day" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.leijichuzhi_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 累计储值</span>
						<el-input placeholder="请输入金额"  class="wm140" type="number" min="0" v-model.number="formData.leijichuzhi_start">
							<template slot="append">元</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入金额" style="width:140px;" type="number" min="0" v-model.number="formData.leijichuzhi_end">
							<template slot="append">元</template>
						</el-input>

						<el-tooltip placement="top">
						  <div slot="content">统计用户全部储值历史金额累加的总数</div>
						  <icon-svg icon-class='question'></icon-svg>
						</el-tooltip>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('leijichuzhi','leijichuzhi_day','leijichuzhi_start','leijichuzhi_end','元')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="单笔储值：" prop="danbichuzhi_day" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.danbichuzhi_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 单笔储值</span>
						<el-input placeholder="请输入金额"  class="wm140" type="number" min="0" v-model.number="formData.danbichuzhi_start">
							<template slot="append">元</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入金额" style="width:140px;" type="number" min="0" v-model.number="formData.danbichuzhi_end">
							<template slot="append">元</template>
						</el-input>

						<el-tooltip placement="top">
						  <div slot="content">统计用户单独一笔储值金额</div>
						  <icon-svg icon-class='question'></icon-svg>
						</el-tooltip>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('danbichuzhi','danbichuzhi_day','danbichuzhi_start','danbichuzhi_end','元')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="累计积分消费：" prop="leijijifenxiaofei_day" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.leijijifenxiaofei_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 累计消费</span>
						<el-input placeholder="请输入分数"  class="wm140" type="number" min="0" v-model.number="formData.leijijifenxiaofei_start">
							<template slot="append">分</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入分数" style="width:140px;" type="number" min="0" v-model.number="formData.leijijifenxiaofei_end">
							<template slot="append">分</template>
						</el-input>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('leijijifenxiaofei','leijijifenxiaofei_day','leijijifenxiaofei_start','leijijifenxiaofei_end','分')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="单笔积分消费：" prop="danbifenxiaofei_day" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入天数" class="wm140" type="number" min="0" v-model.number="formData.danbifenxiaofei_day">
							<template slot="append">天</template>
						</el-input>
						<span style="margin-right:36px">内 累计消费</span>
						<el-input placeholder="请输入分数"  class="wm140" type="number" min="0" v-model.number="formData.danbifenxiaofei_start">
							<template slot="append">分</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入分数" style="width:140px;" type="number" min="0" v-model.number="formData.danbifenxiaofei_end">
							<template slot="append">分</template>
						</el-input>
						<div class="addCar">
							<el-button type="" @click="addToListHuiyuan('danbifenxiaofei','danbifenxiaofei_day','danbifenxiaofei_start','danbifenxiaofei_end','分')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		    <el-tab-pane label="会员资产信息" name="third">
				<el-form label-width="140px" :model="formData" ref="formData" class="demo-ruleForm">

					<el-form-item label="储值余额:" prop="chuzhiyue_start" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入金额" class="wm140" type="number" min="0" v-model.number="formData.chuzhiyue_start">
							<template slot="append">元</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入金额" style="width:140px;" type="number" min="0" v-model.number="formData.chuzhiyue_end">
							<template slot="append">元</template>
						</el-input>

						<div class="addCar">
							<el-button type="" @click="addToListPub('chuzhiyue',formData.chuzhiyue_start,formData.chuzhiyue_end,'元')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="积分余额:" prop="jifenyue_start" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入积分" class="wm140" type="number" min="0" v-model.number="formData.jifenyue_start">
							<template slot="append">分</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入积分" style="width:140px;" type="number" min="0" v-model.number="formData.jifenyue_end">
							<template slot="append">分</template>
						</el-input>

						<div class="addCar">
							<el-button type="" @click="addToListPub('jifenyue',formData.jifenyue_start,formData.jifenyue_end,'分')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>

					<el-form-item label="可用优惠券剩余:" prop="shengyuyouhuiquan_start" :rules="filter_rules({required:false,type:'num'})">
						<el-input placeholder="请输入张数" class="wm140" type="number" min="0" v-model.number="formData.shengyuyouhuiquan_start">
							<template slot="append">张</template>
						</el-input>
						<span>至</span>
						<el-input placeholder="请输入张数" style="width:140px;" type="number" min="0" v-model.number="formData.shengyuyouhuiquan_end">
							<template slot="append">张</template>
						</el-input>

						<div class="addCar">
							<el-button type="" @click="addToListPub('shengyuyouhuiquan',formData.shengyuyouhuiquan_start,formData.shengyuyouhuiquan_end,'张')"><i class="el-icon-arrow-right el-icon-plus"></i>加入群体项</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>

		<el-dialog title="保存群体" :visible.sync="dialogSave" size="copy" :before-close="handleCopyClose" id="saveGroup">
			<div class='content'>
				<el-form :model="classForm" label-position='right' label-width="100px" class="save-ruleForm">
					<el-form-item label="群体名称:" prop="groupName" :rules="filter_rules({required:true,maxLength:20})" >
						<el-input type="title" style='width:250px' placeholder="请输入群体名称" autofocus="true" v-model="classForm.groupName" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="fzhd_close">
				<el-button size='large' @click="cancelDialogSave">取消</el-button>
				<el-button size='large'  @click='toSaveGroupIf' type='primary'>确定</el-button>
			</div>
		</el-dialog>

		<checkselect :selectData="selectData" :totalNum='totalNum' :mendianNum="mendianNum" ref="openBoxs" @toSaveGroup="saveActivity" ></checkselect>

	</div>
</template>

<script>
import Vue from 'vue'
import {getMendian} from '@/api/home'
import { TzxTreeSelect } from '@/components/tzxtreeselect';
import  checkselect  from '@/components/checkselect/checkselect.vue';
import { saveGroup,basicLabel,getGroupmembersDetail } from '@/api/groupmembers.js';

export default {
	components: {
		TzxTreeSelect,checkselect
	},
	data(){
		return{
			activeName: 'first',
			title:"创建会员群体",
			showBirthday:true,
			selectD:'1',								// 区分制定年限和全部年月
			dialogSave: false,                          //修改类名的弹窗
			classForm: {
				groupName: ''
			},
			id:'', 										//form表单回显时用到  群体id  编辑保存时用
			formData: {
				// 会员基本信息
				start_end_date:'',			// 绑定入会时间
				start_date: '',				// 入会时间 start
				end_date: '',				// 入会时间 end
				start_age:'',				// 年龄段 start
				end_age:'',					// 年龄段 end
				age_none:'',				// 年龄段 未知
				birthday_end_date:'',		// 会员生日
				b_start_date: '',			//	生日 start
				b_end_date: '',				//  生日 end
				// 会员消费信息
				zhouqi_start:'',			// 消费周期start
				zhouqi_end:'',				// 消费周期end
				xiaofeicishu_day:'',		// 消费次数 day
				xiaofeicishu_start:'',		// 消费次数start
				xiaofeicishu_end:'',		// 消费次数end
				leijixiaofei_day:'',		// 累计消费 day
				leijixiaofei_start:'',		// 累计消费start
				leijixiaofei_end:'',		// 累计消费end
				danbixiaofei_day:'',		// 单笔消费 day
				danbixiaofei_start:'',		// 单笔消费start
				danbixiaofei_end:'',		// 单笔消费end
				pingjunxiaofei_day:'',		// 平均消费 day
				pingjunxiaofei_start:'',	// 平均消费start
				pingjunxiaofei_end:'',		// 平均消费end
				chuzhicishu_day:'',			// 储值次数 day
				chuzhicishu_start:'',		// 储值次数start
				chuzhicishu_end:'',			// 储值次数end
				leijichuzhi_day:'',			// 累计储值 day
				leijichuzhi_start:'',		// 累计储值start
				leijichuzhi_end:'',			// 累计储值end
				danbichuzhi_day:'',			// 单笔储值 day
				danbichuzhi_start:'',		// 单笔储值start
				danbichuzhi_end:'',			// 单笔储值end
				leijijifenxiaofei_day:'',	// 累计积分消费day
				leijijifenxiaofei_start:'',	// 累计积分消费start
				leijijifenxiaofei_end:'',	// 累计积分消费end
				danbifenxiaofei_day:'',		// 单笔积分消费day
				danbifenxiaofei_start:'',	// 单笔积分消费start
				danbifenxiaofei_end:'',		// 单笔积分消费end
				// 会员资产信息
				chuzhiyue_start:'',			// 储值余额start
				chuzhiyue_end:'',			// 储值余额end
				jifenyue_start:'',			// 积分余额start
				jifenyue_end:'',			// 积分余额end
				shengyuyouhuiquan_start:'',	// 剩余优惠券start
				shengyuyouhuiquan_end:'',	// 剩余优惠券end
				age:'',
			},
			storeDialogVisible:false,
			//门店开始
			defaultProps: {
				children: 'children',
				label: 'labelc',
				name: 'label',
				id: 'id',
				count: 'count'
			},
			storeData:[],
			storeDialogVisible:true,
			storeCheckedIds:[],
			storeNodes:[],
			storeTotal:0,
			data:[],
			checkedIds:[],
			nodes:[],
			nodes_dish:[],
			total:0,
			is_find:false,
			storeTotal:0,
			//门店结束
			leijiChecked:'3',
			danbiChecked:'3',
			pingjunChecked:'3',
			ages_v:[],
			dengji_v:[],
			xingbie_v:[],
			shengri_v:[],
			xingzuo_v:[],
			laiyuan_v:[],
			selectData:{
				time:[],
				ages:[],
				dengji:[],
				xingbie:[],
				shengri:[],
				xingzuo:[],
				mendian:[],
				laiyuan:[],
				xiaofeizhouqi:[],
				xiaofeicishu:[],
				leijixiaofei:[],
				danbixiaofei:[],
				pingjunxiaofei:[],
				chuzhicishu:[],
				leijichuzhi:[],
				danbichuzhi:[],
				leijijifenxiaofei:[],
				danbifenxiaofei:[],
				chuzhiyue:[],
				jifenyue :[],
				shengyuyouhuiquan:[],
			},
			totalNum:0,		// 总个数
			mendianNum:0,	//	门店数量
			totalLineNum:0,	// 总行数
			limitSub:true,	// 限制提交
			postData:{
				id:'',								// 群组ID
				group_name:'',						// 群组名称
				basic:{},							// 会员基本信息列表 arr
				consume:{},							// 会员消费信息列表 arr
				asset:{},							// 会员资产信息列表 arr
			},
			levelList:[],						//等级字典表
			constellationList:[],				//星座字典表
			sexList:[],							//性别字典表
			chanelList:[],						//渠道字典表
			showDom:{},
			constellationWeizhi:{
				text: "未知"
			},
			ages:[{
				text: "未知"
			}],
			shengri: [
				{
					it: "1月"
				},
				{
					it: "2月"
				},
				{
					it: "3月"
				},
				{
					it: "4月"
				},
				{
					it: "5月"
				},
				{
					it: "6月"
				},
				{
					it: "7月"
				},
				{
					it: "8月"
				},
				{
					it: "9月"
				},
				{
					it: "10月"
				},
				{
					it: "11月"
				},
				{
					it: "12月"
				},
				{
					it: "未知",
					value:'weizhi'
				},
			],				// 加进去
			xingbie: [
				{
					text: "男"
				},
				{
					text: "女"
				},
				{
					text: "未知"
				},
			],
		}
	},
	created(){

		this.loadTree();
		//编辑查询详情
		let id = this.$route.query.id;
		if(id){
			this.getbasicLabel(id);
			this.title = "编辑会员群体";
		}else{
			this.getbasicLabel();
		}
	},
	methods: {
		loadTree(){
			getMendian().then((response) => {
				this.storeData =  response.data;
			})
		},
		handleClick(tab, event) {
        	//console.log(tab, event);
      	},
		dataChange(date) {
			if(date != "" && date != null && date != undefined) {
				this.formData.start_date = date.substring(0, 10);
				this.formData.end_date = date.substring(13, 23);
			}
		},
		birthdayChange(date){
			if(date != "" && date != null && date != undefined) {
				this.formData.b_start_date = date.substring(0, 10);
				this.formData.b_end_date = date.substring(13, 23);
			}
		},
		handleCopyClose(done) {
			done();
		},
		//会员所属门店
	  	storeMakeSureChecked(){
			this.storeNodes.map(i =>{
			  this.selectData.mendian.push(i);
			})
			this.selectData.mendian = this.heavy(this.selectData.mendian);
			this.mendianNum = this.selectData.mendian.length;
			this.storeDialogVisible = false;
			this.openBoxLid();
			this.calculateTotalNum();
	  	},
	  	storeBoxChange(nodes,total){
		  this.storeNodes = nodes;
		  this.storeTotal = total;
	  	},
		deleteStore(store,index){
			this.selectData.mendian.splice(index, 1);
		},
		// 会员基本信息-入会时间
		addToListTime(){
			let _this = this;
			if(this.limitSub == true){
				if(this.formData.start_date != '' &&  this.formData.end_date != ''){
					let star_end_date = this.formData.start_date + '至' + this.formData.end_date;
					if(this.selectData.time.length > 2){
						this.$message({
				          message: '最多只能输入三项入会时间',
				          type: 'warning'
				        });
					}else{
						this.selectData.time.push(star_end_date);
						this.selectData.time = this.heavy(this.selectData.time);
						_this.openBoxLid();
						//this.calculateTotalNum();
					}
				}else{
					this.$message({
			          message: '请输入时间',
			          type: 'warning'
			        });
				}
			}
			this.calculateTotalNum();
		},
		// 会员基本信息-入会年龄段
		addToListAge(datas,directory,_v){
			let datasLength = datas.length;
			let start_age = this.formData.start_age;
			let end_age = this.formData.end_age;
			if(this.limitSub == true){
				if(this.selectData.ages.length > 2){
					this.$message({
					  message: '最多只能输入三项会员年龄段',
					  type: 'warning'
					});
				}else{
					if(datasLength == 0 && start_age == '' && end_age == ''){
						this.$message({
				          message: '请输入年龄段',
				          type: 'warning'
				        });
					}else if(datasLength != 0 && start_age == '' && end_age == ''){
						this.selectData.ages.push('未知');
					}else if(datasLength == 0 && start_age != '' && end_age != ''){
						let star_end_age = start_age + '至' + end_age + '岁';
						this.selectData.ages.push(star_end_age);
					}else if(datasLength != 0 && start_age != '' && end_age != ''){
						let star_end_age = start_age + '至' + end_age + '岁';
						this.selectData.ages.push(star_end_age);
						this.selectData.ages.push('未知');
					}else if(datasLength == 0 && start_age == '' || end_age == '' || start_age >= end_age ){
						this.$message({
				          message: '请输正确的区间',
				          type: 'warning'
				        });
					}
					this.selectData.ages =  this.heavy(this.selectData.ages);
					this.openBoxLid();
				}
			}
			this.calculateTotalNum();
		},
		// 会员基本信息-公用加入群体项
		addToLists(datas,directory,_v){
			let _this = this;
			if(this.limitSub == true){
				datas.map(item =>{
					_this.selectData[directory].push(item);
					_this.selectData[directory] =  _this.heavy(_this.selectData[directory]);
					_this.selectData[_v] =  _this.heavy(_this.selectData[directory]);
				})
				this.openBoxLid();
			}
			this.calculateTotalNum();
		},
		heavy(arr){
			var re = [];
			for (var i = 0; i < arr.length; i++) {
				if(re.indexOf(arr[i]) == -1){
					re.push(arr[i]);
				}
			}
			return re;
		},
		// 会员基本信息-会员生日
		addToListBirthday(datas,directory,selectD,_v){
			let _this = this;
			if(this.limitSub == true){
				if(selectD == 1){
					datas.map(item =>{
						_this.selectData[directory].push(item);
					})
					_this.selectData[directory] =  _this.heavy(_this.selectData[directory]);

				}else if(selectD == 2){
					if(this.formData.b_start_date != '' &&  this.formData.b_end_date != ''){
						let star_end_date = this.formData.b_start_date + '至' + this.formData.b_end_date;
						this.selectData[directory].push(star_end_date);
						_this.selectData[directory] =  _this.heavy(_this.selectData[directory])
					}else{
						this.$message({
				          message: '请输入时间',
				          type: 'warning'
				        });
					}
				}
				this.openBoxLid();
			}
			this.calculateTotalNum();
		},
		// 会员消费信息 - 公用加入群体项
		addToListHuiyuan(directory,day,start,end,unit,checkes){
			let days = this.formData[day];
			let starts = this.formData[start];
			let ends = this.formData[end];
			if(this.limitSub == true){
				if(starts >= ends){
					this.$message({
			          message: '请输入正确的内容',
			          type: 'warning'
			        });
				}else if(days != '' &&  starts != '' && ends != ''){
					let star_end_date = days + '天内消费' + starts + '至' + ends + unit;
					if(this.selectData[directory].length > 2){
						this.$message({
				          message: '最多只能输入三项',
				          type: 'warning'
				        });
					}else{
						if(directory == "leijixiaofei" || directory == "danbixiaofei" || directory == "pingjunxiaofei"){
							let arr = {};
							arr = {
								"text" : star_end_date,
								"check": checkes
							}
							this.selectData[directory].push(arr);
						}else{
							this.selectData[directory].push(star_end_date);
							this.selectData[directory] = this.heavy(this.selectData[directory]);
							this.openBoxLid();
						}
					}
				}else{
					this.$message({
			          message: '请输入正确的内容',
			          type: 'warning'
			        });
				}
			}
			this.calculateTotalNum();
		},
		// 会员资产信息-储值余额-积分余额-可用优惠券 / 会员消费信息-消费周期
		addToListPub(directory,start,end,unit){
			if(this.limitSub == true){
				if(this.selectData[directory].length > 2){
					this.$message({
					  message: '最多只能输入三项',
					  type: 'warning'
					});
				}else{
					if(start != '' &&  end != '' && start < end){
						let star_end_date = start + '至' + end + unit;
						this.selectData[directory].push(star_end_date);
					}else if(start == '' &&  end == ''){
						this.$message({
				          message: '请输入内容',
				          type: 'warning'
				        });
					}else{
						this.$message({
				          message: '请输入正确的区间',
				          type: 'warning'
				        });
					}
					this.selectData[directory] = this.heavy(this.selectData[directory])
					this.openBoxLid();
				}
			}
			this.calculateTotalNum();

		},
		// 取消保存修改群组名
		cancelDialogSave(){                                /* 取消dialogSave*/
			this.dialogSave = false;
		},
		// 调出填写群组名
		saveActivity(){
			this.dialogSave = true;
		},
		toSaveGroupIf(){
			if(this.classForm.groupName != ""){
				this.toSaveGroup();
			}else{
				this.classForm.groupName == ""
				return false;
			}
		},
		toSaveGroup(){
			let _this = this;
			_this.loadingBody = true;

		// -------------  基本信息start ------------
			// 入会时间start
			this.postData.basic.addTime = new Array();
			if(this.selectData.time.length !=0){
				this.selectData.time.map( i=>{
					let first = i.substring(0,10);
					let secon = i.substring(11,21);
					let first_secon={
							"tb_name": "crm_customer_info",
							"tb_value2": "",
							"tb_value1": "",
							"tb_time1": first,
							"tb_time2": secon,
							"tb_field_time_type": "yyyy-MM-dd",
							"tb_field_arithmetic1": "",
							"tb_field_time_arithmetic": "between",
							"tb_field_time": "add_time",
							"tb_field_type1": "",
							"tb_field1": ""
						 }
					this.postData.basic.addTime.push(first_secon);
				})
			}
			// 入会时间 end

			// 年龄 start
			if(this.selectData.ages.length !=0){
				this.postData.basic.age = new Array();
				let ages_val1_val2 = {
					"tb_name": "crm_customer_info",
					"tb_value1": '',
					"tb_value2": '',
					"tb_time1": "",
					"tb_field_time_type": "",
					"tb_field_arithmetic1": "between",
					"tb_field_time_arithmetic": "",
					"tb_field_time": "",
					"tb_time2": "",
					"tb_field_type1": "int",
					"tb_field1": "age"
				}
				let ageNUll = {
					"tb_name": "crm_customer_info",
					"tb_value2": "",
					"tb_value1": "is NULL",
					"tb_time1": "",
					"tb_field_time_type": "",
					"tb_field_arithmetic1": "is",
					"tb_field_time_arithmetic": "",
					"tb_field_time": "",
					"tb_time2": "",
					"tb_field_type1": "NULL",
					"tb_field1": "age"
				}
				this.selectData.ages.map( i=>{
					  if(i.indexOf('岁') >0){
							let arrya=i.split("至");
							let arrya0 = arrya[0];
							let arrya1 = parseInt(arrya[1]).toString();
							ages_val1_val2.tb_value1 = arrya0;
							ages_val1_val2.tb_value2 = arrya1;
							this.postData.basic.age.push(ages_val1_val2);
						}else if(i == '未知'){
							this.postData.basic.age.push(ageNUll)
						}
				})
			}
			// 年龄 end

			// 会员等级 start
			if(this.selectData.dengji.length != 0){
				this.postData.basic.level = new Object();
				let levelArr = [];
				let _this = this;
				this.selectData.dengji.map( i=>{
					this.showDom.level.map( j=>{
						if(i == j.text){
							levelArr.push(j.value);
							let levelArrs = levelArr.join(',');
							let levelpush = {
								"tb_name": "crm_customer_info",
								"tb_value1": levelArrs,
								"tb_value2": '',
								"tb_time1": "",
								"tb_field_time_type": "",
								"tb_field_arithmetic1": "in",
								"tb_field_time_arithmetic": "",
								"tb_field_time": "",
								"tb_time2": "",
								"tb_field_type1": "string",
								"tb_field1": "level"
							};
							this.postData.basic.level = levelpush;
						}
					})
				});
			}
			// 会员等级 end

			// 会员性别 start
			if(this.selectData.xingbie.length !=0){
				this.postData.basic.sex = new Array();
				let sexNUll = {
					"tb_name": "crm_customer_info",
					"tb_value2": "",
					"tb_value1": "is NULL",
					"tb_time1": "",
					"tb_field_time_type": "",
					"tb_field_arithmetic1": "is",
					"tb_field_time_arithmetic": "",
					"tb_field_time": "",
					"tb_time2": "",
					"tb_field_type1": "NULL",
					"tb_field1": "sex"
				};
				let sexArr = [];
				let sexArrs = [];
				this.selectData.xingbie.map( i=>{
					if(i == '未知'){
						this.postData.basic.sex.push(sexNUll);
					}else{
						this.showDom.sex.map( j=>{
							if(i == j.text){
								sexArr.push(j.value);
							}
						})
						sexArrs = sexArr.join(',');
					}
				});
				let sexpush = {
					"tb_name": "crm_customer_info",
					"tb_value1": sexArrs,
					"tb_value2": '',
					"tb_time1": "",
					"tb_field_time_type": "",
					"tb_field_arithmetic1": "in",
					"tb_field_time_arithmetic": "",
					"tb_field_time": "",
					"tb_time2": "",
					"tb_field_type1": "string",
					"tb_field1": "sex"
				};
				this.postData.basic.sex.push(sexpush);
			}
			// 会员性别 start

			// 会员生日 start
			if(this.selectData.shengri.length !=0){
				this.postData.basic.birthday = new Array();
				let arryBirthday = [];
		        let arr1_arr2 = {
		            "tb_name": "crm_customer_info",
		            "tb_value2": "",
		            "tb_value1": "",
		            "tb_time1": "",
		            "tb_field_time_type": "",
		            "tb_field_arithmetic1": "in",
		            "tb_field_time_arithmetic": "",
		            "tb_field_time": "",
		            "tb_time2": "",
		            "tb_field_type1": "string",
		            "tb_field1": "birthday"
		        }
		        let birthdayNUll = {
		            "tb_name": "crm_customer_info",
		            "tb_value2": "",
		            "tb_value1": "is NULL",
		            "tb_time1": "",
		            "tb_field_time_type": "",
		            "tb_field_arithmetic1": "is",
		            "tb_field_time_arithmetic": "",
		            "tb_field_time": "",
		            "tb_time2": "",
		            "tb_field_type1": "NULL",
		            "tb_field1": "birthday"
		        }

				this.selectData.shengri.map( i=>{
 		              if(i.indexOf('月') > 0){
 		                    let arrya=(i.split("月"))[0];
 		                    arryBirthday.push(arrya);
 		                    let stringBirthday = arryBirthday.join(',');
 		                    arr1_arr2.tb_value1 = stringBirthday;
							this.postData.basic.birthday.push(arr1_arr2);
							this.postData.basic.birthday = this.heavy(this.postData.basic.birthday);
 		               }else if(i =='未知'){
 		                    this.postData.basic.birthday.push(birthdayNUll);
 		                }else{
							let first = i.substring(0,10);
				            let secon = i.substring(11,21);

							let first_secon={
			                    "tb_name": "crm_customer_info",
			                    "tb_value1": "",
			                    "tb_value2": "",
			                    "tb_field_time_type": "",
			                    "tb_field_arithmetic1": "between",
			                    "tb_field_time_arithmetic": "",
			                    "tb_field_time": "",
								"tb_time1": first,
			                    "tb_time2": secon,
			                    "tb_field_type1": "int",
			                    "tb_field1": "birthday"
			                 }
							this.postData.basic.birthday.push(first_secon);
						}
 		        })
			}

			// 会员生日 end

			// 会员星座 start
			if(this.selectData.xingzuo.length !=0){
				this.postData.basic.constellation = new Array();
				let constellationNUll = {
					"tb_name": "crm_customer_info",
					"tb_value2": "",
					"tb_value1": "is NULL",
					"tb_time1": "",
					"tb_field_time_type": "",
					"tb_field_arithmetic1": "is",
					"tb_field_time_arithmetic": "",
					"tb_field_time": "",
					"tb_time2": "",
					"tb_field_type1": "NULL",
					"tb_field1": "constellation"
				};
				let constellationArr = [];
				this.selectData.xingzuo.map( i=>{
					this.showDom.constellation.map( j=>{
						if(i == j.text){
							if(i == '未知'){
								this.postData.basic.constellation.push(constellationNUll);
							}else{
								constellationArr.push(j.value);
							}
						}
					})
				});

				let constellationArrs = constellationArr.join(',');
				let constellationpush = {
					"tb_name": "crm_customer_info",
					"tb_value1": constellationArrs,
					"tb_value2": '',
					"tb_time1": "",
					"tb_field_time_type": "",
					"tb_field_arithmetic1": "in",
					"tb_field_time_arithmetic": "",
					"tb_field_time": "",
					"tb_time2": "",
					"tb_field_type1": "string",
					"tb_field1": "constellation"
				};
				this.postData.basic.constellation.push(constellationpush);
			}
			// 会员星座 end

			// 会员所属门店 start
			if(this.selectData.mendian.length !=0){
				this.postData.basic.storeId = new Object();
				let mendianArr = [];
				this.selectData.mendian.map( i=>{
					mendianArr.push(i.id);
				})
				let postMendianArr = mendianArr.join(',');

				let storeId = {
					"tb_name": "crm_customer_info",
					"tb_value2": "",
					"tb_value1": postMendianArr,
					"tb_time1": "",
					"tb_field_time_type": "",
					"tb_field_arithmetic1": "in",
					"tb_field_time_arithmetic": "",
					"tb_field_time": "",
					"tb_time2": "",
					"tb_field_type1": "int",
					"tb_field1": "store_id"
				}
				this.postData.basic.storeId = storeId;
			}
			// 会员所属门店 end

			// 会员入会来源 start
			if(this.selectData.laiyuan.length !=0){
				this.postData.basic.addChanel = new Object();
				let chanelArr = [];
				this.selectData.laiyuan.map( i=>{
					this.showDom.chanel.map( j=>{
						if(i == j.text){
							chanelArr.push(j.value);
						}
					})
				});
				let chanelArrs = chanelArr.join(',');
				let chanelpush = {
					"tb_name": "crm_customer_info",
					"tb_value2": "",
					"tb_value1": chanelArrs,
					"tb_time1": "",
					"tb_field_time_type": "",
					"tb_field_arithmetic1": "in",
					"tb_field_time_arithmetic": "",
					"tb_field_time": "",
					"tb_time2": "",
					"tb_field_type1": "string",
					"tb_field1": "add_chanel"
				};
				this.postData.basic.addChanel = chanelpush;
			}
			// 会员入会来源 end

			// -------------  基本信息end ------------


			// -------------  会员消费信息start ------------
			consumeFun("xiaofeizhouqi","lastXfDate","last_xf_date","");
			consumeFun("xiaofeicishu","xfTimes","xf_times","");
			consumeFun("leijixiaofei","cumulateXfAmount","cumulate_xf_amount");
			consumeFun("danbixiaofei","oneXfAmount","one_xf_amount");
			consumeFun("pingjunxiaofei","avgXfAmount","avg_xf_amount");
			consumeFun("chuzhicishu","totalCzTimes","total_cz_times","");
			consumeFun("leijichuzhi","cumulateCzAmount","cumulate_cz_amount","");
			consumeFun("danbichuzhi","oneCzAmount","one_cz_amount","");
			consumeFun("leijijifenxiaofei","cumulateXfCredit","cumulate_xf_credit","");
			consumeFun("danbifenxiaofei","oneXfCredit","one_xf_credit","");

			function consumeFun(obj1,obj2,obj3){
				if(_this.selectData[obj1].length !=0){
					_this.postData.consume[obj2] = new Array();
					_this.selectData[obj1].map( i=>{

						if(obj1 == "leijixiaofei" || obj1 == "danbixiaofei" || obj1 == "pingjunxiaofei"){
							var sum = eval(i.text.match(/\d+/g));
						}else{
							var sum = eval(i.match(/\d+/g));
						}

						let pubParameter = {
								"tb_time_days": "",
								"tb_time1": "",
								"tb_pay_way": "",
								"tb_time2": "",
								"tb_field1": "",
								"tb_name": "crm_daycount_consume_new",
								"tb_value2": "",
								"tb_value1": "",
								"tb_field_arithmetic1": "between",
								"tb_field_time_type": "",
								"tb_field_time": "",
								"tb_field_time_arithmetic": "",
								"tb_field_type1": "int"
							}
							pubParameter.tb_time_days = sum[0];
							pubParameter.tb_value1 = sum[1];
							pubParameter.tb_value2 = sum[2];
							pubParameter.tb_field1 = obj3;
							if(obj1 == "xiaofeizhouqi"){
								pubParameter.tb_time_days = "";
								pubParameter.tb_name = "";
								pubParameter.tb_value1 = sum[0];
								pubParameter.tb_value2 = sum[1];
							}else if(obj1 == "leijixiaofei" || obj1 == "danbixiaofei" || obj1 == "pingjunxiaofei"){
								pubParameter.tb_pay_way = i.check;
							}

						_this.postData.consume[obj2].push(pubParameter);

					})
				}
			}

			// -------------  会员消费信息end ------------


			// -------------  会员资产信息start ------------

			assetFun("chuzhiyue","totalMainAddReward","total_main_add_reward");
			assetFun("jifenyue","usefulCredit","useful_credit");
			assetFun("shengyuyouhuiquan","usefulCoupons","useful_coupons");

			function assetFun(obj1,obj2,obj3){
				if(_this.selectData[obj1].length !=0){
					_this.postData.asset[obj2] = new Array();
					_this.selectData[obj1].map( i=>{
						var sum = eval(i.match(/\d+/g));
						let pubParameter = {
								"tb_field1": "total_main_add_reward",
								"tb_field_type1": "double",
								"tb_field_arithmetic1": "between",
								"tb_value1": "21",
								"tb_value2": "31",
								"tb_field_time": "",
								"tb_field_time_type": "",
								"tb_field_time_arithmetic": "",
								"tb_time1": "",
								"tb_time2": "",
								"tb_time_days": "",
								"tb_pay_way": ""
							}
							pubParameter.tb_value1 = sum[0];
							pubParameter.tb_value2 = sum[1];
							pubParameter.tb_field1 = obj3;

						_this.postData.asset[obj2].push(pubParameter);
					})
				}
			}

			// -------------  会员资产信息end ------------

			let basic = JSON.stringify(this.postData.basic);
			let consume = JSON.stringify(this.postData.consume);
			let asset = JSON.stringify(this.postData.asset);
			let data ="";
			if(this.id){
				data = "group_name=" + this.classForm.groupName + "&id="  + this.id + "&basic=" + basic + "&consume=" + consume + "&asset=" + asset;
			}else{
				data = "group_name=" + this.classForm.groupName + "&basic=" + basic + "&consume=" + consume + "&asset=" + asset;
			}
			saveGroup(data).then( res=>{
				if(res.success == true){
					this.dialogSave = false;
					_this.loadingBody = false;
					this.$message({
					  type: 'success',
					  message: '保存成功!',
					});

					setTimeout(()=>{
						this.$router.push({
		                    path:'/marketing/membershipsgroupmanagement',
		                })
					},2000)
				}else{
					this.$message({
					  type: 'error',
					  message: res.msg
					});
				}
			})
		},
		// 会员基本信息
		getbasicLabel(id){//传id 为了先查出字典表然后 在匹配会员群体信息
			let _this = this;
			basicLabel().then(function(res){
				if(res.success == true){
					_this.showDom = res;
					_this.showDom.constellation.push(_this.constellationWeizhi);

					_this.levelList = res.level;				//等级字典表
					_this.constellationList = res.constellation;//星座字典表
					_this.sexList = res.sex;					//性别字典表
					_this.chanelList = res.chanel;//渠道字典表

					if(id){
						_this.updateFormData(id);
					}
				}
			})
		},
		//通过 门店id 查询门店对象
		findNextItem(arrays,it) {
			arrays.map(item => {
				if(item.id == it) {
					//return item;
					this.names.push(item.label);
				} else {
					if(item.children) {
						this.findNextItem(item.children,it);
					}
				}
			})
		},
		//编辑查询详情
		updateFormData(id){
			this.id = id;
			let query = "id=" + id ;
			let _this = this;
			getGroupmembersDetail(query).then( res =>{
				if(res.success){
					let basic = res.basic;
					let consume = res.consume;
					let asset = res.asset;
					_this.classForm.groupName = res.group_name;

					//会员所属门店
					if(basic.stores != null){
						let mendian = [];
						let ids = [];
						basic.stores.map(i =>{
							mendian.push({"label":i.store_name,"id":i.store_id});
							ids.push(i.store_id);
						})

						this.selectData.mendian = mendian;
						this.mendianNum = mendian.length;
						this.storeCheckedIds = ids;
					}

					if(basic.addChanel != null){//会员入会来源
						let chanel = [];
						let chanel_db = basic.addChanel.tb_value1.split(',');
						chanel_db.forEach(item =>{
							let arrays = this.chanelList.filter(item33 => item33.value == item);
							if(arrays.length != 0){
								chanel.push(arrays[0].text);
							}else{
								chanel.push(item);
							}
						})
						this.selectData.laiyuan = chanel;
						this.laiyuan_v = chanel;
					}

					//消费类 10个选项

					if(consume.cumulateXfAmount !=null){//累计消费
						let cumulateXfAmount = [];
						consume.cumulateXfAmount.forEach(item =>{
							let pay_way = item.tb_pay_way;
							let star_end_date = item.tb_time_days+"天内消费"+item.tb_value1+"至"+item.tb_value2+"元";
							let arr = {};
							arr = {
								"text" : star_end_date,
								"check": pay_way
							}
							cumulateXfAmount.push(arr);
						});
						this.selectData.leijixiaofei = cumulateXfAmount;
					}

					if(consume.oneXfAmount !=null){//单笔消费
						let oneXfAmount = [];
						consume.oneXfAmount.forEach(item =>{
							let pay_way = item.tb_pay_way;
							let star_end_date = item.tb_time_days+"天内消费"+item.tb_value1+"至"+item.tb_value2+"元";
							let arr = {};
							arr = {
								"text" : star_end_date,
								"check": pay_way
							}
							oneXfAmount.push(arr);
						});
						this.selectData.danbixiaofei = oneXfAmount;
					}

					if(consume.avgXfAmount !=null){//平均消费
					    let avgXfAmount = [];
					    consume.avgXfAmount.forEach(item =>{
					        let pay_way = item.tb_pay_way;
					        let star_end_date = item.tb_time_days+"天内消费"+item.tb_value1+"至"+item.tb_value2+"元";
					        let arr = {};
					        arr = {
					            "text" : star_end_date,
					            "check": pay_way
					        }
					        avgXfAmount.push(arr);
					    });
					    this.selectData.pingjunxiaofei = avgXfAmount;
					}

					if(consume.lastXfDate !=null){//消费周期
					    let lastXfDate = [];
					    consume.lastXfDate.forEach(item =>{
					        lastXfDate.push(item.tb_value1+"至"+item.tb_value2+"天内消费");
					    });
					    this.selectData.xiaofeizhouqi = lastXfDate;
					}

					 consumeFuns('oneXfCredit','danbifenxiaofei','分');
					 consumeFuns('cumulateXfCredit','leijijifenxiaofei','分');
					 consumeFuns('oneCzAmount','danbichuzhi','元');
					 consumeFuns('cumulateCzAmount','leijichuzhi','元');
					 consumeFuns('totalCzTimes','chuzhicishu','次');
					 consumeFuns('xfTimes','xiaofeicishu','次');

					function consumeFuns(obj1,obj2,unit){
						if(consume[obj1] !=null){//储值次数
						    let arr = [];
						    consume[obj1].forEach(item =>{
						        arr.push(item.tb_time_days+"天内消费"+item.tb_value1+"至"+item.tb_value2+unit);
						    });
						    _this.selectData[obj2] = arr;
						}
					}

					//资产类 3个
					assets('totalMainAddReward','chuzhiyue','元');
					assets('usefulCredit','jifenyue','分');
					assets('usefulCoupons','shengyuyouhuiquan','张');

					function assets(obj1,obj2,unit){
						if(asset[obj1] !=null){
							let arr = [];
							asset[obj1].forEach(item =>{
								arr.push(item.tb_value1+"至"+item.tb_value2+unit);
							});
							_this.selectData[obj2] = arr;
						}
					}

					//基本信息 8个选项
					if(basic.addTime != null){//会员入会时间
						let addTime = [];
						basic.addTime.forEach(item =>{
							addTime.push(item.tb_time1+'至'+item.tb_time2);
						})
						this.selectData.time = addTime;
					}

					if(basic.age !=null){//会员年龄
						let age = [];
						basic.age.forEach(item =>{
							if(item.tb_value1 == 'is NULL'){
								age.push('未知');
							}else{
								age.push(item.tb_value1+'至'+item.tb_value2+'岁');
							}
						})
						this.selectData.ages = age;
						this.ages_v = age;
					}

					if(basic.sex != null){//会员性别
						let sex = [];
						basic.sex.forEach(item =>{
							if(item.tb_value1 == 'is NULL'){
								sex.push('未知');
							}else{
								let sex_temp = item.tb_value1.split(',');
								sex_temp.forEach(item22 =>{
									let arrays = this.sexList.filter(item33 => item33.value == item22);
									if(arrays.length != 0){
										sex.push(arrays[0].text);
									}else{
										sex.push(item22);
									}
								})
							}
						})
						this.selectData.xingbie = sex;
						this.xingbie_v = sex;
					}

					if(basic.birthday != null){//会员生日
						let birthday = [];
						basic.birthday.forEach(item =>{
							if(item.tb_field_arithmetic1 == 'in'){
								let month = item.tb_value1.split(',');
								month.forEach(item2 =>{
									birthday.push(item2+"月");
								});
							}else if(item.tb_field_arithmetic1 == 'between' && item.tb_time2 != ""){
								birthday.push(item.tb_time1+'至'+item.tb_time2);
							}else if(item.tb_field_arithmetic1 == 'is'){
								birthday.push('未知');
							}
						});
						this.selectData.shengri = birthday;
						this.shengri_v = birthday;
					}

					if(basic.constellation != null){//会员星座
						let constellation = [];
						basic.constellation.forEach(item=>{
							if(item.tb_value1 == "is NULL"){
								constellation.push('未知');
							}else{
								let xingzuoArrays = item.tb_value1.split(',');
								xingzuoArrays.forEach(item22 =>{
									let arrays = this.constellationList.filter(item33 => item33.value == item22);
									if(arrays.length != 0){
										constellation.push(arrays[0].text);
									}else{
										constellation.push(item22);
									}
								})
							}
						})
						this.selectData.xingzuo = constellation;
						this.xingzuo_v = constellation;
					}

					if(basic.level.tb_value1 != ''){//会员等级
						let level = basic.level.tb_value1.split(',');
						let level_temp = [];

						level.forEach(item =>{
							let arrays = this.levelList.filter(item2 => item2.value == item);
							if(arrays.length != 0){
								level_temp.push(arrays[0].text);
							}else{
								level_temp.push(item);
							}
						})
						this.selectData.dengji = level_temp;
						this.dengji_v = level_temp;
					}

					setTimeout(function(){
						let checkcontent = document.getElementById('checkcontent');
						let elTag = checkcontent.getElementsByClassName('el-tag').length;
						let elForm = checkcontent.getElementsByClassName('el-form').length;
						_this.totalNum = elTag;
						_this.totalLineNum = elForm;
					},1000)

				}else{
					this.$message({
						type: 'error',
						message: res.msg
					});
				}
			}).catch((e) => {
				/*this.$message({
					type: 'error',
					message: '网络异常'
				});*/
			});

		},
		calculateTotalNum(){
			let _this = this;
			let num = 0;
			for (var key in this.selectData) {
				if(this.selectData[key].length > 0){
					num ++;
				}
			}
			if(num >=10){
				this.$message({
				  message: '选项不能大于10条！',
				  type: 'warning'
				});
				_this.limitSub = false;
			}
			this.totalLineNum = num;
		},
		openBoxLid(){
			this.$refs.openBoxs.openBox();
		}
	},
	watch:{
		selectD(curVal,oldVal){
			this.showBirthday = !this.showBirthday;
　　　　　},
		selectData:{
			// 监听数据
			handler(curVal,oldVal){
				let time = curVal.time.length;
				let ages = curVal.ages.length;
				let dengji = curVal.dengji.length;
				let xingbie = curVal.xingbie.length;
				let shengri = curVal.shengri.length;
				let xingzuo = curVal.xingzuo.length;
				let mendian = curVal.mendian.length;
				let laiyuan = curVal.laiyuan.length;
				let xiaofeizhouqi = curVal.xiaofeizhouqi.length;
				let xiaofeicishu = curVal.xiaofeicishu.length;
				let leijixiaofei = curVal.leijixiaofei.length;
				let danbixiaofei = curVal.danbixiaofei.length;
				let pingjunxiaofei = curVal.pingjunxiaofei.length;
				let chuzhicishu = curVal.chuzhicishu.length;
				let leijichuzhi = curVal.leijichuzhi.length;
				let danbichuzhi = curVal.danbichuzhi.length;
				let leijijifenxiaofei = curVal.leijijifenxiaofei.length;
				let danbifenxiaofei = curVal.danbifenxiaofei.length;
				let chuzhiyue = curVal.chuzhiyue.length;
				let jifenyue = curVal.jifenyue.length;
				let shengyuyouhuiquan =curVal.shengyuyouhuiquan.length;
				this.totalNum = time + ages + dengji + xingbie + shengri + xingzuo + mendian + laiyuan + xiaofeizhouqi + xiaofeicishu + leijixiaofei + danbixiaofei + pingjunxiaofei + chuzhicishu + leijichuzhi + danbichuzhi + leijijifenxiaofei + danbifenxiaofei + chuzhiyue + jifenyue + shengyuyouhuiquan;
			},
			deep:true
		},
		formData(){
			// 监听数据
		},
    },
	deactivated () {
        this.$destroy(true)
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-checkbox-button:first-child .el-checkbox-button__inner{
	border-left:1px solid #D8E5EC;
}
.addmembershipsgroupmanagement{
	height: auto;
	min-height: 800px;
	background: #FFFFFF;
	margin-top: 10px;
	position: relative;
	.el-checkbox-button.is-checked .el-checkbox-button__inner{
		background:#fff url('../../../assets/checked.png') no-repeat;
		background-position: right bottom;
		background-size: 20px 16px;
		color: #000;
		border:1px solid #20a0ff;
	}
	.el-form-item__label{
		margin-left: 20px;
	}
	.el-checkbox-button{
		margin:0 14px 14px 0;
	}
	.el-checkbox-button__inner{
		transition:all .000000000000000000001s cubic-bezier(.645,.045,.355,1);
		border:1px solid #D8E5EC;
		border-radius: 3px;
		background: #fff;
	}
	.el-checkbox-button:first-child .el-checkbox-button__inner{
		border-radius: 3px;
	}
	.el-checkbox-button.is-checked .el-checkbox-button__inner{
		box-shadow:none;
	}
	.addmembershipsgroupmanagement .el-checkbox-button:first-child .el-checkbox-button__inner{
		border:1px solid #20a0ff!important;
	}
	.el-checkbox-button:last-child .el-checkbox-button__inner{
		border-radius: 3px;
	}
	.tzxselecttree_right_footer{
		display: none;
	}
	.tzxselecttree{
		width: 92%!important;
	}
	.el-form-item__content{
		width: 70%;
	}
	.el-form-item{
		margin-bottom: 0;
		position: relative;
		padding: 10px 0;
		.addCar{
			position: absolute;
			right: -14%;
			top:0;
			display: none;
		}
		.addCar:hover{
			button{
				background: #fff;
			}
		}
	}
	.birthdayBorder{
		margin-left: -22px;
	}
	.el-form-item:hover{
		background: #F5F9FB;
		.addCar{
			display: block;
			button{
				background: #fff;
			}
		}
	}
	#saveGroup{
		.el-form-item:hover{
			background: #fff;
		}
		.el-form-item__error{
			padding-left: 40px;
		}
		.el-form-item__label{
			margin-left: 40px;
		}
	}
	.editTitle{
		padding:22px 0 10px 10px;
		font-size: 12px;
		color: #9AABB8;
		border-bottom: 1px solid #EAF1F6;
		margin:0 20px;
		strong{
			font-weight: bold;
			font-size: 16px;
			color: #34495E;
		}
	}
	.time-left{
		margin-right: 15px;
	}
	.save-ruleForm{
		margin:50px 0;
	}
	.ages,.level{
		.check-style{
			height: 32px;
			line-height: 32px;
			padding: 0 13px;
			border: 1px solid #D8E5EC;
			border-radius: 3px;
			cursor: pointer;
			margin-right: 12px;
			position: relative;
			margin-bottom: 10px;
			background: #fff;
			text-align: center;
			span{
				-moz-user-select: none;
				-khtml-user-select: none;
				user-select: none;
			}
			img{
				position: absolute;
				right:0;
				bottom:0;
				width: 12px;
				height: 12px;
				display: none;
			}
		}
		.checkActive{
			border: 1px solid #0C9AFF;
			border-radius: 3px;
			color: #0C9AFF;
			img{
				display: block;
			}
		}
	}
	.level{
		display: flex;
		flex-wrap:wrap;
	}
	.source{
		display: flex;
		flex-wrap: wrap;
		li{
			display: flex;
			line-height: 16px;
			font-size: 14px;
			border: 1px solid #D8E5EC;
			border-radius: 3px;
			padding: 6px;
			padding-right: 10px;
			margin-right:12px;
			position: relative;
			cursor:pointer;
			background: #fff;
			margin-bottom: 10px;
			img{
				width: 16px;
				height: 16px;
				margin-right: 4px;
			}
			.palyChecked{
				position: absolute;
				right: -4px;
				bottom: 0;
				display: none;
			}
		}
		li.checkActive{
			border: 1px solid #0C9AFF;
			.palyChecked{
				position: absolute;
				right: -4px;
				bottom: 0;
				display: block;
			}
		}
		li:nth-child(2){
			img{
				width: 20px;
			}
		}
		li:nth-child(3){
			img{
				width: 20px;
			}
		}

	}
	.el-form-item__error{
		padding-left: 10px;
	}
	.fzhd_close {
	    height: 65px;
	    line-height: 65px;
	    background: #f4f9fc;
	    text-align: center;
	}
	.el-tabs{
		padding-bottom: 40px;
	}
	.el-tabs__content{
		margin-top: 15px;
		margin-left: 20px;
		margin-right: 20px;
	}
	.el-tabs__nav-scroll{
		border-bottom: 1px solid #EAF1F6;
		height: 45px;
		line-height: 45px;
		margin-left: 20px;
		margin-right: 20px;
	}
	.el-tabs__item {
		font-size: 16px !important;
		margin-bottom: 8px!important;
		// padding: 0px 20px!important;
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
	.flex{
		display: flex;
	}
	.ml30{
		margin-left: 42px;
	}
	.pb10{
		padding-bottom: 10px;
	}
	.pb0{
		padding-bottom: 0!important;
	}
	.wm140{
		width:140px;
		margin-left:-30px;
	}
	.el-radio{
		margin-left: 12px;
	}
	.w70{
		width: 70px;
	}
	// 开箱动画 start
}
.footer,.footer2{
	display: none!important;
}
</style>
