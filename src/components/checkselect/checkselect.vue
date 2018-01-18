<template>

	<div class="bottom-select" >

		<transition name="fade">
			<div class='checkgroup' v-show="showHideSelect">
				<div class="checkTitle">
					<span class="">已选群体项</span>
					<div class="">
						<span class="clearAll" @click="clearAll"> <i class="el-icon-delete"></i> 全部清空</span>
						<span class="folding" @click="folding">收起</span>
					</div>
				</div>
				<div class="checkcontent" id="checkcontent">

						<template v-if="selectData.time.length > 0">
							<el-form label-width="100px">
								<el-form-item label="会员入会时间:" prop="gender">
									<div class="level">
										<el-tag :key="tag" v-for="tag in selectData.time" closable :disable-transitions="false" @close="handleClose(selectData.time,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.ages.length > 0">
							<el-form label-width="100px">
								<el-form-item label="年龄段:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.ages" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.ages,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.dengji.length > 0">
							<el-form label-width="100px">
								<el-form-item label="会员等级:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.dengji" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.dengji,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.xingbie.length > 0">
							<el-form label-width="100px">
								<el-form-item label="会员性别:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.xingbie" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.xingbie,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.shengri.length > 0">
							<el-form label-width="100px">
								<el-form-item label="会员生日:" prop="gender">
									<div class="level">
										<el-tag  v-for="(tag,index) in selectData.shengri" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.shengri,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.xingzuo.length > 0">
							<el-form label-width="100px">
								<el-form-item label="会员星座:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.xingzuo" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.xingzuo,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.mendian.length > 0">
							<el-form label-width="100px">
								<el-form-item label="会员所属门店:" prop="gender">
									<p class="selectMendianText"> 已选 <span>{{mendianNum}}</span>家门店 </p>
									<div :class="{numActive: isActive}">
										<p class="clickText" @click="loadMnedianMore" ref="clickEvent">展开更多 <i class="el-icon-caret-bottom"></i></p>
										<div class="level">
											<div class="loadMnedianMore" ref="mendian">
												<el-tag v-for="(tag,index) in selectData.mendian" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.mendian,tag)">{{tag.label}}</el-tag>
											</div>
										</div>
									</div>

								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.laiyuan.length > 0">
							<el-form label-width="100px">
								<el-form-item label="会员入会来源:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.laiyuan" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.laiyuan,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.xiaofeizhouqi.length > 0">
							<el-form label-width="100px">
								<el-form-item label="消费周期:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.xiaofeizhouqi" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.xiaofeizhouqi,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.xiaofeicishu.length > 0">
							<el-form label-width="100px">
								<el-form-item label="消费次数:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.xiaofeicishu" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.xiaofeicishu,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.leijixiaofei.length > 0">
							<el-form label-width="100px">
								<el-form-item label="累计消费:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.leijixiaofei" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.leijixiaofei,tag)">{{tag.text}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.danbixiaofei.length > 0">
							<el-form label-width="100px">
								<el-form-item label="单笔消费:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.danbixiaofei" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.danbixiaofei,tag)">{{tag.text}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.pingjunxiaofei.length > 0">
							<el-form label-width="100px">
								<el-form-item label="平均消费:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.pingjunxiaofei" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.pingjunxiaofei,tag)">{{tag.text}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.chuzhicishu.length > 0">
							<el-form label-width="100px">
								<el-form-item label="储值次数:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.chuzhicishu" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.chuzhicishu,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.leijichuzhi.length > 0">
							<el-form label-width="100px">
								<el-form-item label="累计储值:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.leijichuzhi" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.leijichuzhi,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.danbichuzhi.length > 0">
							<el-form label-width="100px">
								<el-form-item label="单笔储值:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.danbichuzhi" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.danbichuzhi,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.leijijifenxiaofei.length > 0">
							<el-form label-width="100px">
								<el-form-item label="累计积分消费:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.leijijifenxiaofei" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.leijijifenxiaofei,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.danbifenxiaofei.length > 0">
							<el-form label-width="100px">
								<el-form-item label="单笔积分消费:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.danbifenxiaofei" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.danbifenxiaofei,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.chuzhiyue.length > 0">
							<el-form label-width="100px">
								<el-form-item label="储值余额:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.chuzhiyue" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.chuzhiyue,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.jifenyue.length > 0">
							<el-form label-width="100px">
								<el-form-item label="积分余额:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.jifenyue" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.jifenyue,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>

						<template v-if="selectData.shengyuyouhuiquan.length > 0">
							<el-form label-width="100px">
								<el-form-item label="剩余优惠券:" prop="gender">
									<div class="level">
										<el-tag v-for="(tag,index) in selectData.shengyuyouhuiquan" :key="index" closable :disable-transitions="false" @close="handleClose(selectData.shengyuyouhuiquan,tag)">{{tag}}</el-tag>
									</div>
								</el-form-item>
							</el-form>
						</template>
				</div>
			</div>
		</transition>

		<div class="bottom-fixd">
			<div class="car-box" @click="openSelect">
				<div ref="box" id="boxContainer">
					<div class="thelid"></div>
					<div class="box"></div>
				</div>
				<span class="show-num">{{totalNum}}</span>
			</div>
			<!-- <p class="expect">预计群体人数： </p> -->
			<div class="operation">
				<!-- <span>计算人数</span> -->
				<span @click="saveGroup">保存群体</span>
			</div>
		</div>
	</div>

