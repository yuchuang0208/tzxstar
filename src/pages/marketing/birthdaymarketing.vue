
<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'birthdaymarketing',
  		data(){
  			return{
  				src:'../../../crmpages/pages/crmmanagement/marketingactivities/basicsettings/birthdaymarketing.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  		created(){
  		},
  	
  	}
</script>

<style>
</style>