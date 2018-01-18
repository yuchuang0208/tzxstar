<template>
	<div class='applist' v-loading.body='loadingBody'>
		<div class='listtitle'>
			<span>诊断报告</span>
		</div>
		<div class='reportdetail'>
			<div class='reportlist'><em>报告日期&nbsp;:</em><span>{{day_count}}</span></div>
			<div class='reportlist'><em>报告类别&nbsp;:</em><span>操作信息诊断报告</span></div>
			<div class='reporttotal'>
				<div class='detail' style='margin-top: 10px;'><em>报告详情&nbsp;:</em></div>
				<div class='detail'>
					<el-table  stripe :show-header=false :data="data" @expand-change='expandChange' style="width: 100%">				     
				    <el-table-column  header-align='left' align='left'  width="340">
						<template scope='scope'>
							<div :class='scope.row.warnNum>0?"detail-tag-danger":"detail-tag-success"' >
								<tzx-tag  :color='scope.row.warnNum>0?"#FF7777":"#56C94F"'>{{scope.row.warnNum>0?'风险':'安全'}}</tzx-tag>
							</div>
							
							<span>{{scope.row.warnName}}:&nbsp;&nbsp;&nbsp;≥{{scope.row.warnValue}}{{unit(scope.row.warnName)}}</span>
						</template>

					</el-table-column>
				    <el-table-column  header-align='center' align='center'  width="200">
						<template scope='scope'>
							<span>人数:&nbsp;&nbsp;&nbsp;{{scope.row.warnNum}}人</span>
						</template>
					</el-table-column>
				        
		   
					   <el-table-column type="expand"  width="410">					   
     					 <template scope="props">
     					 	  <el-table :data="props.row.detailList" border style="width: 100%" >
							    <el-table-column align='left' header-align='center' prop="customer_id" label="会员ID" width="90">
							    	<template scope="scope" >										
										<div class='detaildiv'>{{scope.row.customer_id}}</div>
									</template>
							    </el-table-column>							    
							    <el-table-column align='left' header-align='center' prop="mobile" label="手机号" width="120">
							    	<template scope="scope" >										
										<div class='detaildiv'>{{scope.row.mobile}}</div>
									</template>
							    </el-table-column>
							    <el-table-column align='right' header-align='right' label="次数"  width="80">
							    	<template scope="scope" >										
										<div class='detaildiv'>{{scope.row.detailVoList?scope.row.detailVoList.length:0}}</div>
									</template>
							    </el-table-column>
							<!--    <el-table-column header-align='right' align='right'   prop="warn_real" :label="setTitleName(props.row.detailList)" width="150"></el-table-column>-->
							    <el-table-column align='left' header-align='center' label="门店" width="110">	
									<template scope="scope" >										
									<div class='memberdetail' v-for="item in scope.row.detailVoList">
										{{item.org_full_name | stringformat(8)}}
									</div>
									</template>
								</el-table-column>
								<el-table-column align='left' header-align='center' label="卡号" width="140" v-if='props.row.warnName.indexOf("储值")!= -1'>	
									<template scope="scope" >										
									<div class='memberdetail' v-for="item in scope.row.detailVoList">
										{{item.card_code}}
									</div>
									</template>
								</el-table-column>	
								 <el-table-column align='left' header-align='center' label="单号" width="190">	
									<template scope="scope" >										
									<div class='memberdetail' v-for="item in scope.row.detailVoList">
										{{item.bill_code}}
									</div>
									</template>
								</el-table-column>
								<el-table-column align='right' header-align='right'   label="主账户金额" width="100" v-if='props.row.warnName.indexOf("储值")!= -1'>	
									<template scope="scope" >										
									<div class='memberdetail' v-for="item in scope.row.detailVoList">
										{{item.trading_main | currency}}
									</div>
									</template>
								</el-table-column>	
								<el-table-column align='right' header-align='right'   label="赠送账户金额" width="110" v-if='props.row.warnName.indexOf("储值")!= -1'>	
									<template scope="scope" >										
									<div class='memberdetail' v-for="item in scope.row.detailVoList">
										{{item.trading_reward | currency}}
									</div>
									</template>
								</el-table-column>
								<el-table-column  align='right' header-align='right'   label="积分" width="110" v-if='props.row.warnName.indexOf("积分")!= -1'>	
									<template scope="scope" >										
									<div class='memberdetail'  v-for="item in scope.row.detailVoList">
										{{item.trading_credit}}
									</div>
									</template>
								</el-table-column>
								<el-table-column  align='right' header-align='right'   label="调账审核时间" width="110">	
									<template scope="scope" >										
									<div class='memberdetail'  v-for="item in scope.row.detailVoList">
										{{item.check_time}}
									</div>
									</template>
								</el-table-column>								
								<el-table-column align='left' header-align='left' label="审核人" width="80">	
									<template scope="scope" >										
									<div class='memberdetail' v-for="item in scope.row.detailVoList">
										{{item.check_operator}}
									</div>
									</template>
								</el-table-column>	
							  </el-table>
     					 </template>
     				   </el-table-column>
				    </el-table>    
				</div>        				      
			</div>
		</div>
	</div>	
</template>

