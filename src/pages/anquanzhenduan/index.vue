<template>
	<div class='safity'>
		<el-dialog  :show-close=false size='tiny' :visible.sync="dialogVisible" custom-class='treeSelect' title="">
	   		 <tzx-tree-select
			   	:data="storeData"
			   	:isDisabled=true
			   	type = "ren"
			   	:ptotalSelect = 'storeTotal'
			   	unitAndName='个人'
			   	@cancelButton='dialogVisible = false'
			   	@makeSureButton ='storeMakeSureChecked'
			   	@boxChange = 'storeBoxChange'
			   	:defaultCheckedId = 'storeCheckedIds'
			   	:pnodes= 'storeNodes'
			   	>
	  		</tzx-tree-select>
		</el-dialog>		
		<el-dialog  :show-close=false size='tiny' :visible.sync="dialogVisible1" custom-class='treeSelect' title="">
	   		 <tzx-tree-select
			   	:data="storeData1"
			   	:isDisabled=true
			   	type = "ren"
			   	:ptotalSelect = 'storeTotal1'
			   	unitAndName='个人'
			   	@cancelButton='dialogVisible1 = false'
			   	@makeSureButton ='storeMakeSureChecked1'
			   	@boxChange = 'storeBoxChange1'
			   	:defaultCheckedId = 'storeCheckedIds1'
			   	:pnodes= 'storeNodes1'
			   	>
	  		</tzx-tree-select>
		</el-dialog>		
		<el-dialog  :show-close=false size='tiny' :visible.sync="dialogVisible2" custom-class='treeSelect'  title="">
	   		 <tzx-tree-select
			   	:data="storeData2"
			   	:isDisabled=true
			   	type = "ren"
			   	:ptotalSelect = 'storeTotal2'
			   	unitAndName='个人'
			   	@cancelButton='dialogVisible2 = false'
			   	@makeSureButton ='storeMakeSureChecked2'
			   	@boxChange = 'storeBoxChange2'
			   	:defaultCheckedId = 'storeCheckedIds2'
			   	:pnodes= 'storeNodes2'
			   	>
	  		</tzx-tree-select>
		</el-dialog>	
		<el-tabs v-model="activeName" @tab-click="handleClick">

			<el-tab-pane label="360°安全诊断" name="first" >
				<div class='safity_title'> 					
					<div class='circle_doctor' v-if='!circle_loading'>
						诊断中
						<div  class='loading-center'>
							<div class='circle circle1'> </div>
							<div class='circle circle2'> </div>
							<div class='circle circle3'> </div>
						</div>
					</div>
					<div class='circle_doctor1' v-if='circle_loading' @click='startAnalysis'>开始诊断</div>						
				</div>
				<div class='safity_circle'>
					<li> 					
						<tzx-circle :score='score'></tzx-circle>
						<div class='safity_circle_message'><span>基本配置诊断</span></div>
						<div class='circle-text' ref='circle1'>	
							
						    <div class='circle-left' >
						    	<li v-for='(item,index) in basicWarn.basicList'>{{item.warn_text}}</li>
						    					  
						    </div>
						    <div class='circle-right' >
						    	<li v-for='(item,index) in basicWarn.basicList'><span :class='item.warn_status=="正常"?"normal":"exception"'>{{item.warn_status}}</span> </li>
						    	
						    </div>						
						</div>						
					</li>
					<li> 
						<tzx-circle :score='score2'></tzx-circle>
						<div class='safity_circle_message'><span>消费信息诊断</span></div>
						<div class='circle-text' ref='circle2'>	
						
						    <div class='circle-left' >
						    	<li v-for='(item,index) in consumeWarn.consumeList'>{{item.warn_text}}</li>
				  
						    </div>
						    <div class='circle-right' >
						    	<li v-for='(item,index) in consumeWarn.consumeList'> <span :class='item.warn_status=="正常"?"normal":"exception"'>{{item.warn_status}}</span></li>
			    	
						    </div>						
						</div>
					</li>
					<li> 
						<tzx-circle :score='score4'></tzx-circle>
						<div class='safity_circle_message'><span>操作信息诊断</span></div>
						<div class='circle-text' ref='circle3'>	
						    <div class='circle-left' >
						    	<li v-for='(item,index) in operateWarn.operateList'>{{item.warn_text}}</li>						    
						    </div>
						    <div class='circle-right' >
						    	<li  v-for='(item,index) in operateWarn.operateList' ><span :class='item.warn_status=="正常"?"normal":"exception"'>{{item.warn_status}}</span></li>						    		    					    	
						    </div>						
						</div>
					</li>
				</div>
				<div class='circle-show' @click='clickShow(circle_loading)'>
					<div class='circle-line' ></div>
					<div class='circle-button'>					
							<div v-if='!circle_loading' class='loading-center'>
								<div class='circle circle1'> </div>
								<div class='circle circle2'> </div>
								<div class='circle circle3'> </div>
							</div>						
						<span   v-if='circle_loading' style='width:100px;margin: 0 auto;'>{{showText}}</span>
						<i v-if='circle_loading' :class="!show?'el-icon-caret-bottom':'el-icon-caret-top'"></i>
					</div>					
				 	<div class='circle-line' ></div>
				</div>					
			</el-tab-pane>	
			<el-tab-pane label="诊断规则设置" name="second" >
				<div class='circle-form'>
					<el-form v-loading.body = 'loadingform' :model="form"  ref="form" label-width="120px" >						
						<el-form-item label="基本配置诊断" prop="trade_sms_remained_count" :rules="form.trade_sms_remained_count_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">							
							<div class='circle-form-item'>
								<el-checkbox v-model="form.trade_sms_remained_count_checked">交易短信剩余条数</el-checkbox>
								<span>≤&nbsp;&nbsp;&nbsp;</span>
								<el-input size='small' :disabled='!form.trade_sms_remained_count_checked'  v-model="form.trade_sms_remained_count"  style="width:120px;" >
									<template slot="append">条</template>
								</el-input>
							</div>	
						</el-form-item>
						<el-form-item label="" prop="marketing_sms_remained_count" :rules="form.marketing_sms_remained_count_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">							
							<div class='circle-form-item'>
								<el-checkbox v-model="form.marketing_sms_remained_count_checked">营销短信剩余条数</el-checkbox>
								<span>≤&nbsp;&nbsp;&nbsp;</span>
								<el-input size='small' :disabled='!form.marketing_sms_remained_count_checked'  v-model="form.marketing_sms_remained_count"  style="width:120px;" >
									<template slot="append">条</template>
								</el-input>
							</div>	
						</el-form-item>	
						<el-form-item label='' prop="member_level" >
							<div style='margin-left: 40px;'>
								<el-checkbox v-model="form.member_level">会员等级</el-checkbox>
								<el-tooltip class="item" effect="dark" content="诊断会员等级是否配置" placement="top-start">
							    	<icon-svg icon-class='question'></icon-svg>
						        </el-tooltip>
							</div>							 
						</el-form-item>
						<el-form-item label='' prop="warning" :rules='filter_rules({type:"array"})'>
							<div style='margin-left: 40px;'>
								<span> 提醒方式:</span>
								<el-checkbox-group  v-model="form.warning">
									<div class='checkboxdiv' v-for='(warn,index) in warning'>
										<el-checkbox  @change='warnCheckChange'  :label="warn.id" :key="index" >
											{{warn.text}}
									   </el-checkbox>
									</div>
								</el-checkbox-group>
							</div>							
							<div style='margin-left: 40px;'  v-if='form.warning.indexOf("1")!= -1'>
								<div class='showDishMessage' v-for='(store,index) in storeNodes_template'>
									<tzx-tag  :closable=true cursor='default' color='#34495E' size='medium'   @closeThis='deleteStore(store,index)'>{{store.label}}</tzx-tag>
								</div>
								<div class='checkdish'>
									<span style='' @click='dialogVisible = true'>选择被提醒人</span>
								</div>
								<el-input type="textarea" v-model="message" disabled></el-input>
							</div>
						</el-form-item>
						<hr class='form_hr' />
						<el-form-item label="消费信息诊断" prop='stored_times' :rules="form.stored_times_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox  v-model="form.stored_times_checked">当日储值次数</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input size='small' :disabled='!form.stored_times_checked' v-model="form.stored_times"  style="width:120px;" >
									<template slot="append">次</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>	
						</el-form-item>							
						<el-form-item label='' prop='stored_money' :rules="form.stored_money_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox  v-model="form.stored_money_checked">当日单笔储值金额</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input  :disabled='!form.stored_money_checked' size='small' v-model="form.stored_money"  style="width:120px;" >
									<template slot="append">元</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>							
						</el-form-item>
						<el-form-item  label='' prop='stored_consume_times' :rules="form.stored_consume_times_checked?filter_rules({required:true,maxLength:8}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox  v-model="form.stored_consume_times_checked">当日储值消费次数</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input  :disabled='!form.stored_consume_times_checked' size='small' v-model="form.stored_consume_times"  style="width:120px;" >
									<template slot="append">次</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>							
						</el-form-item>	
						<el-form-item  label='' prop='stored_per_consume_money' :rules="form.stored_per_consume_money_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox  v-model="form.stored_per_consume_money_checked">当日单笔储值消费额</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input  size='small' :disabled='!form.stored_per_consume_money_checked' v-model="form.stored_per_consume_money"  style="width:120px;" >
									<template slot="append">元</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>							
						</el-form-item>	
						<el-form-item   label='' prop='credit_add_times' :rules="form.credit_add_times_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox  v-model="form.credit_add_times_checked">当日积分增加次数</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input  :disabled='!form.credit_add_times_checked' size='small' v-model="form.credit_add_times"  style="width:120px;" >
									<template slot="append">次</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>							
						</el-form-item>	
						<el-form-item  label='' prop='credit_add_amount' :rules="form.credit_add_amount_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox  v-model="form.credit_add_amount_checked">当日单笔积分增加</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input  :disabled='!form.credit_add_amount_checked' size='small' v-model="form.credit_add_amount"  style="width:120px;" >
									<template slot="append">分</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>							
						</el-form-item>	
						<el-form-item  label='' prop='credit_consume_times' :rules="form.credit_consume_times_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox  v-model="form.credit_consume_times_checked">当日积分消费次数</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input  :disabled='!form.credit_consume_times_checked' size='small' v-model="form.credit_consume_times"  style="width:120px;" >
									<template slot="append">次</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>							
						</el-form-item>	
						<el-form-item label='' prop='credit_per_consume_amount' :rules="form.credit_per_consume_amount_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox  v-model="form.credit_per_consume_amount_checked">当日单笔积分消费</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input  :disabled='!form.credit_per_consume_amount_checked' size='small' v-model="form.credit_per_consume_amount"  style="width:120px;" >
									<template slot="append">分</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>							
						</el-form-item>							
						<el-form-item label='' prop="warning1" :rules='filter_rules({type:"array"})'>
							<div style='margin-left: 40px;'>
								<span> 提醒方式:</span>
								<el-checkbox-group  v-model="form.warning1">
									<div class='checkboxdiv' v-for='(warn,index) in warning'>
										<el-checkbox  @change='warnCheckChange1'  :label="warn.id" :key="index" >
											{{warn.text}}
									   </el-checkbox>
									</div>
								</el-checkbox-group>
							</div>							
							<div style='margin-left: 40px;'  v-if='form.warning1.indexOf("1")!= -1'>
								<div class='showDishMessage' v-for='(store,index) in storeNodes_template1'>
									<tzx-tag  :closable=true cursor='default' color='#34495E' size='medium'   @closeThis='deleteStore1(store,index)'>{{store.label}}</tzx-tag>
								</div>
								<div class='checkdish'>
									<span style='' @click='dialogVisible1 = true'>选择被提醒人</span>
								</div>
								<el-input type="textarea" v-model="message1" disabled></el-input>
							</div>
						</el-form-item>
						<hr class='form_hr' />
						<el-form-item label="操作信息诊断" prop="credit_adjust_count" :rules="form.credit_adjust_count_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox v-model="form.credit_adjust_count_checked">当日积分调账次数</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input :disabled='!form.credit_adjust_count_checked' size='small' v-model="form.credit_adjust_count"  style="width:120px;" >
									<template slot="append">次</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>						
						</el-form-item>
						<el-form-item label="" prop="amount_adjust_count" :rules="form.amount_adjust_count_checked?filter_rules({required:true,maxLength:8,type:'integer'}):filter_rules({})">
							<div class='circle-form-item'>
								<el-checkbox v-model="form.amount_adjust_count_checked">当日储值金额调账次数</el-checkbox>
								<span>≥&nbsp;&nbsp;&nbsp;</span>
								<el-input :disabled='!form.amount_adjust_count_checked' size='small' v-model="form.amount_adjust_count"  style="width:120px;" >
									<template slot="append">次</template>
								</el-input>
								<span>&nbsp;&nbsp;&nbsp;的会员</span>
							</div>						
						</el-form-item>
						<el-form-item label='' prop="warning2" :rules='filter_rules({type:"array"})'>
							<div style='margin-left: 40px;'>
								<span> 提醒方式:</span>
								<el-checkbox-group  v-model="form.warning2">
									<div class='checkboxdiv' v-for='(warn,index) in warning'>
										<el-checkbox  @change='warnCheckChange2'  :label="warn.id" :key="index" >
											{{warn.text}}
									   </el-checkbox>
									</div>
								</el-checkbox-group>
							</div>							
							<div style='margin-left: 40px;'  v-if='form.warning2.indexOf("1")!= -1'>
								<div class='showDishMessage' v-for='(store,index) in storeNodes_template2'>
									<tzx-tag  :closable=true cursor='default' color='#34495E' size='medium'   @closeThis='deleteStore1(store,index)'>{{store.label}}</tzx-tag>
								</div>
								<div class='checkdish'>
									<span style='' @click='dialogVisible2 = true'>选择被提醒人</span>
								</div>
								<el-input type="textarea" v-model="message2" disabled></el-input>
							</div>
						</el-form-item>
						<hr class='form_hr' />
						<el-form-item class='form-submit' style='margin-left: 40px;'>
							<el-button @click="submitForm('form')" size='large' type="primary">保存</el-button>
						</el-form-item>					
					</el-form>
				</div>				
			</el-tab-pane>	
			<el-tab-pane label="诊断报告" name="third" >
				<div class='circle_report'>
					<ul>
						<li style='background:#D8E5EC;' ref='basic' @click="switchTabs('basic')">基本配置诊断</li>
						<li style='background:#FFFFFF;' ref='custom' @click="switchTabs('custom')">消费信息诊断</li>
						<li style='background:#FFFFFF;' ref='operate' @click="switchTabs('operate')">操作信息诊断</li>
					</ul>	
					<el-date-picker  @change='dataChange' :picker-options="pickerOptions0" v-model="value" type="daterange" placeholder="选择日期范围" style='float:right'>
					</el-date-picker>
				</div>
				<div class='circle_table'>
					<div style='display: block;'  ref='basicdiv' >
						<el-table  v-loading="loading_basic" empty-text='暂无任何数据'  :data="tableData_basic" style="width: 100%">
				      		<el-table-column :formatter="isNotNullFormat" prop="day_count" label="诊断日期" min-width="100"></el-table-column>
				      		<el-table-column :formatter="isNotNullFormat" header-align='right' align='right' prop="trade_warn_real" label="交易短信剩余条数" min-width="100">
				      			<template scope="scope">
									<span>{{isNaN(parseInt(scope.row.trade_warn_real))?'未知':parseInt(scope.row.trade_warn_real)}}</span>
								</template>
				      		</el-table-column>
				      		<el-table-column :formatter="smsFormat" header-align='right' align='right' prop="trade_warn_value" label="交易短信规则条数" min-width="100">				      			
				      		</el-table-column>
				      		<el-table-column :formatter="isNotNullFormat" header-align='center' align='center'  label="交易短信状态" min-width="100">
				      			<template scope="scope">
									<tzx-tag  cursor='default' :color="scope.row.trade_warn_status && scope.row.trade_warn_status.substring(0,2)| statusFilter">{{scope.row.trade_warn_status && scope.row.trade_warn_status.substring(0,2)| valueFilter }}</tzx-tag>
								</template>
				      		</el-table-column>
				      		<el-table-column :formatter="isNotNullFormat" header-align='right' align='right' prop="marketing_warn_real" label="营销短信剩余条数" min-width="100">
				      			<template scope="scope">
									<span>{{isNaN(parseInt(scope.row.marketing_warn_real))?'未知':parseInt(scope.row.marketing_warn_real)}}</span>
								</template>				      			
				      		</el-table-column>
				      		<el-table-column :formatter="smsFormat" header-align='right' align='right' prop="marketing_warn_value" label="营销短信规则条数" min-width="100"></el-table-column>
				      		<el-table-column :formatter="isNotNullFormat" header-align='center' align='center'  label="营销短信状态" min-width="100">
				      			<template scope="scope">
									<tzx-tag  cursor='default' :color="scope.row.marketing_warn_status  && scope.row.marketing_warn_status.substring(0,2) | statusFilter">{{scope.row.marketing_warn_status && scope.row.marketing_warn_status.substring(0,2)|valueFilter}}</tzx-tag>
								</template>
				      		</el-table-column>
			      			<el-table-column :formatter="isNotNullFormat" header-align='center' align='center'  label="会员等级状态" min-width="100">
			      				<template scope="scope">
									<tzx-tag  cursor='default' :color="scope.row.member_level_status && scope.row.member_level_status.substring(0,2) | statusFilter">{{scope.row.member_level_status && scope.row.member_level_status.substring(0,2)|valueFilter}}</tzx-tag>
								</template>
			      			</el-table-column>	
			    		</el-table>
					    <div class="pagination-container" v-if='tableData_basic.length>0&&total_basic>listQuery_basic.rows'>
							<el-pagination @size-change="handleSizeChange_basic" @current-change="handleCurrentChange_basic" :current-page.sync="listQuery_basic.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery_basic.rows" layout="prev, pager, next,total, jumper,sizes" :total="total_basic">
							</el-pagination>
						</div>
					</div>
					<div style='display: none;'  ref='customdiv' >
						<el-table v-loading="loading3"  empty-text='暂无任何数据' :data="tableData" max-height='500px' style="width:100%">
							<el-table-column prop="day_count" label="诊断日期" fixed='left' v-if='tableData.length>0' width="100"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="stored_times_value" label="储值次数" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="stored_times_num" label="人数" min-width="80"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="stored_money_value" label="单笔储值金额" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right':formatter="numFormat" prop="stored_money_num" label="人数" min-width="80"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="stored_consume_times_value" label="储值消费次数" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="stored_consume_times_num" label="人数" min-width="80"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="stored_per_consume_money_value" label="单笔储值消费" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="stored_per_consume_money_num" label="人数" min-width="100"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="credit_add_times_value" label="积分增加次数" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="credit_add_times_num" label="人数" min-width="80"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="credit_add_amount_value" label="单笔积分增加" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="credit_add_amount_num" label="人数" min-width="80"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="credit_consume_times_value" label="积分消费次数" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="credit_consume_times_num" label="人数" min-width="80"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="credit_per_consume_amount_value" label="单笔积分消费额" min-width="120"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="credit_per_consume_amount_num" label="人数" min-width="80"></el-table-column>
							<el-table-column header-align='center' align='center' fixed='right' v-if='tableData.length>0' label="操作" width="120">
								<template scope="scope">
								<tzx-tag  color="#0C9AFF" @clickThis='showReportDetail(scope.row)' >报告详情</tzx-tag>
								</template>
							</el-table-column>
						</el-table>
						<div class="pagination-container" v-if='tableData.length>0&&total>listQuery.rows'>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.rows" layout="prev, pager, next,total, jumper,sizes" :total="total">
							</el-pagination>
						</div>
					</div>
					<div style='display: none;'  ref='operatediv' >
						<el-table v-loading="loading_operate"  empty-text='暂无任何数据' :data="tableData_operate" max-height='500px' style="width:100%">						
							<el-table-column header-align='center' align='center' prop="day_count"  min-width="100" label='诊断日期'></el-table-column>
							<el-table-column :formatter="valueFormat" prop="credit_adjust_value" label="积分调账次数" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="credit_adjust_num" label="人数" min-width="100"></el-table-column>
							<el-table-column :formatter="valueFormat" prop="amount_adjust_value" label="储值金额调账次数" min-width="100"></el-table-column>
							<el-table-column header-align='right' align='right' :formatter="numFormat" prop="amount_adjust_num" label="人数" min-width="100"></el-table-column>
							<el-table-column header-align='center' align='center'  width="150" label="操作">
								<template scope="scope">
								<tzx-tag  color="#0C9AFF" @clickThis='showReportOperateDetail(scope.row)' >报告详情</tzx-tag>
								</template>
							</el-table-column>
						</el-table>
						<div class="pagination-container" v-if='tableData_operate.length>0&&total_operate>listQuery_operate.rows'>
							<el-pagination @size-change="handleSizeChange_operate" @current-change="handleCurrentChange_operate" :current-page.sync="listQuery_operate.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery_operate.rows" layout="prev, pager, next,total, jumper,sizes" :total="total_operate">
							</el-pagination>
						</div>
					</div>
				</div>
			</el-tab-pane>	
		</el-tabs>
	</div>
	
