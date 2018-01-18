<template>
  <div class="alipayAuthorization">
    <div class="public_authorization">
      公众账号授权
    </div>
    <div class="wx_authorization">
        <h3>授权登录</h3>
        <div>点击下方按钮进行支付宝授权一键登录</div>
        <div   class="one_login" ><a @click="_getQart"><img :src="wx_25"/>支付宝授权登录</a></div>
    </div>
    <div  class="barcode" v-if="codeshow">
      <p>我的二维码 <span @click="close">×</span></p>
      <img :src="qr"/>
    </div>
    
  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";
import wx_01 from "@/assets/wx_01.png";
import wx_25 from "@/assets/wx_25.png";
import axios from "axios";
import QRCode from "qrcode";
import {
  aliAuthorization,
  toAuthorization,
  setFourLevelId,
  getAliAuth
} from "@/api/alipaydeploy.js";
export default {
  name: "alipay_manager",
  data() {
    return {
      wx_01,
      wx_25,
      openPlat_url: "",
      qr: "",
      codeshow: false,
      check_authorization: null,
      num: 0,
      store,
    };
  },
  router,
  created() {
    setFourLevelId().then(res => {});
    this.authorization();
  },
  mounted(){
    // let msg='welcome to vue';
    //     this.$store.dispatch('Alipay', msg);
    //     console.log('ffffffffffffffffffffff',this.$store.state.user.ali_data)
  },
  methods: {
    authorization() {
      //调用第三方授权并显示二维码
      toAuthorization().then(res => {
        this.openPlat_url =
          res.result +
          "/wechat/AlipayToken/getBillAppraiseList?tenancy_id=" +
          store.state.user.tenancyid;
        // console.log(
        //   res.result +
        //     "/wechat/AlipayToken/getBillAppraiseList?tenancy_id=" +
        //     store.state.user.tenancyid
        // );
      });
    },
    _getQart: function() {
      QRCode.toDataURL(this.openPlat_url)
        .then(url => {
          // console.log("qqqqqqqqqq", url);
          this.qr = url;
          this.codeshow = true;
          this.lunxun();
        })
        .catch(err => {
          console.error(err);
        });

      // With async/await
      const generateQR = async text => {
        try {
          // console.log(await QRCode.toDataURL(text));
        } catch (err) {
          console.error(err);
        }
      };
    },
    close() {
      this.codeshow = false;
      clearInterval(this.check_authorization);
    },
    lunxun() {
      this.check_authorization = setInterval(() => {
        getAliAuth().then(res => {
          if (res.success) {
            clearInterval(this.check_authorization);
            
            this.$message({
              message: "授权成功！",
              type: "success"
            });
            window.location.hash='#/alipaydeploy/alipayAuthorization#new';
          } else {
            this.num++;
            //超过2*150s重新清除
            if (this.num >= 150) {
              clearInterval(this.check_authorization);
              this.$message({
                message: "请求超时" + res.msg,
                type: "error"
              });
            }
          }
        });
      }, 2000);
    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.alipayAuthorization {
  background: #fff;
  position: relative;
  .barcode {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
      width: 280px;
      height: 280px;
      padding: 20px;
      border: 2px solid #404040;
      background: #fff;
    }
    > p {
      width: 280px;
      height: 40px;
      background: #404040;
      color: #fff;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      > span {
        font-size: 28px;
        cursor: pointer;
      }
    }
  }
  .public_authorization {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eaf1f6;
    margin: 0 20px;
    padding-left: 10px;
  }
  .wx_authorization {
    display: flex;
    height: 667px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 16px;
      font-weight: 700;
      color: #34495e;
    }
    div:nth-child(2) {
      color: #576d7a;
      margin: 20px 0;
    }
    .one_login {
      width: 212px;
      height: 48px;
      margin-bottom: 43px;
      color: #fff;
      background: #00a3ed;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      cursor: pointer;
      border-radius: 3px;
      overflow: hidden;
      > a {
        width: 100%;
        height: 100%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 5px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>