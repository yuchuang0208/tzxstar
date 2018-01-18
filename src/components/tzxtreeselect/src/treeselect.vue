/**
 * 可以将该组件 嵌套在 el-dialog 和   el-popover 中 CRM常用  也可以嵌入到其他容器
 * 该组件使用大部分CRM 需求 如有需要 可进行扩展
 */

<template>
	 <div class='tzxselecttree' >
	 	<div class='tzxselecttree_left'>
	 		<div class='tzxselecttree_left_select'>
	 			<el-input size='small' icon="search" placeholder="输入关键字进行过滤" v-model="filterText" >
	 			</el-input>
	 		</div>	 
		 	<el-tree 
		 		ref='tree'
		 		:data="data"
		 		node-key="id"
		 		:default-checked-keys="defaultCheckedId"
		 		:filter-node-method="filterNode"
		 		@check-change="boxChange"
		 		@scroll.native="handleScroll1"
		 		 :default-expanded-keys="[-1]" 
		 		show-checkbox
		 		:props="defaultProps"
		 		>
		 	</el-tree>
		 	<h1 v-bind:class="{active11: scroll1}" />
		 	<div class='tzxselecttree_left_footer'>	 		
	 		</div>
	 	</div>
	 	<div class='tzxselecttree_right'>
	 		<div class="tzxselecttree_right_header">
	 			<div class='tzxselecttree_right_header_left'>
	 				<span>已选择<em>{{totalSelect}}</em>{{unitAndName}}</span>
	 			</div>
	 			<div class='tzxselecttree_right_header_right' @click='emptyAll'>
	 				<icon-svg icon-class="empty"></icon-svg>
	 		    	<span>清空</span>
	 			</div>  
	 		</div>
	 		<div class='tzxselecttree_right_body'>
	 			<ul id="mychoice" @scroll="handleScroll2">
	 				<li v-for='(item,index) in nodes' @mouseover="showDelect(index)" @mouseleave="hideDelete">
	 					<em >{{item.label | stringformat(15)}}</em>	 				
	 					<span v-if='item.plabels!=null&&item.plabels!=undefined'>[{{item.plabels | stringformat(10) }}]</span>
	 					<span  @click='deleteCheckedItem(item.id)' v-if='isShowDelete&&showDeleteIndex==index'><icon-svg  icon-class="delete"></icon-svg></span>
	 				</li>
	 			</ul>
	 		</div>
	 		<div class='tzxselecttree_right_footer' v-bind:class="{'boxshadow':scroll2}">
	 			<el-button size='small' @click='cancelButton'>取消</el-button>
	 			<el-button size='small' type='primary' @click='makeSureButton' >确定</el-button>
	 		</div>
	 	</div>
	 </div>
</template>

