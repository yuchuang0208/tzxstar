<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'wx_userdefined_menu',
  		data(){
  			return{
  				src:'../../../pages/weixin/admin/wx_userdefined_menu.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>