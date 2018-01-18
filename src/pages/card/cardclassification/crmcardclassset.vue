<template>
	<div class="crmcardclassset">
		<div class="divTwo_aqszs">
			<el-tabs @tab-click="handleClick" v-model="activeName">
				<el-tab-pane label="电子卡" name="first" class="zdgz" >
					<el-table v-loading="loading1" element-loading-text="给我一点时间"  empty-text='暂无任何数据' :data="firstData" max-height='500px' style="width:100%">
						<el-table-column prop="name" label="类别名称" fixed='left' v-if='firstData.length>0' min-width="130"></el-table-column>
						<el-table-column prop="is_physical_card" align='center' label="类别属性" min-width="90"  ></el-table-column>
						<el-table-column prop="synchro_state"  header-align='center' align='center' label="同步微信卡包状态" min-width="130"></el-table-column>
						<el-table-column prop="synchro_date" label="同步时间" min-width="150" header-align='center'></el-table-column>
						<el-table-column prop="reason"  label="同步失败原因" min-width="110"></el-table-column>
						<el-table-column prop="last_operator" label="最终编辑人" min-width="100"  align='left'></el-table-column>
						<el-table-column prop="last_updatetime" label="编辑时间" min-width="150"  header-align='center'></el-table-column>
						<el-table-column header-align='center' align='center' fixed='right' v-if='firstData.length>0' label="操作" width="210">
							<template scope="scope">
								<span class="blue-color" @click="showwrite(scope)">编辑卡包</span>
								<span class="blue-color" @click="synchronous(scope.row.id)">同步卡包</span>
								<tzx-tag color="#0C9AFF" v-popover:popover>
									<el-popover style='z-index:100!important' ref="popover" placement="bottom" width="100" trigger="hover" @show='showPopover(scope.row.id)' @hide='hidePopover(scope.row.id)'>
										<ul class='tzx-ul'>
											<li class="tzx-select" style='text-align: center;'><el-button @click.native.prevent="modfiyClass(scope.row)" type="text" style="color: #34495e" >修改类名</el-button>
											</li>
										</ul>
									</el-popover>更多<i :class="hoverId==scope.row.id&&showpop?'el-icon-dropup':'el-icon-dropdown'"></i>
								</tzx-tag>
							</template>
						</el-table-column>
					</el-table>
				<div class="block">
					<el-pagination @size-change="handleFirstSizeChange" @current-change="handleFirstCurrentChange" :current-page="firstList.page" :page-sizes="[10, 20, 30, 50]" :page-size="firstList.rows" layout="prev, pager, next,total, jumper,sizes" :total="firstList.total">
					</el-pagination>
				</div>

					<el-dialog title="修改类名" :visible.sync="dialogCopy" size="copy" :before-close="handleCopyClose">
						<div class='content'>
							<el-form :model="classForm" label-position='right' :rules="rules" ref="classForm" label-width="100px" class="demo-ruleForm">
								<el-form-item label="修改类名:">
									{{name}}
								</el-form-item>
								<el-form-item  label="新类名名称:" prop="subjectClass">
									<el-input size='small' style='width:250px' v-model="classForm.subjectClass" auto-complete="off"></el-input>
								</el-form-item>
							</el-form>
						</div>
						<div class="fzhd_close">
							<el-button size='large' @click="cancelDialogCopy">取消</el-button>
							<el-button size='large'  @click='copyActivity' type='primary'>确定</el-button>
						</div>
					</el-dialog>
				</el-tab-pane>


				<el-tab-pane label="实体卡" name="second" class="zdgz">
					<div class="filter-container">
						<div class="el-input el-input--small" style="width: 200px;">
							<i class="el-input__icon el-icon-search is-clickable" @click="searchName"></i>
							<input autocomplete="off" placeholder="请输入类别名称" v-model="searchNameVal" size="small" icon="search" type="text" rows="2" validateevent="true" class="el-input__inner">
						</div>
						<el-button @click="creatOfflineCard" style="float:right;">创建卡类别</el-button>
					</div>
					<el-table v-loading="loading1" element-loading-text="给我一点时间"  empty-text='暂无任何数据' :data="secondData"  style="width:100%;" @filter-change="filterChange" @sort-change="sortChange" ref="tabs">
						<el-table-column prop="name" label="类别名称" fixed='left' v-if='secondData.length>0' min-width="130"></el-table-column>
						<el-table-column prop="is_physical_card" align='center' label="类别属性" min-width="120"></el-table-column>
						<el-table-column prop="is_only"  header-align='center' align='center' label="一次性卡" min-width="120"></el-table-column>
						<el-table-column prop="is_back" align='center' label="可退卡" min-width="100"></el-table-column>
						<el-table-column prop="is_lostreport" align='center' label="可挂失" min-width="100"></el-table-column>
						<el-table-column prop="is_namereport" align='center' label="可记名" min-width="100"></el-table-column>
						<el-table-column prop="card_sale_price"  header-align='right' align='right' :formatter="moneyFormat" label="卡售卖价格" min-width="100"></el-table-column >
						<el-table-column prop="card_deposit"  header-align='right' align='right' :formatter="moneyFormat" label="卡售押金" min-width="100"></el-table-column>
						<el-table-column prop="limit_prestore_per" header-align='right' align='right' :formatter="moneyFormat" label="最低充值金额" min-width="110"></el-table-column>
						<el-table-column prop="validity_type" label="卡有效期" min-width="180" header-align='center'></el-table-column>
						<el-table-column header-align='center' :filters="filterText" column-key='valid_state' prop="valid_state" label="状态" align='center' min-width="120"></el-table-column>
						<el-table-column prop="last_operator" label="最终编辑人" min-width="100"></el-table-column>
						<el-table-column header-align='center' prop="last_updatetime" label="编辑时间" sortable align='center' min-width='160' ></el-table-column>
						<el-table-column header-align='center' align='center' fixed='right' v-if='secondData.length>0' label="操作" width="170">
							<template scope="scope">
								<span @click="showListDetail(scope.row.id)"  class="blue-color">详情</span>
								<span  class="blue-color" @click="editorOfflineCard(scope)">编辑</span>
								<tzx-tag color="#0C9AFF" v-popover:popover>
									<el-popover style='z-index:100!important' ref="popover" placement="bottom" width="100" trigger="hover" @show='showPopover(scope.row.id)' @hide='hidePopover(scope.row.id)'>
										<ul class='tzx-ul'>
											<li @click="disableEnableEvent(scope)" class="tzx-select" style='text-align: center;'>
												<template v-if="scope.row.valid_state == '已启用' "> 停用 </template>
												<template v-if="scope.row.valid_state == '已停用' "> 启用 </template>
											</li>
											<li class="tzx-select" style='text-align: center;'><el-button @click.native.prevent="findCardUser(scope.$index, secondData, scope.row.id)" type="text" style="color: #34495e" >删除</el-button></li>
										</ul>
									</el-popover>更多<i :class="hoverId==scope.row.id&&showpop?'el-icon-dropup':'el-icon-dropdown'"></i>
								</tzx-tag>
							</template>
						</el-table-column>
					</el-table>
				<div class="block">
					<el-pagination @size-change="handleSecondSizeChange" @current-change="handleSecondCurrentChange" :current-page="secondList.page" :page-sizes="[10, 20, 30, 50]" :page-size="secondList.rows" layout="prev, pager, next,total, jumper,sizes" :total="secondList.total">
					</el-pagination>
				</div>
					<el-dialog title="实体卡类别详情" :visible.sync="dialogTableVisible">
						<ul class="data-list">
							<li><span>类别名称：</span><span>{{name}}</span></li>
							<li><span>类别属性：</span><span>{{is_physical_card}}</span></li>
							<li><span>一次性卡：</span><span>{{is_only}}</span></li>
							<li><span>可退卡：</span><span>{{is_back}}</span></li>
							<li><span>可挂失：</span><span>{{is_lostreport}}</span></li>
							<li><span>可记名：</span><span>{{is_namereport}}</span></li>
							<li><span>卡押金：</span><span>￥{{card_deposit}}</span></li>
							<li><span>卡售卖价格：</span><span>￥{{card_sale_price}}</span></li>
							<li><span>最低充值金额：</span><span>￥{{limit_prestore_per}}</span></li>
							<li><span>卡介质：</span><span>{{medium}}</span></li>
							<li><span>不记名卡使用权限：</span><span>{{blank_use_limit}}</span></li>
							<li><span>卡金额使用范围：</span><span>{{money_use_limit}}</span></li>
							<li><span>卡有效期：</span><span>{{validity_type}}</span></li>
						</ul>
						<p class="knowDetail">
							<el-button @click="dialogTableVisible = false" >关闭</el-button>
						</p>
					</el-dialog>

					<el-dialog
					  title="是否删除"
					  :visible.sync="deleteList"
					  width="30%">
					  <span>已有 {{peoples}} 位持卡用户</span>
					  <span slot="footer" class="dialog-footer">
					    <el-button @click="deleteList = false">取 消</el-button>
						<el-button @click="deleteRow" type="primary" size="small">确定</el-button>
					  </span>
					</el-dialog>

				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import { getAneCard, getAneCardoffline, synchronousAneCard, getAneCardofflineDetail, AneCardofflineStar, AneCardofflineStop, CardofflineDele, CardofflinefindCardUser,getClassname} from '@/api/cardvoucher.js'
