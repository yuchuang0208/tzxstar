<template>
	<div class='membershipsgroupmanagement'>

		<div class="app-container calendar-list-container" v-loading.body = 'loadingBody'>
			<div class="filter-container" >
				<el-input v-model="listQuery.group_name"  placeholder="请输会员群体名称"  icon='search' :on-icon-click='searchByCouponName' style='width:220px'></el-input>
				<el-button type='server'  @click='issue_coupon' style='float:right;'>创建群体</el-button>
			</div>
			<div class="filter-container" >
				<el-table v-loading="loading" empty-text='暂无任何数据' element-loading-text="给我一点时间" :data="tableData" style="width: 100%" @filter-change="filterChange" @sort-change="sortChange">
				    <el-table-column fixed prop="group_name" label="会员群体名称" min-width="150"> </el-table-column>
				    <el-table-column prop="members_count" sortable label="人数" min-width="100"> </el-table-column>
				    <el-table-column prop="refresh_time" sortable label="更新时间" min-width="150"> </el-table-column>
				    <el-table-column  :filters="filterText" column-key='is_use' prop="is_use" align='center' label="状态" min-width="120"> </el-table-column>
				    <el-table-column prop="last_operator" label="最终编辑人" min-width="100"> </el-table-column>
					<el-table-column header-align='center' prop="last_updatetime" label="编辑时间" sortable align='center' min-width='150' ></el-table-column>
					<el-table-column header-align='center' align='center' fixed='right' v-if='tableData.length>0' label="操作" width="200">
						<template scope="scope">
							<span class="colorFF" @click="showDetail(scope)">详情</span>
							<span class="colorFF" @click="updetaPeople(scope)">更新人数</span>
							<tzx-tag color="#0C9AFF" v-popover:popover>
								<el-popover style='z-index:100!important' ref="popover" placement="bottom" width="100" trigger="hover" @show='showPopover(scope.row.id)' @hide='hidePopover(scope.row.id)'>
									<ul class='tzx-ul'>
										<li class="tzx-select" style='text-align: center;'><span class='tzx-text' @click="sendStamps">发券</span></li>
										<li class="tzx-select" style='text-align: center;'><span class='tzx-text' @click="copyStamps(scope.row.id)">复制</span></li>
										<li class="tzx-select" style='text-align: center;'><span class='tzx-text' @click="editorDetail(scope.row)">编辑</span></li>
										<li class="tzx-select" style='text-align: center;'><span class='tzx-text' @click="deleteRow(scope.$index, tableData, scope.row)">删除</span></li>
									</ul>
								</el-popover>更多<i :class="hoverId==scope.row.id&&showpop?'el-icon-dropup':'el-icon-dropdown'"></i>
							</tzx-tag>
						</template>
					</el-table-column>
				</el-table>
			  	<div class="pagination-container">
  					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.rows" layout="prev, pager, next,total, jumper,sizes" :total="listQuery.total">
  					</el-pagination>
  			  	</div>
		  </div>
	  </div>

	  <el-dialog title="会员群体详情" :visible.sync="dialogTableVisible" customClass="group-detail">
					<el-form>
						<!-- 5项 必须的-->
			    		<el-form-item label="群体名称:" v-if="showDetails.group_name !='' ">
						    <span>{{showDetails.group_name}}</span>
						</el-form-item>
						<el-form-item label="群体人数:" v-if="showDetails.members_count !='' ">
						    <span>{{showDetails.members_count}}人</span>
						</el-form-item>
						<el-form-item label="更新时间:" v-if="showDetails.last_updatetime !='' ">
						    <span>{{showDetails.last_updatetime}}</span>
						</el-form-item>
						<el-form-item label="状态:" v-if="showDetails.is_use !='' ">
						    <span>{{showDetails.is_use}}</span>
						</el-form-item>
						<el-form-item label="使用渠道:" v-if="showDetails.useActivitys !='' ">
						    <span>{{showDetails.useActivitys}}</span>
						</el-form-item>

						<!-- 8项 基本的-->
						<el-form-item label="会员入会时间:"  v-if="showDetails.basic.addTime !='' ">
						    <span v-for="item in showDetails.basic.addTime" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="会员年龄:" v-if="showDetails.basic.age != '' ">
						    <span>{{showDetails.basic.age}}</span>
						</el-form-item>
						<el-form-item label="会员等级:" v-if="showDetails.basic.level != '' ">
						    <span>{{showDetails.basic.level}}</span>
						</el-form-item>
						<el-form-item label="会员性别:" v-if="showDetails.basic.sex != '' ">
						    <span>{{showDetails.basic.sex}}</span>
						</el-form-item>
						<el-form-item label="会员生日:" v-if="showDetails.basic.birthday != '' ">
						    <span>{{showDetails.basic.birthday}}</span>
						</el-form-item>
						<el-form-item label="会员星座:" v-if="showDetails.basic.constellation != '' ">
						    <span>{{showDetails.basic.constellation}}</span>
						</el-form-item>
						<el-form-item label="会员所属门店:" v-if="showDetails.basic.storeId != '' ">
						    <span>{{showDetails.basic.storeId}}</span>
						</el-form-item>
						<el-form-item label="会员入会来源:" v-if="showDetails.basic.addChanel != '' ">
						    <span>{{showDetails.basic.addChanel}}</span>
						</el-form-item>

						<!-- 10项 消费类-->
						<el-form-item label="消费次数:" v-if="showDetails.consume.xfTimes != '' ">
						    	<span v-for="item in showDetails.consume.xfTimes" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="消费周期:" v-if="showDetails.consume.lastXfDate != '' ">
						    	<span v-for="item in showDetails.consume.lastXfDate" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="累计消费金额:" v-if="showDetails.consume.cumulateXfAmount != '' ">
						    	<span v-for="item in showDetails.consume.cumulateXfAmount" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="单笔消费金额:" v-if="showDetails.consume.oneXfAmount != '' ">
						    	<span v-for="item in showDetails.consume.oneXfAmount" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="平均消费金额:" v-if="showDetails.consume.avgXfAmount != '' ">
						    	<span  v-for="item in showDetails.consume.avgXfAmount" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="储值次数:" v-if="showDetails.consume.totalCzTimes != '' ">
						    	<span  v-for="item in showDetails.consume.totalCzTimes" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="累计储值金额:" v-if="showDetails.consume.cumulateCzAmount != '' ">
						    	<span v-for="item in showDetails.consume.cumulateCzAmount" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="单笔储值金额:" v-if="showDetails.consume.oneCzAmount != '' ">
						    	<span v-for="item in showDetails.consume.oneCzAmount" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="累计积分消费:" v-if="showDetails.consume.cumulateXfCredit != '' ">
						    	<span v-for="item in showDetails.consume.cumulateXfCredit" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="单笔积分消费:" v-if="showDetails.consume.oneXfCredit != '' ">
						    	<span v-for="item in showDetails.consume.oneXfCredit" :key="item">{{item}}</span>
						</el-form-item>

						<!-- 3项 资产类-->
					   <el-form-item label="储值余额:" v-if="showDetails.asset.totalMainAddReward != '' ">
						    	<span v-for="item in showDetails.asset.totalMainAddReward" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="积分余额:" v-if="showDetails.asset.usefulCredit != '' ">
						    	<span v-for="item in showDetails.asset.usefulCredit" :key="item">{{item}}</span>
						</el-form-item>
						<el-form-item label="可用优惠券剩余:" v-if="showDetails.asset.usefulCoupons != '' ">
						    	<span v-for="item in showDetails.asset.usefulCoupons" :key="item">{{item}}</span>
						</el-form-item>
    			</el-form>
		<p class="knowDetail">
			  <el-button @click="dialogTableVisible = false" >关闭</el-button>
		</p>
	  </el-dialog>

	    <el-dialog title="群体复制" :visible.sync="dialogCopy" size="copy" :before-close="handleCopyClose" :rules="rules" >
		    <div class='content pt60'>
				<el-form :model="classForm" label-position='right' ref="classForm" label-width="100px" class="demo-ruleForm">
					  <el-form-item label="新群体名称:" prop="name" :rules="filter_rules({required:true,maxLength:10})" >
						  <el-input  placeholder="请输入新群体名称" v-model="classForm.name" auto-complete="off" style="width:240px;"></el-input>
					  </el-form-item>
				</el-form>
		    </div>
		    <div class="fzhd_close">
					<el-button size='large' @click="cancelDialogCopy">取消</el-button>
		  			<el-button size='large'  @click="copyGroupConfirm('classForm')" type='primary'>确定</el-button>
			</div>
	    </el-dialog>
	</div>
