<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'fillingandmarketing',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/marketingactivities/basicsettings/fillingandmarketing.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>