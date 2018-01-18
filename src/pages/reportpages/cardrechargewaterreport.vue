<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'cardrechargewaterreport',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/posreport/storereport/cardrechargewaterreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>