<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'memberoverallbusiness',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/memberoverallbusiness.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>