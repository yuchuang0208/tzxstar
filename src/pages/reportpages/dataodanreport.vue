<template>
<div class='appclass'>
	<!--优惠券详情 开始 -->
			<el-dialog
			  title=""
			  :visible.sync="dialogViewYouhuiQuan"
			  size="tiny"
			  custom-class="viewyhq_dialog">
			     <div class="viewyhq" v-model="yhqOneData">
			     	<div class="up">
			     		<div class="left">
			     			<div class="left_up">
			     				<cite>¥</cite>
			     				<tt v-if="yhqOneData.face_value !=''">{{yhqOneData.face_value}}</tt>
			     			</div>
			     			<div class="left_down">
			     				<cite v-if="yhqOneData.bill_limit_money !=''">满{{yhqOneData.bill_limit_money}}元可用</cite>
			     			</div>
			     		</div>
			     		<div class="right">
			     			 <cite v-if="yhqOneData.coupons_pro !='' && yhqOneData.coupons_pro == 'coupons_deduct'">代金券</cite>
				  	  	 	 <cite v-if="yhqOneData.coupons_pro !='' && yhqOneData.coupons_pro == 'coupons_dish'">菜品券</cite>
			     			 <em v-if="yhqOneData.validity_type !='' && yhqOneData.validity_days !='' && yhqOneData.validity_type == '1'">
			     			 	 领券后当日可用,有效期{{yhqOneData.validity_days}}天</em>
				  	  	 	 <em v-if="yhqOneData.start_coupon !='' && yhqOneData.end_coupon !=''">{{yhqOneData.start_coupon}}-{{yhqOneData.end_coupon}}</em>
			     		</div>
			     	</div>
			     	<div class="center"></div>
			     	<div class="down">
			     		<ul>
			     			<li>
			     				<cite>使用周期：</cite>
			     				<em>{{yhqOneData.cycle_names}}</em>
			     			</li>
			     			<li>
			     				<cite>使用规则：</cite>
			     				<em>每笔订单允许使用{{yhqOneData.bill_limit_num}}张</em>
			     			</li>
			     			
			     			<li>
			     				<cite>使用渠道：</cite>
			     				<em>{{yhqOneData.use_chanel}}</em>
			     			</li>
			     			<li>
			     				<cite>使用门店：</cite>
			     				<em >{{yhqOneData.store_names}}</em>
			     			</li>
			     		</ul>
			     	</div>
			     </div>
			</el-dialog>
			<!--优惠券详情 结束 -->
   	<div class="app-container calendar-list-container" >
      <div class="headtop">大逃单游戏报告</div>
      <!----tableData---->
      <el-table :data="data" style="width: 100%" class="">
         <el-table-column label="游戏名称" prop="subject"></el-table-column>
         <el-table-column label="游戏类型" prop="activity_type">
         	<template scope="scope">
         		<span v-if="scope.row.activity_type == 'wxdtd'">微信大逃单 </span>
                <!--<span v-else :style="{color:'#34495E'}">已终止</span>-->
         	</template>
         </el-table-column>
         <el-table-column label="游戏周期" prop="" width='170'>
         	<template scope="scope">
		        <span>{{ scope.row.start_time}}</span>
		        <span>至</span>
		        <span>{{ scope.row.end_time}}</span>
		    </template>
         </el-table-column>
         <el-table-column label="状态" prop="running_state"> 
         	<template scope="scope">
         		<span v-if="scope.row.running_state == '1'" class="stategreen">进行中 </span>
                <span v-else-if="scope.row.running_state == '0'" class="stateover">未发布</span>
                <span v-else-if="scope.row.running_state == '3'" class="stateorg">已结束</span>
                <span v-else :style="{color:'#ff9001'}">已终止</span>
         	</template>
         </el-table-column>
         <el-table-column label="参与游戏人数" prop="game_num" width="70"> </el-table-column>
         <el-table-column label="游戏内新增粉丝" prop="game_fans"> </el-table-column>
         <el-table-column label="游戏新增会员" prop="game_member"> </el-table-column>
         <el-table-column label="领券总数" prop="coupon_num" width="80"> </el-table-column>
         <el-table-column label="用券总数" prop="use_coupon"> </el-table-column>
         <el-table-column label="游戏拉动营业额" prop="pull_money"></el-table-column>
         <el-table-column label="操作" width="90">
            <template scope="scope">
               <tzx-tag color="#0C9AFF" @clickThis ='seeDetail(scope.row)'>查看报告</tzx-tag>
            </template>
         </el-table-column>
      </el-table>
      <!----统计开始----->
      <div class="staticbox"  v-show="isShowDiv">
      	<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="游戏转化统计" name="first">
		    	<div style="margin-top: 10px;">
		      	  <el-form :inline="true" :model="alline" class="demo-form-inline">
			         <el-form-item label="">
					    <el-select @change="refurbish1" v-model="gamevalue1" placeholder="全部游戏门店">
						    <el-option
						      v-for="option in shopOptions" 
						      :key="option.id"
						      @click='selectChange'
						      :label="option.org_full_name" 
						      :value="option.id">
						    </el-option>
					    </el-select>
					  </el-form-item>
			         <el-form-item>
			         	<el-date-picker
			         	  :picker-options="pickerOptions0"	
					      v-model="value1" @change="dateChange1"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>  
			         </el-form-item>
			      </el-form>
			      <div class="staticpic">
			      	<div id="myChart" :style="{width: '1000px',height:'370px'}">
			      		
			      	</div>
			      </div>
			      <div style="margin-top: 10px;clear: both;">
			      	<el-row>
					  <el-col :span="12">
					  	<div class="grid-content bg-purple-dark">
					  	新增粉丝总数<span class="red">pk</span>
					  	</div>
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="12">
					  	新增粉丝总数<span>{{zhuanhuaTongji.newFans}}人</span>
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="6">
					  	<span class="grid-content bg-purple">游戏内新增粉丝总数：</span>
					  	<span>{{zhuanhuaTongji.newInnerFans}} </span>人
					  	<em>{{((zhuanhuaTongji.newFans > 0 ?(zhuanhuaTongji.newInnerFans / zhuanhuaTongji.newFans) * 100 :0) || 0).toFixed(2)}}</em>%
					  </el-col>
					  <el-col :span="6">
					  	<span class="grid-content bg-purple-light">非该游戏新增粉丝总数:</span>
					  	<span>{{zhuanhuaTongji.newOuterFans}} </span>人
					  	<em>{{((zhuanhuaTongji.newFans > 0 ? (zhuanhuaTongji.newOuterFans / zhuanhuaTongji.newFans) * 100 : 0) ||0).toFixed(2)}}</em>%
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="12">
					  	<div class="grid-content bg-purple-dark">
					  	新增会员总数<span class="red">pk</span>
					  	</div>
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="12">
					  	新增会员总数<span>{{zhuanhuaTongji.newMember}}</span>人
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="6">
					  	<span class="grid-content bg-purple">游戏新增会员总数：</span>
					  	<span>{{zhuanhuaTongji.newInnerMember}}</span>人
					  	<em>{{((zhuanhuaTongji.newMember > 0 ? (zhuanhuaTongji.newInnerMember / zhuanhuaTongji.newMember) * 100 :0 ) ||0).toFixed(2) }}</em>%
					  </el-col>
					  <el-col :span="6">
					  	<span class="grid-content bg-purple-light">非该游戏新增会员总数：</span>
					  	<span>{{zhuanhuaTongji.newOuterMember}} </span>人
					  	<em>{{((zhuanhuaTongji.newMember > 0 ? (zhuanhuaTongji.newOuterMember / zhuanhuaTongji.newMember) * 100 : 0 ) ||0).toFixed(2)}}</em>%
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="12">
					  	<div class="grid-content bg-purple-dark">
					  	拉动营业额<span class="red">pk</span>
					  	</div>
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="12">
					  	营业额总数￥<span>{{zhuanhuaTongji.money}}</span>
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="6">
					  	<span class="grid-content bg-purple">游戏拉动营业额总数：</span>
					  	￥<span>{{zhuanhuaTongji.pullMoney}} </span>元
					  	<em>{{((zhuanhuaTongji.money >0 ? (zhuanhuaTongji.pullMoney / zhuanhuaTongji.money) * 100 :0 )||0 ).toFixed(2)}}</em>%
					  </el-col>
					  <el-col :span="6">
					  	<span class="grid-content bg-purple-light">非该游戏营业额总数：</span>
					  	￥<span>{{zhuanhuaTongji.nopullMoney}}</span>元
					  	<em>{{((zhuanhuaTongji.money > 0 ? (zhuanhuaTongji.nopullMoney / zhuanhuaTongji.money) * 100 : 0 )||0).toFixed(2)}}</em>%
					  </el-col>
					</el-row>
			      </div>
		      </div>
		    </el-tab-pane>
		    <!-------222------>
		    <!--<el-tab-pane label="游戏分享统计" name="second">
		    	<div style="margin-top: 10px;">
		      	  <el-form :inline="true" :model="alline" class="demo-form-inline">
			         <el-form-item label="">
					    <el-select @change="refurbish2" v-model="gamevalue2" placeholder="全部游戏门店">
						    <el-option
						      v-for="option in shopOptions" 
						      :key="option.id" 
						      :label="option.org_full_name" 
						      :value="option.id">
						    </el-option>
					    </el-select>
					 </el-form-item>
			         <el-form-item>
			         	<el-date-picker
			         	  :picker-options="pickerOptions0"
					      v-model="value2" @change="dateChange2"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>  
			         </el-form-item>
			      </el-form>
			      <div class="staticpic">
			      	<div id="Chartshare" :style="{width: '900px',height:'340px'}">
			      	</div>
			      </div>
			      <div style="margin-top: 10px;clear: both;">
				      	<el-row>
						  <el-col :span="12">
						  	<div class="grid-content bg-purple-dark">
						  	玩家分享总数：<span>{{totalshare}}</span>
						  	</div>
						  </el-col>
						</el-row>
				  </div>
		      </div>
		    </el-tab-pane>-->
		    <!-----333----->
		    <el-tab-pane label="游戏优惠券统计" name="third">
		    	<div style="margin-top: 10px;">
		      	  <el-form :inline="true" :model="alline" class="demo-form-inline">
			         <el-form-item label="">
					    <el-select @change="refurbish3" v-model="gamevalue3" placeholder="全部游戏门店">
						    <el-option
						      v-for="option in shopOptions" 
						      :key="option.id" 
						      :label="option.org_full_name" 
						      :value="option.id" >
						    </el-option>
					    </el-select>
					 </el-form-item>
			         <el-form-item>
			         	<el-date-picker
			         	  :picker-options="pickerOptions0"
					      v-model="value3" @change="dateChange3"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>  
			         </el-form-item>
			      </el-form>
			      <div class="staticpic" style="margin-bottom: 20px;">
			      	<el-table :data="quanstatic" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
					    <el-table-column prop="" label="券名称" width="250">
					    	<template scope="scope">
					    		<span >{{scope.row.class_name}}{{scope.row.lastLine ? '' : '元代金券'}}</span>
					    	</template>
					    </el-table-column>
					    <el-table-column prop="couponnum" label="领券总数" sortable width="180"></el-table-column>
					    <el-table-column prop="use_coupon" label="用券总数" sortable width="180"></el-table-column>
					    <el-table-column prop="coupon_percent" label="券使用率" sortable width="180"></el-table-column>
					    <el-table-column label="操作">
					    	<template scope="scope">
					    		<tzx-tag color="#0C9AFF" @clickThis ='yulan(scope.row.class_id)'>{{scope.row.lastLine ? '' : '券预览'}}</tzx-tag>
					    	</template>
					    </el-table-column>
					</el-table>
			      </div>
		      </div>
		    </el-tab-pane>
		    <!--------4444------>
		    <el-tab-pane label="游戏玩家人数统计" name="fourth">
		    	<div style="margin-top: 10px;">
		      	  <el-form :inline="true" :model="alline" class="demo-form-inline">
			         <el-form-item label="">
					    <el-select @change="refurbish4" v-model="gamevalue4" placeholder="全部游戏门店">
						    <el-option
						      v-for="option in shopOptions" 
						      :key="option.id" 
						      :label="option.org_full_name" 
						      :value="option.id" >
						    </el-option>
					    </el-select>
					 </el-form-item>
			         <el-form-item>
			         	<el-date-picker
			         	  :picker-options="pickerOptions0"
					      v-model="value4" @change="dateChange4"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>  
			         </el-form-item>
			      </el-form>
			      <div class="staticpic">
			      	<div id="bing" :style="{width: '500px',height:'340px'}">
			      	</div>
			      </div>
		      </div>
		    </el-tab-pane>
		  </el-tabs>
      </div>
    <!----数据统计end----->
    </div>  
