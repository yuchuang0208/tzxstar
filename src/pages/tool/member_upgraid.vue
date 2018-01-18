<template>
        <div class="appclass">
                <div class="app-container calendar-list-container" v-loading.body = 'loadingBody'>
                      <div class="filter-container" >
                          <el-input  v-model="updataLst.customer_id" placeholder="请输入会员ID/姓名/手机号"  icon='search'  style='width:220px' :on-icon-click='searchmemberName' ></el-input>
                          <el-button type='server'  style='float:right;'  @click="memberFall">会员批量升降级</el-button>
                      </div>
                      <el-table v-loading="loading" :data="tableData" empty-text='暂无任何数据' element-loading-text="给我一点时间"  style="width: 100%" @filter-change="filterChange" @sort-change="sortChange">
                            <el-table-column prop="code" header-align='left'  label="会员编号" min-width="100"></el-table-column>
                            <el-table-column  prop="name" header-align='center'  label="姓名" align='center' min-width="130"></el-table-column>
                            <el-table-column  header-align='center'  prop="mobil" align='center' label="手机号" min-width="120"></el-table-column>
                            <el-table-column header-align='center'  prop="original_level_name"  label="变更前等级" align='center' min-width="140" column-key="original_level" :filters="filterText" :formatter="memberTypeFormat"></el-table-column>
                            <el-table-column  header-align='center'  prop="level_name" align='center' label="变更后等级" min-width="140" column-key="level" :filters="filterText"  :formatter="memberafterFormat"></el-table-column>
                            <el-table-column header-align='center'  prop="type"  label="变更方式" align='center' min-width="140" column-key="type" :formatter="typeFormat"  :filters="typeText"></el-table-column>
                            <el-table-column  header-align='center' prop="reason" align='left' label="变更原因" min-width="300"></el-table-column>
                            <el-table-column header-align='center'  prop="time1"  label="变更时间" align='center' min-width="200"  sortable></el-table-column>
                            <el-table-column  header-align='center' prop="last_operator" label="操作人" min-width="100" fixed='right' align='center' ></el-table-column>
                      </el-table>
                      <div class="pagination-container">
                          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="updataLst.page" :page-sizes="[10, 20, 30, 50]" :page-size="updataLst.rows" layout="prev, pager, next,total, jumper,sizes" :total="updataLst.total">
                          </el-pagination>
                    </div>
                </div> 
        </div>
</template>

<script>
  import { getListupgread,getListmember,getType} from '@/api/memberupgread'
  export default {
          data(){
            return{
              loadingBody:false,
              loading:false,
              tableData:[],
              updataLst:{
                        original_level:'',
                        level:'',
                        original_level_name:'', //变更前等级
                        level_name:'', //变更后等级
                        type:'', //变更方式
                        name:'', //模糊搜索姓名
                        mobil:'', //模糊搜索手机号
                        customer_id:'', //模糊搜索会员id
                        total: 0,
                        page: 1,
                        rows:this.$store.state.user.screenPageSize,
                        sort:'id',
                        order:'time1'
              },
              filterText:[],
              typeText:[],
              type:0,
              code:"level_type",
              y:1,
              t3:''  //变更方式
             
            }
          },
          methods:{
            //变更前
            memberTypeFormat(row, column) {
              let original_level = row[column.property];

              if(original_level == '' || original_level== null) {
                return '--'
              } else {
                let original_level_col = this.filterText.filter(item => {
                  return original_level== item.value
                })
             
                if(original_level_col.length > 0) {
                  return original_level_col[0].text;
                } else {
                  return original_level;
                }

              }
            },
            //变更后的
            memberafterFormat(row, column){
                  let level = row[column.property];

                  if(level == '' || level== null) {
                    return '--'
                  } else {
                    let level_col = this.filterText.filter(item => {
                      return level== item.value
                    })
                 
                    if(level_col.length > 0) {
                      return level_col[0].text;
                    } else {
                      return level;
                    }

                  }
            },
            //变更方式
            typeFormat(row, column){
                let type = row[column.property];

                  if(type == '' || type== null) {
                    return '--'
                  } else {
                    let type_col = this.typeText.filter(item => {
                      return type== item.value
                    })
                 
                    if(type_col.length > 0) {
                      return type_col[0].text;
                    } else {
                      return type;
                    }

                  }
            },
            //筛选变更前和变更后的接口
            getText(){
                getListmember().then(response => {
                    response.data.map((item, index) => {
                      this.filterText.push({
                        text: item.name,
                        value:item.id
                      })
                    })
                  });
            },
           //变更方式
           getType(){
            let data ='type='+this.type+
                          '&code='+this.code+
                          '&y='+this.y

            getType(data).then(response=>{
              response.map((item,index)=>{
                this.typeText.push({
                        text: item.text,
                        value:item.id
                      })
              })
            })
           },
            /* 筛选条件发生变化触发*/
          
            filterChange(filters) {
              let key = Object.keys(filters)[0];
              let value = filters[key];
              let types = value.join(",");
              if(key == 'original_level') {
                this.updataLst.original_level = types;
              } else if(key == 'level') {
                this.updataLst.level = types;
              }else if(key == 'type'){
                this.t3=types;
              }
              this.updataLst.page = 1;
              this.getmemberList();
            },
            /* 排序条件发生变化触发*/
            sortChange({column,prop,order}) {
              this.updataLst.sort = prop;
              this.updataLst.page = 1;
              if(order == 'ascending') {
                this.updataLst.order = 'asc'
              }
              if(order == 'descending') {
                this.updataLst.order = 'desc'
              }
              this.getmemberList();

            },
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
                path:'/tool/member_fall',
                 hash:'new'
              })
            },
            //会员升降级列表
            getmemberList(){
               _czc.push(["_trackEvent", "工具中心-会员升降级-升降级列表", "查看"]);//埋点统计
              this.loading = true;
              let _this=this;
              let data = 'customer_id='+ _this.updataLst.customer_id +
                                        '&page=' + _this.updataLst.page +
                                        '&rows=' + _this.updataLst.rows +
                                        '&sort=' + _this.updataLst.sort +
                                        '&order=' + _this.updataLst.order+
                                        "&original_level="+_this.updataLst.original_level+
                                        "&level="+_this.updataLst.level+
                                        "&t3="+this.t3
                     
              getListupgread(data).then((res)=>{
                      res.rows.map(function(i){
                       //会员id
                       i.code ?  i.code : i.code = '--';
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
                       i.reason ? i.reason : i.reason ='--';
                       //变更时间
                       i.time1 ? i.time1 : i.time1 = '--';
                      })
                      _this.loading=false;
                      _this.tableData=res.rows;
                      _this.updataLst.total=res.total;
                      
              }).catch((e)=>{
                 _this.$message({
                  type:'error',
                  message:e
                 })
                  _this.loading=false;
              })
            }
          },
          created(){
           this.getmemberList();
           this.getText();
           this.getType();
          }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>