import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const Listdata = []
const AllActivity =[]
const Reports = []
const Members = []
const Coupons = []
const count1 =10000;
const count = 300;

for (let i=0;i<25;i++){
	Coupons.push(Mock.mock({
		 id: '@increment',
		 coupons_name:'@ctitle(3, 5)',
		 start_coupon:'@datetime',
		 end_coupon:'@datetime',
		 'chanel_name|1':['默认(餐厅)','微店'],
		 'coupons_code|1':['00001213131','000023232323','00002323231'],
	}))
}
for (let i = 0; i < 1000; i++) {
	Members.push(Mock.mock({
		 id: '@increment',
		 name:'@cname',
		 'sex|1': ['man','woman'],
		 "mobil|1": ['18298368888','17798368888'],//手机号
		 wechat:'@cname',
		 'add_chanel|1':['EZZ14','EL09','WM10','MD01'],
		 add_time:'@datetime',
		 time:'@integer(1, 200)',
		 total_main_balance:'@float(1000,2000000,2,2)',
		 total_reward_balance:'@float(1000,2000000,2,2)',
		 useful_credit:'@integer(1, 200)',
		 org_full_name: '@ctitle(3, 10)',
		 'level|1':['1','2','3','4'],
		 'state|1':['0','1']
		 
	}))
}
for (let i = 0; i < 1000; i++) {
  Reports.push(Mock.mock({
    id: '@increment',
    day_count:'@date("yyyy-MM-dd")',
    stored_times_value:'@integer(1, 10)',
    stored_times_num:'@integer(1, 2000)',
    stored_money_value:'@integer(20000, 1000000)',
    stored_money_num:'@integer(1, 2000)',
    stored_consume_times_value:'@integer(1, 20)',
    stored_consume_times_num:'@integer(1, 2000)',
    stored_per_consume_money_value:'@integer(20000, 1000000)',
    stored_per_consume_money_num:'@integer(1, 2000)',
    credit_add_times_value:'@integer(1, 2000)',
    credit_add_times_num:'@integer(1, 2000)',
    credit_add_amount_value:'@integer(20000, 1000000)',
    credit_add_amount_num:'@integer(1, 2000)',
    credit_consume_times_value:'@integer(1, 20)',
    credit_consume_times_num:'@integer(1, 2000)',
    credit_per_consume_amount_value:'@integer(20000, 1000000)',
    credit_per_consume_amount_num:'@integer(1, 2000)'
    
   
  }))
}
for (let i = 0; i < count1; i++) {
  AllActivity.push(Mock.mock({
    id: '@increment',
    value:'@ctitle(10, 20)' ,
   
  }))
}
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    last_updatetime:'@datetime' ,
    last_operator: '@cname',
    subject: '@ctitle(10, 20)',//活动名称
    members_count: '@integer(1, 2000)',
    'activity_type|1': ['evalgift','manualmoney'],
    'running_state|1': ['0', '1', '2','3'],
    start_time: '@datetime',
    end_time:'@datetime',

  }))
}
for (let i = 0; i < count; i++) {
  Listdata.push(Mock.mock({
    id: '@increment',
    date: '@date("yyyy-MM-dd")',
    store_name:'@cname',
    stored_times:'@integer(1, 20)',
    stored_money:'@integer(1, 20)',
    stored_consume_times:'@integer(1, 20)',
    stored_per_consume_money:'@integer(1, 20)',
    credit_add_times:'@integer(1, 20)',
    credit_add_amount:'@integer(1, 20)',
    credit_consume_times:'@integer(1, 20)',
    credit_per_consume_amount:'@integer(1, 20)',
  }))
}

