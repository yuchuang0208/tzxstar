<template>
        <div class="appclass">
                <div class="app-container calendar-list-container" v-loading.body = 'loadingBody'>
                      <div class="filter-container" >
                          <el-input  v-model="updataLst.customer_id" placeholder="请输入会员ID/姓名/手机号"  icon='search'  style='width:220px' :on-icon-click='searchmemberName' ></el-input>
                          <el-button type='server'  style='float:right;'  @click="memberFall">会员升降级</el-button>
                      </div>
                      <el-table v-loading="loading" :data="tableData" empty-text='暂无任何数据' element-loading-text="给我一点时间"  style="width: 100%">
                            <el-table-column prop="customer_id" header-align='left'  label="会员ID" min-width="100"></el-table-column>
                            <el-table-column  prop="name" header-align='center'  label="姓名" align='center' min-width="100"></el-table-column>
                            <el-table-column  header-align='center'  prop="mobil" align='center' label="手机号" min-width="120"></el-table-column>
                            <el-table-column header-align='center'  prop="original_level_name"  label="变更前等级" align='center' min-width="140"></el-table-column>
                            <el-table-column  header-align='center'  prop="level_name" align='center' label="变更后等级" min-width="140"></el-table-column>
                            <el-table-column header-align='center'  prop="type"  label="变更方式" align='center' min-width="140"></el-table-column>
                            <el-table-column  header-align='center'  align='center' label="变更原因" min-width="140"></el-table-column>
                            <el-table-column header-align='center'  prop="time"  label="变更时间" align='center' min-width="200"></el-table-column>
                            <el-table-column  header-align='center' prop="last_operator" label="操作人" min-width="100" fixed='right'></el-table-column>
                      </el-table>
                      <div class="pagination-container">
                          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="updataLst.page" :page-sizes="[10, 20, 30, 50]" :page-size="updataLst.rows" layout="prev, pager, next,total, jumper,sizes" :total="updataLst.total">
                          </el-pagination>
                    </div>
                </div> 
        </div>
</template>

<script>
  import { getListupgread } from '@/api/memberupgread'
  export default {
          data(){
            return{
              loadingBody:false,
              loading:false,
              tableData:[],
              updataLst:{
                        name:'', //模糊搜索姓名
                        mobil:'', //模糊搜索手机号
                        customer_id:'', //模糊搜索会员id
                        total: 0,
                        page: 1,
                        rows:this.$store.state.user.screenPageSize,
                        sort:'time',
                        order:'asc'
              }
             
            }
          },
          methods:{
            //模糊搜索
            searchmemberName(){
              this.updataLst.page = 1;
              this.getmemberList(); 
            },
            /* 当前页显示条数改变是触发*/
            handleSizeChange(val) {
              this.updataLst.rows = val;
              this.getmemberList(); 
            },
            /* 页码改变时触发*/
            handleCurrentChange(val) {
              this.updataLst.page = val;
              this.getmemberList(); 
            },
            memberFall(){
              this.$router.push({
                path:'/member/member_fall'
              })
            },
            //会员升降级列表
            getmemberList(){
              this.loading = true;
              let _this=this;
              let data='&customer_id='+ _this.updataLst.customer_id +
                                        '&page=' + _this.updataLst.page +
                                        '&rows=' + _this.updataLst.rows +
                                        '&sort=' + _this.updataLst.sort +
                                        '&order=' + _this.updataLst.order
                     
              getListupgread(data).then((res)=>{
                      res.rows.map(function(i){
                       //会员id
                       i.customer_id ?  i.customer_id : i.customer_id = '--';
                       //姓名
                       i.name ? i.name : i.name = '--';
                       //手机号
                       i.mobil ? i.mobil : imobil = '--';
                       //变更前等级
                       i.original_level_name ? i.original_level_name : i.original_level_name =' --';
                       //变更后的等级
                       i.level_name ? i.level_name : i.level_name = '--';
                       //变更方式
                       i.type ? i.type : i.type = '--';
                       //变更原因
                       //变更时间
                       i.last_updatetime ? i.last_updatetime : i.last_updatetime = '--';
                      })
                      _this.loading=false;
                      _this.tableData=res.rows;
                      _this.updataLst.total=res.total;
                      
              })
            }
          },
          created(){
           this.getmemberList();
          }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>