<script>
/*	import { getReportById} from '@/api/article'*/
	import { getOperateReportDetail} from '@/api/safety'
	import { TzxTag } from '@/components/tag'
	export default{
		data(){
			return{
				loadingBody:false,
				data:[],
				day_count:'',
			}
		},
		components:{
			TzxTag
		},
		methods:{
			setTitleName(item){
				
				if(item&&item.length>0)
				{   
					
					return item[0].warn_real_name;
				}
				else{
					return "次数"
				}
			},
			findReportDetail(day_count){
				_czc.push(["_trackEvent", "安全诊断-诊断报告-诊断报告详情", "查看"]);//埋点统计
				this.day_count = day_count;
				let message = 'day_count='+day_count;
				this.loadingBody = true;
				getOperateReportDetail(message).then(reponse=>{
					if(reponse.success){
					
						
						reponse.data.map((item,index)=>{
							
							if(item.detailList){
								let datalist = [];
								let newlist = [];
								item.detailList.map((list,i)=>{
									if(newlist.indexOf(list.customer_id)==-1){
										newlist.push(list.customer_id)
										datalist.push(list)
									}
									else{
										datalist.map((it,ix)=>{
											if(list.customer_id == it.customer_id){
												it.detailVoList.push(list.detailVoList[0])	
											}
										})
									}
								})
								item.detailList = datalist;
							}
							else{
								
							}
							this.data = reponse.data;
						})
						this.$nextTick(function(){
							//页面渲染完成之后执行的函数
							this.loadingBody = false;
						})	
					}
					else{
						this.loadingBody = false;
						this.$message({
							type:'error',
							message:'数据加载失败,请重试！'
						})
					}
				}).catch(e=>{
					this.loadingBody = false;
					this.$message({
						type:'error',
						message:'数据加载失败,请重试！'
					})
				});
				
			},
			unit(name){
				if(name){
					if(name.indexOf('次数')!=-1){
						return '次'
					}
					else if(name.indexOf('积分')!=-1){
						return '积分'
					}
					else if(name.indexOf('金额')!=-1||name.indexOf('额')!=-1){
						return '元'
					}
					else{
						return ''
					}
				}
				else{
					return '';
				}	
			},
			expandChange(row, expandedRows){
			}
		},
		created(){
			if(this.$route.query.day_count!=undefined){
				
				this.findReportDetail(this.$route.query.day_count);
			}
			
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss"> 
.applist{
	height: auto;
	overflow:hidden;
	zoom: 1;
	background: #fff;
	.listtitle{
		position: relative;		
		height: 50px;
		margin-left: 20px;
		margin-right: 20px;
		line-height: 50px;
		border-bottom:1px solid  #EAF1F6;
		 span {
				font-size: 16px;
				color: #34495E;					
		}
	}
	.reportdetail{
		position: relative;	
		height: auto;			
		margin-left: 40px;
		margin-right: 20px;
		padding-top: 6px;
		.reportlist{
			position: relative;
			height:34px;
			line-height: 34px;
			font-size: 14px;
			color: #34495E;
			em{ 				    					
				padding-right: 10px;
			}								
		}
		.reporttotal{
			height: auto;
			overflow:hidden;
	    	zoom: 1;
			min-height: 300px;
			.detail{
				height: 100%;
				float: left;
				.el-table__expand-icon {
				    position: relative;
				    cursor: pointer;
				    color: #666;
				    font-size: 12px;
				    transition: transform .2s ease-in-out;
				    height: 20px;
		    	}
		    	.detail-tag-danger{
		    		display: inline-block;
		    		border: 1px solid #FFB9B9;
		    		border-radius: 3px;
		    		background: #FFF0F0;
		    	}
		    	.detail-tag-success{
		    		display: inline-block;
		    		background: #EFFFEE;
					border: 1px solid #84E27E;
					border-radius: 3px;
		    	}
			    .el-table__expand-icon--expanded {   
			    	transform: rotate(0deg);
				}
			    
			   .el-table__expand-icon:after{
			   		content: '查看详情';
			   		font-size: 12px;
					color: #0C9AFF;
			    }
			    .el-icon-arrow-right:before {
			        content: "";
			    }
			    .el-table__expanded-cell {
				     padding:  0;
				     background-color: #FEFEFE; 
				     box-shadow: inset 0 0 0 #f4f4f4; 
				}
				em{ 
					margin-top: 10px;			    					
					padding-right: 10px;
				}
				.el-table .el-table__body-wrapper .cell {
				    white-space: normal;
				    word-break: break-all;
				    line-height: 18px;
				    font-size: 12px;
				    padding:  0;
				  	margin-left: 0; 
				   	margin-right: 0;
				   	.memberdetail{
						width:100%;
						height:31px;
						font-size:12px;
						line-height:31px;
						border-top:1px solid #F1F7FC;
						padding-left: 14px;
						padding-right: 14px;
						&:nth-of-type(1){
							border-top: 0;
						
						}
					}
					.detaildiv{
						height: 100%;
						line-height:100%;
						padding-left: 14px;
						padding-right: 14px;
					}
				}	  
				.el-table .el-table__header .cell {
				    white-space: normal;
				    word-break: break-all;
				    line-height: 18px;
				    font-size: 12px;
				    padding:  0 14px
			    }	
			}
		}
	}
}
</style>