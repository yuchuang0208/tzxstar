
<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'couponsrecycling',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/transactionmanagement/basicsettings/couponsrecycling.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	}
</script>

<style>
</style>