</div>
</template>

<script>
	import {TzxTag} from '@/components/tag'
	import {getYouHuiQuanOne,getMendian} from '@/api/home'
    import axios from 'axios'
    import {gameList,menstore,conversion,share,youhuiq,playnumber,quanyl} from '@/api/game'
    let disabledTimeRange = [];

	export default {
		components: {TzxTag},
  		name: 'dataodanreport',
  		data(){
  			return{
  				alline:{ 
  				
  				},
  				// 转化统计展示
  				zhuanhuaTongji: {
  					newFans:'',
  					newInnerFans:'',
  					newOuterFans:'',
  					newMember:'',
  					newInnerMember:'',
  					newOuterMember:'',
  					money:'',
  					pullMoney:'',
  					nopullMoney:''
  				},
  				totalshare:{},
  				rowData: {},
  				//门店模拟数据
				shopOptions: [],
		        gamevalue1:"",
		        gamevalue2:"",
		        gamevalue3:"",
		        gamevalue4:"",
				shareform:{
					region:''
				},
				//列表页模拟数据
				data: [],
		        isShowDiv: false,
                value1:'',//统计时间
                value2:'',//统计时间
                value3:'',//统计时间
                value4:'',//统计时间
                pickerOptions0: {
				  disabledDate(time) {     
	            		if (disabledTimeRange.length > 1) {
							return time.getTime() <= new Date(disabledTimeRange[0]).getTime()
								|| time.getTime() >= new Date(disabledTimeRange[1]).getTime();
						}
						return false;
		          	}
		       	},
                activeName:'first',
                yhqOneData:{},//查看单个优惠券
                handleViewYouhuiQuanClose:'',
                dialogViewYouhuiQuan:false,
                yhqOneData:{},
                rowIndex: 0 ,
                //优惠券统计模拟数据
                quanstatic:[],
  			}
  		},
//		watch:{
//			//gameValue(){}
//		},
		mounted(){
		   this.drawLine();
		   this.bing();
//		   this.drawshare();
		},
  		methods:{
	        handleClick(tab, event){
		        this.activeName = tab.name;
		        let time = [this.rowData.start_time, this.rowData.end_time];
		        switch (tab.name) {
		        	case 'first':
		        		this.value1 = time;
		        		break;
		        	case 'second':
		        		this.value2 = time;
		        		break;
		        	case 'third':
		        		this.value3 = time;
		        		break;
		        	case 'fourth':
		        		this.value4 = time;
		        		break;
		        	default:;
		        }
		    },
//		    handleViewYouhuiQuanClose(done) {
//			        done();
//			},
//		    initChartTwoData() {
//			  let data = {}
//			  for (var i = 2; i <=15; i++) {
//			    data[i] = {
//			      name: i + '人',
//			      value: 0
//			    }
//			  }
//			  return Object.keys(data).sort().map((item) => {
//			    return data[item];
//			  })
//			},
			getTimeStr(time) {
			  let month = time.getMonth() + 1;
			  let date = time.getDate();
			  month = month <= 9 ? '0' + month : month;
			  date = date <= 9 ? '0' + date : date;
			  return [time.getFullYear(), month, date].join('-');
			},
		    getFirstList() {
				if(window.screen.height <= 768) {
					this.maxHeight = '450';
				} else {
					this.maxHeight = '650';
				}
				this.getList();
			},
			seeDetail(row){
				let startTime = row.start_time;
				let endTime = row.end_time;
				this.activeName = 'first';
				this.rowData = row;
				this.isShowDiv=true;
//				this.isShowDiv=!this.isShowDiv;
				this.value1=[startTime,endTime];
//				this.value2=[startTime,endTime];
				this.value3=[startTime,endTime];
				this.value4=[startTime,endTime];
				if (disabledTimeRange[0] !== startTime || disabledTimeRange[1] !== endTime){
					disabledTimeRange=[startTime, endTime];
				};
				this.gamestore();
				setTimeout(function(){window.scrollTo(0, document.querySelector('.staticbox').offsetTop)},500);
			},
			selectChange(){
			},
			refurbish1(){
				this.zhuanhua(this.value1, true);//转化
			},
			refurbish2(){
				this.shareStaic(this.value2, true);//分享
			},
			refurbish3(){
				this.youhuiqStaic(this.value3, true);//优惠券
			},
			refurbish4(){
				this.playnumberStatic(this.value4, true);//人数
			},
			dateChange1(time){
				this.zhuanhua(time);//转化
			},
			dateChange2(time){
				this.shareStaic(time);//分享
			},
			dateChange3(time){
				this.youhuiqStaic(time);//优惠券
			},
			dateChange4(time){
				this.playnumberStatic(time);//人数
			},
			getTimeStrArr (startTime, endTime) {
			  if (!startTime || !endTime) {
			    return []
			  }
			  startTime = new Date(startTime.replace(/\-/g, '/'))
			  endTime = new Date(endTime.replace(/\-/g, '/'))
			  let timeSpace = 1000 * 60 * 60 * 24 * 7; // 7天
			  let timeStrArr = []
			  while (startTime.getTime() <= endTime.getTime()) {
			    timeStrArr.push(this.getTimeStr(startTime));
			    startTime.setTime(startTime.getTime() + timeSpace);
			  }
			  return timeStrArr;
			},

			getTimeStr (time) {
			  let date = time.getDate();
			  let month = time.getMonth() + 1;
			
			  date = date <= 9 ? '0' + date : date;
			  month = month <= 9 ? '0' + month : month;
			
			  return [time.getFullYear(), month, date].join('-');
			},
		    //列表展示
		    getList(){
		    	var info={
		    		tenentid:'tzxstar'
		    	}
		      	gameList(info).then(response=>{
		      		if(response.success == true) {
						this.data=response.data;
					} else {
						this.$message({
							type: 'error',
							message: '请求失败'
						});
					}
		      		   		
		      	})
		    },
		    //游戏门店
			gamestore(time){
				var info={
		    		tenentid:'tzxstar',
		    		activity_id:this.rowData.id
		    	};
		    	menstore(info).then(response=>{
		      		if(response.success == true) {
		      			this.shopOptions=response.data;//所有门店，
		      			
		      			this.gamevalue1=this.shopOptions[0].id;//全部门店
		      			this.gamevalue3=this.shopOptions[0].id;
		      			this.gamevalue4=this.shopOptions[0].id;

					} else {
						this.$message({
							type: 'error',
							message: '门店请求失败'
						});
					}
		      		   		
		      	})
			},
			//111转化统计接口
			zhuanhua(time, second_time){
		      	var param={
				    activity_id: this.rowData.id,
				    tenancy_id:"tzxstar",
				    store_id:this.gamevalue1, //就是store_id
				    start_time: second_time ? time[0] :time.split('至')[0] ,
				    end_time: second_time  ? time[1] :time.split('至')[1]
					
		      	};
		      	if (!param.start_time || !param.end_time){
					    alert('时间不能为空');
					    return;
				}else{
		      	conversion(param).then(response=>{
		      		if(response.success == true) {
		      			//转化统计接口
		      			var result1 = response.data.sum;
		      			var result2 = response.data.list;
		      			
						var data1=[];//参与游戏人数
						var data2=[];//游戏内新增粉丝数
						var data3=[];//游戏新增会员
						var data4=[];//游戏拉动营业额
						var data5=[];//非游戏营业额
						var data6=[];//日期 
						this.zhuanhuaTongji.newFans = result1.count_total_fans_num || 0;
						this.zhuanhuaTongji.newInnerFans = result1.count_fans_num || 0;
						this.zhuanhuaTongji.newOuterFans = result1.count_nofans_num || 0;
						this.zhuanhuaTongji.newMember = result1.count_total_member_num || 0;
						this.zhuanhuaTongji.newInnerMember = result1.count_member_num || 0;
						this.zhuanhuaTongji.newOuterMember = result1.count_nomember_num || 0;
						this.zhuanhuaTongji.money = result1.count_total_pull_money || 0;
						this.zhuanhuaTongji.pullMoney = result1.count_pull_money || 0;
						this.zhuanhuaTongji.nopullMoney = result1.count_no_pull_money || 0;
						for (var i in result2){
							data1.push(result2[i].totalnum);//参与游戏人数
							data2.push(result2[i].fans_num);//游戏内新增粉丝数
							data3.push(result2[i].member_num);//游戏新增会员
							data4.push(result2[i].pull_money);//游戏拉动营业额
							data5.push(result2[i].no_pull_money);//非游戏拉动营业额
							data6.push(result2[i].date); 
							
						}
						this.myChart.setOption({
							xAxis: [
						        {
						            data: data6,
						        }
//						        toolbox: {
//						        	boundaryGap: ['20%', '20%']
//						    	}
						    ],
						    dataZoom: {
						    	type: 'slider',
						        show: true,
						        start : 1,
						        end : 30
						    },
							series: [{
								name: '参与游戏人数',
								data: data1
							},{
								name: '游戏内新增粉丝数',
								data: data2
							},{
								name: '游戏新增会员',
								data: data3
							},{
								name: '游戏拉动营业额',
								data: data4
							},{
								name: '非游戏营业额',
								data: data5
							}]
						});
					} else {
						this.$message({
							type: 'error',
							message: response.msg
						});
					}
		      });
		      	
		     }; 
			},
			//222分享统计接口
//			shareStaic(time,second_time){
//		      	var param={
//		      		activity_id:this.rowData.id,
//				    tenancy_id:"tzxstar",
//				    org_id:this.gamevalue2,
//	      		 	start_time: second_time ? time[0] :time.split('至')[0] ,
//				    end_time: second_time  ? time[1] :time.split('至')[1]
//		      	};
//		      	if (!param.start_time || !param.end_time){
//					    alert('时间不能为空');
//					    return;
//				}else{
//		      	share(param).then(response=>{
//		      		if(response.success == true){
//						var data1=[];
//						var data2=[];
//						var result2=response.data;
//						
//						this.totalshare = response.totalnum;//分享总数
//						for(var i in result2){
//							data1.push(result2[i].num);//分享次数
//							data2.push(result2[i].createtime);//时间
//						}
//						this.Chartshare.setOption({
//							xAxis: [
//						        {
//						            data:data2,
//						        }
//						    ],
//						    dataZoom: {
//						        show: true,
//						        start : 1,
//						        end : 30
//						    },
//							series: [
//						    	{
//						            name:'玩家分享次数',
//						            data:data1
//						        }
//						    ]
//						});
//					} else {
//						this.$message({
//							type: 'error',
//							message: response.msg
//						});
//					}		
//		      	})
//		      	}
//			},
			//333优惠券统计接口
			youhuiqStaic(time ,second_time){
		      	var param={
		      		tenancy_id:"tzxstar",
					activity_id:this.rowData.id,
				    store_id:this.gamevalue3,
				    start_time: second_time ? time[0] :time.split('至')[0] ,
				    end_time: second_time  ? time[1] :time.split('至')[1]
		      	};
		      	if (!param.start_time || !param.end_time){
					    alert('时间不能为空');
					    return;
				}else{
		      	youhuiq(param).then(response=>{
		      		if(response.success == true){
//						this.quanstatic=response.data.list;
						var list = response.data.list;
						var totalCouponNum = response.data.activityGameGetCouponNum.totalCouponNum;
						var totalUsecouponNum = response.data.activityGameGetCouponNum.totalUsecouponNum;
						list.push({
						  lastLine: true, // 标记最后一行
						  class_name: '总计',
						  couponnum: totalCouponNum,
						  use_coupon: totalUsecouponNum,
						  coupon_percent: (parseFloat(totalUsecouponNum / totalCouponNum) * 100 ||0).toFixed(2) + '%'
						})
						this.quanstatic = list;
						
					}else{
						this.$message({
							type: 'error',
							message: response.msg
						});
					}		
		      	})
		     }
			},
			//游戏玩家人数统计44444
			playnumberStatic(time, second_time){
		      	var param={
	      		 	tenancy_id:'tzxstar',
        			activity_id:this.rowData.id,
        			store_id:this.gamevalue4,
     				start_time: second_time ? time[0] :time.split('至')[0] ,
				    end_time: second_time  ? time[1] :time.split('至')[1]
		      	};
		      	if (!param.start_time || !param.end_time){
					    alert('时间不能为空');
					    return;
				}else{
		      	playnumber(param).then(response=>{
		      		if(response.success == true){
						var result4 = response.data;
						var data1=[];
//						//========15人全显示的代码=====
//						let data1 = this.initChartTwoData();
//						for (var i in result4) {
//						  let num = parseInt(result4[i].num, 10);
//						  data1[num - 2].value = result4[i].numer || 0;
//						}
						for(var i in result4){
							data1.push({
							    name: result4[i].num+'人',//人数
							    value: result4[i].numer?result4[i].numer:0//人数对应的值
							});
						} 				
						this.Chartwo.setOption({
							series: [{
								data:data1
							}]
						});
					}else{
						this.$message({
							type: 'error',
							message: response.msg
						});
					}		
		      	})
		      };
			},
	        drawLine(){
		        // 基于准备好的dom，初始化echarts实例
		        this.myChart = this.$echarts.init(document.getElementById('myChart'))
		        // 绘制图表1（折线柱状）
		        this.myChart.setOption({
					tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            crossStyle: {
				                color: '#999'
				            }
				        }
				    },
				    toolbox: {
				        feature: {
				            dataView: {show: false, readOnly: false},
				            magicType: {show: false, type: ['line', 'bar']},
				            restore: {show: false},
				            saveAsImage: {show: false}
				        },
				        boundaryGap: ['20%', '20%']
				    },
				    legend: {
				        data:['参与游戏人数','游戏内新增粉丝数','游戏新增会员','游戏拉动营业额','非游戏营业额']
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: [],
				            axisPointer: {
				                type: 'shadow'
				            },
				            axisLabel:{
						        	interval:5
						    }
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value',
				            name: '人数',
				            min: 0,
				            max: 300,
				            interval: 15,
				            axisLabel: {
				                formatter: '{value}'
				            }
				        },
				        {
				            type: 'value',
				            name: '金额',
				            min: 0,
				            max: 5000,
				            interval: 500,
				            axisLabel: {
				                formatter: '{value}'
				            }
				        }
				    ],
				    series: [
				    	{
				            name:'参与游戏人数',
				            type:'line',
				            data:[]
				        },
				        {
				            name:'游戏内新增粉丝数',
				            type:'line',
				            data:[]
				        },
				        {
				            name:'游戏新增会员',
				            type:'line',
				            data:[]
				        },
				        {
				            name:'游戏拉动营业额',
				            type:'bar',
				            yAxisIndex: 1,
				            data:[]
				        },
				        {
				            name:'非游戏营业额',
				            type:'bar',
				            yAxisIndex: 1,
				            data:[]
				        }
				    ]
		        });
		        //绘制图表end
		    },
		    //分享柱图
