<template>
  <div>
    <iframe  :src='src' class='iframeclass'></iframe>   
  </div>
</template>

<script>
  export default {
      name: 'wechatvote',
      data(){
        return{
          src:'../../../pages/weixin/admin/newversion/wechatvote.jsp'+'?_s='+this.$store.state.user.session
        }
      },
    
    }
</script>

<style>
</style>