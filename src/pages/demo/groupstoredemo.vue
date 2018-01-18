<template>
	<div class="context">
		
		<tzx-group-store-dialog 
			@makeSureStoreButton="mymakeSureStoreButton"  
			:storeDialogVisible="mystoreDialogVisible" 
			:storeCheckedIds="echo_store_ids" 
			:name="groupName">
			
		</tzx-group-store-dialog>
		
		<!--选择门店 结束 -->
		<div class="mydiv">
			<div class='storeDiv'>
				<div class='checkdish' >
					<span @click='mystoreDialogVisible = true'>创建门店分组</span>
					<span>{{groupName}}</span>
					<span v-for="item in mynodes">{{item.id}}--{{item.label}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import { TzxGroupStoreDialog } from '@/components/tzxgroupstoredialog';
	export default {
	  components:{TzxGroupStoreDialog},
      data() {
      return {
      	mystoreDialogVisible:false,
		mynodes:[],//选中的节点
		groupName:'ddddd',//分组名称
		echo_store_ids:[599,571],//用户编辑初始化下拉框勾选
      };
    },
    methods:{
		mymakeSureStoreButton(nodes,name){
			this.mystoreDialogVisible = false;//关闭对话框
	      	this.mynodes = nodes; //接受选中的树节点数组
	      	this.groupName  = name;//分组名称
		},
	},
	created() {
	}
 }
</script>

<style rel="stylesheet/scss" lang="scss">
	.mydiv{
		padding-top:20px;
		padding-left:40px;
		background:#ffffff;
		height:500px;
		width:900px;
		float: left;
	}
	.storeDiv{
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
</style>