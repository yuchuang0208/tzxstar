<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'sentsmsquery',
  		data(){
  			return{
  				src:'../../../pages/sourcedatamanagement/crmsetting/basicsettings/sentsmsquery.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>