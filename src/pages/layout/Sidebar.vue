<template>
  <el-menu mode="vertical" unique-opened   :default-active="$route.path">
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem},
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.el-menu {
	height:auto;  
  line-height:56px;
  background: #F4F9FC !important;
  /*background: #ffffff;*/
  /*background: url(../../assets/left_tpbj.jpg) repeat-x #FEFEFE;*/
}
.el-submenu .el-submenu__title {
    font-size: 16px;
    height:56px;
    line-height: 60px;
}
.el-menu-item, .el-submenu__title {
    font-size: 14px;
    color: #48576a;
    padding: 0 10px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    background:#fff;
}
.el-submenu__title{
	/*background: url(../../assets/left_tpbj.jpg) repeat-x #FEFEFE;*/
	background-image: linear-gradient(0deg, #FFFFFF 65%, #F4F9FC 100%);
}
.el-menu-item{
	padding-left:50px;
}
.el-menu a{
	display:block;
	line-height:30px;
}

.el-menu a li{
	padding-left:37px !important;
}
.el-submenu .el-submenu__title{
	padding-left:10px !important;
}

.el-submenu__icon-arrow {
    position: absolute;
    top: 55%;
    right: 20px;
    transition: transform .3s;
    font-size: 12px;
}
 .el-icon-arrow-down:before {
 	  font-size:8px;
 	  color: #D8D8D8;
    content: "\E61C";
}
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow:before{
	  font-size:8px;
 	  color: #D8D8D8;
	  content: "\E619";
    -ms-transform: rotate(180deg);
    transform: rotateZ(180deg);
}
</style>
