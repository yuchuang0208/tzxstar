<template>
  <div>
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="{path:item.path+'/'+item.children[0].path,hash:'new'}">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon-svg v-if='item.icon'  :icon-class="item.icon" /> {{item.children[0].name}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <icon-svg v-if='item.icon' style='font-size:20px' :icon-class="item.icon" /> {{item.name}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link v-else class="menu-indent" :to="{path:item.path+'/'+child.path,hash:'new'}">
            <el-menu-item :index="item.path+'/'+child.path">
            	
              {{child.name}}
              <img src='../../assets/activity/newtitle.png' class='newtilte' v-if='menus.indexOf(child.path)!=-1' />
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  data(){
  	return{
  		menus:['member_profile','activitymanagement','dataAnalysis','dataQuery','anquanzhenduan','electroniccoupon','crmcardclassset','cardAdministration','couponList','amountadjustment','integraladjustment','cardruleset']
  	}
  },
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu li {
    list-style: none;
    line-height:30px;
}

.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}
.newtilte{
	width:36px;
	height: 18px;
	position: absolute;
	top:-9px
}
.el-submenu .el-menu-item {
	height:30px;
  margin-left: 0px !important;
  font-size: 14px;
}
.el-submenu .el-menu-item:hover {
	  height:30px;
    background: #50D6A1;
    color: #ffffff;
}

.el-submenu .el-submenu__title:hover {
   line-height:56px !important;
   height:56px!important; 
}

.el-submenu .el-submenu__title{
	padding-left:20px !important;
	font-size: 16px;
}
/*左侧菜单子菜单样式*/
.el-menu .menu-indent {
	height:30px;
	line-height:30px;
}
/*左侧菜单鼠标点击的样式*/
.el-menu-item.is-active {
    background: #50D6A1;
    color: #ffffff;
}

/*左侧菜单鼠标点击的样式*/
.el-menu .menu-indent:nth-last-of-type(1){
	height:44px;
	line-height:44px;
  background: #FFFFFF; 
}

</style>

