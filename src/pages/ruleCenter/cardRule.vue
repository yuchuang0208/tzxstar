<template>
	<div class='cardruleedit'>
		<div class="app-container calendar-list-container" v-loading.body = 'loadingBody'>
			<div class="filter-container" >
				<el-input v-model="searchText"  placeholder="请输入门店名称"  icon='search' :on-icon-click='searchByMendianName' @change="searchByMendianName" style='width:220px'></el-input>
				<el-button type='server' style='float:right;margin-left: 10px;'@click	="update()">创建门店卡号规则</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogedit">
            <el-form :model="editForm" ref="editForm" :rules="rules" label-width="110px">              
				<el-form-item v-if="flag" label="选择门店：" prop="mendian" style="margin-top:20px;">
                    <el-select v-model="editForm.mendian" filterable placeholder="请选择门店" style="width:150px;">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
                </el-form-item>
				<el-form-item v-else label="门店名称：" style="margin-top:20px;">
                    <span>{{editForm.mendian}}</span>
                </el-form-item>
                <el-form-item label="卡号前缀：">
                	<el-input type="age" v-model="editForm.cardPrefix" placeholder="最多4位数字或字符" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="卡号长度：" prop="cardLength">
                    <el-input v-model="editForm.cardLength" type="number" placeholder="8-20之间任意整数" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item label="卡号跳过：">
                    <el-checkbox-group 
                        v-model="editForm.cardJump"
                        :min="1"
                        :max="3">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
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
	import { loadStoreCardRule,saveStoreCardRule,findStoreCardRule,deleteCardRule } from '@/api/ruleCenter'
	export default {
		components: {
			TzxTag
		},
		data() {
			return {

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
				cities: ['0','1','2','3','4','5','6','7','8','9'],
				store_id: '',
                editForm: {
					id: 0,//门店id
                    mendian: '',//门店名称
                    cardPrefix: '',//卡号前缀
                    cardLength: '',//卡号长度
                    cardJump: [],//卡号跳过
                },
				flag: false,//判断显示门店
				options: [{
					value: '554',
					label: '天子星店'
					}, {
					value: '566',
					label: '河北三河店'
					},
					 {
					value: '288',
					label: '山东青岛店'
					}, {
					value: '549',
					label: '河北石家庄店'
					},
					{
					value: '487',
					label: '吉林长春店'
					}, 
					{
					value: '498',
					label: '哈尔滨松北店'
					},{
					value: '550',
					label: '北京东单店'
					},
					{
					value: '565',
					label: '河北燕郊店'
					},
					{
					value: '537',
					label: '河北唐山店'
					},
					{
					value: '553',
					label: '河北承德店'
					},
					{
					value: '489',
					label: '河北店'
					},
					{
					value: '490',
					label: '河南店'
					},
					{
					value: '499',
					label: '河南周口店'
					},
					{
					value: '500',
					label: '河南郑州店'
					},
					{
					value: '512',
					label: '山西太原店'
					},
					{
					value: '511',
					label: '山西晋城店'
					},
					{
					value: '571',
					label: '肯德基'
					},
					],
				rules: {
					mendian :[
						{ required: true, message: '请选择门店', trigger: 'change' }
					],
					cardLength: [
						{ required: true, message: '卡号长度不能为空', trigger: 'blur'}
					]
				}	
			}
		},
		methods: {
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
				if(row) {
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
					}								
				}else {
					this.dialogedit = true;
					this.flag = true;
					this.title = '创建卡号规则';
					this.editForm.mendian = '';		
					this.editForm.cardPrefix = '';				
					this.editForm.cardLength = '';				
					this.editForm.cardJump = [];
				}		
			},
			//编辑提交表单
			submitForm(editForm) {
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
							data = "store_id=" + this.editForm.mendian +
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
						})
					} else {
						return false;
					}
				});
			},
            //删除
            del(row) {
                this.$alert('是否删除? 删除规则后该门店卡号规则将默认与总部规则相同', {
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
		.el-dialog {
			.el-dialog__body {
				.el-form {
					.el-form-item {
						.el-form-item__content {
							.el-checkbox-group {
								.el-checkbox {
									width: 24px;
									height: 24px;
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
										z-index: 100000000;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>