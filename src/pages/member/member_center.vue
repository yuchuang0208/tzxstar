<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'memberfilemanagement',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/membermanagement/basicsettings/memberfilemanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>