</template>

<script>
	import { findTingXingPerson } from '@/api/home'
	import { findSmsMessage,findWarnRule,startSafe,getSafeWarn,getBasicWarnReport,getOperateWarnReport } from '@/api/safety'
	import { getWarnReport,saveWarn } from '@/api/activity'
	import {TzxCircle } from '@/components/circle'
	import { TzxTreeSelect } from '@/components/tzxtreeselect'
    import { TzxTag } from '@/components/tag'
	export default {
		components: {
			TzxCircle,TzxTreeSelect,TzxTag
		},
		computed : {
            circle_loading() {
                return (this.circle_loading1 && this.circle_loading2 && this.circle_loading3)
            }
       },
       	filters: {
			statusFilter(status) {
				const statusMap = {
					'异常': '#FF7171',
					'正常': '#56C94F',
					'风险': '#FF7171',
				
				}
				return statusMap[status]
			},
			valueFilter(status) {
				const statusMap = {
					'异常': '异常',
					'风险': '风险',
					'正常': '正常',
					null : '--',
					'':'--'
				
				}
				return statusMap[status]
			},
			
			
		},
		data(){
			return{
				activeName:'first',
				 pickerOptions0: {
			          disabledDate(time) {
			            return time.getTime() >= Date.now() ;
			          }
			        },
				form:{
					trade_sms_remained_count:'1000',
					trade_sms_remained_count_checked:true,
					marketing_sms_remained_count:'1000',
					marketing_sms_remained_count_checked:true,
					member_level:true,
					warning:['0'],
					warning1:['0'],
					warning2:['0'],
					stored_times: '',
					stored_money: '',
					stored_consume_times:'',
					stored_per_consume_money: '',
					credit_add_times:'',
					credit_add_amount: '',
					credit_consume_times: '',
					credit_per_consume_amount:'',
					stored_times_checked: true,
					stored_money_checked: true,
					stored_consume_times_checked: true,
					stored_per_consume_money_checked: true,
					credit_add_times_checked: true,
					credit_add_amount_checked: true,
					credit_consume_times_checked: true,
					credit_per_consume_amount_checked: true,
					credit_adjust_count:'0',
					credit_adjust_count_checked:true,
					amount_adjust_count:'0',
					amount_adjust_count_checked:true
				},
				warning:[{
					id:'0',
					text:'不提醒'
				},{
					id:'1',
					text:'短信提醒'
				}],
				message:'',
				storeData:[],
				dialogVisible:false,
				storeCheckedIds:[],
				storeNodes:[],
				storeNodes_template:[],
				storeTotal:0,		
				message1:'',
				storeData1:[],
				dialogVisible1:false,
				storeCheckedIds1:[],
				storeNodes1:[],
				storeNodes_template1:[],
				storeTotal1:0,
				message2:'',
				storeData2:[],
				dialogVisible2:false,
				storeCheckedIds2:[],
				storeNodes2:[],
				storeNodes_template2:[],
				storeTotal2:0,
				tab:'basic',
				loading_basic:false,
				tableData_basic:[],
				total_basic:0,
				listQuery_basic: {
					page: 1,
					rows: this.$store.state.user.screenPageSize,
					start_date: '',
					end_date: '',
				},				
				tableData: [],
				listQuery: {
					page: 1,
					rows: this.$store.state.user.screenPageSize,
					start_date: '',
					end_date: '',
					sort: 'id',
					order: 'asc'
				},
				loading3:false,
				total: 0,
				loading_operate:false,
				tableData_operate:[],
				total_operate:0,
				listQuery_operate: {
					page: 1,
					rows: this.$store.state.user.screenPageSize,
					start_date: '',
					end_date: '',
				},
				value:'',
				show:false,
				showText:'展开',
				circle_loading1 : true,
				circle_loading2 : true,
				circle_loading3 : true,				
				score:50,
				score1:0,
				score2:50,
				score3:0,
				score4:50,
				score5:0,
				add1:'-',
				add2:'-',
				add3:'-',
				loadingform:false,
				basicWarn:{},
				consumeWarn:{},
				operateWarn:{}
				
			}
		},
		watch:{
			'form.trade_sms_remained_count_checked'(val,oldval){
				if(val){
					this.form.trade_sms_remained_count = '1000';
				}
				else{
					this.form.trade_sms_remained_count = '';
				}
			},
			'form.marketing_sms_remained_count_checked'(val,oldval){
				if(val){
					this.form.marketing_sms_remained_count = '1000';
				}
				else{
					this.form.marketing_sms_remained_count = '';
				}
			},
			'form.stored_times_checked'(val,oldval){
				if(val){
					this.form.stored_times = '';
				}
				else{
					this.form.stored_times = '';
				}
			},
			'form.stored_money_checked'(val,oldval){
				if(val){
					this.form.stored_money ='';
				}
				else{
					this.form.stored_money = '';
				}
			},
			'form.stored_consume_times_checked'(val,oldval){
				if(val){
					this.form.stored_consume_times = '';
				}
				else{
					this.form.stored_consume_times = '';
				}
			},
			'form.stored_per_consume_money_checked'(val,oldval){
				if(val){
					this.form.stored_per_consume_money = '';
				}
				else{
					this.form.stored_per_consume_money = '';
				}
			},
			'form.credit_add_times_checked'(val,oldval){
				if(val){
					this.form.credit_add_times = '';
				}
				else{
					this.form.credit_add_times = '';
				}
			},
			'form.credit_add_amount_checked'(val,oldval){
				if(val){
					this.form.credit_add_amount = '';
				}
				else{
					this.form.credit_add_amount = '';
				}
			},
			'form.credit_consume_times_checked'(val,oldval){
				if(val){
					this.form.credit_consume_times ='';
				}
				else{
					this.form.credit_consume_times = '';
				}
			},
			'form.credit_per_consume_amount_checked'(val,oldval){
				if(val){
					this.form.credit_per_consume_amount = '';
				}
				else{
					this.form.credit_per_consume_amount = '';
				}
			},
			'form.credit_adjust_count_checked'(val,oldval){
				if(val){
					this.form.credit_adjust_count = '';
				}
				else{
					this.form.credit_adjust_count = '';
				}
			},
			'form.amount_adjust_count_checked'(val,oldval){
				if(val){
					this.form.amount_adjust_count = '';
				}
				else{
					this.form.amount_adjust_count = '';
				}
			},

		},
		methods:{
			showReportDetail(row){
				this.$router.push({
					path:'/tool/warn_report',
					query:{id:row.id,day_count:row.day_count}
				})
			},
			showReportOperateDetail(row){
				this.$router.push({
					path:'/tool/warn_report_operate',
					query:{id:row.id,day_count:row.day_count}
				})
			},
			handleClick(tab, event){
				/*点击第一个标签页*/
				if(tab.name == 'first') {

				}
				/*点击第二个标签页*/
				if(tab.name == 'second') {
					this.findWarnRule();			
					this.loadTree();
				}
				/*点击第三个标签页*/
				if(tab.name == 'third') {
					this.getBasicWarnReport();
				}
			},
			findWarnRule(){
				/**
				 * 诊断规则设置
				 * 基本信息回显
				 * */
				this.loadingform = true;
				findWarnRule().then(response => {
					if(response.success){
						if(response.stored_times){
							this.form.stored_times = response.stored_times;
							this.form.stored_times_checked_checked = true;
						}
						else{
							this.form.stored_times_checked_checked = false;
						}
						if(response.stored_money){
							this.form.stored_money = response.stored_money;
							this.form.stored_money_checked = true;
						}
						else{
							this.form.stored_money_checked = false;
						}
						if(response.stored_consume_times){
							this.form.stored_consume_times = response.stored_consume_times;
							this.form.stored_consume_times_checked = true;
						}
						else{
							this.form.stored_consume_times_checked = false;
						}
						if(response.stored_per_consume_money){
							this.form.stored_per_consume_money = response.stored_per_consume_money;
							this.form.stored_per_consume_money_checked = true;
						}
						else{
							this.form.stored_per_consume_money_checked = false;
						}
						if(response.credit_add_times){
							this.form.credit_add_times = response.credit_add_times;
							this.form.credit_add_times_checked = true;
						}
						else{
							this.form.credit_add_times_checked = false;
						}
						if(response.credit_add_amount){
							this.form.credit_add_amount = response.credit_add_amount;
							this.form.credit_add_amount_checked = true;
						}
						else{
							this.form.credit_add_amount_checked = false;
						}
						if(response.credit_consume_times){
							this.form.credit_consume_times = response.credit_consume_times;
							this.form.credit_consume_times_checked = true;
						}
						else{
							this.form.credit_consume_times_checked = false;
						}
						if(response.credit_per_consume_amount){
							this.form.credit_per_consume_amount = response.credit_per_consume_amount;
							this.form.credit_per_consume_amount_checked = true;
						}
						else{
							this.form.credit_per_consume_amount_checked = false;
						}
						if(response.member_level){
							this.form.member_level = true;
						}
						else{
							this.form.member_level = false;
						}
						if(response.trade_sms_remained_count){
							this.form.trade_sms_remained_count = response.trade_sms_remained_count;
							this.form.trade_sms_remained_count_checked = true;
						}
						else{
							this.form.trade_sms_remained_count_checked = false;
						}
						if(response.marketing_sms_remained_count){
							this.form.marketing_sms_remained_count = response.marketing_sms_remained_count;
							this.form.marketing_sms_remained_count_checked = true;
						}
						else{
							this.form.marketing_sms_remained_count_checked = false;
						}
						if(response.marketing_sms_remained_count){
							this.form.marketing_sms_remained_count = response.marketing_sms_remained_count;
							this.form.marketing_sms_remained_count_checked = true;
						}
						else{
							this.form.marketing_sms_remained_count_checked = false;
						}
						
						if(response.credit_adjust_count){
							this.form.credit_adjust_count = response.credit_adjust_count;
							this.form.credit_adjust_count_checked = true;
						}
						else{
							this.form.credit_adjust_count_checked = false;
						}
						
						if(response.amount_adjust_count){
							this.form.amount_adjust_count = response.amount_adjust_count;
							this.form.amount_adjust_count_checked = true;
						}
						else{
							this.form.amount_adjust_count_checked = false;
						}
						if(response.basic_is_warn == '1'){
							this.form.warning = ['1'];
							this.storeTotal = response.basicReceive.length;
							this.storeNodes = response.basicReceive;
							this.storeNodes_template = response.basicReceive;
							response.basicReceive.map((item,index)=>{
								this.storeCheckedIds.push(item.id);
							})
						}
						else{
							this.form.warning = ['0']	
						}
						if(response.consume_is_warn == '1'){
							this.form.warning1 = ['1'];
					
							this.storeTotal1 = response.consumeReceive.length;
							this.storeNodes1 = response.consumeReceive;
							this.storeNodes_template1 = response.consumeReceive;
							response.consumeReceive.map((item,index)=>{
								this.storeCheckedIds1.push(item.id);
							})
						}
						else{
							this.form.warning1 = ['0']
						}
						if(response.operate_is_warn == '1'){
							this.form.warning2 = ['1']
							this.storeTotal2 = response.operateReceive.length;
							this.storeNodes2 = response.operateReceive;
							this.storeNodes_template2 = response.operateReceive;
							response.operateReceive.map((item,index)=>{
								this.storeCheckedIds2.push(item.id);
							})
						}
						else{
							this.form.warning2 = ['0']
						}
					}
					this.loadingform = false;
				}).catch(e => {
					this.loadingform = false;
				})
			},
			/* 基本信息 提醒方式发生改变*/
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
		    /* 基本信息 提醒方式发生改变*/
		    warnCheckChange1(event){
		    	if(event.target.value=='0' && event.target.checked){
		    		this.form.warning1 = ['0']
		    	}
		       if(event.target.value!='0' && event.target.checked){
		    		if(this.form.warning1.length!=0){
		    			let index = this.form.warning1.indexOf('0')
		    			if(index != -1 ){
		    				this.form.warning1.splice(index, 1)
		    			}
		    		}
		    	}
		    },
		     warnCheckChange2(event){
		    	if(event.target.value=='0' && event.target.checked){
		    		this.form.warning2 = ['0']
		    	}
		       if(event.target.value!='0' && event.target.checked){
		    		if(this.form.warning2.length!=0){
		    			let index = this.form.warning2.indexOf('0')
		    			if(index != -1 ){
		    				this.form.warning2.splice(index, 1)
		    			}
		    		}
		    	}
		    },
		    //加载被选择人树
		    loadTree() {
				findTingXingPerson().then((response) => {
					this.storeData =response.data;
					this.storeData1 =response.data;
					this.storeData2 =response.data;
				})
			},
			//弹框树 按钮
			storeMakeSureChecked(){
		    	this.storeNodes_template = this.storeNodes;
		    	this.dialogVisible = false;
		    },
		    storeMakeSureChecked1(){
		    	this.storeNodes_template1 = this.storeNodes1;
		    	this.dialogVisible1 = false;
		    },
		     storeMakeSureChecked2(){
		    	this.storeNodes_template2 = this.storeNodes2;
		    	this.dialogVisible2 = false;
		    },
		    //每个删除按钮
		    deleteStore(store,index){
		    	this.storeNodes_template.splice(index, 1);
		    }, 
		    deleteStore1(store,index){
		    	this.storeNodes_template1.splice(index, 1);
		    },
		     deleteStore2(store,index){
		    	this.storeNodes_template2.splice(index, 1);
		    },
		    storeBoxChange(nodes,total){
		      	this.storeNodes = nodes;
		      	this.storeTotal = total;
		    },
		    storeBoxChange1(nodes,total){
		      	this.storeNodes1 = nodes;
		      	this.storeTotal1 = total;
		    },
		     storeBoxChange2(nodes,total){
		      	this.storeNodes2 = nodes;
		      	this.storeTotal2 = total;
		    },
		    
		    switchTabs(tab){
				this.tab = tab;						
				if(tab=='basic'){		
					this.$refs.basic.style.background ='#D8E5EC'
					this.$refs.custom.style.background ='#FFFFFF'
					this.$refs.operate.style.background ='#FFFFFF'				
					this.$refs.basicdiv.style.display ='block';
					this.$refs.customdiv.style.display ='none';
					this.$refs.operatediv.style.display ='none';
					this.getBasicWarnReport();
				}
				else if(tab == 'custom'){
					this.$refs.basic.style.background ='#FFFFFF'
					this.$refs.custom.style.background ='#D8E5EC'
					this.$refs.operate.style.background ='#FFFFFF'				
					this.$refs.basicdiv.style.display ='none';
					this.$refs.customdiv.style.display ='block';
					this.$refs.operatediv.style.display ='none';
					this.getFirstList();
				}				
				else{
					this.$refs.basic.style.background ='#FFFFFF'
					this.$refs.custom.style.background ='#FFFFFF'
					this.$refs.operate.style.background ='#D8E5EC'				
					this.$refs.basicdiv.style.display ='none';
					this.$refs.customdiv.style.display ='none';
					this.$refs.operatediv.style.display ='block';
					this.getOperateWarnReport();
				}
			},
			getFirstList() {
				this.loading3 = true;
				let data = "page=" + this.listQuery.page+
					      "&rows=" + this.listQuery.rows+
					      "&start_date=" + this.listQuery.start_date+
					      "&end_date=" + this.listQuery.end_date;
				getWarnReport(data).then(response => {
					this.loading3 = false;
					if(response.success == true) {
						this.tableData = response.data.rows;
						this.total = response.data.total;
					} else {
						this.$message({
							type: 'error',
							message: response.msg
						});
					}
				}).catch(e => {
					this.loading3 = false;
					this.$message({
						type: 'error',
						message: e
					});
				})
			},
			getBasicWarnReport(){
				this.loading_basic = true;
				let data = "page=" + this.listQuery_basic.page+
					      "&rows=" + this.listQuery_basic.rows+
					      "&start_date=" + this.listQuery_basic.start_date+
					      "&end_date=" + this.listQuery_basic.end_date;	
				getBasicWarnReport(data).then(response => {
					this.loading_basic = false;
					if(response.success == true) {
						this.tableData_basic = response.data.rows;
						this.total_basic = response.data.total;
					} else {
						this.$message({
							type: 'error',
							message: response.msg
						});
					}
				}).catch(e => {
					this.loading_basic = false;
					this.$message({
						type: 'error',
						message: e
					});
				})
			},
			getOperateWarnReport(){
				this.loading_operate = true;
				let data = "page=" + this.listQuery_operate.page+
					      "&rows=" + this.listQuery_operate.rows+
					      "&start_date=" + this.listQuery_operate.start_date+
					      "&end_date=" + this.listQuery_operate.end_date;	
				getOperateWarnReport(data).then(response => {
					this.loading_operate = false;
					if(response.success == true) {
						this.tableData_operate = response.data.rows;
						this.total_operate = response.data.total;
					} else {
						this.$message({
							type: 'error',
							message: response.msg
						});
					}
				}).catch(e => {
					this.loading_operate = false;
					this.$message({
						type: 'error',
						message: e
					});
				})
			},
			valueFormat(row, column) {
				let value = row[column.property];
				if(value){
					return "≥" + value;
				}
				else{
					return "0"
				}
					
			},
			numFormat(row, column) {
				let num = row[column.property];
				if(num){
					return num + "人";
				}
				else{
					return "0人"
				}
			},
			smsFormat(row, column) {
				let sms = row[column.property];
				if(sms){
					return "≤" + sms;
				}
				else{
					return "--"
				}
			},
			handleSizeChange(val) {
				this.listQuery.rows = val
				this.switchTabs(this.tab);
			},
			handleCurrentChange(val) {
				this.listQuery.page = val
				this.switchTabs(this.tab);
			},
			handleSizeChange_basic(val) {
				this.listQuery_basic.rows = val
				this.switchTabs(this.tab);
			},
			handleCurrentChange_basic(val) {
				this.listQuery_basic.page = val
				this.switchTabs(this.tab);
			},
			handleSizeChange_operate(val) {
				this.listQuery_operate.rows = val
				this.switchTabs(this.tab);
			},
			handleCurrentChange_operate(val) {
				this.listQuery_operate.page = val
				this.switchTabs(this.tab);
			},			
			dataChange(date) {
				if(date != "" && date != null && date != undefined) {
					this.listQuery.start_date = date.substring(0, 10);
					this.listQuery.end_date = date.substring(13, 23);
					this.listQuery_basic.start_date = date.substring(0, 10);
					this.listQuery_basic.end_date = date.substring(13, 23);					
					this.listQuery_operate.start_date = date.substring(0, 10);
					this.listQuery_operate.end_date = date.substring(13, 23);					
					this.listQuery.page = 1;		
					this.listQuery_basic.page = 1;			
					this.listQuery_operate.page = 1;
				}
				this.switchTabs(this.tab);
			},
			clickShow(circle_loading){
				if(circle_loading){
					this.show = !this.show;
					this.showText = this.show ? '收起' : '展开'
					this.$refs.circle1.style.height = this.show ? '240px' : '0px';
					this.$refs.circle2.style.height = this.show ? '240px' : '0px';
					this.$refs.circle3.style.height = this.show ? '240px' : '0px';
				}
			},
			startAnalysis(){				    
				this.circle_loading1 = false;
				this.circle_loading2 = false;
				this.circle_loading3 = false;
				if(this.show){
					this.show = !this.show;
					this.showText = this.show ? '收起' : '展开'
					this.$refs.circle1.style.height = this.show ? '240px' : '0px';
					this.$refs.circle2.style.height = this.show ? '240px' : '0px';
					this.$refs.circle3.style.height = this.show ? '240px' : '0px';
				}				
				startSafe().then(response => {					
					if(response.success){					
						if(response.basicWarn.basicList.length != 0){
							response.basicWarn.basicList.map((item,index) =>{
								let num = isNaN(parseInt(item.warn_real))? 0 : parseInt(item.warn_real);
								if(item.warn_key == 'marketing_sms_remained_count'){									
									item.warn_text = '营销短信剩余'+num+"条";
								}
								if(item.warn_key == 'trade_sms_remained_count'){
									item.warn_text = '交易短信剩余'+num+"条";
								}
								if(item.warn_key == 'member_level'){
									item.warn_text = '会员等级'
								}
							})
						}
						if(response.consumeWarn.consumeList.length != 0){
							response.consumeWarn.consumeList.map((item,index) =>{
								if(item.warn_key == 'stored_times'){
									item.warn_text = '储值次数'
								}
								if(item.warn_key == 'stored_money'){
									item.warn_text = '单笔储值金额'
								}
								if(item.warn_key == 'stored_consume_times'){
									item.warn_text = '储值消费次数'
								}
								if(item.warn_key == 'stored_per_consume_money'){
									item.warn_text = '单笔储值消费额'
								}
								if(item.warn_key == 'credit_add_times'){
									item.warn_text ='积分增加次数'
								}
								if(item.warn_key == 'credit_add_amount'){
									item.warn_text = '单笔积分增加额'
								}
								if(item.warn_key == 'credit_consume_times'){
									item.warn_text = '积分消费次数'
								}
								if(item.warn_key == 'credit_per_consume_amount'){
									item.warn_text ='单笔积分消费额'
								}							
							})
						}
						if(response.operateWarn.operateList.length != 0){
							response.operateWarn.operateList.map((item,index) =>{
								if(item.warn_key == 'credit_adjust_count'){
									item.warn_text = '积分调账次数'
								}
								if(item.warn_key == 'amount_adjust_count'){
									item.warn_text = '储值金额调账次数'
								}								
							})
						}			
						this.basicWarn = response.basicWarn;
						this.consumeWarn = response.consumeWarn;
						this.operateWarn = response.operateWarn;
						this.score1 = response.basicWarn.basicScore;
						this.score3 = response.consumeWarn.consumeScore;
						this.score5 = response.operateWarn.operateScore;						
						this.start1();
						this.start2();
						this.start3();	
					}
				})
			},
			start1(){
				let start = setInterval(()=>{
					if(this.add1=='-'){						
						if(this.score == 0){
							this.add1 = '+'
						}
						if(this.score >= 1){
							this.score -= 1;
						}						
					}
					else{
						if(this.score< this.score1){
							this.score += 1;
						}
						if(this.score ==  this.score1){
							this.add1 = '-'
							this.circle_loading1 = true;
							clearInterval(start);
						}
					}				
				},100)
			},
			start2(){
				let start = setInterval(()=>{
					if(this.add2=='-'){						
						if(this.score2 == 0){
							this.add2 = '+'
						}
						if(this.score2 >= 1){
							this.score2 -= 1;
						}
						
					}
					else{
						if(this.score2< this.score3){
							this.score2 += 1;
						}
						if(this.score2 ==  this.score3){
							this.add2 = '-'
							this.circle_loading2 = true;
							clearInterval(start);
						}
					}				
				},100)
			 
				
			},
			start3(){
				let start = setInterval(()=>{
					if(this.add3=='-'){						
						if(this.score4 == 0){
							this.add3 = '+'
						}
						if(this.score4 >= 1){
							this.score4 -= 1;
						}
						
					}
					else{
						if(this.score4< this.score5){
							this.score4 += 1;
						}
						if(this.score4 ==  this.score5){
							this.add3 = '-'
							this.circle_loading3 = true;
							clearInterval(start);
						}
					}				
				},100)
			},
			submitForm(formName) {
				this.$refs.form.validate((valid) => {
					if(valid) {
						let data = '';
						if(this.form.trade_sms_remained_count_checked){
							data == '' ? data += 'trade_sms_remained_count=' + this.form.trade_sms_remained_count : data += '&trade_sms_remained_count=' + this.form.trade_sms_remained_count;							
						}
						if(this.form.marketing_sms_remained_count_checked){
							data == '' ? data += 'marketing_sms_remained_count=' + this.form.marketing_sms_remained_count : data += '&marketing_sms_remained_count=' + this.form.marketing_sms_remained_count;	
						}
						
						if(this.form.member_level){
							data == '' ? data += 'member_level=1' : data += '&member_level=1' ;	
						}
						if(this.form.stored_times_checked){
							data == '' ? data += 'stored_times=' + this.form.stored_times : data += '&stored_times=' + this.form.stored_times;	
						}
						if(this.form.stored_money_checked){
							data == '' ? data += 'stored_money=' + this.form.stored_money : data += '&stored_money=' + this.form.stored_money;	
						}
						if(this.form.stored_consume_times_checked){
							data == '' ? data += 'stored_consume_times=' + this.form.stored_consume_times : data += '&stored_consume_times=' + this.form.stored_consume_times;	
						}
						if(this.form.stored_per_consume_money_checked){
							data == '' ? data += 'stored_per_consume_money=' + this.form.stored_per_consume_money : data += '&stored_per_consume_money=' + this.form.stored_per_consume_money;	
						}
						if(this.form.credit_add_times_checked){
							data == '' ? data += 'credit_add_times=' + this.form.credit_add_times : data += '&credit_add_times=' + this.form.credit_add_times;	
						}
						if(this.form.credit_add_amount_checked){
							data == '' ? data += 'credit_add_amount=' + this.form.credit_add_amount : data += '&credit_add_amount=' + this.form.credit_add_amount;	
						}
						if(this.form.credit_consume_times_checked){
							data == '' ? data += 'credit_consume_times=' + this.form.credit_consume_times : data += '&credit_consume_times=' + this.form.credit_consume_times;	
						}
						if(this.form.credit_per_consume_amount){
							data == '' ? data += 'credit_per_consume_amount=' + this.form.credit_per_consume_amount : data += '&credit_per_consume_amount=' + this.form.credit_per_consume_amount;	
						}
						if(this.form.credit_adjust_count_checked){
							data == '' ? data += 'credit_adjust_count=' + this.form.credit_adjust_count : data += '&credit_adjust_count=' + this.form.credit_adjust_count;	
						}
						if(this.form.amount_adjust_count_checked){
							data == '' ? data += 'amount_adjust_count=' + this.form.amount_adjust_count : data += '&amount_adjust_count=' + this.form.amount_adjust_count;	
						}
						if(this.form.warning.indexOf("0") != -1){
							data == '' ? data += 'basic_is_warn=0': data += '&basic_is_warn=0';						
						}
						else{
							data == '' ? data += 'basic_is_warn=1': data += '&basic_is_warn=1';	
							
							if(this.storeNodes_template.length == 0){
								this.$message({
									type:'error',
									message:'请选择基本信息诊断的短信提醒人!'
								})
								return
							}							
							let basic_phone = [];
							this.storeNodes_template.map((item,index)=>{
								basic_phone.push(item.id)
							});							
							data += '&basic_phone='+ basic_phone.join(",");
						}
						if(this.form.warning1.indexOf("0") != -1){
							data == '' ? data += 'consume_is_warn=0': data += '&consume_is_warn=0';						
						}
						else{
							data == '' ? data += 'consume_is_warn=1': data += '&consume_is_warn=1';	
							if(this.storeNodes_template1.length == 0){
								this.$message({
									type:'error',
									message:'请选择消费信息诊断的短信提醒人!'
								})
								return
							}
							let consume_phone = [];
							this.storeNodes_template1.map((item,index)=>{
								consume_phone.push(item.id)
							});							
							data += '&consume_phone='+ consume_phone.join(",");
						}
						if(this.form.warning2.indexOf("0") != -1){
							data == '' ? data += 'operate_is_warn=0': data += '&operate_is_warn=0';						
						}
						else{
							data == '' ? data += 'operate_is_warn=1': data += '&operate_is_warn=1';	
							if(this.storeNodes_template2.length == 0){
								this.$message({
									type:'error',
									message:'请选择操作信息诊断的短信提醒人!'
								})
								return
							}
							let operate_phone = [];
							this.storeNodes_template2.map((item,index)=>{
								operate_phone.push(item.id)
							});							
							data += '&operate_phone='+ operate_phone.join(",");
						}
						this.loadingform = true;
						saveWarn(data).then(response => {
							if(response.success){
								this.$message({
									type:'success',
									message:response.msg
								})
							}
							else{
								this.$message({
									type:'error',
									message:"网络异常,请重试!"
								})
							}
							this.loadingform = false;
						}).catch(e => {
							this.$message({
								type:'error',
								message:e
							})
							this.loadingform = false;
						})
					}
					else{
						return false;
					}
				})	
			},
			findSmsMessage(){
				findSmsMessage().then(response=>{
					if(response.success){
						this.message = response.basicSms;
						this.message1 = response.consumeSms;
						this.message2 = response.operateSms;
					}
					else{
						this.$message({
							type: 'error',
							message: '加载短信模板信息失败!请重试'
						});
					}
				})
			},
			getSafeWarn(){
				this.circle_loading1 = false;
				this.circle_loading2 = false;
				this.circle_loading3 = false;
				getSafeWarn().then(response => {
					if(response.success){
						if(!response.basicWarn.basicList){
							this.$message({
								type:'error',
								message:'初始化数据异常,请手动诊断!'
							})
							this.circle_loading1 = true;
							this.circle_loading2 = true;
							this.circle_loading3 = true;
							return;
						}
						if(response.basicWarn.basicList.length != 0){
							response.basicWarn.basicList.map((item,index) =>{
								let num = isNaN(parseInt(item.warn_real))? 0 : parseInt(item.warn_real);
								if(item.warn_key == 'marketing_sms_remained_count'){

									item.warn_text = '营销短信剩余' + num +'条';
								}
								if(item.warn_key == 'trade_sms_remained_count'){
									item.warn_text = '交易短信剩余' +  num +'条';
								}
								if(item.warn_key == 'member_level'){
									item.warn_text = '会员等级'
								}
							})
						}
						if(response.consumeWarn.consumeList.length != 0){
							response.consumeWarn.consumeList.map((item,index) =>{
								if(item.warn_key == 'stored_times'){
									item.warn_text = '储值次数'
								}
								if(item.warn_key == 'stored_money'){
									item.warn_text = '单笔储值金额'
								}
								if(item.warn_key == 'stored_consume_times'){
									item.warn_text = '储值消费次数'
								}
								if(item.warn_key == 'stored_per_consume_money'){
									item.warn_text = '单笔储值消费额'
								}
								if(item.warn_key == 'credit_add_times'){
									item.warn_text ='积分增加次数'
								}
								if(item.warn_key == 'credit_add_amount'){
									item.warn_text = '单笔积分增加额'
								}
								if(item.warn_key == 'credit_consume_times'){
									item.warn_text = '积分消费次数'
								}
								if(item.warn_key == 'credit_per_consume_amount'){
									item.warn_text ='单笔积分消费额'
								}							
							})
						}
						if(response.operateWarn.operateList.length != 0){
							response.operateWarn.operateList.map((item,index) =>{
								if(item.warn_key == 'credit_adjust_count'){
									item.warn_text = '积分调账次数'
								}
								if(item.warn_key == 'amount_adjust_count'){
									item.warn_text = '储值金额调账次数'
								}								
							})
						}			
						this.basicWarn = response.basicWarn;
						this.consumeWarn = response.consumeWarn;
						this.operateWarn = response.operateWarn;
						this.score1 = response.basicWarn.basicScore;
						this.score3 = response.consumeWarn.consumeScore;
						this.score5 = response.operateWarn.operateScore;						
						this.start1();
						this.start2();
						this.start3();	
					}
					
				}).then(e => {
				})
			}	
		},
		mounted() {
			//查询360°安全诊断
			this.getSafeWarn();
			//加载短信模板的信息
			this.findSmsMessage();
		},

	}
	
