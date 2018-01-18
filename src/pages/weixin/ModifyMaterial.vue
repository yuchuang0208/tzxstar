<template>
	<div class="modifymaterailinfo" v-loading.body="showLoading">
		<header class="el-header set-wxcard-header">
			<span class="wxtitle">{{type=="add"?"新建素材":"修改素材"}}</span>
		</header>
		<section class="el-container clearfix">
			<aside class="el-aside material-left">
				<ul>
					<li v-for="(item,index) in  materials" @click="changeObj(item.id)">
						<div :class="item.current?'upImgBox current':'upImgBox'">
							<img class="view_leftImg" :src="item.pic_path" />
							<input class="mediaId" type="hidden" />
							<input class="picName" type="hidden" />
							<span class="title_con">
                                <em class="B_title">{{item.title}}</em>
                            </span>
						</div>
						<div class="imgOperat">
							<span v-if="index!=0" class="deletespan" @click="deleteOne($event,item.id)">删除图文</span>
						</div>
					</li>
				</ul>
				<el-button v-if="type=='add'" class="el-icon-plus" @click="addOne(false)"></el-button>
			</aside>
			<main class="el-main show-editecarddetail">
				<div>
					<el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" :rules="rules">
						<el-row>
							<el-col :span="10">
								<el-form-item label="文章标题:" prop="title">
									<el-input type="name" placeholder="请输入文章标题" v-model="formData.title" auto-complete="off" style="margin-left:15px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="作者:" prop="author">
									<el-input type="title" placeholder="请输入作者" v-model="formData.author" auto-complete="off" style="margin-left:15px;"></el-input>
								</el-form-item>
							</el-col>
							<el-button :span="4" type="primary" @click="getallvote" style="float:right">添加投票</el-button>
						</el-row>

						<el-form-item label="">
							<script id="ueditor1" type="text/plain"></script>
						</el-form-item>
						<el-form-item label="原文链接:" prop="content_source_url">
							<el-input type="title" v-model="formData.content_source_url" style="margin-left:15px;"></el-input>
						</el-form-item>
						<el-form-item prop="pic_path" label="封面:">
							<p class="e-item-p">
								<el-button type="primary" @click="findPicList">从图片库选择</el-button>
							</p>
							<p class="e-item-p" style=" color: #999;"> 大图片建议尺寸：900像素*500像素</p>
							<p class="e-item-p">
								<img :src="formData.pic_path" style="border: 1px solid #ccc;" v-if="formData.pic_path" />
							</p>
							<el-dialog class="selectMaterial" title="选择素材" :visible.sync="select.dialogTableVisible">
								<ul class="materialImg-list">
									<li v-for="item in select.list" @click="selectMaterial(item.id)">
										<div class="materialImg">
											<img class="img" :src="item.pic_path" />
											<span class="title">{{item.pic_name}}</span>
											<div :class="item.select?'select el-icon-check':'unselect'"></div>
										</div>
									</li>
								</ul>
								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="select.currentPage" :page-sizes="[4, 6, 8, 10,20]" :page-size="select.pageCount" layout="prev, pager, next,total, jumper,sizes" :total="select.total">
								</el-pagination>
								<span slot="footer" class="dialog-footer">
                                <el-button @click="select.dialogTableVisible = false">取 消</el-button>
                               <el-button type="primary" @click="btnSelectPicOK">确 定</el-button>
                             </span>
							</el-dialog>
							<el-dialog class="selectVote" title="发起投票" :visible.sync="selectVote.dialogTableVisible">
								<el-table :data="selectVote.list">
									<el-table-column label="选中">
										<template scope="scope">
											<el-radio class="radio" v-model="radio" :label="scope.row.id"></el-radio>
										</template>
									</el-table-column>
									<el-table-column property="vote_name" label="投票名称"></el-table-column>
									<el-table-column property="end_time" label="截止时间"></el-table-column>
									<el-table-column property="member_count" label="投票人数"></el-table-column>
								</el-table>
								<span slot="footer" class="dialog-footer">
                                <el-button @click="selectVote.dialogTableVisible = false">取 消</el-button>
                               <el-button type="primary" @click="btnSelectVoteOK">确 定</el-button>
                             </span>
							</el-dialog>
						</el-form-item>
						<el-form-item prop="digest" label="摘要:">
							<p class="e-item-p" style=" color: #999;">(选填，如果不填写会默认抓取正文前54个字)</p>
							<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 18}" placeholder="请输入内容" v-model="formData.digest">
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="saveData">保存</el-button>
						</el-form-item>

					</el-form>
				</div>
			</main>
		</section>
	</div>
