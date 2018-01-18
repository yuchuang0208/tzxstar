<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'membercentermanagement',
  		data(){
  			return{
  				src:'../../../pages/weixin/admin/newversion/organlistmanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>