</template>

<script>

export default {
	props:["selectData","totalNum","mendianNum"],
	data(){
		return{
			showHideSelect:false,
			inputVisible: false,
        	inputValue: '',
			isActive : false
		}
	},
	mounted(){
		this.openBox();
		if(this.mendianNum > 12){
			this.isActive = true;
		}
	},
	methods: {
		folding(){						// 收起
			this.showHideSelect = false
		},
		openSelect(){					// 展开收起
			this.showHideSelect == false ? this.showHideSelect = true : this.showHideSelect = false;
			this.openBox();
		},
		handleClose(ds,tag) {			// 删除
			if(this.totalNum > 0){
				this.totalNum --;

			}else{
				this.totalNum = 0;
			}
			ds.splice(ds.indexOf(tag), 1);
	    },
		clearAll(){
			for(let key in this.selectData){
				this.selectData[key] = [];
			}
			this.totalNum = 0;
		},
		saveGroup(){
			this.$emit('toSaveGroup');
		},
		openBox(){
			let _this = this;
			this.$refs.box.className="active";

			setTimeout(function(){
				_this.$refs.box.className="";
			},1500)
		},
		loadMnedianMore(){
			this.isActive = false;
			this.$refs.mendian.style.height= "auto";
		}
	},
	watch:{
		mendianNum(curVal,oldVal){
			if(curVal > 12){
				this.isActive = true;
			}
		}
	},

}
</script>

<style rel="stylesheet/scss" lang="scss">