export default {
  getList: config => {
    const { importance, activity_type, subject, currentPage = 1, pageSize = 10, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
    
      if (importance && item.importance !== +importance) return false
      if (activity_type && item.activity_type !== activity_type) return false
      if (subject && item.subject.indexOf(subject) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  
  getMembers:config =>{
  	const { importance,mobil,wechart, page = 1, rows = 10, sort } = param2Obj(config.url)
  	
    let mockList = Members.filter(item => {
    
      if (importance && item.importance !== +importance) return false
      if (mobil && item.mobil.indexOf(mobil) < 0) return false
      if (wechart && item.wechart.indexOf(wechart) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }
      const pageList = mockList.filter((item, index) => index < rows * page && index >= rows * (page - 1))

    return {
      total: mockList.length,
      rows: pageList
    }
  },
  getReports: config => {
    const { importance,   page = 1, rows = 10, sort } = param2Obj(config.url)

    let mockList = Reports.filter(item => {
    
      if (importance && item.importance !== +importance) return false

    
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < rows * page && index >= rows * (page - 1))

    return {
      total: mockList.length,
      data: pageList
    }
  },
  getAllCoupons: config => {
    const { importance,   page = 1, rows = 10, sort } = param2Obj(config.url)

    let mockList = Coupons.filter(item => {
    
      if (importance && item.importance !== +importance) return false

    
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < rows * page && index >= rows * (page - 1))

    return {
      total: mockList.length,
      data: pageList
      
    }
  },
  
  getTimes:config => {
  	
    const { importance, store_name, page = 1, rows = 10, sort } = param2Obj(config.url)

    let mockList = Listdata.filter(item => {
    
      if (importance && item.importance !== +importance) return false
     
      if (store_name && item.store_name.indexOf(store_name) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < rows * page && index >= rows * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  
  	
  },
  
   getNames:config => {
  	
    const { value } = param2Obj(config.url)
    let mockList = AllActivity.filter(item => {
     
      if (value && item.value.indexOf(value) < 0) return false
      return true
    })

    return {
    
      items: mockList
    }
  
  	
  },
   getActivityById:config => {
   		let data ={};
   		data.success = true;
   		data.activity ={
   			id:10,
   			subject:'赠送金额100',
   			start_time:'2017-11-03',
				end_time:'2017-11-30',
				mendian:'1',
				stores:[{id:18,label:'现代城店'},
				{id:1,label:'现代城店'},
				{id:2,label:'霄云路店'},
				{id:3,label:'慈云寺店'},
				{id:4,label:'总部基地店 '},
				{id:5,label:'世纪金源 '},
				{id:6,label:'海淀桥店思密达'},
				{id:7,label:'上地软件园店 '},
				{id:8,label:'三元桥店'},
				{id:9,label:'上地辉煌'},
				{id:10,label:'亦庄店 '},
				{id:11,label:'苏州街店'},
				{id:12,label:'柳芳店'},
				{id:13,label:'牡丹园店'},
				{id:14,label:'双清路店'},
				{id:15,label:'现代城店'},
				{id:16,label:'现代城店'},
				{id:17,label:'现代城店'},
				{id:18,label:'海淀桥店思密达'},
				{id:19,label:'上地软件园店 '},
				{id:28,label:'三元桥店'},
				{id:29,label:'上地辉煌'},
				{id:30,label:'亦庄店 '},
				{id:41,label:'苏州街店'},
				{id:52,label:'柳芳店'},
				{id:33,label:'牡丹园店'},
				{id:34,label:'双清路店'},
				{id:35,label:'现代城店'},
				{id:36,label:'现代城店'},
				{id:37,label:'现代城店'},
					{id:12,label:'柳芳店'},
				{id:13,label:'牡丹园店'},
				{id:14,label:'双清路店'},
				{id:15,label:'现代城店'},
				{id:16,label:'现代城店'},
				{id:17,label:'现代城店'},
				{id:18,label:'海淀桥店思密达'},
				{id:19,label:'上地软件园店 '},
				{id:28,label:'三元桥店'},
				{id:29,label:'上地辉煌'},
				{id:30,label:'亦庄店 '},
				{id:41,label:'苏州街店'},
				{id:52,label:'柳芳店'},
				{id:33,label:'牡丹园店'},
				{id:34,label:'双清路店'},
				{id:35,label:'现代城店'},
				{id:36,label:'现代城店'},
				{id:37,label:'现代城店'},
				],
				max_reward_money:100.00
   		}
   	
    return {
    
      data: data
    }
   },
    getReportById:config => {
   		let data ={"success":true,"msg":"成功","data":[{"warnKey":"stored_times","lastUpdatetime":null,"id":0,"warnName":"今日储值次数","warnValue":"2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"stored_times","lastUpdatetime":null,"id":0,"warnName":"今日储值次数","warnValue":"2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"stored_money","lastUpdatetime":null,"id":0,"warnName":"今日储值金额","warnValue":"0.02","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"stored_money","lastUpdatetime":null,"id":0,"warnName":"今日储值金额","warnValue":"0.02","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"stored_consume_times","lastUpdatetime":null,"id":0,"warnName":"今日储值消费次数","warnValue":"2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"stored_consume_times","lastUpdatetime":null,"id":0,"warnName":"今日储值消费次数","warnValue":"2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"stored_per_consume_money","lastUpdatetime":null,"id":0,"warnName":"今日单笔储值消费额","warnValue":"0.2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"stored_per_consume_money","lastUpdatetime":null,"id":0,"warnName":"今日单笔储值消费额","warnValue":"0.2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"credit_add_times","lastUpdatetime":null,"id":0,"warnName":"今日积分增加次数","warnValue":"2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"credit_add_times","lastUpdatetime":null,"id":0,"warnName":"今日积分增加次数","warnValue":"2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"credit_add_amount","lastUpdatetime":null,"id":0,"warnName":"今日积分增加总额","warnValue":"0.2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"credit_add_amount","lastUpdatetime":null,"id":0,"warnName":"今日积分增加总额","warnValue":"0.2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"credit_consume_times","lastUpdatetime":null,"id":0,"warnName":"今日积分消费次数","warnValue":"2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"credit_consume_times","lastUpdatetime":null,"id":0,"warnName":"今日积分消费次数","warnValue":"2","tenancyId":"","state":0,"detailList":[],"warnNum":0},{"warnKey":"credit_per_consume_amount","lastUpdatetime":null,"id":0,"warnName":"今日单笔积分消费额","warnValue":"0.02","tenancyId":"","state":0,"detailList":[{"storeName":"","customerId":"192764","operateTime":"","nick":"","warnReal":"11.0000","detailVoList":[{"storeName":null,"customerId":"","operateTime":"17:15","nick":"","warnReal":"","detailVoList":[],"orderNum":"cl2017110417000002","mobile":""}],"orderNum":"","mobile":"15988888888"},{"storeName":"","customerId":"192764","operateTime":"","nick":"","warnReal":"11.0000","detailVoList":[{"storeName":null,"customerId":"","operateTime":"17:03","nick":"","warnReal":"","detailVoList":[],"orderNum":"cl2017110417000001","mobile":""}],"orderNum":"","mobile":"15988888888"}],"warnNum":1},{"warnKey":"credit_per_consume_amount","lastUpdatetime":null,"id":0,"warnName":"今日单笔积分消费额","warnValue":"0.02","tenancyId":"","state":0,"detailList":[{"storeName":"","customerId":"192764","operateTime":"","nick":"","warnReal":"11.0000","detailVoList":[{"storeName":null,"customerId":"","operateTime":"17:15","nick":"","warnReal":"","detailVoList":[],"orderNum":"cl2017110417000002","mobile":""}],"orderNum":"","mobile":"15988888888"},{"storeName":"","customerId":"192764","operateTime":"","nick":"","warnReal":"11.0000","detailVoList":[{"storeName":null,"customerId":"","operateTime":"17:03","nick":"","warnReal":"","detailVoList":[],"orderNum":"cl2017110417000001","mobile":""}],"orderNum":"","mobile":"15988888888"}],"warnNum":1}]}
   		return {
    
      data: data
    }
   },
   getUserRoles:config=>{
   	   let roles = [
            { path: 'member_profile', name: '会员档案' },
            { path: 'memberfilemanagement',name: '会员档案' ,hidden: true},
            { path: 'member_profile_update',  name: '基础资料编辑', hidden: true },
            { path: 'member_profile_detail',  name: '会员档案详情', hidden: true },
            { path: 'groupfilemanagement',name: '团体档案' },
            { path: 'membershiplevelset',  name: '会员等级' },
            { path: 'memberupgrademanagement',  name: '会员升级' },
            { path: 'activitymanagement',  name: '活动管理' },
            { path: 'addCouponRevertList', name: '新增优惠券撤销列表', hidden: true },
            { path: 'couponDetail',  name: '查看优惠券详情', hidden: true },        
            { path: 'member_manage',  name: '会员管理' },
            { path: 'game_manage',  name: '活动管理' },     
            { path: 'fan_statistic',  name: '粉丝数据分析' },
            { path: 'member_statistic', name: '会员数据分析' },
            { path: 'wechatreporting', name: '用户数据分析' },
            { path: 'menu_statistic',  name: '菜单数据分析' },   
            { path: 'dataAnalysis', name: '数据查询' },
            { path: 'dataQuery',  name: '数据分析' },   
            { path: 'membergrowthtrendanalysis', name: '会员增长趋势分析' },
            { path: 'memberexclusivespecialanalysis',  name: '会员属性分析' },
            { path: 'memberrechargeconsumption',  name: '会员充值消费报表' },
            { path: 'cardtransactionflowquery',  name: '卡交易流水查询' },
            { path: 'memberdaybusinessstatistics', name: '会员卡日统计报表' },
            { path: 'amountofmonthlyprecipitation', name: '金额沉淀区间分析' },
            { path: 'amountprecipitationoverallanalysis', name: '金额沉淀整体分析' },
            { path: 'cardrechargewaterreport',  name: '卡充值流水汇总表' },
            { path: 'rechargepaymentmethodreport',  name: '充值付款方式统计表' },
            { path: 'commissionreport',  name: '门店售卡提成报表' },
            { path: 'agencysalecarddetailsummaryreport', name: '门店售卡明细报表' },
            { path: 'salesstaffcardreport',  name: '员工售卡提成报表' },
            { path: 'integralmonthlyprecipitation',  name: '积分沉淀分析' },
            { path: 'integraltransactionqueryreport',  name: '积分消费流水查询' },
            { path: 'couponusingsummaryquery',  name: '优惠券发售使用汇总表' },
            { path: 'couponssalesummaryquery',  name: '优惠券发售使用流水表' },
            { path: 'amountofmonthlysettlementmechanism', name: '机构金额结算' },   
            { path: 'updatepwd',  name: '修改密码', hidden: true },
            { path: 'updatelogs',  name: '更新日志', hidden: true }]
   	   
   	   	return {
                success:true,
      			data: data
    		}
   },
 getArticle: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: false,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: ''
  })
 /* getPv: () => ({
    pvData: [{ key: 'PC网站', pv: 1024 }, { key: 'mobile网站', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),*/
  /*getArticle: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: false,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: ''
  })*/
}
