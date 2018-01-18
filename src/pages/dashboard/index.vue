<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>{{name}}</div>
    <div class='dashboard-text'>{{roles}}<span v-for='role in roles' :key='role'>{{role}}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style>
.dashboard-text {
 text-align: center;
}
</style>
