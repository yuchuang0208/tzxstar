<template>
	<div class='applistdish'  v-loading.body="loadingBody">
		<div class='listtitledish'>
			<span>{{coupon_title}}</span>
		</div>
		<div class='memberupdatedish' >
			<el-form  :model="form"  ref="form" label-width="140px" >
				<el-form-item label="券名称:" prop="class_name" :rules="filter_rules({required:true,maxLength:20})">
					<el-input :disabled='is_find' style='width:230px;' v-model="form.class_name" ></el-input>
				</el-form-item>

				<el-form-item label="助记码:" prop="help_memory_code" :rules="filter_rules({required:true,maxLength:20})">
					<el-input :disabled='is_find' style='width:230px;' v-model="form.help_memory_code"></el-input>
				</el-form-item>
				<el-form-item label="面值:" prop="face_value" :rules="filter_rules({required:true,type:'num',maxLength:4})">
					<el-input   :disabled='flag' min="0" step="1" type="number" style='width:230px;' v-model="form.face_value">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item  label="菜品:" :rules="filter_rules({required:true})" >
					    <div class='dishDiv'>
					    	<div class='showDishMessage' v-for='(dish,index) in nodes_dish'>
							<tzx-tag cursor='default' color='#34495E' size='medium' :closable='!is_find' @closeThis='deleteDish(dish,index)'>{{dish.label}}({{dish.plabels}})￥{{dish.standard_price}}</tzx-tag>
							</div>
							<div class='checkdish' v-if='!is_find'>
								<span @click='dialogVisible = true'>选择菜品</span>
							</div>
					    </div>
				</el-form-item>
				<el-form-item label="兑换方式:" prop="is_total" :rules="filter_rules({required:true})">
					<el-radio-group v-model="form.is_total">
						<el-radio :disabled='is_find' label="1" value='1'>直接兑换菜品</el-radio>
						<el-radio :disabled='is_find' label="2" value='2'>指定菜品的部分菜价</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="券有效期:" prop='validity_type' :rules="filter_rules({required:true})" >
					<el-radio-group @change = 'validityTypeChange' v-model="form.validity_type">
							<el-form-item class='my-item' prop='validity_days' :rules="filter_rules({type:'num'})">
								   	<el-radio class='my-radio' label="1" value='1' :disabled='is_find'>券发出后</el-radio>
									<el-input :disabled='is_find' @change='validity_days_change' size='small' min="0" step="1" type="number"  style='width:120px;margin-left: 60px;' v-model="form.validity_days">
										<template slot="append">天</template>
									</el-input>
									<span style='display: inline-block;font-size: 14px;margin-left: 5px;'>内有效</span>
							</el-form-item>
							<el-form-item  class='my-item' prop='validity_date' >
								<el-radio class='my-radio2' label="2" value='2' :disabled='is_find'>固定日期</el-radio>
									<el-date-picker :disabled='is_find' @change='validity_date_change' style='margin-left: 60px;' v-model="form.validity_date" type="daterange" placeholder="选择日期范围">
									</el-date-picker>
								<span style='display: inline-block;font-size: 14px;margin-left: 5px;'>内有效</span>
							</el-form-item>
					</el-radio-group>
				</el-form-item>
				<hr class='form_hr' />
				<el-form-item label="使用条件:" prop="bill_limit_money" :rules="filter_rules({required:true,type:'money1'})">
							<span style='display: inline-block;width:128px'>单笔消费金额满</span>
							<el-input :disabled='is_find' size='small' min="0" step="1" type="number" style='width:120px;' v-model="form.bill_limit_money">
								<template slot="append">元</template>
							</el-input>
							<span style='display: inline-block;margin-left: 5px;'>可用</span>
							<el-tooltip class="item" effect="dark" content="值为0表示不限制" placement="top-start">
					    	<icon-svg icon-class='question'></icon-svg>
					        </el-tooltip>

				</el-form-item>
				<el-form-item class='required_message_hide' label=" " prop="bill_limit_num" :rules="filter_rules({required:true,type:'num'})">
							<span style='display: inline-block;width:128px'>单笔消费最多可用</span>
							<el-input :disabled='is_find' size='small' min="0" step="1" type="number" style='width:120px;' v-model="form.bill_limit_num"><template slot="append">张</template>
							</el-input>
							<el-tooltip class="item" effect="dark" content="值为0表示不限制" placement="top-start">
					    	<icon-svg icon-class='question'></icon-svg>
					        </el-tooltip>
				</el-form-item>

				<el-form-item class='required_message_hide' label=" " prop="use_after_send" :rules="filter_rules({required:true,type:'num'})">
							<span style='display: inline-block;width:128px'>领券后</span><el-input :disabled='is_find' min="0" step="1" type="number" size='small' style='width:120px;' v-model="form.use_after_send"><template slot="append">天</template></el-input>
							<span style='display: inline-block;margin-left: 5px;'>可用</span>
							<el-tooltip class="item" effect="dark" content="值为0表示领券当日即可使用" placement="top-start">
					    	<icon-svg icon-class='question'></icon-svg>
					        </el-tooltip>
				</el-form-item>

				<el-form-item class='required_message_hide' label=" " prop="used_other" :rules="filter_rules({required:true})">
					<span style='display: inline-block;width:128px'>与其他菜品券混用</span>
					<el-radio-group v-model="form.used_other">
						<el-radio label="1" value='1' :disabled='is_find'>不可以</el-radio>
						<el-radio label="0" value='0' :disabled='is_find'>可以</el-radio>

					</el-radio-group>
				</el-form-item>
				<el-form-item class='required_message_hide' label=" " prop="with_discount" :rules="filter_rules({required:true})">
					<span style='display: inline-block;width:128px'>与其他优惠并用</span>
					<el-radio-group v-model="form.with_discount">
						<el-radio label="1" value='1' :disabled='is_find'>不可以</el-radio>
						<el-radio label="0" value='0' :disabled='is_find'>可以</el-radio>

					</el-radio-group>
				</el-form-item>
				<el-form-item class='required_message_hide' label=" "  prop="can_give_friend" :rules="filter_rules({required:true})">
					<span style='display: inline-block;width:128px'>是否可以转赠好友</span>
					<el-radio-group v-model="form.can_give_friend">
						<el-radio label="0" value='0' :disabled='is_find'>不可以</el-radio>
						<el-radio label="1" value='1' :disabled='is_find'>可以</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item class='required_message_hide' label=" "  prop="check_only" :rules="filter_rules({required:true})">
					<span style='display: inline-block;width:128px'>校验唯一码</span>
					<el-radio-group v-model="form.check_only">
						<el-radio label="0" value='0' :disabled='is_find'>不校验</el-radio>
						<el-radio label="1" value='1' :disabled='is_find'>校验</el-radio>

					</el-radio-group>
				</el-form-item>
				<el-form-item label="使用时段:" prop="use_cycle" :rules="filter_rules({type:'array'})">
					<el-checkbox-group v-model="form.use_cycle">
						<div class='checkboxdiv' v-for='(week,index) in weeks'>
							<el-checkbox :disabled='is_find' @change='timeCheckChange' :label="week.id" :key="index" >
							{{week.text}}
						 	</el-checkbox>

							<el-radio-group style='margin-left: 30px;' @change='peraidChange(week)' v-model="week.model">
								<el-radio :disabled='is_find' label="1" value='1'>全天</el-radio>
								<el-radio :disabled='is_find' label="0" value='0'>选择时段</el-radio>
							</el-radio-group>
							<div class='weektimes' v-if='week.model=="0"'>
								<div class='everyweektimes' v-for='(time,inx) in week.times'>
									<el-time-select :disabled='is_find' @change ='TimeChange("0",index,inx)' :editable=false style='width:110px' placeholder="起始时间"  v-model="time.start_time" :picker-options="{ start: '00:00', step: '00:15', end: '24:00' }">
								     </el-time-select>
								  	 <el-time-select :disabled='is_find' @change ='TimeChange("1",index,inx)' :editable=false style='width:110px' placeholder="结束时间" v-model="time.end_time" :picker-options="{ start: '00:00', step: '00:15',end:'24:00', minTime: time.start_time }">
								 	 </el-time-select>
								 	 <div class="imgbody" v-if='!is_find'>
								 	 	<img src="../../assets/member/add.png" v-if='inx==0' @click.prevent='addTimes(time,index)' />
										<img src="../../assets/member/minus.png" v-if='inx!=0' @click.prevent='removeTimes(time,index,inx)' />
								 	 </div>
								</div>
							</div>
						</div>
					</el-checkbox-group>

				</el-form-item>
				<hr class="form_hr"/>
				<el-form-item  label="可用门店:"  prop="stores" :rules="filter_rules({required:true})">
					 <div class='dishDiv'>
					    	<div class='showDishMessage' v-for='(store,index) in storeNodes_template'>
								<tzx-tag cursor='default' color='#34495E' size='medium' :closable='!is_find'  @closeThis='deleteStore(store,index)'>{{store.label}}</tzx-tag>
							</div>
							<div class='checkdish'>
								<span @click='storeDialogVisible = true'>选择门店</span>
							</div>
					</div>
				</el-form-item>
				<el-form-item  label="使用渠道:"  prop="chanels" :rules="filter_rules({type:'array'})">
					<el-checkbox :disabled='is_find' :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class='checkAll' >全部</el-checkbox>
					<el-checkbox-group v-model="form.chanels" @change="handleCheckedChanelsChange">
						<el-checkbox :disabled='is_find' v-for="(item,index) in chanels" :key='index' :label="item.id" >{{item.text}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item  class='no-required' label="券图片:"  prop="imageUrl" >
					<el-upload
						:disabled='is_find'
					  class="avatar-uploader"
					  :action='action'
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload" name='fileToUpload'>
					  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
					  <div v-else class=" avatar-uploader-icon">
					  	<i class="el-icon-plus" ></i>
					  	<span>上传图片</span>
					  	<span>建议尺寸530*320px,300kb以内png/jpg图片</span>
					  </div>
					</el-upload>
				</el-form-item>
				<el-form-item  label="同步微信卡包:" :rules="filter_rules({required:true})" >
					   <div  class="couponbg"  >
					   	    <div  :class='isClicked&&index==clickedindex?"couponbgfeclicked":"couponbgfe"' v-for='(bg,index) in bglist'>
					   	    	<div  :class='isClicked&&index==clickedindex?"clickedli":"normalli"' @click='changeCouponsBgColor(index)'  :style='{ background: bg.color,borderColor:bg.color }'></div>
					   	    </div>
					   </div>

				</el-form-item>
				<el-form-item  label="券到期提醒:"  prop="warning" :rules="filter_rules({type:'array'})">
					 <el-checkbox-group v-model="form.warning">
						<div class='checkboxdiv' v-for='(warn,index) in warning'>
							<el-checkbox :disabled='is_find' @change='warnCheckChange' :label="warn.id" :key="index" >
								{{warn.text}}<span v-if='index==1' style='color: #A5B0B7;'>(按照微信公众号标准模板配置)</span>
						   </el-checkbox>
						</div>

					</el-checkbox-group>
					<div class='showtimemessage' v-if='form.warning.indexOf("1")!=-1 || form.warning.indexOf("2")!=-1'>
						<div class='smsmessage' v-if='form.warning.indexOf("2")!=-1'>
							{{smsmessage.info_content}}
						</div>
						<span style="margin-left: 30px;">提醒时间:</span>
						<div class='warningtime' >
							<div class='everywarningtime' :key='index' v-for='(item,index) in advance'>
								<span>券到期前:</span>
								<el-input :disabled='is_find' min="0" step="1" type="number" size='small' :key='index' style='width:120px;' v-model="item.advance_day">
									<template slot="append">天</template>
								</el-input>
								<el-time-picker :disabled='is_find' size='small' style='width:120px;' :key='index' v-model="item.advance_time" format='HH:mm'	 placeholder="任意时间点">
							 	</el-time-picker>
							 	 <div class="imgbody" v-if='!is_find'>
								 	 	<img src="../../assets/member/add.png" v-if='index==0' @click.prevent='addWarnTimes(item,index)' />
										<img src="../../assets/member/minus.png" v-else @click.prevent='removeWarnTimes(item,index)' />
								 </div>
							</div>


						</div>
					</div>
				</el-form-item>
				<el-form-item  class='no-required' label="备注:"  prop="remark">
					  	<el-input :disabled='is_find' v-model="form.remark" size='small' type="textarea"  :rows="3" placeholder="请输入内容" style='width:780px'>
						</el-input>
				</el-form-item>
				<hr class="form_hr"/>

				<el-form-item class='form-submit' v-if='!is_find'>
					<el-button @click='resetForm' size='large'>取消</el-button>
					<el-button @click="submitForm('form','save')" size='large' type="primary">保存</el-button>
					<el-button @click="submitForm('form','issue')" size='large' type="primary">保存并同步</el-button>
				</el-form-item>
			</el-form>

		</div>


		<el-dialog  :show-close=true size='tiny' :visible.sync="dialogVisible" custom-class='treeSelect' title="选择门店">	
	   		 <tzx-tree-select
			   	:data="data"
			   	unitAndName='道菜'
			   	:isDisabled=true
			   	type="1"
			   	@cancelButton='dialogVisible = false'
			   	@makeSureButton ='makeSureChecked'
			   	@boxChange = 'boxChange'
			   	:defaultCheckedId = 'checkedIds'
			   	:pnodes= 'nodes'
			   	:ptotalSelect = 'total'
			   	>
	  		</tzx-tree-select>
		</el-dialog>
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
	</div>


</template>

<script>
	import Assist from '@/utils/assist';
	import {loadDishTree,saveOrUpdateDishCoupon,getCouponsDetails,issueWechart,findSmsTemplate} from '@/api/coupon'
    import { TzxTreeSelect } from '@/components/tzxtreeselect'
    import { TzxTag } from '@/components/tag'
    import {getsysParamer} from '@/api/parameter'
    import {getMendian} from '@/api/home'
	export default {
		components:{TzxTreeSelect,TzxTag},
		data() {

			return {
				//门店
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
				dialogVisible:false,
				checkedIds:[],
				nodes:[],
				nodes_dish:[],//点击确定按钮 才让选择的菜品展示 不能做数据双向绑定
				total:0,
				advance:[{
					advance_day:'',
					advance_time:''
				}],
				warning:[{
					id:'0',
					text:'不提醒'
				},{
					id:'1',
					text:'微信提醒'
				},{
					id:'2',
					text:'短信提醒'
				}],
				bglist:[{
					id:'Color010',
					color:'#63b359'
				},{
					id:'Color020',
					color:'#2c9f67'
				},{
					id:'Color030',
					color:'#509fc9'
				},{
					id:'Color040',
					color:'#5885cf'
				},{
					id:'Color050',
					color:'#9062c0'
				},{
					id:'Color060',
					color:'#d09a45'
				},{
					id:'Color070',
					color:'#e4b138'
				},{
					id:'Color080',
					color:'#ee903c'
				},{
					id:'Color081',
					color:'#f08500'
				},{
					id:'Color082',
					color:'#a9d92d'
				},{
					id:'Color090',
					color:'#dd6549'
				},{
					id:'Color100',
					color:'#cc463d'
				},{
					id:'Color101',
					color:'#cf3e36'
				},{
					id:'Color102',
					color:'#5E6671'
				}],
				loadingBody:false,
				sex:'',
				isClicked:false,
				clickedindex:'',
				weeks:[{
					id:'2',
					text:'周一',
					model:'mon',
					times:[{
						start_time:'',
						end_time:'',
						id:'mon'
					}]

				},{
					id:'3',
					text:'周二',
					model:'tues',
					times:[{
						start_time:'',
						end_time:'',
						id:'tues'
					}]
				},{
					id:'4',
					text:'周三',
					model:'wed',
					times:[{
						start_time:'',
						end_time:'',
						id:'wed'
					}]
				},{
					id:'5',
					text:'周四',
					model:'thur',
					times:[{
						start_time:'',
						end_time:'',
						id:'thur'
					}]
				},{
					id:'6',
					text:'周五',
					model:'fri',
					times:[{
						start_time:'',
						end_time:'',
						id:'fri'
					}]
				},{
					id:'7',
					text:'周六',
					model:'sat',
					times:[{
						start_time:'',
						end_time:'',
						id:'sat'
					}]
				},{
					id:'1',
					text:'周日',
					model:'sun',
					times:[{
						start_time:'',
						end_time:'',
						id:'sun'
					}]
				}],
				checkAll:false,//渠道是否全选
			    isIndeterminate:false,//用来表示checkbox的不确定状态
			    chanels:[],
				form: {
					id:'',
					class_name: '',
					help_memory_code: '',
					face_value: '',
					is_total: '',
					validity_type: '',
					validity_days: '',
					validity_date: '',
					coupons_pro:'coupons_dish',
					start_coupon: '',
					end_coupon: '',
					bill_limit_num: '',
					bill_limit_money: '',
					can_give_friend: '0',
					used_other: '0',
					use_after_send: '',
					with_discount:'0',
					check_only:'0',
					use_cycle:[],
					stores:'0',
					chanels:[],
					imageUrl:'',
					warning:[],
				    remark:''
				},
				action:'',
				smsmessage:'',
				is_find:false,
				flag: false,
				coupon_title:'创建菜品券'
			}
		},
		methods: {
			validity_days_change(){
				if(this.form.validity_type !='1'){
					this.form.validity_type = '1'
				}
			},
			validity_date_change(val){
				if(val!=''&& val != undefined){
					this.form.start_coupon = val.substring(0,10);
					this.form.end_coupon = val.substring(13,23);
				}
				if(this.form.validity_type !='2' && val!=''&& val != undefined){
						this.form.validity_type = '2'
				}
			},
			TimeChange(type,index,i){
				let checked = false;
				let len = this.weeks[index].times.length;
				if(len==2){
					let a = this.weeks[index].times[0].start_time;
					let b = this.weeks[index].times[0].end_time;
					let c = this.weeks[index].times[1].start_time;
					let d = this.weeks[index].times[1].end_time;
				    checked = this.checkedTime(a,b,c,d);
				}
				else if(len==3){
					let aa = this.weeks[index].times[0].start_time;
					let bb = this.weeks[index].times[0].end_time;
					let cc = this.weeks[index].times[1].start_time;
					let dd = this.weeks[index].times[1].end_time;
					let ee = this.weeks[index].times[2].start_time;
					let ff = this.weeks[index].times[2].end_time;
				    checked = (this.checkedTime(aa,bb,cc,dd) || this.checkedTime(aa,bb,ee,ff) || this.checkedTime(cc,dd,ee,ff))
				}


				if(checked){
					this.$message({
						type:'error',
						message:'您选择的时间段有交叉'
					})
					type=='0'?this.weeks[index].times[i].start_time ='':this.weeks[index].times[i].end_time =''
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
			submitForm(formName,type) {
				_czc.push(["_trackEvent", "卡券中心-电子券-菜品券", "创建菜品券"]);//埋点统计


				this.$refs[formName].validate((valid) => {
					if(valid) {
						//对其他form表单无法校验的数据处理
						if(this.form.validity_type=='1' && this.form.validity_days==''){
							this.$message({
								type:'error',
								message:'请填写有效天数!'
							})
							return
						}
						if(this.form.validity_type=='2' && this.form.validity_date==''){
							this.$message({
								type:'error',
								message:'请选择券的使用日期范围!'
							})
							return
						}
						if(this.nodes_dish.length==0){
							this.$message({
								type:'error',
								message:'请选择菜品'
							})
							return
						}
						if(this.storeNodes_template.length==0){
							this.$message({
								type:'error',
								message:'请选择门店'
							})
							return
						}
						if(!this.isClicked){
							this.$message({
								type:'error',
								message:'请选择卡背景颜色'
							})
							return
						}
						let weeksCheck = false;
						let week_text = ''
						this.weeks.map((week,index)=>{
							if(week.model=='0'){
								week.times.map(time=>{
									if(time.start_time=="" || time.end_time == ''){
										weeksCheck = true;
										week_text = week.text
									}
								})
							}
						});
						if(weeksCheck){
							this.$message({
								type:'error',
								message:'请选择时间段为'+week_text+'的优惠券选择时间!'
							})
							return
						}
						/* 处理门店数据 */
						let stores = [];
						this.storeNodes_template.map(store=>{
							stores.push(store.id)
						})
						let store_ids = stores.join(',');
						/* 处理提醒方式数据*/
						let alert_mode = '0';
						if(this.form.warning.length==1){
							if(this.form.warning.indexOf('0')!=-1){
								alert_mode = '0'
							}
							else if(this.form.warning.indexOf('1')!=-1){
								alert_mode = '1'
							}
							else{
								alert_mode = '2'
							}
						}
						else{
							alert_mode = '3'
						}
						//对使用时段进行处理
						let template_id = '';
						let advanceChecked = false;
						if(alert_mode !='0' ){
							template_id = this.smsmessage.template_id
							this.advance.map((item,index)=>{
								if(item.advance_day == '' || item.advance_time == ''){
									advanceChecked = true;
								}
							});
						}
						if(advanceChecked){
							this.$message({
								type:'error',
								message:'请填写券到期提醒天数和提醒时间点!'
							})
							return
						}
						 /* 处理券的使用时段*/
					    let usePeriod = [];
					    this.weeks.map((week,index)=>{
				    		week.times.map(tt=>{
				    			(tt.end_time=='24:00') && (tt.end_time = '23:59')
					    	});
					    	this.form.use_cycle.map(use=>{
					    		if(week.id ==use){
					    			if(week.model=='1'){
					    				usePeriod.push({
					    					week:use,
					    					all_day:week.model,
					    					times:[]
					    				})
					    			}
					    			else{
					    				usePeriod.push({
					    					week:use,
					    					all_day:week.model,
					    					times:week.times
					    				})
					    			}
					    		}
					    	})
					    })
					   let wx_color = this.isClicked?this.bglist[this.clickedindex].id:''
				        let advance = [];
				        if(alert_mode != '0'){
				        	this.advance.map(item=>{
				        		advance.push({
				        			advance_day:item.advance_day,
				        			advance_time:Assist.formatDateAll(item.advance_time,'HH:mm')
				        		})
				        	})
				        }
						let data = 'id='+this.form.id+
							  '&class_name='+this.form.class_name+
							  '&help_memory_code='+this.form.help_memory_code+
							  '&face_value='+this.form.face_value+
							  '&is_total='+this.form.is_total+
							  '&validity_type='+this.form.validity_type+
							  '&validity_days='+this.form.validity_days+
							  '&start_coupon='+this.form.start_coupon+
							  '&end_coupon='+this.form.end_coupon+
							  '&bill_limit_num='+this.form.bill_limit_num+
							  '&bill_limit_money='+this.form.bill_limit_money+
							  '&can_give_friend='+this.form.can_give_friend+
							  '&used_other='+this.form.used_other+
							  '&use_after_send='+this.form.use_after_send+
							  '&with_discount='+this.form.with_discount+
							  '&check_only='+this.form.check_only+
							  '&details='+JSON.stringify(this.nodes_dish)+
							  '&use_chanel='+this.form.chanels.join(',')+
							  '&store_ids='+ store_ids+
                              '&coupons_pro='+this.form.coupons_pro+
							  '&wx_color='+ wx_color +
							  '&alert_mode='+ alert_mode+
							  '&back_image1='+this.form.imageUrl+
							  '&advance='+JSON.stringify(advance)+
							  '&usePeriod='+JSON.stringify(usePeriod)+
							  '&remark='+this.form.remark;

						this.loadingBody = true
						saveOrUpdateDishCoupon(data).then(response=>{
							this.loadingBody = false
							if(response.success==true){
								if(type=='issue'){
									this.issue({id:response.data});
									return
								}
								else{
									this.$message({
										type: 'success',
										message: '保存成功！'
									});
								}
								this.$router.push({
									path:'/card/electroniccoupon',
									hash:'new'
								});
								this.flag = false;
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
						console.log('error submit!!');
						return false;
					}
				});
			},
			 issue(row){
				let data = 'id='+row.id;
				this.loadingBody = true;
				issueWechart(data).then(response=>{
					this.loadingBody = false;
					if(response.success){
						this.$message({
							type:'success',
							message:'已同步,请耐心等待微信审核!'
						})

					}else{
						this.$message({
							type:'error',
							message:'保存成功!但同步出现错误'
						})
					}
					this.$router.push({
						path:'/card/electroniccoupon',
						hash:'new'
					})
				}).catch(e=>{
					this.loadingBody = false;
					this.$message({
						type:'error',
						message:'保存成功!但同步出现错误'
					})
				})

			},
			resetForm() {
				this.$router.push({
					path: '/card/electroniccoupon',
					hash:'new'
				})
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
             	if(time.end_time== '' || time.start_time==''){
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
				start_time: '',
				end_time: '',
				id:time.id
			});
           },
           removeTimes(time,index,i){
           		this.weeks[index].times.splice(i, 1)
           },
           //券有效期单选按钮发生变化发生
           validityTypeChange(val){
           	  if(val=='1'){
           	  	this.form.validity_date =''
           	  }
           	  else{
           	  	this.form.validity_days =''
           	  }

           },
           //使用时段复选框发生变化时 触发
           timeCheckChange(event){
            let index = this.weeks.indexOf(this.weeks.filter(item=>item.id==event.target.value)[0])

            event.target.checked?this.weeks[index].model = '1':this.weeks[index].model = ''
           },
           handleCheckAllChange(event) {

				let arrays = [];
				this.chanels.forEach(item => {
					arrays.push(item.id);
				})
				this.form.chanels = event.target.checked ? arrays : [];

				this.isIndeterminate = false;
			},
			handleCheckedChanelsChange(value) {
				/*判断当前是否全部勾选*/
		    	let checkedCount = value.length;
				this.checkAll = checkedCount === this.chanels.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.chanels.length;
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
		    changeCouponsBgColor(index){
		    	this.isClicked = true;
				this.clickedindex = index;
		    },
		    //券提醒方式改变时触发
		    warnCheckChange(event){

		    	if(event.target.value=='0' && event.target.checked){
		    		this.form.warning = ['0']
		    	}
		       if(event.target.value!='0' && event.target.checked){
		    		if(this.form.warning.length!=0){
		    			let index = this.form.warning.indexOf('0')
		    			if(index != -1 ){
		    				this.form.warning.splice(index, 1)
		    			}
		    		}
		    	}
		    },

			//点击短信提醒时间增加按钮
			addWarnTimes(item,index){
				 let len = this.advance.length;
	             let checked = false
	             this.advance.map((time,i)=>{
	             	if(time.advance_day== '' || time.advance_time==''){
	             		checked =true
	             	}
	             })
	             if(checked){
	             	this.$message({
	           			type:'error',
	           			message:'请填写提醒天数和提醒时间点!'
	           		})
	           		return;
	             }
				this.advance.push({
					advance_day:'',
					advance_time:''
				})
			},
			//点击短信提醒时间移除按钮
			removeWarnTimes(item,index){
				if(index !== -1) {
					this.advance.splice(index, 1)
				}
			},

			 boxChange(nodes,total){
		      	this.nodes = nodes;
		      	this.total = total;
		      },
		      storeBoxChange(nodes,total){
		      	this.storeNodes = nodes;
		      	this.storeTotal = total;
		      },
		     //点击菜品弹层确定按钮触发
		    makeSureChecked(){
		    	this.nodes_dish = this.nodes;
		    	this.dialogVisible = false;
		    },
		    storeMakeSureChecked(){
		    	this.storeNodes_template = this.storeNodes;
		    	this.storeDialogVisible = false;
		    },
		    deleteDish(dish,index){
		    	this.nodes_dish.splice(index, 1);
		    },
		    deleteStore(store,index){
		    	this.storeNodes_template.splice(index, 1);
		    },
		    onlyNumber(event){
		    	return event.keyCode>=48&&event.keyCode<=57;
		    },
		    loadSysParames(){
		    	//加载渠道信息
		    	let chanels = 'type=0&code=chanel&y=1'
				getsysParamer(chanels).then(response=>{
					this.chanels = response;
					if(this.form.chanels.length > 0){
						this.$nextTick(function(){
							this.handleCheckedChanelsChange(this.form.chanels);
						})
					}
				});
				 //加载短信模板的信息
		    	findSmsTemplate().then((response) => {
					this.smsmessage = response;
				})
				//加载菜品树
				loadDishTree().then(response=>{
				    if(response.success){
				    	this.data = response.data[0].children;
				    }
				});
				//加载门店信息
				getMendian().then((response) => {
					this.storeData =  response.data;
				})
		    },
		    /* 编辑菜品券   form表单回显*/
		    getCouponDish(id,type){
		       /* 如果是查看的话  都是disabled */
		       if(type=='detail'){
		         	this.is_find = true;
		         	this.coupon_title = '查看菜品券'
		       }
		       else{
		       		this.is_find = false;
		         	this.coupon_title = '编辑菜品券'
		       }
		    	let data = 'id='+id;
		    	this.loadingBody = true;
		    	getCouponsDetails(data).then(response=>{
		    		if(response.success){
		    			/* 基础信息回显*/
						if(response.syn_status == '1') {
							this.flag = true;
						}
		    			this.form.id = id;
		    			this.form.class_name = response.class_name;
		    			this.form.help_memory_code = response.help_memory_code;
		    			this.form.face_value = response.face_value+'';
		    			this.form.is_total = response.is_total;
		    			this.form.validity_type = response.validity_type;
		    			this.form.can_give_friend = response.can_give_friend;
		    			if(response.validity_type == '1'){
		    				this.form.validity_days = response.validity_days;
		    				this.form.validity_date = '';
		    				this.form.start_coupon = '';
		    				this.form.end_coupon = '';
		    			}
		    			else{
		    				this.form.validity_days = '';
		    				this.form.validity_date = [Assist.formatDateAll(response.start_coupon,'yyyy-MM-dd'),Assist.formatDateAll(response.end_coupon,'yyyy-MM-dd')]
		    				this.form.start_coupon = response.start_coupon;
		    				this.form.end_coupon = response.end_coupon;
		    			}
		    			this.form.bill_limit_num = response.bill_limit_num+'';
		    			this.form.bill_limit_money = response.bill_limit_money+'';
		    			this.form.use_after_send = response.use_after_send;
		    			this.form.used_other = response.used_other;
		    			this.form.with_discount = response.with_discount;
		    			this.form.check_only = response.check_only;
		    			this.form.imageUrl = response.back_image1;
		    			this.form.remark = response.remark;
		    			/* 处理提醒方式数据*/
			    		if(response.alert_mode==0){
			    			this.form.warning = ['0'];
			    		}
			    		else if(response.alert_mode==1){
			    			this.form.warning = ['1'];
			    		}
			    		else if(response.alert_mode==2){
			    			this.form.warning = ['2'];
			    		}
			    		else{
			    			this.form.warning = ['1','2'];
			    		}

			    		/* 处理券的使用时段*/
			    		this.form.use_cycle = new Array();
			  	        response.usePeriod.map((item,index)=>{
		  	        		if(item.times){
			  	        		item.times.map(tt=>{
			  	        			(tt.end_time == '23:59') &&(tt.end_time='24:00')
			  	        		})
			  	        	}
			    			this.form.use_cycle.push(item.week+'');
			    			this.weeks.map(week=>{
			    				if(week.id == item.week+''){
			    					if(item.all_day=='0'){
			    						week.times = item.times;
			    					}
			    					week.model = item.all_day;

			    				}
		    			 	})

			    		});
			    		//门店勾选
		    			this.storeNodes = response.store_detail
						this.storeNodes_template = response.store_detail
						this.storeTotal = response.store_detail.length
						response.store_detail.map(item=>{
		    				this.storeCheckedIds.push(item.id)
		    			})

			    		/* 处理菜品数据*/
			    		this.nodes = response.details;
			    		this.nodes_dish = response.details;
			    		this.total = response.details.length;
			    		response.details.map(item=>{
			    			this.checkedIds.push(item.id)
			    		})
			    		/* 处理 券颜色*/
			    	    this.isClicked = true;
			    	    this.clickedindex= this.bglist.indexOf(this.bglist.filter(item=>item.id==response.wx_color)[0])
			    	    this.advance = response.advance;
			    	    this.advance.map(item=>{
			    	    	item.advance_time = new Date('2000/01/01 '+item.advance_time+':00');
			    	    })
			    	    /*处理渠道*/
			    		this.form.chanels = response.use_chanel.split(",");
			    		this.handleCheckedChanelsChange(this.form.chanels);
		    		}
		    		else{
		    			this.$message({
		    				type:'error',
		    				message:response.msg
		    			})
		    		}
		    		this.loadingBody = false;
		    	}).catch(e=>{
		    		this.loadingBody = false;
		    		this.$message({
	    				type:'error',
	    				message:'加载优惠券数据失败!'
	    			})
		    	})
		    }


		},
		mounted() {

		},

		created(){
			/* 加载系统参数*/
			this.loadSysParames();
			/* 设置图片服务地址 使用代理*/
			this.action = '../../../imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';
			/* 编辑 和 查看*/
		    if(this.$route.query.id!=undefined){
                this.getCouponDish(this.$route.query.id,this.$route.query.type);
			}




		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
 .avatar-uploader .el-upload {
 	background: #FBFEFF;
    border: 1px dashed #D8E5EC;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
 }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
   }
 .avatar-uploader-icon {
    color: #A5B0B7;
    width: 230px;
    height: 160px;
    text-align: center;
    i{
    	margin-top: 20px;
    	font-size:20px;
    }
    span{
    	font-size: 12px;
    	display: block;
    	height: 36px;
    	padding-left: 22px;
    	padding-right: 22px;
    	line-height: 18px;
    	&:nth-of-type(1){
			color: #243546;
		}

    }
  }
   .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.applistdish {
		height: auto;
		overflow: hidden;
		zoom: 1;
		background: #FEFEFE;
		.listtitledish {
			position: relative;
			height: 50px;
			margin: 0 20px 20px;
			line-height: 50px;
			border-bottom: 1px solid #EAF1F6;
			span {
				margin-left: 10px;
				font-size: 16px;
				color: #34495E;
			}
		}
		.memberupdatedish {
			.el-form {
				.el-form-item.required_message_hide.is-required .el-form-item__label:before {
				    content: '';
				}
				.el-form-item.no-required .el-form-item__label:before {
				    content: '';
				    margin-left: 10px;
				}
				.form-submit{
		    		margin-left: 30px;
			    }
			    .my-item{
			    	margin-bottom: 0 !important;
			    	.el-form-item__error{
			    		top:30px;
			    		left: 0 !important;
			    	}
			    }
			    .el-form-item{
		    	    margin-bottom: 20px;
                    .my-radio{
                    	height: 52px;
                    }
                    .my-radio2{
                    	height: 32px;
                    }
			    	.checkAll{
			    		float:left;
			    		margin-right: 6px;
			    	}
			    	.couponbg{
			    		.couponbgfe{
			    			background: #FEFEFE;
			    		}
			    		.couponbgfeclicked{
			    			background: #EAF1F6;
			    		}
			    		.couponbgfe,.couponbgfeclicked{
			    			display: inline-block;
			    			width: 36px;
			    			height: 36px;
			    			margin-left: 4px;
			    			.normalli{
							    list-style: none;
							    margin-left: 5px;
							    margin-top: 5px;
							    width: 26px;
							    height: 26px;
							    position: relative;
			    			}
			    			.clickedli{
			    				background: #EAF1F6;
							    list-style: none;
							    margin-left: 5px;
							    margin-top: 5px;
							    width: 26px;
							    height: 26px;
							    position: relative;
							     &:after{
							     	box-sizing: inherit!important;
							    	content: "";
									width: 26px;
									height: 0;
									position: absolute;
									bottom: 0;
									left: 0;
									border-top: 8px solid ;
									border-top-color: inherit;
									border-right: 8px solid #FEFEFE;
							    }
			    			}
			    		}
			    	}
			    	.showtimemessage{
			    		.smsmessage{
				    		background: #F5F9FB;
							border-radius: 3px;
							height: auto;
							padding-top: 14px;
							padding-bottom: 14px;
							padding-left: 30px;
							line-height: 22px;
				    	}
				    	.warningtime{
				    		background: #F5F9FB;
							border-radius: 3px;
							height: auto;
							padding:8px 0 8px 100px;
							.everywarningtime{
								height:40px;
								padding-top: 6px;
								position:relative;
								.imgbody {
									position: absolute;
									left:310px;
								    top:11px;
									img {
										width: 22px;
										height: 22px;
									}
								}
							}
				    	}
			    	}
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
				.el-form-item__error {
					left: 40px !important;
				}
				.form_hr{
					margin-left:30px;
					margin-right: 30px;
					/*width:90%;*/
					height:1px;
					border:none;
					border-top:1px dashed #EAF1F6;
					margin-bottom: 15px;
					&:nth-of-type(3){
						margin-bottom: 20px;
					}
				}
			}
		}
		.el-dialog__wrapper{
			.el-dialog{
				.el-dialog__header{
					height: 0 !important;
				}
			}
		}
	}
</style>
