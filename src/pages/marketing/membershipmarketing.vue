<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'membershipmarketing',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/marketingactivities/basicsettings/membershipmarketing.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>