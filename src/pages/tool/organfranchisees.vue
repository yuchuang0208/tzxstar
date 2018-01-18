<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'organfranchisees',
  		data(){
  			return{
  				src:'../../../crmpages/pages/framework/basicconfig/organemployeemgt/privmgt/organfranchisees.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>