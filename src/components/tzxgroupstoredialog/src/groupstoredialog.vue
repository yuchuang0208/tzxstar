<template>
	<!--选择门店分组组件-->
	<el-dialog  :show-close=true size='small' :visible.sync="storeDialogVisible" :before-close="handleClose" custom-class='treeStore' title="创建门店分组">	
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="分组名称：" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="选择门店：" prop="mendian">
				<span v-model="ruleForm.mendian"></span>
				<tzx-group-store
				   	:data="storeData" 
				   	unitAndName='家店' 			   
				   	@boxChange = 'storeBoxChange' 
				   	:defaultCheckedId = 'storeCheckedIds'
				   	:pnodes= 'storeNodes' 
				   	:ptotalSelect = 'storeTotal'
				   	:defaultProps ='defaultMendianProps'
				   	@renderStore = 'setMendian' 
				   	>  
		  		</tzx-group-store>
	  		</el-form-item>
	  		<el-form-item>
			    <el-button size='large' @click="closeButton">取 消</el-button>
				<el-button size='large' type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</el-form-item>
  		</el-form>
	</el-dialog>
</template>

<script>
    import {getMendian} from '@/api/home'
    import { TzxGroupStore } from '@/components/tzxgroupstore';
    import { TzxTag } from '@/components/tag'
    
	export default {
	  components:{TzxGroupStore,TzxTag},
      data() {
		    return {
				treeData:{"success":true,"msg":"成功","data":[{"children":[{"count":0,"id":0,"label":"品牌总部","labelc":"品牌总部"},{"count":3,"id":90,"label":"北京测试","type":1,"children":[{"count":0,"id":129,"label":"北京测试2","type":3,"plabels":"北京测试","labelc":"北京测试2"},{"count":0,"id":124,"label":"北方项目","type":3,"plabels":"北京测试","labelc":"北方项目"},{"count":0,"id":91,"label":"五道口","type":3,"plabels":"北京测试","labelc":"五道口"}],"labelc":"北京测试(3)"},{"count":5,"id":108,"label":"产品中心测试专用","type":1,"children":[{"count":0,"id":111,"label":"李露测试门店01","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店01"},{"count":0,"id":114,"label":"黄娟的店测试专用","type":3,"plabels":"产品中心测试专用","labelc":"黄娟的店测试专用"},{"count":0,"id":113,"label":"李露测试门店03","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店03"},{"count":0,"id":112,"label":"李露测试门店02","type":3,"plabels":"产品中心测试专用","labelc":"李露测试门店02"},{"count":0,"id":181,"label":"朱磊测试门店","type":3,"plabels":"产品中心测试专用","labelc":"朱磊测试门店"}],"labelc":"产品中心测试专用(5)"},{"count":2,"id":105,"label":"zcs","type":1,"children":[{"count":0,"id":107,"label":"蓝天白云","type":3,"plabels":"zcs","labelc":"蓝天白云"},{"count":0,"id":106,"label":"白云店","type":3,"plabels":"zcs","labelc":"白云店"}],"labelc":"zcs(2)"},{"count":1,"id":74,"label":"面香八方","type":1,"children":[{"count":0,"id":75,"label":"面香八方现代城店","type":3,"plabels":"面香八方","labelc":"面香八方现代城店"}],"labelc":"面香八方(1)"},{"count":2,"id":76,"label":"自定义","type":1,"children":[{"count":0,"id":77,"label":"第一家餐厅","type":3,"plabels":"自定义","labelc":"第一家餐厅"},{"count":0,"id":78,"label":"第二家餐厅","type":3,"plabels":"自定义","labelc":"第二家餐厅"}],"labelc":"自定义(2)"},{"count":1,"id":70,"label":"脸谱","type":1,"children":[{"count":0,"id":71,"label":"朝阳门店","type":3,"plabels":"脸谱","labelc":"朝阳门店"}],"labelc":"脸谱(1)"},{"count":19,"id":2,"label":"实施专用分公司","type":1,"children":[{"count":0,"id":87,"label":"测试店","type":3,"plabels":"实施专用分公司","labelc":"测试店"},{"count":0,"id":34,"label":"实施专用101","type":3,"plabels":"实施专用分公司","labelc":"实施专用101"},{"children":[{"count":0,"id":13,"label":"yitaoshi","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"yitaoshi"},{"count":0,"id":117,"label":"复华测试店","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"复华测试店"},{"count":0,"id":12,"label":"sundanen-ceshi","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"sundanen-ceshi"},{"count":0,"id":54,"label":"上海实施测试1","type":3,"plabels":"实施门店1-实施专用分公司","labelc":"上海实施测试1"}],"plabels":"实施专用分公司","count":4,"id":5,"label":"实施门店1","type":1,"labelc":"实施门店1(4)"},{"count":0,"id":99,"label":"zlx测试","type":3,"plabels":"实施专用分公司","labelc":"zlx测试"},{"count":0,"id":103,"label":"Majc","type":3,"plabels":"实施专用分公司","labelc":"Majc"},{"count":0,"id":7,"label":"测试门店2","type":3,"plabels":"实施专用分公司","labelc":"测试门店2"},{"count":0,"id":4,"label":"测试门店1","type":3,"plabels":"实施专用分公司","labelc":"测试门店1"},{"count":0,"id":33,"label":"实施门店12","type":3,"plabels":"实施专用分公司","labelc":"实施门店12"},{"count":0,"id":42,"label":"亮健容天测试","type":3,"plabels":"实施专用分公司","labelc":"亮健容天测试"},{"count":0,"id":11,"label":"实施门店2","type":3,"plabels":"实施专用分公司","labelc":"实施门店2"},{"count":0,"id":30,"label":"实施门店6","type":3,"plabels":"实施专用分公司","labelc":"实施门店6"},{"count":0,"id":14,"label":"实施门店3","type":3,"plabels":"实施专用分公司","labelc":"实施门店3"},{"count":0,"id":36,"label":"实施测试7","type":3,"plabels":"实施专用分公司","labelc":"实施测试7"},{"count":0,"id":45,"label":"云南xx酒楼","type":3,"plabels":"实施专用分公司","labelc":"云南xx酒楼"},{"count":0,"id":27,"label":"实施门店5","type":3,"plabels":"实施专用分公司","labelc":"实施门店5"},{"count":0,"id":58,"label":"ns","type":3,"plabels":"实施专用分公司","labelc":"ns"},{"count":0,"id":53,"label":"昆明测试门店90","type":3,"plabels":"实施专用分公司","labelc":"昆明测试门店90"},{"count":0,"id":93,"label":"relayh测试门店","type":3,"plabels":"实施专用分公司","labelc":"relayh测试门店"},{"count":0,"id":94,"label":"范文涛","type":3,"plabels":"实施专用分公司","labelc":"范文涛"}],"labelc":"实施专用分公司(19)"},{"count":11,"id":3,"label":"开发专用分公司","type":1,"children":[{"count":0,"id":140,"label":"OM认证测试","type":3,"plabels":"开发专用分公司","labelc":"OM认证测试"},{"count":0,"id":128,"label":"开店流程测试","type":3,"plabels":"开发专用分公司","labelc":"开店流程测试"},{"count":0,"id":40,"label":"0305开发郭沈厅","type":3,"plabels":"开发专用分公司","labelc":"0305开发郭沈厅"},{"count":0,"id":24,"label":"开发门店2","type":3,"plabels":"开发专用分公司","labelc":"开发门店2"},{"count":0,"id":46,"label":"张晓丽测试专用","type":3,"plabels":"开发专用分公司","labelc":"张晓丽测试专用"},{"count":0,"id":38,"label":"开发高健","type":3,"plabels":"开发专用分公司","labelc":"开发高健"},{"count":0,"id":80,"label":"分公司测试123","type":3,"plabels":"开发专用分公司","labelc":"分公司测试123"},{"count":0,"id":37,"label":"白青冉专用测试","type":3,"plabels":"开发专用分公司","labelc":"白青冉专用测试"},{"count":0,"id":72,"label":"演示专用","type":3,"plabels":"开发专用分公司","labelc":"演示专用"},{"children":[{"count":0,"id":68,"label":"物流测试01店","type":3,"plabels":"物流测试专用-开发专用分公司","labelc":"物流测试01店"}],"plabels":"开发专用分公司","count":1,"id":66,"label":"物流测试专用","type":1,"labelc":"物流测试专用(1)"},{"count":0,"id":6,"label":"开发门店1","type":3,"plabels":"开发专用分公司","labelc":"开发门店1"}],"labelc":"开发专用分公司(11)"},{"count":23,"id":1,"label":"测试专用分公司","type":1,"children":[{"count":0,"id":199,"label":"测试门店21ww","type":3,"plabels":"测试专用分公司","labelc":"测试门店21ww"},{"count":0,"id":200,"label":"测试门店20yk","type":3,"plabels":"测试专用分公司","labelc":"测试门店20yk"},{"count":0,"id":203,"label":"测试图片上传门店","type":3,"plabels":"测试专用分公司","labelc":"测试图片上传门店"},{"count":0,"id":101,"label":"ceshi","type":3,"plabels":"测试专用分公司","labelc":"ceshi"},{"count":0,"id":97,"label":"测试望京店勿动","type":3,"plabels":"测试专用分公司","labelc":"测试望京店勿动"},{"count":0,"id":204,"label":"阿拉代发扥","type":3,"plabels":"测试专用分公司","labelc":"阿拉代发扥"},{"count":0,"id":16,"label":"报表专用测试（勿动）","type":3,"plabels":"测试专用分公司","labelc":"报表专用测试（勿动）"},{"count":0,"id":205,"label":"测试富文本编辑器门店","type":3,"plabels":"测试专用分公司","labelc":"测试富文本编辑器门店"},{"count":0,"id":28,"label":"快餐自动化（ZC勿动）","type":3,"plabels":"测试专用分公司","labelc":"快餐自动化（ZC勿动）"},{"count":0,"id":29,"label":"天子星望京店","type":3,"plabels":"测试专用分公司","labelc":"天子星望京店"},{"count":0,"id":73,"label":"localw快餐测试","type":3,"plabels":"测试专用分公司","labelc":"localw快餐测试"},{"count":0,"id":31,"label":"测试门店18勿动","type":3,"plabels":"测试专用分公司","labelc":"测试门店18勿动"},{"count":0,"id":15,"label":"小五测试门店","type":3,"plabels":"测试专用分公司","labelc":"小五测试门店"},{"count":0,"id":98,"label":"刘美丽微信测试专用","type":3,"plabels":"测试专用分公司","labelc":"刘美丽微信测试专用"},{"count":0,"id":88,"label":"postest勿动","type":3,"plabels":"测试专用分公司","labelc":"postest勿动"},{"count":0,"id":25,"label":"正餐自动化（KC勿动）","type":3,"plabels":"测试专用分公司","labelc":"正餐自动化（KC勿动）"},{"count":0,"id":163,"label":"gaoteng","type":3,"plabels":"测试专用分公司","labelc":"gaoteng"},{"count":0,"id":85,"label":"localw正餐测试","type":3,"plabels":"测试专用分公司","labelc":"localw正餐测试"},{"count":0,"id":9,"label":"正餐-秒付-Netty11","type":3,"plabels":"测试专用分公司","labelc":"正餐-秒付-Netty11"},{"count":0,"id":19,"label":"杨旭测试店","type":3,"plabels":"测试专用分公司","labelc":"杨旭测试店"},{"count":0,"id":17,"label":"测试门店8","type":3,"plabels":"测试专用分公司","labelc":"测试门店8"},{"count":0,"id":83,"label":"一鸣的没店","type":3,"plabels":"测试专用分公司","labelc":"一鸣的没店"},{"count":0,"id":10,"label":"测试门店5","type":3,"plabels":"测试专用分公司","labelc":"测试门店5"}],"labelc":"测试专用分公司(23)"},{"count":1,"id":176,"label":"分公司1","type":1,"children":[{"count":0,"id":178,"label":"测试门店","type":3,"plabels":"分公司1","labelc":"测试门店"}],"labelc":"分公司1(1)"},{"count":2,"id":185,"label":"沙县小吃001","type":1,"children":[{"count":0,"id":186,"label":"测试门店001","type":3,"plabels":"沙县小吃001","labelc":"测试门店001"},{"count":0,"id":187,"label":"测试门店002","type":3,"plabels":"沙县小吃001","labelc":"测试门店002"}],"labelc":"沙县小吃001(2)"}],"count":12,"id":-1,"label":"全部机构","labelc":"全部机构"}]},
		      	/*dialogMendian:false,*/
		      	defaultMendianProps: {
					children: 'children',
					label: 'labelc',
					name: 'label',
					id: 'id',
					count: 'count'
				},
		      	activityId:'',
				//门店开始
				storeData:[],
				/*storeDialogVisible:false,*/
				/*storeCheckedIds:[],*/
				storeNodes:[],
				storeNodes_template:[],
				storeTotal:0,
				is_find:false,
				//门店结束
				
				ruleForm: {
		          name: '',
		          mendian:[],
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入分组名称', trigger: 'blur' },
		            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
		          ],
		          mendian:[
		            { required: true,type: 'array', message: '请至少选择一个门店', trigger: 'change' },
		          ]
		        },
		      };
    },
    props:{
		storeDialogVisible:Boolean,
		pnodes:Array,
		name:String,
		storeCheckedIds:Array,
	},
    methods:{
	    loadTree(){
	    	//this.storeData = this.treeData.data;
			getMendian().then((response) => {
				this.storeData =  response.data;
			})
		},
		closeButton(){
			this.storeDialogVisible = false;
			this.$emit('close',false); //传出来

		},
	    handleClose(done) {
			this.storeDialogVisible = false;
			this.$emit('close',false); //传出来
	        done();
	    },
		storeBoxChange(nodes,total){
	      	this.storeNodes = nodes;
	      	this.ruleForm.mendian  = nodes;
		},
		deleteStore(store,index){
			this.storeNodes_template.splice(index, 1);
		},
		submitForm(formName){
	        this.$refs[formName].validate((valid) => {
		        if (valid) {
		            this.$emit('makeSureStoreButton',this.storeNodes,this.ruleForm.name); //传出来
		        } else {
		            return false;
		        }
	        });
	    },
	    setMendian(nodes){
	      this.ruleForm.mendian  = nodes;	
	    }
	},
	 mounted(){ 
		this.ruleForm.name = this.name;
	},
	created() {
		this.loadTree();
	}
 }
</script>

<style rel="stylesheet/scss" lang="scss">
	.treeStore{
		width:780px;
		.el-form{
			.el-form-item{
				.el-input{
					width:600px;
				}
			}
			.el-form-item:nth-child(1){
				margin-top:20px;
			}
			.el-form-item:nth-child(2){
				margin-top:20px;
			}
			.el-form-item:nth-child(3){
				margin-top: 30px;
			    background: #F4F9FC;
			    padding-top: 20px;
			    padding-bottom: 20px;
			    padding-left: 190px;
			}
			.el-form-item.is-error:nth-child(2) .el-input__inner, .el-form-item.is-error .el-textarea__inner {
			    border-color: transparent; 
			}
			.el-form-item.is-error:nth-child(2) .tzxselecttree {
			   border-color: #ff4949;
			}
		}
		.tzxselecttree{
			border: 1px solid #D8E5EC;
    		border-radius: 3px;
    		width: 600px !important;
    		.el-input{
    			width:275px !important;
    		}
		}
	}
</style>