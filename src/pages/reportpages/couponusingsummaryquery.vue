<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'couponusingsummaryquery',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/couponusingsummaryquery.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>