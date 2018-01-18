<template>
	<div class="mypwd" v-show="isshow">
		<em><span>修改密码</span></em>
		<p>
			<el-form autoComplete="on" :rules="loginRules" :model="updatePasswordForm"  ref="updatePasswordForm" :label-position="labelPosition" label-width="75px" >
			  <el-form-item label="用户名:">
			     {{updatePasswordForm.user_name}}
			  </el-form-item>
			  
			  <el-form-item label="旧密码:" prop='password'>
			    <el-input name='password' placeholder="请输入原密码" type='password' v-model="updatePasswordForm.password"></el-input>
			  </el-form-item>
			  <el-form-item label="新密码:" prop='newpass'>
			    <el-input name='newpass' placeholder="请输入新密码" type='password' v-model="updatePasswordForm.newpass"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<div style='margin-left: 40px;'>
		  			<el-button size='large' @click="quxiao">取消</el-button>
		   			<el-button size='large' type="primary" :loading='loading' @click="onSubmit">确定</el-button>
			  	</div>
			  
			  </el-form-item>
			</el-form>
		</p>
		
		
	</div>
</template>

<script>
	import md5 from 'js-md5';
   
export default {
	
	
    data() {
     
      return {
      	isshow:true,
        labelPosition: 'right',
        updatePasswordForm: {
          session:this.$store.state.user.session,
          user_name: this.$store.state.user.name?this.$store.state.user.name:'admin',
          password: '',
          newpass: '',
          employee_id:this.$store.state.user.employeeid
        },
        loginRules: {
	       
	        password: [{ required: true,message:'请输入原密码', trigger: 'blur'} ],
	        newpass: [{ required: true, message:'请输入新密码',trigger: 'blur' }],
	    },
        loading: false
      }
    },
    methods:{
    	onSubmit(){
    	 _czc.push(["_trackEvent", "修改密码", "提交"]);//统计流量
		 this.$refs.updatePasswordForm.validate(valid => {
	        if (valid) {
	          this.loading = true		         
	          let data ='employee_id='+this.$store.state.user.employeeid
	                  +'&user_name='+this.updatePasswordForm.user_name
	                  +'&password='+md5(this.updatePasswordForm.password)
	                  +'&newpass='+md5(this.updatePasswordForm.newpass);
	         
	          this.$store.dispatch('UpdatePass', data).then(() => {
	            this.loading = false
	     
	          }).catch(() => {
	          	this.$message({
			          showClose: true,
			          message: '网络异常',
			          type: 'error'
			        });
	            this.loading = false
	          })
	        } else {
	          return false
	        }
	      })
    	},
    	quxiao(){
    		//获取当前标签页路径
    		window.history.back();
    	}
   },
   created(){
			_czc.push(["_trackEvent", "更新密码", "点击"]);//埋点统计
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" >
 .mypwd{
 	display: table;
 	width:98%;
 	height:338px;
 	background:#fff;
 	border-radius: 3px;
 	margin-top:10px;
 	margin-left:20px;
 	.el-input, .el-input__inner {
     width: 240px;
     display: inline-block;
    }
 }
 .mypwd em{
 	height: 51px;
    line-height: 51px;
    display: block;
    border-bottom: 1px solid #eaf1f6;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 16px;
    font-style: normal;
 }
 .mypwd .el-form-item__error{
 	left: 40px !important;
 }
 .mypwd em span{
 	 margin-left: 10px;
 }
 .mypwd p{
 	font-size:14px;
 	width:33%;
 	margin-left:31%;
 	margin-top:30px;
 }	
 .mypwd .el-input__inner {
 	width: 230px;
    height: 32px;
    background: #FFFFFF;
    border: 1px solid #D8E5EC;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9AABB8;
    line-height: 14px;
    padding: 3px 8px;
 }
 .mypwd .el-form-item {
    margin-bottom: 20px; 
 }
 .mypwd .el-form-item:nth-child(4) {
    margin-bottom: 30px;
 }
 


</style>