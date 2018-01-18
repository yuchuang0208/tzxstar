<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'marketingsmssend',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/marketactivitiesreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>