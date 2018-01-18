<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'memberdaybusinessstatistics',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/posreport/storereport/memberdaybusinessstatistics.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>