.bottom-select{
	position: fixed;
	z-index: 3;
	bottom: 0;
	width: 1100px;
	margin:0 auto;
	.el-tag + .el-tag {
	    margin-left: 10px;
	}
	.el-tag{
		position: relative;
		padding-right: 20px;
		background: #fff;
		border:1px solid #d8e5ec;
		color: #34495E;
		margin-bottom: 10px;
		height: 28px;
		line-height: 28px;
		padding-left: 8px;
	}
	.el-tag .el-icon-close{
		position: absolute;
		top:6px;
		right:0px;
	}
	.button-new-tag {
	    margin-left: 10px;
	    height: 32px;
	    line-height: 30px;
	    padding-top: 0;
	    padding-bottom: 0;
	}
	.input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
	}
	.selectMendianText{
		margin: 10px 0 6px 0;
		span{
			color: #ec5b20;
		}
	}
	.clickText{
		display: none;
	}
	.numActive{
		.clickText{
			display: block;
			position: absolute;
			right: -74px;
			top: 76px;
			color: #48B3FF;
			cursor: pointer;
		}
	}

	.loadMnedianMore{
		height: 74px;
		overflow-y: hidden;
		position: relative;
	}
	.checkgroup{
		position: absolute;
		z-index: 2;
		bottom: 46px;
		background: #fff;
		width: 100%;
		.checkTitle{
			padding: 0 20px;
			height: 40px;
			line-height: 40px;
			background: #F5F9FB;
			display: flex;
			justify-content:space-between;
			box-shadow: 4px -4px 8px #ccc;
			.folding{
				color: #0C9AFF;
				cursor:pointer;
			}
			.clearAll{
				color: #9aabb8;
				margin-right: 20px;
				cursor:pointer;
			}
		}
		.checkcontent{
			min-height: 200px;
			padding-bottom: 40px;
			max-height: 500px;
			overflow-x: auto;
			.noneSelect{
				text-align: center;
				line-height: 200px;
			}
			.level{
				display: flex;
				flex-wrap:wrap;
				margin-top: 4px;
				.check-style{
					height: 32px;
					line-height: 32px;
					padding: 0 20px;
					border: 1px solid #D8E5EC;
					border-radius: 3px;
					cursor: pointer;
					margin-right: 12px;
					position: relative;
					margin-bottom: 10px;
					background: #fff;
					span{
						-moz-user-select: none;
						-khtml-user-select: none;
						user-select: none;
					}
					img{
						position: absolute;
						right:0;
						bottom:0;
						width: 12px;
						height: 12px;
						display: none;
					}
				}
			}
		}
	}

	.bottom-fixd{
		width: 100%;
		height: 46px;
		opacity: 0.9;
		background: #15263B;
		box-shadow: 0 -1px 14px 0 rgba(47,65,93,0.26);
		position: relative;
		z-index: 3;
		.car-box{
			background: #1B283A;
			width: 52px;
			height: 52px;
			border-radius: 50%;
			position: absolute;
			left:30px;
			top:-26px;
			cursor: pointer;
			text-align: center;
			line-height: 62px;
			.show-num{
				position: absolute;
				top:-6px;
				right: -6px;
				background: #fc464a;
				border-radius: 50%;
				border:1px solid #fff;
				color: #fff;
				min-width: 22px;
				height: 22px;
				line-height: 22px;
				z-index: 2;
			}
		}
		.expect{
			padding-left: 100px;
			line-height: 46px;
			color: #fff;
		}
		.operation{
			display: flex;
			position: absolute;
			right: 0;
			bottom:0;
			span{
				display: block;
				width: 96px;
				height: 46px;
				line-height: 46px;
				text-align: center;
				color: #fff;
				cursor: pointer;
			}
			span:nth-child(1){
				background: #204976;
			}
			span:nth-child(2){
				background: #0C9AFF;
			}
		}
	}

}

.fold-enter-active, .fold-leave-active {
    transition: all .5s;
}
.fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
}


#boxContainer {
	position: relative;
	left:12px;
	top:10px;
}
.thelid {
	position: absolute;
	top: -4px;
	left: -3px;
	width: 36px;
	height: 15px;
	z-index: 1;
	background: url('../../assets/box-lid.png') no-repeat;
	background-size: cover;
	-webkit-transform: rotate(15deg);

}
.active .thelid {
	-webkit-animation: lineAnimate 1s linear alternate;
	animation: lineAnimate 1s linear alternate;
}
.box {
	position: absolute;
	top: 7px;
	left: 0;
	width: 30px;
	height: 20px;
	background: url('../../assets/box.png') no-repeat;
	background-size: cover;
	z-index: 1;
	font-size: 18px;
	color: #fff;
	text-align: center;
	line-height: 40px;
	border-radius: 0 0 5px 5px;
}
@keyframes lineAnimate {
	0% {
		-webkit-transform: rotate(0deg);
		-webkit-transform-origin: 5px 20px;
	}
	50% {
		-webkit-transform: rotate(-22deg);
		-webkit-transform-origin: 5px 20px;
	}
	100% {
		-webkit-transform: rotate(0deg);
		-webkit-transform-origin: 5px 20px;
	}
}


</style>
