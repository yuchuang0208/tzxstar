<template>
	<div class="wx-scan-manage">
		<h1 class="wx-nav">扫码点餐配置</h1>
		<div class="wx-left">
			<img :src="showModelPic" />
		</div>
		<div class="wx-right">
			<el-form ref="form" :model="formData" label-width="140px">
				<el-form-item label="机构">
					<i class="el-icon-info"></i>
					<div class="droplist">
						<tzx-tree-input-node @getButton='getStoresIds' :pnodes="storeId"></tzx-tree-input-node>
					</div>
				</el-form-item>
				<el-form-item label="轮播图设置">
					<p style="line-height: 40px;">建议尺寸750X170px，500K以内的png、jpg图片</p>
					<el-upload :action="action" :file-list="filelist" list-type="picture-card" :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="handelBefore" :on-success="handelSuccess" :on-error="handelError">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible" size="tiny">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="首页模版设置">
					<i class="el-icon-info"></i>
					<el-radio-group v-model="formData.wechat_home_template" @change="setModelPic">
						<el-radio label="B">大图模式</el-radio>
						<el-radio label="M">中途模式</el-radio>
						<el-radio label="S">小图模式</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="二维码有效距离" prop="wechat_qr_code_range" :rules="{ required: true, message: '二维码有效距离不能为空', trigger: 'blur'}">
					<el-input v-model="formData.wechat_qr_code_range" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="有效支付时间设置" prop="wechat_payment_time" :rules="{ required: true, message: '有效支付时间不能为空', trigger: 'blur'}">
					<el-input placeholder="请输入内容" v-model="formData.wechat_payment_time">
						<template slot="append">分钟</template>
					</el-input>
				</el-form-item>
				<el-form-item label="电子发票有效期" prop="dzfp_ewmdyxq" :rules="{ required: true, message: '电子发票有效期不能为空', trigger: 'blur'}">
					<el-input placeholder="请输入内容" v-model="formData.dzfp_ewmdyxq">
						<template slot="append">天</template>
					</el-input>
				</el-form-item>
				<el-form-item label="月销量设置" prop="wechat_month_sale_base" :rules="{ required: true, message: '月销量设置不能为空', trigger: 'blur'}">
					<el-input v-model="formData.wechat_month_sale_base" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="点餐会员设置">
					<el-radio-group v-model="formData.whether_wechat_member">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-for="(period, index) in formData.periods" :label="'订餐时段' + index" :key="period.key" :prop="'periods.'+index+'.time'" :rules="{
      required: true, message: '时段不能为空'}">
					<el-time-picker is-range v-model="period.time" placeholder="选择时间范围"></el-time-picker>
					<el-button v-if="index==0" @click="addPeriod">新增</el-button>
					<el-button v-if="index>0" @click.prevent="removePeriod(period)">删除</el-button>
				</el-form-item>
				<el-form-item label="支付方式设置">
					<el-radio-group v-model="formData.wechat_payment_type">
						<el-radio label="1">立即支付</el-radio>
						<el-radio label="0">吃完付款</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="分类显示设置">
					<el-checkbox-group v-model="formData.wechat_sort_show">
						<el-checkbox label="0">点过的菜</el-checkbox>
						<el-checkbox label="1">特色菜品</el-checkbox>
						<el-checkbox label="2">推荐菜品</el-checkbox>
						<el-checkbox label="3">新推菜品</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="电子发票设置">
					<el-radio-group v-model="formData.dzfp_wxdndcsfkjdzfp">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="订单详情页设置">
					<el-radio-group v-model="formData.wechat_number_on_order">
						<el-radio label="1">桌位号</el-radio>
						<el-radio label="0">取餐号</el-radio>
						<el-radio label="2">取餐号+取餐二维码</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="服务费显示设置">
					<el-radio-group v-model="formData.wechat_service_show">
						<el-radio label="1">单独显示</el-radio>
						<el-radio label="0">平坦到菜品</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="扫码是否需要关注微信公众号">
					<el-radio-group v-model="formData.wechat_authorization">
						<el-radio label="0">是</el-radio>
						<el-radio label="1">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-button type="primary" size="large" @click="saveData" style="margin-left: 140px;">保存</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { TzxTreeInputNode } from '@/components/TzxTreeInputNode';
	import { getScanConfig, getStoreInfoById, saveScanConfig } from '@/api/weixin';
	export default {
		components: {
			TzxTreeInputNode
		},
		data() {
			return {

				storeId: 0, //门店id
				store_info: null, //已选门店详情
				action: "", //图片上传地址
				imageUrl: "",
				dialogImageUrl: "", //
				filelist: [],
				dialogVisible: false,
				showModelPic: require('@/assets/diancan/diancan_big.png'),
				formData: {
					wechat_home_template: "B",
					wechat_qr_code_range: 0, //二维码有效距离
					wechat_payment_time: 1, //有效支付时间
					dzfp_ewmdyxq: 1, //发票有效期
					wechat_month_sale_base: 0, //月销量
					whether_wechat_member: '1', //点餐会员设置 
					wechat_payment_type: '1', //支付方式 1立即支付，0吃完付款
					wechat_sort_show: ['0', '1'], //分类显示
					dzfp_wxdndcsfkjdzfp: '1', //电子发票
					wechat_number_on_order: '1', //订单详情页
					wechat_service_show: '1', //服务费设置
					periods: [], //点餐时段
					wechat_authorization: '0', //扫码是否需要关注微信公众号

				}
			}
		},
		mounted() {
			this.action = '../../../imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';//正式地址  正式环境使用
			//this.action = 'img/imgServlet?actionType=upload&tenentid=' + this.$store.state.user.tenancyid + '&fileId='; //代理地址  本地调试时使用

		},
		methods: {
			//获取门店配置信息
			getStoreInfoById(id) {

				getStoreInfoById("store_id=" + id).then((data => {
					if(data.success) {
						this.store_info = data.store_info;
						if(('longitude' in data.store_info) && data.store_info.longitude && ('latitude' in data.store_info) && data.store_info.latitude) {
							this.getScanConfig(id);
						} else {
							this.$message({
								message: "未设置门店经纬度信息不能操作此页面功能！",
								type: "error"
							});
						}
					} else {
						this.$message({
							message: "获取门店详情失败",
							type: "error"
						});
					}
				}))

			},

			//获取门店扫码点餐配置
			getScanConfig(id) {
				let paraCode = ['multi_consumer', 'wechat_service_show', 'whether_wechat_member', 'wechat_payment_time', 'wechat_home_template', 'wechat_qr_code_range', 'wechat_pre_order', 'dzfp_wxdndcsfkjdzfp', 'dzfp_ewmdyxq', 'wechat_number_on_order', 'wechat_sort_show', 'wechat_nopay_cut', 'wechat_payment_type', 'wechat_unreal_table', 'wechat_month_sale_base', 'wechat_table_code', 'wechat_authorization'];
				let wx_paraCodes = ['wechat_polling_image', 'multi_consumer', 'scancode_pay_method']
				let urlparam = encodeURI("?store_id=" + id + "&paraCodes=" + paraCode.join(",") + "&wx_paraCodes=" + wx_paraCodes.join(","));
				getScanConfig(urlparam).then((data => {
					if(data.success) {
						this.formData.wechat_qr_code_range = data.data.wechat_qr_code_range;
						this.formData.wechat_payment_time = data.data.wechat_payment_time;
						this.formData.dzfp_ewmdyxq = data.data.dzfp_ewmdyxq;
						this.formData.wechat_month_sale_base = data.data.wechat_month_sale_base;
						this.formData.whether_wechat_member = data.data.whether_wechat_member;
						this.formData.wechat_payment_type = data.data.wechat_payment_type;
						this.formData.wechat_sort_show = data.data.wechat_sort_show.split(',');
						this.formData.dzfp_wxdndcsfkjdzfp = data.data.dzfp_wxdndcsfkjdzfp;
						this.formData.wechat_number_on_order = data.data.wechat_number_on_order;
						this.formData.wechat_service_show = data.data.wechat_service_show;
						this.formData.wechat_authorization = data.data.wechat_authorization;
						this.formData.wechat_home_template = data.data.wechat_home_template;
						if(data.orderingtimes && data.orderingtimes.length > 0) {
							let now = new Date();
							let year = now.getFullYear();
							let month = now.getMonth() + 1;
							let day = now.getDate();
							this.formData.periods=[];
							for(var i = 0; i < data.orderingtimes.length; i++) {

								let lineup_starttime = data.orderingtimes[i].lineup_starttime.split(':');
								let lineup_endtime = data.orderingtimes[i].lineup_endtime.split(':');								
								this.formData.periods.push({
									time: [new Date(year, month, day, lineup_starttime[0], lineup_starttime[1], lineup_starttime[2]), new Date(year, month, day, lineup_endtime[0], lineup_endtime[1], lineup_endtime[2])]

								});
							}
						}
						let urls = data.wx_data.wechat_polling_image.split(',');
						this.filelist=[];
						for(var i = 0; i < urls.length; i++) {
							this.filelist.push({
								name: "",
								url: urls[i]
							});
						}
						if(this.filelist.length >= 5) {
							this.showUpload = false;
						}

					} else {
						this.$message({
							message: "获取配置失败",
							type: "error"
						});
					}
				}))

			},
			saveData() {
				let data = [{
						"para_code": "wechat_qr_code_range",
						"para_value": this.formData.wechat_qr_code_range
					},
					{
						"para_code": "wechat_payment_time",
						"para_value": this.formData.wechat_payment_time
					},
					{
						"para_code": "dzfp_ewmdyxq",
						"para_value": this.formData.dzfp_ewmdyxq
					},
					{
						"para_code": "wechat_month_sale_base",
						"para_value": this.formData.wechat_month_sale_base
					},
					{
						"para_code": "wechat_home_template",
						"para_value": this.formData.wechat_home_template
					},
					{
						"para_code": "whether_wechat_member",
						"para_value": this.formData.whether_wechat_member
					},
					{
						"para_code": "dzfp_wxdndcsfkjdzfp",
						"para_value": this.formData.dzfp_wxdndcsfkjdzfp
					},
					{
						"para_code": "wechat_number_on_order",
						"para_value": this.formData.wechat_number_on_order
					},
					{
						"para_code": "wechat_service_show",
						"para_value": this.formData.wechat_service_show
					},
					{
						"para_code": "wechat_payment_type",
						"para_value": this.formData.wechat_payment_type
					},
					{
						"para_code": "wechat_authorization",
						"para_value": this.formData.wechat_authorization
					},
					{
						"para_code": "wechat_sort_show",
						"para_value": this.formData.wechat_sort_show.join(',')
					}
				];

				let imgurls = "";
				if(this.filelist.length > 0) {
					for(var i = 0; i < this.filelist.length; i++) {
						if(imgurls != "") {
							imgurls += "," + this.filelist[i].url;
						} else {
							imgurls += this.filelist[i].url;
						}
					}
				}
				let wx_param = [{
						"para_code": "scancode_pay_method",
						"para_value": "0"
					},
					{
						"para_code": "wechat_polling_image",
						"para_value": imgurls
					}
				];

				let orderingtimes = [];
				if(this.formData.periods.length > 0) {
					for(var i = 0; i < this.formData.periods.length; i++) {
						let starTime = this.formData.periods[i].time[0];
						let endTime = this.formData.periods[i].time[1];
						orderingtimes.push({
							"lineup_starttime": starTime.getHours() + ":" + starTime.getMinutes() + ":" + starTime.getSeconds(),
							"lineup_endtime": endTime.getHours() + ":" + endTime.getMinutes() + ":" + endTime.getSeconds()

						});
					}
				}
				let param = "store_id=" + this.storeId + "&data=" + JSON.stringify(data) + "&wx_param=" + JSON.stringify(wx_param) + "&orderingtimes=" + JSON.stringify(orderingtimes);
				saveScanConfig(param).then((data) => {
					if(data.success) {
						this.$message({
							message: "保存成功",
							type: "success"
						})
					} else {
						this.$message({
							message: data.msg,
							type: "error"
						})
					}
				})
			},
			getStoresIds(data) {
				//获取门店的store_id 的数组			
				this.getStoreInfoById(data.id);
				this.storeId = data.id;
			},
			setModelPic(value) {
				let model = "";
				switch(value) {
					case 'S':
						model = "smail";
						break;
					case 'M':
						model = "mid";
						break;
					case 'B':
						model = "big";
						break;

				}
				this.showModelPic = require('@/assets/diancan/diancan_' + model + '.png');
			},
			removePeriod(item) {
				var index = this.formData.periods.indexOf(item)
				if(index !== -1) {
					this.formData.periods.splice(index, 1)
				}
			},
			addPeriod() {
				this.formData.periods.push({
					time: [],
					key: Date.now()
				});
			},
			onSubmit() {

			},

			//删除上传图片
			handleRemove(file, fileList) {
				let findIndex = this.filelist.findIndex(item => item.url == file.url);
				if(findIndex >= 0) {
					this.filelist.splice(findIndex, 1);
				}
			},
			
			//预览上传图片
			handlePreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//上传成功
			handelSuccess(res, file, fileList) {
				//let url = URL.createObjectURL(file.raw);
				let index1 = res.indexOf("url") + 6;
				let index2 = res.indexOf("png") != -1 ? res.indexOf("png") + 3 : res.indexOf('jpg') + 3;
				let path = res.substring(index1, index2); /****图片地址*****/
				let filename;
				if(path.indexOf("/") > 0) //如果包含有"/"或"\"号 从最后一个"/"或"\"号+1的位置开始截取字符串
				{
					filename = path.substring(path.lastIndexOf("/") + 1, path.length);
				} else if(path.indexOf("\\") > 0) {
					filename = path.substring(path.lastIndexOf("\\") + 1, path.length);
				}
				this.filelist.push({
					name: "",
					url: path
				});
			},
			//上传失败
			handelError() {

			},

			//上传之前检查
			handelBefore(file) {
				if(this.filelist.length >= 5) {
					this.$message.error('轮播图最多5张');
					return false;
				}
				const isJPG = file.type.indexOf('image') == 0; //'image/jpeg'||file.type === 'image/png'||file.type === 'image/gif';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.wx-scan-manage {
		background-color: #fff;
		.el-form-item__label {
			margin: 0 !important;
		}
		.el-form-item__content .el-input {
			margin-right: 10px;
			width: 270px;
		}
		.select-input-zr.el-input {
			width: 230px;
		}
		.el-upload--picture-card {
			width: 100px;
			height: 100px;
			line-height: 100px;
		}
		.el-upload-list--picture-card .el-upload-list__item {
			width: 100px;
			height: 100px;
		}
		.droplist {
			margin-top: -30px;
		}
		h1.wx-nav {
			color: #34495E;
			font-size: 16px;
			border-bottom: 1px solid #EAF1F6;
			padding: 20px 30px;
		}
		.wx-left {
			float: left;
			width: 330px;
			height: 660px;
			background: url(../../assets/diancan/phone_scan.png) no-repeat scroll top left;
			background-size: 100% 100%;
			margin: 40px;
			overflow: hidden;
			img {
				margin: 77px 0px 0 22px;
				width: 286px;
				height: 505px;
			}
		}
		.wx-right {
			overflow: hidden;
			padding: 40px;
		}
	}
</style>