import { TzxTag, TzxOption } from '@/components/tag'
export default {
  		name: 'crmcardclassset',
  		data(){
  			return{
  				dialogCopy: false,                          //修改类名的弹窗
  				classForm: {                                 //新的
					subjectClass: ''
				},
				rules: {
					subjectClass: [{
						required: true,
						message: '  ',
						trigger: 'blur'
					}]
				},
				name:'',      //修改类名前的name
				id:'',            //修改类名的id
				hoverId: '',				// 更多现实隐藏
				activeName : 'first',		// 默认显示第一个tab
				loading1: false,			// 电子卡列表loading
				firstData: [],				//电子卡列表数据
				secondData:[],				// 实体卡列表数据
				dialogTableVisible : false,	// 实体卡详情隐藏字段
				firstList: {
					total: 0,
					page: 1,
					rows: this.$store.state.user.screenPageSize,
					sort: 'last_updatetime',
					order: 'asc',
					state:''
				},
				secondList: {
					total:0,
					page : 1,
					rows: this.$store.state.user.screenPageSize,
					sort: 'last_updatetime',
					order: 'desc',
					state:''
				},
				widths:'',
				rowid : 0,					// 电子卡点击的ID
				deleteList:false,			// 删除提示框
				listIndex : '',				// 删除index
				listCount : '',				// 删除count
				name:'',					// 会员名称
				is_physical_card:'',		// 类别属性
				is_only:'',					// 一次性卡
				is_back:'',					// 可退卡
				is_lostreport:'',			// 可挂失
				is_namereport:'',			// 可记名
				medium:'',					// 卡介质
				card_sale_price:'',			//卡售卖价格
				card_deposit:'',			// 卡押金
				limit_prestore_per:'',		// 最低充值金额
				blank_use_limit :'',		// 不记名使用权
				money_use_limit:'',			// 卡金额适用范围
				validity_type:'',			//卡有效期
				peoples:'0',				// 持卡用户人数
				searchNameVal:'',			// 搜索实体卡
				filterText:[{
					text: '已停用',
					value: '0'
				}, {
					text: '已启用',
					value: '1'
				}],
			}
  		},
  		components: {
			TzxTag,
			TzxOption
		},
		created(){
			this.getFirstList();
		},
		methods:{
			modfiyClass(row){   //修改类名
				this.dialogCopy = true;
				this.id=row.id;
				this.name=row.name;
			},
			handleCopyClose(done) {
				done();
			},
			copyActivity(){       //修改新的类名（确定）
				let _this=this;
				let data= 'id=' + _this.id +
						  '&name=' + _this.classForm.subjectClass;
				getClassname(data).then((res)=>{
					if(res.success == true){
						_this.$message({
							type: 'info',
							message: res.msg
						})
						_this.dialogCopy = false;
						_this.getFirstList();
					}else{
						_this.$message({
							type: 'error',
							message: '修改失败'
						});
					}
					_this.classForm.subjectClass = '';
				}).catch(() =>{
					_this.classForm.subjectClass = ''
					_this.$message({
						type: 'error',
						message: '网络异常'
					})
				})

			},
    		cancelDialogCopy(){                                /* 取消dialogCopy*/
    			this.dialogCopy = false;
    			this.classForm.subjectClass = '';
 	       	},
			showPopover(hoverId) {
				this.showpop = true;
				this.hoverId = hoverId;
			},
			hidePopover(hoverId) {
				this.hoverId = 0;
				this.showpop = false;
			},
			handleClick(tab, event) {
				/*点击第一个标签页*/
				if(tab.name == 'first') {
					this.getFirstList();
				}
				/*点击第二个标签页*/
				if(tab.name == 'second') {
					this.getSecondList();
				}
			},
			getFirstList(){						// 获取电子卡数据
				this.loading1 = true;
				let _this = this;
				let data = 'page=' + _this.firstList.page +
						   '&rows=' + _this.firstList.rows +
						   '&sort=' + _this.firstList.sort +
						   '&order=' + _this.firstList.order +
						   '&valid_state=' + _this.firstList.state

				getAneCard(data).then((res)=>{
					if(res.success == true){
						res.rows.map(function(i){
							(i.is_physical_card === "1") ? i.is_physical_card = "实体卡" : i.is_physical_card = "电子卡";
							switch(i.synchro_state)
							{
							    case 0: i.synchro_state = "未同步"; break;
							    case 1: i.synchro_state = "同步"; break;
							    case 2: i.synchro_state = "同步失败"; break;
							    default: i.synchro_state = "--";
							}																	// 同步微信卡包状态
							i.name ? i.name : i.name = "--";									// 卡类别名称
							i.synchro_date ? i.synchro_date : i.synchro_date = "--";			// 同步时间
							i.reason ? i.reason : i.reason = "--";								// 同步失败原因
							i.last_operator ? i.last_operator : i.last_operator = "--";			// 最终编辑人
							i.last_updatetime ? i.last_updatetime : i.last_updatetime = "--";	// 最终编辑时间
						})
						_this.loading1 = false;
						_this.firstData = res.rows;
						_this.firstList.total = res.total;
					}else{
						_this.$message({
                          type: 'error',
                          message: '获取数据失败!'
                        });
					}
				})
			},
			getSecondList(){					// 获取实体卡数据
				this.loading1 = true;
				let _this = this;
				let data = 'page=' + _this.secondList.page +
						   '&rows=' + _this.secondList.rows +
						   '&sort=' + _this.secondList.sort +
						   '&order=' + _this.secondList.order +
						   '&valid_state=' + _this.secondList.state
				this.getAneCardofflineFunction(data);
			},
			getAneCardofflineFunction(data){
				let _this = this;
				getAneCardoffline(data).then((res)=>{
					if(res.success == true){
						res.rows.map(function(i){
							(i.is_physical_card === "1") ? i.is_physical_card = "实体卡" : i.is_physical_card = "电子卡";
							(i.is_only === "1") ? i.is_only = "是" : i.is_only = "否";
							(i.is_back === "1") ? i.is_back = "是" : i.is_back = "否";
							(i.is_lostreport === "1") ? i.is_lostreport = "是" : i.is_lostreport = "否";
							(i.is_namereport === "1") ? i.is_namereport = "是" : i.is_namereport = "否";
							(i.valid_state === "1") ? i.valid_state = "已启用" : i.valid_state = "已停用";

							if(i.validity_type == 0){
							    i.validity_type = "永久有效";
							}else if(i.validity_type == 1 && i.start_date == null && i.end_date == null){
							    i.validity_type = "--";
							}else if(i.validity_type == 1 && i.start_date != null || i.end_date != null){
								i.validity_type = i.start_date + '--' + i.end_date;
							}else if(i.validity_type == 2 && i.start_date == null && i.end_date == null){
							    i.validity_type = "--";
							}else if(i.validity_type == 2 && i.start_date != null || i.end_date != null){
								i.validity_type = i.start_date + '--' + i.end_date;
							}
						})
						_this.loading1 = false;
						_this.secondData = res.rows;
						_this.secondList.total = res.total;
					}else{
						_this.$message({
						  type: 'error',
						  message: '获取数据失败!'
						});
					}
				})
			},
			moneyFormat(row, column) {
				let value = row[column.property];
				return "￥" + value;
			},
			handleFirstSizeChange(val) {
				this.firstList.rows = val;
				this.getFirstList()
			},
			handleFirstCurrentChange(val) {
				this.firstList.page = val
				this.getFirstList()
			},
			handleSecondSizeChange(val) {
				this.secondList.rows = val;
				this.getSecondList()
			},
			handleSecondCurrentChange(val) {
				this.secondList.page = val
				this.getSecondList()
			},
			showwrite(scope){					// 编辑电子卡包卡包按钮
				let id = scope.row.id;
				this.$router.push({
					path:'/card/editeelectroniccard',
					query:{id:id}
				})
			},
			synchronous(id) {					// 同步电子卡包按钮
				  let data = 'card_class_id=' + id + '&oper=update';
				  let _this = this;
				  _this.$confirm('是否同步到卡包?', {
					 confirmButtonText: '确定',
					 cancelButtonText: '取消',
					 type: 'warning'
				   }).then(() => {
					   synchronousAneCard(data).then((res)=>{
						   if(res.success == true){
							   _this.$message({
								  type: 'success',
								  message: '同步成功!'
								});
						   }else{
							   _this.$message({
								  type: 'error',
								  message: '同步失败!'
								});
						   }
					   })
				   }).catch(() => {
					 _this.$message({
					   type: 'info',
					   message: '已取消同步'
					 });
				   });
			},
			deleteRow() {						// 实体卡删除按钮
				let _this = this;
				let id = "id=" + this.rowid;
				let widths='1400px';
		        this.listCount.splice(this.listIndex, 1);
				this.deleteList = false;
				CardofflineDele(id).then((res)=>{
					if(res.success == true){
						_this.$message({
						   type: 'success',
						   message: '删除成功!'
						 });
						//console.log('niuyulei',res)
					}
				})
		    },
			findCardUser(index, rows, id){		// 显示删除提示
				let _this = this;
				let data = "id=" + id;
				this.listIndex = index;			// 赋值index给listIndex存起来给deleteRow函数用
				this.listCount = rows;			// 赋值rows给listCount存起来给deleteRow函数用
				this.rowid = id;				// 赋值当前点击的ID给rowid存起来给deleteRow函数用

				CardofflinefindCardUser(data).then((res)=>{
					if(res.success == true){
						_this.peoples = res.count;
						if(_this.peoples == 0){
							_this.deleteList = true;
						}else{
							this.$confirm('有 ' + res.count +' 位持卡用户正在使用', '无法删除', {
					          confirmButtonText: '关闭',
					          type: 'warning',
					          center: true
					        });
						}
					}
				})
			},
			showListDetail(id){					// 显示实体卡列表详情
				let _this = this;
				_this.dialogTableVisible = true;

				let data = 'id=' + id;
				getAneCardofflineDetail(data).then( (res)=>{

					if(res.success == true){
						switch(res.blank_use_limit)
						{
							case 0: res.blank_use_limit = "无限制"; break;
							case 1: res.blank_use_limit = "仅在注册机构使用所有权限"; break;
							default: res.blank_use_limit = "--";
						}

						switch(res.money_use_limit)
						{
							case 0: res.money_use_limit = "无限制"; break;
							case 1: res.money_use_limit = "按门店分组"; break;
							default: res.money_use_limit = "--";
						}

						// 类别属性
						switch(res.is_physical_card)
						{
							case '0': res.is_physical_card = "电子卡"; break;
							case '1': res.is_physical_card = "实体卡"; break;
							default: res.is_physical_card = "--";
						}

						// 一次性卡
						switch(res.is_only)
						{
							case '0': res.is_only = "否"; break;
							case '1': res.is_only = "是"; break;
							default: res.is_only = "--";
						}

						// 可退卡
						switch(res.is_back)
						{
							case '0': res.is_back = "否"; break;
							case '1': res.is_back = "是"; break;
							default: res.is_back = "--";
						}

						// 可挂失
						switch(res.is_lostreport)
						{
							case '0': res.is_lostreport = "否"; break;
							case '1': res.is_lostreport = "是"; break;
							default: res.is_lostreport = "--";
						}

						// 可记名
						switch(res.is_namereport)
						{
							case '0': res.is_namereport = "否"; break;
							case '1': res.is_namereport = "是"; break;
							default: res.is_namereport = "--";
						}

						// 卡介质
						switch(res.medium)
						{
							case 0: res.medium = "无卡"; break;
							case 1: res.medium = "磁条卡"; break;
							case 2: res.medium = "射频卡"; break;
							default: res.medium = "--";
						}

						// 卡有效期
						if(res.validity_type == 0){
							res.validity_type = "永久有效";
						}else if(res.validity_type == 1 && res.start_date == null && res.end_date == null){
							res.validity_type = "--";
						}else if(res.validity_type == 1 && res.start_date != null || res.end_date != null){
							res.validity_type = res.start_date + '--' + res.end_date;
						}else if(res.validity_type == 2 && res.start_date == null && res.end_date == null){
							res.validity_type = "--";
						}else if(res.validity_type == 2 && res.start_date != null || res.end_date != null){
							res.validity_type = res.start_date + '--' + res.end_date;
						}

						_this.name = res.name;								// 会员名称
						_this.is_physical_card = res.is_physical_card;		// 类别属性
						_this.is_only = res.is_only;						// 一次性卡
						_this.is_back = res.is_back;						//可退卡
						_this.is_lostreport = res.is_lostreport;			// 可挂失
						_this.is_namereport = res.is_namereport;			// 可记名
						_this.card_sale_price = res.card_sale_price;		//卡售卖价格
						_this.card_deposit = res.card_deposit;				// 卡押金
						_this.limit_prestore_per = res.limit_prestore_per;	// 最低充值金额
						_this.blank_use_limit = res.blank_use_limit;		// 不记名使用权
						_this.money_use_limit = res.money_use_limit;		// 卡金额适用范围
						_this.validity_type = res.validity_type;			//卡有效期
						_this.medium = res.medium;							// 卡介质
					}else{
						_this.$message({
							type: 'success',
							message: '获取详情失败!'
						});
					}
				})
			},
			disableEnableEvent(scope){			// 停用启用事件
				let state = scope.row.valid_state;
				let id = scope.row.id;

				if(state == '已启用'){
					// 调取停用事件
					//scope.row.valid_state = "已停用"
					this.stopEvent(id,scope);
				}else if(state == '已停用'){
					// 调取启用事件
					//scope.row.valid_state = "已启用"
					this.startEvent(id,scope);
				}
			},
			startEvent(id,scope){				// 启用操作
				let data = 'id=' + id;
				let _this = this;
				this.$confirm('是否启用?', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					AneCardofflineStar(data).then( (res)=>{
						if(res.success == true){
							_this.$message({
								type: 'success',
								message: '启用成功!'
							});
							scope.row.valid_state = "已启用"
						}else{
							_this.$message({
								type: 'success',
								message: '启用失败!'
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消启用'
					});
				});
			},
			stopEvent(id,scope){				// 停用操作
				let data = 'id=' + id;
				let _this = this;
				this.$confirm('是否停用?', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					AneCardofflineStop(data).then( (res)=>{
						if(res.success == true){
							_this.$message({
								type: 'success',
								message: '停用成功!'
							});
							scope.row.valid_state = "已停用"
						}else{
							_this.$message({
								type: 'success',
								message: '停用失败!'
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消停用'
					});
				});
			},
			creatOfflineCard(){					// 创建实体卡
				this.$router.push({
					path:'/card/cardoffline'
				})
			},
			editorOfflineCard(scope){			// 编辑实体卡
				let _this = this;
				let state = scope.row.valid_state;
				let id = scope.row.id;

				if(state == "已启用"){
					this.$alert('', '启用状态不能编辑卡包', {
			          confirmButtonText: '确定',
			        });
				}else if(state == "已停用"){
					_this.$router.push({
						path:'/card/cardoffline',
						query:{id:id}
					})
				}
			},
			searchName(){						// 根据类别名称搜索实体卡
				let _this = this;
				let data = 'page=' + _this.secondList.page +
						   '&rows=' + _this.secondList.rows +
						   '&sort=' + _this.secondList.sort +
						   '&order=' + _this.secondList.order +
						   '&valid_state=' + _this.secondList.state +
						   '&name=' + _this.searchNameVal

				if(_this.searchNameVal == ''){
					this.getSecondList();
				}else{
					_this.loading1 = true;
					_this.getAneCardofflineFunction(data);
				}
			},
			filterChange(filters){				// 条件排序
				let key = Object.keys(filters)[0];
				let value = filters[key];
				let types = value.join(",");
				this.secondList.page = 1;
				if(value.length == 1){
					this.secondList.state = types;
				}else{
					this.secondList.state = '';
				}
				this.getSecondList();
			},
			sortChange({column,prop,order}) {	// 时间排序
				this.secondList.page = 1;
				if(order == 'ascending') {
					this.secondList.order = 'asc'
				}
				if(order == 'descending') {
					this.secondList.order = 'desc'
				}
				this.getSecondList();
			},
		},
  	}
</script>


<style rel="stylesheet/scss" lang="scss">
	.crmcardclassset{
		position: relative;
		.el-table__header{
			width:1070px!important;
		}
		.removeStyle{
			border:none;
			background: none;
			color: #0c9aff;
    		cursor: pointer;
			padding-left: 0;
		}
		.blue-color{
			color: rgb(12, 154, 255);
			cursor: pointer;
			padding-left:5px;
		}
		.el-table__row :first-child .cell{
			width:96px;
			// overflow: hidden;
			// text-overflow:ellipsis;
			// white-space: nowrap;
		}
		.el-tab-pane{
			padding-top: 20px;
		}
		.zdgz{
			margin:0 20px;
		}
		.el-dialog--small{
			width: 30%;
		}


		/*****复制活动弹出框 开始*******/

		.el-dialog .descripes {
			height: 32px;
			line-height: 32px;
			background: #FFFAEB;
			font-size: 13px;
			color: #576D7A;
			span{
				display:inline;
			}
		}
		.el-dialog--copy .el-dialog__body{
			margin: 0 auto!important;
		}

		.warning.el-icon-warning {
			margin-left: 16px;
			font-size: 16px;
			color: #FFBF00;
		}

		.content {
			margin-top: 20px;
			margin-bottom: 48px;
			.title {
				line-height: 32px;
				height: 32px;
				margin-left: 32px;
				.titlename {
					color: #576D7A;
				}
				.titlecontent {
					margin-left: 16px;
					color: #34495E;
				}
			}
			.el-form{
				.el-form-item:nth-child(1){
					margin-bottom:11px;
					.el-form-item__label{
						text-align: right !important;
					}
				}
			}
		}

		.fzhd_close {
			height: 65px;
			line-height: 65px;
			background: #F4F9FC;
			text-align: center;
		}
		/*****复制活动弹出框 结束*******/
		.divTwo_aqszs {
			height: auto;
			min-height: 800px;
			background: #FFFFFF;
			margin-top: 10px;
			.el-tabs__nav-scroll{
				border-bottom: 1px solid #EAF1F6;
  				height: 45px;
				line-height: 45px;
				margin-left: 20px;
				margin-right: 20px;
			}
			.el-tabs__item {
				font-size: 16px !important;
				margin-bottom: 8px!important;
				padding: 0px 20px!important;
				margin-left: 0!important;
				color: #34495E!important;
			}
			.el-tabs__item.is-active {
				color: #0C9AFF!important;
			}
			.el-tabs__active-bar {
				background-color: #0C9AFF !important;
			}
			.el-tabs__header {
				background: #FEFEFE;
			}
		}
		.el-dialog__header{
			height:42px;
			line-height: 42px;
		}
		.el-dialog__body{
			margin: 16px auto!important;
			span{
				display: block;
				text-align: center;
			}
		}
	}

	.data-list{
		margin-left: 30px;

		li{
			display: block;
			display: flex;
			line-height: 28px;
			span:first-child{
				width:150px;
				text-align: left;
				color: #758896;
			}
			span:last-child{
				color: #34495E;
			}
		}
	}
	.knowDetail{
		width:100%;
		border-top:1px solid #EAF1F6;
		margin-top: 28px;
		height:60px;
		background:#F4F9FC;
		position:relative;
		button{
			width:58px;
			height:30px;
			position:absolute;
			left:50%;
			top:50%;
			margin-left:-29px;
			margin-top:-15px;
			font-size: 14px;
		}
	}

	.el-button-style{
		background: #FFFFFF;
		border: 1px solid #D8E5EC;
		color: #34495E;
		border-radius: 3px;
	}

	.el-button--text :hover{
		text-decoration: underline;
	}
</style>
