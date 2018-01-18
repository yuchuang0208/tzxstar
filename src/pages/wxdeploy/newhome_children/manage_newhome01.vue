<template>
  <div class="newhome01">
		<div class="public_authorization">
			公众账号授权
		</div>
		<div class="step_01">
            <div class="steps">
                <div >
                  <img :src="img[0]"/>
                  <span>填写公众号信息</span>   
                </div>
                <div  @click='_next()'>
                  <img :src="img[1]"/>
                  <span class="black">配置URL和Token</span>
                </div>
                <div>
                  <img :src="img[4]"/>
                  <span  class="black">绑定</span>
                </div>
            </div>
            <div class="forms" >
                    <ul >
                        <li v-for="(key,index) in forms" :key='index'>{{key}}</li>
                    </ul>
                    <div class="places">
                        <input   placeholder="请输入公众号名称"                  v-model="name" />
                        <input   placeholder="请输入微信端的微信号"                   v-model="wx"/>
                        <input   placeholder="必须为英文或数字，长度为3-32字符。"   v-model="token"/>
                        <input   placeholder="请输入微信公众平台后台的APPID"        v-model="ID"/>
                        <input   placeholder="必须为英文或数字，长度为3-32字符。"     v-model="pwd"/>
                    </div>
            </div>
            <div class="dash"></div>
            <div class="next" @click='_next()'>下一步</div>
        </div>
        
	</div>
</template>
<script>
import router from "@/router";
import store from "@/store";
import wx_02 from "@/assets/wx_02.png";
import wx_20 from "@/assets/wx_20.png";
import wx_21 from "@/assets/wx_21.png";
import wx_22 from "@/assets/wx_22.png";
import wx_23 from "@/assets/wx_23.png";
import wx_24 from "@/assets/wx_24.png";
import { ishouquan, getMain, saveConfig } from "@/api/wxdeploy.js";
/*
@blur ="public_name()"
@blur ="public_wx()"
@blur ="public_token()"
@blur ="public_ID()" 
@blur ="public_pwd()"
*/
export default {
  data() {
    return {
      wx_02,
      wx_20,
      forms: ["公众号名称:", "微信号:", "ToKen(令牌):", "APPID:", "应用密匙:"],
      name: "",
      wx: "",
      token: "",
      ID: "",
      pwd: "",
      param: {},
      step1_back:'',
      img:[wx_20,wx_21,wx_22,wx_23,wx_24]
    };
  },
  store,
  router,
  created() {
    
  },
  mounted(){
    /*****统计埋点*****/
			_czc.push(["_trackEvent", "手动授权第一步", "访问页面"]); //统计流量
  },
  methods: {
    public_name() {
      if (!this.trim(this.name)) {
        this.$message({
              message:"公众号名称不能为空",
              type: "error"
            });
        return false;
      } else {
        return true;
      }
    },
    public_wx() {
      if (!this.trim(this.wx)) {
        this.$message({
              message:"微信号不能为空",
              type: "error"
            });
        return false;
      }
      return true;
    },
    public_token() {
      if (this.trim(this.token).length == 0) {
        this.$message({
              message:"ToKen(令牌)不能为空",
              type: "error"
            });
        return false;
      } else {
        if (/^([a-z]|[A-Z]|[0-9]){3,32}$/.test(this.trim(this.token))) {
          return true;
        }
        this.$message({
              message:"ToKen(令牌)必须为英文或数字，长度为3-32字符。",
              type: "error"
            });
        return false;
      }
    },
    public_ID() {
      if (!this.trim(this.ID)) {
        this.$message({
              message:"APPID不能为空",
              type: "error"
            });
        return false;
      }
      return true;
    },
    public_pwd() {
      if (this.trim(this.pwd).length == 0) {
        this.$message({
              message:"应用密匙不能为空",
              type: "error"
            });
        return false;
      } else {
        if (/^([a-z]|[A-Z]|[0-9]){32}$/.test(this.trim(this.pwd))) {
          return true;
        }
        this.$message({
              message:"应用密匙必须为英文或数字，长度为3-32字符。",
              type: "error"
            });
        return false;
      }
    },
    _next() {
      if (
        this.public_name() &&
        this.public_wx() &&
        this.public_token() &&
        this.public_ID() &&
        this.public_pwd()
      ) {
        var param='';
        param+='wx_name='+this.name;
        param+='&wx_username='+this.wx;
        param+='&token='+this.token;
        param+='&appid='+this.ID;
        param+='&appsecret='+this.pwd;
        param+='&shouquan=1';
      
        saveConfig(param).then(res => {
          if (res.success) {
            //保存成功跳转第二部
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.$router.push({
              path: "manage_newhome02",
              hash: "new"
            });
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: "error"
            });
          }
        });
        // let person_msg=this.person_msg;
        // this.$store.dispatch('Per_msg', person_msg);
        // console.log('ffffffffffffffffffffff',this.$store.state.user.per_msg)
      } else {
        return;
      }
    },
    trim(str){
     return str.replace(/(^\s*)|(\s*$)/g,'');
    },
  }
  //   beforeRouteEnter (to, from, next) {
  //       console.log(from)
  //     if(from.path=="/wxdeploy/manage_newhome02"){
  //         this.name=this.$store.state.user.per_msg[0];
  //         this.wx=this.$store.state.user.per_msg[1];
  //         this.token=this.$store.state.user.per_msg[2];
  //         this.ID=this.$store.state.user.per_msg[3];
  //         this.pwd=this.$store.state.user.per_msg[4];
  //     }else{
  //         return
  //     }
  //   }
};
</script>
<style   rel="stylesheet/scss" lang="scss">
.newhome01 {
  background: #fff;
  //   height: 526px;
  .public_authorization {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eaf1f6;
    margin: 0 20px;
    padding-left: 10px;
  }
  .step_01 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 22px;
    .steps {
        width: 656px;
        height: 32px;
        display: flex;
        div{
          flex: 1;
          display: flex;
          justify-content: center;
          color: #fff;
          align-items: center;
          position: relative;
          margin-left: -16px;
          cursor: pointer;
          img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          span{
            position: absolute;
            top: 8px;
            left: 0;
            transform: translateX(50%);
             z-index: 2;
             width: 50%;
             text-align: center;
          }
          .black{
            color: #576D7A ;
          }
          .white{
            color: #fff ;
          }
        }
      }
    }
    .forms {
      display: flex;
      flex-direction: row;
      margin-top: 61px;
      margin-bottom: 10px;
      ul {
        display: flex;
        flex-direction: column;
        width: 94px;
        li {
          color: #576d7a;
          height: 32px;
          margin-bottom: 20px;
          line-height: 32px;
          text-align: left;
        }
      }
      div.places {
        display: flex;
        flex-direction: column;
        width: 230px;
        margin-left: 23px;
        input {
          width: 100%;
          height: 32px;
          margin-bottom: 20px;
          padding-left: 8px;
          border-radius: 3px;
          border: 1px solid #D8E5EC;
        }
        ::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #9aabb8;
          font-size: 12px;
        }
        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #9aabb8;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #9aabb8;
        }
        :-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #9aabb8;
        }
      }
    }
    .dash{
      width: 96%;
      border-bottom: 1px dashed #EAF1F6 ;
    }
    .next {
      width: 82px;
      height: 32px;
      background: #0c9aff;
      color: #fff;
      margin-top: 30px;
      line-height: 32px;
      text-align: center;
      border-radius: 5px;
      margin-bottom: 29px;
      cursor: pointer;
    }
  }

</style>


