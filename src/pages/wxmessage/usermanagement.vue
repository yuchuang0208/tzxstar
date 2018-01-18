<template>
	<div class="usermanagement">
		<div class="divTwo_aqszs">
			<el-tabs  v-model="activeName" @tab-click="getPerInfoListFn(parseFloat(activeName),'',true)">
				<el-tab-pane label="已关注" name="0" class="zdgz">
					<div style="margin-bottom:10px" class="filter-container clearfix">
						<div  class="el-input el-input--small" style="width: 200px;float:left">
							<i class="el-input__icon el-icon-search is-clickable" @click="searchPerInfoList(searchNameVal)"></i>
							<input autocomplete="off" placeholder="用户昵称" v-model="searchNameVal" size="small" icon="search" type="text" rows="2" validateevent="true" class="el-input__inner">
						</div>
						<el-button style="float:right;color:#fff;background-color:#FF9001" @click="dialogbuildRemark = true"><i class="el-icon-plus"></i> 创建标签</el-button>
						<div class="droplist">
							<tzx-tree-input-node @getButton='getStoresIds' :pnodes="storeId"></tzx-tree-input-node>
						</div>
					</div>

					<div class="usersBox">
						<div class="checkBox">
					 	<p class="checkHead"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部用户</el-checkbox> <span class="editButton" @click="dialoguseraddType = true"><icon-svg icon-class='yxgl'></icon-svg> 打标签</span><span class="editButton"  type="text" @click="dialogBlack = true"><icon-svg icon-class='yxgl'></icon-svg> 加入黑名单</span> <span class="editButton"  type="text" @click="syncUserInfoFn">同步官方后台</span> <sub style="color:#9AABB8">24小时仅可以同步一次微信后台数据</sub></p>
						 <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
						<div v-if="users">
								<el-checkbox v-for="(user,index) in users" :label="user" :key="index">
								<img :src="user.head_img_url" alt="暂无头像" style="width:60px;height:60px;">
								<div class="textInfo">
									<p>{{user.nickname}}</p>
									<div>
										<i v-if = "user.dbq" class="typeBOX">
											<span class="isType" v-for="(type,index) in user.dbq.split(',')" :key="index">{{type}}</span>
										</i>
											<i class="typeBOX">
										<span class="isType" v-if = "!user.dbq">无标签</span>
												</i>
										<i class="isType el-icon-dropdown" @click.prevent="addOnesType(user)"></i>
										<i v-if = "user.dbq" style="font-size:8px;" class="isType el-icon-minus" @click.prevent="editOnesType(user)"></i>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<span v-if="user.remark">备注：{{user.remark}}</span>
										<span style="position:absolute;right:200px;bottom:3px">渠道：{{user.org_name}}</span>
										</div>
								</div>
									<span class="btn" @click.prevent="addOnesRemark(user)">设置备注</span>								
								</el-checkbox>
						</div>
						</el-checkbox-group>
					</div>
						<ul class="right">							
						<li  @click="getPerInfoListFn(0,'',true)">全部用户({{totalNum}})</li>
							<li class="iconEdit" style="position:relative" v-for="(item,index) in tags" :key="index" @click="getPerInfoListFn(0,item.id,true)">{{item.id}} &nbsp;{{item.name}}({{item.count}}) <div style="position:absolute;right:10px;top:5px;"><i class="el-icon-edit" style="color:#9AABB8" @click.stop="iconEdit(item)"></i>&nbsp;&nbsp;&nbsp;&nbsp; <i class="el-icon-delete" style="color:#9AABB8" @click.stop="iconDel(item)"></i></div></li>
						</ul>
				</div>
				</el-tab-pane>
				<el-tab-pane label="黑名单" name="1" class="zdgz">
					<div class="usersBox">
						<div class="checkBox" style="width:98%">
					 	<p class="checkHead"><el-checkbox :indeterminate="isIndeterminate" v-model="blackcheckAll" @change="handleCheckAllChange">全部用户</el-checkbox> <span class="editButton" @click="dialogdelBlack = true"><icon-svg icon-class='yxgl'></icon-svg> 移出黑名单</span></p>
						 <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
						<div v-if="users">
								<el-checkbox v-for="(buser,index) in users" :label="buser" :key="index">
								<img :src="buser.head_img_url" alt="暂无头像" style="width:60px;height:60px;">
								<div class="textInfo">
									<p>{{buser.nickname}}</p>
									<div>
										<i v-if = "buser.dbq" class="typeBOX">
											<span class="isType" v-for="(type,index) in buser.dbq.split(',')" :key="index">{{type}}</span>
										</i>
											<i class="typeBOX">
										<span class="isType" v-if = "!buser.dbq">无标签</span>
												</i>
										<i class="isType el-icon-dropdown" @click.prevent="addOnesType(buser)"></i>
										<i v-if = "buser.dbq" style="font-size:8px;" class="isType el-icon-minus" @click.prevent="editOnesType(buser)"></i>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<span v-if="buser.remark">备注：{{buser.remark}}</span>	
										</div>
								</div>
									<span class="btn" @click.prevent="addOnesRemark(buser)">修改备注</span>								
								</el-checkbox>
						</div>
						</el-checkbox-group>
					</div>
				</div>
				</el-tab-pane>
			</el-tabs>
			 <div class="block">
    <el-pagination
	  v-if = "total>rows&&total>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 30, 50]"
      :page-size="rows"
      layout="prev, pager, next,total, jumper,sizes"
      :total="total">
    </el-pagination>
  </div>
		</div>
		<!-- 加入黑名单 -->
			<el-dialog
				v-if ='checkedCities.length'
				title="加入黑名单"
				:visible.sync="dialogBlack"
				width="30%">
				<span>加入黑名单后，你将无法接收该用户发来的消息，且该用户无法接收公众号发出的消息，无法参与留言和赞赏，确认加入黑名单？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogBlack = false">取 消</el-button>
					<el-button type="primary" @click="addBlack">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog
				v-else
				title="提示"
				:visible.sync="dialogBlack"
				width="30%">
				<span>请选择需要加入黑名单的用户</span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogBlack = false">确 定</el-button>
				</span>
			</el-dialog>
		<!-- 移除黑名单 -->
			<el-dialog
				v-if ='checkedCities.length'
				title="移出黑名单"
				:visible.sync="dialogdelBlack"
				width="30%">
				<span>确定要将此用户移出黑名单吗？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogdelBlack = false">取 消</el-button>
					<el-button type="primary" @click="delBlack">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog
				v-else
				title="提示"
				:visible.sync="dialogdelBlack"
				width="30%">
				<span>请选择需要移出黑名单的用户</span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogdelBlack = false">确 定</el-button>
				</span>
			</el-dialog>
		<!-- 已关注添加标签 -->
			<el-dialog
				v-if ='checkedCities.length'
				title="添加标签"
				:visible.sync="dialoguseraddType"
				width="30%">
				 <div style="margin-top: 20px">
					<el-checkbox-group v-model="checkboxGroup6" size="mini" disabled>
						<el-checkbox v-for="(item,index) in tags" :label="item.id" :key="index" border>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialoguseraddType = false">取 消</el-button>
					<el-button type="primary" @click="addType">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog
				v-else
				title="提示"
				:visible.sync="dialoguseraddType"
				width="30%">
				<span>请选择需要添加标签的用户</span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialoguseraddType = false">确 定</el-button>
				</span>
			</el-dialog>
		<!-- 单人添加标签 -->
			<el-dialog
				title="添加标签"
				:visible.sync="dialogonesaddType"
				width="30%">
				 <div style="margin-top: 20px">
					<el-checkbox-group v-model="checkboxGroup6" size="mini" disabled>
						<el-checkbox v-for="(item,index) in tags" :label="item.id" :key="index" border>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogonesaddType = false">取 消</el-button>
					<el-button type="primary" @click="addOnesType(false)">确 定</el-button>
				</span>
			</el-dialog>
		<!-- 单人添加备注 -->
			<el-dialog
				title="设置备注"
				:visible.sync="dialogonesRemark"
				height="540px"
				width="30%">
				<el-input v-model="input" maxlength="10" placeholder="最多输入10个字符"></el-input>
				<p style="margin-top:10px">备注：请不要使用&%*等特殊字符</p>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogonesRemark = false">取 消</el-button>
					<el-button type="primary" @click="addOnesRemark(false)">确 定</el-button>
				</span>
			</el-dialog>
		<!-- 创建标签 -->
			<el-dialog
				title="创建/修改标签"

				:visible.sync="dialogbuildRemark"
				width="30%">
				<el-input  v-model="input" maxlength="10" placeholder="最多输入10个字符"></el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="closeType">取 消</el-button>
					<el-button type="primary" @click="buildType">确 定</el-button>
				</span>
			</el-dialog>
		<!-- 删除标签 -->
			<el-dialog
				title="删除标签"
				:visible.sync="dialogDelRemark"
				width="30%">
				<p>删除该标签后，该标签下的所有用户将失去该标签属性。是否确认删除?</p>
				<span slot="footer" class="dialog-footer">
					<el-button @click="closeType">取 消</el-button>
					<el-button type="primary" @click="enterIconDel">确 定</el-button>
				</span>
			</el-dialog>


				<!-- 删除单人标签 -->
				<el-dialog
				title="请选择需要删除的标签"
				:visible.sync="dialogEditOnesRemark"
				width="30%">
					<div style="margin-top: 20px">
						<el-checkbox-group v-model="checkboxGroup6" size="mini" disabled>
							<el-checkbox v-for="(item,index) in Onestags" :label="item.group_id" :key="index" border>{{item.group_name}}</el-checkbox>
						</el-checkbox-group>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="clearOnes">取 消</el-button>
						<el-button type="primary" @click="enterEditOnesType(false)">确 定</el-button>
					</span>
				</el-dialog>
	</div>
