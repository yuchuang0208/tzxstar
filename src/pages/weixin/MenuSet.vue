<template>
	<div class="weixin-menu-set" v-loading.body="loading">
		<h1>3*5菜单管理</h1>
		<div class="weixin-menu-set-title ">
			<span class="weixin-menu-set-icon">!</span><span class="weixin-menu-set-title-name">菜单编辑完成，请保存后点击“同步到微信后台”同步更新到微信平台</span>
		</div>
		<div class="weixin-menu-set-body">
			<div class="weixin-menu-set-left">
				<div class="weixin-menu-set-img">
					<img class="top" src="~@/assets/weixin/weixin_top.png" />
					<img class="bottom" src="~@/assets/weixin/weixin_bottom.png" />
					<div class="weixin-menu-set-bottom">
						<div class="weixin-menu-set-firstlist">
							<ul class="weixin-menu-set-firstlist-ul">
								<li class="weixin-menu-set-firstlist-li" v-for="item in list" v-if="item.parent_id=='0'" @click="selectMenu($event,item)" :class="item.id==selectData.id?'select':''">
									<ul v-if="item.id==firstID" class="weixin-menu-set-firstlist-next-ul">
										<li class="weixin-menu-set-firstlist-next-li" :class="data.id==selectData.id?'select':''" v-for="data in findSecondMenu(item.id)" @click="selectMenu($event,data)">
											<span v-if="showSort">
												<i class="el-icon-caret-top" @click="sortMenu($event,data,-1)"></i>
												<i class="el-icon-caret-bottom" @click="sortMenu($event,data,1)"></i>
											</span>
											<div>{{data.title}}</div>

										</li>
										<li class="weixin-menu-set-firstlist-next-add" v-if="findSecondMenu(item.id).length<5" @click="addMenu($event,item.id)">
											<div class="el-icon-plus"></div>
										</li>
									</ul>
									<span class="left" v-if="showSort">										
										<i class=" el-icon-caret-left" @click="sortMenu($event,item,-1)"></i>
									</span>
									<span class="right" v-if="showSort">										
										<i class=" el-icon-caret-right" @click="sortMenu($event,item,1)"></i>
									</span>
									<div class="firstmenu">{{item.title}}</div>
								</li>
							</ul>
						</div>
						<div v-if="(list.filter(item=>item.parent_id=='0')).length<3" @click="addMenu($event,0)" class='weixin-menu-set-firstaddbutton el-icon-plus'></div>
					</div>
				</div>
			</div>
			<div class="weixin-menu-set-right">
				<div class="weixin-menu-set-right-body" :style="{display:showPanel?'block':'none'}">
					<div class="weixin-menu-set-right-title">菜单名称
						<span class="weixin-menu-set-right-delete" @click="delMenu">删除菜单</span>
					</div>
					<div class="weixin-menu-set-right-edit">
						<div class="title-list">
							<span class="weixin-menu-set-right-edit-title">默认菜单：</span>
							<div class="content">
								<ul class="weixin-menu-ul">
									<li class="weixin-menu-li" :class="item.name==defaultData.name?'select':''" v-for="item  in  defaultMenu" @click="selectDefault(item)">
										{{item.title}}
									</li>
									<li class="clear"></li>
								</ul>
							</div>
						</div>
						<div class="title-list">
							<span class="weixin-menu-set-right-edit-title">菜单名称：</span>
							<div class="content">
								<el-input v-model="selectData.title" :maxlength="5" placeholder="请输入2-5个字符的菜单名称" @blur="saveMenu"></el-input>
							</div>
						</div>
						<div class="title-list">
							<span class="weixin-menu-set-right-edit-title">菜单链接：</span>
							<div class="content">
								<el-input v-model="selectData.url" placeholder="请输入菜单链接" @blur="saveMenu"></el-input>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="weixin-menu-set-footer">
				<el-button class="sortMenu" @click="showSort=!showSort">菜单排序</el-button>
				<el-button class="saveMenu" type="primary" @click="synMenu">保存并同步</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { getDefaultMenu, getMenu, saveMenu, delMenu, synMenu, menuOrder } from '@/api/weixin';

	export default {
		name: 'weixin-menu-set',
		data() {
			return {
				loading: false,
				defaultMenu: [], //默认菜单
				list: [], //当前菜单
				current: {},
				showPanel: false,
				rootData: [],
				selectData: {},
				firstID: "",
				defaultData: {},
				showSort: false
			}
		},
		mounted() {
			/*****统计埋点*****/
			_czc.push(["_trackEvent", "微信菜单", "访问页面"]); //统计流量

			/*****选择默认*****/
			this.getMenu();
			this.getDefaultMenu();
		},
		methods: {

			//获取默认菜单
			getDefaultMenu() {
				this.loading = true;
				getDefaultMenu().then((data => {
					this.loading = false;
					if(data.success) {
						this.defaultMenu = data.list;
					} else {
						this.$message({
							message: "获取默认菜单信息失败",
							type: "error"
						});
					}
				}))
			},

			/***排序****/
			sortMenu(event, data, i) {
				event.stopPropagation();
				let [changeItem] = this.list.filter((item) => (item.parent_id == data.parent_id) && (item.sort_num == ((data.sort_num - 0) + i)));
				if(changeItem) {
					changeItem.sort_num = ((changeItem.sort_num - 0) - i) + "";
					data.sort_num = ((data.sort_num - 0) + i) + "";
					//this.sortThenSaveMenu(changeItem);
					//this.sortThenSaveMenu(data);
					let paramData = [{
						id: changeItem.id,
						sort_num: changeItem.sort_num
					}, {
						id: data.id,
						sort_num: data.sort_num
					}];
					this.loading = true;
					menuOrder("menuOrder=" + JSON.stringify(paramData)).then((data => {
						this.loading = false;
						if(data.success) {
							this.$message({
								message: "保存成功",
								type: "success"
							});
							this.getMenu();
						} else {
							this.$message({
								message: "保存失败",
								type: "error"
							});
						}
					}))
				}
			},

			//选择默认菜单
			selectDefault(data) {
				this.defaultData = JSON.parse(JSON.stringify(data));
				let defdata = JSON.parse(JSON.stringify(data));
				this.selectData.title = defdata.title;
				this.selectData.name = defdata.name;
				this.selectData.url = defdata.url;
				this.saveMenu();
			},

			//点击菜单
			selectMenu(event, data) {
				event.stopPropagation();
				if(data.parent_id == "0") {
					/**点击的是根**/
					this.firstID = data.id;
				}
				let [item] = this.list.filter((item) => item.id == data.id);
				this.selectData = item;
				this.showPanel = true;
			},

			//获取已有菜单
			getMenu() {
				this.loading = true;
				getMenu().then((data => {
					this.loading = false;
					if(data.success) {
						this.list = data.list;
					} else {
						this.$message({
							message: "获取菜单信息失败",
							type: "error"
						});
					}
				}))
			},

			/***判断有没有相同名称然后添加一个空菜单****/
			addMenu(event, id) {
				event.stopPropagation();
				let name = (!id || id == "0") ? "一级菜单" : "二级菜单";
				let menu_level = id == "0" ? "1" : "2";
				if(this.checkMenu(id, name)) {
					this.loading = true;
					saveMenu("title=" + name + "&name=" + name + "&menu_level=" + menu_level + "&parent_id=" + id + "&url=http://example.com&type=weixin").then((data) => {
						this.loading = false;
						if(data.success) {
							/***可以增加****/
							this.showPanel = true; //显示弹层
							let newData = {
								parent_id: id ? id : "0",
								name: name,
								title: name,
								menu_level: menu_level,
								url: "http://example.com",
								id: data.id,
							};
							this.list.push(newData);
							this.selectData = newData;
						} else {
							this.$message({
								message: data.msg,
								type: "error"
							})
						}
					})
				}
			},

			//修改菜单名称或链接，失去焦点直接保存
			saveMenu() {
				if(this.selectData.title == "" || this.selectData.url == "") {
					this.$message({
						message: "菜单名称和链接不能为空",
						type: "success"
					})
					return;
				}
				this.loading = true;
				saveMenu("title=" + this.selectData.title +
					"&name=" + this.selectData.title +
					"&menu_level=" + this.selectData.menu_level +
					"&url=" + this.selectData.url +
					"&id=" + this.selectData.id +
					"&parent_id=" + this.selectData.parent_id +
					"&type=weixin").then((data) => {
					this.loading = false;
					if(data.success) {
						this.$message({
							message: "保存成功",
							type: "success"
						})
					} else {
						this.$message({
							message: data.msg,
							type: "error"
						})
					}
				})
			},

			//删除一个菜单
			delMenu() {
				if(!this.selectData || Object.keys(this.selectData).length <= 0) {
					this.$message({
						message: "请选择要删除的菜单",
						type: "error"
					})
					return;
				}
				let id = this.selectData.id;
				let filterData = this.list.filter(item => item.parent_id == id);
				if(filterData.length > 1) {
					this.$message({
						message: "不能删除包含二级菜单的一级菜单",
						type: "error"
					})
					return;
				}
				this.loading = true;
				delMenu("id=" + id).then((data) => {
					this.loading = false;
					if(data.success) {
						this.selectData = {};
						this.list.splice(this.list.findIndex(item => item.id == id), 1);
					} else {
						this.$message({
							message: data.msg,
							type: "error"
						})
					}
				})

			},

			//同步微信菜单
			synMenu() {

				synMenu().then((data) => {
					if(data.success) {
						this.$message({
							message: "同步成功",
							type: "success"
						})
						this.getMenu();
					} else {
						this.$message({
							message: data.msg,
							type: "error"
						})
					}
				})

			},

			//查找二级菜单
			findSecondMenu(id) {
				return this.list.filter((item) => item.parent_id == id)
			},

			/****检查是否超过了数量*****/
			checkMenu(id, title) {
				let filter = this.list.filter((item) => {
					item.parent_id == id
				});
				if(id == "0" && filter.length == 3) {
					this.$message({
						message: "一级菜单不能超过三个",
						type: "warning"
					})
					return false;
				} else if(id && filter.length == 5) {
					this.$message({
						message: "二级菜单不能超过五个",
						type: "warning"
					})
					return false;
				}
				if(this.list.findIndex(item => item.title == title) > -1) {
					this.$message({
						message: "'" + title + "'名称已存在",
						type: "warning"
					})
					return false;

				}
				return true;
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.weixin-menu-set {
		background: white;
		padding-bottom: 120px;
		h1 {
			color: #34495E;
			font-size: 16px;
			border-bottom: 1px solid #EAF1F6;
			padding: 20px 30px;
		}
		.weixin-menu-set-title {
			margin: 10px 30px;
			background: #FFFCF2;
			line-height: 32px;
			.weixin-menu-set-icon {
				width: 16px;
				height: 16px;
				display: inline-block;
				border-radius: 50%;
				background: #FFBF00;
				color: #FFFFFF;
				text-align: center;
				line-height: 16px;
			}
			.weixin-menu-set-title-name {
				font-size: 12px;
				color: #576D7A;
				padding-left: 4px;
				margin-right: 20px;
			}
		}
		.weixin-menu-set-body {
			width: 100%;
			background: #FFFFFF;
			position: relative;
			overflow: hidden;
			.weixin-menu-set-left {
				width: 322px;
				height: 490px;
				margin-left: 40px;
				position: relative;
				display: inline-block;
				border: 1px solid #EAF1F6;
				.weixin-menu-set-img {
					height: 100%;
					img {
						position: absolute;
					}
					.top {
						top: 0;
					}
					.bottom {
						bottom: 0;
					}
				}
				.weixin-menu-set-bottom {
					position: absolute;
					bottom: 0;
					height: 50px;
					margin-left: 44px;
					width: 276px;
					.weixin-menu-set-firstlist {
						.weixin-menu-set-firstlist-ul {
							.weixin-menu-set-firstlist-li {
								&.select {
									border: 1px solid #0C9AFF;
								}
								cursor: pointer;
								float: left;
								border-right: 1px solid #EAF1F6;
								max-width: 100%;
								min-width: 33.333333%;
								span.left {
									float: left;
									padding-top: 17px;
									color: #ccc;
								}
								span.right {
									float: right;
									padding-top: 17px;
									color: #ccc;
								}
								span.left:hover,
								span.right:hover {
									color: #0C9AFF;
								}
								.firstmenu {
									font-size: 12px;
									text-align: center;
									height: 50px;
									line-height: 50px;
									overflow: hidden;
								}
								.weixin-menu-set-firstlist-next-ul {
									position: absolute;
									bottom: 70px;
									width: 28%;
									background-color: #FAFAFA;
									.weixin-menu-set-firstlist-next-li,
									.weixin-menu-set-firstlist-next-add {
										text-align: center;
										height: 50px;
										line-height: 50px;
										border: 1px solid #EAF1F6;
										&.select {
											border: 1px solid #0C9AFF;
										}
										span {
											width: 20px;
											height: 50px;
											float: right;
											position: relative;
											i {
												position: absolute;
												left: 3px;
												color: #ccc;
											}
											i:nth-child(1) {
												top: 12px;
											}
											i:nth-child(2) {
												bottom: 12px;
											}
											i:nth-child(1):hover,
											i:nth-child(2):hover {
												color: #0C9AFF;
											}
										}
										div {
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
											font-size: 12px;
										}
									}
									.weixin-menu-set-firstlist-next-add {}
								}
							}
							.clear {
								clear: both;
							}
						}
					}
					.weixin-menu-set-firstaddbutton {
						display: block;
						color: #9AABB8;
						line-height: 50px;
						text-align: center;
						font-size: 14px;
					}
				}
			}
			.weixin-menu-set-right {
				display: inline-block;
				right: 20px;
				position: absolute;
				height: 100%;
				background-color: #F5F9FB;
				top: 0;
				left: 370px;
				.weixin-menu-set-right-body {
					width: 100%;
					padding: 10px 20px;
					.weixin-menu-set-right-title {
						font-size: 16px;
						border-bottom: #EAF1F6 1px solid;
						height: 36px;
						line-height: 36px;
						.weixin-menu-set-right-delete {
							color: #0C9AFF;
							font-size: 14px;
							display: block;
							float: right;
							cursor: pointer;
						}
					}
					.weixin-menu-set-right-edit {
						.weixin-menu-set-right-edit-title {
							color: #576D7A;
							font-size: 14px;
							float: left;
							padding-right: 10px;
							line-height: 32px;
						}
						.title-list {
							padding: 10px 20px;
							.content {
								overflow: hidden;
							}
						}
						.weixin-menu-ul {
							.weixin-menu-li {
								&.select {
									background-color: #0C9AFF;
									color: #FFFFFF;
								}
								width:100px;
								float: left;
								line-height: 28px;
								border:1px solid #D8E5EC;
								height: 28px;
								margin:0 10px 10px 0;
								color: #34495E;
								border-radius: 3px;
								font-size:14px;
								padding: 0 10px;
								background: #FFFFFF;
								flex-flow: wrap;
								cursor: pointer;
								text-align: center;
							}
							.clear {
								clear: both;
							}
						}
					}
				}
			}
			.weixin-menu-set-footer {
				margin: 20px 40px;
				.sortMenu,
				.saveMenu {
					font-size: 14px;
					height: 32px;
				}
			}
		}
	}
</style>