<template>
	
</template>

<script>
  export default {
  name: 'login',

  methods: {
    handleLogin() {   	          
          this.$store.dispatch('Login', 'admin').then(() => {
          	
            this.$router.push({ path: '/home' })
          }).catch(() => {
          	
          	this.$router.push({ path: '/home' })
         
          })
        
    }
  },
  created(){
  	this.handleLogin();
  }
}
</script>

<style>
</style>