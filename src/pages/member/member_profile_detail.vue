<template>
	<div class='memberlist' v-loading.body = 'loadingBody'>
		<el-popover
			ref="popover"
			placement="right"
			width="100%"
			trigger="hover">
			<el-table :data="gridData" height="250" element-loading-text="给我一点时间" empty-text='暂无任何数据'>
				<el-table-column width="100" align="left" property="name" label="会员等级"></el-table-column>
				<el-table-column width="100" align="left" property="type" label="修改人"></el-table-column>
				<el-table-column width="150" align="left" property="last_updatetime" label="修改时间"></el-table-column>
			</el-table>
		</el-popover>
		<el-dialog size='table' custom-class="cxyhqdialog"  :title="'可用优惠券('+total+')张'" :visible.sync="dialogcoupon">
		  	 <el-table v-loading="loading_coupons" :data="couponData">		  	 	
			    <el-table-column prop="activity_subject" column-key='activity_subject' label="券名称" width="130"></el-table-column>
			    <el-table-column prop="coupons_code" column-key="coupons_code" label="券号" width="150"></el-table-column>
			    <el-table-column prop="chanel_name" column-key="chanel_name" label="领取渠道"  width="110"></el-table-column>
			    <el-table-column prop="start_coupon" column-key="start_coupon" label="获得时间"  width="150">
			    	<template scope="scope">
						{{scope.row.start_coupon | dateFilter}}
					</template>						    	
			    </el-table-column>
			      <el-table-column prop="end_coupon" column-key="end_coupon" label="过期时间"  width="150">
			    	<template scope="scope">
						{{scope.row.end_coupon | dateFilter}}
					</template>		
			    </el-table-column>
		  	</el-table>
		  	 <div class="pagination-container" v-if='couponData.length>0'>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.rows" layout="prev, pager, next,total, jumper,sizes" :total="total">
				</el-pagination>
			</div>		 
		</el-dialog>
		<!-- 编辑手机号弹框 -->
		<el-dialog title="编辑手机号" :visible.sync="phoneEditDialog" center custom-class="mobildialog">
			<el-form :model="mobilForm" ref="mobilForm" :rules="mobilrule" style="padding-top:20px;">
				<el-form-item label="原手机号：" label-width="100px">
					<el-select v-model="mobilForm.oldMobil" placeholder="请选择" >
						<el-option
							v-for="item in mobilOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="新手机号：" label-width="100px" prop="newMobil">
					<el-input v-model="mobilForm.newMobil" placeholder="请输入新手机号" style="width:175px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="phoneEditDialog = false">取 消</el-button>
				<el-button :loading="loading_mobile" type="primary" @click="onsubmit('mobilForm')">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 编辑会员等级编辑弹框 -->
		<el-dialog title="编辑会员等级" :visible.sync="gradeEditDialog" center custom-class="gradedialog">
			<el-form :model="gradeForm" ref="gradeForm" :rules="graderule" style="padding-top:20px;">
				<el-form-item label="原等级：" label-width="100px">
					<span>{{member.levelname}}</span>
				</el-form-item>
				<el-form-item label="新等级：" label-width="100px" prop="newGrade">
					<el-select v-model="gradeForm.newGrade" placeholder="请选择" >
						<el-option
							v-for="item in gradeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="变更原因：" label-width="100px" prop="reason">
					<el-input  type="textarea" autosize v-model="gradeForm.reason" placeholder="请输入变更原因" style="width:175px;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="gradeEditDialog = false">取 消</el-button>
				<el-button :loading="loading_grade" type="primary" @click="submit('gradeForm')">确 定</el-button>
			</div>
		</el-dialog>
		
		<div class='membertitle'>
			<span>会员信息</span>
			<div style='display: inline-block;float: right;'>
				<img @click='initPassword' src='../../assets/member/initpassword.png' style='width:91px;height: 16px;margin-right:13px;' />
				<img @click='updateMemberMessage' src='../../assets/member/update.png' style='width:49px;height: 16px;' />
			</div>
		</div>
		<div v-loading="loading_membermessage" class='membermessage' ref='membermessage'>
			<div class='membermessageleft'>
				<div class='memberheader'>
					<img src="../../assets/member/memberheader.png" style='width: 80px;height: 80px;' />
					<span>{{member.name}}</span>
					<em style="position:relative;">{{member.mobil}}
						<img @click='editmembermobile' src='../../assets/member/update.png' style='width:49px;height: 16px;position:absolute;top:5px;' />
					</em>	
				</div>
				<div class='membermiddle'>
					<ul>
						<li>
							<el-tooltip class="item" effect="dark" content="星座" placement="top-start">
								<img src='../../assets/member/constellation.png' style='width:22px;height: 22px;' />
							</el-tooltip>							
							<span style='display: block;'>{{constellationFilter(member.constellation)}}</span>
						</li>
						<li>
							<el-tooltip class="item" effect="dark" content="年龄" placement="top-start">
								<img src='../../assets/member/age.png' style='width:22px;height: 22px;' />
							</el-tooltip>							
							<span style='display: block;'>{{member.age | isNotNullFilter}}</span>
						</li>
						<li>
							<el-tooltip class="item" effect="dark" content="学历" placement="top-start">
								<img src='../../assets/member/education.png' style='width:22px;height: 22px;' />
							</el-tooltip>							
							<span style='display: block;'>{{educationFilter(member.education)}}</span>
						</li>
					</ul>

				</div>
				<div class='messageaddress'>
						<el-tooltip class="item" effect="dark" content="收货地址" placement="top-start">
							<img src='../../assets/member/address.png' />
						</el-tooltip>
                    	<span v-if='member.address==null||member.address.length==0'>--</span>
						<span v-for='item in member.address'>{{item.detail | isNotNullFilter}}</span>	
                
									
				    <div class='memberlabel'>
						<div class='memberlabeldetail'>
							<div class='memberlabeldetailleft'><span>年龄段:</span><em>{{ageGroupFilter(member.age_group)}}</em></div>
							<div class='memberlabeldetailright'><span>城市:</span><em>{{cityFilter(member.city)}}</em></div>
						</div>
						<div class='memberlabeldetail'><span>邮箱:</span><em>{{member.email | isNotNullFilter}}</em></div>
						<div class='memberlabeldetail'><span>QQ:</span><em>{{member.qq | isNotNullFilter}}</em></div>
					</div>
				</div>
				

			</div>
			<div class='membermessageright'>
				<div class='messagerighttop'>
					<div class='messagecard'>
						<div class='messagecardleft'>
							<div class='messagecardmessage'><span>会员卡号:</span><em>{{member.code | isNotNullFilter}}</em></div>
							<div class='messagecardmessage' style="position:relative;">
								<span style="float:left">会员等级:</span><em style="float:left;line-height:30px;margin-right:5px;">{{member.levelname | isNotNullFilter}}</em>
								<div style="position:relative;float:left;">
									<icon-svg icon-class='question' v-popover:popover></icon-svg>
									<!-- <tzx-tag @clickThis="gradeEditDialog = true" cursor='pointer' color="#0C9AFF" style="margin-left:-5px;font-size:14px;">编辑</tzx-tag> -->
									<img @click='editmembergrade' src='../../assets/member/update.png' style='width:49px;height: 16px;position:absolute;left:15px;top:7px;'/>
								</div>
							</div>
							<div class='messagecardmessage'><span>会员状态:</span><em>{{member.valid_state | stateFilter}}</em></div>
							<div class='messagecardmessage'><span>关注状态:</span><em>{{member.state | isNotNullFilter}}</em></div>
						</div>
						<div class='messagecardright'>
							<div class='messagecardmessage'><span>所属品牌:</span><em>{{tenancyId }}</em></div>
							<div class='messagecardmessage'><span>入会时间:</span><em>{{member.add_time | isNotNullFilter}}</em></div>
							<div class='messagecardmessage'><span>入会门店:</span><em>{{member.fullname | isNotNullFilter}}</em></div>
							<div class='messagecardmessage'><span>入会渠道:</span><em>{{chanelFilter(member.add_chanel)}}</em></div>
						</div>
					</div>

				</div>
				<div class='messagerighttop' style='height: 98px;'>
					<div class='messagecard'>
						<div class='messagecardleft'>
							<div class='messagecardmessage'><span>消费总额:</span><em>{{ member.total_cost | currency}}</em></div>
							<div class='messagecardmessage'><span>消费次数:</span><em>{{member.consumptioncount | isNotNullFilter}}</em></div>
							<div class='messagecardmessage'><span>最后消费时间:</span><em>{{member.operatetime | isNotNullFilter}}</em></div>
						</div>
						<div class='messagecardright'>
							<!--<div class='messagecardmessage'><span>所属团队:</span><em>大明星团对</em></div>-->
							<!--<div class='messagecardmessage'><span>拉动入会人数</span><em>{{}</em></div>-->
						</div>
					</div>

				</div>

			</div>

		</div>
		<div class='membermore' >
			<span @click="showMore" v-show = '!showorhide'>更多<i class='el-icon-dropdown'></i></span>
			<span @click="hideMessage" v-show = 'showorhide'>收起<i class='el-icon-dropup'></i></span>
		</div>
		<div class='padding' > </div>
		<div class='membertitle'>
			<span>会员资产</span>
		</div>
		<div v-loading='loading_membermessage' class='memberasset'>
			<ul>			
				<li v-for='(member,index) in memberMessages'> 
					<div class='memberassetleft'>
						<img :src='member.src' style='width: 36px;height: 36px;' />
					</div>
					<div class='memberassetright'>
						<span>{{member.text}}</span>
						<em></em>
						<em v-if='member.text.indexOf("金额")!=-1'>{{member.total | thousand | currency}} </em>				
						<em v-else-if='member.text.indexOf("累计充值")!=-1'>{{member.total | thousand | currency  }} </em>				
						<em v-else-if='member.text.indexOf("储值余额")!=-1'>{{member.total }} </em>	
						<em v-else-if='member.text.indexOf("积分")!=-1'>{{member.total | thousand }} </em>		
						<em v-else>{{member.total | thousand}} <strong  @click='showCounpons' style='width:80px;margin-left:20px;cursor:pointer;color:#0C9AFF;font-size: 14px;' v-if='index==memberMessages.length-1&&member.total>0'>查看优惠券</strong></em>				
					</div>
				</li>				
			</ul>
		</div>
		<div class='padding' > </div>
		<div class='membertitle'>
			<span>历史账单</span>
		</div>
		<div   v-loading='loadingtable'  class='memberdetailmessage'>
		
			
			<div class='memberdetailsearch'>
				<ul>
					<li style='background:#D8E5EC;' ref='custom' @click="switchTabs('custom')">消费</li>
					<li style='background:#FFFFFF;' ref='store' @click="switchTabs('store')">储值</li>
					<li style='background:#FFFFFF;' ref='credit' @click="switchTabs('credit')">积分</li>
					<li style='background:#FFFFFF;' ref='coupon' @click="switchTabs('coupon')">优惠券</li>
				</ul>
				<el-input  placeholder="请输入流水号"  icon="search" v-model="card_code" size='small' style='float:right;width:200px' :on-icon-click="handleIconClick">
				  </el-input>
				<!--  <el-input  placeholder="入会时间由近到远"  icon="search" v-model="input" size='small' style='float:right;width:200px':on-icon-click="handleIconClick">
				  </el-input>-->
			</div>
			<div class='memberdetailtable'>
				<div style='display: block;'  ref='customdiv' >
					<el-table  empty-text='暂无任何数据'  :data="tableData_custom" style="width: 100%">
				      <el-table-column :formatter="isNotNullFormat" prop="bill_code" label="流水号" min-width="100"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat" header-align='center' align='center' prop="operat_type" label="类型" min-width="100">
				      	<template scope="scope">
							{{scope.row.operat_type | valueFilter}}
						</template>
				      	
				      </el-table-column>
				      <el-table-column :formatter="isNotNullFormat"  prop="org_full_name" label="门店" min-width="100"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat"  prop="last_updatetime" label="交易时间" min-width="190"></el-table-column>
				      <el-table-column :formatter="toDecimal2Format" header-align='right' align='right' prop="store_bill" label="账单金额" min-width="100">
				      	<template scope ='scope'>
				      		{{scope.row.store_bill|currency}}					
				      	</template>	
				      </el-table-column>
				      <el-table-column :formatter="isNotNullFormat"  header-align='center' align='center'  label="状态" min-width="70">
				      	<template scope ='scope'>
				      		<tzx-tag  cursor='default' color="#4ECF88" >成功</tzx-tag>											
				      	</template>	
				      	
				      </el-table-column>
<!--				      <el-table-column :formatter="toDecimal2Format" prop="drawback_money" header-align='right' align='right' sortable label="退款总额" min-width="100"></el-table-column>-->
				      <el-table-column :formatter="isNotNullFormat"  header-align='center' align='center' prop="chanel"  label="渠道" min-width="100"></el-table-column>
				      <el-table-column :formatter="toDecimal2Format" prop="drawback_service_money" header-align='right' align='right'   label="退服务费" min-width="120"></el-table-column>				    
				       <el-table-column label="终端/操作员" min-width="120">			    
				      	<template scope ='scope'>
				      		<tzx-tag  cursor='default' color="#0C9AFF" >{{scope.row.shift}}</tzx-tag>
							<tzx-tag  cursor='default' color="#0C9AFF" >{{scope.row.operator}}</tzx-tag>							
				      	</template>			      	
			      	 </el-table-column>			         			    
			    </el-table>
			    <div class="pagination-container" v-if='tableData_custom.length>0&&total_custom>10'>
					<el-pagination @size-change="handleSizeChange_custom" @current-change="handleCurrentChange_custom" :current-page.sync="listQuery_custom.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery_custom.rows" layout="prev, pager, next,total, jumper,sizes" :total="total_custom">
					</el-pagination>
				</div>
				</div>
				<div style='display: none;'  ref='storediv' >
					<el-table  empty-text='暂无任何数据'  :data="tableData_store" style="width: 100%">
				      <el-table-column :formatter="isNotNullFormat" prop="bill_code" label="流水号" min-width="100"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat"  prop="card_code" label="会员卡号" min-width="100"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat" header-align='center' align='center' prop="operat_type" label="类型" min-width="100">
				      	<template scope="scope">
							{{scope.row.operat_type | valueFilter}}
						</template>				      	
				      </el-table-column>
				      <el-table-column :formatter="isNotNullFormat"  prop="last_updatetime" label="交易时间" min-width="120"></el-table-column>
				      <el-table-column :formatter="toDecimal2Format" header-align='right' align='right' prop="store_bill" label="交易金额" min-width="100">
						  <template scope ='scope'>
				      		{{scope.row.store_bill|currency}}					
				      	</template>	
					  </el-table-column>
				      <el-table-column :formatter="toDecimal2Format" header-align='right' align='right' prop="store_gift_bill" label="赠送金额" min-width="100">
						  <template scope ='scope'>
				      		{{scope.row.store_gift_bill|currency}}					
				      	</template>	
					  </el-table-column>
				      <el-table-column :formatter="isNotNullFormat" header-align='center' align='center' prop="state"   label="状态" min-width="100">
				      	<template scope ='scope'>
				      		<tzx-tag cursor='default' color="#4ECF88" >成功</tzx-tag>											
				      	</template>	
				      </el-table-column>
<!--				      <el-table-column :formatter="toDecimal2Format" header-align='right' align='right' prop="drawback_money" sortable label="退款总额(￥)" min-width="120"></el-table-column>-->
				      <el-table-column     label="终端/操作员" min-width="120">			    
				      	<template scope ='scope'>
				      		<tzx-tag cursor='default' color="#0C9AFF" >{{scope.row.shift}}</tzx-tag>
							<tzx-tag cursor='default' color="#0C9AFF" >{{scope.row.operator}}</tzx-tag>
							
				      	</template>
			      	
			      	  </el-table-column>
				 
			    
			    </el-table>
			    <div class="pagination-container" v-if='tableData_store.length>0&&total_store>10'>
					<el-pagination @size-change="handleSizeChange_store" @current-change="handleCurrentChange_store" :current-page.sync="listQuery_store.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery_store.rows" layout="prev, pager, next,total, jumper,sizes" :total="total_store">
					</el-pagination>
				</div>
				</div>
				<div style='display: none;' ref='creditdiv' >
					<el-table  empty-text='暂无任何数据'  :data="tableData_credit" style="width: 100%">
				      <el-table-column :formatter="isNotNullFormat" prop="bill_code" label="流水号" min-width="100"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat" header-align='center' align='center' prop="type" label="类型" min-width="100"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat"  prop="reason" label="原因" min-width="120"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat"  prop="org_full_name" label="门店" min-width="100"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat"  prop="last_updatetime" label="交易时间" min-width="150"></el-table-column>
				      <el-table-column :formatter="isNotNullFormat" header-align='right' align='right' prop="credit_amount" label="交易积分" min-width="100"></el-table-column>
				      <el-table-column :formatter="toDecimal2Format" header-align='right' align='right' prop="credit_bill" label="积分金额" min-width="110">
						  <template scope ='scope'>
				      		{{scope.row.credit_bill|currency}}					
				      	</template>
					  </el-table-column>
				      
				       <el-table-column :formatter="isNotNullFormat" header-align='center' align='center' prop="state" label="状态" min-width="100">
				       	<template scope ='scope'>
				      		<tzx-tag  cursor='default' color="#4ECF88" >成功</tzx-tag>											
				      	</template>	
				       </el-table-column>
				      
<!--				      <el-table-column :formatter="isNotNullFormat"  header-align='right' align='right' prop="drawback_credit" label="退款总额(分)" min-width="110"></el-table-column>-->
				     
				     <el-table-column     label="终端/操作员" min-width="120">			    
				      	<template scope ='scope'>
				      		<tzx-tag  cursor='default' color="#0C9AFF" >{{scope.row.shift}}</tzx-tag>
							<tzx-tag  cursor='default' color="#0C9AFF" >{{scope.row.operator}}</tzx-tag>							
				      	</template>			      	
			      	  </el-table-column>
				   
			    
			    </el-table>
			    <div class="pagination-container" v-if='tableData_credit.length>0&&total_credit>10'>
					<el-pagination @size-change="handleSizeChange_credit" @current-change="handleCurrentChange_credit" :current-page.sync="listQuery_credit.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery_credit.rows" layout="prev, pager, next,total, jumper,sizes" :total="total_credit">
					</el-pagination>
				</div>
				</div>
				<div style='display: none;' ref='coupondiv' >
					<el-table  empty-text='暂无任何数据'  :data="tableData_coupon" style="width: 100%">
				      <el-table-column  :formatter="isNotNullFormat" prop="bill_code" label="流水号" min-width="100"></el-table-column>
				      <el-table-column  :formatter="isNotNullFormat"  prop="coupons_code" label="券号" min-width="100"></el-table-column>				      				      
				      <el-table-column  :formatter="isNotNullFormat" header-align='center' align='center' prop="coupons_pro" label="类型" min-width="100">
				      	<template scope ='scope'>
				      	  {{scope.row.coupons_pro | couponType}}					
				      	</template>	
				      	
				      </el-table-column>
				      <el-table-column  :formatter="isNotNullFormat"  prop="org_full_name" label="门店" min-width="110"></el-table-column>
				      <el-table-column  :formatter="isNotNullFormat" prop="last_updatetime" label="交易时间" min-width="110"></el-table-column>
				      <el-table-column  :formatter="isNotNullFormat"  prop="coupon_name" label="券名称" min-width="110"></el-table-column>			      
				      <el-table-column  :formatter="isNotNullFormat" header-align='center' align='center' prop="state" label="状态" min-width="100">
				      	<template scope ='scope'>
				      		<tzx-tag cursor='default' color="#4ECF88" >成功</tzx-tag>											
				      	</template>	
				      </el-table-column>				     
				     <el-table-column   header-align='right' align='right'   label="终端/操作员" min-width="120">			    
				      	<template scope ='scope'>
				      		<tzx-tag  cursor='default' color="#0C9AFF" >{{scope.row.shift}}</tzx-tag>
							<tzx-tag  cursor='default' color="#0C9AFF" >{{scope.row.operator}}</tzx-tag>							
				      	</template>			      	
			      	 </el-table-column>			    
			    </el-table>
			    <div class="pagination-container" v-if='tableData_coupon.length>0&&total_coupon>10'>
					<el-pagination @size-change="handleSizeChange_coupon" @current-change="handleCurrentChange_coupon" :current-page.sync="listQuery_coupon.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery_coupon.rows" layout="prev, pager, next,total, jumper,sizes" :total="total_coupon">
					</el-pagination>
				</div>
				</div>
				
			</div>
		</div>

	</div>
	
	
</template>

<script>
	import {membera,memberb,memberc,memberd,membere,memberf,memberg,memberh} from '@/assets/member';
	/*import {getAllCoupons} from '@/api/article';*/
	import { getMemberDetails,findHistoryMemberMessage,getAllCoupons,initPassword,findAllCustomerMobil,updateMobil,findAllLevel,saveCrmLevel,findAllCustomerLevelHistory} from  '@/api/member';
	import {getCities,getsysParamer} from '@/api/parameter'
	import { TzxTag } from '@/components/tag';
	
	export default {
		components: {
			TzxTag
		},
		data() {
			var validatemobil = (rule, value, callback)=> {//自定义验证手机号
				var MobileRegex = /^1[3|4|5|7|8][0-9]\d{8}$/;
				if(!MobileRegex.test(value)) {
					callback(new Error('手机号码格式不正确！'))
				} else {
					callback();
				}
			}
			return {
				phoneEditDialog: false,//编辑手机弹框
				mobilForm: {//编辑手机号表单
					oldMobil: '',//原手机号
					newMobil: ''//新手机号
				},
				gradeEditDialog: false,
				gradeForm: {//编辑会员等级
					oldGrade: '',//原等级
					newGrade: '',//新等级
					reason: ''//变更原因
				},
				mobilOptions: [],//手机号历史列表
				gradeOptions: [],//会员等级列表
				gridData: [],//会员等级修改历史列表信息
				tenancyId:this.$store.state.user.tenancyid,
				loadingBody:false,
				tab:'custom',
				card_code:'',
				couponData: [],
				listQuery: {
					page: 1,
					rows: 10,				
					sort: 'id',
					order: 'desc'
				},
				loading_mobile: false,
				loading_grade: false,
				loadingtable:false,
				loading_coupons:false,
				total:'',
				total_custom:0,
				total_store:0,
				total_credit:0,
				total_coupon:0,
		        dialogcoupon:false,
				tableData_custom: [],
			
				listQuery_custom: {
					page: 1,
					rows: 10,				
					sort: 'id',
					order: 'desc',
					card_code:'',
				},
				tableData_store: [],
			
				listQuery_store: {
					page: 1,
					rows: 10,				
					sort: 'id',
					order: 'desc',
					card_code:'',
				},
				tableData_credit: [],
			
				listQuery_credit: {
					page: 1,
					rows: 10,					
					sort: 'id',
					order: 'desc',
					card_code:'',
				},
				tableData_coupon: [],
			
				listQuery_coupon: {
					page: 1,
					rows: 10,					
					sort: 'id',
					order: 'desc',
					card_code:'',
				},
				loading_membermessage:false,
				showorhide:false,
				member:{},
				member_id:'',
				memberMessages:[
				{src:memberf,text:'储值余额',total:0, id:'concat'},
				{src:membera,text:'累计充值',total:0, id:'maintrading'},
				{src:memberh,text:'累计使用储值金额',total:0, id:'mainbalance'},
				{src:memberc,text:'积分余额',total:0, id:'useful_credit'},
				{src:memberg,text:'累计使用积分',total:0, id:'total_credit'},
				{src:memberd,text:'可用优惠券',total:0, id:'couponscount'} 
				],
				filterMemberChanel:[],
				cities:[],
				constellations:[],
				ageGroup:[],
				educations:[],
				graderule: {
					newGrade: [
						{ required: true, message: '请选等级', trigger: 'change' }
					],
					reason: [
						{ required: true, message: '请填写变更原因', trigger: 'blur' }
					]
				},
				
				mobilrule: {
					newMobil: [
						{ required: true, message: '请填写手机号', trigger: "blur"},
						// { pattern: /^1[3|4|5|7|8]\d{9}$/, message: '手机号格式不正确'}
						{ validator: validatemobil, trigger: 'blur' }
					]
				}
			}
		},
		filters: {
			
			valueFilter(value) {
				const statusMap = {
					'02': '充值',
					'03': '消费',
					'04': '反充值',
					'05': '反消费',
					null: '--'
				
				}
				return statusMap[value]
			},
			stateFilter(value) {
				const statusMap = {
					'0': '停用',
					'1': '正常',								
				}
				return statusMap[value]
			},
			couponType(value){
					const statusMap = {
					'coupons_dish': '菜品券',
					'coupons_deduct': '代金券',								
				}
				return statusMap[value]
			}
		},
		
		methods: {
			editmembermobile() {//查询会员手机号
				this.phoneEditDialog = true;
				let id = this.$route.query.id;
				let data = 'customer_id=' + id
				findAllCustomerMobil(data).then(res=> {
					if(res.success == true) {
						let list = res.list;
						let opt = [];
						list.forEach(item=> {
							let obj = {};
							obj.value = item.id;
							obj.label = item.old_mobil;
							opt.push(obj);
						});
						this.mobilOptions = opt;
						this.mobilForm.oldMobil = this.member.mobil;
					}else {
						this.$message({
							type: 'error',
							message: e.msg
						})
					}					
				})
				.catch(e=> {
					this.$message({
						type: 'error',
						message: e.msg
					})
				})
			},
			editmembergrade() {//查询会员等级gradeOptions
				this.gradeEditDialog = true;
				findAllLevel().then(res=> {
					let opt = [];
					res.data.forEach(item=> {
						let obj = {};
						obj.value = item.id + '';
						obj.label = item.name;
						opt.push(obj);
					});
					this.gradeOptions = opt;
				})

			},
			submit(gradeForm) {
				this.$refs[gradeForm].validate((valid) => {
					if (valid) {
						this.loading_grade = true;
						let data = "customer_id=" + this.member.id +
									"&level_id=" + this.gradeForm.newGrade +
									"&reason=" + this.gradeForm.reason
						//--------------------------发送请求
						saveCrmLevel(data).then(res=> {
							if(res.success == true) {
								this.gradeEditDialog = false;
								this.loading_grade = false;
								// this.$router.push({
								// 	path: '/member/member_profile_detail',
								// 	query: {
								// 		id: this.member_id
								// 	}
								// })
								this.getMemberDetails(this.$route.query.id);
								this.$refs[gradeForm].resetFields(); 
							}else {
								this.$message({
									type: 'error',
									message: res.msg
								});
								this.loading_grade = false;								
							}
						})
						.catch(e=> {
							this.$message({
								type: 'error',
								message: e.msg
							})
							this.loading_grade = false;
						})
					} else {
						return false;
					}
        		});
			},
			onsubmit(mobilForm) {
				this.$refs[mobilForm].validate((valid) => {
					if (valid) {
						this.loading_mobile = true;
						let data = "customer_id=" + this.member_id +
									"&old_mobil=" + this.member.mobil + 
									"&new_mobil=" + this.mobilForm.newMobil
						//--------------------------发送请求						
						updateMobil(data).then(res=> {//修改手机号
							if(res.success == true) {
								this.phoneEditDialog = false;
								this.loading_mobile = false;
								this.mobilForm.oldMobil = '';
								this.$refs[mobilForm].resetFields(); 
								this.getMemberDetails(this.$route.query.id);
								//待定-----------------------------------------------待定功能
							}else {
								this.$message({
									type: 'error',
									message: res.msg
								})
								this.loading_mobile = false;
							}						
						})
						.catch(e=> {
							this.$message({
								type: 'error',
								message: e.msg
							})
							this.loading_mobile = false;
						})						
					} else {
						return false;
					}
        		});
			},
			updateMemberMessage(){
				this.$router.push({
					path: '/member/member_profile_update',
					query: {
						id: this.member_id
					}
				})
			},
			initPassword(){//初始化密码
				_czc.push(["_trackEvent", "会员中心-会员档案-会员档案详情", "初始化密码"]);//埋点统计
				if(this.member_id==''||this.member_id==null){
					this.$message({
						type:'error',
						messsage:'获取不到当前会员的信息,刷新重试！'
					})
					return
				}
				this.$confirm('初始化密码, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						let message = "id="+this.member_id;
						this.loadingBody = true;
						initPassword(message).then(response=>{
						this.loadingBody = false;
						if(response.success==true){
							this.$message({
								type:'success',
								message:'初始化密码成功!'
							})
						}
						else{
							this.$message({
								type:'error',
								message:'初始化密码失败!'
							})
						}
					}).catch(e=>{
						this.loadingBody = false;
						this.$message({
							type:'error',
							message:e
						})
					});
					})
				
			},
			chanelFilter(key){		
				if(key==''||key==null||key==undefined){
					return ''
				}
				else{
					let fliterMaps = this.filterMemberChanel.filter(item=>key==item.id);
					if(fliterMaps.length==0){
						return key;
					}
					else{
						return fliterMaps[0].text;
					}
					
				}
				
			},
			cityFilter(key){

				if(key==''||key==null||key==undefined){
					return ''
				}
				else{
					let fliterMaps = this.cities.filter(item=>key==item.id);
					if(fliterMaps.length==0){
						return key;
					}
					else{
						return fliterMaps[0].text;
					}	
				}
			},
			constellationFilter(key){				
				if(key==''||key==null||key==undefined){
					return ''
				}				
				else{
					let fliterMaps = this.constellations.filter(item=>key==item.id);
					if(fliterMaps.length==0){
						return key;
					}
					else{
						return fliterMaps[0].text;
					}					
				}								
			},
			ageGroupFilter(key){			
				if(key==''||key==null||key==undefined){
					return ''
				}
				else{
					let fliterMaps = this.ageGroup.filter(item=>key==item.id);
					if(fliterMaps.length==0){
						return key;
					}
					else{
						return fliterMaps[0].text;
					}					
				}								
			},
			educationFilter(key){
		
				if(key==''||key==null||key==undefined){
					return ''
				}
				else{
					let fliterMaps = this.educations.filter(item=>key==item.id);
					if(fliterMaps.length==0){
						return key;
					}
					else{
						return fliterMaps[0].text;
					}
					
				}
			},
			/*点击搜索按钮*/
			 handleIconClick(ev) {
			 	this.listQuery_custom.card_code = this.card_code;
			 	this.listQuery_store.card_code = this.card_code;
			 	this.listQuery_credit.card_code = this.card_code;
			 	this.listQuery_coupon.card_code = this.card_code;
			 	this.listQuery_custom.page = 1
			 	this.listQuery_store.page = 1
			 	this.listQuery_credit.page = 1
			 	this.listQuery_coupon.page = 1
			 	this.switchTabs(this.tab);
    		},
			handleSizeChange(val){
				this.listQuery.rows = val
			    this.getCoupons()
			},
			handleCurrentChange(val){
				this.listQuery.page = val
				this.getCoupons()
			},
			handleSizeChange_custom(val){
				this.listQuery_custom.rows = val
			   	this.switchTabs('custom');
			},
			handleCurrentChange_custom(val){
				this.listQuery.page = val
				this.switchTabs('custom');
			},
			handleSizeChange_store(val){
				this.listQuery_store.rows = val
			    this.switchTabs('store');
			},
			handleCurrentChange_store(val){
				this.listQuery_store.page = val
				this.switchTabs('store');
			},
			handleSizeChange_credit(val){
				this.listQuery_credit.rows = val
			    this.switchTabs('credit');
			},
			handleCurrentChange_credit(val){
				this.listQuery_credit.page = val
			    this.switchTabs('credit');
			},
			handleSizeChange_coupon(val){
				this.listQuery_coupon.rows = val
			    this.switchTabs('coupon');
			},
			handleCurrentChange_coupon(val){
				this.listQuery_coupon.page = val
			    this.switchTabs('coupon');
			},
			
			getMemberDetails(id) {
				this.member_id = id;
				let param = 'id='+id;
				this.loading_membermessage = true;	
				let data = "customer_id=" + id;
				findAllCustomerLevelHistory(data).then(res=> {
					this.gridData = res.rows;
					//未完整待处理修改人问题************************************************
				})
				.catch(e=> {
					this.$message({
						type: 'error',
						message: e.msg
					})
				})		
				getMemberDetails(param).then(response=>{
					this.loading_membermessage = false;
					if(response.success==true){
						this.member = response;
						if(this.member.fullname == null || this.member.fullname == '') {
							this.member.fullname = '总部';
						}
						this.memberMessages.map((item,index)=>{
							if(item.id =='concat' ){
								item.total = response.concat
							}
							if(item.id =='maintrading' ){
								item.total = response.maintrading
							}
							if(item.id =='mainbalance' ){
								item.total = response.mainbalance
							}
							if(item.id =='useful_credit' ){
								item.total = response.useful_credit
							}
							if(item.id =='total_credit' ){
								item.total = response.total_credit
							}
							if(item.id =='couponscount' ){
								item.total = response.couponscount
							}							
						});
						console.log(JSON.stringify(this.memberMessages));
					}
				}).catch(e=>{
					this.loading_membermessage = false;
				})
				this.switchTabs('custom');
			},
			
			showMore(){
				this.showorhide = true;
				this.$refs.membermessage.style.height = this.$refs.membermessage.scrollHeight+'px'				
			},
			hideMessage(){
				this.showorhide = false;
				this.$refs.membermessage.style.height = '260px'
				
			},
			showCounpons(){
				this.dialogcoupon = true ;
				this.getCoupons();
			},
			getCoupons(){
				this.loading_coupons =true;
				let message = 'mobile='+this.member.mobil+
				              '&page='+this.listQuery.page+
				              '&rows='+this.listQuery.rows;
				getAllCoupons(message).then(response=>{			
					this.loading_coupons = false;
					this.couponData = response.list;
					this.total = response.count;
					
				});	
			},
			findHistoryMemberMessage(item,tab){
				let type = '';
				switch(tab) {					
					case 'custom':
						type = '1'
						break;
					case 'store':
						type = '2'
						break;	
					case 'credit':
						type = '3'
						break;	
					case 'coupon':
						type = '4'
						break;		
					default : 
						type = '0'
						break;
				}		
				let message = 'type='+type+
				              '&baseId='+this.member_id+
				              '&rows='+item.rows+
				              '&page='+item.page+
				              '&sort='+item.sort+
				              '&order='+item.order+
				              '&bill_code='+item.card_code
				              ;
				this.loadingtable = true;
				findHistoryMemberMessage(message).then(response=>{
					this.loadingtable = false;	
					if(response.success == true){						
						switch(tab) {					
							case 'custom':		
							    _czc.push(["_trackEvent", "会员中心-会员档案-会员档案详情", "消费明细"]);//埋点统计
				                this.total_custom = response.total
								this.tableData_custom = response.rows;
								break;
							case 'store':
							    _czc.push(["_trackEvent", "会员中心-会员档案-会员档案详情", "储值明细"]);//埋点统计
							 	this.total_store = response.total
								this.tableData_store = response.rows;
								break;	
							case 'credit':
								_czc.push(["_trackEvent", "会员中心-会员档案-会员档案详情", "积分明细"]);//埋点统计
								this.total_credit = response.total
								this.tableData_credit = response.rows;
								break;	
							case 'coupon':
								_czc.push(["_trackEvent", "会员中心-会员档案-会员档案详情", "优惠券明细"]);//埋点统计
								this.total_coupon = response.total
								this.tableData_coupon = response.rows;
								break;		
							default : break;
						}
					}	
				}).catch(e=>{
					this.loadingtable = false;
				});
				
			},
			switchTabs(tab){
				this.tab = tab;						
				if(tab=='custom'){		
					this.findHistoryMemberMessage(this.listQuery_custom,tab)  										
					this.$refs.custom.style.background ='#D8E5EC'
					this.$refs.store.style.background ='#FFFFFF'
					this.$refs.credit.style.background ='#FFFFFF'
					this.$refs.coupon.style.background ='#FFFFFF'
					this.$refs.customdiv.style.display ='block';
					this.$refs.storediv.style.display ='none';
					this.$refs.creditdiv.style.display ='none';
					this.$refs.coupondiv.style.display ='none';
				}
				else if(tab == 'store'){
					this.findHistoryMemberMessage(this.listQuery_store,tab) 
					this.$refs.custom.style.background ='#FFFFFF'
					this.$refs.store.style.background ='#D8E5EC'
					this.$refs.credit.style.background ='#FFFFFF'
					this.$refs.coupon.style.background ='#FFFFFF'
					this.$refs.customdiv.style.display ='none';
					this.$refs.storediv.style.display ='block';
					this.$refs.creditdiv.style.display ='none';
					this.$refs.coupondiv.style.display ='none';
				}
				else if(tab == 'credit'){
					this.findHistoryMemberMessage(this.listQuery_credit,tab) 
					this.$refs.custom.style.background ='#FFFFFF'
					this.$refs.store.style.background ='#FFFFFF'
					this.$refs.credit.style.background ='#D8E5EC'
					this.$refs.coupon.style.background ='#FFFFFF'
					this.$refs.customdiv.style.display ='none';
					this.$refs.storediv.style.display ='none';
					this.$refs.creditdiv.style.display ='block';
					this.$refs.coupondiv.style.display ='none';
				}
				else{
					this.findHistoryMemberMessage(this.listQuery_coupon,tab) 
					this.$refs.custom.style.background ='#FFFFFF'
					this.$refs.store.style.background ='#FFFFFF'
					this.$refs.credit.style.background ='#FFFFFF'
					this.$refs.coupon.style.background ='#D8E5EC'
					this.$refs.customdiv.style.display ='none';
					this.$refs.storediv.style.display ='none';
					this.$refs.creditdiv.style.display ='none';
					this.$refs.coupondiv.style.display ='block';
				}
			},
			loadSysParameter(){
				let getChanel = 'type=0&code=chanel&y=1'  
				let getConstellations = 'type=0&code=constellation&y=1'
				let getEducations = 'type=0&code=education&y=1'
				let getAgeGroup = 'type=0&code=age_group&y=1'				
			    getsysParamer(getChanel).then(response=>{
					this.filterMemberChanel = response;					
				});		  
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
			}						
		},
		mounted(){			
		},
		created() {						
			this.loadSysParameter();			
			if(this.$route.query.id != undefined) {
				// this.loadCustomerHistory(this.$route.query.id);
				this.$nextTick(function(){
					//页面渲染完成之后执行的异步回掉方法
					this.getMemberDetails(this.$route.query.id);
					
				})
				
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.memberlist {
		height: auto;
		overflow: hidden;
		zoom: 1;
		background: #FEFEFE;
		.cxyhqdialog {
			.el-dialog__body {
				padding: 0 40px 30px 30px;
				.el-table {
					.el-table__header-wrapper {
						.el-table__header {
							width: 100%!important;
						}
					}
					.el-table__body-wrapper {
						.el-table__body {
							width: 100%!important;
						}
					}
				}
			}
		}
		.mobildialog {
				.el-dialog__footer {
					text-align: center;
					background-color: #F4F9FC;
				}
				width: 500px;
				.el-form-item__error {
					left: 40px;
				}	
		}
		.gradedialog {
				.el-dialog__footer {
					text-align: center;
					background-color: #F4F9FC;
				}
				width: 500px;
				.el-form-item__error {
					left: 40px;
				}
			.el-textarea {
				.el-textarea__inner {
					width: 175px;
				}
			}
		}
		.membertitle {
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
		.membermessage {
			height: 260px;
    		overflow: hidden;
    		transition: height .3s;
			.membermessageleft {
				position: relative;
				float: left;
				width: 33.3%;
				margin-top: 20px;
				border-right: 1px solid #EAF1F6;
				.memberheader {
					position: relative;
					text-align: center;
					color: #34495E;
					span {
						font-size: 20px;
						display: block;
					}
					em {
						display: block;
						height: 26px;
						line-height: 26px;
						text-align: center;
						font-size: 14px;
					}
				}
				.membermiddle {
					position: relative;
					height: 84px;
					padding-top: 14px;
					li {
						width: 33.3%;
						float: left;
						list-style: none;
						text-align: center;
						img {
							width: 22px;
							height: 22px;
						}
						span {
							display: block;
							height: 26px;
							line-height: 26px;
							font-size: 14px;
						}
					}
				}
				.messageaddress {
					position: relative;
					padding-left: 40px;				
					line-height: 22px;
					img {
						width: 22px;
						height: 22px;
						display: block;
						float: left;
						text-align: center;
					}
					
					span{
						display: inline-block;
						width: 80%;
						font-size: 14px;
						margin-left: 28px;
						
					}
					.memberlabel{
						position: relative;					
						.memberlabeldetail{
							position: relative;	
							height: 30px;						
							line-height: 30px;
							span{
								color: #758896;
								display: inline;
								width: auto;
								margin: 0;
							}
							em{ 
								margin-left: 6px;
								color: #34495E;
							}
							.memberlabeldetailleft{
								position: absolute;
								left: 0;	
							}
							.memberlabeldetailright{
								position: absolute;
								left: 50%;								
							}
						}											
					}
				}
			}
			.membermessageright {
				position: relative;
				float: left;
				width: 66.6%;
				margin-top: 8px;
				.messagerighttop {
					position: relative;
					margin-left: 40px;
					margin-right: 40px;
					margin-top: 12px;
					height: 128px;
					&:first-of-type {
						border-bottom: 1px solid #EAF1F6;
					}
					.messagecard {
						position: relative;
						.messagecardleft {
							position: absolute;
							.messagecardmessage {
								height: 30px;
								line-height: 30px;
								font-size: 14px;
								span {
									color: #758896;
								}
								em {
									margin-left: 6px;
									color: #34495E;
								}
							}
						}
						.messagecardright {
							position: absolute;
							left: 50%;
							.messagecardmessage {
								height: 30px;
								line-height: 30px;
								font-size: 14px;
								span {
									color: #758896;
								}
								em {
									margin-left: 6px;
									color: #34495E;
								}
							}
						}
					}
				}
			}
		}
		.membermore{
			width: 33.3%;
			height: 60px;
			line-height: 60px;
			text-align: center;
			font-size: 14px;
			color: #0C9AFF;
			span{
				cursor: pointer;
			}
		}
		.padding{
			height: 10px;
			background: #F4F9FC;
		}
		
		.memberasset{				
			height:150px;
			margin: 5px 20px 0 30px;
			ul{
				li{ 
					height: 66px;
				    padding: 15px 0;
					width: 33.33%;
					float: left;
					list-style: none;
					.memberassetleft{
						position: relative;
						float: left;
					}
					.memberassetright{
						margin-left: 10px;
						position: relative;
						float: left;
						span{
							display: block;
							font-size: 14px;
							color: #9AABB8;
							line-height: 14px;
						}
						em{ 
							display: block;
							height: 30px;
							line-height: 30px;
							font-size: 14px;
							color: #34495E;
							width:300px;
							&:first-of-type {
								position: absolute;
								left: 0;
							}
							&:nth-of-type(2){
								position: absolute;
								left: 12px;
							}
							
						}
					}
				}
			}			
		}
		.memberdetailmessage{
			position: relative;
			padding:0 20px;
			.memberdetailsearch {
				height: 50px;
				line-height: 50px;
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
					&:nth-of-type(3){
						border-right: 0;
					}
				}
			}
		}
	}
</style>