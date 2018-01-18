<template>
	<div class='applist'  v-loading.body="loading">
		<el-popover
			ref="popover"
			placement="right"
			width="100%"		
			trigger="hover">
			<el-table :data="gridData" height="250" element-loading-text="给我一点时间" empty-text='暂无任何数据'>
				<el-table-column width="100" align="left" property="old_birthday" label="生日"></el-table-column>
				<el-table-column width="100" align="left" property="last_operator" label="修改人"></el-table-column>
				<el-table-column width="150" align="left" property="last_updatetime" label="修改时间"></el-table-column>
			</el-table>
		</el-popover>
		<div class='listtitle'>
			<span>基础资料编辑</span>
		</div>
		<div class='memberupdate' >
			<el-form  :model="form"  ref="form" label-width="130px" >
				<el-form-item label="姓名:" prop="name" >
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号:">
					<!-- <el-input v-model="form.mobil"></el-input> -->
					<div>{{form.mobil}}</div>
				</el-form-item>
				<el-form-item label="性别:" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="man" value='man'>男</el-radio>
						<el-radio label="woman" value='woman'>女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="星座:" prop="constellation">
					<el-select v-model="form.constellation" placeholder="请选择星座">
						<el-option v-for="item in constellations" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="生日:" prop="birthday">
					<el-date-picker  v-model="form.birthday" type="date" placeholder="选择日期" :picker-options="pickerOptions">
					</el-date-picker>
					<icon-svg icon-class='question' v-popover:popover></icon-svg>
				</el-form-item>
				<el-form-item label="年龄组:" prop="age_group" >
					<el-select v-model="form.age_group" placeholder="请选择年龄段">
						<el-option v-for="item in ageGroup" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学历:" prop="education">
					<el-select v-model="form.education" placeholder="请选择学历">
						<el-option v-for="item in educations" :key="item.id" :label="item.text" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="居住城市:" prop="city">
					<el-select v-model="form.city" filterable placeholder="请选择城市">
						<el-option v-for="item in cities" :key="item.regCode" :label="item.regName" :value="item.regCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-for="(addre, index) in form.address" :key="addre.key" :label="'收货地址' + (index+1)+':'" :prop="'address.' + index + '.value'" style='width:1000px'>
					<el-select   size='cascading'  @change='selectProv(addre,index)' v-model="addre.prov" placeholder="省">
						<el-option   v-for="item in provs" :key="item.id" :label="item.text.substring(7)" :value="item.id">
						</el-option>
					</el-select>
					<el-select size='cascading' @visible-change='showCity(addre,index)' @change='selectCity(addre,index)' v-model="addre.city" placeholder="市">
						<el-option v-for="item in citys" :key="item.id" :label="item.text.substring(7)" :value="item.id">
						</el-option>
					</el-select>
					<el-select size='cascading' @visible-change='showDist(addre,index)'  v-model="addre.dist" placeholder="区">
						<el-option v-for="item in distes" :key="item.id" :label="item.text.substring(7)" :value="item.id">
						</el-option>
					</el-select>
					<div class='imgbody'>
						<img src="../../assets/member/add.png" v-if='index==0' @click.prevent='addAddress' />
						<img src="../../assets/member/minus.png" v-if='index!=0' @click.prevent='removeAddress(addre)' />
					</div>

					<div style='margin-top: 20px;margin-left: 40px;'>
						<el-input placeholder="请输入详细地址" style='width:770px;' v-model="addre.detail"></el-input>
					</div>

				</el-form-item>

				<el-form-item class='form-submit'>
					<el-button @click='resetForm' size='large'>取消</el-button>
					<el-button @click="submitForm('form')" size='large' type="primary">保存</el-button>
				</el-form-item>
			</el-form>
			
		</div>	
	</div>	
	
	
</template>

