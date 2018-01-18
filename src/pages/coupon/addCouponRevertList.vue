<template>
	<div class='appclass'>
		<div class="maskLayer" v-if="searchVisible">
		</div>
		<div class="search_zr" v-if="searchVisible">
		        <div class="main">
		        	<el-form label-position="right">
		        		<el-form-item label="活动类型:" label-width="100px">
						    <el-select v-model="activityTypesChecked" multiple placeholder="请选择" style="width:230px;margin-right:5px;">
							    <el-option v-for="item in activityTypes" :key="item.id" :label="item.text" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="发售渠道:" label-width="100px">
						    <el-select v-model="chanelsChecked" multiple placeholder="请选择" style="width:230px;margin-right:5px;">
							    <el-option v-for="item in chanels" :key="item.id" :label="item.text" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="发售机构:" label-width="100px">
						    <!--<el-select v-model="organsChecked" multiple placeholder="请选择" style="width:230px;margin-right:5px;">
							    <el-option v-for="item in organs" :key="item.id" :label="item.text" :value="item.id"></el-option>
							</el-select>-->

							<el-input v-if="!iscaret" class="select-input-zr" readonly placeholder="请选择发售机构" icon="caret-bottom"  v-model="orgnames" :on-icon-click="handleIconClick"></el-input>
							
							<el-input v-if="iscaret" class="select-input-zr" readonly placeholder="请选择发售机构" icon="caret-top"  v-model="orgnames" :on-icon-click="handleIconClick"></el-input>


							<div class="select-tree-zr" v-if="isselecttree">
					            <el-input
								  placeholder="输入机构名称"
								  v-model="filterText" icon="search">
								</el-input>
					            <el-tree ref="classTree" 
					                    class="filter-tree-zr"
					                    :data="selectTreeData" 
					                    :props="defaultProps" 
					                    :default-expanded-keys="[0]" 
					                    node-key="id" 
					                    :filter-node-method="filterNode"
					                    show-checkbox=true
					                    @check-change="boxChange">
					            </el-tree>
					            
					           <!-- <el-tree
								  class="filter-tree"
								  :data="selectTreeData"
								  :props="defaultProps"
								  default-expand-all
								  :filter-node-method="filterNode"
								  ref="classTree">
								</el-tree>-->

				            </div>
						</el-form-item>
						<el-form-item label="发售人:" label-width="100px">
						    <el-select v-model="usersChecked" multiple placeholder="请选择" style="width:230px;margin-right:5px;">
							    <el-option v-for="item in users" :key="item.id" :label="item.text" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
		        	</el-form>
				</div>
				
	            <div class="quxiao_and_tijiao">
					<div class="bottom_64_32">
			       		<div class="queding" @click="searchList"><em>确定</em></div>
			       		<div class="quxiao" @click="searchCancle"><em >取消</em></div>
			       		<em class="botton_text" @click="searchReset">重置</em>
			       	</div>
				</div>
		</div>
			
		<div class="app-container calendar-list-container" v-loading="loading2">
			<div class="filter-container">			
				<el-input placeholder="请输入内容" v-model="search_text" style="width:230px;font-size:12px;margin-left:10px;" icon="search" >
				    <el-select v-model="search_type" slot="prepend" placeholder="会员"  style="width:78px;font-size:12px;" prop="huiyuan" @change="searchName">
					      <el-option label="会员" value="会员"></el-option>
					      <el-option label="会员卡" value="会员卡"></el-option>
				    </el-select>
				    <el-button slot="append" icon="search" @click="searchName"></el-button>
				</el-input>
				
				<em class="botton_text" @click="searchVisible=true">高级搜索</em>
			</div>
			
			<div class="operate">
				<em>已选<span v-model="multipleSelection">{{multipleSelection.length}}</span>项</em>
				<el-button size='small' type='text' @click="dialogCouponVisible=true">撤销选中优惠券</el-button>
			</div>
			
			<el-table ref="multipleTable" v-loading="loading" empty-text='暂无任何数据' element-loading-text="给我一点时间" :data="tableData" style="width: 100%"   @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">全选</el-table-column>
				<el-table-column  header-align='left' prop="code" label="券号" min-width="120"></el-table-column>
				<el-table-column  header-align='left' prop="face_value" label="面值" min-width="60"></el-table-column>
				<el-table-column  header-align='left' prop="class_name" label="券类" min-width="100"></el-table-column>
				<el-table-column  header-align='left' prop="name" label="会员姓名" min-width="100"></el-table-column>
				<el-table-column  header-align='left' prop="mobil" label="手机号" min-width="100"></el-table-column>
				<el-table-column  :formatter="dataFormat" header-align='left' prop="activity_type" label="活动类型" min-width="120"></el-table-column>
				<el-table-column  header-align='left' prop="send_chanel_name" label="发售渠道" min-width="100"></el-table-column>
				<el-table-column  header-align='left' prop="org_full_name" label="发售机构" min-width="100"></el-table-column>
				<el-table-column  header-align='left' prop="operator" label="发售人" min-width="100"></el-table-column>
			</el-table>
			<div class="pagination-container" v-if='tableData.length>0'>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.rows" layout="prev, pager, next,total, jumper,sizes" :total="total">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="撤销优惠券" size="tiny" :visible.sync="dialogCouponVisible" custom-class="dialog_coupon" >
			<div class="coupon_cancle_select">
				<em>已选择优惠券<span v-model="multipleSelection">{{multipleSelection.length}}</span>张</em>
			</div>
			<div class="coupon_scroll">
				<el-table v-loading="loading" empty-text='暂无任何数据' style='width:648px;' element-loading-text="给我一点时间" :data="multipleSelection">
					<el-table-column :formatter="isNotNullFormat" header-align='left' prop="code" label="券号" width="200"></el-table-column>
					<el-table-column :formatter="isNotNullFormat" header-align='left' prop="name" label="会员姓名" width="180"></el-table-column>
					<el-table-column :formatter="isNotNullFormat" header-align='left' prop="mobil" label="会员手机号" width="200"></el-table-column>
					<el-table-column header-align='center' align='center'  v-if='tableData.length>0' label="操作" width="68">
						<template scope="scope">
							<em @click='deleteSelectCoupon(scope.row)'>删除</em>
						</template>
					</el-table-column>
				</el-table>
			</div>
				<el-form>
	        		<el-form-item label="撤销原因:" >
					    <el-select v-model="reasonChecked"  placeholder="请选择" style="width:230px;margin-right:5px;">
						    <el-option v-for="item in filterReason" :key="item.id" :label="item.text" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="备注:" label-width="70px">
					   <el-input type="textarea" v-model="remark" placeholder="最多输入50字" style="width:448px;"></el-input>
					</el-form-item>
		        </el-form>
	        
			<div class="coupon_close">
				<div class="bottom_64_32">
					<el-button size='large' @click="dialogCouponVisible = false">取消</el-button>
					<el-button size='large' :loading='loading1' @click='saveRevertCoupon' type='primary'>确定</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Assist from '@/utils/assist';
	import { fetchList,serachByActivityName } from '@/api/article'
	import { getHuiyuanQudao} from '@/api/home'
	import { getAddRevertCouponList,getRevertReasonList,getUserList,getActivityTypesList,updateCouponRevertStatus,saveRevertCoupon,getFindOrgans} from '@/api/coupon'
	import { TzxTag, TzxOption } from '@/components/tag'
	import axios from "axios"
	
	export default {
		components: {
			TzxTag,
			TzxOption
		},
		watch: {
	      filterText(val) {
	        this.$refs.classTree.filter(val);
	      }
	    },
		data() {
			return {
				iscaret:false,
				//处理活动赠礼的样式
      			isclass:false,//不显示块
      	
				search_text: '',//下拉搜索框
      			search_type: '会员', //下拉搜索框
				
				multipleSelection: [],//已经选中数据
				tableData: [],//列表数据
				
				dialogCouponVisible:false,//撤销优惠券弹出框
				
				searchVisible:false,//高级搜索标识符
				labelPosition: 'right',//高级搜索 label右对齐
				dialogSearchVisible:false,//高级搜索
				
				reasonChecked:'',//选中得撤销原因
				filterReason: [],//原因状态过滤
				remark:"",//备注
				
				activityTypes: [],//活动类型
				activityTypesChecked:[],//已经选中得活动类型
				
			    chanels:[],//投放渠道
			    chanelsChecked:[],//选中的投放渠道   
			    
			    users: [],//发售人
				usersChecked:[],//选中发售人
				
				/*organs: [],//发售机构
				organsChecked:[],//选中发售机构*/
				
				listQuery: {
					member: '',//会员手机号或者名称
					coupons_code:'',//优惠券券号
					store_ids:'',//发售机构
					eids:'',//发售人
					activity_types:'',//活动类型
					send_chanels:'',//发售渠道
					page: 1, //当前页
					rows: 10,//页大小
				},
				loading: false,
				loading1: false,
				loading2: false,
				total: 0,
				showpop: false,
				maxHeight: undefined,
				hoverId: '',
				dialogVisible: false,
				id: undefined,
				
				isselecttree:false,//是否显示树
				orgnames:"",//被选择的机构字符串
				selectTreeDataChecked:[],//下拉树选择的数据
				selectTreeData: [],
		        defaultProps: {
		          children: 'children',
		          label: 'name',
		          id:'id'
		        },
		       filterText: ''
			}
		},
		
		methods: {
			handleIconClick(){
				this.isselecttree = !this.isselecttree;
				this.iscaret = !this.iscaret;
			},
			boxChange:function(e){
	    		this.selectTreeDataChecked = this.$refs.classTree.getCheckedNodes(true);
	    		this.orgnames = "";
	    		let names = [];
	    		this.selectTreeDataChecked.forEach(item=>{
	    			names.push(item.name)
	    		})
	    		this.orgnames = names.join(",");
			},
           	filterNode(value, data) {
            	if (!value) return true;
            	return data.name.indexOf(value) !== -1;
            },
			dataFormat(row, column) {
				if(row[column.property]==''||row[column.property]==null){
					return '--'
				}else{
					let arrays =  this.activityTypes.filter(item=>{
						let temp = "'"+row[column.property]+"'";
							return temp == item.id
					})
					return arrays[0].text;
				}
			},
			loadQudao(){//发售渠道
				getHuiyuanQudao().then((response) => {
					this.chanels = response;
				})
				/*axios.get('http://localhost:9280/static/coupon_qudao.json').then((response) => {
					this.chanels = response.data;
				});*/
			},
			loadReason(){//撤销原因
				getRevertReasonList().then((response) => {
					this.filterReason = response;
				})
				/*axios.get('http://localhost:9280/static/coupon_reason.json').then((response) => {
					this.filterReason = response.data;
				});*/
			},
			loadUser(){//发售人
				getUserList().then((response) => {
					this.users = response;
				})
				/*axios.get('http://localhost:9280/static/coupon_user.json').then((response) => {
					this.users = response.data;
				});*/
			},
			loadActivityTypes(){//活动类型
				getActivityTypesList().then((response) => {
					this.activityTypes = response;
				})
				/*axios.get('http://localhost:9280/static/coupon_activity_type.json').then((response) => {
					this.activityTypes = response.data;
				});*/
			},
			loadOrgans(){//发售机构
				
				getFindOrgans().then((response) => {
					this.selectTreeData = response;
				})
				/*axios.get('http://localhost:9280/static/coupon_organs_tree.json').then((response) => {
					this.selectTreeData = response.data;
				});*/
			},
			searchReset(){
				this.activityTypesChecked = [];
				this.chanelsChecked = [];
				this.usersChecked = [];
				this.selectTreeDataChecked = [];
				this.orgnames = "";
			},
			
			//删除本条选中的记录
			deleteSelectCoupon(row){
				let arrays = [];
				this.multipleSelection.forEach(item=>{
					if(item.id != row.id){
						arrays.push(item)
					}
				});
				this.multipleSelection = arrays;
				
				//表格选中框绑定
				this.$refs.multipleTable.toggleRowSelection(row,false);
			},
			searchCancle(){//高级搜索取消
				this.searchVisible = !this.searchVisible;
			},
			handleSelectionChange(val) {//表格选中的数据
		      this.multipleSelection = val;
		    },
			addCouponRevert(){//新增优惠券撤销
				this.$router.push('/coupon/addrevertcouponlist');
			},
			isNotNullFormat(row, column) {
				let value = row[column.property];
				if(value == "" || value == null || value == undefined) {
					return '--'
				}
				return value;
			},
			
			handleSizeChange(val) {//改每页显示数量大小
				this.listQuery.rows = val
				this.getList()
			},
			handleCurrentChange(val) {//改变当前页码
				this.listQuery.page = val
				this.getList()
			},
			getFirstList() {
				if(window.screen.height <= 768) {
					this.listQuery.rows = 10;
					this.maxHeight = '450';
				} else {
					this.maxHeight = '650';
				}
				this.getList();
			},
			searchName() {//会员名称搜索
				_czc.push(["_trackEvent", "优惠券撤销-新增优惠券撤销会员名称搜索", "点击"]);//统计流量
		    	let type = this.search_type;
		    	this.listQuery.page = 1;
		    	 if(type.indexOf("会员卡")!=-1){//判断是优惠券
		    		this.listQuery.member = "";
					this.listQuery.coupons_code = this.search_text;
					this.getList();
		    	}else if(type.indexOf("会员")!=-1){//判断是会员
		    		this.listQuery.member = this.search_text;
					this.listQuery.coupons_code = "";
					this.getList();
		    	}
		    },
		    saveRevertCoupon(){//撤销优惠券 保存接口
		    	_czc.push(["_trackEvent", "优惠券撤销-新增优惠券撤销保存", "点击"]);//统计流量
				let ids = [];
				this.multipleSelection.forEach(item =>{
					ids.push(item.id);
			    });
			    
			    /*let reason = [];
			    this.reasonChecked.forEach(item =>{
					reason.push(item.id);
			    });*/
			    
			    let data = "ids="+ids+
			    "&reason="+this.reasonChecked+
			    "&remark="+this.remark;
			          
			    saveRevertCoupon(data).then((response) => {
					if(response.success) {
						this.$message({
							type: 'success',
							message: '保存成功'
						});
						//关闭当前对话框
						this.dialogCouponVisible = false;
						this.getList();
					} else {
						this.$message({
							type: 'error',
							message: '保存失败'
						});
					}
				})
		    },
			searchList(){//高级搜索确定
				_czc.push(["_trackEvent", "优惠券撤销-新增优惠券高级搜索", "点击"]);//统计流量
				this.searchVisible = !this.searchVisible;
				this.listQuery.page = 1;
				if(this.chanelsChecked !=null){
					this.listQuery.send_chanels = this.chanelsChecked.join(",");
				}
				if(this.usersChecked !=null){
					this.listQuery.eids = this.usersChecked.join(",");
				}
				if(this.activityTypesChecked !=null){
					this.listQuery.activity_types = this.activityTypesChecked.join(",");
				}
				
				let stores = [];
	    		this.selectTreeDataChecked.forEach(item=>{
	    			stores.push(item.id)
	    		})
	    		this.listQuery.store_ids = stores.join(",");
				
				//高级搜索
				//清空会员信息，页数和条数 重置
				this.listQuery.member="";
				this.listQuery.coupons_code="";
				this.listQuery.page=1;
				
				this.getList();
			},
			getList() {
				_czc.push(["_trackEvent", "优惠券撤销-新增优惠券撤销查询", "点击"]);//统计流量
				//this.loading = true;
				    //重置撤销选中优惠券表单
		            this.reasonChecked="";
		            this.remark="";
				    
				    
				    let data = 'member=' + this.listQuery.member +
				     			'&coupons_code=' + this.listQuery.coupons_code +
							   '&store_ids=' + this.listQuery.store_ids +
					           '&eids=' + this.listQuery.eids +
							   '&activity_types=' + this.listQuery.activity_types+
							   '&send_chanels=' + this.listQuery.send_chanels+
					           '&page=' + this.listQuery.page +
							   '&rows=' + this.listQuery.rows
				    
					getAddRevertCouponList(data).then(response => {
						this.tableData = response.rows;
						this.total = response.total;
					});
					/*axios.get('http://localhost:9280/static/addRevertCouponList.json').then((response) => {
						this.tableData = response.data.rows;
						this.total = response.data.total;
						this.loading = false;
					})*/
			},
			filterTag(value, row) {
	
			},
			
			showPopover(hoverId) {
				this.showpop = true;
				this.hoverId = hoverId;
			},
			hidePopover(hoverId) {
				this.hoverId = 0;
				this.showpop = false;
			}
		},
		mounted(){
			//活动类型
			this.loadActivityTypes();
			//发售渠道
			this.loadQudao();
			//发售人
			this.loadUser();
			//发售机构
			this.loadOrgans();
			//撤销原因
			this.loadReason();
			//查询列表
			this.getFirstList();
			
		},
		created() {
			
		},
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "src/styles/mixin.scss";
	.tzx-ul {
		padding: 4px 0px;
	}
	
    .el-icon-dropdown:before {
   		font-size: 14px;  
	}
    .el-icon-dropup:before {
    	font-size: 14px;
  	}
	.tzx-select {
		position: relative;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #34495E;
		height: 28px;
		font-size: 12px;
		line-height: 28px;
		box-sizing: border-box;
		cursor: pointer;
	}
	
	.tzx-select:hover {
		background: #F2F6FB;
		color: #0C9AFF;
		text-decoration: underline;
	}
	
	.tzx-text {
		height: 28px;
		line-height: 28px;
	}
	/*****复制活动弹出框 开始*******/
	
	.fzhd {
		margin-top: 13px;
	}
	
	.fzhd .fzhd_item {
		clear: both;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		line-height: 28px;
		margin-left: 30px;
		margin-right: 30px;
	}
	
	.fzhd .fzhd_item tt {
		color: #ff7171;
	}
	
	.fzhd .fzhd_item b {
		display: block;
		float: left;
		width: 100px;
		color: #758896;
		margin-bottom: 14px;
	}
	
	.fzhd .fzhd_item em {
		display: block;
		float: left;
	}
	
	.fzhd .fzhd_item_object {
		display: block;
		float: left;
		color: #576D7A;
		width: 470px;
	}
	
	.fzhd .fzhd_item_object cite {
		display: block;
		float: left;
		width: 70px;
		font-style: normal;
		/*margin-bottom: 12px;*/
	}
	
	.fzhd .fzhd_item_object2 {
		display: block;
		margin-left: 70px;
		float: left;
		color: #576D7A;
	}
	
	.fzhd .fzhd_item_object2 p {
		margin: 0;
		float: left;
		font-style: normal;
		color: #34495E;
		width: 400px;
		line-height: 22px;
		margin-top: 3px;
	}
	
	.fzhd_item .el-input .el-input__inner {
		width: 400px;
	}
	
	.coupon_close {
		 /* position: fixed; */
	    /* margin-top: 54px; */
	    height: 60px;
	    background: #F4F9FC;
	    position: absolute;
	    bottom: 0;
	    width: 680px;
	}
	
	.coupon_close .bottom_64_32 {
		margin-top: 14px;
		text-align: center;
		margin-left: 265px;
	}
	
	.coupon_close .bottom_64_32 .queding {
		margin-left: 0px;
		margin-right: 10px;
	}
	/*****复制活动弹出框 结束*******/
	
	.el-dialog__body {
		.dialogbody {
			height: auto;
			padding-top: 20px;
			padding-bottom: 30px;
			.itemclass {
				height: auto;
				min-height: 28px;
				overflow: hidden;
				.itemleft {
					position: relative;
					width: 100px;
					height: auto;
					min-height: 28px;
					line-height: 28px;
					text-align: right;
					float: left;
					span {
						font-size: 14px;
						color: #758896;
						line-height: 14px;
						padding-right: 5px;
					}
				}
				.itemright {
					position: relative;
					float: right;
					width: 500px;
					line-height: 28px;
					height: auto;
					text-align: left;
					padding-left: 5px;
					.store {
						padding: 0 3px;
						position: relative;
						float: left;
						color: #34495E;
					}
					.itemcontent {
						min-height: 28px;
						overflow: hidden;
						.itemrightleft {
							position: relative;
							float: left;
							width: 70px;
							min-height: 28px;
							height: auto;
						}
						.itemrightright {
							position: relative;
							height: auto;
							float: right;
							width: 425px;
							.cardcoupon {
								padding: 0 3px;
								position: relative;
								float: left;
								color: #34495E;
								em {
									color: red
								}
							}
						}
						.itemrightright1 {
							position: relative;
							float: left;
							.cardcoupon {
								padding: 0 3px;
								position: relative;
								float: left;
								color: #34495E;
							}
						}
					}
					span {
						font-size: 14px;
						color: #34495E;
						line-height: 14px;
					}
				}
			}
		}
		.dialogfooter {
			line-height: 60px;
			height: 60px;
			text-align: center;
			background: #F4F9FC;
		}
	}
	/*批量操作*/
	.operate{
		margin:0;
		padding:0;
		height:49px;
		width:100%;
		border:1px solid #EFF7FC;
		margin-bottom:10px;
		line-height: 50px;
	}
	.operate em{
		margin-left:10px;
		font-size:12px;
	}
	.operate em span{
		color:#FF7171;
	}
	/*.app-container{
		display:inline-table;
		width: 100%;
	}*/
	/********高级搜索 开始*********/
	.filter-container .botton_text{
		margin-left:10px;
		color:#0c9aff;
	}
	.filter-container .botton_text:hover{
		margin-left:10px;
		color:#108ee9;
	}
	.maskLayer{
		position: absolute;
	    z-index: 1000;
	    width: 100%;
	    height: 100%;
	    -moz-opacity: 0.5;
	    filter: alpha(opacity=50);
	    opacity: 0.15;
	    background: #000000;
	}
	.search_zr{
		z-index: 1001;
	    position: absolute;
	    top: 0px;
	    min-height: 180px;
	    background: rgb(255, 255, 255);
	    padding-bottom: 20px;
	}
	.search_zr .main{
		margin-left:30px;
		padding-top:35px;
	}
	.search_zr .main .el-form .el-form-item{
		width:500px;
		display: inline-table;
		margin-bottom: 0px;
		vertical-align: top;
	}
	.search_zr .main .el-form .el-form-item .el-select .el-tag{
		background: #F2F6FB;
		border: none;
		color: #34495E;
	}
	.search_zr .main .el-form .tonglan{
		width:1000px;
		display: inline-block;
	}
	.search_zr .main .el-form .el-form-item{/**行高**/
		margin-bottom:20px;
	}
	.search_zr .main .el-form .el-form-item .el-form-item__label{
		width:100px;
		margin-left:10px !important;
	}
	.search_zr .quxiao_and_tijiao{
		margin-left:130px;
	}
	.search_zr .quxiao_and_tijiao .bottom_64_32{
		    margin-left: 0px; 
    		margin-top: 0px;
    		margin-bottom: 0px;
	}
	.search_zr .quxiao_and_tijiao .bottom_64_32 .queding{
		margin-right:10px;
	}
	.search_zr .quxiao_and_tijiao .bottom_64_32 .quxiao{
		margin-right:10px;
	}
	.search_zr .quxiao_and_tijiao .bottom_64_32 .botton_text{
		line-height:32px;
		height:32px;
		color:#0c9aff;
	}
	.search_zr .quxiao_and_tijiao .bottom_64_32 .botton_text:hover{
		color:#108ee9;
	}

	.appclass{
		position: relative;
	}
	/***机构树***/
	.search_zr .main .el-form{
		margin-top: 0px; 
	}
	.search_zr .main .select-input-zr{
		width:230px;
	}
	.search_zr .main .select-input-zr .el-input__inner{
		width:230px;
	}
	.select-tree-zr{
		margin-top:10px;
		margin-left:10px;
		width:230px;
		background-color: #F5FBFE;
		height:auto;
		position: absolute;
		top: 30px;
		z-index: 1002;
	}
	.select-tree-zr .el-input{
		margin-top:10px;
		margin-left:10px;
		margin-right:10px;
		width:210px;
	}
	.select-tree-zr .el-tree{
		overflow-y: auto;
		height:200px;
		margin-bottom: 40px;
	}
	.select-tree-zr .el-tree .el-tree-node__content{
		width:230px;
	}
	.select-tree-zr .el-tree .el-tree-node__content .el-checkbox{
		float:right;
	}
	/********高级搜索 结束*********/
	
	/********选中优惠券对话框 开始*********/
	.dialog_coupon{
		width:680px;
		height:600px;
	}
	.dialog_coupon .el-table{
		margin-left: 16px;
	    margin-right: 16px;
	    width: 648px;
	    font-size:14px;
	}
	.dialog_coupon .el-table .cell em{
		color: #0C9AFF
	}
	.dialog_coupon .el-table .cell em:hover{
		color: #108ee9;
		cursor:pointer;
	}
	.dialog_coupon .coupon_cancle_select{
		background: #FFFAEB;
		height:28px;
		line-height: 28px;
	}
	.dialog_coupon .coupon_cancle_select em{
		margin-left:16px;
		font-size: 12px;
		color: #243546;
	}
	.dialog_coupon .coupon_cancle_select em span{
		font-size: 12px;
		color: #FF7171;
	}
	.dialog_coupon .el-table{
		height:auto;
		min-height: 40px;
	}
	.dialog_coupon .el-textarea .el-textarea__inner{
		width:578px;
	}
	.dialog_coupon .el-form{
		margin-top: 20px;
	}
	.dialog_coupon .el-form .el-form-item__label{
		margin-left: 16px;
	}
	.dialog_coupon .coupon_scroll{
		overflow-y: auto;
    	height: 320px;
	}
	.coupon_scroll .el-table .el-table__header{
		width:648px !important;
	}
	
	/********选中优惠券对话框 结束*********/
	
</style>