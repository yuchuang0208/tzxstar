<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'rechargepaymentmethodreport',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/operationreport/basicsettings/rechargepaymentmethodreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>