<template>
    <div class="cardoffline">
        <header class="el-header set-wxcard-header">
          <span class="tzxtitle">{{title}}</span>
        </header>
        <section class="el-container">
                <main class="el-main show-editecarddetails">
                    <div style="width:550px">
                        <el-form label-width="140px" :model="formData" ref="formData" class="demo-ruleForm">

                            <el-form-item label="卡类别名称：" prop="name" :rules="filter_rules({required:true,maxLength:20})" >
                                <el-input type="name" placeholder="请输入卡类别名称" v-model="formData.name" auto-complete="off"></el-input>
                            </el-form-item>
                            
                            <el-form-item label="类别属性：">
                                <p class="attribute">实体卡</p>
                            </el-form-item>

                            <el-form-item label="一次性卡：">
                                  <el-radio v-model="formData.is_only" label="0">否</el-radio>
                                  <el-radio v-model="formData.is_only" label="1">是</el-radio>

                                  <el-tooltip class="item ml20" effect="dark" content="一次性卡，表示只能充值一次，直到消费完卡内金额为止" placement="top-start">
      					    	      <icon-svg icon-class='question'></icon-svg>
      					          </el-tooltip>
                            </el-form-item>

                            <el-form-item label="可退卡：">
                                  <el-radio v-model="formData.is_back" label="0">否</el-radio>
                                  <el-radio v-model="formData.is_back" label="1">是</el-radio>
                                  <el-tooltip class="item ml20" effect="dark" content="设置为否，表示该卡不允许退卡" placement="top-start">
      					    	      <icon-svg icon-class='question'></icon-svg>
      					          </el-tooltip>
                            </el-form-item>

                            <el-form-item label="可挂失：">
                                  <el-radio v-model="formData.is_lostreport" label="0">否</el-radio>
                                  <el-radio v-model="formData.is_lostreport" label="1">是</el-radio>
                                  <el-tooltip class="item ml20" effect="dark" content=" 设置为否，表示发出去后不允许挂失" placement="top-start">
      					    	      <icon-svg icon-class='question'></icon-svg>
      					          </el-tooltip>
                            </el-form-item>

                            <el-form-item label="可记名：">
                                  <el-radio v-model="formData.is_namereport" label="0">否</el-radio>
                                  <el-radio v-model="formData.is_namereport" label="1">是</el-radio>
                                  <el-tooltip class="item ml20" effect="dark" content="仅适用于POS端发放的实体卡，在pos发卡时不需要登记会员相关信息" placement="top-start">
      					    	      <icon-svg icon-class='question'></icon-svg>
      					          </el-tooltip>
                            </el-form-item>

                            <el-form-item label="卡押金：" prop="card_deposit" :rules="filter_rules({required:false,type:'num'})">
                                <el-input placeholder="请输入卡押金" style="width:200px;" type="number" min="0" v-model.number="formData.card_deposit">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>

                            <el-form-item label="卡售卖价格：" prop="card_sale_price" :rules="filter_rules({required:false,type:'num'})">
                                <el-input placeholder="请输入卡售卖价格" style="width:200px;" type="number" min="0" v-model.number="formData.card_sale_price">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>

                            <el-form-item label="最低充值金额：" prop="limit_prestore_per" :rules="filter_rules({required:false,type:'num'})">
                                <el-input placeholder="请输入最低充值金额" style="width:200px;" type="number" min="0" v-model.number="formData.limit_prestore_per">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>

                            <el-form-item label="卡介质：">
                                  <el-radio v-model="formData.medium" label="0">无卡</el-radio>
                                  <el-radio v-model="formData.medium" label="1">磁条卡</el-radio>
                                  <el-radio v-model="formData.medium" label="2">射频卡</el-radio>
                            </el-form-item>

                            <el-form-item label="不记名卡使用权限：">
                                  <el-radio v-model="formData.blank_use_limit" label="0">无限制</el-radio>
                                  <el-radio v-model="formData.blank_use_limit" label="1">仅在注册机构使用所有权限</el-radio>
                            </el-form-item>

                            <el-form-item label="卡金额使用范围：">
                                  <el-radio v-model="formData.money_use_limit" label="0">无限制</el-radio>
                                  <el-radio v-model="formData.money_use_limit" label="1">按门店分组(门店不设分组表示单店使用)</el-radio>
                            </el-form-item>

                            <el-form-item label="卡金额充值范围：">
                                  <el-radio v-model="formData.prestore_use_limit" label="0">无限制</el-radio>
                                  <el-radio v-model="formData.prestore_use_limit" label="1">按门店分组</el-radio>
                            </el-form-item>

                            <el-form-item label="卡有效期：">
                                  <el-radio v-model="formData.validity_type" label="0">永久有效</el-radio>
                                  <div class="data-select-border">
                                      <el-radio v-model="formData.validity_type" label="1">固定日期有效</el-radio>
                                      <div class="block">
                                        <el-date-picker
                                          @change='start_dateChange'
                                          v-model="formData.start_date"
                                          type="date"
                                          placeholder="选择日期"
                                          class="w140 firstData">
                                        </el-date-picker>
                                      </div>
                                      <span>至</span>
                                      <div class="block">
                                        <el-date-picker
                                          @change='end_dateChange'
                                          v-model="formData.end_date"
                                          type="date"
                                          placeholder="选择日期"
                                          class="w140 firstData"
                                          >
                                        </el-date-picker>
                                      </div>
                                  </div>
                                  <div class="data-select-border">
                                      <el-radio v-model="formData.validity_type" label="2">激活之日起 &nbsp;&nbsp;</el-radio>
                                      <el-form-item label="" prop="validity_type" :rules="filter_rules({required:false,type:'num'})">
                                          <el-input type="number" min="0" v-model.number="formData.validity_type" class="w140 firstData"></el-input>
                                      </el-form-item><span>个月有效</span>
                                  </div>
                            </el-form-item>

                            <el-form-item>
                                <el-button @click="cancel"  size='large'>取消</el-button>
                                <el-button type="primary" @click="save('formData')"  size='large'>保存</el-button>
                            </el-form-item>
                       </el-form>
                    </div>
                </main>
            </section>
    </div>
