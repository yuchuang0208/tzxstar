<template>
<!-- 卡管理组件 -->
<div class="cardAdministration">
	<div class="appclass">
		<div class="app-container calendar-list-container">
			<div class="filter-container">
				<el-input v-model="activityName" placeholder="请输入会员手机号/卡号" @change="searchCard" icon='search' :on-icon-click='searchCard' style='width:220px'></el-input>
			</div>
            <!-- 表格 -->
			<el-table v-loading="loading" element-loading-text="给我一点时间" :data="tableData" max-height='500px' style="width:100%" @filter-change="filterChange" @sort-change="sortChange">
				<el-table-column align='center' prop="card_code" label="卡号" min-width="130" fixed></el-table-column>
				<el-table-column align='center' prop="mobil" :formatter="isNotNullFormat" label="会员手机号" min-width="110"></el-table-column>
				<el-table-column align='left' prop="name" :formatter="isNotNullFormat" label="会员姓名" min-width="100"></el-table-column>
				<el-table-column align='left' prop="org_full_name" :formatter="isNotNullFormat" :filters="filterEstablishment"  column-key="org_full_name" label="办卡机构" min-width="100"></el-table-column>
				<el-table-column align='left' prop="activation_store" :formatter="isNotNullFormat" :filters="filterEstablishment" column-key="activation_store" label="激活机构" min-width="100"></el-table-column>
				<el-table-column align='left' prop="class_item" :formatter="isNotNullFormat" :filters="filterRegistrationChannels" column-key="class_item" label="注册渠道" min-width="100"></el-table-column>
				<el-table-column align='left' prop="card_class_name" label="卡类型" :formatter="isNotNullFormat" :filters="filterCardType" column-key="card_class_name" min-width="100"></el-table-column>
				<el-table-column align='center' prop="is_physical_card" label="卡属性" :formatter="isNotNullFormat" :filters="filterCardAttribute" column-key="is_physical_card" min-width="100"></el-table-column>
				<el-table-column align='right' prop="activation_date" :formatter="isNotNullFormat" sortable label="办卡时间" min-width="100"></el-table-column>
				<el-table-column align='center' prop="valid_date" label="卡有效期" min-width="180"></el-table-column>
				<el-table-column class="pdr" :formatter="isNotNullFormat" align='right' prop="main_balance" sortable label="主账户余额" min-width="110" style="padding-right: 5px;">
                    <template scope ='scope'>
                        {{scope.row.main_balance | currency | thousand}}					
                    </template>	
                </el-table-column>
				<el-table-column :formatter="isNotNullFormat" align='right' prop="reward_balance" sortable label="赠送账户余额" min-width="130">
                    <template scope ='scope'>
                        {{scope.row.reward_balance | currency | thousand}}					
                    </template>
                </el-table-column>
				<el-table-column :formatter="isNotNullFormat" align='right' prop="sales_price" sortable label="售卡金额" min-width="100">
                    <template scope ='scope'>
                        {{scope.row.sales_price | currency | thousand}}				
                    </template>
                </el-table-column>
				<el-table-column :formatter="isNotNullFormat" align='right' prop="deposit" sortable label="卡押金" min-width="100">
                    <template scope ='scope'>
                        {{scope.row.deposit | currency | thousand}}					
                    </template>
                </el-table-column>
				<el-table-column align='center' prop="card_state_name" :formatter="isNotNullFormat" :filters="filterStatus" column-key="card_state_name" label="状态" min-width="80"></el-table-column>
				<el-table-column align='center' label="操作" min-width="190" fixed="right">
					<template scope="scope">
                        <tzx-tag color="#0C9AFF" @clickThis='open(scope.row)'>初始化密码</tzx-tag>
						<tzx-tag color="#0C9AFF" @clickThis='change(scope.row)'>变更激活机构</tzx-tag>
					</template>
				</el-table-column>
		    </el-table>
            <!--分页  -->
            <div class="pagination-container">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper,total, sizes"
                    :total="totalCount">
                </el-pagination>
            </div>
            <el-dialog
                title="变更激活机构"  
                :visible.sync="dialogVisible"
                size="tiny"
                custom-class="xzjigoudialog"
                >
                <div class="dlog_jigou">
                    <span>原激活机构：</span>
                    <span>{{jigou}}</span>
                </div>   
                <el-form :model="form" ref="form" :rules="rules" label-width="120px">                   
                    <el-form-item label="变更激活机构：" prop="store_id" style="margin-top:20px;">
                        <tzx-tree-input-node v-if="tzxCom" @getButton='getStoresIds' :pnodes="storeId" :isLeaf="isMyLeaf"></tzx-tree-input-node>
                    </el-form-item>
                </el-form>
                 <div slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('form')">取消</el-button>
                    <el-button type="primary" :loading="loading1" @click="submitForm('form')">确定</el-button>
                </div> 
            </el-dialog>
		</div>		
	</div>
