<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'muchmultiplecreditmanagement',
  		data(){
  			return{
  				src:'../../../pages/crmmanagement/marketingactivities/basicsettings/muchmultiplecreditmanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>