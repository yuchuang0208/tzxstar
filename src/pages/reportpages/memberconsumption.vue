<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'memberconsumption',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/memberconsumption.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>