</div>
</template>

<script>
	import { TzxTag, TzxOption } from '@/components/tag'
    import debounce  from 'lodash/debounce';
    import  { TzxTreeInputNode } from '@/components/TzxTreeInputNode';
    import { findAllCustomerCard,updateCustomerCardPass,findAllScreen,updateCardActivationStore} from '@/api/cardAdministration'
	export default {
		  name: 'cardAdministration',
		  components: {
			TzxTag,
            TzxOption,
            TzxTreeInputNode
        },
        // watch: {
	    //   filterText(val) {
	    //     this.$refs.classTree.filter(val);
	    //   }
	    // },
  		data(){
  			return{
                node:{},//门店id数组
				storeId:{},//门店id
                isMyLeaf: true,
                tzxCom: true,//利用if来销毁组件的生命周期
                filterEstablishment: [],//处理办卡机构
                filterRegistrationChannels: [],//处理注册渠道
                filterCardType: [],//处理卡类型
                filterCardAttribute: [],//处理卡属性
                filterStatus: [],//处理状态
                form: {
                    store_id: '',
                    store_name: '',                   
                },
                listQuery: {
                    id: '',//会员id
                    subject: '',//模糊搜索内容
                    store_id: '',//办卡机构id
                    activation_store_id: '',//激活机构id
                    chanel: '',//渠道编码
                    is_physical_card: '',//卡属性
                    card_class_id: '',//卡类型
                    state: '',//状态           
                    sort: 'id',//排序内容
                    order: 'desc'//排序方式
                },
				activityName: '',//搜索绑定输入内容,模糊搜索
                tableData: [],//表格数据   
                flag: false,                             
                loading: false,//页面加载等待
                loading1: false,//按钮加载等待
                currentPage: 1,
                pageSize: 20,
                totalCount: 0,
                dialogVisible: false,//dialog对话框
                jigou: '总部',
                rules: {//表单验证  
                    store_id :[
						{ required: true, message: '请选择变更激活机构', trigger: 'blur' }
					],               
                },
                organsData: [],//机构列表
                defaultProps: {
		          children: 'children',
		          label: 'name',
		          id:'id'
                },
                flags: true,
                styles: 'sanjiao',
                isselecttree: false,
                filterText: '',
  			}
        },
		methods: {
            getStoresIds(value){
				//获取门店的store_id 的数组
				this.node = value;
				this.form.store_name = value.id + '';
			},
			searchCard: debounce(function() {                 //会员搜索
                this.listQuery.subject = this.activityName;
                this.currentPage = 1;
				this.getList();
            },500),
            isNotNullFormat(row, column) {
				let value = row[column.property];
				if(value == "" || value == null || value == undefined) {
					return '--'
				}
				return value;
			},
            filterChange(filters) {  							/* 筛选条件发生变化触发*/				
				let key = Object.keys(filters)[0];
				let value = filters[key];			
				let types = value.join(",");
				if(key == 'card_state_name'){      //判断是状态选择
					this.listQuery.state = types;
				}else if(key == 'org_full_name') {//判断是办卡机构
                    this.listQuery.store_id = types;
                }else if(key == 'activation_store') {//判断是激活机构
                    this.listQuery.activation_store_id = types;
                }else if(key == 'class_item') {//判断是渠道编码
                    this.listQuery.chanel = types;                  
                }else if(key == 'is_physical_card') {//判断是卡属性
                    this.listQuery.is_physical_card = types;
                }else if(key == 'card_class_name') {//判断是卡类型
                    this.listQuery.card_class_id = types;
                }
                // console.log(key);
                // console.log(types);
				this.getList();
            },
			/* 排序条件发生变化触发*/
			sortChange({
				column,
				prop,
				order
			}) {

				this.listQuery.sort = prop;
				this.listQuery.currentPage = 1;
				if(order == 'ascending') {
					this.listQuery.order = 'asc'
				}
				if(order == 'descending') {
					this.listQuery.order = 'desc'
                }
                if(this.listQuery.sort != null){
                	this.getList();
                }
			},
            


            loadInfo() {										//加载办卡机构,激活机构,注册渠道,卡类型,卡属性
                    findAllScreen().then((response)=> {//发送请求,返回的是个数组,包含所有删选信息
                        //办卡机构-----
                        let establishmentinfo = response.organ;
                        this.filterEstablishment = this.dealEstablishment(establishmentinfo);
                        //注册渠道-----
                        let registrationChannelsInfo = response.chanel;
                        this.filterRegistrationChannels = this.dealRegistrationChannels(registrationChannelsInfo);
                        //卡类型-----
                        let cardTypeInfo = response.card_class;
                        this.filterCardType = this.dealCardType(cardTypeInfo);
                        //卡属性-----
                        let cardAttributeInfo = response.is_physical_card;
                        this.filterCardAttribute = this.dealCardAttribute(cardAttributeInfo);
                        //卡状态
                        let statusInfo = response.card_state;
                        this.filterStatus = this.dealStatus(statusInfo);
					})
			},
            dealEstablishment(establishmentinfo){							//处理办卡机构  code ==》 value
					let filterEstablishment = [];
					establishmentinfo.forEach(item =>{
							let objs = {};
							objs.text = item.name;
							objs.value = item.id;
							filterEstablishment.push(objs);
					})
                    return filterEstablishment;
                    // console.log(filterEstablishment);
            },  
            dealRegistrationChannels(registrationChannelsInfo){				//处理注册渠道  code ==》 value
					let filterRegistrationChannels = [];
					registrationChannelsInfo.forEach(item =>{
							let objs = {};
							objs.text = item.class_item;
							objs.value = item.class_item_code;
							filterRegistrationChannels.push(objs);
					})
					return filterRegistrationChannels;
            },  
            dealCardType(cardTypeInfo){				//处理卡类型  code ==》 value
					let filterCardType = [];
					cardTypeInfo.forEach(item =>{
							let objs = {};
							objs.text = item.name;
							objs.value = item.card_class_id;
							filterCardType.push(objs);
					})
                    return filterCardType;
                    // console.log(filterCardType);
            },  
            dealCardAttribute(cardAttributeInfo){				//处理卡属性  code ==》 value
					let filterCardAttribute = [];
					cardAttributeInfo.forEach(item =>{
							let objs = {};
							objs.text = item.is_physical_card_name;
							objs.value = item.is_physical_card;
							filterCardAttribute.push(objs);
					})
					return filterCardAttribute;
            },  
            dealStatus(statusInfo){				//处理卡属性  code ==》 value
					let filterStatus = [];
					statusInfo.forEach(item =>{
							let objs = {};
							objs.text = item.card_state_name;
							objs.value = item.card_state;
							filterStatus.push(objs);
					})
					return filterStatus;
            }, 
            
            


			handleSizeChange(val) {						            //每页显示数据变更
        		this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {					            //页码变更
        		this.currentPage = val;
                this.getList();
			},
            getList() {                                             //加载数据
                this.loading = true;
                let data =  
                            'page=' + this.currentPage +
                            '&rows=' + this.pageSize +
                            '&sort=' + this.listQuery.sort +
                            '&order=' + this.listQuery.order + 
                            '&mobil=' + this.listQuery.subject + 
                            '&store_id=' + this.listQuery.store_id + 
                            '&activation_store_id=' + this.listQuery.activation_store_id +
                            '&chanel=' + this.listQuery.chanel +
                            '&is_physical_card=' + this.listQuery.is_physical_card + 
                            '&card_class_id=' + this.listQuery.card_class_id +
                            '&state=' + this.listQuery.state
                            
                findAllCustomerCard(data).then( (res)=>{
                    if(res.success == true) {
                        this.tableData = res.rows;
                        this.totalCount = res.total;
                        // console.log(this.tableData);
                        this.loading = false;  
                    }else if(res.success == false) {
                            this.$message({
                            type: 'warning',
                            message: '请求超时'
                        });
                        this.loading = false; 
                    }                
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '请求失败'
                    });  
                    this.loading = false;       
                })            
            },

            open(row) {                                             //初始化卡激活密码
                _czc.push(["_trackEvent", "卡券中心-卡管理-卡管理列表", "初始化密码"]);//埋点统计
                // console.log(row.id);
                this.$confirm('是否初始化卡交易密码：123456', {
                showClose: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                style:"text-align:center;",
                type: 'warning' 
                }).then(() => {
                    let data = 'id=' + row.id;
                    updateCustomerCardPass(data).then( (res)=> {
                        if(res.success == true) {
                            // console.log('初始化卡密码成功');
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.getList();
                        }                        
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });          
                })
            },
            change(row) {                                              //变更卡激活机构
                // console.log(row);
                this.form.store_id = row.id + '';
                this.jigou = row.activation_store;
                this.dialogVisible = true;
                this.tzxCom = true;
            },
            submitForm(formName) {                                      //表单提交
                _czc.push(["_trackEvent", "卡券中心-卡管理-卡管理列表", "变更激活机构"]);//埋点统计
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading1 = true;
                        // console.log(this.form.store_id);
                        // console.log(this.form.id);

                        let data = 'id=' + this.form.store_id+
                                    '&store=' + this.node.id
                        updateCardActivationStore(data).then( (res)=> {
                            if(res.success == true) {
                                this.dialogVisible = false;
                                this.tzxCom = false;
                                this.$refs[formName].resetFields();//表单重置
                                this.form.store_name = '';
                                this.loading1 = false;
                                this.filterText = '';
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.getList();
                            }                          
                        })
                    }else {
                       // console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {                                       //取消表单提交
                this.$refs[formName].resetFields();//表单重置
                this.dialogVisible = false;
                this.form.store_name = '';
                this.loading1 = false;
                this.filterText = '';
            },

		},
		computed: {

		},
		created() {
            this.getList();//加载会员数据
            this.loadInfo();//加载删选信息
		},
		mounted() {

		}

  	}
</script>

<style rel="stylesheet/scss" lang="scss">
.cardAdministration {
    .appclass {
        .xzjigoudialog {
			.el-form-item__error {
				left: 40px;
			}
            .el-dialog__body {
                .dlog_jigou {
                    margin: 25px 25px 15px;
                    margin-left: 42px;
                    span {
                        margin-right: 27px;
                    }
                }
				.el-form {
					.el-form-item {
						.el-form-item__content {
                            min-height: 394px;
							.select-input{
								.select-tree-zr{
									margin-left: 40px!important;
								}
							}
						}
					}
				}
            }
            .el-dialog__footer {
                text-align: center;
                background-color: #F4F9FC;
            }
            
            
            
            // .el-message-box__btns {
            //     padding: 45px 30px 20px;
            //     text-align: center !important;
            // }
        }
    }
}
   


</style>