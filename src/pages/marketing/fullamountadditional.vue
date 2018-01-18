<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'fullamountadditional',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/marketingactivities/basicsettings/fullamountadditional.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>