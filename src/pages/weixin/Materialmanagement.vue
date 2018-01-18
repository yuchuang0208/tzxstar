<template>
	<div class="materialmanagement" v-loading.body="showLoading">
		<div class="divTwo_aqszs">
			<el-tabs v-model="activeName">
				<el-tab-pane label="图文消息" name="first" class="zdgz">
					<div class="materialmanagement-container">
						<div class="el-input el-input--small" style="width: 200px;">
							<i class="el-input__icon el-icon-search is-clickable" @click="getMaterialMsgPicList"></i>
							<input style="height:32px;" autocomplete="off" placeholder="请输入关键字" v-model="searchNameVal" size="small" icon="search" type="text" rows="2" validateevent="true" class="el-input__inner">
						</div>
						<el-button type='server' icon='plus' @click='addMaterial($event)' style='float:right'>添加标签</el-button>
					</div>
					<div class='materiallist'>
						<ul>
							<li class='pic-list-ul-li' v-for="(item, i) in listdata" :key="i" @click="previewMaterial(item)">
								<el-card :body-style="{ padding: '0px' }">
									<img :src="item.pic_path?item.pic_path:nodata" class="image">
									<div class='materialname'>
										<div class="title">{{item.title}}</div>
										<div class="digest">{{item.digest}}</div>
										<div class="date">
											<i class="el-icon-time"></i>更新于：{{item.update_date.slice(0,item.update_date.indexOf('.'))}}
										</div>
										<!--<div class="bottombutton"></div>-->
									</div>
									<div class="hover-span">
										<span class="modify" @click="modifyData($event,item)">修改</span>
										<span class="delete" @click="deleteData($event,item)">删除</span>
									</div>
								</el-card>
							</li>
						</ul>
					</div>
				</el-tab-pane>
				<el-tab-pane label="图片" name="second" class="zdgz">
					<div class="materialmanagement-container">
						<div class="el-input el-input-small" style="width: 200px;">
							<i class="el-input__icon el-icon-search is-clickable" @click="getMaterialPicInfo"></i>
							<input style="height:32px;" autocomplete="off" placeholder="图片名称" v-model="picNameVal" size="small" icon="search" type="text" rows="2" validateevent="true" class="el-input__inner">
						</div>
						<el-upload class="materialmanagment-upload" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name='fileToUpload'>
							<el-button type='server' icon='plus' style='float:right'>本地上传</el-button>
						</el-upload>
					</div>
					<div class="materiallist">
						<ul>
							<li class="pic-list-ul-li" v-for="item in picList">
								<el-card :body-style="{ padding: '0px' }">
									<img :src="item.pic_path" class="image">
									<div class='materialname'>
										<div class="title">{{item.pic_name}}</div>
										<!--<div class="bottombutton"></div>-->
									</div>
									<div class="hover-span">
										<span class="modify" @click="modifyName(item)">修改名称</span>
										<span class="delete" @click="deleteName(item)">删除</span>
									</div>
								</el-card>
							</li>
						</ul>
					</div>
					<el-dialog class="modifyname" title="修改名称" :visible.sync="selectName.dialogTableVisible">
						<div class="modify-name">
							<span>图片名称</span>
							<el-input v-model="selectName.selectName" class="modify-name"></el-input>
						</div>
						<span slot="footer" class="dialog-footer">
                                <el-button @click="selectName.dialogTableVisible = false">取 消</el-button>
                               <el-button type="primary" @click="btnSelectNameOK">确 定</el-button>
                             </span>
					</el-dialog>
					<div class="block">
						<el-pagination @size-change="handleFirstSizeChange" @current-change="handleFirstCurrentChange" :current-page="firstList.page" :page-size="firstList.pagesize" :page-sizes="[10, 20, 30, 50]" layout="prev, pager, next,total, jumper,sizes" :total="firstList.total">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	import { getMaterialMsgPicList, delPicInfo, getMaterialPicInfo, updateMaterialPicName, saveMaterialPic } from '@/api/weixin';
	import nodata from '@/assets/nodata.png';

	export default {
		name: 'materialmangement',
		data() {
			return {
				showLoading: false,
				nodata: nodata,
				action: "", //上传地址
				listdata: [], //图文
				picList: [], //图片
				activeName: 'first', // 默认显示第一个tab
				searchNameVal: "", //搜索关键字
				picNameVal: "",
				firstList: {
					page: 1,
					total: 0,
					pagesize: 10,
				},
				selectName: {
					dialogTableVisible: false,
					selectName: "",
					selectID: "",
				}
			}
		},
		mounted() {
					/*****统计埋点*****/
			_czc.push(["_trackEvent", "素菜管理", "访问页面"]); //统计流量
			
			this.action = '../../../imgServlet?actionType=upload&tenentid=' + this.$store.state.user.tenancyid + '&fileId='; //正式地址  正式环境使用
			//this.action = 'img/imgServlet?actionType=upload&tenentid=' + this.$store.state.user.tenancyid + '&fileId='; //代理地址  本地调试时使用
			this.showLoading = true;
			this.getMaterialMsgPicList(); /****获取图文列表***/
			this.getMaterialPicInfo(); /***获取图片列表*****/
		},
		methods: {
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
				saveMaterialPic('pic_path=' + path + '&pic_name=' + filename).then((data) => {
					if(data.success) {
						this.getMaterialPicInfo(); /****刷新图片列表****/
						this.$message({
							message: "上传成功！",
							type: 'success'
						});
					} else {
						this.$message({
							message: "上传图片失败！",
							type: 'error'
						});
					}
				})
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 <= 2000;

				if(!isJPG) {
					this.$message.error('图片只能是 JPG/PNG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('图片大小不能超过 2M!');
				}
				return isJPG && isLt2M;
			},
			/***修改名称完毕****/
			btnSelectNameOK() {
				updateMaterialPicName("id=" + this.selectName.selectID + "&pic_name=" + this.selectName.selectName).then((data) => {
					if(data.success) {
						this.selectName.dialogTableVisible = false;
						this.getMaterialPicInfo(); /***获取图片列表*****/
						this.$message({
							message: "修改成功！",
							type: 'success'
						});
					} else {
						this.$message({
							message: data.msg,
							type: 'error'
						});
					}
				})
			},
			/***删除图片**/
			deleteName(item) {
				delPicInfo("media_id=" + item.pic_thumb_media_id + "&ids=" + item.id).then((data) => {
					if(data.success) {
						this.getMaterialPicInfo(); /*****如果删除成功 则重新加载数据***/
						this.$message({
							message: "删除成功！",
							type: 'success'
						});
					} else {
						this.$message({
							message: data.msg,
							type: 'error'
						});
					}
				})
			},
			/***弹出修改名称对话框****/
			modifyName(item) {
				this.selectName.dialogTableVisible = true;
				this.selectName.selectName = item.pic_name;
				this.selectName.selectID = item.id;
			},
			/**获取后台图文列表***/
			getMaterialMsgPicList() {
				getMaterialMsgPicList("key=" + this.searchNameVal).then((data) => {
					this.listdata = data.rows;
				})
			},
			/**获取后台图文详情***/
			getMaterialPicInfo() {
				getMaterialPicInfo("imgName=" + this.picNameVal + "&page=" + this.firstList.page + "&rows=" + this.firstList.pagesize).then((data) => {
					this.showLoading = false;
					this.picList = data.rows;
					this.firstList.total = data.total;
				})
			},
			/**每页条数改变***/
			handleFirstSizeChange(value) {
				this.firstList.pagesize = value;
				this.getMaterialPicInfo();
			},
			/**当前页改变**/
			handleFirstCurrentChange(value) {
				this.firstList.page = value;
				this.getMaterialPicInfo();
			},
			/****新建素材****/
			addMaterial() {
				this.$router.push({
					path: "/wxmessage/ModifyMaterial",
					hash: 'new',
					query: {
						type: "add"
					}
				});
			},
			/*****编辑素材****/
			modifyData(event, data) {
				event.stopPropagation(); /***停止事件冒泡***/
				this.$router.push({
					path: "/wxmessage/ModifyMaterial",
					hash: 'new',
					query: {
						type: "modify",
						id: data.id,
						media_id: data.pic_thumb_media_id,
					}
				});

			},
			/****删除素材****/
			deleteData(event, data) {
				event.stopPropagation(); /***停止事件冒泡***/
				delPicInfo("media_id=" + data.pic_thumb_media_id).then((data) => {
					if(data.success) {
						this.getMaterialMsgPicList(); /*****如果删除成功 则重新加载数据***/
						this.$message({
							message: "删除成功",
							type: 'success'
						});
					} else {
						this.$message({
							message: data.msg,
							type: 'error'
						});
					}
				})
			},
			previewMaterial(data) {
				this.$router.push({
					path: "/wxmessage/MaterialPreview",
					hash: 'new',
					query: {
						id: data.id
					}
				});

			}
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.materialmanagement {
		.materialmanagement-container {
			margin: 20px 20px;
		}
		.materialmanagment-upload {
			float: right;
		}
		.zdgz {
			.el-card__body {
				height: 210px !important;
			}
		}
		.divTwo_aqszs {
			height: auto;
			min-height: 800px;
			background: #FFFFFF;
			margin-top: 10px;
			padding: 10px 20px;
			.el-tabs__nav-scroll {
				border-bottom: 1px solid #EAF1F6;
				height: 45px;
				line-height: 45px;
				margin-left: 20px;
				margin-right: 20px;
			}
			.el-tabs__item {
				font-size: 16px !important;
				margin-bottom: 8px!important;
				padding: 0px 20px!important;
				margin-left: 0!important;
				color: #34495E!important;
			}
			.el-tabs__item.is-active {
				color: #0C9AFF!important;
			}
			.el-tabs__active-bar {
				background-color: #0C9AFF !important;
			}
			.el-tabs__header {
				background: #FEFEFE;
			}
		}
		.modify-name {
			margin: 20px 20px;
			width: 400px;
			.el-input__inner {
				width: 400px;
			}
		}
		.materiallist {
			min-height: 303px;
			height: auto !important;
			overflow: hidden;
			padding: 20px 20px;
			.pic-list-ul-li {
				width: 25%;
				float: left;
				list-style: none;
				cursor: pointer;
				.el-card {
					position: relative;
					margin-right: 20px;
					margin-bottom: 10px;
					background: #FFFFFF;
					border: 1px solid #E3F0F6;
					box-shadow: 0 5px 10px 0 rgba(218, 234, 246, 0.20);
					border-radius: 3px;
					.hover-span {
						display: none;
					}
					.hover-span-edit {
						display: none;
					}
					&:hover {
						background: #FEFEFE;
						border: 1px solid rgba(12, 154, 255, 0.20);
						box-shadow: 0 2px 8px 0 rgba(137, 147, 227, 0.20);
						border-radius: 3px;
						.hover-span {
							display: block;
							width: 100%;
							height: 40px;
							line-height: 40px;
							position: absolute;
							bottom: 0;
							background-color: #0C9AFF;
							opacity: 0.8;
							.modify,
							.delete {
								display: inline-block;
								width: 50%;
								float: left;
								color: #FFFFFF;
								font-size: 14px;
								text-align: center;
							}
							.modify {
								border-right: 1px solid #FFFFFF;
							}
						}
						.hover-span-edit {
							top: 0;
						}
					}
					.image {
						padding: 10px;
						height: 100px;
						width: 100%;
						box-sizing: border-box;
					}
					.materialname {
						height: 100px;
						padding: 0 10px 10px;
						.title {
							color: #34495E;
							font-size: 16px;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
							height: 25px;
							line-height: 25px;
						}
						.digest {
							height: 50px;
							line-height: 25px;
							font-size: 14px;
							color: #758896;
							overflow: hidden;
						}
						.date {
							font-size: 12px;
							height: 25px;
							line-height: 25px;
							color: #9AABB8;
							i {
								padding-right: 5px;
							}
						}
						.bottombutton {
							margin-top: 10px;
							text-align: center;
							height: 36px;
							line-height: 36px;
							font-size: 14px;
							color: #0C9AFF;
							&:hover {
								cursor: pointer;
								color: #108EE9;
							}
						}
					}
				}
			}
		}
		.el-button.el-button--server {
			color: #fff;
			background-color: #ff9001;
			border-color: #ff9001;
			border: none;
		}
		.el-button.el-button--server:focus,
		.el-button.el-button--server:hover {
			background: #ff8401;
			border-color: #ff8401;
			color: #fff;
		}
	}
</style>