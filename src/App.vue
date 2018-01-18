<template>
  <div id="app" class="myapp">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
   
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
  @import './styles/icon/iconfont.css';
  .myapp{
  	    background: #F4F9FC;
  	    height:auto;
  	    min-height:600px;
  	    overflow-x:hidden;
  }
   .mendian_left .el-tree .el-tree-node .el-tree-node__content .el-checkbox {
    	float: right; 
   }
  .tzxselecttree .tzxselecttree_left .el-tree .el-tree-node{
		width:292px;
	}
   .tzxselecttree .tzxselecttree_left .el-tree .el-tree-node .el-tree-node__content .el-checkbox{
		float: right!important;
	}
  .mypop{
    	background-color: #F5FBFE;
	}
	.el-tree-node__content:hover{
		background: #EAF5FC;
	}
	/*.el-popover{
		padding-left:0px;
		padding-bottom:10px;
	}*/
	.el-popover {
     padding: 0px !important; 
	}
	
	.el-tree-node__label {
    font-size: 14px;
    color: #34495E;
  }
  .el-table__empty-block {
        position: relative;
        background: url(assets/activity/empty.png) no-repeat;      
        min-height: 110px;
        margin: 20px auto; 
        text-align: center;   
        width: 80px !important;   
}
.el-table__empty-text {
    position: absolute;
    left: 50%;
    top: 100%;
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    color: #5e7382;
    width: 80px;
}
  .mendian_left .el-input__inner{
		webkit-appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 3px;
    border: 1px solid #D8E5EC;
    /* border: none; */
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    /* outline: 0; */
    padding: 3px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-top: 10px;
    width: 246px;
    margin-left: 16px;
	}
	.mendian_left .el-input__inner:hover{
		  border: 1px solid #B8C4CC; 
	}
	.mendian_left .el-checkbox__inner{
		border: 1px solid #D8E5EC ;
		border-radius: 2px;
	}
	.mendian_left .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #20a0ff;
    border: 1px solid #20a0ff;
  }
	.mendian_left .el-checkbox__input.is-checked .el-checkbox__inner{
		background: #0C9AFF;
		border-radius: 2px;
		border: 1px solid #20a0ff;
	}
	.el-tree-node__expand-icon {
    cursor: pointer;
    width: 0;
    height: 0;
    margin-left: 16px;
    border: 6px solid transparent;
    border-right-width: 0;
    border-left-color: #BDCCD7;
    border-left-width: 7px;
    -ms-transform: rotate(0);
    transform: rotate(0);
    transition: transform .3s ease-in-out;
  }
  
  .mendian_left .el-tree-node__content {
    line-height: 20px;
    height: 32px;
    cursor: pointer;
    padding-top: 6px;
	}
	
	/*.el-badge__content, .el-message__group p, .el-progress-bar__inner, .el-steps.is-horizontal, .el-tabs__nav, .el-tag, .el-time-spinner, .el-tree-node, .el-upload-list__item-name {
	    white-space: nowrap !important;	}
	*/
   /**{font-size:62.5%;}*/
  
  .mendian_left .el-checkbox, .el-checkbox__input {
    cursor: pointer;
    white-space: pre-line;
  }
  
  .mendian_left .el-badge__content, .el-message__group p, .el-progress-bar__inner, .el-steps.is-horizontal, .el-tabs__nav, .el-tag, .el-time-spinner, .el-tree-node, .el-upload-list__item-name {
    white-space: pre-line;
  }
	.app-wrapper .sidebar-wrapper{
		  	overflow: hidden;
		    box-shadow: 0 0px 5px 0 #DDE9F0;
    		margin-left: 5px;
	}
	.mendian_left .el-checkbox{
		  float: right;
      margin-right: 16px;
	}
	.el-tree-node{
		width:278px;
	}
	
	.el-submenu .el-menu-item{
		min-width:158px;
	}
	.zotpah2 .el-button--default:hover {
	    background: #ffffff;
	}
	/**修改复选框的样式 开始**/
	.el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #d8e5ec;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    /* transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46); */
	}
	.el-checkbox__inner::after {
    box-sizing: content-box;
    content: "";
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 3px;
    position: absolute;
    top: 0px !important;
    -ms-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 4px;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    -ms-transform-origin: center;
    transform-origin: center;
  }
  
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background: #0c9aff;
    border-radius: 2px;
    border: 1px solid #20a0ff;
 }
 /**修改复选框的样式 结束**/
  
</style>