<script>

	import { getCity, getDist } from '@/api/article'
	import {getCities,getsysParamer,getProsAndCity} from '@/api/parameter'
	import {findCustomerById,updateCustomer,findAllCustomerBirthday} from '@/api/member'
	import Assist from '@/utils/assist'
	export default {
		data() {

			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				form: {
					id:'',
					name: '',
					mobil: '',
					sex: '',
					constellation: '',
					birthday: '',
					education: '',
					city: '',
					age_group: '',
					address: [{
						value: '',
						key: Date.now(),
						prov: '',
						city: '',
						dist: '',
						detail: ''
					}],
				},
				loading:false,
				cities: [],
				constellations: [],
				ageGroup :[],
				educations: [],
				provs: [], // 省市区三级联动  省
				citys: [], // 省市区三级联动  市
				distes: [], // 省市区三级联动  区
				gridData: []//生日修改历史列表信息
			}
		},

		methods: {
			selectProv(item, index) {		
				this.form.address[index].city = '';
				this.form.address[index].dist = '';
				let data = '&id='+item.prov;
				getProsAndCity(data).then(response=>{
					this.citys = response;
				});
			
			},
			
			selectCity(item, index) {
			
				this.form.address[index].dist = '';
				let data = '&id='+item.city;
				
					getProsAndCity(data).then(response=>{
						this.distes = response;
					});
			
				
			},
			showCity(item, index){
				  
				let isHaveCitys = this.citys.filter(obj=>item.city==obj.city).length>0 ; //判断当前的citys数组里 是否含有该city   这样做的目的减少前后台交互
				let isFirst =  item.prov!='' && item.prov != null && item.prov!= undefined;   //第一次进入页面不选择省应该 把 市清空
				if(!isFirst){
					this.citys = [];
					return 
				}
				/* 解决页面回显是 会出现的问题 */
				if(!isHaveCitys&&isFirst){
					let data = '&id='+item.prov;
				
						getProsAndCity(data).then(response=>{
							this.citys = response;
						});
				
					
				}	
			},
			showDist(item, index){
				
				let isHaveDists = this.distes.filter(obj=>item.dist==obj.dist).length>0 ; //判断当前的citys数组里 是否含有该city   这样做的目的减少前后台交互
				let isFirst =  item.city!='' && item.city != null && item.city!= undefined;   //第一次进入页面不选择省应该 把 市清空
				if(!isFirst){
					this.distes = [];
					return 
				}
				/* 解决页面回显是 会出现的问题 */
				if(!isHaveDists&&isFirst){
					let data = '&id='+item.city;
			
						getProsAndCity(data).then(response=>{
							this.distes = response;
						});
			
				}		
			},			
			addAddress() {
				this.form.address.push({
					value: '',
					key: Date.now(),
					prov: '',
					city: '',
					dist: '',
					detail: ''
				});
			},
			removeAddress(item) {
				let index = this.form.address.indexOf(item)
				if(index !== -1) {
					this.form.address.splice(index, 1)
				}
			},
			getMemberMessage(id) {
				this.loading = true;
				this.form.id = id;
				let message = 'id='+id;
				findCustomerById(message).then(response=>{
					if(response.success == true){
						
						this.form = response;
						
						if(response.address==null||response.address==''|| response.address ==undefined){
							this.form.address = [];
							this.form.address.push({
								value: '',
								key: Date.now(),
								prov: '',
								city: '',
								dist: '',
								detail: ''
							});
						}
						else{
							response.address.map((item,index)=>{
								this.showCity(item,index)
								this.showDist(item,index)
							})
						}
						 this.$nextTick(function(){
						 	//渲染完成
						 	
                   			this.loading = false;
       					 });
						
						
					}
				})

				//会员生日修改列表请求
				let data = 'customer_id=' + id;
				findAllCustomerBirthday(data).then(res=> {
					this.gridData = res.data;
					conso.log(this.gridData);
				})
			},
			submitForm(formName) {
				_czc.push(["_trackEvent", "会员中心-会员档案-基础资编辑", "修改会员资料"]);//埋点统计
				let message = 'id='+this.form.id+
							  '&name='+this.form.name+
							  '&mobil='+this.form.mobil+
							  '&sex='+this.form.sex+
							  '&city='+this.form.city+
							  '&constellation='+this.form.constellation+
							  '&birthday='+Assist.formatDate(this.form.birthday)+
							  '&education='+this.form.education+
							  '&agegroup='+this.form.age_group+
							  '&address='+JSON.stringify(this.form.address);
							  						  
				this.$refs[formName].validate((valid) => {
					if(valid) {		
						this.loadingBody = true
						updateCustomer(message).then(response=>{
							this.loadingBody = false
							if(response.success==true){
								this.$router.push({
									path: '/member/member_profile_detail',
									// hash: 'new',
									query: {
										id: this.$route.query.id
									}						
								})	
								// this.getMemberMessage(this.$route.query.id);		
								this.$message({
									type: 'success',
									message: '保存成功！'
								});
							}
							else{
								this.$message({
									type: 'error',
									message: response.msg
								});
							}
							
						}).catch(e=>{
							this.loadingBody = false
							this.$message({
								type: 'error',
								message: e
							});
						});
						
					} else {
						return false;
					}
				});
			},
			resetForm() {
					this.$router.push({
						path: '/member/member_profile_detail',
						query: {
							id: this.$route.query.id
						}						
					})	
            }

		},
		mounted() {
			/*加载一些系统参数  from表单的数据*/
			
			if(this.$route.query.id!=undefined){

				this.getMemberMessage(this.$route.query.id);
			}
		},
		
		created(){
			let getConstellations = 'type=0&code=constellation&y=1'
			let getEducations = 'type=0&code=education&y=1'
			let getAgeGroup = 'type=0&code=age_group&y=1'  
			getCities().then(response=>{
				this.cities = response;
			});
			getsysParamer(getConstellations).then(response=>{
				this.constellations = response;
			});
			getsysParamer(getAgeGroup).then(response=>{
				this.ageGroup = response;
			});
			getsysParamer(getEducations).then(response=>{
				this.educations = response;
			});
			getProsAndCity().then(response=>{
				this.provs = response[0].children;
			});
		}
			
	}
</script>

<style rel="stylesheet/scss" lang="scss">
.applist {
		height: auto;
		overflow: hidden;
		zoom: 1;
		background: #fff;
		.listtitle {
			position: relative;
			height: 50px;
			margin-left: 20px;
			margin-right: 20px;
			line-height: 50px;
			border-bottom: 1px solid #EAF1F6;
			span {
				font-size: 16px;
				color: #34495E;
				margin-left: 10px;
			}
		}
		.memberupdate {
			padding-top: 20px;
			.el-form {
				width: 1200px;
				.el-input--cascading{
					width: 195px !important;
					margin-right: 5px;
				}
				.el-form-item {
					margin-bottom: 20px;
					position: relative;
					float: left;
					width: 540px;
					.imgbody {
						width: 220px;
						float: right;
						line-height: 32px;
						height: 32px;
						padding-top: 5px;
						img {
							width: 22px;
							height: 22px;
						}
					}
					.el-form-item__label{
					    padding: 10px 12px 9px 0;
					}
					.el-form-item__error {
						left: 40px;
					}
					.el-input {
						width: 230px;
					}
				}
				.form-submit {
					width: 1000px;
					height: 62px;
					padding-top: 20px;
					padding-bottom: 10px;
					margin-left: 40px;
					margin-right: 40px;
					border-top: 1px dashed #EAF1F6;
				}
			}
		}
	}
</style>