</template>

<script>

import {AneCardofflineSave, createAneCardoffline, AneCardofflineDataShow} from '@/api/cardvoucher.js'

export default {
    data(){
        return {
            title:'创建实体卡类别',
            formData: {
                name:'',
                is_only:'0',                // 一次性卡
                is_back:'0',                // 可退卡
                is_lostreport:'0',          // 可挂失
                is_namereport:'0',          // 可记名
                card_deposit:'',            // 押金
                card_sale_price:'',         // 卡售卖价格
                limit_prestore_per:'',      // 最低充值金额
                medium: '0',                // 卡介质
                blank_use_limit:'0',        // 不记名卡使用权限
                money_use_limit:'0',        // 卡金额使用范围
                validity_type:'0',          // 卡有效期
                validity_month: '',         // 卡有效期输入框
                start_date: '',             // 日期start
                end_date: '',               // 日期end
                prestore_use_limit:'0',      // 卡金额充值范围
            }
        }
    },
    created(){
            let _this = this;
            let id = _this.$route.query.id;

            if(id){
                _this.title = '编辑实体卡类别'
                let data = 'id=' + id;
                AneCardofflineDataShow(data).then((res)=>{
                    if(res.success == true){

                        if(res.validity_type == '1'){
                            _this.formData.start_date = res.start_date;
                            _this.formData.end_date = res.end_date;
                            _this.formData.validity_type = '1'
                        }else if(res.validity_type == '2'){
                            _this.formData.validity_month = res.validity_month;
                            _this.formData.validity_type = '2'
                        }else if(res.validity_type == '0'){
                            _this.formData.validity_type = '0'
                        }

                        _this.formData.name = res.name;
                        _this.formData.is_only = res.is_only;
                        _this.formData.is_back = res.is_back;
                        _this.formData.is_lostreport = res.is_lostreport;
                        _this.formData.is_namereport = res.is_namereport;
                        _this.formData.card_deposit = res.card_deposit;
                        _this.formData.card_sale_price = res.card_sale_price;
                        _this.formData.limit_prestore_per = res.limit_prestore_per;
                        _this.formData.prestore_use_limit = res.prestore_use_limit.toString();
                        _this.formData.medium = res.medium.toString();
                        _this.formData.money_use_limit = res.money_use_limit.toString();
                        _this.formData.blank_use_limit = res.blank_use_limit.toString();

                    }
                })
            }
    },
    methods: {
        start_dateChange(data){
            this.formData.start_date = data;    // 固定有效日期 star
        },
        end_dateChange(data){
            this.formData.end_date = data;      // 固定有效日期 end
        },
        save(formData) {				     // 保存
            let _this = this;
            let id = _this.$route.query.id;
            let data = 'name=' + _this.formData.name +
                       '&valid_state=1' +
                       '&is_physical_card=1' +
                       '&is_back=' + _this.formData.is_back +
                       '&is_lostreport=' + _this.formData.is_lostreport +
                       '&is_namereport=' + _this.formData.is_namereport +
                       '&card_sale_price=' + _this.formData.card_sale_price +
                       '&card_deposit=' + _this.formData.card_deposit +
                       '&limit_prestore_per=' + _this.formData.limit_prestore_per +
                       '&is_only=' + _this.formData.is_only +
                       '&validity_type=' + _this.formData.validity_type +
                       '&start_date=' + _this.formData.start_date +
                       '&end_date=' + _this.formData.end_date +
                       '&validity_month=' + _this.formData.validity_month +
                       '&blank_use_limit=' + _this.formData.blank_use_limit +
                       '&money_use_limit=' + _this.formData.money_use_limit +
                       '&prestore_use_limit=' + _this.formData.prestore_use_limit +
                       '&medium=' + _this.formData.medium +
                       '&oper=update' +
                       '&id=' + id

                this.$refs[formData].validate((valid) => {

                    if(valid == true){
                        if(_this.formData.name == ""){
                            _this.$message({
                              type: 'error',
                              message: '请输入实体卡类名!'
                            });
                        }else if(_this.formData.validity_type == '1'){
                            if( _this.formData.start_date == '' || _this.formData.end_date == ''){
                                _this.$message({
                                  type: 'error',
                                  message: '请选择有效日期!'
                                });
                            }else if(_this.formData.start_date > _this.formData.end_date ){
                                _this.$message({
                                  type: 'error',
                                  message: '请选择有效日期!'
                                });
                            }else{
                                _this.createC(data);
                            }
                        }else if(_this.formData.validity_type == '2'){
                            if(!_this.formData.validity_month){
                                _this.$message({
                                  type: 'error',
                                  message: '请填写有有效日期!'
                                });
                            }else{
                                _this.createC(data);
                            }
                        }else{
                            _this.createC(data);
                        }
                    }else{
						return false;
                    }
                })
        },
        createC(data){
            let _this =this;
            let id = _this.$route.query.id;

            if(id){
                // 编辑实体卡分类
                _this.$confirm('是否编辑实体卡分类?', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    AneCardofflineSave(data).then(function(res){
                        if(res.success == true){
                            _this.$message({
                              type: 'success',
                              message: '编辑成功!',
                              onClose:_this.goBack()
                            });
                        }else if(res.msg == "名称重复，无法保存"){
                            _this.$message({
                              type: 'error',
                              message: '名称重复，无法保存!'
                            });
                        }else{
                            _this.$message({
                              type: 'error',
                              message: '编辑失败!'
                            });
                        }
                    })
                }).catch(() => {
                  _this.$message({
                    type: 'info',
                    message: '已取消创建'
                  });
                });

            }else{
                // 创建实体卡分类
                _this.$confirm('是否创建实体卡分类?', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    createAneCardoffline(data).then(function(res){
                        if(res.success == true){
                            _this.$message({
                              type: 'success',
                              message: '创建成功!',
                              onClose:_this.goBack()
                            });

                            // setTimeout(()=>{ _this.cancel(); })
                        }else if(res.msg == "名称重复，无法保存"){
                            _this.$message({
                              type: 'error',
                              message: '名称重复，无法保存!'
                            });
                        }else{
                            _this.$message({
                              type: 'error',
                              message: '创建失败!'
                            });
                        }
                    })
                }).catch(() => {
                  _this.$message({
                    type: 'info',
                    message: '已取消创建'
                  });
                });
            }
        },
        cancel(){                    //取消按钮
            this.$router.go(-1);
        },
        goBack(){					// 保存完返回列表
            let _this = this;
            _this.$router.push({
                path:'/card/crmcardclassset',
                hash:'new'
            })
        },
    },
    deactivated () {
        this.$destroy(true)
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.cardoffline{
    background-color: #fff;
    margin:20px;
    .ml20{
        margin-left: 20px;
    }
    .el-form-item__label{
        text-align: left;
        margin-left: 40px;
    }
    .set-wxcard-header{
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #EAF1F6;
        font-size: 16px;
        margin:0 20px 20px;
        .tzxtitle{
          padding-left: 10px;
        }
        .establish{
          display:block;
          padding-left:10px ;
        }
    }
  .el-container {
      display: flex;
      flex-direction: row;
      flex: 1;
      box-sizing: border-box;
      min-width: 0;
      .el-aside{
          margin-left: 20px;
      }
      .el-form-item__content{
          margin-left: 200px!important;
      }
      .el-form .el-form-item:last-child{
      margin-top: 30px!important;
      margin-bottom: 30px!important;
     }
  }
}

.data-select-border{
    display:flex;
    margin-top: 20px;
    .el-form-item{
        margin-left: -200px;
        .el-form-item__error{
            margin-left: 20px;
        }
    }
    .w140{
        width:140px;
    }
    .firstData{
        margin-left: 20px;
        margin-right: 20px;
    }
    .lastData{
        margin-left: 20px;
    }
}





.show-editecarddetails{
    width: 600px;
    padding-top:20px;
    background: #fff;

   .el-form-item__content .el-form-item__error{
    padding-left: 0;
   }
}
.portrait{
    .el-upload--picture-card{
        width:160px;
        height: 160px;
        line-height: 130px;
    }
    .portrait-title{
        position: absolute;
        left:170px;
        top:0;
        font-size: 12px;
        width: 150px;
        color: #A5B0B7;
    }
}
.card-background-img{
    .el-upload--picture-card{
        width:300px;
        height: 140px;
        line-height: 130px;
    }
    .portrait-title{
        position: absolute;
        left:310px;
        top:0;
        font-size: 12px;
        width: 150px;
        color: #A5B0B7;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        width:300px;
        height: 140px;
    }
}

.card-background-color{
    .el-select{
        width:300px;
    }
}

/* .interests{
    .el-input{
        width: 220px;
        float: right;
    }
    .interests-list{
        margin-bottom: 12px;
    }
} */

.attribute{
    height: 32px;
    line-height: 32px;
}

</style>
