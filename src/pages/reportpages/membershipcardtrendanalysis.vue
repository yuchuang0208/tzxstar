<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'membershipcardtrendanalysis',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/crmreport/basicsettings/membershipcardtrendanalysis.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>