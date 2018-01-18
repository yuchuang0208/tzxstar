<template>
	<div class='cardruleedit'>
		<div class="app-container calendar-list-container" v-loading.body = 'loadingBody'>
			<div class="storetitle">
				<span>卡号规则</span>
				<el-tooltip class="item" effect="dark" content="门店若不设置卡号规则,默认按照总部规则执行" placement="right">
					<icon-svg icon-class='question'></icon-svg>
				</el-tooltip>
            </div>
			<div class="filter-container" >
				<el-input v-model="searchText"  placeholder="请输入门店名称"  icon='search' :on-icon-click='searchByMendianName' @change="searchByMendianName" style='width:220px'></el-input>
				<el-button type='server' icon='plus' style='float:right;margin-left: 10px;'@click="update()">创建门店卡号规则</el-button>
			</div>
			<el-table v-loading="loading" empty-text='暂无任何数据' element-loading-text="给我一点时间" :data="tableData" style="width: 100%">
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="store_name" column-key='store_name' align='left' label="门店" min-width="100"></el-table-column>
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="hykhqz" column-key='hykhqz' label="卡号前缀" align='center' min-width='100'></el-table-column>
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="hykhcd" column-key='hykhcd' align='center' label="卡号长度" min-width='100'></el-table-column>
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="hykhtgzf" column-key="hykhtgzf" align='center' label="卡号跳过字符" min-width='100'></el-table-column>				
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="last_operator" column-key="last_operator" label="最终编辑人" align='center' min-width='100'></el-table-column>					
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="last_updatetime" column-key="last_updatetime" label="编辑时间" align='center' min-width='180'>
				</el-table-column>
				<el-table-column header-align='center' align='center' fixed='right' v-if='tableData.length>0' label="操作" width="120">
					<template scope="scope">
						<tzx-tag color="#0C9AFF" @clickThis='update(scope.row)'>编辑</tzx-tag> 
                        <tzx-tag v-if="scope.row.store_id != 0" color="#0C9AFF" @clickThis='del(scope.row)'>删除</tzx-tag>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination-container" v-if='tableData.length>0&&total>firstPageSize'>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.rows" layout="prev, pager, next,total, jumper,sizes" :total="total">
				</el-pagination>
			</div>
		</div>
        <el-dialog :title="title" :visible.sync="dialogedit" width="37%" size="tiny">
            <el-form :model="editForm" ref="editForm" :rules="rules" label-width="110px">              
				<el-form-item v-if="flag" label="选择门店：" prop="mendian" style="margin-top:20px;">
					<tzx-tree-input-node v-if="tzxCom" @getButton='getStoresIds' :pnodes="storeId" :isLeaf="isMyLeaf"></tzx-tree-input-node>
                </el-form-item>
				<el-form-item v-else label="门店名称：" style="margin-top:20px;">
                    <span>{{editForm.mendian}}</span>
                </el-form-item>
                <el-form-item label="卡号前缀：">
                	<el-input type="age" v-model="editForm.cardPrefix" placeholder="最多4位数字或字符" style="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="卡号长度：" prop="cardLength">
                    <el-input v-model="editForm.cardLength" type="number" placeholder="8-20之间任意整数" style="width:230px;"></el-input>
                </el-form-item>
                <el-form-item label="卡号跳过：">
					<el-tooltip class="item" effect="dark" content="生成的卡号将跳过选择的数字，最多选择3个" placement="bottom-start">
						<div class="icon_tip">
							<icon-svg icon-class='question'></icon-svg>
						</div>
					</el-tooltip>
                    <el-checkbox-group @change="checkboxChange" v-model="editForm.cardJump" :min="0" :max="3">
                        <el-checkbox v-for="city in cities" :disabled="city.bool" :label="city.label" :key="city.id">{{city.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogedit = false">取 消</el-button>
                <el-button type="primary" :loading="loading_btn" @click="submitForm('editForm')">确 定</el-button>
            </div>
        </el-dialog>
	</div>
</template>
<script>
	import { TzxTag } from '@/components/tag'
	import debounce  from 'lodash/debounce';
	import { loadStoreCardRule,saveStoreCardRule,findStoreCardRule,deleteCardRule } from '@/api/ruleCenter';
	import  { TzxTreeInputNode } from '@/components/TzxTreeInputNode';
	export default {
		components: {
			TzxTag,
			TzxTreeInputNode
		},
		data() {
			return {
				node:{},//门店id数组
				storeId:{},//门店id
				isMyLeaf: true,
				tzxCom: true,
				firstPageSize: this.$store.state.user.screenPageSize,
				total: 0,
				loadingBody:false,
				searchText: '',//搜索框绑定
				listQuery: {
					class_name: '',//门店名称搜索
					region: '',//区域
					page: 1,
					rows: this.$store.state.user.screenPageSize,
					sort: 'last_updatetime',
					order: 'desc'
				},
				tableData:[],//卡号规则列表
				title: '',
				loading:false,
				loading_btn: false,
                dialogedit: false,
				// cities: ['0','1','2','3','4','5','6','7','8','9'],
				cities: [
					{label: '0',id:0,bool:false},
					{label: '1',id:1,bool:false},
					{label: '2',id:2,bool:false},
					{label: '3',id:3,bool:false},
					{label: '4',id:4,bool:false},
					{label: '5',id:5,bool:false},
					{label: '6',id:6,bool:false},
					{label: '7',id:7,bool:false},
					{label: '8',id:8,bool:false},
					{label: '9',id:9,bool:false},
				],
				store_id: '',
                editForm: {
					id: 0,//门店id
                    mendian: '',//门店名称
                    cardPrefix: '',//卡号前缀
                    cardLength: '',//卡号长度
                    cardJump: [],//卡号跳过
                },
				flag: false,//判断显示门店
				rules: {
					mendian :[
						{ required: true, message: '请选择门店', trigger: 'blur' }
					],
					cardLength: [
						{ required: true, message: '卡号长度不能为空', trigger: 'blur'}
					]
				}	
			}
		},
		methods: {
			checkboxFn(value) {
				if(value.length >= 3) {
					let fst = value[0];
					let sec = value[1];
					let ser = value[2];
					this.cities.forEach(item=> {
						item.bool = true;
					});
					this.cities[fst].bool = false;
					this.cities[sec].bool = false;
					this.cities[ser].bool = false;
				}else {
					this.cities.forEach(item=> {
						item.bool = false;
					});
				}
			},
			checkboxChange(val) {
				this.checkboxFn(val);
			},
			//点击搜索按钮调用的方法
			searchByMendianName: debounce(
				function(){
				this.listQuery.class_name = this.searchText;
				this.listQuery.page = 1;
				this.getList();
			},500),
			//获取列表信息
			getList(){
				let  data = 'page='+this.listQuery.page+
							   '&rows='+this.listQuery.rows+
							   '&sort='+this.listQuery.sort+
							   '&order='+this.listQuery.order+
							   '&store_name='+this.listQuery.class_name
					this.loading = true;		   
					loadStoreCardRule(data).then(response=>{						
						if(response.success == true){
							this.tableData = response.rows;
							this.total = response.total;
							this.loading = false;	
						}else{
							this.$message({
								type:'error',
								message:response.msg
							});
							this.loading = false;
						}
					}).catch(e=>{
						this.loading = false;
						this.$message({
							type:'error',
							message:e
						})
					})							   
			},
			/* 当前页显示条数改变是触发*/
			handleSizeChange(val) {
				this.listQuery.rows = val
				this.getList()
			},
			/* 页码改变时触发*/
			handleCurrentChange(val) {
				this.listQuery.page = val
				this.getList()
			},
			isNotNullFormat(row, column) {
				let value = row[column.property];
				if(value == "" || value == null || value == undefined) {
					return '--'
				}
				return value;
			},
			update(row){
				
				var _this = this;
				if(row) {
					_czc.push(["_trackEvent", "规则中心-卡号规则-卡号规则列表", "编辑卡号规则"]);//埋点统计
					this.flag = false;
					this.title = '编辑卡号规则';
					this.dialogedit = true;
					this.editForm.mendian = row.store_name;
					this.store_id = row.store_id;				
					this.editForm.cardPrefix = row.hykhqz;				
					this.editForm.cardLength = row.hykhcd;
					if(row.hykhtgzf == '' || row.hykhtgzf == null) {
						this.editForm.cardJump = [];
					}else {
						this.editForm.cardJump = row.hykhtgzf.split(",");
						this.checkboxFn(this.editForm.cardJump);
					}								
				}else {					
					_czc.push(["_trackEvent", "规则中心-卡号规则-卡号规则列表", "创建卡号规则"]);//埋点统计
					this.dialogedit = true;
					this.flag = true;
					this.tzxCom = true;
					this.title = '创建卡号规则';
					this.editForm.mendian = '';		
					this.editForm.cardPrefix = '';				
					this.editForm.cardLength = '';				
					this.editForm.cardJump = [];
					this.cities.forEach(item=> {
						item.bool = false;
					});
				}		
			},
			//编辑提交表单
			submitForm(editForm) {
				_czc.push(["_trackEvent", "规则中心-卡号规则-卡号规则创建", "提交创建卡号规则"]);//埋点统计
				this.$refs[editForm].validate((valid) => {
					if (valid) {
						this.loading_btn = true;
						let data = '';
						if(this.title == '编辑卡号规则') {
							data = "store_id=" + this.store_id +
									"&hykhqz=" + this.editForm.cardPrefix +
									"&hykhcd=" + this.editForm.cardLength +
									"&hykhtgzf=" + this.editForm.cardJump +
									"&flag=update"
						}else if(this.title == '创建卡号规则') {
							data = "store_id=" + this.node.id +
									"&hykhqz=" + this.editForm.cardPrefix +
									"&hykhcd=" + this.editForm.cardLength +
									"&hykhtgzf=" + this.editForm.cardJump +
									"&flag=add"
						}
						//------------------------------------------------发送请求
						saveStoreCardRule(data).then(res=> {
							if(res.success == true) {
								this.dialogedit = false;
								this.loading_btn = false;
								this.tzxCom = false;
								this.cities.forEach(item=> {
									item.bool = false;
								});
								this.getList();
							}else {
								this.$message({
									message: res.msg,
									type: 'warning'
								})
								this.loading_btn = false;
							}
						})
						.catch((e)=> {
							this.dialogedit = false;
							this.$message({
								type: 'error',
								message: e
							});
							this.loading_btn = false;
							this.cities.forEach(item=> {
								item.bool = false;
							});
						})
					} else {
						return false;
					}
				});
			},
            //删除
            del(row) {
				_czc.push(["_trackEvent", "规则中心-卡号规则-卡号规则列表", "删除卡号规则"]);//埋点统计
                this.$confirm('是否删除? 删除规则后该门店卡号规则将默认与总部规则相同', {
                showClose: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                style:"text-align:center;",
                type: 'warning' 
                }).then(() => {
                    let data = 'store_id=' + row.store_id;
					//-----------------------------------------------------发送请求
					deleteCardRule(data).then(res=> {
						if(res.success == true) {
							this.getList();
							this.$message({
								type: 'success',
								message: res.msg
							})
						}else {
							this.$message({
								message: res.msg,
								type: 'warning'
							})
						}
					})
					.catch((e)=> {
						this.$message({
							type: 'error',
							message: e
						})
					})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });          
                })
			},
			getStoresIds(value){
				//获取门店的store_id 的数组
				this.node = value;
				this.editForm.mendian = value.id + '';
			}
		},
		mounted() {
            this.getList();
		},
		created() {
		
		},
		
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.cardruleedit {
		background-color: #FEFEFE;
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
		.el-dialog {
			.el-form-item__error {
				left: 40px;
			}
			.el-dialog__body {
				.el-form {
					.el-form-item {
						.el-form-item__content {
							.icon_tip {
								position: absolute;
								top: 0;
								left: 5px;
							}
							.select-input{
								.select-tree-zr{
									margin-left: 40px;
									z-index: 101!important;
								}
							}
							.el-checkbox-group {
								.el-checkbox {
									width: 24px;
									height: 24px;
									margin-top: -2px;
									// border: 1px solid red;
									.el-checkbox__input {
										width: 24px;
										height: 24px;
										.el-checkbox__inner {
											width: 24px;
											height: 24px;
											&:after {
												display: none;
											}
										}							
									}
									.el-checkbox__label {
										position: absolute;
										top: 10px;
										left: 3px;
										z-index: 100;
									}
								}
							}
						}
					}
				}
			}
			.el-dialog__footer {
				background-color: #F4F9FC;
    			text-align: center;
			}
		}
	}
</style>