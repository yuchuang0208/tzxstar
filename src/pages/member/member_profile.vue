<template>
	<div class='applist'>
        	<el-dialog title="文件上传"  @close='closeDialog' :visible.sync="dialogupload" size="copy" >
				 <el-upload
				  :on-success='uploadSuccess'
				  :on-error='uploadError'
				  :before-upload="beforeAvatarUpload"
				  :action='action'
				  :on-change="handleChange"
				  :file-list="fileList"
				   name='fileToUpload'>
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只支持XLSX/XLS格式的文件文件，且不超过10M</div>
				</el-upload> 
			</el-dialog>
		<div class='listtitle'>
			<span>会员数据统计</span>
		</div>
		<div class='membermessage'>
			<ul>
				<li v-for='member in memberMessages'>
					<div class='membermessageleft'>
						<img :src='member.src' style='width: 36px;height: 36px;' />
					</div>
					<div class='membermessageright'>
						<span>{{member.text}}</span>
						<em v-bind:title='member.total | currency' v-if='member.text.indexOf("金额")!=-1'>{{member.total | currency}}</em>
						<em v-bind:title='member.total | currency' v-else>{{member.total | thousand}}</em>
					</div>
				</li>
			</ul>
		</div>
		<div class='memberlist'>
			<div class='membersearch'>
				<el-input placeholder="请输入手机号/昵称" icon="search" v-model="listQuery.text" size='small' style='width:200px' :on-icon-click="handleIconClick">
				</el-input>
				<el-date-picker @change='dateChange' size='small' v-model="daterange" type="daterange" placeholder="选择入会时间">
				</el-date-picker>

			    <el-popover
					  ref="popover"
					  placement="bottom"
					  width="100"
					  trigger="hover">
					<ul  class='tzx-ul'>
						<li  class="tzx-select" style='text-align: center;'>
							<span class='tzx-text'><a style='font-size: 12px;' :href='downhref' >下载模板</a></span>
						</li>
						<li  @click='uploadMemberMessage' class="tzx-select" style='text-align: center;'><span class='tzx-text'>导入会员</span></li>
					</ul>

				</el-popover>

				<el-button @click='upload' v-popover:popover  style='float: right;margin-top: 11px;'>导入 <i class="el-icon-dropdown el-icon--right"></i></el-button>
			</div>
			<div class='membertable'>
				<el-table v-loading="loading" empty-text='暂无任何数据' element-loading-text="给我一点时间" :data="tableData" style="width: 100%"  @filter-change="filterChange" @sort-change="sortChange">
					<el-table-column :formatter="isNotNullFormat" column-key='store' prop="fullname" :filters="filterOrgans" label="入会门店" min-width="100"></el-table-column>
					<el-table-column :formatter="isNotNullFormat" header-align='center' align='center' prop="name" label="姓名" min-width="100"></el-table-column>
					<el-table-column :formatter="isNotNullFormat" header-align='center' align='center' prop="alias" label="昵称" min-width="100"></el-table-column>
					<el-table-column :formatter="isNotNullFormat" header-align='center' align='center' prop="phone" label="手机号" min-width="110"></el-table-column>
					<el-table-column :formatter="isNotNullFormat" column-key='level'   prop="levelname" :filters="filterMemberLevel" label="等级" min-width="100"></el-table-column>
					<el-table-column :formatter="chanelFormat" column-key='chanel'  prop="addchanel" :filters="filterMemberChanel"  label="来源" min-width="100"></el-table-column>
					<el-table-column :formatter="isNotNullFormat" prop="consumptioncount" header-align='right' align='right' sortable label="消费次数" min-width="100"></el-table-column>
					<el-table-column :formatter="toDecimal2Format" prop="totalcost" header-align='right' align='right' sortable label="消费总金额" min-width="120">
						<template scope ='scope'>
				      		{{scope.row.totalcost|currency}}					
				      	</template>	
					</el-table-column>
					<el-table-column :formatter="toDecimal2Format" prop="maintrading" header-align='right' align='right' sortable label="充值总金额" min-width="120">
						<template scope ='scope'>
				      		{{scope.row.maintrading|currency}}					
				      	</template>	
					</el-table-column>
					<el-table-column :formatter="isNotNullFormat" prop="usefulcredit" header-align='right' align='right' sortable label="可用积分" min-width="100"></el-table-column>
					<el-table-column :formatter="isNotNullFormat" prop="addtime" label="入会时间" sortable min-width="100"></el-table-column>
					<el-table-column prop="state" label="状态" min-width="100">
						<template scope="scope">
							<tzx-tag :color="scope.row.state | statusFilter">{{scope.row.state | valueFilter}}</tzx-tag>
						</template>
					</el-table-column>
					<el-table-column fixed='right' header-align='center' align='center' label="操作" width="90">
						<template scope='scope'>
							<tzx-tag color="#0C9AFF" @clickThis='findDetail(scope.row)'>查看</tzx-tag>
						<!--	<tzx-tag color="#0C9AFF" @clickThis='update(scope.row)'>编辑</tzx-tag>-->
						</template>

					</el-table-column>

				</el-table>
				<div class="pagination-container" v-if='tableData.length>0&&total>firstPageSize'>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.rows" layout="prev, pager, next,total, jumper,sizes" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { membera, memberb, memberc, memberd, membere, memberf, memberg, memberh } from '@/assets/member'
	/*import { getMembers } from '@/api/article'*/
	import { getMembers,getMemberCount,findAllOrganAndLevelAndChanel,findCustomerById } from '@/api/member'
	import {getMemberLevel,getsysParamer} from '@/api/parameter'
	import { TzxTag } from '@/components/tag'
	import store from '@/store'
	export default {
		components: {
			TzxTag
		},
		data() {
			return {
				firstPageSize:this.$store.state.user.screenPageSize,
				dialogupload:false,
				action:'../../../crm/importmfRest/importmf?_s='+store.state.user.session,
	        	fileList: [],
				downhref:'../../../img/upload/member.xlsx?_s='+store.state.user.session,
				filterOrgans:[],
				filterMemberLevel:[],
				filterMemberChanel:[],
				daterange:'',
				fileList: [],
				tableData: [],
				loading: false,
				memberMessages: [{
						src: memberb,
						text: '会员总数(除粉丝)',
						total: 0,
						id:'hyzs',
					},
					{
						src: membera,
						text: '储值主账户沉淀金额',
						total: 0,
						id:'zzhye',
					},
					{
						src: membere,
						text: '储值赠送账户沉淀金额',
						total: 0,
						id:'rszhye',
					},
					{
						src: memberc,
						text: '可用积分总数',
						total: 0,
						id:'zjf'
					}
				],
				listQuery: {
					page: 1,
					rows: this.$store.state.user.screenPageSize,
				    text:'',
				    startDate:'',
				    endDate:'',
				    levels:'',
				    chanels:'',
				    stores:'',
					sort: 'id',
					order: 'asc'
				},
				total: 0
			}
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					'0': '#FF7171',
					'1': '#34495E',

				}
				return statusMap[status]
			},
			valueFilter(value) {
				const statusMap = {
					'0': '停用',
					'1': '正常',
				}
				return statusMap[value]
			}
		},
		methods: {
			closeDialog(){
				this.getAllMembers();
			},
			uploadSuccess(response, file, fileList){
				_czc.push(["_trackEvent", "会员中心-会员档案", "会员导入"]);//埋点统计
				  let mes = '';
		    	   mes += "有效会员:"+response.listcustomersize+"条;";
		    	   mes += "导入会员信息:"+response.addc+"条;";
		    	   mes += "有效会员卡:"+response.listcardsize+"条;";
		    	   mes += "导入会员卡信息:"+response.addcc+"条;";
		    	   if(response.ecmsg)
		    	   {
		    		   mes += "无效会员数据:第 "+response.ecmsg+" 行;";
		    	   }
		    	   if(response.eccmsg)
		    	   {
		    		   mes += "无效会员卡数据:第 "+response.eccmsg+" 行;";
		    	   }

    	   			mes +="";
				if(response.success){
					this.$confirm(mes, {
						showClose: false,
						showCancelButton: false,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'info'
					})
				}
				else{
					this.$message({
						type:'error',
						message:response.msg
					})
				}
			},
			uploadError(err, file, fileList){
				this.$message({
						type:'error',
						message:err
				})
			},
			beforeAvatarUpload(file){
				let fileName = file.name;
    	        let file_typename = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
				const isXls = file_typename.toUpperCase() == '.XLSX' || file_typename.toUpperCase() == '.XLS' ;
		        const isLt2M = file.size / 1024 / 1024 < 10;

		        if (!isXls) {
		          this.$message.error('只支持XLSX和XLS格式的文件!');
		        }
		        if (!isLt2M) {
		          this.$message.error('文件大小控制在10M以内!');
		        }
		        return isXls && isLt2M;
			},
			uploadMemberMessage(){
				this.dialogupload = true;
			},
			handleChange(file, fileList) {
				if(this.beforeAvatarUpload(file)){
					this.fileList = fileList.slice(-10);
				}
	      	},
			upload() {

			},
			chanelFormat(row, column) {
				if(row[column.property]==''||row[column.property]==null){
					return '--'
				}
				else{
					let filtertext = this.filterMemberChanel.filter(item=>{
					  	return	row[column.property]== item.value
					})
					if(filtertext.length>0){
						return filtertext[0].text;
					}
					else{
						return row[column.property];
					}
				}

			},
			 handleIconClick(ev) {
			 	this.listQuery.page = 1
      			this.getAllMembers();
    		},
			dateChange(date){
				if(date != "" && date != null && date != undefined) {
					this.listQuery.startDate = date.substring(0, 10);
					this.listQuery.endDate = date.substring(13, 23);
				}
				else{
					this.listQuery.startDate = '';
					this.listQuery.endDate = '';
				}
				this.listQuery.page = 1
				this.getAllMembers()
			},
				/* 排序条件发生变化触发*/
			sortChange({column,prop,order}) {
                if(prop==null){
                	this.listQuery.sort = 'id';
                }
                else{
                	this.listQuery.sort = prop;
                }
				this.listQuery.page = 1;
				if(order=='ascending'){
					this.listQuery.order ='asc'
				}
				if(order=='descending'){
					this.listQuery.order ='desc'
				}
				this.getAllMembers()
			},
			/* 筛选条件发生变化触发*/
			filterChange(filters) {

				let key = Object.keys(filters)[0];
				let value = filters[key];
				let types = value.join(",");
				if(key == 'store'){
					this.listQuery.stores = types;
				}
				if(key == 'level'){
					this.listQuery.levels = types;
				}
				if(key == 'chanel'){
					this.listQuery.chanels = types;
				}
				this.getAllMembers()
			},

			handleSizeChange(val) {
				this.listQuery.rows = val
				this.getAllMembers()
			},
			handleCurrentChange(val) {
				this.listQuery.page = val
				this.getAllMembers()
			},
		/*	update(row) {
				this.$router.push({
					path: '/member/member_profile_update',
					query: {
						id: row.id
					}
				})
			},*/

			findDetail(row) {
				_czc.push(["_trackEvent", "会员中心-会员档案", "查看"]);//埋点统计
				this.$router.push({
					path: '/member/member_profile_detail',
					query: {
						id: row.id
					}
				})
			},
			getAllMembers() {
				_czc.push(["_trackEvent", "会员中心-会员档案", "详情"]);//埋点统计
				this.loading = true;
				let data ='page='+this.listQuery.page+
				          '&rows='+this.listQuery.rows+
				          '&text='+this.listQuery.text+
				          '&startDate='+this.listQuery.startDate+
				          '&endDate='+this.listQuery.endDate+
				          '&levels='+this.listQuery.levels+
				          '&chanels='+this.listQuery.chanels+
				          '&stores='+this.listQuery.stores+
				          '&sort='+this.listQuery.sort+
				          '&order='+this.listQuery.order;

				getMembers(data).then(response => {
					this.loading = false;
					if(response.success == true){
						this.tableData = response.rows;
						this.total = response.total;
					}
					else{
						this.$message({
							type: 'error',
							message: response.msg
						});
					}

				}).catch(e=>{
					this.loading = false;
					this.$message({
						type: 'error',
						message: '网络异常'
					});
				})
			}
		},
		mounted() {
             //获取系统参数   会员等级    入会渠道 入会门店
			let getChanel = 'type=0&code=chanel&y=1'

            getMemberLevel().then(response=>{
				response.map((item,index)=>{
					this.filterMemberLevel.push({text:item.name,value:item.id})
				});
			});
            getsysParamer(getChanel).then(response=>{
            	response.map((item,index)=>{
					this.filterMemberChanel.push({text:item.text,value:item.id})
				});

			});
			findAllOrganAndLevelAndChanel().then(response=>{
            	if(response.success){
            		response.organ.map((item,index)=>{
						this.filterOrgans.push({text:item.name,value:item.id})
					});
            	}
			});
			getMemberCount().then(response=>{
				this.memberMessages.map((item,index)=>{
					if(item.id=='hyzs'){
						item.total = response.hyzs;
					}
					if(item.id=='zzhye'){
						item.total = response.zzhye;
					}
					if(item.id=='rszhye'){
						item.total = response.rszhye;
					}
					if(item.id=='zjf'){
						item.total = response.zjf;
					}
				});
			});
			this.getAllMembers();
		},
		created() {
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">

	.el-dialog__body {
		padding: 30px;
		.el-upload {
			display: block!important;
		}
	}
	.el-message-box__wrapper .el-message-box .el-message-box__content .el-message-box__message p {
		word-wrap: break-word;
	}
	.tzx-ul {
		padding: 4px 0px;
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
			}
		}
		.membermessage {
			height: 70px;
			margin-top: 20px;
			margin-left: 30px;
			margin-right: 20px;
			ul {
				li {
					width: 30%;
					float: left;
					list-style: none;
					.membermessageleft {
						position: relative;
						float: left;
					}
					.membermessageright {
						margin-left: 10px;
						position: relative;
						float: left;
						span {
							display: block;
							font-size: 14px;
							color: #9AABB8;
							line-height: 14px;
						}
						em {
							height: 40px;
							line-height: 40px;
							font-size: 30px;
							color: #34495E;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							width: 250px;
							display: block;
						}
					}
				}
				li:first-child{
					width:20%;
					.membermessageright {
						em {
							width: 160px;
						}
					}
				}
				li:last-child{
					width: 20%;
					.membermessageright {
						em {
							width: 160px;
						}
					}
				}
			}
		}
		.memberlist {
			position: relative;
			padding: 0 20px;
			border:0 !important;
			.membersearch {
				height: 50px;
				line-height: 50px;
			}
		}
	}
</style>
