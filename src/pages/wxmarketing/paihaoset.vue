<template>
    <div class="paihaoset">
            <div class="divTwo_set">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="桌位管理" name="first">
                                 <div>
                                      <iframe  :src='src' class='iframeclass'></iframe>   
                                </div>                                                                               
                                </el-tab-pane>
                               
                                <el-tab-pane label="大屏电视" name="third"  class="dpds">
                                        <div class="el-container clearfix">
                                                <aside class="el-aside dp-tv">
                                                       <img :src="tvLogo"  alt="" />
                                                </aside>
                                                <main class="el-main dp-content">
                                                        <div class="tv-main">
                                                            <h2>大屏显示设置</h2>
                                                            <el-form :model="tvData" ref="tvData" label-width="100px" class="tv-form">
                                                                 <el-form-item label="大屏显示：" class="item-tv">
                                                                      <el-radio v-model="tvData.url_type" label="1" value="1">轮播图</el-radio>
                                                                      <el-radio v-model="tvData.url_type" label="2" value="2">视频</el-radio>
                                                                </el-form-item>
                                                                <div class="show-tv" v-show='tvData.url_type=="1"'>
                                                                    <el-form-item label="轮播图设置：">
                                                                          <p class="prompt-tv">建议上传尺寸1400px*1040px，格式为png\jpg\jpeg图片</p>
                                                                    </el-form-item>

                                                                     <el-form-item  prop="addrs" class="tv-logo"  >
                                                                         <el-upload
                                                                            :disabled='is_tv'
                                                                            :action='actionlogo'
                                                                             class="tv-uploader"
                                                                             list-type="picture-card"
                                                                             :file-list="fileList1"
                                                                             :on-success="handleAvatarSuccessLogo"
                                                                             :before-upload="beforeAvatarUploadLogo"
                                                                             :on-remove="handleRemove"
                                                                            
                                                                             >
                                                                             <el-dialog  >
                                                                               <img width="100%"  :src="tvData.addrs" alt="" >
                                                                            </el-dialog> 
                                                                             <div>
                                                                                 <i class="el-icon-plus"></i><br/>
                                                                                 <span class="upload-title">上传图片</span>
                                                                             </div>
                                                                           </el-upload>
                                                                             
                                                                    </el-form-item>
                                                                     <el-form-item class="tv-btn">
                                                                        <el-button type="primary" @click="serva" size='large' >保存</el-button>
                                                                    </el-form-item>
                                                                </div>
                                                               <div class="show-tv1" v-show='tvData.url_type=="2"'>
                                                                    <el-form-item label="视频设置：">
                                                                          <p class="prompt-tv">上传一个mp4\avi\3gp\wmv\m4v小于1G视频</p>
                                                                    </el-form-item>

                                                                     <el-form-item  prop="video" class="tv-video">
                                                                           <el-upload
                                                                             :disabled='is_tv'
                                                                              class="avatar-uploader"
                                                                              :action='actionVideo'
                                                                              :show-file-list="false"
                                                                              :on-success="handleAvatarSuccessvideo"
                                                                              :before-upload="beforeAvatarUploadvideo"
                                                                              :on-error="uperror"
                                                                              >
                                                                           <video v-if="tvData.video_url"  :src="tvData.video_url" class="avatar" controls="controls"  >
                                                                           </video>
                                                                              <div v-else class="avatar-uploader-icons">
                                                                                <i class="el-icon-plus" ></i>
                                                                                <span>请点击添加视频</span>
                                                                              </div>
                                                                            </el-upload>
                                                                             <p class="prompt" v-show="isShow">上传中. . .</p>

                                                                    </el-form-item>
                                                                   
                                                                     <el-form-item class="tv-btn"> 
                                                                        <el-button type="primary" size='large' @click="seavVideo">保存</el-button>
                                                                    </el-form-item>
                                                                </div>
                                                               
                                                            </el-form>
                                                        </div>
                                                </main>
                                        </div>
                                </el-tab-pane>
                    </el-tabs>
            </div>
    </div>
