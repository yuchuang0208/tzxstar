<template>
    <div class="editeelectroniccard">
        <header class="el-header set-wxcard-header">
          <span class="wxtitle">微信卡包设置</span>
        </header>
        <section class="el-container clearfix">
                <aside class="el-aside show-phone-border">
                    <img :src="logo" alt="">
                </aside>
                <main class="el-main show-editecarddetail">
                    <div style="width:446px">
                        <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm">
                            <el-form-item class="ml-15" label="商户名称:" prop="name":rules="filter_rules({required:true,maxLength:20})" >
                                <el-input type="name" placeholder="请输入商户名称" v-model="formData.name" auto-complete="off" style="margin-left:15px;"></el-input>
                            </el-form-item>

                            <el-form-item class="ml-15" label="卡标题:" prop="title" :rules="filter_rules({required:true,maxLength:20})" >
                                <el-input type="title" placeholder="请输入卡标题" v-model="formData.title" auto-complete="off"style="margin-left:15px;"></el-input>
                            </el-form-item>

                            <el-form-item class="portrait logo"  label="商家logo:" prop="logo" >
            					<el-upload
            					 :disabled='is_find'
            					  class="avatar-uploader"
            					  :action='action'
            					  :show-file-list="false"
            					  :on-success="handleAvatarSuccessLogo"
            					  :before-upload="beforeAvatarUploadLogo"
            					  name='fileToUpload'>
            					  <img v-if="formData.logo" :src="formData.logo" class="avatar">
            					  <div v-else class="avatar-uploader-icons">
            					  	<i class="el-icon-plus" ></i>
            					  	<span>上传图片</span>
            					  </div>
            					</el-upload>
            				</el-form-item>
                            <p class="size-title">建议尺寸200X200px不大于500K的png或jpg图片</p>
                            <el-form-item class="portrait bgImg"  label="卡背景图片:" prop="bgImg" >
            					<el-upload
            					 :disabled='is_find'
            					  class="avatar-uploader"
            					  :action='action'
            					  :show-file-list="false"
            					  :on-success="handleAvatarSuccessBg"
            					  :before-upload="beforeAvatarUploadBg"
            					  name='fileToUpload'>
            					  <img v-if="formData.bgImg" :src="formData.bgImg" class="avatar">
            					  <div v-else class="avatar-uploader-icons">
            					  	<i class="el-icon-plus" ></i>
            					  	  <span>上传图片</span>
            					  </div>
            					</el-upload>
            				</el-form-item>
                            <p class="size-title">建议尺寸530X320px，300KB以内的png、jpg图片</p>
                            <el-form-item class="card-background-color"  label="卡背景色:">
                                  <el-select v-model="formData.bgColor" placeholder="请选择">
                                    <el-option
                                      v-for="(item,index) in bgColors"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"  :class="'bgColor'+index">
                                      <span></span>
                                    </el-option>
                                  </el-select>
                            </el-form-item>

                            <el-form-item label="提示语:">
                                <el-input type="instructions" placeholder="请输入提示语" v-model="formData.cluesvalue" auto-complete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="特权说明:" prop="instructions">
                                <el-input type="instructions" placeholder="请输入特权说明" v-model="formData.instructions" auto-complete="off"></el-input>
                            </el-form-item>

                            <el-form-item class="interests" label="会员权益:" prop="formData">

                                <div class="interests-list">
                                    <el-checkbox v-model="formData.checkedJifen">积分</el-checkbox>
                                    <el-form-item label="" prop="jifen" :rules="filter_rules({required:false,type:'num'})" style="margin-left:-130px;">
                                        <el-input type="number" min="0" v-model.number="formData.jifen"></el-input>
                                    </el-form-item>
                                </div>



                                <div class="interests-list">
                                    <el-checkbox v-model="formData.checkedDengji">等级</el-checkbox>
                                    <el-input type="age2" placeholder="等级" v-model="formData.dengji" auto-complete="off"></el-input>
                                </div>
                                <div class="interests-list">
                                    <el-checkbox v-model="formData.checkedYouhuiquan">优惠券</el-checkbox>
                                    <el-input type="age3" placeholder="优惠券" v-model="formData.youhuiquan" auto-complete="off"></el-input>
                                </div>
                            </el-form-item>

                            <el-form-item class="interests" label="支付入口:" prop="formData">
                                <div class="interests-list">
                                    <el-checkbox v-model="formData.checkedPay">付款</el-checkbox>
                                    <el-input type="pay" placeholder="付款" v-model="formData.pay" auto-complete="off"></el-input>
                                </div>
                            </el-form-item>

                            <el-form-item class="interests" label="自定义入口:" prop="formData">
                                <div class="interests-list">
                                    <el-checkbox v-model="formData.topUpChecked">充值</el-checkbox>
                                    <el-input type="age1" placeholder="充值" v-model="formData.topUp" auto-complete="off"></el-input>
                                </div>
                                <div class="interests-list">
                                    <el-checkbox v-model="formData.membersChecked">会员规则</el-checkbox>
                                    <el-input type="age1" placeholder="会员规则" v-model="formData.members" auto-complete="off"></el-input>
                                </div>
                                <div class="interests-list">
                                    <el-checkbox v-model="formData.informationChecked">信息完善</el-checkbox>
                                    <el-input type="age1" placeholder="信息完善" v-model="formData.information" auto-complete="off"></el-input>
                                </div>
                            </el-form-item>

                            <el-form-item>
                                <el-button @click="cancel">取消</el-button>
                                <el-button type="primary" @click="saveEvent('formData',2)">保存并同步至微信</el-button>
                                <el-button type="primary" @click="saveEvent('formData',1)">保存</el-button>
                            </el-form-item>

                       </el-form>
                    </div>
                </main>
            </section>
    </div>

