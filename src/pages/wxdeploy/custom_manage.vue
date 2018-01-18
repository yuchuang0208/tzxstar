<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'custom_manage',
  		data(){
  			return{
  				src:'../../../pages/weixin/admin/custom_manage.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>