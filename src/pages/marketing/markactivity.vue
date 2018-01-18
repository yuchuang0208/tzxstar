<template>
	<div class='appclass'>
		<div class="app-container calendar-list-container" >
			<div style="float: left;width: 80%;">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
			         <el-form-item>
			            <el-input placeholder="请输入规则名称" icon="search" v-model="rule_name" :on-icon-click="handleIconClick"></el-input>
			         </el-form-item>
			         <el-form-item>
			            <el-date-picker @change="dateChange" v-model="date_value" type="daterange" placeholder="选择日期范围"></el-date-picker>
			         </el-form-item>
		    	</el-form>
			</div>
			<div style="float:right;">
				<a class="addgz" @click="addguize">+新增规则</a>
			</div>
		
		<div class="guizelist">
			<el-table :data="rows" style="width: 100%":default-sort = "{prop: 'date', order: 'descending'}">
			    <el-table-column prop="rule_name" label="规则名称" width="180"></el-table-column>
			    <el-table-column prop="" label="规则时间" sortable :sort-method="sortBy"  width="330">
			    	<template scope="scope">
				        <span>{{ scope.row.start_time }}</span>
				        <span>至</span>
				        <span>{{ scope.row.end_time }}</span>
				    </template>
			    </el-table-column>
			    <el-table-column prop="" label="规则金额" width="250">
			    	<template scope="scope">
				        <span>{{ scope.row.min_money }}</span>
				        <span>~</span>
				        <span>{{ scope.row.max_money }}</span>
				    </template>
			    </el-table-column>
			    <el-table-column prop="status_desc" label="状态">
			    	<template scope="scope">
                        <span v-if="scope.row.status == '2'" class="stateorg">未审核 </span>
                        <span v-else-if="scope.row.status == '5'" class="stateover">已结束</span>
                        <span v-else-if="scope.row.status == '4'" class="stategreen">进行中</span>
                        <span v-else :style="{color:'#34495E'}">未开始</span>
               		</template>
			    </el-table-column>
			    <el-table-column prop="caozuo" label="操作" :formatter="formatter">
				  <template scope="scope">
				  	<!----- 2未审核 3 未开始 4进行中 5已结束-->
				    <div v-if="scope.row.status == '3'">
				      <el-button @click="xiugai(scope.row.id)" type="text" size="small" class="bluecolor">修改</el-button>
				      <el-button @click.native.prevent="deleteRow(scope.$index, scope.row.id)" type="text" size="small" class="bluecolor">删除</el-button>
				    </div>
				    <div v-else-if="scope.row.status == '2'" class="czwrap">
				    	<el-button @click="xiugai(scope.row.id)" type="text" size="small" class="bluecolor">修改</el-button>	
				      	<el-button @click.native.prevent="deleteRow(scope.$index, scope.row.id)" type="text" size="small" class="bluecolor">删除</el-button>
				    </div>
				    <div v-else-if="scope.row.status == '4'" class="czwrap">
				      <el-button @click.native.prevent="deleteRow(scope.$index, scope.row.id)" type="text" size="small" class="bluecolor">删除</el-button>
				    </div>
				    <div v-else="scope.row.status == '5'" class="czwrap">
				      
				    </div>
				  </template>
				</el-table-column>
			</el-table>
		</div>
		<!-----------------------新增规则dialog----------------------->
		<div>
			<el-dialog title="新增支付即会员规则" :visible.sync="dialogFormVisible">
				<div class="app-container">
					<div class="gztip">支付即会员规则设置后，在设置时间内用户支付规则金额后可以触发领取会员卡操作；设置此规则前确定已设置同步会员卡相关功能。</div>
					<el-form :model="ruleForm"  class="gzmart">
					    <el-form-item label="规则名称：" :label-width="formLabelWidth" prop="name">
					      <el-input class="gzkuan" v-model="ruleForm.rule_name" auto-complete="off" placeholder="请输入规则名称"></el-input>
					    </el-form-item>
					    <el-form-item label="规则时间：" :label-width="formLabelWidth" prop="date1">
							    <el-date-picker
							    	@change="checkdate('add')"
							      :picker-options="pickerOptions0"		
							      v-model="value3" :style="{width:'350px'}"
							      type="datetimerange"
							      range-separator="至"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期" >
							    </el-date-picker>
						</el-form-item>
					    <el-form-item label="规则金额：" :label-width="formLabelWidth">
					      <el-tooltip class="item" effect="dark" content="提示：生效金额输入0为不限制" placement="bottom">
						      <p style="width: 16px;position: absolute;top: 8px;">
						      	<i class="el-icon-warning"></i>
						      </p>
						  </el-tooltip>	
					      <el-input v-model="ruleForm.min_money" class="gzkuan2" auto-complete="off" placeholder="金额下限" min="0"></el-input>
					      <em>至</em>
					      <el-input v-model="ruleForm.max_money" class="gzkuan2" auto-complete="off" placeholder="金额上限" max="100000000000"></el-input>
					    </el-form-item>
					</el-form>
			  	</div>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="quxiao">取 消</el-button>
			    <el-button type="primary" @click="dosave">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
		<!------------------------修改支付即会员弹层------------------>
		<div>
			<el-dialog title="修改支付即会员规则" :visible.sync="dialog2">
				<div class="app-container">
					<div class="gztip">支付即会员规则设置后，在设置时间内用户支付规则金额后可以触发领取会员卡操作；设置此规则前确定已设置同步会员卡相关功能。</div>
					<el-form :model="chuang" class="gzmart">
					    <el-form-item label="规则名称：" :label-width="formLabelWidth">
					      <el-input class="gzkuan" v-model="chuang.rule_name" auto-complete="off" placeholder="请输入规则名称"></el-input>
					    </el-form-item>
					    <el-form-item label="规则时间：" :label-width="formLabelWidth">
						      	<el-date-picker
						      		@change="checkdate"
						      	  :picker-options="pickerOptions1"	
						      	  :style="{width:'350px'}"
							      v-model="rule_time"
							      type="datetimerange"
							      range-separator="至"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期">
							     </el-date-picker>  
						</el-form-item>
					    <el-form-item label="规则金额：" :label-width="formLabelWidth">
					      <el-tooltip class="item" effect="dark" content="提示：生效金额输入0为不限制" placement="bottom">
						      <p style="width: 16px;position: absolute;top: 8px;">
						      	<i class="el-icon-warning"></i>
						      </p>
						  </el-tooltip>	
					      <el-input v-model="chuang.min_money" class="gzkuan2" auto-complete="off" placeholder="金额下限"></el-input>
					      <em>至</em>
					      <el-input v-model="chuang.max_money" class="gzkuan2" auto-complete="off" placeholder="金额上限"></el-input>
					    </el-form-item>
					</el-form>
			  	</div>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialog2 = false">取 消</el-button>
			    <el-button type="primary" @click="dosave2()">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
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

