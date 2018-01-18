<template>
  <div class="newhome03">
		<div class="public_authorization">
			公众账号授权
		</div>
		<div class="step_03">
            <div class="steps">
                <div  @click="to_one">
                  <img :src="img[0]"/>
                  <span>填写公众号信息</span>   
                </div>
                <div  @click="to_two">
                  <img :src="img[2]"/>
                  <span >配置URL和Token</span>
                </div>
                <div>
                  <img :src="img[3]"/>
                  <span >绑定</span>
                </div>
            </div>
            <div class="complate">
                <img :src="wx_08" />
                <h3>绑定成功</h3>
                <span class="_start">请点击“初始化”按钮，进行初始化信息配置</span>
                <div class="next" @click="_start">初始化</div>
            </div>
        </div>
        
	</div>
</template>
<script>
import wx_07 from "@/assets/wx_07.png";
import wx_08 from "@/assets/wx_08.png";
import wx_20 from "@/assets/wx_20.png";
import wx_21 from "@/assets/wx_21.png";
import wx_22 from "@/assets/wx_22.png";
import wx_23 from "@/assets/wx_23.png";
import wx_24 from "@/assets/wx_24.png";
import { configDateAndModel } from "@/api/wxdeploy.js";
export default {
  data() {
    return {
      wx_07,
      wx_08,
      params:{},
      img:[wx_20,wx_21,wx_22,wx_23,wx_24]
    };
  },
  mounted(){
  	 /*****统计埋点*****/
			_czc.push(["_trackEvent", "手动授权第三步初始化", "访问页面"]); //统计流量
  },
  methods: {
    _start(){
        configDateAndModel().then(res=>{
          if(res&&res.result){
               this.$message({
                message: '初始化成功！',
                type: 'success'
              });
              this.$router.push({
              path: "manage_newhome",
              hash: "new"
            });
          }else{
            this.$message({
                showClose: true,
                message: "初始化失败！",
                type: 'error'
              });
          }
        })
    },
    to_one(){
      this.$router.push({
        path: "manage_newhome01",
      });
    },
    to_two(){
      this.$router.push({
        path: "manage_newhome02",
      });
    },
  }
};
</script>
<style   rel="stylesheet/scss" lang="scss">
.newhome03 {
  background: #fff;
  //   height: 526px;
  .public_authorization {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eaf1f6;
    margin: 0 20px;
    padding-left: 10px;
  }
  .step_03 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 22px;
    .steps {
        width: 230*3px;
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
    .complate {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin-top: 91px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      h3{
          margin: 14px;
          font-weight: 700;
          font-size: 16px;
      }
      span{
          color: #9AABB8;
          font-size: 10px;
      }
      .next {
        width: 82px;
        height: 32px;
        background: #0c9aff;
        color: #fff;
        margin-top: 50px;
        line-height: 32px;
        text-align: center;
        border-radius: 5px;
        margin-bottom: 187px;
        cursor: pointer;
      }
    }
  }
}
</style>


