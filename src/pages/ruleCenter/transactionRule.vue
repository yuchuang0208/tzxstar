<template>
	<div class="transactionRule">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="交易基本规则" name="first">
                <div class="transaction">
                    <el-form ref="form" label-width="210px" :model="form">
                        <el-form-item label="消费时储值账户金额扣减规则：">
                            <el-radio-group v-model="form.hykxfzhkjgz">
                                <el-form-item><el-radio label="weight">按权重比例扣减储值的主赠账户余额</el-radio> 
	                                <el-tooltip class="item" effect="dark" content="例：主账户余额为150元，赠送账户余额50元，消费金额80，则账户实际扣减情况:主账户扣减的金额=80*150/（150+50）=60元；赠送账户扣减金额=80*50/（150+50）=20元" placement="top-start">
										<icon-svg icon-class='question'></icon-svg>
									</el-tooltip>
                                </el-form-item>
                                <el-form-item><el-radio label="main">先扣减储值的主账户余额</el-radio></el-form-item>
                                <el-form-item><el-radio label="reward">先扣减储值的赠送账户余额</el-radio></el-form-item>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="消费主账户小数点处理方式：">
                            <el-radio-group v-model="form.hykzzhzsdqzfs">
                                <el-radio label="half_adjust">四舍五入取整</el-radio>
                                <el-radio label="rounding">全舍取整</el-radio>
                                <el-radio label="one_adjust">进1取整</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="消费验证方式支持：">
                            <el-checkbox v-model="form.sfzcsjhxf" label="true">手机号身份识别</el-checkbox>
                            <el-checkbox v-model="form.sfzcwxewhenjiuyiqianf" label="true">微信二维码身份识别</el-checkbox>
                        </el-form-item>
                        <el-form-item label="第一次充值消费规则：">
                            <el-form-item>
                                <span>第一次充值后第一次储值消费上限为：该卡账户余额的</span>
                                <el-input placeholder="" prop="dycczxfsx" v-model="form.dycczxfsx" style="width:120px;" :rules="filter_rules({required:true})">
                                    <template slot="append">%</template>
                                </el-input>
                                <el-tooltip class="item" effect="dark" content="例:充值500元赠送100元，第一次消费最高金额为（500+100）*90%=540元（账户余额=主账户余额+赠送账户余额）" placement="top-start">
									<icon-svg icon-class='question'></icon-svg>
								</el-tooltip>
                            </el-form-item>
                            <el-form-item class="special">
                                <span>第一次充值赠送的金额在第一次消费时：</span>
                                <el-radio-group v-model="form.hydycxfsycz">
                                    <el-radio label="1">可用</el-radio>
                                    <el-radio label="0">不可用</el-radio>
                                </el-radio-group>
                                <el-tooltip class="item" effect="dark" content="例:会员充值100元赠送20元，会员账户总金额为120元，第一次消费扣减储值金额最大为100元" placement="top-start">
									<icon-svg icon-class='question'></icon-svg>
								</el-tooltip>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="会员价和会员折扣规则：">
                            <el-radio-group v-model="form.hyyhzh">
                                <el-form-item><el-radio label="1">方式1：<span>只使用会员价</span>实付金额=会员价菜品总额+不可优惠菜品总额</el-radio>
                                	<el-tooltip class="item" effect="dark" content="例：会员价菜品总额50元，不可优惠菜品总额100元，会员享受8折优惠，则实付金额=50+100=150元，即使存在会员折扣也不可使用)" placement="top-start">
										<icon-svg icon-class='question'></icon-svg>
									</el-tooltip>
                                </el-form-item>
                                <el-form-item><el-radio label="2">方式2：<span>只使用会员折扣</span>实付金额=可打折菜品总额x会员折扣百分比+不可优惠菜品</el-radio>
                                	<el-tooltip class="item" effect="dark" content="例：可打折菜品总额50元，不可优惠菜品总额100元，会员享受8折优惠，则实付金额=50x80%+100=140元，即使存在会员价菜品也不可使用会员价)" placement="top-start">
										<icon-svg icon-class='question'></icon-svg>
									</el-tooltip>
                                </el-form-item>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="积分和优惠券交易规则：">
                            <el-radio-group v-model="form.hyyhzfzhgz">
                                <el-form-item><el-radio label="3">当积分和优惠券并存时，积分和优惠券<span>同时使用</span></el-radio></el-form-item>
                                <el-form-item><el-radio label="2">当积分和优惠券并存时，<span>只能使用积分或优惠券</span></el-radio></el-form-item>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="预存主账户最高金额：">
                            <el-radio-group v-model="form.sfxzzzhyczgje">
                                <el-radio label="N">不限制</el-radio>
                                <el-radio label="Y">限制</el-radio>
                            </el-radio-group>
                            <el-input v-if="form.sfxzzzhyczgje == 'Y'" v-model="form.zzhzdye" style="width:120px;">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item style="margin-left:160px;">
                            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane name="second">
            	<span slot="label">储值消费门店分组
                    <el-tooltip class="item" effect="dark" content="用户的储值金额消费可在分组内门店使用，未分组的门店单店可用（如:A店B店C店为一组，在A店充值那么ABC店可通用；在D店充值只可在D店使用）" placement="top-start">
                        <icon-svg icon-class='question'></icon-svg>
                    </el-tooltip>
                </span>

            	
                <div class="transaction">
                    <el-form ref="form2" label-width="20px" :model="form2">
                        <el-form-item label="">
                            <el-radio-group v-model="form2.kjesyfw">
                                <el-form-item>
                                    <el-radio label="all">全部通用</el-radio>
                                    <el-tooltip class="item" effect="dark" content="用户的储值金额消费在品牌下全部门店通用" placement="top-start">
                                        <icon-svg icon-class='question'></icon-svg>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item>
                                    <el-radio label="single">单店使用</el-radio>
                                    <el-tooltip class="item" effect="dark" content="用户的储值金额消费每一个门店单独使用（A店充的A店用，B店充的B店用）" placement="top-start">
                                        <icon-svg icon-class='question'></icon-svg>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item>
                                    <el-radio label="group">分组使用</el-radio>
                                    <el-tooltip class="item" effect="dark" content="用户的储值金额消费可在分组内门店使用，未分组的门店单店可用（如:A店B店C店为一组，在A店充值那么ABC店可通用；在D店充值只可在D店使用）" placement="top-start">
                                        <icon-svg icon-class='question'></icon-svg>
                                    </el-tooltip>
                                </el-form-item>
                            </el-radio-group>
                        </el-form-item>
                        <div v-if="form2.kjesyfw.toString().indexOf('group') != -1">
                            <el-input placeholder="请输入门店分组" icon="search" v-model="form2.search" :on-icon-click="handleIconClick" style="width:200px;"></el-input>
                            <a href="javascript:;" class="addMemberLevel" @click='mystoreDialogVisible = true'><span>+</span><span>新增门店分组</span></a>
                        
                            <el-table :data="tableData" style="width: 100%" empty-text='暂无任何数据' element-loading-text="给我一点时间">
                                <el-table-column prop="name" label="分组名称" width="140"></el-table-column>
                                <el-table-column prop="organ_name" label="分组门店"></el-table-column>
                                <el-table-column prop="number" label="门店数量" width="160" align="center"></el-table-column>
                                <el-table-column prop="operation" label="操作" width="160" align="center">
                                    <template scope="scope">
                                        <span @click="updateShopList(scope.row)">编辑</span>
                                        <span @click="deleteShopList(scope.row)">删除</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <el-form-item style="margin:20px 0;">
                            <el-button type="primary" @click="saveOrganGroup(form2)">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <tzx-group-store-dialog 
                    @makeSureStoreButton="mymakeSureStoreButton"
                    @close="myClose"  
                    :storeDialogVisible="mystoreDialogVisible" 
                    :storeCheckedIds="echo_store_ids"
                    :name="groupName">
                </tzx-group-store-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {saveTransactionRule,updateTransactionRule,getShopList,saveShopList,deleteShopList,saveOrganGroup} from '@/api/ruleCenter';
