<template>
	<div>
		<div class='mydiv'>
			<tzx-tree-input-node @getButton='getStoresIds' :pnodes="storeId" :isLeaf="isMyLeaf"></tzx-tree-input-node>
		</div>
		 <div class="result">
		 	 <h1>结果：</h1>
			 <p>
			 	<em>id：{{node.id}}</em>
			 	<em>label：{{node.label}}</em>
			 </p>
		</div>
	</div>
</template>
<script>
	import  { TzxTreeInputNode } from '@/components/TzxTreeInputNode';
	export default {
		components: {
			TzxTreeInputNode
		},
		data() {
			return {
				node:{},//门店id数组
				storeId:129,//门店id
				isMyLeaf:true,//是否之选中叶子节点， true只选中叶子节点  false 选择节点就可以
			}
		},
		methods:{
			getStoresIds(value){
				//获取门店的store_id 的数组
				this.node = value;
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
			em{
				line-height:22px;
				display:block;
			}
		}
	}
	
</style>