<script>
	import axios from "axios"
	import {zhifulist,saveall,deletover,seachid,yzcard,checkdt} from '@/api/assess'
	
	let disabledTimeRange=[];
	let disabledTimeRange2=[];
	export default {
  		name: 'markactivity',
  		data(){
			return {
			 	rule_name:'',
			 	min_money:'',
			 	max_money:'',
			 	date_value:'',//日期时间
			 	value2: '',
			 	rule_time:'',
//			 	disabledTimeRange:'',
			 	id:'',
//			 	pickerOptions0: {
//					//0新增	
////				  disabledDate(time) {     
////		            const date = new Date();        	
////		            /*当前时间 前一周 后一周不可选*/
////		          	let sss= (time.getTime() < date.getTime() + 3600 * 1000 * 24 * 7) && (time.getTime() > date.getTime() - 3600 * 1000 * 24 * 7)        
////		            return  sss;
////		          }
//		       },
//		       pickerOptions1: {
//		           disabledDate(time) {
//					var res={
//						id:this.id
//					}
//					checkdt(res).then(response=>{
//						if(response.code==0){
//							disabledTimeRange=[response.start_time,response.end_time];
//						}else{
//							alert(response.msg);
//						}
//					})
//					if(disabledTimeRange[1]){
//						return time.getTime() >= disabledTimeRange[0]&&time.getTime()<=disabledTimeRange[1];
//					}
//		          }
//		       },
				pickerOptions0: {
					//0新增					
				  disabledDate(time) {     
	            		if (disabledTimeRange.length > 1) {
							return time.getTime() >= disabledTimeRange[0] && time.getTime() <= disabledTimeRange[1];
						}
						return false;
		          	  }
		       	},
		       pickerOptions1: {
		           disabledDate(time) {
					if (disabledTimeRange2.length > 1) {
						return time.getTime() >= disabledTimeRange2[0] && time.getTime() <= disabledTimeRange2[1];
					}
					return false;
			        }
		       },
		        value3:'111111111',//新增日期
		        total:0,
			 	listQuery: {
                    page: 1,
                    rows: 20,
                    title: undefined,
                    type: undefined,
                    sort: '',
                    order:'desc'
                },
                formInline: {
		          user: '',
		          region: '22222'
		        },
		        ruleForm: {
		          rule_name: '',
		          min_money: '',
		          max_money:'',
//		          value3:[new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
		        },
		         chuang:{
			    	rule_name:'',
			    	rule_time:'',
			    	min_money: '',
		          	max_money:''
			    },
		        rows: [{
				        tenancy_id: "gzwx",
				        id: 3,
				        rule_name: "5678",
				        start_time: "2017-11-03 00:00:00",
				        end_time: "2017-11-03 00:00:00",
				        min_money: '¥50.00',
				        max_money: '400.00',
				        status:'111',
				        status_desc: "假数据"
			       }],
		        dialogTableVisible: false,
		        dialogFormVisible: false,//新增
		        dialog2:false,//修改
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        formLabelWidth: '120px',
		      };
		      
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
			     formatter(row, column) {
			        return row.address;
			     },
			     handleIconClick(){
			      	//规则名称查询
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
			    dateChange(){
		         	this.listQuery.page=1;
	        		this.getList();  
		        },
		       //删除  
		      deleteRow(index, id) {
		        this.$confirm('删除后不可恢复，确定删除并终止当前活动吗？', '', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.delecurent(id).then((res)=>{
		          	if(res.code=='0'){
		          		this.$message({
				            type: 'success',
				            message: '删除成功!',
				        });
		          	}
		          	this.rows.splice(index, 1);
				    this.getList();   
		          });     
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        }); 	
		      },
		    //查询接口  
		    getList(){
		    	var dt1='';
		    	var dt2='';
		      	if(this.date_value && this.date_value.length >0){
		      		dt1=dateFormat('yyyy-MM-dd',this.date_value[0]);
		      	}
		      	if(this.date_value && this.date_value.length >1){
		      		dt2=dateFormat('yyyy-MM-dd',this.date_value[1]);
		      	}
		      	var param={
	      		 	rule_name:this.rule_name,
				    start_time: dt1,
				    end_time: dt2,
				    page:this.listQuery.page,
				    rows:this.listQuery.rows
		      	};
		      	zhifulist(param).then(response=>{
		      		this.total = response.total;
		      		this.rows=response.rows;      		
		      	})
		    },
		    //保存接口
		    dosave(){
		    	var dt3='';
		    	var dt4='';
		      	if(this.value3 && this.value3.length >0){
		      		dt3=dateFormat('yyyy-MM-dd hh:mm:ss',this.value3[0]);
		      	}
		      	if(this.value3 && this.value3.length >1){
		      		dt4=dateFormat('yyyy-MM-dd hh:mm:ss',this.value3[1]);
		      	}
		    	var info={
	      		 	rule_name:this.ruleForm.rule_name,
				    start_time: dt3,
				    end_time: dt4,
				    min_money:this.ruleForm.min_money,
				    max_money:this.ruleForm.max_money
		      	};
		      	var name=this.ruleForm.rule_name;
		      	var num1 = parseFloat(this.ruleForm.min_money,10);
				var num2 = parseFloat(this.ruleForm.max_money,10);
			    var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
			    var isMinRight = exp.test(num1);
		  	    var isMaxRight = exp.test(num2);
			    if(name == ''|| name==null || name==undefined){
			    	alert('规则名称不能为空');
			    	return;
			    }else{
			    	if(isMinRight && isMaxRight){
				    	if(num1 > num2) {
							alert("最小值不能大于最大值");
							this.ruleForm.min_money='';
		      				this.ruleForm.max_money='';
							return;
						} else {
							saveall(info).then(response=>{
					      		if(response.code=='0'){
					      			this.dialogFormVisible = false;
							      	this.ruleForm.rule_name='';
							      	this.ruleForm.min_money='';
							      	this.ruleForm.max_money='';
							      	alert('新增成功');
							      	this.getList();
					      		}else{
					      			alert(response.msg);
					      			this.dialogFormVisible = true;
					      		}		
					      	});
						};
				    } else {
						alert('金额输入不合法,请重新输入');
						this.ruleForm.min_money = '';
						this.ruleForm.max_money = '';
						return;
		    		}
			    }
//			    this.dialogFormVisible = false;
//		      	this.ruleForm.rule_name='';
//		      	this.ruleForm.min_money='';
//		      	this.ruleForm.max_money='';
		    },
		    //删除接口
		    delecurent(id){
		    	var info={
	  		 		id:id,
		     	};	  
			   return deletover(info).then(response=>{
		      		return response;
		      });      	
		    },
		    //通过id查询接口
		    xiugai(id){
		    	this.xiugai2(id);
		    	this.id = id;
		    },
		    xiugai2(id){
		    	this.dialog2 = true;
		    	var info={
		    		id:id,
		    	};
		    	seachid(info).then(response=>{
		    		this.chuang=response.data;
		    		this.rule_time=[response.data.start_time,response.data.end_time];
		    	});
		    },
		    //修改保存按钮
		    dosave2(){
		    	var dt5='';
		    	var dt6='';
		      	if(this.rule_time && this.rule_time.length >0){
		      		dt5=dateFormat('yyyy-MM-dd hh:mm:ss',new Date(this.rule_time[0]));
		      	}
		      	if(this.rule_time && this.rule_time.length >1){
		      		dt6=dateFormat('yyyy-MM-dd hh:mm:ss',new Date(this.rule_time[1]));
		      	}
		    	var info={
		    		id:this.id,
	      		 	rule_name:this.chuang.rule_name,
				    start_time: dt5,
				    end_time: dt6,
				    min_money:this.chuang.min_money,
				    max_money:this.chuang.max_money
		      	};
		      	var name=this.chuang.rule_name;
		      	var num1 = parseFloat(this.chuang.min_money,10);
				var num2 = parseFloat(this.chuang.max_money,10);
			    var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
			    var isMinRight = exp.test(num1);
		  	    var isMaxRight = exp.test(num2);
		  	    if(name == ''|| name==null || name==undefined){
			    	alert('规则名称不能为空');
			    	return;
			    }else{
			    	if(isMinRight && isMaxRight){
				    	if(num1 > num2) {
							alert("最小值不能大于最大值");
							this.chuang.min_money='';
		      				this.chuang.max_money='';
							return;
						} else {
							saveall(info).then(response=>{
					      		if(response.code=='0'){
					      			alert('修改成功');
					      			this.getList();
					      		}else{
					      			alert(response.msg);
					      		}
					      	});
						}
				    } else {
						alert('金额输入不合法,请重新输入');
						this.chuang.min_money = '';
						this.chuang.max_money = '';
						return;
		    		}
			    }
		      	this.dialog2 = false;
		    },
			sortBy(a, b) {
				return new Date(a.start_time).getTime() >= new Date(b.start_time).getTime() ? 1 : -1;
			},
//			sortBy2(a,b){
//				return parseFloat(a.replace('¥', '')) > parseFloat(b.replace('¥', '')) ? 1 : -1; 
//			},
			addguize(){
				var yzcardinfo={};
				yzcard(yzcardinfo).then(response=>{
					if(response.code==0){
						this.dialogFormVisible = true;
						const end = new Date();
			            const start = new Date();
			            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
			            this.value3=[start, end];
					}else{
						alert(response.msg);
						this.dialogFormVisible = false;
					};
				})
//				this.dialogFormVisible = true;
//				const end = new Date();
//	            const start = new Date();
//	            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
//	            this.value3=[start, end];    
			},
			checkdate(type){
				//新增规则时间校验
				var info={};
				if (type !== 'add') {
					info.id = this.id;
				}
				checkdt(info).then(response=>{
					if(response.code==0){
						if (type === 'add') {
								if (disabledTimeRange[0] !== response.start_time || disabledTimeRange[1] !== response.end_time) {
							disabledTimeRange=[response.start_time, response.end_time];
							}
						} else {
							if (disabledTimeRange2[0] !== response.start_time || disabledTimeRange2[1] !== response.end_time) {
								disabledTimeRange2=[response.start_time, response.end_time];
							}
						};
					}else{
						alert(response.msg);	
					}
				})
			},
			quxiao(){
				this.dialogFormVisible = false;
				this.ruleForm.rule_name='';
		      	this.ruleForm.min_money='';
		      	this.ruleForm.max_money='';
			}
//			jiaoyan(){
//				var num1 = parseFloat(this.ruleForm.min_money,10);
//				var num2 = parseFloat(this.ruleForm.max_money,10);
//			    var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
//			    var isMinRight = exp.test(num1);
//		  	    var isMaxRight = exp.test(num2);
//			    if(isMinRight && isMaxRight){
//			    	if(num1 > num2) {
//						alert("最小值不能大于最大值");
//					} else {
//						saveall(info).then(response=>{
//				      		if(response.code=='0'){
//				      			this.getList();
//				      		}else{
//				      			alert(response.msg);
//				      		}		
//				      	});
//					}
//			    } else {
//					alert('金额输入不合法,请重新输入');
//					this.ruleForm.min_money = '';
//					this.ruleForm.max_money = '';
//	    		}
//			}
  		},
  		created(){
		     	this.getFirstList();    	
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

<style>
	.addgz{
		display: block;
		padding:8px 15px;
		background: #FF9001;
		border-radius: 0.3em;
		color: #fff;
		font-size: 12px;
	}
	.addgz:hover{
		color: #fff;
	}
	.guizelist .el-button{
		border: none;
	}
	.stateorg{
		color: #FF9001;
	}
	.stategreen{
		color: #4ECF88;
	}
	.stateover{
		color: #9AABB8;
	}
	.bluecolor{
		color: #0C9AFF;
		line-height: 16px;
	}
	.gzmart{
		margin-top: 10px;
	}
	.gztip{
		padding: 10px;
		line-height: 18px;
		background: #FFFAEB;
		border-radius: 3px;
	}
	.gzkuan{
		width: 350px;
	}
	.gzkuan2{
		width: 165px;
	}
	.el-message-box  .el-icon-close:before {
	    content: " ";
	}
</style>