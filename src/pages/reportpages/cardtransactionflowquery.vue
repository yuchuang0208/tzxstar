<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'cardtransactionflowquery',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/cardtransactionflowquery.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>