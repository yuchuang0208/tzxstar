<template>
	<div class="wx-paywaymanage" v-loading.body="loading">
		<h1 class="wx-nav">扫码点餐配置</h1>
		<el-form :model="formData" :rules="rules" ref="formData" label-width="140px" class="formData">
			<el-form-item label="机构">
				<i class="el-icon-info"></i>
				<div class="droplist">
					<tzx-tree-input-node @getButton='getStoresIds' :pnodes="storeId"></tzx-tree-input-node>
				</div>
			</el-form-item>
			<el-form-item label="扫码点餐支付设置（可多选）">
				<el-form-item label="微信支付商户ID" prop="sc_app_id">
					<el-input placeholder="请填写微信支付商户ID" v-model="formData.sc_wxid"></el-input>
				</el-form-item>
				<el-form-item label="支付宝支付商户ID" prop="sc_partner">
					<el-input placeholder="请填写支付宝支付商户ID" v-model="formData.sc_aliid"></el-input>
				</el-form-item>
				<el-checkbox-group v-model="formData.scpay" @change="scpayChange">
					<el-checkbox label="0">微信支付</el-checkbox>
					<el-checkbox label="1">支付宝支付</el-checkbox>
					<el-checkbox label="2">会员卡支付</el-checkbox>
					<el-checkbox label="3">优惠券支付</el-checkbox>
					<el-checkbox label="4">积分抵现支付</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="微信外卖支付设置">
				<el-checkbox-group v-model="formData.wmpay" @change="wmpayChange">
					<el-checkbox label="0">微信支付</el-checkbox>
					<el-checkbox label="1">支付宝支付</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="会员中心微信支付设置（可多选，暂只支持总部设置）">
				<el-form-item label="微信支付商户ID" prop="center_wxid">
					<el-input placeholder="请填写微信支付商户ID" v-model="formData.center_wxid"></el-input>
				</el-form-item>
				<el-checkbox-group v-model="formData.centerpay" @change="centerpayChange">
					<el-checkbox label="0">会员入会费</el-checkbox>
					<el-checkbox label="1">会员卡充值</el-checkbox>
					<el-checkbox label="2">购买会籍</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="卡券货架设置（暂只支持总部设置）">
				<el-form-item label="微信支付商户ID" prop="card_wxid">
					<el-input placeholder="请填写微信支付商户ID" v-model="formData.card_wxid"></el-input>
				</el-form-item>
				<el-checkbox-group v-model="formData.cardpay">
					<el-checkbox label="0">微信支付</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="微信打赏支付设置">
				<el-form-item label="微信支付商户ID" prop="ds_wxid">
					<el-input placeholder="请填写微信支付商户ID" v-model="formData.ds_wxid"></el-input>
				</el-form-item>
				<el-checkbox-group v-model="formData.dspay">
					<el-checkbox label="0">微信支付</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>

		<div class="item">
			<el-button type="primary" size="large" @click="saveData" style="margin-left: 240px;">保存</el-button>
		</div>
	</div>
</template>

