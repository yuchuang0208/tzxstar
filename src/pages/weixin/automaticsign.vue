<template>
	<div class="wx-auto-sign" v-loading.body="loading">
		<h1 class="wx-nav">自动签名</h1>
		<div class="wx-note">
			<i class="el-icon-warning"></i>编辑完成，请保存后点击右侧“开/关”后，默认每篇文章附带签名
			<el-switch v-model="inUse" active-color="#13ce66" inactive-color="#ff4949" on-text="" off-text="" on-color="#78C75E"></el-switch>
		</div>
		<div class="wx-left">
			<div class="wx-paper-content">
				<h1 class="title">最冷“三九”来了，领个福利暖和暖和~</h1>
				<h3 class="date">2018-01-01<span>天子星</span></h3>
				<div class="wx-top-sign" v-html="topSign"></div>
				<div class="wx-content">俗话说：“三九补一冬。来年无病痛”，其实谁不知道啊，一说时节什么的，那都是给馋嘴找借口。。。</div>
				<div class="wx-bottom-sign" v-html="bottomSign"></div>
				<div class="wx-describe" v-html="describe"></div>
				<div class="wx-option">
					<span>阅读全文</span>
					<span>月度206</span>
					<span>举报</span>
				</div>
			</div>
		</div>
		<div class="wx-right">
			<div class="item">
				<span class="title">顶部签名</span>
				<div class="ueditor">
					<script id="ueditor1" type="text/plain"></script>
				</div>
			</div>
			<div class="item">
				<span class="title">底部签名</span>
				<div class="ueditor">
					<script id="ueditor2" type="text/plain"></script>
				</div>
			</div>
			<div class="item">
				<span class="title">文字描述</span>
				<div class="ueditor">
					<script id="ueditor3" type="text/plain"></script>
				</div>
			</div>
			<div class="item">
				<el-button type="primary" @click="saveSign" size="large">保存</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { getSign, saveSign } from '@/api/weixin';
	export default {
		name: 'weixin-auto-sign',
		data() {
			return {
				loading: false,
				inUse: false, //是否启用
				topSign: "<p>topSign</p>", //顶部签名
				bottomSign: "<p>bottomSign</p>", //底部签名
				describe: "<p>describe</p>", //文字描述
				editor1: null,
				editor2: null,
				editor3: null,
				initEditor1: false,
				initEditor2: false,
				initEditor3: false,

			}
		},
		mounted() {
			/*****统计埋点*****/
			_czc.push(["_trackEvent", "自动签名", "访问页面"]); //统计流量
			/*****editor1******/
			UE.delEditor("ueditor1");
			this.editor1 = UE.getEditor("ueditor1", {
				toolbars: [
					['undo', 'redo', 'bold', 'italic', 'underline', 'fontfamily', 'fontsize', 'link', 'unlink', 'simpleupload', 'insertimage', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify', 'source']
				],
				initialFrameHeight: 200
			});
			this.editor1.addListener("blur", () => {
				this.topSign = this.editor1.getContent();

			});
			this.editor1.addListener("ready", () => {
				this.initEditor1 = true;
				this.editor1.setContent(this.topSign);
			});

			/*****editor2******/
			UE.delEditor("ueditor2");
			this.editor2 = UE.getEditor("ueditor2", {
				toolbars: [
					['undo', 'redo', 'bold', 'italic', 'underline', 'fontfamily', 'fontsize', 'link', 'unlink', 'simpleupload', 'insertimage', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify', 'source']
				],
				initialFrameHeight: 200
			});
			this.editor2.addListener("blur", () => {
				this.bottomSign = this.editor2.getContent();

			});
			this.editor2.addListener("ready", () => {
				this.initEditor2 = true;
				this.editor2.setContent(this.bottomSign);
			});

			/*****editor3******/
			UE.delEditor("ueditor3");
			this.editor3 = UE.getEditor("ueditor3", {
				toolbars: [
					['undo', 'redo', 'bold', 'italic', 'underline', 'fontfamily', 'fontsize', 'link', 'unlink', 'simpleupload', 'insertimage', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify', 'source']
				],
				initialFrameHeight: 200
			});
			this.editor3.addListener("blur", () => {
				this.describe = this.editor3.getContent();
			});
			this.editor3.addListener("ready", () => {
				this.initEditor3 = true;
				this.editor3.setContent(this.describe);
			});
			this.getSign();
		},
		methods: {

			getSign() {
				this.loading = true;
				getSign().then((data => {
					if(data) {
						this.loading = false;
						data = JSON.parse(data[0]);
						this.inUse = data.num_info == 1 ? true : false;
						this.topSign = data.url_info;
						if(this.initEditor1) {
							this.editor1.setContent(this.topSign);
						}
						this.bottomSign = data.image_add;
						if(this.initEditor2) {
							this.editor2.setContent(this.bottomSign);
						}
						this.describe = data.remark;
						if(this.initEditor3) {
							this.editor3.setContent(this.describe);
						}
					} else {
						this.$message({
							message: "获取签名信息失败",
							type: "error"
						});
					}
				}))
			},
			saveSign() {
				this.loading = true;
				let param = {
					url_info: this.topSign,
					remark: this.describe,
					image_add: this.bottomSign,
					num_info: this.inUse ? "1" : "0"
				};
				saveSign(param).then((data => {
					this.loading = false;
					if(data) {
						this.$message({
							message: "保存成功",
							type: "success"
						});
					} else {
						this.$message({
							message: "保存失败",
							type: "error"
						});
					}
				}))
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.wx-auto-sign {
		background-color: #fff;
		h1.wx-nav {
			color: #34495E;
			font-size: 16px;
			border-bottom: 1px solid #EAF1F6;
			padding: 20px 30px;
		}
		.wx-note {
			margin: 10px 30px;
			background: #FFFCF2;
			line-height: 32px;
			i {
				color: #FFBF00;
				padding-right: 5px;
			}
			.el-switch {
				float: right;
				margin: 5px 20px 0 0;
			}
		}
		.wx-left {
			float: left;
			width: 330px;
			height: 660px;
			background: url(../../assets/diancan/phone_scan.png) no-repeat scroll top left;
			background-size: 100% 100%;
			margin: 40px;
			overflow: hidden;
			.wx-paper-content {
				overflow: auto;
				position: relative;
				padding: 10px;
				margin: 77px 0px 0 22px;
				width: 286px;
				height: 505px;
				background: #fff;
				ul,
				li,
				dl,
				ul,
				ol,
				h1,
				h2,
				h3,
				h4,
				h5,
				h6,
				b,
				strong,
				cite,
				em,
				tt,
				p,
				a {
					text-align: inherit;
					font-size: inherit;
					line-height: inherit;
					font-style: inherit;
					font-weight: inherit;
					font-family: inherit;
				}
				strong,
				b,
				B {
					font-weight: bold;
				}
				i,
				em {
					font-style: italic;
				}
				u {
					text-decoration: underline;
				}
				h1.title {
					font-size: 16px;
					padding: 10px 0;
					color: #34495E;
					font-weight: bold;
					line-height: initial;
				}
				h3.date {
					color: #9AABB8;
					font-size: 11px;
					span {
						padding-left: 20px;
						color: #0C9AFF;
					}
				}
				.wx-top-sign,
				.wx-bottom-sign {
					padding: 40px 0;
				}
				.wx-content {
					line-height: initial;
					color: #270000;
				}
				.wx-option {
					width: 100%;
					padding: 20px 0;
					span:nth-child(1) {
						color: #0C9AFF;
					}
					span:nth-child(2) {
						color: #9AABB8;
					}
					span:nth-child(3) {
						padding-right: 20px;
						float: right;
						color: #9AABB8;
					}
				}
			}
		}
		.wx-right {
			overflow: hidden;
			padding: 40px;
			.item {
				padding-bottom: 20px;
			}
			span.title {
				float: left;
				padding-right: 10px;
			}
			.ueditor {
				overflow: hidden;
				display: inline-block;
			}
			.el-button--primary {
				margin-left: 65px;
			}
		}
	}
</style>