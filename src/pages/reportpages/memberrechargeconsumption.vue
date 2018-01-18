<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'memberrechargeconsumption',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/memberrechargeconsumption.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>