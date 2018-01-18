/**
 * 会员群体 dialog组件
 */
<template>
	 <el-dialog title="选择会员群体" custom-class='hdzl_qunti' :visible.sync="dialogQuntiVisible" :before-close="handleQuntiClose">
			<div>
				<el-input placeholder="请输入会员群体名称" size='small' icon="search" style='width:180px;margin-top: 16px;margin-bottom: 8px;margin-left: 16px;'>
				</el-input>
				<div class="select_title">
					已选择<span style='color: #FF4761;'>{{totalItem}}</span>项,共计<span style='color: #FF4761;'>{{member_total_count | thousand}}</span>人
				</div>
				<el-table ref="myTable" height="300px" :show-header=false :data="quntiData" @selection-change="handleSelectionChange" row-key="id">
					<el-table-column prop="group_name" label="会员群体" width="240" align="left"></el-table-column>
					<el-table-column prop="members_count" label="会员人数" width="230" align="left">
						 <template scope="scope">
						{{scope.row.members_count }}人
					</template>
					</el-table-column>
					<el-table-column type="selection" width="50"></el-table-column>
				</el-table>

				<div slot="footer" class="dialog-footer">
					<el-button size='large' @click="huiyuanquntiQuxiao">取 消</el-button>
					<el-button size='large' type="primary" @click="huiyuanquntiQueding">确 定</el-button>
				</div>
			</div>
	</el-dialog>
</template>

<script>
	export default{
		data(){
			return{
				//dialogQuntiVisible: false,
				//quntiData: [], //会员群体
				//quntiData_select: [], //选择的会员群体
				member_total_count: 0, //表单预计参加总人数
				//tableDataFilter:[],//用于群体弹出框打开时 表格复选框回显是打勾 
				totalItem:0,//共多少项
			}
		},
		props:{
			/**
			 * defaultCheckedId
			 * 树组件第一次加载时要打勾的节点 为ID数组
			 * */
			/*hyqt_select_data:Array,*/
			dialogQuntiVisible:Boolean,
			quntiData_select:Array,
			quntiData:Array,
			tableDataFilter:Array,
		},
		methods:{
			//树形 筛选 
			handleSelectionChange(rows) { //会员群体 复选框改变 共选多少人
				this.member_total_count = 0;
				this.totalItem = 0
				this.total = rows.length;
				rows.map((row, index) => {
					this.member_total_count += row.members_count;
					this.totalItem = this.totalItem+1;
				});
				this.tableDataFilter = rows; //用于群体弹出框打开时 表格复选框回显是打勾 
				this.quntiData_select = rows; //选择确定时双向绑定，使用过程变量
			},
			huiyuanquntiQuxiao: function(e) { //会员群体确定 选择确定时双向绑定，使用过程变量  
				this.$emit('makeQuntiCancleButton');
			},
			huiyuanquntiQueding: function(e) { //会员群体确定 选择确定时双向绑定，使用过程变量  
				this.$emit('makeQuntiSureButton',this.quntiData_select,this.quntiData,this.member_total_count,this.totalItem);
			},
			handleQuntiClose(done) {
				this.$emit('makeQuntiCancleButton');
				done();
			},
     	},
		created(){
		},
		watch:{
			dialogQuntiVisible(newVal,oldVal){
				if(newVal){
					setTimeout(()=>{
			       		this.$refs.myTable.clearSelection();
						this.tableDataFilter.forEach(row => {
								this.$refs.myTable.toggleRowSelection(row,true);
						});
	        		}
	        		,500)
				}else{
					setTimeout(()=>{
			       		this.$refs.myTable.clearSelection();
						this.tableDataFilter.forEach(row => {
								this.$refs.myTable.toggleRowSelection(row,true);
						});
	        		}
	        		,500)
				}
				
			}
		}
	}
	
</script>

<style rel="stylesheet/scss" lang="scss">
/***********会员群体 弹出框   开始**************/
	.hdzl_qunti {
		width: 560px;
		height: 488px;
		.dialog-footer {
			width: 560px;
			height: 60px;
			background: #F4F9FC;
			box-shadow: 0 0 4px 0 rgba(44, 70, 128, 0.16);
			margin-left: 0px;
			.el-button:nth-child(1) {
				margin-top: 14px;
				/*margin-left: 211px;*/
			}
		}
		.el-table__body-wrapper {
			height: 304px;
		}
		.select_title{
			margin-left: 16px;margin-right:16px;padding-left:8px;height:28px;line-height:28px;background: #FFFAEB;border-radius: 3px;font-size: 12px;color: #002F2F;
		}
		.el-table{
			margin-left: 16px;
    		margin-right: 16px;
    		width:auto;
		}
		.el-dialog__body table tbody tr.el-table__row:nth-child(2n+2){
		   	background: #F9FBFC;
		}
		.el-dialog__body table tbody tr.el-table__row:hover{
		   background: #EDF7FF;
		}
		.el-table td, .el-table th.is-leaf {
		    border-bottom: 0px solid #F3F3F3;
		}
		.el-table--enable-row-transition .el-table__body td {
		    transition: background-color 3s ease;
		}
	}
	/***********会员群体 弹出框   结束*************/
</style>