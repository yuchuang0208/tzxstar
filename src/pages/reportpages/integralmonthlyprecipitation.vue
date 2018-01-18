<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'integralmonthlyprecipitation',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/integralmonthlyprecipitation.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>