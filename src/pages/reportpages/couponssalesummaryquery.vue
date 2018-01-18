<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'couponssalesummaryquery',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/couponssalesummaryquery.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>