import { TzxGroupStoreDialog } from '@/components/tzxgroupstoredialog';
export default {
    components:{TzxGroupStoreDialog},
    data() {
		return {
            activeName:'first',
            form: {
                id: '',
                hykxfzhkjgz: 'weight',//消费时储值账户金额扣减规则
                hykzzhzsdqzfs: 'half_adjust',//消费主账户小数点取整方式
				sfzcsjhxf: true,//手机号验证
                sfzcwxewhenjiuyiqianf: true,//二维码验证
                dycczxfsx: 0,//消费上线百分比
                hydycxfsycz: '0',//第一次充值赠送的金额在第一次消费时
                hyyhzh: '1',//会员价和会员折扣规则
                hyyhzfzhgz: '3',//积分和优惠券交易规则
                sfxzzzhyczgje: 'Y',//是否限制预存账户的金额
                zzhzdye: 0,
                tableName: 'sys_parameter',
                hyczdx_id: '',
                hyxfdx_id: '',
                sfzcwxewtzxstartf_id: '',
                dkrljxfje_id: '',
                dkdbxfje_id: '',
                hyjfzddx_id: '',
                dycczxfsx_id: '',
                hykzzhzsdqzfs_id: '',
                hykxfzhkjgz_id: '',
                sfzcsjhxf_id: '',
                hydycxfsycz_id: '',
                sfzcwxewhenjiuyiqianf_id: '',
                sfxzzzhyczgje_id: '',
                ycjesfxyjh_id: '',
                hyyhzfzhgz_id: '',
                hyyhzh_id: '',
                zzhzdye_id: ''
            },
            form2: {
                kjesyfw: 'all',
                search: '',
            },
            tableData: [],
            id: '',
            mystoreDialogVisible:false,
            mynodes:[],//选中的节点
            groupName:'',//分组名称
            echo_store_ids:[],//用户编辑初始化下拉框勾选
		}
	},
    methods: {
        myClose(flag){
          this.mystoreDialogVisible = flag;
        },
		handleClick(tab, event){
            /*点击第一个标签页*/
            if(tab.name == 'first') {

            }
            /*点击第二个标签页*/
            if(tab.name == 'second') {
                this.getShopList();
            }
        },
        onSubmit(form){//保存交易基本规则
            if(this.form.dycczxfsx == 0){
                this.$message({
                    type: 'error',
                    message: '账户余额百分比不能为空'
                });
                return false;
            }
            if(this.form.sfxzzzhyczgje == 'Y'){
                if(this.form.zzhzdye == ''){
                    this.$message({
                        type: 'error',
                        message: '账户余额百分比不能为空'
                    });
                    return false;
                }
            }else{
                this.form.zzhzdye == '';
            }
            if(this.form.sfzcsjhxf){
                this.form.sfzcsjhxf = 'Y';
            }else{
                this.form.sfzcsjhxf = 'N';
            }
            if(this.form.sfzcwxewhenjiuyiqianf){
                this.form.sfzcwxewhenjiuyiqianf = 'Y';
            }else{
                this.form.sfzcwxewhenjiuyiqianf = 'N';
            }
            let data =  "&hykxfzhkjgz="+this.form.hykxfzhkjgz+
                        "&hykzzhzsdqzfs="+this.form.hykzzhzsdqzfs+
                        "&sfzcsjhxf="+this.form.sfzcsjhxf+
                        "&sfzcwxewhenjiuyiqianf="+this.form.sfzcwxewhenjiuyiqianf+
                        "&dycczxfsx="+this.form.dycczxfsx+
                        "&hydycxfsycz="+this.form.hydycxfsycz+
                        "&hyyhzh="+this.form.hyyhzh+
                        "&hyyhzfzhgz="+this.form.hyyhzfzhgz+
                        "&sfxzzzhyczgje="+this.form.sfxzzzhyczgje+
                        "&zzhzdye="+ this.form.zzhzdye +
                        "&tableName="+this.form.tableName +
                        "&hyczdx_id="+this.form.hyczdx_id +
                        "&hyxfdx_id="+this.form.hyxfdx_id +
                        "&sfzcwxewtzxstartf_id="+this.form.sfzcwxewtzxstartf_id +
                        "&dkrljxfje_id="+this.form.dkrljxfje_id +
                        "&dkdbxfje_id="+this.form.dkdbxfje_id +
                        "&hyjfzddx_id="+this.form.hyjfzddx_id +
                        "&dycczxfsx_id="+this.form.dycczxfsx_id +
                        "&hykzzhzsdqzfs_id="+this.form.hykzzhzsdqzfs_id +
                        "&hykxfzhkjgz_id="+this.form.hykxfzhkjgz_id +
                        "&sfzcsjhxf_id="+this.form.sfzcsjhxf_id +
                        "&hydycxfsycz_id="+this.form.hydycxfsycz_id +
                        "&sfzcwxewhenjiuyiqianf_id="+this.form.sfzcwxewhenjiuyiqianf_id +
                        "&sfxzzzhyczgje_id="+this.form.sfxzzzhyczgje_id +
                        "&ycjesfxyjh_id="+this.form.ycjesfxyjh_id +
                        "&hyyhzfzhgz_id="+this.form.hyyhzfzhgz_id +
                        "&hyyhzh_id="+this.form.hyyhzh_id +
                        "&zzhzdye_id="+this.form.zzhzdye_id;
            this.loading1 = true;
            saveTransactionRule(data).then((response) => {
                this.loading1 = false;
                if(response.success){
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    });
                    this.updateFormData();
                }else{
                    this.$message({
                        type: 'error',
                        message: response.msg
                    });
                }
            })
        },
        updateFormData(){//交易基本规则回显
            let data = 'tableName='+ this.form.tableName +
                '&model_name=会员交易规则,会员卡券规则';
            updateTransactionRule(data).then(response=>{
                let detail = response;
                this.form.hykxfzhkjgz = detail.hykxfzhkjgz;
                this.form.hykzzhzsdqzfs = detail.hykzzhzsdqzfs;
                if(detail.sfzcsjhxf == 'Y'){
                    this.form.sfzcsjhxf = true;
                }else{
                    this.form.sfzcsjhxf = false;
                }
                if(detail.sfzcwxewhenjiuyiqianf == 'Y'){
                    this.form.sfzcwxewhenjiuyiqianf = true;    
                }else{
                    this.form.sfzcwxewhenjiuyiqianf = false;
                }
                this.form.dycczxfsx = detail.dycczxfsx;
                this.form.hydycxfsycz = detail.hydycxfsycz;
                this.form.hyyhzh = detail.hyyhzh;
                this.form.hyyhzfzhgz = detail.hyyhzfzhgz;
                this.form.zzhzdye = detail.zzhzdye;
                this.form.sfxzzzhyczgje = detail.sfxzzzhyczgje;
                this.form.hyczdx_id = detail.hyczdx_id;
                this.form.hyxfdx_id = detail.hyxfdx_id;
                this.form.sfzcwxewtzxstartf_id = detail.sfzcwxewtzxstartf_id;
                this.form.dkrljxfje_id = detail.dkrljxfje_id;
                this.form.dkdbxfje_id = detail.dkdbxfje_id;
                this.form.hyjfzddx_id = detail.hyjfzddx_id;
                this.form.dycczxfsx_id = detail.dycczxfsx_id;
                this.form.hykzzhzsdqzfs_id = detail.hykzzhzsdqzfs_id;
                this.form.hykxfzhkjgz_id = detail.hykxfzhkjgz_id;
                this.form.sfzcsjhxf_id = detail.sfzcsjhxf_id;
                this.form.hydycxfsycz_id = detail.hydycxfsycz_id;
                this.form.sfzcwxewhenjiuyiqianf_id = detail.sfzcwxewhenjiuyiqianf_id;
                this.form.sfxzzzhyczgje_id = detail.sfxzzzhyczgje_id;
                this.form.ycjesfxyjh_id = detail.ycjesfxyjh_id;
                this.form.hyyhzfzhgz_id = detail.hyyhzfzhgz_id;
                this.form.hyyhzh_id = detail.hyyhzh_id;
                this.form.zzhzdye_id = detail.zzhzdye_id;
			});
        },
        getShopList(){//门店分组回显
            let data = 'sort=last_updatetime'+
                    '&org_full_name='+ this.form2.search;
            getShopList(data).then(response=>{
                let detail = response;
                this.form2.kjesyfw = detail.kjesyfw;
                this.tableData = detail.rows;
			});
        },
        deleteShopList(row){//删除门店分组
            let data = 'id='+ row.id +
                '&valid_state=2';
             deleteShopList(data).then(response=>{
                let detail = response;
                if(response.success){
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.getShopList();
                }
                else{
                    this.$message({
                        type:'error',
                        message:response.msg
                    })
                }
			});
        },
        handleIconClick() {
            this.getShopList();
        },
        mymakeSureStoreButton(nodes,name){//创建门店分组
			this.mystoreDialogVisible = false;
	      	this.mynodes = nodes;
            this.groupName  = name;
            let idList = [];
                nodes.forEach(item => {
                    idList.push(item.id); 
                });
            let data = 'id='+ this.id +
                '&name='+ name +
                '&organ_ids='+ idList;
            saveShopList(data).then(response=>{
                let detail = response;
                if(response.success){
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                    this.id = '';
                    this.groupName = '';
                    this.echo_store_ids = [];
                    this.getShopList();
                }else{
                    this.$message({
                        type:'error',
                        message:response.msg
                    })
                    this.id = '';
                    this.groupName = '';
                    this.echo_store_ids = [];
                }
                
			});
        },
        saveOrganGroup(){//保存储值消费门店分组
           let data = 'kjesyfw='+ this.form2.kjesyfw;
           saveOrganGroup(data).then(response=>{
                if(response.success){
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                    this.getShopList();
                }
                else{
                    this.$message({
                        type:'error',
                        message:response.msg
                    })
                }
			});
       },
       updateShopList(row){
            this.id = row.id;
            this.groupName = row.name;
            this.echo_store_ids = row.organ_ids.split(',');
            this.mystoreDialogVisible = true;
       }
    },
    created(){
        _czc.push(["_trackEvent", "规则中心-交易规则-交易基本规则", "点击"]);//埋点统计
        this.updateFormData();
    }
}
</script>


