<template>
  <div class="wx_show">
      <div class="public_container" v-if="sh_ou">
        <div class="authorization_header">
          商户信息
          <div class="header_right">
            <div @click="edit()" ><img :src="wx_15" alt=""/> 编辑信息</div>
            <div @click="menu()" ><img :src="wx_16" /> 配置菜单</div>
            <div  @click="dele()" > <img :src="wx_30" />删除授权</div>
            <div  @click="init()" > <img :src="wx_31" />同步消息模板</div>
          </div>
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
              <li>公众号名称：<span class="blck">{{wx_name}}</span> </li>
              <li>商户名称：<span class="blck">{{shop_name}}</span></li>
              <li>公众号账号：<span class="blck">{{wx_username}}</span></li>
              <li>公众号类型：<span class="blck">{{service_type}}</span></li>
              <!-- <li>Token(令牌)：<span class="blck">tzx</span></li> -->
              <li>APPID：<span class="blck">{{appid}}</span></li>
              <!-- <li>应用秘钥：<span class="blck">7e09ab989fb63d768d9d39ecb38fba1c</span></li> -->
            </ul>
        </div>
        <div class="authorization_header">
          粉丝信息
        </div>
        <ul class="fens">
          <li>
            <img :src="wx_09"/>
            <div>
              <span>粉丝数量</span>
              <span>{{store_data.count?store_data.count.sub:''}}人</span>
            </div>
          </li>
          <li>
            <img :src="wx_14"/>
            <div>
              <span>今日新增粉丝</span>
              <span>{{store_data.count?store_data.count.sub_today:''}}人</span>
            </div>
          </li>
          <li>
            <img :src="wx_10"/>
            <div>
              <span>会员数量</span>
              <span>{{store_data.count?store_data.count.bind:''}}人</span>
            </div>
          </li>
        
          <li>
            <img :src="wx_13"/>
            <div>
              <span>今日新增会员</span>
              <span>{{store_data.count?store_data.count.bind_today:''}}人</span>
            </div>
          </li>
          <li>
            <img :src="wx_12"/>
            <div>
              <span>今日取消关注</span>
              <span>{{store_data.count?store_data.count.unsub_today:''}}人</span>
            </div>
          </li>

        </ul>
      </div>
      <div class="to_public_container" v-if="!sh_ou">
        <div class="public_authorization">
          公众账号授权
        </div>
        <div  class="wx_authorization">
            <h3>授权登录</h3>
            <div>点击下方按钮进行公众号授权一键登录</div>
            <div   class="one_login"><a  :href="openPlat_url"><img :src="wx_29" />微信公众号授权登录</a></div>
            <div class="commonPattern"  @click='wx_authorization'>或通过“普通模式”手动绑定</div>
        </div>
        <div  class="barcode" v-if="codeshow">
          <p>我的二维码 <span @click="close">×</span></p>
          <img :src="qr"/>
        </div>
        <!-- <iframe v-if="fram" :src="openPlat_url" frameborder="0"></iframe> -->
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
import wx_29 from "@/assets/wx_29.svg";
import wx_30 from "@/assets/wx_30.svg";
import wx_31 from "@/assets/wx_31.svg";
import fetch from "@/utils/fetch";
import store from "@/store";
import QRCode from "qrcode";
import {
  ishouquan,
  clearOpenPlatAuthorInfo,
  templateInit,
  toAuthorization,
  openPlatAuthorize
} from "@/api/wxdeploy.js";
import router from "@/router";
export default {
  name: "manage_newhome",
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
      wx_30,
      wx_31,
      store_data: {},
      router: router,
      wx_pic: "",
      qrcode: "",
      wx_name: "",
      shop_name: "",
      wx_username: "",
      service_type: "",
      appid: "",
      wx_29,
      openPlat_url: "",
      qr: "",
      codeshow: false,
      fram: false,
      sh_ou: false,
    };
  },
  created() {
    this.authorization();
    ishouquan().then(res => {
      // console.log("授权了");
      this.store_data = res[0];
      if (res[0].isShouQuan == "1") {
          this.sh_ou=true;
          if (res[0].shouquan == "N") {
            this.wx_pic = this.store_data.config.wx_pic;
            this.qrcode = this.store_data.config.erwei_path;
            this.wx_name = this.store_data.config.wx_name;
            this.shop_name = this.store_data.config.shop_name;
            this.wx_username = this.store_data.config.wx_username;
            this.service_type = this.store_data.config.wx_type;
            this.appid = this.store_data.config.appid;
          } else {
            //第三方授权
            this.wx_pic = this.store_data.config.head_img;
            this.qrcode = this.store_data.config.qrcode_url;
            this.wx_name = this.store_data.config.wx_name;
            this.shop_name = this.store_data.config.shop_name;
            this.wx_username = this.store_data.config.wx_username;
            this.service_type = this.store_data.config.service_type_info;
            if(this.service_type==2){
              this.service_type='服务号'
            }else{
              this.service_type='订阅号'
            }
            this.appid = this.store_data.config.appid;
          }
      } else {
          this.sh_ou=false;
      }
    });
  },
  methods: {
    menu() {
      this.$router.push({
        path: "MenuSet",
        hash: "new"
      });
    },
    edit() {
      this.$router.push({
        path: "edit_public",
        hash: "new"
      });
    },
    dele() {
      clearOpenPlatAuthorInfo().then(res => {
        if (res.success) {
          this.$message({
            message: "清除成功！",
            type: "success"
          });
          this.sh_ou=false;
        } else {
          this.$message({
            message: "清除失败！",
            type: "error"
          });
        }
      });
    },
    init() {
      // alert()
      templateInit().then(res => {
        if (res.result) {
          this.$message({
            message: "同步消息模板成功！",
            type: "success"
          });
        } else {
          this.$message({
            message: "同步消息模板失败！",
            type: "error"
          });
        }
      });
    },
    wx_authorization() {
      //跳转去授权第一步

      let a = 1;
      let b = 2;
      this.$router.push({
        path: "manage_newhome01",
        hash: "new",
        query: { a, b }
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
  },
  mounted() {
    // console.log("aaa", this.store_data);
    /*****统计埋点*****/
			_czc.push(["_trackEvent", "微信授权首页", "访问页面"]); //统计流量
  },
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.wx_show{
  .public_container {
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
        border: 1px solid #d8e5ec;
      }
      div:nth-child(3) {
        margin-left: 10px;
      }
      div:nth-child(4) {
        margin-left: 10px;
        width: 115px;
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
.to_public_container {
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
}

</style>