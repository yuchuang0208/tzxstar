<template>
	<div>
		<iframe  :src='src' class='iframeclass'></iframe>		
	</div>
</template>

<script>
	export default {
  		name: 'scanningcodeorderingmanagement',
  		data(){
  			return{
  				src:'../../../pages/weixin/admin/newversion/scanningcodeorderingmanagement.jsp'+'?_s='+this.$store.state.user.session
  			}
  		},
  	
  	}
</script>

<style>
</style>