<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'integraltransactionqueryreport',
  		data(){
  			return{
  				src:'../../../pages/reportcenter/crmreport/basicsettings/integraltransactionqueryreport.js'+'?_s='+this.$store.state.user.session 			                       			
  			}
  		},
  	
  	}
</script>

<style>
</style>