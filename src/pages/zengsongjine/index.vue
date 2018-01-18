<template>
	<div class="context">
		
		<!--选择门店 开始-->
		<el-dialog  :show-close=true size='tiny' :visible.sync="storeDialogVisible" custom-class='treeSelect' title="选择门店">			
	   		 <tzx-tree-select 
			   	:data="storeData" 
			   	unitAndName='家店' 			   
			   	@cancelButton='storeDialogVisible = false' 
			   	@makeSureButton ='storeMakeSureChecked'
			   	@boxChange = 'storeBoxChange' 
			   	:defaultCheckedId = 'storeCheckedIds'
			   	:pnodes= 'storeNodes' 
			   	:ptotalSelect = 'storeTotal'
			   	:defaultProps ='defaultProps'
			   	>  
	  		</tzx-tree-select>	
		</el-dialog>
		<!--选择门店 结束 -->
		
		<!--消费后评价赠礼  开始-->
		<div class="divTwo_sdzsje" >
		    <h1>
		    	<em>手动赠送金额 </em>
		    	<cite>轻度支持霸王餐活动、并可对客诉进行快速补偿处理</cite>
		    </h1>
		    <!--表单开始-->
		    <el-form  label-width="112px" class="demo-ruleForm" :rules="rules" ref="form" :model="form" >
					<el-form-item label="活动名称:" prop="subject" required>
					       <el-input placeholder="请输入活动名称"  v-model="form.subject" style="width:580px;"></el-input>
					</el-form-item>
					<!--<el-form-item label="实用品牌:" :rules="[
						      { required: true}]">
					    	青年餐厅
					</el-form-item>-->
					  
					<el-form-item label="活动周期:" required >
						        <div class="hdzq_date1">
						        	<el-form-item prop="start_time">
							        	<el-date-picker 
      										type="date" placeholder="请选择开始日期"   v-model="form.start_time" style="width:230px;">
   	 									</el-date-picker>
							      	</el-form-item>
						        </div>
						        <div class="hdzq_date_em">
						        	<em>至</em>
						        </div>
						        <div class="hdzq_date2">
						        	<el-form-item prop="end_time">
						        		<el-date-picker 
      										type="date" placeholder="选择结束日期"   v-model="form.end_time" style="width:230px;">
   	 									</el-date-picker>
						      		</el-form-item>
						        </div>
					</el-form-item>
					<el-form-item label="最高赠送金额:"  required prop="max_reward_money" class="mynumber">
					       <el-input placeholder="最高赠送金额" min="0.01" step="0.01" type="number"  v-model="form.max_reward_money"  style="width:200px;"></el-input>
					       <cite class="myzengsongjine">门店端可执行的最大赠送金额。</cite>
					</el-form-item>
					  
					<el-form-item  label="活动门店:"  prop="stores" :rules="filter_rules({required:true})">									
						 <div class='dishDiv'>
						    	<div class='showDishMessage' :key="index" v-for='(store,index) in storeNodes_template'>
									<tzx-tag cursor='default' color='#34495E' size='medium' :closable='!is_find'  @closeThis='deleteStore(store,index)'>{{store.label}}</tzx-tag>
								</div>
								<div class='checkdish' >
									<span @click='storeDialogVisible = true'>选择门店</span>
								</div>
						</div>
					</el-form-item>
					  
					<div class="quxiao_and_tijiao">
						<div class="bottom_64_32">
				       		<div class="quxiao" @click="cancel"><em>取消</em></div>
				       		<div class="queding" @click="onSubmit('form')"><em>确定</em></div>
				       	</div>
					</div>
					
				</el-form>
		    <!--表单结束-->
	    </div>
		<!--消费后评价赠礼  结束-->
	</div>
</template>

