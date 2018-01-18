<template>
<div>
    <transition name="el-zoom-in-bottom">
        <div class="footer transition-box" v-show="isshow">
			<div class="fot_cen" >
			    <p><img src="../../assets/ehuikeslogan.svg"/></p>
			  	<div class="coazuo">
			    	<!--<b>快捷操作</b>
			        <span>创建营销活动</span>
			        <span>营销统计</span>
			        <span>数据报表</span>
			        <span>营销统计</span>-->
			       <img src="../../assets/fot_toj.jpg"  @click="isshow = !isshow"/>
			    </div>
			</div>
		</div>
    </transition>
    <transition name="el-zoom-in-bottom">
	    <div v-show="!isshow" class="footer2 transition-box">
	    	<div class="mybox">
				<img src="../../assets/footer_up.png" @click="isshow = !isshow"/>
			</div>
		</div>
	</transition>
</div>
</template>

<script>
export default {
	name:'WebFooter',
	data(){
	  	return {
	  		isshow:true
	  	}
	 }
}
</script>
<style>
	.footer{
      width:100%; height:50px; 
      line-height:50px; 
      background: #FFFFFF;
	  	box-shadow: 0 0 10px 0 rgba(40,130,219,0.08), inset 0 1px 0 0 #EEEEEE;
      margin-top:10px;overflow:hidden;
      position: fixed;
      bottom: 0;
      z-index:1000;
  }
 	.fot_cen{ width:1275px; margin:0px auto;transition: width .6s; }
 	.fot_cen p{ float:left;}
 	.fot_cen p img{ margin-top:10px; }
 	.fot_cen .coazuo{ float:right; font-size:16px;  height:30px;}
 	.fot_cen .coazuo b{ color:#34495E}
 	.fot_cen .coazuo span{ color: #34495E;border:1px #D9D9D9 dashed; height:26px; line-height:26px; display:inline-table; padding:0px 8px; -webkit-border-radius:2px;
    -moz-border-radius:2px;
    border-radius:2px; font-size:14px; margin:0px 2px;}
    
  .footer2 {
    position: fixed;
    bottom: 0;
    z-index: 1000;
    width: 100%;
 } 
 .mybox{
    width: 1275px;
    margin: 0px auto;
    transition: width .6s;
 }
  .footer2 img{
  	   overflow: hidden;
	   bottom: 0;
	   float: right;
  }
  /*.fot_cen2{ width:100%; background: #F4F9FC;   float:right;right:5%; 
  	
  } */
</style>
