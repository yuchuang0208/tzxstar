<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'wechatreporting',
  		data(){
  			return{
  				src:'../../../pages/reportcenter/operationreport/basicsettings/wechatreporting.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>