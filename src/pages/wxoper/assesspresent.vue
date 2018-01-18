<template>
   <div class='appclass'>
   	<div class="app-container calendar-list-container" >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
         <el-form-item>
            <el-input placeholder="请输入订单编号" icon="search" v-model="order_code" :on-icon-click="handleIconClick"></el-input>
         </el-form-item>
         <el-form-item>
         	<el-input placeholder="门店列表" :on-icon-click="showDialog" icon="arrow-down"></el-input>
         </el-form-item>
         <el-form-item>
            <el-date-picker @change="dateChange"  v-model="date_value" type="daterange" placeholder="选择日期范围"></el-date-picker>
         </el-form-item>
      </el-form>
      <!----弹窗----->
      <!--选择门店开始 -->
		<el-dialog
		  title=""
		  width="557" 
		  height="200"
		  :visible.sync="dialogMendian"
		  size="tiny"
		  :before-close="handleMendianClose"
		  custom-class="mendian_dialog">
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
		</el-dialog>
		<!--选择门店 结束 -->
      <!---------------->
      <el-table :data="tableData" style="width: 100%" class="tabbox">
         <el-table-column label="门店名称" prop="store_name"></el-table-column>
         <el-table-column label="订单编号" prop="order_code"></el-table-column>
         <el-table-column label="桌牌号" prop="table_code"> </el-table-column>
         <el-table-column label="订单金额" sortable prop="total_money"> 
         	<template scope ='scope'>
	      		{{scope.row.total_money|currency}}					
	      	</template>
         </el-table-column>
         <el-table-column label="订单时间" sortable prop="single_time"> </el-table-column>
         <el-table-column label="操作" width="100">
            <!--<template scope="scope">
               <tzx-tag color="#0C9AFF" @clickThis = 'findDetail(scope.row)'class="seedetails">查看详情</tzx-tag>
            </template>-->
         </el-table-column>
         <el-table-column type="expand">
            <template scope="scope">
               <div style="float: left;width: 75%;" class="custom-inner-table">
                  <el-table :data="scope.row.items" border style="width: 100%"  class="demo-table-expand">
				    <el-table-column label="菜品" prop="item_name" style="font-weight: normal;"> </el-table-column>
				    <el-table-column label="规格" prop="unit_name"> </el-table-column>
				    <el-table-column label="单价" prop="price"> </el-table-column>
				    <el-table-column label="数量" prop="number"> </el-table-column>
				    <el-table-column label="小计" prop="product_fee"> </el-table-column>
				    <el-table-column label="优惠" prop="discount_amount"> </el-table-column>
				    
				</el-table>
               </div>
               <div style="width: 25%;float: right;background: #fff;">
                  <div class="pjdetail">评价详情</div>
                  <div class="pjwrap">
                     <div class="lineh">
                        <span class="pinjiafl">整体评价</span>
                        <span class="global-assessment">
                           <el-rate v-model="scope.row.appraise_info.global" disabled show-text text-color="#ff9900" text-template="{value}">
                           </el-rate>
                        </span>
                     </div>
                     <div class="lineh">
                        <span class="pinjiafl">服务态度</span>
                        <span class="service-attitude">
                        	<el-rate v-model="scope.row.appraise_info.attitude" disabled show-text text-color="#ff9900" text-template="{value}">
                            </el-rate>
                        </span>
                     </div>
                     <div class="lineh">
                        <span class="pinjiafl">菜品质量</span>
                        <span class="dish-quality">
                        	<el-rate v-model="scope.row.appraise_info.quality" disabled show-text text-color="#ff9900" text-template="{value}">
                            </el-rate>
                        </span>
                     </div>
                     <div class="lineh">
                        <span class="pinjiafl">上菜速度</span>
                        <span class="serving-speed">
                        	<el-rate v-model="scope.row.appraise_info.speed" disabled show-text text-color="#ff9900" text-template="{value}">
                            </el-rate>
                        </span>
                     </div>
                  </div>
               </div>

            </template>
         </el-table-column>
      </el-table>
   
      <div  class="pagination-container">
         <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page.sync="listQuery.page"
               :page-sizes="[10, 20, 30, 50]"
               :page-size="listQuery.rows"
               layout="prev, pager, next,total, jumper,sizes"
               :total="total">
         </el-pagination>
      </div>
    </div>  
</div>
</template>

<style>
   .demo-table-expand {
      font-size: 0;
   }

   .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
      font-weight: normal;
   }

   .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
   }

   .el-table__expanded-cell {
      margin: 0 0;
      padding: 0 0;
   }
	.appclass .el-table__header-wrapper th div {
	    /*background: #f60;*/
	    color: #243546 ;
	    font-family: 'PingFangSC-Medium';
	}
	.custom-inner-table .el-table__header-wrapper tr th{
		background: #fff;
	}
	.custom-inner-table .el-table__header-wrapper tr th div{
		margin-left: 0px;
		font-weight: normal;
		text-align: right;
		padding-right: 19px;
		/*background: #FFFFFF;*/
	}
	
	.el-table .custom-inner-table .cell{
		text-align: right;
		padding-right: 19px;
	}
	.custom-inner-table .el-table__header-wrapper tr th:first-child > .cell{
		text-align: left;
		padding-left: 19px;
	}
	.custom-inner-table .el-table--enable-row-transition .el-table__body td:first-child > .cell{
		text-align: left;
	} 
	.pjdetail{
		background: #F7F9FB;
	    border-radius: 3px 3px 0 0;
	    height: 40px;
	    line-height: 40px;
	    color: #6C7D8E;
	    font-size: 12px;
	    padding-left: 19px;
	    border-bottom: 1px solid #E9F2FD;
	}
	.pinjiafl{
		float: left;
		padding-right: 19px;
	}
	.pjwrap{
		overflow: hidden;
    	padding-bottom: 19px;
	}
	.lineh{
		height: 30px;
		line-height: 30px;
		padding:17px 0px 0px 19px;
		
	}
	.el-rate {
    	line-height: 1.9;
	}
	/*.el-icon-arrow-right:before{
		content: "查看详情";
	}*/
