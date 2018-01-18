<template>
	<div class="edit_public_container">
		<div class="authorization_header">
			编辑公众号信息
		</div>
        
        <div class="warn">
            <span>!</span>
            填写账号与微信后台一致，方便查看
        </div>
		<div class="basic_wrap">
      
				<div>
					<img :src="wx_pic"/>
					<span>商户LOGO</span>
				</div>
				<div>
					<el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    
					<span>商户二维码</span>
				</div>
				<ul  class="list">
					<li>
                        <div>
                            <span>商户名称：</span>
                            <input type="text"  placeholder="请输入商户名" v-model="shop_name"/>
                        </div>
                        <div>
                            <span>公众号名称：</span>
                            <input type="text"  readonly v-model="wx_name"/> 
                        </div>
                        
                    </li>
					<li>
                        <div>
                            <span>公众号账号：</span>
                            <input type="text"  readonly  v-model="wx_username"/>
                        </div>
                        <div>
                            <span>公众号类型：</span>
                            <input type="text"  readonly  v-model="wx_type"/>
                        </div>
                    </li>
					<li>
                        <div>
                            <span>APPID：</span>
                            <input type="text"  readonly v-model="appid"/>
                        </div>
                    </li>
				</ul>
		</div>
    <div class="dash"></div>
    <div  class="save" @click="save()">保存并同步</div>
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
import { ishouquan, getMain, saveConfig } from "@/api/wxdeploy.js";
import {
  getMaterialMsgPicList,
  delPicInfo,
  getMaterialPicInfo,
  updateMaterialPicName,
  saveMaterialPic
} from "@/api/weixin";
export default {
  name: "public_manage",
  data() {
    return {
      wx_01,
      wx_09,
      wx_10,
      wx_11,
      wx_12,
      wx_13,
      wx_14,
      store_data: {},
      action: "", //上传地址
      listdata: [], //图文
      shop_name:'',
      imageUrl: "",
      appid: "",
      wx_name: "",
      wx_username: "",
      service_type:"",
      wx_type: "",
      wx_pic: "",
      erwei_path: ""
    };
  },
  created() {
    getMain().then(res => {
      this.store_data = res[0];
    
      // this.wx_name=this.store_data.config.wx_name;
      // this.wx_username=this.store_data.config.wx_username;
      // this.service_type_info=this.store_data.config.service_type_info;
      // this.appid=this.store_data.config.appid;
      if (res[0].shouquan == "N") {
        this.wx_pic = this.store_data.config.wx_pic;
        this.qrcode= this.store_data.config.erwei_path;
        this.wx_name= this.store_data.config.wx_name;
        this.shop_name= this.store_data.config.shop_name;
        this.wx_username= this.store_data.config.wx_username;
        this.wx_type= this.store_data.config.wx_type;
        this.appid= this.store_data.config.appid;
      }else{
        //第三方授权
        this.wx_pic = this.store_data.config.head_img;
        this.qrcode= this.store_data.config.qrcode_url;
        this.wx_name= this.store_data.config.wx_name;
        this.shop_name= this.store_data.config.shop_name;
        this.wx_username= this.store_data.config.wx_username;
        this.wx_type= this.store_data.config.service_type_info;
        this.appid= this.store_data.config.appid;
      }
      
    });
  },
  methods: {
    save() {
      var postData = "";
      postData +=
        "shop_name=" + (this.shop_name ? this.shop_name : this.store_data.config.shop_name);
      if(this.imageUrl){
        postData +="&erwei_path=" +this.imageUrl;
      }
      saveConfig(postData).then(res => {
        if (res.success == true) {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 <= 2000;

				if(!isJPG) {
					this.$message.error('图片只能是 JPG/PNG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('图片大小不能超过 2M!');
				}
				return isJPG && isLt2M;
    }
  },
  mounted() {
    
    this.action = '../../../imgServlet?actionType=upload&tenentid=' + this.$store.state.user.tenancyid + '&fileId='; //正式地址  正式环境使用
    // this.action =
    //   "img/imgServlet?actionType=upload&tenentid=" +
    //   this.$store.state.user.tenancyid +
    //   "&fileId="; //代理地址  本地调试时使用
     /*****统计埋点*****/
	_czc.push(["_trackEvent", "编辑公众号信息", "访问页面"]); //统计流量
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.edit_public_container {
  background: #fff;
  padding-bottom: 30px;
  .authorization_header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-weight: 700;
    border-bottom: 1px solid #eaf1f6;
    margin: 0 20px;
    padding-left: 10px;
    align-items: center;
  }
  .warn {
    display: flex;
    height: 34px;
    width: 100%;
    padding: 0 16px;
    margin: 17px 20px 21px 17px;
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
  .basic_wrap {
    display: flex;
    justify-content: flex-start;
    margin-top: 26px;
    padding-bottom: 32.1px;
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
      .upload_img {
        [picture-card] {
          margin: 0;
          padding: 0;
        }
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
      .avatar-uploader {
        margin: 0;
        padding: 0;
        border: 0;
        width: 164px;
        height: 164px;
        margin-top: 15px;
        margin-left: 6.6px;
        margin-bottom: 15.9px;
        .el-upload.el-upload--text {
          margin: 0 !important;
          padding: 0 !important;
          width: 164px;
          height: 164px;
          border: 0;
        }
        .avatar-uploader .el-upload {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin: 0;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
          margin: 0;
          padding: 0;
          width: 164px;
          height: 164px;
          top: 15px;
          left: 6.6px;
          margin-bottom: 15.9px;
        }
      }

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
    .list {
      display: flex;
      flex-direction: column;
      height: 218.9px;
      color: #758896;
      font-size: 13px;
      flex: 2;
      li {
        width: 100%;
        height: 32px;
        display: flex;
        margin-top: 20px;
        div {
          width: 50%;
          height: 32px;
          display: flex;
          margin: 0;
          justify-content: space-between;
          border: 0;
          font-size: 14px;
          padding-right: 30px;
          span {
            width: 95px;
            background: none;
            text-align: left;
            color: #576D7A;
          }
          input {
            width: 70%;
            height: 30px;
            margin-left: 16px;
            padding-left: 8px;
            border: 1px solid #D8E5EC;
            border-radius: 3px;
            color: #34495E;
          }
          ::-webkit-input-placeholder{
            color: #9AABB8;
          }
          :-moz-placeholder{
            color: #9AABB8;
          } 
          ::-moz-placeholder{
            color: #9AABB8;
          }  
          :-ms-input-placeholder{
            color: #9AABB8;
          }
          
        }
      }
    }
  }
  .dash{
    margin: 0 40px;
    border-bottom: 1px dashed #EAF1F6;
  }
  .save {
    display: block;
    width: 110px;
    height: 32px;
    margin-top: 30px;
    background: #0c9aff;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    margin-left: 40px;
  }
}
</style>