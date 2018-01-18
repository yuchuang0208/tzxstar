<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'membergrowthtrendanalysis',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/membergrowthtrendanalysis.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>