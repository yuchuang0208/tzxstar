/**
 * 可以将该组件 嵌套在 el-dialog 和   el-popover 中 CRM常用  也可以嵌入到其他容器
 * 该组件使用大部分CRM 需求 如有需要 可进行扩展
 */
<template>
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
     			<!-- <cite title="yhqOneData.text">{{yhqOneData.text}}</cite>-->
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
</template>

<script>
	export default{
	    // 父组建传入参数
	    // 在Vue2中组件的props的数据流动改为了只能单向流动，即只能由组件外（调用组件方）通过组件的DOM属性attribute传递props给组件内，
	    // 组件内只能被动接收组件外传递过来的数据，并且在组件内，不能修改由外层传来的props数据。
		props:{
			yhqOneData:Object,
			/**
			 * data的类型必须是Object 
			 * */
		}
	}
	
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/**************优惠券详情 开始*******************/
.viewyhq {
	width: 440px;
	.up {
		margin-top: 16px;
		margin-left: 10px;
		width: 398px;
		height: 76px;
		.left {
			width: 140px;
			height: 76px;
			border-right: 1px dashed #E3F0F6;
			float: left;
			margin-left: 35px;
			.left_up {
				margin-top: 14px;
				cite {
					font-style: normal;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FF6161;
					line-height: 14px;
				}
				tt {
					font-family: PingFangSC-Regular;
					font-size: 30px;
					color: #FF6161;
					line-height: 30px;
					font-style: normal;
				}
			}
			.left_down {
				margin-top: 6px;
				cite {
					font-style: normal;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #576D7A;
					line-height: 12px;
				}
			}
		}
		.right {
			margin-left: 175px;
			width: 230px;
			cite {
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
			em {
				font-style: normal;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #9AABB8;
				line-height: 12px;
				margin-left: 20px;
				padding-top: 19px;
				display: block;
			}

		}
	}
	.down {
		margin-top: 5px;
		margin-left: 48px;
		width: 382px;
		ul {
			list-style: none;
			padding-bottom: 20px;
			li {
				margin-top: 9px;
				cite {
					font-style: normal;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #758896;
					line-height: 12px;
				}
				em {
					font-style: normal;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #34495E;
					line-height: 12px;
				}
			}
			li:nth-child(4) cite {
				display: block;
				float: left;
				width: 60px;
			}
			li:nth-child(4) em {
				display: inline-block;
				width: 310px;
				line-height: 14px;
			}
		}
	}
	.center {
		margin-left: 10px;
		width: 420px;
		height: 12px;
		/*background:green;*/
		border-bottom: 1px dashed #E3F0F6;
	}
}
	/**************优惠券详情 结束*******************/
</style>