<script>
	import { TzxTreeInputNode } from '@/components/TzxTreeInputNode';
	import { getPaymentInfo, savePaymentInfo } from '@/api/weixin';
	export default {
		components: {
			TzxTreeInputNode
		},
		data() {
			return {
				loading: false,
				storeId: 0, //门店id
				isCenterChecked: false,
				formData: {
					sc_wxid: "",
					sc_aliid: "",
					scpay: [],
					wmpay: [],
					center_wxid: "",
					centerpay: [],
					card_wxid: "",
					cardpay: [],
					ds_wxid: "",
					dspay: []

				},

				rules: {
					center_wxid: [{
						required: true,
						message: '请设置微信支付商户ID',
						trigger: 'blur'
					}],
					card_wxid: [{
						required: true,
						message: '请设置微信支付商户ID',
						trigger: 'blur'
					}],
					ds_wxid: [{
						required: true,
						message: '请设置微信支付商户ID',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			_czc.push(["_trackEvent", "支付方式管理", "访问页面"]); //统计流量

		},
		watch: {
			'formData.centerpay': function(val, oldval) {

			}
		},
		methods: {
			getStoresIds(data) {
				//获取门店的store_id 的数组		
				this.storeId = data.id;
				this.getData(data.id);
			},

			scpayChange(val) {
				let wmpayData = [];
				if(val.findIndex(item => item == '0') > -1) {
					wmpayData.push('0');
				}
				if(val.findIndex(item => item == '1') > -1) {
					wmpayData.push('1');
				}
				this.formData.wmpay = wmpayData;
			},
			wmpayChange(val) {

				if(val.findIndex(item => item == '0') > -1) {
					if(this.formData.scpay.findIndex(scitem => scitem == '0') < 0) {
						this.formData.scpay.push('0');
					}
				} else {
					let findIndex = this.formData.scpay.findIndex(scitem => scitem == '0');
					if(findIndex > -1) {
						this.formData.scpay.splice(findIndex, 1);
					}
				}

				if(val.findIndex(item => item == '1') > -1) {
					if(this.formData.scpay.findIndex(scitem => scitem == '1') < 0) {
						this.formData.scpay.push('1');
					}
				} else {
					let findIndex = this.formData.scpay.findIndex(scitem => scitem == '1');
					if(findIndex > -1) {
						this.formData.scpay.splice(findIndex, 1);
					}
				}
			},
			centerpayChange(val) {
				this.isCenterChecked = !this.isCenterChecked;
				if(this.isCenterChecked) {
					this.formData.centerpay = ['0', '1', '2'];
				} else {
					this.formData.centerpay = [];
				}
			},
			getData(id) {
				this.loading = true;

				let wd_pay = ["card", "coupons", "card_credit"];
				getPaymentInfo("store_id=" + id + "&wd_pay_params=" + wd_pay.join(',')).then((data => {
					this.loading = false;
					if(data.success) {
						let scpayCheckBoxData = [];
						let wmpayCheckBoxData = [];
						if(data.card > 0) {
							scpayCheckBoxData.push('2');
						}
						if(data.coupons > 0) {
							scpayCheckBoxData.push('3');
						}
						if(data.card_credit > 0) {
							scpayCheckBoxData.push('4');
						}
						if(data.paymentSetInfo.length > 0) {
							let [scAlipayData] = data.paymentSetInfo.filter(item => item.service_type == "wd03" && item.type == 0);
							if(scAlipayData) {
								//this.formData.sc_wxid = scAlipayData.partner;
								this.formData.sc_aliid = scAlipayData.partner;
								if(scAlipayData.valid_state == "1") {
									scpayCheckBoxData.push('1');
									wmpayCheckBoxData.push('1');
								}
							}
							let [scWXpayData] = data.paymentSetInfo.filter(item => item.service_type == "wd03" && item.type == 1);
							if(scWXpayData) {
								this.formData.sc_wxid = scWXpayData.partner;
								if(scWXpayData.valid_state == "1") {
									scpayCheckBoxData.push('0');
									wmpayCheckBoxData.push('0');
								}
							}
							this.formData.scpay = scpayCheckBoxData;
							this.formData.wmpay = wmpayCheckBoxData;

							let [centerWXpayData] = data.paymentSetInfo.filter(item => item.service_type == "hy01" && item.type == 1);
							if(centerWXpayData) {
								this.formData.center_wxid = centerWXpayData.partner;
								if(centerWXpayData.valid_state == "1") {
									this.formData.centerpay = ['0', '1', '2'];
									this.isCenterChecked = true;
								} else {
									this.formData.centerpay = [];
									this.isCenterChecked = false;
								}
							}

							let [cardWXpayData] = data.paymentSetInfo.filter(item => item.service_type == "sc02" && item.type == 1);
							if(cardWXpayData) {
								this.formData.card_wxid = cardWXpayData.partner;
								if(cardWXpayData.valid_state == "1") {
									this.formData.cardpay = ['0'];
								} else {
									this.formData.cardpay = [];
								}
							}

							let [dsWXpayData] = data.paymentSetInfo.filter(item => item.service_type == "wxds05" && item.type == 1);
							if(dsWXpayData) {
								this.formData.ds_wxid = dsWXpayData.partner;
								if(dsWXpayData.valid_state == "1") {
									this.formData.dspay = ['0'];
								} else {
									this.formData.dspay = [];
								}
							}
						}
					} else {
						this.$message({
							message: "获取支付方式失败",
							type: "error"
						});
					}
				}))
			},
			saveData() {
				this.$refs["formData"].validate((valid) => {
						if(valid) {
							let data = [{
									"type": 1,
									"partner": this.formData.sc_wxid,
									"payment_channel": 0,
									"service_type": "wd03",
									"valid_state": this.formData.scpay.includes('0') ? 1 : 0
								},
								{
									"type": 0,
									"partner": this.formData.sc_aliid,
									"payment_channel": 0,
									"service_type": "wd03",
									"valid_state": this.formData.scpay.includes('1') ? 1 : 0
								},
								{
									"type": 1,
									"partner": this.formData.center_wxid,
									"payment_channel": 0,
									"service_type": "hy01",
									"valid_state": this.formData.centerpay.includes('0') ? 1 : 0
								},
								{
									"type": 1,
									"partner": this.formData.ds_wxid,
									"payment_channel": 0,
									"service_type": "wxds05",
									"valid_state": this.formData.dspay.includes('0') ? 1 : 0
								},
								{
									"type": 1,
									"partner": this.formData.card_wxid,
									"payment_channel": 0,
									"service_type": "sc02",
									"valid_state": this.formData.cardpay.includes('0') ? 1 : 0
								}
							];
							let wd_param = [{
								"para_code": "card",
								"para_value": this.formData.scpay.includes('2') ? 1 : 0
							}, {
								"para_code": "coupons",
								"para_value": this.formData.scpay.includes('3') ? 1 : 0
							}, {
								"para_code": "card_credit",
								"para_value": this.formData.scpay.includes('4') ? 1 : 0
							}];

							this.loading = true;
							savePaymentInfo("store_id=" + this.storeId + "&data=" + JSON.stringify(data) + "&wd_param=" + JSON.stringify(wd_param)).then((data => {
								this.loading = false;
								if(data.success) {
									this.$message({
										message: "保存成功",
										type: "success"
									});
									this.getData(this.storeId);
								} else {
									this.$message({
										message: "保存支付方式失败",
										type: "error"
									});
								}
							}))
						}
					})
				}
			}
		}
</script>

<style rel="stylesheet/scss" lang="scss">
	.wx-paywaymanage {
		background-color: #fff;
		h1.wx-nav {
			color: #34495E;
			font-size: 16px;
			border-bottom: 1px solid #EAF1F6;
			padding: 20px 30px;
		}
		.el-form .formData {
			padding: 20px 0;
		}
		.droplist {
			margin-top: -30px;
			margin-left: 180px;
			.select-input .select-input-zr .el-input__inner{
				width: 100% !important;
			}
			.select-input .select-input-zr{
				width: 270px;
			}
		}
		.el-form-item {
			margin: 20px 0px 20px 40px;
			.el-form-item {
				margin-top: 0;
			}
		}
		.el-input {
			width: 270px;
		}
		.el-form-item__content {
			/*overflow: hidden;*/
			margin-left: 200px !important;
		}
		.el-form-item__content .el-form-item__content {
			overflow: inherit;
			margin-left: 140px !important;
		}
		.el-form-item__content .el-form-item .el-form-item__label {
			margin: 0;
		}
		.el-form-item__content:after,
		.el-form-item:after {
			clear: inherit;
		}
		.el-checkbox-group {
			padding-left: 40px;
		}
		.item {
			padding: 20px;
			.left {
				&.fl {
					float: left;
				}
			}
			.right {
				padding-left: 140px;
				overflow: hidden;
				&.pd {
					padding: 0;
				}
				.el-item-div {
					padding: 10px 0;
					label {
						float: left;
						width: 140px;
						padding: 8px 10px;
					}
					.el-form-div {
						overflow: hidden;
					}
				}
			}
		}
	}
</style>