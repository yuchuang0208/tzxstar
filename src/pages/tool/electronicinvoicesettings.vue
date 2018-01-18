<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'electronicinvoicesettings',
  		data(){
  			return{
  				src:'../../../crmpages/pages/sourcedatamanagement/operationdataset/basicsettings/electronicinvoicesettings.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>