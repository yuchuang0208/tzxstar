<template>
        <div class="appclass strorevalue">
                <div class="app-container calendar-list-container" v-loading.body = 'loadingBody'>
                      <div class="storetitle">
                        <span>储值限额设置</span>
                        <el-tooltip class="item" effect="dark" content="门店若不设置单次储值金额上限表示不限制（该功能常用于加盟店）" placement="top-start">
                    <icon-svg icon-class='question'></icon-svg>
                  </el-tooltip>
                      </div>
                      <div class="filter-container" >
                         <el-input v-model="storeList.org_name"  placeholder="请输入门店名称"  icon='search' :on-icon-click='searchstroreName' style='width:220px'></el-input>
                         <el-button type='server' icon='plus' style='float:right;margin-left: 10px;' @click="updataStore()">创建门店储值限额</el-button>
                      </div>
                      <el-table v-loading="loading" :data="storeData" empty-text='暂无任何数据' element-loading-text="给我一点时间"  style="width: 100%">
                            <el-table-column  prop="org_full_name" header-align='left'  label="门店" min-width="80"></el-table-column>
                            <el-table-column  prop="limit_money"  :formatter="moneyFormat" header-align='right'  label="单次储值金额上限" align='right' min-width="60">
                              <template scope ='scope'>
                                {{scope.row.limit_money|currency}}            
                              </template> 
                            </el-table-column>
                            <el-table-column  prop="last_operator" header-align='center'   align='center' label="最终编辑人" min-width="80"></el-table-column>
                            <el-table-column  prop ="last_updatetime" header-align='center'   label="编辑时间" align='center' min-width="90"></el-table-column>
                            <el-table-column  header-align='center'  label="操作" align='center' min-width="60" >
                                <template scope="scope">
                                    <tzx-tag color="#0C9AFF" @clickThis="updataStore(scope.row)">编辑</tzx-tag> 
                                   <tzx-tag  color="#0C9AFF" @clickThis='del(scope.row)'>删除</tzx-tag> 
                                </template>
                            </el-table-column>
                      </el-table>
                      <div class="pagination-container">
                          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="storeList.page" :page-sizes="[10, 20, 30, 50]" :page-size="storeList.rows" layout="prev, pager, next,total, jumper,sizes" :total="storeList.total">
                          </el-pagination>
                    </div>
                </div> 
                <el-dialog :title="title" :visible.sync="dialogedit">
                      <el-form :model="mendianFrom" ref="mendianFrom" label-width="110px"  :rules="rules">              
                          <el-form-item v-if="flag" label="选择门店："  prop="mendian" style="margin-top:20px;" >

                     <tzx-tree-input-node v-if="chuzhi" @getButton='getStoresIds' :pnodes="storeId" :isLeaf="isChuleaf"></tzx-tree-input-node> 
                        </el-form-item>
                        <el-form-item v-else label="门店名称：" style="margin-top:20px;" >
                            <span>{{mendianFrom.mendian}}</span>
                        </el-form-item>
                          <el-form-item label="金额上限：" prop="limit_money">
                          <el-input   min="0" step="1" type="number" style='width:230px;' v-model="mendianFrom.limit_money">
                            <template slot="append">元</template>
                          </el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogedit = false">取 消</el-button>
                          <el-button type="primary" :loading="loading_btn" @click="onsubmitForm('mendianFrom')">确 定</el-button>
                      </div>
            </el-dialog>
        </div>
</template>

