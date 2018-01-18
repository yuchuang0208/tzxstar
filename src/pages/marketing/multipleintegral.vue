<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'multipleintegral',
  		data(){
  			return{
  				src:'../../../pages/crmmanagement/marketingactivities/basicsettings/multipleintegral.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>