</template>

<script>
	import {syncUserInfo ,removePersonBq , findPerBq ,getPerInfoList , delPerGroup ,findGroupAndNum , savePerGroup ,savePerRemark ,dividePerGroup ,dividePerBlackList ,removePerBlackList} from "@/api/wxmessage.js"
	import { TzxTreeInputNode } from '@/components/TzxTreeInputNode';
	export default {
	components: {
			TzxTreeInputNode
	},
  name: "crmcardclassset",
  data() {
    return {
		storeId: 0			,//复选框
		totalNum:""       ,//人员总数
		flag:0            ,//当前页数
		page:1            ,//当前页数
		rows:10            ,//每页显示条数
		total:0					,//列表人员总数
		gid:""                 ,//当前选中的标签
		id:""                    ,//需要修改或者删除的标签的id
		activeName:"0",
		checkAll: false,
    	checkedCities: [],
		users: [],
		isIndeterminate: false,
		blackcheckAll:false,
		tags:[],
		Onestags:[],
		blackisIndeterminate: false,
		searchNameVal:'',
		dialogBlack: false,//加入黑名单标记
		dialogdelBlack: false,//移除黑名单标记
		dialoguseraddType:false,//已关注添加标签标记
		dialogonesaddType:false,//单人添加标签标记	
		dialogonesRemark:false,	//单人设置备注
		dialogbuildRemark:false,//创建标签
		dialogDelRemark:false,//删除标签
		dialogEditOnesRemark:false,//修改单人标签
		checkboxGroup6: [],//带选择标签数组
		myState:null,//单人中转用
		input:"",//备注输入的内容
    }
  },
  created() {
   
  },
  methods: {
	//   层级单选用
	  getStoresIds(data) {
				//获取门店的store_id 的数组		
				this.storeId = data.id;
				this.getStonePerInfoListFn()
			},
	//   全选函数
	    handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? this.users: [];
        this.isIndeterminate = false;
	  },
	//   复选函数
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.users.length;
        this.blackcheckAll = checkedCount === this.users.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.users.length;
	  },
	// 添加标签
			addType(){
				let gp_id = this.checkboxGroup6.map((item)=>item)
				let openid = this.checkedCities.map((item)=>item.openid)
				this.dividePerGroupFn(gp_id,openid)
				this.dialoguseraddType = false
				this.checkedCities = [];
        		this.isIndeterminate = false;
				this.checkAll = false;
				this.checkboxGroup6 = []				
			},
			// 添加单人标签
			addOnesType(item){
				if(item){
					this.myState = item;
					this.dialogonesaddType = true					
					}else{
					this.dividePerGroupFn(this.checkboxGroup6,this.myState.openid)
					this.myState.tags = this.checkboxGroup6
					this.dialogonesaddType = false
					this.checkboxGroup6 = []
					this.myState=null
					}
			},
			//删除单人标签
			editOnesType(item){
				this.myState = item
				this.findPerBqFn(item.openid)
				this.dialogEditOnesRemark = true
			},
			enterEditOnesType(){
				if(this.checkboxGroup6.length){
				removePersonBq("openid="+this.myState.openid+"&"+"groupIds="+this.checkboxGroup6).then(data=>{
					if(data.success){
						this.$message({
							 message: "标签删除成功",
              				 type: 'success'
						})
						this.dialogEditOnesRemark = false
						this.checkboxGroup6 = []
						this.myState = null
						this.findGroupAndNumFn()
						this.getPerInfoListFn(this.flag)
					}else{
						this.$message({
							 message: "标签删除失败请重试",
              				 type: 'error'
						})
						this.dialogEditOnesRemark = false
						this.checkboxGroup6 = []
						this.myState = null						
					}
				})
				}else{
					this.dialogEditOnesRemark = false
					this.checkboxGroup6 = []
					this.myState = null
				}
			},
			//修改标签
			iconEdit(item){
				this.id = item.id
				this.dialogbuildRemark = true
				this.input = item.name
			},
			// 添加备注
			addOnesRemark(item){
				if(item){
					this.myState = item;
					this.dialogonesRemark = true
					}else{
			  	this.savePerRemarkFn(this.myState.id,this.input,this.myState.openid)
					this.dialogonesRemark = false
					this.myState=null
					this.input=""
					}
			},
			// 加入黑名单
			addBlack(){
				this.dialogBlack = false
				let ids = this.checkedCities.map((item)=>item.id)
				let openid = this.checkedCities.map((item)=>item.openid)
				this.dividePerBlackListFn(ids,openid)
				this.checkedCities = [];
        		this.isIndeterminate = false;
				this.checkAll = false;
			},
			// 创建标签
			buildType(){
				if(this.input){
					this.savePerGroupFn()
					this.dialogbuildRemark = false
					this.input=""
				}else{
					this.id = ""
					this.dialogbuildRemark = false		
					this.input=""								
				}
			},
			closeType(){
				this.dialogbuildRemark = false
				this.dialogDelRemark = false
				this.input=""
				this.id = ""
				
			},
			// 删除黑名单   flag
			delBlack(){
				this.dialogdelBlack = false
				let ids = this.checkedCities.map((item)=>item.id)
				let openid = this.checkedCities.map((item)=>item.openid)
				this.removePerBlackListFn(ids,openid)
				this.checkedCities = [];
        		this.blackisIndeterminate = false;
				this.blackcheckAll = false;
			},
			
			 handleSizeChange(val) {
				 this.rows= val;
				if(this.searchNameVal){
					this.searchPerInfoList(this.searchNameVal)
				}else{
					this.getPerInfoListFn(this.flag)
				}
	  },
	//   分页
      		handleCurrentChange(val) {
					this.page = val
					if(this.searchNameVal){
					this.searchPerInfoList(this.searchNameVal)
				}else{
					this.getPerInfoListFn(this.flag)
				}					
	  },
	  //删除标签
	  iconDel(item){
		  this.dialogDelRemark = true;
		  this.id = item.id
	  },
	  enterIconDel(){
		  this.delPerGroupFn()
		  this.id=""
	  },
			// 以下为fetch获取数据方法
			// 获取人员列表
			getPerInfoListFn(flag,gid,clear){
				this.flag = flag
				this.checkedCities = [];
        		this.isIndeterminate = false;
				this.checkAll = false;
				this.blackcheckAll = false;
				this.searchNameVal = "";
				if(clear){
					this.page = 1
				}
				if(gid||gid==""){
					this.gid = gid;					
					getPerInfoList("gid="+this.gid+"&"+"flag="+this.flag+"&"+"page="+this.page+"&"+"rows="+this.rows).then(data=>{
					this.users = data.rows
					this.total = data.total
				})
				}else{
					getPerInfoList("gid="+this.gid+"&"+"flag="+this.flag+"&"+"page="+this.page+"&"+"rows="+this.rows).then(data=>{
					this.users = data.rows?data.rows:[];
					this.total = data.total
				})
				}
				if(flag){
					getPerInfoList("flag="+this.flag+"&"+"page="+this.page+"&"+"rows="+this.rows).then(data=>{
					this.users = data.rows?data.rows:[];
					this.total = data.total
				})
				}
				},
					getStonePerInfoListFn(){
					getPerInfoList("flag="+"0"+"&"+"page="+this.page+"&"+"rows="+this.rows+"&"+"organid="+this.storeId).then(data=>{
					this.users = data.rows?data.rows:[];
					this.total = data.total
				})
				},
				// 搜索
				searchPerInfoList(nickname){
					getPerInfoList("nickname="+this.searchNameVal+"&"+"flag="+this.flag+"&"+"page="+this.page+"&"+"rows="+this.rows).then(data=>{
					this.users = data.rows
					this.total = data.total
				})
				},
				// 获取标签列表
				findGroupAndNumFn(){
					findGroupAndNum("").then(data=>{
						 this.tags = data.tags
						 this.totalNum = data.totalNum 
					})
				},
				// 创建标签
				savePerGroupFn(){
					savePerGroup("group_name="+this.input+"&"+"group_id="+this.id).then(data=>{
							if(data.success){
								 this.findGroupAndNumFn()
								 this.getPerInfoListFn(0)
								 this.id=""
							}
					})
				},
				// 贮存人员备注				
				savePerRemarkFn(id,remark,openid){
					savePerRemark("id="+id+"&"+"remark="+remark+"&"+"openid="+openid).then(data=>{
						if(data.success){
							this.$message({
                message: data.msg,
                type: 'success'
							});
							this.getPerInfoListFn(this.flag)
						}else{
								this.$message({
                message: data.msg,
                type: 'error'
							});
						}
					})
				},
				// 贮存人员标签
				dividePerGroupFn(gp_id,openid){
					dividePerGroup("gp_id="+gp_id+"&"+"openid="+openid).then(data=>{
						if(data.success){
							this.$message({
          				     message: data.msg,
              				 type: 'success'
							});
							this.findGroupAndNumFn()
							this.getPerInfoListFn(this.flag)
						}else{
							this.$message({
                message: data.msg,
                type: 'error'
							});
						}
					})
				},
				// 添加黑名单
				dividePerBlackListFn(ids,openid){
					dividePerBlackList("ids="+ids+"&"+"openid="+openid).then(data=>{
						if(data.success){
							this.$message({
								message: data.msg,
								type: 'success'
											});
											this.getPerInfoListFn(this.flag)
											this.findGroupAndNumFn()
										}else{
											this.$message({
								message: data.msg,
								type: 'error'
											});
										}
					})
				},
				// 移除黑名单
				removePerBlackListFn(ids,openid){
					removePerBlackList("ids="+ids+"&"+"openid="+openid).then(data=>{
						if(data.success){
							this.$message({
								message: data.msg,
								type: 'success'
											});
											this.getPerInfoListFn(this.flag)
											this.findGroupAndNumFn()
										}else{
											this.$message({
								message: data.msg,
								type: 'error'
											});
										}
					})
				},
				//删除标签
				delPerGroupFn(){
					delPerGroup("group_id="+this.id).then(data=>{
						if(data.success){
							this.$message({
								message: data.msg,
								type: 'success'
							})
							this.findGroupAndNumFn()
							this.getPerInfoListFn(0)
							this.dialogDelRemark = false
						}else{
							this.$message({
								message: data.msg,
								type: 'error'
							})
							this.dialogDelRemark = false							
						}
					})
				},
				//获取单人标签
				findPerBqFn(openid){
					findPerBq("openid="+openid).then(data=>{
						this.Onestags = data.groupList
					})
				},
				//同步官方后台
				syncUserInfoFn(){
					syncUserInfo().then(data=>{
						if(data.success){
							this.$message({
								message:"同步数据成功",
								type:"success"
							})
							this.findGroupAndNumFn()
							this.getPerInfoListFn(0)	
						}else{
							this.$message({
								message:"同步数据失败或次数不足",
								type:"error"
							})
						}
					})
				},
				clearOnes(){
					this.dialogEditOnesRemark = false
					this.checkboxGroup6 = []
					this.myState = null	
				}
	},
	created(){
		/*****统计埋点*****/
			_czc.push(["_trackEvent", "会员管理", "访问页面"]); //统计流量
			this.findGroupAndNumFn()
			this.getPerInfoListFn(0)
	},
};
</script>


