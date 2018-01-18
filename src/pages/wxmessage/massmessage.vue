<template>
	<div class="massmessage">
		<div class="divTwo_aqszs">
			<el-tabs v-model="tabActiveName">
				<el-tab-pane label="群发消息" name="first" class="zdgz" >
					<div class = "twoBar">
						<el-select v-model="value" placeholder="全部人员">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.name"
						:value="item.id"
						>
						{{item.name}}({{item.count}})
						</el-option>
						</el-select>
							<el-date-picker :picker-options="pickerOptions1" :disabled="ststus_type=='nowtiming'" v-model="time2" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						<span class="msg-radio">
						<template>
						微信消息推送时间：
						<el-radio v-model="ststus_type" label="nowtiming">发布即推送</el-radio>
						<el-radio v-model="ststus_type" label="timing" style="margin-left:30px">自定义时间</el-radio>
						</template>
						</span>
						<el-tabs v-model="tabs" type="border-card">

							<!-- 图文模块 -->
							<el-tab-pane class="pictureText" name="news">
								<span slot="label"><i class="el-icon-document"></i> 图文</span>
								<div v-if="PicText" class="picTextBox">
									<div>
										<p>{{PicText.update_date.substring(0,PicText.update_date.length-2)}}</p>
									</div>
									<p>{{PicText.title}}</p>
									<img :src="PicText.pic_path" alt="">
									<span @click.stop="PicText = null">[删除]</span>									
								</div>

								<div
								v-if="!PicText"
								@click.prevent = "getMaterialMsgPicListFn"
								class="el-upload-dragger"
								drag
								multiple>
								<i class="el-icon-plus" style="margin-top:65px;"></i>
								<div class="el-upload__text" style="margin-top:10px;">从素材库中选择</div>
								</div>
								<div
								v-if="!PicText"
								class="el-upload-dragger"
								style="width:230px;height:180px;"
								@click="addMaterial"
								drag
								multiple>
								<i class="el-icon-plus" style="margin-top:65px;"></i>
								<div class="el-upload__text" style="margin-top:10px;">新建图文消息</div>
								</div>
							</el-tab-pane>
							<!-- 文字板块 -->
							<el-tab-pane name="text">
								<span slot="label"><i class="el-icon-edit"></i> 文字</span>
									<el-input
									class="pictureText"
									type="textarea"
									placeholder="请输入内容"
									v-model="textarea">
									</el-input>
							</el-tab-pane>

							<!-- 图片板块 -->
							<el-tab-pane class="pictureText" name="picture">
								<span slot="label"><i class="el-icon-picture"></i> 图片</span>
									<div  v-if="imageUrl">
										<img :src="imageUrl" class="avatar">
										<span @click.stop="imageUrl = ''">[删除]</span>
									</div>		
								<div
								v-if = "!imageUrl"
								@click.prevent = "findPicListFn"
								class="el-upload-dragger"
								drag
								multiple>
								<i class="el-icon-plus" style="margin-top:65px;"></i>
								<div class="el-upload__text" style="margin-top:10px;">从素材库中选择</div>
								</div>
								<el-upload
									v-if = "!imageUrl"
									class="avatar-uploader"
									:action="action"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<div v-else class="imgBOX">
									<i style="font-size:14px; color:#000;line-height:146px;" class="el-icon-plus avatar-uploader-icon"></i>
									<span>上传图片</span>
									</div>
								</el-upload>
							</el-tab-pane>
							</el-tabs>
					</div>
				<div style="border-bottom:1px dashed #EAF1F6;padding-left:20px;padding-top:10px;font-size:12px;color:#A1B1BD;padding-bottom:30px;">今日群发次数还有{{canNum}}次</div>
					<el-button :disabled="canNum==0" style="margin-left:20px;margin-top:30px;width:68px;height:32px;background: #0C9AFF;border-radius: 3px;" type="primary" @click="sendGroupMessageFn">群发</el-button>
				</el-tab-pane>


				<!-- 已发送 -->
				<el-tab-pane label="已发送" name="second" class="zdjz2">
					<el-row >
						<el-col :span="8" class="headTitle">
							  <el-col :span="12">
									<span class="demonstration">消息类型：</span>
									<el-dropdown trigger="click"  @command="messageTypeCheck">
									<span class="el-dropdown-link">
										{{checkedMessageType.name}} <i class="el-icon-arrow-down"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item v-for="(item,index) in messageType" :key="index" :command="item">{{item.name}}</el-dropdown-item>
									</el-dropdown-menu>
									</el-dropdown>
								</el-col>
								
						</el-col>
						<el-col :span="8" class="headTitle">
							  <el-col :span="12">
								<span class="demonstration">发送状态：</span>
								<el-dropdown trigger="click" @command="sendTypeCheck">
								<span class="el-dropdown-link">
									{{checkedSendType.name}} <i class="el-icon-arrow-down"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="(item,index) in sendType" :key="index" :command="item">{{item.name}}</el-dropdown-item>
								</el-dropdown-menu>
								</el-dropdown>
							</el-col>
						</el-col>
						<el-col :span="8" class="headTitle">
						    <el-col :span="12">
								<span class="demonstration">发送设置：</span>
								<el-dropdown trigger="click" @command="optionsCheck">
								<span class="el-dropdown-link">
									{{checkedOption.name}} <i class="el-icon-arrow-down"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="(item,index) in options" :key="index" :command="item">{{item.name}}</el-dropdown-item>
								</el-dropdown-menu>
								</el-dropdown>
							</el-col>	
						</el-col>						
					</el-row>
					<el-row >
						<el-col :span="8" v-for="(item,index) in cardInfo" :key="index" class="mycard">
							<el-card :body-style="{ padding: '0px' }">
							<img :src="item.pic_path?item.pic_path:detilImg" width="80" height="80" class="image">
							<div class="textInfo">
								<p class="myTitle">
								<span v-if="item.type=='news'">[图文]</span><span v-if="item.type=='text'">[文本]</span><span v-if="item.type=='image'">[图片]</span>{{item.title}}<br>
								{{item.contents}}
								</p>
								<div class="bottom">
								发送时间：{{(item.send_time).substring(0,(item.send_time).length-2)}}
								<!-- <el-button type="text" class="button" @click="open3">删除</el-button> -->
								</div>
							</div>	
							</el-card>
							</el-col>
					</el-row >
				</el-tab-pane>
			</el-tabs>
			</div>

			<!-- 图片弹出框 -->
			<el-dialog
				title="请选择图片"
				:visible.sync="dialogPic"
				width="770px">
						<ul>
							<li @click="active(item,index)" :class="checkedNum==index?'imgList active':'imgList'" v-for="(item,index) in picList" :key="index">
									<img :src="item.pic_path" alt="">
									<p>{{item.pic_name}}</p>
							</li>
						</ul>
						<div class="clearfix" style="height:60px">
						  <el-pagination
						  	v-if = "total>rows&&total>0"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="page"
							:page-sizes="[10, 20 ,30, 50]"
							:page-size="rows"
							layout="prev, pager, next,total, jumper,sizes"
							:total="total">
						</el-pagination>
					</div>
					<span slot="footer" class="dialog-footer">
					<el-button @click="dialogPic = false">取 消</el-button>
					<el-button type="primary" @click="enterPic">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 素材弹出框 -->
			<el-dialog
				title="请选择素材"
				:visible.sync="dialogMatter"
				width="770px">
				<ul>
					<li @click="activePT(item,index)" :class="index==checkedNum?'picTextBox active':'picTextBox'" v-for="(item,index) in picTextList" :key="index">
						<div>
							<p>{{item.update_date.substring(0,item.update_date.length-2)}}</p>
							<span v-if="!item.sendable">此图文消息未完善保存，无法选中</span>
						</div>
						<p>{{item.title}}</p>
						<img :src="item.pic_path" alt="">
					</li>
				</ul>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogMatter = false">取 消</el-button>
					<el-button type="primary" @click="enterPT">确 定</el-button>
				</span>
			</el-dialog>
	</div>
