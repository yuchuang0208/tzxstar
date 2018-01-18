<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'amountprecipitationoverallanalysis',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/scmreport/storereport/amountprecipitationoverallanalysis.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>