<script>
import { TzxTag } from '@/components/tag'
import  { TzxTreeInputNode } from '@/components/TzxTreeInputNode';
import { getStorevalue,estabStoremone,delectStore } from '@/api/storedvalueRules'
  export default {
          components: {
            TzxTag,
            TzxTreeInputNode
          },
          data(){
            return{
              loadingBody:false,
              loading:false,
              storeData:[],
              node:{},//门店id数组
              storeId:{},//门店id
              chuzhi:true,
              isChuleaf:true,
              storeList:{
                    org_name:'',  //门店搜索
                    total: 0,
                    page: 1,
                    rows:  this.$store.state.user.screenPageSize,
                    valid_state:1,
                    order:'desc',
                    sort: 'last_updatetime',
              },
              flag: false,
              dialogedit: false,  //显示隐藏
              title:'',//标题
              loading_btn: false,
              store_id:'',  //门店id
              mendianFrom:{
                id:0, //该行的id
                mendian:'',   //门店名称
                limit_money:'', //金额限上
                tableName:'hq_organ_franchisees'  //表名称
              },
                rules: {
                  mendian :[
                      { 
                        required: true,
                        message: '请选择门店',
                        trigger: 'blur' 
                      }
                  ],
                  limit_money:[
                      { 
                        required: true,
                        message: '请输入金额上限',
                        trigger: 'blur' 
                      },
                      {
                          min: 1,
                          max: 6,
                          message: '金额上限最多输入6位正整数',
                          trigger: 'blur'
                      }
                  ]

                } 
            }
          },
            created(){
                this.getStorelist(); 
            },
          methods:{
            
            //金额前面+￥
            moneyFormat(row, column) {
              let value = row[column.property];
              return "￥" + value;
            },
            //点击搜索框调用的方法
            searchstroreName(){
             
                this.storeList.page = 1;
               this.getStorelist(); 
            },
            /* 当前页显示条数改变是触发*/
            handleSizeChange(val) {
                this.storeList.rows = val;
                this.getStorelist(); 
            },
            /* 页码改变时触发*/
            handleCurrentChange(val) {
                this.storeList.page = val;
                this.getStorelist(); 
            },
            //获取储值限额列表
            getStorelist(){
                _czc.push(["_trackEvent", "规则中心-储值规则-储值列表", "查看"]);//埋点统计
                this.loading = true;
                let _this = this;
                let data = 'org_name='+_this.storeList.org_name+
                                                            '&valid_state=' + _this.storeList.valid_state +
                                                            '&page=' + _this.storeList.page +
                                                            '&rows=' + _this.storeList.rows +
                                                            '&order=' + _this.storeList.order+
                                                            '&sort='+_this.storeList.sort
                 
                getStorevalue(data).then((res)=>{
                    if(res.success == true){
                        res.rows.map(function(i){
                            //门店
                            i.org_full_name ? i.org_full_name : i.org_full_name = '--';
                            //编辑人
                            i.last_operator ? i.last_operator  : i.last_operator = '--';
                            //编辑时间
                            i.last_updatetime ? i.last_updatetime : i.last_updatetime ='--';
                        })
                        _this.loading = false;
                        _this.storeData = res.rows;
                        _this.storeList.total = res.total;
                    }else{
                        _this.$message({
                            type:'error',
                            message:'获取数据失败'
                        })
                    }
                }).catch(e=>{
                    this.loading = false;
                    this.$message({
                      type:'error',
                      message:e
                    })
                  })  
            },
            updataStore(row) {
              if(row) {
                this.flag = false;
                this.dialogedit = true;
                this.title="编辑单次储值金额上限";
                this.mendianFrom.mendian=row.org_full_name;
                this.mendianFrom.id=row.id; //该行的id
                this.store_id=row.store_id;
                this.mendianFrom.limit_money=row.limit_money;
              }else {
                this.flag = true;
                this.dialogedit = true;
                this.chuzhi=true;
                this.title = "创建单次储值金额上限";
                this.mendianFrom.mendian='';
                this.mendianFrom.limit_money='';
              }
            },
            //创建储值的确定
            onsubmitForm(mendianFrom){
                let _this = this;
                _this.$refs[mendianFrom].validate((valid)=>{
                      if(valid){
                        _this.loading_btn = true;
                        let data = '';
                        if(_this.title == "创建单次储值金额上限"){
                            data = "store_id=" +_this.mendianFrom.mendian+
                                          "&limit_money=" + _this.mendianFrom.limit_money +
                                          "&tableName=" + _this.mendianFrom.tableName
                        }else if(_this.title == "编辑单次储值金额上限"){
                            data ="id="+_this.mendianFrom.id+
                                          "&store_id=" +_this.store_id+
                                          "&limit_money=" + _this.mendianFrom.limit_money +
                                          "&tableName=" + _this.mendianFrom.tableName
                        }
                        estabStoremone(data).then((res)=>{
                            if(res.success == true) {
                                      _this.dialogedit = false;
                                      _this.loading_btn = false;
                                      _this.chuzhi=false;
                                    _this.$message({
                                      type:'success',
                                      message:res.msg
                                    })
                                    _this.getStorelist(); 
                                }else if(res.success == false){
                                    _this.$message({
                                      type:'error',
                                      message:res.msg
                                    })
                                  /*   _this.dialogedit = false;*/
                                      _this.loading_btn = false;
                                }else {
                                  _this.$message({
                                    message: '保存失败',
                                    type: 'warning'
                                  })
                                   _this.loading_btn = false;
                                }
                        }) .catch((e)=> {
                          _this.dialogedit = false;
                           _this.loading_btn = false;
                          _this.$message({
                            type: 'error',
                            message: e
                          })
                        })           
                  }else{
                        return false;
                  }
                })
            },
            getStoresIds(value){
              //获取门店的store_id 的数组
              this.node = 'value';
              this.mendianFrom.mendian =value.id + '';
            },
            //删除
            del(row){
                this.$confirm('是否删除? 删除规则后该门店将不限制单次储值金额上限', {
                showClose: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                style:"text-align:center;",
                type: 'warning' 
                }).then(()=>{
                  let data='store_id=' + row.store_id;

                  delectStore(data).then((res)=>{
                    if(res.success==true){
                      this.$message({
                        type:'success',
                        message:res.msg
                      })
                        this.getStorelist(); 
                    }else{
                      this.$message({
                        type:'error',
                        message:'删除失败'
                      })
                    }
                  }).catch((e)=>{
                    this.$message(({
                      type:'error',
                      message:e
                    }))
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            }
          }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  .strorevalue{
      .el-dialog__wrapper{
          .el-dialog--small{
              width:30%;
          }
          .el-form-item__error{
            left:41px;
          }
          .el-dialog__footer{
            background: #F4F9FC;
            text-align: center;
            .dialog-footer{
              margin-left: 0;
            }
          }
      }
        .storetitle{
           height:35px;
           line-height: 35px;
            border-bottom: 1px solid #EAF1F6;
            margin-bottom: 20px;
            span{
              font-size:16px;
              margin-bottom: 8px;
              padding:0 10px;
              color: #0C9AFF;
              float: left;
            }
            svg{
              float: left;
             cursor:pointer;
             margin-top: 10px;
            }
          }
          .select-input .select-tree-zr{
            margin-left: 40px!important;
            z-index: 101 !important;
          }
    
  }
</style>