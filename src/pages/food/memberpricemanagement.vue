<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'memberpricemanagement',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/membermanagement/basicsettings/memberpricemanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>