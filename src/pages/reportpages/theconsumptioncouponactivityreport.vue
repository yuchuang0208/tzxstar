<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'theconsumptioncouponactivityreport',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/theconsumptioncouponactivityreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>