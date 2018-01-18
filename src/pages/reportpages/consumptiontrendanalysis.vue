<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'consumptiontrendanalysis',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/consumptiontrendanalysis.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>