</template>

<script>
import { editorAneCard, saveAneCard, saveAndweixinAneCard} from '@/api/cardvoucher.js'

export default {
    data(){
        return {
            logo: require('../../../../static/img/phone.png'),
            card_class_id:0,
            id:0,
            formData: {
                name: '',                       // 商户名称
                title: '',                      // 卡标题
                bgColor:'',                     // 卡背景色
                instructions: '',               // 特权说明
                logo:'',                        // logo
                bgImg:'',                       // 背景图
                jifen:'',
                dengji:'',
                youhuiquan:'',
                checkedJifen:false,
                checkedDengji:false,
                checkedYouhuiquan:false,
                cluesvalue:'',                  // 提示语
                checkedPay:false,               // 选中支付
                pay:'',                         // 支付value
                oper:'update',                  // 修改凭证
                topUp:'',                       // 充值
                topUpChecked:false,             // 充值选中
                members:'',                     // 会员规则
                membersChecked:false,           // 会员规则选中
                information:'',                 // 会员信息
                informationChecked:false,       // 会员信息选中
            },
            dialogImageUrl: '',
            dialogVisible: false,
            is_find:false,
            bgColors : [  {'value':'Color010','label':'#63b359'},
                          {'value':'Color020','label':'#2c9f67'},
                          {'value':'Color030','label':'#509fc9'},
                          {'value':'Color040','label':'#5885cf'},
                          {'value':'Color050','label':'#9062c0'},
                          {'value':'Color060','label':'#d09a45'},
                          {'value':'Color070','label':'#e4b138'},
                          {'value':'Color080','label':'#ee903c'},
                          {'value':'Color081','label':'#f08500'},
                          {'value':'Color082','label':'#a9d92d'},
                          {'value':'Color090','label':'#dd6549'},
                          {'value':'Color100','label':'#cc463d'},
                          {'value':'Color101','label':'#cf3e36'},
                          {'value':'Color102','label':'#5E6671'},
                        ],
         }
    },
    created(){
        this.getAneCardDate();      // 数据回显

        /* 设置图片服务地址 使用代理*/
        this.action = '/imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';
        this.actionBg = '/imgServlet?actionType=upload&tenentid='+this.$store.state.user.tenancyid+'&fileId=';
    },
    methods: {
        handleRemove(file, fileList) {
           // console.log(file, fileList);
        },
        cancel(){                     //取消按钮
            this.$router.go(-1);
        },
        saveEvent(formData,tag) {		      // 保存事件
            let _this = this;
            (_this.formData.checkedJifen != true) ? (_this.formData.jifen = '') :'' ;
            (_this.formData.checkedDengji != true) ? (_this.formData.dengji = '') :'' ;
            (_this.formData.checkedYouhuiquan != true) ? (_this.formData.youhuiquan = '') :'' ;
            (_this.formData.checkedPay != true) ? (_this.formData.pay = '') :'' ;
            (_this.formData.topUpChecked != true) ? (_this.formData.topUp = '') :'' ;
            (_this.formData.membersChecked != true) ? (_this.formData.members = '') :'' ;
            (_this.formData.informationChecked != true) ? (_this.formData.information = '') :'' ;

            if(_this.id == 0){              // 初次保存的时候没有ID
                _this.formData.oper = 'add';
            }

            let data = 'id=' + _this.id +
                       '&card_class_id=' + _this.card_class_id +
                       '&brand_name=' + _this.formData.name +
                       '&card_title=' + _this.formData.title +
                       '&background_pic_url=' + _this.formData.bgImg +
                       '&logo_url=' + _this.formData.logo +
                       '&color=' + _this.formData.bgColor +
                       '&notice=' + _this.formData.cluesvalue +
                       '&supply_bonus=' + _this.formData.checkedJifen +
                       '&supply_bonus_info=' + _this.formData.jifen +
                       '&supply_level=' + _this.formData.checkedDengji +
                       '&supply_level_info=' + _this.formData.dengji +
                       '&supply_coupon=' + _this.formData.checkedYouhuiquan +
                       '&supply_coupon_info=' + _this.formData.youhuiquan +
                       '&supply_pay=' + _this.formData.checkedPay +
                       '&supply_pay_info=' + _this.formData.pay +
                       '&supply_recharge=' + _this.formData.topUpChecked +
                       '&supply_recharge_info=' + _this.formData.topUp +
                       '&supply_rule=' + _this.formData.membersChecked +
                       '&supply_rule_info=' + _this.formData.members +
                       '&supply_personal=' + _this.formData.informationChecked +
                       '&supply_personal_info=' + _this.formData.information +
                       '&oper=' + _this.formData.oper +
                       '&prerogative=' + _this.formData.instructions +
                       '&synchro_state= 0';

            this.$refs[formData].validate((valid) => {
                if(valid == true){
                    if(this.formData.name == ''){
                        this.$alert('', '请输入商户名称', {
                           confirmButtonText: '确定',
                         });
                    }else if(this.formData.title == ''){
                        this.$alert('', '请输入卡标题', {
                           confirmButtonText: '确定',
                         });
                    }else{
                        if(tag == 1){
                            this.save(data);
                        }else if(tag == 2){
                            this.saveSynchronous(data);
                        }
                    }
                }else{
                    //console.log('表单输入有误!!');
                    return false;
                }
            })
        },
        save(data){                   // 保存
            var _this = this;
            _this.$confirm('是否保存?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                saveAneCard(data).then(function(res){
                    if(res.success == true){
                        _this.$message({
                          type: 'success',
                          message: '保存成功!',
                          onClose:_this.goBack()
                        });
                    }else{
                        _this.$message({
                          type: 'error',
                          message: '保存失败!'
                        });
                    }
                })
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消保存'
              });
            });
        },
        saveSynchronous(data){        // 保存并同步到卡包
            let _this = this;
            _this.$confirm('是否保存并同步到微信?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                saveAndweixinAneCard(data).then((res)=>{
                    if(res.success == true){
                        _this.$message({
                          type: 'success',
                          message: '保存并同步成功!',
                          onClose:_this.goBack()
                        });
                    }else{
                        _this.$message({
                          type: 'error',
                          message: '保存同步失败!'
                        });
                    }
                })
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消保存同步'
              });
            });
        },
        getAneCardDate(){            // 获取编辑前回显数据
            let _this = this;
            let id = _this.$route.query.id;

            let data = "card_class_id=" + id;
            editorAneCard(data).then(function(res){
                _this.card_class_id = id;                                       //卡类别id
                if(res.success == true){
                    _this.formData.name = res.brand_name;                           // 商户名称
                    _this.formData.title = res.card_title;                          // 卡标题
                    _this.formData.logo = res.logo_url;                             // logo
                    _this.formData.bgImg = res.background_pic_url;                  // 背景图
                    _this.formData.bgColor = res.color;                             // 背景色
                    _this.formData.cluesvalue = res.notice;                         // 提示语
                    _this.formData.instructions = res.prerogative;                  // 特权说明
                    _this.formData.checkedJifen = eval(res.supply_bonus);           // 积分选中
                    _this.formData.jifen = res.supply_bonus_info;                   // 积分 value
                    _this.formData.checkedDengji = eval(res.supply_level);          // 等级选中
                    _this.formData.dengji = res.supply_level_info;                  // 等级 value
                    _this.formData.checkedYouhuiquan = eval(res.supply_coupon);     // 优惠券选中
                    _this.formData.youhuiquan = res.supply_coupon_info;             // 优惠券 value
                    _this.formData.checkedPay = eval(res.supply_pay);               // 支付选中
                    _this.formData.pay = res.supply_pay_info;                       // 支付value
                    _this.formData.topUp = res.supply_recharge_info;                // 充值
                    _this.formData.topUpChecked = eval(res.supply_recharge);        // 充值选中
                    _this.formData.members = res.supply_rule_info;                  // 会员规则
                    _this.formData.membersChecked = eval(res.supply_rule);          // 会员规则选中
                    _this.formData.information = res.supply_personal_info;          // 完善信息
                    _this.formData.informationChecked = eval(res.supply_personal);  // 完善信息选中
                    _this.id = res.id;
                }
            })
        },
        handleAvatarSuccessLogo(res, file) {

           let index1 = res.indexOf("url")+6;
           let index2 = res.indexOf("png")!=-1?res.indexOf("png")+3:res.indexOf('jpg')+3;
           this.formData.logo = res.substring(index1,index2);
        },
        beforeAvatarUploadLogo(file) {
           const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
           const isLt2M = file.size / 1024  <= 500;

           if (!isJPG) {
             this.$message.error('图片只能是 JPG/PNG 格式!');
           }
           if (!isLt2M) {
             this.$message.error('图片大小不能超过 500KB!');
           }
           return isJPG && isLt2M;
        },
        handleAvatarSuccessBg(res, file) {

          let index1 = res.indexOf("url")+6;
          let index2 = res.indexOf("png")!=-1?res.indexOf("png")+3:res.indexOf('jpg')+3;
          this.formData.bgImg = res.substring(index1,index2);
        },
        beforeAvatarUploadBg(file) {
          const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
          const isLt2M = file.size / 1024  <= 300;

          if (!isJPG) {
            this.$message.error('图片只能是 JPG/PNG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('图片大小不能超过 300KB!');
          }
          return isJPG && isLt2M;
        },
        goBack(){					// 保存完返回列表
            let _this = this;
            setTimeout(()=>{
                _this.$router.push({
                    path:'/card/crmcardclassset',
                })
            },3000)
        },
   }
}
</script>


