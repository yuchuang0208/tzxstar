<template>
	 <div class="mendian">
 	    <div class="mendian_left" >
			<el-input placeholder="请输入门店名称" v-model="filterText">
			</el-input>
			<div class="fangdajing">
				<img src="../../assets/mendian_fadajing.svg" />
			</div>
			<el-tree
				  class="filter-tree"
				  :data="data2"
				  :props="defaultProps"
				  :default-expand-all=false
				  :filter-node-method="filterNode"
				  :empty-text="notree"
				  show-checkbox
				  @check-change="boxChange"
				  @scroll.native="handleScroll1"
				  node-key="id"
				  ref="tree2">
	   		</el-tree>
			<h1 v-bind:class="{active11: scroll1}"/>
		</div>
		<div class="mytree_result">
			<h1>已选择<span v-model="totalcount">{{totalcount}}</span>家门店
				<em @click="qingkong">清空</em>
				<img src="../../assets/empty.svg" @click="qingkong"/>
			</h1>
			<ul id="mychoice" @scroll="handleScroll2">
				<li v-for="item in nodes" @mouseover="xianshiDelete" @mouseleave="noxianshiDelete">
				<em v-bind:id="item.id">{{item.label | stringformat(15)}}
						<span v-if="item.plabels!=null">[{{item.plabels | stringformat(10) }}]</span>
						<img class="mychoiceimg" src="../../assets/mendian_delete.svg" @click="deleteChoiceItem" />    
				</em>
				</li>
			</ul>
			<div class="qxqd" v-bind:class="{'boxshadow':scroll2}">
				 <el-button  size="small" @click="dialogMendian = false">取消</el-button>
				 <el-button type="primary" size="small" @click="mendianQueding">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import Assist from '@/utils/assist';
	import axios from "axios";
	import {getMendian} from '@/api/home'
	
	export default {
		watch: {
	      filterText(val) {
	        this.$refs.tree2.filter(val);
	      }
	    },
		data() {
			return {
				filterText: '',
				totalcount:0,
				total:0,
				scroll1:false,
		      	scroll2:false,
		      	scroll3:false,
		      	scroll4:false,
		      	data2:[],//门店数据
				nodes:[],//门店选中值
				nodes_temp:[],//门店选中值 过程变量
				notree:"没有数据",
				defaultProps: {
		          children:'children',
		          label:'labelc',
		          name:'label',
		          id:'id',
		          count:'count'
		       },
			}
		},
		methods: {
			filterNode(value, data) {
		        if (!value) return true;
		        return data.label.indexOf(value) !== -1;
		    },
		    loadTree(){
				getMendian().then((response) => {
					this.data2 =  Assist.CloneArray(response.data);
				})
			},
			qubumendianFunction:function(){//全部门店
				this.totalcount = 0;
				this.nodes.forEach(item =>{
					this.$refs.tree2.setChecked(item.id,false,false);
			    });
			    this.nodes=[]
			    this.nodes_temp = [];
			},
			//门店选择
	    	boxChange:function(e){
	    		this.nodes = this.$refs.tree2.getCheckedNodes(true);
	    		this.totalcount = this.nodes.length;
			},
			mendianQueding:function(e){
	    		//this.nodes = this.$refs.tree2.getCheckedNodes(true);
	    		this.nodes_temp = this.nodes;
	    		this.dialogMendian = false;
			},
			//删除当前选中的门店
		   	deleteChoiceItem:function(e){
		      let id =  e.target.parentNode.getAttribute("id");
		      this.nodes.forEach(item =>{
					if(item.id == id){
						this.nodes.shift(item);
						this.totalcount = this.totalcount-1;
						this.$refs.tree2.setChecked(item.id,false,false);
					}
			  });
			  //处理左侧树选中的节点
		   	},//删除所选项
		   
		    xianshiDelete:function(e){
			   	e.currentTarget.getElementsByTagName("img")[0].style.display="block";
		   	},
			noxianshiDelete:function(e){
			   		e.currentTarget.getElementsByTagName("img")[0].style.display="none";
			},
		   	qingkong:function(){//清空选择的数据
				document.getElementById("mychoice").innerHTML=""
				this.totalcount = 0;
				this.nodes.forEach(item =>{
					this.$refs.tree2.setChecked(item.id,false,false);
			  	});
			},
			 //监听门店数的滚动条
		  	handleScroll2() {
				/*var el = e.currentTarget;*/
				if(this.scroll2 != true)
				{
					this.scroll2 = true;
					var _this = this;
					setTimeout(function(){_this.scrollfun2();},2000);
				}
		   	}
		}
		,created() {//下面的是boss 请求地址
			let _s = Assist.GetPageArguments();
			this.$store.dispatch('setSession', _s).then(() => {
			}).catch(() => {
	        
	         });
			this.loadTree();
	    }
	}
</script>

<style>

</style>