</style>

<script>
    import {getListAll} from '@/api/assess'
    import {TzxTag,TzxOption} from '@/components/tag'
    import axios from 'axios'
    import Assist from '@/utils/assist'
	import {getMendian,saveZengSongJine} from '@/api/home'

    export default {
        components: {TzxTag,TzxOption},
        watch: {
	      filterText(val) {
	        this.$refs.tree2.filter(val);
	      }
	    },
        data() {
            return {
            	order_code: '',
                date_value: '',
                loading:true,
                total:0,
                dialogMendian:false,
                totalcount:0,
                filterText: '',
                scroll1:false,
		      	scroll2:false,
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
		        
                listQuery: {
                    page: 1,
                    rows: 20,
                    title: undefined,
                    type: undefined,
                    sort: 'single_time',
                    order:'desc'
                },
            	formInline: {
		          user: '',
		          region: '11111111111111111'
		        },
                tableData: []
            }
        },
        methods: {
	         handleSizeChange(val) {
	             this.listQuery.rows = val
	             this.getList()
	         },
	         handleCurrentChange(val) {
	             this.listQuery.page = val
	             this.getList()
	         },
	         findDetail(){
	             alert('查看详情');
	         },
	         dateChange(){
	         	this.listQuery.page=1;
        		this.getList();  
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
         	getList(){
         	 	var dt1 = '';
         	 	var dt2 = '';
         	 	var store_id = '';
         	    if(this.date_value && this.date_value.length > 0){
         	 		dt1 = dateFormat('yyyy-MM-dd',this.date_value[0]);
         	 	}
         	 	if(this.date_value && this.date_value.length > 1){
        	 		dt2 = dateFormat('yyyy-MM-dd',this.date_value[1]);
         	 	} 
         	 	var store_ids = new Array();
         	 	for(var i in this.nodes){
         	 		store_ids.push(this.nodes[i].id);
         	 	}
         	 	var param = {
         	 		store_id:store_ids.join(","),
         	 		start_date:dt1,
         	 		end_date:dt2,
         	 		order_code:this.order_code,
         	 		pageNum:this.listQuery.page,
         	 		limit:this.listQuery.rows
         	 	};
         	    getListAll(param).then(response => {
					this.tableData = response.data.order_list;
					//console.log(JSON.stringify(response.data.order_list)+'222');
					this.total=response.totalSize;
				})
         	 
         	},
         	handleIconClick(){
         	 	this.listQuery.page=1;
         	 	this.getList();
         	 	
         	},
         	showDialog(e){
         	 	this.dialogMendian = true;
         	},
         	filterNode(value, data) {
			        if (!value) return true;
			        return data.label.indexOf(value) !== -1;
			},
         	loadTree(){
         	 	let _s = Assist.GetPageArguments();
				getMendian(_s).then((response) => {
					this.data2 =  Assist.CloneArray(response.data);
				})
//				axios.get('http://localhost:9280/static/mendian2.json').then((response) => {
//					this.data2 =  Assist.CloneObj(response.data.data);
//				})
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
		    		this.listQuery.page=1;
         	 		this.getList();
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
		  	deleteItem:function(items,it,str,e){
		        let arrays = [];
		        items.forEach(item =>{//把当前的对象在 对象数组中删除
		        	if(item.id != it.id){
		        		arrays.push(item);
		        	}
				});
				if(str=="mendian"){//判断是门店，把相应的门店树复选框置为false
					this.nodes_temp = arrays;
					//门店树绑定
					this.nodes.forEach(item =>{
						if(item.id == it.id){
							this.nodes.shift(item);
							this.totalcount = this.totalcount-1;
							this.$refs.tree2.setChecked(item.id,false,false);
						}
				  	});
				}else if(str=="qunti"){//判断是群体，
					this.hyqt_select_data = arrays;
		           
				    this.hyqt_select_data_temp.forEach(row => {
				      	if(row.id == it.id){//当前删除数据所在的表格所在行的复选框  取消打勾
				      	   	this.$refs.mytable.toggleRowSelection(row,false);
				      	}
				    });
				    this.count = 0;
				    this.hyqt_select_data.forEach(row => {//统计人数
				      	 this.count = this.count + row.members_count;
				    });
				}
				else if(str=="yhq"){//判断是优惠券，
					this.yhqCheckedData = arrays;
				}
		  	},
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
			 handleMendianClose(done) {
		        done();
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
         	 
    	},
        created() {
				this.getFirstList();
				this.loadTree();
		}
    }
    
   function dateFormat(fmt,date){ //author: meizz   
	  var o = {   
	    	"M+" : date.getMonth()+1,                 //月份   
		    "d+" : date.getDate(),                    //日   
		    "h+" : date.getHours(),                   //小时   
		    "m+" : date.getMinutes(),                 //分   
		    "s+" : date.getSeconds(),                 //秒   
		    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
		    "S"  : date.getMilliseconds()             //毫秒   
		  };   
		  if(/(y+)/.test(fmt))   
		    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
		  for(var k in o)   
		    if(new RegExp("("+ k +")").test(fmt))   
		  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		  return fmt;
	} 
</script>