//		    drawshare(){
//		        // 基于准备好的dom，初始化echarts实例
//		         this.Chartshare = this.$echarts.init(document.getElementById('Chartshare'))
//		        // 绘制图表1（折线柱状）
//		        this.Chartshare.setOption({
//					tooltip: {
//				        trigger: 'axis',
//				        axisPointer: {
//				            type: 'cross',
//				            crossStyle: {
//				                color: '#999'
//				            }
//				        }
//				    },
//				    toolbox: {
//				        feature: {
//				            dataView: {show: true, readOnly: false},
//				            magicType: {show: true, type: ['line', 'bar']},
//				            restore: {show: true},
//				            saveAsImage: {show: false}
//				        }
//				    },
//				    legend: {
//				        data:['玩家分享次数']
//				    },
//				    xAxis: [
//				        {
//				            type: 'category',
//				            data: [],
//				            axisPointer: {
//				                type: 'shadow'
//				            },
//				            axisLabel:{
//						        	interval:5
//						    }
//				        }
//				    ],
//				    yAxis: [
//				        {
//				            type: 'value',
//				            name: '次数',
//				            min: 0,
//				            max: 500,
//				            interval: 50,
//				            axisLabel: {
//				                formatter: '{value}'
//				            }
//				        }
//				    ],
//				    series: [
//				    	{
//				            name:'玩家分享次数',
//				            type:'bar',
//				            data:[]
//				        }
//				    ]
//		        });
//		        //绘制分享图表end
//		    },
		    //绘制饼图
		    bing(){
		    	this.Chartwo = this.$echarts.init(document.getElementById('bing'))
				this.Chartwo.setOption({
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    series : [
				        {
				            type: 'pie',
				            radius : '65%',
				            center: ['50%', '50%'],
				            selectedMode: 'single',
				            data:[
//				                {value:10, name: '15人'},
//				                {value:134, name: '14人'},
//				                {value:0, name: '13人'},
//				                {value:214, name: '12人'},
//				                {value:0, name: '11人'},
//				                {value:234, name: '10人'},
//				                {value:100, name: '9人'},
//				                {value:140, name: '8人'},
//				                {value:200, name: '7人'},
//				                {value:100, name: '6人'},
//				                {value:104, name: '5人'},
//				                {value:100, name: '4人'},
//				                {value:104, name: '3人'},
//				                {value:200, name: '2人'}
				            ],
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				});
				// 饼图end
		    },
		    yulan(id){//查看单个优惠券
				this.dialogViewYouhuiQuan = true;
			    getYouHuiQuanOne(id).then((response) => {
						this.yhqOneData = response;
						
						let obj = {};
						
						obj.face_value = this.yhqOneData.face_value;
						obj.bill_limit_num = this.yhqOneData.bill_limit_num;
						obj.activity_subject = this.yhqOneData.activity_subject;
						obj.used_other = this.yhqOneData.used_other;
						obj.start_coupon = this.yhqOneData.start_coupon;
						obj.validity_type = this.yhqOneData.validity_type;
						obj.with_discount = this.yhqOneData.with_discount;
						
						obj.end_coupon = this.yhqOneData.end_coupon;
						obj.class_id = this.yhqOneData.class_id;
						obj.times_period = this.yhqOneData.times;
						
						obj.use_cycle = this.yhqOneData.use_cycle;
						obj.bill_limit_money = this.yhqOneData.bill_limit_money;
						obj.class_type_name = "";
						obj.reward_coupon = this.yhqOneData.reward_coupon;
						obj.validity_days = this.yhqOneData.validity_days;
						
						obj.coupons_pro = this.yhqOneData.coupons_pro;
						
						//改造两个前端页面需要的信息 周期和门店
						//1,门店名称
						let storesname = this.yhqOneData.store_ids;
						let storeidsname = [];
						storesname.forEach(item=>{
							storeidsname.push(item.org_full_name);
						})
						let storeids_strname = storeidsname.join(",")
						obj.store_names = storeids_strname;
						//2,周期
						let use_cycle_names = this.yhqOneData.use_cycle.split(",");
						let use_cycle_names_new =[];
						use_cycle_names.forEach(item=>{
							if(item=="2"){
								use_cycle_names_new.push("周一");
							}else if(item=="3"){
								use_cycle_names_new.push("周二");
							}else if(item=="4"){
								use_cycle_names_new.push("周三");
							}else if(item=="5"){
								use_cycle_names_new.push("周四");
							}else if(item=="6"){
								use_cycle_names_new.push("周五");
							}else if(item=="7"){
								use_cycle_names_new.push("周六");
							}else if(item=="1"){
								use_cycle_names_new.push("周日");
							}
						})
						let cycle_names = use_cycle_names_new.join(",")
						obj.cycle_names = cycle_names;
						
						//3,改造使用渠道
						let chanels = this.yhqOneData.use_chanel;
						let chanelids = [];
						chanels.forEach(item=>{
							chanelids.push(item.chanel_name);
						})
						let chanelids_str = chanelids.join(",")
						obj.use_chanel = chanelids_str;
						
						this.yhqOneData =obj;
					});
				},
				
				
  		},
  		created(){
  			this.getFirstList();
  		}
  	
  	}
	
