<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'organgroupset',
  		data(){
  			return{
  				src:'../../../pages/sourcedatamanagement/crmsetting/basicsettings/organgroupset.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>