</template>

<script>


  import {findPicList , getMaterialMsgPicList ,sendGroupMessage,findUserGruop,sendedList} from "@/api/massmessage.js"
export default {
  name: "massmessage",
  data () {
    return {
			detilImg:require("@/assets/danshengou.png"),
			filename:"",
			action:"",
			canNum:1,      //剩余发送次数
			tabs:"news",
			total:0,
			messageType:[{key:"all",name:"全部消息"},{key:"text",name:"文本消息"},{key:"news",name:"图文消息"},{key:"image",name:"图片消息"}],// 消息类型
			checkedMessageType:{key:"all",name:"全部消息"},
			sendType:[{status:"0",name:'全部状态'},{status:'0',name:'发送中'},{status:'1',name:'发送完成'},{status:'2',name:'发送失败'}],// 消息类型
			checkedSendType:{status:"0",name:'全部状态'},
			checkedOption:{name:"全部人员",id:0},
			usersType:[],// 消息类型
			checkedUsersType:null,
			checkedImgUrl:"",
			checkedPicText:null,
			PicText:null,
			checkedNum:"9999999999999999",
			dialogPic:false,
			dialogMatter:false,			
      		tabActiveName: "first",
			imageUrl: '',
			time3: null,
			rows:10,
			page:1,
			picList:[],//图片列表
			picTextList:[],
			ststus_type:"nowtiming",//发送时间
      options: [],
      value: "",
      radio: 1,
	  textarea: "",
	time2:"",
	cardList:[],
	cardInfo:[],
	isActive:0,
	pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
    }
  },
  methods:{
	  handleAvatarSuccess(res, file) {
				let index1 = res.indexOf("url") + 6;
				let index2 = res.indexOf("png") != -1 ? res.indexOf("png") + 3 : res.indexOf('jpg') + 3;
				let path = res.substring(index1, index2); /****图片地址*****/
				let filename;
				if(path.indexOf("/") > 0) //如果包含有"/"或"\"号 从最后一个"/"或"\"号+1的位置开始截取字符串
				{
					filename = path.substring(path.lastIndexOf("/") + 1, path.length);
				} else if(path.indexOf("\\") > 0) {
					filename = path.substring(path.lastIndexOf("\\") + 1, path.length);
				}
					this.imageUrl = path;
					this.filename = filename				
			},
      beforeAvatarUpload(file) {   //图片上传限制条件
        const isJPG = file.type === 'image/jpeg'||'image/gif'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 jpg、gif、png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
			},
			handleSizeChange(val) {
				 this.rows= val;
				 this.findPicListFn()
	 		 },
	//   分页
      handleCurrentChange(val) {
					this.page = val
					this.findPicListFn()
			},
			//选中方法
			active(item,index){
					this.checkedNum = index;
					this.checkedImgUrl = item.pic_path
					this.media_id = item.pic_thumb_media_id
			},
			// 确定选择图片
			enterPic(){
				this.dialogPic = false;
				this.imageUrl = this.checkedImgUrl
				this.checkedImgUrl ="" 
				this.checkedNum = "999999999999999999"
				this.filename = ""
			},
			//选中素材方法
				activePT(item,index){
					if(!item.sendable){
						return false;
					}
					this.checkedNum = index;
					this.checkedPicText = item
			},
					// 确定选择素材
			enterPT(){
				this.dialogMatter = false;
				this.PicText = this.checkedPicText;
				this.checkedNum="9999999999999999"
			},
			dateFtt(fmt,date){
				if(!date){
					this.$message({
						message: '请设置时间日期',
						type: 'error'
					});
				}
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
			},
			myDate(){
						let mydate = this.dateFtt("yyyy-MM-dd hh:mm:ss",this.time2)
						return  mydate
			},
			// 下拉筛选
			//类型
			messageTypeCheck(item){
				this.checkedMessageType = item
				this.filterSended()
			},
			//状态
			sendTypeCheck(item){
				this.checkedSendType = item
				this.filterSended()				
			},
			//用户分组
			optionsCheck(item){
				this.checkedOption = item
				this.filterSended()
			},
			//筛选消息
			filterSended(){
				this.cardInfo = this.cardList.filter((item)=>{
						let one = true
						let four = true
						let three = true
					if(this.checkedMessageType.key != "all"){
						one = item.type == this.checkedMessageType.key
					}
					if(this.checkedOption.name!="全部人员"){
						four = item.group_name==this.checkedOption.name
					}
					if(this.checkedSendType.name!="全部状态"){
						three = item.status == this.checkedSendType.status
					}
					return one&&three&&four
				})
				
			},
			open3(){
				this.$message({
         		 message: '删除功能更新中',
         		 type: 'warning'
        });
			},
			rowsChange(){

			},
			// 以下是飞驰方法
			findPicListFn(fn){              //加载图片列表
			this.checkedNum = "99999999999999999"
			this.dialogPic = true;
				findPicList("page="+this.page+"&"+"rows="+this.rows).then(data=>{
						this.picList = data.rows;
						this.total = data.total;
				})
				setTimeout(() => {
					fn()
				}, 0);
			},
			getMaterialMsgPicListFn(){   //加载素材库
				this.checkedNum = "99999999999999999"
				this.dialogMatter = true;
				getMaterialMsgPicList().then(data=>{
					this.picTextList = data.rows;
				})
			},
			// 发送图文方法   stime
			sendGroupMessageFn(){
				let group_id = (this.value==""?"0":this.value)
				if(this.ststus_type=="timing"){
						let myDate = this.myDate();
							if(this.tabs == "news"){
								if(!this.PicText){
									this.$message({
													message: '图文不能为空',
													type: 'error'
												});
											return false
								}
								sendGroupMessage("type="+this.tabs+"&"+"media_id="+this.PicText.cover_media_id+"&"+"group_id="+group_id+"&"+"ststus_type="+this.ststus_type+"&"+"stime="+myDate).then(data=>{
									if(data.success){
										this.canNum--
												this.$message({
													message: '发送成功！',
													type: 'success'
												});
										}else{
												this.$message({
													message: '发送失败！',
													type: 'error'
												});
										}
								})		
							}else if(this.tabs == "picture"){
								if(!this.imageUrl||this.imageUrl==""){
										this.$message({
											message: '不能发送空消息！',
											type: 'error'
										});
									return false
								}
									sendGroupMessage("type="+this.tabs+"&"+"media_id="+this.media_id+"&"+"pic_path="+this.imageUrl+"&"+"group_id="+group_id+"&"+"ststus_type="+this.ststus_type+"&"+"stime="+myDate+"&"+"pic_name="+this.filename).then(data=>{
										if(data.success){
										this.canNum--											
												this.$message({
													message: '发送成功！',
													type: 'success'
												});
										}else{
												this.$message({
													message: '发送失败！',
													type: 'error'
												});
										}
								})		
							}else if(this.tabs == "text"){
								if(!this.textarea||this.textarea==""){
									this.$message({
											message: '不能发送空消息！',
											type: 'error'
										});
									return false
								}
									sendGroupMessage("type="+this.tabs+"&"+"content="+this.textarea+"&"+"group_id="+group_id+"&"+"ststus_type="+this.ststus_type+"&"+"stime="+myDate).then(data=>{
									if(data.success){
										this.canNum--										
												this.$message({
													message: '发送成功！',
													type: 'success'
												});
										}else{
												this.$message({
													message: '发送失败！',
													type: 'error'
												});
										}
								})		
					}
				}else{
						if(this.tabs == "news"){
							if(!this.PicText){
									this.$message({
													message: '图文不能为空',
													type: 'error'
												});
											return false
								}
								sendGroupMessage("type="+this.tabs+"&"+"media_id="+this.PicText.cover_media_id+"&"+"group_id="+group_id+"&"+"ststus_type="+this.ststus_type).then(data=>{
									if(data.success){
										this.canNum--										
												this.$message({
													message: '发送成功！',
													type: 'success'
												});
										}else{
												this.$message({
													message: '发送失败！',
													type: 'error'
												});
										}
								})		
							}else if(this.tabs == "picture"){
								if(!this.imageUrl||this.imageUrl==""){
										this.$message({
											message: '不能发送空消息！',
											type: 'error'
										});
									return false
								}
									sendGroupMessage("type="+this.tabs+"&"+"pic_path="+this.imageUrl+"&"+"group_id="+group_id+"&"+"ststus_type="+this.ststus_type+"&"+"pic_name="+this.filename).then(data=>{
											if(data.success){
												this.canNum--												
												this.$message({
													message: '发送成功！',
													type: 'success'
												});
										}else{
												this.$message({
													message: '发送失败！',
													type: 'error'
												});
										}
								})		
							}else if(this.tabs == "text"){
								if(!this.textarea||this.textarea==""){
									this.$message({
											message: '不能发送空消息！',
											type: 'error'
										});
									return false
								}
									sendGroupMessage("type="+this.tabs+"&"+"content="+this.textarea+"&"+"group_id="+group_id+"&"+"ststus_type="+this.ststus_type).then(data=>{
									if(data.success){
												this.canNum--										
												this.$message({
													message: '发送成功！',
													type: 'success'
												});
										}else{
												this.$message({
													message: '发送失败！',
													type: 'error'
												});
										}
								})		
					}
				}
			},
			
			// 获取用户分类列表
			findUserGruopFn(){
					findUserGruop().then(data=>{
						if(data.success){
							this.options = data.tags
							this.canNum =  1-data.sendNum
							let all = 0
							this.options.map((item)=>{
									all+=item.count
							})
							this.checkedOption = {count:all,id:0,name:"全部人员"}
							this.options.unshift({count:all,id:0,name:"全部人员"})	
						}
					})
			},

			// 获取已发送方法
		sendedListFn(fn){
				sendedList().then(data=>{
					this.cardInfo = data.rows
					this.cardList = data.rows
				})
			},
			// 添加素材路由
			addMaterial() {
				this.$router.push({
					path: "/wxmessage/ModifyMaterial",
					hash: 'new',
					query: {
						type: "add"
					}
				});
			},
	

  },
  filters:{
	  
  },	
		beforeMount(){
			this.sendedListFn()			
		},
  		mounted(){//载入后
  			/*****统计埋点*****/
			_czc.push(["_trackEvent", "微信消息", "访问页面"]); //统计流量
			this.action = '../../../imgServlet?actionType=upload&tenentid=' + this.$store.state.user.tenancyid + '&fileId=';//正式地址  正式环境使用
			// this.action = 'img/imgServlet?actionType=upload&tenentid=" + this.$store.state.user.tenancyid + "&fileId='; //代理地址  本地调试时使用
			this.findUserGruopFn()
			this.sendedListFn()
		},
		beforeUpdate(){  //更新前

	},
	updated(){

	},
		beforeCreate(){    //创建之前

		},
		created() {			//创建之后
			
		}
};
</script>


