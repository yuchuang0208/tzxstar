<template>
	<div class="context">
		<div class="cardruleset">
		<div class="divTwo_aqsz">
			<el-tabs v-model="activeName">
				<el-tab-pane label="积分设置" name="first" class="piont_zr">
					<el-form  class="demo-ruleForm" :rules="rules" ref="form" :model="pointForm">
						<el-form-item label="积分清零规则:">
							<el-radio-group v-model='zero_type' @change="selectRadio">
							    <el-radio label='forever'>
							    	<span>永久有效不清零</span> 
							    </el-radio>
							    <el-radio label='regular'>
							    	<span>定期清零</span>
							    	<cite>下一年</cite>
							    	<el-select v-model.number="clearrule_month" placeholder="请选择"  @change='selectWeekMonth'>
									    <el-option 
									      	v-for="item in monthList"
									      	:key="item.value"
									      	:label="item.label"
									      	:value="item.value">
									    </el-option>
									</el-select>
									<el-select v-model.number="clearrule_day" placeholder="请选择">
									    <el-option 
									      	v-for="item2 in days_options"
									      	:key="item2.value"
									      	:label="item2.label"
									      	:value="item2.value">
									    </el-option>
									</el-select>
									<strong style="font-size:12px">全部清零</strong>
							    </el-radio>
							    <el-radio label='rolling'>
							    	<span>滚动清零</span>
							    	<cite>每</cite>
							    	<el-input placeholder="请输入天数" v-model="credit_days" class="right" type='number' min="1">
									    <template slot="append">天</template>
									</el-input>
							    	<strong style="font-size:12px">清零一次</strong>
							    	<em>(会员每一笔增加的积分，多少天后自动清零)</em>
							    </el-radio>
							</el-radio-group>
						</el-form-item>
						
						<el-form-item label="积分增加规则:">
							<el-form-item label="赠送金额可积分：">
								<el-tooltip class="item" effect="dark" content="例如：会员消费￥200，活动赠送￥60，如果选择“不可以”那么只计算￥200的积分，如果选择“可以”则计算￥260的积分。" placement="top-start">
							    	<icon-svg icon-class='question'></icon-svg>
							    </el-tooltip>
								<el-radio-group v-model="reward_allow_credit">
								    <el-radio :label="0" disabled >不可以</el-radio>
								    <el-radio :label="1" disabled >可以</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-form-item>
						
						<el-form-item label="积分清零提醒:" prop="alert_mode">
							<el-checkbox-group v-model='pointForm.alert_mode' @change="remindedChange">
							    <el-checkbox label='0'><span>不提醒</span></el-checkbox>
							    <el-checkbox label='1'><span>微信提醒</span><em>(按照微信公众号标准模板配置)</em></el-checkbox>
							    <el-checkbox label='2'><span>短信提醒</span></el-checkbox>
							</el-checkbox-group >
						</el-form-item>
						
						<!-- 短信模板开始-->
						<el-form-item  label="" >
							<div class="hdtx_dxtx" v-if="pointForm.alert_mode.toString().indexOf('1') != -1 || pointForm.alert_mode.toString().indexOf('2') != -1" >
								<div class="dxmb_text">
									<cite v-model="message.info_content">{{message.info_content}}</cite>
								</div>
							</div>
					    </el-form-item>
					    <!-- 短信模板结束-->
						
						<el-form-item label="提醒时间:" required>
							<el-form-item label="距离积分清零前:" prop="days">
								<el-input placeholder="请输入天数" v-model='pointForm.days' type="number" min="0">
									<template slot="append">天</template>
								</el-input>
							</el-form-item>
							<el-form-item label="" prop="times">
								<el-time-picker  v-model='pointForm.times'
								    :picker-options="{
								      format:'HH:mm'
								    }"
								    placeholder="请选择时分" value-format="HH:mm" format="HH:mm" >
								</el-time-picker>
								<em style="font-size:14px">提醒</em>
								<span>（设置0天代表清零日当天提醒）</span>
							</el-form-item>
						</el-form-item>
						
						<el-form-item label="">
							<el-form-item label="">
									<el-button @click="submitForm('form')" size='large' type="primary">保存</el-button>
						    </el-form-item>
						</el-form-item>
					</el-form>
				    <!--表单结束-->
					
			    </el-tab-pane>
				<el-tab-pane label="支付方式积分设置" name="second" class="zffs">
					<div class="explain">
						<p>可在当前页设置消费使用支付方式时，是否可获得积分；</p>
					</div>
					<el-table v-loading="loading" element-loading-text="给我一点时间" :data="tableData" max-height='500px' style="width:100%" @filter-change="filterChange">
							<el-table-column prop="id" label="编号" min-width="100"></el-table-column>
							<el-table-column prop="payment_name1" label="支付方式名称" min-width="100"></el-table-column>
							<el-table-column prop="if_jifen" label="是否积分" min-width="100"></el-table-column>
							<el-table-column prop="status" :formatter="isNotNullFormat" column-key="status" :filters="filterStatus" label="状态" min-width="100">
								<template scope="scope">
									<tzx-tag :color="scope.row.status | statusFilter">{{scope.row.status | valueFilter}}</tzx-tag>
								</template>
							</el-table-column>
							<el-table-column prop="last_operator" label="最后修改人" min-width="80"></el-table-column>
							<el-table-column prop="last_updatetime" label="最后修改时间" min-width="100"></el-table-column>
							<el-table-column label="编辑" min-width="100">
								<template scope="scope">
									<el-button @click="btn_jfzffssz(scope.$index, tableData)" type="primary" size="small">积分设置</el-button>
								</template>
    						</el-table-column>
					</el-table>
					<el-dialog title="支付方式积分设置" :visible.sync="dialogVisible_zffsjfsz" width="50%" :before-close="handleClose" center="true" class="dialog">
						<p>会员使用【<span>{{payName}}</span>】消费时，是否获得积分：</p>
						<el-radio v-model="radio_jfsz" label="1">是</el-radio>
  						<el-radio v-model="radio_jfsz" label="0">否</el-radio>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible_zffsjfsz = false">取 消</el-button>
							<el-button type="primary" @click="btn_integralSetting(id)">保 存</el-button>
						</span>
					</el-dialog>
					<div class="pagination-container">
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="currentPage"
								:page-sizes="[10, 20, 30, 40]"
								:page-size="pageSize"
								layout="total, sizes, prev, pager, next, jumper"
								:total="totalCount">
    						</el-pagination>
						</div>
				</el-tab-pane>
				<el-tab-pane label="积分账单规则" name="third" class="jfgz">
					<div class="explain">
						<p>当会员订单已经使用优惠支付（如：储蓄支付、积分抵现、优惠券付款）时，可设置订单剩余金额是否可获得积分</p>
						<span>如设置订单优惠券付款剩余金额不可积分：若会员订单金额100元，优惠券付款20元，剩余80元不论用何种支付方式，此订单都不会增加积分给当前会员。</span>
					</div>
					<el-table v-loading="loading" element-loading-text="给我一点时间" :data="tableData" max-height='500px' style="width:100%" @filter-change="filterChange">
							<el-table-column prop="id" label="编号" min-width="100"></el-table-column>
							<el-table-column prop="payment_name1" label="支付方式名称" min-width="100"></el-table-column>
							<el-table-column prop="if_left_money_credit" label="订单剩余金额是否积分" min-width="100"></el-table-column>
							<el-table-column prop="status" :formatter="isNotNullFormat" column-key="status" :filters="filterStatus" label="状态" min-width="100">
								<template scope="scope">
									<tzx-tag :color="scope.row.status | statusFilter">{{scope.row.status | valueFilter}}</tzx-tag>
								</template>
							</el-table-column>
							<el-table-column prop="last_operator" label="最后修改人" min-width="80"></el-table-column>
							<el-table-column prop="last_updatetime" label="最后修改时间" min-width="100"></el-table-column>
							<el-table-column label="编辑" min-width="100">
								<template scope="scope">
									<el-button @click="btn_jfzdsz(scope.$index, tableData)" type="primary" size="small">积分账单设置</el-button>
							 </template> 
    						</el-table-column>
					</el-table>
					<el-dialog title="积分账单设置" :visible.sync="dialogVisible_jfzdsz" width="50%" :before-close="handleClose" center="true" class="dialog">
						<p>会员使用【<span>{{payName}}</span>】消费时，订单剩余金额是否获得积分：</p>
						<el-radio v-model="radio_jfzdsz" label="1">是</el-radio>
  						<el-radio v-model="radio_jfzdsz" label="0">否</el-radio>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible_jfzdsz = false">取 消</el-button>
							<el-button type="primary" @click="btn_integralBillSetting(id)">保 存</el-button>
						</span>
					</el-dialog>
					<div class="pagination-container">
						<el-pagination
      						@size-change="handleSizeChange1"
     						@current-change="handleCurrentChange1"
      						:current-page="currentPage1"
      						:page-sizes="[10, 20, 30, 40]"
      						:page-size="pageSize"
      						layout="total, sizes, prev, pager, next, jumper"
      						:total="totalCount">
    					</el-pagination>
					</div>
				</el-tab-pane>
			
			</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import Assist from '@/utils/assist';
	import { TzxTag,TzxOption} from '@/components/tag'
	import { getCardRuleList,updateIfJifen,updateIfLeftMoneyCredit } from '@/api/activity'
	import {findPointSmsTemplate,savePoint,fintPoint} from '@/api/ruleCenter'
	import axios from "axios";
	export default {
		components: {
			TzxTag
		},
		data() {
			return {
				id:'',
				activeName: 'first',
				dialogVisible_zffsjfsz: false,
				dialogVisible_jfzdsz: false,
				radio_jfsz: '',
				radio_jfzdsz: '',
				currentPage: 1,	//当前页码
				pageSize: 20,     //每页默认数据量
				totalCount: 100,  		//默认总数据量
				currentPage1: 1,	//当前页码
				status: '',
				payName: '',
				filterStatus: [
					{//审核状态过滤
						text: '无效',
						value: '0'
					}, {
						text: '有效',
						value: '1'
					},
					{
						text: '全部',
						value: ''
					}
				],
				tableData: [],
				loading: false,
				loading1:false,
				
				message: {
					"template_id": 0,
					"info_content": ""
				}, //选中的信息模板的id
				multipleSelection: [], //短信模板复选
				messageList: [], //短信模板列表
	      	
				zero_type:'forever',//0,永久有效不清零，1，定期清零，2，滚动清零
				clearrule_month:'',//月份 只有为定期类型 才有值，否则为0
				clearrule_day:'',//日子 只有为定期类型 才有值，否则为0
				credit_days:'',//天数 只有为滚动清零 才有值，否则为0
				
				reward_allow_credit:1 ,//赠送金额可积分  0不可以，1，可以
				/*discountmoneypoint:1 ,//折扣金额可积分  0不可以，1，可以
				paymentpoint:['1','2','3'], //可积分付款方式  0不可以，1，可以
				*/
				
		      	month:'',
			    monthList:[],
		        days_options: [],//1-31号
	      	
		        pointForm: {
					alert_mode:['0'],//0 不提醒，1，微信，2，短信  3,微信+短信
					days:'',//距离积分清零前天数
					times: "",//提醒时间
		        },
		        rules: {
		        	alert_mode: [
			            { required: true,type: 'array',message:'请选择积分清零提醒', trigger:'change'}
			        ],
			        days:[
				        { required: true,message:'请输入天数',trigger:'change' }
			        ],
			        times:[
				        { type:'date',required:true,message:'请输入时间',trigger:'change' }
			        ]
		        },
			}

		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					'0': '#FFBF00',
					'1': '#4ECF88',
					// '2': '#FF9001'
				}
				return statusMap[status]
			},
			valueFilter(value) {
				const statusMap = {
					'无效': '无效',
					'有效': '有效',
					'': '全部'
				}
				return statusMap[value]
			},
			typeFilter(type) {
				return calendarTypeKeyValue[type]
			}
		},
		methods: {
			submitForm(form){
				this.$refs[form].validate((valid) => {
					if (valid) {
						let zero_cycle='';
					    if(this.zero_type == 'forever'){//永久有效不清零
				        }else if(this.zero_type == 'regular'){//定期清零
				       		zero_cycle='2';
				        }else if(this.zero_type == 'rolling'){//滚动清零
				        }
			            let alert_mode_temp = 0
						if(this.pointForm.alert_mode.length==2){
							alert_mode_temp = 3;
						}else if(this.pointForm.alert_mode.length==1){
							if(this.pointForm.alert_mode[0] == '0'){
								alert_mode_temp = 0;
							}else if(this.pointForm.alert_mode[0] == '1'){
								alert_mode_temp = 1;
							}
							else if(this.pointForm.alert_mode[0] == '2'){
								alert_mode_temp = 2;
							}
						}
						let times_temp  = Assist.formatDateAll(this.pointForm.times,'HH:mm')
		    		   
		    		    let data = "id="+
									"&zero_type="+this.zero_type+
								    "&clearrule_month="+this.clearrule_month+
									"&clearrule_day="+this.clearrule_day+
									"&credit_days="+this.credit_days+
									"&reward_allow_credit="+this.reward_allow_credit+
									"&alert_mode="+alert_mode_temp+
									"&zero_cycle="+zero_cycle+
									"&days="+this.pointForm.days+
									"&times="+times_temp;
									
						this.loading1 = true;            
					    savePoint(data).then((response) => {
					    	this.loading1 = false;
							if(response.success){
								this.$message({
									type: 'success',
									message: '保存成功'
								});
							}else{
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
    		selectRadio(value){
    			if(value == 'forever'){//永久有效不清零
		       		this.clearrule_month = '';
		       		this.clearrule_day = '';
		       		this.credit_days = '';
		        }else if(value == 'regular'){//定期清零
		       		this.credit_days = '';
		        }else if(value == 'rolling'){//滚动清零
		       		this.clearrule_month = '';
		       		this.clearrule_day = '';
		        }
    		},
    		loadSmsTemplate() {
				findPointSmsTemplate().then((response) => {
					this.message = response;
				})
			},
			formatData(){
				//初始化月份
			    let arrays = [1,2,3,4,5,6,7,8,9,10,11,12];
			    arrays.forEach(item => {
			    	this.monthList.push({
			    		value:item,
			      	    label:item+"月"
			    	})
			    });
			},
			remindedChange(value){//提醒方式
	    		let arrays = value;
	    		let length = 0;
	    		if(arrays!=null){//判断第二个 复选框是
	    			length = arrays.length;
	    			if(length>1){//有多个，第一个是不提醒 ，移除提醒
	    				if(arrays[0]==0){//第一个为不提醒
	    					arrays.splice(0,1);
	    				}
	    				if(arrays[length-1]==0){
	    					arrays.splice(0,length-1);
	    				}
	    			}
	    			//console.log(value)
	    		}else{
	    			this.pointForm.alert_mode =[];
	    		}
	    		
	    	},
	    	selectWeekMonth() {//周/月切换
	    		//this.clearrule_day = "";
	    		let nextYear = new Date().getFullYear()+1;
	    		/*let nextYear = 2000;*/
	    		let days_temp = new Date(nextYear,this.clearrule_month,0).getDate();//根据年会返回当前的天数
	    		//console.log(this.clearrule_month+"===="+days_temp);
	    		let arrays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
	    		if(days_temp == 29){
	    			arrays.push(29);
	    		}else if(days_temp == 30){
	    			arrays.push(29);
	    			arrays.push(30);
	    		}else if(days_temp == 31){
	    			arrays.push(29);
	    			arrays.push(30);
	    			arrays.push(31);
	    		}
	    		this.days_options = [];
	    		arrays.forEach(item => {
			    	this.days_options.push({
			    		value:item,
			      	    label:item+"号"
			    	})
			    });
			},
		
			loadData(currentPage,pageSize) {					//页面加载
				this.loading = true;
				let data = 'page='+ currentPage + '&rows=' + pageSize + '&status='+ this.status;
				getCardRuleList(data).then(response => {
						// console.log(response);						
						for(var i = 0;i<response.rows.length;i++) {
							if(response.rows[i].if_jifen == 1) {
								response.rows[i].if_jifen = '是';
							}else {
								response.rows[i].if_jifen = '否';
							}
							if(response.rows[i].if_left_money_credit == 1) {
								response.rows[i].if_left_money_credit = '是';
							}else {
								response.rows[i].if_left_money_credit = '否';
							}
							if(response.rows[i].status == 1) {
								response.rows[i].status = '有效';
							}else {
								response.rows[i].status = '无效';
							}
						}
						this.tableData = response.rows;
						this.totalCount = response.total;						
						this.loading = false;
					})
			},
			isNotNullFormat(row, column) {
				let value = row[column.property];
				if(value == "" || value == null || value == undefined) {
					return '--'
				}
				return value;
			},
			filterChange(filters) {  							/* 筛选条件发生变化触发*/				
				let key = Object.keys(filters)[0];
				let value = filters[key];			
				let types = value.join(",");
				if(key == 'status'){      //判断是状态选择
					this.status = types;
					// console.log(this.status);
				}
				this.loadData(this.currentPage,this.pageSize);
			},


			handleSizeChange(val) {						//1每页显示数据变更
        		this.pageSize = val;
                this.loadData(this.currentPage, this.pageSize);
				// console.log('每页数量为：' + this.pageSize+'----------当前页码为：'+this.currentPage);
      		},
      		handleCurrentChange(val) {					//1页码变更
        		this.currentPage = val;
                this.loadData(this.currentPage, this.pageSize);
				// console.log('当前页码为：'+ this.currentPage);
			},
			btn_jfzffssz(index){                                //1弹框
				this.dialogVisible_zffsjfsz = true;
				//获取当前对应的id
				this.id = this.tableData[index].id;
				//获取当前对应的支付方式名称
				this.payName = this.tableData[index].payment_name1;
				//获取当前id对应的value值
				this.radio_jfsz = this.tableData[index].if_jifen;

				// console.log('val---------',this.payName,this.id);
			},
			btn_integralSetting(id) {							//1积分设置保存按钮点击事件
				let data = 'id='+id+'&if_jifen='+parseInt(this.radio_jfsz);
				//发送请求
				updateIfJifen(data)
				.then(response=>{
					this.loadData(this.currentPage,this.pageSize);
				})
				.catch(function (err) { 
				})
				//关闭弹窗
				this.dialogVisible_zffsjfsz = false;
				// console.log(this.radio_jfsz);
			},


			handleSizeChange1(val) {						//2每页显示数据变更
        		this.pageSize = val;
                this.loadData(this.currentPage1, this.pageSize);
				// console.log('每页数量为：' + this.pageSize+'----------当前页码为：'+this.currentPage1);
      		},
      		handleCurrentChange1(val) {					//2页码变更
        		this.currentPage1 = val;
				this.loadData(this.currentPage1, this.pageSize);
				// console.log('当前页码为：'+ this.currentPage1);
			},
			btn_jfzdsz(index){									//2弹框
				this.dialogVisible_jfzdsz = true;
				//获取当前对应的id
				this.id = this.tableData[index].id;
				//获取当前对应的支付方式名称
				this.payName = this.tableData[index].payment_name1;
				//获取当前id对应的value值
				this.radio_jfzdsz = this.tableData[index].if_left_money_credit;
				// console.log('val---------',this.payName,this.id);
			},
			btn_integralBillSetting(id) {						//2积分账单设置保存按钮点击事件
				let data = 'id='+id+'&if_left_money_credit='+parseInt(this.radio_jfzdsz);
				//此处应有发送ajax请求，更新数据-----待完成
				updateIfLeftMoneyCredit(data)
				.then(response=>{
					this.loadData(this.currentPage1,this.pageSize);
				})
				.catch(function (err) { 
				})
				this.dialogVisible_jfzdsz = false;				//关闭弹窗
				// console.log(this.radio_jfzdsz);
				
			},
			handleClose(done) {								//二级关闭弹窗
				done();
			 }
			,findInfo(){
				fintPoint().then(response => {
					let detail = response;
					if(detail.id !=null){//相应成功
						
				       this.zero_type = detail.zero_type;
				       if(detail.zero_type == 'forever'){//永久有效不清零
				       		this.clearrule_month = '';
				       		this.clearrule_day = '';
				       		this.credit_days = '';
				       }else if(detail.zero_type == 'regular'){//定期清零
				       		this.credit_days = '';
				       		this.clearrule_month = detail.clearrule_month;
				      		this.clearrule_day = detail.clearrule_day;
				      		//this.clearrule_month = 4;
				      		//this.clearrule_day = 5;
				       }else if(detail.zero_type == 'rolling'){//滚动清零
				       		this.clearrule_month = '';
				       		this.clearrule_day = '';
				       		this.credit_days = detail.credit_days;
				       }
				       
				       //this.reward_allow_credit = detail.reward_allow_credit;
				       
				       if(detail.alert_mode == 3){
				       	 	this.pointForm.alert_mode =['1','2']
				       }else if(detail.alert_mode == 0){
				       		this.pointForm.alert_mode =['0']
				       }
				       else if(detail.alert_mode == 1){
				       		this.pointForm.alert_mode =['1']
				       }
				       else if(detail.alert_mode == 2){
				       		this.pointForm.alert_mode =['2']
				       }
				      /*  this.pointForm.alert_mode = detail.alert_mode;*/
				       this.pointForm.days = detail.days;
				       this.pointForm.times = new Date('2000/01/01 '+detail.times+':00');
					}
				})
			}
		},
		created() {
			_czc.push(["_trackEvent", "营销活动-积分设置", "新增编辑"]);//埋点统计
			//初始化定期清零的月份和日期
			this.formatData();
			this.loadSmsTemplate();
			this.findInfo();
			this.loadData(this.currentPage,this.pageSize); 
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
.cardruleset{
	.divTwo_aqsz {
		height: auto;
		min-height: 800px;
		background: #FFFFFF;
		.el-tabs__nav-scroll {
			margin-left: 20px;
			margin-right: 20px;
	        border-bottom: 1px solid #EAF1F6;
			height: 45px;
			line-height: 45px;
		}
		.el-tabs__item {
			font-size: 16px !important;
			margin-bottom: 8px!important;
			padding: 0px 10px!important;
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
			/*padding-top: 20px!important;*/
		}
		.zffs {
			margin:0 20px;
			.explain {
				width: 100%;
				height: 40px;
				p {
					margin-top: 8px;
					color: #A3A3A3;
				}
			}
		}
		.jfgz {
			margin:0 20px;
			.explain {
				width: 100%;
				height: 40px;
				p {
					margin-top: 8px;
					color: #A3A3A3;
				}
				span {
					font-weight: 700;
				}
			}
		}
		
		.dialog {
			text-align: center;
			width: 1000px;
			margin: 0 auto;
			p {
				text-align: center;
				margin-bottom: 10px;
				margin-top: 5px;
			}
		}
	}
	.piont_zr{
		height: auto;
		background: #FFFFFF;
		h1{
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
		}
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
		.el-form {
			.el-form-item{
				display: inherit;
				margin-bottom: 20px; 
				.el-input__inner{
					height:28px;
				}
				.el-form-item__label{
					/*margin-left:30px;*/
					width:98px;
					padding:0px;
				}
				.el-form-item__content{
					line-height: 14px;
					display:inline-table;
					.el-radio-group{
						.el-radio{
							display:table;
							margin-left:28px;
							font-size:14px;
							.el-input{
								width:142px;
							}
						}
						.el-radio:nth-child(2){
							.el-input,strong{
								margin-left:10px;
							}
						}
						.el-radio:nth-child(3){
							.el-input,strong{
								margin-left:10px;
							}
							cite{
								margin-left:40px;
							}
							em{
								color: #9AABB8;
								font-size: 14px;
							}
							.el-input__inner{
								text-align: right;	
							}
							
						}
					}
					.el-form-item{
						.el-form-item__label{
							width:132px;
							padding:0px;
						}
						.el-form-item__content{
						 	.el-radio-group{
						 		display:-webkit-inline-box;
								.el-radio{
									display:table;
									margin-left:28px;
								}
							}
							svg{
								cursor: pointer;
							}
							.el-checkbox-group{
								display: -webkit-inline-box;
							}
						}
					}
					.el-form-item:nth-child(4){
						margin-bottom:0px;
						background: #ffffff;
						overflow: hidden;
						margin-right: 0px;
						margin-left:0px;
					}
				}
			}
			.el-form-item:nth-child(1){
				margin-top:20px;
				.el-form-item__content{
					.el-radio-group{
						.el-radio{
							margin-bottom:20px;
						}
						.el-radio:nth-child(2){
							cite{
								color: #34495E;
							}
						}
						.el-radio:nth-child(3){
							margin-bottom:0px;
							cite{
								color: #34495E;
							}
						}
						.el-select{
							.el-input{
								width:80px;
							}
						}
					}
				}
			}
			.el-form-item:nth-child(2){
				.el-form-item__content{
					.el-form-item{
						margin-top:0px;
						.el-form-item__label{
							margin-left: 28px;
						}
						.el-form-item__content{
							.el-radio-group{
								.el-radio{
									margin-left: 22px;
								}
								.el-radio:nth-child(2){
									margin-left: 30px;
								}
							}
						}
					}
					.el-form-item:nth-child(1){
						margin-top:0px;
						.el-form-item__content{
							.el-radio-group{
								.el-radio{
									margin-bottom:0px;
								}
							}
						}
					}
					.el-form-item:nth-child(3){
						margin-bottom:0px;
						.el-form-item__content{
							.el-checkbox-group{
								margin-bottom:0px;
								.el-checkbox{
									margin-bottom:0px;
								}
							}
						}
					}
					.el-form-item:nth-child(4){
						.el-form-item__content{
							margin-left:0px;
							.el-checkbox-group{
								margin-left:28px;
							}
						}
					}
				}
			}
			.el-form-item:nth-child(3){
				.el-form-item__content{
					.el-checkbox-group{
						display: inline-grid;
						.el-checkbox{
						    margin-left:28px;
						    margin-bottom: 20px;
						    em{
						    	font-size: 14px;
								color: #9AABB8;
						    }
						}
						.el-checkbox:nth-child(3){
						    margin-bottom: 0px;
						}
					}
					.el-form-item__error{
						margin-left: 26px;
					}
				}
			}
			.el-form-item:nth-child(4){
				margin-bottom:0px;
				overflow: hidden;
				margin-right: 40px;
				margin-left: 40px;
				.el-form-item__content{
					/*margin-left:18px;*/
					display: inline;
				}
				
			}
			.el-form-item:nth-child(5){
				.el-form-item__label{
					margin-top:27px;
				}
				.el-form-item__content{
					.el-input {
						width: 132px;
	    				margin-right: 10px;
	    				.el-input__inner:nth-child(1){
							text-align: right;	
						}
					}
					.el-date-editor{
						width:120px;
					}
					.el-form-item{
						.el-form-item__label{
							margin-left:28px;
							margin-top:7px;
						}
					}
				}
				margin-bottom:0px;
				em + span{
					color:#9AABB8;
				}
			}
			.el-form-item:nth-child(6){
				margin-left:40px;
				margin-right:40px;
				height:92px;
				line-height: 92px;
				border-top:1px dashed #EAF1F6;
				
				.el-form-item__content{
					.el-form-item{
						margin-left:126px;
						margin-top: 30px;
						.el-form-item__content{
							.el-button{
								
							}
						}
					}
				}
			}
			.right{
				text-align: right;
			}
			.hdtx_dxtx{
				background: #F5F9FB;
			    border-radius: 3px;
			    /*margin-right: 40px;*/
			    overflow: hidden;
			    /* margin-left: 72px;*/
			    strong{
					display:block;
					float:left;
					/*padding-left:92px;*/
					color: #576D7A;
					padding-top: 20px;
				}
				.dxmb_text{
					width:599px;
					float:left;
					margin-left:108px;
					cite{
						display: block;	
					    color: #3B4A59;
					    height: 50px;
    					line-height: 50px
					}
					em{
						clear: both;	
						color: #0C9AFF;
					}
				}
			}
		}
	}

}
</style>