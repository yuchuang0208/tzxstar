<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'agencysalecarddetailsummaryreport',
  		data(){
  			return{
  				src:'../../../reportpages/reportcenter/posreport/storereport/agencysalecarddetailsummaryreport.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>