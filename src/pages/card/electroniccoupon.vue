<template>
	<div class='appclass'>
		<div class="app-container calendar-list-container" v-loading.body = 'loadingBody'>
			<div class="filter-container" >
				<el-input v-model="listQuery.class_name"  placeholder="请输入券名称"  icon='search' :on-icon-click='searchByCouponName' style='width:220px'></el-input>
				<el-popover ref="popover" placement="bottom" width="100" trigger="hover">
					<ul class='tzx-ul'>
						<li class="tzx-select" @click='create_coupons_deduct' style='text-align: center;'><span class='tzx-text'>代金券</span></li>
						<li class="tzx-select" @click='create_coupons_dish' style='text-align: center;'><span class='tzx-text'>菜品券</span></li>
					</ul>
				</el-popover>
				<el-button type='server' v-popover:popover icon='plus' style='float:right;margin-left: 10px;'>创建优惠券</el-button>
				<el-button type='server'  @click='issue_coupon' style='float:right;'>下发菜品券</el-button>
			</div>
			<el-table v-loading="loading" empty-text='暂无任何数据' element-loading-text="给我一点时间" :data="tableData" style="width: 100%" @filter-change="filterChange" @sort-change="sortChange">
				<el-table-column :formatter="isNotNullFormat" header-align='left' prop="class_name" label="券名称" min-width="200"></el-table-column>
				<el-table-column header-align='center' :filters="filterText"  :formatter="couponTypeFormat"  column-key='coupons_pro' prop="coupons_pro" label="券类型" align='center' min-width="120"></el-table-column>
				<el-table-column header-align='left' label="券有效期" align='left' min-width='120'>
					<template scope="scope">
                        <span>{{scope.row.validity}}</span>
					</template>
				</el-table-column>
				<el-table-column :formatter="validStateFormat" :filters="filterValidStateText" column-key='valid_state' header-align='center' prop="valid_state" label="券状态" align='center' min-width='110'></el-table-column>
				<el-table-column :formatter="synStatusFormat" :filters="filterSynStatusText" column-key='syn_status' header-align='center' prop="syn_status" align='center' label="微信同步状态" min-width='130'></el-table-column>
				<el-table-column  :formatter="isNotNullFormat" header-align='center' prop="syn_time" align='center' label="同步时间" min-width='180'></el-table-column>				
