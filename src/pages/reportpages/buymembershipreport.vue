<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'buymembershipreport',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/buymembershipreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>