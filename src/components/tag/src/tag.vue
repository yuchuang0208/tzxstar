<template>
    <transition :name="closeTransition ? '' : 'el-zoom-in-center'">
    <span
       :class="[
       'tzx-tag',
        tagSize && `tzx-tag--${tagSize}`,
        {'is-hit': hit}
      ]"
      @click="handleClick"
      :style="{color: color,backgroundColor:backgroundColor,cursor:cursor}" >
      <slot></slot>
        <i class="el-tag__close el-icon-close"
        v-if="closable"
        @click="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'ElTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      closeTransition: Boolean,
      color: String,
      cursor : String,
      backgroundColor:String,
      size: String
    },
    methods: {
      handleClick(event) {
        this.$emit('clickThis', event);
      },
      handleClose(event) {
        this.$emit('closeThis', event);
      }
    },
     computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    }
  };
</script>
<style>
.tzx-tag {
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #8391a5;
    text-decoration: none !important;
}	
.tzx-tag .el-icon-close {   
    cursor: pointer;  
}
.tzx-tag  .el-icon-close:before {
    content: "\E60C";
    color:#B8C4CC;
}
.tzx-tag--medium {

	
    padding: 0 8px;
    font-size:14px;
}
.tzx-tag--medium .el-icon-close {
    transform: scale(.5);
}

.tzx-tag--small {
    height: 24px;
    padding: 0 8px;
    line-height: 22px;
}
.tzx-tag--small .el-icon-close {
    transform: scale(.8);
}

.tzx-tag--mini {
    height: 20px;
    padding: 4px 10px;
    line-height: 19px;
    border-radius: 3px;
}
.tzx-tag--mini .el-icon-close {
    margin-left: -10px;
    transform: scale(.5);
}

.tzx-tag--mini .el-tag__close:hover {
    background-color: #48576a;   
     color: #fff;
}

.tzx-tag--mini+.tzx-tag--mini {
    margin-left: 5px;
}


	.tzx-tag:hover{
		cursor: pointer;
        text-decoration: underline;
	}
	
</style>
