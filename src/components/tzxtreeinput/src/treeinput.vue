/**
 * 下拉树组件
 */

<template>
	 <div class="select-input">
	 	<el-input v-if="!iscaret" class="select-input-zr" readonly placeholder="请选择发售机构" icon="caret-bottom"  v-model="orgnames" :on-icon-click="handleIconClick"></el-input>
		<el-input v-if="iscaret" class="select-input-zr" readonly placeholder="请选择发售机构" icon="caret-top"  v-model="orgnames" :on-icon-click="handleIconClick"></el-input>
		<div class="select-tree-zr" v-if="isselecttree">
            <el-input placeholder="输入机构名称" v-model="filterText" icon="search"></el-input>
            <el-tree ref="classTree" 
                    class="filter-tree-zr"
                    :data="selectTreeData" 
                    :default-expanded-keys="[-1]" 
                    :default-checked-keys="pnodes"
                    node-key="id" 
                    :filter-node-method="filterNode"
                    :show-checkbox=true
                    @check-change="boxChange">
            </el-tree>
        </div>
	 </div>
</template>

<script>
	import {getMendian} from '@/api/home'
	export default{
		data(){
			return{
				filterText: '', 
				treeData:{"success":true,"msg":"成功","data":[{"children":[{"count":0,"id":0,"label":"品牌总部","labelc":"品牌总部"},{"count":3,"id":90,"label":"北京测试","type":1,"children":[{"count":0,"id":129,"label":"北京测试2","type":3,"plabels":"北京测试","labelc":"北京测试2"},{"count":0,"id":124,"label":"北方项目","type":3,"plabels":"北京测试","labelc":"北方项目"},{"count":0,"id":91,"label":"五道口","type":3,"plabels":"北京测试","labelc":"五道口"}],"labelc":"北京测试(3)"},{"count":5,"id":108,"label":"产品中心测试专用","type":1,"children":[{"count":0,"id":111,"label":"李露测试门店01","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店01"},{"count":0,"id":114,"label":"黄娟的店测试专用","type":3,"plabels":"产品中心测试专用","labelc":"黄娟的店测试专用"},{"count":0,"id":113,"label":"李露测试门店03","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店03"},{"count":0,"id":112,"label":"李露测试门店02","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店02"},{"count":0,"id":181,"label":"朱磊测试门店","type":3,"plabels":"产品中心测试专用","labelc":"朱磊测试门店"}],"labelc":"产品中心测试专用(5)"},{"count":2,"id":105,"label":"zcs","type":1,"children":[{"count":0,"id":107,"label":"蓝天白云","type":3,"plabels":"zcs","labelc":"蓝天白云"},{"count":0,"id":106,"label":"白云店","type":3,"plabels":"zcs","labelc":"白云店"}],"labelc":"zcs(2)"},{"count":1,"id":74,"label":"面香八方","type":1,"children":[{"count":0,"id":75,"label":"面香八方现代城店","type":3,"plabels":"面香八方","labelc":"面香八方现代城店"}],"labelc":"面香八方(1)"},{"count":2,"id":76,"label":"自定义","type":1,"children":[{"count":0,"id":77,"label":"第一家餐厅","type":3,"plabels":"自定义","labelc":"第一家餐厅"},{"count":0,"id":78,"label":"第二家餐厅","type":3,"plabels":"自定义","labelc":"第二家餐厅"}],"labelc":"自定义(2)"},{"count":1,"id":70,"label":"脸谱","type":1,"children":[{"count":0,"id":71,"label":"朝阳门店","type":3,"plabels":"脸谱","labelc":"朝阳门店"}],"labelc":"脸谱(1)"},{"count":19,"id":2,"label":"实施专用分公司","type":1,"children":[{"count":0,"id":87,"label":"测试店","type":3,"plabels":"实施专用分公司","labelc":"测试店"},{"count":0,"id":34,"label":"实施专用101","type":3,"plabels":"实施专用分公司","labelc":"实施专用101"},{"children":[{"count":0,"id":13,"label":"yitaoshi","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"yitaoshi"},{"count":0,"id":117,"label":"复华测试店","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"复华测试店"},{"count":0,"id":12,"label":"sundanen-ceshi","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"sundanen-ceshi"},{"count":0,"id":54,"label":"上海实施测试1","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"上海实施测试1"}],"plabels":"实施专用分公司","count":4,"id":5,"label":"实施门店1","type":1,"labelc":"实施门店1(4)"},{"count":0,"id":99,"label":"zlx测试","type":3,"plabels":"实施专用分公司","labelc":"zlx测试"},{"count":0,"id":103,"label":"Majc","type":3,"plabels":"实施专用分公司","labelc":"Majc"},{"count":0,"id":7,"label":"测试门店2","type":3,"plabels":"实施专用分公司","labelc":"测试门店2"},{"count":0,"id":4,"label":"测试门店1","type":3,"plabels":"实施专用分公司","labelc":"测试门店1"},{"count":0,"id":33,"label":"实施门店12","type":3,"plabels":"实施专用分公司","labelc":"实施门店12"},{"count":0,"id":42,"label":"亮健容天测试","type":3,"plabels":"实施专用分公司","labelc":"亮健容天测试"},{"count":0,"id":11,"label":"实施门店2","type":3,"plabels":"实施专用分公司","labelc":"实施门店2"},{"count":0,"id":30,"label":"实施门店6","type":3,"plabels":"实施专用分公司","labelc":"实施门店6"},{"count":0,"id":14,"label":"实施门店3","type":3,"plabels":"实施专用分公司","labelc":"实施门店3"},{"count":0,"id":36,"label":"实施测试7","type":3,"plabels":"实施专用分公司","labelc":"实施测试7"},{"count":0,"id":45,"label":"云南xx酒楼","type":3,"plabels":"实施专用分公司","labelc":"云南xx酒楼"},{"count":0,"id":27,"label":"实施门店5","type":3,"plabels":"实施专用分公司","labelc":"实施门店5"},{"count":0,"id":58,"label":"ns","type":3,"plabels":"实施专用分公司","labelc":"ns"},{"count":0,"id":53,"label":"昆明测试门店90","type":3,"plabels":"实施专用分公司","labelc":"昆明测试门店90"},{"count":0,"id":93,"label":"relayh测试门店","type":3,"plabels":"实施专用分公司","labelc":"relayh测试门店"},{"count":0,"id":94,"label":"范文涛","type":3,"plabels":"实施专用分公司","labelc":"范文涛"}],"labelc":"实施专用分公司(19)"},{"count":11,"id":3,"label":"开发专用分公司","type":1,"children":[{"count":0,"id":140,"label":"OM认证测试","type":3,"plabels":"开发专用分公司","labelc":"OM认证测试"},{"count":0,"id":128,"label":"开店流程测试","type":3,"plabels":"开发专用分公司","labelc":"开店流程测试"},{"count":0,"id":40,"label":"0305开发郭沈厅","type":3,"plabels":"开发专用分公司","labelc":"0305开发郭沈厅"},{"count":0,"id":24,"label":"开发门店2","type":3,"plabels":"开发专用分公司","labelc":"开发门店2"},{"count":0,"id":46,"label":"张晓丽测试专用","type":3,"plabels":"开发专用分公司","labelc":"张晓丽测试专用"},{"count":0,"id":38,"label":"开发高健","type":3,"plabels":"开发专用分公司","labelc":"开发高健"},{"count":0,"id":80,"label":"分公司测试123","type":3,"plabels":"开发专用分公司","labelc":"分公司测试123"},{"count":0,"id":37,"label":"白青冉专用测试","type":3,"plabels":"开发专用分公司","labelc":"白青冉专用测试"},{"count":0,"id":72,"label":"演示专用","type":3,"plabels":"开发专用分公司","labelc":"演示专用"},{"children":[{"count":0,"id":68,"label":"物流测试01店","type":3,"plabels":"物流测试专用-开发专用分公司","labelc":"物流测试01店"}],"plabels":"开发专用分公司","count":1,"id":66,"label":"物流测试专用","type":1,"labelc":"物流测试专用(1)"},{"count":0,"id":6,"label":"开发门店1","type":3,"plabels":"开发专用分公司","labelc":"开发门店1"}],"labelc":"开发专用分公司(11)"},{"count":23,"id":1,"label":"测试专用分公司","type":1,"children":[{"count":0,"id":199,"label":"测试门店21ww","type":3,"plabels":"测试专用分公司","labelc":"测试门店21ww"},{"count":0,"id":200,"label":"测试门店20yk","type":3,"plabels":"测试专用分公司","labelc":"测试门店20yk"},{"count":0,"id":203,"label":"测试图片上传门店","type":3,"plabels":"测试专用分公司","labelc":"测试图片上传门店"},{"count":0,"id":101,"label":"ceshi","type":3,"plabels":"测试专用分公司","labelc":"ceshi"},{"count":0,"id":97,"label":"测试望京店勿动","type":3,"plabels":"测试专用分公司","labelc":"测试望京店勿动"},{"count":0,"id":204,"label":"阿拉代发扥","type":3,"plabels":"测试专用分公司","labelc":"阿拉代发扥"},{"count":0,"id":16,"label":"报表专用测试（勿动）","type":3,"plabels":"测试专用分公司","labelc":"报表专用测试（勿动）"},{"count":0,"id":205,"label":"测试富文本编辑器门店","type":3,"plabels":"测试专用分公司","labelc":"测试富文本编辑器门店"},{"count":0,"id":28,"label":"快餐自动化（ZC勿动）","type":3,"plabels":"测试专用分公司","labelc":"快餐自动化（ZC勿动）"},{"count":0,"id":29,"label":"天子星望京店","type":3,"plabels":"测试专用分公司","labelc":"天子星望京店"},{"count":0,"id":73,"label":"localw快餐测试","type":3,"plabels":"测试专用分公司","labelc":"localw快餐测试"},{"count":0,"id":31,"label":"测试门店18勿动","type":3,"plabels":"测试专用分公司","labelc":"测试门店18勿动"},{"count":0,"id":15,"label":"小五测试门店","type":3,"plabels":"测试专用分公司","labelc":"小五测试门店"},{"count":0,"id":98,"label":"刘美丽微信测试专用","type":3,"plabels":"测试专用分公司","labelc":"刘美丽微信测试专用"},{"count":0,"id":88,"label":"postest勿动","type":3,"plabels":"测试专用分公司","labelc":"postest勿动"},{"count":0,"id":25,"label":"正餐自动化（KC勿动）","type":3,"plabels":"测试专用分公司","labelc":"正餐自动化（KC勿动）"},{"count":0,"id":163,"label":"gaoteng","type":3,"plabels":"测试专用分公司","labelc":"gaoteng"},{"count":0,"id":85,"label":"localw正餐测试","type":3,"plabels":"测试专用分公司","labelc":"localw正餐测试"},{"count":0,"id":9,"label":"正餐-秒付-Netty11","type":3,"plabels":"测试专用分公司","labelc":"正餐-秒付-Netty11"},{"count":0,"id":19,"label":"杨旭测试店","type":3,"plabels":"测试专用分公司","labelc":"杨旭测试店"},{"count":0,"id":17,"label":"测试门店8","type":3,"plabels":"测试专用分公司","labelc":"测试门店8"},{"count":0,"id":83,"label":"一鸣的没店","type":3,"plabels":"测试专用分公司","labelc":"一鸣的没店"},{"count":0,"id":10,"label":"测试门店5","type":3,"plabels":"测试专用分公司","labelc":"测试门店5"}],"labelc":"测试专用分公司(23)"},{"count":1,"id":176,"label":"分公司1","type":1,"children":[{"count":0,"id":178,"label":"测试门店","type":3,"plabels":"分公司1","labelc":"测试门店"}],"labelc":"分公司1(1)"},{"count":2,"id":185,"label":"沙县小吃001","type":1,"children":[{"count":0,"id":186,"label":"测试门店001","type":3,"plabels":"沙县小吃001","labelc":"测试门店001"},{"count":0,"id":187,"label":"测试门店002","type":3,"plabels":"沙县小吃001","labelc":"测试门店002"}],"labelc":"沙县小吃001(2)"}],"count":12,"id":-1,"label":"全部机构","labelc":"全部机构"}]},
				selectTreeData:[],//下拉树门店值
				isselecttree:false,//是否显示树
				iscaret:false,
				orgnames:"",//被选择的机构字符串
				selectTreeDataChecked:[],//下拉树选择的数据
				names:[],//回显名称数组
				defaultProps:{
					children: 'children',
	          		label: 'label',
	          		id:'id'
				}
			}
		},
		 watch: {
	      filterText(val) {
	        this.$refs.classTree.filter(val);
	      }
	    },
	    // 父组建传入参数
		props:{
			/**
			 * defaultCheckedId
			 * 树组件第一次加载时要打勾的节点 为ID数组
			 * */
			pnodes:Array,
		},
		methods:{
			//树形 筛选 
			filterNode(value, data) {
            	if (!value) return true;
            	return data.label.indexOf(value) !== -1;
            },
     		//树选择发生变化时触发
     		handleIconClick(){
				this.isselecttree = !this.isselecttree;
				this.iscaret = !this.iscaret;
			},
			boxChange(){
	    		this.selectTreeDataChecked = this.$refs.classTree.getCheckedNodes(true);
	    		this.orgnames = "";
	    		let names = [];
	    		let ids = [];
	    		this.selectTreeDataChecked.forEach(item=>{
	    			names.push(item.label);
	    			ids.push(item.id);
	    		})
	    		this.orgnames = names.join(",");
	    		//把参数传给父组件
	    		this.$emit('getButton',ids);
			},
			loadTree(){
				//this.selectTreeData =  this.treeData.data;
				getMendian().then((response) => {
					this.selectTreeData =  response.data;
				})
			},
			
			findNextItem(arrays,it) {
				arrays.map(item => {
					if(item.id == it) {
						this.names.push(item.label);
					} else {
						if(!item.children ) {
							
						} else {
							this.findNextItem(item.children,it);
						}
					}
				})
			},
		},
		mounted(){ 
			this.pnodes.forEach(item =>{
				this.findNextItem(this.selectTreeData,item)
			})
			this.orgnames = this.names.join(",");
		},
		created(){
			this.loadTree();
		},
	}
	
</script>

<style rel="stylesheet/scss" lang="scss">
.select-input{
	position:relative;
	.select-input-zr{
		width:230px;
		.el-input__inner{
			width:230px;
			padding-right:32px !important;
		}
	}
	.select-tree-zr{
		margin-top:10px;
		/*margin-left:10px;*/
		width:230px;
		background-color: #F5FBFE;
		border:1px #d9e5ed solid;
		height:auto;
		position: absolute;
		top: 30px;
		z-index: 1002;
		.el-input{
			margin-top:10px;
			margin-left:10px;
			margin-right:10px;
			width:210px;
		}
		.el-tree{
			overflow-y: auto;
			height:260px;
			margin-bottom: 40px;
			.el-tree-node__content{
				width:225px;
				.el-checkbox{
					float:right;
				}
			}
		}
		
	}
}
</style>