<template>
	<div class="memberLevelList">
		<div class="title">
			<h3>会员等级</h3>
			<span>配置会员等级和享受的会员权益及会员升、降级规则；等级编号越大会员等级越高，满足升级规则的会员将自动执行升、降级</span>
			<a href="javascript:;" class="addMemberLevel" @click='createMemberLevel'><span>+</span><span>新增会员等级</span></a>
		</div>
		<div class="main">
			<el-table :data="tableData" style="width: 100%" v-loading="loading" empty-text='暂无任何数据' element-loading-text="给我一点时间">
				<el-table-column type="index" label="等级编号" width="100"></el-table-column>
				<el-table-column prop="name" label="会员等级" width="140"></el-table-column>
				<el-table-column prop="store_integral" label="储值/积分" width="160"></el-table-column>
				<el-table-column prop="equity" label="享受权益" width="200"></el-table-column>
				<el-table-column prop="upgrade" label="升级规则" width="200"></el-table-column>
				<el-table-column prop="demotion" label="降级规则" width="160"></el-table-column>
				<el-table-column prop="operation" label="操作" align="center">
					<template scope="scope">
						<span @click="updateMemberLevel(scope.row.id)">编辑</span>
						<span @click="deleteMemberLevel(scope.row)">删除</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>	
</template>

<script>
	import { getMemberLevelList,deleteMemberLevel} from '@/api/member'
	// import Sortable from 'sortablejs'
	import Lodash from 'lodash'
	export default {
		data() {
			return {
			tableData: [],
			loading: true
			}
		},
		methods: {
			memberLevelList(){
				getMemberLevelList().then(response => {
					let data = response.data;
					if(data.length >= 0){
						this.loading = false;
						this.tableData = data;
					}	
				}).catch(() => {
					this.loading = false;
					this.$message({
						type: 'error',
						message: '网络异常'
					});
				});
			},
			createMemberLevel(){
				this.$router.push({
					path: '/member/member_level_set'
					
				});
			},
			updateMemberLevel(row){
				this.$router.push({
					path: '/member/member_level_set',
					query: {
						id: row
					}
				});
			},
			deleteMemberLevel(row){
				let data = 'id='+row.id;
				this.$confirm('是否删除该会员等级?', {
				showClose: false,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
				this.loadingBody = true;
				deleteMemberLevel(data).then(response=>{
					this.loadingBody = false;
					if(response.success){
						this.$message({
							type:'success',
							message:'删除成功'
						})
						this.memberLevelList();
					}
					else{
						this.$message({
							type:'error',
							message:response.msg
						})
					}
				}).catch(e=>{
					this.loadingBody = false;
					this.$message({
						type:'error',
						message:"操作失败！"
					})
				})
				})
			}	
		},
		created() {
			this.memberLevelList();
		},
    }
</script>

<style rel="stylesheet/scss" lang="scss">
	.memberLevelList{
		width: 100%;
		height: auto;
		background: #fff;
		overflow: hidden;
		.title{
			height: 49px;
			line-height: 50px;
			margin: 0 20px;
			border-bottom: #EAF1F6 1px solid;
			clear: both;
			overflow: hidden;
			h3{
				font-size: 16px;
				color: #34495E;
				height: 50px;
				line-height: 50px;
				display: inline-block;
				margin: 0 14px 0 0;
			}
			span{
				height: 50px;
				line-height: 50px;
				font-size: 12px;
				color: #9AABB8;
			}
			a.addMemberLevel{
				width: 112px;
				height: 28px;
				line-height: 28px;
				text-align: center;
				background: #FF9001;
				margin: 10px 0;
				display: inline-block;
				color: #fff;
				border-radius: 3px;
				float: right;
				span:nth-child(1){
					font-size: 16px;
					display: inline-block;
					height: 28px;
					line-height: 28px;
					color: #fff;
					float: left;
    				margin-left: 12px;
   					margin-right: -8px;
				}
				span:nth-child(2){
					font-size: 12px;
					display: inline-block;
					height: 28px;
					line-height: 28px;
					color: #fff;
				}
			}
		}
		.main{
			padding: 20px;
			clear: both;
			overflow: hidden;
		}
		.el-table .cell{
			color: #243546;
			span{
				color: #0C9AFF;
				 cursor:pointer;
			}
		}
		.el-table th > .cell{
			color: #243546;
			font-weight: bold;
		}
		.el-table tbody tr{
			height: 56px;
		}
	}
</style>