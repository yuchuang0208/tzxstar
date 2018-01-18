<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'materialmanagement',
  		data(){
  			return{
  				src:'../../../pages/weixin/admin/newversion/materialmanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>