function dateFormat(fmt,date){   //author: meizz   
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
	.headtop{
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		font-weight: bold;
		
	}
	.el-tabs__item{
		margin-left: 0px;
	}
	.seedetail{
		color: #0c9aff;
	}
	.bluecolor{
		color: #0C9AFF;
	}
	.centertop{
		border-bottom:1px solid #EAF1F6;
		padding-bottom: 10px;
	}
	.staticbox{
		margin-top: 15px;
	}
	.staticpic{
		height: 380px;
		/*background:#F4F9FC;*/
	}
	.red{
		color: #FF0000;
	}
	.stateorg{
		color: #34495E;
	}
	.stategreen{
		color: #4ECF88;
	}
	.stateover{
		color: #9AABB8;
	}
	.el-row{
		height: 30px;
	}
	.togL{
		float: left;
		width: 30%;
		line-height: 30px;
		/*background: yellowgreen;*/
	}
	.togR{
		float: left;
		width: 30%;
		line-height: 30px;
		/*background: yellow;*/
	}
	.bg-purple-dark{
		font-weight: bold;
	}
	.el-tabs__nav-scroll{
		border-bottom:1px solid #EAF1F6;
	}
	.el-table--border th {
	    border-right: 1px solid #F3F3F3;
	}
	.el-table td, .el-table th.is-leaf{
		text-align: center;
	}
	
	
/**************优惠券详情 开始*******************/
.viewyhq_dialog{
	width:440px;
	/*height:230px;*/
}
.viewyhq_dialog .el-dialog__header{
	border:none;
	height:0px;
}
.viewyhq{
	width:440px;
	/*height:230px;*/
}
.viewyhq .up {
	margin-top:16px;
	margin-left:10px;
	width:398px;
	height:76px;
	/*background:red;*/
}
.viewyhq .up .left{
	width:140px;
	height:76px;
	border-right: 1px dashed #E3F0F6;
	float:left;
	margin-left: 35px;
}
.viewyhq .up .left .left_up{
	margin-top:14px;
}
.viewyhq .up .left .left_up cite{
	font-style: normal;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: #FF6161;
	line-height: 14px;
}
.viewyhq .up .left .left_up tt{
	font-family: PingFangSC-Regular;
	font-size: 30px;
	color: #FF6161;
	line-height: 30px;
	font-style: normal;
}
.viewyhq .up .left .left_down{
	margin-top: 6px;	
}
.viewyhq .up .left .left_down cite{
	font-style: normal;
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #576D7A;
	line-height: 12px;
}
.viewyhq .up .right{
	margin-left:175px;
	width:230px;
	/*background: yellow;*/
}
.viewyhq .up .right cite{
	    font-style: normal;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #34495E;
    line-height: 18px;
    /* width: 300px; */
    display: block;
    font-weight: normal;
    margin-left: 20px;
    padding-top: 15px;
    display: block;
    
    text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.viewyhq .up .right em{
	font-style: normal;
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #9AABB8;
	line-height: 12px;
	margin-left: 20px;
    padding-top: 19px;
    display: block;
}

.viewyhq .center{
	margin-left:10px;
	width:420px;
	height:12px;
	/*background:green;*/
	border-bottom: 1px dashed #E3F0F6;
}
.viewyhq .down {
    margin-top: 5px;
    margin-left: 48px;
    width: 382px;
  /*  height: 119px;*/
    /* background: gray; */
}
.viewyhq .down ul{
	list-style: none;
	padding-bottom: 20px;
}
.viewyhq .down ul li{
	margin-top:9px;
}
.viewyhq .down ul li cite{
	font-style: normal;
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #758896;
	line-height: 12px;
}
.viewyhq .down ul li em{
	font-style: normal;
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #34495E;
	line-height: 12px;
}
.viewyhq .down ul li:nth-child(4) cite {
    display: block;
    float: left;
    width: 65px;
}
.viewyhq .down ul li:nth-child(4) em {
    display: inline-block;
    /* float: left; */
    width: 310px;
    line-height: 14px;
}

/**************优惠券详情 结束*******************/
</style>