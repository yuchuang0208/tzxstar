<template>
	<div>
		<div class='mydiv'>
			<tzx-tree-input @getButton='getStoresIds' :pnodes="echo_store_ids"></tzx-tree-input>
		</div>
		 <div class="result">
		 	 <h1>结果：</h1>
			 <p>{{store_ids}}</p>
		</div>
	</div>
</template>
<script>
	import  { TzxTreeInput } from '@/components/TzxTreeInput';
	export default {
		components: {
			TzxTreeInput
		},
		data() {
			return {
				store_ids:[],//门店id数组
				echo_store_ids:[129,124],//用户编辑初始化下拉框勾选
			}
		},
		methods:{
			getStoresIds(ids){
				//获取门店的store_id 的数组
				this.store_ids = ids;
			}
		}
		
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "src/styles/mixin.scss";
	.mydiv{
		padding-top:20px;
		padding-left:40px;
		background:#ffffff;
		height:500px;
		width:300px;
		float: left;
	}
	.result{
		float:left;
		width:600px;
		height:500px;
		background:#ffffff;
		h1{
			margin-top: 20px;
    		margin-bottom: 10px
		}
		p{
			height:100px;
			border:1px #d9e5ed solid;
			margin-right:40px;
		}
	}
	
</style>