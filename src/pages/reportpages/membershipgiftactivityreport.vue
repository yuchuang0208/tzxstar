<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'membershipgiftactivityreport',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/membershipgiftactivityreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>