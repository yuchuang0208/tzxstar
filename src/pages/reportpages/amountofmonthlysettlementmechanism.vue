<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'amountofmonthlysettlementmechanism',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/amountofmonthlysettlementmechanism.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>