<style  rel="stylesheet/scss"  lang="scss">
.transactionRule{
    width: 100%;
    height: auto;
    background: #fff;
    overflow: hidden;
    .el-tabs__header{
        height: 50px;
        line-height: 50px;
        border-bottom: #eaf1f6 1px solid !important;
        margin: 0 20px;
        .el-tabs__item{
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            color: #34495E;
            padding: 0 10px;
            margin-bottom: 0;
        }
        .el-tabs__item.is-active{
            color: #20a0ff;
        }
    }
    .el-form-item__label{
        margin-left: 30px;
    }
    .el-tabs__nav-scroll{
        margin-left: 0;
        margin-right: 0;
        .el-tabs__item{
            margin-left: 0;
        }
    }
    .transaction{
        padding: 20px;
    }
    .special{
        margin-left: 40px;
    }
    .el-radio__label{
        span{
            color: #ff7272;
            padding-right: 6px;
        }
    }
    .el-input-group--append{
        margin-left: 6px;
    }
    .el-table{
        margin-top: 20px;
    }
    a.addMemberLevel{
        width: 112px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: #FF9001;
        margin: 10px 0;
        display: inline-block;
        color: #fff;
        border-radius: 3px;
        float: right;
        span:nth-child(1){
            font-size: 16px;
            display: inline-block;
            height: 28px;
            line-height: 28px;
            color: #fff;
            float: left;
            margin-left: 12px;
            margin-right: -8px;
        }
        span:nth-child(2){
            font-size: 12px;
            display: inline-block;
            height: 28px;
            line-height: 28px;
            color: #fff;
        }
    }
    .cell span{
        color: #20a0ff;
        cursor: pointer;
    }
    .el-form-item__error{
        left: 40px;
    }
}  
</style>
