<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>	
	</div>
</template>

<script>
	export default {
  		name: 'crmcardcommissionset',
  		data(){
  			return{
  				src:'../../../crmpages/pages/sourcedatamanagement/crmsetting/basicsettings/crmcardcommissionset.jsp'+'?_s='+this.$store.state.user.session
  			}
  		}
  		
  	}
</script>

<style>
</style>