</template>

<script>
import { TzxTag } from '@/components/tag'
import {getGroupmembersList,getGroupmembersDetail,refreshMembers,delGroup,basicLabel,saveCopyGroup} from '@/api/groupmembers.js'

export default {
	name: 'membershipsgroupmanagement',
	components: {
		TzxTag
	},
	data(){
		return{
			dialogTableVisible : false,					// 详情隐藏字段
			dialogCopy: false,          				//复制群体的弹窗
			classForm: {  								//复制的的
				id:'',
				name: '',
			},
			rules: {
				name: [
		            { required: true, message: '请输入群体名称', trigger: 'blur' },
		            { min: 1, max: 20, message: '长度在 1到20个字符', trigger: 'blur' }
		        ],
			},
			tableData: [],
			loadingBody:false,
			listQuery: {
				total: 0,
				page: 1,
				rows: this.$store.state.user.screenPageSize,
				group_name: '',							//群体名称
				sort: 'last_updatetime',				// 排序
				order: 'desc',							// 排序类型 desc 降序，asc 升序
				is_use:'',				// 使用状态	0未使用，1使用
			},
			loading:false,
			showpop: false,
			hoverId: '',
			filterText:[{
				text: '未使用',
				value: '0'
			}, {
				text: '已使用',
				value: '1'
			}],
			basicLabel:[],					// 基本消息标签页 （level,constellation,chanel）
			levelList:[],						//等级字典表
			constellationList:[],				//星座字典表
			sexList:[],							//性别字典表
			chanelList:[],						//渠道字典表

			showDetails:{				// 显示会员群体详情
				group_name:'',//群体名称
				members_count:'',//群体人数
				last_updatetime:'',//更新时间
				is_use:'',//状态
				useActivitys:'',//使用渠道  用于那些活动用到了该渠道

				//basic 8个字段
				basic:{
					level:'',//等级
					sex:'',//性别
					age:'',//年龄段
					birthday:'',//生日
					constellation:'',//星座
					storeId:'',//门店
					addChanel:'',//入会来源
					addTime:[],//入会时间
				},
				//消费类 10个选项
				consume:{
					xfTimes:[],//消费次数
					lastXfDate:[],//消费周期
					cumulateXfAmount:[],//累计消费金额
					oneXfAmount:[],//单笔消费金额
					avgXfAmount:[],//平均消费金额
					totalCzTimes:[],//储值次数
					cumulateCzAmount:[],//累计储值金额
					oneCzAmount:[],//单笔储值金额
					cumulateXfCredit:[],//累计积分消费
					oneXfCredit:[],//单笔积分消费
				},
				//资产类 3个
				asset:{
					usefulCoupons:[],//可用优惠券剩余
					usefulCredit:[],//积分余额
					totalMainAddReward:[],//储值余额
				}
			},
		}
	},
	created(){
		this.getList();
		//获取字典表的信息  会员基本信息标签页    会员等级，会员星座，会员性别 ，会员渠道等
		this.loadBaseDictionary();
	},
	methods: {
		showPopover(hoverId) {
			this.showpop = true;
			this.hoverId = hoverId;
		},
		hidePopover(hoverId) {
			this.hoverId = 0;
			this.showpop = false;
		},
		reset(){
			this.showDetails.group_name = "";//群体名称
			this.showDetails.members_count = "";//群体人数
			this.showDetails.last_updatetime = "";//更新时间
			this.showDetails.is_use = "";//状态
			this.showDetails.useActivitys = "";//使用渠道  用于那些活动用到了该渠道

			this.showDetails.basic.level = "";
			this.showDetails.basic.sex = "";
			this.showDetails.basic.age = "";
			this.showDetails.basic.birthday = "";
			this.showDetails.basic.constellation = "";
			this.showDetails.basic.storeId = "";
			this.showDetails.basic.addChanel = "";
			this.showDetails.basic.addTime = [];
			//消费类 10个选项
			this.showDetails.consume.xfTimes = [];
			this.showDetails.consume.lastXfDate = [];
			this.showDetails.consume.cumulateXfAmount = [];
			this.showDetails.consume.oneXfAmount = [];
			this.showDetails.consume.avgXfAmount = [];
			this.showDetails.consume.totalCzTimes = [];
			this.showDetails.consume.cumulateCzAmount =[];
			this.showDetails.consume.oneCzAmount = [];
			this.showDetails.consume.cumulateXfCredit = [];
			this.showDetails.consume.oneXfCredit = [];

			//资产类 3个
			this.showDetails.asset.usefulCoupons = [];
			this.showDetails.asset.usefulCredit = [];
			this.showDetails.asset.totalMainAddReward = [];
		},
		loadBaseDictionary(){
			basicLabel().then( res =>{
				if(res.success){
					this.basicLabel = res; //
					this.levelList = res.level;//等级字典表
					this.constellationList = res.constellation;//星座字典表
					this.sexList = res.sex;//性别字典表
					this.chanelList = res.chanel;//渠道字典表
				}else{
					this.$message({
						type: 'error',
						message: res.msg
					});
				}
			}).catch((e) => {
				this.$message({
					type: 'error',
					message: '网络异常'
				});
			});
		},
		getList(){
			this.loading = true;
			let data =  'sort=' + this.listQuery.sort +
						'&order=' + this.listQuery.order +
						'&page=' + this.listQuery.page +
						'&is_use=' + this.listQuery.is_use +
						'&rows=' + this.listQuery.rows;

			this.getGroupmembersListFunction(data);
		},
		getGroupmembersListFunction(data){
			let _this = this;
			getGroupmembersList(data).then( res =>{
				_this.loading = false;
				res.rows.map( i =>{
					(i.is_use == 1) ? i.is_use = "已使用" : i.is_use = "未使用";
				})
				_this.listQuery.total = res.total;
				_this.tableData = res.rows;
			})
		},
		// 根据会员群体名称搜索列表
		searchByCouponName(){
			let _this = this;
			let data =  'sort=' + this.listQuery.sort +
						'&order=' + this.listQuery.order +
						'&page=' + this.listQuery.page +
						'&is_use=' + this.listQuery.is_use +
						'&rows=' + this.listQuery.rows +
						'&group_name=' +  this.listQuery.group_name;

			if(_this.searchNameVal == ''){
				_this.loading = true;
				this.getSecondList();
			}else{
				_this.loading = true;
				_this.getGroupmembersListFunction(data);
			}
		},
		// 当前页显示条数改变是触发
		handleSizeChange(val) {
			this.listQuery.rows = val
			this.getList()
		},
		// 页码改变时触发
		handleCurrentChange(val) {
			this.listQuery.page = val
			this.getList()
		},
		// 状态筛选
		filterChange(filters){
			let key = Object.keys(filters)[0];
			let value = filters[key];
			let types = value.join(",");
			this.listQuery.page = 1;
			if(value.length == 1){
				this.listQuery.is_use = types;
			}else{
				this.listQuery.is_use = '';
			}

			this.getList();
		},
		// 时间的排序
		sortChange({column,prop,order}) {

			if(prop == 'refresh_time'){				// 更新时间排序
				this.listQuery.sort = 'refresh_time';
			}else if(prop == 'last_updatetime'){	// 编辑时间排序
				this.listQuery.sort = 'last_updatetime';
			}else if(prop == 'members_count'){		// 人数排序
				this.listQuery.sort = 'members_count';
			}
			this.listQuery.page = 1;

			if(order == 'ascending') {
				this.listQuery.order = 'asc'
			}
			if(order == 'descending') {
				this.listQuery.order = 'desc'
			}
			this.getList();
		},
		// 显示详情
		showDetail(scope){
			this.dialogTableVisible = true;
			let data = 'id=' + scope.row.id;
            this.reset();//详情对象重置
			getGroupmembersDetail(data).then( res =>{
				if(res.success == true){

					let basic = res.basic;
					let consume = res.consume;
					let asset = res.asset;

					this.showDetails.group_name = res.group_name;//群体名称
					this.showDetails.members_count =  res.members_count;;//群体人数
					this.showDetails.last_updatetime =  res.last_updatetime;;//更新时间
					if(res.is_use !=null){
						if(res.is_use == '0'){
							this.showDetails.is_use = '未使用';
						}else if(res.is_use == '1'){
							this.showDetails.is_use = '已使用';
						}
					}
					if(res.useActivitys !=null){//使用渠道  用于那些活动用到了该渠道
						let subjects = [];
						res.useActivitys.forEach(item =>{
							subjects.push(item.subject);
						})
						this.showDetails.useActivitys = subjects.join(",");
					}

					//消费类 10个选项

					if(consume.lastXfDate !=null){//消费周期
						let lastXfDate = [];
						consume.lastXfDate.forEach(item =>{
							lastXfDate.push(item.tb_value1+"至"+item.tb_value2+"天内消费");
						});
						this.showDetails.consume.lastXfDate = lastXfDate;
					}
					if(consume.xfTimes !=null){//消费次数
						let xfTimes = [];
						consume.xfTimes.forEach(item =>{
							xfTimes.push(item.tb_time_days+"天内消费"+item.tb_value1+"至"+item.tb_value2+"次");
						});
						this.showDetails.consume.xfTimes = xfTimes;
					}
					if(consume.cumulateXfAmount !=null){//累计消费
						let cumulateXfAmount = [];
						consume.cumulateXfAmount.forEach(item =>{
							let pay_way = item.tb_pay_way;
							if(pay_way ==1){
								pay_way = '仅现金消费';
							}else if(pay_way ==2){
								pay_way = '仅储值消费';
							}else if(pay_way ==3){
								pay_way = '储值+现金消费';
							}
							cumulateXfAmount.push(+item.tb_time_days+"天内"+pay_way+"累计"+item.tb_value1+"至"+item.tb_value2+"元");
						});
						this.showDetails.consume.cumulateXfAmount = cumulateXfAmount;
					}

					if(consume.oneXfAmount !=null){//单笔消费
						let oneXfAmount = [];
						consume.oneXfAmount.forEach(item =>{
							let pay_way = item.tb_pay_way;
							if(pay_way ==1){
								pay_way = '仅现金消费';
							}else if(pay_way ==2){
								pay_way = '仅储值消费';
							}else if(pay_way ==3){
								pay_way = '储值+现金消费';
							}
							oneXfAmount.push(+item.tb_time_days+"天内"+pay_way+"累计"+item.tb_value1+"至"+item.tb_value2+"元");
						});
						this.showDetails.consume.oneXfAmount = oneXfAmount;
					}

					if(consume.avgXfAmount !=null){//平均消费
						let avgXfAmount = [];
						consume.avgXfAmount.forEach(item =>{
							let pay_way = item.tb_pay_way;
							if(pay_way ==1){
								pay_way = '仅现金消费';
							}else if(pay_way ==2){
								pay_way = '仅储值消费';
							}else if(pay_way ==3){
								pay_way = '储值+现金消费';
							}
							avgXfAmount.push(+item.tb_time_days+"天内"+pay_way+"累计"+item.tb_value1+"至"+item.tb_value2+"元");
						});
						this.showDetails.consume.avgXfAmount = avgXfAmount;
					}

					if(consume.totalCzTimes !=null){//储值次数
						let totalCzTimes = [];
						consume.totalCzTimes.forEach(item =>{
							totalCzTimes.push(item.tb_time_days+"天内  累计消费"+item.tb_value1+"至"+item.tb_value2+"次");
						});
						this.showDetails.consume.totalCzTimes = totalCzTimes;
					}
					if(consume.cumulateCzAmount !=null){//累计储值
						let cumulateCzAmount = [];
						consume.cumulateCzAmount.forEach(item =>{
							cumulateCzAmount.push(item.tb_time_days+"天内  累计消费"+item.tb_value1+"至"+item.tb_value2+"元");
						});
						this.showDetails.consume.cumulateCzAmount = cumulateCzAmount;
					}
					if(consume.oneCzAmount !=null){//单笔储值
						let oneCzAmount = [];
						consume.oneCzAmount.forEach(item =>{
							oneCzAmount.push(item.tb_time_days+"天内  累计消费"+item.tb_value1+"至"+item.tb_value2+"元");
						});
						this.showDetails.consume.oneCzAmount = oneCzAmount;
					}

					if(consume.cumulateXfCredit !=null){//累计积分消费
						let cumulateXfCredit = [];
						consume.cumulateXfCredit.forEach(item =>{
							cumulateXfCredit.push(item.tb_time_days+"天内  累计消费"+item.tb_value1+"至"+item.tb_value2+"分");
						});
						this.showDetails.consume.cumulateXfCredit = cumulateXfCredit;
					}

					if(consume.oneXfCredit !=null){//单笔积分消费
						let oneXfCredit = [];
						consume.oneXfCredit.forEach(item =>{
							oneXfCredit.push(item.tb_time_days+"天内  累计消费"+item.tb_value1+"至"+item.tb_value2+"分");
						});
						this.showDetails.consume.oneXfCredit = oneXfCredit;
					}
					//资产类 3个
					if(asset.totalMainAddReward !=null){//储值余额
						let totalMainAddReward = [];
						asset.totalMainAddReward.forEach(item =>{
							totalMainAddReward.push(item.tb_value1+"至"+item.tb_value2+"元");
						});
						this.showDetails.asset.totalMainAddReward = totalMainAddReward;
					}

					if(asset.usefulCredit !=null){//积分余额
						let usefulCredit = [];
						asset.usefulCredit.forEach(item =>{
							usefulCredit.push(item.tb_value1+"至"+item.tb_value2+"分");
						});
						this.showDetails.asset.usefulCredit = usefulCredit;
					}

					if(asset.usefulCoupons !=null){//可用优惠券剩余
						let usefulCoupons = [];
						asset.usefulCoupons.forEach(item =>{
							usefulCoupons.push(item.tb_value1+"至"+item.tb_value2+"张");
						});
						this.showDetails.asset.usefulCoupons = usefulCoupons;
					}

					//基本信息 8个选项
					if(basic.addTime != null){//会员入会时间
						let addTime = [];
						basic.addTime.forEach(item =>{
							addTime.push(item.tb_time1+'至'+item.tb_time2);
						})
						//this.showDetails.basic.addTime = addTime.join(',');
						this.showDetails.basic.addTime = addTime;
					}
					if(basic.age !=null){//会员年龄
						let age = [];
						basic.age.forEach(item =>{
							if(item.tb_value1 == 'is NULL'){
								age.push('未知');
							}else{
								age.push(item.tb_value1+'岁-'+item.tb_value2+'岁');
							}
						})
						this.showDetails.basic.age = age.join(',');
					}
					if(basic.level.tb_value1 != ''){//会员等级    "tb_value1": "'85','86'",
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
						this.showDetails.basic.level = level_temp.join(",");
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
						this.showDetails.basic.sex = sex.join(",");
					}

					if(basic.birthday != null){//会员生日
						let birthday = [];
						basic.birthday.forEach(item =>{
							if(item.tb_field_arithmetic1 == 'in'){
								let month = item.tb_value1.split(',');
								month.forEach(item2 =>{
									birthday.push(item2+"月");
								});
							}else if(item.tb_field_arithmetic1 == 'between'  && item.tb_time2 != ""){
								birthday.push(item.tb_time1+'至'+item.tb_time2);
							}else if(item.tb_field_arithmetic1 == 'is'){
								birthday.push('未知');
							}
						});
						this.showDetails.basic.birthday = birthday.join(",");
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
						this.showDetails.basic.constellation = constellation.join(",");
					}
					if(basic.storeId != null){//会员所属门店
						this.showDetails.basic.storeId = basic.storeId.tb_value2;
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
						this.showDetails.basic.addChanel = chanel.join(",");
					}
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
		// 创建群体
		issue_coupon(){
			this.$router.push({
				path:'/marketing/addmembershipsgroupmanagement',
			})
		},
		// 编辑详情
		editorDetail(row){
			//console.log(row.is_use)
			let running = row.is_use;
			let showCancelButton = false;
			let type = 'warning'
			if (running == '已使用'){
				this.$confirm("群体使用中，无法编辑!", {
						showClose: false,
						showCancelButton: showCancelButton,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: type
				})
				return;
			}else{
				this.$router.push({
					path:'/marketing/addmembershipsgroupmanagement',
					query: {
						id: row.id
					}
				});
			}

		},
		// 更新人数
		updetaPeople(scope){
			let data = 'id=' + scope.row.id;
			scope.row.members_count = "计算中..."
			refreshMembers(data).then( res =>{
				if(res.success == true){
					scope.row.members_count = res.size;
				}
			})
		},
		// 发券
		sendStamps(scope){//会员唤醒
			this.$router.push({
				path: "/marketing/wakemarketing",
				hash: 'new'
			});
		},
		// 删除事件
		deleteRow(index, rows,row){
			let _this = this;
			let message='';
			let running = row.is_use;
			let showCancelButton = false;
			let type = 'warning'
			switch(running) {
					case '已使用':
						message = '使用中，无法删除!'
						break;
					default:
						message = '是否删除该会员群体?'
						showCancelButton = true
						type = 'info'
						break;
			}
			this.$confirm(message, {
				showClose: false,
				showCancelButton: showCancelButton,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: type
			}).then(() => {
				//_this.loadingBody = true;
				let data = 'id=' + row.id;
				if(running!="已使用"){
					delGroup(data).then(res=>{
						if(res.success){
							rows.splice(index, 1);
							_this.loadingBody = false;
							this.$message({
								type:'success',
								message:'删除成功'
							})
						}
						else{
							this.$message({
								type:'error',
								message:response.msg
							})
						}
					}).catch(e=>{
						this.$message({
							type: 'error',
							message: '网络异常'
						});
					})
				}
			})
		},
		// 复制按钮
		copyStamps(id){
			//给复制对话框复制id
			this.classForm.id = id;
			this.dialogCopy = true;
		},
		// 确认复制
 		copyGroupConfirm(formName) {
			let _this = this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	           	    let data = "group_id=" + this.classForm.id +
							      "&copy_name=" + this.classForm.name;
					saveCopyGroup(data).then((response) => {
							this.loading1 = false;
							if(response.success){
								this.dialogCopy = false;
								this.$message({
									type: 'success',
									message: '保存成功'
								});
								_this.getList();
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
		// 取消并关闭复制窗口
		cancelDialogCopy(){
			this.dialogCopy = false;
			this.classForm.id = '';
			this.classForm.name = '';
		},
		handleCopyClose(done) {
			done();
		},
	},
	deactivated () {
        this.$destroy(true);
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.membershipsgroupmanagement{
	height: auto;
    background: #fefefe;
	/*.data-list{
		margin-left: 30px;
		li{
			display: block;
			display: flex;
			line-height: 28px;
			span:first-child{
				width:180px;
				text-align: left;
				color: #758896;
			}
			span:last-child{
				color: #34495E;
			}
		}
	}*/
	.group-detail{
		.el-form{
			max-height: 410px;
    		overflow-y: auto;
    		margin-top: 20px;
			.el-form-item{
				margin-bottom: 0px;
				.el-form-item__label{
						width:120px;
					}
				.el-form-item{
					.el-form-item__label{
						width:0px;
					}
				}
			}
		}

	}
	.knowDetail{
		width:100%;
		border-top:1px solid #EAF1F6;
		margin-top: 28px;
		height:60px;
		background:#F4F9FC;
		position:relative;
		button{
			width:58px;
			height:30px;
			position:absolute;
			left:50%;
			top:50%;
			margin-left:-29px;
			margin-top:-15px;
			font-size: 14px;
		}
	}
	.content{
		min-height: 136px;
	}
    .ml20{
        margin-left: 20px;
    }
	.pt60{
		padding-top: 60px;
	}
	.colorFF{
		color: #0C9AFF;
		cursor: pointer;
	}
	.el-form-item__content{
		margin-left: 164px !important;
		margin-right: 40px;
	}
	.fzhd_close{
		text-align: center;
		height: 60px;
		line-height: 60px;
		background: #F4F9FC;
		text-align: center;
	}
	.el-dialog--small{
		width: 40%;
	}

}

</style>
