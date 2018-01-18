<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'memberoperationanalysisreport',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/memberoperationanalysisreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>