<style rel="stylesheet/scss" lang="scss">
.bgColor0{
    background-color: #63b359;
}
.bgColor1{
    background-color: #2c9f67;
}
.bgColor2{
    background-color: #509fc9;
}
.bgColor3{
    background-color: #5885cf;
}
.bgColor4{
    background-color: #9062c0;
}
.bgColor5{
    background-color: #d09a45;
}
.bgColor6{
    background-color: #e4b138;
}
.bgColor7{
    background-color: #ee903c;
}
.bgColor8{
    background-color: #f08500;
}
.bgColor9{
    background-color: #a9d92d;
}
.bgColor10{
    background-color: #dd6549;
}
.bgColor11{
    background-color: #cc463d;
}
.bgColor12{
    background-color: #cf3e36;
}
.bgColor13{
    background-color: #5E6671;
}
.el-select-dropdown__list{
    padding:0!important;
}
.el-select-dropdown__item.hover{
}
.editeelectroniccard {
    background-color: #fff;
    margin:20px;
    .set-wxcard-header {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #EAF1F6;
        font-size: 16px;
        margin:0 20px 20px;
        .wxtitle {
            padding-left: 10px;
        }
    }
    .el-container {
        .el-aside {
            margin-left: 30px;
        }
        .el-form-item__content {
            margin-left: 140px!important;
        }
    }
    .interests {
        .el-input {
            width: 178px;
        }
        .interests-list {
            margin-bottom: 20px!important;
            display:flex;
            .el-checkbox {
                width:100px;
            }
        }
    }
    .el-form {
        margin-left:30px!important;
        .el-form-item:nth-of-type(8), .el-form-item:nth-of-type(9){
              margin-bottom: 0px!important;
        }
    }
    .el-form-item__error {
        padding-left: 15px;
    }
    .show-editecarddetail {
        width: 660px;
        background: #F5F9FB;
        padding-top:20px;
        float: left;
    }
    .show-phone-border {
        width: 330px;
        height: 620px;
        margin-right: 40px;
        float: left;
        img {
            width:330px;
            height: auto;
        }
    }
    .card-background-img {
        .el-upload--picture-card {
            width:300px;
            height: 140px;
            line-height: 130px;
        }
        .portrait-title {
            position: absolute;
            left:310px;
            top:0;
            font-size: 12px;
            width: 150px;
            color: #A5B0B7;
        }
        .el-upload-list--picture-card .el-upload-list__item {
            width:300px;
            height: 140px;
        }
    }
    .card-background-color {
        .el-select {
            width:306px;
        }
    }
    .portrait {
        .el-upload--picture-card {
            width:160px;
            height: 160px;
            line-height: 130px;
        }
        .portrait-title {
            position: absolute;
            left:170px;
            top:0;
            font-size: 12px;
            width: 150px;
            color: #A5B0B7;
        }
    }
    .ml-15 {
        margin-left: -15px;
    }
    .logo, .bgImg {
      margin-bottom: 3px;
    }
    .size-title{
      width:500px;
       font-size: 12px;
       color: #A5B0B7;
       padding-left: 141px;
       padding-bottom: 15px;
    }
    .logo .avatar-uploader .el-upload {
        background: #FBFEFF;
        border: 1px dashed #D8E5EC;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width:100px;
        height: 100px;
        img {
            width:98px;
            height: 98px;
            border-radius: 4px;
        }
    }
    .bgImg .avatar-uploader .el-upload {
        background: #FBFEFF;
        border: 1px dashed #D8E5EC;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width:230px;
        height: 84px;
        img {
            width:228px;
            height: 82px;
            border-radius: 4px;
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
        margin-top: 27px;
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
}

.clearfix{overflow:hidden;_zoom:1;}
</style>