<script>
    import Assist from '@/utils/assist';
    import axios from "axios";
    import {getMendian,saveZengSongJine} from '@/api/home'
    import { TzxTreeSelect } from '@/components/tzxtreeselect';
    import { TzxTag } from '@/components/tag'
    import {findMarketActivityDetail } from '@/api/activity'
    
	export default {
	  components:{TzxTreeSelect,TzxTag},
      data() {
      return {
      	
      	dialogMendian:false,
      	defaultProps: {
			children: 'children',
			label: 'labelc',
			name: 'label',
			id: 'id',
			count: 'count'
		},
      	
      	activityId:'',
		//门店开始
		storeData:[],
		storeDialogVisible:false,
		storeCheckedIds:[],
		storeNodes:[],
		storeNodes_template:[],
		storeTotal:0,
		data:[],
		checkedIds:[],
		nodes:[],
		nodes_dish:[],//点击确定按钮 才让选择的菜品展示 不能做数据双向绑定
		total:0,
		is_find:false,
		//门店结束
		
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }]
        },
        dialogVisible: false,
        form: {
			subject:"",//主题
			start_time:"",
			end_time:"",
			max_reward_money:0,//门店 0全部
			store_id:0,//群体 0全部  "201,203"
			stores:'0',
			mendian:[], //默认全部门店
        },
        rules: {
          subject: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          start_time: [
            { type: 'date',  required: true, message: '请选择开始日期', trigger: 'change' }
          ],
          end_time: [
            {  type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
          ],
          max_reward_money: [
            {  required: true, message: '请输入最高赠送金额', trigger: 'blur' },
          ]
        }
      };
    },
    methods:{
    	onSubmit(form) {
    		
	    	this.$refs[form].validate((valid) => {
	          if (valid) {//演验证通过
	          	
					let mendian_str="";
					//判断门店下是否有数据 至少要要有一个数据
					if(this.storeNodes_template.length==0){
						this.$message({
							type: 'error',
							message: '至少选择一个门店'
						});
						return false;
					}
					let mendian = [];
					this.storeNodes_template.forEach(item =>{
						mendian.push(item.id);
				  	});
				  	mendian_str = mendian.join(",");
					//判断门店下是否有数据 至少要要有一个数据
					if(this.form.max_reward_money <= 0){
						this.$message({
							type: 'error',
							message: '请输入大于0的金额'
						});
						return false;
					}
					
					var start = new Date(this.form.start_time);  
		            let start_time=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
				  	
				  	var end = new Date(this.form.end_time);  
		            let end_time=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
					
					
					if(start.getTime()>end.getTime()){
						this.$message({
							type: 'error',
							message: '结束日期不能晚于开始日期'
						});
						return false;
					}
				  				
					let data ="id="+this.activityId+
							"&subject="+this.form.subject+
							"&start_time="+start_time+
							"&end_time="+end_time+
							"&store_id="+mendian_str+
							"&max_reward_money="+this.form.max_reward_money;
								
				    saveZengSongJine(data).then((response) => {
				    	if(response.success ){
							this.$message({
								type: 'success',
								message: '保存成功'
							});
							this.$router.push({
								path: "/marketing/activitymanagement",
								hash: 'new'
							});
				    	}else{
				    		this.$message({
								type: 'error',
								message: '保存失败'
							});
				    	}
					})
	          	
	           
	          } else {
	            return false;
	          }
	        });
	   },
	   loadTree(){
			getMendian().then((response) => {
				this.storeData =  response.data;
			})
		},
		
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
	  
	cancel() {
		this.$router.push({
			path:"/marketing/activitymanagement"
		})
	},
      handleClose(done) {
        done();
      },
      handleMendianClose(done) {
        done();
      },
      //活动门店 开始
	storeMakeSureChecked(){
    	this.storeNodes_template = this.storeNodes;
    	this.storeDialogVisible = false;
	},
	storeBoxChange(nodes,total){
      	this.storeNodes = nodes;
      	this.storeTotal = total;
	},
	deleteStore(store,index){
		this.storeNodes_template.splice(index, 1);
	},
	updateFormData(id,activity_type){
		
		this.activityId = id;
		let query = 'id='+id+'&activity_type='+activity_type;
		findMarketActivityDetail(query).then(response=>{//回显
		//findEvalgiftActivityDetail(query).then(response=>{//回显
		  	let detail = response;
			this.form.subject = detail.subject;//主题  
     		this.form.start_time = Assist.formatStrToDate(detail.start_time);
     		this.form.end_time = Assist.formatStrToDate(detail.end_time);
     		this.form.max_reward_money = detail.max_reward_money +'';
				//门店回显	    		
			this.storeNodes = [];
			this.storeNodes_template = [];
			this.storeTotal = detail.stroes.length;
			detail.stroes.forEach(item => {
				let obj_temp = {};
				obj_temp.id = item.store_id;
				obj_temp.label = item.org_full_name;
				obj_temp.plabels = item.parent_name;
				this.storeNodes.push(obj_temp);
				this.storeNodes_template.push(obj_temp);
				this.storeCheckedIds.push(item.store_id); //门店回显ids
			});
			
		});
	 }
    },created() {//下面的是boss 请求地址
			this.loadTree();
			if(this.$route.query.id!=undefined&&this.$route.query.activity_type!=undefined){
				this.updateFormData(this.$route.query.id,this.$route.query.activity_type);	
			}
	  }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	/****赠送金额弹出框  开始******/
	
	.divThree {
		height: 250px;
		background: #FFFFFF;
		border: 1px solid #EAF1F6;
		margin-left: 15px;
	}
	
	.hdxq {
		margin-top: 13px;
	}
	
	.hdxq .hdxq_item {
		clear: both;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		line-height: 28px;
		margin-left: 30px;
		margin-right: 30px;
		margin-top: 20px;
	}
	
	.hdxq .hdxq_item tt {
		color: #ff7171;
	}
	
	.hdxq .hdxq_item b {
		width: 100px;
		display: block;
		float: left;
		color: #758896;
		margin-bottom: 14px;
	}
	
	.hdxq .hdxq_item em {
		display: block;
		float: left;
	}
	
	.hdxq .hdxq_item_object {
		display: block;
		float: left;
		color: #576D7A;
		width: 470px;
	}
	
	.hdxq .hdxq_item_object cite {
		display: block;
		float: left;
		width: 70px;
		font-style: normal;
		/*margin-bottom: 12px;*/
	}
	
	.hdxq .hdxq_item_object2 {
		display: block;
		margin-left: 70px;
		float: left;
		color: #576D7A;
	}
	
	.hdxq .hdxq_item_object2 p {
		margin: 0;
		float: left;
		font-style: normal;
		color: #34495E;
		width: 400px;
		line-height: 22px;
		margin-top: 3px;
	}
	
	.hdxq_close {
		margin-top: 54px;
		height: 60px;
		background: #F4F9FC;
	}
	
	.hdxq_close .bottom_64_32 {
		margin-top: 14px;
		text-align: center;
		margin-left: 268px;
	}
	/*****赠送金额弹出框  结束*******/
	.divTwo_sdzsje .el-form-item__label {
		width: 140px;
	}
	/**消费后评价赠礼页面**/
	
	.divTwo_sdzsje {
		height: auto;
		display: table;
		width: 100%;
		background: #fff;
	}
	
	.divTwo_sdzsje h1 {
		height: 50px;
		line-height: 50px;
		display: block;
		border-bottom: 1px solid #eaf1f6;
		margin-left: 20px;
		margin-right: 20px;
		font-size: 16px;
	}
	
	.divTwo_sdzsje h1 em {
		margin-left: 10px;
		font-size: 16px;
		letter-spacing: 0;
	}
	
	.divTwo_sdzsje h1 cite {
		margin-left: 16px;
		font-size: 12px;
		color: #9AABB8;
		letter-spacing: 0;
		line-height: 16px;
	}
	
	.divTwo_sdzsje .demo-ruleForm .hdzq_date1 {
		float: left;
	}
	
	.divTwo_sdzsje .demo-ruleForm .hdzq_date_em {
		float: left;
		margin-left: 5px;
		margin-right: 5px;
		font-style: normal;
	}
	
	.divTwo_sdzsje .demo-ruleForm .hdzq_date_em em {
		font-style: normal;
	}
	
	.divTwo_sdzsje .demo-ruleForm .hdzq_date2 {
		float: left;
	}
	/******表单样式 开始******/
	
	.divTwo_sdzsje .el-form {
		margin-top: 20px;
	}
	
	.el-date-editor .el-date-editor--date {
		width: 230px;
	}
	/**选择门店 and 选择群体**/
	
	.divTwo_sdzsje .botton_text {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #0C9AFF;
		line-height: 14px;
		margin-left: 16px;
		font-style: normal;
	}
	
	.divTwo_sdzsje .quxiao_and_tijiao {
		height: 82px;
		margin-left: 60px;
		margin-right: 40px;
		border-top: 1px dashed #EAF1F6;
	}
	
	.divTwo_sdzsje .quxiao_and_tijiao .bottom_64_32 {
		margin-left: 91px;
		margin-top: 30px;
		margin-bottom: 20px;
	}
	
	.divTwo_sdzsje .xuanze {
		list-style: none;
		margin: 0;
		padding: 0;
		margin-top: 7px;
		margin-left: 40px;
	}
	
	.divTwo_sdzsje .xuanze li {	
	    width: auto;
	    margin-right: 6px;
	    float: left;
	    line-height: 32px;
	    margin-bottom: 10px;
		font-size: 12px;
		height: 32px;
		border:1px solid #D8E5EC;
		border-radius: 3px;
	}
	
	.divTwo_sdzsje .xuanze li em {
		font-style: normal;
		margin-left: 8px;
		color: #34495E;
	}
	
	.divTwo_sdzsje .xuanze li img {
		margin-left: 5px;
		margin-right: 8px;
	}
	
	.divTwo_sdzsje .meirenzengsong .el-input__inner {
		height: 28px;
	}
	/***确认提交框**/
	
	.querenbox {
		height: 360px;
		width: 200px;
		background: red;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
		border-radius: 3px;
		position: absolute;
		z-index: 10000px;
	}
	
	.myzengsongjine {
		font-style: normal;
		color: #ACBAC5;
	}
	
	.divTwo_sdzsje .el-form-item {
		margin-bottom: 20px;
	}
	
	.divTwo_sdzsje .el-form-item .el-form-item {
		margin-bottom: 0px;
	}
	
	.divTwo_sdzsje .el-form-item .el-form-item__error {
		margin-left: 40px;
	}
	
	.divTwo_sdzsje .el-form-item .el-form-item .el-form-item__error {
		margin-left: 0px;
	}
	
	.divTwo_sdzsje .mynumber .el-input .el-input__inner {
		text-align: right;
	}
	
	/*门店*/
	.divTwo_sdzsje{
		.dishDiv{
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
	}
</style>