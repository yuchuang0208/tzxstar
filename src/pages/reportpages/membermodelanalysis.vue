<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'membermodelanalysis',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/membermodelanalysis.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>