<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'memberconsumptionnumbermonth',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/memberconsumptionnumbermonth.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>