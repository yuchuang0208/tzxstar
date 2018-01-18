<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'amountofmonthlyprecipitation',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/amountofmonthlyprecipitation.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>