<template>
	<div class="memberLevelList">
		<div class="title">
			<h3>会员等级</h3>
			<span>配置会员等级和享受的会员权益及会员升降级规则；等级编号越大会员等级越高，满足升级规则的会员将自动执行升降级</span>
			<a href="javascript:;" class="addMemberLevel" @click='createMemberLevel'><span>+</span><span>新增会员等级</span></a>
		</div>
		<div class="main">
			<!--{{tableData}}-->
			<ul class="table_header">
				<li style="width:100px;padding-left:20px;">等级编号</li>
				<li style="width:100px">会员等级</li>
				<li style="width:100px">积分/储值/折扣</li>
				<li style="width:180px">享受权益</li>
				<li style="width:180px">升级规则</li>
				<li style="width:180px">降级规则</li>
				<li style="width:100px;text-align:center;">默认入会等级</li>
				<li style="width:100px;text-align:center;">操作</li>
			</ul>
			<div class="levelList">	
				<draggable :move="getdata" @update="datadragEnd">
					<transition-group>
						<ul class="table_body" v-for="(item,index) in tableData" :key="item.id" :id="item.id">
							<el-radio-group :key='item.id' v-model="valid_state" @change='defaultLevel' >
								<li style="width:100px;padding-left:20px;"><icon-svg icon-class="drag"></icon-svg>{{index+1}}</li>
								<li style="width:100px">{{item.name}}</li>
								<li style="width:100px">
									<span v-for="item2 in item.store_integral">{{item2}}</span>
								</li>
								<li style="width:180px">
									<span v-for="item3 in item.equity">{{item3}}</span>
								</li>
								<li style="width:180px">
									<span v-for="item4 in item.upgrade">{{item4}}</span>
								</li>
								<li style="width:180px">
									<span v-for="item5 in item.demotion">{{item5}}</span>
								</li>
								<li style="width:100px;text-align:center;"> 
									<el-radio class="radio" :label='item.id'>{{stringnull}}</el-radio>
								</li>
								<li style="width:100px;text-align:center;" class="operation">
									<span @click="updateMemberLevel(item.id)">编辑</span>
									<span @click="deleteMemberLevel(item.id)">删除</span>
								</li>
							 </el-radio-group>
						</ul>
					</transition-group>
				</draggable>
			</div>
		</div>
	</div>	
</template>

<script>
	import { getMemberLevelList,deleteMemberLevel,dragUpdateMemberLevel,defaultLevel} from '@/api/member'

	import draggable from 'vuedraggable'
	import Lodash from 'lodash'
	export default {
		components: {
		　　draggable
		},
		data() {
			return {
			tableData: [],
			loading: true,
			valid_state:'1',
			stringnull:'',
			levelId:'',
			}
		},
		 watch: { 
			levelId(newVal,oldVal){
				if(newVal){
					let data = 'id='+newVal;
					defaultLevel(data).then(response => {
						let data = response.data;
						if(response.success){
							this.$message({
								type:'success',
								message:'默认等级成功'
							})
							this.memberLevelList();
						}else{
							this.$message({
								type:'error',
								message:response.msg
							})
						}
					})
				}
			}
		},
		methods: {
			getdata (evt) {
		    },
			//修改会员等级
		    datadragEnd (evt) {
				let idArray = [];
				let list = $('.levelList ul');
				list.forEach((item,index) => {
					idArray.push({
						id: item.id,
						level_order: index
					});
				});
				
				let data = 'tl='+JSON.stringify(idArray);
		       	dragUpdateMemberLevel(data).then(response => {
					this.loading = false;
					if(response.success){
						this.memberLevelList();
					}	
				}).catch(() => {
					this.loading = false;
					this.$message({
						type: 'error',
						message: '网络异常'
					});
				});
		    },
			//获取会员等级列表
			memberLevelList(){
				getMemberLevelList().then(response => {
					let data = response.data;
					if(data.length >= 0){
						this.loading = false;
						this.tableData = data;
					    this.valid_state = data.filter(item=>item.valid_state==1)[0].id;
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
					path: '/member/member_level_set',
					hash: 'new'
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
			//删除会员等级
			deleteMemberLevel(row){
				let data = 'id='+row;
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
					}else{
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
			},
			//默认入会等级
			defaultLevel(id){ 
				this.levelId  = id ;
			}
		},
		created() {
			_czc.push(["_trackEvent", "会员中心-会员等级-会员等级列表", "点击"]);//埋点统计
			this.memberLevelList();
		},
    }
</script>

<style rel="stylesheet/scss" lang="scss">
	
	.memberLevelList{
		 .el-radio__inner {
		    border-color: #20a0ff;
		    background: #fff;
		    height: 14px;
		    /* width: 14px; */
		    width: 14px !important;
		}
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
				margin: 0 14px 0 10px;
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
			.table_header{ /*表头*/
			    white-space: nowrap;
			    overflow: hidden;
			    background-color: #eef1f6;
			    text-align: left;
			    height:40px;
				li{
					width:100px;
					float:left;
					line-height:40px;
					color: #243546;
					font-size: 12px;
					font-weight: bold;
				}
			}
			.table_body{
			    overflow: hidden;
			    text-align: left;
				padding: 20px 0;
				border-bottom: 1px solid #F3F3F3;
				border-top: 1px solid #fff; 
				li{
					width:100px;
					float:left;
					line-height: 16px;
			        vertical-align: middle;
					font-size: 12px;
					min-height: 20px;
					color: #243546;
					span{
						display: block;
						width: 100%;
					}
					svg{
						margin-right: 2px;
						width: 16px;
						height: 16px;
						vertical-align: bottom;
					}
				}
				.operation{
					span{
						display: inline-block;
						color: #0C9AFF;
						width: 30%;
						cursor:pointer;
					}
				}
			}
			.table_body:hover{
				border-top: #E7F1FD 1px solid;
				border-bottom: #E7F1FD 1px solid;
				background: #F2F6FB;
			}
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