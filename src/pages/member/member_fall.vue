<template>
    <div class="memberfall">
        <div class="memberfall_title">
            <span>会员升降级</span>
        </div>
        <div class="memberChioce">
                <el-form  ref="form"  class="memberForm">
                    <div class="stepWrap">
                        <div class="steps">
                            <div class="step_head">
                                <div class="step_line"></div>
                                <div class="step_text">
                                    <span class="step_icon-inner">1</span>
                                </div>
                            </div>
                            <div class="step_main">
                                <el-form-item label="选择会员群体：" required class="main_fist">
                                    <em class="botton_text"  @click="openDialogQunti">选择群体</em>
                                </el-form-item>
                                <el-form-item style="padding:14px; background: #F5F9FB;max-height:149px;overflow:hidden;">
                                        <div  class="yi_person_num">
                                            <h2>已选</h2>
                                            <tt v-model="severqueti">{{severqueti}}</tt>
                                            <cite>项</cite>
                                        </div>
                                        <div  class="yi_person_num" v-if="hyqt_select_data.length > 0">
                                            <h2>,共计</h2>
                                            <tt v-model="count">{{count | thousand}}</tt>
                                            <cite>人</cite>

                                        </div><br/>
                                        <ul class="xuanze" v-if="hyqt_select_data.length > 0">
                                            <li v-for="item in hyqt_select_data"><em>{{item.group_name}}({{item.members_count}}人)</em>
                                                <img src="../../assets/huodong/close.svg"  @click="deleteItem(hyqt_select_data,item,'qunti')"/>
                                            </li>
                                    </ul>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="steps">
                            <div class="step_head">
                                <div class="step_line"></div>
                                <div class="step_text">
                                    <span class="step_icon-inner">2</span>
                                </div>
                            </div>
                            <div class="step_main">
                               <el-form-item label="调整到指定会员等级：" required class="main_sed"><br/>
                                    <el-radio-group  v-model="radio3">
                                      <el-radio-button label="粉丝会员"></el-radio-button>
                                      <el-radio-button label="银牌会员"></el-radio-button>
                                      <el-radio-button label="金银花卡会员"></el-radio-button>
                                      <el-radio-button label="铜牌卡会员"></el-radio-button>
                                      <el-radio-button label="金牌卡会员"></el-radio-button>
                                      <el-radio-button label="时期卡会员"></el-radio-button>
                                    </el-radio-group>
                            </el-form-item>
                            </div>
                        </div>
                        <div class="steps is-steps">
                            <div class="step_head">
                                <div class="step_line"></div>
                                <div class="step_text">
                                    <span class="step_icon-inner">3</span>
                                </div>
                            </div>
                            <div class="step_main">
                                <el-form-item label="活动形式" required>
                                    <el-input type="textarea"  placeholder="请输入等级变更原因"  v-model="fromtext"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                       <div class="quxiao_and_tijiao">
                            <div class="bottom_64_32">
                                    <div class="quxiao"><em>取消</em></div>
                                    <div class="queding" @click="onSubmit"><em>完成</em></div>
                            </div>
                    </div>
                </el-form>
        </div>
        <!--会员群体 开始-->
        <tzx-group-select 
            @makeQuntiSureButton ='quntiMakeSureChecked' 
            @makeQuntiCancleButton='quntiCancleButton' 
            :dialogQuntiVisible="dialogQunti" 
            :quntiData="hyqtData" 
            :quntiData_select="hyqt_select_data" 
            :tableDataFilter="tableDataFilter_parent">
        </</tzx-group-select>
        <!--会员群体结束 -->
    </div>
