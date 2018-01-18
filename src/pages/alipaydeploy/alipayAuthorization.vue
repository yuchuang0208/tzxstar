<template>
  <div class="ali_all">
    <div class="alipublic_container" v-if="ali_show">
      <div class="authorization_header">
        商户信息
        <!-- <div class="header_right">
          <div @click="edit()"><img :src="wx_15" alt=""/> 编辑信息</div>
          <div @click="menu()"><img :src="wx_16" /> 配置菜单</div>
                  <div  @click="dele()"> 删除授权</div>
        </div> -->
      </div>
      <div class="basic_wrap">
          <div>
            <img :src="wx_pic"/>
            <span>商户LOGO</span>
          </div>
          <div>
            <img :src="qrcode"/>
            <span>商户二维码</span>
          </div>
          <ul>
            <!-- <li>授权获取的token:<span class="blck">{{wx_name}}</span> </li> -->
            <li>app_id:<span class="blck">{{auth_app_id}}</span></li>
            <li>授权用户的user_id：<span class="blck">{{user_id}}</span></li>
            <li>Token(令牌)：<span class="blck">{{app_auth_token}}</span></li>
            <li>授权获取到的code:<span class="blck">{{app_auth_code}}</span></li>
          </ul>
      </div>
    </div>
    <div class="alipayAuthorization" v-if="!ali_show">
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
  </div>
  
</template>

<script>
import wx_01 from "@/assets/wx_01.png";
import wx_09 from "@/assets/wx_09.svg";
import wx_10 from "@/assets/wx_10.svg";
import wx_11 from "@/assets/wx_11.svg";
import wx_12 from "@/assets/wx_12.svg";
import wx_13 from "@/assets/wx_13.svg";
import wx_14 from "@/assets/wx_14.svg";
import wx_15 from "@/assets/wx_15.svg";
import wx_16 from "@/assets/wx_16.svg";
import wx_25 from "@/assets/wx_25.png";
import router from "@/router";

import store from "@/store";
import QRCode from "qrcode";
import {
  aliAuthorization,
  toAuthorization,
  setFourLevelId,
  getAliAuth,
  aligetUserMessage
} from "@/api/alipaydeploy.js";
export default {
  name: "alipayAuthorization",
  data() {
    return {
      wx_01,
      wx_09,
      wx_10,
      wx_11,
      wx_12,
      wx_13,
      wx_14,
      wx_15,
      wx_16,
      store_data: {},
      wx_pic: "",
      qrcode: "",
      wx_name: "",
      shop_name: "",
      wx_username: "",
      service_type: "",
      appid: "",
      ali_data: [],
      app_auth_token: "",
      auth_app_id: "",
      user_id: "",
      app_auth_code: "",
      wx_25,
      openPlat_url: "",
      qr: "",
      codeshow: false,
      check_authorization: null,
      num: 0,
      store,
      ali_show: false,
    };
  },
  created() {
    aligetUserMessage().then(res => {
      var data = res.tenentid;
      getAliAuth(data).then(res => {
        if (res.success) {
          this.ali_show = true;
          this.app_auth_token = res.aliAuth.app_auth_token; //授权获取的token
          this.auth_app_id = res.aliAuth.auth_app_id; //app_id
          this.user_id = res.aliAuth.user_id; //授权用户的user_id
          this.app_auth_code = res.aliAuth.app_auth_code; //授权获取到的code
        } else {
          this.ali_show = false;
        }
      });
    });
    setFourLevelId().then(res => {});
    this.authorization();
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
      aligetUserMessage().then(res => {
        var dat = res.tenentid;
        this.check_authorization = setInterval(() => {
          getAliAuth(dat).then(res => {
            if (res.success) {
              clearInterval(this.check_authorization);
              this.$message({
                message: "授权成功！",
                type: "success"
              });
              this.app_auth_token = res.aliAuth.app_auth_token; //授权获取的token
              this.auth_app_id = res.aliAuth.auth_app_id; //app_id
              this.user_id = res.aliAuth.user_id; //授权用户的user_id
              this.app_auth_code = res.aliAuth.app_auth_code; //授权获取到的code
              this.ali_show = true;
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
      });
    }
  },
  mounted() {
  	 /*****统计埋点*****/
			_czc.push(["_trackEvent", "支付宝授权", "访问页面"]); //统计流量
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.ali_all {
  .alipublic_container {
    background: #fff;
    .authorization_header {
      display: flex;
      justify-content: space-between;
      height: 50px;
      font-weight: 700;
      border-bottom: 1px solid #eaf1f6;
      margin: 0 20px;
      padding-left: 10px;
      align-items: center;
      .header_right {
        display: flex;
        div {
          width: 91px;
          height: 28px;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          background: #fff;
          color: #758896;
          border: 1px solid #d8e5ec;
          img {
            width: 14px;
            height: 14px;
            margin-right: 6px;
          }
        }
        div:hover {
          background: #0c9aff;
          color: #fff;
        }
        .focu {
          background: #0c9aff;
          color: #fff;
        }
        .blur {
          background: #fff;
          color: #758896;
        }
        div:nth-child(2) {
          margin-left: 10px;
        }
        div:nth-child(3) {
          margin-left: 10px;
        }
      }
    }
    .basic_wrap {
      display: flex;
      justify-content: flex-start;
      margin-top: 26px;
      padding-bottom: 30.1px;
      border-bottom: 10px solid #f4f9fc;
      div:first-child {
        width: 187.9px;
        height: 220.9px;
        font-size: 0;
        border: 1px solid #eaf1f6;
        margin-left: 41.4px;
        img {
          width: 164px;
          height: 164px;
          margin-top: 15px;
          margin-left: 6.6px;
          margin-bottom: 15.9px;
        }
        span {
          display: flex;
          height: 32px;
          background: #f4f9fc;
          width: 100%;
          font-size: 14px;
          justify-content: center;
          align-items: center;
        }
      }
      div:nth-child(2) {
        width: 187.9px;
        height: 220.9px;
        font-size: 0;
        margin-left: 20.6px;
        border: 1px solid #eaf1f6;
        margin-right: 51px;
        img {
          width: 164px;
          height: 164px;
          margin-top: 15px;
          margin-left: 6.6px;
          margin-bottom: 15.9px;
        }
        span {
          display: flex;
          height: 32px;
          background: #f4f9fc;
          width: 100%;
          font-size: 14px;
          justify-content: center;
          align-items: center;
        }
      }
      ul:nth-child(3) {
        display: flex;
        flex-direction: column;
        height: 218.9px;
        color: #758896;
        justify-content: space-between;
        font-size: 13px;
      }
      .blck {
        color: #34495e;
      }
    }
    .fens {
      display: flex;
      padding-left: 40px;
      margin-top: 20px;
      flex-wrap: wrap;
      padding-bottom: 30px;
      li {
        display: flex;
        width: 329px;
        margin-top: 30px;
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        div {
          margin-left: 10px;
          height: 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 10px;
          color: #758896;
        }
      }
    }
  }
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
}
</style>