<!--				<el-table-column :formatter="successStateFormat" :filters="filterSuccessStateText" header-align='center' column-key='success_state' prop="success_state" label="微信审核状态" align='center' min-width='130'></el-table-column>-->
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="syn_fail_reason" label="同步失败原因" align='center' min-width='130'></el-table-column>					
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="last_operator" label="最终编辑人" align='center' min-width='100'></el-table-column>				
				<el-table-column :formatter="isNotNullFormat" header-align='center' prop="last_updatetime" label="编辑时间" sortable align='center' min-width='180'>
				</el-table-column>
				<el-table-column header-align='center' align='center' fixed='right' v-if='tableData.length>0' label="操作" width="180">
					<template scope="scope">
						<tzx-tag color="#0C9AFF" @clickThis='findDetail(scope.row)'>详情</tzx-tag>
						<tzx-tag color="#0C9AFF" @clickThis='update(scope.row)'>编辑</tzx-tag>
						<tzx-tag color="#0C9AFF" v-popover:popover>
							<el-popover style='z-index:100!important' ref="popover" placement="bottom" width="100" trigger="hover" @show='showPopover(scope.row.id)' @hide='hidePopover(scope.row.id)'>
								<ul class='tzx-ul'>
									<li @click='issue(scope.row)' class="tzx-select" style='text-align: center;'><span class='tzx-text'>同步微信卡券</span></li>

									<li @click='deleteCoupon(scope.row)' class="tzx-select" style='text-align: center;'><span class='tzx-text'>删除</span></li>
								</ul>
							</el-popover>更多<i :class="hoverId==scope.row.id&&showpop?'el-icon-dropup':'el-icon-dropdown'"></i>
						</tzx-tag>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination-container" v-if='tableData.length>0&&total>firstPageSize'>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.rows" layout="prev, pager, next,total, jumper,sizes" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
    import {getCouponList,issueCoupon,issueWechart,deleteCoupon} from '@/api/coupon' 
	import { TzxTag } from '@/components/tag'
	export default {
		components: {
			TzxTag
		},
		data() {
			return {
                filterText:[{
					text: '代金券',
					value: 'coupons_deduct'
				}, {
					text: '菜品券',
					value: 'coupons_dish'
					
				}],
				filterValidStateText:[{
					text: '有效',
					value: '1'
				}, {
					text: '已过期',
					value: '0'
				}],
				filterSynStatusText:[{
					text: '未同步',
					value: '0'
				}, {
					text: '已同步',
					value: '1'
				},{
					text: '同步失败',
					value: '2'
				}],
				filterSuccessStateText:[{
					text: '审核失败',
					value: '0'
				}, {
					text: '审核成功',
					value: '1'
				},{
					text: '未审核',
					value: '2'
				}],
				firstPageSize: this.$store.state.user.screenPageSize,
				total: 0,
				loadingBody:false,
				listQuery: {
					class_name: '',//券名称
					coupons_pro:'',//券类型（coupon_dish菜品券  代金券）
					valid_state:'',//券状态
					syn_status:'',//微信同步状态
					page: 1,
					rows: this.$store.state.user.screenPageSize,
					sort: 'last_updatetime',
					order: 'desc'
				},
				tableData:[],
				loading:false,
				showpop: false,
				hoverId: '',

			}
		},
		filters: {
			
		},
		methods: {

			//点击搜索按钮调用的方法
			searchByCouponName() {
				this.listQuery.page = 1;
				this.getList();
			},
			/* 下发菜品券*/
			issue_coupon() {
				this.loadingBody = true;
				issueCoupon().then(response=>{
					this.loadingBody = false;
					if(response.success){
						this.$message({
							type:'success',
							message:'下发成功!'
						})
					}else{
						this.$message({
							type:'error',
							message:response.msg
						})
					}
				}).catch(e=>{
					this.loadingBody = false;
					this.$message({
						type:'error',
						message:"下发失败！请稍后重试"
					})
				})
			},
			/*创建代金券*/
			create_coupons_deduct() {
				this.$router.push({
					path:'/card/couponsdeduct',
					hash:'new'
				})
			},
			/*创建菜品券*/
			create_coupons_dish() {
				this.$router.push({
					path:'/card/couponsdish',
					hash:'new'
				})
			},
			//获取列表信息
			getList(){
				let  message = 'page='+this.listQuery.page+
							   '&rows='+this.listQuery.rows+
							   '&sort='+this.listQuery.sort+
							   '&order='+this.listQuery.order+
							   '&class_name='+this.listQuery.class_name+
							   '&coupons_pro='+this.listQuery.coupons_pro+
							   '&valid_state='+this.listQuery.valid_state+
							   '&syn_status='+this.listQuery.syn_status;
							  
					this.loading = true;		   
					getCouponList(message).then(response=>{
						this.loading = false;
						if(response.success == true){
							this.tableData = response.data.rows
							this.total = response.data.total
						}
						else{
							this.$message({
								type:'error',
								message:response.msg
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
			/* 筛选条件发生变化触发*/
			filterChange(filters) {

				let key = Object.keys(filters)[0];
				let value = filters[key];
				let types = value.join(",");
				if(key == 'coupons_pro') {
					this.listQuery.coupons_pro = types;
				} else if(key == 'valid_state') {
					this.listQuery.valid_state = types;
				}
				else{
					this.listQuery.syn_status = types;
				}
				this.listQuery.page = 1;
				this.getList();
			},
			/* 排序条件发生变化触发*/
			sortChange({column,prop,order}) {
				this.listQuery.sort = prop;
				this.listQuery.page = 1;
				if(order == 'ascending') {
					this.listQuery.order = 'asc'
				}
				if(order == 'descending') {
					this.listQuery.order = 'desc'
				}
				this.getList();

			},
			couponTypeFormat(row, column) {
				let coupon_type = row[column.property];

				if(coupon_type == '' || coupon_type == null || coupon_type==undefined) {
					return '--'
				} else {
					return coupon_type=='coupons_dish'?'菜品券':'代金券';
				}
			},
			validStateFormat(row, column) {
				let valid_state = row[column.property];

				if(valid_state == '' || valid_state == null || valid_state==undefined) {
					return '--'
				} else {
					return valid_state=='1'?'有效':'已过期';
				}
			},
			synStatusFormat(row, column) {
				let syn_status = row[column.property];

				if(syn_status == '' || syn_status == null || syn_status==undefined) {
					return '--'
				} else {
					if(syn_status=='0'){
						return '未同步'
					}
					else if(syn_status=='1'){
						return '已同步'
					}
					else{
						return '同步失败'
					}
				}
			},
			
			showPopover(hoverId) {
				this.showpop = true;
				this.hoverId = hoverId;
			},
			hidePopover(hoverId) {
				this.hoverId = 0;
				this.showpop = false;
			},
			/*查看详情*/
			findDetail(row){
				let path = row.coupons_pro=='coupons_dish'?'/card/couponsdish':'/card/couponsdeduct'		
				this.$router.push({
					path: path,
					query:{id:row.id,type:'detail'}
				})	
			},
			/*编辑*/
			update(row){
				let path = row.coupons_pro=='coupons_dish'?'/card/couponsdish':'/card/couponsdeduct'		
				this.$router.push({
					path: path,
					query:{id:row.id,type:'update'}
				})					
			},
			/*同步微信卡券**/
			
			issue(row){			
				let data = 'id='+row.id;
				if(row.syn_status=='1'){
					this.$confirm("该优惠券已同步!", {
						showClose: false,
						showCancelButton: false,
						confirmButtonText: '确定',
						type: 'warning'
					})
					return
				}
				this.loadingBody = true;
				issueWechart(data).then(response=>{
					this.loadingBody = false;
					if(response.success){
						this.$message({
							type:'success',
							message:'已同步,请耐心等待微信审核!'
						})
						this.getList()
					}else{
						this.$message({
							type:'error',
							message:response.msg
						})
					}
				}).catch(e=>{
					this.loadingBody = false;
					this.$message({
						type:'error',
						message:"网络异常,请稍后重试!"
					})
				})
				
			},
			/*删除*/
			deleteCoupon(row){
				 let data = 'id='+row.id;
				 this.$confirm('是否删除该优惠券?', {
				   showClose: false,
         		   confirmButtonText: '确定',
		           cancelButtonText: '取消',
		           type: 'warning'
		         }).then(() => {
		         	this.loadingBody = true;
		         	deleteCoupon(data).then(response=>{
		         		this.loadingBody = false;
		         		if(response.success){
		         			this.$message({
		         				type:'success',
		         				message:'删除成功'
		         			})
		         			this.getList();
		         		}
		         		else{
		         			this.$message({
		         				type:'error',
		         				message:response.msg
		         			})
		         		}
		         	}).catch(e=>{
		         		this.loadingBody = false;
		         		this.$message({
	         				type:'error',
	         				message:"操作失败！"
	         			})
		         	})
		         })
			}
		},
		mounted() {
			this.getList();
		},
		created() {
		
		},
		
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	
</style>