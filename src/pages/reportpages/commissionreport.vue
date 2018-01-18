<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'commissionreport',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/commissionreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>