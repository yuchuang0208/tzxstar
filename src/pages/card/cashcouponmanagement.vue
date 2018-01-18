<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'cashcouponmanagement',
  		data(){
  			return{
  				src:'../../../crmpages/pages/sourcedatamanagement/crmsetting/basicsettings/cashcouponmanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
	
	
</style>