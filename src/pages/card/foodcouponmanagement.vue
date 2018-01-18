<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>	
	</div>
</template>

<script>
	export default {
  		name: 'foodcouponmanagement',
  		data(){
  			return{
  				src:'../../../crmpages/pages/sourcedatamanagement/crmsetting/basicsettings/foodcouponmanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		}
  		
  	}
</script>

<style>
</style>