</template>
<script>
	import { getMaterialMsgPic, saveMaterialMsgPic, findPicList, getallvote } from '@/api/weixin';
	export default {
		data() {
			let validateUrl = (rule, value, callback) => {
				if(value == "") {
					callback(new Error('原文链接不能为空'));
				} else {
					let reg = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/;
					if(!reg.test(value)) {
						callback(new Error('请输入正确链接'));
					} else {
						callback();
					}
				}
			};
			let validateTitle = (rule, value, callback) => {
				if(value == "") {
					callback(new Error('标题不能为空'));
				} else {
					if(value.length >= 64) {
						callback(new Error('标题不能超过64个字符'));
					} else {
						callback();
					}
				}
			};
			let validateAuthor = (rule, value, callback) => {
				if(value == "") {
					callback(new Error('作者不能为空'));
				} else {
					if(value.length >= 8) {
						callback(new Error('作者不能超过8个字符'));
					} else {
						callback();
					}
				}
			};
			return {
				showLoading: false,
				initEditor: false,
				type: "add",
				editor: null,
				materials: [],
				formData: {
					title: "",
					author: "",
				},
				ueID: "ueID", //编辑器ID
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 250,
				},
				radio: "",
				rules: {
					title: [{
						validator: validateTitle,
						trigger: 'blur'
					}],
					author: [{
						validator: validateAuthor,
						trigger: 'blur'
					}],
					pic_path: [{
						required: true,
						message: '请设置封面图片',
						trigger: 'blur'
					}],
					content_source_url: [{
						validator: validateUrl,
						trigger: 'blur'
					}]
				},

				selectVote: {
					dialogTableVisible: false,
					list: []
				},
				select: {
					dialogTableVisible: false,
					currentPage: 1,
					total: 0,
					pageCount: 10,
					list: [],
				}
			}
		},
		mounted() {
			/*****统计埋点*****/
			_czc.push(["_trackEvent", "编辑素材", "访问页面"]); //统计流量

			UE.delEditor("ueditor1");
			this.editor = UE.getEditor("ueditor1");
			this.editor.addListener("blur", () => {
				this.formData["content"] = this.editor.getContent();

			});
			this.editor.addListener("ready", () => {
				this.initEditor = true;
			});
			if(this.$route.query.type == "add") {
				/***新建素材 ****/
				this.addOne();
				this.type = "add";

			} else {
				/****修改素材****/
				this.showLoading = true;
				this.type = "modify";
				this.getMaterialMsgPic();
			}
		},

		methods: {
			getallvote() {

				this.selectVote.dialogTableVisible = true;
				getallvote().then((data) => {
					this.selectVote.list = data;
				})

			},
			findPicList() {
				this.select.dialogTableVisible = true;
				/*****获取图片库********/
				findPicList("page=" + this.select.currentPage + "&rows=" + this.select.pageCount).then((data) => {
					this.select.total = data.total;
					if(data.rows && data.rows.length) {
						data.rows.map((item) => {
							item.select = false;
						});
						this.select.list = data.rows;
					}
				})
			},
			setContent(html) {
				if(this.initEditor) {
					this.editor.setContent(html);
				} else {
					this.editor.addListener("ready", () => {
						this.editor.setContent(html);
					});
				}
			},
			getMaterialMsgPic() {
				getMaterialMsgPic("media_id=" + this.$route.query.media_id).then((data) => {
					this.materials = data;
					this.showLoading = false;
					if(data.length) {
						this.changeObj(data[0]["id"]);
					}
				})
			},
			saveData() {
				/***保存数据*****/
				/***新建素材保存****/
				this.$refs["formData"].validate((valid) => {
					if(valid) {
						/****验证通过  只是验证了当前的数据 需要验证所有的数据****/
						let OK = true;
						this.materials.map((item) => {
							if(!item.title || item.title == "" || !item.author || item.author == "" || !item.pic_path || item.pic_path == "") {
								OK = false;
							}
						})
						if(!OK) {
							this.$message({
								message: "您有素材的必填项未填！",
								type: 'warning'
							});
							return false;
						} else {

							let param = {
								autosave: false,
								articles: JSON.stringify(this.materials)
							};
							this.showLoading = true;
							saveMaterialMsgPic(param, (data) => {
								this.showLoading = false;
								if(data.success) {
									this.$message({
										message: "保存成功！",
										type: 'success'
									});

									this.closeViewTabs(this.$store.state.app.activeName);
									this.$router.push({
										path: "/wxmessage/Materialmanagement",
										hash: 'new'
									});
								} else {
									this.$message({
										message: "保存失败！",
										type: 'error'
									});
								}
							})

						}

					} else {
						return false;
					}
				});
			},
			closeViewTabs(view) {
				this.$store.dispatch('delViews', view).then((views) => {
					if(this.$store.state.app.activeName === view) {
						const latestView = views.slice(-1)[0]
						if(latestView) {
							localStorage.setItem("activeName", latestView.path)
							this.$store.state.app.activeName = latestView.path;
							this.$router.push(latestView.path)
						} else {
							localStorage.setItem("activeName", '/home')
							this.$store.state.app.activeName = '/home';
							this.$router.push('/')
						}
					}
				})
			},
			selectMaterial(id) {
				this.select.list.map(function(item, index) {
					if(item.id == id) {
						item.select = true;
					} else {
						item.select = false;
					}
				})
			},
			/****选择投票完毕****/
			btnSelectVoteOK() {
				if(this.radio != "") {
					this.selectVote.dialogTableVisible = false;
					let [data] = this.selectVote.list.filter((item) => item.id == this.radio);
					if(data) {
						let url = window.getBasePath2() + "/pages/weixin/newfront/votemanagement/tovote.jsp?id=" + data.id + "&tenantId=" + data.tenancy_id;
						let appendUrl = "<a href='" + url + "'>点此投票</a>";
						this.editor.setContent(appendUrl, true); /****插入到编辑器中*****/
						this.formData.content = this.editor.getContent(); /***更新数据**/
					}

				} else {
					this.$message({
						message: '警告,未选择任何的投票活动',
						type: 'warning'
					});
				}
			},
			/****选择素材完毕*****/
			btnSelectPicOK() {

				let haveSelect = this.select.list.some((item) => item.select == true);
				if(haveSelect) {
					let [{
						pic_path,
						pic_thumb_media_id
					}] = this.select.list.filter((item) => item.select == true);
					this.formData.pic_path = pic_path;
					this.formData.cover_media_id = pic_thumb_media_id;
					this.select.dialogTableVisible = false;
				} else {
					this.$message({
						message: '警告,未选择任何图片',
						type: 'warning'
					});
				}
			},
			/****分页条数变化****/
			handleSizeChange(value) {
				this.select.pageCount = value;
				this.findPicList(); /***显示****/
			},
			/***当前页码变化****/
			handleCurrentChange(value) {
				this.select.currentPage = value;
				this.findPicList(); /***显示****/
			},

			deleteOne(event, id) {
				event.stopPropagation(); /***停止事件冒泡***/
				let index = -1;
				this.materials.map((item, i) => {
					if(item.id == id) {
						index = i;
					}
				});
				this.materials = this.materials.filter((item) => item.id != id);
				if(this.materials.length == index) {
					index = index - 1;
				}
				this.materials.map((item, i) => {
					if(i == index) {
						this.changeObj(item.id)
					}
				})
			},
			addOne() {
				/***新建一个空的图文***/
				let id = "t" + parseInt(Math.random() * 100000000);
				this.materials.push({
					title: "",
					id: id,
					content: ""
				});
				this.changeObj(id);
			},
			changeObj(id) {

				let currentObj = this.materials.filter((item) => item.id == id);
				this.materials.map((item) => {
					if(item.id == id) {
						item.current = true;
					} else {
						item.current = false;
					}
				});
				if(currentObj && currentObj.length) {

					this.formData = currentObj[0];
					if(this.editor) {
						this.setContent(this.formData.content);
					}
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.material-left {
		float: left;
		height: 900px;
		overflow: scroll;
		.el-icon-plus {
			margin-top: 20px;
			width: 200px;
			height: 50px;
		}
		.hide {
			display: none !important;
		}
		.upImgBox.current {
			border: 2px solid #43b548;
		}
		.upImgBox {
			width: 208px;
			height: 165px;
			font: 12px/165px '';
			text-align: center;
			color: #dedede;
			position: relative;
			border: 1px solid #ccc;
		}
		.upImgBox img {
			display: block;
			width: 100%;
			height: 100%;
		}
		.title_con {
			position: absolute;
			width: 100%;
			height: 30px;
			bottom: 0px;
			background: #000;
			left: 0pc;
			opacity: 0.8;
			text-align: center;
			line-height: 30px;
		}
		.title_con em {
			width: 47%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: center;
			height: 30px;
			margin: auto;
		}
		.imgOperat {
			width: 210px;
			height: 34px;
		}
		.imgOperat span {
			display: inline-block;
			width: 207px;
			height: 100%;
			border: 1px solid #dedede;
			margin-right: -2px;
			margin-top: -1px;
			background: #fafafa;
			text-align: center;
			font: 12px/34px '';
			position: relative;
			cursor: pointer;
			color: #999;
		}
		.imgOperat span:hover {
			color: #fff;
			background: #ff503f;
			border-color: #ff503f;
		}
	}
	
	.el-select-dropdown__list {
		padding: 0!important;
	}
	
	.el-select-dropdown__item.hover {}
	
	.modifymaterailinfo {
		width: 100%;
		.selectMaterial {
			.el-dialog__body {
				height: 500px;
			}
		}
		.selectVote {
			.el-dialog__body {
				margin-bottom: 30px;
				height: 500px;
			}
		}
		.materialImg-list {
			width: 100%;
			height: 450px;
			overflow: auto;
			li {
				float: left;
				margin-left: 50px;
				margin-top: 30px;
				width: 120px;
				height: 130px;
				flex-wrap: wrap;
				border: 1px solid #CCC;
				.materialImg {
					position: relative;
					.img {
						width: 100%;
						height: 90px;
					}
					.title {
						width: 100%;
						display: block;
						height: 40px;
						text-align: center;
						background: #cccccc;
						overflow: hidden;
					}
					.select {
						position: absolute;
						display: block;
						background-color: rgba(0, 0, 0, 0.75);
						top: 0;
						width: 100%;
						height: 100%;
						text-align: center;
						line-height: 130px;
						font-size: 50px;
					}
					.unselect {
						display: none;
					}
				}
			}
		}
		background-color: #fff;
		margin:20px;
		.set-wxcard-header {
			height: 60px;
			line-height: 60px;
			border-bottom: 1px solid #EAF1F6;
			font-size: 16px;
			margin: 0 20px 20px;
			.wxtitle {
				padding-left: 10px;
			}
		}
		.el-container {
			.el-aside {
				margin-left: 30px;
				border-right: 1px solid #CCCCCC;
			}
			.el-form-item__content {
				margin-left: 140px!important;
			}
			.material-left {}
		}
		.interests {
			.el-input {
				width: 178px;
			}
			.interests-list {
				margin-bottom: 20px!important;
				display: flex;
				.el-checkbox {
					width: 100px;
				}
			}
		}
		.el-form {
			margin-left: 30px!important;
			.el-form-item:nth-of-type(8),
			.el-form-item:nth-of-type(9) {
				margin-bottom: 0px!important;
			}
		}
		.el-form-item__error {
			padding-left: 15px;
		}
		.show-editecarddetail {
			width: 72%;
			padding-top: 20px;
			float: left;
		}
	}
	
	.clearfix {
		overflow: hidden;
		_zoom: 1;
	}
	
	#ueditor1 {
		margin-left: 15px;
	}
	
	.edui-editor .edui-default {
		width: auto;
	}
	
	.e-item-p {
		padding: 10px 0 10px 15px;
		img {
			height: 100px;
			max-width: 300px;
		}
	}
	
	.el-button:focus,
	.el-button:hover {
		color: #34495e;
		border-color: #d8e5ec;
		background: #f4f9fc;
	}
</style>