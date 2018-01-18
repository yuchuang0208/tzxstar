<template>
	<div class="public_container">
		<div class="public_authorization">
			公众账号授权
		</div>
		<div  class="wx_authorization">
				<h3>授权登录</h3>
				<div>点击下方按钮进行公众号授权一键登录</div>
				<div   class="one_login"><a  :href="openPlat_url" target="_blank"><img :src="wx_29" />微信公众号授权登录</a></div>
				<div class="commonPattern"  @click='wx_authorization'>或通过“普通模式”手动绑定</div>
		</div>
		<div  class="barcode" v-if="codeshow">
			<p>我的二维码 <span @click="close">×</span></p>
			<img :src="qr"/>
		</div>
    <!-- <iframe v-if="fram" :src="openPlat_url" frameborder="0"></iframe> -->
	</div>
</template>

<script>
import wx_01 from "@/assets/wx_01.png";
import wx_29 from "@/assets/wx_29.svg";
import axios from "axios";
import fetch from "@/utils/fetch";
import store from "@/store";
import QRCode from "qrcode";
import { toAuthorization, openPlatAuthorize } from "@/api/wxdeploy.js";
export default {
  name: "to_authorization",
  data() {
    return {
      wx_01,
      wx_29,
      openPlat_url: "",
      qr: "",
      codeshow: false,
      fram: false
    };
  },
  created() {
    this.authorization();
  },
  methods: {
    wx_authorization() {
      //跳转去授权第一步
      
      let a=1;
      let b=2;
      this.$router.push({
        path: 'manage_newhome01',
        hash: "new",
        query:{a,b}
      });
    },
    authorization() {
      //调用第三方授权并显示二维码
      toAuthorization().then(res => {
        this.openPlat_url =
          res.result +
          "/wechat/openPlat/authorize?tenentid=" +
          store.state.user.tenancyid +
          "&is_new=true";
        // console.log("微信地址", this.openPlat_url);
      });
    },
    _getQart: function() {
      QRCode.toDataURL(this.openPlat_url)
        .then(url => {
          this.qr = url;
          this.codeshow = true;
        })
        .catch(err => {
          console.error(err);
        });

      // With async/await
      const generateQR = async text => {
        try {
        } catch (err) {
          console.error(err);
        }
      };
    },
    close() {
      this.codeshow = false;
    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.public_container {
  background: #fff;
  height: 717px;
  position: relative;
  > iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
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
      width: 230px;
      height: 230px;
      padding: 0 20px;
      border: 2px solid #404040;
      background: #fff;
    }
    > p {
      width: 230px;
      height: 30px;
      background: #404040;
      color: #fff;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      > span {
        font-size: 20px;
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
      width: 247px;
      height: 48px;
      margin-bottom: 43px;
      > a {
        width: 100%;
        height: 100%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #5bbd15;
        border-radius: 3px;
        font-size: 20px;
        img {
          width: 39px;
          height: 31px;
          margin-right: 6px;
        }
      }
    }
    .commonPattern {
      color: #0c9aff;
      cursor: pointer;
    }
  }
}
</style>