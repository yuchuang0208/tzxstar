<template>
	<div class="wx-material-preview">
		<h1>素材预览</h1>
		<div class="note" v-if="showNote">此为临时链接，仅用于文章预览，将在短期内失效<i class="el-icon-close" @click="showNote=false"></i></div>
		<section>
			<div class="title">{{materialData.title}}</div>
			<div class="update">{{materialData.update_date}}<span>{{materialData.author}}</span></div>
			<div class="content" v-html="materialData.content"></div>
			<div class="copy" @click="copyUrl">点击复制地址<input id="urlLink" type="text" v-model="materialData.content_url" /></div>
		</section>
	</div>
</template>

<script>
	import { selMetialDetialInfo } from '@/api/weixin';
	export default {
		name: 'weixin-menu-set',
		data() {
			return {
				showNote: true,
				materialData: {
					"content": "<p><span style=\"color: rgb(64, 64, 64); font-family: &quot;Microsoft Yahei&quot;; font-size: 18px; text-align: justify; text-indent: 36px; background-color: rgb(255, 255, 255);\">据台湾媒体报道，艺人陈乔恩惊传在台北因酒驾被捕，今早近9时戴着口罩遭大安分局依公共危险罪移送台北地检署。经检察官讯问后，陈乔恩于上午10时35分依公共危险罪谕令10万元台币（约合2万元人民币）交保候传。vxcvxcvxcvxv<\/span><\/p>",
					"author": "网易娱乐",
					"title": "台媒曝陈乔恩因酒驾被捕 交2万元保释金等待开庭",
					"update_date": "2018-01-05",
					"digest": "台媒曝陈乔恩因酒驾被捕 交2万元保释金等待开庭",
					"content_url": "http://mp.weixin.qq.com/s?__biz=MzA4MDA4ODcxOQ==&mid=502710072&idx=1&sn=f4507d3f3e2b8e9eca965d597b1fbb14&chksm=07ab84d830dc0dce0b527fadb98518e90c148156d0b5adcec8ac8274198a593ea46f31323ab7#rd"
				}
			}
		},
		mounted() {
			/*****统计埋点*****/
			_czc.push(["_trackEvent", "素材预览", "访问页面"]); //统计流量

			/*****选择默认*****/
			this.getData();
		},
		methods: {

			//获取预览数据
			getData() {
				selMetialDetialInfo("pic_id=" + this.$route.query.id).then((data => {
					if(data) {
						this.materialData = data;
					} else {
						this.$message({
							message: "获取预览信息失败",
							type: "error"
						});
					}
				}))
			},
			copyUrl() {
				let Url2 = document.getElementById("urlLink");
				Url2.style.display = "inline";
				Url2.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				Url2.style.display = "none";

				this.$message({
					message: "已复制到剪切板",
					type: "success"
				});
			}

		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.wx-material-preview {
		background-color: #fff;
		min-height: 500px;
		h1 {
			color: #34495E;
			font-size: 16px;
			border-bottom: 1px solid #EAF1F6;
			padding: 20px 30px;
		}
		.note {
			margin: 10px 30px;
			background: #FFFCF2;
			line-height: 32px;
			i {
				padding: 10px;
				float: right;
				cursor: pointer;
				font-size: 12px;
			}
			i:before {
				font-size: 12px;
			}
		}
		section {
			width: 720px;
			padding: 20px;
			margin: 0 auto;
			.title {
				padding: 0 10px;
				font-size: 20px;
				font-weight: bold;
				line-height: 50px;
				border-bottom: 1px solid #ccc;
			}
			.update {
				line-height: 40px;
			}
			.content {
				padding-top: 20px;
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
				p {
					text-indent: 30px !important;
					span {
						line-height: 30px;
					}
				}
			}
			.copy {
				padding-top: 20px;
				color: rgb(12, 154, 255);
				text-decoration: underline;
				cursor: pointer;
				input {
					display: none;
				}
			}
		}
	}
</style>