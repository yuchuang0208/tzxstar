<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'marketingblacklist',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/marketingactivities/basicsettings/marketingblacklist.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>