</template>
<script type="text/javascript">
import { getTvlist, seavPic } from '@/api/paihaoset.js'
    export default{
        data(){
            return{
                src:'../../../hqpages/hqmanagement/sourcedatamanagement/operationdatamanagement/tablesetting.jsp'+'?_s='+this.$store.state.user.session,
                tvLogo:require("../../../static/img/bigtv.png"),
                activeName: 'first',
                is_tv:false,
                dialogImageUrl: '',
                dialogVisible: false,
                fileList1:[],
                tvList:[],
                tvList1:[],
                obj1:{},
                isShow:false,
                tvData:{
                    url_type:'1', //轮播图按钮  2.视频
                    addrs:'',   //上传图片          
                    video_url:'' //上传视频
                 }
            }
        },
        created(){
             /* 设置图片服务地址 使用代理*/  
        this. getListtv()
         this.actionlogo = '/imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';
       this.actionVideo= '/imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';
       
       /* this.actionlogo = 'img/imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';
        this.actionVideo = 'img/imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';*/
        },
      
        methods:{
          
            //tab切换
            handleClick(tab, event) {
                /*点击第一个标签页*/
                if(tab.name == 'first') {
                    
                }
                /*点击第二个标签页*/
                if(tab.name == 'second') {
                 
                }
                /*点击第三个标签页*/
                if(tab.name == 'third') {
                  
                }
            },

            //刚点进去就查询
           getListtv(){
              let _this=this;
              getTvlist().then((res)=>{

                  if(JSON.stringify(res.data) == "{}"){
                      _this.tvData.url_type="1";
                  }else if(res.success==true){
                    _this.tvData.url_type=res.data.url_type;   //切换图和视频
                    _this.tvData.video_url=res.data.video_url;

                      let arrayData=res.data.addrs
                     arrayData.map(function(i){
                        _this.tvData.addrs=i.url_addr
                        _this.tvList.push(i.url_addr)
                       
                      })
                    for(let i in  _this.tvList){
                          _this.obj1={url:_this.tvList[i]}
                          _this.fileList1.push(_this.obj1)
                        }
                         //console.log(_this.fileList1)
                        
                  }else{
                    _this.$message({
                      type:'error',
                      message:'获取数据失败'
                    })
                  }
              })
            },
            
            //上传图片
            handleAvatarSuccessLogo(res, file) {
            
              let index1 = res.indexOf("url")+6;
             // let index2 = res.indexOf("png")!=-1?res.indexOf("png")+3:res.indexOf('jpg')+3;
              let index2
                  if(res.indexOf("png")!=-1){
                    index2 = res.indexOf("png")+3;
                  }else if(res.indexOf('jpg')!=-1) {
                    index2 = res.indexOf('jpg')+3;
                  }else if(res.indexOf('jpeg')!=-1){
                    index2=res.indexOf('jpeg')+4
                  }
               this.tvData.addrs = res.substring(index1,index2);
                    this.obj1={url:this.tvData.addrs}
                     this.fileList1.push(this.obj1)

            },
           
            beforeAvatarUploadLogo(file) {
                      //const isJPG =file.type === 'image/png'|| file.type === 'image/jpeg';
                       const isJPG = (file.type.indexOf('image')==0)&&(/\.(?:jpg|png|jpeg)$/.test(file.name))
                       if (!isJPG) {
                         this.$message.error('图片只能是 JPG/PNG 格式!');
                       }
                       return isJPG;
                    },

            //删除
            handleRemove(file,fileList) {
             
             for(let i=0;i<this.fileList1.length;i++){
                if(this.fileList1[i].url==file.url){
                  this.fileList1.splice(i,1)
                  break;
                }
             }
         
            
            },
            
            //保存上传图片
            serva(tvData){
                 let _this = this;
                    _this.tvList1.splice(0, _this.tvList1.length)
                     _this.fileList1.map(function(t){
                       
                        _this.tvList1.push(t.url)
                    })
                    

                    if(_this.tvData.addrs == ''  || _this.tvList1.length == 0){
                       _this.$message({
                            type:'error',
                            message: '请上传图片!'
                        })
                    }else if(_this.tvList1.length >6){
                      _this.$message({
                            type:'error',
                            message: '最多上传6张!'
                        })
                    }else{
                     
                      let data='url_type='+_this.tvData.url_type+
                                  '&addrs='+_this.tvList1;

                            seavPic(data).then((res)=>{
                                  if(res.success==true){
                                    _this.$message({
                                            type: 'info',
                                            message: res.msg
                                    })
                               
                                  }else{
                                    _this.$message({
                                          type: 'error',
                                          message: '保存失败'
                                        });
                                  }
                              })
                    }
                 
            },
           
         
            //上传视频
            handleAvatarSuccessvideo(res, file){
                let index1 = res.indexOf("url")+6;
                //let index2 = res.indexOf("mp4")!=-1?res.indexOf("mp4")+3:res.indexOf('avi')+3;
                let index2
                if(res.indexOf("mp4")!=-1){
                  index2 = res.indexOf("mp4")+3;
                }else if(res.indexOf('avi')!=-1) {
                  index2 = res.indexOf('avi')+3;
                }else if(res.indexOf('3gp')!=-1){
                  index2=res.indexOf('3gp')+3
                }else if(res.indexOf('wmv')!=-1){
                  index2=res.indexOf('wmv')+3
                }else if(res.indexOf('m4v')!=-1){
                  index2=res.indexOf('m4v')+3
                }

                this.tvData.video_url = res.substring(index1,index2);
                this.isShow=false;
            },
            beforeAvatarUploadvideo(file) {
                       const isRM = file.type === 'video/mp4'  || file.type === 'video/avi' || file.type==='video/3gpp' || file.type === 'video/x-ms-wmv';
                       const isLt2M = file.size / 1024 / 1024  <= 1024;
                       if (!isRM) {
                         this.$message.error('视频只能是 mp4/avi/3gp/wmv/mv4格式!');
                       }else{
                        this.isShow=true;
                       }
                       if(!isLt2M){
                        this.$message.error('视频大小不能超过1G!');
                       }
                        
                       return isRM && isLt2M ;

                       
            },
            uperror(err,file,fileList){
              this.$message.error('上传失败')
              this.isShow=false;
            },
            //保存上传视频
            seavVideo(){
                let _this = this;
                if(_this.tvData.video_url==''){
                    _this.$message({
                        type:'error',
                        message: '请上传视频!'
                    })

                }else{
                   let data='url_type='+_this.tvData.url_type+
                              '&video_url='+_this.tvData.video_url;
                            seavPic(data).then((res)=>{
                                if(res.success==true){
                                    _this.$message({
                                        type: 'info',
                                        message: res.msg
                                    });

                                }else{
                                   _this.$message({
                                      type: 'error',
                                      message: '保存失败'
                                    });
                                }
                            })
                }
            }

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
        .paihaoset{
            background:#fefefe;

            .divTwo_set{
                        height: auto;
                        min-height: 800px;
                        background: #FFFFFF;

                      .el-tabs__nav-scroll {
                           margin-left: 20px;
                           margin-right: 20px;
                           border-bottom: 1px solid #EAF1F6;
                           height: 45px;
                           line-height: 45px;
                       }
                       .el-tabs__item {
                           font-size: 16px !important;
                           margin-bottom: 8px!important;
                           padding: 0px 20px!important;
                           margin-left: 0!important;
                           color: #34495E!important;
                       }
                       .el-tabs__item.is-active {
                           color: #0C9AFF!important;
                       }
                       .el-tabs__active-bar {
                           background-color: #0C9AFF !important;
                       }
                       .el-tabs__header {
                           background: #FEFEFE;
                       } 

                       .dpds{
                            padding:30px 0 0 40px;
                            .dp-tv{
                                float: left;
                                margin-right: 30px;
                            }
                            .dp-content{
                                width:574px;
                                float: left;
                                background:#F5F9FB;
                                padding:0 20px;
                                .tv-main{
                                    h2{
                                        height:42px;
                                        line-height: 42px;
                                        font-size:16px;
                                        border-bottom: 1px solid #EAF1F6;
                                    }
                                    .el-form-item__label{
                                       margin-left: 0!important;
                                       width:116px!important;
                                    }
                                    .item-tv{
                                        margin-top: 20px;
                                    }
                                    .prompt-tv{
                                        line-height: 32px;
                                    }
                                    .tv-logo{
                                        .el-form-item__content{
                                            margin-left: 116px!important;
                                            max-height: 492px;
                                            overflow: hidden;
                                        }
                                    }
                                    
                                    .tv-video{
                                        .el-form-item__content{
                                            margin-left: 116px!important;
                                            margin-bottom: 10px;
                                        }
                                    }

                                    .tv-logo .tv-uploader .el-upload{
                                            width:200px;
                                            height: 156px;
                                            border-radius: 3px;
                                            cursor: pointer;
                                            position: relative;
                                            overflow: hidden;

                                    }
                                   
                                    .tv-logo .tv-uploader .el-upload-list__item{
                                            width:198px;
                                            height: 154px;
                                            border-radius: 3px;
                                            margin:0 10px -1px 0;
                                    }
                                    .tv-logo .tv-uploader .el-icon-plus{
                                        font-size:20px;
                                    }
                                    .tv-logo .tv-uploader .upload-title{
                                            position: absolute;
                                            top:23px;
                                            left:77px;
                                            font-size:12px;
                                            color: #243546;
                                    }
                                    /*上传图片*/
                                    .tv-video .avatar-uploader {
                                        width:210px;
                                        height: 156px;
                                        float: left;
                                    }
                                    .prompt{
                                      color:red;
                                     position: absolute;
                                     top:164px;

                                    }
                                    .tv-video .avatar-uploader .el-upload {
                                        background: #FBFEFF;
                                        border: 1px dashed #D8E5EC;
                                        border-radius: 3px;
                                        cursor: pointer;
                                        position: relative;
                                        overflow: hidden;
                                        width:210px;
                                        height: 156px;
                                        video {
                                            width:208px;
                                            height: 154px;
                                            border-radius: 3px;
                                        }
                                    }

                                     .avatar-uploader .el-upload:hover {
                                        border-color: #20a0ff;
                                    }
                                     .avatar-uploader-icons {
                                        color: #A5B0B7;
                                        text-align: center;
                                        position:relative;
                                        i {
                                            margin-top: 50px;
                                            font-size:20px;
                                        }
                                        span {
                                                font-size: 12px;
                                                display: block;
                                                height: 36px;
                                                padding-left: 22px;
                                                padding-right: 22px;
                                                line-height: 18px;
                                                z-index:1000!important;
                                                &:nth-of-type(1) {
                                                    color: #243546;
                                                }

                                            }
                                      }
                                      /*结束*/
                                      .tv-btn{
                                        height:92px;
                                        border-top: 1px dashed #E3EDF3;
                                        padding:30px 0;
                                        .el-form-item__content{
                                            margin-left: 116px!important;
                                        }
                                      }
                                }
                            }

                       }



            }
        }
</style>