<style rel="stylesheet/scss" lang="scss">
.massmessage {
  position: relative;
  .el-pager{
	  height: 40px;
	  .number{
		  margin-top: 0px;
		  margin-left:5px;
	  }
  }
  .divTwo_aqszs {
    height: auto;
    min-height: 800px;
    background: #ffffff;
    margin-top: 10px;
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
    .twoBar {
      margin-top: 14px;
      .el-select {
        width: 230px;
        margin-left: 20px;
      }
				.el-date-editor{
					width: 230px;
				}
      
    }
    .msg-radio {
      margin-left: 30px;
    }
    .el-tabs--border-card {
      border: 1px solid #d8e5ec;
      box-shadow: none;
      width: 782px;
      height: 300px;
      margin-left: 20px;
      margin-top: 20px;
      .is-active {
        border: none;
      }
      .el-tabs__item {
        border: none;
        border-color: #d1dbe5;
        margin-bottom: 0px !important;
        border-bottom: none;
        font-size: 14px !important;
      }
      .el-tabs__item + .el-tabs__item {
        border-left: 1px solid #d1dbe5;
      }
      .el-tabs__content {
        padding: 0;
      }
      .el-tabs__nav-scroll {
        margin: 0;
        border-bottom: 1px solid #e4ecf1 !important;
      }
    }
    .pictureText {
      margin-top: 1px;
      height: 253px;
      background: #f9fdff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      textarea {
        background: #f9fdff;
        height: 100%;
        width: 100%;
        border: none;
        padding: 5px;
        margin: 0;
        resize: none;
      }
      .el-upload-dragger {
        background: #f9fdff;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 230px;
      }
      .el-upload-dragger:hover {
        border-color: #20a0ff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 228px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 230px;
        height: 180px;
        display: block;
      }
    }
	.zdjz2{
		.mycard{
			border:1px solid #EFF7FC;
			border-radius:0;
		}
		.mycard:hover{
			border: 1px solid #0C9AFF;
			border-radius: 0;
		}
		.headTitle{
			padding: 14px 14px;
			background-color: #F7F9FB;
		}
		padding: 20px 14px;
		.time {
			font-size: 13px;
			color: #999;
		}
		
		.bottom {
			color:#8693A0;
			display: block;
			margin-top: 19px;
			line-height: 12px;
			font-size: 12px;
		}
		.el-card{
			border-radius: 0;
			border:none;
			box-shadow: none;
		}
		.el-card__body{
			display: flex;
			justify-content: space-between;
		}
		.button {
			color:#0C9AFF;
			font-size:14px; 
			padding: 0;
			float: right;
		}
		.textInfo{
			width: 100%;
			height:104px;
			font-size: 14px;
			padding: 11px 14px 15px 10px;
			.myTitle{
				min-height:48px;
				line-height: 24px;
				display:inline-block;
			}
			.zz{
				margin-left:6px;
				color:#fff;
				font-size:12px;
				height:14px;
				line-height: 14px;
				background-color: #0C9AFF;
				border-radius: 3px;
			}
		}

		.image {
			display: block;
			border-radius: 3px;
			margin:12px 0px 12px 14px;
			height:80px;
			width:80px;
			float: left;
		}
	}
  }
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
	.imgBOX{
		position: relative !important;
		span{
			position:absolute;
			top:93px;
			right:87px;
			color: #97a8be;
		}
	}
		.el-dialog__body ul{
		height: 380px;
		overflow-y:scroll;
		li{
			margin-top: 25px;
			margin-left: 20px;
		}
	}
	.imgList{
		border: 1px solid #EAF1F6;
		margin-left: 20px;
		margin-bottom:10px;
		width:130px;
		float:left;
		text-align: center;
		img{
			display: inline-block;
			width:120px;
			height:120px;
		}
		p{
			line-height: 30px;
			border-top: 1px solid #EAF1F6;
			white-space:nowrap;
			text-overflow:ellipsis;
			width: 130px;
			height: 30px;
			text-align: center;
			overflow: hidden;
			font-size: 16px;
		}
	}
	.picTextBox{
		padding: 10px;
		border: 1px solid #EAF1F6;	
		margin-bottom:10px;	
		float: left;
		margin-left: 50px;
		width: 316px;
		height: 248px;
		div{
		border-bottom: 1px solid #EAF1F6;	
		height: 40px;
		line-height: 20px;
		margin: 0px 14px;
		span{
			font-size: 12px;
			color: #FFBE00;
		}
		}
		img{
			width: 288px;
			height: 160px;
		}
	}
	.active{
		border: 1px solid #0C9AFF;
	}
	.el-icon-arrow-down::before{
		content: "\E600" !important;
	}
	.el-dropdown-link{
		vertical-align: top;
		height: 18px;
		line-height: 18px;
		display: inline-block;
		width: 80px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.el-dialog__footer{
	background-color: #F4F9FC;	
	text-align: center !important;
}

}


</style>
