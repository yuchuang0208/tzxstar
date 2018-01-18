<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'membercardmanagement',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/membermanagement/basicsettings/membercardmanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>