<style rel="stylesheet/scss" lang="scss">
.usermanagement {
  position: relative;
  .el-tabs__content{
	  min-height: 650px;
  }
  .droplist{
	  float:left;
	  height:28px;
	  margin-left:20px; 
	  .el-input__inner{
		  height:28px !important;	  
	  }
  }
  .iconEdit{
	  i{
		  display: none;
	  }
  }
  .iconEdit:hover{
	  background:rgb(242,246,251) !important;
  }
  .iconEdit+.iconEdit:hover{
	  i{
		  display: inline-block
	  }
  }
  .el-pagination{
	  margin-right:100px ;
	  padding-bottom: 20px;
  }
  .el-table__header {
    width: 1070px !important;
  }
  .el-tab-pane {
    padding-top: 16px;
  }
  .zdgz {
    margin: 0 20px;
  }

  .divTwo_aqszs {
    height: auto;
    min-height: 800px;
    background: #ffffff;
    margin-top: 10px;
	
		.typeBOX{
		display: inline-block;
		margin-top: 20px;
		font-style: normal;
		}
    .el-tabs__nav-scroll {
      border-bottom: 1px solid #eaf1f6;
      height: 45px;
      line-height: 45px;
      margin-left: 20px;
      margin-right: 20px;
    }
    .el-tabs__item {
      font-size: 16px !important;
      margin-bottom: 8px !important;
      padding: 0px 20px !important;
      margin-left: 0 !important;
      color: #34495e !important;
    }
    .el-tabs__item.is-active {
      color: #0c9aff !important;
    }
    .el-tabs__active-bar {
      background-color: #0c9aff !important;
    }
    .el-tabs__header {
      background: #fefefe;
    }
	.checkHead{
		height: 40px;
		width:100%;
		font-size: 12px;
		height:40px;
		line-height:26px;
		padding: 6px 14px;
		background: #F7F9FB;
		.editButton{
			text-align: center;		
			display: inline-block;
			padding:0px 6px;

			border: 1px solid #E7EDF1;
			color: #9AABB8;
			margin-left: 10px;
		}
	}
	.checkBox{
		box-sizing: border-box;	
		float: left;
		border-right: 1px solid #f3f3f3;
		width: 80%;
		height: 100%;
		.el-checkbox-group{
			.el-checkbox{
			padding:11px 40px 11px 13px;
			width:100%;
			display: block;
			margin-left: 0px;
			height: 82px;
			border-bottom: 1px solid #f3f3f3;
			border-left: 1px solid #f3f3f3;
			border-right: 1px solid #f3f3f3;
			.el-checkbox__inner,.el-checkbox__input{
				float: left;
			}
			img{
				width:60px;
				height:60px;
				display: inline-block;
				float: left;
				margin-left:6px;
			}
			.textInfo{
				margin-left: 12px;
				display: inline-block;
				float: left;
				.isType{
					display:inline-block;
					padding: 0px 4px;
					font-size: 12px;
					line-height:20px;
					text-align: center;
					background-color:#F2F6FB;
				}
				.isType+.isType{
					margin-left: 6px;
				}
				p{
					margin-top: 12px;
				
				}
			}
			.btn{
					color: #108EE9;
					float: right;
					font-size: 14px;
					margin-top: 22px;
					background: none;
					border:none;
					padding:0;
				}
			}
		}
	}
	.right{
		height: 526px;
		float: right;
		width: 20%;
		height: 100%;
		box-sizing: border-box;
		li{
			width: 100%;
			font-size: 12px;
			height: 40px;
			line-height: 30px;
			padding: 6px 14px;
			background: #F7F9FB;
		}
		li+li{
			background: none;
		}
	}
  }
	.el-dialog__body{
		padding: 20px;
		min-height: 180px;
	}
	.block{
		height: 60px;
	}
}
</style>
