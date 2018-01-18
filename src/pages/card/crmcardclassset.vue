<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'crmcardclassset',
  		data(){
  			return{
  				src:'../../../crmpages/pages/sourcedatamanagement/crmsetting/basicsettings/crmcardclassset.jsp'+'?_s='+this.$store.state.user.session
  			}
  		}
  		
  	}
</script>

<style>
</style>