</template>
<script>
    import { TzxGroupSelect } from '@/components/tzxgroupselect';
    import { getHuiyuanQunti } from '@/api/home'
    import {getListmember} from '@/api/memberupgread'
     export default {
        data () {
          return {
            radio3:'', //指定会员等级
            hyqtData: [], //会员群体
            hyqt_select_data: [], //选择的会员群体
            tableDataFilter_parent: [], //会员群体回显
            //hyqt_select_data_temp: [], //选择的会员群体 过程变量
            //members_count: 0, //会员群体列表中选择的人数
            count: 0, //会员群体列表中选择的人数
            dialogQunti: false,
            severqueti:0, //列表有几项
            fromtext:'' //变更原因
          }
     },
    created(){
        this.loadQunti(); //加载会员群体
        this.getmember();//加载会员升降级的回显
    },
    methods:{
        onSubmit(){
            //console.log(this.fromtext)
        },
        //会员群体确定
         quntiMakeSureChecked(quntiData_select,quntiData,member_total_count,totalItem){
                this.hyqt_select_data = quntiData_select;
                this.count = member_total_count;
                this.hyqtData = quntiData;
                this.dialogQunti = false;
                this.severqueti=totalItem;

        },
        quntiCancleButton(){
                this.dialogQunti = false;
        },
        openDialogQunti: function(e) { //打开会员群体，发送会员群体请求
                this.dialogQunti = true;
               
        },
        loadQunti() {
                getHuiyuanQunti().then((response) => {
                    this.hyqtData = response;
                    //过滤会员群体添加的清除的对象  之前老系统 是下拉框有清楚
                    this.hyqtData = this.hyqtData.filter((obj, index) => {
                        return obj.id != 'clear'
                    });
                })
            },
            deleteItem(items, it, str, e){
                let arrays = [];
                items.forEach(item => { //把当前的对象在 对象数组中删除
                    if(item.id != it.id) {
                        arrays.push(item);
                    }
                });
                 if(str == "qunti") { //判断是群体，
                    this.hyqt_select_data = arrays;
                    this.tableDataFilter_parent = arrays;           
                    this.count = 0;
                    this.severqueti=0;
                    this.hyqt_select_data.forEach(row => { //统计人数
                        this.count += row.members_count;
                        this.severqueti=this.severqueti+1

                    });
                } 
                
            },
            //会员升降级的回显
            getmember(){
                let _this=this;
                getListmember().then((res)=>{
                    if(res.success == true){
                        res.data.map(function(i){
                           
                        })
                    }
                })
            }
    },
    components:{
        TzxGroupSelect
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
    .memberfall{
        height:auto;
        overflow: hidden;
        zoom:1;
        background: #FEFEFE;
        .memberfall_title{
            position: relative;
            height: 50px;
            margin: 0 20px 20px;
            line-height: 50px;
            border-bottom: 1px solid #EAF1F6;
            span{
                margin-left: 10px;
                font-size: 16px;
                color: #34495E;
            }
        }


        .memberChioce{
            /* 步骤条样式开始*/
            .stepWrap{
                display:flex;
                flex-flow: column;
                height:100%;
                .steps{
                    position: relative;
                    flex-shrink: 1;
                    display:flex;
                    .step_head{
                        position: relative;
                        width:100%;
                        flex-grow: 0;
                        width: 24px;
                        .step_line{
                            position: absolute;
                            border-color: inherit;
                            background-color: #c0c4cc;
                            width: 2px;
                            top: 0;
                            bottom: 0;
                            left: 14px;
                        }
                        .step_text{
                            position: relative;
                            z-index: 1;
                            display: inline-flex;
                            justify-content: center;
                            align-items: center;
                            width: 30px;
                            height: 30px;
                            font-size: 14px;
                            box-sizing: border-box;
                            background: #fff;
                            transition: .15s ease-out;
                            border-radius: 50%;
                            border: 2px solid #D5DEE5;
                           
                            background:#D5DEE5;
                            .step_icon-inner{
                                    display: inline-block;
                                    user-select: none;
                                    text-align: center;
                                    font-weight: 700;
                                    line-height: 1;
                                    color: #fff;
                            }
                        }
                    }
                    .step_main{
                        white-space: normal;
                        text-align: left;
                        padding-left: 25px;
                        flex-grow: 1;
                        margin-right: 20px;
                        .main_sed{
                            margin-bottom: 30px!important;
                        }
                        .main_fist{
                            margin-bottom: 5px!important;
                        }
                        .el-form-item{
                             
                            .el-form-item__label{
                                margin-left: 0px!important;
                                padding-right: 7px!important;
                            }
                            .el-form-item__content{
                                  .botton_text{
                                    font-family: PingFangSC-Regular;
                                    font-size: 14px;
                                    color: #0C9AFF;
                                    line-height: 14px;
                                    font-style: normal;

                                }
                            }
                            .el-textarea{
                                margin-bottom: 15px;
                            }
                            .el-radio-group{
                                clear: both;
                                margin-top: 5px;
                                margin-left: 8px;
                                .el-radio-button{
                                    margin-right: 14px;
                                    .el-radio-button__inner{
                                        border:none!important;
                                        border:1px solid  #D8E5EC!important;
                                        border-radius: 3px;
                                    }
                                    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                                        box-shadow:0!important;
                                         border:none!important;
                                         padding:10px 15px;
                                    }
                                }
                            }
                        }
                        .yi_person_num{
                            
                            h2 {
                                border: none;
                                font-size: 14px;
                                margin-left: 0px;
                                margin-right: 0px;
                                height: 32px;
                                line-height: 32px;
                                float: left;
                            }
                            tt{
                                color: #FF7171;
                                height: 32px;
                                line-height: 32px;
                                float: left;
                            }
                            cite{
                                letter-spacing: 0;
                                float: left;
                                line-height: 32px;
                                height: 32px;
                            }
                        }
                         .xuanze {
                            list-style: none;
                            margin: 0;
                            padding: 0;
                            margin-top: 7px;
                            li {
                                border: 1px solid #D8E5EC;
                                border-radius: 3px;
                                width: auto;
                                margin-right: 18px;
                                float: left;
                                line-height: 32px;
                                margin-bottom: 7px;
                                em {
                                    margin-left: 8px;
                                }
                                img {
                                    margin-left: 5px;
                                    margin-right: 8px;
                                }
                            }
                        }

                    }
                    &:last-of-type .step_line{
                        display: none;
                    }
                }
                .is-steps{
                    flex-basis: auto!important;
                    flex-shrink: 0;
                    flex-grow: 0;
                }
            }

            /*步骤条样式结束*/
            .memberForm{
                padding:10px 0 0 40px;
                position: relative;
                /*取消按钮样式*/
                .quxiao_and_tijiao{
                    height: 82px;
                    margin:0 40px;
                    border-top: 1px dashed #EAF1F6;
                    .bottom_64_32{
                        margin-top: 30px;
                        margin-bottom: 30px;
                    }
                }
            }
            /*取消按钮样式结束*/
        }
        .hdzl_qunti .dialog-footer{
            text-align: center;
        }

    }
</style>