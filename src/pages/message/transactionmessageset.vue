<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'transactionmessageset',
  		data(){
  			return{
  				src:'../../../pages/sourcedatamanagement/crmsetting/basicsettings/transactionmessageset.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>