</script>

<style  rel="stylesheet/scss"  lang="scss">
.circle-form .el-form .el-form-item .el-form-item__content .el-form-item__error {
    margin-left: 40px;
}
.safity .tzxselecttree .el-input__inner{
    text-align: left;
}
.safity .el-dialog__header{
	height: 0;
}
.safity .el-dialog__header .el-dialog__title{
	margin-top: 0;
}
.safity{
	background: #FEFEFE;
	padding-bottom: 20px;
	.el-input__inner{
		height: 28px;
		line-height: 28px;
		text-align: right;
	}
	.el-date-editor .el-input__inner{
		text-align: left;
	}
	.el-tabs__item {
		font-size: 16px !important;
		margin-bottom: 8px!important;
		margin-top: 20px;
		padding: 0px 10px!important;
		margin-left: 0!important;
		color: #34495E!important;
	}
	.el-tabs__nav-scroll{
		border-bottom: 1px solid #EAF1F6;
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
	.safity_title{
		height: 30px;
		margin-top: 10px;
		.circle_doctor{
		    position: relative;
		    height: 20px;
		    width: 90px;
		    border-radis: 3px;
		    padding-left: 10px;
		    border-radius: 3px;
		    border: 1px solid #E7EDF1;
		    margin-left: 20px;
		    font-size: 12px;
		    line-height: 20px;
		    background: #F2F6FB;
		    color: #9AABB8;
			.loading-center{
		        position: absolute;
			    left: 59%;
			    bottom: 29%;
			    width: 90px;
			}
			.circle{
				width: 2px;
				height: 2px;
				background-color: #9AABB8;
				float: left;
				margin-right: 5px;
				-moz-border-radius: 50% 50% 50% 50%;
				-webkit-border-radius: 50% 50% 50% 50%;
				border-radius: 50% 50% 50% 50%;
			}
			.circle1{				
				animation: object_one1 1.5s infinite;
			}
			.circle2{
				animation: object_two1 1.5s infinite;
				animation-delay: 0.25s;
			}
			.circle3{
				animation: object_three1 1.5s infinite;
				animation-delay: 0.5s;
			}
			@keyframes object_one1 {
				75% { 
				    transform: scale(0);
				    -webkit-transform: scale(0);
			   }
			}  
			@keyframes object_two1 {
				75% { 
				    transform: scale(0);
				    -webkit-transform: scale(0);
				}
			}  
			@keyframes object_three1 {			
				75% { 
				    transform: scale(0);
				    -webkit-transform: scale(0);
				}
			}  		
		}
		.circle_doctor1{
		    position: relative;
		    height: 22px;
		    width: 72px;
		    border-radius: 3px;
		    padding-left: 10px;
		    margin-left: 20px;
		    font-size: 12px;
		    line-height: 22px;
		    background: #0C9AFF;
		    cursor: pointer;
		    color: #FFFFFF;
		}	
	}
	.safity_circle{
		height: auto;
		li{
			width: 33.3%;
			float: left;
			list-style: none;
			text-align: center;
			.safity_circle_message{
				margin-top:25px;
				span{
					font-size: 16px;
					color: #34495E;	
				}		
			}	
			.circle-text{
				height:0;
				position: relative;
				margin-top: 10px;
				overflow: hidden;
				transition: height 0.6s;				
				.circle-left{
					float: left;
					width: 70%;
					padding-left: 20%;
					li{
						width: 100%;
						height: 28px;
						line-height: 28px;
						font-size: 14px;
						color: #34495E;	
						text-align: left;
						opacity: 0.7;
					}
				}
				.circle-right{
					float: right;
					width: 30%;
					li{
						width: 100%;
						height: 28px;
						line-height: 28px;
						color: #34495E;	
						opacity: 0.7;
						text-align: left;
						.normal{
							font-size: 14px;
							color: #56C94F;
						}
						.exception{
							font-size: 14px;
							color: #FF7171;
						}
					}
				}
			}		
		}
	}
	.circle-show{
		height: 30px;
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 20px;
		.circle-line{
			border-bottom: 1px dotted  #F1F1F1;
			height:10px;			
			float:left;
			width: 45%;
			transition: width .6s;
			&:nth-of-type(1){
				width: 485px;
			}	
		}
		.circle-button{
			position: relative;
			cursor: pointer;
			width: 90px;
			float:left;	
			height:20px;
			line-height: 20px;
			text-align: center;
			background: #FFFFFF;
			border:1px solid  #E6E6E6;
			border-radius: 10px;
			span{
				font-size:12px;
				color:#666666;
			}
			.el-icon-caret-bottom{
				&:before{
					color:#E6E6E6;
					font-size: 11px;
				}
			}
			.el-icon-caret-top{
				&:before{
					color:#E6E6E6;
					font-size:11px;
				}
			}
			.loading-center{
		        position: absolute;
			    left: 18%;
			    bottom: 29%;
			    width: 90px;
			}
			.circle{
				width: 6px;
				height: 6px;
				background-color: #0C9AFF;
				float: left;
				margin-right: 20px;
				-moz-border-radius: 50% 50% 50% 50%;
				-webkit-border-radius: 50% 50% 50% 50%;
				border-radius: 50% 50% 50% 50%;
			}
			
			.circle1{
			
				
				animation: object_one 1.5s infinite;
			
			
			}
			.circle2{
			
				
				animation: object_two 1.5s infinite;
				animation-delay: .75s;
			
			}
			
			.circle3{
			
				animation: object_three 1.5s infinite;
				animation-delay: 1.5s;
			
			}
			
			
				@keyframes object_one {
				
				 25% {
				  	transform: translate(11px,0px);
				  }			
				  50% { 
				    transform: translate(0px,0px);
				  }
				  75%{
				  	 transform: translate(-11px,0px);
				  }
				  100%{
				  	transform: translate(0px,0px);
				  } 
				}  
				@keyframes object_two {
				
				 25% {
				  	transform: translate(11px,0px);
				  }			
				  50% { 
				    transform: translate(0px,0px);
				  }
				  75%{
				  	 transform: translate(-11px,0px);
				  }
				  100%{
				  	transform: translate(0px,0px);
				  } 
				}  
				@keyframes object_three {
				
				 25% {
				  	transform: translate(11px,0px);
				  }			
				  50% { 
				    transform: translate(0px,0px);
				  }
				  75%{
				  	 transform: translate(-11px,0px);
				  }
				  100%{
				  	transform: translate(0px,0px);
				  } 
				}  
			}
			
		}
	.form_hr{
		margin-left:30px;
		width:90%;
		height:1px;
		border:none;
		border-top:1px dashed #EAF1F6;
		margin-bottom: 15px;
	}
	.circle-form{
		margin-top: 20px;
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
	.circle-form-item{
		margin-left: 40px;
		.el-form-item{
			.el-form-item__content{
				.el-form-item__error{
					margin-left: 40px;
				}
			}
		}
		.el-checkbox{
			display: block;
		    float: left;
		    width: 200px;
		}
		span{
			
		}
		
	}
	.circle_report{
		margin-left: 20px;
		height: 50px;
		line-height: 50px;
		margin-right: 20px;
		li{ 
			margin-top: 10px;
			height: 30px;
		    line-height: 30px;
	       	padding: 0 14px;
	       	border: 1px solid #D8E5EC;		
			float: left;
			list-style: none;
			cursor:pointer;
			
			&:nth-of-type(1){
				border-right: 0;
			}
			&:nth-of-type(2){
				border-right: 0;
			}				
		}		
	}
	.circle_table{
		margin-left: 20px;
		margin-right: 20px;
	}
	
}
	


</style>