<script>
	export default{
	
		data(){
			return{
				filterText: '', 
				isShowDelete:false,
				showDeleteIndex:0,
				nodes:this.pnodes,
				totalSelect:this.ptotalSelect,
				scroll1: false,
				scroll2: false,
				scroll3: false,
				scroll4: false,
			}
		},
		 watch: {
		    filterText(val) {
		        this.$refs.tree.filter(val);
		    },
	      	defaultCheckedId(newVal,oldVal){
				if(newVal){
					setTimeout(()=>{
						this.$refs.tree.setCheckedKeys(newVal);
	        		}
	        		,500)
				}else{
					setTimeout(()=>{
						this.$refs.tree.setCheckedKeys(newVal);
	        		}
	        		,500)
				}
				
			}
	    },
	    
	    // 父组建传入参数
	    // 在Vue2中组件的props的数据流动改为了只能单向流动，即只能由组件外（调用组件方）通过组件的DOM属性attribute传递props给组件内，
	    // 组件内只能被动接收组件外传递过来的数据，并且在组件内，不能修改由外层传来的props数据。
		props:{
			data:Array,
			/**
			 * data的类型必须是数组 
			 * 数据格式 必须有 id label children[] plabels(用于右侧列表的[]显示)
			 * */
			unitAndName:String,
			/**
			 * unitAndName
			 * 右上角的选择   单位和名字  提高可复用性
			 * */
			defaultCheckedId:Array,
			/**
			 * defaultCheckedId
			 * 树组件第一次加载时要打勾的节点 为ID数组
			 * */
			pnodes:Array,
			/**
			 * nodes
			 * 右侧展示的已选择的数据
			 * */
			ptotalSelect:Number,
			/**
			 * totalSelect
			 * 选择数据的条数
			 * */
			isDisabled:{
				type:Boolean,
				default:false
			},
			/**
			 * isDisabled 
			 * 是否要对数据进行disabled处理（让该节点不可选）
			 * 通过type值来控制
			 * */
			type:String,
			/**
			 * type
			 * 根据传过来的type值来判断怎样处理 disabled的数据
			 * */
			defaultProps:{
				children: 'children',
          		label: 'label',
          		id:'id'
			}
		},
		methods:{
			//树形 筛选 
			 filterNode(value, data) {
       		  if (!value) return true;
       		  	return data.label.indexOf(value) !== -1;
     		},
     		//树选择发生变化时触发
     		boxChange(){ 			
     			this.nodes = this.$refs.tree.getCheckedNodes(true);
				this.totalSelect = this.nodes.length;
				this.$emit('boxChange',this.nodes,this.totalSelect);
     		},
     		//鼠标移入 显示删除按钮
     		showDelect(index){
     			this.showDeleteIndex = index;
     			this.isShowDelete = true;
     		},
     		//鼠标移出 隐藏删除按钮
     		hideDelete(index){
     			this.isShowDelete = false;
     		},
     		//单个删除
     		deleteCheckedItem(id){	
     			if(id){
     				this.$refs.tree.setChecked(id, false, false);
     			}	
			},
			//清空按钮 
			emptyAll(){
				this.$refs.tree.setCheckedNodes([])
				//this.$refs.tree.setCheckedKeys([]);
				 
			},
			//取消按钮 将选择的数据回传 用于展示
			cancelButton(){
				this.$emit('cancelButton',this.nodes);
			},
			//确定按钮  将选择的数据回传 用于展示
			makeSureButton(){
				this.$emit('makeSureButton',this.nodes);
			},
			
		
			/**
			 * 递归处理data数据 来控制是否可以选择
			 * */
			findNextItem(arrays) {
				arrays.map(item => {
					if(item.type == this.type) {
						item.disabled = false;
					} else {
						if(!item.children.length) {
							item.disabled = true;
						} else {
							this.findNextItem(item.children);
						}
					}
				})
			},
			scrollfun1() {
				this.scroll1 = false;
			},
			//监听门店数的滚动条
			handleScroll1() {
				/*var el = e.currentTarget;*/
				if(this.scroll1 != true) {
					this.scroll1 = true;
					var _this = this;
					setTimeout(function() {
						_this.scrollfun1();
					}, 2000);
				}
			},
			scrollfun2() {
				this.scroll2 = false;
			},
			//监听门店数的滚动条
			handleScroll2() {
				/*var el = e.currentTarget;*/
				if(this.scroll2 != true) {
					this.scroll2 = true;
					var _this = this;
					setTimeout(function() {
						_this.scrollfun2();
					}, 2000);
				}
			}
			
		},
		mounted(){ 
			if(this.isDisabled){
				this.findNextItem(this.data); 	
			}
		},
		created(){
		}
	}
	
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tzxselecttree{
    background: #FEFEFE;
    overflow: auto;
	position: relative;
	width: 100%;
	.tzxselecttree_left{
		position: relative;
		float: left;
		width: 50%;
		background: #F4F9FC;
		.tzxselecttree_left_select{
			padding: 10px 16px;
		}
		.tzxselecttree_left_footer{
			height: 42px;
		}
		.el-tree-node{
			width:292px;
		}
	
	}
	.el-input__inner{
    	text-align: left;
	}
	.el-tree{
		.el-checkbox{
		  	float: right;
      		margin-right: 16px;
		}
		.el-tree-node{
			width:278px;
		}
	}
	
	.tzxselecttree_right{
		position: relative;
		float: left;
		width: 50%;
		.tzxselecttree_right_header{
			padding: 10px 16px;
			.tzxselecttree_right_header_left{
				float: left;
				height: 28px;
				span{
					line-height: 28px;
					font-size: 12px;
					color: #34495E;				
					em{
						color:#ff7171;
					}
				}
			}
			.tzxselecttree_right_header_right{
				float: right;
				height: 28px;
				line-height: 28px;
				font-size: 12px;
				color:#9AABB8;
				cursor: pointer;
			}			
		}
		.tzxselecttree_right_body{
		    height: 315px;
		    overflow-y: auto;
		    margin: 25px 0px 0px 0;
		    padding: 0 16px 0px 16px;
			ul{
				li{
					height: 32px;
					line-height: 32px;
					font-size: 14px;					
					border-bottom: 1px solid #EAF1F6;
					position: relative;
					&:nth-of-type(1){
						border-top:1px solid #EAF1F6;
					}
					&:hover{
						background: #F5FBFE;
						border-bottom: 1px solid #F5FBFE;
					}	
					em{
						font-style: normal;
					    color: #34495e;
					}
					span{
						color:#758896;
						&:nth-of-type(2){
							color:#9AABB8
						}						
					}
					.svg-icon{
						position: absolute;
						cursor:pointer;
						font-size:11px;
						right: 10px;
						top:9px;
					}
				}				
			}
		}
		.tzxselecttree_right_footer{
			line-height: 42px;
			float: right;
			height:42px;
			margin-right: 10px;
			background: #FFFFFF;			
		}
	}	
}
</style>