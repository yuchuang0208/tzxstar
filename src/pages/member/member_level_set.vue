<template>
	<div class="memberLevelSet">
		<div class="title">
			<h3>会员等级设置</h3>
			<span>设置会员升级规则、享受权益、降级规则、会员等级样式</span>
		</div>
		<div class="main">
			<el-form ref="form" :model="form"  label-width="140px">
				<el-form-item class="special" label="会员等级名称：" prop="name" :rules="filter_rules({required:true,maxLength:20})">
					<el-input v-model="form.name" style="width:580px;"></el-input>
				</el-form-item>
				<el-form-item label="升级规则：" class="upgradeRule" required>
					<el-tooltip class="item" effect="dark" content="满足以下任意条件即可获取该会员等级" placement="top-start">
						<icon-svg icon-class='question'></icon-svg>
					</el-tooltip>
					<el-form-item>
						<el-checkbox v-model="form.is_bind_mobil">绑定手机号<span style="color:#9AABB8;">（常用于正式会员的必备条件）</span></el-checkbox>
					</el-form-item>
					<el-checkbox-group class="ruleList" v-model="form.ruleList" @change="changeDisabled" style="margin-left:-10px;">
						<el-form-item prop="membership_price" :rules="form.dis1?filter_rules({}):filter_rules({required:true,type:'money',maxLength:8})">
							<el-checkbox label="1">会籍价格</el-checkbox>
							<el-input type="number" placeholder="0" v-model="form.membership_price" :disabled="form.dis1">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="only_prestore" :rules="form.dis2?filter_rules({}):filter_rules({required:true,type:'money',maxLength:8})">
							<el-checkbox label="2">单次充值满（主）</el-checkbox>
							<el-input type="number" placeholder="0" v-model="form.only_prestore" :disabled="form.dis2">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="total_consumption" :rules="form.dis3?filter_rules({}):filter_rules({required:true,type:'money',maxLength:8})">
							<el-checkbox label="3">累计消费满</el-checkbox>
							<el-input type="number" placeholder="0" v-model="form.total_consumption" :disabled="form.dis3">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="total_main" :rules="form.dis4?filter_rules({}):filter_rules({required:true,type:'money',maxLength:8})">
							<el-checkbox label="4">累计储值满（主）</el-checkbox>
							<el-input type="number" placeholder="0" v-model="form.total_main" :disabled="form.dis4">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="total_credit" :rules="form.dis5?filter_rules({}):filter_rules({required:true,type:'integral',maxLength:8})">
							<el-checkbox label="5">累计获得积分（满）</el-checkbox>
							<el-input type="number" placeholder="0" v-model="form.total_credit" :disabled="form.dis5">
								<template slot="append">分</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="user_credit" :rules="form.dis6?filter_rules({}):filter_rules({required:true,type:'money',maxLength:8})">
							<el-checkbox label="6">可用积分满</el-checkbox>
							<el-input type="number" placeholder="0" v-model="form.user_credit" :disabled="form.dis6">
								<template slot="append">分</template>
							</el-input>
						</el-form-item>
						<el-form-item v-if="form.ruleList.toString().indexOf('6') != -1">
							<span>满足时是否减扣积分</span>
							<el-radio-group v-model="form.up_zero_credit">
								<el-radio label="0">不折扣</el-radio>
								<el-radio label="1">同时抵扣</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="会员权益：" required>
					<el-checkbox-group v-model="form.rightsList">
						<el-checkbox label="会员积分"></el-checkbox>
						<el-form-item class="blue" v-if="form.rightsList.toString().indexOf('会员积分') != -1">
							<el-form-item class="detail" prop="trading_money" :rules="form.rightsList.toString().indexOf('会员积分') != -1?filter_rules({required:true,type:'money',maxLength:8}):filter_rules({})">
								<span>消费金额：</span>
								<el-input placeholder="" v-model="form.trading_money">
									<template slot="append">元</template>
								</el-input>
								<span style="margin-left:40px;">赠送</span>
								<el-input placeholder="" v-model="form.reward_credit">
									<template slot="append">积分</template>
								</el-input>
							</el-form-item>
							<el-form-item class="detail" prop="trading_credit" :rules="form.rightsList.toString().indexOf('会员积分') != -1?filter_rules({required:true,type:'integral',maxLength:8}):filter_rules({})">
								<span>积分抵现：</span>
								<el-input placeholder="" v-model="form.trading_credit">
									<template slot="append">分</template>
								</el-input>
								<span style="margin-left:40px;">抵现</span>
								<el-input placeholder="" v-model="form.cash_money">
									<template slot="append">元</template>
								</el-input>
							</el-form-item>
							<el-form-item class="detail" prop="credit_cash_bill" :rules="form.rightsList.toString().indexOf('会员积分') != -1?filter_rules({required:true,type:'integral',maxLength:3}):filter_rules({})">
								<span>积分抵现：</span>
								<span>最多抵扣账单金额的</span>
								<el-input placeholder="" v-model="form.credit_cash_bill">
									<template slot="append">%</template>
								</el-input>
							</el-form-item>
						</el-form-item>
						<el-form-item label-width="20px">
							<el-checkbox label="会员储值"></el-checkbox>
						</el-form-item>
						<el-form-item class="blue" label-width="160px" v-if="form.rightsList.toString().indexOf('会员储值') != -1" prop="limit_prestore_per" :rules="form.rightsList.toString().indexOf('会员储值') != -1?filter_rules({required:true,type:'money',maxLength:8}):filter_rules({})">
							<span class="extralabel">单次最低储值金额</span>
							<el-input placeholder="" v-model="form.limit_prestore_per">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
						<el-form-item  label-width="20px">
							<el-checkbox label="会员价"></el-checkbox>
						</el-form-item>
						<el-form-item  label-width="20px">
							<el-checkbox label="会员折扣"></el-checkbox>
						</el-form-item>
						<el-form-item class="blue" label-width="160px" v-if="form.rightsList.toString().indexOf('会员折扣') != -1" prop="rate" :rules="form.rightsList.toString().indexOf('会员折扣') != -1?filter_rules({required:true,type:'integral',maxLength:3}):filter_rules({})">
							<span class="extralabel">结账时享受</span>
							<el-input placeholder="" v-model="form.rate">
								<template slot="append">折</template>
							</el-input>
							<span>优惠<span class="remark">（1-9.9之间的数字）</span></span>
						</el-form-item>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item class="special" label="降级规则：" prop="balance_regular" :rules="form.is_balance_regular == true?filter_rules({required:true,type:'money',maxLength:8}):filter_rules({})">
					<el-checkbox v-model="form.is_balance_regular">储值余额不足（主+赠）</el-checkbox>
					<el-input placeholder="" v-model="form.balance_regular" style="margin-left:20px;">
						<template slot="append">元</template>
					</el-input>
					<div class="blue demotion" v-if="form.is_balance_regular">
						<span>降级到：</span>
						<el-radio-group class="radioGroup" v-model="form.down_level_id">
							<el-radio v-for='(item,index) in form.levelList' :key="index" :label='item.id'>{{item.name}}</el-radio>
						</el-radio-group>
					</div>
				</el-form-item>
				<el-form-item label="等级卡设置：" required class="cardBack">
					<el-form-item class="cardBackChange">
						<el-form-item class="cardBackChangeLeft">
							<div class="cardBackChangeLeftImg">
								<img :src="form.imageUrl" class="cardBackimg">
								<img :src="form.cardInfo">
							</div>
							<span>商户名称、会员等级、卡号、二维码均为动态数据，背景图建议不要影响显示</span>
						</el-form-item>
						<el-form-item class="cardBackChangeRight">
							<h3>所有颜色</h3>
							<ul class="changeBgList">
								<li :class="form.isClicked&&index==form.clickedindex?'cur':'cur2'" v-for='(bg,index) in form.changeBgList' :key="index" @click="changeBg(index,bg.code,bg.url)"><span :style="{background:bg.color}"></span></li>
							</ul>
							<div class="uploadImg">
								<el-upload
									class="avatar-uploader"
									:disabled='form.is_find'
									:action='form.action'
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload"
									name='fileToUpload'>
									<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
									<span>+</span>
									<span>上传图片上传图片</span>
								</el-upload>
								<span>建议尺寸530*320px,300kb以内png/jpg图片</span>
							</div>
						</el-form-item>
					</el-form-item>
				</el-form-item>
				<div class="border"></div>
				<el-form-item>
					<el-button @click="open">取消</el-button>
					<el-button type="primary" @click="onSubmit('form')">确定</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>	
