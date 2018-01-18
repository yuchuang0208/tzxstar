<template>
  <div class="newhome02">
		<div class="public_authorization">
			公众账号授权
		</div>
		<div class="step_02">
            <div class="steps">
                <div  @click="_pre">
                  <img :src="img[0]"/>
                  <span>填写公众号信息</span>   
                </div>
                <div>
                  <img :src="img[2]"/>
                  <span >配置URL和Token</span>
                </div>
                <div  @click="_nex">
                  <img :src="img[4]"/>
                  <span class="black">绑定</span>
                </div>
            </div>
            <div class="warn">
                <span>!</span>
                提示：您的公众账号信息已填写完成，请配置URL和Token。 请快速配置完成前往微信公众平台
            </div>
            <div class="login">
                登录微信公众平台：
                <a href="https://mp.weixin.qq.com/" target="_blank">点击登录</a>
            </div>
            <div class="back_config">
                启用服务器配置：
                <!-- <input type="text" placeholder="公众号配置URL：http://www.e7..."> -->
                <input id="urlLink1" type="text" readonly v-model="materialData.content_url1" />
                <span @click="copyUrl(1)">复制</span>
            </div>
            <div class="config">
                <img :src="wx_04" />
            </div>
            <div class="back_config">
                修改授权及接口：
                <!-- <input type="text" placeholder="授权回调页面域名为：www.e7e..."> -->
                <input id="urlLink2" type="text" readonly v-model="materialData.content_url2" />
                <span  @click="copyUrl(2)" >复制</span>
            </div>
            <div class="config">
                <img :src="wx_05" />
            </div>
            <div class="back_config back_config_js">
                
                <!-- <input type="text" placeholder="JS接口安全域名为：www.e7e6..."> -->
                <input id="urlLink3" type="text" readonly v-model="materialData.content_url3" />
                <span  @click="copyUrl(3)">复制</span>
            </div>
            <div class="config">
                <img :src="wx_06" />
            </div>
            <div class="back_config">
                微信支付设置：
            </div>
            <div class="config config_text">
                在微信支付服务商下开通子商户账号、并绑定微信公众号AppID。
                同时设定公众号支付的安全路径修改为子商户的路径地址 
                http://www.e7e6.net/pages/weixin/front2/wallet/
            </div>
            <div class="ctrl">
                <div class="pre" @click="_pre">上一步</div>
                <div class="next" @click="_nex">下一步</div>
            </div>
            
        </div>
        
	</div>
</template>
<script>
import store from "@/store";
import wx_03 from "@/assets/wx_03.png";
import wx_04 from "@/assets/wx_04.png";
import wx_05 from "@/assets/wx_05.png";
import wx_06 from "@/assets/wx_06.png";
import wx_20 from "@/assets/wx_20.png";
import wx_21 from "@/assets/wx_21.png";
import wx_22 from "@/assets/wx_22.png";
import wx_23 from "@/assets/wx_23.png";
import wx_24 from "@/assets/wx_24.png";
import { ishouquan, getMain, saveConfig } from "@/api/wxdeploy.js";
export default {
  data() {
    return {
      wx_03,
      wx_04,
      wx_05,
      wx_06,
      img:[wx_20,wx_21,wx_22,wx_23,wx_24],
      materialData:{
        content_url1:'http://test.e7e6.net',
        content_url2:'http://cs4.meishijia.com',
        content_url3:'http://www.baidu.com',
      },
    };
  },
  store,
  mounted(){
  	 /*****统计埋点*****/
			_czc.push(["_trackEvent", "手动授权第二步", "访问页面"]); //统计流量
  },
  methods: {
    _pre() {
      this.$router.push({
        path: "manage_newhome01",
      });
    },
    _nex() {
      ishouquan().then(res => {
        // console.log('第二步',res)
          if (res[0].config) {
            if(res[0].config.wx_password== "2"){
              this.$message({
                    message: '设置成功！',
                    type: 'success'
                  });
                this.$router.push({
                  path: "manage_newhome03",
                  hash: "new"
                });
            }
                
          }else{
            this.$message({
                showClose: true,
                message: "设置失败",
                type: 'error'
              });
          }
      });
    },
    copyUrl(v) {
        let Url2 = document.getElementById("urlLink"+v);
        Url2.style.display = "inline";
				Url2.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				// Url2.style.display = "none";

				this.$message({
					message: "已复制到剪切板",
					type: "success"
				});
      },

  }
};
</script>
<style   rel="stylesheet/scss" lang="scss">
.newhome02 {
  background: #fff;
  //   height: 526px;
  .public_authorization {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eaf1f6;
    margin: 0 20px;
    padding-left: 10px;
  }
  .step_02 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 20px 0 20px;
    position: relative;
    // img {
    //   width: 230*3px;
    //   height: 37px;
    // }
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
    .warn {
      display: flex;
      height: 34px;
      width: 100%;
      padding: 0 16px;
      margin-top: 17px;
      background: #fffcf2;
      color: #576d7a;
      font-size: 10px;
      justify-content: flex-start;
      align-items: center;
      span {
        display: flex;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #ffbf00;
        color: #fff;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        font-weight: 700;
        margin-right: 5px;
      }
    }
    .login {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      padding-left: 25px;
      align-items: center;
      color: #576d7a;
      a {
        color: #0c9aff;
      }
    }
    .back_config {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      padding-left: 25px;
      align-items: center;
      color: #576d7a;
      input {
        margin-left: 14px;
        width: 230px;
        height: 32px;
        border-radius: 3px;
        padding-left: 8PX;
        color: #576D7A;
        border: 1px solid #D8E5EC;
      }
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #576d7a;
        font-size: 13px;
        padding-left: 8px;
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #576d7a;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #576d7a;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #576d7a;
      }
      span {
        width: 44px;
        height: 22px;
        background: #0c9aff;
        text-align: center;
        line-height: 22px;
        color: #fff;
        border-radius: 4px;
        margin-left: 10px;
      }
    }
    .config {
      height: 196px;
      width: 96%;
      margin-top: 10px;
      display: flex;
      justify-content: flex-start;
      background: #f5f9fb;
      img {
        margin-left: 127px;
        width: 410px;
        height: 164px;
        margin-top: 16px;
      }
    }
    .back_config.back_config_js input {
      margin-left: 126px;
    }
    .config_text.config {
      height: 72px;
      padding-left: 153px;
      padding-top: 16px;
      color: #576d7a;
      margin-bottom: 30px;
    }
    
    .ctrl {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      padding-top: 30px;
      margin-bottom: 30px;
      padding-left: 156px;
      border-top: 1px dashed #EAF1F6;
      .pre {
        width: 82px;
        height: 32px;
        background: #fff;
        color: #34495e;
        line-height: 32px;
        text-align: center;
        border-radius: 5px;
        border: 1px solid #d8e5ec;
        cursor: pointer;
      }
      .next {
        margin-left: 11px;
        width: 82px;
        height: 32px;
        background: #0c9aff;
        color: #fff;
        line-height: 32px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>