</template>

<script>
import Assist from '@/utils/assist';
import { saveMemberLevel,getMemberLevelAll,updateMemberLevel} from '@/api/member'
import { cardBack,imgcode01,imgcode02,imgcode03,imgcode04,imgcode05,imgcode06,imgcode07,imgcode08 } from '@/assets/level'
import { validateMoneyNumber} from '@/utils/validate'
import Lodash from 'lodash'
export default {
    data() {
		return {
			form: {
				id: '',
				name: '',
				ruleList: [],
				dis1: true,
				dis2: true,
				dis3: true,
				dis4: true,
				dis5: true,
				dis6: true,
				is_bind_mobil: true,//绑定手机号
				membership_price: 0,//会籍价格
				only_prestore: 0,//单次充值金额
				total_consumption: 0,//累计消费满
				total_main: 0,//累计充值
				total_credit: 0,//累计积分
				user_credit: 0,//可用积分满
				up_zero_credit: '0',//是否折扣
				is_credit: '',//是否抵现
				trading_money: 0,//消费金额
				reward_credit: 0,
				trading_credit: 0,//积分抵现
				cash_money: 0,//抵现金额
				credit_cash_bill: 0,//抵现百分比
				limit_prestore_per: 0,//单次最低充值金额
				is_vipprice: '',//是否有会员价
				is_discount: '',//是否折扣
				rate: 0,//结账折扣
				balance_regular: 0,//降级规则
				down_level_id: '',//降级等级id
				member_card_bg_url: '',//背景图url
				rightsList: ['会员积分','会员储值','会员价','会员折扣'],
				is_balance_regular: false,
				usIntegral: [],
				changeBgList:[{
					code: 'imgcode01',
					url: imgcode01,
					color:'#A2A9C9'
				},{
					code: 'imgcode02',
					url: imgcode02,
					color:'#EBC571'
				},{
					code: 'imgcode03',
					url: imgcode03,
					color:'#CEB887'
				},{
					code: 'imgcode04',
					url: imgcode04,
					color:'#FF5858'
				},{
					code: 'imgcode05',
					url: imgcode05,
					color:'#66E0D1'
				},{
					code: 'imgcode06',
					url: imgcode06,
					color:'#4974F8'
				},{
					code: 'imgcode07',
					url: imgcode07,
					color:'#452CD5'
				},{
					code: 'imgcode08',
					url: imgcode08,
					color:'#452CD5'
				}],
				cardInfo: cardBack,
				isClicked: false,
				clickedindex: '',
				levelList: [],
				codeBack: 'imgcode01',
				imageUrl: imgcode01,
				is_find:false,
				action:''
			}
		}
	},
    methods: {
		changeBg(index,code,bg){
			this.form.isClicked = true;
			this.form.clickedindex = index;
			this.form.codeBack = code;
			this.form.imageUrl = bg;
		},
		handleAvatarSuccess(res, file) {
			let index1 = res.indexOf("url")+6;
			let index2 = res.indexOf("png")!=-1?res.indexOf("png")+3:res.indexOf('jpg')+3;
			this.form.imageUrl = res.substring(index1,index2);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
			const isLt2M = file.size / 1024  <= 300;

			if (!isJPG) {
				this.$message.error('图片只能是 JPG/PNG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('图片大小不能超过 300KB!');
			}
			return isJPG && isLt2M;
		},
		changeDisabled(value){
			if(value.toString().indexOf('1') != -1){
				this.form.dis1 = false;
			}else{
				this.form.dis1 = true;
				this.form.membership_price = 0;
			}
			if(value.toString().indexOf('2') != -1){
				this.form.dis2 = false;
			}else{
				this.form.dis2 = true;
				this.form.only_prestore = 0;
			}
			if(value.toString().indexOf('3') != -1){
				this.form.dis3 = false;
			}else{
				this.form.dis3 = true;
				this.form.total_consumption = 0;
			}
			if(value.toString().indexOf('4') != -1){
				this.form.dis4 = false;
			}else{
				this.form.dis4 = true;
				this.form.total_main = 0;
			}
			if(value.toString().indexOf('5') != -1){
				this.form.dis5 = false;
			}else{
				this.form.dis5 = true;
				this.form.total_credit = 0;
			}
			if(value.toString().indexOf('6') != -1){
				this.form.dis6 = false;
			}else{
				this.form.dis6 = true;
				this.form.user_credit = 0;
				this.form.is_discount = '0';
			}			
		},
		memberLevelAll(){
			getMemberLevelAll().then(response => {
				let data = response.data;
				if(data.length >= 0){
					this.loading = false;
					this.form.levelList = data;
				}	
			}).catch(() => {
				this.loading = false;
				this.$message({
					type: 'error',
					message: '网络异常'
				});
			});
		},
		updateFormData(id){
			this.form.id = id;
			let data = 'id='+id;
			updateMemberLevel(data).then(response=>{
				let detail = response;
				this.form.name = detail.name;
				if(detail.is_bind_mobil == 1){
					this.form.is_bind_mobil = true;
				}else{
					this.form.is_bind_mobil = false;
				}
				if(detail.membership_price > 0){
					this.form.dis1 = false;
					this.form.ruleList.push('1');
					this.form.membership_price = detail.membership_price+'';//会籍价格
				}
				if(detail.only_prestore > 0){
					this.form.dis2 = false;
					this.form.ruleList.push('2');
					this.form.only_prestore = String(detail.only_prestore);//单次充值价格
				}
				if(detail.total_consumption > 0){
					this.form.dis3 = false;
					this.form.ruleList.push('3');
					this.form.total_consumption = String(detail.total_consumption);//累计消费满
				}
				if(detail.total_main > 0){
					this.form.dis4 = false;
					this.form.ruleList.push('4');
					this.form.total_main = String(detail.total_main);//累计充值
				}
				if(detail.total_credit > 0){
					this.form.dis5 = false;
					this.form.ruleList.push('5');
					this.form.total_credit = String(detail.total_credit);//累计积分
				}
				if(detail.user_credit > 0){
					this.form.dis6 = false;
					this.form.ruleList.push('6');
					this.form.user_credit = String(detail.user_credit);//可用积分
				}
				this.form.up_zero_credit = String(detail.up_zero_credit)
				//会员权益
				this.form.rightsList = [];
				if(detail.is_credit == 1){
					this.form.rightsList.push('会员积分');
				}
				if(detail.is_vipprice == 1){
					this.form.rightsList.push('会员价');
				}
				if(detail.is_discount == 1){
					this.form.rightsList.push('会员折扣');
				}
				if(detail.limit_prestore_per > 0){
					this.form.rightsList.push('会员储值');
				}

				if(detail.is_balance_regular == 1){
					this.form.is_balance_regular = true;
				}else{
					this.form.is_balance_regular = false;
				}
				this.form.is_discount = detail.is_discount;
				this.form.trading_money = String(detail.trading_money);
				this.form.trading_credit = String(detail.trading_credit);
				this.form.cash_money = String(detail.cash_money);
				this.form.reward_credit = String(detail.reward_credit);
				this.form.credit_cash_bill = String(detail.credit_cash_bill);
				this.form.limit_prestore_per = String(detail.limit_prestore_per);
				this.form.rate = String((detail.rate)/10);
				this.form.balance_regular = String(detail.balance_regular);
				this.form.down_level_id = detail.down_level_id;
				this.form.imageUrl = detail.member_card_bg_url;
			});
		},
		onSubmit(form) {
			this.$refs[form].validate((valid) => {
				if(valid){
					//验证升级规则
					if(this.form.dis1 == true && this.form.dis2 == true && this.form.dis3 == true && this.form.dis4 == true && this.form.dis5 == true && this.form.dis6 == true && this.form.is_bind_mobil == false){
						this.$message({
							type:'error',
							message:"请选择升级规则"
						})
						return false;
					}
					if(this.form.is_bind_mobil == true){
						this.form.is_bind_mobil = 1;
					}else{
						this.form.is_bind_mobil = 0;
					}
					if(this.form.rightsList.length == 0){
						this.$message({
							type:'error',
							message:"请选择会员权益"
						})
						return false;
					}
					this.form.rightsList.forEach(item => {
						if(item == '会员折扣'){
							if(this.form.rate >= 10 || this.form.rate < 1){
								this.$message({
									type:'error',
									message:"请填写1~9.9之间的会员折扣"
								})
								return false;
							}else{
								this.form.rate = String(this.form.rate * 10);
							}
						}
						let arr = this.form.rightsList;
						if(arr.indexOf('会员积分') == -1){
							this.form.trading_money = 0;
							this.form.trading_credit = 0;
							this.form.cash_money = 0;
							this.form.cash_money = 0;
							this.form.is_credit = '0';
						}else{
							this.form.is_credit = '1';
						}
						if(arr.indexOf('会员储值') == -1){
							this.form.limit_prestore_per = 0;
						}
						if(arr.indexOf('会员价') == -1){
							this.form.is_vipprice = '0';
						}else{
							this.form.is_vipprice = '1';
						}
						if(arr.indexOf('会员折扣') == -1){
							this.form.rate = 0;
							this.form.is_discount = '0';
						}else{
							this.form.is_discount = '1';
						}
					});
					if(this.form.is_balance_regular == true){
						this.form.is_balance_regular = '1';
						if(this.form.down_level_id == ''){
							this.$message({
								type:'error',
								message:"请选择降级等级"
							})
							return false;
						}
					}else{
						this.form.down_level_id = '';
						this.form.balance_regular = 0;
						this.form.is_balance_regular = '0';
					}
					if(this.form.is_credit == '1'){
						if(this.form.reward_credit == 0 || this.form.reward_credit == ''){
							this.$message({
								type:'error',
								message:"请填赠送的积分数"
							})
							return false;								
						}
						if(this.form.cash_money == 0 || this.form.cash_money == ''){
							this.$message({
								type:'error',
								message:"请填抵现金额"
							})
							return false;
						}
					}

					let data = "id=" + this.form.id +//会员等级id
						"&name=" + this.form.name +//等级名称
						"&is_bind_mobil=" + this.form.is_bind_mobil +//绑定手机号
						"&membership_price=" + this.form.membership_price +//会籍价格
						"&only_prestore=" + this.form.only_prestore +//单次充值
						"&total_consumption=" + this.form.total_consumption +//累计消费
						"&total_main=" + this.form.total_main +//累计储值
						"&total_credit=" + this.form.total_credit +//累计积分
						"&user_credit=" + this.form.user_credit +//可用积分
						"&up_zero_credit=" + this.form.up_zero_credit +//满足时是否折扣
						"&is_credit="+ this.form.is_credit +//是否抵现
						"&trading_money=" + this.form.trading_money +//消费金额满
						"&reward_credit="+ this.form.reward_credit +//赠送积分
						"&trading_credit=" + this.form.trading_credit +//积分抵现分
						"&cash_money=" + this.form.cash_money +//积分抵现金额
						"&credit_cash_bill=" + this.form.credit_cash_bill +//积分抵现百分比
						"&limit_prestore_per=" + this.form.limit_prestore_per +//单次最低储值金额
						"&is_vipprice=" + this.form.is_vipprice +//是否有会员价
						"&is_discount=" + this.form.is_discount +//是否折扣
						"&rate=" + this.form.rate +//结账折扣
						"&is_balance_regular=" + this.form.is_balance_regular +//降级规则
						"&balance_regular=" + this.form.balance_regular +//降级规则金额
						"&down_level_id=" + this.form.down_level_id +//降级等级
						"&member_card_bg_url=" + this.form.imageUrl;//图片url
					this.loading1 = true;
					saveMemberLevel(data).then(response=>{
						this.loadingBody = false;
						if(response.success){
							this.$message({
								type:'success',
								message:'提交成功'
							})
							this.$router.push({
								path: '/member/membershiplevelset',
								hash: 'new'
							});
						}else{
							this.$message({
								type:'success',
								message:response.msg
							})
						}
					})
				}
			});	
		},
		open() {
			this.$router.push({
				path: '/member/membershiplevelset',
				hash: 'new'
			});
		},
	},
	created(){
		_czc.push(["_trackEvent", "会员中心-会员等级-会员等级设置", "点击"]);//埋点统计
		this.memberLevelAll();
		/* 设置图片服务地址 使用代理*/
		this.form.action = '/imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';
		if(this.$route.query.id!=undefined){
			this.updateFormData(this.$route.query.id);	
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
.memberLevelSet{
	width: 100%;
	height: auto;
	background: #fff;
	overflow: hidden;
	.title{
		height: 49px;
		line-height: 50px;
		margin: 0 20px;
		border-bottom: #EAF1F6 1px solid;
		clear: both;
		overflow: hidden;
		h3{
			font-size: 16px;
			color: #34495E;
			height: 50px;
			line-height: 50px;
			display: inline-block;
			margin: 0 14px 0 10px;
		}
		span{
			height: 50px;
			line-height: 50px;
			font-size: 12px;
			color: #9AABB8;
		}
		a.addMemberLevel{
			width: 112px;
			height: 28px;
			line-height: 28px;
			text-align: center;
			background: #FF9001;
			margin: 10px 0;
			display: inline-block;
			color: #fff;
			border-radius: 3px;
			float: right;
			span:nth-child(1){
				font-size: 16px;
				display: inline-block;
				height: 28px;
				line-height: 28px;
				color: #fff;
				float: left;
				margin-left: 12px;
				margin-right: -8px;
			}
			span:nth-child(2){
				font-size: 12px;
				display: inline-block;
				height: 28px;
				line-height: 28px;
				color: #fff;
			}
		}
	}
	.main{
		padding: 20px;
		clear: both;
		overflow: hidden;
		.el-form-item__label{
			margin-left: 20px;
		}
		.special{
			.el-form-item__error{
				left: 20px;
			}
		}
		.el-form-item:nth-child(3){
			margin-bottom: 0;
		}
		.ruleList{
			.el-form-item{
				width: 290px;
				margin: 0 0 10px 30px;
			}
			.el-input-group--append{
				width: 120px;
				float: right;
			}
		}
		.el-input-group{
			.el-input__inner{
				height: 28px;
				text-align: right;
			}
		}
		.el-input-group--append{
			width: 120px;
		}
		.blue{
			background: #F5F9FB;
			margin: 10px 20px 10px -120px;
			padding: 10px 0;
			.el-form-item{
				margin: 0 0 10px 0;
				.el-form-item__content span:nth-child(1){
					margin: 0 76px 0 0;
				}
				.el-form-item__content span:nth-child(2){
					margin: 0 0 0 67px;
				}
			}
		}
		.demotion{
			padding-left: 160px;
			overflow: hidden;
			span{
				float: left;
			}
		}
		.detail{
			padding-left: 160px;
			height: 40px;
		}
		.detail>span{
			width: 166px;
			display: inline-block;
		}.detail>span:nth-child(2){
			width: 194px;
		}
		.extra{
			margin-bottom: 10px;
			.el-form-item__content{
				margin-left: 170px;
			}
		}
		.extralabel{
			width: 148px;
			display: inline-block;
		}
		.remark{
			color: #9AABB8;
		}
		.cardBack{
			clear: both;
			overflow: hidden;
			height: 300px;
			.cardBackChange{
				width: 100%;
				.el-form-item{
					width: 420px;
					float: left;
				}
				.cardBackChangeLeft{
					.el-form-item__content{
						width: 420px;
						overflow: hidden;
						.cardBackChangeLeftImg{
							width: 380px;
							height: 230px;
							border-radius: 6px;
							background-size: 100%;
							position: relative;
							overflow: hidden;
							img{
								width: 100%;
								height: 100%;
								position: absolute;
								left: 0;
								top: 0;
								z-index: 2;
							}
							.cardBackimg{
								width: 100%;
								height: auto;
								z-index: 1;
							}
						}
						span{
							color: #9AABB8;
							line-height: 26px;
							font-size: 12px;
							width: 430px;
							display: block; 
						}
					}
				}
				.cardBackChangeRight{
					h3{
						color: #34495E;
						line-height: 24px;
						margin-bottom: 10px;
					}
					.changeBgList{
						clear: both;
						overflow: hidden;
						li{
							padding: 4px;
							border: #fff 1px solid;
							float: left;
							margin-right: 10px;
							cursor: pointer;
							span{
								width: 26px;
								height: 26px;
								display: block;
							}
						}
						li.cur{
							border: #ceebff 1px solid;
						}
						li:nth-child(1) span{
								// background:linear-gradient(45deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%);
								background: #A2A9C9;
							}
						li:nth-child(2) span{
							background: #EBC571;
						}
						li:nth-child(3) span{
							background: #CEB887;
						}
						li:nth-child(4) span{
							background: #FFB00B;
						}
						li:nth-child(5) span{
							background: #FF5858;
						}
						li:nth-child(6) span{
							background: #66E0D1;
						}
						li:nth-child(7) span{
							background: #4974F8;
						}
						li:nth-child(8) span{
							background: #452CD5;
						}
					}
					.uploadImg{
						.avatar-uploader{
							width: 230px;
							border: #ceebff 1px dashed;
							margin: 10px 0 0 0;
							text-align: center;
							img{
								// width: 200px;
								// height: 100px;
								// margin-top: 10px;
								display: none;
							}
							span{
								display: block;
							}
							span:nth-child(1){
								font-size: 36px;
							}
						}
						span{
							color: #A5B0B7;
							font-size: 12px;
						}
					}
				}
			}
		}
		.el-button{
			width: 64px;
			height: 32px;
		}
	}
	.border{
		width: 100%;
		height: 1px;
		border-bottom:#eaf1f6 1px dashed;
		margin: 20px 0;
	}
	.upgradeRule{
		position: relative;
		.el-tooltip{
			position: absolute;
			left: -40px;
			top: 9px;
		}
	}
	.radioGroup{
		width: 800px;
		float: left;
		margin-top: 8px;
		.el-radio{
			margin-right: 15px;
			margin-left: 0;
		}
	}
}
</style>